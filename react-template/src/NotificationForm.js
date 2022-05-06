import { useState, useEffect } from "react";
import "./NotificationForm.css";

export const NotificationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailCheckBox, setEmailCheckBox] = useState(false);
  const [phoneCheckBox, setPhoneCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [supervisor, setSupervisor] = useState("Select...");

  useEffect(() => {
    fetch("http://localhost:8080/supervisors")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSupervisors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="form">
      <h1 className="notificationHeader">Notification Form</h1>
      <form>
        <p>
          <label>First Name</label>
          <input
            type="text"
            requiredvalue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </p>
        <p>
          <label>Last Name</label>
          <input
            type="text"
            requiredvalue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </p>
        <h4 className="notificationPreference">
          How would you prefer to be notified?
        </h4>
        <p>
          <input
            type="checkbox"
            value={emailCheckBox}
            onChange={(e) => setEmailCheckBox(e.target.value)}
          />
          <label>Email</label>
        </p>
        <p>
          <input
            type="checkbox"
            id="phoneCheckBox"
            name="phoneCheckBox"
            value={phoneCheckBox}
            onChange={(e) => setPhoneCheckBox(e.target.value)}
          />
          <label className="phoneCheckBoxLabel">Phone Number</label>
        </p>
        <p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </p>
        <p className="formLower">
          <label>Supervisor</label>
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
        </p>
        <button>Submit</button>
      </form>
    </div>
  );
};
