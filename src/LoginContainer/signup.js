import { useState } from 'react';
import { useRouteMatch, useHistory, useLocation, Link } from "react-router-dom"
import Input from '../Component/input/input'
import FInput from '../Component/input/fileinput';
import Button from '../Component/button/button'
import Navbar from '../LoginContainer/Navbar/navbar';
import axios from 'axios';

// import styles from './styles.css'
function Login() {
    let history = useHistory();
    const [username, setusername] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [useremail, setuseremail] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    function onChangeHandler(event) {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    function onUseremailValueChange(event) {
        setuseremail(event.target.value);
        console.log(event.target.value);
    }
    function onUsernameValueChange(event) {
        setusername(event.target.value);
        console.log(event.target.value);
    }
    function onUserpaswordValueChange(event) {
        setuserpassword(event.target.value);
        console.log(event.target.value);
    }
    function clickHandler(event) {
        let formData = new FormData();
        formData.append('file', selectedFile);
        formData.append("name", username);
        formData.append("email", useremail);
        formData.append("password", userpassword);
        axios.post('http://localhost:8282/signup', formData, {
            method: 'post',
            withCredentials: true,
        }).then(function (data) {
                history.push('/');
        }).catch(function (err) {
            console.log(err);
        })
        event.preventDefault();
    }
    return (
        <>
            <Navbar />
            <div class="grid align__item abc">
                <div class="register">
                    <h2 class="heading">Signup </h2>
                    <form class="form">
                        <div class="form__field">
                            <Input value={useremail} type={'email'} placeholder={'Email'} onValueChange={onUseremailValueChange} /></div>
                        <div class="form__field">
                            <Input value={username} type={'text'} placeholder={'Username'} onValueChange={onUsernameValueChange} />
                        </div>
                        <div class="form__field">
                            <Input value={userpassword} type={'password'} placeholder={'Password'} onValueChange={onUserpaswordValueChange} />
                        </div>
                        <div class="form__field inputfile">
                            <input type='file' name="file" onChange={onChangeHandler}></input>
                        </div>
                        <div class="form__field">
                            <Button clickHandler={clickHandler} value={'Signup'} />
                        </div>
                    </form>

                    {/* <p>Already have an accout? <a href="#">Log in</a></p> */}

                </div>

            </div>
            {/* <FInput name={'file'} type={'file'} onValueChange={onChangeHandler} /><br /><br /> */}
        </>
    )
}

export default Login;