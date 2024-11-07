// Game variables
let money = 100;
let moneyPerPulse = 1;
let pulseSpeed = 1000; // in milliseconds

// Update the display
function updateStats() {
    document.getElementById('money').textContent = money;
    document.getElementById('money-per-pulse').textContent = moneyPerPulse;
    document.getElementById('pulse-speed').textContent = `${pulseSpeed} ms`;
}

// Earn money on pulse
function earnMoney() {
    money += moneyPerPulse;
    updateStats();
}

// Pulse loop
setInterval(earnMoney, pulseSpeed);

// Project functions
function takeQuickProject() {
    if (money >= 10) {
        money += 20; // Quick project reward
        updateStats();
    } else {
        alert("Not enough money for this project!");
    }
}

function startProject() {
    if (money >= 50) {
        money += 100; // Project reward
        updateStats();
    } else {
        alert("Not enough money to start this project!");
    }
}

// Upgrade functions
function upgradeComputer() {
    if (money >= 100) {
        money -= 100;
        moneyPerPulse += 1; // Increase money per pulse
        updateStats();
    } else {
        alert("Not enough money to upgrade the computer!");
    }
}

// Shop functions
function buyCoffee() {
    if (money >= 5) {
        money -= 5;
        moneyPerPulse *= 1.03; // Increase money rate by 3%
        updateStats();
    } else {
        alert("Not enough money to buy coffee!");
    }
}

function buyEnergyDrink() {
    if (money >= 15) {
        money -= 15;
        pulseSpeed = Math.max(100, pulseSpeed * 0.9); // Increase pulse speed
        updateStats();
    } else {
        alert("Not enough money to buy an energy drink!");
    }
}

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

// Initialize display
updateStats();
