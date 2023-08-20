import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginBox } from '../../components/shared/';

import logo from './../../../public/logo-black.png';

import io from 'socket.io-client';

export const Login = () => {
    

    return(
    <div className='Login__wrapper'>
       
        <div className="Login__wrapper__header">
            <img className="Login__wrapper__header__logo" src={logo} />
        </div>
        <LoginBox/>
    </div>
    )
}
