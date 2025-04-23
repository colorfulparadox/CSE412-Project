import NavBar from '../components/navbar'; 
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
    return (
        <Container>
            <h3>Login</h3>
            <Form action="/login" method="POST">
                <Form.Group className="mb-5">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="username" id="usernameForm" name="username"/>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="password" id="passwordForm" name="password"/>
                    <Button className="LoginButton" variant="primary" type="submit">Login</Button>{' '}
                </Form.Group>
            </Form>
        </Container>
    )
}