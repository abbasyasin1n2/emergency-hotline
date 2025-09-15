// Emergency Service Directory - JavaScript
// Complete functionality implementation

// Global variables for tracking counts
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Emergency Service Directory loaded successfully');
    
    // Update display counts
    updateDisplayCounts();
    
    // Set up clear history button
    const clearBtn = document.getElementById('clearHistoryBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCallHistory);
    }
    
    // Initialize heart icons
    initializeHeartIcons();
});

// Function to update display counts in navbar
function updateDisplayCounts() {
    const heartElement = document.getElementById('heartCount');
    const coinElement = document.getElementById('coinCount');
    const copyElement = document.getElementById('copyCount');
    
    if (heartElement) heartElement.textContent = heartCount;
    if (coinElement) coinElement.textContent = coinCount;
    if (copyElement) copyElement.textContent = copyCount;
}

// Initialize heart icons
function initializeHeartIcons() {
    const heartIcons = document.querySelectorAll('.heart-icon i');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            handleHeartClick(this);
        });
    });
}

// Heart click functionality
function handleHeartClick(heartIcon) {
    // Toggle heart state
    if (heartIcon.classList.contains('far')) {
        // Fill the heart
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        heartIcon.style.color = '#ef4444';
        
        // Increase heart count
        heartCount++;
        
        // Add animation
        heartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 200);
        
    } else {
        // Unfill the heart
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        heartIcon.style.color = '';
        
        // Decrease heart count
        heartCount = Math.max(0, heartCount - 1);
    }
    
    // Update display
    updateDisplayCounts();
    
    // Show success feedback
    showSuccessFeedback(heartIcon.closest('.emergency-card'));
}

// Call button functionality
function handleCallClick(number, serviceName) {
    // Check if user has enough coins
    if (coinCount < 20) {
        alert('Insufficient Coins!\n\nYou need at least 20 coins to make a call. Please add more coins to continue.');
        return;
    }
    
    // Deduct coins
    coinCount -= 20;
    updateDisplayCounts();
    
    // Show call alert (native browser style)
    alert(`📞 Calling ${serviceName} at ${number}...`);
    
    // Add to call history
    addToCallHistory(serviceName, number);
    
    // Add visual feedback
    const button = event.target.closest('button');
    showSuccessFeedback(button);
}

// Copy button functionality
function handleCopyClick(number, serviceName) {
    try {
        // Copy to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            // Modern async clipboard API
            navigator.clipboard.writeText(number).then(() => {
                copySuccess(serviceName, number);
            }).catch((error) => {
                console.error('Clipboard error:', error);
                fallbackCopyTextToClipboard(number, serviceName);
            });
        } else {
            // Fallback for older browsers or non-HTTPS
            fallbackCopyTextToClipboard(number, serviceName);
        }
    } catch (error) {
        console.error('Copy error:', error);
        alert(`❌ Copy Failed\n\nUnable to copy to clipboard. Please copy manually: ${number}`);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, serviceName) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            copySuccess(serviceName, text);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Fallback copy error:', err);
        alert(`❌ Copy Failed\n\nUnable to copy to clipboard. Please copy manually: ${text}`);
    }
    
    document.body.removeChild(textArea);
}

// Copy success handler
function copySuccess(serviceName, number) {
    // Increase copy count
    copyCount++;
    updateDisplayCounts();
    
    // Show success alert (native browser style)
    alert(`✅ Copied!\n\n${serviceName} number ${number} has been copied to clipboard.`);
}

// Add to call history
function addToCallHistory(serviceName, number) {
    const timestamp = getCurrentTime();
    
    // Add to history array
    const historyItem = {
        serviceName: serviceName,
        number: number,
        timestamp: timestamp,
        id: Date.now()
    };
    
    callHistory.unshift(historyItem); // Add to beginning of array
    
    // Update history display
    updateCallHistory();
}

// Get current time in readable format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

// Update call history display
function updateCallHistory() {
    const historyContainer = document.getElementById('callHistory');
    const emptyState = document.getElementById('emptyState');
    
    if (!historyContainer) return;
    
    // Clear existing history items (except empty state)
    const existingItems = historyContainer.querySelectorAll('.history-item:not(.sample)');
    existingItems.forEach(item => item.remove());
    
    if (callHistory.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state
    emptyState.style.display = 'none';
    
    // Create history items
    callHistory.forEach(item => {
        const historyElement = createHistoryElement(item);
        historyContainer.appendChild(historyElement);
    });
}

// Create history element
function createHistoryElement(item) {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.style.cssText = `
        padding: 16px; 
        background-color: #f3f4f6; 
        border-radius: 8px;
        margin-bottom: 8px;
        animation: slideIn 0.3s ease-out;
    `;
    
    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
            <h4 style="font-family: 'Hind Madurai', sans-serif; font-weight: 700; font-size: 16px; color: #000000; margin: 0;">${item.serviceName}</h4>
            <span style="font-family: 'Roboto', sans-serif; font-size: 12px; color: #666666;">${item.timestamp}</span>
        </div>
        <p style="font-family: 'Roboto', sans-serif; font-size: 14px; color: #666666; margin: 0;">${item.number}</p>
    `;
    
    return div;
}

// Clear call history
function clearCallHistory() {
    if (callHistory.length === 0) {
        alert('ℹ️ No History\n\nCall history is already empty.');
        return;
    }
    
    // Show confirmation
    if (confirm('Are you sure you want to clear all call history?')) {
        callHistory = [];
        updateCallHistory();
        alert('✅ History Cleared\n\nAll call history has been cleared successfully.');
    }
}


// Show success feedback
function showSuccessFeedback(element) {
    if (!element) return;
    
    element.classList.add('success-flash');
    setTimeout(() => {
        element.classList.remove('success-flash');
    }, 600);
}

// Animation styles for UI feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
