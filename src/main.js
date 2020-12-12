const { program } = require('commander');
const { version } = require('../package.json');
const mapActions = require('./utils/commander');
const { makeDir } = require('./utils/file-utils');
const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const { url } = require('inspector');
const { stdout, stderr } = require('process');
const urlOfR = 'https://github.com/ranhaoliuLeo/ranhao-vue-cli.git'

Object.keys(mapActions).forEach(key => {
    program
        .command(key)
        .description(mapActions[key]['description'])
        .action(async projName => {
            if(key === '*') {
                console.log('we cant find the exactly command');
            } else {
                if(projName === '.') {
                    console.log('install in this file')
                } else {
                    console.log('install in the name ' + projName)
                    const id = path.resolve(process.cwd(), projName)
                    await makeDir(id);
                    const spinner = ora('加载仓库的信息').start();
                    axios.get('https://api.github.com/repos/ranhaoliuLeo/ranhao-vue-cli').then(res => {
                        spinner.color = 'yellow'
                        spinner.succeed('拉取成功');
                        const choose = [res.data.name, 'test']
                        inquirer.prompt([{
                            type: 'list',
                            name: 'template',
                            message: '请问是否选择你自己的Vue Cli？（以后会添加Express CLI）',
                            choices: choose
                        }]).then(ans => {
                            console.log(`好的，正在下载: ${ans.template}`)
                            exec(`git clone ${urlOfR}`, {cwd: id}, (err, stdout, stderr) => {
                                if(err) {
                                    console.log('exec error', err)
                                } else {
                                    console.log('success')
                                }
                            })
                        })
                    })
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




