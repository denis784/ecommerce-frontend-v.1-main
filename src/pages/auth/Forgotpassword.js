
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import React, { useState } from 'react';

function Forgotpassword() {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    fetch('http://127.0.0.1:8000/api/forgot_password/', requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setSuccess(data);
            // setTimeout(() => {
            //   // do something after 5 seconds
            //   alert('Operation successful !!');
            // }, 5000);
            return data;
          });
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h5 className="text-center mb-3">Reset Your Password</h5>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
                  <form action="" className="d-flex flex-column gap-15">
                    <CustomInput type="email" name="email" placeholder="Email" />

                    <div>
                      <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                        <button className="button border-0" type="submit">
                          Submit
                        </button>
                        <Link to="/login">Cancel</Link>
                      </div>
                    </div>
                  </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;