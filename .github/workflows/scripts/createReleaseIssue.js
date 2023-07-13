const {getIssueTemplate} = require('./helpers')

module.exports = async ({github, context, core}) => {
    const {TAG, TAG_TIMESTAMP, RELEASE_AUTHOR, CHANGELOG} = process.env

    const template = getIssueTemplate({
        timestamp: TAG_TIMESTAMP, 
        author: RELEASE_AUTHOR,
        tag: TAG,
        changelog: CHANGELOG 
    }, context)

    const issue = await github.rest.search.issuesAndPullRequests({
        q: `${TAG} in:title is:issue label:RELEASE repo:${context.repo.owner}/${context.repo.repo}`
    })

    const issueNumber = issue.data.items[0].number

    if (issue && issueNumber !== undefined) {
        await github.rest.issues.update({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issueNumber,
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