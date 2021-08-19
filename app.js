let fs = require('fs');
let path = require('path');
let util = require('util');

let firstFolder = path.join(__dirname, 'girls');
let boysFolder = path.join(__dirname, 'boys')
let girlsFolder = path.join(__dirname, 'girls')

// const readFilePromise = util.promisify(fs.readFile);
const renameFSPromise = util.promisify(fs.rename)


console.log(__dirname);
console.log(__filename);
console.log(firstFolder)

// let sortBoysGirls = function () {
//
// }

fs.readdir(firstFolder, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(files)

    files.forEach((file) => {
        console.log(file);
        let filePath = path.join(firstFolder, file);
        console.log(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(data.toString());
            let dataText =  data.toString();
            if (dataText.indexOf('female') === -1) {
                console.log('this is boy')
                console.log('current file loc = ' + filePath)
                let newDest = path.join(boysFolder, file)
                console.log('dest file loc = ' + newDest)
                renameFSPromise( filePath, newDest).catch( reason =>    {
                    console.log(reason)
                    } )
                } else {
                console.log('this is girl')
                let newDest = path.join(girlsFolder, file)
                console.log('dest file loc = ' + newDest)
                renameFSPromise( filePath, newDest).catch( reason =>    {
                    console.log(reason)
                } )
            }

        });
    })
})

console.log('dirname = '+ __dirname);
console.log('filename = '+ __filename);

