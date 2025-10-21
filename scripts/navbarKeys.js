function enableArrowNavigation(pages) {
  let currentIndex = pages.findIndex(page =>
    window.location.href.includes(page.split('/').pop())
  );

  if (currentIndex === -1) currentIndex = 0;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % pages.length;
      window.location.href = pages[currentIndex];
    } 
    else if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + pages.length) % pages.length;
      window.location.href = pages[currentIndex];
    }
  });
}
