import React, { useState, useEffect } from 'react'
import { Form, Input, Button, FormGroup, Col } from 'reactstrap'
import Todos from './Todos'
import db from './Firebase'
import firebase from 'firebase'
import { Plus } from 'react-feather'

import './styles.scss';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = (event) => {
        console.log("working");
        event.preventDefault();

        db.collection('TodoCollection').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('');
    }

    useEffect(() => {
        db.collection('TodoCollection').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
        })
    }, [input])


    return (
        <div className="custom-content-style-wrapper">
            <div className="custom-content-style">
                <h1 className="custom-title">To-do List</h1>
                <Form>
                    <FormGroup row>
                        <Col sm={9}>
                            <Input value={input} onChange={event => setInput(event.target.value)} />
                        </Col>
                        <Col>
                            <Button disabled={!input} onClick={addTodo} type="submit" color="success" className="w-100"> <Plus /> </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div className="list-style">
                    {todos.map(todo => (
                        <Todos todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    )
}
