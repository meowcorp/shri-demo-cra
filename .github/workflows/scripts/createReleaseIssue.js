const {getIssueTemplate} = require('./helpers')

module.exports = async ({github, context, core}) => {
    const {TAG, TAG_TIMESTAMP, TAG_TIMESTAMP_UPDATED, RELEASE_AUTHOR, CHANGELOG} = process.env

    const template = getIssueTemplate({
        timestamp: TAG_TIMESTAMP, 
        author: RELEASE_AUTHOR,
        tag: TAG,
        changelog: CHANGELOG 
    }, context)

    const issue = await github.rest.search.issuesAndPullRequests({
        q: `${TAG} in:title is:issue label:RELEASE`
    })

    if (issue) {
        await github.rest.issues.update({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issue.data.number,
            body: template,
            state: "open"
        }); 

        core.setOutput('issueID', issue.data.number)
    } else {
        const createdIssue = await github.rest.issues.create({
            owner: context.repo.owner,
            repo: context.repo.repo,
            title: TAG,
            body: template,
            labels: ["release"]
          });

          core.setOutput('issueID', createdIssue.data.number)
    }
}