import { TabBar, NavBar as AntdNavBar } from 'antd-mobile'
import { AppOutline, AntOutline } from 'antd-mobile-icons'

import { useRouter } from 'next/router'

export const NavBar = AntdNavBar

export const Nav: React.VFC = () => {
  const router = useRouter()
  const { pathname } = router

  const tabs = [
    {
      key: '/',
      title: 'Home',
      icon: <AppOutline />,
    },
    {
      key: '/ant-race',
      title: 'Ant Race',
      icon: <AntOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={(path) => router.push(path)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
