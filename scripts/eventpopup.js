// eventpopup.js - WITH ANIMATIONS
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("ticketModal");
    const openBtn = document.querySelector(".ticket-info .btn"); 
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("ticketForm");

    // Open window with animation
    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModalWithAnimation();
    });

    // Close by button with animation
    closeBtn.addEventListener("click", () => {
        closeModalWithAnimation();
    });

    // Close by click on background with animation
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });

    // Form Validation with animations
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !email) {
            animateFormError();
            alert("Please fill in all fields.");
            return;
        }

        animateFormSuccess();
    });

    // ✅ MODAL ANIMATION FUNCTIONS
    function openModalWithAnimation() {
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

    function animateFormSuccess() {
        const name = document.getElementById("name").value.trim();
        const submitBtn = form.querySelector('.buy-btn');
        const originalText = submitBtn.textContent;
        
        // Button success animation
        submitBtn.style.transition = 'all 0.4s ease';
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        submitBtn.textContent = '🎉 Success!';
        
        // Input field animations
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.transition = 'all 0.3s ease';
            input.style.background = '#e8f5e8';
            input.style.borderColor = '#4CAF50';
        });
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            
            // Show success message
            alert(`Thank you, ${name}! Your ticket has been reserved.`);
            
            // Reset form with animation
            setTimeout(() => {
                form.reset();
                
                // Reset styles
                submitBtn.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
                submitBtn.textContent = originalText;
                
                inputs.forEach(input => {
                    input.style.background = '';
                    input.style.borderColor = '';
                });
                
                closeModalWithAnimation();
            }, 500);
            
        }, 400);
    }

    // ✅ INPUT FOCUS ANIMATIONS
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

    // ✅ BUTTON HOVER ANIMATIONS
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
});