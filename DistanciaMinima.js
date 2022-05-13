let getKilometers = require('./CalculadorDistancia')

function getDistanciaMinima(lat, lon, arrayNegocios) {
  let latitud = lat
  let longitud = lon
  let Negocios = arrayNegocios
  let min = Infinity
  let idMinAux
  let negocioMasCerca
  for (let i = 0; i < arrayNegocios.length; i++) {
    if (getKilometers(latitud, longitud, Negocios[i].latitud, Negocios[i].longitud) < min) {
      min = getKilometers(latitud, longitud, Negocios[i].latitud, Negocios[i].longitud)
       //corregir logica del loop esta quedando seleccionado siempre el primero aunque min se guarda bien
      idMinAux = Negocios[i].id
      
      negocioMasCerca = Negocios[i]
    }
    
  }
  return negocioMasCerca
}

module.exports = getDistanciaMinima
