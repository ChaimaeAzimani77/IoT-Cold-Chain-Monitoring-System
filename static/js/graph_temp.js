// =========================
// FICHIER : graph_temp.js
// =========================

// -------------------------
// 1️⃣ Déclaration des variables globales
// -------------------------
let tempChart;        // Graphe Chart.js
let allTempData = []; // Toutes les données pour le filtrage par période

// -------------------------
// 2️⃣ Charger l'historique complet depuis l'API
// -------------------------
async function loadTempHistory() {
    try {
        const res = await fetch("/api/");
        const json = await res.json();

        // 🔹 Stocker toutes les données pour filtrage
        allTempData = json.data.map(row => ({
            ...row,
            dtObj: new Date(row.dt) // convertir dt en objet Date pour JS
        }));

        // 🔹 Trier par date
        allTempData.sort((a, b) => a.dtObj - b.dtObj);

        // 🔹 Préparer les labels et valeurs pour le graphe
        const labels = allTempData.map(row => row.dtObj.toLocaleTimeString());
        const temps = allTempData.map(row => row.temp);

        // 🔹 Créer le graphe Chart.js
        tempChart = new Chart(document.getElementById("tempChart"), {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Température (°C)",
                    data: temps,
                    borderColor: "#ff6b35",
                    backgroundColor: "rgba(255,107,53,0.2)",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: "#ff3d00",
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
                scales: {
                    x: {
                        ticks: { color: "#bf360c", font: {weight:'500'} },
                        grid: { color: "#ffe0cc" }
                    },
                    y: {
                        ticks: { color: "#bf360c", font: {weight:'500'} },
                        grid: { color: "#ffe0cc" }
                    }
                }
            }
        });

        // 🔹 Mettre à jour la carte de statut avec toutes les données
        updateTempStatus(temps);

    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
}

// -------------------------
// 3️⃣ Recherche par date spécifique
// -------------------------
async function searchTempByDate() {
    const date = document.getElementById("dateSearch").value;
    if (!date) {
        alert("Veuillez choisir une date");
        return;
    }

    try {
        const res = await fetch(`/api/by-date/?date=${date}`);
        const data = await res.json();

        // 🔹 Mettre à jour le graphe
        tempChart.data.labels = data.labels;
        tempChart.data.datasets[0].data = data.temperature;
        tempChart.update();

        // 🔹 Mettre à jour la carte de statut
        updateTempStatus(data.temperature);

    } catch (error) {
        console.error("Erreur lors de la recherche par date :", error);
    }
}

// -------------------------
// 4️⃣ Filtrage par période : Jour / Semaine / Mois / Année
// -------------------------
function filterTemp(period) {
    if (!allTempData || allTempData.length === 0) {
        alert("Les données ne sont pas encore chargées");
        return;
    }

    const now = new Date();
    let filtered = [];

    // --- Jour ---
    if (period === "day") {
        filtered = allTempData.filter(row =>
            row.dtObj.toDateString() === now.toDateString()
        );
    }

    // --- Semaine (7 derniers jours) ---
    if (period === "week") {
        const weekAgo = new Date(now.getTime() - 7*24*60*60*1000);
        filtered = allTempData.filter(row =>
            row.dtObj >= weekAgo
        );
    }

    // --- Mois (mois courant) ---
    if (period === "month") {
        filtered = allTempData.filter(row =>
            row.dtObj.getMonth() === now.getMonth() &&
            row.dtObj.getFullYear() === now.getFullYear()
        );
    }

    // --- Année (année en cours) ---
    if (period === "year") {
        filtered = allTempData.filter(row =>
            row.dtObj.getFullYear() === now.getFullYear()
        );
    }

    if (!filtered || filtered.length === 0) {
        alert("Aucune donnée trouvée pour cette période");
        return;
    }

    // 🔹 Mettre à jour le graphe
    const labels = filtered.map(row => row.dtObj.toLocaleTimeString());
    const temps = filtered.map(row => row.temp);
    tempChart.data.labels = labels;
    tempChart.data.datasets[0].data = temps;
    tempChart.update();

    // 🔹 Mettre à jour la carte de statut
    updateTempStatus(temps);
}

// -------------------------
// 5️⃣ Mise à jour de la carte "Conditions normales / anormales"
// -------------------------
function updateTempStatus(values) {
    if (!values || values.length === 0) return;

    const maxTemp = Math.max(...values);
    const minTemp = Math.min(...values);

    const card = document.getElementById("tempStatusCard");
    const text = document.getElementById("tempStatusText");

    if (maxTemp > 30 || minTemp < 18) {
        card.className = "status-card anormal";
        text.innerText = `⚠️ Température anormale (Min: ${minTemp}°C | Max: ${maxTemp}°C)`;
    } else {
        card.className = "status-card normal";
        text.innerText = `✅ Conditions normales (Min: ${minTemp}°C | Max: ${maxTemp}°C)`;
    }
}

// -------------------------
// 6️⃣ Initialisation : charger les données et attacher les événements aux boutons
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadTempHistory();

    document.getElementById("searchBtn").addEventListener("click", searchTempByDate);
    document.getElementById("btnDay").addEventListener("click", () => filterTemp('day'));
    document.getElementById("btnWeek").addEventListener("click", () => filterTemp('week'));
    document.getElementById("btnMonth").addEventListener("click", () => filterTemp('month'));
    document.getElementById("btnYear").addEventListener("click", () => filterTemp('year'));
});
data.forEach(d => {
    d.dt = new Date(d.dt); // transforme la string ISO en Date
});