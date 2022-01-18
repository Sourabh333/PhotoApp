import React from 'react';
import Login from './LoginContainer/login'
import Signup from './LoginContainer/signup'
import ForgotPassword from './LoginContainer/forgotpassword'
import UploadPhoto from './LoginContainer/uploadphoto';
import Dashboard from './LoginContainer/dashboard'
import User from './UserProfile/user'
import { Switch, Route } from "react-router-dom"
function App() {
    return (
        <>
            <Route>
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/uploadphoto">
                        <UploadPhoto />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/forgotpassword">
                    <ForgotPassword />
                    </Route>
                    <Route  path="/user">
                    <User />
                    </Route>
                    <Route exact path="/">
                    <Dashboard />
                    </Route>
                </Switch>
            </Route>
        </>
    )
}
export default App;