import { database, ref, push, set, onValue } from "./firebase.js";
let convenios = [];


const ticketsAtivos = [];
const ticketsHistorico = [];

let tarifa = 10.00; 
function carregarTarifa() {
    const tarifaRef = ref(database, "tarifa");
    onValue(tarifaRef, (snapshot) => {
        if (snapshot.exists()) {
            tarifa = snapshot.val(); 
            console.log("Tarifa carregada do Firebase:", tarifa);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTarifa();
});

function carregarConvenios() {
    const conveniosRef = ref(database, "convenios");
    onValue(conveniosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            
            convenios = Object.entries(data).map(([nome, valores]) => ({
                nome,
                desconto: valores.desconto,
            }));
            console.log("Convênios carregados:", convenios);
        }
    });
}



function salvarTicketNoFirebase(ticket) {
    const ticketsRef = ref(database, "ticketsHistorico"); // Caminho no banco
    const novoTicketRef = push(ticketsRef); // Cria um registro único
    set(novoTicketRef, ticket)
        .then(() => console.log("Ticket salvo no Firebase:", ticket))
        .catch((error) => console.error("Erro ao salvar no Firebase:", error));
}

function calcularValor(horas, convenioNome = null) {
    let valorTotal = 0;

    if (horas <= 1) {
        valorTotal = tarifa; 
    } else {
        valorTotal = tarifa + (horas - 1) * (tarifa / 2); 
    }

    
    if (convenioNome) {
        const convenio = convenios.find(c => c.nome.toLowerCase() === convenioNome.toLowerCase());
        if (convenio) {
            valorTotal -= (valorTotal * convenio.desconto) / 100;
        }
    }

    return valorTotal.toFixed(2);
}


carregarConvenios();


document.getElementById("entradaForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const placa = document.getElementById("placaEntrada").value.trim().toUpperCase();
    const entrada = new Date();
    const ticket = { placa, dataEntrada: entrada };

    ticketsAtivos.push(ticket); 
    atualizarListaTickets(); 
    document.getElementById("entradaForm").reset(); 
});


document.getElementById("saidaForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const placa = document.getElementById("placaSaida").value.trim().toUpperCase();
    const convenioNome = document.getElementById("convenioSaida").value.trim();

    const ticketIndex = ticketsAtivos.findIndex(ticket => ticket.placa === placa); 
    if (ticketIndex >= 0) {
        const ticket = ticketsAtivos.splice(ticketIndex, 1)[0]; 
        const dataSaida = new Date();
        const horas = Math.ceil((dataSaida - ticket.dataEntrada) / (1000 * 60 * 60)); 
        const valorPago = calcularValor(horas, convenioNome); 

        
        ticket.dataSaida = dataSaida;
        ticket.valorPago = parseFloat(valorPago);

        
        ticketsHistorico.push(ticket);
        salvarTicketNoFirebase(ticket);

        atualizarListaTickets();
        alert(`Saída registrada.\nPlaca: ${placa}\nHoras: ${horas}\nValor Pago: R$ ${valorPago}`);
    } else {
        alert("Placa não encontrada entre os tickets ativos.");
    }

    document.getElementById("saidaForm").reset(); 
});


function atualizarListaTickets() {
    const lista = document.getElementById("ticketsAtivos");
    lista.innerHTML = ""; 

    ticketsAtivos.forEach(ticket => {
        const item = document.createElement("li");
        item.textContent = `Placa: ${ticket.placa}, Entrada: ${ticket.dataEntrada.toLocaleString("pt-BR")}`;
        lista.appendChild(item);
    });
}


function carregarTicketsDoFirebase() {
    const ticketsRef = ref(database, "ticketsHistorico");
    onValue(ticketsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            ticketsHistorico.length = 0; 
            Object.values(data).forEach(ticket => ticketsHistorico.push(ticket));
            console.log("Histórico carregado do Firebase:", ticketsHistorico);
        }
    });
}


carregarTicketsDoFirebase();
