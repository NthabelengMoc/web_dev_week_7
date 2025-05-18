// DOM Elements
const profileCard = document.getElementById('profileCard');
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const borderColorInput = document.getElementById('borderColor');
const applyBtn = document.getElementById('applyBtn');
const resetBtn = document.getElementById('resetBtn');

// Default values
const defaultSettings = {
    bgColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#3498db'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    applyBtn.addEventListener('click', function() {
        applyChanges();
        triggerAnimation('bounce');
        saveUserPreferences();
    });
    
    resetBtn.addEventListener('click', function() {
        resetToDefaults();
        triggerAnimation('shake');
    });
    
    // Add hover effect for profile card
    profileCard.addEventListener('mouseenter', function() {
        profileCard.style.transform = 'scale(1.05)';
    });
    
    profileCard.addEventListener('mouseleave', function() {
        profileCard.style.transform = 'scale(1)';
    });
}

// Apply user-selected changes to the profile card
function applyChanges() {
    const bgColor = bgColorInput.value;
    const textColor = textColorInput.value;
    const borderColor = borderColorInput.value;
    
    // Apply changes to the profile card
    profileCard.style.backgroundColor = bgColor;
    profileCard.style.borderColor = borderColor;
    
    // Apply text color to all text elements in the profile card
    const textElements = profileCard.querySelectorAll('h2, p');
    textElements.forEach(element => {
        element.style.color = textColor;
    });
}

// Reset to default settings
function resetToDefaults() {
    bgColorInput.value = defaultSettings.bgColor;
    textColorInput.value = defaultSettings.textColor;
    borderColorInput.value = defaultSettings.borderColor;
    
    // Apply default settings
    applyChanges();
    
    // Clear localStorage
    localStorage.removeItem('profileCardPreferences');
}

// Save user preferences to localStorage
function saveUserPreferences() {
    const preferences = {
        bgColor: bgColorInput.value,
        textColor: textColorInput.value,
        borderColor: borderColorInput.value
    };
    
    localStorage.setItem('profileCardPreferences', JSON.stringify(preferences));
    
    // Show a temporary message that preferences were saved
    showTemporaryMessage('Preferences saved!');
}

// Load user preferences from localStorage
function loadUserPreferences() {
    const savedPreferences = localStorage.getItem('profileCardPreferences');
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        
        // Update input values
        bgColorInput.value = preferences.bgColor;
        textColorInput.value = preferences.textColor;
        borderColorInput.value = preferences.borderColor;
        
        // Apply saved preferences
        applyChanges();
    }
}

// Trigger an animation on the profile card
function triggerAnimation(animationName) {
    // Remove any existing animation classes
    profileCard.classList.remove('shake', 'bounce');
    
    // Force a reflow to ensure the animation plays even if the same class is added
    void profileCard.offsetWidth;
    
    // Add the animation class
    profileCard.classList.add(animationName);
    
    // Remove the animation class after it completes
    setTimeout(() => {
        profileCard.classList.remove(animationName);
    }, 500);
}

// Show a temporary message
function showTemporaryMessage(message) {
    // Create a message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = '#2ecc71';
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px 20px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    messageElement.style.zIndex = '1000';
    messageElement.style.opacity = '0';
    messageElement.style.transition = 'opacity 0.3s ease';
    
    // Add the message to the document
    document.body.appendChild(messageElement);
    
    // Trigger a reflow to ensure the transition works
    void messageElement.offsetWidth;
    
    // Show the message
    messageElement.style.opacity = '1';
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 300);
    }, 3000);
}