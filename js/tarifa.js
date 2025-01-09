import { database, ref, set, onValue } from "./firebase.js";

let tarifa = 10.00;

function carregarTarifa() {
    const tarifaRef = ref(database, "tarifa");
    onValue(tarifaRef, (snapshot) => {
        if (snapshot.exists()) {
            tarifa = snapshot.val(); // Atualiza o valor da tarifa
            document.getElementById("tarifaAtual").textContent = tarifa.toFixed(2);
        }
    });
}

// Salvar a tarifa no Firebase
function salvarTarifa(novaTarifa) {
    const tarifaRef = ref(database, "tarifa");
    set(tarifaRef, novaTarifa)
        .then(() => console.log("Tarifa salva no Firebase:", novaTarifa))
        .catch((error) => console.error("Erro ao salvar tarifa:", error));
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarTarifa();

    document.getElementById("alterarTarifa").addEventListener("submit", (e) => {
        e.preventDefault();
        const novaTarifa = parseFloat(document.getElementById("novaTarifa").value);
        if (novaTarifa >= 0) {
            tarifa = novaTarifa;
            document.getElementById("tarifaAtual").textContent = tarifa.toFixed(2);
            salvarTarifa(novaTarifa);
            alert("Tarifa atualizada com sucesso!");
        } else {
            alert("Valor inválido.");
        }
    });
});

