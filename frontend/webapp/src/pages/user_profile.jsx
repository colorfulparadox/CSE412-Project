import NavBar from '../components/navbar'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { pokepostrequest, pokeapi } from '../api/pokemonapi';


// fields should populate on load

export default function Profile() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [blurb, setBlurb] = useState("");
    const password_reference = useRef("");
  
    async function load_profile() {
        try {
            const data = await pokeapi(`/profile`);
            console.log("DATA:", data[0]);
            setUsername(data[0].username);
            setName(data[0].name);
            setBlurb(data[0].blurb);
        } catch (err) {
            console.error("Error:", err);
        } finally {
        }
    }

    // on load
    useEffect(() => {
        load_profile();
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === "" || name === "") {
            return;
        }

        let updatedata = {
            "name": name,
            "username": username,
            "blurb": blurb,
        };

        pokepostrequest("/profile/set", updatedata);

    }

    const pwupdate_submit = (event) => {
        event.preventDefault();

        var pw = password_reference.current.value;
    
        if (pw === "") {
            console.log("Don't submit an empty password");
            return;
        }

        pokepostrequest("/profile/setpw", {"password": pw});

    }

    const handleChange = (event) => {
        event.preventDefault();
    
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'name':
                setName(event.target.value);
                break;
            case 'blurb':
                setBlurb(event.target.value);
                break;
        }
    
    }

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col style={{ padding: '20px' }}>
                        <h1>Trainer Profile</h1>
                        <Form.Group>
                            <Form.Label htmlFor="inputUsername">Username</Form.Label>
                            <Form.Control 
                                type="username"
                                name="username"
                                value={username}
                                className="mb-3"
                                id="inputUsername"
                                onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputName">Name</Form.Label>
                            <Form.Control 
                                type="name"
                                name="name"
                                value={name}
                                className="mb-3"
                                id="inputName"
                                onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputBlurb">Blurb</Form.Label>
                            <Form.Control 
                                type="blurb"
                                name="blurb"
                                value={blurb}
                                className="mb-3"
                                id="inputBlurb"
                                onChange={handleChange}/>
                        </Form.Group>
                        
                        <Form.Label id="error-label" hidden>Error</Form.Label><br/>
                        <Button variant="primary" type="submit" 
                        className="mb-3"
                        onClick={handleSubmit}
                        >Update</Button>
                        <br/>
                        <Form.Group>
                            <Form.Label htmlFor="pw_input">Set new password</Form.Label>
                            <Form.Control 
                                className="mb-3"
                                ref={password_reference}
                                name="password"
                                type="password"
                                id="pw_input"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" 
                            className="mb-3"
                            onClick={pwupdate_submit}
                            >Update Password</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
