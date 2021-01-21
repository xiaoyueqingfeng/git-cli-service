const git = require('git-utils-node')
const chalk = require('chalk')
const inquirer = require('inquirer')
const execSync = require('child_process').execSync
const { selectBranchSource } = require('../utils/select')
const tempBranchName = 'TEMP_BRANCH'

const selectIgnoreBranchs = () => {
  return new Promise(resolve => {
    const branches = git.remoteBranches()
    branches.filter(branch => !['master'].includes(branch))
    const ignoreBranchChoices = []
    branches.forEach(branch => {
      if (branch !== 'origin/master') {
        ignoreBranchChoices.push({
          name: branch,
          value: branch.replace('origin/', '')
        })
      }
    })
    if (!ignoreBranchChoices.length) {
      return resolve([])
    }
    const promptList = [{
      type: 'checkbox',
      message: `Please select the branches you want to ignore:`,
      name: 'ignoreBranches',
      choices: ignoreBranchChoices
    }]
    inquirer.prompt(promptList).then(answers => {
      const { ignoreBranches } = answers
      resolve(ignoreBranches)
    })
  })
}

const confirmMerge = (branchSource, branches) => {
  if (!branches.length) {
    console.log('Are you kidding me? Nothing to do.')
    return Promise.reject()
  }
  return inquirer.prompt({
    type: 'confirm',
    name: 'isConfirm',
    message: `Are you sure to merge ${branchSource} into all those branches?\n${branches}`
  })
}

const doMerge = (branchSource, ignoreBranches) => {
  console.log(chalk.cyan(`Branch source: ${branchSource}`))
  const remoteBranches = git.remoteBranches()
  console.log('\nRemote branch list:\n', chalk.magenta(remoteBranches.join('\n')))
  const remoteName = git.remoteName()
  const localBranches = git.localBranches()
  console.log('Local branch list:\n', chalk.magenta(localBranches.join('\n')))
  const localMissingBranches = git.localMissingBranches()
  localMissingBranches.forEach(branch => {
    execSync(`git checkout -b ${branch} ${remoteName}/${branch}`)
    localBranches.push(branch)
  })
  const queues = localBranches.filter(branch => {
    return !['master', tempBranchName, ...ignoreBranches].includes(branch) && remoteBranches.includes(`${remoteName}/${branch}`)
  })
  
  const executeTasks = queues => {
    return new Promise((resolve, reject) => {
      if (localBranches.includes(tempBranchName)) {
        execSync(`git branch -D ${tempBranchName}`)
      }
      execSync(`git checkout -b ${tempBranchName} ${branchSource}`)
      /**
       * 更新 master 分支
       */
      execSync(`git branch -D master`)
      execSync(`git checkout -b master ${remoteName}/master`)
      
      const executeTask = () => {
        const branch = queues.shift()
        console.log(chalk.cyan(`Start deal branch`), chalk.magenta(branch))
        execSync(`git checkout ${branch}`)
        git.pull().then(() => {
          console.log(`Successfully pulled branch ${branch}!`)
          git.merge('master').then(() => {
            console.log(`Successfully merged ${branchSource} into ${branch}!`)
            git.setUpstream(remoteName, branch)
            execSync('git push')
            console.log(chalk.green(`Successfully pushed branch ${branch} to ${remoteName}!\n`))
            if (queues.length) {
              executeTask()
            } else {
              resolve()
            }
          }).catch(e => {
            console.log(chalk.red(`Merge branch master into ${branch} went error`))
            console.log(chalk.red('Here are conflict files：') , '\n', chalk.yellow(git.conflicts()))
            reject()
          })
        }).catch(e => {
          console.log(chalk.red(`Pull branch ${branch} went error`))
          reject()
        })
      }
      if (queues.length) {
        executeTask()
      } else {
        resolve()
      }
    })
  }

  confirmMerge(branchSource, queues).then(() => {
    if (!queues.length) {
      console.log('Are you kidding me? Nothing to do.')
      execSync(`git branch -D ${tempBranchName}`)
    }
    executeTasks(queues).then(() => {
      execSync(`git branch -D ${tempBranchName}`)
      console.log(chalk.green('done!'))
    }).catch(() => {})
  }).catch(() => {})
}

const mergeBranch = () => {
  selectBranchSource().then(branchSource => {
    selectIgnoreBranchs().then(ignoreBranches => {
      doMerge(branchSource, ignoreBranches)
    })
  })
}

module.exports = mergeBranch