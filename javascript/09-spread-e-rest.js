// SPREAD E REST
// Usar a mesma sintaxe (...) com finalidades diferentes:
// spread: expandir elementos ou propriedades.
// rest: reunir elementos, propriedades ou argumentos restantes.

// SPREAD EM ARRAYS
// Expandir os elementos de um iterável em outro array.
const frontend = ["HTML", "CSS"];
const backend = ["JavaScript", "SQL"];

const stack = [...frontend, ...backend];
// ["HTML", "CSS", "JavaScript", "SQL"]

// ADICIONAR ELEMENTOS SEM MODIFICAR O ORIGINAL
const estudos = ["JavaScript"];
const estudosAtualizados = ["Git", ...estudos, "SQL"];
// ["Git", "JavaScript", "SQL"]

// COPIAR ARRAYS
// Criar outro array, mantendo uma cópia superficial dos elementos.
const numeros = [10, 20, 30];
const copiaNumeros = [...numeros];

copiaNumeros === numeros; // false

// SPREAD EM CHAMADAS DE FUNÇÃO
// Expandir elementos de um iterável como argumentos.
function somar(a, b, c) {
    return a + b + c;
}

somar(...numeros); // 60
Math.max(...numeros); // 30

// Evitar expandir coleções muito grandes em chamadas:
// considerar o limite de argumentos do ambiente.

// SPREAD EM OBJETOS
// Copiar propriedades próprias enumeráveis para outro objeto.
const usuario = {
    nome: "Pricila",
    ativo: true,
};

const copiaUsuario = { ...usuario };

copiaUsuario === usuario; // false

// COMBINAR OBJETOS
// Considerar que propriedades posteriores sobrescrevem as anteriores.
const padrao = {
    tema: "claro",
    idioma: "pt-BR",
};

const preferencias = {
    tema: "escuro",
};

const configuracao = { ...padrao, ...preferencias };
// { tema: "escuro", idioma: "pt-BR" }

const configuracaoInvertida = { ...preferencias, ...padrao };
// { tema: "claro", idioma: "pt-BR" }

// ATUALIZAR SEM MODIFICAR O ORIGINAL
const usuarioAtualizado = {
    ...usuario,
    ativo: false,
};
// usuario.ativo: true
// usuarioAtualizado.ativo: false

// CÓPIA SUPERFICIAL
// Considerar que objetos internos continuam compartilhados.
const original = {
    endereco: {
        cidade: "Rio de Janeiro",
    },
};

const copia = { ...original };

copia.endereco === original.endereco; // true

copia.endereco.cidade = "Niterói";
original.endereco.cidade; // "Niterói"

// Copiar cada nível que precisar de alteração independente.
const atualizado = {
    ...original,
    endereco: {
        ...original.endereco,
        cidade: "Petrópolis",
    },
};

original.endereco.cidade; // "Niterói"
atualizado.endereco.cidade; // "Petrópolis"

// REST EM ARRAYS
// Reunir os elementos restantes em um novo array.
const linguagens = ["JavaScript", "SQL", "Python"];
const [principal, ...outras] = linguagens;
// principal: "JavaScript"
// outras: ["SQL", "Python"]

// Receber um array vazio quando não houver elementos restantes.
const [unica, ...restantes] = ["JavaScript"];
// restantes: []

// REST EM OBJETOS
// Reunir propriedades próprias enumeráveis que não foram extraídas.
const perfil = {
    id: 1,
    nome: "Pricila",
    ativo: true,
};

const { id, ...dados } = perfil;
// id: 1
// dados: { nome: "Pricila", ativo: true }

// REMOVER UMA PROPRIEDADE SEM MODIFICAR O ORIGINAL
const credenciais = {
    nome: "Pricila",
    senha: "exemplo",
};

const { senha: senhaRemovida, ...perfilPublico } = credenciais;
// perfilPublico: { nome: "Pricila" }
// Preservar senha em credenciais.

// REST EM PARÂMETROS
// Receber uma quantidade variável de argumentos como um array.
function somarTodos(...valores) {
    return valores.reduce((total, valor) => total + valor, 0);
}

somarTodos(10, 20, 30); // 60
somarTodos(); // 0

// COMBINAR PARÂMETROS FIXOS E REST
function calcularTotal(valorInicial, ...valores) {
    return valores.reduce((total, valor) => total + valor, valorInicial);
}

calcularTotal(100, 10, 20); // 130

// Posicionar rest por último e não atribuir um valor padrão a ele.
// function exemplo(...valores, ultimo) {} // Gerar erro de sintaxe.

// COMBINAR REST E SPREAD
const valores = [5, 10, 15];

somarTodos(...valores); // 30
// Expandir valores na chamada com spread.
// Reunir os argumentos dentro da função com rest.

// ITERÁVEIS E OBJETOS
// Exigir um iterável no spread de arrays e chamadas de função.
const letras = [..."JS"];
// ["J", "S"]

// [...{ nome: "Pricila" }]; // Lançar TypeError: objeto comum não é iterável.

// No spread de objetos, copiar propriedades sem exigir um iterável.
const propriedades = { ...["a", "b"] };
// { "0": "a", "1": "b" }

// CUIDADOS
// Distinguir expandir com spread de reunir com rest.
// Considerar cópias superficiais tanto em spread quanto em rest.
// Não presumir mesclagem recursiva de objetos.
// Verificar a ordem ao combinar propriedades.
// Não considerar spread de objetos uma cópia de protótipos ou descritores.