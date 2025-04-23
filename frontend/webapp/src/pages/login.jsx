import NavBar from '../components/navbar'; 
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
    const onSubmit = (event) => {

    }    
    
    return (
        <Container>
            <h3>Login</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-5">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="username" placeholder="username" id="usernameForm"/>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="password" id="passwordForm"/>
                    <Button className="LoginButton" variant="primary" type="submit">Login</Button>{' '}
                </Form.Group>
            </Form>
        </Container>
    )
}