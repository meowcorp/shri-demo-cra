module.exports = async ({github, context, core}) => {
    const queryLastTag = `
      query ($owner: String!, $repo: String!, $currentTagOid: String!) {
        repository (owner: $owner, name: $repo) {
            refs (refPrefix: "refs/tags/", last: 1, before: $currentTagOid) {
                nodes {
                    name
                }
            }
        }
      }
    `
    const {SHA, TAG} = process.env
    if (!SHA || !TAG) {
        core.setFailed(`Invalid current tag`);
        return
    }
    
    const res = await github.graphql(queryLastTag, {
        owner: context.repo.owner,
        repo: context.repo.repo,
        currentTagOid: SHA
    });
    const lastTag = res.repository.refs.nodes[0]?.name;

    let commits = []

    if (!lastTag) {
        const commit = await github.rest.repos.getCommit({
            owner: context.repo.owner,
            repo: context.repo.repo,
            ref: TAG
        });
        commits = [commit.data]
    } else {
        const compare = await github.rest.repos.compareCommitsWithBasehead({
            owner: ontext.repo.owner,
            repo: context.repo.repo,
            basehead: `${prevTagName}...${TAG}`,
        });
        commits = compare.data.commits;
    }

    const changelog = commits.reverse().map(({commit}) => {
        return `[${commit.url}](${commit.message})`
    }).join('\n')

    core.exportVariable('changelog', changelog)
}