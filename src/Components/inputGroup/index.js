import React, { useState } from 'react';
import './style.css';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

const InputComponent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState();
  let [dropDown, setdDropDown] = useState("Dropdown");

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  let changeDropDown = (newCurrency) => (
      setdDropDown(newCurrency)
  );

  return (
    <div>
      <InputGroup>
        <Input placeholder={props.placeholder}/>
        <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
          <DropdownToggle caret>
            {dropDown}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={(e) => changeDropDown(e.target.textContent)} >USD</DropdownItem>
            <DropdownItem onClick={(e) => changeDropDown(e.target.textContent)} >EURO</DropdownItem>
            <DropdownItem onClick={(e) => changeDropDown(e.target.textContent)}>YEN</DropdownItem>
            <DropdownItem onClick={(e) => changeDropDown(e.target.textContent)}>BTC</DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>
      <div>
        <Input className="amountText"/>
      </div>

    </div>
  );
}


export default InputComponent;