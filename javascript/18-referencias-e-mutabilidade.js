// REFERÊNCIAS E MUTABILIDADE

// O QUE É MUTABILIDADE?
// Mutabilidade é a possibilidade de alterar um valor existente.
// Objetos e arrays são mutáveis: suas propriedades e elementos podem mudar.
// Valores primitivos, como strings e números, são imutáveis.

// PRIMITIVOS IMUTÁVEIS
// A atribuição abaixo substitui o valor da variável.
// Ela não modifica o número 10.
let pontos = 10;
pontos = pontos + 5;
// pontos: 15

// O método abaixo retorna outra string, sem modificar a original.
const linguagem = "javascript";
const linguagemMaiuscula = linguagem.toUpperCase();

linguagem; // "javascript"
linguagemMaiuscula; // "JAVASCRIPT"

// CÓPIA DE VALORES PRIMITIVOS
// As variáveis abaixo armazenam valores independentes.
// Reatribuir uma delas não altera a outra.
let primeiroSaldo = 100;
let segundoSaldo = primeiroSaldo;

segundoSaldo = 200;

primeiroSaldo; // 100
segundoSaldo; // 200

// O QUE É UMA REFERÊNCIA?
// Uma referência permite acessar um objeto.
// Ao atribuir um objeto a outra variável, compartilhar o mesmo objeto,
// em vez de criar uma cópia independente.
const usuario = { nome: "Pricila" };
const outroUsuario = usuario;

outroUsuario.nome = "Ana";

usuario.nome; // "Ana"
usuario === outroUsuario; // true

// IDENTIDADE E CONTEÚDO
// Dois objetos podem ter o mesmo conteúdo e identidades diferentes.
// A comparação com === verifica identidade, não igualdade de conteúdo.
const perfilA = { nome: "Pricila" };
const perfilB = { nome: "Pricila" };

perfilA === perfilB; // false

// A mesma regra vale para arrays.
// [1, 2] === [1, 2]; // false

// REATRIBUIÇÃO E MUTAÇÃO
// Reatribuição significa fazer a variável armazenar outro valor.
// Mutação significa modificar o objeto que ela já referencia.
let configuracao = { tema: "claro" };

configuracao.tema = "escuro"; // Mutação.
configuracao = { tema: "sistema" }; // Reatribuição.

// CONST NÃO TORNA O OBJETO IMUTÁVEL
// const impede trocar o valor da variável, mas permite modificar o objeto.
const preferencias = { tema: "claro" };

preferencias.tema = "escuro";
preferencias.idioma = "pt-BR";
delete preferencias.idioma;

// preferencias = {}; // TypeError: tentativa de reatribuição.

// A mesma regra permite modificar arrays declarados com const.
const estudos = ["JavaScript"];

estudos.push("SQL");
estudos[0] = "JavaScript avançado";

// ARGUMENTOS DE FUNÇÃO
// JavaScript passa argumentos por valor.
// Para objetos, o valor passado é uma referência ao objeto.
// Por isso, a função abaixo consegue modificar o objeto do chamador.
function desativarUsuario(usuarioRecebido) {
    usuarioRecebido.ativo = false;
}

const conta = { ativo: true };

desativarUsuario(conta);

conta.ativo; // false

// Reatribuir o parâmetro não reatribui a variável usada pelo chamador.
// A função abaixo altera somente sua variável local.
function substituirUsuario(usuarioRecebido) {
    usuarioRecebido = { ativo: false };
    return usuarioRecebido;
}

const contaOriginal = { ativo: true };
const contaSubstituta = substituirUsuario(contaOriginal);

contaOriginal.ativo; // true
contaSubstituta.ativo; // false

// CÓPIA SUPERFICIAL — SHALLOW COPY
// Uma cópia superficial cria outro objeto apenas no primeiro nível.
// Objetos aninhados continuam compartilhados.
const pessoa = {
    nome: "Pricila",
    endereco: {
        cidade: "Rio de Janeiro",
    },
};

const copiaPessoa = { ...pessoa };

copiaPessoa === pessoa; // false
copiaPessoa.endereco === pessoa.endereco; // true

// Alterar uma propriedade primitiva da cópia não altera o original.
copiaPessoa.nome = "Ana";

pessoa.nome; // "Pricila"

// Alterar o objeto interno compartilhado afeta ambos.
copiaPessoa.endereco.cidade = "Niterói";

pessoa.endereco.cidade; // "Niterói"

// CÓPIA SUPERFICIAL DE ARRAYS
// Spread cria outro array, mas mantém as referências dos elementos.
const produtos = [
    { id: 1, preco: 100 },
    { id: 2, preco: 200 },
];

const copiaProdutos = [...produtos];

copiaProdutos === produtos; // false
copiaProdutos[0] === produtos[0]; // true

copiaProdutos[0].preco = 150;

produtos[0].preco; // 150

// Adicionar um elemento modifica somente a estrutura do novo array.
copiaProdutos.push({ id: 3, preco: 300 });

produtos.length; // 2
copiaProdutos.length; // 3

// ATUALIZAÇÃO SEM MUTAR O ORIGINAL
// A função abaixo cria outro objeto para representar a alteração.
function atualizarNome(usuarioAtual, novoNome) {
    return {
        ...usuarioAtual,
        nome: novoNome,
    };
}

const cadastro = { nome: "Pricila", ativo: true };
const cadastroAtualizado = atualizarNome(cadastro, "Ana");

cadastro.nome; // "Pricila"
cadastroAtualizado.nome; // "Ana"

// ATUALIZAÇÃO DE ESTRUTURAS ANINHADAS
// Copiar cada nível no caminho da propriedade que será alterada.
// Isso evita modificar objetos compartilhados com a estrutura original.
const pedido = {
    id: 1,
    entrega: {
        endereco: {
            cidade: "Rio de Janeiro",
            bairro: "Centro",
        },
    },
};

const pedidoAtualizado = {
    ...pedido,
    entrega: {
        ...pedido.entrega,
        endereco: {
            ...pedido.entrega.endereco,
            cidade: "Niterói",
        },
    },
};

pedido.entrega.endereco.cidade; // "Rio de Janeiro"
pedidoAtualizado.entrega.endereco.cidade; // "Niterói"

// ATUALIZAÇÃO DE UM OBJETO EM UM ARRAY
// map cria outro array.
// O spread cria outro objeto apenas para o produto alterado.
// Os demais produtos continuam compartilhados.
const produtosAtualizados = produtos.map((produto) =>
    produto.id === 1
        ? { ...produto, preco: 180 }
        : produto
);

produtosAtualizados[0] === produtos[0]; // false
produtosAtualizados[1] === produtos[1]; // true

produtos[0].preco; // 150
produtosAtualizados[0].preco; // 180

// MÉTODOS QUE MUTAM ARRAYS
// Os métodos abaixo modificam o array sobre o qual são chamados:
// push, pop, shift, unshift, splice, sort, reverse, fill e copyWithin.

// MÉTODOS QUE NÃO MUTAM O ARRAY ORIGINAL
// map, filter, slice e concat retornam novos arrays.
// toSorted, toReversed, toSpliced e with também retornam novos arrays.
// Isso não impede mutações realizadas explicitamente nos callbacks.
const precos = [30, 10, 20];
const precosOrdenados = precos.toSorted((a, b) => a - b);

precos; // [30, 10, 20]
precosOrdenados; // [10, 20, 30]

// A chamada abaixo modifica precos.
precos.sort((a, b) => a - b);

precos; // [10, 20, 30]

// CUIDADO COM MUTAÇÃO DENTRO DE MAP
// Criar outro array não garante que os objetos originais sejam preservados.
// O callback abaixo altera diretamente os objetos recebidos.
const itens = [{ quantidade: 1 }];

const itensAlterados = itens.map((item) => {
    item.quantidade++;
    return item;
});

itens[0].quantidade; // 2
itensAlterados[0] === itens[0]; // true

// CÓPIA PROFUNDA — DEEP COPY
// Uma cópia profunda também copia as estruturas internas compatíveis.
// structuredClone permite criar essa cópia para vários tipos de dados.
const original = {
    endereco: { cidade: "Rio de Janeiro" },
    interesses: ["JavaScript", "SQL"],
};

const copiaProfunda = structuredClone(original);

copiaProfunda.endereco.cidade = "São Paulo";
copiaProfunda.interesses.push("AWS");

original.endereco.cidade; // "Rio de Janeiro"
original.interesses; // ["JavaScript", "SQL"]

// structuredClone não clona funções e não preserva protótipos
// de classes personalizadas como uma reconstrução da instância original.
// Não usar cópia profunda indiscriminadamente: considerar seu custo.

// OBJECT.FREEZE
// freeze impede adicionar, remover ou alterar propriedades próprias.
// A proteção é superficial: objetos internos permanecem mutáveis.
const ajustes = Object.freeze({
    tema: "escuro",
    notificacoes: {
        email: true,
    },
});

// ajustes.tema = "claro";
// A alteração falha; em modo estrito, lançar TypeError.

ajustes.notificacoes.email = false; // Mutação permitida no objeto interno.

// Freeze não cria uma cópia: devolver o próprio objeto congelado.
Object.freeze(ajustes) === ajustes; // true

// EFEITOS COLATERAIS
// Um efeito colateral é uma alteração observável fora do retorno da função.
// Modificar argumentos, alterar estado externo ou gravar arquivos são exemplos.
let totalConsultas = 0;

function registrarConsulta() {
    totalConsultas++;
}

// FUNÇÕES PURAS
// Uma função pura devolve o mesmo resultado para as mesmas entradas
// e não causa efeitos colaterais.
// A função abaixo calcula outro valor sem alterar os argumentos.
function calcularPrecoComDesconto(preco, percentual) {
    return preco * (1 - percentual);
}

calcularPrecoComDesconto(100, 0.1); // 90

// Mutação local não torna uma função automaticamente impura.
// A função abaixo modifica um array criado dentro dela,
// sem alterar os dados recebidos ou o estado externo.
function selecionarPositivos(numeros) {
    const positivos = [];

    for (const numero of numeros) {
        if (numero > 0) {
            positivos.push(numero);
        }
    }

    return positivos;
}

selecionarPositivos([-1, 0, 2, 3]); // [2, 3]

// RESUMO
// Reatribuição: substituir o valor armazenado em uma variável.
// Mutação: alterar um objeto existente.
// Referência compartilhada: acessar o mesmo objeto por variáveis diferentes.
// Cópia superficial: criar outra estrutura mantendo referências internas.
// Cópia profunda: copiar também estruturas internas compatíveis.
// Imutabilidade: impedir ou evitar mudanças no valor existente.

// CUIDADOS
// Verificar se uma operação modifica dados compartilhados.
// Não confundir const com imutabilidade.
// Não considerar spread ou map garantias de independência completa.
// Preferir atualizações explícitas quando preservar o original for importante.
// Usar mutação local quando ela simplificar o código sem afetar consumidores.
// Documentar quando uma função modificar os objetos recebidos.