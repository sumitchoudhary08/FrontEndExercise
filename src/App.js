import React, { PureComponent } from 'react';
import './App.css';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Products from './components/Products/Products';
import ProductData from './assets/files/ProductData.json';

class App extends PureComponent{

  state={
    //products: ProductData.products,
    dropdownOpen: false,
    dropDownValue: "INR",
    conversionValue: 1
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

    if(currentSelection !== oldSelection){
      fetch('https://api.exchangeratesapi.io/latest?base=INR')
      .then(response => response.json())
      .then(data => this.setState({dropDownValue : currentSelection, conversionValue: (oldSelection === "INR" ? data.rates.USD : 1)}));
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
