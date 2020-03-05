import React, {useEffect, useState} from 'react';
import './style.css';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import RatesAPI from "../../services/ratesAPI";
import currencyAPI from "../../services/currencyAPI";

// const currencyFlag = require('currency-codes-ru-en-names');


const InputComponent = (props) => {
    let [myval, setmyval] = useState();
    let [fromCurrency, setfromCurrency] = useState("");
    let [toCurrency, settoCurrency] = useState("");
    let currenciesObject = [];
    let amount = 0;
    let [currencies, setCurrencies] = useState(["default"]);

    const getCurrencies = async () => {
        currenciesObject = await currencyAPI.getData();
        randomFunction();
        console.log('Currencies in this function', currencies);
    };

    function randomFunction() {
        let currenciesArray = [];
        console.log("trackcall");
        for (const property in currenciesObject) {
            currenciesArray.push(property);
        }

        currenciesArray.map(currency => {
            return currency;
        });
        console.log("Filled?", currenciesArray);
        setCurrencies(currenciesArray);
    }

    useEffect(() => {
            // Update the document title using the browser API
            getCurrencies();
        }, []
    );

    let convertCurrency = async () => {
        console.log("I HOPE THIS ISNT BEING CALLED AUTOMATICALLY");
        console.log("FromCurrency: ", fromCurrency);
        console.log("ToCurrency: ", toCurrency);
        if (fromCurrency && toCurrency) {
            let res = await RatesAPI.getData(fromCurrency, toCurrency);
            if (res.chart.result == null) {
                //TODO SOME CONVERSION EXIST WHY ? IDK
                console.log("THIS CONVERSION DOES NOT EXIST");
            } else {
                console.log("THE converter is being obtained", res);
                let data = res.chart.result[0].indicators.quote[0].close;
                let result = res.chart.result[0].indicators.quote[0].close[data.length - 1];
                myval = result * amount;
                setmyval(myval);
                console.log('Local myval is: ', myval);
            }
        }
    };


    let changeDropDownTo = (newCurrency) => (
        toCurrency = newCurrency,
            settoCurrency(newCurrency),
            console.log("Local toCurrency: ", toCurrency)
    );

    let changeDropDownFrom = (newCurrency) => (
        fromCurrency = newCurrency,
            setfromCurrency(newCurrency),
            console.log("Local fromCurrency: ", fromCurrency)
    );

    let sendAmount = async (e) => (
        amount = e.target.value,
            await convertCurrency()
    );

    console.log("Why am I getting fucked now?", currencies);
    return (
        <Row>
            <Col>
                {/*From*/}
                <div>
                    {/* <p>Test? {currencyFlag.names("USD", "en")}</p> */}
                    {/*{console.log("HERE",myCurrencies.length)}*/}
                    <FormGroup>
                        <Label className= "placeholderText" >{props.placeholderFrom} </Label>
                        <Input style= {{backgroundColor: "rgba(102, 64, 207, 0.9)", color: "white"}} type="select" name="select" id="exampleSelect"
                               onClick={(e) => changeDropDownFrom(e.target.value)}>
                            {
                                currencies.map((currency, key) => {
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
                        <Label className= "placeholderText">{props.placeholderTo} </Label>
                        <Input style= {{backgroundColor: "rgba(102, 64, 207, 0.9)", color: "white"}} type="select" name="select" id="exampleSelect"
                               onClick={(e) => changeDropDownTo(e.target.value)}>
                            {
                                currencies.map((currency, key) => {
                                    return <option key={key} value={currency}>{currency}</option>
                                })
                            }

                        </Input>
                    </FormGroup>
                    <hr className="my-2"/>
                    <div>
                        <Input disabled type="text" id="converted" className="amountText"
                               placeholder={"Converted Value"}
                               value={myval}/>
                    </div>
                    <hr className="my-2"/>
                </div>
            </Col>
        </Row>
    );
};


export default InputComponent;