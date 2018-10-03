// To jest komponent dodawania nowego celu głównego
import React from 'react';
import axios from 'axios';

import '../css/Cele.css';

class CelGlownyForm extends React.Component {

    constructor(props) {
        super(props);

        this.addMainGoal = this.addMainGoal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.state = {
            name: "",
            parent: null,
            userId: null,
            priority: 1
        }
    }


    addMainGoal(event) {
        event.preventDefault();
        const test = {
            name: this.state.name,
            parent: null,
            userId: this.state.userId,
            userToken: localStorage.getItem('token'),
            priority: this.state.priority
        };
        console.log(test);

        var headers = {
            'auth': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
        }
        console.log(headers);
        axios.post('/goals/',  {
            name: this.state.name,
            parent: null,
            userId: this.state.userId,
            userToken: localStorage.getItem('token'),
            priority: this.state.priority
        },
        {headers})
            .then(response => {
                console.log(response, `Dodano cel główny ${this.state.name}`);
                this.setState({
                    name: "",
                    parent: null

                });
            })
            .catch(err => {
                console.log(err, 'Błąd dodawania celu głównego');
            });

        
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleUserIdChange(event) {
        this.setState({ userId: event.target.value });
    }
    handlePriorityChange(event) {
        this.setState({  priority: event.target.value });
    }

    render() {
        return (
            <div>
                Add a goal                
                <form className="registerForm" onSubmit={this.addMainGoal}>
                    Goal name:
                    <input
                        onChange={this.handleNameChange}
                        name="name"
                        type="text"
                        value={this.state.name}
                        minLength={3}
                        placeholder="Goal name"
                    />
                     {/*
                    <br />
                    userId:
                    <input
                        onChange={this.handleUserIdChange}
                        name="userId"
                        type="text"
                        value={this.state.userId}
                        placeholder="Id właciciela celu"
                    />
                    <br />
                    priority:
                    <input
                        onChange={this.handlePriorityChange}
                        name="status"
                        type="text"
                        value={this.state.priority}
                        placeholder="Status"
                    />
                     */}
                     <br />
                     <br />
                    <button className = "addButton" type="submit">
                       + Add goal<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }

}

export default CelGlownyForm;