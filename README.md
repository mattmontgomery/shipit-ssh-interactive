# shipit-ssh-interactive

This is a simple library to add SSH interaction to a shipit instance.

## Usage/example

```
  shipit.task("test:ls", () => {
    shipit.sshInteractive(`ls -l ${shipit.config.deployTo}/releases`);
  });
```

## Why?

I wanted to be able to easily `sudo` without changing server permissions.

Inspired by https://github.com/timkelty/shipit-ssh
