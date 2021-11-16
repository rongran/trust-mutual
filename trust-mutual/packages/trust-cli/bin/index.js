#! /usr/bin/env node
const program = require('commander');
//version 版本号
program.version(require('../package').version);

// 初始化项目
program
    .command('init <projectName>') // 初始化命令
    .alias('i')
    .description('generate a project from a remote template')
    .option('-c, --clone', 'Use git clone when fetching remote template')
    .action((projectName) => {// 得到name
        require('../src/init.js')(projectName)
    });

program.parse(process.argv); //解析变量
if (!program.args.length) {
    program.help()
}
