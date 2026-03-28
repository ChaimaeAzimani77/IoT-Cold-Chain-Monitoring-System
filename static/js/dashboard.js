async function loadLatest() {
    try {
        const res = await fetch("/latest/");
        const data = await res.json();

        // Affichage des valeurs
        document.getElementById("temp").textContent = data.temperature + " °C";
        document.getElementById("hum").textContent = data.humidity + " %";

        // Time format
        const date = new Date(data.timestamp);
        const diffSec = Math.round((Date.now() - date) / 1000);

        document.getElementById("tempTime").textContent =
            "il y a : " + diffSec + " sec (" + date.toLocaleTimeString() + ")";

        document.getElementById("humTime").textContent =
            "il y a : " + diffSec + " sec (" + date.toLocaleTimeString() + ")";

    } catch (e) {
        console.log("Erreur API :", e);
    }
}

loadLatest();
setInterval(loadLatest, 5000);