const comprimentoTexto = document.getElementById('comprimento-texto');
const campoSenha = document.getElementById('campo-senha');
const botaoGerar = document.getElementById('btn-gerar');
const botaoCopiar = document.getElementById('btn-copiar');
const botaoDiminuir = document.getElementById('btn-diminuir');
const botaoAumentar = document.getElementById('btn-aumentar');
const barraForca = document.getElementById('barra-forca');
const forcaTexto = document.getElementById('forca-texto');
const checkMaiusculas = document.getElementById('check-maiusculas');
const checkMinusculas = document.getElementById('check-minusculas');
const checkNumeros = document.getElementById('check-numeros');
const checkSimbolos = document.getElementById('check-simbolos');

const limites = {
    minimo: 6,
    maximo: 20,
};

const caracteres = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    simbolos: '!@#$%^&*()-_=+[]{};:,.<>?~',
};

let comprimentoSenha = 12;

function atualizarComprimento() {
    comprimentoTexto.textContent = comprimentoSenha;
    atualizarForca();
}

function selecionarCaracteres() {
    let conjunto = '';
    if (checkMaiusculas.checked) conjunto += caracteres.maiusculas;
    if (checkMinusculas.checked) conjunto += caracteres.minusculas;
    if (checkNumeros.checked) conjunto += caracteres.numeros;
    if (checkSimbolos.checked) conjunto += caracteres.simbolos;
    return conjunto;
}

function gerarSenha() {
    let senha = "";

    if (checkMaiusculas.checked) {
        senha += caracteres.maiusculas[
            Math.floor(Math.random() * caracteres.maiusculas.length)
        ];
    }

    if (checkMinusculas.checked) {
        senha += caracteres.minusculas[
            Math.floor(Math.random() * caracteres.minusculas.length)
        ];
    }

    if (checkNumeros.checked) {
        senha += caracteres.numeros[
            Math.floor(Math.random() * caracteres.numeros.length)
        ];
    }

    if (checkSimbolos.checked) {
        senha += caracteres.simbolos[
            Math.floor(Math.random() * caracteres.simbolos.length)
        ];
    }

    campoSenha.value = senha;
     atualizarForca();
}
   
        

function copiarSenha() {
    const senha = campoSenha.value;
    if (!senha) {
        alert('Gere uma senha antes de copiar.');
        return;
    }

    navigator.clipboard.writeText(senha)
        .then(() => {
            botaoCopiar.textContent = 'Copiado!';
            setTimeout(() => {
                botaoCopiar.textContent = 'Copiar';
            }, 1500);
        })
        .catch(() => {
            alert('Não foi possível copiar a senha.');
        });
}

function atualizarForca() {
    const selecoes = [
        checkMaiusculas.checked,
        checkMinusculas.checked,
        checkNumeros.checked,
        checkSimbolos.checked,
    ].filter(Boolean).length;

    let nivel = 'Nenhuma';
    let porcentagem = 0;
    let cor = 'var(--vermelho)';

    if (selecoes === 0) {
        nivel = 'Nenhuma';
        porcentagem = 0;
        cor = 'var(--vermelho)';
    } else if (comprimentoSenha >= 16 && selecoes >= 3) {
        nivel = 'Forte';
        porcentagem = 100;
        cor = 'var(--verde)';
    } else if (comprimentoSenha >= 12 && selecoes >= 2) {
        nivel = 'Média';
        porcentagem = 60;
        cor = 'var(--amarelo)';
    } else {
        nivel = 'Fraca';
        porcentagem = 35;
        cor = 'var(--vermelho)';
    }

    barraForca.style.width = `${porcentagem}%`;
    barraForca.style.backgroundColor = cor;
    forcaTexto.textContent = nivel;
}

botaoDiminuir.addEventListener('click', () => {
    if (comprimentoSenha > limites.minimo) {
        comprimentoSenha -= 1;
        atualizarComprimento();
    }
});

botaoAumentar.addEventListener('click', () => {
    if (comprimentoSenha < limites.maximo) {
        comprimentoSenha += 1;
        atualizarComprimento();
    }
});

[checkMaiusculas, checkMinusculas, checkNumeros, checkSimbolos].forEach((elemento) => {
    elemento.addEventListener('change', atualizarForca);
});

botaoGerar.addEventListener('click', gerarSenha);
botaoCopiar.addEventListener('click', copiarSenha);

atualizarComprimento();
atualizarForca();
