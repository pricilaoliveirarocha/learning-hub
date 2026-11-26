// TRATAMENTO DE ERROS NO DIA A DIA
// Tratar erros significa decidir como responder a uma falha:
// recuperar a operação, informar o problema ou propagá-lo ao responsável.

// THROW — SINALIZAR UMA FALHA
// A função abaixo impede um cálculo com uma quantidade inválida.
// O throw interrompe a execução e transfere o controle ao tratamento mais próximo.
function calcularTotal(preco, quantidade) {
    if (!Number.isFinite(preco) || preco < 0) {
        throw new TypeError("O preço deve ser um número finito não negativo");
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        throw new RangeError("A quantidade deve ser um inteiro positivo");
    }

    return preco * quantidade;
}

// Usar objetos Error para preservar mensagem, tipo e stack trace.
// Evitar lançar strings, como throw "Quantidade inválida".

// TRY / CATCH
// O try abaixo executa uma operação que pode falhar.
// O catch recebe o erro e permite definir uma resposta para essa falha.
try {
    calcularTotal(100, 0);
} catch (erro) {
    console.error(erro.message);
}

// TIPOS DE ERRO
// Error: representar uma falha genérica.
// TypeError: indicar um tipo ou uso incompatível.
// RangeError: indicar um valor fora do intervalo permitido.
// SyntaxError: indicar sintaxe inválida, inclusive em JSON.parse.

// A função abaixo diferencia o tipo de falha antes de responder.
function interpretarConfiguracao(texto) {
    try {
        return JSON.parse(texto);
    } catch (erro) {
        if (erro instanceof SyntaxError) {
            throw new Error("A configuração contém um JSON inválido", {
                cause: erro,
            });
        }

        throw erro;
    }
}

// A propriedade cause preserva o erro original ao adicionar contexto.
// A stack ajuda a localizar a origem e o caminho da falha.

// VALIDAR ENTRADAS ANTES DE PROCESSAR
// A função abaixo verifica os campos necessários antes de criar o usuário.
// Essa validação continua necessária mesmo quando os dados vêm de JSON válido.
function validarUsuario(dados) {
    if (dados === null || typeof dados !== "object" || Array.isArray(dados)) {
        throw new TypeError("Os dados do usuário devem ser um objeto");
    }

    if (typeof dados.nome !== "string" || dados.nome.trim() === "") {
        throw new TypeError("O nome deve ser um texto não vazio");
    }

    return { nome: dados.nome.trim() };
}

// ERROS ASSÍNCRONOS
// O await abaixo faz a rejeição aparecer como uma exceção dentro do try.
async function carregarUsuario(url) {
    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(`Falha ao consultar usuário: HTTP ${resposta.status}`);
        }

        return await resposta.json();
    } catch (erro) {
        throw new Error("Não foi possível carregar o usuário", {
            cause: erro,
        });
    }
}

// Apenas chamar uma função que retorna uma Promise dentro do try não basta.
// Sem await ou tratamento com catch, a rejeição pode escapar desse bloco.

// FINALLY — ENCERRAR UMA OPERAÇÃO
// A função abaixo liga o estado de carregamento antes da consulta.
// O finally desliga esse estado tanto no sucesso quanto na falha.
async function carregarComIndicador(url, definirCarregando) {
    definirCarregando(true);

    try {
        return await carregarUsuario(url);
    } finally {
        definirCarregando(false);
    }
}

// Não usar return no finally: ele pode substituir um retorno ou ocultar um erro.
// Considerar que uma falha no próprio finally também pode substituir a anterior.

// ERROS PERSONALIZADOS
// A classe abaixo permite identificar uma regra de negócio pelo tipo do erro.
class SaldoInsuficienteError extends Error {
    constructor(saldo, valor) {
        super("Saldo insuficiente");
        this.name = "SaldoInsuficienteError";
        this.saldo = saldo;
        this.valor = valor;
    }
}

// A função abaixo sinaliza uma falha específica quando o saldo não cobre o saque.
function sacar(saldo, valor) {
    if (!Number.isFinite(saldo) || saldo < 0) {
        throw new RangeError("O saldo deve ser um número finito não negativo");
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        throw new RangeError("O saque deve ser um número finito positivo");
    }

    if (valor > saldo) {
        throw new SaldoInsuficienteError(saldo, valor);
    }

    return saldo - valor;
}

// O catch abaixo trata a falha conhecida e propaga erros inesperados.
try {
    sacar(100, 150);
} catch (erro) {
    if (erro instanceof SaldoInsuficienteError) {
        console.log("Escolher um valor menor para o saque");
    } else {
        throw erro;
    }
}

// RECUPERAR SOMENTE QUANDO HOUVER ALTERNATIVA VÁLIDA
// A função abaixo permite configurações padrão quando não há texto informado.
// Um JSON presente, mas inválido, continua sendo uma falha.
function obterPreferencias(texto) {
    if (texto === null || texto === undefined) {
        return { tema: "claro" };
    }

    return JSON.parse(texto);
}

// Evitar capturar qualquer erro e retornar {} ou [] automaticamente.
// Isso pode transformar uma indisponibilidade em um resultado aparentemente válido.

// FALHAS ESPERADAS SEM EXCEÇÕES
// A função abaixo representa uma entrada inválida como um resultado explícito.
// Essa abordagem é útil quando a falha faz parte do fluxo normal da interface.
function verificarNome(nome) {
    if (typeof nome !== "string" || nome.trim() === "") {
        return {
            sucesso: false,
            mensagem: "Informar um nome",
        };
    }

    return {
        sucesso: true,
        valor: nome.trim(),
    };
}

// O chamador decide como apresentar a validação.
const verificacao = verificarNome("");

if (!verificacao.sucesso) {
    console.log(verificacao.mensagem);
}

// TRATAR NA CAMADA RESPONSÁVEL
// Funções internas devem adicionar contexto ou propagar a falha.
// A camada de entrada, como uma tela ou rota, decide a resposta ao usuário.
// Evitar registrar o mesmo erro em todas as camadas.

// A função abaixo registra detalhes técnicos e apresenta uma mensagem adequada.
// apresentarMensagem representa a função da interface responsável pelo aviso.
async function exibirUsuario(url, apresentarMensagem) {
    try {
        const usuario = await carregarUsuario(url);
        return usuario;
    } catch (erro) {
        console.error("Falha ao abrir o perfil", erro);

        apresentarMensagem("Não foi possível abrir o perfil. Tentar novamente.");
        return null;
    }
}

// Registrar contexto útil sem incluir senhas, tokens ou dados sensíveis.
// Não exibir stack traces ou detalhes internos diretamente ao usuário.

// VALORES LANÇADOS NEM SEMPRE SÃO ERROR
// A função abaixo normaliza falhas de código externo que pode lançar qualquer valor.
function obterMensagemErro(erro) {
    return erro instanceof Error
        ? erro.message
        : "Ocorreu uma falha desconhecida";
}

// LIMITES DO TRY / CATCH
// O try externo abaixo não capturaria um erro lançado depois no temporizador.
// O callback executa quando o bloco externo já terminou.

// try {
//     setTimeout(() => {
//         throw new Error("Falha posterior");
//     }, 0);
// } catch (erro) {
//     // Não capturar a falha do callback acima.
// }

// Tratar a falha dentro do callback ou conectá-la a uma Promise.
// Não presumir que try/catch detecta erros de sintaxe do próprio arquivo:
// o arquivo precisa ser interpretado antes de começar a executar.

// CUIDADOS
// Não deixar catch vazio.
// Não capturar um erro sem definir recuperação, contexto ou resposta.
// Preservar o erro original ao encapsular falhas.
// Não repetir automaticamente operações sem avaliar efeitos duplicados.
// Não usar tratamento global como substituto do tratamento local.
// Considerar manipuladores globais como última camada de observação.