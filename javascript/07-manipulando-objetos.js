// MANIPULAÇÃO DE OBJETOS
// Acessar, transformar, combinar e remover propriedades.
// Considerar referências compartilhadas ao criar cópias.

const usuario = {
    id: 1,
    nome: "Pricila",
    email: "pricila@example.com",
    ativo: true,
};

// ACESSAR E ALTERAR
usuario.nome; // "Pricila"

const campo = "ativo";
usuario[campo] = false;

// ADICIONAR E REMOVER
usuario.nivel = "junior";
delete usuario.email;

// VERIFICAR PROPRIEDADES
// Usar Object.hasOwn para verificar propriedades do próprio objeto.
// Não depender de truthiness: false, 0 e "" podem ser valores válidos.
Object.hasOwn(usuario, "ativo"); // true
Object.hasOwn(usuario, "email"); // false

// EXTRAIR PROPRIEDADES
// Usar destructuring para criar variáveis a partir das propriedades.
const { nome, ativo } = usuario;
// nome: "Pricila"
// ativo: false

// RENOMEAR NA EXTRAÇÃO
const { id: usuarioId } = usuario;
// usuarioId: 1

// DEFINIR VALORES PADRÃO
// Aplicar o padrão apenas quando o valor for undefined ou estiver ausente.
const { idioma = "pt-BR" } = usuario;
// idioma: "pt-BR"

// Não substituir null, false, 0 ou "" com padrões de destructuring.
const { limite = 10 } = { limite: 0 };
// limite: 0

// EXTRAIR PROPRIEDADES ANINHADAS
const cliente = {
    nome: "Ana",
    endereco: {
        cidade: "Rio de Janeiro",
    },
};

const {
    endereco: { cidade },
} = cliente;
// cidade: "Rio de Janeiro"

// Considerar que extrair de null ou undefined lança TypeError.
// Usar acesso opcional quando a estrutura puder estar ausente.
const estado = cliente.endereco?.estado ?? "Não informado";

// COPIAR SEM MODIFICAR O ORIGINAL
// Usar spread para copiar propriedades próprias enumeráveis.
const copia = { ...usuario };

copia.nome = "Ana";
usuario.nome; // "Pricila"

// COMBINAR OBJETOS
// Considerar que propriedades posteriores sobrescrevem as anteriores.
const padrao = {
    tema: "claro",
    idioma: "pt-BR",
    notificacoes: true,
};

const preferencias = {
    tema: "escuro",
};

const configuracao = { ...padrao, ...preferencias };
// { tema: "escuro", idioma: "pt-BR", notificacoes: true }

// ATUALIZAR SEM MODIFICAR O ORIGINAL
const atualizado = {
    ...usuario,
    ativo: true,
    nivel: "pleno",
};

// REMOVER SEM MODIFICAR O ORIGINAL
// Extrair a propriedade descartada e reunir as demais com rest.
const { nivel: nivelRemovido, ...semNivel } = usuario;
// Preservar nivel no objeto original.

// ATUALIZAR PROPRIEDADES ANINHADAS
// Copiar cada nível que precisar de alteração.
const clienteAtualizado = {
    ...cliente,
    endereco: {
        ...cliente.endereco,
        cidade: "Niterói",
    },
};

cliente.endereco.cidade; // "Rio de Janeiro"
clienteAtualizado.endereco.cidade; // "Niterói"

// Considerar que spread combina apenas o primeiro nível.
// Não presumir mesclagem recursiva de objetos internos.

// OBJECT.ASSIGN
// Modificar o primeiro argumento com as propriedades das fontes.
const destino = { ativo: true };

Object.assign(destino, { nivel: "junior" });
// destino: { ativo: true, nivel: "junior" }

// Usar um objeto vazio como destino para criar outro objeto.
const copiaComAssign = Object.assign({}, usuario);
// Considerar a cópia superficial.

// LISTAR CHAVES, VALORES E ENTRADAS
const precos = {
    teclado: 150,
    mouse: 80,
    monitor: 900,
};

Object.keys(precos); // ["teclado", "mouse", "monitor"]
Object.values(precos); // [150, 80, 900]
Object.entries(precos); // [["teclado", 150], ["mouse", 80], ["monitor", 900]]

// Considerar apenas propriedades próprias, enumeráveis e com chave string.

// PERCORRER PROPRIEDADES
for (const [produto, preco] of Object.entries(precos)) {
    console.log(produto, preco);
}

// CRIAR UM OBJETO A PARTIR DE ENTRADAS
const entradas = [
    ["tema", "escuro"],
    ["idioma", "pt-BR"],
];

const ajustes = Object.fromEntries(entradas);
// { tema: "escuro", idioma: "pt-BR" }

// TRANSFORMAR VALORES
// Converter para entradas, transformar e reconstruir o objeto.
const precosComDesconto = Object.fromEntries(
    Object.entries(precos).map(([produto, preco]) => [
        produto,
        preco * 0.9,
    ])
);
// { teclado: 135, mouse: 72, monitor: 810 }

// FILTRAR PROPRIEDADES
const precosAcessiveis = Object.fromEntries(
    Object.entries(precos).filter(([, preco]) => preco <= 150)
);
// { teclado: 150, mouse: 80 }

// REMOVER VALORES NULL E UNDEFINED
// Preservar false, 0 e "" quando forem válidos.
const filtros = {
    busca: "",
    pagina: 0,
    ativo: false,
    categoria: null,
    ordem: undefined,
};

const filtrosPreenchidos = Object.fromEntries(
    Object.entries(filtros).filter(
        ([, valor]) => valor !== null && valor !== undefined
    )
);
// { busca: "", pagina: 0, ativo: false }

// SOMAR VALORES
const total = Object.values(precos).reduce(
    (acumulador, preco) => acumulador + preco,
    0
);
// 1130

// INDEXAR UMA COLEÇÃO POR ID
const usuarios = [
    { id: 1, nome: "Pricila" },
    { id: 2, nome: "Ana" },
];

const usuariosPorId = Object.fromEntries(
    usuarios.map((item) => [item.id, item])
);

usuariosPorId[2].nome; // "Ana"

// Considerar a conversão de chaves numéricas para strings.
// Compartilhar as referências dos objetos da coleção.
// Sobrescrever a entrada anterior quando houver IDs repetidos.

// CÓPIA PROFUNDA
// Usar structuredClone para estruturas com tipos compatíveis.
const clienteClonado = structuredClone(cliente);

clienteClonado.endereco.cidade = "São Paulo";
cliente.endereco.cidade; // "Rio de Janeiro"

// Não usar para clonar funções ou preservar protótipos de classes personalizadas.

// RESTRINGIR ALTERAÇÕES
// Usar freeze para impedir alterações nas propriedades próprias.
const constantes = Object.freeze({ limite: 100 });

// constantes.limite = 200;
// Impedir a alteração; lançar TypeError em modo estrito.

// Usar seal para impedir adicionar ou remover propriedades,
// mantendo a possibilidade de alterar propriedades graváveis existentes.
const sessao = Object.seal({ ativa: true });

sessao.ativa = false;

// Considerar que freeze e seal não se aplicam recursivamente.

// SERIALIZAR E INTERPRETAR JSON
const texto = JSON.stringify({ nome: "Pricila", ativo: true });
const dados = JSON.parse(texto);

// Tratar JSON inválido quando o texto vier de uma fonte externa.
// Não considerar JSON.parse uma validação da estrutura recebida.
// Evitar JSON como mecanismo genérico de cópia profunda.

// CUIDADOS
// Distinguir mutação, cópia superficial e cópia profunda.
// Não comparar conteúdo de objetos usando ===.
// Considerar perda de propriedades com símbolos ao usar Object.entries.
// Validar chaves externas antes de realizar atribuições dinâmicas.
// Selecionar campos permitidos antes de aplicar dados externos a objetos internos.