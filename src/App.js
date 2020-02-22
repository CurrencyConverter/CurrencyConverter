import React from 'react';
import InputText from './Components/inputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Col
 } from 'reactstrap';
function App() {
  return (
    <div className="card">
      <Container>
        <Row>
          <Col>
            <InputText placeholder="From"/>
          </Col>
          <Col>
            {/*<InputText placeholder="To"/>*/}
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default App;
