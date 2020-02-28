import React, {useEffect, useState} from 'react';
import InputText from './Components/inputGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from 'reactstrap';
import RatesAPI from "./services/ratesAPI";
import currencyAPI from "./services/currencyAPI";

function App(props) {
    let currenciesArray = [];
    let currencies = [];
    let amount = 0;
    let fromCurrency = null;
    let toCurrency = null;
    let converter = null;
    let[newValue, setnewValue] = useState(null);

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

    let convertCurrency = async () => {
        if(fromCurrency && toCurrency){
            let res = await RatesAPI.getData(fromCurrency, toCurrency);
            if(res.chart.result == null)
            {
                //TODO SOME CONVERSION EXIST WHY ? IDK
                console.log("THIS CONVERSION DOES NOT EXIST");
            }
            else
            {
                console.log("THE converter is being obtained", res);
                let data = res.chart.result[0].indicators.quote[0].close;
                let result = res.chart.result[0].indicators.quote[0].close[data.length - 1];
                converter = result;
                console.log('its now: ', result);
                newValue = amount * converter;
                //TODO REVIew
                //Makes input group re render loosing the selection
                setnewValue(amount * converter)

                console.log("Converted Value: ", newValue)
                return newValue;
            }
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

    useEffect(() => {
        console.log("****NEWBALUE IS***", newValue);
    }, [newValue]);

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
                    {/*<Col>*/}
                    {/*    <InputText placeholder="To"*/}
                    {/*               passCurrencyFunction={setToCurrency}*/}
                    {/*               convertedValue={newValue}*/}
                    {/*               givenCurrencies={currenciesArray}*/}
                    {/*    />*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </div>

    );
}

export default App;
