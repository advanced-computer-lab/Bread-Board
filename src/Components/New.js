import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { orange, green } from "@material-ui/core/colors";
import "fontsource-roboto";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6888, #FF8E53)",
    border: 0,
    marginTop: 15,
    borderRadius: 15,
    color: "white",
    padding: "5px 30px",
  },
});

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginTop: 15,
    },
  },
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: green[400],
    },
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>Test Styled Button</Button>;
}

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const login = () => {
    navigate(-1);
  };

  const register = () => {
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      passportNumber == ""
    ) {
      alert("Please fill all fields!!!");
    } else {
      axios
        .post("http://localhost:8000/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          passportNumber: passportNumber,
          admin: false,
        })
        .then((result) => {
          if (result.data.name == "ValidationError") {
            alert("Email already exists!!!");
          } else {
            alert("Registered Succefully");
            navigate(-1);
          }
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        register();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <div>
          <div className="HeaderContainer">
            <div className="HeaderButton">
              <button onClick={login}>Login</button>
            </div>
            <div className="Register">
              <h1>Register</h1>
            </div>
          </div>
          <div className="App">
            <div className="Neww">
              <div>
                First Name:
                <input
                  type="text"
                  placeholder="First Name..."
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                Last Name:
                <input
                  type="text"
                  placeholder="Last Name..."
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                Email:
                <input
                  type="text"
                  placeholder="Email..."
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                Passport Number:
                <input
                  type="text"
                  placeholder="Passport Number..."
                  onChange={(event) => {
                    setPassportNumber(event.target.value);
                  }}
                />
                <TextField
                  variant="filled"
                  color="secondary"
                  type="password"
                  label="Password"
                  placeholder="Password..."
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <Button
                startIcon={<SaveIcon />}
                size="large"
                variant="contained"
                color="primary"
                onClick={register}
              >
                Register
              </Button>
              {/* <button onClick={register}>Register</button> */}
              <ButtonStyled />
              <Grid container spacing={2} justify="center">
                <Grid item xs={2} md={6}>
                  <Paper style={{ height: 75, width: "100%", marginTop: 15 }} />
                </Grid>
                <Grid item xs={2} md={6}>
                  <Paper style={{ height: 75, width: "100%", marginTop: 15 }} />
                </Grid>
                <Grid item xs={2} md={6}>
                  <Paper style={{ height: 75, width: "100%", marginTop: 15 }} />
                </Grid>
              </Grid>
              <Typography variant="h2" component="div">
                Welcome to MUI
              </Typography>
              <Typography variant="subtitle1">
                learn how to use Material Ui
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
