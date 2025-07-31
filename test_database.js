import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/superherogame';

async function testDatabase() {
    try {
        console.log('🔌 Testing database connection...');
        console.log('📡 MongoDB URI:', MONGO_URI);
        
        // Conectar a MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB successfully!');
        
        // Verificar que las colecciones existen
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📚 Available collections:', collections.map(c => c.name));
        
        // Contar documentos en cada colección
        const User = mongoose.model('User', new mongoose.Schema({}));
        const Hero = mongoose.model('Hero', new mongoose.Schema({}));
        const Pet = mongoose.model('Pet', new mongoose.Schema({}));
        
        const userCount = await User.countDocuments();
        const heroCount = await Hero.countDocuments();
        const petCount = await Pet.countDocuments();
        
        console.log('📊 Document counts:');
        console.log(`   Users: ${userCount}`);
        console.log(`   Heroes: ${heroCount}`);
        console.log(`   Pets: ${petCount}`);
        
        // Desconectar
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        
    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        process.exit(1);
    }
}

testDatabase(); 