const glasses = document.querySelectorAll('.glass');
const resetBtn = document.getElementById('resetBtn');

// Load saved data from localStorage
const saved = JSON.parse(localStorage.getItem('hydratrack')) || [];

glasses.forEach((glass, idx) => {
  if (saved.includes(idx)) {
    glass.classList.add('full');
  }

  glass.addEventListener('click', () => {
    glass.classList.toggle('full');
    updateStorage();
  });
});

resetBtn.addEventListener('click', () => {
  glasses.forEach(glass => glass.classList.remove('full'));
  localStorage.removeItem('hydratrack');
});

function updateStorage() {
  const fullGlasses = [];
  glasses.forEach((glass, idx) => {
    if (glass.classList.contains('full')) {
      fullGlasses.push(idx);
    }
  });
  localStorage.setItem('hydratrack', JSON.stringify(fullGlasses));
}
