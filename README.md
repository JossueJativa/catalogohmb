# Creación de API de catálogos e ingredientes necesarios para Hamburguesas

Para la aplicación siguiente se mostraran las rutas y los mensajes que tocaran en cada categoría de aplicación:

> 200: Ok <br>
> 201: Created <br>
> 400: Error en completado <br>
> 404: No existe <br>
> 500: Error de servidor

Como ya se saben los errores que pueden salir, estos mismos llegaran con un mensaje referente a lo que falta de completar o el error por medio de un `msg` que es la palabra clave para leer el mensaje de error.

## Rutas
Las rutas llegan a ser las siguientes:
```
> /api/ingredientes
> /api/catalogo
```

todas las rutas están establecidas con un CRUD predefinido, es decir que existe:
* GET
* GET con ID
* POST
* PUT con ID
* DELETE con ID

Lo que se hizo en el servidor es que con el get general se puso un limite y un desde donde se quiere sacar la información, y si se quiere ampliar esto, que por defecto esta con `limite = 10` y `desde = 0` se necesitara enviar parámetros desde el query (`Ruta`) el limite y el desde donde desea sacar la información.

## Middlewares
Los middlewares que se utilizan, están conectados a middlewares ya establecidos con `express` para que facilite la comunicación entre cliente y servidor.

## Notas de las rutas con id
Recordar que si una ruta necesita un ID en el query (`Ruta`), este se va a enviar con el dígito que se muestra al crear o al obtener la data mediante el get general

## Requisitos necesarios para realizar POST
Para realizar un guardado en la base de datos local que se almacenen la información, se necesitara la siguiente palabras claves con su tipo de dato:
* Ingredientes
```
{
    "name" : String()
}
```
* Catalogo:
```
{
    "nombre" : String(),
    "descripcion": String(),
    "precio": float(),
    "stock": int(),
    "imagen": String(),
    "id_ingredientes": List<int>()
}
```

Para el PUT no es necesario enviar todo los datos, ya que se verifica que dato se envía y se actualiza nada más la palabra clave que envió con su dato.

## Como usar el limit y desde
Este se usara de la siguiente forma:
* Al poner la ruta, por ejemplo de ingredientes, se pondrá al final: `?limit=5&desde=0` para poder modificar los limites y de donde se enviara la información, sabiendo que 0 es desde el primer dato encontrado de la base de datos y el limite es hasta cuantos datos desea mostrar en la aplicación.

## Como correr el aplicativo
Al momento de correr el aplicativo, ya que se trata de un proyecto en node, hay que tener lo siguiente en cuenta:
* Iniciar el proyecto
* Correr el proyecto con las dependencias listas
```
> npm init
> node app.js
```

el `npm init` sirve para descargar todas las dependencias que se necesita de node en el proyecto, y `node app.js` sirve para correr el proyecto de forma correcta.