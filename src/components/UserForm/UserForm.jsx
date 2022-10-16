import styles from './UserForm.module.css'
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import { useState } from 'react';
import ErrorModal from '../UI/ErrorModal/ErrorModal';

const UserForm = (props) => {

  const initialState = {
    username: '',
    age: '',
    error: null,
  }

  const [state, setState] = useState(initialState)

  const usernameChangeHandler = (event) => {
    setState((prevState) => ({ ...prevState, username: event.target.value }))
  }

  const ageChangeHandler = (event) => {
    setState((prevState) => ({ ...prevState, age: event.target.value }))
  }

  const addUserHandler = (event) => {
    event.preventDefault();
    if (!state.username.trim()) {
      setState((prevState) => {
        return {
          ...prevState,
          error: {
            title: 'Invalid username',
            message: 'Please enter a valid name and age (non-empty values).',
          },
        }
      });
      return;
    }

    if (+state.age.trim() < 1) {
      setState((prevState) => {
        return {
          ...prevState,
          error: {
            title: 'Invalid age',
            message: 'Please enter a valid age (> 0).',
          },
        }
      });
      return;
    }

    props.onAddUser({ ...state, id: Math.random().toString() })
    setState(() => ({ ...initialState }))
  }

  const confirmHandler = () => {
    setState((prevState) => ({ ...prevState, error: '' }))
  }

  return (
    <div>
      {state.error && <ErrorModal onConfirm={confirmHandler} title={state.error?.title} message={state.error?.message}></ErrorModal>}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            value={state.username}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            type="number"
            id="age"
            onChange={ageChangeHandler}
            value={state.age}
          />
          <Button type="submit" onClick={addUserHandler}>Add user</Button>
        </form>
      </Card>
    </div>
  )
};

export default UserForm;
