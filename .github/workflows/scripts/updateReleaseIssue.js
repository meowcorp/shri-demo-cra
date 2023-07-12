const {getIssueTemplate} = require('./helpers')

module.exports = async ({github, context}) => {
    const {TAG_TIMESTAMP, RELEASE_AUTHOR, CHANGELOG} = process.env
    const template = getIssueTemplate({
      timestamp: TAG_TIMESTAMP, 
      author: RELEASE_AUTHOR,
      tag: TAG,
      changelog: CHANGELOG,
      isUpdate: true
    }, context)
    await github.rest.issues.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: ISSUE_ID,
      body: template,
    });
}