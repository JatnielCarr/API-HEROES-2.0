# API Heroes & Mascotas 🦸‍♂️🐾

API RESTful para gestionar superhéroes, usuarios y mascotas, lista para producción y despliegue en Render con Docker.

---

## 🚀 Características principales
- **CRUD de Héroes y Mascotas**
- **Usuarios con autenticación**
- **Adopción de mascotas por héroes**
- **Swagger UI para documentación interactiva**
- **Validación y manejo de errores**
- **Arquitectura profesional (MVC, servicios, repositorios)**
- **Base de datos MongoDB Atlas**
- **Script de seed con Faker (Python) para datos de prueba**
- **Listo para Docker/Render**

---

## 📦 Instalación y ejecución local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JatnielCarr/API-HEROES-2.0.git
   cd API-HEROES-2.0
   ```
2. **Instala dependencias**
   ```bash
   npm install
   ```
3. **Configura la base de datos**
   - Por defecto, la app usa la siguiente URI de MongoDB Atlas (en `app.js`):
     ```
     mongodb+srv://jatnielcarr10:J4flores24@cluster0.fu2p8ok.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Puedes cambiarla por tu propia URI si lo deseas.
4. **Ejecuta el servidor**
   ```bash
   npm start
   ```
   El servidor corre en el puerto **3001** por defecto.

---

## 🐳 Despliegue en Docker/Render

1. **Build y run local con Docker**
   ```bash
   docker build -t api-heroes .
   docker run -p 3001:3001 api-heroes
   ```
2. **Para Render**
   - Sube el repositorio a GitHub.
   - En Render, crea un nuevo servicio web y selecciona este repo.
   - Render detectará el `Dockerfile` automáticamente.
   - Configura la variable de entorno `PORT=3001` si es necesario.

---

## 🧪 Poblar la base de datos con datos de ejemplo (opcional)

Puedes usar el script de Python para poblar la base de datos con usuarios, héroes y mascotas de ejemplo:

```bash
pip install -r requirements.txt
python seed_mongo.py
```

---

## 📚 Documentación Swagger

Una vez corriendo, accede a:
- [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 🏗️ Estructura del Proyecto

```
API-HEROES-2.0/
├── app.js                  # Servidor principal y conexión MongoDB
├── Dockerfile              # Para despliegue en Docker/Render
├── requirements.txt        # Dependencias para el seed de datos (Python)
├── seed_mongo.py           # Script para poblar la base de datos con Faker
├── src/
│   ├── controllers/        # Lógica de rutas (héroes, mascotas, auth)
│   ├── middleware/         # Middlewares (auth, validaciones)
│   ├── models/             # Esquemas de Mongoose
│   ├── repositories/       # Acceso a datos
│   ├── services/           # Lógica de negocio
│   └── utils/              # Utilidades y validaciones
└── ...
```

---

## 🌐 Endpoints principales

### Héroes
- `GET    /api/heroes`           - Listar héroes
- `POST   /api/heroes`           - Crear héroe
- `GET    /api/heroes/:id`       - Ver héroe
- `PUT    /api/heroes/:id`       - Actualizar héroe
- `DELETE /api/heroes/:id`       - Eliminar héroe

### Mascotas
- `GET    /api/pets`             - Listar mascotas
- `POST   /api/pets`             - Crear mascota
- `GET    /api/pets/:id`         - Ver mascota
- `PUT    /api/pets/:id`         - Actualizar mascota
- `DELETE /api/pets/:id`         - Eliminar mascota
- `POST   /api/pets/:id/adopt`   - Adoptar mascota
- `POST   /api/pets/:id/return`  - Devolver mascota

### Usuarios y Auth
- `POST   /api/auth/register`     - Registrar usuario
- `POST   /api/auth/login`        - Login

---

## 📝 Ejemplo de uso (crear héroe)
```bash
curl -X POST http://localhost:3001/api/heroes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Roberto Gómez Bolaños",
    "alias": "Chapulin Colorado",
    "city": "CDMX",
    "team": "Independiente",
    "owner": "<user_id>"
  }'
```

---

## 🤝 Contribuciones

¡Pull requests y sugerencias son bienvenidas! Abre un issue o PR.

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**Autor:** Jatniel Carr

---

¡Disfruta usando la API de Héroes y Mascotas! 🚀 