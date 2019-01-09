// To powiadomienie o najbliższym podzadaniu
import React from 'react';
import {
    Link
} from 'react-router-dom';
import '../css/Cele.css';


class Powiadomienie extends React.Component {
    constructor(props) {
        super(props);
        this.convertTimestampToDate = this.convertTimestampToDate.bind(this);

    }
    convertTimestampToDate(timestamp) {
        var t = new Date(timestamp);

        var date = t.getDate() + "/" + t.getMonth() + 1 + "/" + t.getFullYear();

        return date;
    }

    render() {
        return (
            <Link to={{
                pathname: "/protected/" + this.props.details.parent,
                state: { id: this.props.details.parent }
            }}>
                <div className={(this.props.after === true) ? "powiadomienie-circle-after" : "powiadomienie-circle"} style={{ clear: "both" }}> </div>
                <div className={(this.props.after === true) ? "powiadomienie-circle-after" : "powiadomienie-circle"}> </div>
                <div className={(this.props.after === true) ? "powiadomienie-circle-after" : "powiadomienie-circle"}> </div>
                <div className={(this.props.after === true) ? "powiadomienie-after shadows" : "powiadomienie shadows"} >
                    <div>
                        {this.convertTimestampToDate(this.props.details.plannedAt)}
                    </div>
                    <div>
                        {this.props.details.name}
                    </div>
                </div>
            </Link>
        )
    }
}
export default Powiadomienie;