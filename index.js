function createEmployeeRecord(array) {
    let newObject = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return newObject
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    let type = "TimeIn";
    employeeObj.timeInEvents.push({ type, hour, date });
    return employeeObj;
}


function createTimeOutEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    let type = "TimeOut";
    employeeObj.timeOutEvents.push({ type, hour, date });
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateStamp) {
    let timeIn = employeeObj.timeInEvents.filter((element) => element.date === dateStamp).map((element) => element.hour); //filter by date, create a new array with results from map
    let timeOut = employeeObj.timeOutEvents.filter((element) => element.date === dateStamp).map((element) => element.hour);//same, now we have a range, can use our new array and subtract the out from in

    let hoursDifference = (timeOut - timeIn) / 100;
    return hoursDifference;
}

function wagesEarnedOnDate(employeeObj, dateStamp) {
    let dailyTakeHome = employeeObj.payPerHour * hoursWorkedOnDate(employeeObj, dateStamp) //take employee hourly rate * our hoursWorkedOnDate function that finds # of hours, pass in obj and dateStamp
    return dailyTakeHome;
}

function allWagesFor(employeeObj) {
    let result = [];
    let allDates = employeeObj.timeInEvents.map((element) => (element = element.date))
    for (let workDay of allDates) {
        result.push(wagesEarnedOnDate(employeeObj, workDay))
    }
    let reducer = (previousValue, currentValue) => previousValue + currentValue;
    return result.reduce(reducer, 0)
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce((m, e) => m + allWagesFor(e), 0)
}