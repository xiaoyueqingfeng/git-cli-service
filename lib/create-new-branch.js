const git = require('git-utils-node')
const chalk = require('chalk')
const inquirer = require('inquirer')
const execSync = require('child_process').execSync
const { selectBranchSource } = require('../utils/select')
const confirmPush = branch => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'isConfirm',
    message: `Do you need to push ${branch} to origin immediately?`
  })
}
const createNewBranch = () => {
  selectBranchSource().then(branchSource => {
    console.log(`You will create a branch form tag ${chalk.magenta(branchSource)}`)
    const promptList = [{
      type: 'input',
      message: `Please input a branch name:`,
      name: 'branchName',
      validate(val) {
        if(!val){
          return 'Branch name should not be empty'
        }
        if (git.localBranches().concat(git.remoteBranches()).includes(val)) {
          return `Branch name ${val} is already exist. Try again`
        }
        return true
      }
    }]
    inquirer.prompt(promptList).then(answers => {
      const { branchName } = answers
      execSync(`git checkout -b ${branchName} ${branchSource}`)
      confirmPush(branchName).then(confirmPushAnswers => {
        const { isConfirm } = confirmPushAnswers
        if (isConfirm) {
          const remoteName = git.remoteName()
          execSync(`git push ${remoteName} ${branchName}`)
          execSync(`git branch --set-upstream-to=${remoteName}/${branchName} ${branchName}`)
        }
      })
    })
  })
}

module.exports = createNewBranch