import { useState } from 'react';
import { useRouteMatch, useHistory, useLocation, Link } from "react-router-dom";
import Input from '../Component/input/input';
import Button from '../Component/button/button';
import Navbar from '../LoginContainer/Navbar/navbar';
import axios from 'axios';
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
    function clickHandler() {
        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener('load', function (res) {
            if (res.target.responseText === 'OK') {
                history.push("/dashboard");
            }
            else {
                history.push("/signup");
            }
        })
        xhttp.open("POST", "http://localhost:8282/login")
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ email: useremail, password: userpassword }));

    }
    function getCookieHandler() {
        let user={
            name:'sourabh',
            id:111,
        }
        axios.post('http://localhost:8282/getcookies',user,{
            method: 'post',
            withCredentials: true,
        }).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        })
    }
    function checkCookieHandler() {
        axios.get('http://localhost:8282/check', {
            method: 'get',
            withCredentials: true,
        }).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        })
    }
    return (
        <>
            <Navbar />
            <h1>Login Here</h1>
            <Input value={useremail} type={'email'} placeholder={'Email'} onValueChange={onUseremailValueChange} />
            <Input value={userpassword} type={'password'} placeholder={'Password'} onValueChange={onUserpaswordValueChange} />
            <Button clickHandler={clickHandler} value={'submit'} />
            <Button clickHandler={getCookieHandler} value={'getCookie'} />
            <Button clickHandler={checkCookieHandler} value={'CheckCookie'} />
            <Link to='/signup'>Signup</Link>
        </>
    )
}

export default Login;