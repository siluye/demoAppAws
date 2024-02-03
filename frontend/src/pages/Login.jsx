import React, { useState } from "react";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  // Declare a state variable to store the response from the server
  const [responseMessage, setResponseMessage] = useState(null);

  // Function to handle the login form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data to be sent to the server
    const loginData = {
      email: emailAddress,
      password: password,
    };

    // Check if the data is being captured correctly
    console.log(loginData);

    //Send the data to the server
    const apiUrl = "http://18.222.248.165:4000/login";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };
    const response = fetch(apiUrl, requestOptions);

    // Save the response from the server in the state variable
    response
      .then((res) => res.json())
      .then((data) => {
        setResponseMessage(data.message);
        if (data.status === "success") {
          // Redirect the user to the home page after 5 seconds
        }
      })
      .catch((err) => console.log(error));
  };
  return (
    <div>
      <div className="notice">
        <h2>{responseMessage}</h2>
      </div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <br />{" "}
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

export default Login;
