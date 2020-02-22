import React, {useEffect, useState} from 'react';
import './style.css';
import {
    InputGroup,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import API from "../../services/API";

const InputComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState();
    let [data] = useState({empty_kids: 'empty'});
    let [dropDown, setdDropDown] = useState("Dropdown");

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    let changeDropDown = (newCurrency) => (
        console.log("Currency set to " + newCurrency),
        //!TODO Setting functions don't actually work!!!
        // setdDropDown(newCurrency),
        dropDown = newCurrency,
        console.log("New currency is actually " + dropDown),
        props.passCurrencyFunction(dropDown)
    );

    let sendAmount = (e) =>(
        props.passAmount(e.target.value)
    );


    // const transferData = async (currency1, currency2) =>
    // {
    //     let res = await API.getData(currency1, currency2);
    //     console.log("THE DATA Came through", res);
    //     data = res;
    //     console.log('its now: ', data);
    // };

    useEffect(() =>
    {

        // transferData()
        },
        []
    );


    return (
        <div>
            <InputGroup>
                <Input placeholder={props.placeholder}/>
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle color="success" caret>
                        {dropDown}
                    </DropdownToggle>
                    <DropdownMenu onClick={(e) => changeDropDown(e.target.textContent)}>
                        <DropdownItem>USD</DropdownItem>
                        <DropdownItem>EURO</DropdownItem>
                        <DropdownItem>YEN</DropdownItem>
                        <DropdownItem>BTC</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
            </InputGroup>
            <hr className="my-2"/>
            <div>
                <Input type="text" className="amountText" onChange={(e) => sendAmount(e)}/>
            </div>

        </div>
    );
}


export default InputComponent;