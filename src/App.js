import "./styles.css";
import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link
} from "react-router-dom";
import { useState, useContext, createContext } from "react";

const UserContext = createContext();

function Regi() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [RePass, setRePass] = useState("");
  const [sms, setsms] = useState("");
  let navigate = useNavigate();
  return (
    <>
      <div className="regi">
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
          }}
        >
          <h1>Create Account</h1>
          <label htmlFor="username">
            Username:{" "}
            <input
              value={user}
              onChange={(tx) => {
                setUser(tx.target.value);
              }}
              type="text"
              required
            />
          </label>
          <label htmlFor="username">
            Password:{" "}
            <input
              value={pass}
              onChange={(ps) => {
                setPass(ps.target.value);
              }}
              type="password"
              required
            />
          </label>
          <label htmlFor="username">
            Confirm-Password:{" "}
            <input
              value={RePass}
              onChange={(ps) => {
                setRePass(ps.target.value);
              }}
              type="password"
              required
            />
          </label>
          <p>{sms}</p>
          <button
            type="submit"
            onClick={() => {
              let x = localStorage.getItem(user);
              if (!x && pass === RePass) {
                localStorage.setItem(user, pass);
                navigate("/login");
              } else if (x) {
                setsms("This username already exist please login");
              } else {
                setsms("Password does not match.");
                setPass("");
                setRePass("");
              }
            }}
          >
            Submit
          </button>
          <br />
          <Link to="/login">Login-Account</Link>
        </form>
      </div>
    </>
  );
}
function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [sms, setsms] = useState("");
  let navigate = useNavigate();
  const setFlag = useContext(UserContext);
  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <h1>Login Account</h1>
        <label htmlFor="username">
          Username:{" "}
          <input
            value={user}
            onChange={(tx) => {
              setUser(tx.target.value);
            }}
            type="text"
            required
          />
        </label>
        <label htmlFor="username">
          Password:{" "}
          <input
            value={pass}
            onChange={(ps) => {
              setPass(ps.target.value);
            }}
            type="password"
            required
          />
        </label>
        <p>{sms}</p>
        <button
          onClick={() => {
            let res = localStorage.getItem(user);
            if (user === "admin" && pass === "admin") {
              navigate("/admin");
              setFlag(true);
            } else if (res === pass) {
              navigate("/homepage");
              setPass("");
              setUser("");
              setFlag(true);
            } else {
              setsms("Username and Password does not match");
              setPass("");
              setUser("");
            }
          }}
          type="submit"
        >
          Login
        </button>
        <br />
        <Link to="/">Create-Account</Link>
      </form>
    </>
  );
}
function Homepage(props) {
  const setFlag = useContext(UserContext);
  if (props.flag === false) {
    return (
      <>
        <Login />
      </>
    );
  } else {
    return (
      <>
        <div>
          <button
            className="btn"
            onClick={() => {
              setFlag(false);
            }}
          >
            Logout
          </button>
        </div>
        <br />
        <div className="wellcome">
          <h1>Well-COME TO HOMEPAGE</h1>
        </div>
      </>
    );
  }
}
function Admin(props) {
  const setFlag = useContext(UserContext);
  if (props.flag === false) {
    return (
      <>
        <Login />
      </>
    );
  }
  let list = [];
  for (let x in localStorage) {
    let user = <li>{x}</li>;
    list.push(user);
  }
  list = list.slice(0, list.length - 6);
  return (
    <>
      <button
        className="btn"
        onClick={() => {
          setFlag(false);
        }}
      >
        Logout
      </button>
      <div className="body">
        <h1>List Of Username</h1>
        <ol>{list}</ol>
      </div>
    </>
  );
}
function App() {
  const [flag, setFlag] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={setFlag}>
          <Routes>
            <Route path="/" element={<Regi />} />
            <Route path="/homepage" element={<Homepage flag={flag} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin flag={flag} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
