import { Card } from "react-bootstrap";

export default function Authentication(props: {
  children: React.ReactNode;
  warning: string;
  titleStatement: string;
}) {
  return (
    <div style={{ width: "25%", textAlign: "center" }}>
      <Card bg="light">
        <Card.Body>
          <h1>Rec-gessions</h1>
          <span>{props.titleStatement}</span>
          <hr />
          {props.children}
          {props.warning && <p>{props.warning}</p>}
        </Card.Body>
      </Card>
    </div>
  );
}
