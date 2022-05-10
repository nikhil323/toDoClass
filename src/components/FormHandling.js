import React, { Component } from "react";
import "./FormHandling.css";
import { v4 as uuidv4 } from "uuid";

class FormHandling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      qty: "",
      price: "",
      netAmt: "",
      id: "",
      edit: false,
      details: [],
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
      id: uuidv4(),
    });
  };

  handleQuantityChange = (e) => {
    this.setState({
      qty: e.target.value,
      netAmt: this.state.price * e.target.value,
    });
  };

  handlePriceChange = (e) => {
    this.setState({
      price: e.target.value,
      netAmt: e.target.value * this.state.qty,
    });
  };

  handleData = () => {
    const updatedItem = this.state;
    if (this.state.edit) {
      const newArr = this.state.details.filter(
        (obj) => obj.id !== updatedItem.id
      );
      this.setState({
        details: [updatedItem, ...newArr],
      });
    } else {
      this.setState({
        details: [...this.state.details, this.state],
      });
    }

    this.setState({
      name: "",
      qty: "",
      price: "",
      netAmt: "",
      id: "",
      edit: false,
    });
  };

  handleEdit = (id) => {
    const obj = this.state.details.find((item) => item.id === id);
    this.setState({
      detail: this.state.details.find((detail) => detail.id === id),
      edit: true,
      name: obj.name,
      qty: obj.qty,
      price: obj.price,
      netAmt: obj.netAmt,
      id: obj.id,
    });
  };
  handleDelete(item) {
    this.setState({
      details: this.state.details.filter((obj) => obj.id !== item.id),
    });
  }

  render() {
    return (
      <>
        <div>
          <label>item name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <label>Quantity</label>
          <input
            type="number"
            value={this.state.qty}
            onChange={this.handleQuantityChange}
          />
          <label>Price</label>
          <input
            type="number"
            value={this.state.price}
            onChange={this.handlePriceChange}
          />
          <label>Net amount</label>
          <input type="number" value={this.state.netAmt} readOnly />
          <button onClick={this.handleData}>
            {this.state.edit ? "Update" : "Add"}
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td>Items</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Net Amt</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.state.details.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>{item.netAmt}</td>
                  <td>
                    <button onClick={this.handleEdit.bind(this, item.id)}>
                      Edit
                    </button>
                    <button onClick={this.handleDelete.bind(this, item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default FormHandling;
