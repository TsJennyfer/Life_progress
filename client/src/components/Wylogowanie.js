// To jest komponent strony logowania użytkownika
import React from 'react';

class Wylogowanie extends React.Component {

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

    }

    //Wylogowanie, usuwanie tokena ze schowka w przeglądarce
    logOut(event){
        event.preventDefault();
        if (localStorage!=null){
            console.log(localStorage);
            localStorage.removeItem('token');
            console.log("Token deleted")

        }
        else{
            console.log("User not logged in")
        }
    }

    render() {
        return (
            <div>
                <form className="logoutForm" onSubmit={this.logOut}>
                    <button type="submit">
                        Sign out<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }
}

export default Wylogowanie;