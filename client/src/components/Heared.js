// To jest header strony
import React from 'react';

//  <img style={{weight: '40px', height: '40px'}} src={require('/home/jenya/work/Life_progress-master/client/src/to_do.png')} />

const Top_menu = () => {
    return (
      <div>
        <center>
        <button className='button_top' onClick={this.handleClick}><span>HOME</span></button>
        <button className='button_top' onClick={this.handleClick}><span>START TUTORIAL</span></button>
        <button className='button_top' onClick={this.handleClick}><span>OUR TEAM</span></button>
        <button className='button_top' onClick={this.handleClick}>
          <span>  
            LIFE PROGRESS<br />
          </span> 
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