import { useState } from 'react';
import { useRouteMatch, useHistory, useLocation, Link } from "react-router-dom";
import Input from '../Component/input/input';
import Button from '../Component/button/button';
import Navbar from '../LoginContainer/Navbar/navbar';
import axios from 'axios';
import './styles.scss';

function Login() {
  let history = useHistory();
  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  function onUseremailValueChange(event) {
    setuseremail(event.target.value);
    console.log(event.target.value);
  }
  function onUserpaswordValueChange(event) {
    setuserpassword(event.target.value);
    console.log(event.target.value);
  }
  function clickHandler(event) {
    let user = {
      email: useremail,
      password: userpassword,
    }
    axios.post('http://localhost:8282/login', user, {
      method: 'post',
      withCredentials: true,
    }).then(function (response) {
      console.log('hello');
      if(response.data=="OK")
      history.push('/');
      else
      history.push('/login');
    }).catch(function (err) {
      console.log(err);
    })
    event.preventDefault()
  }
  
  return (
    <>
      <Navbar />
      <div class="grid align__item abc">

        <div class="register">
          <h2 class="heading">Login </h2>

          <form class="form">

            <div class="form__field">
              <Input value={useremail} type={'email'} placeholder={'Email'} onValueChange={onUseremailValueChange} />
            </div>

            <div class="form__field">
              <Input value={userpassword} type={'password'} placeholder={'Password'} onValueChange={onUserpaswordValueChange} />
            </div>

            <div class="form__field">
              <Button clickHandler={clickHandler} value={'Login'} />
            </div >
            <div class="form__field">
              <Link to='/signup'>Signup</Link></div>
          </form>

          {/* <p>Already have an accout? <a href="#">Log in</a></p> */}

        </div>

      </div>
    </>
  )

}
export default Login;