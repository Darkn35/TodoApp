import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Badge } from 'reactstrap'
import { Trash2, Edit, CheckSquare } from 'react-feather'
import db from './Firebase'
import firebase from 'firebase'

import './styles.scss';

export default function Todos(props) {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDone, setModalDone] = useState(false);
    const [modalConfirmDel, setModalConfirmDel] = useState(false);
    const [modalConfirmDone, setModalConfirmDone] = useState(false);
    const [done, setDone] = useState(false);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [badgeMessage, setBadgeMessage] = useState('');
    const [badgeColor, setBadgeColor] = useState('primary');

    const timestamp = new Date (props.todo.timestamp).toDateString() + ' at ' + new Date (props.todo.timestamp).toLocaleTimeString();
    const timestampDone = new Date (props.todo.timestampDone).toDateString() + ' at ' + new Date (props.todo.timestampDone).toLocaleTimeString();

    const toggleEdit = () => setModalEdit(!modalEdit);
    const toggleDone = () => setModalDone(!modalDone);
    const toggleConfirmDel = () => setModalConfirmDel(!modalConfirmDel);
    const toggleConfirmDone = () => setModalConfirmDone(!modalConfirmDone);

    const deleteHandler = () => {
        db.collection('TodoCollection').doc(props.todo.id).delete()
        toggleConfirmDel();
    }

    const editTodo = () => {
        db.collection('TodoCollection').doc(props.todo.id).set({
            todo: input,
        }, { merge: true })
        setModalEdit(!modalEdit);
    }

    const doneHandler = () => {
        setDone(!done);
        setMessage('');
        toggleConfirmDone()
        if (!done)
        {
            // Task is Done

            db.collection('TodoCollection').doc(props.todo.id).set({
                timestampDone: firebase.firestore.FieldValue.serverTimestamp(),
                done: true
            }, { merge: true });

            setMessage( `This task was done on ` + timestampDone);
            setBadgeMessage("Done");
            setBadgeColor("success");
        }
        else 
        {
            // Task is not Done

            db.collection('TodoCollection').doc(props.todo.id).set({
                timestampDone: firebase.firestore.FieldValue.serverTimestamp(),
                done: false
            }, { merge: true });

            setMessage(`This task was created on ` + timestamp);
            setBadgeMessage("Pending");
            setBadgeColor("primary");
        }
    }

    useEffect(() => {
        const doneChecker = () => {
            switch (props.todo.done)
            {
                case true: 
                    setMessage( `This task was done on ` + timestampDone);
                    setBadgeMessage("Done");
                    setBadgeColor("success");
                break;
                case false: 
                    setMessage(`This task was created on ` + timestamp);
                    setBadgeMessage("Pending");
                    setBadgeColor("primary");
                break;
                default: 
                     console.log("something error")
                break;
            }
        }
        doneChecker()
    }, [props.todo])

    return (
        <>
            <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Todo</ModalHeader>
                <ModalBody>
                    <Input value={input} onChange={event => setInput(event.target.value)} placeholder={props.todo.todo}/>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={!input} color="primary" onClick={editTodo}>Edit Todo</Button>{' '}
                    <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Done Checker Modal */}

            <Modal isOpen={modalDone} toggle={toggleDone}>
                <ModalHeader toggle={toggleDone}>Todo Progress</ModalHeader>
                <ModalBody>
                    <text>{message}</text>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleDone}>Okay</Button>
                </ModalFooter>
            </Modal>

            {/* Delete Confirmation Modal */}

            <Modal isOpen={modalConfirmDel} toggle={toggleConfirmDel}>
                <ModalHeader toggle={toggleConfirmDel}>Confirmation</ModalHeader>
                <ModalBody>
                    <text>Are you sure you want to delete this task?</text>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteHandler}>Yes</Button>
                    <Button color="danger" onClick={toggleConfirmDel}>No</Button>
                </ModalFooter>
            </Modal>

            {/* Done Confirmation Modal */}

            <Modal isOpen={modalConfirmDone} toggle={toggleConfirmDone}>
                <ModalHeader toggle={toggleConfirmDone}>Confirmation</ModalHeader>
                <ModalBody>
                    <text>Are you sure you want to mark this task as done?</text>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={doneHandler}>Yes</Button>
                    <Button color="danger" onClick={toggleConfirmDone}>No</Button>
                </ModalFooter>
            </Modal>

            {/* List of To-dos */}
            
            <ListGroup>
                <Row>
                    <Col className="col-10 mb-3 col-s-10">
                        <ListGroupItem onClick={toggleDone} className="task-style"><Badge color={badgeColor}>{badgeMessage}</Badge> | {props.todo.todo} </ListGroupItem>
                    </Col>
                    <Col className="col-2 pt-1 col-custom-style col-s-2">
                        <Row >
                            <Button color="danger" onClick={toggleConfirmDel} className="button-alignment"> <Trash2 /> </Button>
                            <Button color="primary" onClick={toggleEdit} className="button-alignment"> <Edit /> </Button>
                            <Button color="success" onClick={toggleConfirmDone} className="button-alignment"> <CheckSquare /> </Button>
                        </Row>
                    </Col>
                </Row>
            </ListGroup>
        </>
    )
}
