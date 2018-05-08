// To jest komponent strony rejsetracji nowego użytkownika
import React from 'react';
import axios from 'axios';

class CelFormularz extends React.Component {

    constructor(props) {
        super(props);

        this.addGoal = this.addGoal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleParentChange = this.handleParentChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.state = {
            name: "",
            parent: "null",
            userId: "example",
            priority: "0"
        }
    }


    //Dodanie użytkownika
    addGoal(event) {
        event.preventDefault();
        

        axios.post('/goals/', {
            name: this.state.name,
            parent: this.state.parent,
            userId: this.state.userId,
            priority: this.state.priority
        })
            .then(response => {
                console.log(response, `Dodano cel ${this.state.name}`);
                this.setState({
                    name: "",
                    parent: "",
                });
            })
            .catch(err => {
                console.log(err, 'Błąd dodawania celu');
            });

        
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleParentChange(event) {
        this.setState({ parent: event.target.value });
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
                CelFormularz
                <form className="registerForm" onSubmit={this.addGoal}>
                    name:
                    <input
                        onChange={this.handleNameChange}
                        name="name"
                        type="text"
                        value={this.state.name}
                        placeholder="Nazwa celu"
                    />
                    <br />
                    parent:
                    <input
                        onChange={this.handleParentChange}
                        name="parent"
                        type="text"
                        minLength={3}
                        value={this.state.parent}
                        placeholder="Id rodzica"
                    />
                    <br />
                    userId:
                    <input
                        onChange={this. handleUserIdChange}
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
                        Dodaj Cel<i className="GuestBookButton2" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }

}

export default CelFormularz;