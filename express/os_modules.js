

const os = require('os');
console.log('Operating System Info:');

console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`CPU Cores: ${os.cpus().length}`);
console.log(`Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`);
console.log(`Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`);
console.log(`Home Directory: ${os.homedir()}`);
console.log(`Uptime: ${(os.uptime() / 3600).toFixed(2)} hours`);
console.log(`Hostname: ${os.hostname()}`);
console.log(`Network Interfaces: ${JSON.stringify(os.networkInterfaces(), null, 2)}`);
console.log(`Temporary Directory: ${os.tmpdir()}`);
console.log(`User Info: ${JSON.stringify(os.userInfo(), null, 2)}`);
console.log(`Machine Type: ${os.machine()}`);