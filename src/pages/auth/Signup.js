import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import { AuthContext } from "../context/auth";

const Signup = () => {
  let {setregemail}=useContext(AuthContext)
  const[TnC, setTnC]=useState(false);
  const [success, setsuccess] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate ()

  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://127.0.0.1:8000/api/account/signup/', requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if(response.status === 200){
          return response.json().then(data => {
            setsuccess(data);
            setregemail(formData.email);
            localStorage.setItem('regmail', JSON.stringify(formData.email));
            alert("operation sucess"); 
            navigate('verify');
          });          
          
        }
        else {
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
<script src="https://kit.fontawesome.com/e2b0dafd09.js" crossorigin="anonymous"></script>
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h6 className="text-center mb-3">Sign Up</h6>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
             <div>
             <i class="fa-solid fa-user"></i>
           
             <select  id="list" >
                <option value="Customer"> Customer</option>
                <option value="Merchant">Merchant</option>
              </select>
             </div>
             
              
                <label>
                Email:
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                {errors.email && errors.email.map(error => <div className="error">{error}</div>)}
                <br />
                <label>
                Username:
                <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                {errors.username && errors.username.map(error => <div className="error">{error}</div>)}
                <br />
                <label>
                Phone Number:
                <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                </label>
                {errors.phone_number && errors.phone_number.map(error => <div className="error">{error}</div>)}
                <br />
                <label>
                Password:
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                {errors.password && errors.password.map(error => <div className="error">{error}</div>)}
                <br />
                <label>
                Confirm Password:
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                </label>
                {errors.confirmPassword && errors.confirmPassword.map(error => <div className="error">{error}</div>)}
                <br />

                <div>
                <input type="checkbox"  onChange={(e)=>setTnC(e.target.checked)} /> 
                <span> Agree to our <a href="https://www.termsandconditionsgenerator.com/live.php?token=RhstCSQS5UQ558WNgu8ateQtjimEwMV1"> Terms and Conditions</a></span> <br />
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">Sign Up</button>
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

export default Signup;