import React, {Component} from "react";
import { Modal, Button, Row, Col, Form, ModalHeader, ModalTitle, ModalBody, FormLabel, FormControl, FormGroup, ModalFooter } from "react-bootstrap";

export class EditDepModel extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'department',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:event.target.DepartmentId.value,
                DepartmentName:event.target.DepartmentName.value
            })
        })
        .then(res => res.json)
        .then((result) => {
            alert("Success!!!");
        },
        (error) => {
            alert('Failed!!!');
        })
    }

    render() {
        return(
            <div className="container">
                <Modal
                    {...this.props} size='lg' 
                    aria-labelledby='contained-modal-title-vcenter' centered>
                        <ModalHeader closeButton>
                            <ModalTitle id='contained-modal-title-vcenter'>
                                Edit Department
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col sm={10}>
                                    <Form onSubmit={this.handleSubmit}>
                                    <FormGroup controlId="DepartmentId">
                                            <FormLabel>Department Id:</FormLabel>
                                            <FormControl type='text' name='DepartmentId' required
                                                disabled defaultValue={this.props.depId}
                                                placeholder='Department ID'/>
                                        </FormGroup>
                                        <FormGroup controlId="DepartmentName">
                                            <FormLabel>Department Name:</FormLabel>
                                            <FormControl type='text' name='DepartmentName' required
                                                defaultValue={this.props.depname}
                                                placeholder='Department Name'/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button variant="primary" type="submit" style={{marginTop: 10}}>
                                                Update Department
                                            </Button>
                                        </FormGroup>
                                    </Form>
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