import React, { useState, useEffect } from 'react'
import { Container, Form, Input, Button, FormGroup, Col } from 'reactstrap'
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
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            timestampDone: firebase.firestore.FieldValue.serverTimestamp(),
            done: false
        });

        setInput('');
    }

    useEffect(() => {
        const estimateTimestamps = { serverTimestamps: 'estimate' }
        db.collection('TodoCollection').orderBy('done', 'asc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({ 
                id: doc.id, 
                todo: doc.data().todo, 
                done: doc.data().done, 
                // timestamp: doc.data().timestamp.toMillis(),
                // timestampDone: doc.data().timestampDone.toMillis()
                timestamp: doc.get('timestamp', estimateTimestamps).toMillis(),
                timestampDone: doc.get('timestampDone', estimateTimestamps).toMillis()
             })))
        })
    }, [input])


    return (
        <div >
            <div >      
                <Container fluid className="bg-success text-white p-5">

                    <h1 className="display-3">To-Do App</h1>
                    <p className="lead">Let's get things done!</p>

                    <Form>
                        <FormGroup row>
                            <Col sm={10}>
                                <Input placeholder="Add a new task" value={input} onChange={event => setInput(event.target.value) } style={{width: "100%"}} />
                            </Col>
                            <Col sm={2}>
                                <Button disabled={!input} onClick={addTodo} type="submit" className="w-100 btn btn-light"> <Plus /> </Button>
                            </Col>
                        </FormGroup>
                    </Form>                 
                </Container>
            </div>

            <div className="d-flex justify-content-center">
                <Container className=" p-5 m-5 border border-success rounded" style={{minHeight:"550px"}}>

                    
                    <h1 className="text-success text-center">
                       Tasks
                    </h1>

                    <hr/>
                    
                    <div className="p-4">
                        {todos.map(todo => (
                            <Todos todo={todo} />
                        ))}
                    </div>

                </Container>
            </div>

        
            {/* <div className="custom-content-style-wrapper">
                <div className="custom-content-style">
                    
                 
                    <div className="list-style">
                        {todos.map(todo => (
                            <Todos todo={todo} />
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}
