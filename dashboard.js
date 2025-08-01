// API Configuration
const API_BASE_URL = "http://localhost:5000/api"

// Global variables
let currentUser = null
let authToken = null

// Initialize dashboard
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Dashboard loading...")
  await checkAuthentication()
  await loadDashboardData()
  setupEventListeners()
})

// Check if user is authenticated
async function checkAuthentication() {
  authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

  console.log("Checking authentication, token:", authToken)

  if (!authToken) {
    console.log("No token found, redirecting to login")
    redirectToLogin()
    return
  }

  try {
    // Try to get user from storage first
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")
    if (storedUser) {
      currentUser = JSON.parse(storedUser)
      console.log("User loaded from storage:", currentUser)
      updateUserInterface()
      return
    }

    // If no stored user, try API call
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success) {
      currentUser = data.data.user
      updateUserInterface()
    } else {
      console.log("API authentication failed, but token exists - using demo mode")
      // Create demo user for fallback
      currentUser = {
        id: "demo-user",
        firstName: "Demo",
        lastName: "User",
        email: "demo@evmatch.com",
        isEmailVerified: true,
      }
      updateUserInterface()
    }
  } catch (error) {
    console.error("Authentication check failed:", error)
    // Don't redirect on error, use demo mode instead
    currentUser = {
      id: "demo-user",
      firstName: "Demo",
      lastName: "User",
      email: "demo@evmatch.com",
      isEmailVerified: true,
    }
    updateUserInterface()
  }
}

// Update user interface with user data
function updateUserInterface() {
  if (!currentUser) return

  console.log("Updating UI with user:", currentUser)

  // Update user name
  const userName = document.getElementById("userName")
  if (userName) {
    userName.textContent = currentUser.firstName || "User"
  }

  // Update user initials
  const userInitials = document.getElementById("userInitials")
  if (userInitials) {
    const initials = (currentUser.firstName?.[0] || "") + (currentUser.lastName?.[0] || "")
    userInitials.textContent = initials || "U"
  }
}

// Load dashboard data
async function loadDashboardData() {
  try {
    await loadUserStats()
    await loadPopularEVs()
    await loadRecentActivity()
  } catch (error) {
    console.error("Failed to load dashboard data:", error)
  }
}

// Load user statistics
async function loadUserStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/stats`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success) {
      const stats = data.data
      document.getElementById("viewedCount").textContent = stats.viewedCount || 0
      document.getElementById("favoritesCount").textContent = stats.favoritesCount || 0
      document.getElementById("comparisonsCount").textContent = stats.comparisonsCount || 0
      document.getElementById("quizScore").textContent = stats.quizScore ? `${stats.quizScore}%` : "-"
    }
  } catch (error) {
    console.error("Failed to load user stats:", error)
    // Set sample data
    document.getElementById("viewedCount").textContent = "12"
    document.getElementById("favoritesCount").textContent = "3"
    document.getElementById("comparisonsCount").textContent = "5"
    document.getElementById("quizScore").textContent = "85%"
  }
}

// Load popular EVs
async function loadPopularEVs() {
  const container = document.getElementById("popularEVs")

  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/popular`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success && data.data.length > 0) {
      container.innerHTML = data.data
        .slice(0, 4)
        .map((ev) => createEVCard(ev))
        .join("")
    } else {
      loadSampleEVs(container)
    }
  } catch (error) {
    console.error("Failed to load popular EVs:", error)
    loadSampleEVs(container)
  }
}

// Load sample EVs (fallback)
function loadSampleEVs(container) {
  const sampleEVs = [
   
    // {
    //   id: 2,
    //   make: "BMW",
    //   model: "i4",
    //   year: 2024,
    //   price: 56395,
    //   range: 270,
    //   efficiency: 109,
    //   image: "/placeholder.svg?height=60&width=80&text=BMW+i4",
    // },
    {
      id: 3,
      make: "Tesla",
      model: "Model Y",
      year: 2024,
      price: 52390,
      range: 330,
      efficiency: 122,
      image: "/placeholder.svg?height=60&width=80&text=Tesla+Model+Y",
    },
    {
      id: 4,
      make: "Audi",
      model: "e-tron GT",
      year: 2024,
      price: 107300,
      range: 238,
      efficiency: 85,
      image: "/placeholder.svg?height=60&width=80&text=Audi+e-tron",
    },
  ]

  container.innerHTML = sampleEVs.map((ev) => createEVCard(ev)).join("")
}

// Create EV card HTML
function createEVCard(ev) {
  return `
        <div class="ev-card" onclick="viewEVDetails(${ev.id})">
            <div class="ev-image">
                <img src="${ev.image}" alt="${ev.make} ${ev.model}" onerror="this.src='/placeholder.svg?height=60&width=80&text=${encodeURIComponent(ev.make + " " + ev.model)}'">
            </div>
            <div class="ev-details">
                <div class="ev-name">${ev.make} ${ev.model} ${ev.year}</div>
                <div class="ev-specs">
                    <span>${ev.range} mi</span>
                    <span>${ev.efficiency} MPGe</span>
                </div>
            </div>
            <div class="ev-price">$${ev.price.toLocaleString()}</div>
        </div>
    `
}

// Load recent activity
async function loadRecentActivity() {
  const container = document.getElementById("activityFeed")

  try {
    const response = await fetch(`${API_BASE_URL}/users/activity`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success && data.data.length > 0) {
      container.innerHTML = data.data
        .slice(0, 5)
        .map((activity) => createActivityItem(activity))
        .join("")
    } else {
      loadSampleActivity(container)
    }
  } catch (error) {
    console.error("Failed to load recent activity:", error)
    loadSampleActivity(container)
  }
}

// Load sample activity (fallback)
function loadSampleActivity(container) {
  const sampleActivity = [
    {
      type: "view",
      text: "Viewed Tesla Model 3",
      time: "2 hours ago",
      icon: "fas fa-eye",
      color: "green",
    },
    {
      type: "favorite",
      text: "Added BMW i4 to favorites",
      time: "1 day ago",
      icon: "fas fa-heart",
      color: "blue",
    },
    {
      type: "compare",
      text: "Compared 3 vehicles",
      time: "2 days ago",
      icon: "fas fa-balance-scale",
      color: "purple",
    },
    {
      type: "quiz",
      text: "Completed EV matching quiz",
      time: "3 days ago",
      icon: "fas fa-question-circle",
      color: "orange",
    },
    {
      type: "charging",
      text: "Found charging stations nearby",
      time: "1 week ago",
      icon: "fas fa-bolt",
      color: "green",
    },
  ]

  container.innerHTML = sampleActivity.map((activity) => createActivityItem(activity)).join("")
}

// Create activity item HTML
function createActivityItem(activity) {
  return `
        <div class="activity-item">
            <div class="activity-icon ${activity.color}" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `
}

// Setup event listeners
function setupEventListeners() {
  const userAvatar = document.getElementById("userAvatar")
  const userDropdown = document.getElementById("userDropdown")

  if (userAvatar && userDropdown) {
    userAvatar.addEventListener("click", (e) => {
      e.stopPropagation()
      userDropdown.classList.toggle("show")
    })

    document.addEventListener("click", () => {
      userDropdown.classList.remove("show")
    })

    userDropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  }
}

// View EV details
function viewEVDetails(evId) {
  trackActivity("view", evId)
  alert(`Viewing details for EV ID: ${evId}`)
}

// Track user activity
async function trackActivity(type, itemId) {
  try {
    await fetch(`${API_BASE_URL}/users/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        type,
        itemId,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error("Failed to track activity:", error)
  }
}

// Open profile page
function openProfile() {
  window.location.href = "profile.html"
}

// Open favorites page
function openFavorites() {
  window.location.href = "favorites.html"
}

// Open settings page
function openSettings() {
  window.location.href = "settings.html"
}

// Handle logout
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    performLogout()
  }
}

// Perform logout
async function performLogout() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  } catch (error) {
    console.error("Logout request failed:", error)
  } finally {
    clearAuthData()
    showSuccessMessage("Logged out successfully!")
    setTimeout(() => {
      redirectToLogin()
    }, 1500)
  }
}

// Clear authentication data
function clearAuthData() {
  localStorage.removeItem("authToken")
  sessionStorage.removeItem("authToken")
  localStorage.removeItem("user")
  sessionStorage.removeItem("user")
}

// Redirect to login page
function redirectToLogin() {
  window.location.href = "index.html"
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `

  const mainContent = document.querySelector(".dashboard-container")
  mainContent.insertBefore(successDiv, mainContent.firstChild)

  setTimeout(() => {
    successDiv.remove()
  }, 3000)
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message

  const mainContent = document.querySelector(".dashboard-container")
  mainContent.insertBefore(errorDiv, mainContent.firstChild)

  setTimeout(() => {
    errorDiv.remove()
  }, 5000)
}
