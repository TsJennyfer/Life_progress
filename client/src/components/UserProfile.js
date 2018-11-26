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
        <div className="row">
            <div className="background_grey">  
                <div className="container">
                    <div className= "background_white">
                        <div className="row justify-content-center form-register">
                            <div className="col-8">
                                <form>
                                    <div>
                                        <h2>Edit profile</h2>
                                        <hr />
                                        <input placeholder="New user name"  />
                                        <input placeholder="New e-mail" />
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
                                        <input placeholder="New password"  />
                                        <input placeholder="Confirm passsword"  />
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
                                <h2>Change language</h2>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    }
               
export default UserProfile;