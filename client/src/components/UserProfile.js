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
                <div className="col-12">
                    <div className = "div_format">
                        <div>
                            <h3><u>EDIT PROFILE</u></h3>
                                <label>Name</label>
                                <input
                                    placeholder="User NAME"
                                />
                        </div>
                        <div>
                            <div>
                                <label>E-mail</label>
                                <input
                                    placeholder="life.progress@gmail.com"
                                /> 
                            </div>
                            <button className="button-main" type="submit">
                                SUBMIT<i className="GuestBookButton2" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className = "div_format">
                        <h3><u>CHANGE PASSWORD</u></h3>
                        <div>
                            <label>New password</label>
                            <input
                                placeholder=""
                            />
                        </div>
                        <div> 
                            <label>Confirm passsword</label>
                            <input
                                placeholder=""
                            /> 
                        </div>
                        <button className="button-main" type="submit">
                            SUBMIT<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </div>
                    <div className = "div_format">
                        <h3><u>CHANGE LANGUAGE</u></h3>
                    </div>
                </div>

        );
    }
}

export default UserProfile;