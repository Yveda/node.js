const fs = require('fs');
var net = require('net');

var arrTest = [];

//7-14创建TCP服务器
arrTest[0] = () => {
    var server = net.createServer();

    server.on('connection', (socket) => {
        console.log("客户端与服务器端连接已建立");
        socket.setEncoding('utf8');
        socket.on('data', (data) => {
            console.log("已经接收客户端发送的数据", data);
            socket.write('确认数据:' + data);
        })

        socket.on('error', (err) => {
            console.log("与客户端通信的过程中发生了一个错误，错误编码为%s", err.code);
            socket.destroy();
        })

        socket.on('end', () => {
            console.log("客户端连接被关闭");
            server.unref();
        })

        socket.on('close', (had_error) => {
            if (had_error) {
                console.log("由于一个错误导致socket端口被关闭");
                server.unref();
            } else {
                console.log("socket端口被正常关闭");
            }
        })
    })
    server.listen(8431, 'localhost');
}

//7-15使用TCP服务器对象的close方法拒绝新的客户端连接请求
arrTest[1] = () => {
    var server = net.createServer({ allowHalfOpen: true });
    server.on('connection', (socket) => {
        console.log("客户端与服务器端连接已经建立");
        socket.setEncoding('utf-8');
        socket.on('data', (data) => {
            console.log("已接收客户端发送的数据:" + data);
            socket.write("确认数据：" + data);
        })

        socket.on('error', (err) => {
            console.log("与客户端通信的过程中发生了一个错误，错误编码为%s", err.code);
        })

        socket.on('close', (had_error) => {
            if (had_error) {
                console.log("由于一个错误导致socket端口被关闭");
                server.unref();
            } else {
                console.log("socket端口被正常关闭");
            }
        })

        socket.on('end', () => {
            console.log("客户端连接被关闭");
            socket.end();
            server.unref();
        })

        server.getConnections((err, count) => {
            if (count == 2) {
                server.close();
            }
        })
    })

    server.listen(8431, 'localhost');
    server.on('close', () => {
        console.log("TCP服务器被关闭");
    })
}

//7-17使用socket端口对象write方法发送小尺寸文件
arrTest[2] = () => {
    var server = net.createServer();
    server.on('connection', (socket) => {
        console.log("客户端与服务器连接已经建立");
        socket.setEncoding('utf-8');
        var readStream = fs.createReadStream('./message.txt');
        readStream.on('data', (data) => {
            var flag = socket.write(data);
            console.log("write方法的返回值为：" + flag);
            console.log("缓存队列中当前缓存了%d字符", socket.bufferSize);
        })

        socket.on('data', (data) => {
            console.log("已经接收客户端发送的数据：" + data);
        })

        socket.on('drain', () => {
            console.log("TCP缓存区中数据已全部发送");
        })
    })

    server.listen(8431, 'localhost');
}
















































arrTest[arrTest.length - 1]();