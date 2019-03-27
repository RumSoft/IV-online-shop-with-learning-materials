import React, { Component } from "react";
//import axios from "axios";

export default class FormPage extends Component {
  constructor() {
    super();

    this.state = {
      reg_no: "",
      brand: "",
      model: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      reg_no: "",
      brand: "",
      model: ""
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    let brands = [
      "",
      "Twoja Mama",
      "DobryStudent98",
      "Trzezwy Umysl",
    ];

    return (
      <div>
        <table>
          <tr class="header-form">
            <td class="header-form">Formularz</td>
          </tr>
        </table>
        <form onSubmit={this.handleSubmit} id="form1">
          <div class="form-group">
            <label for="reg_no">Podaj nazwe uzytkowinka: </label>
            <input
              value={this.state.reg_no}
              onChange={this.handleChange}
              class="form-control"
              name="reg_no"
              placeholder="Pseudonim"
            />
          </div>
          <div class="form-group">
            <label for="brand">Przykladowe nazwy</label>
            <select
              class="form-control"
              name="brand"
              value={this.state.brand}
              onChange={this.handleChange}
            >
              {brands.map(brand => (
                <option value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <button type="button" className="button-form" id="clearForm" onClick={() => this.resetForm()}>
              Wyczysc formularz
            </button>
            <button type="submit" className="button-form" id="sendForm">
              Wyslij formularz
            </button>
          </div>
        </form>
      </div>
    );
  }
}
