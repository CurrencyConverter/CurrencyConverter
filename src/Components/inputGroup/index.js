import React, {useEffect, useState} from 'react';
import './style.css';
import {FormGroup, Input, Label} from 'reactstrap';


const InputComponent = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState();
    let [convertedValue, setconvertedValue] = useState();
    let [currencies, setCurrencies] = useState(["USD","EUR","YEN","BTC"]);
    let [data] = useState({empty_kids: 'empty'});
    let [dropDown, setdDropDown] = useState("Dropdown");

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    let changeDropDown = (newCurrency) => (
        console.log("Currency set to " + newCurrency),
            //!TODO Setting functions don't actually work!!!
            setdDropDown(newCurrency),
            dropDown = newCurrency,
            console.log("New currency is actually " + dropDown),
            props.passCurrencyFunction(dropDown)
    );

    let sendAmount = (e) => (
        props.passAmount(e.target.value)
    );


    useEffect( () => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!Do we have our currencies?", props.givenCurrencies);
            console.log(props);
            setconvertedValue(props.convertedValue);
            setCurrencies(props.givenCurrencies);
            // transferData()
        },
        []
    );


    return (
        <div>
            <FormGroup>
                <Label>{props.placeholder} </Label>
                <Input type="select" name="select" id="exampleSelect" onClick={(e) => changeDropDown(e.target.value)}>
                    {
                        currencies.map( (currency, key) => {
                            return <option key={key} value={currency}>{currency}</option>
                        })
                    }
                </Input>
            </FormGroup>

            <hr className="my-2"/>
            <div>
                <Input type="text" className="amountText" placeholder="Amount" onChange={(e) => sendAmount(e)}
                       value={convertedValue}/>
            </div>
            <hr className="my-2"/>

        </div>
    );
};


export default InputComponent;