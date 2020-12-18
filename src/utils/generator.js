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
            "build": "webpack",
            "serve": "webpack-dev-server"
        },
        "keywords": [],
        "author": author,
        "license": license,
        "devDependencies": {
            "@babel/cli": "^7.12.10",
            "@babel/core": "^7.12.10",
            "@babel/plugin-transform-runtime": "^7.12.10",
            "@babel/preset-env": "^7.12.11",
            "autoprefixer": "^10.1.0",
            "babel-loader": "^8.2.2",
            "css-loader": "^5.0.1",
            "html-webpack-plugin": "^4.5.0",
            "post-loader": "^2.0.0",
            "postcss-loader": "^4.1.0",
            "style-loader": "^2.0.0",
            "vue-loader": "^15.9.6",
            "vue-template-compiler": "^2.6.12",
            "webpack": "^4.43.0",
            "webpack-cli": "^3.3.12",
            "webpack-dev-server": "^3.11.0"
          },
        "dependencies": {
            "@babel/runtime": "^7.12.5"
        }
    }
}


function trans2Promise(fn) {
    return function (gitId, dir) {
        return new Promise((resolve, reject) => {
            let cb = err => err ? reject(err) : resolve('sucess')
            fn(gitId, dir, cb);
        })
    }
}

exports.package = package
exports.trans2Promise = trans2Promise