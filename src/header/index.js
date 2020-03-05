import React from 'react';
import './style.css';
const header = (props) => {

    return (
        <div className="header">
            {/* <img className="img" src="https://images-na.ssl-images-amazon.com/images/I/510WmeXkLXL._SY355_.png"/> */}
            <img className="img" src="./img/logo.png"/>
            <h2 className="title"> Currency Converter</h2>
            <hr className="headerLine my-2"/>
        </div>
    );
};


export default header;