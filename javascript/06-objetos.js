// OBJETOS
// Agrupar dados em propriedades e comportamentos em métodos.
const usuario = {
    nome: "Pricila",
    ativo: true,
    endereco: {
        cidade: "Rio de Janeiro",
    },
};

// ACESSAR PROPRIEDADES
usuario.nome; // "Pricila"
usuario["ativo"]; // true
usuario.email; // undefined

// Usar colchetes para acessar chaves dinâmicas ou com caracteres especiais.
usuario[nome]; // "Pricila"

const resposta = { "content-type": "application/json" };
resposta["content-type"]; // "application/json"

// ADICIONAR, ALTERAR E REMOVER
usuario.email = "pricila@example.com";
usuario.ativo = false;
delete usuario.email;

// CONST E MUTAÇÃO
// Distinguir modificar o objeto de reatribuir a variável.
usuario.nome = "Ana"; // Permitir alterar propriedades.
// usuario = {}; // Lançar TypeError ao tentar reatribuir.

// PROPRIEDADES ABREVIADAS
// Usar quando a chave e a variável tiverem o mesmo nome.
const nome = "Pricila";
const ativo = true;
const perfil = { nome, ativo };
// Equivalente a { nome: nome, ativo: ativo }.

// CHAVES COMPUTADAS
// Definir o nome da propriedade a partir de uma expressão.
const chave = "nivel";
const configuracao = { [chave]: "junior" };
// { nivel: "junior" }

// MÉTODOS
// Usar métodos regulares quando precisar acessar o receptor com this.
const conta = {
    saldo: 100,

    depositar(valor) {
        this.saldo += valor;
        return this.saldo;
    },
};

conta.depositar(50); // 150

// Considerar que this depende da forma de chamada.
// Evitar arrow como método quando precisar de this apontando para o objeto.

// VERIFICAR PROPRIEDADES
// Usar Object.hasOwn para verificar propriedades do próprio objeto.
Object.hasOwn(usuario, "nome"); // true
Object.hasOwn(usuario, "email"); // false

// Distinguir propriedade ausente de propriedade contendo undefined.
const retorno = { dados: undefined };

retorno.dados; // undefined
retorno.erro; // undefined

Object.hasOwn(retorno, "dados"); // true
Object.hasOwn(retorno, "erro"); // false

// Considerar que in também verifica propriedades herdadas.
"nome" in usuario; // true
"toString" in usuario; // true
Object.hasOwn(usuario, "toString"); // false

// LISTAR CHAVES, VALORES E ENTRADAS
// Considerar propriedades próprias, enumeráveis e com chave string.
const produto = { nome: "Teclado", preco: 150 };

Object.keys(produto); // ["nome", "preco"]
Object.values(produto); // ["Teclado", 150]
Object.entries(produto); // [["nome", "Teclado"], ["preco", 150]]

// PERCORRER PROPRIEDADES
for (const [chaveProduto, valorProduto] of Object.entries(produto)) {
    console.log(chaveProduto, valorProduto);
}

// VERIFICAR OBJETO SEM PROPRIEDADES ENUMERÁVEIS
Object.keys({}).length === 0; // true
// Considerar que essa verificação não inclui símbolos ou propriedades não enumeráveis.

// ACESSO OPCIONAL
// Usar ?. para interromper o acesso diante de null ou undefined.
const cliente = { nome: "Ana" };

cliente.endereco?.cidade; // undefined
cliente.endereco?.cidade ?? "Não informada"; // "Não informada"

// Evitar ocultar a ausência de propriedades obrigatórias com acesso opcional.

// REFERÊNCIAS
// Compartilhar a referência ao atribuir um objeto a outra variável.
const original = { pontos: 10 };
const referencia = original;

referencia.pontos = 20;
original.pontos; // 20

// IGUALDADE
// Comparar objetos pela identidade, não pelo conteúdo.
original === referencia; // true
({ pontos: 20 }) === ({ pontos: 20 }); // false

// CÓPIA SUPERFICIAL
// Criar um novo objeto com spread, copiando propriedades próprias enumeráveis.
const pessoa = {
    nome: "Pricila",
    endereco: {
        cidade: "Rio de Janeiro",
    },
};

const copia = { ...pessoa };

copia.nome = "Ana";
pessoa.nome; // "Pricila"

// Considerar que objetos internos continuam compartilhados.
copia.endereco.cidade = "Niterói";
pessoa.endereco.cidade; // "Niterói"

// ATUALIZAR SEM MODIFICAR O ORIGINAL
// Copiar cada nível que precisar de alteração.
const pessoaAtualizada = {
    ...pessoa,
    endereco: {
        ...pessoa.endereco,
        cidade: "Petrópolis",
    },
};

pessoa.endereco.cidade; // "Niterói"
pessoaAtualizada.endereco.cidade; // "Petrópolis"

// COMBINAR OBJETOS
// Considerar que propriedades posteriores sobrescrevem as anteriores.
const padrao = { tema: "claro", idioma: "pt-BR" };
const preferencias = { tema: "escuro" };

const opcoes = { ...padrao, ...preferencias };
// { tema: "escuro", idioma: "pt-BR" }

// OBJECT.ASSIGN
// Copiar propriedades próprias enumeráveis para o objeto de destino.
const destino = { ativo: true };

Object.assign(destino, { nivel: "junior" });
// Modificar destino: { ativo: true, nivel: "junior" }.

// Usar um destino vazio para criar outro objeto.
const outraCopia = Object.assign({}, destino);
// Considerar a cópia superficial, assim como no spread.

// CÓPIA PROFUNDA
// Usar structuredClone para estruturas com tipos compatíveis.
// Não usar para clonar funções ou preservar protótipos de classes personalizadas.
const copiaProfunda = structuredClone(pessoa);

copiaProfunda.endereco.cidade = "São Paulo";
pessoa.endereco.cidade; // "Niterói"

// CONGELAMENTO SUPERFICIAL
// Usar Object.freeze para impedir adicionar, remover ou alterar propriedades próprias.
const ajustes = Object.freeze({
    tema: "escuro",
    notificacoes: {
        email: true,
    },
});

// ajustes.tema = "claro";
// Falhar silenciosamente fora do modo estrito ou lançar TypeError no modo estrito.

// Considerar que freeze não congela objetos internos.
ajustes.notificacoes.email = false;

// JSON
// Serializar dados compatíveis em texto e interpretar texto JSON.
const texto = JSON.stringify({ nome: "Pricila", ativo: true });
// '{"nome":"Pricila","ativo":true}'

const dados = JSON.parse(texto);
// { nome: "Pricila", ativo: true }

// Considerar que JSON não preserva todos os tipos do JavaScript.
JSON.stringify({ valor: undefined }); // "{}"
JSON.stringify({ valor: NaN }); // '{"valor":null}'

// Evitar usar JSON.parse(JSON.stringify(...)) como cópia profunda genérica.
// Tratar possíveis erros ao interpretar JSON externo.

// CUIDADOS
// Distinguir propriedade ausente de propriedade com valor falsy.
// Diferenciar mutação, reatribuição e cópia.
// Considerar referências compartilhadas em estruturas aninhadas.
// Não presumir igualdade de conteúdo ao comparar objetos com ===.
// Usar Map quando precisar de chaves de qualquer tipo.