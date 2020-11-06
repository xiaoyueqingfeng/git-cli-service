#!/usr/bin/env node
const inquirer = require('inquirer')
const tasks = require('../lib/index')
const configs = require('../constants/config')
const fs = require('fs')
const run = () => {
  const args = process.argv.splice(2)
  if (args.length && ['-v', '--version'].includes(args[0].toLowerCase())) {
    return console.log(`v${require('../package.json').version}`)
  }
  if (!fs.existsSync('.git')) {
    return console.log('No git repository!')
  }
  const taskChoices = []
  const keys = Object.keys(configs)
  keys.forEach(key => {
    taskChoices.push({
      name: configs[key].title,
      value: configs[key].taskName
    })
  })
  const promptList = [{
    type: 'rawlist',
    message: `What do you want?`,
    name: 'taskName',
    choices: taskChoices
  }]
  inquirer.prompt(promptList).then(answers => {
    tasks[answers.taskName]()
  })
}
run()