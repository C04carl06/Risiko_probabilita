const attInput = document.getElementById('attack-armies');
const defInput = document.getElementById('defense-armies');
const loadingDiv = document.getElementById('loading');
const resultsBox = document.getElementById('results');

const attWinEl = document.getElementById('att-win');
const attLostEl = document.getElementById('att-lost');
const defWinEl = document.getElementById('def-win');
const defLostEl = document.getElementById('def-lost');

let dbLines = [];

// Funzione per caricare e processare il file di testo
async function loadDatabase() {
    try {
        const response = await fetch('Risiko_probabilità.txt');
        if (!response.ok) throw new Error("Impossibile caricare il file dei dati.");
        
        const text = await response.text();
        // Dividiamo per riga gestendo sia i fine riga Windows (\r\n) che Unix (\n)
        dbLines = text.split(/\r?\n/);
        
        loadingDiv.classList.add('hidden');
        resultsBox.classList.remove('hidden');
        
        // Calcola i risultati iniziali
        updateResults();
    } catch (error) {
        loadingDiv.innerText = "Errore nel caricamento dei dati. Verifica che il file .txt sia presente.";
        console.error(error);
    }
}

// Funzione principale di calcolo basata sulla struttura dei blocchi
function updateResults() {
    if (dbLines.length === 0) return;

    let att = parseInt(attInput.value);
    let def = parseInt(defInput.value);

    // Validazione input per evitare sforamenti (1-50)
    if (isNaN(att) || att < 1) att = 1;
    if (att > 50) att = 50;
    if (isNaN(def) || def < 1) def = 1;
    if (def > 50) def = 50;

    // Logica dell'indice del blocco:
    // Ogni blocco occupa esattamente 5 righe.
    // L'attacco varia ogni 50 blocchi, la difesa varia di blocco in blocco.
    const blockIndex = ((att - 1) * 50) + (def - 1);
    const startLine = blockIndex * 5;

    if (startLine + 3 < dbLines.length) {
        // Estrazione dati dal blocco specifico
        const attWin = dbLines[startLine].trim();
        const defWin = dbLines[startLine + 1].trim();
        const attLost = dbLines[startLine + 2].trim();
        const defLost = dbLines[startLine + 3].trim();

        // Aggiornamento della pagina HTML
        attWinEl.innerText = attWin;
        defWinEl.innerText = defWin;
        attLostEl.innerText = attLost;
        defLostEl.innerText = defLost;
    } else {
        console.error("Indice fuori tracciato. Verifica la consistenza del file .txt");
    }
}

// Ascolta i cambiamenti negli input per aggiornare i dati in tempo reale
attInput.addEventListener('input', updateResults);
defInput.addEventListener('input', updateResults);

// Avvia il caricamento del file all'apertura della pagina
window.addEventListener('DOMContentLoaded', loadDatabase);