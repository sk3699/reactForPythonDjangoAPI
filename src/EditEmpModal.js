import React, {Component} from "react";
import { Modal, Button, Row, Col, Form, Image, ModalHeader, ModalTitle, ModalBody, FormLabel, FormControl, FormGroup, ModalFooter } from "react-bootstrap";

export class EditEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {deps:[]}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photo = 'anonymous.png'
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photo;

    componentDidMount() {
        fetch(process.env.REACT_APP_API+'department')
        .then(response => response.json())
        .then(data => {
            this.setState({deps : data});
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId: event.target.EmployeeId.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                DateofJoining: event.target.DateofJoining.value,
                PhotoFileName: this.photo
            })
        })
        .then(res => res.json)
        .then((result) => {
            alert('SuccessFul!!!');
        },
        (error) => {
            alert('Failed!!!');
        })
    }

    handleFileSelected(event) {
        event.preventDefault();
        this.photo = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            'myFile',
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'employee/saveFiles', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then((result) => {
            this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
        },
        (error) => {
            alert('Failed!!!');
            console.error(error);
            console.error(this.imagesrc);
        })
    }

    render() {
        return(
            <div className="container">
                <Modal
                    {...this.props} size='lg' 
                    aria-labelledby='contained-modal-title-vcenter' centered>
                        <ModalHeader>
                            <ModalTitle id='contained-modal-title-vcenter'>
                                Edit Employee
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                    <FormGroup controlId="EmployeeId">
                                            <FormLabel>Employee ID:</FormLabel>
                                            <FormControl type='text' name='EmployeeId' required
                                                placeholder='Employee Id' disabled defaultValue={this.props.empId}/>
                                        </FormGroup>
                                        <FormGroup controlId="EmployeeName">
                                            <FormLabel>Employee Name:</FormLabel>
                                            <FormControl type='text' name='EmployeeName' required
                                                placeholder='Employee Name' defaultValue={this.props.empname}/>
                                        </FormGroup>
                                        <FormGroup controlId="Department">
                                            <FormLabel>Department:</FormLabel>
                                            <FormControl as='select' defaultValue={this.props.deptmt}>
                                                {this.state.deps.map(dep =>
                                                    <option key={dep.DepartmentId}>
                                                        {dep.DepartmentName}
                                                    </option>
                                                 )}
                                            </FormControl>
                                        </FormGroup>
                                        <FormGroup controlId="DateofJoining">
                                            <FormLabel>D O J:</FormLabel>
                                            <FormControl
                                                type='date'
                                                name='DateofJoining'
                                                required placeholder="Date of Joining"
                                                defaultValue={this.props.doj}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button variant="primary" type="submit" style={{marginTop: 10}}>
                                                Update Employee
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                </Col>

                                <Col sm={6}>
                                    <Image width='200px' height='200px' 
                                    src={process.env.REACT_APP_PHOTOPATH + this.props.photo} />
                                    <input onChange={this.handleFileSelected} type='File' />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="danger" onClick={this.props.onHide}>
                                Close
                            </Button>
                        </ModalFooter>
                </Modal>
            </div>
        )
    }
}