import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../components/navbar';
import '../styles/login_signup.css';
import '../styles/landingpage.css'; 

const LoginMenu = ({ loginClick, signupClick }) => {
  return (
    <Container className="mb-4">
      <Button className="btn-auth me-4" onClick={loginClick}>LOGIN</Button>
      <Button className="btn-signup" onClick={signupClick}>SIGN UP</Button>
    </Container>
  );
}

export default function Login() {

  const [signup, setSignup] = useState(false)
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams(formData),
      })

      const result = await response.json()

      console.log(result);

      if (response.ok) {
        window.location.href = "/"
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.error("Login failed:", error)
      setErrorMessage("An error occurred. Please try again.")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("name", name)

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams(formData),
      })

      const result = await response.json()

      console.log(result);

      if (response.ok) {
        setSignup(false)
        setErrorMessage("Signup successful, Please login!")
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.error("Sign up failed:", error)
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
  return (
    <>
      <NavBar />
      {!signup ? (
        <div className="login-page">
          <Container>
            <div className="content">
              <LoginMenu loginClick={loginClick} signupClick={signupClick} />
              <img src="/ui_assets/pokeball.png" alt="Pokeball" className="pokeball" />
              <h3 className="page-title">Welcome Back!</h3>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-5">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    id="usernameForm"
                    className="mb-3"
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
                  <Button className="btn-password mt-4" type="submit">ENTER</Button>{' '}
                </Form.Group>
              </Form>
            </div>
          </Container>
        </div>
      ) : (
        <div className="signup-page">
          <Container>
            <div className="content">
              <LoginMenu loginClick={loginClick} signupClick={signupClick} />
              <img src="/ui_assets/pokeball.png" alt="Pokeball" className="pokeball" />
              <h3 className="page-title">Start Your Journey!</h3>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-5">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name"
                    id="nameForm"
                    className="mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    id="usernameForm"
                    className="mb-3"
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
                  <Button className="btn-password mt-4" type="submit">GET STARTED</Button>{' '}
                </Form.Group>
              </Form>
            </div>
          </Container>
        </div>
      )}
    </>
  )
}
