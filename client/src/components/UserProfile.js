// To jest komponent profilu użytkownika
import React from 'react';
import {
    Link
} from 'react-router-dom';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
    };
    render() {
        return (
        <div>
            <div className="row justify-content-center">
                <div className="col-6">
                    <div>
                        <h3><u>EDIT PROFILE</u></h3>
                        <div>
                            <label>Name</label>
                            <input
                                placeholder="User NAME"
                            />
                        </div>
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
            </div>
            <div className="row justify-content-center">
                <div className="col-6">
                    <div>
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
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-6">
                    <h3><u>CHANGE LANGUAGE</u></h3>
                </div>
            </div>
        </div>
        );
    }
    }
               
            
export default UserProfile;