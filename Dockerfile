# Dockerfile para despliegue en Render
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto (Render usará la variable PORT)
EXPOSE 3001

# Comando de inicio
CMD ["npm", "start"] 