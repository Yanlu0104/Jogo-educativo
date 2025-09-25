const itens = document.querySelectorAll('.results p span'); // corrigido
const dropzone = document.getElementById('res');
const dropzoneContainer = document.querySelector('.res-container');

// Quando começa a arrastar
function onDragStart(e) {
  setTimeout(() => {
    e.target.classList.add('move');
  }, 0);

  // guarda o valor arrastado
  e.dataTransfer.setData("text/plain", e.target.textContent);
}

// Quando entra na área
function onDragEnter(e) {
  e.preventDefault();
  dropzone.classList.add('enter');
}

// Quando sai da área
function onDragLeave() {
  dropzone.classList.remove('enter');
}

// Necessário para permitir drop
function onDragOver(e) {
  e.preventDefault();
}

// Quando solta dentro da área
function onDrop(e) {
  e.preventDefault();
  dropzone.classList.remove('enter');
  dropzone.classList.add('dropped');

  const value = e.dataTransfer.getData("text/plain");
  dropzone.textContent = value;

  if (2 + 2 === parseInt(value)) {
    dropzoneContainer.classList.remove('error');
    dropzoneContainer.classList.add('correct');
  } else {
    dropzoneContainer.classList.remove('correct');
    dropzoneContainer.classList.add('error');
  }
}

// Associa eventos
dropzone.addEventListener('dragenter', onDragEnter);
dropzone.addEventListener('dragleave', onDragLeave);
dropzone.addEventListener('dragover', onDragOver);
dropzone.addEventListener('drop', onDrop);

itens.forEach(item => {
  item.addEventListener('dragstart', onDragStart);
  item.addEventListener('dragend', () => item.classList.remove('move'));
});

// Botão de reset
document.querySelector('button').addEventListener('click', () => {
  dropzone.textContent = "";
  dropzoneContainer.classList.remove('correct', 'error', 'dropped');
});
