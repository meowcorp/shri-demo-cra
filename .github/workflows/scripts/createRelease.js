module.exports = async ({github, context}) => {
    const {TAG} = process.env

    await github.rest.repos.createRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag_name: TAG,
        name: `Release ${TAG}`,
        body: `
            # CHANGELOG
            ${process.env.CHANGELOG}
        `
    });
}