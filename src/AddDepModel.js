import React, {Component} from "react";
import { Modal, Button, Row, Col, Form, ModalHeader, ModalTitle, ModalBody, FormLabel, FormControl, FormGroup, ModalFooter } from "react-bootstrap";

export class AddDepModel extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'department',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:null,
                DepartmentName:event.target.DepartmentName.value
            })
        })
        .then(res => res.json)
        .then((result) => {
            alert(result.DepartmentName);
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
                                Add Department
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col sm={10}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup controlId="DepartmentName">
                                            <FormLabel>Department Name:</FormLabel>
                                            <FormControl type='text' name='DepartmentName' required
                                                placeholder='Department Name'/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button variant="primary" type="submit" style={{marginTop: 10}}>
                                                Add Department
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