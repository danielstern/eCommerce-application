export const Validation = {

    EmptyField(){

        return function (str) {

            if (!str) {

                return {

                    type:"EMPTY_FIELD",
                    description:"Field is empty"

                }
            }

        }
        
    },

    NonInteger(){

        return function (str) {

            if (!(new RegExp('^\\d+$').test(str))) {

                return {

                    type:"NON_INTEGER",
                    description:"Field is not an integer"

                }
    
            }

        }
        
    },

    InvalidLength(min = 0, max = 0){

        return function (str = "") {

            const withoutSpaces = str.replace(/\s/g, '');

            if (withoutSpaces.length < min) {

                return {
                    type:"LENGTH_INVALID",
                    min,
                    max,
                    description:`Field of length ${withoutSpaces.length} is less than minimum of ${min}`
                }

            }

            if (withoutSpaces.length > max) {

                return {
                    type:"LENGTH_INVALID",
                    min,
                    max,
                    description:`Field of length ${withoutSpaces.length} is more than maximum of ${max}`
                }

            }
        }

    }

}

function ErrorCompiler(specs) {

    return function (str) {

        let errors = [];
            for (let spec of specs) {

            let res = spec(str);
            if (res) {
                errors = [...errors, res];
            }
       }

       return errors;

    }

}

export const CreditCardSchema = {

    cartId:ErrorCompiler([Validation.EmptyField()]),
    userId:ErrorCompiler([]),
    nameOnCard:ErrorCompiler([Validation.EmptyField()]),
    address1:ErrorCompiler([Validation.EmptyField()]),
    cardNumber:ErrorCompiler([Validation.EmptyField(), Validation.NonInteger(), Validation.InvalidLength(16,16)]),
    securityField:ErrorCompiler([Validation.NonInteger(), Validation.InvalidLength(3,3)])

}

export function validateCreditCard (creditCardDetails) {

    let errors = {};

    for (let field in CreditCardSchema) {
        let value = creditCardDetails[field];
        let _errors = CreditCardSchema[field](value);
        errors[field] = _errors;

    }

    const valid = Object.values(errors).reduce((a,b)=>[...a,...b]).length === 0;

    return {
        valid,
        errors
    }

}