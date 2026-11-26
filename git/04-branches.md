# Branches no Git

## 1. O que é uma branch?

Uma branch é uma referência móvel para um commit.

Ela identifica uma linha de desenvolvimento, permitindo trabalhar em uma funcionalidade, correção ou estudo sem atualizar diretamente outra branch.

Criar uma branch não duplica todos os arquivos nem o histórico. Inicialmente, a nova branch aponta para um commit já existente.

Ao criar commits nessa branch, sua referência avança para os novos commits.

### Exemplo

Supondo que `main` e `estudos/arrays` apontem para o mesmo commit:

- Criar um commit em `estudos/arrays` avança somente essa branch.
- `main` continua apontando para o commit anterior.
- As alterações só chegam à `main` quando forem integradas.

**Branches isolam linhas de histórico. Elas não criam pastas separadas no computador.**

## 2. Branch atual e HEAD

`HEAD` indica a posição atual no histórico.

Normalmente, aponta para a branch em uso. Essa branch, por sua vez, aponta para um commit.

Ao criar um commit:

1. O Git registra o conteúdo preparado.
2. O novo commit referencia o anterior como pai.
3. A branch atual passa a apontar para o novo commit.

### Consultar a branch atual

```bash
git branch --show-current
```

Exibir o nome da branch em uso.

```bash
git status
```

Consultar a branch atual e o estado dos arquivos.

## 3. Listar branches

### Branches locais

```bash
git branch
```

Listar as branches locais. O asterisco identifica a branch atual.

Exemplo:

```text
* estudos/arrays
  main
```

### Mostrar o último commit de cada branch

```bash
git branch -v
```

Exibir o nome, o identificador abreviado e a mensagem do último commit.

### Mostrar também o acompanhamento remoto

```bash
git branch -vv
```

Exibir informações sobre a branch de acompanhamento, quando configurada.

A indicação de commits à frente ou atrás depende das referências remotas conhecidas localmente. Ela não consulta o servidor.

### Referências de acompanhamento remoto

```bash
git branch -r
```

Listar referências como `origin/main`.

Elas representam o último estado conhecido das branches remotas, atualizado por operações como `git fetch`.

### Todas as referências de branch disponíveis

```bash
git branch -a
```

Listar branches locais e referências de acompanhamento remoto.

## 4. Criar uma branch

```bash
git branch estudos/arrays
```

Criar a branch a partir do commit atual.

**Esse comando não troca a branch em uso.**

### Criar a partir de outra branch

```bash
git branch estudos/funcoes main
```

Criar `estudos/funcoes` apontando para o mesmo commit de `main`.

### Criar a partir de um commit específico

```bash
git branch investigacao a1b2c3d
```

Substituir `a1b2c3d` pelo identificador real do commit.

A branch começa naquela versão e pode receber novos commits normalmente.

## 5. Trocar de branch com switch

```bash
git switch estudos/arrays
```

Trocar para uma branch local existente.

O Git atualiza o diretório de trabalho e a staging area conforme a branch de destino, preservando alterações locais quando a operação for permitida.

### Criar e trocar em um comando

```bash
git switch -c estudos/objetos
```

Criar uma branch a partir do commit atual e começar a trabalhar nela.

### Criar a partir de uma base explícita

```bash
git switch -c estudos/promises main
```

Criar `estudos/promises` a partir de `main` e trocar para ela.

**A base escolhida determina quais commits já estarão no histórico da nova branch.**

### Voltar para a branch anterior

```bash
git switch -
```

Alternar para a posição anterior registrada pelo Git.

## 6. Diferença entre branch e switch

| Comando | Comportamento |
|---|---|
| `git branch estudos/arrays` | Criar a branch sem trocar |
| `git switch estudos/arrays` | Trocar para uma branch existente |
| `git switch -c estudos/arrays` | Criar e trocar |
| `git branch` | Listar branches locais |

## 7. Checkout e switch

Em projetos existentes, é comum encontrar:

```bash
git checkout main
```

Equivalente ao uso de `git switch main` para trocar de branch.

```bash
git checkout -b estudos/arrays
```

Equivalente ao uso de `git switch -c estudos/arrays` para criar e trocar.

O comando `checkout` também possui outras responsabilidades, como restaurar arquivos.

Para deixar a intenção mais clara:

- Usar `switch` para trocar de branch.
- Usar `restore` para restaurar conteúdo de arquivos.

## 8. Alterações não commitadas ao trocar de branch

Alterações locais não pertencem exclusivamente a uma branch enquanto não forem registradas em commits.

Dependendo do conteúdo das branches e dos arquivos alterados, o Git pode:

- Permitir a troca e manter as alterações locais.
- Recusar a troca para evitar sobrescrever trabalho.

### Exemplo

```bash
git switch estudos/arrays
```

Se a troca sobrescrever uma edição local, o Git interromperá a operação e exibirá uma mensagem.

### Opções para continuar

1. Criar um commit na branch apropriada.
2. Guardar temporariamente as alterações com `stash`.
3. Descartar alterações somente quando não forem mais necessárias.

```bash
git stash push -u -m "rascunho antes de trocar de branch"
git switch main
```

A opção `-u` inclui arquivos untracked, mas não arquivos ignorados.

Para recuperar posteriormente:

```bash
git stash list
git stash apply
```

`apply` reaplica as alterações sem remover o registro do stash. A reaplicação pode gerar conflitos.

**Trocar de branch não é uma forma de salvar alterações.**

## 9. Criar commits na branch correta

Antes de editar ou registrar uma mudança:

```bash
git branch --show-current
git status
```

Depois de preparar o conteúdo:

```bash
git diff --staged
git commit -m "docs: adicionar exemplos de arrays"
```

O novo commit atualiza a branch atual.

Criar uma branch depois de um commit não remove esse commit da branch onde ele foi registrado.

## 10. Comparar branches

### Comparar o conteúdo das pontas

```bash
git diff main estudos/arrays
```

Mostrar as diferenças entre os snapshots atuais dessas branches.

### Revisar alterações desde a divergência

```bash
git diff main...estudos/arrays
```

Comparar o ancestral comum com a ponta de `estudos/arrays`.

Essa comparação é útil para revisar o trabalho introduzido na branch.

### Listar commits exclusivos da branch de estudos

```bash
git log --oneline main..estudos/arrays
```

Mostrar commits alcançáveis por `estudos/arrays`, mas não por `main`.

### Visualizar o histórico

```bash
git log --oneline --graph --decorate --all
```

Observar os pontos de divergência e integração entre branches.

## 11. Renomear uma branch

### Renomear a branch atual

```bash
git branch -m estudos/arrays-metodos
```

Alterar o nome da branch em uso.

### Renomear outra branch

```bash
git branch -m nome-antigo nome-novo
```

Renomear uma branch local sem precisar trocar para ela.

Esses comandos não renomeiam automaticamente uma branch publicada no servidor.

## 12. Excluir uma branch local

Primeiro, sair da branch que será excluída:

```bash
git switch main
```

Depois:

```bash
git branch -d estudos/arrays
```

Excluir a referência local.

A opção `-d` verifica se a branch foi integrada em sua upstream, quando configurada, ou no HEAD atual quando não houver upstream.

**A aprovação dessa verificação não garante, por si só, que o trabalho esteja na `main`.**

### Conferir integração na main

```bash
git branch --merged main
```

Listar branches cujas pontas já são alcançáveis a partir de `main`.

```bash
git log --oneline main..estudos/arrays
```

Verificar se existem commits da branch que não estão no histórico de `main`.

Integrações por squash podem levar o conteúdo para `main` sem preservar os commits originais. Nesse caso, também será necessário revisar o resultado da integração.

### Forçar a exclusão

```bash
git branch -D estudos/arrays
```

Excluir a branch sem exigir a verificação de integração.

Essa operação pode remover a referência mais fácil para commits ainda não integrados.

**Excluir uma branch não apaga imediatamente os objetos dos commits.** Entretanto, commits sem referências podem se tornar difíceis de localizar e ser removidos posteriormente pela manutenção do Git.

Não é possível excluir uma branch que esteja em uso em algum worktree.

## 13. Branch local e branch remota

| Referência | Significado |
|---|---|
| `estudos/arrays` | Branch local |
| `origin/estudos/arrays` | Último estado remoto conhecido localmente |
| Branch no servidor | Referência existente no repositório remoto |

Esses elementos são relacionados, mas diferentes.

### Publicar uma branch

```bash
git push -u origin estudos/arrays
```

Enviar a branch ao remoto e configurar seu acompanhamento.

A opção `-u` define a upstream para facilitar os próximos comandos `push` e `pull`.

### Criar uma branch local a partir da referência remota

```bash
git fetch origin
git switch -c estudos/arrays --track origin/estudos/arrays
```

Atualizar as referências remotas e criar a branch local acompanhando a correspondente no remoto.

Executar a criação somente se a branch local ainda não existir.

### Excluir uma branch remota

```bash
git push origin --delete estudos/arrays
```

Excluir a branch no servidor. Essa ação afeta o repositório compartilhado.

A exclusão local com `git branch -d` não exclui a branch remota, e o contrário também não acontece automaticamente.

## 14. Detached HEAD

Detached HEAD é o estado em que `HEAD` aponta diretamente para um commit, sem estar associado a uma branch local.

### Inspecionar um commit antigo

```bash
git switch --detach a1b2c3d
```

Consultar o projeto naquela versão.

É possível criar commits nesse estado, mas eles não avançam uma branch nomeada.

### Preservar trabalho criado nesse estado

```bash
git switch -c investigacao/versao-antiga
```

Criar uma branch no commit atual.

Isso fornece uma referência para os commits antes de sair dessa posição.

### Voltar à branch principal

```bash
git switch main
```

Se commits foram criados em detached HEAD e não receberam uma branch, eles podem precisar ser localizados pelo reflog.

## 15. Convenções de nomes

Os prefixos abaixo são convenções de organização, não recursos especiais do Git.

| Nome | Uso possível |
|---|---|
| `feat/cadastro` | Desenvolver uma funcionalidade |
| `fix/calculo-total` | Corrigir um comportamento |
| `docs/fundamentos-git` | Atualizar documentação |
| `refactor/validacao` | Reorganizar código |
| `estudos/closures` | Isolar uma etapa de aprendizagem |

Preferir nomes curtos, descritivos e sem espaços.

### Verificar se o nome é válido

```bash
git check-ref-format --branch estudos/closures
```

Validar o nome conforme as regras do Git.

A barra organiza o nome da referência; ela não cria uma pasta de código para a branch.

## 16. Trabalhar com duas branches ao mesmo tempo

Um diretório de trabalho comum mantém uma branch ativa por vez.

Para abrir outra branch em um diretório separado, usar worktrees:

```bash
git worktree add ../learning-hub-revisao main
```

Criar outro diretório de trabalho conectado ao mesmo repositório.

O Git normalmente impede usar a mesma branch simultaneamente em dois worktrees.

Esse recurso é útil para revisar outra versão sem interromper a edição atual.

## Fluxo prático

Em um repositório de prática com uma branch `main` e pelo menos um commit:

```bash
git switch main
git status
git switch -c estudos/closures
```

Editar ou criar o arquivo desejado. Depois:

```bash
git add closures.js
git diff --staged
git commit -m "docs: adicionar exemplos de closures"
```

Revisar o trabalho:

```bash
git log --oneline main..estudos/closures
git diff main...estudos/closures
```

Voltar à base:

```bash
git switch main
```

Os arquivos acompanhados passam a refletir a versão de `main`, respeitando as regras para alterações locais.

**O commit continua preservado na branch `estudos/closures`.** Voltar à `main` não integra o trabalho automaticamente.

## Exercício

1. Consultar a branch atual.
2. Criar `estudos/branches` a partir de `main`.
3. Adicionar um arquivo e registrar um commit.
4. Comparar a nova branch com `main`.
5. Voltar à `main` e observar os arquivos.
6. Retornar à branch de estudos.
7. Confirmar que o commit e o arquivo continuam disponíveis.
8. Renomear a branch para `estudos/git-branches`.

## Pontos de atenção

- Criar uma branch não troca a branch atual.
- Trocar de branch não cria um commit.
- Branches não mantêm edições locais separadas automaticamente.
- Uma branch nova herda o histórico do ponto escolhido como base.
- Excluir uma branch local não exclui a remota.
- Publicar uma branch não integra seu conteúdo na principal.
- Preferir branches focadas em uma mudança e revisá-las antes da integração.