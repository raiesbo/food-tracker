import cc from 'classcat';
import { ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './Text.module.scss';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'body' | 'body2' | 'label' | 'small' | 'smallest';

export type Variant =
    | TextVariant
    | {
        small?: TextVariant;
        medium?: TextVariant;
        large?: TextVariant;
    };

type Props = HTMLAttributes<HTMLElement> & {
    as?: ElementType;
    className?: string;
    children: ReactNode;
    bold?: boolean;
    semiBold?: boolean;
    thin?: boolean;
    italic?: boolean;
    variant?: Variant;
};

export default function Text({
    as: Component = 'p',
    children,
    className,
    bold = false,
    semiBold = false,
    thin = false,
    italic = false,
    variant = 'body',
    ...rest
}: Props) {
    let smallVariant, largeVariant, mediumVariant;
    if (typeof variant === 'string') {
        smallVariant = variant;
    } else {
        smallVariant = variant.small;
        mediumVariant = variant.medium;
        largeVariant = variant.large;
    }

    return (
        <Component
            className={cc([
                className,
                styles.root,
                styles['root_variant-small-' + smallVariant],
                mediumVariant && styles['root_variant-medium-' + mediumVariant],
                largeVariant && styles['root_variant-large-' + largeVariant],
                semiBold && styles.semiBold,
                bold && styles.bold,
                italic && styles.italic,
                thin && styles.thin,
            ])}
            {...rest}
        >
            {children}
        </Component>
    );
}
