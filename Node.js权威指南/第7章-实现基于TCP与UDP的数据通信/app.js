const fs = require('fs');
var net = require('net');
var arrTest = [];


//7-1 createServer方法与listen方法的简单使用示例
arrTest[0] = () => {
    var server = net.createServer((socket) => {
        console.log('客户端与服务端连接已建立');
    })

    server.listen(8431, 'localhost', () => {
        console.log("服务器开始监听");
    })
}

//7-2 指定服务器地址及端口已被占用时需要执行的处理
arrTest[1] = () => {
    var server = net.createServer((socket) => {
        console.log('客户端与服务端连接已建立');
    })

    server.listen(8431, 'localhost');
    server.on('error', (e) => {
        if (e.code === 'EADDRINUSE') {
            console.log('服务器地址以及端口已被占用');
        }
    })
}

//7-3 使用address方法查看TCP服务器监听的地址信息
arrTest[2] = () => {
    var server = net.createServer((socket) => {
        console.log("客户端与服务器端连接已经建立");
    })

    server.listen(8431, 'localhost', () => {
        var address = server.address();
        console.log("被监听的地址信息为", address);
    })
}

//7-4 使用getConnections方法查询当前存在的客户端连接数并
arrTest[3] = () => {
    var server = net.createServer((socket) => {
        server.getConnections((err, count) => {
            console.log(`当前存在${count}个客户端连接`);
            server.maxConnections = 2;
            console.log("TCP服务器的最大连接数为", server.maxConnections);
        })
    })

    server.listen(8431, 'localhost');
    console.log("TCP服务器被创建");
}

//7-5使用close方法拒绝新的客户端连接请求
arrTest[4] = () => {
    var server = net.createServer((socket) => {
        server.close(() => {
            console.log('TCP服务器被关闭');
        })
    })

    server.listen(8431, 'localhost');
}

//7-6使用socket端口对象的address方法查看端口地址信息
arrTest[5] = () => {
    var server = net.createServer();
    server.on('connection', (socket) => {
        var address = socket.address();
        console.log('socket端口对象的信息系信息为%j', address);
    })

    server.listen(8431, 'localhost');
}

//7-7data时间的回调函数的使用示例
arrTest[6] = () => {
    var server = net.createServer();
    server.on('connection', (socket) => {
        socket.on('data', () => {
            console.log(data);
        })
    })

    server.listen(8431, 'localhost');
}

//7-8end事件的回调函数的使用示例
arrTest[7] = () => {
    var server = net.createServer();
    server.on('connection', (socket) => {
        socket.setEncoding('utf-8');
        socket.on('data', (data) => {
            console.log(data);
            console.log('已经接收到%d字节数据', socket.bytesRead);
        })
        socket.on('end', () => {
            console.log('客户端连接被关闭');
        })
    })

    server.listen(8431, 'localhost');
}

//7-9使用pipe方法将所有客户端发送的数据写入文件
arrTest[8] = () => {
    var file = fs.createWriteStream('./message.txt');
    var server = net.createServer();
    server.on('connection', (socket) => {
        socket.pipe(file, { end: false });
        server.on('end', () => {
            file.on('再见')
        })
    })
    server.listen(8431, 'localhost');
}

//7-10 socket端口独享的pause方法与resume方法的使用示例
arrTest[9] = () => {
    var file = fs.createWriteStream('./message.txt');
    var server = net.createServer();
    server.on('connection', (socket) => {
        socket.pause();
        setTimeout(() => {
            socket.resume();
            socket.pipe(file);
            console.log("timeout");
        }, 15000);
    })

    server.listen(8431, 'localhost');
}

//7-11使用setTimeout方法指定客户端连接的超时时间
arrTest[10] = () => {
    var file = fs.createWriteStream('./message.txt');
    var server = net.createServer()
    server.on('connection', (socket) => {
        socket.setTimeout(10 * 1000);
        socket.pause();
        socket.on('timeout', () => {
            socket.resume();
            socket.pipe(file);
            console.log("timeout");
        })
    })
    server.listen(8431, 'localhost');
}

//7-13创建TCP客户端
arrTest[11] = () => {
    var client = new net.Socket();
    client.setEncoding('utf8');
    client.connect(8431, 'localhost', () => {
        console.log("已经连接到服务器端");
        client.write('你好');
        client.end('再见');
    })
    client.on('data', (data) => {
        console.log("已接收服务器端发送的数据", data);
    })

    client.on('error', (err) => {
        console.log("与服务器连接或通信的过程中发生一个错误，错误编码为%s", err.code);
        client.destroy();
    })
}

//7-16指定TCP客户端与TCP客户端建立连接10秒之后关闭客户端连接
arrTest[12] = () => {
    var client = new net.Socket();
    client.setEncoding('utf-8');
    client.connect(8431, 'localhost', () => {
        console.log('已经连接到服务器端');
        client.write("你好");
        setTimeout(() => {
            client.end("再见");
        }, 10000);
    })

    client.on('data', (data) => {
        console.log("已经接收服务器发送的数据：" + data);
    })

    client.on('error', (err) => {
        console.log("与服务器连接或通信的过程中发生了一个错误，错误编码为%s", err.code);
        client.destroy();
    })
}

//7-18获取当前已发送的字节数
arrTest[13] = () => {
    var client = new net.Socket();
    client.setEncoding('utf-8');
    client.connect(8431, 'localhost', () => {
        console.log("已经连接到服务器");
        client.write('你好')
        console.log("当前已发送%d字节", client.bytesWritten);
        client.end('再见');
        console.log("当前已经发送%d字节", client.bytesWritten);
    })
    client.on('data', (data) => {
        console.log("已接收服务器端发送的数据：" + data);
    })
    client.on('error', (err) => {
        console.log("与服务器连接和通信的过程中发生一个错误", err.code);
        client.destroy();
    })
}



// arrTest[11]()
arrTest[arrTest.length - 1]();