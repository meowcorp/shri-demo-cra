---
title: ":pencil2: {{ env.TAG }}"
labels: release-candidate
---
# :pencil2: Релиз {{ env.TAG }}
Автор релиза: {{ actor }}   
Дата релиза: {{ payload.head_commit.timestamp | date('dddd, MMMM Do') }}
Версия: [{{ env.TAG }}](https://github.com/{{ repo.owner }}/{{ repo.repo }}/releases/tag/{{ env.TAG }})

## :blue_book: Список изменений

{{ env.CHANGELOG }}