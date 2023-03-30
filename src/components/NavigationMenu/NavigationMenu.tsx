import Link from "next/link";
import { paths } from '../../utils/paths';

type Props = {
    role?: 'SP' | 'CUSTOMER'
};

const urls = paths.components.NavigtionMenu;

export default function NavigationMenu({ role }: Props) {
    return (
        <nav>
            {
                (urls[role === 'SP'
                    ? 'serviceProvider'
                    : role === 'CUSTOMER'
                        ? 'customer'
                        : 'visitor']).map(({ name, url }) => (
                            <li key={name}>
                                <Link href={url}>
                                    {name}
                                </Link>
                            </li>
                        ))
            }
        </nav>
    );
}