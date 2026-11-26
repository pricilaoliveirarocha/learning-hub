// VARIÁVEIS
// Preferir const; usar let quando houver reatribuição.
// Considerar o escopo de bloco de const/let e o escopo de função de var.

const nome = "Pricila";
let idade = 25;
idade = 26;

// REATRIBUIÇÃO E MUTAÇÃO
// Distinguir reatribuir a variável de modificar o objeto referenciado.
const usuario = { nome: "Pricila" };
usuario.nome = "Ana"; // Permitir mutação com const.
// usuario = {}; // Lançar TypeError ao tentar reatribuir.

const estudos = ["JavaScript"];
estudos.push("SQL"); // Modificar o array sem reatribuir a variável.

// TIPOS PRIMITIVOS
const linguagem = "JavaScript"; // string
const nota = 9.5; // number
const aprovado = true; // boolean
let resultado; // undefined
const selecionado = null; // null
const inteiroGrande = 123n; // bigint
const identificador = Symbol("id"); // symbol

// OBJETOS
// Considerar arrays como objetos e funções como objetos chamáveis.
const tarefas = ["Estudar", "Praticar"];

// CONSULTA DE TIPOS
typeof linguagem; // "string"
typeof nota; // "number"
typeof resultado; // "undefined"
typeof null; // "object": considerar essa peculiaridade histórica.
Array.isArray(tarefas); // true

// OPERADORES ARITMÉTICOS
10 + 3; // 13
10 - 3; // 7
10 * 3; // 30
10 / 2; // 5
10 % 3; // 1: resto da divisão.
2 ** 3; // 8: exponenciação.

// ATRIBUIÇÃO
let pontos = 10;
pontos += 5; // 15
pontos -= 2; // 13
pontos++; // Atualizar pontos para 14.

// COMPARAÇÃO
// Preferir === e !== para comparar sem coerção de tipos.
10 === "10"; // false
10 !== "10"; // true
10 == "10"; // true
10 > 5; // true
10 >= 10; // true
5 < 10; // true
5 <= 5; // true

// OPERADORES LÓGICOS
true && false; // false
true || false; // true
!true; // false

// CURTO-CIRCUITO
// &&: retornar o primeiro operando falsy ou o último, se todos forem truthy.
// ||: retornar o primeiro operando truthy ou o último, se todos forem falsy.
// Avaliar o próximo operando somente quando necessário.
"ativo" && 10; // 10
"" && 10; // ""
"ativo" || 10; // "ativo"

// TRUTHY E FALSY
// Considerar false, 0, -0, 0n, "", null, undefined e NaN como falsy.
// Considerar objetos e arrays, inclusive {} e [], como truthy.

// VALOR PADRÃO
// Usar || para substituir valores falsy.
// Usar ?? para substituir apenas null ou undefined.
0 || 10; // 10
0 ?? 10; // 0
null ?? 10; // 10

// OPERADOR TERNÁRIO
// Usar condição ? valor se verdadeiro : valor se falso.
const status = idade >= 18 ? "Maior de idade" : "Menor de idade";

// PRECEDÊNCIA
// Usar parênteses para controlar o agrupamento das operações.
2 + 3 * 4; // 14
(2 + 3) * 4; // 20