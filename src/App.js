import React, { PureComponent } from 'react';
import './App.css';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Products from './components/Products/Products';
import ProductData from './assets/files/ProductData.json';
import Cookies from 'js-cookie';

class App extends PureComponent{

  state={
    //products: ProductData.products,
    dropdownOpen: false,
    //dropDownValue: localStorage.getItem("ddlValue") === null ? "INR" : localStorage.getItem("ddlValue"),
    //conversionValue: localStorage.getItem("ddlValue") === null || localStorage.getItem("ddlValue") === "INR" ? 1 : localStorage.getItem("cValue")
    dropDownValue: document.cookie.indexOf('ddlValue') ===  -1 ? "INR" : Cookies.get('ddlValue'),
    conversionValue: document.cookie.indexOf('ddlValue') === -1 || Cookies.get('ddlValue') === "INR" ? 1 : Cookies.get("cValue")
  }

  toggleHandler = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValueHandler = (event) =>{
    var currentSelection = event.target.textContent;
    var oldSelection = this.state.dropDownValue
    //console.log(ProductData);
    //localStorage.setItem("ddlValue", currentSelection);
    Cookies.set("ddlValue", currentSelection);

    if(currentSelection !== oldSelection){
      fetch('https://api.exchangeratesapi.io/latest?base=INR')
      .then(response => response.json())
      .then(data => {
        //localStorage.setItem('cValue', (oldSelection === "INR" ? data.rates.USD : 1));
        Cookies.set('cValue', (oldSelection === "INR" ? data.rates.USD : 1));
        this.setState({dropDownValue : currentSelection, conversionValue: (oldSelection === "INR" ? data.rates.USD : 1)})
      })
      .catch(error => console.log(error))
    }
  }

  render(){
    return(
      <div className ="container">
        <div className = "row text-center contentCenter">
          <div className="col-12 col-xs-12">
                <h3 className="pt-3" >PRODUCT LIST</h3>
          </div>
          <div className="col-12 col-xs-12 text-right">
            <label>Currency</label>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleHandler}>
              <DropdownToggle caret>
                {this.state.dropDownValue}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.changeValueHandler}>INR</DropdownItem>
                <DropdownItem onClick={this.changeValueHandler}>USD</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
         
          <Products products={ProductData.products} 
                    dropdownValue={this.state.dropDownValue}
                    conversionValue={this.state.conversionValue} />
         
        </div>
      </div> 
    )
  }
}

export default App;
