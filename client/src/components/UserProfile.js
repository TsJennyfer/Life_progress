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
        <div className="container">
            <div className="row justify-content-center form-register">
                <div className="col-8">
                    <form>
                        <h3>Edit profile</h3>
                        <hr />
                        <input placeholder="New user name"  />
                        <input placeholder="New e-mail" />
                        <button className="button-main" type="submit">
                            Submit<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
            <div className="row justify-content-center form-register">
                <div className="col-8">
                    <form>
                        <h3>Change password</h3>
                        <hr />
                        <input placeholder="New password"  />
                        <input placeholder="Confirm passsword"  />
                        <button className="button-main" type="submit">
                            Submit<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
            <div className="row justify-content-center form-register">
                <div className="col-8">
                    <h3>Change language</h3>
                    <hr />
                </div>
            </div>
        </div>
        );
    }
    }
               
export default UserProfile;