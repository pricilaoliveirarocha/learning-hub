// ARRAYS
// Organizar valores em uma sequência indexada a partir de zero.
// Preferir elementos com estrutura consistente.
const linguagens = ["JavaScript", "SQL", "Python"];

linguagens[0]; // "JavaScript"
linguagens[2]; // "Python"
linguagens[10]; // undefined
linguagens.length; // 3

// ACESSO E ALTERAÇÃO
// Usar at com índices negativos para acessar a partir do final.
linguagens.at(-1); // "Python"
linguagens.at(-2); // "SQL"

linguagens[1] = "TypeScript";
// ["JavaScript", "TypeScript", "Python"]

// CONST E MUTAÇÃO
// Permitir modificar o conteúdo sem reatribuir a variável.
const estudos = ["JavaScript"];

estudos.push("SQL");
// estudos = []; // Lançar TypeError ao tentar reatribuir.

// ADICIONAR E REMOVER
// Considerar que estes métodos modificam o array original.
const tarefas = ["Estudar"];

tarefas.push("Praticar"); // Adicionar ao final; retornar o tamanho: 2.
tarefas.unshift("Revisar"); // Adicionar ao início; retornar o tamanho: 3.
tarefas.pop(); // Remover e retornar o último elemento: "Praticar".
tarefas.shift(); // Remover e retornar o primeiro elemento: "Revisar".
// tarefas: ["Estudar"]

// Considerar o deslocamento de elementos ao usar shift e unshift.
// Retornar undefined ao usar pop ou shift em um array vazio.

// BUSCAR ELEMENTOS
const tecnologias = ["JavaScript", "SQL", "JavaScript"];

tecnologias.includes("SQL"); // true
tecnologias.indexOf("JavaScript"); // 0
tecnologias.lastIndexOf("JavaScript"); // 2
tecnologias.indexOf("Python"); // -1

// Evitar usar o resultado de indexOf diretamente como condição:
// 0 é falsy e -1 é truthy. Preferir includes para verificar existência.

// SLICE — COPIAR UM INTERVALO
// Preservar o original; incluir o início e excluir o final.
const numeros = [10, 20, 30, 40];

numeros.slice(1, 3); // [20, 30]
numeros.slice(-2); // [30, 40]
numeros.slice(); // [10, 20, 30, 40]: cópia superficial.

// SPLICE — MODIFICAR O ORIGINAL
// Usar splice(inicio, quantidadeParaRemover, ...itensParaInserir).
const letras = ["a", "b", "c", "d"];

const removidas = letras.splice(1, 2, "x");
// removidas: ["b", "c"]
// letras: ["a", "x", "d"]

letras.splice(1, 0, "y"); // Inserir sem remover.
// letras: ["a", "y", "x", "d"]

// CONCAT — COMBINAR ARRAYS
// Retornar um novo array sem modificar os originais.
const primeiraParte = [1, 2];
const segundaParte = [3, 4];

const combinados = primeiraParte.concat(segundaParte);
// [1, 2, 3, 4]

// JOIN — GERAR TEXTO
["JavaScript", "SQL"].join(", "); // "JavaScript, SQL"

// PERCORRER VALORES
// Preferir for...of quando precisar de break ou continue.
for (const linguagem of linguagens) {
    console.log(linguagem);
}

// PERCORRER ÍNDICES E VALORES
for (const [indice, linguagem] of linguagens.entries()) {
    console.log(indice, linguagem);
}

// PERCORRER COM CONTADOR
// Usar quando precisar controlar os índices explicitamente.
for (let i = 0; i < linguagens.length; i++) {
    console.log(linguagens[i]);
}

// REFERÊNCIAS
// Compartilhar o mesmo array ao atribuí-lo a outra variável.
const original = [1, 2];
const referencia = original;

referencia.push(3);
// original: [1, 2, 3]

original === referencia; // true
// [1, 2] === [1, 2]; false: comparar identidade, não conteúdo. Se remover o comentário, dará false

// CÓPIA SUPERFICIAL
// Criar outro array com spread ou slice.
const copia = [...original];

copia.push(4);
// original: [1, 2, 3]
// copia: [1, 2, 3, 4]

copia === original; // false

// Considerar que elementos que são objetos continuam compartilhados.
const usuarios = [{ id: 1, nome: "Pricila" }];
const copiaUsuarios = [...usuarios];

copiaUsuarios[0].nome = "Ana";
usuarios[0].nome; // "Ana"

// ARRAYS ESPARSOS
// Evitar delete: deixar uma posição vazia sem reduzir length.
const itens = ["a", "b", "c"];

// delete itens[1]; // Manter length em 3 e deixar uma posição vazia.
itens.splice(1, 1);
// itens: ["a", "c"]

// Evitar atribuir além do próximo índice: criar posições vazias.
const valores = [10];

valores[3] = 40;
valores.length; // 4
Object.hasOwn(valores, 1); // false: distinguir posição vazia de undefined.

// LENGTH
// Considerar que reduzir length remove elementos do final.
const fila = [1, 2, 3];

fila.length = 1;
// fila: [1]

// Evitar aumentar length para preencher valores: criar posições vazias.

// VERIFICAR ARRAYS
Array.isArray([]); // true
Array.isArray({}); // false
typeof []; // "object": usar Array.isArray para distinguir.

// ARRAY VAZIO
// Verificar length: arrays vazios são truthy.
const pendencias = [];

pendencias.length === 0; // true
Boolean(pendencias); // true

// CUIDADOS
// Distinguir métodos que modificam o original dos que retornam outro array.
// Considerar que cópias com spread, slice e concat são superficiais.
// Usar for...of para valores; evitar for...in para percorrer arrays.
// Não confundir posições vazias com elementos contendo undefined.
// Consultar métodos de transformação no tópico de manipulação de arrays.