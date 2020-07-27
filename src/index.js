#!/usr/bin/env node


const program = require('commander')
const {generate} = require('./generate')

program
  .option('-b, --base', '基础模板')


program.parse(process.argv)

const [projectName] = program.args

// console.log(program.opts())
// console.log(program.args)

generate(projectName)