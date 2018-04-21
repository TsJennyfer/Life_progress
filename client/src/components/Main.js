// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';
import Cele from './Cele';

class Main extends React.Component {
    render() {
        return (
            <div>
                Main
                <Rejestracja />
                <Cel />
                <Cele />

            </div>
        )
    }
}

export default Main;