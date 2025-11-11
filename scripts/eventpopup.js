// eventpopup.js - WITH API INTEGRATION FOR DETAILS PAGES
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("ticketModal");
    const openBtn = document.querySelector(".ticket-info .btn"); 
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("ticketForm");

    // Store current event info
    let currentEvent = null;

    // Get event ID from the page (from URL or data attribute)
    function getEventIdFromPage() {
        // Try to get from URL (details1.html -> ID 1, details2.html -> ID 2, etc.)
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop();
        
        if (filename.startsWith('details')) {
            const match = filename.match(/details(\d+)\.html/);
            if (match) {
                return parseInt(match[1]);
            }
        }
        
        // Fallback: try to get from data attribute
        const eventElement = document.querySelector('[data-event-id]');
        if (eventElement) {
            return parseInt(eventElement.getAttribute('data-event-id'));
        }
        
        // Default fallback
        return 1;
    }

    // Open window with animation - for details pages
    if (openBtn) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            const eventId = getEventIdFromPage();
            
            // Get event info from the page
            currentEvent = {
                id: eventId,
                name: document.querySelector('.event-header h1')?.textContent || 'Event',
                price: document.querySelector('.ticket-price')?.textContent || '$0',
                date: document.querySelector('.event-meta-large span')?.textContent?.split('|')[0]?.trim() || 'Unknown date',
                location: document.querySelector('.event-meta-large span:nth-child(2)')?.textContent || 'Unknown location'
            };
            
            openModalWithAnimation();
        });
    }

    // Close by button with animation
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeModalWithAnimation();
        });
    }

    // Close by click on background with animation
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });

    // Form Validation with API integration
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            console.log('🎯 Form submit triggered'); // ДОБАВЬТЕ ЭТО

            try {
                // ✅ ИСПОЛЬЗУЙТЕ НОВЫЕ ID
                const name = document.getElementById("userName")?.value?.trim() || "";
                const email = document.getElementById("userEmail")?.value?.trim() || "";

                console.log('📝 Form data:', { name, email }); // ДОБАВЬТЕ ЭТО

                if (!name || !email) {
                    console.log('❌ Form validation failed'); // ДОБАВЬТЕ ЭТО
                    animateFormError();
                    alert("Please fill in all fields.");
                    return;
                }

                // Check if user is logged in
                const currentUserData = localStorage.getItem('currentUser');
                console.log('👤 Current user data:', currentUserData); // ДОБАВЬТЕ ЭТО
                
                if (!currentUserData) {
                    console.log('❌ User not logged in'); // ДОБАВЬТЕ ЭТО
                    animateFormError();
                    alert("Please login to purchase tickets.");
                    window.location.href = "login.html";
                    return;
                }

                // Проверяем, что у пользователя есть user-id
                const currentUser = JSON.parse(currentUserData);
                console.log('🆔 User ID:', currentUser.id); // ДОБАВЬТЕ ЭТО
                
                if (!currentUser.id) {
                    console.log('❌ User ID not found'); // ДОБАВЬТЕ ЭТО
                    animateFormError();
                    alert("User ID not found. Please login again.");
                    window.location.href = "login.html";
                    return;
                }

                // If event info not set, get it from page
                if (!currentEvent) {
                    currentEvent = {
                        id: getEventIdFromPage(),
                        name: document.querySelector('.event-header h1')?.textContent || 'Event',
                        price: document.querySelector('.ticket-price')?.textContent || '$0',
                        date: document.querySelector('.event-meta-large span')?.textContent?.split('|')[0]?.trim() || 'Unknown date',
                        location: document.querySelector('.event-meta-large span:nth-child(2)')?.textContent || 'Unknown location'
                    };
                }

                console.log('🎫 Purchasing ticket for event:', currentEvent); // ДОБАВЬТЕ ЭТО

                // Purchase ticket via API
                await purchaseTicketWithAPI(name, email);
                
            } catch (error) {
                console.error('💥 Form submission error:', error); // ДОБАВЬТЕ ЭТО
                alert("Form error: " + error.message);
            }
        });
    }

    // ✅ MODAL ANIMATION FUNCTIONS
    function openModalWithAnimation() {
        if (!modal) return;
        
        modal.style.display = "flex";
        
        // Reset animation state
        const modalContent = modal.querySelector(".modal-content");
        modalContent.style.opacity = "0";
        modalContent.style.transform = "scale(0.7) translateY(-50px)";
        
        // Background animation
        modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
        
        // Animate in
        setTimeout(() => {
            modal.style.transition = "background-color 0.3s ease";
            modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            
            modalContent.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            modalContent.style.opacity = "1";
            modalContent.style.transform = "scale(1) translateY(0)";
        }, 50);
    }

    function closeModalWithAnimation() {
        if (!modal) return;
        
        const modalContent = modal.querySelector(".modal-content");
        
        // Animate out
        modalContent.style.transition = "all 0.3s ease";
        modalContent.style.opacity = "0";
        modalContent.style.transform = "scale(0.8) translateY(20px)";
        
        modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
        
        setTimeout(() => {
            modal.style.display = "none";
            // Reset for next open
            modalContent.style.transition = "";
        }, 300);
    }

    // ✅ API TICKET PURCHASE FUNCTION - ИЗМЕНЕНА!
    async function purchaseTicketWithAPI(name, email) {
        const submitBtn = form.querySelector('.buy-btn');
        const originalText = submitBtn.textContent;
        
        console.log('🔄 Starting ticket purchase...'); // ДОБАВЬТЕ ЭТО
        
        try {
            // Show loading state
            submitBtn.style.transition = 'all 0.3s ease';
            submitBtn.style.background = 'linear-gradient(135deg, #2196F3, #21CBF3)';
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            console.log('🎯 Calling realEventAPI.buyTicket...'); // ДОБАВЬТЕ ЭТО

            // Purchase ticket via API
            const result = await realEventAPI.buyTicket(currentEvent.id, 1);
            
            console.log('✅ Purchase successful:', result); // ДОБАВЬТЕ ЭТО
            
            // Success animation
            animatePurchaseSuccess(name, result);
            
        } catch (error) {
            console.error('❌ Purchase error:', error); // ДОБАВЬТЕ ЭТО
            // Error handling
            animatePurchaseError(error.message);
        } finally {
            // Reset button
            setTimeout(() => {
                submitBtn.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    function animatePurchaseSuccess(name, result) {
        const submitBtn = form.querySelector('.buy-btn');
        const inputs = form.querySelectorAll('input');
        
        // Button success animation
        submitBtn.style.transition = 'all 0.4s ease';
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        submitBtn.textContent = '🎉 Success!';
        
        // Input field animations
        inputs.forEach(input => {
            input.style.transition = 'all 0.3s ease';
            input.style.background = '#e8f5e8';
            input.style.borderColor = '#4CAF50';
        });

        // Success confetti effect
        createConfetti();
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            
            // Show detailed success message
            alert(`🎉 TICKET PURCHASED SUCCESSFULLY!\n\n` +
                  `Event: ${currentEvent.name}\n` +
                  `Ticket Number: ${result.ticket.ticketNumber}\n` +
                  `Date: ${currentEvent.date}\n` +
                  `Location: ${currentEvent.location}\n\n` +
                  `Thank you, ${name}! Your ticket has been purchased and added to your profile.`);
            
            // Reset form with animation
            setTimeout(() => {
                form.reset();
                
                // Reset styles
                submitBtn.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
                submitBtn.textContent = 'Buy Ticket';
                
                inputs.forEach(input => {
                    input.style.background = '';
                    input.style.borderColor = '';
                });
                
                closeModalWithAnimation();
            }, 500);
            
        }, 400);
    }

    function animatePurchaseError(errorMessage) {
        const submitBtn = form.querySelector('.buy-btn');
        const inputs = form.querySelectorAll('input');
        
        // Button error animation
        submitBtn.style.transition = 'all 0.4s ease';
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
        submitBtn.textContent = '❌ Failed';
        
        // Input field error animations
        inputs.forEach(input => {
            input.style.transition = 'all 0.3s ease';
            input.style.background = '#ffeaea';
            input.style.borderColor = '#ff4444';
        });

        // Shake animation for error
        animateFormError();
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            alert(`❌ PURCHASE FAILED\n\n${errorMessage}\n\nPlease try again or contact support.`);
        }, 400);
    }

    // ✅ FORM ANIMATION FUNCTIONS
    function animateFormError() {
        const inputs = form.querySelectorAll('input');
        let shakeCount = 0;
        
        function shake() {
            inputs.forEach(input => {
                input.style.transition = 'transform 0.1s ease';
                input.style.borderColor = '#ff4444';
                
                if (shakeCount % 2 === 0) {
                    input.style.transform = 'translateX(8px)';
                } else {
                    input.style.transform = 'translateX(-8px)';
                }
            });
            
            shakeCount++;
            
            if (shakeCount < 6) {
                setTimeout(shake, 80);
            } else {
                // Reset
                setTimeout(() => {
                    inputs.forEach(input => {
                        input.style.transform = 'translateX(0)';
                        input.style.borderColor = '';
                        input.style.transition = 'all 0.3s ease';
                    });
                }, 80);
            }
        }
        
        shake();
    }

    // ✅ CONFETTI EFFECT FOR SUCCESS
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10000;
        `;
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${getRandomColor()};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 2px;
                animation: confetti-fall ${1 + Math.random() * 2}s linear forwards;
            `;

            confettiContainer.appendChild(confetti);
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
            style.remove();
        }, 3000);
    }

    function getRandomColor() {
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // ✅ INPUT FOCUS ANIMATIONS
    if (form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // ✅ BUTTON HOVER ANIMATIONS
    if (form) {
        const buttons = form.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
});

// Global function to open modal from events page
window.openTicketModal = function(eventId) {
    const modal = document.getElementById("ticketModal");
    if (modal) {
        // Set current event
        window.currentEvent = {
            id: eventId
        };
        
        // Open modal with animation
        modal.style.display = "flex";
        const modalContent = modal.querySelector(".modal-content");
        modalContent.style.opacity = "0";
        modalContent.style.transform = "scale(0.7) translateY(-50px)";
        
        setTimeout(() => {
            modal.style.transition = "background-color 0.3s ease";
            modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            
            modalContent.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            modalContent.style.opacity = "1";
            modalContent.style.transform = "scale(1) translateY(0)";
        }, 50);
    }
};