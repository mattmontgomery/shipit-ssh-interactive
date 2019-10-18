const Promise = require('bluebird');
const childProcess = require('child_process');

module.exports = shipit => {
  return Object.assign(shipit, {
    sshInteractive: async command => {
      await Promise.mapSeries(
        shipit.config.servers.map(({ host }) => host),
        async host =>
          new Promise((resolve, reject) => {
            shipit.log(`Running ${command} on ${host}`);
            shipit.log("\n```");
            console.time("ssh-remote");
            const child = childProcess
              .spawn(`ssh`, [host, "-t", command], { stdio: "inherit" })
              .on("close", code => {
                process.stdin.setRawMode(false);
                if (code) {
                  return reject(code);
                }
                shipit.log("```\n");
                console.timeEnd("ssh-remote");
                resolve({
                  stdout: child.stdout,
                  stderr: child.stderr
                });
              });
          })
      );
    }
  });
};
