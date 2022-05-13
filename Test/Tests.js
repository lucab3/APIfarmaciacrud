const request = require ('supertest' );
const test = require ('ava');
const http = require ( 'ava-http');
const getDistanciaMinima = require('../DistanciaMinima');
const getKilometers = require ('../CalculadorDistancia');
const routescontroller = require('../controllers/routesController');
const describe = require ( 'ava-describe');



//prueba ava

test ('should pass',(t)=>{
    t.pass()
})
 
//prueba de calculo de distancia minima

test ('no hay ',(t)=> {
    
    t.is(getDistanciaMinima(3.1,1.2,[{id:1,nombre:"farmacia1",ubicacion:"juan b justo 200",longitud:3.8,latitud:1.2},{
        id:2,nombre:"farmacia1",ubicacion:"juan b justo 200",longitud:38,latitud:-30.1 
    }])
    , {id:1,nombre:"farmacia1",ubicacion:"juan b justo 200",longitud:30.1,latitud:10.2})
})


//  Pueba funcion para obtener la distancia entre 2 puntos 

test ('la funcion calcula la distancia',(t)=>{
    t.is(getKilometers(1.2,3.2,1.2,3.1), 11.129507658317547)
})

// prueba POST CREATE

