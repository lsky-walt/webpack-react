
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const write = require('write')
const glob = require('glob')
const {execFile} = require('child_process')
const {promisify} = require('util')


const asyncGlob = promisify(glob)
const asyncExecFile = promisify(execFile)

const { log } = console


// status log
const success = (msg = '执行成功') => {
  log(chalk.success(msg))
}
const warn = (msg = '警告') => {
  log(chalk.warn(msg))
}
const error = (msg = '执行失败') => {
  log(chalk.error(msg))
}
const blue = (msg) => {
  log(chalk.blue(msg))
}


// package object 
const pkg = {
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open",
    "build": "webpack --mode production"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    
  },
  "devDependencies": {
    
  }
}
 




// 当前执行目录
const basePath = process.cwd()
const pkgDir = path.join(__dirname, '../packages')
let cur = null
let pjn = ''


// 创建项目
const createProject = async (projectName = 'webpack-react') => {
  try {
    cur = path.join(basePath, projectName)
    pjn = projectName
    // 判断文件夹是否存在
    if(fs.existsSync(cur)) {
      throw new Error(`${projectName}文件夹已存在！`)
    }
    // 创建项目目录
    await fs.mkdir(cur)
  } catch (err) {
    throw err
  }
}


const copy = async (fileName = '') => {
  try {
    await fs.copyFile(path.join(pkgDir, fileName), path.join(cur, fileName))
  } catch (err) {
    throw err
  }
}

const createPkg = async () => {
  try {
    pkg['name'] = pjn
    await write.promise(path.join(cur, 'package.json'), JSON.stringify(pkg, null, 3))
  } catch (err) {
    throw err
  }
}


// create base file
// create index.html
// webpack.config.js
// babelrc
// index.js
// app.jsx
const copyFileFromPackages = async () => {
  try {
    const files = await asyncGlob("**/*", {cwd: pkgDir, nodir: true, dot: true})
    const queue = files.filter(v => copy(v))
    await Promise.all(queue)
  } catch (err) {
    throw err
  }
}

// install depances
const execShell = async () => {
  try {
    const res = await asyncExecFile(path.join(__dirname, 'install.sh'), [cur])
    const {stdout, stderr} = res
    blue(stdout)
    error(stderr)
  } catch (err) {
    throw err
  }
}


const generate = async (projectName = '') => {
  try {
    await createProject(projectName)
    await createPkg()
    await copyFileFromPackages()
    await execShell()
  } catch (err) {
    error(err.toString)
    throw err
  }
}


module.exports = {
  generate
}