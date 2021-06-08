import React from "react";

const LogIn = () => {
  return (
    <div>
      <h1>Log In</h1>
      <form action="/login" method="POST">
        <label for="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          minLength="8"
          required
        />
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength="8"
          required
        />
        <input type="submit" value="log in" />
      </form>
    </div>
  );
};

export default LogIn;
