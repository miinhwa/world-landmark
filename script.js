// Map initialization
let map;
let markers = [];
let currentLandmarks = landmarks;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    addLandmarksToMap();
    updateLandmarksList();
    setupEventListeners();
    updateStats();
});

// Map initialization
function initializeMap() {
    map = L.map('map').setView([20, 0], 2);
    
    // Add map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
}

// Add landmark markers to map
function addLandmarksToMap() {
    // Clear existing markers
    clearMarkers();
    
    currentLandmarks.forEach(landmark => {
        const categoryInfo = categories[landmark.category];
        
        // Create custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="custom-marker marker-${landmark.category}">${categoryInfo.icon}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });
        
        // Create marker
        const marker = L.marker(landmark.coordinates, { icon: customIcon })
            .addTo(map);
        
        // Create popup
        const popupContent = `
            <div class="popup-content">
                <div class="popup-title">${landmark.name}</div>
                <div class="popup-location">📍 ${landmark.location}</div>
                <div class="popup-category">${categoryInfo.name}</div>
                <div class="popup-description">${landmark.description}</div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Save marker for further use
        markers.push(marker);
        
        // Add click handler to scroll to element in list
        marker.on('click', function() {
            scrollToLandmarkInList(landmark.name);
        });
    });
}

// Clear markers from map
function clearMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
}

// Update landmarks list
function updateLandmarksList() {
    const container = document.getElementById('landmarksContainer');
    container.innerHTML = '';
    
    currentLandmarks.forEach(landmark => {
        const categoryInfo = categories[landmark.category];
        
        const landmarkElement = document.createElement('div');
        landmarkElement.className = 'landmark-item';
        landmarkElement.innerHTML = `
            <h4>${landmark.name}</h4>
            <div class="location">📍 ${landmark.location}</div>
            <div class="category">${categoryInfo.name}</div>
            <div class="description">${landmark.description}</div>
        `;
        
        // Add click handler to center map
        landmarkElement.addEventListener('click', function() {
            centerMapOnLandmark(landmark);
            highlightLandmark(landmark.name);
        });
        
        container.appendChild(landmarkElement);
    });
}

// Center map on landmark
function centerMapOnLandmark(landmark) {
    map.setView(landmark.coordinates, 10);
    
    // Open popup for corresponding marker
    const marker = markers.find(m => 
        m.getLatLng().lat === landmark.coordinates[0] && 
        m.getLatLng().lng === landmark.coordinates[1]
    );
    
    if (marker) {
        marker.openPopup();
    }
}

// Highlight landmark in list
function highlightLandmark(landmarkName) {
    const items = document.querySelectorAll('.landmark-item');
    items.forEach(item => {
        item.style.borderColor = 'transparent';
        if (item.querySelector('h4').textContent === landmarkName) {
            item.style.borderColor = '#667eea';
            item.style.backgroundColor = '#f8f9ff';
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// Scroll to landmark in list
function scrollToLandmarkInList(landmarkName) {
    const items = document.querySelectorAll('.landmark-item');
    items.forEach(item => {
        if (item.querySelector('h4').textContent === landmarkName) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            highlightLandmark(landmarkName);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', performFilter);
    
    // Search on Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        currentLandmarks = landmarks;
    } else {
        currentLandmarks = landmarks.filter(landmark => 
            landmark.name.toLowerCase().includes(searchTerm) ||
            landmark.location.toLowerCase().includes(searchTerm) ||
            landmark.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    applyCategoryFilter();
    updateMapAndList();
}

// Perform category filtering
function performFilter() {
    applyCategoryFilter();
    updateMapAndList();
}

// Apply category filter
function applyCategoryFilter() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    if (selectedCategory !== 'all') {
        currentLandmarks = currentLandmarks.filter(landmark => 
            landmark.category === selectedCategory
        );
    }
}

// Update map and list
function updateMapAndList() {
    addLandmarksToMap();
    updateLandmarksList();
    updateStats();
}

// Update statistics
function updateStats() {
    const countElement = document.getElementById('landmarkCount');
    countElement.textContent = `${currentLandmarks.length} landmarks`;
}

// Function for random landmark selection
function showRandomLandmark() {
    if (currentLandmarks.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentLandmarks.length);
        const randomLandmark = currentLandmarks[randomIndex];
        centerMapOnLandmark(randomLandmark);
        highlightLandmark(randomLandmark.name);
    }
}

// Add "Random Landmark" button
function addRandomButton() {
    const controls = document.querySelector('.controls');
    const randomBtn = document.createElement('button');
    randomBtn.innerHTML = '🎲 Random';
    randomBtn.className = 'random-btn';
    randomBtn.style.cssText = `
        padding: 12px 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: transform 0.2s ease;
        margin-left: 10px;
    `;
    
    randomBtn.addEventListener('click', showRandomLandmark);
    randomBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    randomBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    controls.appendChild(randomBtn);
}

// Add random landmark button on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addRandomButton, 100);
});

// Function for exporting landmark data
function exportLandmarks() {
    const dataStr = JSON.stringify(currentLandmarks, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'landmarks.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Add keyboard handler
document.addEventListener('keydown', function(e) {
    // R - random landmark
    if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        showRandomLandmark();
    }
    // E - export
    if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        exportLandmarks();
    }
});

// Loading animation
function showLoadingAnimation() {
    const mapContainer = document.getElementById('map');
    mapContainer.style.opacity = '0.7';
    mapContainer.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        mapContainer.style.opacity = '1';
    }, 500);
}

// Function to get user location information
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Create user location marker
            const userIcon = L.divIcon({
                className: 'user-location',
                html: '<div style="width: 20px; height: 20px; background: #ff0000; border: 3px solid white; border-radius: 50%;"></div>',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            
            L.marker([userLat, userLng], { icon: userIcon })
                .addTo(map)
                .bindPopup('Your location')
                .openPopup();
            
            map.setView([userLat, userLng], 10);
        });
    }
}

// Add location button
function addLocationButton() {
    const controls = document.querySelector('.controls');
    const locationBtn = document.createElement('button');
    locationBtn.innerHTML = '📍 My Location';
    locationBtn.className = 'location-btn';
    locationBtn.style.cssText = `
        padding: 12px 20px;
        background: linear-gradient(45deg, #00b894, #00a085);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: transform 0.2s ease;
        margin-left: 10px;
    `;
    
    locationBtn.addEventListener('click', getUserLocation);
    locationBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    locationBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    controls.appendChild(locationBtn);
}

// Add location button on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addLocationButton, 200);
});
