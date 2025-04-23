import NavBar from '../components/navbar'; 
import { Container } from 'react-bootstrap';

export default function UserProfile() {
    return (
        <>
        <NavBar />
        <Container style={{ padding: '20px' }}>
            <h1>Hello User!</h1>
        </Container>
        </>
    );
}