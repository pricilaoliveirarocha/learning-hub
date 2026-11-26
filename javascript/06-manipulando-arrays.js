// MANIPULAÇÃO DE ARRAYS
// Escolher o método conforme o resultado necessário.
// Distinguir criar outro array de modificar o original.

const produtos = [
    { id: 1, nome: "Teclado", preco: 150, ativo: true },
    { id: 2, nome: "Mouse", preco: 80, ativo: false },
    { id: 3, nome: "Monitor", preco: 900, ativo: true },
];

// CALLBACKS
// Receber elemento, índice e array original nos métodos abaixo.
// Informar somente os parâmetros necessários.
const descricoes = produtos.map((produto, indice) => {
    return `${indice + 1}. ${produto.nome}`;
});
// ["1. Teclado", "2. Mouse", "3. Monitor"]

// MAP — TRANSFORMAR CADA ELEMENTO
// Retornar um novo array com o mesmo tamanho em arrays sem posições vazias.
// Não modificar o original dentro do callback.
const nomes = produtos.map((produto) => produto.nome);
// ["Teclado", "Mouse", "Monitor"]

const produtosComDesconto = produtos.map((produto) => ({
    ...produto,
    preco: produto.preco * 0.9,
}));
// Criar outro array e um novo objeto para cada produto.
// Manter os preços dos objetos originais.

// FILTER — SELECIONAR ELEMENTOS
// Retornar um novo array com os elementos cujo callback retornar um valor truthy.
const ativos = produtos.filter((produto) => produto.ativo);
// [Teclado, Monitor]

const acessiveis = produtos.filter((produto) => produto.preco <= 150);
// [Teclado, Mouse]

// Considerar que filter mantém as referências dos objetos selecionados.
ativos[0] === produtos[0]; // true

// FIND — BUSCAR O PRIMEIRO ELEMENTO
// Retornar o primeiro elemento correspondente ou undefined.
// Interromper a busca ao encontrar uma correspondência.
const mouse = produtos.find((produto) => produto.id === 2);
// { id: 2, nome: "Mouse", preco: 80, ativo: false }

produtos.find((produto) => produto.id === 99); // undefined

// FINDINDEX — BUSCAR O PRIMEIRO ÍNDICE
// Retornar o índice correspondente ou -1.
produtos.findIndex((produto) => produto.id === 2); // 1
produtos.findIndex((produto) => produto.id === 99); // -1

// FINDLAST — BUSCAR A PARTIR DO FINAL
produtos.findLast((produto) => produto.ativo);
// { id: 3, nome: "Monitor", preco: 900, ativo: true }

produtos.findLastIndex((produto) => produto.ativo); // 2

// SOME — VERIFICAR SE ALGUM ELEMENTO ATENDE
// Retornar true ao encontrar a primeira correspondência.
produtos.some((produto) => produto.preco > 500); // true
[].some(() => true); // false

// EVERY — VERIFICAR SE TODOS ATENDEM
// Retornar false ao encontrar o primeiro elemento que não atender.
produtos.every((produto) => produto.ativo); // false
[].every(() => false); // true

// Considerar o caso vazio ao validar uma coleção obrigatória.
const todosAtivos =
    produtos.length > 0 && produtos.every((produto) => produto.ativo);

// INCLUDES — VERIFICAR A EXISTÊNCIA DE UM VALOR
const tecnologias = ["JavaScript", "SQL"];

tecnologias.includes("SQL"); // true
[NaN].includes(NaN); // true

// Comparar objetos por referência; usar some ou find para buscar por propriedades.
produtos.includes({ id: 1 }); // false
produtos.some((produto) => produto.id === 1); // true

// FOREACH — EXECUTAR EFEITOS COLATERAIS
// Retornar undefined; evitar usar para transformar dados.
produtos.forEach((produto) => {
    console.log(produto.nome);
});

// Não permitir break ou continue.
// Usar return apenas para encerrar o callback da iteração atual.
// Preferir for...of quando precisar interromper o laço.

// REDUCE — ACUMULAR UM RESULTADO
// Receber acumulador e elemento atual.
// Retornar o próximo acumulador em cada iteração.
// Fornecer um valor inicial para tratar arrays vazios com segurança.
const total = produtos.reduce((acumulador, produto) => {
    return acumulador + produto.preco;
}, 0);
// 1130

// Sem valor inicial, usar o primeiro elemento como acumulador.
// Lançar TypeError ao reduzir um array vazio sem valor inicial.

// AGRUPAR COM REDUCE
// Modificar apenas o acumulador criado para esta operação.
const produtosPorStatus = produtos.reduce((grupos, produto) => {
    const status = produto.ativo ? "ativos" : "inativos";
    grupos[status].push(produto);
    return grupos;
}, { ativos: [], inativos: [] });
// { ativos: [Teclado, Monitor], inativos: [Mouse] }

// ORDENAÇÃO
// Considerar que sort modifica o array original.
// Sem comparador, ordenar pela representação textual dos elementos.
const numeros = [10, 2, 30];

numeros.sort();
// [10, 2, 30]: não aplicar ordenação numérica.

// Fornecer um comparador para ordenar números.
numeros.sort((a, b) => a - b);
// [2, 10, 30]

numeros.sort((a, b) => b - a);
// [30, 10, 2]

// Interpretar o retorno do comparador:
// negativo: posicionar a antes de b.
// positivo: posicionar a depois de b.
// zero: preservar a ordem relativa entre os elementos comparados.

// TOSORTED — ORDENAR SEM MODIFICAR O ORIGINAL
const porPreco = produtos.toSorted((a, b) => a.preco - b.preco);
// [Mouse, Teclado, Monitor]

// Usar localeCompare para ordenar textos conforme regras de idioma.
const porNome = produtos.toSorted((a, b) => {
    return a.nome.localeCompare(b.nome, "pt-BR");
});
// [Monitor, Mouse, Teclado]

// REVERSE E TOREVERSED
const sequencia = [1, 2, 3];
const invertida = sequencia.toReversed();
// invertida: [3, 2, 1]
// sequencia: [1, 2, 3]

sequencia.reverse();
// Modificar sequencia para [3, 2, 1].

// FLAT — REDUZIR NÍVEIS DE ANINHAMENTO
const aninhados = [1, [2, [3]]];

aninhados.flat(); // [1, 2, [3]]: remover um nível por padrão.
aninhados.flat(2); // [1, 2, 3]
aninhados.flat(Infinity); // Remover todos os níveis de arrays aninhados.

// FLATMAP — TRANSFORMAR E ACHATAR UM NÍVEL
const frases = ["Estudar JavaScript", "Praticar SQL"];

const palavras = frases.flatMap((frase) => frase.split(" "));
// ["Estudar", "JavaScript", "Praticar", "SQL"]

// ENCADEAR MÉTODOS
// Considerar a criação de arrays intermediários.
const nomesAtivosPorPreco = produtos
    .filter((produto) => produto.ativo)
    .toSorted((a, b) => a.preco - b.preco)
    .map((produto) => produto.nome);
// ["Teclado", "Monitor"]

// ATUALIZAR UM ELEMENTO SEM MODIFICAR O ORIGINAL
const atualizados = produtos.map((produto) =>
    produto.id === 2 ? { ...produto, ativo: true } : produto
);
// Criar outro objeto apenas para o produto alterado.
// Compartilhar as referências dos demais produtos.

// REMOVER UM ELEMENTO SEM MODIFICAR O ORIGINAL
const semMouse = produtos.filter((produto) => produto.id !== 2);

// REMOVER DUPLICATAS DE VALORES PRIMITIVOS
const repetidos = ["JavaScript", "SQL", "JavaScript"];
const unicos = [...new Set(repetidos)];
// ["JavaScript", "SQL"]

// Considerar que Set distingue objetos por referência, não por conteúdo.

// CUIDADOS
// Usar map para transformar e forEach para efeitos colaterais.
// Usar find para obter um elemento e filter para obter todas as correspondências.
// Usar some para verificar existência sem criar um array filtrado.
// Fornecer um valor inicial ao reduce.
// Considerar que novos arrays podem compartilhar objetos com o original.
// Evitar modificar a coleção durante a iteração.
// Não esperar callbacks async com forEach.
// Usar Promise.all com map para aguardar operações assíncronas em conjunto.
// Priorizar clareza; usar for...of quando expressar melhor a operação.