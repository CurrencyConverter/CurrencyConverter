import React, {useEffect, useState} from 'react';
import './style.css';
import {FormGroup, Input, Label} from 'reactstrap';

const currencyFlag = require('currency-codes-ru-en-names');

const InputComponent = (props) => {

    let [dropDown, setdDropDown] = useState("Dropdown");
    let [myval, setdmyval] = useState();
    let [myCurrencies] = useState(props.givenCurrencies)

    let changeDropDown = (newCurrency) => (
        console.log("Currency set to " + newCurrency),
            setdDropDown(newCurrency),
            dropDown = newCurrency,
            console.log("New currency is actually " + dropDown),
            props.passCurrencyFunction(dropDown)
    );

    let sendAmount = async(e) => (
        props.passAmount(e.target.value)

        //TODO Actually changes the value
        // await setdmyval(this.props.convertedValue),
        // console.log("******should have been set", props.convertedValue)
    );


    return (
        <div>
            <p>test {currencyFlag.names("USD", "en")}</p>
            {/*{console.log("HERE",myCurrencies.length)}*/}
            <FormGroup>
                <Label>{props.placeholder} </Label>
                <Input type="select" name="select" id="exampleSelect" onClick={(e) => changeDropDown(e.target.value)}>
                    {
                        props.givenCurrencies.map( (currency, key) => {
                            console.log(currency + key + " - ", typeof currencyFlag.names(currency, "en") == 'string'? currencyFlag.names("" + currency, "en") : "test")
                            // return <option key={key} value={currency}>{currency} - {currencyFlag.names("" + currency, "en")}</option>
                        })
                    }

                </Input>
            </FormGroup>
            <hr className="my-2"/>
            <div>
                <Input type="text" className="amountText" placeholder={"Value"} onChange={(e) => sendAmount(e)}
                       value={props.convertedValue}/>
            </div>
            <hr className="my-2"/>

        </div>
    );
};


export default InputComponent;