import * as core from '@actions/core';
import * as github from '@actions/github';

const getReleaseRef = (tag) => `heads/release-${tag}` 

async function run () {
    try {
        const accessToken = core.getInput('token', { required: true });
        const tag = core.getInput('releaseTag', { required: true });
        const commitSHA = core.getInput('commitSHA', { required: true })
        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;
        const relaseRef = getReleaseRef(tag)

        const octokit = github.getOctokit(accessToken)
        await octokit.rest.git.createRef({
            owner,
            repo,
            ref: `refs/${relaseRef}`,
            sha: commitSHA,
        }).catch((error) => core.info(error.message));

    } catch (error) {
        core.setFailed(error.message)
    }
}

run()