import { useState } from "react";
import { Card } from "react-bootstrap";
import { UserRegistrationForm, UserValidationForm } from "@/Components";

export default function Login() {
  const [warning, setWarning] = useState(""),
    [registration, setRegistration] = useState(true),
    [titleStatement, setTitleStatement] = useState("");
  return (
    <div style={{ width: "25%", textAlign: "center" }}>
      <Card bg="light">
        <Card.Body>
          <h1>Rec-gessions</h1>
          <span>{titleStatement}</span>
          <hr />
          {registration ? (
            <>
              <UserRegistrationForm
                setWarning={setWarning}
                setTitleStatement={setTitleStatement}
              />
              <a
                onClick={() => {
                  setRegistration(false);
                  setWarning("");
                }}
              >
                Already have an account?
              </a>
            </>
          ) : (
            <>
              <UserValidationForm
                setWarning={setWarning}
                setTitleStatement={setTitleStatement}
              />
              <a
                onClick={() => {
                  setRegistration(true);
                  setWarning("");
                }}
              >
                Don&apos;t have an account?
              </a>
            </>
          )}
          {warning && (
            <>
              <p>{warning}</p>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
