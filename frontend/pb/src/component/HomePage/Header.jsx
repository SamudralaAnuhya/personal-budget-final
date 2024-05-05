import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/homepage">Home</Link>
                    </li>
                    <li>
                        <Link to="/expenses">Expenses</Link>
                    </li>
                    <li>
                        <Link to="/budget">Budget</Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={() => {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('token_type');
                        }}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;