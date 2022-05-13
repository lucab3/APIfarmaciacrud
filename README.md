# APIfarmaciacrud
Servicio API CRUD que permite obtener el negocio mas cercano a una ubicación de cliente y escribir registros de negocios en una base de datos

Para iniciar debemos instalar las dependencias de node_modules

Ejecutar en consola en nuestro proyecto
     npm install 

# Base de datos
La base de datos de pruebas se encuentra en la carpeta database/farmacias.sql, la cual es necesario importar en el administrador de base de datos a utilizar

# Servidor local:
Es necesario configurar si se utiliza un servidor local para que el servcio mysql este escuchando en el puerto :3307

# Iniciando
Para iniciar es necesario ejecutar npm start esperar a recibri el mensaje 'Servidor escuchando en puerto 3000'

# Ruteador Express:
URL,controlador

# Solicitud GET
    ("/api"), farmaciascontroller.index   

    ("/api/farmacia?lat=numero &lon=numero") ,farmaciascontroller.negociocercano

# Solicitud POST
    ("/api/farmacia") , farmaciascontroller.guardado

# Ejemplos de uso
Si enviamos una solicitud GET a
              
                "/api" 
obtendremos un redireccionamiento GET a
        "/api/farmacia?lat=latip&lon=latip"
pasandole en los argunemtos del query sring latip y lonip, la latitud y longitud obtenidas en base a la ip: "207.97.227.239", que se encuentra fija por testeo en un entorno local.
Si utilizamos el servicio de manera remota podemos reemplazar esta variable por
    let ip= 

        req.headers['x-forwarded-for'] ||

        req.connection.remoteAddress || 
        
        req.socket.remoteAddress || 
        
        req.connection.socket.remoteAddress;
Asi obtendremos la ip del browser que realiza la solicitud
al recibir la solicitud GET
           
            "/api/farmacia?lat=<latip>&long=<longip>
            
el metodo .negociocercano se encargara de:
	1.	guardar latitud y longitud en 2 variables
	2.	pedir los registros totales a la base de datos
	3.	enviar latitud,longitud y el array de negocios a la funcion getDistanciaMinima()
	4.	retornar el negocio mas cercano en relacion a nuestra latitud y longitud de cliente.
Si enviamos una solicitud POST en
         
          "/api/farmacia" 
que contenga un body respetando el modelo de:
       
        /models/farmacias.js
en formato JSON obtendremos el agregado de un registro a nuestra base de datos farmacias.sql
