// ASYNC / AWAIT
// async/await permite consumir Promises com uma estrutura semelhante à de
// código síncrono. A operação continua sendo assíncrona.

// FUNÇÃO ASYNC
// A função abaixo retorna uma Promise cumprida com o valor "Pricila".
// Toda função async retorna uma Promise, mesmo sem utilizar await.
async function obterNome() {
    return "Pricila";
}

obterNome().then((nome) => {
    console.log(nome); // "Pricila"
});

// AWAIT
// A função abaixo simula uma consulta que demora 100 milissegundos.
function buscarUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id !== 1) {
                reject(new Error("Usuário não encontrado"));
                return;
            }

            resolve({ id: 1, nome: "Pricila" });
        }, 100);
    });
}

// A função abaixo aguarda o resultado da consulta antes de acessar o nome.
// O await pausa esta função, mas permite que outros trabalhos continuem.
async function obterNomeUsuario(id) {
    const usuario = await buscarUsuario(id);
    return usuario.nome;
}

obterNomeUsuario(1).then((nome) => {
    console.log(nome); // "Pricila"
});

// SEM AWAIT
// A variável abaixo recebe a Promise, não o usuário retornado pela consulta.
const usuarioPendente = buscarUsuario(1);

usuarioPendente.nome; // undefined

// ORDEM DE EXECUÇÃO
// A função abaixo começa imediatamente e pausa quando encontra o await.
// Mesmo com uma Promise já cumprida, a continuação ocorre em uma microtarefa.
async function demonstrarOrdem() {
    console.log("B");

    await Promise.resolve();

    console.log("D");
}

// Executar este trecho isoladamente para observar a ordem.
console.log("A");
demonstrarOrdem();
console.log("C");

// Ordem: A, B, C, D.

// TRATAMENTO DE ERROS
// Quando a Promise aguardada rejeita, o await lança o motivo da rejeição.
// O catch abaixo captura a falha da consulta e retorna um usuário alternativo.
async function buscarUsuarioOuVisitante(id) {
    try {
        return await buscarUsuario(id);
    } catch (erro) {
        console.error(erro.message);
        return { id: null, nome: "Visitante" };
    }
}

buscarUsuarioOuVisitante(99).then((usuario) => {
    console.log(usuario.nome); // "Visitante"
});

// PROPAGAÇÃO DE ERROS
// A função abaixo não recupera a falha.
// Se a consulta rejeitar, a Promise retornada por ela também rejeitará.
async function consultarUsuario(id) {
    const usuario = await buscarUsuario(id);
    return usuario;
}

// O chamador abaixo assume a responsabilidade por tratar essa rejeição.
consultarUsuario(99).catch((erro) => {
    console.error(erro.message);
});

// THROW EM FUNÇÕES ASYNC
// O erro abaixo se transforma em uma rejeição da Promise retornada.
// O chamador precisa aguardar ou consumir essa Promise para tratar a falha.
async function validarId(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("O ID deve ser um inteiro positivo");
    }

    return id;
}

validarId(-1).catch((erro) => {
    console.error(erro.message);
});

// FINALLY
// A função abaixo registra o início da consulta e tenta buscar o usuário.
// O finally registra o encerramento tanto no sucesso quanto na falha,
// inclusive quando o try executa return.
async function consultarComRegistro(id) {
    console.log("Consulta iniciada");

    try {
        return await buscarUsuario(id);
    } catch (erro) {
        console.error("Falha na consulta:", erro.message);
        throw erro;
    } finally {
        console.log("Consulta encerrada");
    }
}

// Em código real, o finally também pode liberar um recurso já adquirido.
// Evitar return no finally: ele pode substituir o resultado ou ocultar um erro.

// RETURN E RETURN AWAIT
// A função abaixo adota o resultado da consulta sem tratá-lo localmente.
// O await não é necessário quando a intenção é apenas devolver a Promise.
async function encaminharConsulta(id) {
    return buscarUsuario(id);
}

// A função abaixo usa return await para que a rejeição ocorra dentro do try.
// Sem await, esse catch não capturaria a rejeição da Promise retornada.
async function consultarComTratamento(id) {
    try {
        return await buscarUsuario(id);
    } catch (erro) {
        return { id: null, nome: "Visitante" };
    }
}

// OPERAÇÕES SEQUENCIAIS
// A segunda operação abaixo depende do usuário obtido na primeira.
// Por isso, a consulta de pedidos só começa depois da consulta do usuário.
function buscarPedidos(usuarioId) {
    return Promise.resolve([
        { id: 101, usuarioId, total: 150 },
    ]);
}

async function obterUsuarioComPedidos(id) {
    const usuario = await buscarUsuario(id);
    const pedidos = await buscarPedidos(usuario.id);

    return { usuario, pedidos };
}

// OPERAÇÕES CONCORRENTES
// As funções abaixo simulam duas consultas independentes.
function buscarProdutos() {
    return Promise.resolve(["Teclado", "Mouse"]);
}

function buscarCategorias() {
    return Promise.resolve(["Periféricos"]);
}

// A função abaixo inicia ambas as consultas antes de aguardá-las.
// Promise.all reúne os resultados na mesma ordem das Promises recebidas.
async function carregarCatalogo() {
    const [produtos, categorias] = await Promise.all([
        buscarProdutos(),
        buscarCategorias(),
    ]);

    return { produtos, categorias };
}

// Se uma consulta rejeitar, o await acima lançará essa falha.
// A outra consulta não será cancelada automaticamente.

// RESULTADOS PARCIAIS
// A função abaixo aguarda todas as consultas, mesmo que alguma falhe.
// Cada resultado informa se a operação terminou com sucesso ou rejeição.
async function consultarUsuarios() {
    const resultados = await Promise.allSettled([
        buscarUsuario(1),
        buscarUsuario(99),
    ]);

    return resultados.map((resultado) => {
        if (resultado.status === "fulfilled") {
            return { sucesso: true, usuario: resultado.value };
        }

        return { sucesso: false, erro: resultado.reason.message };
    });
}

// AWAIT EM LAÇOS
// A função abaixo processa um ID por vez.
// A próxima consulta só começa depois que a anterior termina.
// Se uma consulta falhar, a função rejeitará e o laço será interrompido.
async function buscarEmSequencia(ids) {
    const usuarios = [];

    for (const id of ids) {
        const usuario = await buscarUsuario(id);
        usuarios.push(usuario);
    }

    return usuarios;
}

// MAP COM ASYNC
// O callback async abaixo retorna uma Promise para cada ID.
// Promise.all aguarda todas e devolve um array com os usuários.
async function buscarEmConjunto(ids) {
    const promessas = ids.map(async (id) => {
        return await buscarUsuario(id);
    });

    return Promise.all(promessas);
}

// Neste caso, o callback pode ser simplificado:
// ids.map((id) => buscarUsuario(id)).

// Para coleções grandes, limitar a concorrência conforme a capacidade da API
// ou do banco, em vez de iniciar todas as consultas de uma vez.

// FOREACH NÃO AGUARDA CALLBACKS ASYNC
// O exemplo abaixo demonstra uma abordagem incorreta.
// forEach ignora as Promises retornadas pelo callback.
// A função externa pode terminar antes das consultas.
async function exemploIncorreto(ids) {
    ids.forEach(async (id) => {
        await buscarUsuario(id);
    });
}

// Não executar exemploIncorreto: falhas dos callbacks podem ficar sem tratamento.
// Usar for...of para sequência ou Promise.all com map para concorrência.

// FETCH COM ASYNC/AWAIT
// A função abaixo consulta uma API e interpreta o corpo da resposta como JSON.
// fetch não rejeita automaticamente por status HTTP como 404 ou 500;
// por isso, response.ok precisa ser verificado.
async function buscarDados(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Falha HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados;
}

// A chamada pode falhar por erro de rede, status HTTP ou JSON inválido.
// Interpretar JSON não valida se os dados possuem a estrutura esperada.

// ASYNC NÃO REMOVE BLOQUEIOS DE CPU
// A função abaixo executa o laço na mesma thread.
// O modificador async apenas envolve seu resultado em uma Promise.
async function calcularTotal() {
    let total = 0;

    for (let i = 0; i < 1_000_000; i++) {
        total += i;
    }

    return total;
}

// Processamento pesado continua bloqueando a thread durante o laço.
// Para esse tipo de trabalho, considerar workers.

// ONDE USAR AWAIT
// Usar await dentro de funções async.
// No nível superior, usar await apenas em contextos que aceitem essa sintaxe,
// como ES Modules; um script comum não permite top-level await.

// CUIDADOS
// Toda função async retorna uma Promise.
// await pausa a função atual; ele não bloqueia a thread enquanto aguarda.
// Uma rejeição aguardada se comporta como uma exceção naquele ponto.
// try/catch captura rejeições aguardadas dentro do try.
// Operações dependentes precisam respeitar sua sequência.
// Operações independentes podem ser iniciadas antes de serem aguardadas.
// Promises não são canceladas automaticamente quando outra operação falha.
// O chamador deve tratar ou propagar as falhas das funções que utiliza.