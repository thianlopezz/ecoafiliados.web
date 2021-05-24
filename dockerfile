#Definimos el la version de node que tendrá mi contenedor
FROM node:14.16.0-alpine
# Defino el directorio en donde se va a ejecutar mi configuración dentro del contenedor
WORKDIR /home/noma.web

# Copio todos los archivos estaticos
COPY ./build ./build
# Copio la configuracion de mi servidor en node
COPY ./server ./server
# Copio la configuracion para pm2
COPY ./ecosystem.config.js ./ecosystem.config.js

# instalo pm2 de forma global
RUN npm install pm2 -g

# Esta configuración hace que el puerto en donde voy a alojar mi aplicación pueda ser accedido
EXPOSE 3000

# Por último configuro los comandos que se van a ejecutar para poner arriba nuesra app
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]

