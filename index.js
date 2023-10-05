//CUENTA VENDEDOR
//Usuario y contraseña del vendedor:
localStorage.setItem('usuario', 'LucasMendoza');
localStorage.setItem('contrasenia', 'lucas1234');

//Usuario y contraseña de un comprador:
localStorage.setItem('userComprador', 'user');
localStorage.setItem('contraComprador', 'user1234');

let seccionIngreso = document.getElementById('ingreso');

let botonBack = document.createElement('button');
botonBack.innerText = "Volver";

const seccionProductos = document.getElementById('contenedor');

function agregarAlCarrito(producto){
  if(producto != null){
    if(JSON.parse(localStorage.getItem('Carrito')) != null){//si existe el carro
      let existeEnCarro = 'no';
      let carrito = JSON.parse(localStorage.getItem('Carrito'));
      
      for(const elemCarro of carrito){
        if(elemCarro.id == producto.id){
          elemCarro.cantidad += 1;
          existeEnCarro = 'si';
          break;
        }
      }

      if(existeEnCarro == 'no'){
        producto.cantidad = 1;
        carrito.push(producto);
      }
      
      localStorage.setItem('Carrito', JSON.stringify(carrito));
    }else{ //Si no existe, lo creo y le agrego el producto
      producto.cantidad = 1;
      let arrayCarrito = [producto];
      localStorage.setItem('Carrito', JSON.stringify(arrayCarrito));
    }
      let arrayProds = JSON.parse(localStorage.getItem('productos'));
      for(const elem of arrayProds){
        if(elem.id == producto.id){
          elem.cantidad -= 1;
          localStorage.setItem('mod', 'si');
          break;
        }
      }
      localStorage.setItem('productos', JSON.stringify(arrayProds));

    Swal.fire({
      title: 'Agregaste '+ producto.nombre.toUpperCase() +' al carro',
      imageUrl: producto.foto,
      imageHeight: 400,
      imageAlt: 'Custom image',
    })
  }
}

function renderizarProductos(listaProductos){
  //console.log(listaProductos);
  let cantidadActual = 0;
  for(const prod of listaProductos){
    if(seccionProductos != null){
      seccionProductos.innerHTML += `
      <div class="tarjeta-producto">
      <img src="${prod.foto}" alt="${prod.nombre}" class="tarjeta-producto__imagen" alt="imagen de homero buda impreso en 3D">
        <div class="tarjeta-producto__cuerpo">
          <h5 class="tarjeta-producto__cuerpo__titulo">${prod.nombre}</h5>
          <p class="tarjeta-producto__precio">$ ${prod.precio}</p>
          <button id=${prod.id} class="btn btn1">Agregar al carro</button>
        </div>
      </div>
      `
    }
  }

  //Botones:
  let botones = document.getElementsByClassName('btn1');
  for(const boton of botones){
    boton.addEventListener('click', () =>{ 
      if(localStorage.getItem('ingresoActivo') == 'comprador'){
        const prodACarro = listaProductos.find((producto) => producto.id == boton.id);

        let prodsStorage = JSON.parse(localStorage.getItem('productos'));

        for(const elem of prodsStorage){
          if(elem.id == prodACarro.id){
            cantidadActual = elem.cantidad;
            break;
          }
        }

        if(parseInt(cantidadActual) > 0){
          agregarAlCarrito(prodACarro);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'No hay stock disponible para este producto',
          })
        }

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Ningún usuario encontrado',
          text: 'Inicie sesión para agregar al carro',
        })
      }
    })
  }
}
 
renderizarProductos(JSON.parse(localStorage.getItem('productos')));

botonBack.addEventListener('click', menuVendedor);
botonBack.className ="btn";

let botonBackModStock = document.createElement('button');
botonBackModStock.className = "btn";
botonBackModStock.innerText = "Volver";
botonBackModStock.addEventListener('click', modificarStock);

const btnBackAgregarProducto = document.createElement('button');
btnBackAgregarProducto.textContent = "Volver";
btnBackAgregarProducto.classList.add('btn');
btnBackAgregarProducto.addEventListener('click', agregarProducto);

function agregarNuevoProducto(){
  if(seccionIngreso != null){
    let productosStorage = JSON.parse(localStorage.getItem('productos'));

    seccionIngreso.innerHTML = '';
    seccionIngreso.innerHTML += 'Agregar nuevo producto';
    
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('id', 'nombreProd');
    inputNombre.setAttribute('placeholder', 'Ingrese el nombre del producto');
    inputNombre.classList.add('inputsAdd');
    seccionIngreso.appendChild(inputNombre);

    const inputCategoria = document.createElement('input');
    inputCategoria.setAttribute('type', 'text');
    inputCategoria.setAttribute('id', 'categoriaProd');
    inputCategoria.setAttribute('placeholder', 'Ingrese la categoría');
    inputCategoria.classList.add('inputsAdd');
    seccionIngreso.appendChild(inputCategoria);

    const inputCantidad = document.createElement('input');
    inputCantidad.setAttribute('type', 'number');
    inputCantidad.setAttribute('id', 'cantProd');
    inputCantidad.setAttribute('placeholder', 'Ingrese la cantidad de unidades');
    inputCantidad.classList.add('inputsAdd');
    seccionIngreso.appendChild(inputCantidad);
    
    const inputPrecio = document.createElement('input');
    inputPrecio.setAttribute('type', 'number');
    inputPrecio.setAttribute('id', 'precioProd');
    inputPrecio.setAttribute('placeholder', 'Ingrese el precio');
    inputPrecio.classList.add('inputsAdd');
    seccionIngreso.appendChild(inputPrecio);

    const inputFoto = document.createElement('input');
    inputFoto.setAttribute('type', 'text');
    inputFoto.setAttribute('id', 'fotoProd');
    inputFoto.setAttribute('placeholder', 'Ingrese la foto (link)');
    inputFoto.classList.add('inputsAdd');
    seccionIngreso.appendChild(inputFoto);

    const nuevoId = productosStorage.length + 1;

    const btnAceptarDatos = document.createElement('button');
    btnAceptarDatos.setAttribute('id', 'aceptarDatos');
    btnAceptarDatos.classList.add('btn');
    btnAceptarDatos.textContent = 'Aceptar';
    seccionIngreso.appendChild(btnAceptarDatos);

    seccionIngreso.appendChild(btnBackAgregarProducto);

    btnAceptarDatos.onclick = () =>{
      if((inputNombre.value).length > 2 && parseInt(inputCantidad.value) > 0 && (inputCategoria.value).length > 1 && parseFloat(inputPrecio.value) > 0){
        let prodNuevo = {id:nuevoId, nombre:inputNombre.value, foto:inputFoto.value, categoria:inputCategoria.value, precio:parseFloat(inputPrecio.value), cantidad:parseInt(inputCantidad.value)};
  
        productosStorage.push(prodNuevo);
        localStorage.setItem('mod', 'si');
        localStorage.setItem('productos', JSON.stringify(productosStorage));
        Swal.fire({
          icon: 'success',
          title: 'Nuevo producto agregado',
        })
        agregarNuevoProducto();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Asegúrese de completar todos los campos correctamente antes de continuar',
        })
        agregarNuevoProducto();
      } 
    }
  } 
}

const btnBackAddProdExistente = document.createElement('button');
btnBackAddProdExistente.setAttribute('class', 'btn');
btnBackAddProdExistente.addEventListener('click', agegarProductoExistente);
btnBackAddProdExistente.textContent = "Volver";

function agregarStock(producto){
  if(seccionIngreso != null && producto != null){
    let productosStorage = JSON.parse(localStorage.getItem('productos'));
    for(const prod of productosStorage){
      if(prod.id == producto.id){//si coincide el id, modifico la cantidad en el array del storage
        seccionIngreso.innerHTML = '';//muestro el prod del storage
        seccionIngreso.innerHTML += `
        <table class="table table-dark">
          <tbody>
            <tr>
              <th scope="row">${prod.id}</th>
              <td class=""bg-black"><img src=${prod.foto} class="imgEliminar"></td>
              <td>${prod.nombre}</td>
              <td>${prod.cantidad}</td>
            </tr>
          </tbody>
        </table>
        `;
        
        let cantidad = document.createElement('input');
        cantidad.setAttribute('class', 'inputs');
        cantidad.setAttribute('placeholder', 'Ingrese la cantidad');
        cantidad.setAttribute('type', 'number');
        seccionIngreso.appendChild(cantidad);

        let botonAceptar = document.createElement('button');
        botonAceptar.setAttribute('class', 'btn');
        botonAceptar.textContent = "Aceptar";
        seccionIngreso.appendChild(botonAceptar);

        botonAceptar.onclick = () =>{
          if(cantidad.value > 0){//si la cantidad es valid, modifico el prod del for encontrado
            prod.cantidad += parseInt(cantidad.value);
            localStorage.setItem('productos', JSON.stringify(productosStorage));//guardo el array modificado
            Swal.fire({
              icon: 'success',
              text: 'Stock modificado',
            })
          }else{
            Swal.fire({
              icon: 'error',
              text: 'Ingrese una cantidad válida',
            })
          }
          agregarStock(producto);
        }
        localStorage.setItem('mod', 'si');
        break;
      }//fin if
    }//fin for 

    seccionIngreso.appendChild(btnBackAddProdExistente);
  }
}//fin agregarStock

function agegarProductoExistente(){
  let productosStorage = JSON.parse(localStorage.getItem('productos'));
  seccionIngreso.innerHTML = '';

  for(const product of productosStorage){//muestro los productos
    seccionIngreso.innerHTML += `
    <table class="table table-dark">
    <tbody>
      <tr>
        <th scope="row">${product.id}</th>
        <td class=""bg-black"><img src=${product.foto} class="imgEliminar"></td>
        <td>${product.nombre}</td>
        <td>${product.cantidad}</td>
      </tr>
    </tbody>
  </table>
    `;
  }
  
  const campoId = document.createElement('input');
  campoId.setAttribute('class', 'inputs');
  campoId.setAttribute('type', 'text');
  campoId.setAttribute('placeholder', 'Ingrese el ID del producto');
  seccionIngreso.appendChild(campoId);

  const btnAceptarId = document.createElement('button');
  btnAceptarId.setAttribute('class', 'btn');
  btnAceptarId.textContent = "Aceptar";
  seccionIngreso.appendChild(btnAceptarId);

  seccionIngreso.appendChild(btnBackAgregarProducto);

  btnAceptarId.onclick = () =>{
      const existeProd = productosStorage.some((prod) => prod.id == campoId.value);

      if(existeProd){
        const prodEncontrado = productosStorage.find((prod) => prod.id == campoId.value);
        agregarStock(prodEncontrado);
      }else{
        Swal.fire({
          icon: 'error',
          text: 'El id ingresado no corresponde a un producto del stock',
        })
        agegarProductoExistente();
    }// aceptarId.onclick prod existente
  }//fin agregarProductoExistente
}

function agregarProducto(){
  if(seccionIngreso != null){
    seccionIngreso.innerHTML = '';
    seccionIngreso.classList.add("gap-1");
  
    const btnProdExiste = document.createElement('button');
    btnProdExiste.setAttribute('class', 'btn');
    btnProdExiste.textContent = "Producto existente";
    seccionIngreso.appendChild(btnProdExiste);
  
    const btnNuevoProd = document.createElement('button');
    btnNuevoProd.textContent = "Nuevo Producto";
    btnNuevoProd.setAttribute('class', 'btn');
    seccionIngreso.appendChild(btnNuevoProd);
  
    btnProdExiste.onclick = () =>{
      agegarProductoExistente();
    } 
  
    btnNuevoProd.onclick = () =>{
      agregarNuevoProducto();
    }
      seccionIngreso.appendChild(botonBackModStock);
  }
}

const btnBackEliminarProd = document.createElement('button');
btnBackEliminarProd.setAttribute('class', 'btn');
btnBackEliminarProd.textContent = "Volver";
btnBackEliminarProd.addEventListener('click', eliminarProducto);

function eliminarStockProducto(producto){
  if(seccionIngreso != null && producto != null){
    let productosStorage = JSON.parse(localStorage.getItem('productos'));//traigo los productos

    for(const prod of productosStorage){
      if(prod.id == producto.id){//si coincide el id, modifico la cantidad en el array del storage
        seccionIngreso.innerHTML = '';//muestro el prod del storage
        seccionIngreso.innerHTML += `
        <table class="table table-dark">
          <tbody>
            <tr>
              <th scope="row">${prod.id}</th>
              <td class=""bg-black"><img src=${prod.foto} class="imgEliminar"></td>
              <td>${prod.nombre}</td>
              <td>${prod.cantidad}</td>
            </tr>
          </tbody>
        </table>
        `;
        const campoCantidad = document.createElement('input');
        campoCantidad.setAttribute('class', 'inputs');
        campoCantidad.setAttribute('type', 'number');
        campoCantidad.setAttribute('placeholder', 'Ingrese las unidades a eliminar');
        seccionIngreso.appendChild(campoCantidad);
    
        const btnAceptarCant = document.createElement('button');
        btnAceptarCant.setAttribute('class', 'btn');
        btnAceptarCant.textContent = "Aceptar";
        seccionIngreso.appendChild(btnAceptarCant);

        btnAceptarCant.onclick = () =>{
          if((parseInt(campoCantidad.value) <= prod.cantidad) && (parseInt(campoCantidad.value) > 0)){//si la cantidad es valid, modifico el prod del for encontrado
            prod.cantidad -= parseInt(campoCantidad.value);
            localStorage.setItem('productos', JSON.stringify(productosStorage));//mando los productos
            Swal.fire({
              icon: 'success',
              text: `${campoCantidad.value} unidades eliminadas`,})
          }else{
            Swal.fire({
              icon: 'error',
              text: 'Ingrese una cantidad válida',
            })
          }
          eliminarStockProducto(producto);
        }
        localStorage.setItem('mod', 'si');
        break;
      }//fin if
    }//fin for 
    //Agregar botón de ir atrás a eliminarProducto
    seccionIngreso.appendChild(btnBackEliminarProd);
  }
}//fin eliminarStockProducto

function eliminarProducto(){
  if(seccionIngreso != null){
    let existe = 'no';
    seccionIngreso.innerHTML = '';
    let prods = JSON.parse(localStorage.getItem('productos'));
  
    seccionIngreso.innerHTML  += `
    <table class="table table-striped ">
      <thead class="table-dark">
        <tr>
          <td scope="col">ID</td>
          <td scope="col">   Imagen</td>
          <td scope="col">Nombre</td>
          <td scope="col">Cantidad</td>
        </tr>
      </thead>
    </table>`;
  
    for(const prod of prods){
      if(prod.cantidad > 0){
        seccionIngreso.innerHTML +=`
        <table class="table table-dark">
        <tbody>
          <tr>
            <th scope="row">${prod.id}</th>
            <td class=""bg-black"><img src=${prod.foto} class="imgEliminar"></td>
            <td>${prod.nombre}</td>
            <td>${prod.cantidad}</td>
          </tr>
        </tbody>
      </table>`;
      }
    }

    let campoId = document.createElement('input');
    campoId.setAttribute('class', 'inputs');
    campoId.setAttribute('type', 'number');
    campoId.setAttribute('placeholder', "Ingrese el ID");
    seccionIngreso.appendChild(campoId);

    let botonAceptarId = document.createElement('button');
    botonAceptarId.setAttribute('class', 'btn');
    botonAceptarId.textContent = 'Aceptar';
    seccionIngreso.appendChild(botonAceptarId);

    botonAceptarId.onclick = () =>{
      const existeProd = prods.some((prod) => prod.id == parseInt(campoId.value));

      if(existeProd){
        const prodEncontrado = prods.find((prod) => prod.id == parseInt(campoId.value));
        if(prodEncontrado.cantidad >0){
          eliminarStockProducto(prodEncontrado);
        }else{
          Swal.fire({
            icon: 'error',
            text: 'El id ingresado no corresponde a un producto del stock',
          })
          eliminarProducto();
        }
      }else{
        Swal.fire({
          icon: 'error',
          text: 'El id ingresado no corresponde a un producto del stock',
        })
        eliminarProducto();
      }
    }
  
    seccionIngreso.appendChild(botonBackModStock);
  }
}

function modificarStock (){
  if(seccionIngreso != null){
    seccionIngreso.innerHTML = '';

    const btnAgregar = document.createElement('button');
    btnAgregar.setAttribute('class', 'btn');
    btnAgregar.textContent = "Agregar Producto";
    seccionIngreso.appendChild(btnAgregar);

    const btnEliminar = document.createElement('button');
    btnEliminar.setAttribute('class', 'btn');
    btnEliminar.textContent = "Eliminar Producto";
    seccionIngreso.appendChild(btnEliminar);

    seccionIngreso.appendChild(botonBack);//va al menú vendedor

    btnAgregar.addEventListener('click', agregarProducto);

    btnEliminar.addEventListener('click', eliminarProducto);
  }
}

function aumentarPrecios(){
  if(seccionIngreso != null){
    seccionIngreso.innerHTML = '';
    seccionIngreso.innerHTML += '<input type="number" class="inputs" id="porcentaje" placeholder="Ingrese el porcentaje">';
    seccionIngreso.innerHTML += '<button class="btn" id="botonAceptar">Aceptar</button>';
    //traigo los productos y el carrito del localStorage
    let array = JSON.parse(localStorage.getItem('productos'));

    let porcentaje = document.getElementById('porcentaje');

    let btnAceptar = document.getElementById('botonAceptar');

    /**/ btnAceptar.onclick = () =>{
      //actualizo el precio de los productos
      if(porcentaje != null && porcentaje.value != 0 && porcentaje.value != ''){
        const arrayMod = array.map(producto => {
            return{
              id: producto.id,
              nombre: producto.nombre,
              foto: producto.foto,
              categoria: producto.categoria,
              precio: producto.precio + (producto.precio * parseFloat(porcentaje.value) / 100),
              cantidad: producto.cantidad
            }
          
        });
        localStorage.setItem('productos', JSON.stringify(arrayMod));

        //actualizo los precios del carrito:
        if(JSON.parse(localStorage.getItem('Carrito')) != null){
          let arrayCarrito = JSON.parse(localStorage.getItem('Carrito'));

          const carroMod = arrayCarrito.map(producto =>{
            return{
              id: producto.id,
              nombre: producto.nombre,
              foto: producto.foto,
              categoria: producto.categoria,
              precio: producto.precio + (producto.precio * parseInt(porcentaje.value) / 100),
              cantidad: producto.cantidad
            }
          });

          localStorage.setItem('Carrito', JSON.stringify(carroMod));
        }

        Swal.fire({
          icon: 'success',
          title: 'Precios modificados',
        })
        aumentarPrecios();

        localStorage.setItem('mod', 'si');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Ingrese un porcentaje válido',
        })
        aumentarPrecios();
    }
    }//fin btn
  }
  seccionIngreso.appendChild(botonBack);
}

function cerrarSesion(){
  localStorage.setItem('ingresoActivo', 'no');
}

function limpiarCarro(){

  const arrProductos = JSON.parse(localStorage.getItem('productos'));
  const arrCarrito = JSON.parse(localStorage.getItem('Carrito'));
  
  //Sumo la cantidad de cada producto del carro a los productos del stock
  arrCarrito.forEach(elementCarro => {
    for(const prod of arrProductos){
      if(elementCarro.id == prod.id){
        prod.cantidad += elementCarro.cantidad;
        break;
      }
    }
  });
  //guardo el array en el storage;
  localStorage.setItem('productos', JSON.stringify(arrProductos));

  localStorage.removeItem('Carrito');
}

function menuVendedor(){
  if(seccionIngreso != null){
    seccionIngreso.innerHTML = '';
    seccionIngreso.classList.add("gap-1");
    seccionIngreso.innerHTML += "<h1>Seleccione una opción</h1>";
  
    const botonStock = document.createElement('button');
    botonStock.setAttribute('class', 'btn');
    botonStock.textContent = "Modificar Stock";
    seccionIngreso.appendChild(botonStock);

    const botonPrecios = document.createElement('button');
    botonPrecios.setAttribute('class', 'btn');
    botonPrecios.textContent = "Aumentar/disminuir Precios";
    seccionIngreso.appendChild(botonPrecios);

    const botonCerrar = document.createElement('button');
    botonCerrar.setAttribute('class', 'btn');
    botonCerrar.textContent = "Cerrar Sesión";
    seccionIngreso.appendChild(botonCerrar);

    botonStock.addEventListener('click', modificarStock);
    botonPrecios.addEventListener('click', aumentarPrecios);
    botonCerrar.addEventListener('click', cerrarSesion);
  }
}

const botonCerrar2 = document.createElement('button');
botonCerrar2.setAttribute('class', 'btn');
botonCerrar2.textContent = "Cerrar sesión";
botonCerrar2.addEventListener('click', cerrarSesion);

function menuComprador(){
  if(seccionIngreso != null){
    const productosGuardados = JSON.parse(localStorage.getItem('Carrito'));
    if(productosGuardados != null){
      seccionIngreso.innerHTML = '';
      seccionIngreso.innerHTML +=`
      <h4>CARRITO</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <td scope="col">ID</td>
            <td scope="col">Nombre</td>
            <td scope="col">Cantidad</td>
            <td scope="col">Precio</td>
          </tr>
        </thead>
      </table>`
      
      if(productosGuardados != null){
        for(const producto of productosGuardados){
          if(producto != null){
            seccionIngreso.innerHTML +=`
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">${producto.id}</th>
                  <td>${producto.nombre}</td>
                  <td>${producto.cantidad}</td>
                  <td>${producto.precio}</td>
                </tr>
            </table>`;
          }
        }
  
        const total = productosGuardados.reduce((suma, prod) => suma + (prod.precio * prod.cantidad), 0);
  
        seccionIngreso.innerHTML += '<label class="text-white">Total a pagar:</label>'+total;
      }

      const botonLimpiar = document.createElement('button');
      botonLimpiar.innerText = "Limpiar carro";
      botonLimpiar.className = "btn m-2";
      botonLimpiar.addEventListener('click', limpiarCarro);
      seccionIngreso.appendChild(botonLimpiar);
      seccionIngreso.appendChild(botonCerrar2);

    }else{
      const carritoVacio = document.createElement('h2');
      carritoVacio.textContent = "Carrito de compras vacío";
      seccionIngreso.appendChild(carritoVacio);
      seccionIngreso.appendChild(botonCerrar2);
    }
  }
}

function validarVendedor(selector, campoUsuario, campoContrasenia){
  if((selector == 'Vendedor') && (campoUsuario == localStorage.getItem('usuario')) && (campoContrasenia == localStorage.getItem('contrasenia'))){
    Swal.fire({
      title: 'Bienvenido',
    })
    localStorage.setItem('ingresoActivo', 'vendedor');
    menuVendedor();
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
    })
    login();
  }
}

function validarComprador(selector, campoUsuario, campoContrasenia){
  if((selector == 'Comprador') && (campoUsuario == localStorage.getItem('userComprador')) && (campoContrasenia == localStorage.getItem('contraComprador'))){
    Swal.fire({
      title: 'Bienvenido',
    })
    localStorage.setItem('ingresoActivo', 'comprador');

    menuComprador();
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
    })
    login();
  }
}

function login(){
  if(seccionIngreso != null){
    seccionIngreso.innerHTML = '';
    seccionIngreso.classList.add("gap-2");
    
/*  */
    seccionIngreso.innerHTML += '<input type="text" id="user" class="inputLogin" placeholder="Usuario"></input>';
    seccionIngreso.innerHTML += '<input type="password" id="password" class="inputLogin" placeholder="Contraseña"></input>';
    seccionIngreso.innerHTML += '<select id="selector" class="btn"> <option value="Comprador">Comprador</option> <option value="Vendedor">Vendedor</option></select>';
    seccionIngreso.innerHTML += '<button id="btnIngresar" class="btn">Ingresar</button>';
    
    let campoUsuario = document.getElementById("user");
    let campoContrasenia = document.getElementById("password"); 
    let selector = document.getElementById('selector');
    let botonIngresar = document.getElementById('btnIngresar');

/*     let campoUsuario = document.createElement('input');
    campoUsuario.setAttribute('class', 'inputLogin');
    campoUsuario.setAttribute('placeholder', "Usuario");
    campoUsuario.setAttribute('type', 'text');
    seccionIngreso.appendChild(campoUsuario);

    let campoContrasenia = document.createElement('input');
    campoContrasenia.setAttribute('class', 'inputLogin');
    campoContrasenia.setAttribute('placeholder', "Contraseña");
    campoContrasenia.setAttribute('type', 'password');
    seccionIngreso.appendChild(campoContrasenia);

    seccionIngreso.innerHTML += '<select id="selector" class="btn"> <option value="Comprador">Comprador</option> <option value="Vendedor">Vendedor</option></select>';
    let selector = document.getElementById('selector');

    let botonIngresar = document.createElement('button');
    botonIngresar.setAttribute('class', 'btn');
    botonIngresar.textContent = 'Ingresar';
    seccionIngreso.appendChild(botonIngresar); */

    botonIngresar.onclick = () =>{
      selector.value == 'Vendedor' ? validarVendedor(selector.value, campoUsuario.value, campoContrasenia.value) : validarComprador(selector.value, campoUsuario.value, campoContrasenia.value);
    }
  }
}

if(localStorage.getItem('ingresoActivo') == 'no'){
    login();
}else{
  switch (localStorage.getItem('ingresoActivo')){    
    case 'vendedor':
      menuVendedor();
      break;
    
    case 'comprador':
      menuComprador();
      break;
  }
}
