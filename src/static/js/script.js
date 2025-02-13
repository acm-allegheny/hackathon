document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector(".timeline-wrapper");
    const rocket = document.querySelector("#rocket-scroll");
    const scrollTrack = document.querySelector(".scroll-track");
    
    function updateRocketPosition() {
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
    timeline.addEventListener("scroll", updateRocketPosition);

    // Make rocket draggable for manual scrolling
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

    // Initial position
    updateRocketPosition();
});