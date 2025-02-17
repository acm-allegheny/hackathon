export default function script() {
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
