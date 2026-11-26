// DESTRUCTURING
// Extrair valores de arrays ou propriedades de objetos para variáveis.

// DESTRUCTURING DE ARRAYS
// Associar variáveis pela posição dos elementos.
const linguagens = ["JavaScript", "SQL", "Python"];
const [primeira, segunda] = linguagens;
// primeira: "JavaScript"
// segunda: "SQL"

// IGNORAR POSIÇÕES
const [, , terceira] = linguagens;
// terceira: "Python"

// DEFINIR VALORES PADRÃO
// Aplicar o padrão somente quando o valor for undefined.
const [principal = "JavaScript", secundaria = "SQL"] = ["Python"];
// principal: "Python"
// secundaria: "SQL"

const [limite = 10] = [0];
// limite: 0

const [valor = "padrão"] = [null];
// valor: null

// TROCAR VALORES
let inicio = 10;
let fim = 20;

[inicio, fim] = [fim, inicio];
// inicio: 20
// fim: 10

// DESTRUCTURING DE OBJETOS
// Associar variáveis pelo nome das propriedades, independentemente da ordem.
const usuario = {
    id: 1,
    nome: "Pricila",
    ativo: true,
};

const { nome, ativo } = usuario;
// nome: "Pricila"
// ativo: true

// RENOMEAR VARIÁVEIS
const { id: usuarioId } = usuario;
// usuarioId: 1
// Criar usuarioId; não criar uma variável chamada id.

// COMBINAR RENOMEAÇÃO E VALOR PADRÃO
const { idioma: idiomaUsuario = "pt-BR" } = usuario;
// idiomaUsuario: "pt-BR"

// EXTRAIR PROPRIEDADES ANINHADAS
const cliente = {
    endereco: {
        cidade: "Rio de Janeiro",
    },
};

const {
    endereco: { cidade },
} = cliente;
// cidade: "Rio de Janeiro"
// Criar cidade; não criar uma variável chamada endereco.

// PROTEGER CONTRA PROPRIEDADE UNDEFINED
const {
    endereco: { bairro = "Não informado" } = {},
} = {};
// bairro: "Não informado"

// Considerar que = {} não protege contra endereco: null.
// Usar ?? para substituir null ou undefined antes da extração.
const resposta = { endereco: null };
const { cidade: cidadeRecebida = "Não informada" } = resposta.endereco ?? {};
// cidadeRecebida: "Não informada"

// EXTRAIR CHAVES DINÂMICAS
const campo = "nome";
const { [campo]: valorDoCampo } = usuario;
// valorDoCampo: "Pricila"

// REATRIBUIR VARIÁVEIS EXISTENTES
// Envolver a atribuição de objetos em parênteses para evitar ambiguidade com blocos.
let nomeAtual;

({ nome: nomeAtual } = usuario);
// nomeAtual: "Pricila"

// REST — REUNIR VALORES
// Usar ... para reunir os valores restantes em uma nova estrutura.

// REST EM ARRAYS
const [linguagemPrincipal, ...outrasLinguagens] = linguagens;
// linguagemPrincipal: "JavaScript"
// outrasLinguagens: ["SQL", "Python"]

// Posicionar rest por último na desestruturação.

// REST EM OBJETOS
const { id: idExtraido, ...dadosUsuario } = usuario;
// idExtraido: 1
// dadosUsuario: { nome: "Pricila", ativo: true }

// Reunir propriedades próprias enumeráveis que não foram extraídas.

// REMOVER UMA PROPRIEDADE SEM MODIFICAR O ORIGINAL
const credenciais = {
    nome: "Pricila",
    senha: "exemplo",
    ativo: true,
};

const { senha: senhaRemovida, ...usuarioPublico } = credenciais;
// usuarioPublico: { nome: "Pricila", ativo: true }
// Preservar senha no objeto original.

// REST EM PARÂMETROS
// Receber argumentos restantes como um array.
// Posicionar o parâmetro rest por último.
function somar(inicial, ...numeros) {
    return numeros.reduce((total, numero) => total + numero, inicial);
}

somar(10, 2, 3); // 15
somar(10); // 10