import styles from './UserForm.module.css'
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import { useRef, useState } from 'react';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import Wrapper from '../helpers/Wrapper/Wrapper';

const UserForm = (props) => {

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const initialState = {
    error: null,
  }

  const [state, setState] = useState(initialState)

  const addUserHandler = (event) => {
    event.preventDefault();
    const username = nameInputRef.current.value;
    const age = ageInputRef.current.value;
    if (!username.trim()) {
      setState((prevState) => {
        return {
          ...prevState, error: {
            title: 'Invalid username', message: 'Please enter a valid name and age (non-empty values).',
          },
        }
      });
      return;
    }

    if (+age.trim() < 1) {
      setState((prevState) => {
        return {
          ...prevState, error: {
            title: 'Invalid age', message: 'Please enter a valid age (> 0).',
          },
        }
      });
      return;
    }

    props.onAddUser({ username, age, id: Math.random().toString() })
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';

  }

  const confirmHandler = () => {
    setState((prevState) => ({ ...prevState, error: '' }))
  }

  return (<Wrapper>
    {state.error &&
      <ErrorModal onConfirm={confirmHandler} title={state.error?.title} message={state.error?.message}></ErrorModal>}
    <Card className={styles.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={nameInputRef}
        />
        <label htmlFor="age">Age (years)</label>
        <input
          type="number"
          id="age"
          ref={ageInputRef}
        />
        <Button type="submit" onClick={addUserHandler}>Add user</Button>
      </form>
    </Card>
  </Wrapper>)
};

export default UserForm;
