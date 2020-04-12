import React from "react";
import moment from "moment";
class Employee extends React.Component {
  state = {
    employees: []
  };
  componentWillReceiveProps(nextProps) {
    const employees = nextProps.employees;
    const startDate = new Date(nextProps.startDate);
    const endDate = new Date(nextProps.endDate);
    const searchedName = nextProps.name;
    // will be called after the api retrieves the employees
    if (employees.length > 0) {
      const oldStartDate = new Date(this.props.startDate);
      const oldEndDate = new Date(this.props.startDate);
      if (oldStartDate.getTime() !== startDate.getTime() || oldEndDate.getTime() !== endDate.getTime()) {
        this.setState({
          employees: employees.filter(function(employee) {
            const employeeDOB = new Date(employee.dob.date);
            // checking if employeeDOB is in between startDate and endDate
            if (employeeDOB.getTime() > startDate.getTime() && employeeDOB.getTime() < endDate.getTime()) {
              return true;
            }
            return false;
          }),
        });
      }
    }

    console.log(nextProps.name);
    const oldSearchedName = this.props.name;
    if (oldSearchedName !== searchedName) {
      this.setState({
        employees: employees.filter(function(employee) {
          const fullName = employee.name.first + ' ' + employee.name.last;
          if (fullName.indexOf(searchedName) !== -1) {
            return true;
          }
          return false;
        }),
      })
    }
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map(employee => (
            <tr key={employee.id.value}>
              <td>
                <img alt="employee pic" src={employee.picture.thumbnail}></img>
              </td>
              <td>
                {employee.name.first} {employee.name.last}
              </td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>
                {moment(employee.dob.date.slice(0, 10)).format("MM-DD-YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default Employee;
