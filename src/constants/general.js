import moment from 'moment';

export const BookRequestPrefix = "CL"

export const priceFormat = (price) => {
    return `$${parseFloat(parseFloat(price).toFixed(3))}`;
}

export const dateFormatUtc = (date) => {    
    return moment.utc(date).format('DD/MM/YYYY');
}

export const dateFormat = (date) => {    
    return moment(date).format('DD/MM/YYYY');
}

export const dateTimeFormat = (dateTime) => {
    return moment.utc(dateTime).format('DD/MM/YYYY HH:mm');
}

export const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const passwordInvalidError = '*Password must contain 8 characters: 1 lower case, 1 upper case letter, 1 number and 1 special character';

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/