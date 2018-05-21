// To jest komponent dodawania nowego podcelu do celu głównego
import React from 'react';
import axios from 'axios';

class PodcelForm extends React.Component {

    constructor(props) {
        super(props);

        this.addSubGoal = this.addSubGoal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.state = {
            name: "",
            parent: null,
            priority: 1
        }
    }


    addSubGoal(event) {
        event.preventDefault();
       

        var headers = {
            'Authorization': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }
        console.log(headers);
        axios.post('/goals/',  {
            name: this.state.name,
            parent: this.props.goal._id,
            userToken: localStorage.getItem('token'),
            priority: this.state.priority
        },
        {headers})
            .then(response => {
                console.log(response, `Dodano podcel ${this.state.name}`);
                this.setState({
                    name: ""
                });
                this.props.findAllGoals();
            })
            .catch(err => {
                console.log(err, 'Błąd dodawania podcelu');
            });

        
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handlePriorityChange(event) {
        this.setState({  priority: event.target.value });
    }

    render() {
        return (
            <div>
                PodcelForm - tylko dodawanie podcelu
                <form className="registerForm" onSubmit={this.addSubGoal}>
                    name:
                    <input
                        onChange={this.handleNameChange}
                        name="name"
                        type="text"
                        value={this.state.name}
                        placeholder="Nazwa podcelu"
                    />
                    <br />
                    priority:
                    <input
                        onChange={this.handlePriorityChange}
                        name="priority"
                        type="text"
                        value={this.state.priority}
                        placeholder="priority"
                    />
                    <br />

                    <button type="submit">
                        Dodaj Podcel<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }

}

export default PodcelForm;