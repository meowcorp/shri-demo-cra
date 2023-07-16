
const core = require('@actions/core')
const github = require('@actions/github')

async function run () {
    try {
        const sha = core.getInput('sha', {required: true});
        const accessToken = core.getInput('token', {required: true});
        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;
    
        const octokit = github.getOctokit(accessToken)
    
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
      
      const res = await octokit.graphql(queryLastTag, {
          owner,
          repo,
          currentTagOid: sha
      });
      const lastTag = res.repository.refs.nodes[0]?.name;
    
      let commits = []
    
      if (!lastTag) {
          const commit = await octokit.rest.git.getCommit({
            owner,
            repo,
            commit_sha: sha,
          });
          commits = [{commit: commit.data}]
      } else {
          const compare = await octokit.rest.repos.compareCommitsWithBasehead({
              owner,
              repo,
              basehead: `${lastTag}...${sha}`,
          });
          commits = compare.data.commits;
      }
    
      const BASE_URL = `https://github.com/${owner}/${repo}`
    
      const changelog = commits.reverse().map((commit) => {
          const link = `${BASE_URL}/commit/${commit.sha}`
    
          return `* [${commit.commit.message}](${link})`
      }).join('\n')
    
      core.setOutput('changelog', changelog)
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()