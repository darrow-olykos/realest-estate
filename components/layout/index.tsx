import { Grid, TabBar, NavBar as AntdNavBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

import { useRouter } from 'next/router';

export const NavBar = AntdNavBar;

export const Nav: React.VFC = () => {
    const router = useRouter()
    const { pathname } = router;

    const tabs = [
        {
            key: '/',
            title: 'Home',
            icon: <AppOutline />,
        },
        {
            key: '/other',
            title: 'Other',
            icon: <UnorderedListOutline />,
        },
    ]

    return (
        <TabBar activeKey={pathname} onChange={path => router.push(path)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
}