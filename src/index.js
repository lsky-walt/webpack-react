const program = require('commander')
const inquirer = require('inquirer')
const {generate} = require('./generate')

const list = [
  {
    type: 'input',
    message: '项目名称',
    name: 'projectName',
    default: 'webpack-react',
  },
]

program
  .command('create')
  .description('create project')
  .action(() => {
    inquirer.prompt(list)
      .then(res => {
        const {projectName} = res
        generate(projectName)
      })
  })