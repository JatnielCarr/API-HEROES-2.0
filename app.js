import express from 'express';
import heroController from './src/controllers/heroController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import petController from './src/controllers/petController.js';
import petCareController from './src/controllers/petCareController.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authController from './src/controllers/authController.js';
import cors from 'cors';
import itemController from './src/controllers/itemController.js';

dotenv.config();

const app = express();

// Habilitar CORS para todos los orígenes (ideal para despliegue en Render)
app.use(cors());

// Configuración Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Superhéroes y Mascotas',
    version: '1.0.0',
    description: 'Documentación de la API de superhéroes y mascotas.\n\n**IMPORTANTE:** Para acceder a los endpoints protegidos, haz login y pega tu token en el botón Authorize así: `Bearer <token>` (incluyendo la palabra Bearer y un espacio).',
  },
  servers: [
    {
      url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3001',
      description: 'Servidor de Producción o Desarrollo',
    },
  ],
  tags: [
    { name: 'Autenticación', description: 'Registro e inicio de sesión de jugadores' },
    { name: 'Superhéroes', description: 'Operaciones sobre superhéroes' },
    { name: 'Mascotas', description: 'Operaciones sobre mascotas' },
    { name: 'Cuidado de Mascota', description: 'Operaciones de cuidado tipo Pou' }
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Introduce tu token Bearer aquí. Formato: Bearer <token>'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/controllers/*.js'], // Incluye todos los controladores
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  // useNewUrlParser y useUnifiedTopology ya no son necesarios en Mongoose 6+
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas de la API (deben ir antes de los archivos estáticos)
app.use('/api', heroController);
app.use('/api/pets', petController);
app.use('/api/pet-care', petCareController);
app.use('/api/auth', authController);
app.use('/api/items', itemController);

// Servir archivos estáticos desde la carpeta public (debe ir después de las rutas de la API)
app.use(express.static('public'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
    console.log('Presiona Ctrl+C para detener el servidor');
}); 