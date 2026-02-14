/* ==========================================================================
   Sree — Valentine's Day Memory Map
   Interactive map with walkthrough and explore modes
   ========================================================================== */

// ==========================================================================
// MEMORY DATA — Edit this array to add your photos!
// ==========================================================================
// 
// Each memory has:
//   name: Location title shown during walkthrough
//   coords: [latitude, longitude] — get from Google Maps (right-click → "What's here?")
//   photos: Array of photo paths relative to sree/ folder
//   caption: Your message for this location
//
// Example:
//   {
//     name: "Where We First Met",
//     coords: [38.0293, -78.4767],
//     photos: ["images/first-date-1.jpg", "images/first-date-2.jpg"],
//     caption: "This is where our story began... 💕"
//   }

const memories = [
    { name: "The day we FIRST met", coords: [38.03522278282961, -78.51068858388658], photos: ["images/where_we_first_met.jpeg"], caption: "When I sang mine! and we yapped in OHill. A very funny first encounter indeed" },
    { name: "The day we met AGAIN", coords: [38.03504707593481, -78.50036136059863], photos: ["images/where_we_met_again!.jpg"], caption: "All roads lead to Chipotle huh... Was very funny talking to Annika and Arya during this. I did airball with my text after though..." },
    { name: "When we first hung out!", coords: [38.03157, -78.50930], photos: ["images/the_first_day_we_hung_out.jpeg"], caption: "I taught you how to be the best ChatGPT user of all time 🙏. And then it turned into a 2 AM yap session" },
    { name: "The day we reallyyyy yapped", coords: [38.033841, -78.503634], photos: ["images/that_time_when_we_yapped_in_cabbell.jpeg"], caption: "Hanging out till 4, you teaching me how to use safe ride and then me giving you a fist bump (I was so scared to touch you)" },
    { name: "She schlumpedddd", coords: [38.033841, -78.503634], photos: ["images/she_schlumped.jpeg"], caption: "She schlumpeedd at new cab" },
    { name: "April 12th! Best day of the year!", coords: [38.03157, -78.50930], photos: ["images/your_birthday_!.jpeg"], caption: "Lots of fun memories! Coupes was lit! Rip the jeans though... " },
    { name: "India Day ;)", coords: [38.0298, -78.4808], photos: ["images/india_day.jpeg"], caption: "Fun day ;)" },
    { name: "She schlumpedddd pt 2", coords: [38.03157, -78.50930], photos: ["images/she_schlumpeddd_again.jpeg"], caption: "She loves beinggg schlumpedd" },
    { name: "She's LOCKED IN", coords: [38.03647, -78.50612], photos: ["images/shes_locked_in_guys.jpeg"], caption: "LOCKED in whiteboarding in clem" },
    { name: "Summer :(", coords: [33.6908, -84.5213], photos: ["images/snapchat_galore_over_the_summer.jpeg"], caption: "Snapchat galore! Was always a nice to get a McKinsey fit check though and call! :)" },
    { name: "yayyyyy", coords: [38.02754211006984, -78.50946526561677], photos: ["images/midsummers.jpeg"], caption: "Literaly just yayyyyy midsummers!" },
    { name: "Grinding in clark.", coords: [38.03299, -78.50796], photos: ["images/we_grinding_in_clark.jpeg"], caption: "we always been working." },
    { name: "Grinding in clem.", coords: [38.03647, -78.50612], photos: ["images/we_grinding_in_clem.jpeg"], caption: "We always been working." },
    { name: "Dates!", coords: [38.0304, -78.4802], photos: ["images/we_went_to_that_funny_movie_and_saw_vishal_and_snigdha.jpeg"], caption: "Now and Zen + Funny movie night!!" },
    { name: "Monsoon!", coords: [38.0292, -78.4816], photos: ["images/monsoon!.jpeg"], caption: "Seems like this is our go to date spot" },
    { name: "Melting Pot is so tasty", coords: [38.0320, -78.4805], photos: ["images/melting_potttt.jpeg"], caption: "Don't forget the melting pot after!" },
    { name: "Halloween 🎃", coords: [38.02754211006984, -78.50946526561677], photos: ["images/halloween!.jpeg"], caption: "I loved being the mummy to your cleopatra" },
    { name: "Rollerrrssss", coords: [38.03157, -78.50930], photos: ["images/rollerssss.jpeg"], caption: "She lovesss her rollers" },
    { name: "Pineapples!", coords: [38.0357234, -78.4879857], photos: ["images/pineapples!.jpeg"], caption: "The day I messed up and we got on the wrong lyft.." },
    { name: "She always be explaining her notes", coords: [38.03157, -78.50930], photos: ["images/explaining_her_beautiful_notes.jpeg"], caption: "I dont understand econ :(" },
    { name: "The day I asked to be your boyfriend!", coords: [38.03157, -78.50930], photos: ["images/the_day_i_asked_to_be_your_boyfriend.jpeg"], caption: "Great day! rip the flowers though.." },
    { name: "Vivace!!", coords: [38.0325, -78.4957], photos: ["images/vivace_at_the_start_of_last_sem!.jpeg"], caption: "Underrated lowkey, I liked it a lot! The server was on top of it right" },
    { name: "YAY!! WE ARE IN NYC!!!", coords: [40.74370464042142, -73.97248501788354], photos: ["images/us_in_ny!.jpeg"], caption: "She always schlumpeddd huh" },
];

// Final message shown at the end of the walkthrough
const finalMessage = {
    message: "Thank you for being my everything!",
    submessage: "Click anywhere on the map to revisit our memories."
};

// ==========================================================================
// APP STATE
// ==========================================================================

let map;
let markers = [];
let currentMemoryIndex = 0;
let currentPhotoIndex = 0;
let isWalkthroughMode = true;
let isAnimating = false;

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================

const elements = {
    welcomeOverlay: document.getElementById('welcome-overlay'),
    startBtn: document.getElementById('start-btn'),
    map: document.getElementById('map'),
    locationTitle: document.getElementById('location-title'),
    locationNumber: document.querySelector('.location-number'),
    locationName: document.querySelector('.location-name'),
    photoModal: document.getElementById('photo-modal'),
    modalPhoto: document.getElementById('modal-photo'),
    modalTitle: document.getElementById('modal-title'),
    modalCaption: document.getElementById('modal-caption'),
    photoCounter: document.getElementById('photo-counter'),
    prevPhotoBtn: document.getElementById('prev-photo'),
    nextPhotoBtn: document.getElementById('next-photo'),
    continueBtn: document.getElementById('continue-journey'),
    closeModalBtn: document.getElementById('close-modal'),
    completeOverlay: document.getElementById('complete-overlay'),
    exploreBtn: document.getElementById('explore-btn'),
    progressBar: document.getElementById('progress-bar'),
    progressFill: document.getElementById('progress-fill'),
    skipBtn: document.getElementById('skip-btn'),
    photoLoading: document.querySelector('.photo-loading')
};

// ==========================================================================
// INITIALIZE MAP
// ==========================================================================

function initMap() {
    // Create map centered on US, will zoom to first memory location
    map = L.map('map', {
        center: [39.8283, -98.5795], // Center of US
        zoom: 4,
        zoomControl: true,
        attributionControl: false
    });

    // Add beautiful map tiles (Stamen Watercolor for romantic feel, with fallback)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Create heart markers for all memories
    createMarkers();
}

function createMarkers() {
    memories.forEach((memory, index) => {
        // Create custom heart icon
        const heartIcon = L.divIcon({
            className: 'heart-marker',
            html: '❤️',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        const marker = L.marker(memory.coords, { icon: heartIcon })
            .addTo(map)
            .on('click', () => {
                if (!isWalkthroughMode && !isAnimating) {
                    openMemory(index);
                }
            });

        markers.push(marker);
    });
}

// ==========================================================================
// WALKTHROUGH MODE
// ==========================================================================

function startWalkthrough() {
    // Hide welcome overlay
    elements.welcomeOverlay.classList.add('hidden');

    // Show progress bar and skip button
    elements.progressBar.classList.remove('hidden');
    elements.skipBtn.classList.remove('hidden');

    // Start with first memory
    currentMemoryIndex = 0;
    flyToMemory(0);
}

function flyToMemory(index) {
    if (index >= memories.length) {
        completeWalkthrough();
        return;
    }

    isAnimating = true;
    currentMemoryIndex = index;
    currentPhotoIndex = 0;

    const memory = memories[index];

    // Update progress
    updateProgress(index);

    // Update location title
    elements.locationNumber.textContent = String(index + 1).padStart(2, '0');
    elements.locationName.textContent = memory.name;
    elements.locationTitle.classList.remove('hidden');

    // Highlight current marker
    markers.forEach((m, i) => {
        const iconEl = m.getElement();
        if (iconEl) {
            iconEl.querySelector('.heart-marker')?.classList.toggle('active', i === index);
        }
    });

    // Fly to location
    map.flyTo(memory.coords, 14, {
        duration: 2,
        easeLinearity: 0.25
    });

    // Show photo modal after flight
    setTimeout(() => {
        showPhotoModal(memory);
        isAnimating = false;
    }, 2200);
}

function updateProgress(index) {
    const progress = ((index + 1) / memories.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
}

function showPhotoModal(memory) {
    elements.photoModal.classList.remove('hidden');
    loadPhoto(memory);
    updatePhotoCounter(memory);
    updateNavigationButtons(memory);

    // Update continue button text based on if last memory
    if (currentMemoryIndex === memories.length - 1) {
        elements.continueBtn.querySelector('span').textContent = 'Complete Journey';
    } else {
        elements.continueBtn.querySelector('span').textContent = 'Continue Journey';
    }
}

function loadPhoto(memory) {
    const photo = memory.photos[currentPhotoIndex];

    // Show loading spinner
    elements.photoLoading.classList.remove('hidden');
    elements.modalPhoto.classList.remove('loaded');

    // Load image
    elements.modalPhoto.src = photo;
    elements.modalTitle.textContent = memory.name;
    elements.modalCaption.textContent = memory.caption;

    elements.modalPhoto.onload = () => {
        elements.photoLoading.classList.add('hidden');
        elements.modalPhoto.classList.add('loaded');
    };

    elements.modalPhoto.onerror = () => {
        // If image fails to load, show placeholder message
        elements.photoLoading.classList.add('hidden');
        elements.modalPhoto.src = 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect fill="#FFE4EC" width="400" height="300"/>
        <text x="200" y="140" text-anchor="middle" fill="#A8738A" font-family="Georgia" font-size="16">
          Photo not found
        </text>
        <text x="200" y="165" text-anchor="middle" fill="#A8738A" font-family="Georgia" font-size="14">
          Add your photo to: ${photo}
        </text>
      </svg>
    `);
        elements.modalPhoto.classList.add('loaded');
    };
}

function updatePhotoCounter(memory) {
    elements.photoCounter.textContent = `${currentPhotoIndex + 1} / ${memory.photos.length}`;
}

function updateNavigationButtons(memory) {
    elements.prevPhotoBtn.disabled = currentPhotoIndex === 0;
    elements.nextPhotoBtn.disabled = currentPhotoIndex === memory.photos.length - 1;
}

function nextPhoto() {
    const memory = memories[currentMemoryIndex];
    if (currentPhotoIndex < memory.photos.length - 1) {
        currentPhotoIndex++;
        loadPhoto(memory);
        updatePhotoCounter(memory);
        updateNavigationButtons(memory);
    }
}

function prevPhoto() {
    const memory = memories[currentMemoryIndex];
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        loadPhoto(memory);
        updatePhotoCounter(memory);
        updateNavigationButtons(memory);
    }
}

function closeModal() {
    elements.photoModal.classList.add('hidden');
    elements.locationTitle.classList.add('hidden');
}

function continueJourney() {
    closeModal();

    if (currentMemoryIndex < memories.length - 1) {
        // Go to next memory
        setTimeout(() => {
            flyToMemory(currentMemoryIndex + 1);
        }, 500);
    } else {
        // Complete the walkthrough
        completeWalkthrough();
    }
}

function completeWalkthrough() {
    isWalkthroughMode = false;

    // Hide walkthrough UI
    elements.progressBar.classList.add('hidden');
    elements.skipBtn.classList.add('hidden');
    elements.locationTitle.classList.add('hidden');
    closeModal();

    // Update complete overlay text
    document.querySelector('.complete-title').textContent = finalMessage.title;
    document.querySelector('.complete-message').textContent = finalMessage.message;
    document.querySelector('.complete-submessage').textContent = finalMessage.submessage;

    // Show complete overlay
    elements.completeOverlay.classList.remove('hidden');

    // Remove active state from all markers
    markers.forEach(m => {
        const iconEl = m.getElement();
        if (iconEl) {
            iconEl.querySelector('.heart-marker')?.classList.remove('active');
        }
    });
}

function skipToExplore() {
    isWalkthroughMode = false;

    // Hide all walkthrough UI
    elements.progressBar.classList.add('hidden');
    elements.skipBtn.classList.add('hidden');
    elements.locationTitle.classList.add('hidden');
    closeModal();

    // Zoom out to show all markers
    const bounds = L.latLngBounds(memories.map(m => m.coords));
    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
}

// ==========================================================================
// EXPLORE MODE
// ==========================================================================

function openMemory(index) {
    currentMemoryIndex = index;
    currentPhotoIndex = 0;

    const memory = memories[index];

    // Update location title
    elements.locationNumber.textContent = String(index + 1).padStart(2, '0');
    elements.locationName.textContent = memory.name;
    elements.locationTitle.classList.remove('hidden');

    // Show modal
    showPhotoModal(memory);

    // Update button for explore mode
    elements.continueBtn.querySelector('span').textContent = 'Close';
}

function startExploreMode() {
    elements.completeOverlay.classList.add('hidden');

    // Zoom out to show all markers
    const bounds = L.latLngBounds(memories.map(m => m.coords));
    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

function initEventListeners() {
    // Start button
    elements.startBtn.addEventListener('click', startWalkthrough);

    // Photo navigation
    elements.prevPhotoBtn.addEventListener('click', prevPhoto);
    elements.nextPhotoBtn.addEventListener('click', nextPhoto);

    // Continue/Close button
    elements.continueBtn.addEventListener('click', () => {
        if (isWalkthroughMode) {
            continueJourney();
        } else {
            closeModal();
            elements.locationTitle.classList.add('hidden');
        }
    });

    // Close modal button
    elements.closeModalBtn.addEventListener('click', () => {
        closeModal();
        elements.locationTitle.classList.add('hidden');
        if (isWalkthroughMode) {
            // If in walkthrough, skip to next
            setTimeout(() => {
                flyToMemory(currentMemoryIndex + 1);
            }, 500);
        }
    });

    // Skip button
    elements.skipBtn.addEventListener('click', skipToExplore);

    // Explore button on complete screen
    elements.exploreBtn.addEventListener('click', startExploreMode);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (elements.photoModal.classList.contains('hidden')) return;

        if (e.key === 'ArrowLeft') {
            prevPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        } else if (e.key === 'Escape') {
            closeModal();
            elements.locationTitle.classList.add('hidden');
        } else if (e.key === 'Enter' || e.key === ' ') {
            if (isWalkthroughMode) {
                continueJourney();
            }
        }
    });

    // Click backdrop to close (in explore mode only)
    elements.photoModal.querySelector('.modal-backdrop').addEventListener('click', () => {
        if (!isWalkthroughMode) {
            closeModal();
            elements.locationTitle.classList.add('hidden');
        }
    });
}

// ==========================================================================
// INITIALIZE APP
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initEventListeners();
});
