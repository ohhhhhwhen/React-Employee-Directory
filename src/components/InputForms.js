import React from "react";
import API from "../utils/API";
import "../styles/styles.css";
import Employee from "./Employee";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class InputForms extends React.Component {
  state = {
    employees: [],
    startDate: new Date('01/02/1950'),
    endDate: new Date('04/12/2020'),
    name: ""
  };

  handleStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  handleNameSearch = nameSearch => {
    this.setState({
      name: nameSearch.target.value
    });
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    API.getEmployees()
      .then(res => {
        this.setState({
          employees: res.data.results
        });
        console.log(this.state.employees);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="form-row">
          <div className="col">
            <form className="form">
              <div className="input-group-prepend">
                <div className="input-group-text">DOB</div>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleStartDate}
                  className="yearInput"
                  name="firstYear"
                  type="text"
                />
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleEndDate}
                  className="yearInput"
                  name="secondYear"
                  type="text"
                />
                <input
                  selected={this.state.name}
                  onChange={this.handleNameSearch}
                  name="name"
                  type="text"
                  placeholder="Name Search"
                />
              </div>
            </form>
          </div>
        </div>
        <Employee employees={this.state.employees} 
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        name={this.state.name}
        />
        
      </div>
    );
  }
}

export default InputForms;