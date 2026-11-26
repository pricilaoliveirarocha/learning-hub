// PROMISES E PROGRAMAÇÃO ASSÍNCRONA
// Representar operações que podem terminar no futuro.
// Usar para trabalhar com rede, arquivos e outras operações assíncronas.
// Distinguir assincronismo de paralelismo: não presumir execução simultânea de JavaScript.

// EXECUÇÃO SÍNCRONA
// Executar cada instrução antes de avançar para a próxima.
console.log("Primeiro");
console.log("Segundo");

// EXECUÇÃO ASSÍNCRONA
// Permitir continuar a execução enquanto uma operação fica pendente.
console.log("Início");

setTimeout(() => {
    console.log("Temporizador");
}, 0);

console.log("Fim");

// Ordem: "Início", "Fim", "Temporizador".
// Considerar o atraso do temporizador um mínimo, sem garantia de horário exato.

// PROMISE
// Representar o resultado eventual de uma operação.
// Considerar três estados:
// pending: aguardar a conclusão.
// fulfilled: concluir com um valor.
// rejected: concluir com um motivo de falha.
// Após fulfilled ou rejected, permanecer no estado final.

// CRIAR UMA PROMISE
// Executar o executor imediatamente, de forma síncrona.
// Usar resolve para resolver a Promise e reject para rejeitá-la.
function aguardar(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Espera concluída");
        }, ms);
    });
}

// CONSUMIR COM THEN
// Registrar uma reação para quando a Promise for cumprida.
// Executar o callback de then como microtarefa, mesmo com a Promise já cumprida.
aguardar(100).then((mensagem) => {
    console.log(mensagem);
});

// SIMULAR UMA OPERAÇÃO COM SUCESSO OU FALHA
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

// THEN, CATCH E FINALLY
buscarUsuario(1)
    .then((usuario) => {
        console.log(usuario.nome);
    })
    .catch((erro) => {
        console.error(erro.message);
    })
    .finally(() => {
        console.log("Consulta encerrada");
    });

// Usar then para transformar ou consumir o resultado.
// Usar catch para tratar rejeições anteriores na cadeia.
// Usar finally para limpeza, independentemente de sucesso ou falha.

// ENCADEAMENTO
// Considerar que cada then retorna uma nova Promise.
// Retornar um valor para disponibilizá-lo ao próximo then.
Promise.resolve(10)
    .then((valor) => valor * 2)
    .then((valor) => valor + 5)
    .then((resultado) => {
        console.log(resultado); // 25
    });

// RETORNAR UMA PROMISE
// Fazer a cadeia aguardar o resultado da Promise retornada.
buscarUsuario(1)
    .then((usuario) => {
        return aguardar(100).then(() => usuario.nome);
    })
    .then((nome) => {
        console.log(nome); // "Pricila"
    })
    .catch((erro) => {
        console.error(erro.message);
    });

// EVITAR ESQUECER O RETURN
// Sem retornar, perder o resultado e a ligação da operação com a cadeia.
Promise.resolve(10)
    .then((valor) => {
        valor * 2;
    })
    .then((resultado) => {
        console.log(resultado); // undefined
    });

// PROPAGAÇÃO DE ERROS
// Converter erros lançados dentro de then em rejeições.
Promise.resolve(10)
    .then(() => {
        throw new Error("Falha no processamento");
    })
    .catch((erro) => {
        console.error(erro.message);
    });

// RECUPERAR UMA CADEIA
// Retornar um valor no catch para continuar pelo caminho de sucesso.
buscarUsuario(99)
    .catch(() => {
        return { id: null, nome: "Visitante" };
    })
    .then((usuario) => {
        console.log(usuario.nome); // "Visitante"
    });

// PROPAGAR A FALHA APÓS TRATAR
// Relançar o erro quando não houver recuperação válida.
function consultarUsuario(id) {
    return buscarUsuario(id).catch((erro) => {
        console.error("Falha na consulta:", erro.message);
        throw erro;
    });
}

// FINALLY
// Preservar normalmente o resultado ou a rejeição anterior.
// Não usar o retorno comum de finally para substituir o resultado.
Promise.resolve("Resultado")
    .finally(() => "Outro valor")
    .then((valor) => {
        console.log(valor); // "Resultado"
    });

// Considerar que lançar um erro ou retornar uma Promise rejeitada no finally
// substitui o resultado anterior por uma rejeição.

// PROMISE.RESOLVE E PROMISE.REJECT
// Criar uma Promise cumprida com um valor.
Promise.resolve(42).then((valor) => {
    console.log(valor); // 42
});

// Criar uma Promise rejeitada e tratar a falha.
Promise.reject(new Error("Operação recusada")).catch((erro) => {
    console.error(erro.message);
});

// PROMISE.ALL
// Aguardar todas cumprirem e retornar os resultados na ordem de entrada.
// Rejeitar assim que uma delas rejeitar.
// Considerar que as demais operações continuam: não cancelar automaticamente.
Promise.all([
    aguardar(100),
    buscarUsuario(1),
])
    .then(([mensagem, usuario]) => {
        console.log(mensagem, usuario.nome);
    })
    .catch((erro) => {
        console.error(erro.message);
    });

// Iniciar as operações ao chamar as funções acima.
// Usar Promise.all para coordenar os resultados, não para iniciar as operações.

// PROMISE.ALLSETTLED
// Aguardar todas terminarem, incluindo sucessos e falhas.
Promise.allSettled([
    buscarUsuario(1),
    buscarUsuario(99),
]).then((resultados) => {
    for (const resultado of resultados) {
        if (resultado.status === "fulfilled") {
            console.log(resultado.value);
        } else {
            console.error(resultado.reason.message);
        }
    }
});

// PROMISE.RACE
// Adotar o resultado da primeira Promise a terminar, com sucesso ou falha.
Promise.race([
    aguardar(50),
    aguardar(100),
]).then((resultado) => {
    console.log(resultado);
});

// Não cancelar automaticamente as operações restantes.

// PROMISE.ANY
// Adotar o primeiro resultado de sucesso.
// Rejeitar com AggregateError se todas rejeitarem.
Promise.any([
    Promise.reject(new Error("Primeira fonte indisponível")),
    Promise.resolve("Dados disponíveis"),
])
    .then((resultado) => {
        console.log(resultado); // "Dados disponíveis"
    })
    .catch((erro) => {
        console.error(erro.errors);
    });

// MICROTAREFAS E TEMPORIZADORES
// Executar este trecho isoladamente para observar a ordem.
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

// Ordem: A, D, C, B.
// Finalizar a execução síncrona antes de processar as microtarefas.
// Processar a reação da Promise antes do callback do temporizador neste exemplo.

// LIMITES DAS PROMISES
// Não transformar processamento pesado em trabalho não bloqueante
// apenas por colocá-lo dentro de uma Promise.
function calcularSincronamente() {
    return new Promise((resolve) => {
        let total = 0;

        for (let i = 0; i < 1_000_000; i++) {
            total += i;
        }

        resolve(total);
    });
}

// Executar todo o laço antes de retornar dessa função.
// Considerar workers para processamento pesado fora da thread principal.

// CUIDADOS
// Retornar Promises para manter operações conectadas à cadeia.
// Tratar rejeições no ponto responsável por recuperar ou reportar a falha.
// Evitar criar new Promise quando a API já retornar uma Promise.
// Evitar aninhamentos desnecessários; preferir encadeamento.
// Não presumir cancelamento com all, race ou any.
// Não confundir Promise pendente com execução em outra thread.
// Executar exemplos isoladamente para analisar a ordem das mensagens.
// Usar async/await como outra sintaxe para consumir Promises no próximo tópico.