// Game variables
let money = 100;
let moneyPerPulse = 1;
let pulseSpeed = 1000; // in milliseconds
let pulseInterval = null; // Store the interval ID

// --------------- Stats functions ---------------

// Update the display
function updateStats() {
    document.getElementById('money').textContent = money.toFixed(2); // Format money with 2 decimal places
    document.getElementById('money-per-pulse').textContent = moneyPerPulse.toFixed(2); // Format money per pulse
    document.getElementById('pulse-speed').textContent = `${pulseSpeed} ms`; // Pulse speed remains as is
}
// Earn money on pulse
function earnMoney() {
    money += moneyPerPulse;
    updateStats();
}

// Pulse loop
setInterval(earnMoney, pulseSpeed);

// --------------- Project functions ---------------
function takeQuickProject() {
    if (money >= 10) {
        disableButton('quick-project-btn', 'quick-project-timer', 'quick-project-progress', 7500);
        money -= 10; // Déduire le coût du projet immédiatement
        updateStats();

        // Ajouter la récompense après 15 secondes
        setTimeout(() => {
            money += 20; // Quick project reward
            updateStats();
            //alert("Quick project completed! You've earned $20.");
        }, 15000);
    } else {
        alert("Not enough money for this project!");
    }
}

function startProject() {
    if (money >= 50) {
        disableButton('start-project-btn', 'start-project-timer', 'start-project-progress', 15000);
        money -= 50; // Déduire le coût du projet immédiatement
        updateStats();

        // Ajouter la récompense après 15 secondes
        setTimeout(() => {
            money += 100; // Project reward
            updateStats();
            //alert("Project completed! You've earned $100.");
        }, 15000);
    } else {
        alert("Not enough money to start this project!");
    }
}


// --------------- Upgrade functions ---------------
function upgradeComputer() {
    if (money >= 100) {
        money -= 100;
        moneyPerPulse += 1; // Increase money per pulse
        updateStats();
    } else {
        alert("Not enough money to upgrade the computer!");
    }
}

// --------------- Shop functions ---------------
function buyCoffee() {
    if (money >= 5) {
        disableButton('start-coffee-btn', 'coffee-timer', 'start-shop-progress', 120000);
        money -= 5;
        moneyPerPulse *= 1.03; // Increase money rate by 3%
        updateStats();
    } else {
        alert("Not enough money to buy coffee!");
    }
}

function buyEnergyDrink() {
    if (money >= 35) {
        disableButton('start-energy-btn', 'energy-timer', 'start-SEnergy-progress', 600000);
        money -= 35;
        pulseSpeed = Math.max(100, pulseSpeed * 0.9); // Decrease pulse speed by 10% (starting from 1000ms and going down to 100ms)
        updateStats();
        startPulseLoop(); // Restart the pulse loop with the new speed
    } else {
        alert("Not enough money to buy an energy drink!");
    }
}

// --------------- Lottery functions ---------------
// Lottery function (just an example, winning chance can be improved)
function buyLotteryTicket() {
    if (money >= 1) {
        money -= 1;
        if (Math.random() < 0.05) { // 5% win chance
            let prize = 100;
            money += prize;
            alert("You won the lottery! Prize: $" + prize);
        } else {
            alert("You didn't win the lottery this time.");
        }
        updateStats();
    } else {
        alert("Not enough money for a lottery ticket!");
    }
}

// --------------- functions ---------------
// Disable button with a timer
function disableButton(buttonId, timerId, progressBarId, duration) {
    
    const button = document.getElementById(buttonId);
    //const timerDiv = document.getElementById(timerId);
    const progressBar = document.getElementById(progressBarId);
    
    // Affiche le timer
    //timerDiv.style.display = 'block';
    button.disabled = true;

    let remainingTime = duration;
    let interval = 100; // Update every 100ms
    let step = 100 / (duration / interval); // Step for the progress bar

    let progress = 0;
    progressBar.style.width = '0%';

    const countdown = setInterval(() => {
        remainingTime -= interval;
        progress += step;
        progressBar.style.width = `${progress}%`;

        if (remainingTime <= 0) {
            clearInterval(countdown);
            button.disabled = false;
            progressBar.style.width = '0%';

            // Masque le timer
            //timerDiv.style.display = 'none';
        }
    }, interval);
}

// Start or restart the pulse loop
function startPulseLoop() {
    // Clear the existing interval
    if (pulseInterval !== null) {
        clearInterval(pulseInterval);
    }
    // Start a new interval with the updated pulseSpeed
    pulseInterval = setInterval(earnMoney, pulseSpeed);
}

// Initialize display
updateStats();
startPulseLoop();
