export default function createStars() {
  const sky = document.getElementById('sky');
  const numStars = 75;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random size between 2-4px
    const size = Math.random() * 2 + 2;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';

    // Random animation delay
    star.style.animationDelay = '-' + Math.random() * 2 + 's';

    sky.appendChild(star);
  }
}
