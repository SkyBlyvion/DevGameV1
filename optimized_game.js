
// Game state
// Encapsulates games variables into a single gamestate object
// include cache dom elements in gamestate.elements
const gameState = {
    
    money: 100,
    moneyPerPulse: 1,
    pulseSpeed: 1000, // in milliseconds
    pulseInterval: null, // Store the interval ID
    
    elements: {
        moneyDisplay: document.getElementById('money'),
        moneyPerPulseDisplay: document.getElementById('money-per-pulse'),
        pulseSpeedDisplay: document.getElementById('pulse-speed')
    }
};

// --------------- Stats functions ---------------

// Update the display
// Centralized updates to stats
// Reduces the number of DOM updates by grouping them into a single function.
function updateStats() {
    const { money, moneyPerPulse, pulseSpeed, elements } = gameState;
    elements.moneyDisplay.textContent = money.toFixed(2); // Format money with 2 decimal places
    elements.moneyPerPulseDisplay.textContent = moneyPerPulse.toFixed(2); // Format money per pulse
    elements.pulseSpeedDisplay.textContent = `${pulseSpeed} ms`; // Pulse speed remains as is
}

// Earn money on pulse
function earnMoney() {
    gameState.money += gameState.moneyPerPulse;
    updateStats();
}

// Start or restart the pulse loop
function startPulseLoop() {
    const { pulseSpeed } = gameState;
    // Clear the existing interval
    if (gameState.pulseInterval !== null) {
        clearInterval(gameState.pulseInterval); // Avoid dangling references
    }
    // Start a new interval with the updated pulseSpeed
    gameState.pulseInterval = setInterval(earnMoney, pulseSpeed);
}

// --------------- Project functions ---------------
///* eslint-disable-next-line no-unused-vars */
function takeQuickProject() {
    if (gameState.money >= 10) {
        disableButton('quick-project-btn', 'quick-project-progress', 7500);
        gameState.money -= 10; // Deduct project cost immediately
        updateStats();

        // Add the reward after 15 seconds
        setTimeout(() => {
            gameState.money += 20; // Quick project reward
            updateStats();
        }, 7500);
    } else {
        alert("Not enough money for this project!");
    }
}

function startProject() {
    if (gameState.money >= 50) {
        disableButton('start-project-btn', 'start-project-progress', 15000);
        gameState.money -= 50; // Deduct project cost immediately
        updateStats();

        // Add the reward after 15 seconds
        setTimeout(() => {
            gameState.money += 100; // Project reward
            updateStats();
        }, 15000);
    } else {
        alert("Not enough money to start this project!");
    }
}

// --------------- Upgrade functions ---------------
function upgradeComputer() {
    if (gameState.money >= 100) {
        disableButton('start-computer-btn', 'start-computer-progress', 120000);
        gameState.money -= 100;
        gameState.moneyPerPulse += 1; // Increase money per pulse
        updateStats();
    } else {
        alert("Not enough money to upgrade the computer!");
    }
}

// --------------- Shop functions ---------------
function buyCoffee() {
    if (gameState.money >= 5) {
        disableButton('start-coffee-btn', 'start-coffee-progress', 120000);
        gameState.money -= 5;
        gameState.moneyPerPulse *= 1.03; // Increase money rate by 3%
        updateStats();
    } else {
        alert("Not enough money to buy coffee!");
    }
}

function buyEnergyDrink() {
    if (gameState.money >= 35) {
        disableButton('start-energy-btn', 'start-energy-progress', 600000);
        gameState.money -= 35;
        gameState.pulseSpeed = Math.max(100, gameState.pulseSpeed * 0.95); // Decrease pulse speed by 5%
        updateStats();
        startPulseLoop(); // Restart the pulse loop with the new speed
    } else {
        alert("Not enough money to buy an energy drink!");
    }
}

// --------------- Lottery functions ---------------
function buyLotteryTicket() {
    if (gameState.money >= 1) {
        gameState.money -= 1;
        if (Math.random() < 0.05) { // 5% win chance
            const prize = 100;
            gameState.money += prize;
            alert("You won the lottery! Prize: $" + prize);
        } else {
            alert("You didn't win the lottery this time.");
        }
        updateStats();
    } else {
        alert("Not enough money for a lottery ticket!");
    }
}

// --------------- Utility functions ---------------
// Disable button with a timer
function disableButton(buttonId, progressBarId, duration) {
    const button = document.getElementById(buttonId);
    const progressBar = document.getElementById(progressBarId);

    button.disabled = true;
    let progress = 0;
    const interval = 100; // Update every 100ms
    const step = 100 / (duration / interval);

    progressBar.style.width = '0%';

    const countdown = setInterval(() => {
        progress += step;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(countdown);
            button.disabled = false;
            progressBar.style.width = '0%';
        }
    }, interval);
}

// Initialize display and game loop
updateStats();
startPulseLoop();
