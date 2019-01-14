// To jest pojedynczy cel na liście celi
import React from 'react';
import {
    Link
} from 'react-router-dom';

class CelSzczegoly extends React.Component {

    render() {
        return (
            <Link to={{
                pathname: "/protected/" + this.props.details._id,
                state: { id: this.props.details._id }
            }}>
                <button className="button-cel-glowny" >
                    {this.props.details.name}
                </button>
            </Link>
        )
    }
}
export default CelSzczegoly;