const question = [
    {
        type: 'list',
        name: 'template',
        message: '请问是否选择你自己的Vue Cli？（以后会添加Express CLI）',
        choices: ['vue', 'express']
    },
    {
        type: 'input',
        name: 'name',
        message: '请输入项目的名字',
        default: 'my-project'
    },
    {
        type: 'input',
        name: 'author',
        message: '请输入作者的名字',
        default: 'leo'
    },
    {
        type: 'input',
        name: 'license',
        message: '请输入开源限制',
        default: 'MIT'
    },
]

module.exports = question