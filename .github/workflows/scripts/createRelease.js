module.exports = async ({github, context, core}) => {
    const {TAG} = process.env

    await github.rest.repos.createRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag_name: TAG,
        name: `Release ${TAG}`,
        body: process.env.CHANGELOG
    });
}