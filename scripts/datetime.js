function updateDateTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  };
  const formatted = now.toLocaleString('en-US', options);
  document.getElementById('datetime-block').textContent = formatted;
}

// Update through load 
updateDateTime();

// Update each second
setInterval(updateDateTime, 1000);
