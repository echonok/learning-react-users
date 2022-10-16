import styles from './UserList.module.css'
import Card from '../UI/Card/Card';

const UserList = (props) => {

  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => <li key={user.id}><p>{`${user.username} (${user.age} years old)`}</p></li>)}
      </ul>
    </Card>
  )
}

export default UserList
