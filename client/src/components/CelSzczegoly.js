// To jest pojedynczy cel na liście celi
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

import '../css/Cele.css';

class CelSzczegoly extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                
                <Link to={{
                    pathname: "/protected/" + this.props.details._id,
                    state: {id: this.props.details._id}
                }}>
                <button className="button-cel-glowny" >
                {this.props.details.name}
                </button>
                </Link>
            </div>
        )
    }
}
export default CelSzczegoly;