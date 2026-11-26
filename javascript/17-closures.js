// CLOSURES
// Uma closure é uma função que mantém acesso ao ambiente léxico
// em que foi criada, mesmo quando executada fora daquele contexto.
//
// Ambiente léxico é o conjunto de variáveis acessíveis conforme
// a posição da função no código.
//
// Esse mecanismo permite preservar estado entre chamadas,
// encapsular dados e criar funções com comportamentos configurados.

// CAPTURA DE VARIÁVEIS
// A função interna abaixo acessa nome, declarado na função externa.
// Esse acesso continua disponível depois que criarSaudacao termina.
function criarSaudacao(nome) {
    return function saudar() {
        return `Olá, ${nome}`;
    };
}

const saudarPricila = criarSaudacao("Pricila");

saudarPricila(); // "Olá, Pricila"

// criarSaudacao("Pricila") executa a função externa.
// O resultado é a função saudar, que fica armazenada em saudarPricila.
// saudarPricila() executa essa função interna posteriormente.

// FUNÇÕES QUE RETORNAM FUNÇÕES
// A função abaixo recebe uma configuração e devolve uma função especializada.
// A função retornada combina seu argumento com o fator capturado.
function criarMultiplicador(fator) {
    return function multiplicar(numero) {
        return numero * fator;
    };
}

const dobrar = criarMultiplicador(2);
const triplicar = criarMultiplicador(3);

dobrar(5); // 10
triplicar(5); // 15

// Cada chamada de criarMultiplicador cria outro ambiente.
// dobrar acessa o fator 2; triplicar acessa o fator 3.

// CLOSURES COM ARROW FUNCTIONS
// A sintaxe de arrow não altera a captura das variáveis externas.
const criarPrefixador = (prefixo) => (mensagem) => `${prefixo}: ${mensagem}`;

const mensagemErro = criarPrefixador("ERRO");

mensagemErro("Falha na consulta"); // "ERRO: Falha na consulta"

// CAPTURAR VARIÁVEIS, NÃO CONGELAR VALORES
// As duas funções abaixo compartilham a mesma variável quantidade.
// Quando incrementar altera essa variável, consultar observa o novo valor.
function criarContador() {
    let quantidade = 0;

    return {
        incrementar() {
            quantidade++;
            return quantidade;
        },

        consultar() {
            return quantidade;
        },
    };
}

const contador = criarContador();

contador.consultar(); // 0
contador.incrementar(); // 1
contador.incrementar(); // 2
contador.consultar(); // 2

// ESTADO PRIVADO
// quantidade pertence ao escopo de criarContador.
// O objeto retornado expõe operações, mas não expõe a variável diretamente.
contador.quantidade; // undefined

// Criar uma propriedade com o mesmo nome não altera a variável privada.
contador.quantidade = 100;

contador.consultar(); // 2

// Essa atribuição cria uma propriedade pública independente.
// Ela não acessa a variável usada pelos métodos da closure.

// ESTADOS INDEPENDENTES
// Cada execução da função externa cria seu próprio estado.
const contadorA = criarContador();
const contadorB = criarContador();

contadorA.incrementar(); // 1
contadorA.incrementar(); // 2
contadorB.incrementar(); // 1

contadorA.consultar(); // 2
contadorB.consultar(); // 1

// COMPARTILHAR ESTADO ENTRE VÁRIAS FUNÇÕES
// Os métodos abaixo acessam a mesma variável saldo.
// A closure permite controlar quais operações podem modificá-la.
function criarCarteira(saldoInicial = 0) {
    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
        throw new RangeError("O saldo inicial deve ser finito e não negativo");
    }

    let saldo = saldoInicial;

    function validarValor(valor) {
        if (!Number.isFinite(valor) || valor <= 0) {
            throw new RangeError("O valor deve ser finito e positivo");
        }
    }

    return {
        consultarSaldo() {
            return saldo;
        },

        depositar(valor) {
            validarValor(valor);
            saldo += valor;
            return saldo;
        },

        sacar(valor) {
            validarValor(valor);

            if (valor > saldo) {
                throw new RangeError("Saldo insuficiente");
            }

            saldo -= valor;
            return saldo;
        },
    };
}

const carteira = criarCarteira(100);

carteira.depositar(50); // 150
carteira.sacar(30); // 120
carteira.consultarSaldo(); // 120

// O estado privado ajuda a preservar as regras de alteração.
// Este exemplo não representa uma implementação financeira de produção.

// CLOSURE NÃO SIGNIFICA IMUTABILIDADE
// A função abaixo captura a variável que referencia o objeto recebido.
// Alterações nesse objeto continuam visíveis para a função retornada.
function criarLeitorDeNome(usuario) {
    return () => usuario.nome;
}

const usuario = { nome: "Pricila" };
const lerNome = criarLeitorDeNome(usuario);

usuario.nome = "Ana";

lerNome(); // "Ana"

// CAPTURAR UM VALOR DE REFERÊNCIA NO TEMPO
// A função abaixo extrai a string antes de criar a função interna.
// Alterar o objeto original não altera essa variável local.
function criarLeitorDeNomeInicial(usuario) {
    const nomeInicial = usuario.nome;

    return () => nomeInicial;
}

const perfil = { nome: "Pricila" };
const lerNomeInicial = criarLeitorDeNomeInicial(perfil);

perfil.nome = "Ana";

lerNomeInicial(); // "Pricila"

// A diferença está no dado acessado pela closure:
// lerNome consulta a propriedade do objeto a cada chamada.
// lerNomeInicial consulta a string armazenada no momento da criação.

// CLOSURES EM CALLBACKS
// A função abaixo cria um callback que mantém acesso ao nome recebido.
// O temporizador executa esse callback depois que agendarSaudacao retorna.
function agendarSaudacao(nome) {
    return setTimeout(() => {
        console.log(`Olá, ${nome}`);
    }, 100);
}

// Chamar agendarSaudacao("Pricila") para observar a mensagem.
// Closures não dependem de assincronismo, mas são comuns em callbacks.

// CLOSURES EM LAÇOS COM LET
// O for com let cria uma ligação própria para i em cada iteração.
// Cada callback acessa a variável correspondente àquela iteração.
function criarCallbacksComLet() {
    const callbacks = [];

    for (let i = 0; i < 3; i++) {
        callbacks.push(() => i);
    }

    return callbacks;
}

criarCallbacksComLet().map((callback) => callback()); // [0, 1, 2]

// CLOSURES EM LAÇOS COM VAR
// var cria uma única variável i compartilhada por todos os callbacks.
// Quando eles são executados após o laço, i já contém 3.
function criarCallbacksComVar() {
    const callbacks = [];

    for (var i = 0; i < 3; i++) {
        callbacks.push(() => i);
    }

    return callbacks;
}

criarCallbacksComVar().map((callback) => callback()); // [3, 3, 3]

// APLICAÇÃO PRÁTICA — FILTROS CONFIGURÁVEIS
// A função abaixo cria uma regra de filtro a partir de um preço máximo.
// A função retornada pode ser reutilizada em diferentes coleções.
function criarFiltroPorPreco(precoMaximo) {
    return (produto) => produto.preco <= precoMaximo;
}

const produtos = [
    { nome: "Mouse", preco: 80 },
    { nome: "Teclado", preco: 150 },
    { nome: "Monitor", preco: 900 },
];

const dentroDoOrcamento = criarFiltroPorPreco(200);

produtos.filter(dentroDoOrcamento);
// [{ nome: "Mouse", preco: 80 }, { nome: "Teclado", preco: 150 }]

// APLICAÇÃO PRÁTICA — CACHE
// A função abaixo mantém um Map privado entre chamadas.
// Se o argumento já tiver um resultado, ela reutiliza o valor armazenado.
function criarCache(calcular) {
    const cache = new Map();

    return function obterResultado(argumento) {
        if (cache.has(argumento)) {
            return cache.get(argumento);
        }

        const resultado = calcular(argumento);
        cache.set(argumento, resultado);

        return resultado;
    };
}

const calcularQuadrado = criarCache((numero) => numero ** 2);

calcularQuadrado(4); // 16: calcular e armazenar.
calcularQuadrado(4); // 16: reutilizar o resultado.

// Este cache atende funções síncronas de um argumento.
// O resultado precisa permanecer válido para o mesmo argumento.
// Objetos usados como chaves são comparados por identidade.
// Em aplicações reais, considerar limites de tamanho e expiração.

// MEMÓRIA E TEMPO DE VIDA
// Os dados necessários à closure podem continuar acessíveis enquanto
// a função que os utiliza permanecer alcançável pelo programa.
// Isso permite preservar estado, mas também pode prolongar a retenção de dados.

// Callbacks registrados em eventos ou temporizadores podem manter referências
// a objetos que deixaram de ser necessários.
// Remover listeners, cancelar temporizadores e limitar caches quando aplicável.
// Uma closure não representa, por si só, um vazamento de memória.

// CLOSURE E THIS SÃO CONCEITOS DIFERENTES
// Closure trata do acesso às variáveis do ambiente léxico.
// Em funções regulares, this depende da forma de chamada.
// Em arrows, this também é obtido do contexto léxico externo.

// RESUMO
// Captura de variáveis: manter acesso às variáveis externas.
// Estado privado: permitir acesso aos dados apenas pelas operações expostas.
// Funções que retornam funções: configurar comportamentos reutilizáveis.
// Estado compartilhado: permitir que várias closures acessem a mesma variável.
// Estado independente: criar outro ambiente a cada execução da função externa.

// CUIDADOS
// Não presumir que uma closure congela os valores capturados.
// Considerar mutações em objetos compartilhados.
// Preferir let em laços quando cada callback precisar de seu próprio contador.
// Evitar estado oculto quando ele dificultar entender ou testar o comportamento.
// Controlar o crescimento de dados mantidos por closures de longa duração.