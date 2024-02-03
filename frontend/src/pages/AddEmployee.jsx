import React, { useState } from "react";

const AddEmployee = () => {
  //Declare state variables for each of the form variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  //Function to handle submission of the form. It will add a new employee object with the
  const handleSubmit = (e) => {
    e.preventDefault();
    //Prepare the data to be sent to the server
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: password,
    };
    //Send data to the server
    const apiUrl = "http://18.222.248.165:4000/add-employee";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = fetch(apiUrl, requestOptions);
    response.then(res => res.json())
    .then(res => {
        console.log(res);
    })
  };

  return (
    <div>
      {/* Display the return message in here */}

      <h1>Add employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First name:</label>
        <br />
        <input
          type="text"
          id="fname"
          name="fname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input
          type="text"
          id="lname"
          name="lname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddEmployee;
