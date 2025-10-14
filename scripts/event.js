document.addEventListener('DOMContentLoaded', function() {

    const ticketButton = document.querySelector('.btn'); 
    
    if (ticketButton) {
        ticketButton.addEventListener('click', showTicketPopup);
    }
});

function showTicketPopup(event) {
    alert("You got tickets for this event! ");
}