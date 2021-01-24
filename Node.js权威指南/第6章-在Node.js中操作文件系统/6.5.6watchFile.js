var fs = require('fs');
fs.watchFile('./package.json', (curr, prev) => {
    if (Date.parse(prev.ctime) === 0) {
        console.log('message.txxt文件被创建')
    } else if (Date.parse(curr.ctime) === 0) {
        console.log("message.txt文件被删除");
    } else if (Date.parse(prev.mtime) !== Date.parse(curr.atime)) {
        console.log("message.txt文件内容被修改");
    }
})