function package(
    name,
    license,
    author
) {
    return {
        "name": name,
        "version": "1.0.0",
        "description": "",
        "main": "main.js",
        "scripts": {
            "test": "ranhao"
        },
        "keywords": [],
        "author": author,
        "license": license,
    }
}


function trans2Promise(fn) {
    return function(gitId, dir) {
        return new Promise((resolve, reject) => {
            let cb = err => err ? reject(err) : resolve('sucess')
            fn(gitId, dir, cb);
        })
    }
}

exports.package = package
exports.trans2Promise = trans2Promise