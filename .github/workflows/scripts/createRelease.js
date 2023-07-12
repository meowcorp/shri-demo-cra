const {getReleaseTemplate} = require('./helpers')

module.exports = async ({github, context}) => {
    const {TAG} = process.env

    const template = getReleaseTemplate({
        CHANGELOG: process.env.CHANGELOG
    })

    await github.rest.repos.createRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag_name: TAG,
        name: `Release ${TAG}`,
        body: template,
    });
}