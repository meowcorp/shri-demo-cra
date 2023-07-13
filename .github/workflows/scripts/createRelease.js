const {getReleaseTemplate} = require('./helpers')

module.exports = async ({github, context}) => {
    const {TAG} = process.env

    const template = getReleaseTemplate({
        CHANGELOG: process.env.CHANGELOG
    })

    const release = await github.rest.repos.getReleaseByTag({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag: TAG,
    });

    const releaseProps = {
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag_name: TAG,
        name: `Release ${TAG}`,
        body: template,
    }

    if (release) {
        await github.rest.repos.updateRelease(releaseProps);
    } else {
        await github.rest.repos.createRelease(releaseProps);
    }
}