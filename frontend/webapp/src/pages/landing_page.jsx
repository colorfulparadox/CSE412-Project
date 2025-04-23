import NavBar from '../components/navbar'; 
import { Container } from 'react-bootstrap';

export default function LandingPage() {
    return (
        <>
        <NavBar />
        <Container style={{ padding: '20px' }}>
            <h1>Hello World!</h1>
        </Container>
        </>
    )
}
  