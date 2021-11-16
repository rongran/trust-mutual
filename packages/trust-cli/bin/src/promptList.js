
module.exports = [
    {//自己配置模板
        name: 'preset',
        type: 'list',
        message: `Please pick a preset:`,
        choices: [
            {
                name: 'Manually select features',
                value: '__manual__'
            },
            {
                name: 'Keep other options for subsequent maintenance',
                value: '__maintain__'
            }
        ]
    },
    {//框架选择
        name: 'features',
        when: answers => answers.preset === '__manual__',
        type: 'list',
        message: 'Please select the front frame:',
        choices: [
            {
                name: "Vue",
                value: 'vue'
            },
            {
                name: "React",
                value: 'react'
            }
        ],
        filter: function (val) { // 使用filter将回答变为小写
            return val.toLowerCase();
        }
    },
    {
        name: 'terminal',
        when: answers => answers.frameVersion != '',
        message: 'Please select Mobile terminal or PC terminal',
        type: 'list',
        choices: [
            {
                name: 'Mobile terminal',
                value: 'Mobile'
            },
            {
                name: 'PC terminal',
                value: 'PC'
            }
        ]
    }
];
