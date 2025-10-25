const itens = document.querySelectorAll('.results p span');
const dropzone = document.getElementById('res');
const dropzoneContainer = document.querySelector('.res-container');
const num1Display = document.querySelector('.operation p:first-child');
const num2Display = document.querySelector('.operation p:nth-child(3)');
const resetButton = document.querySelector('.button'); 

let num1, num2, total;

// --- Função para Gerar Nova Conta ---
function gerarNovaConta() {
    // 1. Limpa a área de drop e feedback
    dropzone.textContent = "";
    dropzoneContainer.classList.remove('correct', 'error', 'dropped');
    
    // 2. Gera a nova conta (Números entre 1 e 9)
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    total = num1 + num2;

    // Atualiza o HTML com os novos números da operação
    num1Display.textContent = num1;
    num2Display.textContent = num2;

    // --- Gera e exibe as Opções de Resposta ---
    const options = [total]; // A primeira opção é a correta

    // Adiciona duas opções erradas (próximas do valor correto)
    while (options.length < 3) {
        let erro = total + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
        
        // Garante que o número não seja negativo e que não seja um duplicado
        if (erro > 0 && !options.includes(erro)) {
            options.push(erro);
        }
    }

    // Embaralha as opções
    options.sort(() => Math.random() - 0.5);

    // Atualiza os elementos arrastáveis no HTML
    itens.forEach((span, index) => {
        span.textContent = options[index];
    });
}

// --- Eventos de Drag & Drop ---

function onDragStart(e) {
    setTimeout(() => {
        e.target.classList.add('move');
    }, 0);
    e.dataTransfer.setData("text/plain", e.target.textContent);
}

function onDragEnter(e) {
    e.preventDefault();
    dropzone.classList.add('enter');
}

function onDragLeave() {
    dropzone.classList.remove('enter');
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('enter');
    dropzoneContainer.classList.add('dropped');

    const value = e.dataTransfer.getData("text/plain");
    dropzone.textContent = value;

    // VERIFICAÇÃO FINAL
    if (total === parseInt(value)) {
        dropzoneContainer.classList.remove('error');
        dropzoneContainer.classList.add('correct');
        // Gera uma nova conta após 1.5 segundos do acerto
        setTimeout(gerarNovaConta, 1500); 
    } else {
        dropzoneContainer.classList.remove('correct');
        dropzoneContainer.classList.add('error');
    }
}

// --- Associa Eventos ---

// Eventos da área de drop
dropzone.addEventListener('dragenter', onDragEnter);
dropzone.addEventListener('dragleave', onDragLeave);
dropzone.addEventListener('dragover', onDragOver);
dropzone.addEventListener('drop', onDrop);

// Eventos dos itens arrastáveis
itens.forEach(item => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragend', () => item.classList.remove('move'));
});

// Botão de reset (chama a função de geração de conta)
resetButton.addEventListener('click', gerarNovaConta);

// --- Início do Jogo (Chama a função apenas uma vez ao carregar) ---
gerarNovaConta();