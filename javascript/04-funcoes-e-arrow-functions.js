// FUNÇÕES
// Agrupar comportamentos reutilizáveis.
// Receber dados por parâmetros e devolver resultados com return.

// DECLARAÇÃO DE FUNÇÃO
function somar(a, b) {
    return a + b;
}

somar(10, 5); // 15

// Distinguir parâmetros de argumentos.
// Parâmetros: a e b, definidos na função.
// Argumentos: 10 e 5, fornecidos na chamada.

// RETURN
// Encerrar a execução da função e devolver um valor.
// Retornar undefined quando nenhum valor for retornado explicitamente.
function verificarIdade(idade) {
    if (idade < 18) {
        return "Menor de idade";
    }

    return "Maior de idade";
}

verificarIdade(20); // "Maior de idade"

// Preferir retornos antecipados para reduzir aninhamentos.
// Evitar quebrar a linha entre return e seu valor:
// a inserção automática de ponto e vírgula pode encerrar o return.

// PARÂMETROS PADRÃO
// Aplicar o padrão quando o argumento for undefined ou não for informado.
// Não aplicar o padrão quando o argumento for null, 0, false ou "".
function cumprimentar(nome = "Visitante") {
    return `Olá, ${nome}`;
}

cumprimentar(); // "Olá, Visitante"
cumprimentar(undefined); // "Olá, Visitante"
cumprimentar("Pricila"); // "Olá, Pricila"
cumprimentar(null); // "Olá, null"

// ARGUMENTOS AUSENTES
// Receber undefined para parâmetros sem argumento e sem valor padrão.
function duplicar(numero) {
    return numero * 2;
}

duplicar(); // NaN: undefined convertido para número na multiplicação.

// EXPRESSÃO DE FUNÇÃO
// Criar uma função e atribuí-la a uma variável.
const multiplicar = function (a, b) {
    return a * b;
};

multiplicar(4, 3); // 12

// ARROW FUNCTION
// Usar uma sintaxe concisa para expressões de função.
const subtrair = (a, b) => {
    return a - b;
};

subtrair(10, 3); // 7

// RETORNO IMPLÍCITO
// Omitir as chaves e o return quando o corpo for uma única expressão.
const dividir = (a, b) => a / b;

dividir(10, 2); // 5

// Usar return explicitamente quando o corpo tiver chaves.
const calcularDobro = (numero) => {
    return numero * 2;
};

// PARÊNTESES NOS PARÂMETROS
// Permitir omitir parênteses com um único parâmetro simples.
const triplicar = numero => numero * 3;

// Manter parênteses para zero ou múltiplos parâmetros.
const obterMensagem = () => "Pronto";
const calcularMedia = (a, b) => (a + b) / 2;

// RETORNO DE OBJETO
// Envolver o objeto em parênteses para usar retorno implícito.
// Sem parênteses, interpretar as chaves como um bloco da função.
const criarUsuario = (nome) => ({ nome, ativo: true });

criarUsuario("Pricila"); // { nome: "Pricila", ativo: true }

// REST PARAMETERS
// Agrupar os argumentos restantes em um array.
// Posicionar o parâmetro rest por último.
function somarTodos(...numeros) {
    let total = 0;

    for (const numero of numeros) {
        total += numero;
    }

    return total;
}

somarTodos(2, 3, 5); // 10
somarTodos(); // 0

// DESTRUCTURING NOS PARÂMETROS
// Extrair propriedades diretamente do objeto recebido.
// Usar = {} para permitir chamar sem fornecer o objeto.
function apresentarUsuario({ nome = "Visitante", idade } = {}) {
    return { nome, idade };
}

apresentarUsuario({ nome: "Pricila", idade: 25 });
// { nome: "Pricila", idade: 25 }

apresentarUsuario();
// { nome: "Visitante", idade: undefined }

// FUNÇÕES COMO VALORES
// Atribuir funções a variáveis, passá-las como argumentos e retorná-las.
// Distinguir passar a referência de executar a função.
const dobrar = (numero) => numero * 2;
const operacao = dobrar; // Armazenar a referência, sem executar.

operacao(5); // 10

// CALLBACK
// Passar uma função para que outra função possa executá-la.
// Não presumir execução assíncrona: callbacks também podem ser síncronos.
function aplicarOperacao(numero, callback) {
    return callback(numero);
}

aplicarOperacao(5, dobrar); // 10
aplicarOperacao(5, (numero) => numero + 1); // 6

// CLOSURE
// Manter acesso ao escopo externo mesmo após a função externa terminar.
function criarMultiplicador(fator) {
    return (numero) => numero * fator;
}

const multiplicarPorTres = criarMultiplicador(3);
multiplicarPorTres(4); // 12: preservar acesso ao fator 3.

// HOISTING
// Permitir chamar declarações de função antes da declaração no código.
calcularQuadrado(4); // 16

function calcularQuadrado(numero) {
    return numero ** 2;
}

// Aguardar a inicialização antes de usar funções atribuídas a const ou let.
// calcularCubo(2); // Lançar ReferenceError se executar nesta posição.

const calcularCubo = (numero) => numero ** 3;

calcularCubo(2); // 8

// THIS: FUNÇÃO REGULAR E ARROW
// Determinar o this de uma função regular conforme a forma de chamada.
// Capturar o this do escopo externo ao usar uma arrow.
// Não tentar alterar o this de uma arrow com call, apply ou bind.
const conta = {
    saldo: 100,

    consultarSaldo() {
        return this.saldo;
    },

    criarConsulta() {
        return () => this.saldo;
    },
};

conta.consultarSaldo(); // 100: usar conta como this nesta chamada.

const consultar = conta.criarConsulta();
consultar(); // 100: preservar o this capturado de criarConsulta.

// Preferir método regular quando precisar do objeto receptor como this.
// Usar arrow quando precisar preservar o this do contexto externo.

// ARGUMENTS
// Usar rest parameters para receber uma quantidade variável de argumentos.
// Considerar que arrows não possuem seu próprio arguments.

// CONSTRUTORES
// Considerar que arrows não podem ser chamadas com new.
// Usar classes ou funções construtoras regulares quando necessário.

// MUTAÇÃO E EFEITOS COLATERAIS
// Distinguir retornar um novo valor de alterar dados externos.
function adicionarItem(itens, item) {
    return [...itens, item];
}

const itensOriginais = ["JavaScript"];
const novosItens = adicionarItem(itensOriginais, "SQL");
// Preservar itensOriginais e criar outro array em novosItens.
// Considerar a cópia superficial: objetos internos continuam compartilhados.

// BOAS PRÁTICAS
// Dar nomes que expressem a responsabilidade da função.
// Manter funções focadas em uma responsabilidade.
// Preferir entradas e retornos explícitos.
// Evitar alterar argumentos sem necessidade.
// Escolher arrow pelo comportamento e pelo contexto, não apenas pela concisão.
// Validar entradas quando houver limites ou regras de negócio.