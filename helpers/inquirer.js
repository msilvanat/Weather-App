const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`
            },
            {
                value: 2,
                name: `${'2.'.green} Search history`
            },
            {
                value: 0,
                name: `${'0.'.green} Go out`
            },
            
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('=============='.green);
    console.log(' Choose an option'.white);
    console.log('=============\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;

}

const stop = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'enter'.green} to continue`

        }
    ];

    console.log('\n');

    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async( places = []) => {

    const choices = places.map( (place, i) => {

        const idx = `${i + 1}.`.green;
        
        return {
            value: place.id,
            name: `${idx} ${place.nombre}`

        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Choose a place:',
            choices

        }
    ]
    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showListChecklist = async ( tasks = [] ) => {
    const choices = tasks.map( (task, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: ( task.completeIn ) ? true : false

        }
    });

    const oneQuestion = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices

        }
    ]
    const { ids } = await inquirer.prompt(oneQuestion);
    return ids;
}

module.exports = {
    inquirerMenu,
    stop,
    readInput,
    listPlaces,
    confirm,
    showListChecklist
}