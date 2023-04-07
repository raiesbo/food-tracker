import { describe, expect, it } from 'vitest';
import validatePassword from './validatePassword';

describe('validatePassword', () => {
    it('returns false if password only contains: capital and small case letters', () => {
        expect(validatePassword('passwordTest')).toStrictEqual({
            isValid: false,
            conditions: {
                withLowerCase: true,
                withUpperCase: true,
                withNumbers: false,
                withSpecialChars: false
            }
        });
    });

    it('returns false if password only contains: small case letters and special characters', () => {
        expect(validatePassword('passwordtest*')).toStrictEqual({
            isValid: false,
            conditions: {
                withLowerCase: true,
                withUpperCase: false,
                withNumbers: false,
                withSpecialChars: true
            }
        });
    });

    it('returns false if password only contains: small case letters and numbers', () => {
        expect(validatePassword('password9')).toStrictEqual({
            isValid: false,
            conditions: {
                withLowerCase: true,
                withUpperCase: false,
                withNumbers: true,
                withSpecialChars: false
            }
        });
    });

    it('returns false if password only contains: capital letters and special characters', () => {
        expect(validatePassword('PASSWORDTEST*')).toStrictEqual({
            isValid: false,
            conditions: {
                withLowerCase: false,
                withUpperCase: true,
                withNumbers: false,
                withSpecialChars: true
            }
        });
    });

    it('returns false if password only contains: capital letters and numbers', () => {
        expect(validatePassword('PASSWORDTEST9')).toStrictEqual({
            isValid: false,
            conditions: {
                withLowerCase: false,
                withUpperCase: true,
                withNumbers: true,
                withSpecialChars: false
            }
        });
    });

    it('returns false if password is no longer than 7 chars', () => {
        expect(validatePassword('Pass9*')).toStrictEqual({
            isValid: false,
            conditions: {
                withLowerCase: true,
                withUpperCase: true,
                withNumbers: true,
                withSpecialChars: true
            }
        });
    });

    it('returns true if password contains: capital, small case letters and numbers', () => {
        expect(validatePassword('passwordTest9')).toStrictEqual({
            isValid: true,
            conditions: {
                withLowerCase: true,
                withUpperCase: true,
                withNumbers: true,
                withSpecialChars: false
            }
        });
    });

    it('returns true if password contains: capital, small case letters and special characters', () => {
        expect(validatePassword('passwordTest*')).toStrictEqual({
            isValid: true,
            conditions: {
                withLowerCase: true,
                withUpperCase: true,
                withNumbers: false,
                withSpecialChars: true
            }
        });
    });

    it('returns true if password contains: small case letters, numbers and special characters', () => {
        expect(validatePassword('password*9')).toStrictEqual({
            isValid: true,
            conditions: {
                withLowerCase: true,
                withUpperCase: false,
                withNumbers: true,
                withSpecialChars: true
            }
        });
    });

    it('returns true if password contains: capital letters, numbers and special characters', () => {
        expect(validatePassword('PASSWORD9!')).toStrictEqual({
            isValid: true,
            conditions: {
                withLowerCase: false,
                withUpperCase: true,
                withNumbers: true,
                withSpecialChars: true
            }
        });
    });
});
