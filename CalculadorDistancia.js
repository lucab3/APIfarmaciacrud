let getKilometers = require('./CalculadorDistancia')

function getDistanciaMinima(lat, lon, arrayNegocios) {
  let latitud = lat
  let longitud = lon
  let Negocios = arrayNegocios
  let min = Infinity
  let negocioMasCerca = null
  
  for (let i = 0; i < arrayNegocios.length; i++) {
    let distancia = getKilometers(latitud, longitud, Negocios[i].latitud, Negocios[i].longitud)
    
    if (distancia < min) {
      min = distancia
      negocioMasCerca = Negocios[i]
    }
  }
  
  // Agregar la distancia calculada al objeto de respuesta
  if (negocioMasCerca) {
    negocioMasCerca.distancia = min.toFixed(2)
  }
  
  return negocioMasCerca
}

module.exports = getDistanciaMinima
