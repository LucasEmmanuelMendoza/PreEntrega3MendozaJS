const productos = [
    {
       id: 1,
       nombre: 'Homero Buda',
       categoria: 'Los Simpson',
       precio: 1500,
       cantidad: 15
   },
   {
       id: 2,
       nombre: 'Groot',
       categoria: 'Marvel',
       precio: 1200,
       cantidad: 8
   },
   {
       id: 3,
       nombre: 'Pulpo',
       categoria: '-',
       precio: 1800,
       cantidad: 4
   },
   {
       id: 4,
       nombre: 'Yoda',
       categoria: 'Star Wars',
       precio: 1200,
       cantidad: 3
   },
   {
       id: 5,
       nombre: 'Zapatilla',
       categoria: '-',
       precio: 2500,
       cantidad: 5
   },
   {
       id: 6,
       nombre: 'Pulpo Chico',
       categoria: '-',
       precio: 1500,
       cantidad: 5
   },
   {
       id: 7,
       nombre: 'Iron Man',
       categoria: 'Marvel',
       precio: 2000,
       cantidad: 7
   },
   {
       id: 8,
       nombre: 'Bart Buda',
       categoria: 'Los Simpson',
       precio: 1500,
       cantidad: 10
   },
]; 

let carrito = [];

const seccionProductos = document.getElementById('contenedor');

function renderizarProductos(listaProductos){
 for(const prod of listaProductos){
   seccionProductos.innerHTML += `
   <div class="card" style="width: 18rem;">
           <div class="card-body">
               <h5 class="card-title">${prod.nombre}</h5>
               <h3 class="card-text categoria">${prod.categoria}</h3>
               <p class="card-text">$ ${prod.precio}</p>
               <button id=${prod.id} class="btn btn-primary compra boton">Comprar</button>
           </div>
   </div>
   `
 }
}

renderizarProductos(productos); 
