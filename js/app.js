function createStars() {
  const sky = document.getElementById('sky');
  const numStars = 40;

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

function countdown() {
  var countDownDate = new Date("Apr 12, 2025 00:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("day-num").innerHTML = days
    document.getElementById("hour-num").innerHTML = hours
    document.getElementById("minute-num").innerHTML = minutes
    document.getElementById("second-num").innerHTML = seconds
  }, 1000);
}

function script() {
    const saturdayTimeline = document.querySelectorAll(".timeline-events-container")[0];
    const sundayTimeline = document.querySelectorAll(".timeline-events-container")[1];
    const saturdayRocket = document.querySelector("#rocket-scroll-saturday");
    const sundayRocket = document.querySelector("#rocket-scroll-sunday");
    const saturdayScrollTrack = document.querySelectorAll(".scroll-track")[0];
    const sundayScrollTrack = document.querySelectorAll(".scroll-track")[1];

    function updateRocketPosition(timeline, rocket, scrollTrack) {
        const scrollPercentage = timeline.scrollLeft / (timeline.scrollWidth - timeline.clientWidth);

        const trackBounds = scrollTrack.getBoundingClientRect();
        const rocketBounds = rocket.getBoundingClientRect();

        // Adjust maxTravel to account for padding
        const maxTravel = trackBounds.width - rocketBounds.width - 20; // 20px total padding (10px each side)

        // Add 10px padding to the starting position
        const newPosition = 10 + (scrollPercentage * maxTravel);

        rocket.style.left = `${newPosition}px`;
    }

    // Update rocket position on scroll
    saturdayTimeline.addEventListener("scroll", () => updateRocketPosition(saturdayTimeline, saturdayRocket, saturdayScrollTrack));
    sundayTimeline.addEventListener("scroll", () => updateRocketPosition(sundayTimeline, sundayRocket, sundayScrollTrack));

    // Make rocket draggable for manual scrolling
    function makeRocketDraggable(timeline, rocket, scrollTrack) {
        let isDragging = false;
        let startX;
        let scrollLeft;

        rocket.addEventListener('mousedown', (e) => {
            isDragging = true;
            rocket.style.cursor = 'grabbing';
            startX = e.pageX - rocket.offsetLeft;
            scrollLeft = timeline.scrollLeft;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            // Calculate the new position relative to the track
            const trackBounds = scrollTrack.getBoundingClientRect();
            const rocketBounds = rocket.getBoundingClientRect();
            const maxTravel = trackBounds.width - rocketBounds.width;

            let newLeft = e.pageX - scrollTrack.getBoundingClientRect().left - (rocketBounds.width / 2);

            // Constrain the rocket within the track
            newLeft = Math.max(0, Math.min(newLeft, maxTravel));

            // Update timeline scroll based on rocket position
            const scrollPercentage = newLeft / maxTravel;
            timeline.scrollLeft = scrollPercentage * (timeline.scrollWidth - timeline.clientWidth);

            rocket.style.left = `${newLeft}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            rocket.style.cursor = 'grab';
        });
    }

    makeRocketDraggable(saturdayTimeline, saturdayRocket, saturdayScrollTrack);
    makeRocketDraggable(sundayTimeline, sundayRocket, sundayScrollTrack);

    // Initial position
    updateRocketPosition(saturdayTimeline, saturdayRocket, saturdayScrollTrack);
    updateRocketPosition(sundayTimeline, sundayRocket, sundayScrollTrack);

    // FAQ dropdown functionality
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqAnswer = button.nextElementSibling;

            button.classList.toggle('active');

            if (button.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                faqAnswer.style.maxHeight = 0;
            }
        });
    });
}

createStars();
countdown();
script();
