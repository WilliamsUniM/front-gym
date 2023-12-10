import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';
import './menu.css'

export default props => {
    return (
        <Menu>
            <Link to="/home">Home</Link>
            <Link to="/usuarios">Usuarios</Link>
            <Link to="/pagos">Pagos</Link>
            <Link to="/reportes">Reportes</Link>
            <img src={`${process.env.PUBLIC_URL}/gym.png`} style={{ width: 40 + '%' }} />
        </Menu>
    );
};