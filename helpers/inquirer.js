import inquirer from 'inquirer';
import 'colors';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.red } ${'Search City'}`
            },
            {
                value: 2,
                name: `${ '2.'.red } ${'History'}`
            },
            {
                value: 0,
                name: `${ '0.'.red } ${'Exit\n'}`
            }

        ]
    }
]

export const inquirerMenu = async() => {

    console.clear();
    console.log('================'.white);
    console.log('Select an option'.red);
    console.log('================\n'.white);

    const {option} = await inquirer.prompt(questions);

    return option;
}

export const pause = async() => {

    const pauseQuestion = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'Enter'.red} to continue`
        }
    ]

    await inquirer.prompt(pauseQuestion);
}

export const readInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

export const listPlaces = async (places = []) => {
    const choices = places.map((place, index) => {
        const idx = `${index + 1}.`.green;

        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    
    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Select place:',
        choices
    }]
    
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel'
    })

    const {id} = await inquirer.prompt(questions);
    return id;
}

export const confirm = async (message) => {
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(questions);
    return ok;
}

export const showChecklist = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedOn) ? true : false
        }
    });

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select tasks',
        choices
    }]

    const {ids} = await inquirer.prompt(question);
    return ids;
}

/*module.exports = {
    inquirerMenu
}*/

//export const inquirerMenuExport = inquirerMenu()