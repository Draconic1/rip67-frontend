import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { addSeat, setSeats } from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const defNewObj = {
    hall: "",
    number: "",
    row: "",
    price: "",
  };

  const [newSeat, setNewSeat] = useState(defNewObj);
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const seats = useSelector((state) => state.toolkit.seats);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/seats`, { headers: authHeader() }).then((resp) => {
      dispatch(setSeats(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/seats`, newSeat, { headers: authHeader() }).then((resp) => {
      dispatch(addSeat(resp.data));
      setNewSeat(defNewObj);
    });
  };

  const handleChange = (e) => {
    const newMovieTmp = { ...newSeat };

    newMovieTmp[e.target.name] = e.target.value;

    setNewSeat(newMovieTmp);
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список мест</h3>

      {seats && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Зал</th>
              <th>Ряд</th>
              <th>Номер</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {seats.length > 0 &&
              seats.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.hall}</td>
                    <td>{x.row}</td>
                    <td>{x.number}</td>
                    <td>{x.price}</td>
                  </tr>
                );
              })}
            {!seats.length && (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить новое место в зал</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Номер зала</Form.Label>
              <Form.Control
                type="number"
                name="hall"
                placeholder="Номер зала"
                value={newSeat.hall}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Номер зала для нового места
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ряд</Form.Label>
              <Form.Control
                type="number"
                name="row"
                placeholder="Ряд"
                value={newSeat.row}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Номер ряда в зале</Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Номер места</Form.Label>
              <Form.Control
                type="number"
                name="number"
                placeholder="Номер места"
                value={newSeat.number}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Номер нового места в ряду
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Стоимость</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Стоимость места"
                value={newSeat.price}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Стоимость нового места в зале
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default Component;
