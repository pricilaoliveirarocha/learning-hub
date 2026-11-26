// EXPRESSÕES REGULARES — REGEX

// O QUE É REGEX?
// Uma expressão regular descreve um padrão de texto.
// Usar para buscar, validar, extrair, substituir ou separar partes de uma string.
// Em JavaScript, uma regex é um objeto RegExp.

// CRIAR UMA REGEX
// A sintaxe literal abaixo é adequada quando o padrão já é conhecido.
const padraoNumero = /\d+/;

// O construtor permite montar padrões dinamicamente.
// Como a string também interpreta escapes, duplicar a barra invertida.
const mesmoPadrao = new RegExp("\\d+");

// TEST — VERIFICAR UMA CORRESPONDÊNCIA
// test retorna true quando encontra o padrão em qualquer parte do texto.
padraoNumero.test("Pedido 123"); // true
padraoNumero.test("Sem números"); // false

// CORRESPONDÊNCIA PARCIAL E COMPLETA
// Sem âncoras, encontrar o padrão dentro de um texto maior.
/\d+/.test("abc123def"); // true

// Com ^ e $, exigir que o padrão cubra o texto inteiro neste exemplo.
/^\d+$/.test("123"); // true
/^\d+$/.test("abc123"); // false
/^\d+$/.test(""); // false

// CARACTERES LITERAIS
// A regex abaixo procura a sequência exata "JavaScript".
// Por padrão, diferenciar maiúsculas de minúsculas.
/JavaScript/.test("Estudar JavaScript"); // true
/JavaScript/.test("Estudar javascript"); // false

// FLAGS
// Flags modificam o comportamento da expressão.
//
// i: ignorar diferenças entre maiúsculas e minúsculas.
// g: buscar todas as ocorrências nos métodos que utilizam essa flag.
// m: permitir que ^ e $ representem início e fim de cada linha.
// s: permitir que o ponto também encontre quebras de linha.
// u: habilitar o modo Unicode.
// y: exigir correspondência exatamente na posição lastIndex.

const padraoLinguagem = /javascript/i;

padraoLinguagem.test("JavaScript"); // true

// CLASSES DE CARACTERES
// Uma classe entre colchetes corresponde a um caractere do conjunto.
/[aeiou]/.test("casa"); // true
/[0-9]/.test("Pedido 5"); // true
/[a-z]/.test("ABC"); // false
/[a-z]/i.test("ABC"); // true

// O ^ no início de uma classe nega o conjunto.
// Fora dos colchetes, ^ representa o início da entrada ou da linha.
/[^0-9]/.test("123"); // false
/[^0-9]/.test("123a"); // true

// CLASSES ABREVIADAS
// \d: dígito de 0 a 9.
// \D: caractere que não seja um dígito de 0 a 9.
// \w: letras básicas, dígitos e underscore; não representar todas as letras Unicode.
// \W: complemento de \w.
// \s: espaço em branco, incluindo tabulações e quebras de linha.
// \S: caractere que não seja espaço em branco.

/\d/.test("5"); // true
/\s/.test("duas palavras"); // true
/\w/.test("_"); // true

// QUANTIFICADORES
// Quantificadores determinam quantas vezes o elemento anterior pode aparecer.
//
// *: zero ou mais vezes.
// +: uma ou mais vezes.
// ?: zero ou uma vez.
// {n}: exatamente n vezes.
// {n,}: pelo menos n vezes.
// {n,m}: entre n e m vezes.

/^\d*$/.test(""); // true
/^\d+$/.test(""); // false
/^\d{4}$/.test("2026"); // true
/^\d{2,4}$/.test("123"); // true
/^https?:\/\//.test("https://example.com"); // true

// ÂNCORAS
// ^ representa o início; $ representa o fim.
// Sem m, aplicar essas âncoras aos limites da entrada.
// Com m, permitir correspondências nos limites de cada linha.

/^Erro/.test("Erro na consulta"); // true
/Erro$/.test("Consulta: Erro"); // true

/^Erro$/m.test("Início\nErro\nFim"); // true

// LIMITE DE PALAVRA
// \b identifica a transição entre um caractere de palavra e outro que não seja.
// Não tratar \b como um segmentador universal de palavras em todos os idiomas.
/\bJS\b/.test("Estudar JS hoje"); // true
/\bJS\b/.test("JSON"); // false

// PONTO E ESCAPE
// O ponto corresponde a um caractere, exceto terminadores de linha sem a flag s.
// Para procurar um ponto literal, usar \.
/a.b/.test("a-b"); // true
/a.b/.test("a\nb"); // false
/a.b/s.test("a\nb"); // true

/^\d+\.\d{2}$/.test("19.90"); // true
/^\d+\.\d{2}$/.test("19x90"); // false

// Escapar metacaracteres quando precisar procurá-los literalmente.
// Exemplos: . * + ? ^ $ { } ( ) | [ ] \

/\(JavaScript\)/.test("(JavaScript)"); // true

// ALTERNÂNCIA
// O operador | permite escolher entre padrões.
// Agrupar as alternativas para aplicar âncoras ao conjunto inteiro.
/^(pix|cartao|boleto)$/.test("pix"); // true
/^(pix|cartao|boleto)$/.test("pix-extra"); // false

// GRUPOS DE CAPTURA
// Os parênteses abaixo capturam partes do texto para uso posterior.
// exec retorna null quando não encontra uma correspondência.
const padraoData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const correspondencia = padraoData.exec("26/11/2026");

if (correspondencia !== null) {
    const [dataCompleta, dia, mes, ano] = correspondencia;
    // dataCompleta: "26/11/2026"
    // dia: "26"
    // mes: "11"
    // ano: "2026"
}

// Esse padrão verifica o formato, mas aceita datas impossíveis como 99/99/2026.
// Validar regras de calendário separadamente.

// GRUPOS NOMEADOS
// Grupos nomeados tornam a extração menos dependente da posição das capturas.
const dataNomeada = /^(?<ano>\d{4})-(?<mes>\d{2})-(?<dia>\d{2})$/;
const resultadoData = dataNomeada.exec("2026-11-26");

resultadoData?.groups.ano; // "2026"
resultadoData?.groups.mes; // "11"
resultadoData?.groups.dia; // "26"

// GRUPOS SEM CAPTURA
// Usar (?:...) para agrupar sem criar uma captura.
const padraoExtensao = /\.(?:jpg|png|webp)$/i;

padraoExtensao.test("capa.PNG"); // true

// MATCH
// Sem g, match retorna a primeira correspondência e suas capturas.
// Com g, retorna as correspondências completas, sem os grupos individuais.
const textoPedidos = "Pedidos 10, 20 e 30";

textoPedidos.match(/\d+/g); // ["10", "20", "30"]
"Sem pedidos".match(/\d+/g); // null

// MATCHALL
// matchAll permite percorrer todas as correspondências preservando os grupos.
// Ao receber uma regex, exigir a flag g.
const registros = "id=10; id=20";

for (const resultado of registros.matchAll(/id=(\d+)/g)) {
    console.log(resultado[1]); // "10", depois "20".
}

// REPLACE
// A substituição abaixo altera somente a primeira ocorrência, pois não usa g.
"JS e JS".replace(/JS/, "JavaScript");
// "JavaScript e JS"

// Com g, substituir todas as ocorrências.
"JS e JS".replace(/JS/g, "JavaScript");
// "JavaScript e JavaScript"

// USAR CAPTURAS NA SUBSTITUIÇÃO
// $1, $2 e $3 representam os grupos capturados.
"2026-11-26".replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3/$2/$1");
// "26/11/2026"

// USAR FUNÇÃO NA SUBSTITUIÇÃO
// O callback abaixo transforma cada número encontrado.
"Valores: 10 e 20".replace(/\d+/g, (numero) => {
    return String(Number(numero) * 2);
});
// "Valores: 20 e 40"

// SPLIT
// A expressão abaixo separa o texto por vírgulas, ponto e vírgula ou espaços.
"JavaScript,SQL;AWS Docker".split(/[,;\s]+/);
// ["JavaScript", "SQL", "AWS", "Docker"]

// QUANTIFICADORES GULOSOS E PREGUIÇOSOS
// Quantificadores são gulosos por padrão: tentar consumir o máximo possível.
// Acrescentar ? após o quantificador para tentar consumir o mínimo necessário.
const marcacoes = "<b>JS</b><b>SQL</b>";

marcacoes.match(/<b>.*<\/b>/g);
// ["<b>JS</b><b>SQL</b>"]

marcacoes.match(/<b>.*?<\/b>/g);
// ["<b>JS</b>", "<b>SQL</b>"]

// Esses exemplos demonstram quantificadores.
// Para interpretar HTML, usar um parser, como DOMParser no navegador.

// REFERÊNCIAS A GRUPOS
// \1 exige repetir o conteúdo encontrado pelo primeiro grupo.
const palavraRepetida = /\b(\w+)\s+\1\b/i;

palavraRepetida.test("Estudar estudar"); // true
palavraRepetida.test("Estudar praticar"); // false

// LOOKAHEAD
// Lookahead verifica o que vem depois sem consumir essa parte do texto.
"Preço: 100 reais".match(/\d+(?= reais)/)?.[0]; // "100"

// O exemplo abaixo exige que "Java" não seja seguido imediatamente por "Script".
/Java(?!Script)/.test("Java"); // true
/Java(?!Script)/.test("JavaScript"); // false

// UNICODE
// \p{L} representa letras Unicode quando usado com u.
// \p{N} representa caracteres numéricos Unicode.
/^\p{L}+$/u.test("João"); // true
/^\p{L}+$/u.test("Ação"); // true

// Este exemplo aceita apenas letras, sem espaços ou pontuação.
// Nomes reais podem exigir espaços, hífens, apóstrofos e marcas combinantes.

// NORMALIZAÇÃO
// Textos visualmente iguais podem ter representações Unicode diferentes.
// normalize("NFC") padroniza representações canonicamente equivalentes.
const palavraNormalizada = "Ac\u0327a\u0303o".normalize("NFC");

palavraNormalizada === "Ação"; // true

// ESTADO COM G E Y
// Uma regex com g ou y mantém uma posição de busca na propriedade lastIndex.
// Reutilizá-la com test pode produzir resultados diferentes entre chamadas.
const regexGlobal = /\d/g;

regexGlobal.test("1"); // true; lastIndex passa a ser 1.
regexGlobal.test("1"); // false; a busca começa após o dígito e lastIndex volta a 0.

// Para verificar existência repetidamente, preferir uma regex sem g ou y.
const possuiDigito = /\d/;

possuiDigito.test("1"); // true
possuiDigito.test("1"); // true

// EXEMPLO PRÁTICO — FORMATO DE CEP
// A função abaixo verifica somente o formato, sem confirmar se o CEP existe.
function possuiFormatoCep(cep) {
    return typeof cep === "string" && /^\d{5}-?\d{3}$/.test(cep);
}

possuiFormatoCep("20000-000"); // true
possuiFormatoCep("20000000"); // true

// EXEMPLO PRÁTICO — EXTRAIR DÍGITOS
// A função abaixo remove caracteres que não sejam dígitos ASCII.
// Ela normaliza a apresentação, mas não valida o dado resultante.
function extrairDigitos(texto) {
    return texto.replace(/\D/g, "");
}

extrairDigitos("(21) 99999-9999"); // "21999999999"

// EXEMPLO PRÁTICO — SENHA
// A função abaixo combina tamanho com verificações separadas.
// Essa organização facilita entender e alterar cada requisito.
function atendeRequisitosSenha(senha) {
    if (typeof senha !== "string") {
        return false;
    }

    return (
        senha.length >= 12 &&
        /[a-z]/.test(senha) &&
        /[A-Z]/.test(senha) &&
        /\d/.test(senha)
    );
}

// Esse exemplo verifica requisitos específicos, não a segurança completa da senha.
// Evitar considerar regras de composição uma garantia contra senhas previsíveis.

// QUANDO NÃO USAR REGEX
// Para procurar texto literal, includes pode expressar melhor a intenção.
// Para verificar prefixos e sufixos, considerar startsWith e endsWith.
// Para interpretar URLs, JSON e HTML, preferir os parsers correspondentes.

// SEGURANÇA E DESEMPENHO
// Alguns padrões causam excesso de tentativas em entradas específicas.
// Esse comportamento pode bloquear a execução e causar ReDoS.
// ReDoS significa negação de serviço por expressão regular.

// Evitar quantificadores aninhados e alternativas ambíguas,
// especialmente em padrões como /^(a+)+$/ aplicados a entradas externas.
// Limitar o tamanho das entradas e analisar padrões usados em validações.
// Não inserir texto externo diretamente em new RegExp como se fosse literal:
// caracteres especiais desse texto podem alterar o padrão.

// CUIDADOS
// Definir se a busca deve ser parcial ou cobrir o texto inteiro.
// Diferenciar validar formato de validar significado.
// Considerar maiúsculas, acentos, quebras de linha e entradas vazias.
// Evitar padrões complexos quando verificações menores forem mais claras.
// Verificar lastIndex ao reutilizar regex com g ou y.
// Não usar regex como substituto de validação de regras de negócio.