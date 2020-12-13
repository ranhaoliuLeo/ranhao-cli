const fs = require('fs');
const path = require('path');
const { trans2Promise } =require('./generator')

function makeDir(filePath) {
    fs.mkdir(filePath, { recursive: true }, (err) => {
        if(err) {
            console.error(err)
            throw err
        }
    })
}

function makeFile(filePath, fileName, data) {
    const id = path.resolve(filePath, fileName);
    try {
        let result = fs.openSync(id, 'wx')
        fs.writeFileSync(id, data, 'utf-8')
        return true
    } catch (e) {
        console.log('')
        console.log('发现文件已存在')
        return false
    }

}

module.exports = {
    makeDir,
    makeFile
}