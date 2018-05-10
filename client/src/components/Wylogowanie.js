// To jest komponent strony logowania użytkownika
import React from 'react';
import axios from 'axios';

class Wylogowanie extends React.Component {

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

    }

    //Wylogowanie, usuwanie tokena ze schowka w przeglądarce
    logOut(event){
        event.preventDefault();
        if (localStorage!=null){
            localStorage.clear();
            console.log("Token deleted")
        }
        else{
            console.log("User not logged in")
        }
    }

    render() {
        return (
            <div>
                <form className="logoutForm" on onSubmit={this.logOut}>
                    <button type="submit">
                        Wyloguj się<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }
}

export default Wylogowanie;