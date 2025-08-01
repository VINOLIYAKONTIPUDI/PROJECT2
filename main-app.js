// Sample EV data
const evData = [
    {
        id: 1,
        make: "Tesla",
        model: "Model 3",
        year: 2024,
        price: 38990,
        range: 358,
        efficiency: 132,
        bodyType: "Sedan",
        chargingSpeed: "250kW",
        acceleration: 5.8,
        topSpeed: 140,
        seating: 5,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 2,
        make: "BMW",
        model: "i4",
        year: 2024,
        price: 56395,
        range: 270,
        efficiency: 109,
        bodyType: "Sedan",
        chargingSpeed: "200kW",
        acceleration: 5.7,
        topSpeed: 118,
        seating: 5,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 3,
        make: "Audi",
        model: "e-tron GT",
        year: 2024,
        price: 107300,
        range: 238,
        efficiency: 85,
        bodyType: "Coupe",
        chargingSpeed: "270kW",
        acceleration: 3.9,
        topSpeed: 152,
        seating: 4,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 4,
        make: "Tesla",
        model: "Model Y",
        year: 2024,
        price: 52390,
        range: 330,
        efficiency: 122,
        bodyType: "SUV",
        chargingSpeed: "250kW",
        acceleration: 6.6,
        topSpeed: 135,
        seating: 7,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 5,
        make: "Mercedes",
        model: "EQC",
        year: 2024,
        price: 67900,
        range: 259,
        efficiency: 97,
        bodyType: "SUV",
        chargingSpeed: "110kW",
        acceleration: 5.1,
        topSpeed: 112,
        seating: 5,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 6,
        make: "Volkswagen",
        model: "ID.4",
        year: 2024,
        price: 38995,
        range: 275,
        efficiency: 104,
        bodyType: "SUV",
        chargingSpeed: "135kW",
        acceleration: 7.5,
        topSpeed: 99,
        seating: 5,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 7,
        make: "Nissan",
        model: "Leaf",
        year: 2024,
        price: 28040,
        range: 149,
        efficiency: 120,
        bodyType: "Hatchback",
        chargingSpeed: "100kW",
        acceleration: 7.4,
        topSpeed: 90,
        seating: 5,
        image: "/placeholder.svg?height=200&width=320"
    },
    {
        id: 8,
        make: "BMW",
        model: "iX",
        year: 2024,
        price: 87100,
        range: 324,
        efficiency: 86,
        bodyType: "SUV",
        chargingSpeed: "200kW",
        acceleration: 6.1,
        topSpeed: 124,
        seating: 5,
        image: "/placeholder.svg?height=200&width=320"
    }
];

// Charging station data
const chargingStations = [
    {
        id: 1,
        name: "Tesla Supercharger",
        address: "123 Main St, Downtown",
        network: "Tesla",
        type: "DC Fast",
        power: "250kW",
        available: 8,
        total: 12,
        price: "$0.28/kWh",
        distance: "0.5 miles",
        status: "available"
    },
    {
        id: 2,
        name: "ChargePoint Station",
        address: "456 Oak Ave, Midtown",
        network: "ChargePoint",
        type: "Level 2",
        power: "22kW",
        available: 2,
        total: 4,
        price: "$0.15/kWh",
        distance: "1.2 miles",
        status: "available"
    },
    {
        id: 3,
        name: "Electrify America",
        address: "789 Pine St, Uptown",
        network: "Electrify America",
        type: "DC Fast",
        power: "350kW",
        available: 0,
        total: 6,
        price: "$0.31/kWh",
        distance: "2.1 miles",
        status: "occupied"
    },
    {
        id: 4,
        name: "EVgo Fast Charging",
        address: "321 Elm St, Westside",
        network: "EVgo",
        type: "DC Fast",
        power: "100kW",
        available: 3,
        total: 4,
        price: "$0.25/kWh",
        distance: "2.8 miles",
        status: "available"
    }
];

// Global variables
let currentPage = 1;
let filteredEVs = [...evData];
let comparisonList = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath.includes('dashboard.html') || currentPath === '/') {
        loadPopularEVs();
    }
});

// Load popular EVs for dashboard
function loadPopularEVs() {
    const container = document.getElementById('popularEVs');
    if (!container) return;

    const popularEVs = evData.slice(0, 4);
    container.innerHTML = popularEVs.map(ev => createEVCard(ev)).join('');
}

// Create EV card HTML
function createEVCard(ev) {
    return `
      <div class="ev-card" onclick="viewEVDetails(${ev.id})">
        <div class="ev-image">
          <img src="${ev.image}" alt="${ev.make} ${ev.model}">
        </div>
        <div class="ev-content">
          <div class="ev-header">
            <div>
              <div class="ev-title">${ev.make} ${ev.model}</div>
              <div class="ev-make">${ev.year}</div>
            </div>
            <div class="ev-price">$${ev.price.toLocaleString()}</div>
          </div>
          <div class="ev-specs">
            <div class="spec-item">
              <i class="fas fa-road"></i>
              <span>${ev.range} miles</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-bolt"></i>
              <span>${ev.efficiency} MPGe</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-tachometer-alt"></i>
              <span>0-60: ${ev.acceleration}s</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-users"></i>
              <span>${ev.seating} seats</span>
            </div>
          </div>
          <div class="ev-actions">
            <button class="btn-small btn-compare" onclick="event.stopPropagation(); addToComparison(${ev.id})">
              <i class="fas fa-balance-scale"></i>
              Compare
            </button>
            <button class="btn-small btn-details">
              <i class="fas fa-info-circle"></i>
              Details
            </button>
          </div>
        </div>
      </div>
    `;
}

// View EV details
function viewEVDetails(evId) {
    const ev = evData.find(e => e.id === evId);
    if (!ev) return;

    alert(`${ev.make} ${ev.model} Details:\n\nPrice: $${ev.price.toLocaleString()}\nRange: ${ev.range} miles\nEfficiency: ${ev.efficiency} MPGe\nAcceleration: 0-60 in ${ev.acceleration}s\nTop Speed: ${ev.topSpeed} mph\nSeating: ${ev.seating} people\nCharging Speed: ${ev.chargingSpeed}`);
}

// Add to comparison
function addToComparison(evId) {
    if (comparisonList.includes(evId)) {
        alert('This vehicle is already in your comparison list.');
        return;
    }

    if (comparisonList.length >= 3) {
        alert('You can compare up to 3 vehicles at once.');
        return;
    }

    comparisonList.push(evId);
    updateComparisonBadge();

    const ev = evData.find(e => e.id === evId);
    alert(`${ev.make} ${ev.model} added to comparison!`);
}

// Update comparison badge
function updateComparisonBadge() {
    // This would update a comparison badge in the navigation
    console.log(`Comparison list: ${comparisonList.length} vehicles`);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format number with commas
function formatNumber(num) {
    return num.toLocaleString();
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;
    successDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #c6f6d5;
      color: #276749;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fed7d7;
      color: #c53030;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}
  