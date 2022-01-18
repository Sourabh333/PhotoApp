import Navbar from '../LoginContainer/Navbar/navbar';
import Button from '../Component/button/button'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import Cookie from 'universal-cookie'
import Input from '../Component/input/input';

function UploadPhoto() {
    let history = useHistory();
    let cookie = new Cookie();
    let token = cookie.get('photoappcookie');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [todos, setTodos] = useState([]);
    const [task_input, setTaskInput] = useState("");

    function onChangeHandler(event) {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    function onClickHandler() {

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('UsersList',todos);

        axios.post('http://localhost:8282/uploadpost', formData, {
            method: 'post',
            withCredentials: true,
        }).then(function (result){
            console.log('success:', result);
        }).catch(function (err) {
            console.log(err);
        })
        history.push('/');
    }

    function clickHandler() {
        todos.push(task_input);

        setTaskInput("");

        let new_array = [...todos];

        setTodos(new_array)
    }

    function onValueChange(event) {
        console.log(event.target.value);
        setTaskInput(event.target.value);
    }

    // a function returning funtion is known as higher
    //order function
    function deleteTodo(id) {
        return function () {
            todos.splice(id, 1);

            setTodos([...todos])
        }
    }
    if (token)
        return (
            <>
                <Navbar isAuth={true} username={token.name} image_src={"http://localhost:8282/" + token.image_src} />
                <input type='file' name="avatar" onChange={onChangeHandler}></input>
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
                <label >  PS: YOU CAN ADD USERS TO WHOM YOU WANT TO HIDE THIS IMAGE :) </label><br />

                <Button value={'Upload'} clickHandler={onClickHandler} /><br />
                <br /><br />
                <label>Add Users to Hide</label>
                <br />
                <Top
                    clickHandler={clickHandler}
                    onValueChange={onValueChange}
                    value={task_input}
                    type={'text'}
                />
                <br />
                <label>List of Users to Hide</label>
                <Bottom
                    todos={todos}
                    deleteTodo={deleteTodo}
                />
            </>
        )
    else
        return (
            <>
                <Navbar isAuth={false} />
            </>
        )
}
export default UploadPhoto;

function Top(props) {
    const { onValueChange, clickHandler, value, type } = props;

    return (
        <>
            <div>
                <input style={{ "color": "black" }} value={value} type={'text'} placeholder={'@User Name'} onChange={onValueChange} />
                <Button
                    value={"save"}
                    clickHandler={clickHandler}
                />
            </div>
        </>)
}


function Bottom(props) {
    const { todos, deleteTodo } = props;
    return (<>
        <div>
            <ol>
                {
                    todos.map(function (todo, index) {
                        return <div onClick={deleteTodo(index)} key={index}>
                            <li >{todo}</li>
                        </div>
                    })
                }
            </ol>
        </div></>
    )
}