import { database, ref, onValue } from "./firebase.js";

const ticketsHistorico = [];


function carregarTicketsDoFirebase() {
    const ticketsRef = ref(database, "ticketsHistorico");
    onValue(ticketsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            ticketsHistorico.length = 0; 
            Object.values(data).forEach(ticket => ticketsHistorico.push(ticket));
            atualizarListaHistorico(); 
        } else {
            console.log("Nenhum ticket encontrado no Firebase.");
        }
    });
}


function atualizarListaHistorico() {
    const lista = document.getElementById("historicoTickets");
    lista.innerHTML = ""; 

    ticketsHistorico.forEach(ticket => {
        const item = document.createElement("li");
        item.textContent = `Placa: ${ticket.placa}, Entrada: ${new Date(ticket.dataEntrada).toLocaleString("pt-BR")}, Saída: ${new Date(ticket.dataSaida).toLocaleString("pt-BR")}, Valor Pago: R$ ${ticket.valorPago}`;
        lista.appendChild(item);
    });
}


document.getElementById("gerarRelatorio").addEventListener("click", () => {
    if (ticketsHistorico.length === 0) {
        alert("Nenhum ticket registrado no histórico.");
        return;
    }

    const dataAtual = new Date();
    const relatorio = {
        data: dataAtual.toLocaleString("pt-BR"),
        totalTickets: ticketsHistorico.length,
        valorTotal: ticketsHistorico.reduce((soma, t) => soma + t.valorPago, 0).toFixed(2),
        tickets: ticketsHistorico.map(ticket => ({
            placa: ticket.placa,
            entrada: new Date(ticket.dataEntrada).toLocaleString("pt-BR"),
            saida: new Date(ticket.dataSaida).toLocaleString("pt-BR"),
            valorPago: ticket.valorPago.toFixed(2),
        })),
    };

    const jsonData = JSON.stringify(relatorio, null, 2);
    baixarArquivo(jsonData, "relatorio.json", "application/json");
});


function baixarArquivo(conteudo, nomeArquivo, tipo) {
    const blob = new Blob([conteudo], { type: tipo });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
}


carregarTicketsDoFirebase();
