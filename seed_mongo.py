import random
from faker import Faker
from pymongo import MongoClient
from bson import ObjectId

# Configuración
MONGO_URI = 'mongodb+srv://jatnielcarr10:J4flores24@cluster0.fu2p8ok.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
DB_NAME = 'test'
NUM_USERS = 5
NUM_HEROES = 10
NUM_PETS = 15

fake = Faker()

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Limpiar colecciones
for col in ['users', 'heroes', 'pets']:
    db[col].delete_many({})

# 1. Crear usuarios
users = []
for _ in range(NUM_USERS):
    user = {
        'username': fake.user_name(),
        'email': fake.email(),
        'password': fake.password(),
        'displayName': fake.name(),
        'avatar': fake.image_url(),
        'activo': True
    }
    user['_id'] = db.users.insert_one(user).inserted_id
    users.append(user)

# 2. Crear héroes
heroes = []
for _ in range(NUM_HEROES):
    owner = random.choice(users)
    hero = {
        'name': fake.name(),
        'alias': fake.first_name() + ' ' + fake.color_name(),
        'city': fake.city(),
        'team': fake.word().capitalize() + ' Team',
        'owner': owner['_id'],
        'pets': []
    }
    hero['_id'] = db.heroes.insert_one(hero).inserted_id
    heroes.append(hero)

# 3. Crear mascotas
pet_types = ['perro', 'gato', 'conejo', 'dragón', 'ave', 'tortuga']
super_powers = ['invisibilidad', 'vuelo', 'fuerza', 'telepatía', 'curación', 'velocidad']
personalities = ['juguetón', 'serio', 'travieso', 'leal', 'independiente', 'cariñoso']

pets = []
for _ in range(NUM_PETS):
    owner = random.choice(users)
    adopted = random.choice([True, False])
    adoptedBy = random.choice(heroes)['_id'] if adopted else None
    pet = {
        'name': fake.first_name() + 'y',
        'type': random.choice(pet_types),
        'superPower': random.choice(super_powers),
        'adoptedBy': adoptedBy,
        'adoptionHistory': [],
        'status': 'adopted' if adopted else 'available',
        'health': random.randint(60, 100),
        'happiness': random.randint(60, 100),
        'personality': random.choice(personalities),
        'activityHistory': [],
        'customization': {'free': [], 'paid': []},
        'diseases': [],
        'lastCare': None,
        'deathDate': None,
        'owner': owner['_id']
    }
    pet['_id'] = db.pets.insert_one(pet).inserted_id
    pets.append(pet)
    # Si fue adoptada, agregar a la lista de mascotas del héroe
    if adoptedBy:
        db.heroes.update_one({'_id': adoptedBy}, {'$addToSet': {'pets': pet['_id']}})

print(f"Usuarios creados: {len(users)}")
print(f"Héroes creados: {len(heroes)}")
print(f"Mascotas creadas: {len(pets)}") 