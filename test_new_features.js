// Test script for new pet care features
import mongoose from 'mongoose';
import Pet from './src/models/petModel.js';
import User from './src/models/userModel.js';
import Hero from './src/models/heroModel.js';

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://javerage:javerage@cluster0.mongodb.net/test?retryWrites=true&w=majority';

async function testNewFeatures() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Create a test user
        console.log('\n👤 Creating test user...');
        const testUser = new User({
            username: 'testuser_newfeatures',
            password: 'testpass123'
        });
        await testUser.save();
        console.log('✅ Test user created');

        // Create a test hero
        console.log('\n🦸 Creating test hero...');
        const testHero = new Hero({
            name: 'TestHero',
            alias: 'TestHero',
            city: 'TestCity',
            team: 'TestTeam',
            owner: testUser._id
        });
        await testHero.save();
        console.log('✅ Test hero created');

        // Create a test pet
        console.log('\n🐕 Creating test pet...');
        const testPet = new Pet({
            name: 'TestPet',
            type: 'Perro',
            superPower: 'Test Power',
            owner: testUser._id,
            adoptedBy: testHero._id,
            status: 'adopted',
            health: 100,
            happiness: 100,
            personality: 'juguetón',
            diseases: ['empacho', 'indigestión'] // Add diseases to test Parazetamol
        });
        await testPet.save();
        console.log('✅ Test pet created with diseases: empacho, indigestión');

        console.log('\n🧪 Testing new features...');
        console.log('📋 Pet ID:', testPet._id);
        console.log('📋 User ID:', testUser._id);
        console.log('📋 Hero ID:', testHero._id);

        console.log('\n💊 Testing Parazetamol medicine...');
        console.log('Expected: Should cure both empacho and indigestión');
        console.log('Current diseases:', testPet.diseases);

        console.log('\n😴 Testing sleep function...');
        console.log('Note: Sleep only works if pet has "cansado" disease');

        console.log('\n✅ Test setup complete!');
        console.log('\n📝 To test the features:');
        console.log('1. Open http://localhost:3001 in your browser');
        console.log('2. Login with username: testuser_newfeatures, password: testpass123');
        console.log('3. Go to Pet Care tab');
        console.log('4. Select the test pet');
        console.log('5. Try the "HEAL WITH MEDICINE" button with Parazetamol');
        console.log('6. Try the "SLEEP PET" button (will only work if pet is tired)');

    } catch (error) {
        console.error('❌ Error during testing:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

testNewFeatures(); 