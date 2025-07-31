# 🎮 API HEROES 2.0 - Interfaz Retro HTML

¡Bienvenido a la interfaz HTML retro de la API HEROES 2.0! Esta interfaz reemplaza Swagger UI con una experiencia de juego interactiva con estilo de los años 90 y comics.

## 🚀 Características

- **🎨 Diseño Retro**: Estilo pixelado y colores vibrantes inspirados en los años 90
- **🦸‍♂️ Interfaz de Juego**: Organizada en tabs temáticos (Héroes, Mascotas, Cuidado de Mascotas, Items)
- **🔐 Autenticación Integrada**: Sistema de login/registro con tokens JWT
- **📊 Consola en Tiempo Real**: Logs de todas las operaciones con timestamps
- **⌨️ Atajos de Teclado**: Navegación rápida con Ctrl+1,2,3,4
- **📱 Responsive**: Funciona en dispositivos móviles y desktop

## 🎯 Cómo Usar

### 1. Iniciar el Servidor
```bash
npm start
# o
node app.js
```

### 2. Acceder a la Interfaz
Abre tu navegador y ve a:
```
http://localhost:3001
```

### 3. Autenticación
- **Registro**: Crea una nueva cuenta con username y password
- **Login**: Inicia sesión con tus credenciales
- El token se guarda automáticamente en localStorage

### 4. Navegación por Tabs

#### 🦸‍♂️ HEROES
- **GET HEROES**: Obtener todos los héroes del usuario
- **CREATE HERO**: Crear un nuevo superhéroe
  - Nombre real (requerido)
  - Alias de héroe (requerido)
  - Ciudad (opcional)
  - Equipo (opcional)

#### 🐾 PETS
- **GET PETS**: Obtener todas las mascotas del usuario
- **CREATE PET**: Crear una nueva mascota
  - Nombre de la mascota (requerido)
  - Tipo de mascota (requerido)
  - Superpoder (requerido)

#### 🏠 PET CARE
- **LOAD PETS**: Cargar mascotas para cuidado
- **FEED PET**: Alimentar mascota seleccionada
- **WALK PET**: Pasear mascota seleccionada
- **CUSTOMIZE PET**: Personalizar mascota seleccionada

#### 🎒 ITEMS
- **GET ITEMS**: Obtener todos los items
- **CREATE ITEM**: Crear un nuevo item
  - Nombre del item (requerido)
  - Descripción (requerido)
  - Tipo de item (requerido)

## ⌨️ Atajos de Teclado

- `Ctrl + 1`: Tab de Héroes
- `Ctrl + 2`: Tab de Mascotas
- `Ctrl + 3`: Tab de Cuidado de Mascotas
- `Ctrl + 4`: Tab de Items
- `Ctrl + L`: Cerrar sesión

## 🎨 Características Visuales

### Efectos Retro
- **Animaciones de Glow**: Títulos y botones con efectos de brillo
- **Efectos de Hover**: Botones con animaciones al pasar el mouse
- **Fondo Animado**: Gradientes que se mueven suavemente
- **Tipografía Pixelada**: Fuentes que simulan consolas retro

### Colores del Tema
- **Verde Neón** (#00ff41): Color principal
- **Rosa Vibrante** (#ff006e): Acentos
- **Azul Eléctrico** (#3a86ff): Botones de acción
- **Dorado** (#ffd700): Elementos destacados
- **Púrpura** (#8338ec): Gradientes

## 📊 Consola de Resultados

La consola muestra:
- ✅ Operaciones exitosas (verde)
- ❌ Errores (rojo)
- ⚠️ Advertencias (amarillo)
- 📡 Información general (azul)

Cada mensaje incluye timestamp y se puede limpiar con el botón "CLEAR".

## 🔧 Configuración

### Cambiar URL de la API
En `public/script.js`, línea 2:
```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

### Personalizar Estilos
Los estilos están en `public/styles.css` y puedes modificar:
- Colores del tema
- Animaciones
- Tipografías
- Efectos visuales

## 🐛 Solución de Problemas

### Error de CORS
Si tienes problemas de CORS, asegúrate de que el servidor esté configurado correctamente en `app.js`.

### Token Expirado
Si el token expira, la interfaz automáticamente te redirigirá al login.

### Problemas de Conexión
La interfaz muestra el estado de conexión en tiempo real en la barra de estado.

## 🎵 Características Adicionales

- **Efectos de Sonido**: Preparado para integración con Web Audio API
- **Monitoreo de Red**: Detecta automáticamente cambios en la conectividad
- **Persistencia**: Los tokens se guardan en localStorage
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## 🚀 Próximas Mejoras

- [ ] Efectos de sonido retro
- [ ] Más animaciones y partículas
- [ ] Modo oscuro/claro
- [ ] Exportar/importar datos
- [ ] Estadísticas de uso
- [ ] Modo multijugador

---

¡Disfruta explorando tu API con esta interfaz retro! 🎮✨ 