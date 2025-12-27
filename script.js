// État de l'application
const AppState = {
    isLoggedIn: false,
    currentUser: null,
    darkMode: false,
    searchHistory: [],
    currentResults: [],
    suggestionsVisible: false,
    detectedLanguage: null,
    currentPage: 'home'
};

// Dictionnaire de données
const DictionaryData = {
    words: [
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
    
    suggestions: [
        "jambo", "asante", "rafiki", "nyumba", "kula", "maji", "hakuna matata",
        "karibu", "sawa", "ndio", "hapana", "pole", "tafadhali",
        "mtoto", "shule", "kitabu", "samaki", "mbwa", "paka", "tembea"
    ],
    
    frenchSuggestions: [
        "bonjour", "merci", "ami", "maison", "manger", "eau", "problème",
        "bienvenue", "enfant", "école", "livre", "poisson", "chien",
        "chat", "marcher", "parler", "apprendre", "enseigner", "traduire"
    ]
};

// Fonction de détection de langue
function detectLanguage(text) {
    if (!text || text.trim() === '') return null;
    
    const cleanedText = text.toLowerCase().trim();
    
    const swahiliIndicators = [
        'jambo', 'asante', 'rafiki', 'nyumba', 'kula', 'maji', 'hakuna',
        'karibu', 'sawa', 'pole', 'tafadhali', 'mtoto', 'shule', 'kitabu',
        'samaki', 'mbwa', 'paka', 'tembea', 'ndio', 'hapana'
    ];
    
    const frenchIndicators = [
        'bonjour', 'merci', 'ami', 'maison', 'manger', 'eau', 'problème',
        'bienvenue', 'enfant', 'école', 'livre', 'poisson', 'chien',
        'chat', 'marcher', 'parler', 'apprendre', 'enseigner', 'traduire'
    ];
    
    for (const word of swahiliIndicators) {
        if (cleanedText.includes(word)) {
            return 'swahili';
        }
    }
    
    for (const word of frenchIndicators) {
        if (cleanedText.includes(word)) {
            return 'french';
        }
    }
    
    const hasSwahiliChars = /[kwgh]/.test(cleanedText);
    const hasFrenchChars = /[éèêëàâäçîïôöùûü]/.test(cleanedText);
    
    if (hasFrenchChars && !hasSwahiliChars) return 'french';
    if (hasSwahiliChars && !hasFrenchChars) return 'swahili';
    
    return 'swahili';
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    loadState();
    initEventListeners();
    applyTheme();
    displayPopularWords();
    initSuggestions();
    updateUIForLoginState();
    updateNavigation();
    
    // Ajouter le message de contribution
    addContributionMessage();
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
    document.getElementById('backToSearchBtn').addEventListener('click', showSearchResults);
    
    // Formulaires
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('contributeForm').addEventListener('submit', handleContribution);
    if (document.getElementById('contactFormModal')) {
        document.getElementById('contactFormModal').addEventListener('submit', handleContact);
    }
    
    // Clic externe pour fermer les suggestions
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            hideSuggestions();
        }
    });
    
    // Navigation
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
            toggleSidebar();
        });
    });
    
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                navigateTo(page);
            }
        });
    });
    
    // Navigation dans les résultats
    document.addEventListener('click', function(e) {
        const resultCard = e.target.closest('.result-card');
        if (resultCard && !e.target.closest('.btn-action')) {
            const wordId = parseInt(resultCard.dataset.wordId);
            if (wordId) {
                showWordDetail(wordId);
            }
        }
    });
}

// Navigation
function navigateTo(page) {
    AppState.currentPage = page;
    
    switch(page) {
        case 'home':
            showHomePage();
            break;
        case 'dictionary':
            // Déjà sur la page dictionnaire
            break;
        case 'grammar':
            showGrammarPage();
            break;
        case 'contact':
            showContactPage();
            break;
        case 'login':
            openLoginModal();
            break;
        case 'register':
            openRegisterModal();
            break;
        case 'contributions':
            openContributeModal();
            break;
        default:
            showHomePage();
    }
    
    updateNavigation();
}

function updateNavigation() {
    // Mettre à jour le menu actif
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === AppState.currentPage) {
            link.classList.add('active');
        }
    });
}

// Pages
function showHomePage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="logo-section">
            <div class="container">
                <div class="logo-center">
                    <svg class="main-logo" viewBox="0 0 640.51 146.75">
                        <defs>
                            <style>
                                .logo-main-svg {
                                    fill: #42a0f4;
                                    stroke-width: 0px;
                                }
                            </style>
                        </defs>
                        <g>
                            <path class="logo-main-svg" d="M259.43,40.13l-26.13,50.34v28.64h-12.95v-28.64l-26.25-50.34h14.43l18.29,38.75,18.3-38.75h14.32Z"/>
                            <path class="logo-main-svg" d="M321.1,92.63h-47.84c.38,5,2.23,9.02,5.57,12.04,3.33,3.03,7.42,4.55,12.27,4.55,6.97,0,11.89-2.91,14.77-8.75h13.98c-1.89,5.76-5.32,10.47-10.28,14.15-4.96,3.68-11.12,5.51-18.47,5.51-5.98,0-11.35-1.34-16.08-4.03-4.74-2.69-8.45-6.48-11.14-11.36-2.69-4.89-4.03-10.55-4.03-16.99s1.31-12.1,3.92-16.99c2.61-4.89,6.29-8.65,11.02-11.31,4.73-2.65,10.17-3.98,16.31-3.98s11.17,1.29,15.79,3.86c4.62,2.57,8.22,6.19,10.8,10.85,2.57,4.66,3.86,10.02,3.86,16.08,0,2.35-.15,4.47-.45,6.36ZM308.04,82.17c-.08-4.77-1.78-8.6-5.11-11.48-3.33-2.88-7.46-4.32-12.39-4.32-4.47,0-8.3,1.42-11.48,4.26-3.18,2.84-5.08,6.69-5.68,11.54h34.66Z"/>
                            <path class="logo-main-svg" d="M349.4,67.06v34.66c0,2.35.55,4.04,1.65,5.06,1.1,1.02,2.97,1.53,5.62,1.53h7.95v10.8h-10.23c-5.83,0-10.3-1.36-13.41-4.09-3.11-2.73-4.66-7.16-4.66-13.3v-34.66h-7.39v-10.57h7.39v-15.57h13.07v15.57h15.23v10.57h-15.23Z"/>
                            <path class="logo-main-svg" d="M433.26,56.49v62.61h-12.96v-7.39c-2.04,2.57-4.72,4.6-8.01,6.08-3.29,1.48-6.8,2.21-10.51,2.21-4.92,0-9.34-1.02-13.24-3.07-3.9-2.05-6.97-5.07-9.2-9.09-2.23-4.01-3.35-8.86-3.35-14.55v-36.82h12.84v34.89c0,5.61,1.4,9.91,4.2,12.9,2.8,2.99,6.63,4.49,11.48,4.49s8.69-1.5,11.53-4.49c2.84-2.99,4.26-7.29,4.26-12.9v-34.89h12.96Z"/>
                            <path class="logo-main-svg" d="M533.48,40.13v78.97h-12.95v-54.09l-24.09,54.09h-8.98l-24.2-54.09v54.09h-12.95V40.13h13.98l27.73,61.93,27.61-61.93h13.86Z"/>
                            <path class="logo-main-svg" d="M563.47,56.49v62.61h-12.95v-62.61h12.95Z"/>
                            <path class="logo-main-svg" d="M580.12,70.81c2.61-4.85,6.17-8.62,10.68-11.31,4.51-2.69,9.49-4.03,14.94-4.03,4.92,0,9.22.96,12.9,2.9,3.67,1.93,6.61,4.34,8.81,7.22v-9.09h13.07v62.61h-13.07v-9.32c-2.2,2.95-5.19,5.42-8.98,7.39-3.79,1.97-8.11,2.95-12.95,2.95-5.38,0-10.3-1.38-14.77-4.15-4.47-2.76-8.01-6.63-10.62-11.59-2.61-4.96-3.92-10.59-3.92-16.87s1.31-11.86,3.92-16.7ZM624.78,76.49c-1.78-3.18-4.11-5.61-6.99-7.27-2.88-1.66-5.98-2.5-9.32-2.5s-6.44.82-9.32,2.44c-2.88,1.63-5.21,4.02-6.99,7.16-1.78,3.14-2.67,6.87-2.67,11.19s.89,8.11,2.67,11.36c1.78,3.26,4.13,5.74,7.04,7.44,2.92,1.7,6,2.56,9.26,2.56s6.44-.83,9.32-2.5c2.88-1.66,5.21-4.11,6.99-7.33,1.78-3.22,2.67-6.99,2.67-11.31s-.89-8.07-2.67-11.25Z"/>
                            <rect class="logo-main-svg" x="547.23" y="35.74" width="19.8" height="10.8"/>
                        </g>
                        <g>
                            <circle class="logo-main-svg" cx="65.22" cy="26.5" r="26.5"/>
                            <circle class="logo-main-svg" cx="57.07" cy="97.83" r="20.38"/>
                            <circle class="logo-main-svg" cx="118.22" cy="71.34" r="24.46"/>
                            <circle class="logo-main-svg" cx="16.31" cy="130.45" r="16.31"/>
                        </g>
                    </svg>
                    <p class="logo-subtitle">La richesse des dialectes au coeur de notre Avenir.</p>
                </div>
            </div>
        </section>

        <section class="search-section">
            <div class="container">
                <div class="search-container">
                    <div class="search-box">
                        <div class="search-input-wrapper">
                            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                            <input 
                                type="text" 
                                id="searchInput" 
                                placeholder="Rechercher un mot en Swahili ou en Français..." 
                                autocomplete="off"
                                class="search-input"
                            >
                            <button class="search-action-btn" id="searchBtn" aria-label="Rechercher">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <polyline points="9 18 15 12 9 6"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div class="language-detection" id="languageDetection">
                            <span class="detected-language">Recherche bidirectionnelle active</span>
                        </div>
                        
                        <div class="suggestions-container" id="suggestionsContainer">
                            <div class="suggestions-list" id="suggestionsList"></div>
                        </div>
                    </div>
                    
                    <div class="search-instructions">
                        <div class="instruction">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 16v-4M12 8h.01"/>
                            </svg>
                            <span>Tapez en Swahili ou en Français - Le système détecte automatiquement</span>
                        </div>
                        <div class="instruction">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 16v-4M12 8h.01"/>
                            </svg>
                            <span>Appuyez sur le bouton plus pour contribuer avec un mot ou une expression.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="results-section" id="resultsSection">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title" id="resultsTitle">Mots populaires</h2>
                    <div class="results-count" id="resultsCount">Chargement...</div>
                </div>
                
                <div class="results-grid" id="resultsContainer"></div>
                
                <div class="no-results" id="noResults" style="display: none;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                        <line x1="8" y1="8" x2="16" y2="16" stroke-width="1.5"/>
                    </svg>
                    <h3>Aucun résultat trouvé</h3>
                    <p>Essayez avec d'autres termes de recherche</p>
                </div>
            </div>
        </section>

        <section class="features-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Fonctionnalités intelligentes</h2>
                    <p class="section-subtitle">Dictionnaire conçu pour l'apprentissage et l'IA</p>
                </div>
                
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Recherche bidirectionnelle</h3>
                        <p class="feature-description">Recherchez dans les deux sens : Swahili → Français et Français → Swahili. Le système détecte automatiquement la langue.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 20h9"/>
                                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Contributions validées</h3>
                        <p class="feature-description">Système collaboratif avec validation par nos linguistes pour garantir la qualité des données.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M19 11H5M14 17l-5-5 5-5"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Apprentissage intelligent</h3>
                        <p class="feature-description">Suggestions contextuelles et exemples d'utilisation pour mieux comprendre chaque mot.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Réinitialiser les écouteurs d'événements
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('focus', showSuggestions);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
        
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        displayPopularWords();
        initSuggestions();
        addContributionMessage();
        
        // Masquer la navigation des résultats
        document.querySelector('.results-navigation').classList.remove('active');
    }, 10);
    
    AppState.currentPage = 'home';
    updateNavigation();
}

function showGrammarPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="grammar-page">
            <div class="container">
                <h1 class="section-title">Grammaire Swahili</h1>
                <p class="section-subtitle">Apprenez les bases de la grammaire swahili</p>
                
                <div class="grammar-grid">
                    <div class="grammar-card">
                        <h3>Classes nominales</h3>
                        <p>Le swahili utilise un système de classes nominales pour organiser les noms.</p>
                        <ul>
                            <li>M-/WA- (personnes)</li>
                            <li>M-/MI- (arbres, objets longs)</li>
                            <li>KI-/VI- (objets, outils)</li>
                            <li>N- (animaux, objets)</li>
                            <li>U- (noms abstraits)</li>
                            <li>KU- (infinitifs)</li>
                            <li>PA- (lieux)</li>
                            <li>MU- (intérieur)</li>
                        </ul>
                    </div>
                    
                    <div class="grammar-card">
                        <h3>Conjugaison des verbes</h3>
                        <p>Les verbes swahili se conjuguent avec des préfixes.</p>
                        <ul>
                            <li>Ni-na-soma (je lis)</li>
                            <li>U-na-soma (tu lis)</li>
                            <li>A-na-soma (il/elle lit)</li>
                            <li>Tu-na-soma (nous lisons)</li>
                            <li>M-na-soma (vous lisez)</li>
                            <li>Wa-na-soma (ils/elles lisent)</li>
                        </ul>
                    </div>
                    
                    <div class="grammar-card">
                        <h3>Temps verbaux</h3>
                        <p>Les temps sont marqués par des infixes.</p>
                        <ul>
                            <li>Présent : -na- (ninasoma - je lis)</li>
                            <li>Passé : -li- (nilisoma - j'ai lu)</li>
                            <li>Futur : -ta- (nitasoma - je lirai)</li>
                            <li>Parfait : -me- (nimesoma - j'ai lu)</li>
                            <li>Conditionnel : -nge- (ningesoma - je lirais)</li>
                        </ul>
                    </div>
                    
                    <div class="grammar-card">
                        <h3>Adjectifs</h3>
                        <p>Les adjectifs s'accordent avec la classe nominale.</p>
                        <ul>
                            <li>Mzuri (beau/belle)</li>
                            <li>Kubwa (grand)</li>
                            <li>Ndogo (petit)</li>
                            <li>Refu (long)</li>
                            <li>Pana (large)</li>
                            <li>Chache (peu)</li>
                        </ul>
                    </div>
                    
                    <div class="grammar-card">
                        <h3>Pronoms personnels</h3>
                        <p>Les pronoms sont souvent inclus dans les verbes.</p>
                        <ul>
                            <li>Mimi (moi)</li>
                            <li>Wewe (toi)</li>
                            <li>Yeye (lui/elle)</li>
                            <li>Sisi (nous)</li>
                            <li>Nyinyi (vous)</li>
                            <li>Wao (eux/elles)</li>
                        </ul>
                    </div>
                    
                    <div class="grammar-card">
                        <h3>Négation</h3>
                        <p>La négation se forme avec des préfixes.</p>
                        <ul>
                            <li>Si-somi (je ne lis pas)</li>
                            <li>Hu-somi (tu ne lis pas)</li>
                            <li>Ha-somi (il/elle ne lit pas)</li>
                            <li>Ha-tu-somi (nous ne lisons pas)</li>
                            <li>Ha-m-somi (vous ne lisez pas)</li>
                            <li>Ha-wa-somi (ils/elles ne lisent pas)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Afficher la navigation des résultats
    document.querySelector('.results-navigation').classList.add('active');
    AppState.currentPage = 'grammar';
    updateNavigation();
}

function showContactPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="contact-page">
            <div class="container">
                <h1 class="section-title">Contactez-nous</h1>
                <p class="section-subtitle">Nous sommes à votre écoute pour toutes vos questions et suggestions</p>
                
                <div class="contact-form">
                    <form id="contactForm">
                        <div class="form-group">
                            <input type="text" id="contactName" placeholder="Votre nom" required class="form-input">
                        </div>
                        <div class="form-group">
                            <input type="email" id="contactEmail" placeholder="Votre email" required class="form-input">
                        </div>
                        <div class="form-group">
                            <input type="text" id="contactSubject" placeholder="Sujet" required class="form-input">
                        </div>
                        <div class="form-group">
                            <textarea id="contactMessage" placeholder="Votre message" required class="form-input" rows="6"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Envoyer le message</button>
                    </form>
                    
                    <div class="contact-info">
                        <h3>Autres moyens de contact</h3>
                        <p>Email: <a href="mailto:info@yetumia.com">info@yetumia.com</a></p>
                        <p>Site web: <a href="https://www.yetumia.com" target="_blank">www.yetumia.com</a></p>
                        <p>Téléphone: +33 1 23 45 67 89</p>
                        <p>Adresse: Paris, France</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Ajouter l'événement au formulaire de contact
    setTimeout(() => {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('contactName').value;
                const email = document.getElementById('contactEmail').value;
                const subject = document.getElementById('contactSubject').value;
                const message = document.getElementById('contactMessage').value;
                
                // Simulation d'envoi
                console.log('Message envoyé:', { name, email, subject, message });
                showNotification('Votre message a été envoyé avec succès');
                
                // Réinitialiser le formulaire
                this.reset();
            });
        }
    }, 10);
    
    // Afficher la navigation des résultats
    document.querySelector('.results-navigation').classList.add('active');
    AppState.currentPage = 'contact';
    updateNavigation();
}

function showWordDetail(wordId) {
    const word = DictionaryData.words.find(w => w.id === wordId);
    if (!word) return;
    
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="word-detail-page">
            <div class="container">
                <div class="word-detail-header">
                    <h1 class="word-detail-title">${word.swahili}</h1>
                    <div class="result-language-tag">
                        <span class="language-badge swahili">Swahili</span>
                        <span class="language-arrow">→</span>
                        <span class="language-badge french">Français</span>
                    </div>
                </div>
                
                <div class="word-detail-content">
                    <div class="word-detail-section">
                        <h3>Traduction</h3>
                        <p class="result-translation">${word.french}</p>
                    </div>
                    
                    <div class="word-detail-section">
                        <h3>Type de mot</h3>
                        <p>${getTypeLabel(word.type)}</p>
                    </div>
                    
                    ${word.pronunciation ? `
                    <div class="word-detail-section">
                        <h3>Prononciation</h3>
                        <p>${word.pronunciation}</p>
                        <button class="pronunciation-btn" onclick="playAudio('${word.swahili}')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                            Écouter la prononciation
                        </button>
                    </div>
                    ` : ''}
                    
                    ${word.example ? `
                    <div class="word-detail-section">
                        <h3>Exemple d'utilisation</h3>
                        <p>${word.example}</p>
                    </div>
                    ` : ''}
                    
                    ${word.category ? `
                    <div class="word-detail-section">
                        <h3>Catégories</h3>
                        <div class="result-categories">
                            ${word.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="word-detail-actions">
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
        </section>
    `;
    
    // Afficher la navigation des résultats
    document.querySelector('.results-navigation').classList.add('active');
    AppState.currentPage = 'word-detail';
    updateNavigation();
}

function showSearchResults() {
    showHomePage();
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
        AppState.detectedLanguage = detectLanguage(query);
        updateLanguageDetection();
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
    
    addToHistory(query);
    hideSuggestions();
    const results = searchWords(query);
    displayResults(results, query);
}

function searchWords(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    return DictionaryData.words.filter(word => {
        if (!word.validated) return false;
        
        const matchesSwahili = word.swahili.toLowerCase().includes(normalizedQuery);
        const matchesFrench = word.french.toLowerCase().includes(normalizedQuery);
        const matchesExample = word.example && word.example.toLowerCase().includes(normalizedQuery);
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
    const noResults = document.getElementById('noResults');
    
    if (container) {
        title.textContent = 'Mots populaires';
        count.textContent = `${results.length} mots`;
        
        if (results.length === 0) {
            container.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
            return;
        }
        
        if (noResults) noResults.style.display = 'none';
        container.innerHTML = results.map(word => createWordCard(word)).join('');
        
        // Ajouter les IDs aux cartes
        document.querySelectorAll('.result-card').forEach((card, index) => {
            if (results[index]) {
                card.dataset.wordId = results[index].id;
            }
        });
    }
}

function displayResults(results, query) {
    AppState.currentResults = results;
    
    const container = document.getElementById('resultsContainer');
    const title = document.getElementById('resultsTitle');
    const count = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    
    if (container) {
        title.textContent = query ? `Résultats pour "${query}"` : 'Résultats';
        count.textContent = `${results.length} résultat${results.length !== 1 ? 's' : ''}`;
        
        if (results.length === 0) {
            container.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
            return;
        }
        
        if (noResults) noResults.style.display = 'none';
        container.innerHTML = results.map(word => createWordCard(word, query)).join('');
        
        // Ajouter les IDs aux cartes
        document.querySelectorAll('.result-card').forEach((card, index) => {
            if (results[index]) {
                card.dataset.wordId = results[index].id;
            }
        });
    }
}

function createWordCard(word, query = '') {
    const queryLower = query.toLowerCase();
    const isSwahiliMatch = word.swahili.toLowerCase().includes(queryLower);
    const isFrenchMatch = word.french.toLowerCase().includes(queryLower);
    
    return `
        <div class="result-card" data-word-id="${word.id}">
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
                <button class="btn-action" onclick="event.stopPropagation(); suggestCorrection(${word.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Suggérer une correction
                </button>
                <button class="btn-action" onclick="event.stopPropagation(); addToFavorites(${word.id})">
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

// Suggestions
function initSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    if (container) {
        container.innerHTML = '<div class="suggestions-list" id="suggestionsList"></div>';
    }
}

function showSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    if (container) {
        container.classList.add('active');
        AppState.suggestionsVisible = true;
    }
}

function hideSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    if (container) {
        container.classList.remove('active');
        AppState.suggestionsVisible = false;
    }
}

function updateSuggestions(query) {
    const list = document.getElementById('suggestionsList');
    if (!list) return;
    
    const normalizedQuery = query.toLowerCase();
    
    if (!query) {
        list.innerHTML = '';
        return;
    }
    
    const historySuggestions = AppState.searchHistory
        .filter(item => item.toLowerCase().includes(normalizedQuery))
        .slice(0, 3);
    
    const swahiliSuggestions = DictionaryData.suggestions
        .filter(item => item.toLowerCase().includes(normalizedQuery))
        .slice(0, 5);
    
    const frenchSuggestions = DictionaryData.frenchSuggestions
        .filter(item => item.toLowerCase().includes(normalizedQuery))
        .slice(0, 5);
    
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
        
        return `
            <div class="suggestion-item" data-word="${item}" data-language="${language}">
                <span>${item}</span>
                <span class="suggestion-language">${languageLabel}</span>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = word;
                performSearch();
            }
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

// Message de contribution
function addContributionMessage() {
    const searchInstructions = document.querySelector('.search-instructions');
    if (searchInstructions && !document.querySelector('.contribution-message')) {
        const contributionMessage = document.createElement('div');
        contributionMessage.className = 'contribution-message';
        contributionMessage.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 5v14M5 12h14"/>
            </svg>
            <strong>Contribuez au dictionnaire :</strong> Appuyez sur le bouton plus en haut pour contribuer.
        `;
        searchInstructions.appendChild(contributionMessage);
    }
}

// Modals
function openModal(id) {
    closeAllModals();
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
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

function handleContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactNameModal').value;
    const email = document.getElementById('contactEmailModal').value;
    const subject = document.getElementById('contactSubjectModal').value;
    const message = document.getElementById('contactMessageModal').value;
    
    if (!name || !email || !subject || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    // Simulation d'envoi
    console.log('Message de contact envoyé:', { name, email, subject, message });
    showNotification('Votre message a été envoyé avec succès');
    
    // Réinitialiser le formulaire
    e.target.reset();
    closeAllModals();
}

function updateUIForLoginState() {
    const loginBtn = document.getElementById('loginBtn');
    const contributeBtn = document.getElementById('contributeBtn');
    
    if (AppState.isLoggedIn) {
        if (loginBtn) {
            loginBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
            loginBtn.setAttribute('aria-label', 'Mon compte');
        }
        
        if (contributeBtn) {
            contributeBtn.style.opacity = '1';
            contributeBtn.style.pointerEvents = 'auto';
        }
    } else {
        if (loginBtn) {
            loginBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
            `;
            loginBtn.setAttribute('aria-label', 'Connexion');
        }
        
        if (contributeBtn) {
            contributeBtn.style.opacity = '0.7';
            contributeBtn.style.pointerEvents = 'auto';
        }
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
    
    console.log('Ajouté aux favoris:', word);
    showNotification(`"${word.swahili}" ajouté à vos favoris`);
}

function playAudio(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
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
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
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

// Ajouter quelques mots à l'historique pour la démo
if (AppState.searchHistory.length === 0) {
    AppState.searchHistory = ['jambo', 'bonjour', 'asante', 'merci', 'rafiki'];
}