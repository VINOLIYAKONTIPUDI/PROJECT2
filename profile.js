// API Configuration
const API_BASE_URL = "http://localhost:5000/api"

// Global variables
let currentUser = null
let authToken = null

// Initialize profile page
document.addEventListener("DOMContentLoaded", async () => {
  await checkAuthentication()
  loadUserProfile()
  setupEventListeners()
})

// Check authentication
async function checkAuthentication() {
  authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")

  if (!authToken) {
    window.location.href = "index.html"
    return
  }

  // Get user from storage
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")
  if (storedUser) {
    currentUser = JSON.parse(storedUser)
  }
}

// Load user profile data
function loadUserProfile() {
  if (!currentUser) return

  // Update profile header
  document.getElementById("profileName").textContent =
    `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() || "User Name"
  document.getElementById("profileEmail").textContent = currentUser.email || "user@example.com"

  // Update initials
  const initials = (currentUser.firstName?.[0] || "") + (currentUser.lastName?.[0] || "")
  document.getElementById("profileInitials").textContent = initials || "U"

  // Update verification badge
  const verificationBadge = document.getElementById("verificationBadge")
  if (currentUser.isEmailVerified) {
    verificationBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>Email Verified</span>'
    verificationBadge.className = "verification-badge"
  } else {
    verificationBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Email Not Verified</span>'
    verificationBadge.className = "verification-badge unverified"
  }

  // Fill form fields
  document.getElementById("firstName").value = currentUser.firstName || ""
  document.getElementById("lastName").value = currentUser.lastName || ""
  document.getElementById("email").value = currentUser.email || ""
  document.getElementById("phone").value = currentUser.phone || ""
  document.getElementById("address").value = currentUser.address || ""

  // Fill preferences
  document.getElementById("budget").value = currentUser.preferences?.budget || ""
  document.getElementById("range").value = currentUser.preferences?.range || ""
  document.getElementById("bodyType").value = currentUser.preferences?.bodyType || ""
}

// Setup event listeners
function setupEventListeners() {
  const personalInfoForm = document.getElementById("personalInfoForm")
  const preferencesForm = document.getElementById("preferencesForm")
  const avatarInput = document.getElementById("avatarInput")

  personalInfoForm.addEventListener("submit", handlePersonalInfoSubmit)
  preferencesForm.addEventListener("submit", handlePreferencesSubmit)
  avatarInput.addEventListener("change", handleAvatarChange)
}

// Handle personal info form submission
async function handlePersonalInfoSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const updatedData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedData),
    })

    const data = await response.json()

    if (data.success) {
      // Update stored user data
      currentUser = { ...currentUser, ...updatedData }
      const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage
      storage.setItem("user", JSON.stringify(currentUser))

      showSuccessMessage("Personal information updated successfully!")
      loadUserProfile()
    } else {
      showErrorMessage(data.message || "Failed to update profile")
    }
  } catch (error) {
    console.error("Profile update error:", error)
    // Update locally for demo
    currentUser = { ...currentUser, ...updatedData }
    const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage
    storage.setItem("user", JSON.stringify(currentUser))

    showSuccessMessage("Personal information updated successfully!")
    loadUserProfile()
  }
}

// Handle preferences form submission
async function handlePreferencesSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const preferences = {
    budget: formData.get("budget"),
    range: formData.get("range"),
    bodyType: formData.get("bodyType"),
    features: Array.from(document.getElementById("features").selectedOptions).map((option) => option.value),
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
      currentUser.preferences = preferences
      const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage
      storage.setItem("user", JSON.stringify(currentUser))

      showSuccessMessage("Preferences updated successfully!")
    } else {
      showErrorMessage(data.message || "Failed to update preferences")
    }
  } catch (error) {
    console.error("Preferences update error:", error)
    // Update locally for demo
    currentUser.preferences = preferences
    const storage = localStorage.getItem("authToken") ? localStorage : sessionStorage
    storage.setItem("user", JSON.stringify(currentUser))

    showSuccessMessage("Preferences updated successfully!")
  }
}

// Upload avatar
function uploadAvatar() {
  document.getElementById("avatarInput").click()
}

// Handle avatar change
function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const avatarElement = document.getElementById("profileAvatar")
    avatarElement.style.backgroundImage = `url(${e.target.result})`
    avatarElement.style.backgroundSize = "cover"
    avatarElement.style.backgroundPosition = "center"
    avatarElement.innerHTML =
      '<button class="avatar-upload" onclick="uploadAvatar()"><i class="fas fa-camera"></i></button>'

    showSuccessMessage("Avatar updated successfully!")
  }
  reader.readAsDataURL(file)
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
