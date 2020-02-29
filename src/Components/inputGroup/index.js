import React, {useEffect, useState} from 'react';
import './style.css';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import RatesAPI from "../../services/ratesAPI";
import currencyAPI from "../../services/currencyAPI";

// const currencyFlag = require('currency-codes-ru-en-names');


const InputComponent = (props) => {
    let [myval, setdmyval] = useState();
    let fromCurrency = "";
    let toCurrency = "";
    let currenciesObject = [];
    let amount = 0;
    let [currencies, setCurrencies] = useState(["lol"]);

    const getCurrencies = async () => {
        currenciesObject = await currencyAPI.getData();
        randomFunction()
        console.log('Currencies in this function', currencies);
    };

    function randomFunction() {
        let currenciesArray = []
        console.log("trackcall");
        for (const property in currenciesObject) {
            currenciesArray.push(property);
        }

        currenciesArray.map(currency => {
            return currency;
        })
        console.log("Filled?", currenciesArray);
        setCurrencies(currenciesArray);
    }

    useEffect(() => {
        // Update the document title using the browser API
        getCurrencies();
    },[]
    );

    let convertCurrency = async () => {
        console.log("I HOPE THIS ISNT BEING CALLED AUTOMATICALLY")
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
                myval = result;
                console.log('Local myval is: ', myval);
            }
        }
    };


    let changeDropDownTo = (newCurrency) => (
        toCurrency = newCurrency,
        console.log("Local toCurrency: ", toCurrency)

        // console.log("CurrencyTO set to " + newCurrency),
        //     setdDropDown(newCurrency),
        //     dropDown = newCurrency,
        //     console.log("New currencyTO is actually " + dropDown),
        //     props.passCurrencyToFunction(dropDown)

    );

    let changeDropDownFrom = (newCurrency) => (
        fromCurrency = newCurrency,
        console.log("Local fromCurrency: ", fromCurrency)

        // console.log("CurrencyFROM set to " + newCurrency),
        //     setdDropDown(newCurrency),
        //     dropDown = newCurrency,
        //     console.log("New currencyFROM is actually " + dropDown),
        //     props.passCurrencyFromFunction(dropDown)

    );

    let sendAmount = async(e) => (

        amount = e.target.value,
        await convertCurrency()
        // props.passAmount(e.target.value),
        //
        // setTimeout(function()
        // { //Start the timer
        //     // setdmyval(props.convertedValue);
        //     console.log("*******THIS IS convertedValue: ", props.convertedValue);
        //     //After 2 seconds, set render to true
        // }, 2000)
        //TODO Actually changes the value
        // await setdmyval(this.props.convertedValue),
        // console.log("******should have been set", props.convertedValue)
    );

    console.log("Why am I getting fucked now?", currencies)
    return (
        <Row>
            <Col>
                {/*From*/}
                <div>
                    {/* <p>Test? {currencyFlag.names("USD", "en")}</p> */}
                    {/*{console.log("HERE",myCurrencies.length)}*/}
                    <FormGroup>
                        <Label>{props.placeholderFrom} </Label>
                        <Input type="select" name="select" id="exampleSelect" onClick={(e) => changeDropDownTo(e.target.value)}>
                            {
                                currencies.map( (currency, key) => {
                                    // console.log(currency);
                                    return <option key={key} value={currency}>{currency}</option>
                                })
                            }

                        </Input>
                    </FormGroup>
                    <hr className="my-2"/>
                    <div>
                        <Input type="text" className="amountText" placeholder={"Value"} onChange={(e) => sendAmount(e)}
                               // value={props.convertedValue}
                        />
                    </div>
                    <hr className="my-2"/>

                </div>
            </Col>

            {/*To*/}
            <Col>
                <div>
                    {/* <p>test {currencyFlag.names("USD", "en")}</p> */}
                    {/*{console.log("HERE",myCurrencies.length)}*/}
                    <FormGroup>
                        <Label>{props.placeholderTo} </Label>
                        <Input type="select" name="select" id="exampleSelect" onClick={(e) => changeDropDownFrom(e.target.value)}>
                            {
                                currencies.map( (currency, key) => {
                                    // console.log(currency + key + " - ", typeof currencyFlag.names(currency, "en") == 'string'? currencyFlag.names("" + currency, "en") : "test")
                                    return <option key={key} value={currency}>{currency}</option>
                                })
                            }

                        </Input>
                    </FormGroup>
                    <hr className="my-2"/>
                    <div>
                        <Input disabled type="text" className="amountText" placeholder={"Converted Value"}
                               value={myval}/>
                    </div>
                    <hr className="my-2"/>
                </div>
            </Col>
        </Row>
    );
};


export default InputComponent;