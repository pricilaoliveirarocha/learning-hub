// SOLID E CLEAN CODE NO DIA A DIA
// Clean Code orienta a escrita de código claro e fácil de manter.
// SOLID reúne princípios para organizar responsabilidades e dependências.
// Aplicar esses princípios conforme a necessidade, sem criar abstrações
// apenas para aumentar a quantidade de arquivos ou funções.

// CLEAN CODE — NOMES CLAROS
// Os nomes abaixo expressam o significado dos dados e da regra.
const diasDesdeUltimoAcesso = 35;
const limiteDiasInatividade = 30;

const usuarioInativo = diasDesdeUltimoAcesso > limiteDiasInatividade;

// Evitar nomes como d, limiteX ou flag quando não explicarem sua finalidade.

// FUNÇÕES COM RESPONSABILIDADE CLARA
// A função abaixo calcula um subtotal sem acessar banco, enviar mensagens
// ou modificar os itens recebidos.
function calcularSubtotal(itens) {
    return itens.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );
}

calcularSubtotal([
    { preco: 100, quantidade: 2 },
    { preco: 50, quantidade: 1 },
]); // 250

// RETORNOS ANTECIPADOS
// A função abaixo rejeita entradas inválidas antes de executar a regra.
// Essa organização reduz blocos condicionais aninhados.
function calcularDesconto(preco, percentual) {
    if (!Number.isFinite(preco) || preco < 0) {
        throw new RangeError("O preço deve ser um número finito não negativo");
    }

    if (
        !Number.isFinite(percentual) ||
        percentual < 0 ||
        percentual > 1
    ) {
        throw new RangeError("O percentual deve estar entre 0 e 1");
    }

    return preco * percentual;
}

// CONSTANTES COM SIGNIFICADO
// A constante abaixo explica a finalidade do valor usado na comparação.
const LIMITE_TENTATIVAS_LOGIN = 5;

function atingiuLimiteLogin(tentativas) {
    return tentativas >= LIMITE_TENTATIVAS_LOGIN;
}

// PARÂMETROS CLAROS
// O objeto abaixo torna os argumentos explícitos na chamada.
// Essa abordagem evita chamadas ambíguas como criarUsuario("Ana", true, false).
function criarUsuario({ nome, email, receberNotificacoes = false }) {
    return { nome, email, receberNotificacoes };
}

criarUsuario({
    nome: "Pricila",
    email: "pricila@example.com",
    receberNotificacoes: true,
});

// EVITAR MUTAÇÕES INESPERADAS
// A função abaixo devolve outro objeto em vez de alterar o recebido.
// As demais propriedades aninhadas, se existirem, continuam compartilhadas.
function desativarUsuario(usuario) {
    return { ...usuario, ativo: false };
}

// EVITAR DUPLICAÇÃO DE REGRAS
// A função abaixo centraliza uma regra usada em diferentes partes do sistema.
// Alterar a política exige atualizar apenas essa implementação.
function podeCancelarPedido(pedido) {
    return pedido.status === "pendente";
}

// Não extrair uma abstração apenas porque dois trechos parecem semelhantes.
// Compartilhar código quando eles representam a mesma responsabilidade.

// SOLID
// Aplicar também com funções, objetos e composição.
// Não exigir classes ou herança para aproveitar os princípios.

// S — SINGLE RESPONSIBILITY PRINCIPLE
// Manter um módulo com uma responsabilidade e um motivo principal para mudar.
// Separar regras de negócio de detalhes como persistência e envio de mensagens.

// A função abaixo cuida somente da validação necessária para o cadastro.
function validarCadastro(dados) {
    if (typeof dados.nome !== "string" || dados.nome.trim() === "") {
        throw new TypeError("O nome deve ser um texto não vazio");
    }

    if (typeof dados.email !== "string" || dados.email.trim() === "") {
        throw new TypeError("O email deve ser um texto não vazio");
    }
}

// A função abaixo prepara os dados após a validação.
// A validação completa do formato do email pode ficar em uma regra específica.
function prepararCadastro(dados) {
    return {
        nome: dados.nome.trim(),
        email: dados.email.trim().toLowerCase(),
    };
}

// O serviço abaixo coordena o cadastro e recebe a persistência como dependência.
// Uma mudança no banco não precisa alterar as regras de validação.
function criarServicoCadastro({ salvarUsuario }) {
    return {
        async cadastrar(dados) {
            validarCadastro(dados);

            const usuario = prepararCadastro(dados);

            return salvarUsuario(usuario);
        },
    };
}

// SRP não significa limitar cada função a uma linha.
// Uma função coordenadora pode chamar várias etapas da mesma operação.

// O — OPEN/CLOSED PRINCIPLE
// Permitir ampliar comportamentos sem alterar repetidamente uma regra estável.

// As funções abaixo representam políticas de desconto intercambiáveis.
// Todas recebem um subtotal e devolvem o valor do desconto.
const politicasDesconto = {
    comum: () => 0,
    premium: (subtotal) => subtotal * 0.1,
};

// A função abaixo recebe a política em vez de conhecer cada tipo de cliente.
// Uma nova política pode ser adicionada sem modificar essa função.
function calcularTotalCompra(subtotal, calcularDescontoAplicavel) {
    return subtotal - calcularDescontoAplicavel(subtotal);
}

calcularTotalCompra(200, politicasDesconto.premium); // 180

const descontoCampanha = (subtotal) => subtotal * 0.15;

calcularTotalCompra(200, descontoCampanha); // 170

// Não transformar todo if ou switch em uma estratégia.
// Introduzir essa separação quando houver variações reais do comportamento.

// L — LISKOV SUBSTITUTION PRINCIPLE
// Preservar o contrato esperado ao substituir uma implementação por outra.
// Em hierarquias, permitir usar um subtipo onde o tipo base era esperado.

// As implementações abaixo seguem o mesmo contrato:
// receber um valor positivo e devolver uma Promise com o resultado da cobrança.
// O exemplo usa simulações, sem realizar pagamentos reais.
function validarValorCobranca(valor) {
    if (!Number.isFinite(valor) || valor <= 0) {
        throw new RangeError("O valor da cobrança deve ser positivo e finito");
    }
}

async function cobrarComPix(valor) {
    validarValorCobranca(valor);

    return { id: "pix-001", status: "pendente", valor };
}

async function cobrarComCartao(valor) {
    validarValorCobranca(valor);

    return { id: "cartao-001", status: "pendente", valor };
}

// A função abaixo funciona com ambas sem precisar identificar o meio.
// Retornar undefined ou mudar a estrutura do resultado quebraria esse contrato.
async function iniciarPagamento(valor, cobrar) {
    const cobranca = await cobrar(valor);

    return {
        cobrancaId: cobranca.id,
        status: cobranca.status,
    };
}

// Não criar pré-condições extras que contrariem o contrato acordado.
// Documentar formatos de entrada, saída e falhas esperadas.
// O exemplo demonstra substituição por contrato usando funções.

// I — INTERFACE SEGREGATION PRINCIPLE
// Evitar obrigar consumidores a depender de operações que não utilizam.
// Em JavaScript, representar esses contratos por funções ou objetos pequenos.

// A função abaixo precisa apenas da consulta por ID.
// Ela não depende de salvar, excluir ou listar usuários.
function criarConsultaUsuario({ buscarPorId }) {
    return async function consultar(id) {
        return buscarPorId(id);
    };
}

// Um serviço de exclusão pode receber somente excluirPorId.
// Não exigir uma implementação genérica com métodos que lançam
// "Não implementado" apenas para satisfazer um contrato amplo.

// D — DEPENDENCY INVERSION PRINCIPLE
// Fazer as regras de negócio dependerem de contratos,
// em vez de detalhes concretos de banco, HTTP ou bibliotecas.

// A função abaixo depende de enviarMensagem, sem conhecer o provedor utilizado.
function criarServicoNotificacao({ enviarMensagem }) {
    return {
        async avisarPedidoConfirmado(email, pedidoId) {
            return enviarMensagem({
                destinatario: email,
                assunto: "Pedido confirmado",
                texto: `O pedido ${pedidoId} foi confirmado.`,
            });
        },
    };
}

// A implementação concreta pode ser conectada no ponto de inicialização.
// Nos testes, outra implementação pode registrar as mensagens em memória.
const mensagensEnviadas = [];

const notificacoes = criarServicoNotificacao({
    enviarMensagem: async (mensagem) => {
        mensagensEnviadas.push(mensagem);
        return { enviada: true };
    },
});

// Injeção de dependência é uma técnica usada no exemplo.
// O objetivo do DIP é preservar a regra de negócio das mudanças nos detalhes.

// TRATAMENTO DE ERROS
// Capturar uma falha quando houver recuperação, contexto ou resposta a fornecer.
// Não esconder erros retornando sucesso ou dados vazios indiscriminadamente.
// Evitar registrar a mesma falha em todas as camadas.

// NO DIA A DIA
// Escolher nomes que revelem intenção.
// Separar regras de negócio de acesso a banco e serviços externos.
// Preferir composição quando ela permitir combinar comportamentos com clareza.
// Manter funções coesas, sem impor um limite arbitrário de linhas.
// Introduzir abstrações para necessidades concretas.
// Usar testes para verificar comportamentos e contratos relevantes.
// Revisar se a organização facilita entender, alterar e testar o código.