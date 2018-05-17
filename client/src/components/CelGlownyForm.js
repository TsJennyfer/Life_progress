// To jest komponent dodawania nowego celu głównego
import React from 'react';
import axios from 'axios';

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
            'Authorization': localStorage.getItem('token'), 
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
                CelGlownyForm - tylko dodawanie celu głównego
                <form className="registerForm" onSubmit={this.addMainGoal}>
                    name:
                    <input
                        onChange={this.handleNameChange}
                        name="name"
                        type="text"
                        value={this.state.name}
                        placeholder="Nazwa celu"
                    />
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
                    <br />

                    <button type="submit">
                        Dodaj Cel Główny<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }

}

export default CelGlownyForm;