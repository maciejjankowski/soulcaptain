fs = require('fs');

var showdown = require('showdown'),
    converter = new showdown.Converter(),
    text = fs.readFileSync(process.argv[2], 'utf8');
html = converter.makeHtml(text);
fs.writeFileSync('views/common/backlogcontents.html', html);