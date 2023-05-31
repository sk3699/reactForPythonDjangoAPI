import React,{Component} from "react";
import { ButtonToolbar, Table } from "react-bootstrap";

import {Button} from 'react-bootstrap';
import { AddEmpModel } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component { 

    constructor(props) {
        super(props);
        this.state={emps:[], addModelShow: false, editModalShow: false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API+'employee')
        .then(response => response.json())
        .then(data => {
            this.setState({emps:data})
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empId) {
        if(window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API+'employee/'+empId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const {emps, empId, empname, deptmt, photo, doj} = this.state;
        let addModelClose = () => this.setState({addModelShow: false});
        let editModelClose = () => this.setState({editModalShow: false});
        return(
            <div>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Photo</th>
                            <th>D.O.J</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateofJoining}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant='info' 
                                            onClick={() => this.setState({editModalShow: true, empId: emp.EmployeeId, empname: emp.EmployeeName,
                                                        deptmt: emp.Department, doj: emp.DateofJoining, photo: emp.PhotoFileName})}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant='danger' style={{marginLeft: 20}}
                                            onClick={() => this.deleteEmp(emp.EmployeeId)}>
                                            Delete
                                        </Button>
                                        <EditEmpModal show={this.state.editModalShow} onHide={editModelClose}
                                            empId={empId} empname={empname} deptmt={deptmt} doj={doj} photo={photo}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={() => this.setState({addModelShow: true})}>
                    Add Employee
                </Button>
                <AddEmpModel show={this.state.addModelShow} onHide={addModelClose}/>
            </div>
        )
    }
}