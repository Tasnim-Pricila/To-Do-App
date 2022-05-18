import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';

const Header = () => {

    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    }

        return (
            <div>
                <div className="navbar bg-base-100 px-12">
                    <div className="navbar-start">

                        <Link to='/' className="btn btn-ghost normal-case text-xl text-primary">TO-DO-APP</Link>
                    </div>

                    <div className="navbar-end">
                        {user ?
                            <button className='uppercase border border-orange-400 rounded px-4 py-1 '
                                onClick={handleSignOut}>
                                Logout
                                <FontAwesomeIcon icon={faSignOut} className='pl-2'></FontAwesomeIcon>
                            </button>
                            :
                            <div>
                                <Link to='/register' className="btn mr-2">REGiSTER</Link>
                                <Link to='/login' className="btn">Login</Link>
                            </div>
                        }
                    </div>
                </div>

            </div>
        );
    };

    export default Header;