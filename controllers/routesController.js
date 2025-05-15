let db = require("../models/index");
let getDistanciaMinima = require("../DistanciaMinima");
var geoip = require('geoip-lite');

let routescontroller = {
    // Ruta principal - obtener ubicación por IP y redirigir
    index: function(req, res) {
        // En entorno de producción, usaríamos la IP real del cliente
        let ip = req.headers['x-forwarded-for'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress || 
                req.connection.socket.remoteAddress || 
                "207.97.227.239"; // IP por defecto para testing
        
        console.log("IP del cliente:", ip);
        var geo = geoip.lookup(ip);
        console.log("Geolocalización:", geo);
        
        if (geo && geo.ll) {
            res.redirect('/api/farmacia?lat=' + geo.ll[0] + '&lon=' + geo.ll[1]);
            console.log('Redirigiendo a:', '/api/farmacia?lat=' + geo.ll[0] + '&lon=' + geo.ll[1]);
        } else {
            // En caso de no poder obtener la geolocalización
            res.status(400).json({ error: "No se pudo obtener la geolocalización" });
        }
    },
    
    // Obtener farmacia más cercana
    negociocercano: function(req, res) {
        let lon = req.query.lon; // Longitud desde querystring
        let lat = req.query.lat; // Latitud desde querystring
        
        if (!lon || !lat) {
            return res.status(400).json({ error: "Se requieren parámetros de latitud y longitud" });
        }
        
        db.farmacias.findAll()
            .then(function(arrayNegocios) {
                if (!arrayNegocios || arrayNegocios.length === 0) {
                    return res.status(404).json({ error: "No hay farmacias registradas" });
                }
                
                const resultado = getDistanciaMinima(lat, lon, arrayNegocios);
                res.json({
                    success: true,
                    farmacia: resultado,
                    mensaje: `Farmacia más cercana: ${resultado.nombre} (${resultado.distancia} km)`
                });
            })
            .catch(function(error) {
                console.error("Error al buscar farmacias:", error);
                res.status(500).json({ error: "Error al procesar la solicitud" });
            });
    },
    
    // Obtener todas las farmacias
    listarFarmacias: function(req, res) {
        db.farmacias.findAll()
            .then(function(farmacias) {
                res.json({
                    success: true,
                    farmacias: farmacias
                });
            })
            .catch(function(error) {
                console.error("Error al listar farmacias:", error);
                res.status(500).json({ error: "Error al procesar la solicitud" });
            });
    },
    
    // Obtener farmacia por ID
    obtenerFarmacia: function(req, res) {
        const id = req.params.id;
        
        db.farmacias.findByPk(id)
            .then(function(farmacia) {
                if (!farmacia) {
                    return res.status(404).json({ error: "Farmacia no encontrada" });
                }
                
                res.json({
                    success: true,
                    farmacia: farmacia
                });
            })
            .catch(function(error) {
                console.error("Error al obtener farmacia:", error);
                res.status(500).json({ error: "Error al procesar la solicitud" });
            });
    },
    
    // Agregar nueva farmacia
    guardado: function(req, res) {
        // Validar que los campos requeridos estén presentes
        if (!req.body.nombre || !req.body.ubicacion || !req.body.latitud || !req.body.longitud) {
            return res.status(400).json({ 
                success: false, 
                error: "Todos los campos son requeridos (nombre, ubicacion, latitud, longitud)" 
            });
        }
        
        db.farmacias.create({
            nombre: req.body.nombre,
            ubicacion: req.body.ubicacion,
            latitud: req.body.latitud,
            longitud: req.body.longitud
        })
        .then(function(farmacia) {
            // En API REST, es mejor devolver el recurso creado con su ID
            res.status(201).json({
                success: true,
                farmacia: farmacia,
                mensaje: "Farmacia creada exitosamente"
            });
        })
        .catch(function(error) {
            console.error("Error al crear farmacia:", error);
            res.status(500).json({ error: "Error al procesar la solicitud" });
        });
    },
    
    // Actualizar farmacia existente
    actualizar: function(req, res) {
        const id = req.params.id;
        
        // Validar que al menos un campo a actualizar esté presente
        if (!req.body.nombre && !req.body.ubicacion && !req.body.latitud && !req.body.longitud) {
            return res.status(400).json({ 
                success: false, 
                error: "Se requiere al menos un campo para actualizar" 
            });
        }
        
        // Buscar la farmacia primero para verificar que existe
        db.farmacias.findByPk(id)
            .then(function(farmacia) {
                if (!farmacia) {
                    return res.status(404).json({ error: "Farmacia no encontrada" });
                }
                
                // Crear objeto con los campos a actualizar
                const dataToUpdate = {};
                if (req.body.nombre) dataToUpdate.nombre = req.body.nombre;
                if (req.body.ubicacion) dataToUpdate.ubicacion = req.body.ubicacion;
                if (req.body.latitud) dataToUpdate.latitud = req.body.latitud;
                if (req.body.longitud) dataToUpdate.longitud = req.body.longitud;
                
                // Actualizar la farmacia
                farmacia.update(dataToUpdate)
                    .then(function(farmaciaActualizada) {
                        res.json({
                            success: true,
                            farmacia: farmaciaActualizada,
                            mensaje: "Farmacia actualizada exitosamente"
                        });
                    })
                    .catch(function(error) {
                        console.error("Error al actualizar farmacia:", error);
                        res.status(500).json({ error: "Error al procesar la solicitud" });
                    });
            })
            .catch(function(error) {
                console.error("Error al buscar farmacia:", error);
                res.status(500).json({ error: "Error al procesar la solicitud" });
            });
    },
    
    // Eliminar farmacia
    eliminar: function(req, res) {
        const id = req.params.id;
        
        // Buscar la farmacia primero para verificar que existe
        db.farmacias.findByPk(id)
            .then(function(farmacia) {
                if (!farmacia) {
                    return res.status(404).json({ error: "Farmacia no encontrada" });
                }
                
                // Eliminar la farmacia
                farmacia.destroy()
                    .then(function() {
                        res.json({
                            success: true,
                            mensaje: "Farmacia eliminada exitosamente"
                        });
                    })
                    .catch(function(error) {
                        console.error("Error al eliminar farmacia:", error);
                        res.status(500).json({ error: "Error al procesar la solicitud" });
                    });
            })
            .catch(function(error) {
                console.error("Error al buscar farmacia:", error);
                res.status(500).json({ error: "Error al procesar la solicitud" });
            });
    }
};

module.exports = routescontroller;
