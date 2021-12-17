const fs = require('fs')

// Here I am taking an Empty Stack for pushing and popping the tasks and write to the file
let data = []


// this is the helper function that I am taking here for saving the tasks
function saveData() {
    fs.writeFileSync('task.txt', JSON.stringify(data))
}

// this is the data loader function that loads the tasks if the task.txt file exists
// otherwise it giver the data an empty stack
function loadData() {
    if (fs.existsSync('task.txt')) {
        try {
            data = JSON.parse(fs.readFileSync('task.txt'))
        } catch (e) {
            data = []
        }
    } else {
        data = []
    }
}


// Initial Loading of the data
loadData()


let usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`

const [_, __, command, priority, task] = process.argv

switch (command) {
    case 'help':
        console.log(usage)
        break

    case 'add':
        if (!priority || !task) {
            console.log('Error: Missing tasks string. Nothing added!')
        } else {
            data.push({
                priority: parseInt(priority),
                task: task,
                complete: false
            })
            console.log(`Added task: "${task}" with priority ${priority}`)
            saveData()
        }
        break
    case 'ls':
        if (data.length) {
            data.sort((a, b) => a.priority - b.priority)
            data.forEach((task, index) => {
                if (!task.complete) {
                    console.log(`${index + 1}. ${task.task} [${task.priority}]`)
                }
            })
        }else{
            console.log('There are no pending tasks!')
        }
        break
    default:
        console.log(usage)
}