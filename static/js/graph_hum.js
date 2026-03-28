let humChart;

async function loadHumHistory() {
    const res = await fetch("/api/");
    const json = await res.json();

    const labels = json.data.map(row => new Date(row.dt).toLocaleTimeString());
    const hums = json.data.map(row => row.hum);

    humChart = new Chart(document.getElementById("humChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Humidité (%)",
                data: hums,
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }]
        }
    });
}

// Recherche par date
async function searchHumByDate() {
    const date = document.getElementById("dateSearch").value;
    if (!date) {
        alert("Veuillez choisir une date");
        return;
    }

    const res = await fetch(`/api/by-date/?date=${date}`);
    const data = await res.json();

    humChart.data.labels = data.labels;
    humChart.data.datasets[0].data = data.humidity;
    humChart.update();
}

loadHumHistory();
