import { useState, useEffect } from "react";
import "./NotificationForm.css";

export const NotificationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailCheckBox, setEmailCheckBox] = useState(false);
  const [phoneCheckBox, setPhoneCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [supervisor, setSupervisor] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      supervisor.length === 0 ||
      supervisor === "Select..."
    ) {
      setServerMsg("Please fill all of the required fields.");
    } else {
      fetch("http://localhost:8080/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          supervisor,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            setServerMsg(data.error);
          }
          if (data.success) {
            setFirstName("");
            setLastName("");
            setEmailCheckBox(false);
            setPhoneCheckBox(false);
            setPhoneNumber("");
            setEmail("");
            setSupervisor("Select...");
            setServerMsg(data.success);
          }
        })
        .catch((error) => {
          setServerMsg(
            "Sorry, your request cannot be processed at this time. Please try again later."
          );
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/supervisors")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setServerMsg(data.error);
        } else {
          setSupervisors(data);
        }
      })
      .catch((error) => {
        setServerMsg(
          "Sorry, your request cannot be processed at this time. Please try again later."
        );
      });
  }, []);

  return (
    <div className="form">
      <div className="notificationHeader">
        <h1>Notification Form</h1>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="row firstRow">
          <div className="column">
            <label>First Name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="column">
            <label>Last Name*</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <h4 className="notificationPreference">
          How would you prefer to be notified?
        </h4>
        <div className="row">
          <div className="column">
            <label className="checkBoxLabel">
              <input
                type="checkbox"
                className="checkBox"
                value={emailCheckBox}
                checked={emailCheckBox}
                onChange={(e) => setEmailCheckBox(!emailCheckBox)}
              />
              &nbsp; Email
            </label>
          </div>
          <div className="column">
            <label className="checkBoxLabel">
              <input
                type="checkbox"
                className="checkBox"
                name="phoneCheckBox"
                value={phoneCheckBox}
                checked={phoneCheckBox}
                onChange={(e) => setPhoneCheckBox(!phoneCheckBox)}
              />
              &nbsp; Phone Number
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="column">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <label class="supervisor">Supervisor*</label>
        <select
          className="dropdown"
          value={supervisor}
          onChange={(e) => setSupervisor(e.currentTarget.value)}
        >
          <option>Select...</option>
          {supervisors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <br></br>
        <button>SUBMIT</button>
      </form>
      <p>{serverMsg}</p>
    </div>
  );
};
