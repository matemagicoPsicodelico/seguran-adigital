// Seleciona o elemento que exibe o número de caracteres da senha
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Define o tamanho inicial da senha como 12
let tamanhoSenha = 12;

// Atualiza o conteúdo do elemento HTML com o valor inicial do tamanho
numeroSenha.textContent = tamanhoSenha;

// Define os caracteres disponíveis para cada tipo de componente da senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona todos os botões "+" e "-" que aumentam ou diminuem o tamanho da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Seleciona o campo onde a senha será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todas as checkboxes que permitem incluir/excluir tipos de caracteres na senha
const checkbox = document.querySelectorAll('.checkbox');

// Seleciona o elemento visual que indica a força da senha
const forcaSenha = document.querySelector('.forca');

// Associa a função `diminuiTamanho` ao botão de diminuir (índice 0)
botoes[0].onclick = diminuiTamanho;

// Associa a função `aumentaTamanho` ao botão de aumentar (índice 1)
botoes[1].onclick = aumentaTamanho;

// Função que diminui o tamanho da senha, com valor mínimo de 1 caractere
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--; // Decrementa o tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza o valor exibido
    geraSenha(); // Gera uma nova senha com o novo tamanho
}

// Função que aumenta o tamanho da senha, com limite máximo de 20 caracteres
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++; // Incrementa o tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza o valor exibido
    geraSenha(); // Gera uma nova senha com o novo tamanho
}

// Para cada checkbox, associa a função `geraSenha` para ser chamada ao clicar
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera uma senha ao carregar a página
geraSenha();

// Função principal que gera a senha com base nas opções escolhidas
function geraSenha() {
    let alfabeto = ''; // Inicializa a string de caracteres permitidos

    // Verifica cada checkbox e adiciona os caracteres correspondentes ao alfabeto
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    let senha = ''; // Variável para armazenar a senha gerada

    // Gera a senha caractere por caractere, sorteando aleatoriamente do alfabeto
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio); // Arredonda para inteiro
        senha += alfabeto[numeroAleatorio]; // Adiciona o caractere sorteado
    }

    campoSenha.value = senha; // Exibe a senha no campo da interface
    classificaSenha(alfabeto.length); // Avalia a força da senha
}

// Função que calcula e classifica a força da senha com base na entropia
function classificaSenha(tamanhoAlfabeto) {
    // Entropia = tamanho da senha * log2(tamanho do alfabeto utilizado)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia); // Exibe a entropia no console (útil para depuração)

    // Remove as classes visuais anteriores da barra de força
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // Define a força com base em faixas de entropia
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    // Mostra ao usuário uma estimativa de quanto tempo um computador levaria para quebrar essa senha
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " +
        Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + // Tempo estimado em dias
        " dias para descobrir essa senha.";
}
