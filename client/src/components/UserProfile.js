import React from 'react';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : "Artur"
        }
    };
    render() {
        return (
        <div className="row justify-content-center form-register">
            <div className="container">
                <div className= "background_white">
                    <div className="row justify-content-center form-register">
                        <div className="col-8">
                            <form>
                                <div>
                                    <h2>Edit profile</h2>
                                    <hr />
                                    <input  className = 'input_line' placeholder="New user name"  />
                                    <input  className = 'input_line' placeholder="New e-mail" />
                                    <br />
                                    <br />
                                    <button className="button-main" type="submit">
                                        Submit<i className="GuestBookButton2" aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center form-register">
                        <div className="col-8">
                            <form>
                                <div>
                                    <h2>Change password</h2>
                                    <hr />
                                    <input  className = 'input_line' placeholder="New password"  />
                                    <input  className = 'input_line' placeholder="Confirm passsword"  />
                                    <br />
                                    <br />
                                    <button className="button-main" type="submit">
                                        Submit<i className="GuestBookButton2" aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    }
               
export default UserProfile;