const API_URL = "/latest/";

// Éléments HTML dans les cartes
const tempEl = document.getElementById('temp');
const humEl  = document.getElementById('hum');
const timeEl = document.getElementById('tempTime');
const humTimeEl = document.getElementById('humTime');
const statusEl = document.getElementById('incident-status');
const alertCounterEl = document.getElementById('alert-counter');

let alertCount = 0;

// Fonction pour récupérer les données depuis l'API et mettre à jour le dashboard
async function updateDashboard() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    // Mise à jour Température & Humidité
    tempEl.textContent = data.temperature + " °C";
    humEl.textContent  = data.humidity + " %";

    // Mise à jour des temps
    if (data.timestamp) {
      const formattedTime = new Date(data.timestamp).toLocaleString();
      timeEl.textContent = formattedTime;
      humTimeEl.textContent = formattedTime;
    }

    // Vérification de la plage de température
    if (data.temperature < 2 || data.temperature > 8) {
      statusEl.textContent = "Incident : température hors plage !";
      alertCount++;
    } else {
      statusEl.textContent = "Aucun incident";
      alertCount = 0;
    }

    // Mise à jour du compteur et affichage des opérateurs
    alertCounterEl.textContent = "Compteur : " + alertCount;
    document.getElementById("op1").style.display = alertCount > 0 ? "block" : "none";
    document.getElementById("op2").style.display = alertCount > 3 ? "block" : "none";
    document.getElementById("op3").style.display = alertCount > 6 ? "block" : "none";

  } catch (e) {
    statusEl.textContent = "Erreur: " + e.message;
    console.error(e);
  }
}

// Rafraîchissement manuel (si bouton ajouté plus tard)
const refreshBtn = document.getElementById('refresh');
if (refreshBtn) {
  refreshBtn.addEventListener('click', updateDashboard);
}

// Lancer la première récupération et répéter toutes les 8 secondes
updateDashboard();
setInterval(updateDashboard, 8000);
