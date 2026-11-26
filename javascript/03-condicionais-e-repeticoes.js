// CONDICIONAIS

// IF / ELSE IF / ELSE
// Executar apenas o primeiro bloco cuja condição for verdadeira.
const nota = 7;

if (nota >= 7) {
    console.log("Aprovado");
} else if (nota >= 5) {
    console.log("Recuperação");
} else {
    console.log("Reprovado");
}

// SWITCH
// Comparar os casos usando igualdade estrita.
// Usar break para impedir a execução dos casos seguintes.
const status = "pendente";

switch (status) {
    case "pendente":
        console.log("Aguardando pagamento");
        break;
    case "pago":
        console.log("Pagamento confirmado");
        break;
    default:
        console.log("Status desconhecido");
}

// TERNÁRIO
// Usar para escolher entre dois valores, evitando aninhamentos.
const idade = 20;
const acesso = idade >= 18 ? "Permitido" : "Negado";

// REPETIÇÕES

// FOR
// Usar para controlar inicialização, condição e atualização do contador.
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// WHILE
// Verificar a condição antes de executar; permitir zero execuções.
let tentativas = 0;

while (tentativas < 3) {
    tentativas++;
    console.log(tentativas);
}

// DO...WHILE
// Verificar a condição ao final; executar pelo menos uma vez.
let contador = 0;

do {
    console.log(contador);
    contador++;
} while (contador < 1);

// FOR...OF
// Percorrer valores de iteráveis, como arrays e strings.
const linguagens = ["JavaScript", "SQL"];

for (const linguagem of linguagens) {
    console.log(linguagem);
}

// FOR...IN
// Percorrer chaves de propriedades enumeráveis, incluindo as herdadas.
// Usar Object.hasOwn para considerar apenas propriedades do próprio objeto.
const usuario = { nome: "Pricila", ativo: true };

for (const chave in usuario) {
    if (Object.hasOwn(usuario, chave)) {
        console.log(chave, usuario[chave]);
    }
}

// BREAK E CONTINUE
for (let numero = 1; numero <= 5; numero++) {
    if (numero === 2) continue; // Pular o restante da iteração atual.
    if (numero === 4) break; // Encerrar o laço inteiro.

    console.log(numero);
}

// CUIDADOS
// Garantir que o laço possa terminar, evitando repetições infinitas.
// Usar === para comparar e = para atribuir.
// Preferir for...of para percorrer valores de arrays.