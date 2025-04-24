import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginMenu = ({loginClick, signupClick}) => {
    return (
      <Container>
        <Button onClick={loginClick}>Login</Button>
        <Button onClick={signupClick}>Sign Up</Button>
      </Container>
    )
}

export default function Login() {

    const [signup, setSignup] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleLogin = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)

        try {
            const response = await fetch("/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams(formData),
            })
      
            const result = await response.json()
      
            if (response.ok) {
              window.location.href = "/userprofile"
            } else {
              setErrorMessage(result.message)
            }
          } catch (error) {
            console.error("Login failed:", error)
            setErrorMessage("An error occurred. Please try again.")
          }
    }

    const loginClick = () => {
        setSignup(false)
    }
    const signupClick = () => {
        setSignup(true)
    }

    //action="/login" method="POST"
    if (!signup) {
        return (
            <Container>
                <LoginMenu loginClick={loginClick} signupClick={signupClick} />
                <h3>Login</h3>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-5">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="username" 
                        id="usernameForm"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="password" 
                        id="passwordForm" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className="LoginButton" variant="primary" type="submit">Login</Button>{' '}
                    </Form.Group>
                </Form>
            </Container>
        )
    }
    
    return (
        <Container>
            <LoginMenu loginClick={loginClick} signupClick={signupClick} />
            <h3>Sign Up</h3>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-5">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="username" 
                    id="usernameForm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="password" 
                    id="passwordForm" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="LoginButton" variant="primary" type="submit">Sign Up</Button>{' '}
                </Form.Group>
            </Form>
        </Container>
    )
}