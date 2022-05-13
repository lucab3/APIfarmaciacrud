module.exports = function (sequelize,dataTypes) {
    let alias = "farmacias"
    
    let cols = { 
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: dataTypes.STRING
        },
        ubicacion:{
            type: dataTypes.STRING
        },
        latitud: {
            type: dataTypes.DECIMAL
        },
        longitud: {
            type: dataTypes.DECIMAL
        },

    }
    let config = {
        tableName: "farmacias",
        timestamps: false
    }

    let farmacias = sequelize.define(alias,cols,config);

    return farmacias
}