
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";

import React, { useState} from "react";


  function Resetpassword() {
    const [errors, setErrors] = useState({});
    const [success, setsuccess] = useState({});
    const [formData, setFormData] = useState({    
      password: '',
      token:'',
      uid64:''
    });
    const [confirmPassword, setconfirmPassword] = useState('')
  
  
   
  
    const navigate =useNavigate();
  
    
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      if (formData.password !== confirmPassword) {
        setErrors('Passwords do not match');
        return;
      }
      setErrors({});    
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };
      fetch('http://127.0.0.1:8000/api/reset_password/', requestOptions)
  
        .then(response => {
          if (response.status === 400) {
            return response.json().then(data => {
              setErrors(data);
              throw new Error('Bad Request');
            });
          } else if(response.status === 200){
            return response.json().then(data => {
              setsuccess(data);            
              alert("operation sucess"); 
              navigate('/logout', {replace: true});
            });          
            
          }
          else {
            return response.json();
          }
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              
              <div>              
                {success.email && success.email.map(<div>{success.email}</div>)}
                {errors.email && errors.email.map(<div>{errors.email}</div>)}
                {errors && <div>{errors}</div>}
                <form onSubmit={handleSubmit}  className="d-flex flex-column gap-15">
                  <div>
                    <label htmlFor="password">New Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                      type="password"
                      name="confirm-password"
                      value={confirmPassword}
                      onChange={e=>setconfirmPassword(e.target)}
                    />
                  </div>
                  <button type="submit">Reset Password</button>
                </form>
              </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
