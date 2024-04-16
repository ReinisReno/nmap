const express = require('express');
const net = require('net');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/scan', async (req, res) => {
    const host = req.query.host;
    const scanResults = await scanPorts(host);
    res.json(scanResults);
});

async function scanPorts(host) {
    const startPort = 1;
    const endPort = 1024;
    const scanResults = [];

    for (let port = startPort; port <= endPort; port++) {
        const result = await scanPort(host, port);
        scanResults.push(result);
    }

    return scanResults;
}

function scanPort(host, port) {
    return new Promise(resolve => {
        const socket = new net.Socket();
        socket.setTimeout(1000);

        socket.on('connect', () => {
            socket.end();
            resolve({ port, status: 'open' });
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve({ port, status: 'closed' });
        });

        socket.on('error', () => {
            resolve({ port, status: 'error' });
        });

        socket.connect(port, host);
    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
