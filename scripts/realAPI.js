// scripts/realApi.js
class RealEventAPI {
    constructor() {
        this.baseURL = 'http://localhost:3001'; 
    }

    async getEvents(page = 1, limit = 6, category = 'all') {
        try {
            const url = `${this.baseURL}/api/events?page=${page}&limit=${limit}&category=${category}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                return data.data; 
            } else {
                throw new Error(data.error || 'Unknown API error');
            }
        } catch (error) {
            console.error('API Error loading events:', error);
            throw error;
        }
    }

    async getUserTickets() { 
        try {
            const currentUserData = localStorage.getItem('currentUser');
            if (!currentUserData) {
                throw new Error('User not logged in');
            }
            
            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.id; // Take user-id from LOCALSTORAGE
            
            if (!userId) {
                throw new Error('User ID not found. Please login again.');
            }

            const response = await fetch(`${this.baseURL}/api/users/${userId}/tickets`, {
                headers: {
                    'user-id': userId
                }
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                return data.data; 
            } else {
                throw new Error(data.error || 'Unknown API error');
            }
        } catch (error) {
            console.error('API Error loading tickets:', error);
            throw error;
        }
    }

    async buyTicket(eventId, quantity = 1) { 
        try {
            const currentUserData = localStorage.getItem('currentUser');
            if (!currentUserData) {
                throw new Error('User not logged in');
            }
            
            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.id; 
            
            if (!userId) {
                throw new Error('User ID not found. Please login again.');
            }

            const response = await fetch(`${this.baseURL}/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId
                },
                body: JSON.stringify({
                    eventId: parseInt(eventId),
                    quantity: quantity
                })
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                return data.data; 
            } else {
                throw new Error(data.error || 'Unknown API error');
            }
        } catch (error) {
            console.error('API Error buying ticket:', error);
            throw error;
        }
    }

    async cancelTicket(ticketId) { 
        try {
            const currentUserData = localStorage.getItem('currentUser');
            if (!currentUserData) {
                throw new Error('User not logged in');
            }
            
            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.id;
            
            if (!userId) {
                throw new Error('User ID not found. Please login again.');
            }

            const response = await fetch(`${this.baseURL}/api/tickets/${ticketId}`, {
                method: 'DELETE',
                headers: {
                    'user-id': userId
                }
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                return data.data;
            } else {
                throw new Error(data.error || 'Unknown API error');
            }
        } catch (error) {
            console.error('API Error cancelling ticket:', error);
            throw error;
        }
    }

    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL}/api/health`);
            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('API Health check failed:', error);
            return false;
        }
    }

    getCurrentUserId() {
        const currentUserData = localStorage.getItem('currentUser');
        if (!currentUserData) {
            return null;
        }
        
        const currentUser = JSON.parse(currentUserData);
        return currentUser.id;
    }

    isUserLoggedIn() {
        return this.getCurrentUserId() !== null;
    }
}

// Creat global one 
window.realEventAPI = new RealEventAPI();