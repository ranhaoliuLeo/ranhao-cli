const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');

const { program } = require('commander');
const { version } = require('../package.json');
const mapActions = require('./utils/commander');
const { makeDir, makeFile } = require('./utils/file-utils');
const { trans2Promise, package } = require('./utils/generator')
const question = require('./utils/question')

Object.keys(mapActions).forEach(key => {
    program
        .command(key)
        .description(mapActions[key]['description'])
        .action(async projName => {
            if (key === '*') {
                console.log('we cant find the exactly command');
            } else {
                if (projName === '.') {
                    console.log('install in this file')
                } else {
                    console.log('install in the name ' + projName)
                    const id = path.resolve(process.cwd(), projName)
                    await makeDir(id);
                    const spinner = ora('加载仓库的信息').start();
                    spinner.color = 'yellow'
                    spinner.succeed('拉取成功');
                    const { template, name, author, license } = await inquirer.prompt(question)
                    spinner.text = `好的，正在下载: ${template}模板`
                    spinner.start()
                    const downloadPromise = trans2Promise(download)
                    let msg = await downloadPromise('github:ranhaoliuLeo/ranhao-vue-cli#main', id)
                    if (msg) {
                        spinner.color = 'yellow'
                        spinner.succeed('创建项目成功!');
                    }
                    spinner.text = `正在载入您定制的packge.json`
                    spinner.start();
                    const data = JSON.stringify(package(name, license, author), null, 4);
                    let result = makeFile(id, 'package.json', data);
                    if (!result) {
                        spinner.fail('文件已存在，不做修改')
                    } else {
                        spinner.succeed('成功载入！')
                    }
                }
            }
        })
})

program.on('--help', () => {
    console.log('');
    console.log('Examples: ')
    Object.keys(mapActions).forEach(key => {
        console.log(mapActions[key]['example'])
    })
})
program
    .version(version)
    .parse(process.argv);




