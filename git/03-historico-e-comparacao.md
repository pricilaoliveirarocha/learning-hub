# Histórico e comparação de alterações

O histórico permite entender a evolução do projeto: o que mudou, em qual commit e por quê.

As comparações permitem revisar alterações antes de registrá-las e investigar diferenças entre versões.

## 1. Identificar commits

Cada commit possui um identificador calculado por hash.

Na maioria dos comandos, é possível usar um prefixo desse identificador, desde que ele seja suficiente para identificar o commit sem ambiguidade.

```bash
git show a1b2c3d
```

Substituir `a1b2c3d` pelo identificador real do commit.

Os comandos de consulta deste resumo não alteram os arquivos nem o histórico.

## 2. Consultar o histórico com git log

```bash
git log
```

Exibir os commits alcançáveis a partir da posição atual, normalmente começando pelos mais recentes.

A saída inclui:

- Identificador do commit.
- Autor.
- Data.
- Mensagem.

O histórico consultado depende da referência inicial. O comando não mostra automaticamente todos os commits de todas as branches.

### Exibir um resumo

```bash
git log --oneline
```

Mostrar uma linha por commit, com identificador abreviado e título.

Exemplo:

```text
a1b2c3d docs: adicionar resumo sobre histórico
b2c3d4e feat: adicionar exercício de arrays
c3d4e5f chore: iniciar projeto
```

### Limitar a quantidade

```bash
git log -5 --oneline
```

Mostrar até cinco commits.

### Visualizar branches e merges

```bash
git log --oneline --graph --decorate --all
```

| Opção        | Função                                             |
| ------------ | -------------------------------------------------- |
| `--oneline`  | Resumir cada commit em uma linha                   |
| `--graph`    | Representar relações entre commits                 |
| `--decorate` | Mostrar referências, como branches e tags          |
| `--all`      | Considerar todas as referências locais disponíveis |

`--all` inclui referências de acompanhamento remoto já conhecidas localmente. Ele não consulta o servidor nem atualiza essas referências.

### Mostrar os arquivos alterados

```bash
git log --name-status
```

Listar os arquivos de cada commit com seu tipo de alteração.

| Código comum | Significado          |
| ------------ | -------------------- |
| `A`          | Arquivo adicionado   |
| `M`          | Arquivo modificado   |
| `D`          | Arquivo excluído     |
| `R`          | Renomeação detectada |

### Mostrar estatísticas

```bash
git log --stat
```

Exibir um resumo dos arquivos e da quantidade de linhas adicionadas e removidas em cada commit.

### Mostrar as alterações completas

```bash
git log -p -3
```

Exibir os patches dos três commits mais recentes.

Um patch representa as diferenças entre versões, normalmente com linhas adicionadas e removidas.

## 3. Filtrar o histórico

### Por autor

```bash
git log --author="Pricila" --oneline
```

Buscar commits cujo campo de autor corresponda ao padrão informado.

### Por mensagem

```bash
git log --grep="arrays" -i --oneline
```

Buscar mensagens que contenham o padrão `arrays`.

A opção `-i` ignora diferenças entre maiúsculas e minúsculas nessa busca.

### Por período

```bash
git log --since="2026-11-01" --until="2026-12-01" --oneline
```

Filtrar o histórico pelo período informado.

### Por arquivo

```bash
git log --oneline -- anotacoes.md
```

Consultar o histórico relacionado ao caminho informado.

O separador `--` diferencia caminhos de referências e opções.

### Acompanhar renomeações

```bash
git log --follow -p -- anotacoes.md
```

Tentar acompanhar o histórico do arquivo além de renomeações.

`--follow` funciona com um único arquivo, e a detecção de renomeações depende da similaridade do conteúdo.

## 4. Referências: HEAD, pais e ancestrais

`HEAD` indica a posição atual no histórico.

| Referência | Significado                                 |
| ---------- | ------------------------------------------- |
| `HEAD`     | Commit atual                                |
| `HEAD~1`   | Primeiro pai do commit atual                |
| `HEAD~2`   | Avançar duas vezes pelo primeiro pai        |
| `HEAD^1`   | Primeiro pai do commit atual                |
| `HEAD^2`   | Segundo pai do commit atual, quando existir |

Um commit comum possui um pai. Um commit de merge pode possuir mais de um.

**`HEAD~2` e `HEAD^2` não significam a mesma coisa.**

- `HEAD~2`: seguir duas gerações pelo primeiro pai.
- `HEAD^2`: selecionar diretamente o segundo pai.

## 5. Inspecionar um commit com git show

```bash
git show HEAD
```

Exibir informações do commit atual e suas alterações.

```bash
git show a1b2c3d
```

Inspecionar um commit específico.

Para um commit comum, o patch mostra suas alterações em relação ao pai. Commits de merge possuem regras próprias de exibição e podem exigir opções adicionais.

### Mostrar somente o resumo

```bash
git show --stat HEAD
```

Exibir informações do commit e estatísticas das alterações.

### Mostrar somente os caminhos alterados

```bash
git show --format= --name-status HEAD
```

Omitir os metadados do commit e listar os arquivos afetados.

### Consultar um arquivo em uma versão antiga

```bash
git show HEAD~1:anotacoes.md
```

Exibir o conteúdo de `anotacoes.md` naquele commit.

O caminho após `:` é relativo à raiz do repositório.

**Esse comando não substitui o arquivo no diretório de trabalho.**

## 6. Revisar alterações ainda não registradas

As comparações abaixo envolvem as áreas do Git.

| Comando             | Comparação                           |
| ------------------- | ------------------------------------ |
| `git diff`          | Staging area → diretório de trabalho |
| `git diff --staged` | HEAD → staging area                  |
| `git diff HEAD`     | HEAD → diretório de trabalho         |

### Alterações não preparadas

```bash
git diff
```

Mostrar o que foi alterado no diretório de trabalho depois do conteúdo preparado.

### Alterações preparadas

```bash
git diff --staged
```

Mostrar o que entrará no próximo commit.

### Resultado local em relação ao último commit

```bash
git diff HEAD
```

Comparar o conteúdo atual dos arquivos acompanhados com o último commit.

Essa comparação mostra a diferença final; ela não é uma simples soma dos outros dois diffs.

**Arquivos untracked não aparecem nessas comparações comuns.**

### Restringir a um arquivo

```bash
git diff -- anotacoes.md
git diff --staged -- anotacoes.md
git diff HEAD -- anotacoes.md
```

Aplicar cada comparação somente ao caminho informado.

## 7. Interpretar um diff

Exemplo de saída:

```diff
diff --git a/pontos.js b/pontos.js
--- a/pontos.js
+++ b/pontos.js
@@ -1 +1 @@
-const pontos = 10;
+const pontos = 20;
```

| Elemento                 | Significado                               |
| ------------------------ | ----------------------------------------- |
| `a/pontos.js`            | Lado anterior da comparação               |
| `b/pontos.js`            | Lado posterior da comparação              |
| `---`                    | Identificar o arquivo anterior            |
| `+++`                    | Identificar o arquivo posterior           |
| `@@ ... @@`              | Identificar o intervalo do bloco alterado |
| Linha com `-`            | Conteúdo removido                         |
| Linha com `+`            | Conteúdo adicionado                       |
| Linha com espaço inicial | Contexto que permaneceu igual             |

Os prefixos `a/` e `b/` não representam necessariamente pastas reais.

O Git mostra substituições como remoção do conteúdo anterior e adição do novo.

## 8. Comparar dois commits

```bash
git diff HEAD~1 HEAD
```

Comparar o snapshot do primeiro pai com o snapshot do commit atual.

```bash
git diff a1b2c3d b2c3d4e
```

Mostrar as alterações necessárias para transformar o conteúdo do primeiro commit no conteúdo do segundo.

**A ordem importa:** inverter os commits inverte adições e remoções.

### Comparar um arquivo específico

```bash
git diff HEAD~1 HEAD -- anotacoes.md
```

Restringir a comparação ao arquivo.

### Comparar um commit antigo com o trabalho atual

```bash
git diff HEAD~3 -- anotacoes.md
```

Comparar o arquivo naquele commit com seu conteúdo no diretório de trabalho.

O comando considera as alterações atuais, mesmo que ainda não tenham sido registradas.

## 9. Comparar branches

```bash
git diff main estudos
```

Comparar os snapshots das pontas das branches `main` e `estudos`.

Essa comparação mostra diferenças de conteúdo, não uma lista de commits.

### Comparar a partir do ancestral comum

```bash
git diff main...estudos
```

Comparar o ancestral comum das branches com a ponta de `estudos`.

Essa forma ajuda a revisar o que a branch `estudos` introduziu desde o ponto de divergência.

Se `main` também avançou, o resultado pode ser diferente de:

```bash
git diff main estudos
```

## 10. Diferença entre intervalos em log e diff

A notação com pontos tem significado diferente conforme o comando.

| Comando                   | Resultado                                             |
| ------------------------- | ----------------------------------------------------- |
| `git log main..estudos`   | Commits alcançáveis por `estudos`, mas não por `main` |
| `git log main...estudos`  | Commits exclusivos de cada lado                       |
| `git diff main..estudos`  | Comparação entre os snapshots das duas pontas         |
| `git diff main...estudos` | Comparação do ancestral comum até `estudos`           |

Para `git diff`, usar dois pontos equivale, nesse caso, a informar as duas referências sem pontos:

```bash
git diff main estudos
```

## 11. Simplificar a comparação

### Listar somente os nomes

```bash
git diff --name-only HEAD~1 HEAD
```

Identificar quais arquivos mudaram.

### Listar nomes e tipos de alteração

```bash
git diff --name-status HEAD~1 HEAD
```

Distinguir adições, modificações, exclusões e renomeações detectadas.

### Mostrar estatísticas

```bash
git diff --stat HEAD~1 HEAD
```

Obter uma visão geral antes de ler o patch completo.

### Destacar alterações por palavras

```bash
git diff --word-diff
```

Facilitar a leitura de alterações pequenas dentro de linhas, especialmente em textos.

### Ignorar diferenças de espaços em branco

```bash
git diff -w
```

Ocultar diferenças de espaços em branco na comparação.

Usar com cuidado: espaços podem ter significado para a linguagem ou para o conteúdo analisado.

### Verificar problemas de espaços

```bash
git diff --check
git diff --staged --check
```

Detectar problemas como espaços no final das linhas nas alterações analisadas.

Isso não substitui um formatter, um linter ou testes.

## 12. Descobrir a origem de uma linha com git blame

```bash
git blame -- anotacoes.md
```

Mostrar o commit e o autor associados à última alteração de cada linha.

### Restringir o intervalo

```bash
git blame -L 10,20 -- anotacoes.md
```

Consultar somente as linhas de 10 a 20.

Usar o identificador encontrado com `git show` para entender o contexto.

**Blame indica a origem registrada da linha, não quem é responsável por um problema.** Uma alteração de formatação, por exemplo, pode aparecer como a última modificação.

## 13. Buscar alterações no conteúdo do histórico

### Encontrar mudança na quantidade de uma expressão

```bash
git log -S "calcularTotal" -p -- exercicios.js
```

Buscar commits que alteraram a quantidade de ocorrências do texto `calcularTotal` no arquivo.

É útil para investigar quando uma função foi adicionada ou removida.

### Encontrar linhas alteradas que correspondam a um padrão

```bash
git log -G "calcularTotal" -p -- exercicios.js
```

Buscar commits cujo patch tenha linhas adicionadas ou removidas correspondentes ao padrão.

Diferentemente de `-S`, essa opção não exige uma mudança na quantidade total de ocorrências.

## 14. Histórico e reflog são diferentes

```bash
git log --oneline
```

Consultar o histórico de commits alcançável a partir das referências selecionadas.

```bash
git reflog
```

Consultar registros locais de movimentações de referências, como trocas de posição do HEAD.

O reflog pode ajudar a localizar commits após operações como reset ou rebase.

Ele é local, possui retenção limitada e não substitui backup.

## Fluxo para revisar antes de um commit

```bash
git status
git diff
git diff --staged
```

1. Identificar os arquivos afetados.
2. Revisar alterações ainda não preparadas.
3. Conferir exatamente o que será registrado.

## Fluxo para investigar uma mudança

```bash
git log --oneline -- anotacoes.md
git show a1b2c3d -- anotacoes.md
git blame -- anotacoes.md
```

1. Localizar commits relacionados ao arquivo.
2. Inspecionar o patch de um commit real.
3. Consultar a origem de linhas específicas quando necessário.

## Exercício prático

Em um repositório de prática:

1. Criar um arquivo e registrar um commit.
2. Alterar duas linhas e registrar outro commit.
3. Consultar `git log --oneline`.
4. Executar `git show HEAD`.
5. Comparar as versões com `git diff HEAD~1 HEAD`.
6. Editar o arquivo novamente, sem preparar.
7. Consultar `git diff`.
8. Preparar o arquivo e consultar `git diff --staged`.
9. Executar `git show HEAD:arquivo.md`, usando o caminho real.

**Resultado esperado:** diferenciar o conteúdo já registrado, o conteúdo preparado e as edições locais.

## Pontos de atenção

- `log` mostra commits; `diff` compara conteúdo.
- `show` inspeciona um commit ou um objeto específico.
- A ordem das referências altera a direção do diff.
- Referências remotas locais podem estar desatualizadas até um `fetch`.
- Mensagens de commit ajudam a investigar a intenção, mas não substituem a leitura das alterações.
- Quando o Git abrir um visualizador no terminal, usar `q` para sair.
