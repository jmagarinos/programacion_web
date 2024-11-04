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
