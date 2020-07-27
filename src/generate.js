
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const glob = require('glob')
const {execFile, spawn} = require('child_process')
const {promisify} = require('util')


const asyncGlob = promisify(glob)
const asyncExecFile = promisify(execFile)

const { log } = console

const prefix = 'ccc: '


// status log
const success = (msg = '执行成功') => {
  log(`${prefix}${chalk.greenBright(msg)}`)
}
const warn = (msg = '警告') => {
  log(`${prefix}${chalk.yellowBright(msg)}`)
}
const error = (msg = '执行失败') => {
  log(`${prefix}${chalk.redBright(msg)}`)
}
const blue = (msg) => {
  log(`${prefix}${chalk.blue(msg)}`)
}


// 当前执行目录
const targetPath = process.cwd()
const pkgDir = path.join(__dirname, '../packages')
let pjn = ''



// check is exists
const isExists = (dest) => {
  try {
    return fs.existsSync(dest)
  } catch (error) {
    return false
  }
}

const promiseSpawn = ({
  command = '',
  args = [],
  option = {},
}) => new Promise((resolve, reject) => {
  if (!command || args.length <= 0) {
    reject(new Error('参数不全，无法执行spawn命令...'))
    return
  }
  blue(`开始执行：${command} ${args.join(' ')} >>>>>>>>>`)
  const spawnProcess = spawn(command, args, option)
  spawnProcess.stdout.on('data', (data) => {
    blue(data)
  })
  spawnProcess.stdout.on('close', () => {
    success('完成~')
    resolve(true)
  })
  spawnProcess.on('error', (error) => {
    error(`执行失败，失败信息：${error}`)
    reject(error)
  })
})

const copy = async (projectName, src = '') => {
  try {
    await fse.copy(path.join(pkgDir, src), path.join(targetPath, projectName))
  } catch (err) {
    throw err
  }
}

// 创建项目
const createProject = async (projectName = 'webpack-react') => {
  try {
    const cur = path.join(targetPath, projectName)
    // 判断文件夹是否存在
    if(fs.existsSync(cur)) {
      throw new Error(`${projectName}文件夹已存在！`)
    }
    // 创建项目目录
    await fse.ensureDir(cur)
    await copy(projectName, 'base')
  } catch (err) {
    throw err
  }
}



const generate = async (projectName = '') => {
  try {
    if (!projectName) return error('缺少必要值 ~ 项目名')
    await createProject(projectName)
  } catch (err) {
    error(err.toString)
    throw err
  }
}


module.exports = {
  generate
}