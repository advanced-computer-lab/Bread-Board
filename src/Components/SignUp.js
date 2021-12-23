import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [secondTelephoneNumber, setSecondTelephoneNumber] = useState("");
  const [userName, setUserName] = useState("");

  const register = () => {
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      passportNumber == "" ||
      homeAddress == "" ||
      countryCode == "" ||
      telephoneNumber == "" ||
      userName == ""
    ) {
      alert("Please fill all fields!!!");
    } else if (countryCode <= 0) {
      alert("Country code can't be negative");
    } else if (telephoneNumber <= 0) {
      alert("Telephone number can't be negative");
    } else if (secondTelephoneNumber <= 0) {
      alert("Second telephone number can't be negative");
    } else if (telephoneNumber.length < 11 || telephoneNumber.length > 11) {
      alert("Telephone number must be 11 digits");
    } else if (
      secondTelephoneNumber.length < 11 ||
      secondTelephoneNumber.length > 11
    ) {
      alert("Second telephone number must be 11 digits");
    } else {
      axios
        .post("http://localhost:8000/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          passportNumber: passportNumber,
          homeAddress: homeAddress,
          countryCode: countryCode,
          telephoneNumber: telephoneNumber,
          secondTelephoneNumber: secondTelephoneNumber,
          userName: userName,
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  autoFocus
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  placeholder="test@gmail.com"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Home Address"
                  name="address"
                  placeholder="Address"
                  onChange={(event) => {
                    setHomeAddress(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="Country Code"
                  type="number"
                  name="code"
                  placeholder="Country Code"
                  onChange={(event) => {
                    setCountryCode(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  label="Telephone"
                  type="number"
                  name="number"
                  placeholder="Telephone"
                  onChange={(event) => {
                    setTelephoneNumber(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="number2"
                  label="(Optional)Telephone"
                  type="number"
                  name="number2"
                  placeholder="Telephone"
                  onChange={(event) => {
                    setSecondTelephoneNumber(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="passport"
                  label="Passport Number"
                  name="passport"
                  placeholder="A123456789"
                  onChange={(event) => {
                    setPassportNumber(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  placeholder="Username"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Password..."
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
