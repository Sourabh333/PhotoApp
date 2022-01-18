import { useLocation } from "react-router-dom";
import Cookie from 'universal-cookie'
import Navbar from '../LoginContainer/Navbar/navbar';
import Button from '../Component/button/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../LoginContainer/styles.scss';

function UserDetail(props) {
    let cookie = new Cookie();
    let token = cookie.get('photoappcookie');
    let location = useLocation();
    const { useremail ,name} = location.state;

    let [images, setimages] = useState([]);
    let [comments, setcomments] = useState([]);
    let [cimage, setcimage] = useState("");
    let [comment, setcomment] = useState("");
    if (!images.length) {
        let req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:8282/userimages');
        req.addEventListener('load', function (response) {
            let res = JSON.parse(response.target.responseText);
            console.log(res);
            const new_array = [...res]
            if(new_array[0]._id==new_array[1]._id)
            {
                new_array.splice(1,1);
            }
            console.log(new_array);
            setimages(new_array);
        })
        console.log(useremail);
        req.setRequestHeader('Content-type', 'application/json')
        req.send(JSON.stringify({ email: useremail,name:name }));
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
    return <>
        <Navbar isAuth={true} username={token.name} image_src={"http://localhost:8282/" + token.image_src} />
        <div>
            {
                images.map(function (image, index) {

                    return <>
                        <div key={index}>
                            
                            <div >
                                <img style={{ "width": "50%", "height": "50%" }} src={"http://localhost:8282/" + image.image_src} />
                            </div>
                            <div>
                                < Button clickHandler={getComments(image.image_src)} value={'Show Comments'} />
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



}
export default UserDetail;