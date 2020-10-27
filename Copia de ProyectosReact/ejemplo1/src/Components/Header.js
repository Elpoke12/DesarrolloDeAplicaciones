import React,{Component} from 'react';
import './Header.css'
import logo from '../logo.svg'

class Header extends Component{
    render(){
        return(
            <div className="Header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>
                Practica de Prueba 
                </h1>
                <p>
                Osmar Enrique
                </p>
            </div>
        );
    }
}

export default Header;