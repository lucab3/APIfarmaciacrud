const express = require('express');
const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Inicializar Express
const app = express();

// Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Farmacias',
      version: '1.0.0',
      description: 'API REST para gestionar farmacias y encontrar las más cercanas a una ubicación',
      contact: {
        name: 'Desarrollador',
        email: 'info@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ]
  },
  apis: ['./Routes/*.js'], // Ruta a los archivos con anotaciones de Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuración de la aplicación
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
const apiRouter = require('./Routes/Api');
app.use('/api', apiRouter);

// Manejador de rutas no encontradas
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Mostrar errores sólo en desarrollo
  const error = req.app.get('env') === 'development' ? err : {};
  
  // Responder con el código de estado del error o 500
  const status = err.status || 500;
  
  res.status(status).json({
    success: false,
    error: {
      message: err.message,
      status: status
    }
  });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`✅ Servidor API REST ejecutándose en: http://localhost:${port}`);
  console.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api-docs`);
});

module.exports = app;
