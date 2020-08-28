#!/bin/bash

echo "Cerrando posibles contenedores abiertos"
docker stop $(docker ps -a -q)
echo "Creando red"
docker network create --driver bridge mysql-net
cd apiNodejs
echo "Levantando contenedor phpadmin en puerto 8085"
./run_phpadmin.sh mysql-net mysql-server 8085
echo "Levantando contenedor mysql"
./start_mysql.sh mysql-net "$PWD"/db
echo "Levantando contenedor nodejs en puerto 3000"
./serve_node_app_net.sh "$PWD" index.js 3000 mysql-net
cd ../ionicProject
echo "Levantando aplicacion ionic"
ionic serve