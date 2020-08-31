import React from 'react';
import { API_URL_LATEST, API_URL_SYMBOLS } from "../common/Constants";
import {GET} from '../common/Api';
import './Converter.css';

class Converter extends React.Component {
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

  componentDidMount() {
    this.setupCurrencyRates();
    this.example();
  }

  setupCurrencyRates = () => {
    GET(API_URL_LATEST).then(
      data => this.rates = data.rates,
      err => console.log(err)
    );
  }

  example = () => {
    GET(API_URL_SYMBOLS).then(
      data => {
        this.symbols = data.symbols;
        this.setCurrencyKeys(data.symbols);

        this.setDropdownFromCurrency(this.state.currencyKeys[0]);
        this.setDropdownToCurrency(this.state.currencyKeys[0]);
      },
      err => console.log(err)      
    );

  }

  setDropdownFromCurrency = (val) => {
    this.setState({ fromCurrency: val.key ? val.key: val });
  }

  setDropdownToCurrency = (val) => {
    
    this.setState({ toCurrency: val.key ? val.key: val });
  }

  setCurrencyKeys = (data) => {
    var res = Object.keys(data).map(d => {
      return {
        key: d,
        value: data[d]
      };
    });
    this.setState({ currencyKeys: res });  
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
  }

  convertCurrency = (evt) => {
    var eu = this.state.amount / this.rates[this.state.fromCurrency];
    this.setState({ convertedAount: (this.rates[this.state.toCurrency] * eu).toFixed(2) });
  }



  render() {
    return (
      <div className="currency-converter">
      <div className="container">
        <h1>Convert Currency</h1>

        <div className="form-group">

          <label htmlFor="c1" > currency to convert from: </label>
          <select id="c1" className="form-control" value={this.state.fromCurrency} onChange={event => this.selectHandler(event)}>
            {this.state.currencyKeys.map(d => <option value={d.key}>{d.value}</option>)}
          </select>

        </div>

        <div className="form-group">
          <label htmlFor="c2" > currency to convert to: </label>
          <select id="c2" className="form-control" value={this.state.toCurrency} onChange={event => this.selectHandler(event)}>
            {this.state.currencyKeys.map(obj => <option value={obj.key}>{obj.value}</option>)}
          </select>

        </div>

        <div className="form-group">
          <label htmlFor="c3"> currency amount: </label>
          <input id="c3" className="form-control" value={this.state.amount} onChange={event => this.selectHandler(event)} />
        </div>

        <div className="form-group">
          <button className="btn btn-success converter-btn" onClick={this.convertCurrency}> convert now</button>
        </div>
        <hr />
        <div className="form-group">
        <h4>{this.state.convertedAount !== 0 ? ("converted amount is: ") : ""} <span className="symbol">{this.state.convertedAount !== 0 && (this.state.convertedAount + " /- " + this.state.toCurrency)}</span></h4>
        </div>
      </div>
      </div>

    )
  }
}
export default Converter