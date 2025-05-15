API REST para Localización de Farmacias
API REST que permite gestionar farmacias y encontrar la más cercana a una ubicación. Incluye operaciones CRUD completas y geolocalización.

Características
Buscar la farmacia más cercana a una ubicación
Obtener todas las farmacias registradas
Crear, actualizar y eliminar farmacias
Documentación con Swagger
Pruebas automatizadas
Geolocalización por IP
Requisitos
Node.js (v12 o superior)
MySQL (v5.7 o superior)
Instalación
Clonar este repositorio
Instalar las dependencias:
bash
npm install
Configurar la base de datos:
Crear una base de datos MySQL
Importar el archivo database/farmacias.sql
Configurar las credenciales en config/config.js
Iniciar el servidor:
bash
npm start
El servidor estará disponible en http://localhost:3000

Documentación de la API
La documentación de la API está disponible en formato Swagger en:

http://localhost:3000/api-docs
Endpoints
Farmacias
GET /api - Obtiene la ubicación por IP y redirecciona a la farmacia más cercana
GET /api/farmacias - Obtiene todas las farmacias
GET /api/farmacia?lat=<lat>&lon=<lon> - Obtiene la farmacia más cercana a las coordenadas
GET /api/farmacia/:id - Obtiene una farmacia por su ID
POST /api/farmacia - Crea una nueva farmacia
PUT /api/farmacia/:id - Actualiza una farmacia existente
DELETE /api/farmacia/:id - Elimina una farmacia
Ejemplo de uso
Obtener la farmacia más cercana a una ubicación:

bash
curl -X GET "http://localhost:3000/api/farmacia?lat=30.3&lon=10.0"
Crear una nueva farmacia:

bash
curl -X POST "http://localhost:3000/api/farmacia" \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Farmacia Nueva","ubicacion":"Calle Principal 123","latitud":30.4,"longitud":10.1}'
Pruebas
Para ejecutar las pruebas:

bash
npm test
Tecnologías utilizadas
Node.js
Express
MySQL
Sequelize ORM
Swagger
Mocha/Chai (testing)
GeoIP-lite (geolocalización)
Estructura del proyecto
.
├── config/               # Configuración de la aplicación
├── controllers/          # Controladores de la API
├── database/             # Scripts de base de datos
├── models/               # Modelos de datos
├── Routes/               # Rutas de la API
├── test/                 # Pruebas automatizadas
├── .gitignore            # Archivos ignorados por Git
├── CalculadorDistancia.js # Cálculo de distancia entre puntos
├── DistanciaMinima.js    # Lógica para encontrar la farmacia más cercana
├── index.js              # Punto de entrada de la aplicación
├── package.json          # Dependencias y scripts
└── README.md             # Documentación
Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

