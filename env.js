const fs = require('fs');
if (fs.existsSync('private.env')){
    let fileContents = fs.readFileSync('private.env');
    fileContents.split('\n').forEach((line)=>{
        let pair = line.split('=');
        process.env[pair[0]] = pair[1].replace(/^'|'$/g, '');
    });
}
