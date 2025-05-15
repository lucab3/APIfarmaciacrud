const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../index');
const getDistanciaMinima = require('../../DistanciaMinima');
const getKilometers = require('../../CalculadorDistancia');

describe('Tests de la API de farmacias', function() {
  
  // Test de la función de cálculo de distancia
  describe('Cálculo de distancia', function() {
    it('La función getKilometers debe calcular la distancia correctamente', function() {
      const distancia = getKilometers(1.2, 3.2, 1.2, 3.1);
      expect(distancia).to.be.approximately(11.13, 0.01);
    });
  });
  
  // Test de la función de distancia mínima
  describe('Distancia mínima', function() {
    it('La función getDistanciaMinima debe seleccionar la farmacia más cercana', function() {
      const farmacias = [
        {id: 1, nombre: "Farmacia1", ubicacion: "Juan B justo 200", latitud: 1.2, longitud: 3.1},
        {id: 2, nombre: "Farmacia2", ubicacion: "Medrano 300", latitud: 10.2, longitud: 20.3}
      ];
      
      const resultado = getDistanciaMinima(1.2, 3.2, farmacias);
      expect(resultado.id).to.equal(1);
      expect(resultado).to.have.property('distancia');
    });
  });
  
  // Tests de integración con la API
  describe('API REST', function() {
    
    // Test de la ruta principal
    it('GET /api debería redirigir a la búsqueda de farmacia más cercana', function(done) {
      request(app)
        .get('/api')
        .expect(302) // Código de redirección
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.header.location).to.include('/api/farmacia?lat=');
          done();
        });
    });
    
    // Test de listado de farmacias
    it('GET /api/farmacias debería devolver todas las farmacias', function(done) {
      request(app)
        .get('/api/farmacias')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('farmacias');
          expect(res.body.farmacias).to.be.an('array');
          done();
        });
    });
    
    // Test de búsqueda de farmacia cercana
    it('GET /api/farmacia con coordenadas debería devolver la farmacia más cercana', function(done) {
      request(app)
        .get('/api/farmacia?lat=30.3&lon=10.0')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('farmacia');
          expect(res.body.farmacia).to.have.property('nombre');
          expect(res.body.farmacia).to.have.property('distancia');
          done();
        });
    });
    
    // Test de creación de farmacia
    let nuevaFarmaciaId;
    
    it('POST /api/farmacia debería crear una nueva farmacia', function(done) {
      const nuevaFarmacia = {
        nombre: "Farmacia Test",
        ubicacion: "Calle Test 123",
        latitud: 35.123456,
        longitud: -58.654321
      };
      
      request(app)
        .post('/api/farmacia')
        .send(nuevaFarmacia)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('farmacia');
          expect(res.body.farmacia).to.have.property('id');
          nuevaFarmaciaId = res.body.farmacia.id;
          done();
        });
    });
    
    // Test de obtención de farmacia por ID
    it('GET /api/farmacia/:id debería devolver una farmacia específica', function(done) {
      // Usamos el ID 1 asumiendo que existe en la base de datos
      request(app)
        .get('/api/farmacia/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('farmacia');
          expect(res.body.farmacia).to.have.property('id', 1);
          done();
        });
    });
    
    // Test de actualización de farmacia
    it('PUT /api/farmacia/:id debería actualizar una farmacia existente', function(done) {
      // Usamos el ID de la farmacia recién creada
      const actualizacion = {
        nombre: "Farmacia Test Actualizada"
      };
      
      request(app)
        .put(`/api/farmacia/${nuevaFarmaciaId}`)
        .send(actualizacion)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('success', true);
          expect(res.body.farmacia.nombre).to.equal("Farmacia Test Actualizada");
          done();
        });
    });
    
    // Test de eliminación de farmacia
    it('DELETE /api/farmacia/:id debería eliminar una farmacia', function(done) {
      // Usamos el ID de la farmacia recién creada
      request(app)
        .delete(`/api/farmacia/${nuevaFarmaciaId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('success', true);
          
          // Verificamos que la farmacia ya no existe
          request(app)
            .get(`/api/farmacia/${nuevaFarmaciaId}`)
            .expect(404, done);
        });
    });
  });
});
