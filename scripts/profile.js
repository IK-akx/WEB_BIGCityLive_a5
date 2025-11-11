document.addEventListener("DOMContentLoaded", function() {
    loadUserProfile();
    loadUserTickets();
    setupHeader();
});

async function loadUserTickets() {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) return;

    const currentUser = JSON.parse(currentUserData);
    
    try {
        // Loading
        document.getElementById('ticketsContainer').innerHTML = `
            <div class="loading-tickets">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p>Loading your tickets from API...</p>
            </div>
        `;

        // Chech the API
        const isApiHealthy = await realEventAPI.healthCheck();
        if (!isApiHealthy) {
            throw new Error('API server is not running');
        }

        // Get tickets by Real API
        const tickets = await realEventAPI.getUserTickets();
        
        displayTickets(tickets);
        
    } catch (error) {
        console.error('Error loading tickets from API:', error);
        showTicketsError(error.message);
    }
}

function showTicketsError(message) {
    document.getElementById('ticketsContainer').innerHTML = `
        <div class="api-error">
            <img src="https://cdn-icons-png.flaticon.com/512/157/157933.png" alt="Error" width="80" height="80">
            <h3>API Connection Error</h3>
            <p>${message || 'Could not load tickets from server.'}</p>
            <p class="error-help">Make sure the API server is running on http://localhost:3001</p>
            <button class="btn-retry" onclick="loadUserTickets()">Retry</button>
        </div>
    `;
}

function togglePasswordVisibility() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const toggleButton = document.querySelector('.btn-toggle-password');
    const currentUserData = localStorage.getItem('currentUser');
    
    if (!currentUserData) return;
    
    const currentUser = JSON.parse(currentUserData);
    
    if (passwordDisplay.type === 'password') {
        // Show password
        passwordDisplay.type = 'text';
        passwordDisplay.value = currentUser.password || 'No password set';
        toggleButton.textContent = '🙈 Hide';
        toggleButton.style.background = '#dc3545';
    } else {
        // Hide password
        passwordDisplay.type = 'password';
        passwordDisplay.value = '••••••••';
        toggleButton.textContent = '👁️ Show';
        toggleButton.style.background = '#6c757d';
    }
}

function setupHeader() {
    const currentUserData = localStorage.getItem('currentUser');
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

    const desktopNavActions = document.getElementById("desktopNavActions");
    const mobileNavActions = document.getElementById("mobileNavActions");

    function renderUserArea(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <img src="https://www.manageengine.com/images/speaker-placeholder.png" alt="Profile" width="40" height="40" class="rounded-circle me-2 border border-light">
                <span class="fw-semibold me-2">${currentUser.fullName || currentUser.username}</span>
                <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
            </div>
        `;
    }

    if (currentUser) {
        if (desktopNavActions) {
            renderUserArea(desktopNavActions);
        }

        if (mobileNavActions) {
            mobileNavActions.innerHTML = `
                <div>
                    <div class="d-flex align-items-center justify-content-center">
                        <img src="https://www.manageengine.com/images/speaker-placeholder.png" alt="Profile" width="34" height="34" class="rounded-circle me-2 border border-light">
                        <span class="fw-semibold me-2">${currentUser.fullName || currentUser.username}</span>
                        <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
                    </div>
                </div>
            `;
        }

        document.querySelectorAll(".logoutBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                localStorage.removeItem("currentUser");
                window.location.href = "../index.html";
            });
        });
    } else {
        // If no user is logged in, show login/signup buttons
        if (desktopNavActions) {
            desktopNavActions.innerHTML = `
                <a class="nav-link btn btn-outline-light me-2" href="login.html">Sign In</a>
                <a class="nav-link btn btn-warning text-dark" href="signup.html">Sign Up</a>
            `;
        }
    }
}

// Function to handle photo change (placeholder for future implementation)
function changeProfilePhoto() {
    alert('Profile photo change functionality will be implemented soon!');
}

// Add event listener for change photo button
document.querySelector('.btn-change-photo')?.addEventListener('click', changeProfilePhoto);



function loadUserProfile() {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = JSON.parse(currentUserData);
    
    // Info about users
    document.getElementById('userFullName').textContent = currentUser.fullName || 'Not set';
    document.getElementById('userUsername').textContent = currentUser.username || 'Not set';
    document.getElementById('userEmail').textContent = currentUser.email || 'Not set';
    document.getElementById('userCity').textContent = currentUser.city || 'Astana';
    
    if (currentUser.createdAt) {
        const memberSince = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('userMemberSince').textContent = memberSince;
    } else {
        document.getElementById('userMemberSince').textContent = 'Unknown';
    }
}

function displayTickets(tickets) {
    const ticketsContainer = document.getElementById('ticketsContainer');
    
    if (!tickets || tickets.length === 0) {
        ticketsContainer.innerHTML = `
            <div class="no-tickets">
                <img src="https://cdn-icons-png.flaticon.com/512/748/748071.png" alt="No tickets" width="80" height="80">
                <h3>No Tickets Yet</h3>
                <p>You haven't purchased any tickets yet. Explore events and book your first experience!</p>
                <a href="events.html" class="btn-explore-events">Explore Events</a>
            </div>
        `;
        return;
    }

    tickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    
    ticketsContainer.innerHTML = `
        <div class="tickets-list">
            ${tickets.map(ticket => `
                <div class="ticket-item ${ticket.status === 'cancelled' ? 'cancelled' : ''}">
                    <div class="ticket-image">
                        <img src="${ticket.event?.image || '../images/default-event.jpg'}" alt="${ticket.event?.name || 'Event'}">
                        ${ticket.status === 'cancelled' ? '<div class="cancelled-badge">Cancelled</div>' : ''}
                    </div>
                    <div class="ticket-info">
                        <h4>${ticket.event?.name || 'Unknown Event'}</h4>
                        <p class="ticket-date">📅 ${ticket.event?.date || 'Unknown date'} | ${ticket.event?.time || 'Unknown time'}</p>
                        <p class="ticket-location">📍 ${ticket.event?.location || 'Unknown location'}</p>
                        <p class="ticket-number">🎫 Ticket #: ${ticket.ticketNumber}</p>
                        <p class="ticket-purchase">🛒 Purchased: ${new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                        <p class="ticket-quantity">🎟️ Quantity: ${ticket.quantity}</p>
                        <p class="ticket-price">💵 Total: $${ticket.totalPrice || ticket.event?.price || '0'}</p>
                    </div>
                    <div class="ticket-actions">
                        ${ticket.status !== 'cancelled' ? `
                            <button class="btn-cancel" onclick="cancelTicket('${ticket.id}')">Cancel Ticket</button>
                        ` : `
                            <p class="cancelled-text">Cancelled on ${new Date(ticket.cancellationDate).toLocaleDateString()}</p>
                        `}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

async function cancelTicket(ticketId) {
    if (!confirm('Are you sure you want to cancel this ticket?')) {
        return;
    }

    try {
        await realEventAPI.cancelTicket(ticketId);
        alert('Ticket cancelled successfully!');
        loadUserTickets(); // Reload tickets
    } catch (error) {
        alert('Error cancelling ticket: ' + error.message);
    }
}

function downloadTicket(ticketId) {
    alert('Download functionality will be implemented soon! Ticket ID: ' + ticketId);
}


//<button class="btn-download" onclick="downloadTicket('${ticket.id}')">Download PDF</button>