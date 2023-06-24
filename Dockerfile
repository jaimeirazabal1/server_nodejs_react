# Utilizamos una imagen base de MongoDB 
# docker build -t mongodb-image .
# Esto creará una imagen de Docker llamada "mongodb-image" basada en el Dockerfile. Una vez que la imagen esté construida, puedes ejecutar un contenedor utilizando el siguiente comando:
# docker run -d -p 27017:27017 --name mongodb-container -v $(pwd)/data:/data/db mongodb-image
FROM mongo

# Creamos la carpeta para almacenar los datos
RUN mkdir -p /data/db

# Definimos el punto de montaje para los datos
VOLUME ["/data/db"]

# Exponemos el puerto por defecto de MongoDB
EXPOSE 27017

# Comando para iniciar MongoDB
CMD ["mongod"]
