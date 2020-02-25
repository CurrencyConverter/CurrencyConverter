import React, {useEffect} from 'react';
import InputText from './Components/inputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from 'reactstrap';
import RatesAPI from "./services/ratesAPI";
import currencyAPI from "./services/currencyAPI";

function App() {
    let currenciesArray = [];
    let currencies = [];
    let amount = 0;
    let fromCurrency = null;
    let toCurrency = null;
    let converter = null;
    let newValue = null;

    const getCurrencies = async () => {
        currencies = await currencyAPI.getData();
        console.log('Currencies in this function', currencies);
    };

    function randomFunction() {
        for (const property in currencies) {
            currenciesArray.push(property);
        }
        console.log("JESSI", currenciesArray[2]);
        currenciesArray.map(currency => {
            return currency;
        })
    }

    const convertCurrency = async () => {
        if(fromCurrency && toCurrency){
            let res = await RatesAPI.getData(fromCurrency, toCurrency);
            console.log("THE converter is being obtained", res);
            let data = res.chart.result[0].indicators.quote[0].close;
            let result = res.chart.result[0].indicators.quote[0].close[data.length - 1];
            converter = result;
            console.log('its now: ', result);
            getNewValue();
            console.log("Converted Value: ", newValue)
        }
    };

    function setFromCurrency(currency) {
        console.log("SetFromCurrency", currency);
        fromCurrency = currency;
    }

    function setToCurrency(currency) {
        console.log("SetToCurrency", currency);
        toCurrency = currency;
    }

    function getAmount(myAmount) {
        console.log("We actually passed money to parent component");
        amount = myAmount;
        console.log(amount);
        convertCurrency();
    }

    function getNewValue() {
        newValue = amount * converter;
    }

    useEffect(() => {
        async function fetchData() {
            // You can await here
            await getCurrencies();
            console.log("App.js reloaded due to currencies?", currencies);
            randomFunction();
            console.log("CURRENCIES ARRAY CHECK",currenciesArray)
        }
        fetchData();
    }, [currenciesArray]); // Or [] if effect doesn't need props or state



    return (
        <div className="card">
            <Container>
                {
                    randomFunction()
                }
                <Row>
                    <Col>
                        <InputText placeholder="From"
                                   passCurrencyFunction={setFromCurrency}
                                   passAmount={getAmount}
                                   givenCurrencies={currenciesArray}
                        />
                    </Col>
                    <Col>
                        <InputText placeholder="To"
                                   passCurrencyFunction={setToCurrency}
                                   convertedValue={newValue}
                                   givenCurrencies={currenciesArray}
                        />
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default App;
