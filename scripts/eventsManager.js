// eventsManager.js - WITH ANIMATIONS
const EventsManager = {
    events: [
        {
            id: 1,
            name: "Bogdan Titomir in Stand-up",
            date: "December 15, 2025 | 7:00 PM - 11:00 PM",
            location: "EXPO C1.2.311",
            price: "$75 - $150",
            category: "concert",
            isFree: false,
            image: "../images/Details1.jpeg",
            link: "../details1.html"
        },
        {
            id: 2,
            name: "Bogdan: Retro Night",
            date: "December 16, 2025 | 8:00 PM - 1:00 AM", 
            location: "Mega Silk Way",
            price: "$60 - $120",
            category: "concert",
            isFree: false,
            image: "../images/Details2.png",
            link: "../details2.html"
        },
        {
            id: 3,
            name: "Kairat vs Real Madrid Football Match",
            date: "September 30, 2025 | 10:00 PM - 4:00 AM",
            location: "Astana Arena", 
            price: "$150 - $200",
            category: "sports",
            isFree: false,
            image: "../images/Details3.jpeg",
            link: "../details3.html"
        },
        {
            id: 4, 
            name: "Dimash Kudaibergen",
            date: "November 18, 2025 | 3:00 PM - 5:00 PM",
            location: "Baiterek",
            price: "$350",
            category: "concert",
            isFree: false,
            image: "../images/Details4.jpeg",
            link: "../details4.html"
        },
        {
            id: 5,
            name: "Charity Marathon",
            date: "September 19, 2025 | 6:00 PM - 8:00 PM",
            location: "Garden Amphitheater",
            price: "Free",
            category: "sports", 
            isFree: true,
            image: "../images/Details5.jpeg",
            link: "../details5.html"
        },
        {
            id: 6,
            name: "Grand Opening — Fashion Store!",
            date: "October 20, 2025",
            location: "Abu Dhabi Plaza", 
            price: "Free",
            category: "shopping",
            isFree: true,
            image: "../images/Details6.jpeg",
            link: "../details6.html"
        }
    ],

    filteredEvents: [],

    init: function() {
        this.filteredEvents = [...this.events];
        this.createFilterSystem();
        this.animatePageLoad();
        this.displayFilteredEvents();
        this.setupFilterListeners();
    },

    createFilterSystem: function() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'events-filter-system';
        filterContainer.innerHTML = `
            <div class="filter-header">
                <h2>🎭 Find Your Perfect Event</h2>
                <p>Filter events by category or price</p>
            </div>
            
            <div class="filter-controls">
                <div class="filter-group">
                    <label>Category:</label>
                    <select id="categoryFilter" class="filter-select">
                        <option value="all">All Categories</option>
                        <option value="concert">Concerts</option>
                        <option value="sports">Sports</option>
                        <option value="shopping">Shopping</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Price:</label>
                    <select id="priceFilter" class="filter-select">
                        <option value="all">All Prices</option>
                        <option value="free">Free Events</option>
                        <option value="paid">Paid Events</option>
                        <option value="under100">Under $100</option>
                        <option value="over100">Over $100</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Sort By:</label>
                    <select id="sortFilter" class="filter-select">
                        <option value="name">Name (A-Z)</option>
                        <option value="date">Date (Soonest)</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                    </select>
                </div>
                
                <div class="filter-actions">
                    <button id="resetFilters" class="filter-btn reset-btn">Reset</button>
                </div>
            </div>
            
            <div class="filter-results">
                <div id="eventsGrid" class="events-grid-main">
                    <!-- Events will be displayed here -->
                </div>
            </div>
        `;

        const pageTitle = document.querySelector('.page-title');
        const existingGrid = document.querySelector('.events-grid');
        
        if (pageTitle && existingGrid) {
            pageTitle.parentNode.insertBefore(filterContainer, existingGrid);
            existingGrid.style.display = 'none';
        }
    },

    setupFilterListeners: function() {
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const sortFilter = document.getElementById('sortFilter');
        const resetBtn = document.getElementById('resetFilters');

        categoryFilter.addEventListener('change', () => this.applyFilters());
        priceFilter.addEventListener('change', () => this.applyFilters());
        sortFilter.addEventListener('change', () => this.applyFilters());
        resetBtn.addEventListener('click', () => this.resetFilters());
    },

    applyFilters: function() {
        const category = document.getElementById('categoryFilter').value;
        const price = document.getElementById('priceFilter').value;
        const sort = document.getElementById('sortFilter').value;
        
        let filtered = [...this.events];

        if (category !== 'all') {
            filtered = filtered.filter(event => event.category === category);
        }

        if (price !== 'all') {
            switch(price) {
                case 'free':
                    filtered = filtered.filter(event => event.isFree);
                    break;
                case 'paid':
                    filtered = filtered.filter(event => !event.isFree);
                    break;
                case 'under100':
                    filtered = filtered.filter(event => {
                        if (event.isFree) return false;
                        const priceNum = parseInt(event.price.replace(/[^\d]/g, '')) || 0;
                        return priceNum < 100;
                    });
                    break;
                case 'over100':
                    filtered = filtered.filter(event => {
                        if (event.isFree) return false;
                        const priceNum = parseInt(event.price.replace(/[^\d]/g, '')) || 0;
                        return priceNum >= 100;
                    });
                    break;
            }
        }

        filtered = this.sortEvents(filtered, sort);
        this.filteredEvents = filtered;
        this.displayFilteredEvents();
    },

    sortEvents: function(events, sortBy) {
        return events.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date':
                    const dateA = new Date(a.date.split('|')[0].trim());
                    const dateB = new Date(b.date.split('|')[0].trim());
                    return dateA - dateB;
                case 'price-low':
                    const priceA = a.isFree ? 0 : parseInt(a.price.replace(/[^\d]/g, '')) || 0;
                    const priceB = b.isFree ? 0 : parseInt(b.price.replace(/[^\d]/g, '')) || 0;
                    return priceA - priceB;
                case 'price-high':
                    const priceAHigh = a.isFree ? 0 : parseInt(a.price.replace(/[^\d]/g, '')) || 0;
                    const priceBHigh = b.isFree ? 0 : parseInt(b.price.replace(/[^\d]/g, '')) || 0;
                    return priceBHigh - priceAHigh;
                default:
                    return 0;
            }
        });
    },

    resetFilters: function() {
        // Animate reset button
        const resetBtn = document.getElementById('resetFilters');
        resetBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            resetBtn.style.transform = 'scale(1)';
        }, 150);

        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('priceFilter').value = 'all';
        document.getElementById('sortFilter').value = 'name';
        this.filteredEvents = [...this.events];
        this.displayFilteredEvents();
    },

    displayFilteredEvents: function() {
        const eventsGrid = document.getElementById('eventsGrid');
        
        if (!eventsGrid) return;
        
        if (this.filteredEvents.length === 0) {
            eventsGrid.innerHTML = `
                <div class="no-events-message">
                    <h3>🎭 No events found</h3>
                    <p>Try adjusting your filters</p>
                    <button onclick="EventsManager.resetFilters()" class="reset-search-btn">
                        Show All Events
                    </button>
                </div>
            `;
            this.animateNoResults();
            return;
        }

        const eventsHTML = this.filteredEvents.map(event => `
            <div class="dynamic-event-card" data-id="${event.id}">
                <div class="dynamic-event-image">
                    <img src="${event.image}" alt="${event.name}" onerror="this.src='../images/logo.png'">
                    ${event.isFree ? '<span class="free-badge">FREE</span>' : ''}
                </div>
                <div class="dynamic-event-info">
                    <h3 class="dynamic-event-title">${event.name}</h3>
                    <div class="dynamic-event-meta">
                        <span>📅 ${event.date.split('|')[0]}</span>
                        <span>📍 ${event.location}</span>
                    </div>
                    <p class="dynamic-event-description">
                        ${this.getEventDescription(event.category)}
                    </p>
                    <div class="dynamic-event-footer">
                        <div class="dynamic-event-price ${event.isFree ? 'free' : 'paid'}">
                            ${event.isFree ? '🎉 FREE' : `💰 ${event.price}`}
                        </div>
                        <a href="pages/${event.link}" class="dynamic-view-btn">
                            View Details →
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        eventsGrid.innerHTML = eventsHTML;
        this.animateFilterResults();
    },

    getEventDescription: function(category) {
        const descriptions = {
            concert: "Enjoy live music and performances from amazing artists.",
            sports: "Experience thrilling sports action and competitive matches.",
            shopping: "Discover great deals and new store openings."
        };
        return descriptions[category] || "Don't miss this exciting event!";
    },

    // ✅ ANIMATION METHODS
    animatePageLoad: function() {
        const filterSystem = document.querySelector('.events-filter-system');
        if (filterSystem) {
            filterSystem.style.opacity = '0';
            filterSystem.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                filterSystem.style.transition = 'all 0.6s ease';
                filterSystem.style.opacity = '1';
                filterSystem.style.transform = 'translateY(0)';
            }, 100);
        }
    },

    animateFilterResults: function() {
        const eventsGrid = document.getElementById('eventsGrid');
        if (eventsGrid && this.filteredEvents.length > 0) {
            eventsGrid.style.opacity = '0';
            eventsGrid.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                eventsGrid.style.transition = 'all 0.4s ease';
                eventsGrid.style.opacity = '1';
                eventsGrid.style.transform = 'scale(1)';
            }, 50);

            const cards = eventsGrid.querySelectorAll('.dynamic-event-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 + (index * 80));
            });
        }
    },

    animateNoResults: function() {
        const eventsGrid = document.getElementById('eventsGrid');
        if (eventsGrid) {
            eventsGrid.style.opacity = '0';
            eventsGrid.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                eventsGrid.style.transition = 'all 0.5s ease';
                eventsGrid.style.opacity = '1';
                eventsGrid.style.transform = 'scale(1)';
            }, 50);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    EventsManager.init();
});