// To jest header strony
import React from 'react';
//import Img from 'react-image'
import logo from '../resourses/logo.png';
import header from '../resourses/head6.png';

const Top_menu = () => {
    return (
        <div className = "top__container">
            <center>
                <img src={header} width="100%" height="500"/>
                <br/>
                <button className='button_top' onClick={this.handleClick}><span>HOME</span></button>
                <button className='button_top' onClick={this.handleClick}><span>START TUTORIAL</span></button>
                <button className='button_top' onClick={this.handleClick}><span>OUR TEAM</span></button>
                <button className='button_logo round' onClick={this.handleClick}>
                    <span> LIFE PROGRESS<br /> <img src={logo} width="40" height="40" /> </span> 
                </button>                            
                <button className='button_top' onClick={this.handleClick}><span>SET LANGUAGE</span></button>            
                <button className='button_top' onClick={this.handleClick}><span>SIGN UP</span></button>
                <button className='button_top' onClick={this.handleClick}><span>SIGN IN</span></button>
        </center>
    </div>
    );
  }
  

class Header extends React.Component {
    
    render() {
        return (
            <div>
                <Top_menu />
            </div>
        )
    }
}

export default Header;