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
                        <h2>Edit profile</h2>
                        <hr />
                        <input placeholder="New user name"  />
                        <input placeholder="New e-mail" />
                        <br />
                        <br />
                        <button className="button-main" type="submit">
                            Submit<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
            <div className="row justify-content-center form-register">
                <div className="col-8">
                    <form>
                        <h2>Change password</h2>
                        <hr />
                        <input placeholder="New password"  />
                        <input placeholder="Confirm passsword"  />
                        <br />
                        <br />
                        <button className="button-main" type="submit">
                            Submit<i className="GuestBookButton2" aria-hidden="true" />
                        </button>
                    </form>
                </div>
            </div>
            <div className="row justify-content-center form-register">
                <div className="col-8">
                    <h2>Change language</h2>
                    <hr />
                </div>
            </div>
        </div>
        );
    }
    }
               
export default UserProfile;