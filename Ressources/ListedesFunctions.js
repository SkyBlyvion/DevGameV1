// ---------- Liste des Fonctions ----------

const gameState = {}


// Stats

function updateStats() {}

function earnMoney() {}

function startPulseLoop() {}


// Jobs 

const jobList = [ ]

const jobProperties = { }

const jobState = { }

function searchForJobs() {}

function applyForJob() {}

function removeJob() {}


// Projects

function takeQuickProject() {}

function startProject() {}

function recalculateProjectBonus() {}


// Upgrade Functions

function upgradeComputer() {}


// Shop Functions

function buyCoffee() {}

function buyEnergyDrink() {}


// Lottery Functions
const lotteryStats = { }

function buyLotteryTicket() {}

function updateLotteryStats() {}


// Utility Functions

function disableButton() {}

function showAlert() {}


// Menu Functions

function saveGame() {}

function loadGame() {}

function importGame(event) {}

function exportGame() {}

// Game Initialization 

// Load the game on page load
loadGame();

// Initialize display and game loop
updateStats();
startPulseLoop();

// Autosave every 30 seconds
setInterval(() => {
    saveGame();
}, 30000); 