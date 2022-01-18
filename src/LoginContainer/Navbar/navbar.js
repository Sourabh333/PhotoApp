import Styles from './style.module.css';
import {Link} from 'react-router-dom';
import Button  from '../../Component/button/button';
import { useHistory } from 'react-router';
import cookies from 'universal-cookie';
function Navbar(props) {
    const { isAuth, username, img } = props;
    let history = useHistory();
    let cookie = new cookies();
    function clickHandler(event)
    {
       
        cookie.remove('photoappcookie')
        history.push('/login');
       
    }
    return (
        <>
            <div className={Styles.mynav}>
                <nav class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top ">
                    {/* <a class="navbar-brand">The Photo App</a> */}
                   <h1 class="nav-item active ml-3 mr-3"> <Link to='/' class='nav-link'>The Photo App </Link></h1>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class='nav-item active ml-3 mr-3'>
                                {
                                    isAuth ? (<img src={img} alt="..." className={Styles.profile_image} />) :
                                        (<span class='nav-link'>You Need To Login First</span>)
                                }
                            </li>

                            <li class="nav-item active ml-3 mr-3">
                                {isAuth ? (<a class="nav-link" href="#">{username} <span class="sr-only">(current)</span></a>) :
                                    (<Link to='/login' class='nav-link'>Login </Link>)}
                            </li>
                            <li class="nav-item active ml-3 mr-3">
                                {isAuth ?(<Link to='/uploadphoto' class='nav-link'>Upload Photo </Link>):(<span></span>) }
                            </li>
                            <li class="nav-item active ml-3 mr-3">
                                {isAuth ?(<button style={{"background":"transparent","border":"none","color":"white","margin-top":"6px"}} onClick={clickHandler}>Logout</button>):(<span></span>) }
                            </li>
                            {/* <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Disabled</a>
                            </li> */}
                        </ul>
                        {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
                    </div>
                </nav>
            </div>
        </>
    )
}
export default Navbar;