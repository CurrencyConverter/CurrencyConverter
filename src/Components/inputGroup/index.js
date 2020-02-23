import React, {useEffect, useState} from 'react';
import './style.css';
import {
    InputGroup,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Label
} from 'reactstrap';

const InputComponent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState();
    let [convertedValue, setconvertedValue] = useState();
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

    let sendAmount = (e) =>(
        props.passAmount(e.target.value)
    );


    useEffect(() =>
    {
        console.log(props);
        convertedValue = props.convertedValue;
        // transferData()
        },
        [props.convertedValue]
    );


    return (
        <div>
           <FormGroup >
            <Label >{props.placeholder} </Label>
            <Input type="select" name="select" id="exampleSelect"  onClick={(e) => changeDropDown(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="YEN">YEN</option>
              <option value="BTC">BTC</option>
              <option value="5">5</option>
            </Input>
          </FormGroup>
            {/* <InputGroup>
                <Input placeholder={props.placeholder +": "+ dropDown}/>
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle color="success" caret>
                        {dropDown}
                    </DropdownToggle>
                    <DropdownMenu onClick={(e) => changeDropDown(e.target.textContent)}>
                        <DropdownItem>USD</DropdownItem>
                        <DropdownItem>EUR</DropdownItem>
                        <DropdownItem>YEN</DropdownItem>
                        <DropdownItem>BTC</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
            </InputGroup> */}
            <hr className="my-2"/>
            <div>
                <Input type="text" className="amountText" placeholder="Amount" onChange={(e) => sendAmount(e)} value={convertedValue}/>
            </div>
            <hr className="my-2"/>

        </div>
    );
}


export default InputComponent;