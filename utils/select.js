const git = require('git-utils-node')
const inquirer = require('inquirer')
const selectBranchSource = () => {
  git.fetch()
  git.prune()
  return new Promise(resolve => {
    const latestTag = git.latestTagName()
    const branchSourceChoices = [{
      name: `latest tag: ${latestTag}`,
      value: latestTag
    }, {
      name: 'master',
      value: 'origin/master'
    }]
    const promptList = [{
      type: 'rawlist',
      message: `Please select branch source:`,
      name: 'branchSource',
      choices: branchSourceChoices
    }]
    inquirer.prompt(promptList).then(answers => {
      const { branchSource } = answers
      resolve(branchSource)
    })
  })
}

module.exports = {
  selectBranchSource
}