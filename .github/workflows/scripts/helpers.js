const getBaseUrl = (context) => `https://${context.serverUrl}/${context.repo.owner}/${context.repo.repo}`

const getIssueTemplate = ({timestamp, tag, author, changelog, isUpdate = false}, context) => {
    const BASE_URL = getBaseUrl(context);

    const tagLink = `${BASE_URL}/releases/tag/${tag}`
    const workflowLink = `${BASE_URL}/actions/runs/${context.runId}`

    const testStatus = isUpdate ? 'Тестирование завершено' : 'В настоящий момент выполняется тестирование кода' 

        return `
# Информация
Был создан новый релиз <br />
Дата создания: ${timestamp} <br />
Версия: [${tag}](${tagLink}) <br />
Автор: ${author}

[${testStatus}](${workflowLink})

## Список изменений:
${changelog}`
}

const getReleaseTemplate = ({CHANGELOG}) => {
    return `
# CHANGELOG
${CHANGELOG}`
}

module.exports = {getIssueTemplate, getBaseUrl, getReleaseTemplate}