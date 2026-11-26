// ESCOPO LÉXICO, HOISTING E TDZ

// O QUE É ESCOPO?
// Escopo é a região do código em que uma variável pode ser acessada.
// Uma variável pode pertencer a um módulo, a uma função ou a um bloco.

// O QUE É ESCOPO LÉXICO?
// Escopo léxico significa que o acesso às variáveis depende do local
// onde a função foi definida, não do local onde ela é chamada.
// A busca começa no escopo atual e segue pelos escopos externos.

const linguagem = "JavaScript";

function obterLinguagem() {
    return linguagem;
}

function executarConsulta() {
    const linguagem = "Python";

    return obterLinguagem();
}

executarConsulta(); // "JavaScript"

// obterLinguagem foi definida no escopo externo.
// Por isso, ela acessa a variável linguagem que contém "JavaScript".
// A variável local de executarConsulta não altera esse acesso.

// CADEIA DE ESCOPOS
// A cadeia de escopos é a sequência de ambientes consultados para encontrar
// uma variável: primeiro o atual, depois os externos.
// O acesso funciona de dentro para fora, sem buscar em funções vizinhas.

const plataforma = "Learning Hub";

function criarMensagem() {
    const curso = "JavaScript";

    function montarMensagem() {
        const nivel = "Intermediário";

        return `${plataforma}: ${curso} — ${nivel}`;
    }

    return montarMensagem();
}

criarMensagem(); // "Learning Hub: JavaScript — Intermediário"

// montarMensagem acessa nivel no próprio escopo, curso no escopo da função
// externa e plataforma no escopo superior.
// Fora dessas funções, curso e nivel não estão disponíveis.

// ESCOPO DE FUNÇÃO
// Uma variável declarada dentro de uma função fica restrita àquela função,
// respeitando também eventuais blocos internos quando usar let ou const.
function calcularTotal() {
    var subtotal = 100;
    let desconto = 10;
    const frete = 20;

    return subtotal - desconto + frete;
}

calcularTotal(); // 110

// console.log(subtotal); // ReferenceError: variável fora do escopo.
// console.log(desconto); // ReferenceError: variável fora do escopo.
// console.log(frete); // ReferenceError: variável fora do escopo.

// ESCOPO DE BLOCO
// Um bloco é uma região delimitada por chaves, como o corpo de um if.
// let e const ficam restritos ao bloco; var não respeita esse limite.
function demonstrarBloco() {
    if (true) {
        var mensagem = "Disponível na função";
        let tentativas = 3;
        const limite = 5;
    }

    console.log(mensagem); // "Disponível na função"

    // console.log(tentativas); // ReferenceError.
    // console.log(limite); // ReferenceError.
}

// VAR, LET E CONST
// var: permite reatribuição e redeclaração; possui escopo de função ou global.
// let: permite reatribuição; possui escopo de bloco.
// const: impede reatribuição; possui escopo de bloco e exige inicialização.

let pontos = 10;
pontos = 20;

const usuario = { nome: "Pricila" };
usuario.nome = "Ana";

// const protege a associação da variável, não o conteúdo do objeto.
// usuario = {}; // TypeError: tentativa de reatribuir uma constante.
// const limite; // SyntaxError: declaração sem inicialização.

// REDECLARAÇÃO
// Redeclarar significa declarar novamente o mesmo nome no mesmo escopo.
// var permite isso; let e const não permitem.
function demonstrarRedeclaracao() {
    var quantidade = 1;
    var quantidade = 2;

    let saldo = 100;
    // let saldo = 200; // SyntaxError.

    const taxa = 0.1;
    // const taxa = 0.2; // SyntaxError.

    return { quantidade, saldo, taxa };
}

// SHADOWING — SOMBREAMENTO
// Sombreamento acontece quando uma declaração interna possui o mesmo nome
// de uma declaração externa e passa a ser encontrada primeiro.
// Isso não altera o valor da variável externa.
const tema = "claro";

function obterTemaLocal() {
    const tema = "escuro";
    return tema;
}

obterTemaLocal(); // "escuro"
tema; // "claro"

// O QUE É HOISTING?
// Hoisting, ou "içamento", descreve o comportamento das declarações
// preparadas antes da execução das instruções de um escopo.
// O código não é movido fisicamente para cima.
// O acesso antecipado depende do tipo de declaração.

// HOISTING COM VAR
// A variável var já está inicializada com undefined ao entrar na função.
// A atribuição do valor só acontece na linha correspondente.
function demonstrarHoistingVar() {
    console.log(total); // undefined

    var total = 100;

    console.log(total); // 100
}

// O comportamento equivale, neste exemplo, a:
// var total;
// console.log(total);
// total = 100;

// O QUE É TDZ?
// TDZ significa Temporal Dead Zone, ou Zona Temporal Morta.
// É o período entre a entrada no escopo de uma variável let ou const
// e a execução de sua inicialização.
// Nesse período, a variável já pertence ao escopo, mas não pode ser acessada.
// Qualquer tentativa de acesso lança ReferenceError.

function demonstrarTDZ() {
    // console.log(preco); // ReferenceError: preco está na TDZ.
    // console.log(desconto); // ReferenceError: desconto está na TDZ.

    let preco = 100;
    const desconto = 10;

    return preco - desconto;
}

// let e const também participam da preparação do escopo.
// A diferença em relação a var é permanecerem sem inicialização até
// a execução de suas declarações.

// LET SEM VALOR EXPLÍCITO
// Uma declaração let sem valor passa a conter undefined ao ser executada.
// Antes dessa linha, a variável continua na TDZ.
function demonstrarLetSemValor() {
    // console.log(resultado); // ReferenceError.

    let resultado;

    return resultado; // undefined
}

// SOMBREAMENTO COM TDZ
// A declaração interna oculta a externa desde o início do bloco.
// Antes da inicialização interna, o acesso gera erro em vez de buscar
// o valor da variável externa.
const preco = 100;

function demonstrarSombreamentoTDZ() {
    // console.log(preco); // ReferenceError, mesmo existindo preco fora.

    const preco = 200;

    return preco;
}

demonstrarSombreamentoTDZ(); // 200

// TYPEOF E TDZ
// typeof retorna "undefined" para um identificador não declarado.
// Porém, acessar uma variável na TDZ com typeof também lança ReferenceError.
function demonstrarTypeof() {
    typeof identificadorNaoDeclarado; // "undefined"

    // typeof valorLocal; // ReferenceError: variável na TDZ.

    let valorLocal = 10;

    return typeof valorLocal; // "number"
}

// HOISTING DE DECLARAÇÕES DE FUNÇÃO
// Uma declaração de função fica disponível antes da sua posição no código.
function demonstrarDeclaracaoFuncao() {
    const resultado = somar(2, 3);

    function somar(a, b) {
        return a + b;
    }

    return resultado; // 5
}

// FUNÇÕES ATRIBUÍDAS A CONST OU LET
// Uma função atribuída a uma variável segue as regras dessa variável.
// Antes da inicialização, a variável está na TDZ.
function demonstrarArrow() {
    // somar(2, 3); // ReferenceError.

    const somar = (a, b) => a + b;

    return somar(2, 3); // 5
}

// FUNÇÕES ATRIBUÍDAS A VAR
// Antes da atribuição, a variável contém undefined.
// Tentar chamar undefined como função lança TypeError.
function demonstrarExpressaoComVar() {
    // somar(2, 3); // TypeError: somar não contém uma função neste ponto.

    var somar = function (a, b) {
        return a + b;
    };

    return somar(2, 3); // 5
}

// ESCOPO LÉXICO E CLOSURES
// Uma closure é uma função que mantém acesso ao ambiente léxico
// em que foi criada, mesmo após a função externa terminar.
function criarContador() {
    let quantidade = 0;

    return function incrementar() {
        quantidade++;
        return quantidade;
    };
}

const contar = criarContador();

contar(); // 1
contar(); // 2

// A função retornada mantém acesso à variável quantidade.
// Ela acompanha suas alterações, sem congelar o valor inicial.

// Cada execução da função externa cria um estado independente.
const outroContador = criarContador();

outroContador(); // 1
contar(); // 3

// LET E VAR EM LAÇOS
// O for com let cria uma ligação própria para o contador em cada iteração.
// Cada função abaixo mantém acesso ao contador daquela iteração.
function criarCallbacksComLet() {
    const callbacks = [];

    for (let i = 0; i < 3; i++) {
        callbacks.push(() => i);
    }

    return callbacks;
}

criarCallbacksComLet().map((callback) => callback()); // [0, 1, 2]

// Com var, todas as funções compartilham a mesma variável.
// Quando os callbacks são executados após o laço, essa variável vale 3.
function criarCallbacksComVar() {
    const callbacks = [];

    for (var i = 0; i < 3; i++) {
        callbacks.push(() => i);
    }

    return callbacks;
}

criarCallbacksComVar().map((callback) => callback()); // [3, 3, 3]

// ESCOPO DE MÓDULO
// Em ES Modules, as declarações no nível superior pertencem ao módulo.
// Outros módulos só acessam os valores disponibilizados por export.
// Essas declarações não viram propriedades de globalThis automaticamente.

// RESUMO
// Escopo: determinar onde uma variável pode ser acessada.
// Escopo léxico: definir esse acesso pela posição da função no código.
// Shadowing: ocultar uma declaração externa com outra de mesmo nome.
// Hoisting: preparar declarações antes das instruções do escopo.
// TDZ: impedir acesso a let e const antes da inicialização.
// Closure: manter acesso ao ambiente léxico em que a função foi criada.

// CUIDADOS
// Preferir const; usar let quando houver reatribuição.
// Declarar variáveis no menor escopo necessário.
// Evitar depender de acesso antecipado para organizar o código.
// Distinguir undefined de uma variável ainda não inicializada.
// Evitar sombreamentos que dificultem identificar qual variável está em uso.