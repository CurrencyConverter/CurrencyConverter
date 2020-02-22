import React from 'react';
import InputText from './Components/inputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Col
 } from 'reactstrap';
import API from "./services/API";
let amount = 0;
let fromCurrency = null;
let toCurrency = null;
let converter = null;
let newValue = null;

const convertCurrency = async () =>
{
  let res = await API.getData(fromCurrency, toCurrency);
  console.log("THE converter is being obtained", res);
  let data = res.chart.result[0].indicators.quote[0].close;
  let result = res.chart.result[0].indicators.quote[0].close[data.length - 1];
  converter = result;
  console.log('its now: ', data);
};

function setFromCurrency(currency){
  console.log("SetFromCurrency", currency);
  fromCurrency = currency;
}

function setToCurrency(currency){
  console.log("SetToCurrency", currency);
  toCurrency = currency;
}

function getAmount(myAmount)
{
  console.log("We actually passed money to parent component");
 amount = myAmount;
 console.log(amount);
  getNewValue();
}

function getNewValue()
{
  newValue = amount * converter;
}
function App() {
  return (
    <div className="card">
      <Container>
        <Row>
          <Col>
            <InputText placeholder="From"
            passCurrencyFunction={setFromCurrency}
            passAmount={getAmount}
            />
          </Col>
          <Col>
            <InputText placeholder="To"
            passCurrencyFunction={setToCurrency}
            convertedValue={newValue}
            getAmount={newValue}
            />
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default App;
