// Botão Jogar
function menuInicial() {
    document.getElementById("btn-jogar").addEventListener("click", function () {
        window.location.href = "fases.html"; 
    });

    // Botão Configurações
    document.getElementById("btn-config").addEventListener("click", function () {
        window.location.href = "config.html";
    });

    // Botão Como Jogar
    document.getElementById("btn-como").addEventListener("click", function () {
        window.location.href = "como-jogar.html";
    });

    // Botão Codes
    document.getElementById("btn-codes").addEventListener("click", function () {
        window.location.href = "codes.html";
    });
}

// Executa o menu ao carregar a página
menuInicial();