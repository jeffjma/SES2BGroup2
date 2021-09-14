import { Container, Form } from "react-bootstrap";


const Background = () => {
  return (
    <div>
      <Container>
      <Form>
        <Form.Group>
          <Form.Label>My current education level is...</Form.Label>
          <Form.Select>
            <option disabled>e.g. Tertiary Education - University</option>
            <option value="2">Secondary Education</option>
            <option value="3">Tertiary Education</option>
          </Form.Select>
        </Form.Group>
      </Form>
      </Container>
    </div>
  );
}

export default Background;
