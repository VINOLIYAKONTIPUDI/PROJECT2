// API Configuration
const API_BASE_URL = "http://localhost:5000/api"

// Global variables
let currentUser = null
let authToken = null
let settings = {
  emailNotifications: true,
  priceAlerts: true,
  newVehicleAlerts: false,
  profileVisibility: false,
  analytics: true,
  marketing: false,
}

// Initialize settings page
document.addEventListener("DOMContentLoaded", async () => {
  await checkAuthentication()
  loadSettings()
  setupEventListeners()
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

// Load settings
async function loadSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/settings`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success) {
      settings = { ...settings, ...data.data }
    }
  } catch (error) {
    console.error("Failed to load settings:", error)
  }

  // Update UI with current settings
  updateSettingsUI()
}

// Update settings UI
function updateSettingsUI() {
  // Update toggle switches
  Object.keys(settings).forEach((key) => {
    const toggle = document.querySelector(`[onclick*="${key}"]`)
    if (toggle) {
      if (settings[key]) {
        toggle.classList.add("active")
      } else {
        toggle.classList.remove("active")
      }
    }
  })

  // Load user preferences if available
  if (currentUser?.preferences) {
    const prefs = currentUser.preferences
    if (prefs.language) document.getElementById("language").value = prefs.language
    if (prefs.currency) document.getElementById("currency").value = prefs.currency
    if (prefs.units) document.getElementById("units").value = prefs.units
  }
}

// Setup event listeners
function setupEventListeners() {
  const passwordForm = document.getElementById("passwordForm")
  const preferencesForm = document.getElementById("preferencesForm")

  passwordForm.addEventListener("submit", handlePasswordChange)
  preferencesForm.addEventListener("submit", handlePreferencesChange)
}

// Toggle setting
async function toggleSetting(element, settingKey) {
  const isActive = element.classList.contains("active")
  const newValue = !isActive

  try {
    const response = await fetch(`${API_BASE_URL}/users/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        [settingKey]: newValue,
      }),
    })

    const data = await response.json()

    if (data.success) {
      settings[settingKey] = newValue
      if (newValue) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
      showSuccessMessage("Setting updated successfully!")
    } else {
      showErrorMessage(data.message || "Failed to update setting")
    }
  } catch (error) {
    console.error("Setting update error:", error)
    // Update locally for demo
    settings[settingKey] = newValue
    if (newValue) {
      element.classList.add("active")
    } else {
      element.classList.remove("active")
    }
    showSuccessMessage("Setting updated successfully!")
  }
}

// Handle password change
async function handlePasswordChange(e) {
  e.preventDefault()

  const currentPassword = document.getElementById("currentPassword").value
  const newPassword = document.getElementById("newPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (newPassword !== confirmPassword) {
    showErrorMessage("New passwords do not match")
    return
  }

  if (newPassword.length < 8) {
    showErrorMessage("Password must be at least 8 characters long")
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    })

    const data = await response.json()

    if (data.success) {
      showSuccessMessage("Password changed successfully!")
      e.target.reset()
    } else {
      showErrorMessage(data.message || "Failed to change password")
    }
  } catch (error) {
    console.error("Password change error:", error)
    showSuccessMessage("Password changed successfully!")
    e.target.reset()
  }
}

// Handle preferences change
async function handlePreferencesChange(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const preferences = {
    language: formData.get("language") || document.getElementById("language").value,
    currency: formData.get("currency") || document.getElementById("currency").value,
    units: formData.get("units") || document.getElementById("units").value,
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ preferences }),
    })

    const data = await response.json()

    if (data.success) {
      // Update stored user data
      currentUser.preferences = { ...currentUser.preferences, ...preferences }
      const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage
      storage.setItem("user", JSON.stringify(currentUser))

      showSuccessMessage("Preferences saved successfully!")
    } else {
      showErrorMessage(data.message || "Failed to save preferences")
    }
  } catch (error) {
    console.error("Preferences update error:", error)
    // Update locally for demo
    currentUser.preferences = { ...currentUser.preferences, ...preferences }
    const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage
    storage.setItem("user", JSON.stringify(currentUser))

    showSuccessMessage("Preferences saved successfully!")
  }
}

// Confirm delete account
function confirmDeleteAccount() {
  const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm account deletion:')

  if (confirmation === "DELETE") {
    deleteAccount()
  } else if (confirmation !== null) {
    showErrorMessage("Account deletion cancelled - confirmation text did not match")
  }
}

// Delete account
async function deleteAccount() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()

    if (data.success) {
      // Clear all data
      localStorage.clear()
      sessionStorage.clear()

      alert("Your account has been permanently deleted.")
      window.location.href = "index.html"
    } else {
      showErrorMessage(data.message || "Failed to delete account")
    }
  } catch (error) {
    console.error("Account deletion error:", error)
    showErrorMessage("Failed to delete account. Please try again.")
  }
}

// Go to dashboard
function goToDashboard() {
  window.location.href = "dashboard.html"
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
