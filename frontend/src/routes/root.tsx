import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { routes } from './routes'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = routes
  .filter(({ hidden }) => !hidden)
  .map(({ key, label }) => ({
    key,
    label: <Link to={key}>{label}</Link>,
  }))

export default function Root() {
  const location = useLocation()
  const [current, setCurrent] = useState(
    location.pathname.split('/')[1] || routes[0].key
  )

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <>
      <div id="menu">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div id="detail" style={{ margin: '8px 8px 8px 8px' }}>
        <Outlet />
      </div>
    </>
  )
}
