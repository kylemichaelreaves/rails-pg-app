import * as React from "react";
import Container from "react-bootstrap/Container";

export default function NotFound() {
  return (
    <Container>
      <h1>404</h1>
      <br />
      <h4>Either you're lost</h4>
      <br />
      <p>Or the page you're looking for doesn't exist yet</p>
      <br />
      <p>If I was going to be a cantankerous bitch, I'd say, "Ding dong!"</p>
    </Container>
  );
}
