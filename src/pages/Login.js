import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `https://vinted2021.herokuapp.com/user/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);

      if (response.data.token) {
        cookies.set("token", response.data.token, { expires: 1 });
        navigate("/");
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
