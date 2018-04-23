// To jest pojedynczy cel na liście celi
import React from 'react';
import axios from 'axios';

class CelSzczegoly extends React.Component {



    render() {

        return (
            <div>
                {this.props.details.name}
                
            </div>
        )
    }
}
export default CelSzczegoly;