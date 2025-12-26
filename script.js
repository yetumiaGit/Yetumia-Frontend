// État de l'application
const AppState = {
    isLoggedIn: false,
    currentUser: null,
    darkMode: false,
    searchHistory: [],
    currentResults: [],
    suggestionsVisible: false,
    detectedLanguage: null
};

// Dictionnaire de données plus complet
const DictionaryData = {
    words: [
        // Mots Swahili → Français
        {
            id: 1,
            swahili: "jambo",
            french: "bonjour",
            type: "noun",
            category: ["salutation", "courant"],
            example: "Jambo rafiki yangu! - Bonjour mon ami!",
            pronunciation: "jam-bo",
            frequency: 10,
            validated: true
        },
        {
            id: 2,
            swahili: "asante",
            french: "merci",
            type: "noun",
            category: ["salutation", "politesse"],
            example: "Asante sana - Merci beaucoup",
            pronunciation: "a-san-te",
            frequency: 9,
            validated: true
        },
        {
            id: 3,
            swahili: "rafiki",
            french: "ami",
            type: "noun",
            category: ["relation", "personne"],
            example: "Yeye ni rafiki yangu - C'est mon ami",
            pronunciation: "ra-fi-ki",
            frequency: 8,
            validated: true
        },
        {
            id: 4,
            swahili: "nyumba",
            french: "maison",
            type: "noun",
            category: ["logement", "bâtiment"],
            example: "Nyumba yangu ni kubwa - Ma maison est grande",
            pronunciation: "nyum-ba",
            frequency: 7,
            validated: true
        },
        {
            id: 5,
            swahili: "kula",
            french: "manger",
            type: "verb",
            category: ["action", "nourriture"],
            example: "Ninataka kula chakula - Je veux manger de la nourriture",
            pronunciation: "ku-la",
            frequency: 8,
            validated: true
        },
        {
            id: 6,
            swahili: "maji",
            french: "eau",
            type: "noun",
            category: ["élément", "boisson"],
            example: "Nataka maji baridi - Je veux de l'eau froide",
            pronunciation: "ma-ji",
            frequency: 7,
            validated: true
        },
        {
            id: 7,
            swahili: "hakuna matata",
            french: "pas de problème",
            type: "expression",
            category: ["expression", "courant"],
            example: "Usijali, hakuna matata - Ne t'inquiète pas, il n'y a pas de problème",
            pronunciation: "ha-ku-na ma-ta-ta",
            frequency: 9,
            validated: true
        },
        {
            id: 8,
            swahili: "karibu",
            french: "bienvenue",
            type: "interjection",
            category: ["salutation", "politesse"],
            example: "Karibu nyumbani - Bienvenue à la maison",
            pronunciation: "ka-ri-bu",
            frequency: 8,
            validated: true
        },
        {
            id: 9,
            swahili: "sawa",
            french: "d'accord",
            type: "adverb",
            category: ["accord", "réponse"],
            example: "Sawa, tutafanya hivyo - D'accord, nous le ferons ainsi",
            pronunciation: "sa-wa",
            frequency: 7,
            validated: true
        },
        {
            id: 10,
            swahili: "pole",
            french: "désolé",
            type: "interjection",
            category: ["politesse", "empathie"],
            example: "Pole kwa kuchelewa - Désolé pour le retard",
            pronunciation: "po-le",
            frequency: 6,
            validated: true
        },
        
        // Mots Français → Swahili
        {
            id: 11,
            swahili: "mtoto",
            french: "enfant",
            type: "noun",
            category: ["personne", "famille"],
            example: "Mtoto anasoma - L'enfant lit",
            pronunciation: "m-to-to",
            frequency: 7,
            validated: true
        },
        {
            id: 12,
            swahili: "shule",
            french: "école",
            type: "noun",
            category: ["éducation", "bâtiment"],
            example: "Anaenda shule kila siku - Il va à l'école chaque jour",
            pronunciation: "shu-le",
            frequency: 6,
            validated: true
        },
        {
            id: 13,
            swahili: "kitabu",
            french: "livre",
            type: "noun",
            category: ["objet", "éducation"],
            example: "Ninasoma kitabu kizuri - Je lis un bon livre",
            pronunciation: "ki-ta-bu",
            frequency: 6,
            validated: true
        },
        {
            id: 14,
            swahili: "samaki",
            french: "poisson",
            type: "noun",
            category: ["animal", "nourriture"],
            example: "Ninapenda kula samaki - J'aime manger du poisson",
            pronunciation: "sa-ma-ki",
            frequency: 5,
            validated: true
        },
        {
            id: 15,
            swahili: "mbwa",
            french: "chien",
            type: "noun",
            category: ["animal", "domestique"],
            example: "Mbwa wangu ni mrembo - Mon chien est beau",
            pronunciation: "m-bwa",
            frequency: 5,
            validated: true
        }
    ],
    
    // Mots supplémentaires pour suggestions
    suggestions: [
        "jambo", "asante", "rafiki", "nyumba", "kula", "maji", "hakuna matata",
        "karibu", "sawa", "ndio", "hapana", "pole", "tafadhali",
        "mtoto", "shule", "kitabu", "samaki", "mbwa", "paka", "tembea"
    ],
    
    // Suggestions françaises
    frenchSuggestions: [
        "bonjour", "merci", "ami", "maison", "manger", "eau", "problème",
        "bienvenue", "enfant", "école", "livre", "poisson", "chien",
        "chat", "marcher", "parler", "apprendre", "enseigner", "traduire"
    ]
};

// Fonction de détection de langue intelligente
function detectLanguage(text) {
    if (!text || text.trim() === '') return null;
    
    const cleanedText = text.toLowerCase().trim();
    
    // Mots clés swahili
    const swahiliIndicators = [
        'jambo', 'asante', 'rafiki', 'nyumba', 'kula', 'maji', 'hakuna',
        'karibu', 'sawa', 'pole', 'tafadhali', 'mtoto', 'shule', 'kitabu',
        'samaki', 'mbwa', 'paka', 'tembea', 'ndio', 'hapana'
    ];
    
    // Mots clés français
    const frenchIndicators = [
        'bonjour', 'merci', 'ami', 'maison', 'manger', 'eau', 'problème',
        'bienvenue', 'enfant', 'école', 'livre', 'poisson', 'chien',
        'chat', 'marcher', 'parler', 'apprendre', 'enseigner', 'traduire'
    ];
    
    // Vérifier les indicateurs swahili
    for (const word of swahiliIndicators) {
        if (cleanedText.includes(word)) {
            return 'swahili';
        }
    }
    
    // Vérifier les indicateurs français
    for (const word of frenchIndicators) {
        if (cleanedText.includes(word)) {
            return 'french';
        }
    }
    
    // Détection par caractères (approximation)
    const hasSwahiliChars = /[kwgh]/.test(cleanedText);
    const hasFrenchChars = /[éèêëàâäçîïôöùûü]/.test(cleanedText);
    
    if (hasFrenchChars && !hasSwahiliChars) return 'french';
    if (hasSwahiliChars && !hasFrenchChars) return 'swahili';
    
    // Par défaut, considérer comme swahili (langue principale du dictionnaire)
    return 'swahili';
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Charger l'état
    loadState();
    
    // Initialiser les événements
    initEventListeners();
    
    // Appliquer le thème
    applyTheme();
    
    // Afficher les mots populaires
    displayPopularWords();
    
    // Initialiser les suggestions
    initSuggestions();
    
    // Mettre à jour l'interface de connexion
    updateUIForLoginState();
}

// Gestion de l'état
function loadState() {
    const savedTheme = localStorage.getItem('yetumia_theme');
    const savedHistory = localStorage.getItem('yetumia_history');
    
    if (savedTheme === 'dark') {
        AppState.darkMode = true;
    }
    
    if (savedHistory) {
        AppState.searchHistory = JSON.parse(savedHistory);
    }
}

function saveState() {
    localStorage.setItem('yetumia_theme', AppState.darkMode ? 'dark' : 'light');
    localStorage.setItem('yetumia_history', JSON.stringify(AppState.searchHistory));
}

// Thème
function applyTheme() {
    if (AppState.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function toggleTheme() {
    AppState.darkMode = !AppState.darkMode;
    applyTheme();
    saveState();
}

// Événements
function initEventListeners() {
    // Menu
    document.querySelector('.menu-toggle').addEventListener('click', toggleSidebar);
    document.querySelector('.close-menu').addEventListener('click', toggleSidebar);
    
    // Thème
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    
    // Recherche
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', showSuggestions);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    
    // Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeAllModals();
        });
    });
    
    // Boutons
    document.getElementById('contributeBtn').addEventListener('click', openContributeModal);
    document.getElementById('loginBtn').addEventListener('click', openLoginModal);
    document.getElementById('sidebarLoginBtn').addEventListener('click', openLoginModal);
    document.getElementById('sidebarRegisterBtn').addEventListener('click', openRegisterModal);
    document.getElementById('loginFromContribute').addEventListener('click', openLoginModal);
    document.getElementById('switchToRegister').addEventListener('click', switchToRegister);
    document.getElementById('switchToLogin').addEventListener('click', switchToLogin);
    
    // Formulaires
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('contributeForm').addEventListener('submit', handleContribution);
    
    // Clic externe pour fermer les suggestions
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            hideSuggestions();
        }
    });
}

// Menu
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Recherche intelligente
function handleSearchInput(e) {
    const query = e.target.value.trim();
    if (query) {
        // Détecter la langue
        AppState.detectedLanguage = detectLanguage(query);
        updateLanguageDetection();
        
        // Mettre à jour les suggestions
        updateSuggestions(query);
        showSuggestions();
    } else {
        hideSuggestions();
        resetLanguageDetection();
    }
}

function updateLanguageDetection() {
    const detectionElement = document.getElementById('languageDetection');
    if (!detectionElement) return;
    
    if (AppState.detectedLanguage) {
        const languageNames = {
            'swahili': 'Swahili',
            'french': 'Français'
        };
        
        detectionElement.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg>
            <span>Langue détectée : <strong>${languageNames[AppState.detectedLanguage]}</strong></span>
        `;
        detectionElement.style.display = 'flex';
    }
}

function resetLanguageDetection() {
    const detectionElement = document.getElementById('languageDetection');
    if (detectionElement) {
        detectionElement.innerHTML = `
            <span class="detected-language">Recherche bidirectionnelle active</span>
        `;
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        displayPopularWords();
        return;
    }
    
    // Ajouter à l'historique
    addToHistory(query);
    
    // Masquer les suggestions
    hideSuggestions();
    
    // Rechercher dans les deux langues
    const results = searchWords(query);
    displayResults(results, query);
}

// Recherche bidirectionnelle intelligente
function searchWords(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    return DictionaryData.words.filter(word => {
        if (!word.validated) return false;
        
        // Recherche dans les deux langues
        const matchesSwahili = word.swahili.toLowerCase().includes(normalizedQuery);
        const matchesFrench = word.french.toLowerCase().includes(normalizedQuery);
        
        // Recherche dans les exemples
        const matchesExample = word.example && word.example.toLowerCase().includes(normalizedQuery);
        
        // Recherche dans les catégories
        const matchesCategory = word.category && word.category.some(cat => 
            cat.toLowerCase().includes(normalizedQuery)
        );
        
        return matchesSwahili || matchesFrench || matchesExample || matchesCategory;
    });
}

// Affichage
function displayPopularWords() {
    const results = DictionaryData.words
        .filter(word => word.validated)
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 9);
    
    AppState.currentResults = results;
    
    const container = document.getElementById('resultsContainer');
    const title = document.getElementById('resultsTitle');
    const count = document.getElementById('resultsCount');
    
    title.textContent = 'Mots populaires';
    count.textContent = `${results.length} mots`;
    
    container.innerHTML = results.map(word => createWordCard(word)).join('');
}

function displayResults(results, query) {
    AppState.currentResults = results;
    
    const container = document.getElementById('resultsContainer');
    const title = document.getElementById('resultsTitle');
    const count = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    
    title.textContent = query ? `Résultats pour "${query}"` : 'Résultats';
    count.textContent = `${results.length} résultat${results.length !== 1 ? 's' : ''}`;
    
    if (results.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    container.innerHTML = results.map(word => createWordCard(word, query)).join('');
}

function createWordCard(word, query = '') {
    const queryLower = query.toLowerCase();
    const isSwahiliMatch = word.swahili.toLowerCase().includes(queryLower);
    const isFrenchMatch = word.french.toLowerCase().includes(queryLower);
    
    // Déterminer quelle langue correspond à la recherche
    const searchMatchType = isSwahiliMatch ? 'swahili' : isFrenchMatch ? 'french' : 'example';
    
    return `
        <div class="result-card">
            <div class="result-header">
                <div>
                    <div class="result-word">${word.swahili}</div>
                    <div class="result-language-tag">
                        <span class="language-badge swahili">Swahili</span>
                        <span class="language-arrow">→</span>
                        <span class="language-badge french">Français</span>
                    </div>
                </div>
                <span class="result-type">${getTypeLabel(word.type)}</span>
            </div>
            
            <div class="result-translation">
                <strong>Traduction :</strong> ${word.french}
            </div>
            
            ${word.pronunciation ? `
            <div class="result-pronunciation">
                <strong>Prononciation :</strong> ${word.pronunciation}
                <button class="pronounce-btn" onclick="playAudio('${word.swahili}')" aria-label="Prononcer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                </button>
            </div>
            ` : ''}
            
            ${word.category ? `
            <div class="result-categories">
                ${word.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
            </div>
            ` : ''}
            
            ${word.example ? `
            <div class="result-example">
                <strong>Exemple :</strong> ${word.example}
            </div>
            ` : ''}
            
            <div class="result-actions">
                <button class="btn-action" onclick="suggestCorrection(${word.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Suggérer une correction
                </button>
                <button class="btn-action" onclick="addToFavorites(${word.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Ajouter aux favoris
                </button>
            </div>
        </div>
    `;
}

function getTypeLabel(type) {
    const labels = {
        'noun': 'Nom',
        'verb': 'Verbe',
        'adjective': 'Adjectif',
        'adverb': 'Adverbe',
        'expression': 'Expression',
        'interjection': 'Interjection'
    };
    return labels[type] || type;
}

// Suggestions intelligentes
function initSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    container.innerHTML = '<div class="suggestions-list" id="suggestionsList"></div>';
}

function showSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    container.classList.add('active');
    AppState.suggestionsVisible = true;
}

function hideSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    container.classList.remove('active');
    AppState.suggestionsVisible = false;
}

function updateSuggestions(query) {
    const list = document.getElementById('suggestionsList');
    const normalizedQuery = query.toLowerCase();
    
    if (!query) {
        list.innerHTML = '';
        return;
    }
    
    // Suggestions de l'historique
    const historySuggestions = AppState.searchHistory
        .filter(item => item.toLowerCase().includes(normalizedQuery))
        .slice(0, 3);
    
    // Suggestions swahili
    const swahiliSuggestions = DictionaryData.suggestions
        .filter(item => item.toLowerCase().includes(normalizedQuery))
        .slice(0, 5);
    
    // Suggestions françaises
    const frenchSuggestions = DictionaryData.frenchSuggestions
        .filter(item => item.toLowerCase().includes(normalizedQuery))
        .slice(0, 5);
    
    // Fusionner et dédupliquer
    const allSuggestions = [...new Set([
        ...historySuggestions, 
        ...swahiliSuggestions, 
        ...frenchSuggestions
    ])];
    
    if (allSuggestions.length === 0) {
        list.innerHTML = '<div class="suggestion-item">Aucune suggestion</div>';
        return;
    }
    
    list.innerHTML = allSuggestions.map(item => {
        const language = detectLanguage(item);
        const languageLabel = language === 'swahili' ? 'sw' : 'fr';
        const languageName = language === 'swahili' ? 'Swahili' : 'Français';
        
        return `
            <div class="suggestion-item" data-word="${item}" data-language="${language}">
                <span>${item}</span>
                <span class="suggestion-language">${languageLabel}</span>
            </div>
        `;
    }).join('');
    
    // Ajouter les événements
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            document.getElementById('searchInput').value = word;
            performSearch();
            hideSuggestions();
        });
    });
}

function addToHistory(query) {
    if (!AppState.searchHistory.includes(query)) {
        AppState.searchHistory.unshift(query);
        if (AppState.searchHistory.length > 15) {
            AppState.searchHistory.pop();
        }
        saveState();
    }
}

// Modals
function openModal(id) {
    closeAllModals();
    const modal = document.getElementById(id);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

function openLoginModal() {
    closeAllModals();
    setTimeout(() => openModal('loginModal'), 10);
}

function openRegisterModal() {
    closeAllModals();
    setTimeout(() => openModal('registerModal'), 10);
}

function openContributeModal() {
    closeAllModals();
    setTimeout(() => {
        if (AppState.isLoggedIn) {
            document.getElementById('contributeLoginRequired').style.display = 'none';
            document.getElementById('contributeForm').style.display = 'block';
        } else {
            document.getElementById('contributeLoginRequired').style.display = 'block';
            document.getElementById('contributeForm').style.display = 'none';
        }
        openModal('contributeModal');
    }, 10);
}

function switchToRegister(e) {
    e.preventDefault();
    closeAllModals();
    setTimeout(() => openRegisterModal(), 300);
}

function switchToLogin(e) {
    e.preventDefault();
    closeAllModals();
    setTimeout(() => openLoginModal(), 300);
}

// Formulaires
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password.length >= 6) {
        AppState.isLoggedIn = true;
        AppState.currentUser = {
            name: email.split('@')[0],
            email: email
        };
        
        showNotification('Connexion réussie');
        closeAllModals();
        updateUIForLoginState();
        e.target.reset();
    } else {
        showNotification('Email ou mot de passe invalide', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerPasswordConfirm').value;
    
    if (!name || !email || !password) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Le mot de passe doit contenir 8 caractères minimum', 'error');
        return;
    }
    
    if (password !== confirm) {
        showNotification('Les mots de passe ne correspondent pas', 'error');
        return;
    }
    
    AppState.isLoggedIn = true;
    AppState.currentUser = { name, email };
    
    showNotification('Compte créé avec succès');
    closeAllModals();
    updateUIForLoginState();
    e.target.reset();
}

function handleContribution(e) {
    e.preventDefault();
    
    if (!AppState.isLoggedIn) {
        openLoginModal();
        return;
    }
    
    const swahili = document.getElementById('swahiliWord').value.trim();
    const french = document.getElementById('frenchTranslation').value.trim();
    const wordType = document.getElementById('wordType').value;
    const example = document.getElementById('exampleSentence').value.trim();
    
    if (!swahili || !french) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Simulation d'envoi au backend
    const contributionData = {
        swahili, 
        french, 
        type: wordType || null,
        example: example || null,
        user: AppState.currentUser.email,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    console.log('Contribution soumise:', contributionData);
    
    showNotification('Merci pour votre contribution ! Elle sera examinée par nos linguistes.');
    closeAllModals();
    e.target.reset();
}

function updateUIForLoginState() {
    const loginBtn = document.getElementById('loginBtn');
    const contributeBtn = document.getElementById('contributeBtn');
    
    if (AppState.isLoggedIn) {
        loginBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        `;
        loginBtn.setAttribute('aria-label', 'Mon compte');
        
        contributeBtn.style.opacity = '1';
        contributeBtn.style.pointerEvents = 'auto';
    } else {
        loginBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
        `;
        loginBtn.setAttribute('aria-label', 'Connexion');
    }
}

// Fonctions utilitaires
function suggestCorrection(wordId) {
    if (!AppState.isLoggedIn) {
        openLoginModal();
        return;
    }
    
    const word = DictionaryData.words.find(w => w.id === wordId);
    if (!word) return;
    
    const correction = prompt(`Suggérer une correction pour "${word.swahili}" (${word.french}):`, word.french);
    
    if (correction) {
        console.log('Correction suggérée:', { 
            wordId, 
            original: word.french, 
            correction,
            user: AppState.currentUser.email,
            date: new Date().toISOString(),
            status: 'pending'
        });
        showNotification('Correction suggérée avec succès');
    }
}

function addToFavorites(wordId) {
    if (!AppState.isLoggedIn) {
        openLoginModal();
        return;
    }
    
    const word = DictionaryData.words.find(w => w.id === wordId);
    if (!word) return;
    
    // Simulation d'ajout aux favoris
    console.log('Ajouté aux favoris:', word);
    showNotification(`"${word.swahili}" ajouté à vos favoris`);
}

function playAudio(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Détecter la langue pour la prononciation
        const language = detectLanguage(text);
        utterance.lang = language === 'french' ? 'fr-FR' : 'sw-KE';
        
        utterance.rate = 0.8;
        utterance.volume = 0.8;
        utterance.pitch = 1;
        
        speechSynthesis.speak(utterance);
        showNotification(`Prononciation de "${text}"`);
    } else {
        showNotification('La synthèse vocale n\'est pas disponible sur ce navigateur', 'info');
    }
}

function showNotification(message, type = 'success') {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 12px 24px;
        background: ${type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#10b981'};
        color: white;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 320px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Ajouter des styles pour les nouvelles fonctionnalités
const additionalStyles = `
    .result-language-tag {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        font-size: 14px;
    }
    
    .language-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .language-badge.swahili {
        background: rgba(66, 160, 244, 0.1);
        color: #42a0f4;
        border: 1px solid rgba(66, 160, 244, 0.2);
    }
    
    .language-badge.french {
        background: rgba(139, 195, 74, 0.1);
        color: #8bc34a;
        border: 1px solid rgba(139, 195, 74, 0.2);
    }
    
    .language-arrow {
        color: var(--text-tertiary);
        font-weight: 500;
    }
    
    .result-pronunciation {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 12px 0;
        padding: 8px 12px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-sm);
        font-size: 14px;
    }
    
    .pronounce-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .result-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 12px 0;
    }
    
    .category-tag {
        padding: 4px 10px;
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .dark-mode .language-badge.swahili {
        background: rgba(138, 180, 248, 0.1);
        color: #8ab4f8;
        border-color: rgba(138, 180, 248, 0.2);
    }
    
    .dark-mode .language-badge.french {
        background: rgba(174, 213, 129, 0.1);
        color: #aed581;
        border-color: rgba(174, 213, 129, 0.2);
    }
`;

// Injecter les styles supplémentaires
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Ajouter quelques mots à l'historique pour la démo
if (AppState.searchHistory.length === 0) {
    AppState.searchHistory = ['jambo', 'bonjour', 'asante', 'merci', 'rafiki'];
}