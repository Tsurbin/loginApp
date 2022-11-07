/**
 * Created by ben.kl on 9/17/2017.
 */

const read = require('fs-readdir-recursive');


function readRouterFiles(api) {
    try {
        let files = [];

        read(api).filter(file => {
            return (file.indexOf("Router.js") > -1);
        }).forEach(file => {
            let fileInfo = {};
            fileInfo.file = "../" + api + "/" + file.replace(/\\/g, "/");
            files.push(fileInfo);
        });
        return files;
    }
    catch(e) {
        console.log("Error");
    }
}

module.exports = {
    readRouterFiles : readRouterFiles
};







