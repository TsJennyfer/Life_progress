import React from 'react';

import '../css/Cele.css';

class TermsPolicy extends React.Component {
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
                <div className="background_white">
                    <h2>Life Progress Privacy Policy</h2>
                    <h5>Effective Date: December 12th, 2018</h5>
                    <div className = "terms_format">
                        <div className = "form-register">
                            <h2>Information gathering and usage</h2>
                                <div className = "form-margin"><h4>
                                    When registering for Life Progress we ask for information such as your email address. Your information 
                                    is only used internally and won't be shared with others.
                                    Life Progress collects the email addresses of those who communicate with us via email, 
                                    and information submitted through voluntary activities such as site 
                                    registrations or participation in surveys. Todoist also collects aggregated, 
                                    anonymous user data regarding app usage. The user data we collect is used to improve Life Progress
                                    and the quality of our service. We only collect personal data that is 
                                    required to provide our services, and we only store it insofar that it is necessary to deliver these 
                                    services.
                                </h4></div>
                        </div>
                        <div className = "form-register">
                            <h2>Your data</h2>
                            <div className = "form-margin"><h4>
                            Life Progress uses third party 
                            vendors and hosting partners to provide the necessary hardware, software, networking, 
                            storage, and related technology required to run Life Progress. Although Life Progress owns the code, 
                            databases, and all rights to the Life Progress application, you retain all rights to your data. 
                            We will never share your personal data with a 3rd party without your prior authorization, 
                            and we will never sell data to 3rd parties. We process data inside of Poland. We transfer 
                            data with third-parties necessary to our ability to provide our services, all of whom are 
                            GDPR-compliant and provide the necessary safeguards required if they are outside of the EU.
                            </h4></div>
                        </div>
                        <div className = "form-register">
                            <h2>Ad servers</h2>
                            <div className = "form-margin"><h4>
                            We do not partner with or have special relationships with any ad server companies.
                            </h4></div>
                        </div>
                        <div className = "form-register">
                            <h2>Changes</h2>
                            <div className = "form-margin"><h4>
                            If our information practices change at some time in the future we will post the policy 
                            changes to our Web site to notify you of these changes and we will use for these new purposes 
                            only data collected from the time of the policy change forward. If you are concerned about how your 
                            information is used, you should check back at our Web site periodically.
                            </h4></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    }
               
export default TermsPolicy;