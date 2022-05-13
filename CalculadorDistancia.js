getKilometers = function (latcliente,longcliente,latfarmacia,longfarmacia){
    rad = function (x) {return x*Math.PI/180;}
    var R= 6378.137; //radio de la tierra en km
    var dLat = rad (latfarmacia-latcliente);
    var dLong = rad (longfarmacia - longcliente);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(latcliente)) * 
    Math.cos(rad(latfarmacia)) * Math.sin(dLong/2) *Math.sin(dLong/2);
    var c = 2 * Math.atan2 (Math.sqrt(a), Math.sqrt (1-a));
    var d = R * c;
    return d
}
module.exports = getKilometers;