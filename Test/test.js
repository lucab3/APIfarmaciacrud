'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/api';


// para ejecutar este test es preciso remplazar en routescontroller.guardado la response:
// por res.send (200,'se inserto una farmacia')
describe('insertar una farmacia: ',()=>{
	it('deberia insertar una farmacia', (done) => {
	chai.request(url)
	.post('/farmacia')
	.send({id:0, nombre:"farmacia0", ubicacion: "algo1123", latitud: 10,longitud:1})
	.end( function(err,res){
	console.log(res.body)
	expect(res).to.have.status(200);
	done();
	});
	});
   })

describe('Error al insertar una farmacia',()=>{

	it('deberia recibir error', (done) => {
		chai.request(url)
			.post('/farmacia')
			.send({id:0, nombre:"farmacia0", ubicacion: "algo1123", latitud: 10,longitud:1})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(500);
				done();
			});
	});

});

