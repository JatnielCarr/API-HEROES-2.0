# API Heroes 2.0

## 🎯 Problemas Resueltos

### ✅ Problema de Persistencia de Datos
**Problema**: Los héroes y mascotas creados no se reflejaban en MongoDB para usuarios específicos ("kirito", "martha", "puto").

**Causa**: El modelo Hero estaba intentando usar la colección "heroes" pero los datos se guardaban en la colección "heros" (nombre incorrecto).

**Solución**: Se actualizó el modelo Hero para usar explícitamente la colección "heros":
```javascript
// En src/models/heroModel.js
export default mongoose.model('Hero', heroSchema, 'heros');
```

### ✅ Funcionalidad de Adopción de Mascotas
**Implementado**: Sistema completo de adopción de mascotas por héroes.

**Características**:
- ✅ Crear mascotas con nombre, tipo y superpoder
- ✅ Adoptar mascotas con héroes (con motivo y notas)
- ✅ Devolver mascotas adoptadas
- ✅ Ver mascotas adoptadas por usuario
- ✅ Historial de adopciones
- ✅ Validación de permisos y estados

## 🚀 Configuración de la Base de Datos

1. Crea un archivo `.env` en la raíz del proyecto (si no existe) y agrega:

```
MONGO_URI=mongodb+srv://jatniel3749:carr2006@cluster0.rdzadqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
JWT_SECRET=tu_secreto_jwt_aqui
RENDER_EXTERNAL_URL=https://tu-app.onrender.com
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

## 🎮 Cómo Usar la Nueva Funcionalidad de Adopción

### Crear una Mascota
1. Ve a la pestaña "Pets"
2. Completa el formulario "CREATE PET"
3. Haz clic en "Create Pet"

### Adoptar una Mascota
1. Ve a la pestaña "Pets"
2. En la sección "ADOPT PET":
   - Ingresa el ID de la mascota
   - Ingresa el ID del héroe
   - Opcional: agrega motivo y notas
3. Haz clic en "Adopt Pet"

### Ver Mascotas Adoptadas
1. Ve a la pestaña "Pets"
2. Haz clic en "ADOPTED PETS"
3. Verás todas las mascotas adoptadas por tus héroes

### Devolver una Mascota
1. Ve a la pestaña "Pets"
2. En la sección "RETURN PET":
   - Ingresa el ID de la mascota
   - Opcional: agrega notas
3. Haz clic en "Return Pet"

## 🔧 Verificación de la Base de Datos

Para verificar que todo funciona correctamente, puedes usar el script de prueba:

```
node test_database.js
```

Este script te mostrará:
- ✅ Conexión a MongoDB
- ✅ Colecciones disponibles
- ✅ Conteo de documentos por colección

## 📊 Estado Actual de los Datos

**Usuarios con datos verificados**:
- 👤 **Kirito**: 1 héroe (Batman), 1 mascota (DARK - Lobo)
- 👤 **Martha**: 1 héroe (Bruce Wayne), 1 mascota (Ace - Perro)
- 👤 **Putoelquelolea**: 1 mascota (Pablo69 - Humano)

**Funcionalidades verificadas**:
- ✅ Creación de héroes y mascotas
- ✅ Persistencia en base de datos
- ✅ Sistema de adopción
- ✅ API endpoints funcionando
- ✅ Interfaz web actualizada

## 🛠️ Solución de Problemas

### Si los datos no aparecen:
1. Verifica que el archivo `.env` tenga la URI correcta
2. Ejecuta `node test_database.js` para verificar la conexión
3. Revisa la consola del navegador para errores de API
4. Verifica que estés logueado con el usuario correcto

### Si la adopción no funciona:
1. Asegúrate de que el héroe y la mascota pertenezcan al mismo usuario
2. Verifica que la mascota no esté ya adoptada
3. Revisa los logs en la consola del servidor

## 📝 Notas Técnicas
- El archivo `app.js` y el script `seed_mongo.js` usan la variable de entorno `MONGO_URI` para conectarse a la base de datos.
- Puedes cambiar la base de datos editando solo el archivo `.env`.
- La aplicación usa JWT para autenticación.
- Los datos se guardan en MongoDB Atlas. 