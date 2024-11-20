
// Game state
// Encapsulates games variables into a single gamestate object
// include cache dom elements in gamestate.elements
const gameState = {
    
    money: 100,
    moneyPerPulse: 1,
    pulseSpeed: 1000, // in milliseconds
    jobIncome: 0, // Income generated from active jobs per second
    pulseInterval: null, // Store the interval ID
    
    elements: {
        moneyDisplay: document.getElementById("money"),
        moneyPerPulseDisplay: document.getElementById("money-per-pulse"),
        pulseSpeedDisplay: document.getElementById("pulse-speed")
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
// function earnMoney() {
//     gameState.money += gameState.moneyPerPulse;
//     updateStats();
// }

function earnMoney() {
    gameState.money += gameState.moneyPerPulse + gameState.jobIncome / (1000 / gameState.pulseSpeed);
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

// --------------- Job functions ---------------
// List of jobs
const jobList = [
    "Dev Front-end",
    "Dev Back-end",
    "Dev Full Stack",
    "Dev Mobile",
    "Analyste Sécurité",
    "Data Scientist",
    "Admin Sys",
    "Ingénieur Cloud",
    "Architecte Logiciel",
    "Responsable DevOps",
    "Consultant IT",
    "Testeur QA",
    "Product Owner",
    "Chef de Projet Informatique",
    "Designer UX/UI"
];

// Properties for each job
const jobProperties = {
    "Dev Front-end": { incomePerSecond: 2, bonusPerProject: 8 },
    "Dev Back-end": { incomePerSecond: 2.5, bonusPerProject: 10 },
    "Dev Full Stack": { incomePerSecond: 3, bonusPerProject: 12 },
    "Dev Mobile": { incomePerSecond: 2, bonusPerProject: 9 },
    "Analyste Sécurité": { incomePerSecond: 3.5, bonusPerProject: 15 },
    "Data Scientist": { incomePerSecond: 4, bonusPerProject: 18 },
    "Admin Sys": { incomePerSecond: 2.8, bonusPerProject: 11 },
    "Ingénieur Cloud": { incomePerSecond: 3.2, bonusPerProject: 14 },
    "Architecte Logiciel": { incomePerSecond: 4.5, bonusPerProject: 20 },
    "Responsable DevOps": { incomePerSecond: 3.8, bonusPerProject: 16 },
    "Consultant IT": { incomePerSecond: 3.1, bonusPerProject: 13 },
    "Testeur QA": { incomePerSecond: 2.2, bonusPerProject: 7 },
    "Product Owner": { incomePerSecond: 3.3, bonusPerProject: 14 },
    "Chef de Projet Informatique": { incomePerSecond: 3.7, bonusPerProject: 15 },
    "Designer UX/UI": { incomePerSecond: 2.6, bonusPerProject: 9 },
};


// Game state for jobs
const jobState = {
    availableJobs: [], // Jobs found during the search
    activeJobs: [], // Jobs player has applied to (max 3)
    searchTimeout: null, // Timeout for search duration
    displayTimeout: null, // Timeout for job display duration
};

// Function to search for jobs
function searchForJobs() {
    if (jobState.availableJobs.length > 0) {
        showAlert("A job is already available! Apply or wait for it to disappear.");
        return;
    }

    const failureChance = 0.0; // Modifiable failure chance (30%)
    const searchDuration = 1000; // Search takes 15 seconds (15000 ms)

    //showAlert("Searching for a job...");

    // Show loader
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    // Clear any previous timeouts
    clearTimeout(jobState.searchTimeout);
    clearTimeout(jobState.displayTimeout);

    jobState.searchTimeout = setTimeout(() => {
        
        // Hide loader
        loader.style.display = "none";

        // Determine if jobs are found or not
        if (Math.random() > failureChance) {
            // Randomly pick 1 job from the list
            const shuffledJobs = jobList.sort(() => 0.5 - Math.random());
            jobState.availableJobs = shuffledJobs.slice(0, 1); // Only one job
            displayFoundJob();
        } else {
            //showAlert("No jobs found this time. Try searching again!");
        }
    }, searchDuration);

}
let countdownInterval; // Global variable to store the interval ID

// Function to display the found job// Function to display the found job
function displayFoundJob() {
    const foundJobDiv = document.getElementById("found-job");
    const job = jobState.availableJobs[0]; // Get the found job
    let remainingTime = 10; // Countdown starts at 10 seconds

    // Display the job with the initial time
    foundJobDiv.textContent = `Found Job: ${job} - ${remainingTime}s`;

    // Clear any existing interval to avoid duplicates
    clearInterval(countdownInterval);

    // Create an interval to update the countdown
    countdownInterval = setInterval(() => {
        remainingTime--; // Decrease the time by 1 second
        foundJobDiv.textContent = `Found Job: ${job} - ${remainingTime}s`;

        // If time runs out, clear the interval and remove the job
        if (remainingTime <= 0) {
            clearInterval(countdownInterval); // Stop the countdown
            jobState.availableJobs = [];
            foundJobDiv.textContent = ""; // Clear the displayed job
        }
    }, 1000); // Update every 1 second
}


// Function to apply for a job
function applyForJob() {
    if (jobState.availableJobs.length === 0) {
        showAlert("No jobs are available! Search for a job first.");
        return;
    }

    if (jobState.activeJobs.length >= 3) {
        showAlert("You already have the maximum number of jobs (3).");
        return;
    }

    const job = jobState.availableJobs[0]; // Only one job can be available at a time

    // Check if the job is already active
    if (jobState.activeJobs.includes(job)) {
        showAlert(`You already have : ${job}.<br><br> Remember, DRY (Don't Repeat Yourself)!`);
        return;
    }

    // Add the job to the active jobs list
    jobState.activeJobs.push(job);

    // Add job income to the game state
    const { incomePerSecond } = jobProperties[job];
    gameState.jobIncome += incomePerSecond;

    // Update the job slots
    const jobSlots = document.querySelectorAll(".job-slot");
    for (let i = 0; i < jobSlots.length; i++) {
        if (jobSlots[i].textContent === "") {
            jobSlots[i].textContent = job;
            jobSlots[i].nextElementSibling.style.display = "inline"; // Show remove button
            break;
        }
    }

    // Clear the found job
    jobState.availableJobs = [];
    document.getElementById("found-job").textContent = "";

    // Stop the countdown interval
    clearInterval(countdownInterval);

    //showAlert(`You have successfully applied for: ${job}`);
}

// Function to remove a job
function removeJob(index) {

    const jobSlots = document.querySelectorAll(".job-slot");
    const removeButtons = document.querySelectorAll(".remove-job-btn");

    // Get the job name and remove its income
    const job = jobState.activeJobs[index];
    if (job) {
        gameState.jobIncome -= jobProperties[job].incomePerSecond;
    }

    // Remove the job from active jobs and clear the slot
    jobState.activeJobs.splice(index, 1);
    jobSlots[index].textContent = "";
    removeButtons[index].style.display = "none"; // Hide the remove button
}

// Attach event listeners to buttons
document.getElementById("search-job-btn").addEventListener("click", searchForJobs);
document.getElementById("apply-job-btn").addEventListener("click", applyForJob);

const removeButtons = document.querySelectorAll(".remove-job-btn");
removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => removeJob(index));
});




// --------------- Project functions ---------------
///* eslint-disable-next-line no-unused-vars */
function takeQuickProject() {
    if (gameState.money >= 10) {

        disableButton("quick-project-btn", "quick-project-progress", 7500);
        gameState.money -= 10; // Deduct project cost immediately
        updateStats();

        // Add the reward after 15 seconds
        setTimeout(() => {
            let totalBonus = 0;

            // Calculate bonuses from active jobs
            jobState.activeJobs.forEach((job) => {
                totalBonus += jobProperties[job]?.bonusPerProject || 0;
            });

            const projectReward = 20; // Base reward for the quick project
            gameState.money += projectReward + totalBonus; // Add base reward + bonuses
            updateStats();
            // Show a summary of the reward
            showAlert(`Quick Project completed! Base reward: $${projectReward}. Bonus from jobs: $${totalBonus}. Total: $${projectReward + totalBonus}`);
        }, 7500);

    } else {
        showAlert("Not enough money for this project!");
    }
}

function startProject() {
    if (gameState.money >= 50) {
        disableButton("start-project-btn", "start-project-progress", 15000);
        gameState.money -= 50; // Deduct project cost immediately
        updateStats();

        // Add the reward after 15 seconds
        setTimeout(() => {
            gameState.money += 100; // Project reward
            updateStats();
        }, 15000);
    } else {
        showAlert("Not enough money to start this project!");
    }
}

// --------------- Upgrade functions ---------------
function upgradeComputer() {
    if (gameState.money >= 100) {
        disableButton("start-computer-btn", "start-computer-progress", 120000);
        gameState.money -= 100;
        gameState.moneyPerPulse += 1; // Increase money per pulse
        updateStats();
    } else {
        showAlert("Not enough money to upgrade the computer!");
    }
}

// --------------- Shop functions ---------------
function buyCoffee() {
    if (gameState.money >= 5) {
        disableButton("start-coffee-btn", "start-coffee-progress", 120000);
        gameState.money -= 5;
        gameState.moneyPerPulse *= 1.03; // Increase money rate by 3%
        updateStats();
    } else {
        showAlert("Not enough money to buy coffee!");
    }
}

function buyEnergyDrink() {
    if (gameState.money >= 35) {
        disableButton("start-energy-btn", "start-energy-progress", 600000);
        gameState.money -= 35;
        gameState.pulseSpeed = Math.max(100, gameState.pulseSpeed * 0.95); // Decrease pulse speed by 5%
        updateStats();
        startPulseLoop(); // Restart the pulse loop with the new speed
    } else {
        showAlert("Not enough money to buy an energy drink!");
    }
}

// --------------- Lottery functions ---------------
// Lottery stats to track user engagement
const lotteryStats = {
    ticketsBought: 0,
    moneySpent: 0,
    wins: 0,
    losses: 0,
    totalMoneyWon: 0, // Total money won from lottery
};

function buyLotteryTicket() {
    const ticketPrice = 1; // Cost of one ticket
    const winChance = 0.05; // 5% win chance
    const grandPrize = 100; // Grand prize for a win
    const consolationPrize = 2; // Small reward for losing (optional)

    if (gameState.money >= ticketPrice) {
        // Deduct ticket price and update stats
        gameState.money -= ticketPrice;
        lotteryStats.ticketsBought++;
        lotteryStats.moneySpent += ticketPrice;

        // Determine the result
        if (Math.random() < winChance) {
            // Player wins the lottery
            gameState.money += grandPrize;
            lotteryStats.wins++;
            lotteryStats.totalMoneyWon += grandPrize; // Update total money won
            showAlert(`🎉 Congratulations! You won the lottery! Prize: $${grandPrize}.`);
        } else {
            // Player loses the lottery
            gameState.money += consolationPrize; // Optional small consolation prize
            lotteryStats.losses++;
            //showAlert(`😢 Sorry, you didn't win the lottery this time. Here's a compensation: $${consolationPrize}.`);
        }

        // Update the win percentage display
        updateLotteryStats();
        updateStats(); // Refresh money display
    } else {
        showAlert("Not enough money for a lottery ticket!");
    }
}

// Helper function to update lottery stats on the UI
function updateLotteryStats() {
    const winPercent = lotteryStats.wins > 0
        ? ((lotteryStats.wins / lotteryStats.ticketsBought) * 100).toFixed(2)
        : 0;

    document.getElementById("money-spent").textContent = lotteryStats.moneySpent.toFixed(2);
    document.getElementById("win-percent").textContent = `${winPercent}%`;
    document.getElementById("total-money-won").textContent = lotteryStats.totalMoneyWon.toFixed(2); // Update total money won
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

    progressBar.style.width = "0%";

    const countdown = setInterval(() => {
        progress += step;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(countdown);
            button.disabled = false;
            progressBar.style.width = "0%";
        }
    }, interval);
}

// Alert Modal
// Utility to display the modal
function showAlert(message) {
    const modal = document.getElementById("alert-modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModal = document.getElementById("close-modal");

    // Set the message using innerHTML to allow HTML formatting
    modalMessage.innerHTML = message;

    // Show the modal
    modal.style.display = "flex";

    // Close the modal when the close button is clicked
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal when clicking outside the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}


// Initialize display and game loop
updateStats();
startPulseLoop();
