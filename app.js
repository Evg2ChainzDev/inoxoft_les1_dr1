const fs = require('fs');
const path = require('path');
const util = require('util');

const firstFolder = path.join(__dirname, 'girls');
const secondFolder = path.join(__dirname, 'boys');

const boysFolder = path.join(__dirname, 'boys')
const girlsFolder = path.join(__dirname, 'girls')


const renameFSPromise = util.promisify(fs.rename)
const readdirFSPromise = util.promisify(fs.readdir)
const readFilePromise = util.promisify(fs.readFile);


let sortBoysGirls = function (aimFolder) {

    readdirFSPromise(aimFolder).then((files) => {

        console.log(`Current golder = ${aimFolder} 
        files in folder: ${files}
        `)
        // start files brut
        files.forEach((file) => {
            let filePath = path.join(aimFolder, file);
            console.log(`${file} in folder ${filePath}`);

            readFilePromise(filePath).then((data) => {

                let dataText = data.toString();
                console.log(dataText);

                if (dataText.indexOf('female') === -1) {
                    console.log('this is boy')
                    console.log('current file loc = ' + filePath)
                    let newDest = path.join(boysFolder, file)
                    console.log('dest file loc = ' + newDest)

                    renameFSPromise(filePath, newDest).then(() => {
                        console.log('rename done, boy');

                    })
                } else {
                    console.log('this is girl')
                    let newDest = path.join(girlsFolder, file)
                    console.log('dest file loc = ' + newDest)
                    renameFSPromise(filePath, newDest).then(() => {
                        console.log('rename done, girl')
                    })
                }
            });
        })
        // end files brut
        console.log('end of function')
    })
}

sortBoysGirls(firstFolder);
sortBoysGirls(secondFolder);


