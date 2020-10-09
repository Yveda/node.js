var fs = require('fs');
fs.link('./bat1.js', './test/test.js',function(err){
    // let stat = fs.fstatSync(fd);
    // console.log(resolvedPath);
    if (err) {
        console.log('失败',err);
    } else {
        console.log('成功');
    }
})
