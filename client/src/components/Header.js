// To jest header strony
import React from 'react';
//import Img from 'react-image'
import logo from '../resourses/logo.png';
import english from '../resourses/english.png';
import polish from '../resourses/polish.png';
import russian from '../resourses/russian.png';
import ukrainian from '../resourses/ukrainian.png';
import german from '../resourses/german.png';
import '../css/Header.css';

const Top_menu = () => {
    return (
        <div className = "top__container">
            <center>
                <br/>
                <button className='button_top' onClick={this.handleClick}><span>HOME</span></button>
                <button className='button_top' onClick={this.handleClick}><span>START TUTORIAL</span></button>
                <button className='button_top' onClick={this.handleClick}><span>OUR TEAM</span></button>
                <button className='button_logo round' onClick={this.handleClick}>
                    <span> LIFE PROGRESS<br /> <img src={logo} width="40" height="40" /> </span> 
                </button>                            
                <select className='button_top' >{/*onClick={this.handleClick}><span>SET LANGUAGE</span>*/}
                    <option selected value="grapefruit">SET LANGUAGE</option>  
                    <option value="lime"> ENGLISH</option>  
                    <option value="coconut">POLISH</option>  
                    <option value="mango">RUSSIAN</option>  
                    <option value="mango">UKRAINIAN</option>  
                    <option value="mango">GERMAN</option>  
                </select>                                             
                <button className='button_top'  onclick={this.rejestacja}><span>SIGN UP</span></button>
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