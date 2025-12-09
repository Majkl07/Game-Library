// Game Database Application
// Data model and state management

class GameDatabase {
    constructor() {
        this.games = this.loadGames();
        this.currentFilter = {
            search: '',
            platform: '',
            genre: '',
            status: ''
        };
        this.editingGameId = null;
    }

    // Load games from localStorage
    loadGames() {
        const saved = localStorage.getItem('gameDatabase');
        if (saved) {
            return JSON.parse(saved);
        }
        // Sample data for demonstration
        return [
            {
                id: this.generateId(),
                title: 'The Witcher 3: Wild Hunt',
                platform: 'PC',
                genre: 'RPG',
                year: 2015,
                rating: 5,
                review: 'Naprosto úžasná hra s bohatým příběhem, skvělými postavami a obrovským otevřeným světem. Geralt z Rivie je jednou z nejlepších postav ve hrách vůbec.',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Red Dead Redemption 2',
                platform: 'PlayStation',
                genre: 'Action',
                year: 2018,
                rating: 5,
                review: 'Mistrovské dílo od Rockstar Games. Příběh Arthura Morgana je dojemný a svět hry je neuvěřitelně detailní.',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Hollow Knight',
                platform: 'Nintendo Switch',
                genre: 'Platformer',
                year: 2017,
                rating: 4,
                review: 'Krásný metroidvania titul s výbornou atmosférou a náročnou obtížností. Hudba je úžasná.',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Grand Theft Auto V',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2013,
                rating: 5,
                review: 'Ikonická open-world hra od Rockstar. Los Santos je obrovský a plný života. Příběh tří protagonistů je skvěle napsaný a GTA Online stále žije.',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Counter-Strike 2',
                platform: 'PC',
                genre: 'FPS',
                year: 2023,
                rating: 5,
                review: 'Nová verze legendárního CS:GO na Source 2 enginu. Vylepšená grafika, lepší fyzika kouře a stále stejně návyková kompetitivní hraní.',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Cyberpunk 2077',
                platform: 'PC',
                genre: 'RPG',
                year: 2020,
                rating: 4,
                review: 'Po mnoha patchích je to skvělá hra. Night City je neuvěřitelně detailní a příběh je zajímavý.',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Elden Ring',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2022,
                rating: 5,
                review: 'FromSoftware v kombinaci s George R.R. Martinem vytvořili masterpiece. Otevřený svět Souls hry je geniální.',
                status: 'Wishlist'
            }
        ];
    }

    // Save games to localStorage
    saveGames() {
        localStorage.setItem('gameDatabase', JSON.stringify(this.games));
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add new game
    addGame(gameData) {
        const newGame = {
            id: this.generateId(),
            ...gameData
        };
        this.games.unshift(newGame);
        this.saveGames();
        return newGame;
    }

    // Update game
    updateGame(id, gameData) {
        const index = this.games.findIndex(game => game.id === id);
        if (index !== -1) {
            this.games[index] = { id, ...gameData };
            this.saveGames();
            return this.games[index];
        }
        return null;
    }

    // Delete game
    deleteGame(id) {
        this.games = this.games.filter(game => game.id !== id);
        this.saveGames();
    }

    // Get game by ID
    getGame(id) {
        return this.games.find(game => game.id === id);
    }

    // Get filtered games
    getFilteredGames() {
        return this.games.filter(game => {
            // Search filter
            if (this.currentFilter.search) {
                const searchLower = this.currentFilter.search.toLowerCase();
                if (!game.title.toLowerCase().includes(searchLower)) {
                    return false;
                }
            }

            // Platform filter
            if (this.currentFilter.platform && game.platform !== this.currentFilter.platform) {
                return false;
            }

            // Genre filter
            if (this.currentFilter.genre && game.genre !== this.currentFilter.genre) {
                return false;
            }

            // Status filter
            if (this.currentFilter.status && game.status !== this.currentFilter.status) {
                return false;
            }

            return true;
        });
    }

    // Update filter
    updateFilter(filterType, value) {
        this.currentFilter[filterType] = value;
    }
}

// UI Controller
class UIController {
    constructor(database) {
        this.db = database;
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    initElements() {
        // Form elements
        this.form = document.getElementById('game-form');
        this.formTitle = document.getElementById('form-title');
        this.editGameId = document.getElementById('edit-game-id');
        this.titleInput = document.getElementById('game-title');
        this.platformInput = document.getElementById('game-platform');
        this.genreInput = document.getElementById('game-genre');
        this.yearInput = document.getElementById('game-year');
        this.statusInput = document.getElementById('game-status');
        this.ratingInput = document.getElementById('game-rating');
        this.reviewInput = document.getElementById('game-review');
        this.submitBtn = document.getElementById('submit-btn');
        this.cancelBtn = document.getElementById('cancel-btn');

        // Rating stars
        this.ratingStars = document.querySelectorAll('#rating-input .star');

        // Filter elements
        this.searchInput = document.getElementById('search-input');
        this.filterPlatform = document.getElementById('filter-platform');
        this.filterGenre = document.getElementById('filter-genre');
        this.filterStatus = document.getElementById('filter-status');

        // Display elements
        this.gamesGrid = document.getElementById('games-grid');
        this.emptyState = document.getElementById('empty-state');
    }

    initEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Cancel edit
        this.cancelBtn.addEventListener('click', () => {
            this.cancelEdit();
        });

        // Rating stars
        this.ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                this.setRating(rating);
            });

            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                this.highlightStars(rating);
            });
        });

        document.getElementById('rating-input').addEventListener('mouseleave', () => {
            const currentRating = parseInt(this.ratingInput.value) || 0;
            this.highlightStars(currentRating);
        });

        // Filters
        this.searchInput.addEventListener('input', (e) => {
            this.db.updateFilter('search', e.target.value);
            this.render();
        });

        this.filterPlatform.addEventListener('change', (e) => {
            this.db.updateFilter('platform', e.target.value);
            this.render();
        });

        this.filterGenre.addEventListener('change', (e) => {
            this.db.updateFilter('genre', e.target.value);
            this.render();
        });

        this.filterStatus.addEventListener('change', (e) => {
            this.db.updateFilter('status', e.target.value);
            this.render();
        });
    }

    setRating(rating) {
        this.ratingInput.value = rating;
        this.highlightStars(rating);
    }

    highlightStars(rating) {
        this.ratingStars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    handleFormSubmit() {
        const gameData = {
            title: this.titleInput.value.trim(),
            platform: this.platformInput.value,
            genre: this.genreInput.value,
            year: parseInt(this.yearInput.value),
            rating: parseInt(this.ratingInput.value) || 0,
            review: this.reviewInput.value.trim(),
            status: this.statusInput.value
        };

        const editId = this.editGameId.value;
        if (editId) {
            // Update existing game
            this.db.updateGame(editId, gameData);
        } else {
            // Add new game
            this.db.addGame(gameData);
        }

        this.resetForm();
        this.render();
    }

    resetForm() {
        this.form.reset();
        this.editGameId.value = '';
        this.ratingInput.value = '0';
        this.highlightStars(0);
        this.formTitle.textContent = '➕ Přidat novou hru';
        this.submitBtn.textContent = 'Přidat hru';
        this.cancelBtn.style.display = 'none';
    }

    cancelEdit() {
        this.resetForm();
    }

    editGame(id) {
        const game = this.db.getGame(id);
        if (!game) return;

        this.editGameId.value = game.id;
        this.titleInput.value = game.title;
        this.platformInput.value = game.platform;
        this.genreInput.value = game.genre;
        this.yearInput.value = game.year;
        this.statusInput.value = game.status;
        this.ratingInput.value = game.rating;
        this.reviewInput.value = game.review;
        this.setRating(game.rating);

        this.formTitle.textContent = '✏️ Upravit hru';
        this.submitBtn.textContent = 'Uložit změny';
        this.cancelBtn.style.display = 'inline-block';

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }

    deleteGame(id) {
        if (confirm('Opravdu chcete smazat tuto hru?')) {
            this.db.deleteGame(id);
            this.render();
        }
    }

    render() {
        const games = this.db.getFilteredGames();

        if (games.length === 0) {
            this.gamesGrid.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';
        this.gamesGrid.innerHTML = games.map((game, index) => this.createGameCard(game, index)).join('');

        // Add event listeners to cards
        games.forEach(game => {
            const editBtn = document.getElementById(`edit-${game.id}`);
            const deleteBtn = document.getElementById(`delete-${game.id}`);

            if (editBtn) {
                editBtn.addEventListener('click', () => this.editGame(game.id));
            }

            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.deleteGame(game.id));
            }
        });
    }

    createGameCard(game, index) {
        const stars = Array.from({ length: 5 }, (_, i) => {
            const isActive = i < game.rating ? 'active' : '';
            return `<span class="star ${isActive}">★</span>`;
        }).join('');

        const statusClass = game.status.toLowerCase();

        return `
      <div class="game-card" style="--card-index: ${index}">
        <div class="game-header">
          <div>
            <h3 class="game-title">${this.escapeHtml(game.title)}</h3>
            <div class="game-year">${game.year}</div>
          </div>
          <div class="game-actions">
            <button class="icon-btn" id="edit-${game.id}" title="Upravit">✏️</button>
            <button class="icon-btn delete" id="delete-${game.id}" title="Smazat">🗑️</button>
          </div>
        </div>
        
        <div class="game-meta">
          <span class="badge badge-platform">${this.escapeHtml(game.platform)}</span>
          <span class="badge badge-genre">${this.escapeHtml(game.genre)}</span>
          <span class="badge badge-status ${statusClass}">${this.escapeHtml(game.status)}</span>
        </div>
        
        <div class="game-rating">
          ${stars}
        </div>
        
        ${game.review ? `
          <div class="game-review">
            ${this.escapeHtml(game.review)}
          </div>
        ` : ''}
      </div>
    `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    const database = new GameDatabase();
    const ui = new UIController(database);

    // Save data before page unload
    window.addEventListener('beforeunload', () => {
        database.saveGames();
    });
});
