const setupDatabase = {
    "understeer high speed entry": {
        adjustments: [
            "Front ARB: -2 clicks (D5 → D3)",
            "Front Ride Height: -2mm",
            "Brake Bias: 52.5% → 53.5% (+1%)"
        ],
        pros: [
            "Betere front grip bij insturen",
            "Minder onderstuur in snelle bochten",
            "Consistenter stuurgevoel"
        ],
        cons: [
            "Risico op overstuur bij uitkomen bocht",
            "Minder stabiliteit in combinatiebochten"
        ]
    },
    "oversteer low speed exit": {
        adjustments: [
            "Rear ARB: +1 click",
            "Diff Preload: +5Nm",
            "Rear Toe: +0.1°"
        ],
        pros: [
            "Meer rear stabiliteit",
            "Betere tractie bij acceleratie",
            "Voorspelbaarder gedrag"
        ],
        cons: [
            "Minder rotatievermogen",
            "Langzame reactie op stuurinput"
        ]
    }
};

function processCommand(command = null) {
    const userInput = command || document.getElementById('userInput').value.toLowerCase();
    const responseContainer = document.getElementById('responseContainer');
    
    if (!userInput) return;

    const response = setupDatabase[userInput] || {
        error: "Commando niet herkend. Probeer: 'understeer high speed entry', 'oversteer low speed exit', of 'car bounces on kerbs'"
    };

    let html = '';
    if (response.error) {
        html = `<div class="error">${response.error}</div>`;
    } else {
        html = `
            <div class="response">
                <h3>🔧 Setup Advies voor ${userInput}:</h3>
                <div class="adjustments">
                    ${response.adjustments.map(a => `<p>• ${a}</p>`).join('')}
                </div>
                <div class="pros-cons">
                    <div class="pros">
                        <h4>✅ Voordelen:</h4>
                        ${response.pros.map(p => `<p>• ${p}</p>`).join('')}
                    </div>
                    <div class="cons">
                        <h4>❌ Nadelen:</h4>
                        ${response.cons.map(c => `<p>• ${c}</p>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    responseContainer.innerHTML = html;
}

// Event listeners voor quick commands
document.querySelectorAll('.command-btn').forEach(button => {
    button.addEventListener('click', () => {
        const command = button.dataset.command;
        processCommand(command);
    });
});
