// TIPAGEM DINÂMICA
// Distinguir o tipo do valor da variável que o armazena.
// Permitir reatribuir valores de tipos diferentes ao usar let.
let valor = 10;
valor = "10";

typeof valor; // "string"

// CONVERSÃO EXPLÍCITA
// Converter intencionalmente para o tipo necessário.
Number("10"); // 10
String(10); // "10"
Boolean(0); // false
Boolean("false"); // true: string não vazia.

// COERÇÃO IMPLÍCITA
// Considerar o operador e os tipos dos operandos.
Number("10") + 5; // 15: converter explicitamente antes de somar.
10 + "5"; // "105": concatenar ao encontrar uma string.
"20" - 5; // 15: converter implicitamente para realizar a subtração.
10 - "texto"; // NaN: não conseguir obter um número válido.

// IGUALDADE
// Preferir === e !== para comparar sem coerção de tipos.
10 === "10"; // false
10 !== "10"; // true
10 == "10"; // true: permitir coerção.

// ORDEM DE AVALIAÇÃO
// Avaliar operadores + consecutivos da esquerda para a direita.
// Usar parênteses para alterar o agrupamento.
10 + 5 + "2"; // "152"
"2" + 10 + 5; // "2105"
"2" + (10 + 5); // "215"

// NaN — RESULTADO NUMÉRICO INVÁLIDO
// Distinguir um resultado NaN de uma exceção.
const resultado = Number("texto");

typeof resultado; // "number"
Number.isNaN(resultado); // true

// Usar Number.isNaN para verificar NaN; evitar comparação direta.
NaN === NaN; // false

// CUIDADOS
// Validar dados externos antes de utilizá-los em cálculos.
// Considerar que Number("") e Number(null) retornam 0.
// Evitar depender de coerções implícitas para expressar regras de negócio.