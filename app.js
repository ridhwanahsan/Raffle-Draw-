// script.js

let participants = JSON.parse(localStorage.getItem('participants')) || [];

function saveParticipants() {
    localStorage.setItem('participants', JSON.stringify(participants));
}

function addParticipant() {
    const nameInput = document.getElementById('participantName');
    const name = nameInput.value.trim();

    if (name) {
        participants.push(name);
        updateParticipantsList();
        saveParticipants();
        nameInput.value = '';
    } else {
        alert('Please enter a participant name.');
    }
}

function removeParticipant(index) {
    participants.splice(index, 1);
    updateParticipantsList();
    saveParticipants();
}

function updateParticipantsList() {
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = '';

    participants.forEach((participant, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = participant;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeParticipant(index);

        listItem.appendChild(removeButton);
        participantsList.appendChild(listItem);
    });
}

function drawWinner() {
    if (participants.length === 0) {
        alert('No participants to draw from.');
        return;
    }

    const winnerElement = document.getElementById('winnerName');
    let iterationCount = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        winnerElement.textContent = participants[randomIndex];

        if (++iterationCount >= maxIterations) {
            clearInterval(interval);
        }
    }, 100);
}

// Initialize participants list on page load
updateParticipantsList();
