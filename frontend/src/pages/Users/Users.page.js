import './Users.page.css';
import CardUser from '../../components/CardUser/CardUser';

import * as strapi from '../../api/users.api'
import { useState, useEffect } from 'react'

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    strapi.getUsers().then(users => {
      console.log({ users: users.data })
      setUsers(users.data)
    })
  }, [])

  return (
    <section className="a-p-16 a-flex a-flex-column">
      {
        users.map(user => (<CardUser
          key={user.id}
          codeUser={user.codeUser}
          email={user.email}
          name={user.name}
          phone={user.phone}
          surname={user.surname}
          totalBookRead={user.totalBookRead}
          avatar={user.avatar}
          created_at={user.created_at}
        />))
      }
    </section>
  )
}
