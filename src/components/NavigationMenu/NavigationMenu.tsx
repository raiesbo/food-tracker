import Link from "next/link";
import { paths } from '../../utils/paths';

type Props = {
    isAuth: boolean
};

const urls = paths.components.NavigtionMenu;

export default function NavigationMenu({ isAuth }: Props) {
    return (
        <nav>
            {
                (urls[isAuth ? 'withAuth' : 'withoutAuth']).map(({ name, url }) => (
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