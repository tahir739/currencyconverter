import React, { useState } from 'react';

class Converter extends React.Component {

  key = "d546ebfb2ca5ab2bb7a0cfeff54c35cf";
  endpoint = "http://data.fixer.io/api/latest?" + this.key;
  rates;
  symbols;

  constructor(props) {
    super(props);

    this.state = {
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
      convertedAount: 0,
      currencyKeys: []



    }
  }

  ReceiveData(data) {
    console.log(data);
  }

  ReceiveError(err) {
    console.log(err);
  }

  ReceiveStream(res) {
    var jsonResult = res.json(); 
    return jsonResult;
  }

  componentDidMount() {
    this.setupCurrencyRates();
    this.example();
  }

  setupCurrencyRates = () => {

    var p1 = fetch("http://data.fixer.io/api/latest?access_key=d546ebfb2ca5ab2bb7a0cfeff54c35cf");
    var p2 = p1.then(this.ReceiveStream); //promise<json>

    p2.then(
      data => {
        console.log(data);
        console.log(data.rates[this.state.fromCurrency]);
        this.rates = data.rates;
      },
      err => {
        console.log(err);
      }
    );
  }

  example = () => {
    console.log(this.props);
    var p1 = fetch("http://data.fixer.io/api/symbols?access_key=d546ebfb2ca5ab2bb7a0cfeff54c35cf");

    var p2 = p1.then(this.ReceiveStream); 

    p2.then(
      data => {
        console.log(data);
        console.log(data.symbols[this.state.fromCurrency]);
        this.symbols = data.symbols;
        this.setCurrencyKeys(data.symbols);

        this.setDropdownFromCurrency(this.state.currencyKeys[0]);
        this.setDropdownToCurrency(this.state.currencyKeys[0]);
      },
      err => {
        console.log(err);
      }
    );

  }

  setDropdownFromCurrency = (val) => {
    this.setState({ fromCurrency: val });
  }

  setDropdownToCurrency = (val) => {
    this.setState({ toCurrency: val });
  }

  setCurrencyKeys = (data) => {
    var res = Object.keys(data).map(d => {
      return {
        key: d,
        value: data[d]
      };
    });
    this.setState({ currencyKeys: res }); 
    setTimeout(() => {
      console.log(this.state.currencyKeys);
      console.log(Object.keys(this.state.currencyKeys));
    }, 300);
  }

  selectHandler = (event) => {
    if (event.target.id === "c1") {
       this.setDropdownFromCurrency(event.target.value);
    }
    else {
      if (event.target.id === "c2") {
        this.setDropdownToCurrency(event.target.value);
      }
      else {
        if (event.target.id === "c3") {
          this.setState({ amount: (parseInt(event.target.value)) });
        }
      }
    }
    console.log(this.state)
  }

  convertCurrency = (evt) => {
    var eu = this.state.amount / this.rates[this.state.fromCurrency];

    this.setState({ convertedAount: this.rates[this.state.toCurrency] * eu });
  }



  render() {
    return (
      <div className="container">
        <h1>Convert Currency</h1>
        
        <div>
          
          <label htmlFor="c1" > currency to convert from: </label>
          <select id="c1" className="form-control" value={this.state.fromCurrency} onChange={event => this.selectHandler(event)}>
            {this.state.currencyKeys.map(d => <option value={d.key}>{d.value}</option>)}
          </select>
          
       </div>

        <div>
          <label htmlFor="c2" > currency to convert to: </label>
          <select id="c2" className="form-control" value={this.state.toCurrency} onChange={event => this.selectHandler(event)}>
            {this.state.currencyKeys.map(obj => <option value={obj.key}>{obj.value}</option>)}
          </select>
          
        </div>

        <div>
          <label htmlFor="c3"> currency amount: </label>
          <input id="c3" className="form-control" value={this.state.amount} onChange={event => this.selectHandler(event)} />
        </div>

        <div>
          <button className="btn btn-success" onClick={this.convertCurrency}> convert now</button>
        </div>
        <div>
          {this.state.convertedAount !== 0 ? ("converted amount is " + this.state.convertedAount) : ""}
        </div>
      </div>


    )
  }
}
export default Converter