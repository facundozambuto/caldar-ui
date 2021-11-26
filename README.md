# Modelos Computacionales de Gestión Administrativa

Segundo parcial. Fecha de entrega: 26/11/2021. 


## Comenzando 🚀

Desarrollar una aplicación web que cumpla con los siguientes requisitos:

● Debe estar desarrollada con React utilizando el CLI de create-react-app. 

● Contar con una lista de recursos siguiendo la lógica de un ABM. :heavy_check_mark:

● Debe contar con una librería para el manejo de formularios. (sugerencia final-form) :heavy_check_mark:

● Debe contar con un layout, el cual debe contener: :heavy_check_mark:
    ○ Header
    ○ NavBar (barra de navegación)
    ○ Body o contenido
    ○ Footer

● Debe contar con más de 1 ruta navegable. :heavy_check_mark:

● La app debe tener AL MENOS 2 pantallas: :heavy_check_mark:
    ○ Home: Esta debe contar con los nombres de los integrantes y el nombre de la
    aplicación. Es básicamente para poder probar el ruteo de la aplicación.
    ○ Recurso: en esta pantalla deberán mostrar la lista de recursos con la lógica del
    AMB (si trabajan solos, solo deberán tener home y la del recurso trabajado) para
    poder evidenciar la navegación dentro de la app. 

● Debe contar con componentes tanto para el Header, Body y Footer, como también un
componente para la tabla. A su vez, estos componentes deben utilizar componentes
compartidos, como ser: botones, inputs, modal etc. Estos componentes deben contar
con sus archivos .css, preferentemente utilizando CSS modules. :heavy_check_mark:

● Debe contar con formularios a la hora de realizar un POST, un DELETE o un UPDATE
de un nuevo recurso a la lista. :heavy_check_mark:

● Debe contar con modals cuando se solicite agregar, eliminar o modificar un recurso a la
lista. Dentro de los modals se deberá mostrar el formulario y/o el mensaje de
confirmación de eliminación o actualización de un recurso. :heavy_check_mark:

● Cada formulario debe contar con las validaciones correspondientes para evitar agregar
nuevos recursos con datos erróneos o sin datos. :heavy_check_mark:

● Debe ser posible realizar las diferentes request (GET, POST, PUT, DELETE) desde el
ABM de cada recurso. :heavy_check_mark:

● Debe contar con un archivo donde se haga la configuración inicial del store de Redux. :heavy_check_mark:

● Debe contar con un reducer por cada recurso y un rootReducer. :heavy_check_mark:

● Debe contar con un archivo de actions por cada recurso. :heavy_check_mark:

● Debe contar con un archivo de types (constantes) para las actions. :heavy_check_mark:

● Debe contar con el uso de action creators utilizando la librería Redux Thunk, los cuales
son necesarios para realizar la conexión del FE con el BE. Para esto, deberán utilizar la
API ya realizada para el primer parcial. :heavy_check_mark:

● El proyecto del servidor debe estar subido a un repositorio de Github a nombre del
alumno (o uno de los alumnos del grupo) :heavy_check_mark:

● Debe contar con un readme con los pasos a seguir para poder ejecutar correctamente la
aplicación, URL del repositorio y nombre del alumno. :heavy_check_mark:

● El repositorio debe contener código prolijo, segmentado en commits. :heavy_check_mark:

● En caso de trabajar en grupo, todos los integrantes deberán contar con commits a su
nombre, caso contrario no se podrá considerar que ese alumno haya trabajado en el
proyecto.

● Creación de una colección de Postman con todos los métodos del servidor documentados,
listos para ser testeados. :heavy_check_mark:


El proceso de evaluación será:

1. Abrir la URL que se provee a la hora de levantar el proyecto.

2. Mostrar los diferentes métodos solicitados. Esto quiere decir, obtener, agregar, modificar
y eliminar un recurso.

3. Mostrar los formularios para agregar y modificar los recursos, con sus respectivas
validaciones.

4. Mostrar los modals creados para mostrar tanto los formularios previamente
mencionados, como también los modals de confirmación a la hora de agregar o eliminar
un nuevo recurso.

5. Utilizando la herramienta Redux devtools, deberán mostrar las acciones que se
despachan cuando realizan las diferentes acciones, por ejemplo, la de GET.

6. Revisar la calidad del código del frontend en Github y que el alumno tenga commits a
su nombre.

7. Revisar el correcto entendimiento de las funcionalidades desarrolladas, revisando el
código y charlando sobre el flujo de datos en la aplicación.


## Colección / Entidad / 📋

Utilizando MongoDB, Atlas y Mockaroo se constituyó una base de datos no relacional con una colección de "Boilers" con la que realizó un CRUD con React y diferentes librerías.

El formato de dicha colección se puede ver en el siguiente ejemplo:

```
{
  "boilerId": "Caldera X",
  "brand": "Jit Calderas",
  "temperature": 258,
  "capacity": 78,
  "madeDate": "2021-10-11T02:59:28.116Z",
  "created_at": "2021-10-11T02:59:28.116Z"
}
```

## Documentación de API :notebook_with_decorative_cover:

En el siguiente link (repositorio del parcial, rama "develop") puede encontrarse la colección de Postman con la API documentado y con data para realizar pruebas. La URL de cada request ya está actualizada con la desplegada en Heroku:

https://github.com/facundozambuto/parcialMCGA2021/blob/develop/api/resources/ParcialMCGA2021.postman_collection.json

## Instalación 📦

1. Clonar el repo
   ```sh
   git clone https://github.com/facundozambuto/caldar-ui
   ```
2. Installar paquetes NPM
   ```sh
   npm install (Versión de NodeJS v14.17.5)
   ```
3. Run
   ```sh
    npm run dev
   ```
4. Utilizar admin/admin como cuenta de testing para loguearse.


## Despliegue 📦

El deployment fue realizado en Heroku y se puede acceder a la UI a través de la URL https://caldar-ui.herokuapp.com/

## Construido con 🛠️

* NodeJS
* Express
* MongoDB
* React

También se utilizó:

* React Bootstrap
* React Router DOM
* React Redux
* Moment
* React Fontawesome
* React Icons
* React Axios
* Redux Thunk

## Versionado 📌

Se creo un repositorio en GitHub https://github.com/facundozambuto/caldar-ui con varias ramas siendo las principales "develop" la cual es la desplegada en Heroku.

## Autor ✒️

* **Facundo Zambuto** - *Segundo Parcial* - [facundozambuto](https://github.com/facundozambuto)
