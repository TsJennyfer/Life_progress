// To jest Footer = stopka - dolna część strony
import React from 'react';
import logo from '../resourses/logo.png';

import '../css/Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button className='button_logo round' onClick={this.handleClick}>
                                    LIFE PROGRESS<br /> <img src={logo} alt="logo" width="40" height="40" />
                                </button> 
                            </td>                            
                        </tr>
                        <tr>
                           <td>
                                <button className='button_down' onClick={this.handleClick}><span>HOME</span></button>
                                <button className='button_down' onClick={this.handleClick}><span>OUR TEAM</span></button>
                            </td>
                             <td> 
                                <button className='button_down' onClick={this.handleClick}><span>SET LANGUAGE</span></button>            
                                <button className='button_down' onClick={this.handleClick}><span>SIGN UP</span></button>
                            </td>
                            <td> 
                                <button className='button_down' onClick={this.handleClick}><span>START TUTORIAL</span></button>       
                                <button className='button_down' onClick={this.handleClick}><span>SIGN IN</span></button>
                            </td> 
                        </tr>
                        </tbody>
                </table>
            </div>
        )
    }
}

export default Footer;