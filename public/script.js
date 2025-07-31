// Configuración de la API
const API_BASE_URL = '/api';
let authToken = localStorage.getItem('authToken') || null;

// Elementos del DOM
const elements = {
    // Status
    connectionStatus: document.getElementById('connection-status'),
    tokenStatus: document.getElementById('token-status'),
    
    // Panels
    authPanel: document.getElementById('auth-panel'),
    gamePanel: document.getElementById('game-panel'),
    
    // Forms
    registerForm: document.getElementById('register-form'),
    loginForm: document.getElementById('login-form'),
    
    // Tabs
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Heroes
    getHeroesBtn: document.getElementById('get-heroes'),
    createHeroForm: document.getElementById('create-hero-form'),
    heroesList: document.getElementById('heroes-list'),
    
    // Pets
    getPetsBtn: document.getElementById('get-pets'),
    createPetForm: document.getElementById('create-pet-form'),
    petsList: document.getElementById('pets-list'),
    
    // Pet Care
    getPetsForCareBtn: document.getElementById('get-pets-for-care'),
    petSelector: document.getElementById('pet-selector'),
    feedPetForm: document.getElementById('feed-pet-form'),
    walkPetForm: document.getElementById('walk-pet-form'),
    customizePetForm: document.getElementById('customize-pet-form'),
    
    // Items
    getItemsBtn: document.getElementById('get-items'),
    createItemForm: document.getElementById('create-item-form'),
    itemsList: document.getElementById('items-list'),
    
    // Console
    consoleOutput: document.getElementById('console-output'),
    clearConsoleBtn: document.getElementById('clear-console')
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateStatus();
});

function initializeApp() {
    logToConsole('🚀 Initializing API HEROES 2.0 Interface...', 'info');
    
    // Always start with authentication panel
    logToConsole('🔐 Starting with authentication panel', 'info');
    showAuthPanel();
    
    // Check if there's a stored token for auto-login
    if (authToken) {
        logToConsole('🔑 Token found in localStorage - auto-login available', 'success');
        // Don't auto-login, let user choose to login or register
    }
}

function setupEventListeners() {
    // Authentication
    elements.registerForm.addEventListener('submit', handleRegister);
    elements.loginForm.addEventListener('submit', handleLogin);
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Tab navigation
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
    
    // Heroes
    elements.getHeroesBtn.addEventListener('click', getHeroes);
    elements.createHeroForm.addEventListener('submit', createHero);
    
    // Pets
    elements.getPetsBtn.addEventListener('click', getPets);
    elements.createPetForm.addEventListener('submit', createPet);
    elements.getAdoptedPetsBtn = document.getElementById('get-adopted-pets');
    elements.getAdoptedPetsBtn.addEventListener('click', getAdoptedPets);
    elements.adoptPetForm = document.getElementById('adopt-pet-form');
    elements.adoptPetForm.addEventListener('submit', adoptPet);
    elements.returnPetForm = document.getElementById('return-pet-form');
    elements.returnPetForm.addEventListener('submit', returnPet);
    
    // Pet Care
    elements.getPetsForCareBtn.addEventListener('click', loadPetsForCare);
    elements.refreshPetStatusBtn = document.getElementById('refresh-pet-status');
    elements.refreshPetStatusBtn.addEventListener('click', refreshPetStatus);
    elements.feedPetForm.addEventListener('submit', feedPet);
    elements.walkPetForm.addEventListener('submit', walkPet);
    elements.playPetForm = document.getElementById('play-pet-form');
    elements.playPetForm.addEventListener('submit', playPet);
    elements.bathPetForm = document.getElementById('bath-pet-form');
    elements.bathPetForm.addEventListener('submit', bathPet);
    elements.healPetForm = document.getElementById('heal-pet-form');
    elements.healPetForm.addEventListener('submit', healPet);
    elements.customizePetForm.addEventListener('submit', customizePet);
    
    // Pet Status Display Elements
    elements.petStatusDisplay = document.getElementById('pet-status-display');
    elements.petAvatar = document.getElementById('pet-avatar');
    elements.petNameDisplay = document.getElementById('pet-name-display');
    elements.petTypeDisplay = document.getElementById('pet-type-display');
    elements.petSuperpowerDisplay = document.getElementById('pet-superpower-display');
    elements.healthBar = document.getElementById('health-bar');
    elements.healthValue = document.getElementById('health-value');
    elements.happinessBar = document.getElementById('happiness-bar');
    elements.happinessValue = document.getElementById('happiness-value');
    elements.hungerBar = document.getElementById('hunger-bar');
    elements.hungerValue = document.getElementById('hunger-value');
    elements.energyBar = document.getElementById('energy-bar');
    elements.energyValue = document.getElementById('energy-value');
    elements.hygieneBar = document.getElementById('hygiene-bar');
    elements.hygieneValue = document.getElementById('hygiene-value');
    elements.petMood = document.getElementById('pet-mood');
    elements.petCondition = document.getElementById('pet-condition');
    elements.petDiseases = document.getElementById('pet-diseases');
    
    // Items
    elements.getItemsBtn.addEventListener('click', getItems);
    elements.createItemForm.addEventListener('submit', createItem);
    
    // Console
    elements.clearConsoleBtn.addEventListener('click', clearConsole);
}

// Authentication Functions
async function handleRegister(e) {
    e.preventDefault();
    
    // Get form data directly from the form
    const form = e.target;
    const username = form.querySelector('#reg-username').value.trim();
    const password = form.querySelector('#reg-password').value.trim();
    
    if (!username || !password) {
        logToConsole('❌ Username and password are required!', 'error');
        return;
    }
    
    try {
        logToConsole('📝 Attempting to register user...', 'info');
        logToConsole(`📤 Sending: username="${username}", password="${'*'.repeat(password.length)}"`, 'info');
        
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            logToConsole('✅ User registered successfully!', 'success');
            logToConsole(`👤 Username: ${username}`, 'info');
            logToConsole('💡 You can now login with your new account!', 'info');
            form.reset();
        } else {
            logToConsole(`❌ Registration failed: ${data.error}`, 'error');
        }
    } catch (error) {
        logToConsole(`❌ Network error: ${error.message}`, 'error');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    // Get form data directly from the form
    const form = e.target;
    const username = form.querySelector('#login-username').value.trim();
    const password = form.querySelector('#login-password').value.trim();
    
    if (!username || !password) {
        logToConsole('❌ Username and password are required!', 'error');
        return;
    }
    
    try {
        logToConsole('🔑 Attempting to login...', 'info');
        logToConsole(`📤 Sending: username="${username}", password="${'*'.repeat(password.length)}"`, 'info');
        
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            logToConsole('✅ Login successful!', 'success');
            logToConsole(`👤 Welcome, ${username}!`, 'info');
            updateStatus();
            showGamePanel();
            form.reset();
        } else {
            logToConsole(`❌ Login failed: ${data.error}`, 'error');
        }
    } catch (error) {
        logToConsole(`❌ Network error: ${error.message}`, 'error');
    }
}

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        ...options
    };
    
    logToConsole(`🌐 API Request: ${options.method || 'GET'} ${url}`, 'info');
    if (options.body) {
        logToConsole(`📦 Request body: ${options.body}`, 'info');
    }
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        logToConsole(`📡 Response status: ${response.status}`, 'info');
        
        if (!response.ok) {
            if (response.status === 401) {
                logToConsole('🔒 Unauthorized - Please login again', 'error');
                logout();
                return null;
            }
            logToConsole(`❌ API Error: ${data.error || 'Unknown error'}`, 'error');
            throw new Error(data.error || 'API request failed');
        }
        
        logToConsole(`✅ API Response: ${JSON.stringify(data).substring(0, 200)}...`, 'success');
        return data;
    } catch (error) {
        logToConsole(`❌ API Error: ${error.message}`, 'error');
        return null;
    }
}

// Heroes Functions
async function getHeroes() {
    logToConsole('🦸‍♂️ Fetching heroes...', 'info');
    
    const heroes = await apiRequest('/heroes');
    if (heroes) {
        displayHeroes(heroes);
        logToConsole(`✅ Found ${heroes.length} heroes`, 'success');
    }
}

async function createHero(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const heroData = {
        name: formData.get('name'),
        alias: formData.get('alias'),
        city: formData.get('city') || '',
        team: formData.get('team') || ''
    };
    
    // Validar campos requeridos
    if (!heroData.name || !heroData.alias) {
        logToConsole('❌ Error: Name and alias are required', 'error');
        return;
    }
    
    logToConsole('🎭 Creating new hero...', 'info');
    logToConsole(`📝 Hero data: ${JSON.stringify(heroData)}`, 'info');
    
    const hero = await apiRequest('/heroes', {
        method: 'POST',
        body: JSON.stringify(heroData)
    });
    
    if (hero) {
        logToConsole(`✅ Hero created: ${hero.alias}`, 'success');
        e.target.reset();
        getHeroes(); // Refresh the list
    }
}

function displayHeroes(heroes) {
    elements.heroesList.innerHTML = '';
    
    if (heroes.length === 0) {
        elements.heroesList.innerHTML = '<div class="console-message">No heroes found</div>';
        return;
    }
    
    heroes.forEach(hero => {
        const heroElement = document.createElement('div');
        heroElement.className = 'hero-item';
        heroElement.innerHTML = `
            <h4>🦸‍♂️ ${hero.alias}</h4>
            <p><strong>Real Name:</strong> ${hero.name}</p>
            <p><strong>City:</strong> ${hero.city || 'Unknown'}</p>
            <p><strong>Team:</strong> ${hero.team || 'Independent'}</p>
            <p><strong>ID:</strong> ${hero._id}</p>
        `;
        elements.heroesList.appendChild(heroElement);
    });
}

// Pets Functions
async function getPets() {
    logToConsole('🐾 Fetching pets...', 'info');
    
    const pets = await apiRequest('/pets');
    if (pets) {
        displayPets(pets);
        logToConsole(`✅ Found ${pets.length} pets`, 'success');
    }
}

async function createPet(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const petData = {
        name: formData.get('name'),
        type: formData.get('type'),
        superPower: formData.get('superPower')
    };
    
    // Validar campos requeridos
    if (!petData.name || !petData.type || !petData.superPower) {
        logToConsole('❌ Error: Name, type and super power are required', 'error');
        return;
    }
    
    logToConsole('🐕 Creating new pet...', 'info');
    logToConsole(`📝 Pet data: ${JSON.stringify(petData)}`, 'info');
    
    const pet = await apiRequest('/pets', {
        method: 'POST',
        body: JSON.stringify(petData)
    });
    
    if (pet) {
        logToConsole(`✅ Pet created: ${pet.name}`, 'success');
        e.target.reset();
        getPets(); // Refresh the list
    }
}

function displayPets(pets) {
    elements.petsList.innerHTML = '';
    
    if (pets.length === 0) {
        elements.petsList.innerHTML = '<div class="console-message">No pets found</div>';
        return;
    }
    
    pets.forEach(pet => {
        const petElement = document.createElement('div');
        petElement.className = 'pet-item';
        petElement.innerHTML = `
            <h4>🐾 ${pet.name}</h4>
            <p><strong>Type:</strong> ${pet.type}</p>
            <p><strong>Super Power:</strong> ${pet.superPower}</p>
            <p><strong>Status:</strong> ${pet.status || 'available'}</p>
            <p><strong>ID:</strong> ${pet._id}</p>
            ${pet.adoptedBy ? `<p><strong>Adopted by:</strong> ${pet.adoptedBy.alias || pet.adoptedBy}</p>` : ''}
        `;
        elements.petsList.appendChild(petElement);
    });
}

// Adopt Pet Function
async function adoptPet(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const adoptData = {
        heroId: formData.get('heroId'),
        reason: formData.get('reason'),
        notes: formData.get('notes') || ''
    };
    
    const petId = formData.get('petId');
    
    logToConsole('🤝 Adopting pet...', 'info');
    
    const result = await apiRequest(`/pets/${petId}/adopt`, {
        method: 'POST',
        body: JSON.stringify(adoptData)
    });
    
    if (result) {
        logToConsole(`✅ Pet adopted successfully!`, 'success');
        e.target.reset();
        getPets(); // Refresh the list
    }
}

// Return Pet Function
async function returnPet(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const returnData = {
        notes: formData.get('notes') || ''
    };
    
    const petId = formData.get('petId');
    
    logToConsole('🔄 Returning pet...', 'info');
    
    const result = await apiRequest(`/pets/${petId}/return`, {
        method: 'POST',
        body: JSON.stringify(returnData)
    });
    
    if (result) {
        logToConsole(`✅ Pet returned successfully!`, 'success');
        e.target.reset();
        getPets(); // Refresh the list
    }
}

// Get Adopted Pets Function
async function getAdoptedPets() {
    logToConsole('🏠 Fetching adopted pets...', 'info');
    
    const pets = await apiRequest('/pets/adopted');
    if (pets) {
        displayPets(pets);
        logToConsole(`✅ Found ${pets.length} adopted pets`, 'success');
    }
}

// Pet Care Functions
async function loadPetsForCare() {
    logToConsole('🏠 Loading pets for care...', 'info');
    
    const pets = await apiRequest('/pets');
    if (pets) {
        populatePetSelector(pets);
        logToConsole(`✅ Loaded ${pets.length} pets for care`, 'success');
    }
}

function populatePetSelector(pets) {
    elements.petSelector.innerHTML = '<option value="">Choose a pet...</option>';
    
    pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet._id;
        option.textContent = `${pet.name} (${pet.type})`;
        elements.petSelector.appendChild(option);
    });
    
    // Add event listener for pet selection
    elements.petSelector.addEventListener('change', function() {
        if (this.value) {
            loadPetStatus(this.value);
        } else {
            hidePetStatus();
        }
    });
}

async function loadPetStatus(petId) {
    try {
        logToConsole('📊 Loading pet status...', 'info');
        
        const response = await apiRequest(`/pet-care/${petId}/status`);
        if (response) {
            displayPetStatus(response);
            logToConsole('✅ Pet status loaded successfully!', 'success');
        }
    } catch (error) {
        logToConsole(`❌ Error loading pet status: ${error.message}`, 'error');
    }
}

function displayPetStatus(pet) {
    // Show the status display
    elements.petStatusDisplay.classList.remove('hidden');
    
    // Update pet info
    elements.petNameDisplay.textContent = pet.name;
    elements.petTypeDisplay.textContent = `Type: ${pet.type}`;
    elements.petSuperpowerDisplay.textContent = `Power: ${pet.superPower || 'None'}`;
    
    // Update avatar based on pet type
    const avatarMap = {
        'Perro': '🐕',
        'Gato': '🐱',
        'Ave': '🦜',
        'Reptil': '🦎',
        'default': '🐾'
    };
    elements.petAvatar.textContent = avatarMap[pet.type] || avatarMap.default;
    
    // Update stats
    updateStatBar(elements.healthBar, elements.healthValue, pet.health || 100, 'health');
    updateStatBar(elements.happinessBar, elements.happinessValue, pet.happiness || 100, 'happiness');
    
    // Calculate derived stats
    const hunger = 100 - (pet.happiness || 100);
    const energy = Math.max(0, 100 - hunger);
    const hygiene = Math.max(0, 100 - (pet.health || 100));
    
    updateStatBar(elements.hungerBar, elements.hungerValue, hunger, 'hunger');
    updateStatBar(elements.energyBar, elements.energyValue, energy, 'energy');
    updateStatBar(elements.hygieneBar, elements.hygieneValue, hygiene, 'hygiene');
    
    // Update mood and condition
    updatePetMood(pet.happiness || 100);
    updatePetCondition(pet.health || 100, pet.diseases || []);
}

function updateStatBar(barElement, valueElement, percentage, type) {
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    barElement.style.width = `${clampedPercentage}%`;
    valueElement.textContent = `${Math.round(clampedPercentage)}%`;
    
    // Update color based on value
    if (clampedPercentage < 30) {
        barElement.style.background = 'linear-gradient(90deg, #ff0000, #ff4444)';
    } else if (clampedPercentage < 60) {
        barElement.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc44)';
    } else {
        // Use default colors based on type
        const colors = {
            health: 'linear-gradient(90deg, #ff006e, #ff6b6b)',
            happiness: 'linear-gradient(90deg, #ffd93d, #ffed4e)',
            hunger: 'linear-gradient(90deg, #ff8c42, #ffa726)',
            energy: 'linear-gradient(90deg, #4ecdc4, #44a08d)',
            hygiene: 'linear-gradient(90deg, #a8e6cf, #88d8c0)'
        };
        barElement.style.background = colors[type] || colors.health;
    }
}

function updatePetMood(happiness) {
    let mood = '😊 Happy';
    if (happiness < 30) mood = '😢 Sad';
    else if (happiness < 60) mood = '😐 Neutral';
    else if (happiness < 80) mood = '🙂 Good';
    
    elements.petMood.textContent = mood;
}

function updatePetCondition(health, diseases) {
    let condition = '✅ Healthy';
    if (health < 30) condition = '💀 Critical';
    else if (health < 60) condition = '🤒 Sick';
    else if (health < 80) condition = '🤕 Injured';
    
    elements.petCondition.textContent = condition;
    
    // Show diseases if any
    if (diseases && diseases.length > 0) {
        elements.petDiseases.classList.remove('hidden');
        elements.petDiseases.innerHTML = `<strong>🤒 Diseases:</strong> ${diseases.join(', ')}`;
    } else {
        elements.petDiseases.classList.add('hidden');
    }
}

function hidePetStatus() {
    elements.petStatusDisplay.classList.add('hidden');
}

async function refreshPetStatus() {
    const petId = elements.petSelector.value;
    if (petId) {
        await loadPetStatus(petId);
    } else {
        logToConsole('❌ Please select a pet first', 'error');
    }
}

async function feedPet(e) {
    e.preventDefault();
    const petId = elements.petSelector.value;
    const food = document.getElementById('food-type').value || 'Croquetas';
    
    if (!petId) {
        logToConsole('❌ Please select a pet first', 'error');
        return;
    }
    
    logToConsole(`🍽️ Feeding pet ${petId} with ${food}...`, 'info');
    
    const result = await apiRequest(`/pet-care/${petId}/feed`, {
        method: 'POST',
        body: JSON.stringify({ food })
    });
    
    if (result) {
        logToConsole('✅ Pet fed successfully!', 'success');
        logToConsole(`🍖 Food: ${food}`, 'info');
        e.target.reset();
        await refreshPetStatus();
    }
}

async function walkPet(e) {
    e.preventDefault();
    const petId = elements.petSelector.value;
    
    if (!petId) {
        logToConsole('❌ Please select a pet first', 'error');
        return;
    }
    
    logToConsole(`🚶 Walking pet ${petId}...`, 'info');
    
    const result = await apiRequest(`/pet-care/${petId}/walk`, {
        method: 'POST'
    });
    
    if (result) {
        logToConsole('✅ Pet walked successfully!', 'success');
        logToConsole('🚶 Pet is now more energetic!', 'info');
        await refreshPetStatus();
    }
}

async function playPet(e) {
    e.preventDefault();
    const petId = elements.petSelector.value;
    
    if (!petId) {
        logToConsole('❌ Please select a pet first', 'error');
        return;
    }
    
    logToConsole(`🎮 Playing with pet ${petId}...`, 'info');
    
    const result = await apiRequest(`/pet-care/${petId}/play`, {
        method: 'POST'
    });
    
    if (result) {
        logToConsole('✅ Played with pet successfully!', 'success');
        logToConsole('🎮 Pet is now happier!', 'info');
        await refreshPetStatus();
    }
}

async function bathPet(e) {
    e.preventDefault();
    const petId = elements.petSelector.value;
    
    if (!petId) {
        logToConsole('❌ Please select a pet first', 'error');
        return;
    }
    
    logToConsole(`🛁 Bathing pet ${petId}...`, 'info');
    
    const result = await apiRequest(`/pet-care/${petId}/bath`, {
        method: 'POST'
    });
    
    if (result) {
        logToConsole('✅ Pet bathed successfully!', 'success');
        logToConsole('🛁 Pet is now clean and healthy!', 'info');
        await refreshPetStatus();
    }
}

async function healPet(e) {
    e.preventDefault();
    const petId = elements.petSelector.value;
    const disease = document.getElementById('disease-type').value;
    
    if (!petId) {
        logToConsole('❌ Please select a pet first', 'error');
        return;
    }
    
    if (!disease) {
        logToConsole('❌ Please select a disease to heal', 'error');
        return;
    }
    
    logToConsole(`💊 Healing pet ${petId} from ${disease}...`, 'info');
    
    const result = await apiRequest(`/pet-care/${petId}/heal`, {
        method: 'POST',
        body: JSON.stringify({ disease })
    });
    
    if (result) {
        logToConsole('✅ Pet healed successfully!', 'success');
        logToConsole(`💊 Cured: ${disease}`, 'info');
        e.target.reset();
        await refreshPetStatus();
    }
}

async function customizePet(e) {
    e.preventDefault();
    const petId = elements.petSelector.value;
    const item = document.getElementById('customization-type').value;
    
    if (!petId) {
        logToConsole('❌ Please select a pet first', 'error');
        return;
    }
    
    if (!item) {
        logToConsole('❌ Please select an item to customize', 'error');
        return;
    }
    
    logToConsole(`🎨 Customizing pet ${petId} with ${item}...`, 'info');
    
    const result = await apiRequest(`/pet-care/${petId}/customize`, {
        method: 'POST',
        body: JSON.stringify({ item, type: 'accesorio' })
    });
    
    if (result) {
        logToConsole('✅ Pet customized successfully!', 'success');
        logToConsole(`🎨 Added: ${item}`, 'info');
        e.target.reset();
        await refreshPetStatus();
    }
}

// Items Functions
async function getItems() {
    logToConsole('🎒 Fetching items...', 'info');
    
    const items = await apiRequest('/items');
    if (items) {
        displayItems(items);
        logToConsole(`✅ Found ${items.length} items`, 'success');
    }
}

async function createItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = {
        name: formData.get('name') || document.getElementById('item-name').value,
        description: formData.get('description') || document.getElementById('item-description').value,
        type: formData.get('type') || document.getElementById('item-type').value
    };
    
    logToConsole('🎒 Creating new item...', 'info');
    
    const item = await apiRequest('/items', {
        method: 'POST',
        body: JSON.stringify(itemData)
    });
    
    if (item) {
        logToConsole(`✅ Item created: ${item.name}`, 'success');
        e.target.reset();
        getItems(); // Refresh the list
    }
}

function displayItems(items) {
    elements.itemsList.innerHTML = '';
    
    if (items.length === 0) {
        elements.itemsList.innerHTML = '<div class="console-message">No items found</div>';
        return;
    }
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-item';
        itemElement.innerHTML = `
            <h4>🎒 ${item.name}</h4>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>ID:</strong> ${item._id}</p>
        `;
        elements.itemsList.appendChild(itemElement);
    });
}

// UI Functions
function switchTab(tabName) {
    // Remove active class from all tabs and contents
    elements.tabButtons.forEach(btn => btn.classList.remove('active'));
    elements.tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    logToConsole(`📋 Switched to ${tabName} tab`, 'info');
}

function showAuthPanel() {
    elements.authPanel.classList.remove('hidden');
    elements.gamePanel.classList.add('hidden');
}

function showGamePanel() {
    elements.authPanel.classList.add('hidden');
    elements.gamePanel.classList.remove('hidden');
}

function updateStatus() {
    if (authToken) {
        elements.connectionStatus.textContent = 'CONNECTED';
        elements.connectionStatus.style.color = '#4ade80';
        elements.tokenStatus.textContent = 'SET';
        elements.tokenStatus.style.color = '#4ade80';
    } else {
        elements.connectionStatus.textContent = 'DISCONNECTED';
        elements.connectionStatus.style.color = '#ff006e';
        elements.tokenStatus.textContent = 'NOT SET';
        elements.tokenStatus.style.color = '#ff006e';
    }
}

function logout() {
    authToken = null;
    localStorage.removeItem('authToken');
    updateStatus();
    showAuthPanel();
    logToConsole('🔓 Logged out successfully', 'warning');
    logToConsole('👋 You can login again or register a new account', 'info');
}

// Console Functions
function logToConsole(message, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.className = `console-message console-${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    messageElement.innerHTML = `[${timestamp}] ${message}`;
    
    elements.consoleOutput.appendChild(messageElement);
    elements.consoleOutput.scrollTop = elements.consoleOutput.scrollHeight;
    
    // Add some visual feedback
    messageElement.style.animation = 'none';
    messageElement.offsetHeight; // Trigger reflow
    messageElement.style.animation = 'messageGlow 2s ease-in-out infinite alternate';
}

function clearConsole() {
    elements.consoleOutput.innerHTML = '';
    logToConsole('🗑️ Console cleared', 'info');
}

// Error handling
window.addEventListener('error', function(e) {
    logToConsole(`❌ JavaScript Error: ${e.message}`, 'error');
});

// Network status monitoring
window.addEventListener('online', function() {
    logToConsole('🌐 Network connection restored', 'success');
    elements.connectionStatus.textContent = 'ONLINE';
            elements.connectionStatus.style.color = '#4ade80';
});

window.addEventListener('offline', function() {
    logToConsole('🌐 Network connection lost', 'error');
    elements.connectionStatus.textContent = 'OFFLINE';
    elements.connectionStatus.style.color = '#ff006e';
});

// Add some retro sound effects (optional)
function playRetroSound(type = 'click') {
    // This would integrate with Web Audio API for retro sounds
    // For now, we'll just add visual feedback
    console.log(`🎵 Playing ${type} sound`);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchTab('heroes');
                break;
            case '2':
                e.preventDefault();
                switchTab('pets');
                break;
            case '3':
                e.preventDefault();
                switchTab('pet-care');
                break;
            case '4':
                e.preventDefault();
                switchTab('items');
                break;
            case 'l':
                e.preventDefault();
                logout();
                break;
        }
    }
});

// Add some retro animations
function addRetroEffect(element) {
    element.style.transform = 'scale(1.05)';
    element.style.filter = 'brightness(1.2)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.filter = 'brightness(1)';
    }, 150);
}

// Apply retro effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('game-button') || 
        e.target.classList.contains('action-button') ||
        e.target.classList.contains('tab-button')) {
        addRetroEffect(e.target);
    }
}); 