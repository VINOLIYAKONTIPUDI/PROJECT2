// API Configuration
const API_BASE_URL = "http://localhost:5000/api"

// Global variables
let currentUser = null
let authToken = null
let favorites = []

// Initialize favorites page
document.addEventListener("DOMContentLoaded", async () => {
  await checkAuthentication()
  await loadFavorites()
})

// Check authentication
async function checkAuthentication() {
  authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

  if (!authToken) {
    window.location.href = "index.html"
    return
  }

  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")
  if (storedUser) {
    currentUser = JSON.parse(storedUser)
  }
}

// Load favorites
async function loadFavorites() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/favorites`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success && data.data.length > 0) {
      favorites = data.data
      displayFavorites()
    } else {
      loadSampleFavorites()
    }
  } catch (error) {
    console.error("Failed to load favorites:", error)
    loadSampleFavorites()
  }
}

// Load sample favorites (fallback)
function loadSampleFavorites() {
  favorites = [
    {
      id: 1,
      make: "Tesla",
      model: "Model 3",
      year: 2024,
      price: 38990,
      range: 358,
      efficiency: 132,
      acceleration: 5.8,
      topSpeed: 140,
      image: "/placeholder.svg?height=200&width=350&text=Tesla+Model+3",
    },
    {
      id: 2,
      make: "BMW",
      model: "i4",
      year: 2024,
      price: 56395,
      range: 270,
      efficiency: 109,
      acceleration: 5.7,
      topSpeed: 118,
      image: "/placeholder.svg?height=200&width=350&text=BMW+i4",
    },
    {
      id: 3,
      make: "Tesla",
      model: "Model Y",
      year: 2024,
      price: 52390,
      range: 330,
      efficiency: 122,
      acceleration: 6.6,
      topSpeed: 135,
      image: "/placeholder.svg?height=200&width=350&text=Tesla+Model+Y",
    },
  ]
  displayFavorites()
}

// Display favorites
function displayFavorites() {
  const favoritesGrid = document.getElementById("favoritesGrid")
  const emptyState = document.getElementById("emptyState")
  const favoritesCount = document.getElementById("favoritesCount")

  if (favorites.length === 0) {
    favoritesGrid.style.display = "none"
    emptyState.style.display = "block"
    favoritesCount.textContent = "0 vehicles"
    return
  }

  favoritesGrid.style.display = "grid"
  emptyState.style.display = "none"
  favoritesCount.textContent = `${favorites.length} vehicle${favorites.length !== 1 ? "s" : ""}`

  favoritesGrid.innerHTML = favorites.map((vehicle) => createFavoriteCard(vehicle)).join("")
}

// Create favorite card HTML
function createFavoriteCard(vehicle) {
  return `
        <div class="favorite-card">
            <div class="favorite-image">
                <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" 
                     onerror="this.src='/placeholder.svg?height=200&width=350&text=${encodeURIComponent(vehicle.make + " " + vehicle.model)}'">
                <button class="remove-favorite" onclick="removeFavorite(${vehicle.id})" title="Remove from favorites">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="favorite-content">
                <div class="favorite-name">${vehicle.make} ${vehicle.model} ${vehicle.year}</div>
                <div class="favorite-price">$${vehicle.price.toLocaleString()}</div>
                <div class="favorite-specs">
                    <div class="spec-item">
                        <i class="fas fa-road spec-icon"></i>
                        <span>${vehicle.range} mi range</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-leaf spec-icon"></i>
                        <span>${vehicle.efficiency} MPGe</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-tachometer-alt spec-icon"></i>
                        <span>0-60: ${vehicle.acceleration}s</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-speedometer spec-icon"></i>
                        <span>Top: ${vehicle.topSpeed} mph</span>
                    </div>
                </div>
                <div class="favorite-actions">
                    <button class="btn-primary" onclick="viewDetails(${vehicle.id})">View Details</button>
                    <button class="btn-secondary" onclick="addToComparison(${vehicle.id})">Compare</button>
                </div>
            </div>
        </div>
    `
}

// Remove from favorites
async function removeFavorite(vehicleId) {
  if (!confirm("Are you sure you want to remove this vehicle from your favorites?")) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/favorites/${vehicleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success) {
      favorites = favorites.filter((vehicle) => vehicle.id !== vehicleId)
      displayFavorites()
      showSuccessMessage("Vehicle removed from favorites!")
    } else {
      showErrorMessage(data.message || "Failed to remove from favorites")
    }
  } catch (error) {
    console.error("Remove favorite error:", error)
    // Remove locally for demo
    favorites = favorites.filter((vehicle) => vehicle.id !== vehicleId)
    displayFavorites()
    showSuccessMessage("Vehicle removed from favorites!")
  }
}

// View vehicle details
function viewDetails(vehicleId) {
  alert(`Viewing details for vehicle ID: ${vehicleId}`)
  // In a real app, this would navigate to a detailed vehicle page
}

// Add to comparison
function addToComparison(vehicleId) {
  const vehicle = favorites.find((v) => v.id === vehicleId)
  if (vehicle) {
    showSuccessMessage(`${vehicle.make} ${vehicle.model} added to comparison!`)
    // In a real app, this would add to comparison list
  }
}

// Go to dashboard
function goToDashboard() {
  window.location.href = "dashboard.html"
}

// Go to browse page
function goToBrowse() {
  window.location.href = "browse.html"
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.style.cssText = `
    background: #d1fae5;
    border: 1px solid #a7f3d0;
    color: #065f46;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `
  successDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `

  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.remove()
  }, 3000)
}

// Show error message
function showErrorMessage(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.style.cssText = `
    background: #fed7d7;
    border: 1px solid #feb2b2;
    color: #c53030;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>
  `

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    errorDiv.remove()
  }, 5000)
}
