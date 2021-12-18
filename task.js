const {saveCompletedData, saveTaskData, loadTaskData, loadCompletedData} = require('./helpers')


// Initial Loading of the data
// This is the array/stack of tasks
let data = loadTaskData()
// This is the array/stack of completed tasks
let completed = loadCompletedData()


let usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`

// storing the command line arguments
const [_, __, command, priority, task] = process.argv

switch (command) {
    case 'help':
        console.log(usage)
        break

    case 'add':
        // if the priority or task or both are not provided
        if (!priority || !task) {
            console.log('Error: Missing tasks string. Nothing added!')
        } else {
            data.push({
                priority: parseInt(priority),
                task: task,
                complete: false
            })
            console.log(`Added task: "${task}" with priority ${priority}`)
            saveTaskData(data)
        }
        break
    case 'ls':
        // simply list the tasks in order of priority
        // tasks are already sorted by priority from loadTaskData()
        if (data.length) {
            data.forEach((task, index) => {
                console.log(`${index + 1}. ${task.task} [${task.priority}]`)
            })
        } else {
            console.log('There are no pending tasks!')
        }
        break
    case 'del':
        // if the index argument is not provided
        if (!priority) {
            console.log('Error: Missing NUMBER for deleting tasks.')
        } else {
            // actually here priority is the index of task to be deleted that is the second argument in case of del command
            // given by the user, so we need to subtract 1 from it to get the index of the task in the data array
            let index = parseInt(priority) - 1
            if (data[index]) {
                let index = parseInt(priority) - 1
                data.splice(index, 1)
                console.log(`Deleted task #${priority}`)
                saveTaskData(data)
            } else {
                console.log(`Error: task with index #${priority} does not exist. Nothing deleted.`)
            }
        }
        break
    case 'done':
        if (!priority) {
            console.log('Error: Missing NUMBER for marking tasks as done.')
        } else {
            let index = parseInt(priority) - 1
            if (data[index]) {
                let index = parseInt(priority) - 1
                completed.push(data[index].task)
                data.splice(index, 1)
                console.log(`Marked item as done.`)
                saveTaskData(data)
                saveCompletedData(completed)
            } else {
                console.log(`Error: no incomplete item with index #${priority} exists.`)
            }
        }
        break
    case 'report':
        console.log(`Pending : ${data.length}`)
        if (data.length) {
            data.forEach((task, index) => {
                console.log(`${index + 1}. ${task.task} [${task.priority}]`)
            })
        }
        console.log(`\nCompleted : ${completed.length}`)
        if (completed.length) {
            completed.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`)
            })
        }
        break

    default:
        console.log(usage)
}