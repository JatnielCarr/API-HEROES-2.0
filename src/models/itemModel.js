import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, description: 'Nombre del item' },
  type: { type: String, required: true, description: 'Tipo de item (accesorio, comida, medicina, etc.)' },
  description: { type: String, description: 'Descripción del item' },
  price: { type: Number, default: 0, description: 'Precio del item (si aplica)' },
  effect: { type: String, description: 'Efecto especial del item (si aplica)' },
  rarity: { type: String, default: 'común', description: 'Rareza del item' },
  available: { type: Boolean, default: true, description: 'Si el item está disponible para compra/uso' }
});

itemSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object._id = _id;
  object.id_corto = _id.toString().substring(0, 8);
  return object;
});

export default mongoose.model('Item', itemSchema); 