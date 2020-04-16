import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import { checkUserAvailable, login, register } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, Grid, TextField } from '@material-ui/core';

const RegisterForm = ({ history }) => {
  const [user, setUser] = useContext(MediaContext);
  const doRegister = async () => {
    try {
      await checkUserAvailable(inputs.username);
      await register(inputs);
      // kirjaudu tomaattisesti
      const userdata = await login(inputs);
      setUser(userdata.user);
      // console.log(user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
      // näytä virhe
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(doRegister);
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Register</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextField
                fullWidth
                type='text'
                name='username'
                label='Username'
                onChange={handleInputChange}
                value={inputs.username}
              />
            </Grid>
            <Grid container item>
              <TextField
                fullWidth
                type='password'
                name='password'
                label='Password'
                onChange={handleInputChange}
                value={inputs.password}
              />
            </Grid>
            <Grid container item>
              <TextField
                fullWidth
                type='email'
                name='email'
                label='Email'
                onChange={handleInputChange}
                value={inputs.email}
              />
            </Grid>
            <Grid container item>
              <TextField
                fullWidth
                type='text'
                name='full_name'
                label='Full name'
                onChange={handleInputChange}
                value={inputs.full_name}
              />
            </Grid>
            <Grid container item>
              <Button
                fullWidth
                color='primary'
                type='submit'
                variant='contained'
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
