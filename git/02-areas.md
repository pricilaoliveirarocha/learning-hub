# Áreas do Git

As áreas do Git representam etapas diferentes entre editar um arquivo e registrar uma versão no histórico.

Entender essas áreas permite escolher o que entra em cada commit e evitar perder ou incluir alterações por engano.

## 1. Working directory — diretório de trabalho

É onde ficam os arquivos que estou editando.

Alterar, criar ou excluir um arquivo modifica o diretório de trabalho, mas não registra automaticamente uma versão no histórico.

Exemplos:

- Alterar uma função.
- Criar um arquivo de exercícios.
- Excluir uma anotação.
- Atualizar o README.

### Consultar alterações

```bash
git status
```

Mostrar o estado dos arquivos em relação à staging area e ao último commit.

```bash
git diff
```

Mostrar as diferenças entre o diretório de trabalho e a staging area para arquivos acompanhados pelo Git.

**Arquivos novos ainda não acompanhados — untracked — não aparecem no `git diff` comum.**

## 2. Staging area — área de preparação

Também chamada de **index**, representa o conteúdo preparado para o próximo commit.

Essa área permite selecionar alterações sem precisar registrar tudo que está no diretório de trabalho.

```bash
git add anotacoes.md
```

Preparar o conteúdo atual de `anotacoes.md`.

O Git registra essa versão na staging area. Se eu editar o arquivo novamente, a nova edição não será preparada automaticamente.

### Preparar arquivos específicos

```bash
git add README.md exercicios.js
```

Preparar os arquivos informados.

### Preparar todas as alterações

```bash
git add -A
```

Preparar adições, modificações e exclusões em todo o repositório.

```bash
git add .
```

Preparar adições, modificações e exclusões dentro do diretório atual e seus subdiretórios.

Se executado na raiz, esse comando abrange o repositório, respeitando as regras de arquivos ignorados.

**Revisar antes de preparar tudo para não incluir alterações sem relação com o commit.**

### Preparar somente arquivos já acompanhados

```bash
git add -u
```

Preparar modificações e exclusões de arquivos já acompanhados, sem adicionar arquivos untracked.

### Preparar partes de um arquivo

```bash
git add -p
```

Revisar alterações em blocos, chamados de _hunks_, e escolher quais preparar.

| Opção comum | Ação                                     |
| ----------- | ---------------------------------------- |
| `y`         | Preparar o bloco atual                   |
| `n`         | Não preparar o bloco atual               |
| `s`         | Tentar dividir o bloco em partes menores |
| `q`         | Encerrar a seleção                       |

Essa opção é útil quando um arquivo contém alterações de responsabilidades diferentes.

### Conferir o conteúdo preparado

```bash
git diff --staged
```

Comparar a staging area com o último commit.

O conteúdo mostrado corresponde às alterações que entrarão no próximo commit.

`git diff --cached` é equivalente.

## 3. Repositório local — histórico de commits

É onde o Git mantém os commits e os demais dados necessários ao versionamento.

Esses dados ficam normalmente dentro de `.git`.

```bash
git commit -m "docs: adicionar anotações sobre staging"
```

Registrar um commit a partir da staging area.

**O commit não registra automaticamente todas as edições do diretório de trabalho.**

Depois do commit, os arquivos continuam no diretório de trabalho. O Git apenas passa a ter uma versão registrada no histórico.

### Consultar o histórico

```bash
git log --oneline
```

Listar os commits com identificadores abreviados e mensagens.

```bash
git show HEAD
```

Consultar o commit atual e suas alterações.

## 4. O que é HEAD?

`HEAD` é uma referência que indica a posição atual no histórico.

Normalmente, aponta para a branch em uso, e essa branch aponta para seu commit mais recente.

Nos exemplos deste resumo, `HEAD` representa a versão do último commit da branch atual.

**HEAD não é uma quarta área.** É uma referência usada nas comparações e operações do Git.

## 5. Comparar as áreas

| Comando             | Comparação                           |
| ------------------- | ------------------------------------ |
| `git diff`          | Diretório de trabalho × staging area |
| `git diff --staged` | Staging area × HEAD                  |
| `git diff HEAD`     | Diretório de trabalho × HEAD         |

### Exemplo

Supondo que o último commit contenha:

```javascript
const pontos = 10
```

Alterar o arquivo para:

```javascript
const pontos = 20
```

E executar:

```bash
git add pontos.js
```

Nesse momento:

| Área                  | Conteúdo             |
| --------------------- | -------------------- |
| HEAD                  | `const pontos = 10;` |
| Staging area          | `const pontos = 20;` |
| Diretório de trabalho | `const pontos = 20;` |

Agora, alterar novamente o arquivo, sem executar outro `add`:

```javascript
const pontos = 30
```

As áreas ficam assim:

| Área                  | Conteúdo             |
| --------------------- | -------------------- |
| HEAD                  | `const pontos = 10;` |
| Staging area          | `const pontos = 20;` |
| Diretório de trabalho | `const pontos = 30;` |

Resultados:

- `git diff` mostra a mudança de `20` para `30`.
- `git diff --staged` mostra a mudança de `10` para `20`.
- `git diff HEAD` mostra a mudança de `10` para `30`.

Ao criar o commit, a versão registrada terá **20**, pois esse é o conteúdo preparado.

A versão com **30** continuará no diretório de trabalho como alteração não preparada.

## 6. Estados dos arquivos

Os estados indicam como os arquivos se relacionam com essas áreas.

| Estado     | Significado                                                |
| ---------- | ---------------------------------------------------------- |
| Untracked  | O arquivo ainda não é acompanhado                          |
| Unmodified | O arquivo acompanhado está igual ao conteúdo registrado    |
| Modified   | Existem alterações não preparadas                          |
| Staged     | Existem alterações preparadas para commit                  |
| Ignored    | O arquivo não acompanhado corresponde a regras de exclusão |

**Um mesmo arquivo pode ter alterações staged e modified ao mesmo tempo.**

Isso ocorre quando uma versão é preparada e depois o arquivo é editado novamente.

### Status resumido

```bash
git status --short
```

Para arquivos acompanhados, as duas colunas iniciais representam:

- Primeira coluna: situação da staging area em relação ao HEAD.
- Segunda coluna: situação do diretório de trabalho em relação à staging area.

| Saída          | Interpretação                                 |
| -------------- | --------------------------------------------- |
| `?? novo.js`   | Arquivo untracked                             |
| `A  novo.js`   | Arquivo novo preparado                        |
| ` M app.js`    | Alteração não preparada                       |
| `M  app.js`    | Alteração preparada                           |
| `MM app.js`    | Alterações preparadas e outras não preparadas |
| ` D antigo.js` | Exclusão não preparada                        |
| `D  antigo.js` | Exclusão preparada                            |

## 7. Retirar alterações da staging area

```bash
git restore --staged anotacoes.md
```

Retirar as alterações do próximo commit, preservando o arquivo no diretório de trabalho.

Em um repositório com commits, o comando restaura a entrada da staging area conforme o HEAD.

- Se o arquivo já era acompanhado, as edições passam a ficar apenas como alterações locais.
- Se era um arquivo novo preparado, ele volta a ser untracked.

**Esse comando não descarta as edições do arquivo.**

## 8. Descartar alterações não preparadas

```bash
git restore anotacoes.md
```

Restaurar o arquivo no diretório de trabalho a partir da staging area.

**Esse comando descarta alterações locais não preparadas do arquivo.**

Se houver conteúdo preparado, ele será preservado e usado como origem da restauração.

No exemplo dos valores:

| Área                  | Antes | Depois de `git restore pontos.js` |
| --------------------- | ----- | --------------------------------- |
| HEAD                  | `10`  | `10`                              |
| Staging area          | `20`  | `20`                              |
| Diretório de trabalho | `30`  | `20`                              |

Alterações nunca registradas ou preservadas em outro lugar podem não ser recuperáveis.

O comando não serve para remover arquivos untracked.

## 9. Registrar exclusões

Excluir um arquivo pelo editor altera somente o diretório de trabalho. A exclusão também precisa ser preparada para entrar no commit.

```bash
git add arquivo-excluido.js
```

Preparar a exclusão de um arquivo acompanhado que já foi removido.

Outra opção:

```bash
git rm arquivo.js
```

Remover o arquivo do diretório de trabalho e preparar sua exclusão. O Git pode recusar a operação se houver alterações que seriam perdidas.

### Parar de acompanhar sem excluir o arquivo local

```bash
git rm --cached configuracao-local.json
```

Preparar a remoção do arquivo do versionamento, mantendo sua cópia no diretório de trabalho.

Adicionar uma regra ao `.gitignore` quando o arquivo também não deva ser adicionado novamente.

**Isso não remove o conteúdo dos commits antigos.**

## 10. Arquivos ignorados

O `.gitignore` define padrões para arquivos que não devem ser adicionados normalmente.

```gitignore
node_modules/
.env
*.log
```

Essas regras não deixam de acompanhar arquivos que já foram versionados.

Para listar arquivos ignorados no status:

```bash
git status --ignored
```

## 11. Commit e push são etapas diferentes

```bash
git commit -m "feat: adicionar exercício"
```

Registrar uma versão no repositório local.

```bash
git push
```

Enviar commits e atualizar referências no remoto conforme a configuração da branch.

**O push não envia alterações soltas do diretório de trabalho nem da staging area.**

Antes de publicar uma alteração, ela precisa estar registrada em um commit.

## 12. Atalho com commit -a

```bash
git commit -am "fix: corrigir cálculo"
```

Preparar automaticamente modificações e exclusões de arquivos já acompanhados e criar o commit.

Esse atalho **não inclui arquivos untracked**.

Evitar o atalho quando for necessário selecionar cuidadosamente partes das alterações.

## Fluxo recomendado

```bash
git status
git diff
git add anotacoes.md
git diff --staged
git commit -m "docs: atualizar anotações"
git status
```

1. Identificar o estado atual.
2. Revisar as alterações não preparadas.
3. Preparar somente o conteúdo desejado.
4. Conferir o próximo commit.
5. Registrar a versão.
6. Verificar se restaram alterações.

## Exercício prático

Em um repositório de prática com pelo menos um commit:

1. Criar `pontos.js` com `const pontos = 10;`.
2. Preparar e registrar esse arquivo.
3. Alterar o valor para `20` e executar `git add pontos.js`.
4. Alterar o valor para `30`, sem preparar novamente.
5. Executar `git status --short`.
6. Comparar `git diff`, `git diff --staged` e `git diff HEAD`.
7. Criar um commit.
8. Consultar o arquivo e o status novamente.

**Resultado esperado:** o commit deve registrar `20`, enquanto o arquivo local continua com `30` como alteração não preparada.

## Pontos de atenção

- `git add` prepara uma versão do conteúdo, não acompanha automaticamente as próximas edições.
- Um arquivo pode conter alterações preparadas e não preparadas.
- `git restore --staged` preserva as edições locais.
- `git restore` pode descartar trabalho não preparado.
- Diretório de trabalho limpo não significa que os commits já foram enviados ao remoto.
- Staging e commits registram conteúdo; não movimentam os arquivos para outra pasta.
