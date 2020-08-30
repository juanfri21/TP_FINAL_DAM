#!/bin/bash

echo "Cerrando posibles contenedores abiertos"
docker stop $(docker ps -a -q)
echo "Eliminando red"
docker network rm mysql-net &
sleep 5
echo "Creando red"
docker network create --driver bridge mysql-net &
sleep 5
cd apiNodejs
echo "Iniciando base de datos mysql"
./start_mysql.sh mysql-net "$PWD"/db &
sleep 5
echo "Iniciando phpadmin en puerto 8085"
./run_phpadmin.sh mysql-net mysql-server 8085 &
sleep 5
echo "Iniciando nodejs en puerto 3000"
./serve_node_app_net.sh "$PWD" index.js 3000 mysql-net &
sleep 5
cd ../ionicProject
echo "Instalando librerias necesarias"
npm install
echo "Levantando aplicacion ionic"
ionic serve