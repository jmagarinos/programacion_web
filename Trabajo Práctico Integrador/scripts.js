// Global variable to track the player currently being edited
let editingPlayerNumber = null;

// Load players from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    loadPlayers();
});

// Toggle add player form visibility
document.getElementById('addPlayerBtn').addEventListener('click', function () {
    clearForm();
    editingPlayerNumber = null; // Clear any editing status
    document.getElementById('addPlayerForm').style.display = 'block';
});

// Handle form submission to add or update player
document.querySelector('#addPlayerForm form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Retrieve input values
    const playerNumber = document.getElementById('playerNumber').value;
    const playerName = document.getElementById('playerName').value;
    const playerNickname = document.getElementById('playerNickname').value;
    const playerPosition = document.getElementById('playerPosition').value;
    const playerAge = document.getElementById('playerAge').value;
    const playerMatches = document.getElementById('playerMatches').value;
    const playerGoals = document.getElementById('playerGoals').value;

    const player = {
        number: playerNumber,
        name: playerName,
        nickname: playerNickname,
        position: playerPosition,
        age: playerAge,
        matches: playerMatches,
        goals: parseInt(playerGoals, 10)
    };

    if (editingPlayerNumber === null) {
        // Add player
        addPlayerToLocalStorage(player);
        addPlayerToTable(player);
    } else {
        // Update player
        updatePlayerInLocalStorage(player);
        updatePlayerInTable(player);
    }

    clearForm();
    document.getElementById('addPlayerForm').style.display = 'none';
    editingPlayerNumber = null; // Reset editing status
});

// Function to add player to the table
function addPlayerToTable(player) {
    const table = document.querySelector('.names');
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = player.number;
    newRow.insertCell(1).textContent = player.name;
    newRow.insertCell(2).textContent = player.nickname;
    newRow.insertCell(3).textContent = player.position;
    newRow.insertCell(4).textContent = player.age;
    newRow.insertCell(5).textContent = player.matches;

    // Goals cell with increment/decrement buttons
    const goalsCell = newRow.insertCell(6);
    const goalsText = document.createElement('span');
    goalsText.textContent = player.goals;
    goalsText.className = 'goals-count';
    goalsCell.appendChild(goalsText);

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.className = 'btn btn-success btn-sm ms-2';
    incrementButton.addEventListener('click', function () {
        updateGoals(player.number, 1);
    });
    goalsCell.appendChild(incrementButton);

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.className = 'btn btn-danger btn-sm ms-2';
    decrementButton.addEventListener('click', function () {
        updateGoals(player.number, -1);
    });
    goalsCell.appendChild(decrementButton);

    // Action buttons
    const actionCell = newRow.insertCell(7);

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'btn btn-warning btn-sm me-2';
    editButton.addEventListener('click', function () {
        loadPlayerIntoForm(player.number);
    });
    actionCell.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.addEventListener('click', function () {
        deletePlayer(player.number);
    });
    actionCell.appendChild(deleteButton);
}

// Function to update goals in the table and localStorage
function updateGoals(playerNumber, increment) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    const player = players.find(p => p.number === playerNumber);

    if (player) {
        // Update goals within valid range
        player.goals = Math.max(0, player.goals + increment);
        localStorage.setItem('players', JSON.stringify(players));

        // Update goals in the table
        const table = document.querySelector('.names');
        for (let i = 1; i < table.rows.length; i++) {
            if (table.rows[i].cells[0].textContent === playerNumber) {
                table.rows[i].cells[6].querySelector('.goals-count').textContent = player.goals;
                break;
            }
        }
    }
}

// Function to load player data into form for editing
function loadPlayerIntoForm(playerNumber) {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const player = players.find(p => p.number === playerNumber);

    if (player) {
        document.getElementById('playerNumber').value = player.number;
        document.getElementById('playerName').value = player.name;
        document.getElementById('playerNickname').value = player.nickname;
        document.getElementById('playerPosition').value = player.position;
        document.getElementById('playerAge').value = player.age;
        document.getElementById('playerMatches').value = player.matches;
        document.getElementById('playerGoals').value = player.goals;

        editingPlayerNumber = playerNumber;
        document.getElementById('addPlayerForm').style.display = 'block';
    }
}

// Function to update player in localStorage
function updatePlayerInLocalStorage(player) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    const index = players.findIndex(p => p.number === editingPlayerNumber);
    if (index !== -1) {
        players[index] = player;
        localStorage.setItem('players', JSON.stringify(players));
    }
}

// Function to update player in the table
function updatePlayerInTable(player) {
    const table = document.querySelector('.names');
    for (let i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].textContent === editingPlayerNumber) {
            table.rows[i].cells[0].textContent = player.number;
            table.rows[i].cells[1].textContent = player.name;
            table.rows[i].cells[2].textContent = player.nickname;
            table.rows[i].cells[3].textContent = player.position;
            table.rows[i].cells[4].textContent = player.age;
            table.rows[i].cells[5].textContent = player.matches;
            table.rows[i].cells[6].querySelector('.goals-count').textContent = player.goals;
            break;
        }
    }
}

// Function to add player to localStorage
function addPlayerToLocalStorage(player) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
}

// Function to load players from localStorage and display them in the table
function loadPlayers() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.forEach(player => {
        addPlayerToTable(player);
    });
}

// Function to delete player from localStorage and table
function deletePlayer(playerNumber) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players = players.filter(player => player.number !== playerNumber);
    localStorage.setItem('players', JSON.stringify(players));

    const table = document.querySelector('.names');
    for (let i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].textContent === playerNumber) {
            table.deleteRow(i);
            break;
        }
    }
}

// Function to clear the form
function clearForm() {
    document.querySelector('#addPlayerForm form').reset();
    editingPlayerNumber = null;
}

const currentYear = new Date().getFullYear();
let displayedYear = new Date().getFullYear(); // Set to current year automatically
let selectedDate = null;

document.addEventListener("DOMContentLoaded", function () {
    renderCalendar(displayedYear);
    loadMatchesFromStorage();

    document.getElementById("prevYear").addEventListener("click", function () {
        if (displayedYear > 2023) {
            displayedYear--;
            renderCalendar(displayedYear);
        }
    });

    document.getElementById("nextYear").addEventListener("click", function () {
        if (displayedYear < 2030) {
            displayedYear++;
            renderCalendar(displayedYear);
        }
    });

    // Handle match form submission
    document.getElementById("addMatchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const opponentTeam = document.getElementById("opponentTeam").value;
        const division = document.getElementById("division").value;
        const team1Score = parseInt(document.getElementById("team1Score").textContent);
        const team2Score = parseInt(document.getElementById("team2Score").textContent);

        if (selectedDate) {
            saveMatchToStorage(selectedDate, { opponentTeam, division, team1Score, team2Score });
            renderCalendar(displayedYear); // Re-render to update highlighted dates
            document.getElementById("matchForm").style.display = "none";
        }
    });

    // Handle form cancellation
    document.getElementById("cancelMatchForm").addEventListener("click", function () {
        document.getElementById("matchForm").style.display = "none";
    });

    // Handle match deletion
    document.getElementById("deleteMatch").addEventListener("click", function () {
        if (selectedDate) {
            deleteMatchFromStorage(selectedDate);
            renderCalendar(displayedYear); // Re-render to update highlighted dates
            document.getElementById("matchForm").style.display = "none";
        }
    });

    // Score adjustment buttons
    document.getElementById("team1Plus").addEventListener("click", () => adjustScore("team1Score", 1));
    document.getElementById("team1Minus").addEventListener("click", () => adjustScore("team1Score", -1));
    document.getElementById("team2Plus").addEventListener("click", () => adjustScore("team2Score", 1));
    document.getElementById("team2Minus").addEventListener("click", () => adjustScore("team2Score", -1));
});

function renderCalendar(year) {
    document.getElementById("yearDisplay").textContent = year;
    const monthsContainer = document.getElementById("monthsContainer");
    monthsContainer.innerHTML = ""; // Clear previous months

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    monthNames.forEach((month, index) => {
        const monthDiv = document.createElement("div");
        monthDiv.className = "month";
        const monthName = document.createElement("div");
        monthName.className = "month-name";
        monthName.textContent = month;

        const daysDiv = document.createElement("div");
        daysDiv.className = "days";

        // Get number of days in the current month
        const daysInMonth = new Date(year, index + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, index, 1).getDay();

        const startOffset = (firstDayOfMonth + 6) % 7; // Adjust to start from Monday
        for (let i = 0; i < startOffset; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "day empty";
            daysDiv.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            dayDiv.textContent = day;

            const formattedDate = `${year}-${String(index + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (checkMatchExists(formattedDate)) {
                dayDiv.classList.add("has-match");
            }

            dayDiv.addEventListener("click", function () {
                openMatchForm(formattedDate);
            });

            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(monthName);
        monthDiv.appendChild(daysDiv);
        monthsContainer.appendChild(monthDiv);
    });
}

function openMatchForm(date) {
    selectedDate = date;
    const matches = JSON.parse(localStorage.getItem("matches")) || {};
    document.getElementById("team1Score").textContent = "0";
    document.getElementById("team2Score").textContent = "0";

    if (matches[date]) {
        document.getElementById("matchDate").value = date;
        document.getElementById("opponentTeam").value = matches[date].opponentTeam;
        document.getElementById("division").value = matches[date].division;
        document.getElementById("team1Score").textContent = matches[date].team1Score || "0";
        document.getElementById("team2Score").textContent = matches[date].team2Score || "0";
        document.getElementById("team2Name").textContent = matches[date].opponentTeam;
    } else {
        document.getElementById("matchDate").value = date;
        document.getElementById("opponentTeam").value = "";
        document.getElementById("division").value = "A";
        document.getElementById("team2Name").textContent = "NombreEquipoRival";
    }

    document.getElementById("matchForm").style.display = "block";
}

function adjustScore(teamId, delta) {
    const scoreElement = document.getElementById(teamId);
    let currentScore = parseInt(scoreElement.textContent) || 0; // Ensure it starts at 0 if NaN
    currentScore = Math.max(0, currentScore + delta);
    scoreElement.textContent = currentScore;
}

function saveMatchToStorage(date, matchData) {
    const matches = JSON.parse(localStorage.getItem("matches")) || {};
    matches[date] = matchData;
    localStorage.setItem("matches", JSON.stringify(matches));
}

function deleteMatchFromStorage(date) {
    const matches = JSON.parse(localStorage.getItem("matches")) || {};
    if (matches[date]) {
        delete matches[date];
        localStorage.setItem("matches", JSON.stringify(matches));
    }
}

function checkMatchExists(date) {
    const matches = JSON.parse(localStorage.getItem("matches")) || {};
    return matches.hasOwnProperty(date);
}

function loadMatchesFromStorage() {
    const matches = JSON.parse(localStorage.getItem("matches")) || {};
    Object.keys(matches).forEach(date => {
        if (new Date(date).getFullYear() === displayedYear) {
            const [year, month, day] = date.split('-');
            const formattedDay = String(parseInt(day)); // Remove leading zero for comparison

            document.querySelectorAll(`.month:nth-child(${parseInt(month)}) .day`).forEach(dayDiv => {
                if (dayDiv.textContent === formattedDay) {
                    dayDiv.classList.add("has-match");
                }
            });
        }
    });
}

