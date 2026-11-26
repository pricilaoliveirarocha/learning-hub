// ALGORITMOS E ESTRUTURAS DE DADOS EM JAVASCRIPT

// O QUE É UM ALGORITMO?
// Um algoritmo é uma sequência de passos para resolver um problema.
// Buscar um usuário, ordenar preços e contar palavras são exemplos.

// O QUE É UMA ESTRUTURA DE DADOS?
// Uma estrutura de dados organiza informações e define como acessá-las.
// A escolha influencia a clareza e o custo das operações.

// COMPLEXIDADE — BIG O
// Big O descreve como o custo cresce conforme aumenta o tamanho da entrada.
// Não representa uma duração exata em milissegundos.
//
// O(1): custo limitado independentemente do tamanho da entrada.
// O(log n): reduzir o espaço de busca por um fator constante a cada etapa.
// O(n): percorrer uma quantidade de elementos proporcional à entrada.
// O(n log n): crescimento comum em algoritmos eficientes de ordenação.
// O(n²): comparar cada elemento com os demais, por exemplo.
//
// Complexidade de tempo: analisar o trabalho realizado.
// Complexidade de espaço: analisar a memória necessária.
// Nos exemplos abaixo, espaço auxiliar não inclui a entrada.

// ARRAYS
// Um array organiza valores por índices.
// Usar para sequências, percursos e acesso por posição.
// No modelo usual de análise, considerar acesso por índice O(1).
const numeros = [10, 20, 30];

numeros[1]; // 20

// push e pop costumam ter custo O(1) amortizado.
// "Amortizado" considera o custo médio por operação em uma sequência,
// incluindo eventuais operações mais caras, como ampliar o armazenamento.
// shift e unshift geralmente exigem deslocar elementos: O(n).

// BUSCA LINEAR — O(n)
// A função abaixo percorre o array até encontrar o alvo.
// No pior caso, precisa examinar todos os elementos.
// Retornar -1 quando o valor não existir.
function buscarLinearmente(valores, alvo) {
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] === alvo) {
            return i;
        }
    }

    return -1;
}

buscarLinearmente([10, 20, 30], 20); // 1
buscarLinearmente([10, 20, 30], 99); // -1

// Tempo: O(n) no pior caso.
// Espaço auxiliar: O(1).

// BUSCA BINÁRIA — O(log n)
// A função abaixo elimina metade dos candidatos a cada etapa.
// O array precisa estar ordenado em ordem crescente.
// Ordenar antes de cada consulta pode custar mais que uma busca linear.
function buscarBinariamente(valores, alvo) {
    let inicio = 0;
    let fim = valores.length - 1;

    while (inicio <= fim) {
        const meio = inicio + Math.floor((fim - inicio) / 2);

        if (valores[meio] === alvo) {
            return meio;
        }

        if (valores[meio] < alvo) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }

    return -1;
}

buscarBinariamente([10, 20, 30, 40, 50], 40); // 3

// Tempo: O(log n).
// Espaço auxiliar: O(1).
// Com valores repetidos, não garantir o primeiro índice correspondente.

// MAP — ASSOCIAÇÃO ENTRE CHAVES E VALORES
// Map permite chaves de qualquer tipo e preserva a ordem de inserção.
// No modelo usual de tabelas hash, considerar acesso O(1) em média.
// A linguagem exige acesso sublinear em média, sem garantir O(1)
// para toda implementação ou situação.
const usuariosPorId = new Map();

usuariosPorId.set(1, { nome: "Pricila" });
usuariosPorId.set(2, { nome: "Ana" });

usuariosPorId.get(1); // { nome: "Pricila" }
usuariosPorId.has(2); // true
usuariosPorId.delete(2); // true
usuariosPorId.size; // 1

// CONTAGEM DE FREQUÊNCIAS
// A função abaixo conta quantas vezes cada valor aparece.
// Map evita procurar repetidamente cada valor dentro do array.
function contarFrequencias(valores) {
    const frequencias = new Map();

    for (const valor of valores) {
        const quantidadeAtual = frequencias.get(valor) ?? 0;
        frequencias.set(valor, quantidadeAtual + 1);
    }

    return frequencias;
}

const frequencias = contarFrequencias(["JS", "SQL", "JS"]);

frequencias.get("JS"); // 2
frequencias.get("SQL"); // 1

// Tempo esperado: O(n), considerando operações de Map O(1) em média.
// Espaço auxiliar: O(k), sendo k a quantidade de valores distintos.

// SET — CONJUNTO DE VALORES ÚNICOS
// Set elimina duplicatas e permite verificar a presença de um valor.
// Objetos são diferenciados por identidade, não por conteúdo.
const tecnologias = new Set(["JavaScript", "SQL", "JavaScript"]);

tecnologias.size; // 2
tecnologias.has("SQL"); // true

// DETECTAR DUPLICATAS
// A função abaixo encerra a busca assim que encontra um valor repetido.
function possuiDuplicatas(valores) {
    const encontrados = new Set();

    for (const valor of valores) {
        if (encontrados.has(valor)) {
            return true;
        }

        encontrados.add(valor);
    }

    return false;
}

possuiDuplicatas([1, 2, 3, 2]); // true

// Tempo esperado: O(n).
// Espaço auxiliar: O(n) no pior caso.

// PILHA — STACK
// Uma pilha segue LIFO: o último a entrar é o primeiro a sair.
// Usar em desfazer ações, análise de expressões e percursos.
const historico = [];

historico.push("Abrir arquivo");
historico.push("Editar arquivo");

historico.pop(); // "Editar arquivo"
historico.at(-1); // "Abrir arquivo"

// VALIDAR PARÊNTESES COM PILHA
// A função abaixo verifica se os parênteses estão corretamente fechados.
// Caracteres diferentes de "(" e ")" são ignorados.
function parentesesBalanceados(texto) {
    const pilha = [];

    for (const caractere of texto) {
        if (caractere === "(") {
            pilha.push(caractere);
        } else if (caractere === ")") {
            if (pilha.length === 0) {
                return false;
            }

            pilha.pop();
        }
    }

    return pilha.length === 0;
}

parentesesBalanceados("(a + (b * c))"); // true
parentesesBalanceados(")("); // false

// Tempo: O(n).
// Espaço auxiliar: O(n) no pior caso.

// FILA — QUEUE
// Uma fila segue FIFO: o primeiro a entrar é o primeiro a sair.
// Usar em processamento de tarefas e busca em largura.
// A implementação abaixo usa Map com índices para evitar shift.
class Fila {
    #itens = new Map();
    #inicio = 0;
    #fim = 0;

    enfileirar(valor) {
        this.#itens.set(this.#fim, valor);
        this.#fim++;
    }

    desenfileirar() {
        if (this.tamanho === 0) {
            return undefined;
        }

        const valor = this.#itens.get(this.#inicio);
        this.#itens.delete(this.#inicio);
        this.#inicio++;

        if (this.tamanho === 0) {
            this.#inicio = 0;
            this.#fim = 0;
        }

        return valor;
    }

    get tamanho() {
        return this.#fim - this.#inicio;
    }
}

const fila = new Fila();

fila.enfileirar("Primeira tarefa");
fila.enfileirar("Segunda tarefa");

fila.desenfileirar(); // "Primeira tarefa"
fila.tamanho; // 1

// O prefixo # declara campos privados da classe.
// Considerar o custo das operações de Map nesta implementação.

// DOIS PONTEIROS — TWO POINTERS
// A técnica usa duas posições que avançam conforme uma regra.
// A função abaixo busca dois números cuja soma corresponde ao alvo.
// O array precisa estar ordenado em ordem crescente.
function encontrarParOrdenado(valores, alvo) {
    let esquerda = 0;
    let direita = valores.length - 1;

    while (esquerda < direita) {
        const soma = valores[esquerda] + valores[direita];

        if (soma === alvo) {
            return [valores[esquerda], valores[direita]];
        }

        if (soma < alvo) {
            esquerda++;
        } else {
            direita--;
        }
    }

    return null;
}

encontrarParOrdenado([1, 2, 4, 7, 11], 9); // [2, 7]

// Tempo: O(n).
// Espaço auxiliar: O(1).

// JANELA DESLIZANTE — SLIDING WINDOW
// A técnica reaproveita informações de um intervalo que se move pela entrada.
// A função abaixo calcula a maior soma de k elementos consecutivos.
// Em vez de recalcular tudo, remover o elemento que sai e adicionar o que entra.
function maiorSomaConsecutiva(valores, k) {
    if (!Number.isInteger(k) || k <= 0 || k > valores.length) {
        throw new RangeError("k deve estar entre 1 e o tamanho do array");
    }

    let soma = 0;

    for (let i = 0; i < k; i++) {
        soma += valores[i];
    }

    let maiorSoma = soma;

    for (let i = k; i < valores.length; i++) {
        soma += valores[i] - valores[i - k];
        maiorSoma = Math.max(maiorSoma, soma);
    }

    return maiorSoma;
}

maiorSomaConsecutiva([2, 1, 5, 1, 3, 2], 3); // 9

// Tempo: O(n).
// Espaço auxiliar: O(1).

// RECURSÃO
// Uma função recursiva chama a si mesma para resolver partes menores.
// O caso-base encerra as chamadas.
// A função abaixo calcula o fatorial de um inteiro não negativo.
function fatorial(numero) {
    if (!Number.isInteger(numero) || numero < 0) {
        throw new RangeError("O número deve ser um inteiro não negativo");
    }

    if (numero === 0) {
        return 1;
    }

    return numero * fatorial(numero - 1);
}

fatorial(5); // 120

// Tempo: O(n).
// Espaço auxiliar: O(n), devido à pilha de chamadas.
// Recursão profunda pode exceder o limite da pilha.
// Resultados grandes também excedem a precisão ou o alcance de Number.

// LISTA ENCADEADA
// Uma lista encadeada armazena nós ligados por referências.
// Cada nó contém um valor e uma referência para o próximo.
const lista = {
    valor: 10,
    proximo: {
        valor: 20,
        proximo: {
            valor: 30,
            proximo: null,
        },
    },
};

// A função abaixo percorre os nós até encontrar o valor ou chegar ao fim.
function buscarNaLista(inicio, alvo) {
    let atual = inicio;

    while (atual !== null) {
        if (atual.valor === alvo) {
            return atual;
        }

        atual = atual.proximo;
    }

    return null;
}

buscarNaLista(lista, 20)?.valor; // 20

// Busca e acesso por posição: O(n).
// Inserção no início: O(1).
// Inserção após um nó já conhecido: O(1), sem incluir o custo de localizá-lo.

// ÁRVORES
// Uma árvore organiza nós em relações hierárquicas.
// Em uma árvore binária, cada nó possui no máximo dois filhos.
const arvore = {
    valor: 10,
    esquerda: {
        valor: 5,
        esquerda: null,
        direita: null,
    },
    direita: {
        valor: 15,
        esquerda: null,
        direita: null,
    },
};

// BUSCA EM PROFUNDIDADE — DFS
// A função abaixo visita o nó atual e depois suas subárvores.
// Essa ordem é chamada de pré-ordem.
function percorrerEmProfundidade(raiz) {
    const valores = [];

    function visitar(no) {
        if (no === null) {
            return;
        }

        valores.push(no.valor);
        visitar(no.esquerda);
        visitar(no.direita);
    }

    visitar(raiz);
    return valores;
}

percorrerEmProfundidade(arvore); // [10, 5, 15]

// Tempo: O(n).
// Espaço auxiliar da recursão: O(h), sendo h a altura da árvore.
// O array retornado também ocupa O(n).

// BUSCA EM LARGURA — BFS
// A função abaixo visita os nós por nível usando uma fila.
function percorrerEmLargura(raiz) {
    if (raiz === null) {
        return [];
    }

    const valores = [];
    const fila = new Fila();

    fila.enfileirar(raiz);

    while (fila.tamanho > 0) {
        const no = fila.desenfileirar();

        valores.push(no.valor);

        if (no.esquerda !== null) {
            fila.enfileirar(no.esquerda);
        }

        if (no.direita !== null) {
            fila.enfileirar(no.direita);
        }
    }

    return valores;
}

percorrerEmLargura(arvore); // [10, 5, 15]

// Tempo esperado: O(n), considerando as operações da fila.
// Espaço da fila: O(w), sendo w a largura máxima da árvore.
// O array retornado ocupa O(n).

// GRAFOS
// Um grafo representa entidades e conexões entre elas.
// Usar listas de adjacência para associar cada vértice aos seus vizinhos.
const grafo = new Map([
    ["A", ["B", "C"]],
    ["B", ["A", "D"]],
    ["C", ["A"]],
    ["D", ["B"]],
]);

// A função abaixo verifica se existe um caminho entre dois vértices.
// O Set impede visitar repetidamente um vértice em ciclos.
function existeCaminho(grafo, origem, destino) {
    if (!grafo.has(origem) || !grafo.has(destino)) {
        return false;
    }

    const visitados = new Set([origem]);
    const fila = new Fila();

    fila.enfileirar(origem);

    while (fila.tamanho > 0) {
        const atual = fila.desenfileirar();

        if (atual === destino) {
            return true;
        }

        for (const vizinho of grafo.get(atual) ?? []) {
            if (!visitados.has(vizinho)) {
                visitados.add(vizinho);
                fila.enfileirar(vizinho);
            }
        }
    }

    return false;
}

existeCaminho(grafo, "A", "D"); // true

// Tempo esperado: O(V + E), sendo V os vértices e E as conexões.
// Espaço auxiliar: O(V).

// ORDENAÇÃO NO DIA A DIA
// toSorted retorna outro array; sort modifica o original.
// O comparador abaixo define uma ordenação numérica crescente.
const precos = [100, 20, 5];
const precosOrdenados = precos.toSorted((a, b) => a - b);
// [5, 20, 100]

// Não atribuir uma complexidade universal ao sort ou toSorted:
// o algoritmo e os custos dependem da implementação.
// Para estudar ordenação, avançar para merge sort e quicksort.

// COMO RESOLVER UM PROBLEMA
// 1. Definir entradas, saída esperada e restrições.
// 2. Construir uma solução correta antes de otimizar.
// 3. Identificar buscas repetidas e trabalho desnecessário.
// 4. Escolher a estrutura adequada: array, Map, Set, pilha ou fila.
// 5. Analisar tempo e memória.
// 6. Verificar entrada vazia, duplicatas, limites e ausência de resultado.

// PRIORIDADE DE ESTUDO
// Dominar arrays, strings, Map e Set.
// Praticar busca linear, busca binária e contagem de frequências.
// Avançar para dois ponteiros, janela deslizante, pilhas e filas.
// Depois estudar recursão, listas, árvores, grafos e ordenação.
// Em seguida, estudar heaps, backtracking e programação dinâmica.