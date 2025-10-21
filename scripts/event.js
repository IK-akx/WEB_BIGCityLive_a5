document.addEventListener('DOMContentLoaded', function() {

    const ticketButton = document.querySelector('.btn'); 
    
    if (ticketButton) {
        ticketButton.addEventListener('click', showTicketPopup);
    }
});

function showTicketPopup(event) {
    alert("You got tickets for this event! ");
}

// Time counter

function startSmartCountdown() {
    const countdownElement = document.getElementById('countdown-display');
    
    if (!countdownElement) return; // Exit if no countdown element found
    
    // Automatically detect event date from the page
    const eventText = document.querySelector('.event-meta-large span').textContent;
    const eventDateMatch = eventText.match(/[A-Za-z]+\s+\d{1,2},\s+\d{4}/);
    
    if (eventDateMatch) {
        const eventDate = new Date(eventDateMatch[0] + ' 19:00:00'); // Use 7:00 PM as default
        
        function updateCountdown() {
            const now = new Date();
            const timeRemaining = eventDate - now;
            
            if (timeRemaining <= 0) {
                countdownElement.textContent = "Event is happening now! ";
                countdownElement.style.color = "#28a745";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            
            // Display the countdown
            if (days > 0) {
                countdownElement.textContent = `${days} days, ${hours} hours`;
            } else if (hours > 0) {
                countdownElement.textContent = `${hours} hours, ${minutes} minutes`;
            } else {
                countdownElement.textContent = `${minutes} minutes`;
            }
        }
        
        // Start the countdown
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    } else {
        countdownElement.textContent = "Date information available";
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const ticketButton = document.querySelector('.btn'); 
    if (ticketButton) {
        ticketButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert("You got tickets for this event! ");
        });
    }
    
    // Start the smart countdown
    startSmartCountdown();
});





