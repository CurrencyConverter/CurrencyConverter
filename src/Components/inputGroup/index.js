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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);


  return (
    <div>
      <InputGroup>
        <Input placeholder={props.placeholder}/>
        <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>USD</DropdownItem>
            <DropdownItem>EURO</DropdownItem>
            <DropdownItem>YEN</DropdownItem>
            <DropdownItem>BTC</DropdownItem>
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