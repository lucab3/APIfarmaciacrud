let db = require("../models/index");
let getDistanciaMinima = require ("../DistanciaMinima");
var geoip = require('geoip-lite');




let routescontroller =  {
         index: function(req,res){
            
            let ip ="207.97.227.239"
            console.log(ip)
            var geo= geoip.lookup(ip)
            console.log (geo)
            res.redirect('/api/farmacia?lat=' + geo.ll[0] + '&lon=' + geo.ll[1])
            console.log( 'redirect to ','/api/farmacia?lat=' + geo.ll[0] + '&lon=' + geo.ll[1]) 
         },

    
       
    negociocercano: function (req,res){
        let lon = req.query.lon //recibo longitud de querystring en el request
        let lat = req.query.lat // recibo latitud de querystring en el request
       
        db.farmacias.findAll()
            .then(function (arrayNegocios) {
              const resultado = getDistanciaMinima(lat, lon, arrayNegocios)
                 res.json(resultado)
            })
        
       
    },
    
    guardado: function (req,res){
        db.farmacias.create({
            nombre: req.body.nombre ,
            ubicacion: req.body.ubicacion ,  
            latitud: req.body.latitud , 
            longitud: req.body.longitud , 
           
        });
        res.redirect("/api") 
       
    },

}

 module.exports = routescontroller;
 