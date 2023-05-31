import React,{Component} from "react";
import { ButtonToolbar, Table } from "react-bootstrap";

import {Button, ButtonToolBAr} from 'react-bootstrap';
import { AddDepModel } from "./AddDepModel";
import { EditDepModel } from "./EditDepModal";

export class Department extends Component { 

    constructor(props) {
        super(props);
        this.state={deps:[], addModelShow: false, editModalShow: false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API+'department')
        .then(response => response.json())
        .then(data => {
            this.setState({deps:data})
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(depId) {
        if(window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API+'department/'+depId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const {deps, depId, depname} = this.state;
        let addModelClose = () => this.setState({addModelShow: false});
        let editModelClose = () => this.setState({editModalShow: false});
        return(
            <div>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant='info' 
                                            onClick={() => this.setState({editModalShow: true, depId: dep.DepartmentId, depname: dep.DepartmentName})}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant='danger' style={{marginLeft: 20}}
                                            onClick={() => this.deleteDep(dep.DepartmentId)}>
                                            Delete
                                        </Button>
                                        <EditDepModel show={this.state.editModalShow} onHide={editModelClose}
                                            depId={depId} depname={depname}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={() => this.setState({addModelShow: true})}>
                    Add Department
                </Button>
                <AddDepModel show={this.state.addModelShow} onHide={addModelClose}/>
            </div>
        )
    }
}