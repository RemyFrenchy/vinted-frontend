import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsLetterChange = (event) => {
    const value = event.target.value;
    setNewsLetter(value);
  };

  const navigate = useNavigate();

  // --- handleSubmit ---
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `https://vinted2021.herokuapp.com/user/signup`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);

      if (email === response.data.email) {
        alert("un compte avece cette adresse email existe déjà");
      } else if (response.data.token) {
        cookies.set("token", response.data.token, { expires: 1 });
        navigate("/");
      }
    } catch (error) {
      console.log({ message: error.message });
      alert("un compte avece cette adresse email existe déjà");
    }
  };
  // ---------------------

  return (
    <div className="signup">
      <h1>s'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          value={newsLetter}
          onChange={handleNewsLetterChange}
        />
        <label for="newsletter">S'inscrire à notre newsletter </label>
        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};
export default Signup;
