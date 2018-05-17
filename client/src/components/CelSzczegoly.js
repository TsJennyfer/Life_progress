// To jest pojedynczy cel na liście celi
import React from 'react';

class CelSzczegoly extends React.Component {



    render() {

        return (
            <div>
                <button class="button-cel-glowny" onClick={() => this.props.chooseGoal(this.props.details._id)}>
                {this.props.details.name}
                </button>
                
                
            </div>
        )
    }
}
export default CelSzczegoly;