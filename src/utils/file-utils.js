const fs = require('fs');

function makeDir(filePath) {
    fs.mkdir(filePath, { recursive: true }, (err) => {
        if(err) {
            console.error(err)
            throw err
        }
    })
}

exports.makeDir = makeDir