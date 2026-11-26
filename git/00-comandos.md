# Comandos Git — dia a dia

## Consultar

`git status` — Mostrar o estado dos arquivos e da branch.

`git status -sb` — Mostrar o estado de forma resumida.

`git diff` — Mostrar alterações não preparadas.

`git diff --staged` — Mostrar alterações preparadas para o próximo commit.

`git log --oneline -10` — Listar os últimos dez commits.

`git log --oneline --graph --decorate --all` — Visualizar o histórico das branches.

`git show COMMIT` — Mostrar os detalhes e as alterações de um commit.

## Preparar e registrar

`git add ARQUIVO` — Preparar o conteúdo atual de um arquivo.

`git add .` — Preparar alterações do diretório atual e seus subdiretórios.

`git add -p` — Selecionar partes das alterações para preparar.

`git commit -m "mensagem"` — Registrar as alterações preparadas.

`git commit --amend --no-edit` — Incluir o conteúdo preparado no último commit, mantendo a mensagem.

`git commit --amend -m "nova mensagem"` — Substituir o último commit com outra mensagem, incluindo eventuais alterações preparadas.

## Branches

`git branch` — Listar branches locais.

`git branch -a` — Listar branches locais e referências remotas.

`git branch -vv` — Mostrar branches e acompanhamento remoto.

`git switch BRANCH` — Trocar de branch.

`git switch -c BRANCH` — Criar uma branch e trocar para ela.

`git switch -` — Voltar à posição anterior.

`git branch -m NOVO_NOME` — Renomear a branch atual.

`git branch -d BRANCH` — Excluir uma branch local com verificação de integração.

## Remotos

`git clone URL` — Clonar um repositório.

`git remote -v` — Mostrar os remotos configurados.

`git remote add origin URL` — Configurar um remoto chamado origin.

`git remote set-url origin URL` — Alterar a URL do origin.

`git fetch origin` — Buscar atualizações sem integrar na branch atual.

`git fetch --prune origin` — Buscar atualizações e limpar referências remotas obsoletas.

`git pull --ff-only` — Buscar e integrar somente se houver avanço direto.

`git push` — Publicar conforme a configuração da branch.

`git push -u origin BRANCH` — Publicar a branch e configurar acompanhamento.

## Integrar

`git merge BRANCH` — Integrar uma branch na branch atual.

`git merge --abort` — Cancelar um merge em andamento.

`git merge --continue` — Concluir o merge após preparar as resoluções.

`git rebase origin/main` — Reaplicar os commits da branch atual sobre origin/main.

`git rebase --continue` — Continuar após resolver e preparar conflitos.

`git rebase --abort` — Cancelar um rebase em andamento.

`git cherry-pick COMMIT` — Aplicar a mudança de um commit na branch atual.

`git cherry-pick --abort` — Cancelar um cherry-pick em andamento.

## Desfazer e recuperar

`git restore --staged -- ARQUIVO` — Retirar alterações da staging, preservando as edições locais.

`git restore -- ARQUIVO` — Descartar alterações não preparadas, restaurando o conteúdo da staging.

`git revert COMMIT` — Criar um commit que desfaz as alterações de outro.

`git reflog` — Consultar posições anteriores das referências locais.

`git branch recuperacao COMMIT` — Criar uma branch para preservar um commit encontrado.

## Guardar trabalho temporariamente

`git stash push -u -m "mensagem"` — Guardar alterações e arquivos novos, sem incluir ignorados.

`git stash list` — Listar trabalhos guardados.

`git stash show -p` — Mostrar o conteúdo do stash mais recente.

`git stash apply` — Reaplicar o stash mais recente sem removê-lo.

`git stash pop` — Reaplicar o stash mais recente e removê-lo se a aplicação funcionar.

`git stash drop` — Excluir o stash mais recente.

## Comparar branches

`git diff main...HEAD` — Mostrar as alterações da branch atual desde o ancestral comum com main.

`git log --oneline main..HEAD` — Listar commits da branch atual ausentes em main.

## Arquivos ignorados

`git check-ignore -v -- ARQUIVO` — Mostrar qual regra ignora um arquivo.

`git rm --cached -- ARQUIVO` — Parar de acompanhar o arquivo, mantendo a cópia local.

## Versões

`git tag` — Listar tags locais.

`git tag -a v1.0.0 -m "mensagem"` — Marcar o commit atual com uma tag anotada.

`git push origin v1.0.0` — Publicar uma tag específica.