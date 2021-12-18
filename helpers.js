const fs = require("fs")

const doesFileExist = (fileName) => {
    return fs.existsSync(fileName)
}

const saveTaskData = (data) => {
    // I am taking the data and converting it to a string
    let dataString = ''
    data.forEach((task, i) => {
        if (i != data.length - 1) {
            dataString += `${task.priority} ${task.task}\n`
        } else {
            dataString += `${task.priority} ${task.task}`
        }
    })



    // I am writing the data to the task file
    fs.writeFileSync('task.txt', dataString)
    // I am writing the completed tasks to the file
}

// this is the helper function that I am taking here for saving the tasks
const saveCompletedData = (completed) => {
    let completedString = ''
    completed.forEach((task, i) => {
        if (i != completed.length - 1 && completed.length) {
            completedString += `${task}\n`
        } else {
            completedString += `${task}`
        }
    })
    fs.writeFileSync('completed.txt', completedString)
}


const loadTaskData = () => {
    let data = []
    if (doesFileExist('task.txt')) {
        let fileData = fs.readFileSync('task.txt')
        fileData = fileData != '' ? fileData.toString().split('\n') : []
        // I am trying to convert every line of the file to a JSON object because it is easier to work with
        fileData.forEach((task, i) => {
            data.push({ "task": task.substring(task.indexOf(' ') + 1).replace(/\r?\n|\r/g, ""), "priority": parseInt(task.substring(0, task.indexOf(' '))) })
        })
    }

    // return sorted Data
    return data.sort((a, b) => a.priority - b.priority)
}


const loadCompletedData = () => {
    let completed = []
    if (doesFileExist('completed.txt')) {
        let fileData = fs.readFileSync('completed.txt')
        fileData = fileData != '' ? fileData.toString().split('\n') : []

        fileData.forEach((task, i) => {
            completed.push(task)
        })
    } 
    return completed
}

module.exports = {
    saveCompletedData,
    saveTaskData,
    loadTaskData,
    loadCompletedData
}
