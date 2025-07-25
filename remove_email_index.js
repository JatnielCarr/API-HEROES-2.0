import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function removeEmailIndex() {
  await mongoose.connect(MONGO_URI);
  console.log('Conectado a MongoDB');
  try {
    const result = await mongoose.connection.db.collection('users').dropIndex('email_1');
    console.log('Índice email_1 eliminado:', result);
  } catch (err) {
    if (err.codeName === 'IndexNotFound') {
      console.log('El índice email_1 ya no existe.');
    } else {
      console.error('Error al eliminar el índice:', err);
    }
  }
  await mongoose.disconnect();
}

removeEmailIndex(); 