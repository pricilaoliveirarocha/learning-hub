# Fundamentos do Git

## O que é Git?

Git é um sistema de controle de versão distribuído. Ele registra versões de um projeto e permite consultar o histórico, comparar alterações, recuperar trabalho e colaborar.

Ser distribuído significa que um clone comum mantém o histórico local do repositório. Não é necessário estar conectado à internet para criar commits, consultar versões ou trabalhar em branches.

## Git e GitHub

| Git                          | GitHub                                    |
| ---------------------------- | ----------------------------------------- |
| Controlar versões do projeto | Hospedar repositórios Git                 |
| Funcionar localmente         | Oferecer colaboração online               |
| Criar commits e branches     | Oferecer pull requests, revisões e issues |

Git pode ser usado sem GitHub. Outros serviços, como GitLab e Bitbucket, também hospedam repositórios Git.

## Repositório

Um repositório reúne os arquivos versionados e o histórico do projeto.

A pasta `.git` armazena os dados internos do repositório, como commits, referências e configurações. Excluir essa pasta remove o histórico local do Git, mas mantém os arquivos de trabalho.

### Criar ou clonar

```bash
git init
```

Inicializar um repositório no diretório atual. Esse comando não cria um repositório no GitHub.

```bash
git clone https://github.com/usuario/projeto.git
```

Criar uma cópia local de um repositório existente e configurar a conexão com sua origem.

## As três áreas do Git

| Área                 | Função                                            |
| -------------------- | ------------------------------------------------- |
| Working directory    | Trabalhar nos arquivos locais                     |
| Staging area — index | Preparar o conteúdo que entrará no próximo commit |
| Repositório local    | Armazenar os commits e o histórico                |

O fluxo básico é:

1. Editar um arquivo no working directory.
2. Preparar seu conteúdo com `git add`.
3. Registrar o conteúdo preparado com `git commit`.

## Estado dos arquivos

| Estado    | Significado                                              |
| --------- | -------------------------------------------------------- |
| Untracked | Arquivo ainda não acompanhado pelo Git                   |
| Modified  | Arquivo acompanhado com alterações locais não preparadas |
| Staged    | Conteúdo preparado para o próximo commit                 |

Um arquivo pode ter alterações preparadas e não preparadas ao mesmo tempo.

Isso acontece ao executar `git add` e depois editar o arquivo novamente. O próximo commit recebe a versão preparada, não as edições posteriores.

## O que é um commit?

Um commit registra uma versão do conteúdo preparado, junto com informações como:

- Identificador calculado por hash.
- Autor e responsável pelo registro.
- Datas e mensagem.
- Referência ao commit anterior, quando existir.

Conceitualmente, o commit representa um snapshot dos arquivos versionados. O Git reutiliza conteúdo que não mudou para armazenar o histórico com eficiência.

**Criar um commit não envia alterações ao GitHub.** O commit é local; o envio é feito com `git push`.

## Primeiro fluxo de trabalho

### 1. Consultar o estado

```bash
git status
```

Identificar arquivos novos, modificados e preparados.

### 2. Revisar as alterações locais

```bash
git diff
```

Comparar alterações não preparadas de arquivos acompanhados com o conteúdo da staging area.

Arquivos untracked não aparecem nesse diff.

### 3. Preparar um arquivo

```bash
git add anotacoes.md
```

Preparar o conteúdo atual de `anotacoes.md`.

O comando também permite preparar alterações posteriores em um arquivo já acompanhado.

### 4. Revisar o próximo commit

```bash
git diff --staged
```

Comparar a staging area com o último commit. Usar para conferir o que será registrado.

### 5. Registrar a versão

```bash
git commit -m "docs: adicionar fundamentos do Git"
```

Criar um commit com as alterações preparadas. A opção `-m` define a mensagem.

### 6. Consultar o histórico

```bash
git log --oneline
```

Exibir os commits com identificador abreviado e mensagem.

## Branch e HEAD

Uma branch é uma referência móvel para um commit. Ela permite desenvolver uma linha de trabalho separada.

`HEAD` indica a posição atual no histórico. Normalmente, aponta para a branch em uso, que aponta para seu commit mais recente.

Ao criar um commit nessa branch, ela avança para o novo commit.

`main` é um nome comum para a branch principal, mas não é obrigatório.

## Repositório local e remoto

O repositório local fica na máquina de trabalho. Um remoto é outro repositório configurado para troca de dados.

`origin` é o nome normalmente atribuído ao remoto criado por `git clone`. É uma convenção, não uma palavra obrigatória.

| Comando         | Finalidade                                                                        |
| --------------- | --------------------------------------------------------------------------------- |
| `git remote -v` | Consultar os remotos configurados                                                 |
| `git fetch`     | Buscar dados e atualizar referências remotas locais, sem integrar na branch atual |
| `git pull`      | Buscar dados e integrá-los conforme as opções e configurações                     |
| `git push`      | Enviar commits e atualizar referências no remoto                                  |

## Identidade dos commits

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

Definir a identidade usada nos próximos commits.

Essas configurações não realizam login no GitHub. A autenticação no serviço remoto é configurada separadamente.

Para configurar somente o repositório atual, executar os comandos sem `--global`.

## Boas práticas

- Revisar `git status` e `git diff --staged` antes de criar um commit.
- Agrupar alterações relacionadas em cada commit.
- Escrever mensagens que expliquem a mudança.
- Não versionar senhas, tokens ou arquivos com segredos.
- Usar `.gitignore` para arquivos que não devem ser acompanhados.
- Considerar que `.gitignore` não remove arquivos já versionados.
- Não confundir salvar um arquivo, criar um commit e enviar com push.

## Exercício

Em um repositório de prática:

1. Inicializar o Git com `git init`.
2. Criar `anotacoes.md` e consultar `git status`.
3. Preparar o arquivo com `git add anotacoes.md`.
4. Editar o arquivo novamente, sem executar outro `add`.
5. Comparar os resultados de `git diff` e `git diff --staged`.
6. Criar um commit e consultar `git status`.

**Resultado esperado:** o commit deve conter somente o conteúdo preparado. A edição feita depois do `add` deve permanecer como alteração local.
