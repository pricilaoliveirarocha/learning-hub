# Git — Utils no dia a dia

## .gitignore

| Comando | Para que serve | Uso no dia a dia |
|---|---|---|
| `git status --ignored` | Mostrar também arquivos ignorados | Conferir dependências, logs e arquivos locais |
| `git check-ignore -v -- arquivo.log` | Mostrar qual regra ignora um arquivo | Investigar por que um arquivo não aparece para adicionar |
| `git rm --cached -- .env` | Parar de acompanhar o arquivo, mantendo a cópia local | Retirar do versionamento um arquivo que deveria ser ignorado |

**Adicionar padrões ao `.gitignore` pelo editor. Isso não deixa de acompanhar arquivos já versionados nem remove seu conteúdo do histórico.**

## Stash — guardar trabalho temporariamente

| Comando | Para que serve | Uso no dia a dia |
|---|---|---|
| `git stash push -m "rascunho"` | Guardar alterações de arquivos acompanhados | Interromper uma tarefa para atender outra |
| `git stash push -u -m "rascunho"` | Incluir também arquivos untracked | Guardar trabalho com arquivos novos |
| `git stash list` | Listar os registros guardados | Localizar um rascunho |
| `git stash show -p 'stash@{0}'` | Mostrar as alterações de um registro | Revisar antes de recuperar |
| `git stash apply 'stash@{0}'` | Reaplicar sem remover o registro | Recuperar e conferir o trabalho |
| `git stash pop` | Reaplicar o mais recente e removê-lo se a aplicação funcionar | Retomar uma tarefa |
| `git stash drop 'stash@{0}'` | Excluir um registro | Remover um rascunho que não será necessário |

**A reaplicação pode gerar conflitos. `-u` não inclui arquivos ignorados.**

## Cherry-pick — reaproveitar commits específicos

| Comando | Para que serve | Uso no dia a dia |
|---|---|---|
| `git cherry-pick COMMIT` | Aplicar a mudança de um commit na branch atual | Levar uma correção para outra branch |
| `git cherry-pick A B` | Aplicar os commits informados, na sequência | Reaproveitar mudanças relacionadas |
| `git cherry-pick --no-commit COMMIT` | Aplicar sem criar o commit automaticamente | Revisar ou combinar mudanças antes de registrar |
| `git cherry-pick --continue` | Continuar após resolver e preparar conflitos | Concluir a aplicação |
| `git cherry-pick --abort` | Cancelar a operação em andamento | Voltar ao estado anterior |

**Substituir os identificadores pelos commits reais. Cherry-pick normalmente cria novos commits e não integra toda a branch de origem.**

## Tags — marcar versões

| Comando | Para que serve | Uso no dia a dia |
|---|---|---|
| `git tag` | Listar tags locais | Consultar versões marcadas |
| `git tag -a v1.0.0 -m "Versão 1.0.0"` | Criar uma tag anotada no commit atual | Marcar uma entrega |
| `git show v1.0.0` | Consultar a tag e o commit associado | Investigar uma versão |
| `git push origin v1.0.0` | Publicar uma tag específica | Compartilhar a versão marcada |
| `git switch --detach v1.0.0` | Abrir o projeto na versão marcada | Inspecionar uma entrega antiga |
| `git tag -d v1.0.0` | Excluir somente a tag local | Corrigir uma marcação local equivocada |

**Criar uma tag não publica automaticamente uma release nem executa um deploy, salvo automação configurada.**

## Bisect — encontrar o commit que introduziu um problema

| Comando | Para que serve | Uso no dia a dia |
|---|---|---|
| `git bisect start` | Iniciar a investigação | Procurar a origem de uma regressão |
| `git bisect bad` | Marcar o commit atual como problemático | Informar uma versão em que o erro acontece |
| `git bisect good COMMIT` | Informar uma versão conhecida como correta | Delimitar o intervalo da busca |
| `git bisect good` | Marcar a versão em teste como correta | Continuar a busca após testar |
| `git bisect bad` | Marcar a versão em teste como problemática | Continuar a busca após reproduzir o erro |
| `git bisect skip` | Pular uma versão que não pode ser testada | Ignorar um commit que não compila, por exemplo |
| `git bisect run npm test` | Automatizar a classificação por um comando | Localizar uma regressão reproduzida pelos testes |
| `git bisect reset` | Encerrar e retornar à posição inicial | Voltar ao trabalho após a investigação |

**Começar com o trabalho local organizado. Na execução automatizada, código de saída `0` indica sucesso; `125` indica uma versão a pular.**