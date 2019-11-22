const FormValidator = (validations) => ({
    /* Takes in array of objects for validating form fields
    Ex:
        [
         {
         field: 'email', // Input name
         method: validator.isEmail. // string of validator from validator package or custom validator,
         args: [], // Optional: arguments for the validation method
         validWhen: true, // Valid when method is true,
         message: 'Email is invalid' // Error message
         }
       ]
    */

    // Validator Rule set
    validations,

    validate(state) {
        // Valid by default
        let validation = this.valid();

        this.validations.forEach(rule => {
            // Validation rule not marked as invalid already
            if (!validation[rule.field].isInvalid) {
                const field_value = state[rule.field].toString();
                const args = rule.args || [];
                const validation_method = rule.method;

                if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                    validation[rule.field] = {isInvalid: true, message: rule.message};
                    validation.isValid = false;
                }
            }
        });

        return validation;
    },

    valid() {
        const validation = {};

        this.validations.map(rule => (
            validation[rule.field] = {isInvalid: false, message: ''}
        ));

        return {isValid: true, ...validation};
    }
});

export default FormValidator;