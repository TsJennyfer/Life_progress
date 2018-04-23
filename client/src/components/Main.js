// To jest Main - środkowa część strony wyświetlająca część główną
import React from 'react';
import Cel from './Cel';
import Rejestracja from './Rejestracja';
import Cele from './Cele';
import CeleGlowne from './CeleGlowne';

class Main extends React.Component {
    render() {
        return (
            <div>
                Main
                <Rejestracja />
                <Cel />
                <Cele />
                <CeleGlowne />

            </div>
        )
    }
}

export default Main;