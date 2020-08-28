# Trabajo Práctico - Desarrollo de Aplicaciones Multiplataforma

# Correr la aplicación
Para correr la aplicación es necesario tener instalado docker con los contenedores necesarios para la aplicacion. En caso de no tener instalado docker visitar https://docs.docker.com/engine/install/ 

Luego instalar los siguientes contenedores:

Contenedor nodejs:

```sh
docker pull abassi/nodejs-server:10.0-dev
```

Contenedor mysql:

```sh
docker pull mysql:5.7
```
Contenedor phpmyadmin:

```sh
docker pull phpmyadmin/phpmyadmin
```
 Luego clonar el repositorio en la ubicación deseada:

```sh
git clone https://github.com/juanfri21/TP_FINAL_DAM.git
cd TP_FINAL_DAM
```
Estando posicionado en la carpeta del proyecto correr el siguiente comando:
```sh
./run.sh
```
Puede pasar que luego de levantar el contenedor de nodejs demore en ejecutar la aplicacion ionic.
En caso de no tener permisos de ejecucion, correr el siguiente comando y volver a intentar:
```sh
chmod +x run.sh
```
La aplicación WEB se levanta por defecto en http://localhost:8100 y el servidor PHPMyAdmin se accede desde http://localhost:8085 con usuario root y contraseña userpass.
# Tecnologias utilizadas

-   Ionic
-   Node JS
-   Angular
-   MySql
-   PhpMyAdmin

# Contribuir

Para contribuir realizar un pull request con las sugerencias.

# Licencia

GPL