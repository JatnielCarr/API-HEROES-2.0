// Script de seed para MongoDB usando JavaScript
// Ejecuta: node seed_mongo.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import cors from 'cors'; // Agregado usecors
import User from './src/models/userModel.js';
import Hero from './src/models/heroModel.js';
import Pet from './src/models/petModel.js';
import Item from './src/models/itemModel.js';

dotenv.config();

// Nota: cors solo es necesario si este script expone un servidor HTTP, lo cual no es el caso aquí.
// Si en el futuro agregas endpoints a este script, puedes usar:
// app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Conectado a MongoDB');

  // Limpiar colecciones
  await User.deleteMany({});
  await Hero.deleteMany({});
  await Pet.deleteMany({});
  await Item.deleteMany({});

  // Datos base
  const cities = ['Gotham', 'Metropolis', 'CDMX', 'Nueva York', 'Tokio'];
  const teams = ['Liga', 'Independiente', 'Vengadores', 'X-Men', 'Titans'];
  const petTypes = ['Perro', 'Gato', 'Ave', 'Tortuga', 'Conejo'];
  const superPowers = ['Volar', 'Invisibilidad', 'Fuerza', 'Velocidad', 'Telepatía'];
  const personalities = ['leal', 'juguetón', 'valiente', 'curioso', 'tranquilo'];
  const itemTypes = ['accesorio', 'comida', 'medicina', 'juguete'];
  const rarities = ['común', 'raro', 'épico', 'legendario'];

  // Crear un usuario fijo para asignar como owner
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await User.create({
    username: 'usuario_test',
    email: 'usuario_test@email.com',
    password: hashedPassword
  });

  // Crear 30 héroes
  const heroes = [];
  for (let i = 0; i < 30; i++) {
    heroes.push(await Hero.create({
      name: `Heroe Real ${i+1}`,
      alias: `Alias${i+1}`,
      city: randomFromArray(cities),
      team: randomFromArray(teams),
      owner: user._id
    }));
  }

  // Crear 30 mascotas
  const pets = [];
  for (let i = 0; i < 30; i++) {
    pets.push(await Pet.create({
      name: `Mascota${i+1}`,
      type: randomFromArray(petTypes),
      superPower: randomFromArray(superPowers),
      adoptedBy: heroes[i % heroes.length]._id,
      owner: user._id,
      health: 100,
      happiness: 100,
      personality: randomFromArray(personalities),
      diseases: [],
      status: 'available'
    }));
  }

  // Crear 30 items
  for (let i = 0; i < 30; i++) {
    await Item.create({
      name: `Item${i+1}`,
      type: randomFromArray(itemTypes),
      description: `Descripción del item ${i+1}`,
      price: Math.floor(Math.random() * 100) + 1,
      effect: `Efecto especial ${i+1}`,
      rarity: randomFromArray(rarities),
      available: true
    });
  }

  console.log('30 héroes, mascotas e items insertados. Solo 1 usuario de ejemplo.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Error en el seed:', err);
  process.exit(1);
}); 