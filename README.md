[NORISK-ARGENTINA](http://noriskergentina.com.ar/)

## -2016- Sitio Web creado con MEAN.JS
[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)
MEAN.JS es una solución open-source full-stack JavaScript, lo que proporciona un punto de partida sólido para aplicaciones basada en [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/). La idea es resolver los problemas comunes en la conexión de los framework y construir un full-stack sólido para soportar las necesidades de desarrollo diarias. Por último ayudar a los desarrolladores a utilizar mejores prácticas de desarrollo mientras se trabaja con componentes populares de JavaScript. 

## Antes de empezar 
Antes de empezar le recomendamos que lea acerca de los elementos básicos que ensamblan una aplicación MEAN.JS: 
* MongoDB - Ir a [MongoDB Official Website](http://mongodb.org/) y proceder a su [Official Manual](http://docs.mongodb.org/manual/), lo que debería ayudar a entender un poco más acerca de base de datos NoSQL y MongoDB.
* Express - La mejor manera de entender Express es a través de su [Official Website](http://expressjs.com/), que tiene una [Guía de inicio](http://expressjs.com/starter/installing.html), así como una [ExpressJS Guide](http://expressjs.com/guide/error-handling.html) guía de temas generales. También puede ir a [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) para más recursos.
* AngularJS - Angular del [Angular JS Sitio oficial](http://angularjs.org/) es un buen punto de partida. También puede utilizar [Thinkster Popular Guide](http://www.thinkster.io/), y los [Egghead Videos](https://egghead.io/).
* Node.js - Empieza por [Node.js sitio oficial](http://nodejs.org/) y [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), para entender acerca de NodeJS.


## Requisitos previos
Asegúrese de haber instalado en su equipo las siguientes herramientas de trabajo.
* Node.js - [Descargar & Instalar Node.js](http://www.nodejs.org/download/) y el gestor de paquetes npm , si se encuentra con algún problema, usted puede utilizar [GitHub Gist](https://gist.github.com/isaacs/579814) para instalar Node.js.
* MongoDB - [Descargar & Instalar MongoDB](http://www.mongodb.org/downloads), y asegúrese de que se está ejecutando en el puerto predeterminado (27017).
* Bower - Usted va a utilizar [Bower Package Manager](http://bower.io/) para gestionar sus paquetes de aplicaciones de usuario, con el fin de instalarlo asegúrese de haber instalado previamente Node.js y npm, a continuzación, instalar bower a nivel global mediante npm:

```
$ npm install -g bower
```

* Grunt - Va a utilizar [Grunt Task Runner](http://gruntjs.com/) para automatizar su proceso de desarrollo, con el fin de instalarlo asegúrese de haber instalado previamente Node.js y npm, a continuzación, instalar grunt a nivel global mediante npm:

```
$ sudo npm install -g grunt-cli
```

## Descargar MEAN.JS
Hay varias formas de obtener MEAN.JS: 

### Yo Generator 
La forma recomendada sería utilizar [Yo Generator oficial](http://meanjs.org/generator.html) que generará la última copia estable de MEAN.JS.

### Clonar desde el repositorio de GitHub
También puede utilizar Git para clonar el respositorio MEAN.JS directamente:
```
$ git clone https://github.com/meanjs/mean.git meanjs
```
Esto clonará la versión mas reciente del repositorio MEAN.JS en la carpeta **meanjs**. Si desea cambiar en nombre de la carpeta usted puede hacer también:
```
$ git clone https://github.com/meanjs/mean.git 'nombre-de-la-carpeta'
```

### Descargar el archivo .zip del repositorio 
Otra forma de utilizar MEAN.JS es descargar una copia desde [master branch on GitHub](https://github.com/meanjs/mean/archive/master.zip). También puede utilizar el comando `wget`:
```
$ wget https://github.com/meanjs/mean/archive/master.zip -O meanjs.zip; unzip meanjs.zip; rm meanjs.zip
```
No se olvide de renombrar **mean-master** después con su nombre de proyecto.

## Instalación rápida
Una vez que haya descargado todos los requisitos previos, está solo a unos pasos para comenzar a desarrollar su aplicación MEAN.JS

Lo primero que debe hacer es instalar las dependencias Node.js. El modelo viene pre-empaquetado en un archivo package.json que contiene la lista de módulos que necesita para iniciar la aplicación, para aprender más sobre los módulos instalados lea la seccion NPM & Package.json.

Para instalar las dependencias Node.js va a utilizar npm de nuevo, en la carpeta de la aplicación ejecute el siguiente comando:

```
$ npm install
```

Este comando hace un par de cosas:
* En primer lugar, se instalarán las dependencias necesarias para la aplicación se ejecute.
* Si se está ejecutando en un entorno de desarrollo, entonces también se va a instalar las dependencias de desarrollo necesarias para testing y la ejecución de la aplicación.
* Por último, cuando el proceso de instalación haya terminado, ejecutar el siguiente comando en la terminal para instalar todos los modúlos necesesarios para el front-end de la aplicación.

```
$ bower install
```

## Iniciar la aplicación
Si todo ha ido bien después de haber realizado todas las instalaciones usted debe ser capaz de ejecutar la aplicación utilizando Grunt, basta con ejecutar en la carpeta del proyecto, el siguiente comando:

```
$ grunt
```

Su aplicación debe ejecutarse en el puerto 3000, en su navegador visite [http://localhost:3000](http://localhost:3000)
                            
¡Eso es, felicitaciones! su aplicación debería estar funcionando por ahora, para continuar con su desarrollo comprobar las otras secciones de esta documentación. Si encuentra algún problema tratar la sección solución de problemas.

## Desarrollo y desarrollo With Docker

* Instalar [Docker](http://www.docker.com/)
* Instalar [Fig](https://github.com/orchardup/fig)

* El desarrollo local y testing: 
```bash
$ fig up
```

* El desarrollo local y testing with just Docker:
```bash
$ docker build -t mean .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
$
```

* Para habilitar live reload adelante del puerto 35729 y montar /app y /public como volúmenes:
```bash
$ docker run -p 3000:3000 -p 35729:35729 -v /Users/mdl/workspace/mean-stack/mean/public:/home/mean/public -v /Users/mdl/workspace/mean-stack/mean/app:/home/mean/app --link db:db_1 mean
```

## Iniciar en un entorno seguro
Para ejecutar la aplicación de un modo seguro que necesita para usar OpenSSL y generar un conjunto de certificados de firma propia. Los usuarios basados ​​en Unix puede usar el siguiente comando: 
```
$ sh generate-ssl-certs.sh
```
Los usuarios de Windows pueden seguir las instrucciones que se encuentran [aquí](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority)
Para generar la clave y el certificado y colocarlos en la carpeta *config/sslcert*.

## Primeros pasos con MEAN.JS
Usted tiene su aplicación en ejecución, pero hay un montón de cosas para entender, se recomienda que usted pase por la [Documentación Oficial](http://meanjs.org/docs.html). 
En la documentacion se intenta explicar los conceptos generales de MEAN y le dará algunas pautas para ayudarle mejor en el proceso de desarrollo. 

## Comunidad
* Use [Sitio Oficial](http://meanjs.org) para aprender acerca de los cambios y la hoja de ruta.
* Únete a #meanjs freenode.
* Inicie discusiones en [Gurpo de Google](https://groups.google.com/d/forum/meanjs)
* Ó publique en [Twitter](http://twitter.com/meanjsorg) y [Facebook](http://facebook.com/meanjs)


## Crédios
Inspirado en el gran trabajo de [Madhusudhan Srinivasa](https://github.com/madhums/)
El nombre de MEAN fué acuñado por [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)

## Licencia
(La licencia MIT)

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y archivos de documentación asociados (el "Software"), para utilizar el Software sin restricciones, incluyendo, sin limitación, los derechos para usar, copiar, modificar, fusionar , publicar, distribuir, sublicenciar y / o vender copias del Software, y para permitir que las personas a quienes se proporcione el Software para hacerlo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", sin garantía de ningún tipo, expresa o implícita, incluyendo pero no limitado a las garantías de comerciabilidad, aptitud para un propósito PARTICULAR Y NO. EN NINGÚN CASO LOS AUTORES O COPYRIGHT TITULARES RESPONSABLE POR CUALQUIER RECLAMO, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN LA SOFTWARE.