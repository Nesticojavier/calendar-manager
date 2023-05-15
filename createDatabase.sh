#!/bin/bash
# Copyright (c) 2023, Nestor Gonzalez, Jesus Bandez
# PostgreSQL psql runner script for OS X, Linux

# Pedir el nombre de usuario que se usara para interactuar con la base
echo -n "Username [postgres]: "
read USERNAME

if [ "$USERNAME" = "" ];
then
    USERNAME="postgres"
fi

# Ingresar un nombre para asignarselo a la base de datos
# echo -n "Database to create: "
# read DATABASE

# while [ "$DATABASE" = "" ];
# do
#     echo "Debe indicar el nombre de la DATABASE a crear"
#     echo -n "Database: "
#     read DATABASE
# done

# asignar un server, localhost por defecto
echo -n "Server [localhost]: "
read SERVER

if [ "$SERVER" = "" ];
then
    SERVER="localhost"
fi

# asignar un puerto, 5432 por defecto
echo -n "Port [5432]: "
read PORT

if [ "$PORT" = "" ];
then
    PORT="5432"
fi

# Crear base de datos por defecto
: "${DATABASE:="express-react-project"}"

# Crear la base, importar los datos, crear las tablas del schema y llenarlas
# con datos
createdb  -h $SERVER -p $PORT -U $USERNAME $DATABASE
psql -h $SERVER -p $PORT -U $USERNAME $DATABASE -a -f "create_tables.sql"
RET=$?

if [ "$RET" != "0" ];
then
    echo
    echo -n "Press <return> to continue..."
    read dummy
fi

exit $RET