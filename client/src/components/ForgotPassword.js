import React from 'react';


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : ""
        }
    };

    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    render() {
        return (
            <div className="container">
            <div className="row justify-content-center form-register">
                <div className="col-12">
                    <h2>Forgot your password? </h2>
                    <hr />
                </div>
                <div className="col-8">
                    <form className="registerForm" onSubmit={this.addUser}>
                        <div>
                            <input className = 'input_line'
                             placeholder="Your e-mail"
                            type="email" minLength={4} 
                            onChange={this.handleEmail}
                            />
                            <div>
                                <br />
                                <button className="button-main" type="submit">
                                    Submit<i className="GuestBookButton2" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}
               
export default ForgotPassword;