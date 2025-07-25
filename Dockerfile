# Usar una imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código de la app
COPY . .

# Exponer el puerto en el que corre la app
EXPOSE 3001

# Comando para iniciar la app
CMD ["npm", "start"] 