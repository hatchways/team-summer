import validator from 'validator';

const filedValidate = (field, value, required = false, additionalFields = []) => {
    const valid = {valid: true, error: ''};

    if (required && validator.isEmpty(value)) return {valid: false, error: 'Field is empty'};

    switch (field) {
        case 'email':
            if (!validator.isEmail(value)) return {valid: false, error: 'Email is incorrect'};

            return valid;

        case 'password':
            if (field.length < 12) return {valid: false, error: 'Password be 12 or more characters'};

            return valid;

        case 'confirm-password':
            if (!additionalFields.length || additionalFields.find((field) => field.name === 'confirm-password') !== value) {
                return {valid: false, error: 'Passwords do not match'};
            }

            return valid;

        default:
            return {valid: false, error: 'No validation field'};
    }
};

export {
    filedValidate
}