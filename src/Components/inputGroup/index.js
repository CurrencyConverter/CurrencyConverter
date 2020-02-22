import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState({empty_kids: 'empty'});
  let [dropDown, setdDropDown] = useState("Dropdown");

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  let changeDropDown = (newCurrency) => (
      setdDropDown(newCurrency)
  );

  useEffect(() => {
    async function fetchData(input1,input2) {
      //TODO fix why this aint updating
      let res = await API.getData(input1,input2);
      console.log("THE DATA Came through", res);
      console.log('its now: ', data);
      setData(res);
    }

    fetchData('USD','CUP');
  }, []);

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
      <hr className="my-2" />
      <div>
        <Input type="text" className="amountText"/>
      </div>

    </div>
  );
}


export default InputComponent;