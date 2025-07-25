# API Heroes

## Configuración de la base de datos

1. Crea un archivo `.env` en la raíz del proyecto (si no existe) y agrega:

```
MONGO_URI=mongodb+srv://jatniel3749:carr2006@cluster0.rdzadqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

(O usa tu propia URI de MongoDB Atlas si lo prefieres)

2. Instala las dependencias:

```
npm install
```

3. Ejecuta el seed para poblar la base de datos con datos de ejemplo:

```
node seed_mongo.js
```

4. Inicia la aplicación:

```
npm start
```

## Notas
- El archivo `app.js` y el script `seed_mongo.js` usan la variable de entorno `MONGO_URI` para conectarse a la base de datos.
- Puedes cambiar la base de datos editando solo el archivo `.env`.
- Si necesitas conectar herramientas BI/SQL, usa la variable `MONGO_SQL_URI` (ver instrucciones previas). 