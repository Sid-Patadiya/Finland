import moment from "moment";

export const getDurationInDays = (startDate, endDate) => {
    // console.log('startDate, endDate ::', startDate, endDate)
    let a = moment(startDate)
    let b = moment(endDate)
    var years = a.diff(b, 'year');
    b.add(years, 'years');
    var months = a.diff(b, 'months');
    b.add(months, 'months');
    // var days = a.diff(b, 'days');
    let op = `${years} years ${months} months`
    return op;
}