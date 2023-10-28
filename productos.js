let productos = [];

function obtenerJSON(){
    const URLJSON = '/MOCK_DATA.json';
    fetch(URLJSON)
        .then((result) => result.json())
        .then((products) => {
            productos = products;
            if(localStorage.getItem('mod') != 'si'){
                localStorage.setItem('productos', JSON.stringify(productos));
            }   
            
        })
        .catch((error) => console.log(error));
    
} 

obtenerJSON();