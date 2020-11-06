#!/usr/bin/env node
const git = require('git-utils-node')
const inquirer = require('inquirer')
const execSync = require('child_process').execSync
const chalk = require('chalk')
const deleteBranch = () => {
  const taskChoices = [{
    name: 'select and delete branches',
    value: 'select'
  }, {
    name: 'delete branches by fuzzy matching',
    value: 'fuzzy'
  }]
  const promptList = [{
    type: 'rawlist',
    message: 'Please select a branch match mode:',
    name: 'matchMode',
    choices: taskChoices
  }]
  const confirmAndDelete = branches => {
    return inquirer.prompt({
      type: 'confirm',
      name: 'isConfirm',
      message: `Are you sure to delete those branches?\n${branches}`
    }).then(res => {
      const { isConfirm } = res
      if (isConfirm) {
        execSync(`git branch -D ${branches}`)
        console.log(chalk.green('done!'))
      }
    })
  }
  inquirer.prompt(promptList).then(answers => {
    const { matchMode } = answers
    switch (matchMode) {
      case 'fuzzy':
        inquirer.prompt({
          type: 'input',
          message: 'Please input branch name or pattern:',
          name: 'branchKeyword',
        }).then(answers => {
          const { branchKeyword } = answers
          const branches = execSync(`git branch | grep ${branchKeyword}`).toString().replace('\n', '')
          confirmAndDelete(branches)
        })
        break
      default:
        const branchChoices = []
        const currentBranch = git.currentBranch()
        git.localBranches().forEach(branch => {
          const isCurrentBranch  = branch === currentBranch
          branchChoices.push({
            name: isCurrentBranch ? chalk.yellow(branch) : branch,
            value: branch,
            disabled: isCurrentBranch
          })
        })
        const promptList = [{
          type: 'checkbox',
          message: 'Please select the branches you want to delete:',
          name: 'branches',
          choices: branchChoices
        }]
        inquirer.prompt(promptList).then(answers => {
          const branches = answers.branches.join(' ')
          confirmAndDelete(branches)
        })
        break
    }
  })
}

module.exports = deleteBranch