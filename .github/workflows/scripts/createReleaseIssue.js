module.exports = async ({github, context, core}) => {
    const {TAG, TAG_TIMESTAMP, TAG_TIMESTAMP_UPDATED, RELEASE_AUTHOR, CHANGELOG} = process.env

    await github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: TAG,
        body: `
            # Информация
            Был создан новый релиз\
            Дата создания: ${TAG_TIMESTAMP}\
            Версия: ${TAG}\
            Автор: ${RELEASE_AUTHOR}

            ## Список изменений:
            ${CHANGELOG}
        `.replaceAll(/[ \t]+/g, ''),
        labels: ["release"]
      });
}