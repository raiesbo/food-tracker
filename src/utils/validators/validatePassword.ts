import { PasswordConditions } from '../../types';

type ValidatePasswordResult = {
    isValid: boolean,
    conditions: PasswordConditions
}

export default function validatePassword(password: string)
    : ValidatePasswordResult {
    const specialChars = /[!@#$%^&*)(+=.<>{}:;'"|~`_-]/g;
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /\d/g;

    let matchCounter = 0;

    const conditions = {
        withLowerCase: lowerCase.test(password),
        withUpperCase: upperCase.test(password),
        withNumbers: numbers.test(password),
        withSpecialChars: specialChars.test(password),
    };

    // The password needs to match 3 out of 4 rules
    conditions.withLowerCase && matchCounter++;
    conditions.withUpperCase && matchCounter++;
    conditions.withNumbers && matchCounter++;
    conditions.withSpecialChars && matchCounter++;

    return {
        isValid: password.length > 7 && matchCounter > 2,
        conditions
    };
}
