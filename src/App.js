import React, { Fragment } from 'react';
import InputText from './Components/inputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'reactstrap';
import Header from './header/index'

function App() {

    return (
        <Fragment>
            <div className="headerCard">
                <Header/>
            </div>
            <div className="card">
                <Container>
                    <InputText
                        placeholderFrom="From"
                        placeholderTo="To"
                    />
                </Container>
            </div>
            <img className="illustration" src = "../img/undraw2.png"/>
        </Fragment>
    );
}

export default App;
