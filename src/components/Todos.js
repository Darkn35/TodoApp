import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import { Trash2, Edit } from 'react-feather'
import db from './Firebase'

import './styles.scss';

export default function Todos(props) {
    const [modal, setModal] = useState(false);
    const [input, setInput] = useState('');

    const toggle = () => setModal(!modal);

    const deleteHandler = (event) => {
        db.collection('TodoCollection').doc(props.todo.id).delete()
    }

    const editTodo = () => {
        db.collection('TodoCollection').doc(props.todo.id).set({
            todo: input,
        }, { merge: true })
        setModal(!modal);
    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
                <ModalBody>
                    <Input value={input} onChange={event => setInput(event.target.value)} placeholder={props.todo.todo}/>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={!input} color="primary" onClick={editTodo}>Edit Todo</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <ListGroup>
                <Row>
                    <Col sm={9}>
                        <ListGroupItem>{props.todo.todo}</ListGroupItem>
                    </Col>
                    <Col>
                        <Row>
                            <Button color="danger" onClick={deleteHandler} className="button-alignment"> <Trash2 /> </Button>
                            <Button color="info" onClick={toggle}> <Edit /> </Button>
                        </Row>
                    </Col>
                </Row>
            </ListGroup>
        </>
    )
}
