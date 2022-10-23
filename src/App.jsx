import { useState } from 'react';
import { Users } from './mock/Users';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import { Fragment } from 'react';

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
    <Fragment>
      <UserForm onAddUser={addUserHandler}></UserForm>
      <UserList users={state.users}/>
    </Fragment>
  )
}

export default App;
