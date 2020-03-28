# sync-status-cli [![Build Status](https://travis-ci.org/haroun/sync-status-cli.svg?branch=master)](https://travis-ci.org/haroun/sync-status-cli)

> Make a diff between two directories (`source` & `target`) and list all files missing in the target.

* `source` is the directory used as reference
* `target` is the directory where the files must be copied

## Install

```sh
npm install --global @haroun/sync-status-cli
```

If you don't want to install the package globally, you can use npx instead

```sh
npx @haroun/sync-status-cli
```

## Usage

```sh
$ sync-status --help

  Usage
    $ sync-status <source> <target>

  Examples
    $ sync-status ./source ./target
    ._DSCF2125.RAF
    ._DSCF2126.RAF
```

## License

MIT © [Harouna Traore](https://github.com/haroun)
