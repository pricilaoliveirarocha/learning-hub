// MÓDULOS E IMPORT/EXPORT
// Separar responsabilidades em arquivos com escopo próprio.
// Usar export para disponibilizar valores e import para acessá-los.
// Separar os exemplos nos arquivos indicados antes de executar.

// EXPORTAÇÃO NOMEADA
// Arquivo: calculos.js
// Permitir múltiplas exportações nomeadas por módulo.
export const TAXA = 0.1;

export function somar(a, b) {
    return a + b;
}

export function subtrair(a, b) {
    return a - b;
}

// IMPORTAÇÃO NOMEADA
// Arquivo: app.js
// Usar chaves e os nomes definidos na exportação.
import { somar, subtrair, TAXA } from "./calculos.js";

somar(10, 5); // 15
subtrair(10, 5); // 5

// RENOMEAR NA IMPORTAÇÃO
// Arquivo: exemplo-alias.js
// Usar as para definir outro nome local.
import { somar as adicionar } from "./calculos.js";

adicionar(2, 3); // 5

// EXPORTAR DECLARAÇÕES EXISTENTES
// Arquivo: mensagens.js
const SUCESSO = "Operação concluída";
const ERRO = "Falha na operação";

export { SUCESSO, ERRO };

// EXPORTAÇÃO PADRÃO
// Arquivo: validarEmail.js
// Permitir apenas uma exportação default por módulo.
export default function validarEmail(email) {
    return typeof email === "string" && email.includes("@");
}
// Considerar este exemplo uma verificação simplificada, sem validação completa.

// IMPORTAÇÃO PADRÃO
// Arquivo: exemplo-default.js
// Importar sem chaves e escolher o nome local.
import verificarEmail from "./validarEmail.js";

verificarEmail("pricila@example.com"); // true

// DIFERENÇA ENTRE NOMEADA E PADRÃO
// Nomeada: importar com chaves e respeitar o nome, ou renomear com as.
// Padrão: importar sem chaves e escolher o nome livremente.

// COMBINAR EXPORTAÇÕES
// Arquivo: desconto.js
export const DESCONTO_PADRAO = 0.1;

export default function aplicarDesconto(preco, taxa = DESCONTO_PADRAO) {
    return preco * (1 - taxa);
}

// Arquivo: exemplo-desconto.js
import aplicarDesconto, { DESCONTO_PADRAO } from "./desconto.js";

aplicarDesconto(100); // 90

// IMPORTAR COMO NAMESPACE
// Arquivo: exemplo-namespace.js
// Agrupar as exportações do módulo em um namespace.
import * as calculos from "./calculos.js";

calculos.somar(10, 5); // 15
calculos.TAXA; // 0.1

// ESCOPO DO MÓDULO
// Arquivo: configuracao.js
// Manter privadas ao módulo as declarações não exportadas.
const ambiente = "desenvolvimento";

export function obterAmbiente() {
    return ambiente;
}

// Não acessar ambiente diretamente por outro módulo.
// Executar ES Modules em modo estrito automaticamente.

// LIVE BINDINGS
// Arquivo: contador.js
// Expor uma ligação com a variável, permitindo observar suas atualizações.
export let contador = 0;

export function incrementar() {
    contador++;
}

// Arquivo: exemplo-contador.js
import { contador, incrementar } from "./contador.js";

incrementar();
console.log(contador); // 1

// contador = 10; // Não permitir reatribuir uma variável importada.
// Distinguir essa restrição de imutabilidade: objetos importados podem ser mutáveis.

// IMPORTAÇÃO ESTÁTICA
// Declarar import no nível superior, fora de funções e condicionais.
// Usar um especificador textual, como "./calculos.js".
// Avaliar dependências antes do corpo do módulo consumidor.
// Não depender da posição textual do import para controlar a execução.

// IMPORTAÇÃO DINÂMICA
// Arquivo: exemplo-dinamico.js
// Usar import() dentro de funções ou condicionais.
// Receber uma Promise que resolve para o namespace do módulo.
async function calcularSobDemanda(a, b) {
    const { somar } = await import("./calculos.js");
    return somar(a, b);
}

// ACESSAR DEFAULT COM IMPORTAÇÃO DINÂMICA
async function verificarSobDemanda(email) {
    const { default: validarEmail } = await import("./validarEmail.js");
    return validarEmail(email);
}

// Propagar as falhas ao chamador ou tratá-las com try/catch.
// Não presumir que cada import() executará o módulo novamente.

// REEXPORTAÇÃO
// Arquivo: index.js
// Expor funcionalidades de outros módulos por um ponto de entrada.
export { somar, subtrair } from "./calculos.js";
export { default as validarEmail } from "./validarEmail.js";

// Arquivo: exemplo-reexportacao.js
import { somar, validarEmail } from "./index.js";

// Considerar que reexportar não cria uma variável local no index.js.
// Usar export * para reexportar nomes, sem incluir default.
// Evitar pontos de entrada que introduzam dependências circulares.

// IMPORTAÇÃO POR EFEITO COLATERAL
// Arquivo: inicializacao.js
console.log("Inicialização executada");

// Arquivo: exemplo-inicializacao.js
import "./inicializacao.js";

// Executar o módulo sem importar valores.
// Evitar inicializações desnecessárias ao importar utilitários.

// ESTADO COMPARTILHADO
// Reutilizar a mesma instância para a mesma identidade de módulo
// dentro do mesmo ambiente de execução.
// Considerar o compartilhamento de estado mutável entre consumidores.

// CAMINHOS
// "./arquivo.js": procurar no diretório atual.
// "../arquivo.js": procurar no diretório acima.
// "biblioteca": resolver conforme o ambiente ou a ferramenta utilizada.
// Não presumir que o navegador resolva nomes de pacotes sem configuração.

// NAVEGADOR
// Carregar o ponto de entrada com:
// <script type="module" src="./app.js"></script>
// Usar um servidor HTTP local durante o desenvolvimento.

// NODE.JS
// Definir "type": "module" no package.json para explicitar ESM em arquivos .js.
// Usar .mjs como alternativa para identificar um arquivo ESM.
// Incluir extensões nas importações relativas: "./calculos.js".
// Usar .cjs para identificar arquivos CommonJS.

// COMMONJS — RECONHECER EM CÓDIGO EXISTENTE
// Usar require e module.exports em módulos CommonJS.
// Separar este exemplo dos arquivos ESM.

// Arquivo: calculos.cjs
// function somar(a, b) {
//     return a + b;
// }
// module.exports = { somar };

// Arquivo: app.cjs
// const { somar } = require("./calculos.cjs");

// CUIDADOS
// Exportar apenas o necessário para os consumidores.
// Distinguir exportação nomeada de exportação default.
// Evitar dependências circulares e estado compartilhado desnecessário.
// Manter segredos fora dos módulos enviados ao navegador.
// Não concatenar os exemplos em um único arquivo executável.