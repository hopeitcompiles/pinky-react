import   {Link, useParams, useSearchParams} from 'react-router-dom';
import { useContext, useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useQuery } from '../hooks/useQuery';
import navicon from '../assets/images/logo.png'
import UserContext from '../context/UserProvider';
import { Button } from 'react-bootstrap';
import Style from '../assets/css/Header.module.css'

export function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams|| "");
    const navigate = useNavigate(); //de React Router, agregar elemento a la ruta
    const {sessionUser,logout,image} = useContext(UserContext)
    useEffect(() => {
        setSearchText(searchParams.get('search')|| ""); //si searchInPath es null, set empty ""
    }, [searchParams]);

    const submitSearch = (e) => {
        e.preventDefault();
        let search = {
            search: searchText
          }
        
        setSearchParams(search, { replace: true });
    }

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${Style.orange_bg}`}>
        <div className="container">
            <Link to="/" className="navbar-brand">
                <img src={navicon} height="30" className="d-inline-block align-top" alt=""/>
            </Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav ">
                <Link to="/" className="nav-item nav-link active text-white">Inicio</Link>
                <Link to="/tests" className="nav-item nav-link text-white">Pruebas</Link>
                    <div className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">Quick Access</Link>
                    <div className="dropdown-menu">
                        <Link to="/users"  className="dropdown-item">Users</Link>
                        <Link to="/games"  className="dropdown-item">Games</Link>
                        <Link to="/tests"  className="dropdown-item">Tests</Link>
                    </div>
                    </div>
                </div>
                <form className="d-flex" role="search" onSubmit={submitSearch}>
                    <input className="form-control me-2" type="search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder="Buscar" name="searching" required/>
                    
                </form>
                {sessionUser?<div className="navbar-nav ">   
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">
                            <img className={[Style.profile_picture ]} src={image} 
                            alt={sessionUser.name}/>{sessionUser.name}</Link>
                        <div className="dropdown-menu">
                            <Link to="/profile"  className="dropdown-item">Profile</Link>
                            {sessionUser?.role?.level>=2&&<span>
                                <Link to="/admin"  className="dropdown-item">Admin site</Link>
                                {sessionUser?.role?.level>100&&
                                    <Link to="/root"  className="dropdown-item">Root Options</Link>
                                }
                                </span>
                            }
                            <Button onClick={logout}  className="dropdown-item text-danger">Log out</Button>
                        </div>
                    </div>
                </div>
                :
                    <div className="navbar-nav">
                        <Link to="/login" className="nav-item nav-link text-white" id="login">Log in</Link>
                        <Link to="/register" className="nav-item nav-link text-white" id="login">Sign up</Link>
                    </div>
                }
            </div>
        </div>
    </nav>
  );
}
