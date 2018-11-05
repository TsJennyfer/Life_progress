// To jest komponent profilu użytkownika
import React from 'react';
import {
    Link
} from 'react-router-dom';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : "Artur"
        }
    };
    render() {
        return (
            <h1>Profil użytkownika {this.state.user}</h1>
        );
    }
}

export default UserProfile;