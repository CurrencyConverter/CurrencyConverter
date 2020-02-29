import React, {useState} from 'react';
import './style.css';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

const currencyFlag = require('currency-codes-ru-en-names');

const InputComponent = (props) => {

    let [dropDown, setdDropDown] = useState("Dropdown");
    let [myval, setdmyval] = useState();
    let [myCurrencies] = useState(props.givenCurrencies)

    let changeDropDownTo = (newCurrency) => (
        console.log("CurrencyTO set to " + newCurrency),
            setdDropDown(newCurrency),
            dropDown = newCurrency,
            console.log("New currencyTO is actually " + dropDown),
            props.passCurrencyToFunction(dropDown)

    );

    let changeDropDownFrom = (newCurrency) => (
        console.log("CurrencyFROM set to " + newCurrency),
            setdDropDown(newCurrency),
            dropDown = newCurrency,
            console.log("New currencyFROM is actually " + dropDown),
            props.passCurrencyFromFunction(dropDown)

    );

    let sendAmount = async(e) => (
        props.passAmount(e.target.value),

        setTimeout(function()
        { //Start the timer
            // setdmyval(props.convertedValue);
            console.log("*******THIS IS convertedValue: ", props.convertedValue);
            //After 2 seconds, set render to true
        }, 2000)
        //TODO Actually changes the value
        // await setdmyval(this.props.convertedValue),
        // console.log("******should have been set", props.convertedValue)
    );


    return (
        <Row>
            <Col>
                {/*From*/}
                <div>
                    <p>Test? {currencyFlag.names("USD", "en")}</p>
                    {/*{console.log("HERE",myCurrencies.length)}*/}
                    <FormGroup>
                        <Label>{props.placeholderFrom} </Label>
                        <Input type="select" name="select" id="exampleSelect" onClick={(e) => changeDropDownTo(e.target.value)}>
                            {
                                props.givenCurrencies.map( (currency, key) => {
                                    // console.log(currency + key + " - ", typeof currencyFlag.names(currency, "en") == 'string'? currencyFlag.names("" + currency, "en") : "test")
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
                    <p>test {currencyFlag.names("USD", "en")}</p>
                    {/*{console.log("HERE",myCurrencies.length)}*/}
                    <FormGroup>
                        <Label>{props.placeholderTo} </Label>
                        <Input type="select" name="select" id="exampleSelect" onClick={(e) => changeDropDownFrom(e.target.value)}>
                            {
                                props.givenCurrencies.map( (currency, key) => {
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