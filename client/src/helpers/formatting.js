import moment from 'moment'

export const toDollars = (num) => {
    return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
} 

export const daysLeft = (fundingDeadline) => {
    const deadlineDate = moment(fundingDeadline);
    const todaysDate = moment();
    return deadlineDate.diff(todaysDate, 'days');
}
