# Backend de la aplicacion desarrollada en Nodejs + Expressjs

## Ejecucion

### Instalar dependencias
```
npm install
```

### Correr proyecto Node

Este proyecto de ExpressJs usa postgres como base de datos y tiene por defecto la base de datos de postgres con el usuario postgres y la contraseña la recibe a traves de una variable de entorno ($DATABASE_PWD). Si desea correr este proyecto en su ordenador sin un contenedor de postgres, debe establecer dicha variable de entorno de la siguiente manera:

Si usa Linux / MacOS
```
export DATABASE_PWD=contraseña123
```

Si usa Windows (CMD)
```
set DATABASE_PWD=contraseña123
```

Si usa Windows (PowerShell)
```
$env:DATABASE_PWD = "contraseña123"
```

Finalmente, puede correr el API de nodeJs en la base de datos por defecto de postgres de la siguiente manera:
```
npm run serverstart
```