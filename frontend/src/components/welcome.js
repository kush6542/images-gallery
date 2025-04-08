import React from "react";
import { Accordion, Container } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container className="mt-4">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Immages finder using keyword</Accordion.Header>
          <Accordion.Body>
            Please enter text in the below textbox to sesrch for images.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Welcome;
