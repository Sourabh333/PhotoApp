import Navbar from '../LoginContainer/Navbar/navbar';
import Button from '../Component/button/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookie from 'universal-cookie'
import Input from '../Component/input/input';

function Dashboard() {
    const mystyle = {
        color: "black",
        backgroundColor: "black",
        padding: "10px",
        fontFamily: "Arial"
    };
    let cookie = new Cookie();
    let token = cookie.get('photoappcookie');
    let [images, setimages] = useState([]);
    let [comments, setcomments] = useState([]);
    let [cimage, setcimage] = useState("");
    let [comment, setcomment] = useState("");

    if (token) {
        if (!images.length) {
            let req = new XMLHttpRequest();
            req.open('POST', 'http://localhost:8282/images');
            req.addEventListener('load', function (response) {
                let res = JSON.parse(response.target.responseText);
                const new_array = [...res]
                console.log(new_array);
                setimages(new_array);
            })
            req.setRequestHeader('Content-type', 'application/json')
            req.send(JSON.stringify({user:token.name}));
        }
        function getComments(imagename) {
            return function () {
                let req = new XMLHttpRequest();
                req.open('POST', 'http://localhost:8282/comments');
                req.addEventListener('load', function (response) {
                    let res = JSON.parse(response.target.responseText);
                    console.log(res);
                    const new_array = [...res]
                    setcomments(new_array);
                    setcimage(imagename);
                })
                req.setRequestHeader('Content-type', 'application/json')
                req.send(JSON.stringify({ image_src: imagename }));
            }
        }
        function onCommentChange(event) {
            setcomment(event.target.value)
        }
        function addComment(imagename, username) {
            return function () {
                var xhttp = new XMLHttpRequest();
                xhttp.addEventListener("load", function () {
                    setcomment("");
                    setcimage("");
                })
                var commentdata = {
                    comment: comment,
                    image: imagename,
                    user: username
                }
                xhttp.open("post", "http://localhost:8282/addComment");
                xhttp.setRequestHeader('Content-type', 'application/json');
                xhttp.send(JSON.stringify({ comment: commentdata }));
            }
        }
        return (
            <>
                <Navbar isAuth={true} username={token.name} img={"http://localhost:8282/"+token.image_src} />
                <div>
                    {
                        images.map(function (image, index) {

                            return <>
                                <div key={index}>
                                    <label><Link to={{
                                        pathname: '/user',
                                        state: { useremail: image.email, 
                                                name:token.name
                                        }
                                    }}>
                                        {image.name}</Link></label><br />
                                    <div >
                                        <img style={{ "width": "50%", "height": "50%" }} src={"http://localhost:8282/" + image.image_src} />
                                    </div>
                                    <div>
                                        < Button clickHandler={getComments(image.image_src)} value={'Show Comments'} />

                                        <input style={{ "color": "black" }} value={comment} type={'text'} placeholder={'Add Comment'} onChange={onCommentChange} />
                                        <Button clickHandler={addComment(image.image_src, token.name)} value={'Add Comment'} />

                                        {
                                            image.image_src == cimage ? (
                                                <div>
                                                    <ol>
                                                        {
                                                            comments.map(function (comment, index) {
                                                                return <> <div key={index}>
                                                                    <li>
                                                                        <label>{comment}</label>
                                                                    </li>
                                                                </div>
                                                                </>
                                                            })
                                                        }
                                                    </ol>
                                                </div>

                                            ) : (null)
                                        }
                                    </div>
                                    {/* <Button className={styles.addFriendStyle} type="submit" text="Add friend" clickHandler={addFriend(username)} /> */}
                                </div><hr />
                            </>
                        })
                    }

                </div >
            </>
        )
    }
    else
        return (
            <>
                <Navbar isAuth={false} />
            </>
        )
}

function CommentList(props) {

    return userIt(props);
}

function userIt(props) {
    const { comments } = props;
    return <>
        <div>
            <ol>
                {
                    comments.map(function (comment, index) {
                        <div key={index}>
                            <li>
                                <label>{comment}</label>
                            </li>
                        </div>
                    })
                }
            </ol>
        </div>
    </>
}
export default Dashboard;