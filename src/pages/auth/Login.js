import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { AuthContext } from "../context/auth";

import jwt_decode from "jwt-decode";

// The issue is that you are trying to use setAuthTokens and setUser directly
//  from the UserAuth function, which is not correct because UserAuth only returns the 
//  authTokens, user, and logoutUser values from the context. Instead, you should 
//  be using useContext(AuthContext) directly 
// inside the Login component to get the setAuthTokens and setUser functions from the context.



const Login = () => {
        const onChange = () => {

        };
        let { setAuthTokens, setUser } = useContext(AuthContext);
        const [formData, setFormData] = useState({ email: '', password: '' });
        const [errors, setErrors] = useState({});

        const handleInputChange = event => {
            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

        const navigate = useNavigate();

        const handleSubmit = (event) => {
            event.preventDefault();
            setErrors({});
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            fetch('http://127.0.0.1:8000/api/token/', requestOptions)
                .then(response => {
                    if (response.status === 400) {
                        return response.json().then(data => {
                            setErrors(data);
                            throw new Error('Bad Request');
                        });
                    } else if (response.status === 200) {
                        return response.json().then(data => {
                            setAuthTokens(data);
                            setUser(jwt_decode(data.access));
                            localStorage.setItem('authTokens', JSON.stringify(data));
                            alert("login was sucessfull !!");
                            navigate('/', { replace: true });;
                        });
                    } else {
                        return response.json();
                    }
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
        };

        return ( <
                >
                <
                Meta title = { "Login" }
                /> <
                BreadCrumb title = "Login" / >

                <
                Container class1 = "login-wrapper py-2 home-wrapper-5" >

                <
                div className = "row" >
                <
                div className = "col-12" >
                <
                div className = "auth-card" >
                <
                h6 className = "text-center mb-3" > Login < /h6> <
                form onSubmit = { handleSubmit }
                className = "d-flex flex-column gap-15" >

                <
                label >
                Email:
                <
                input type = "email"
                name = "email"
                value = { formData.email }
                onChange = { handleInputChange }
                /> {
                    errors.email && < div className = "error" > { errors.email[0] } < /div>} <
                        /label> <
                        br / >
                        <
                        label >
                        Password:

                        <
                        input type = "password"
                    name = "password"
                    value = { formData.password }
                    onChange = { handleInputChange }
                    /> {
                        errors.password && < div className = "error" > { errors.password[0] } < /div>} <
                            /label> <
                            br / >
                            <
                            ReCAPTCHA sitekey = "6LckEN4kAAAAADYujmmh9f-e0sIeful2Pslo8-ac"
                        onChange = { onChange }
                        /> <
                        div >
                            <
                            Link to = "/forgot-password" > Forgot Password ? < /Link>

                        <
                        div className = "mt-3 d-flex justify-content-center gap-15 align-items-center" >
                            <
                            button type = 'submit'
                        className = "button border-0"
                        type = "submit" >
                            Login <
                            /button> <
                            Link to = '/Signup'
                        className = "button signup" >
                            SignUp <
                            /Link> <
                            /div> <
                            /div> <
                            /form> <
                            /div> <
                            /div> <
                            /div> <
                            /Container> <
                            />
                    );
                };

                export default Login;