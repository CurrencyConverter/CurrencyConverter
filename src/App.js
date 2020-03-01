import React from 'react';
import InputText from './Components/inputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'reactstrap';

function App() {

    return (
        <div className="card">
            <Container>
                <InputText
                    placeholderFrom="From"
                   placeholderTo="To"
                />
            </Container>
        </div>

    );
}

export default App;
