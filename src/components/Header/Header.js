import React from 'react';
import { Link } from 'react-router-dom';

import cl from './Header.module.scss';

export const Header = () => {
    return (
        <div className={cl['header-body']}>
            <Link to="/" className={cl.title}>Realworld Blog</Link>
            <div className={cl['control-panel']}>
                <Link to="/" className={cl.button}>Sign In</Link>
                <Link to="/" className={`${cl.button} ${cl['success-button']}`}>Sing Up</Link>
            </div>
        </div>
    )
};


export default Header;
