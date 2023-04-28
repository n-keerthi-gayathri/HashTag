import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './Form.css'
export default function Form() {
  const [dob, setDob] = useState('');
  const [formData, setFormData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    localStorage.setItem("name",data.name);
    localStorage.setItem("email",data.email);
    localStorage.setItem("phone",data.phone);
    localStorage.setItem("DOB",data.dob);
    const array=Object.values({data});
    setFormData([...formData,array[0]]); 
    console.log(formData);
    document.getElementById('display').innerHTML += "<table border='1' width='500' align='right'><tr align='center'><td>"+data.name+"</td><td>"+data.email+"</td><td>"+data.phone+"</td><td>"+data.dob+"</td></tr></table>";
  };
  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  };
  const handleDobChange = (event) => {
    setDob(event.target.value);
    const age = calculateAge(event.target.value);
    if(age<18)
    document.getElementById('age').innerHTML = "<p>*age must be 18 or more</p>";
    else
    document.getElementById('age').innerHTML = age;
  };
  return (
    <div className="form">
    <form onSubmit={handleSubmit(onSubmit)}>
      <table align="center" border={0}>
        <tbody>
          <tr align="center">
            <td colSpan={2}>
              <h2 align="center">Registration Form</h2>
            </td>
          </tr>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
                aria-invalid={errors.name ? "true" : "false"}
                placeholder="Enter Your Name..."
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Email:</label>
            </td>
            <td>
              <input
                {...register("email", { required: true })}
                placeholder="Enter Your Email..."
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Phone:</label>
            </td>
            <td>
              <input
                {...register("phone", { maxLength: 10 })}
                placeholder="Enter Your Phone Number..."
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>DOB:</label>
            </td>
            <td>
              <input type="date" {...register("dob")} onChange={handleDobChange}/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Age:</label>
            </td>
            <td>
              <span id="age" className="age-message"></span>
            </td>
          </tr>
          <tr align="center">
            <td colSpan={2}>
              <input type="submit" />
            </td>
          </tr>
        </tbody>
      </table>
      {errors.name?.type === "required" && (
        <p className="error-message">*name is required</p>
      )}
      {(errors.name?.type === "minLength" ||
        errors.name?.type === "maxLength") && (
        <p className="error-message">*name should contain min 3 and max 20 characters</p>
      )}
      {errors.email?.type === "required" && (
        <p className="error-message">*Email is required</p>
      )}
      <br></br>
      <br></br>
      <br></br>
      <div className="right"><span id="display"><table border={2} width={500} align="right"><tbody><tr><th>Name</th><th>Email</th><th>Phone</th><th>DOB</th></tr></tbody></table> </span></div>
    </form>
    </div>
  );
}