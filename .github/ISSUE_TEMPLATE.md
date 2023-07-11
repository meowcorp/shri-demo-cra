---
title: New Release {{ ref }}
labels: RELEASE
---
# Release {{ ref }}:

Author: {{ actor }}
Date: {{ date | date('dddd, MMMM Do') }}

## Changelog:

{{ env.CHANGELOG }}