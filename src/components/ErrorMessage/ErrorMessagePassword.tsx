import { PasswordConditions } from '@/types';
import cc from 'classcat';

import { Text } from '../Text';
import styles from './ErrorMessagePassword.module.scss';

type Props = {
    conditions: PasswordConditions
}

export default function ErrorMessagePassword({ conditions }: Props) {
    return (
        <div className={styles.root}>
            <Text semiBold variant={'smallest'}>
                Min 8 characters long.
            </Text>
            <Text semiBold variant={'smallest'}>
                Must fulfill at least 3 of the following rules:
            </Text>
            <Text variant={'smallest'} className={cc([
                styles.errorRule,
                conditions.withLowerCase && styles.errorRule_fulfilled
            ])}>
                - Smallcase letters (a-z)
            </Text>
            <Text variant={'smallest'} className={cc([
                styles.errorRule,
                conditions.withUpperCase && styles.errorRule_fulfilled
            ])}>
                - Uppercase letters (A-Z)
            </Text>
            <Text variant={'smallest'} className={cc([
                styles.errorRule,
                conditions.withNumbers && styles.errorRule_fulfilled
            ])}>
                - Numbers (i.e. 0-9)
            </Text>
            <Text variant={'smallest'} className={cc([
                styles.errorRule,
                conditions.withSpecialChars && styles.errorRule_fulfilled
            ])}>
                - Simbols (e.g. !@#$%^&*)
            </Text>
        </div>
    );
}
