import { useState } from 'react';
import { Users } from './mock/Users';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';

function App() {

  const initialState = {
    users: Users,
  }

  const [state, setState] = useState(initialState)

  const addUserHandler = (newUser) => {
    console.log({ newUser })
    setState((prevState) => ({ ...prevState, users: [...prevState.users, newUser] }))
  }

  return (
    <div>
      <UserForm onAddUser={addUserHandler}></UserForm>
      <UserList users={state.users}/>
    </div>
  )
}

export default App;
