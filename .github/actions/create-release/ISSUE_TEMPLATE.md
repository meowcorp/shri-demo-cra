---
title: {{ env.TAG }}
labels: {{ env.LABELS }}
---
# Релиз {{ env.TAG }}
Автор релиза: {{ actor }}
Дата релиза: {{ payload.head_commit.timestamp | date('dddd, MMMM Do') }}
Версия: [{{ env.TAG }}](https://github.com/{{ owner }}/{{ repo }}/releases/tag/{{ env.TAG }})

## Список изменений

{{ env.CHANGELOG }}