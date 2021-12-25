import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function ForgotPasswword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const back = () => {
    navigate(-1);
  };

  const forgotPasswword = () => {
    if (email == "") {
      alert("Please enter your email....");
    } else {
      axios
        .post("http://localhost:8000/admin/forgotPassword", {
          email: email,
        })
        .then((result) => {
          axios
            .post("http://localhost:8000/admin/sendEmail", {
              email: result.data.email,
              password: result.data.password,
            })
            .then((result) => {
              alert(result.data);
              navigate(-1);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        forgotPasswword();
      }
      if (event.code === "Escape") {
        event.preventDefault();
        back();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderButton">
          <button onClick={back}>Back</button>
        </div>
        <div className="email">
          Your Registered Email
          <input
            type="text"
            placeholder="Enter Your Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={forgotPasswword}>Send Mail</button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswword;
