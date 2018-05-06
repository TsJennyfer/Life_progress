// To jest pojedynczy cel na liście celi
import React from 'react';
import axios from 'axios';

class CelSzczegoly extends React.Component {



    render() {

        return (
            <div>
                <button class="buttonR round" onClick={() => this.props.chooseGoal(this.props.details._id)}>
                {this.props.details.name}
                </button>
                
                
            </div>
        )
    }
}
export default CelSzczegoly;