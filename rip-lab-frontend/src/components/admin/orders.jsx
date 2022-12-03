import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  addOrder,
  setOrders,
  setOrderStatuses,
  setMovies,
  setSeats,
} from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const [status, setStatus] = useState("");
  const [movieId, setMovieId] = useState("");
  const [seatId, setSeatId] = useState("");

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const movies = useSelector((state) => state.toolkit.movies);
  const seats = useSelector((state) => state.toolkit.seats);
  const orders = useSelector((state) => state.toolkit.orders);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/orders?all=1`, { headers: authHeader() }).then((resp) => {
      dispatch(setOrders(resp.data));
    });

    axios
      .get(`${apiBase}/orders/info/statuses`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrderStatuses(resp.data));
      });

    axios.get(`${apiBase}/movies`, { headers: authHeader() }).then((resp) => {
      dispatch(setMovies(resp.data));
    });

    axios.get(`${apiBase}/seats`, { headers: authHeader() }).then((resp) => {
      dispatch(setSeats(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios
      .post(
        `${apiBase}/orders`,
        {
          status: +status,
          movie_id: +movieId,
          seat_id: +seatId,
        },
        { headers: authHeader() }
      )
      .then((resp) => {
        dispatch(addOrder(resp.data));
      });
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список заказов</h3>

      {orders && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>ID Фильма</th>
              <th>ID Места</th>
              <th>ID Пользователя</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>
                      {orderStatuses &&
                        orderStatuses.find((e) => +e.val === +x.status)?.name}
                    </td>
                    <td>{x.movie_id}</td>
                    <td>{x.seat_id}</td>
                    <td>{x.user_id}</td>
                  </tr>
                );
              })}
            {!orders.length && (
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

      <h3>Добавить новый заказ</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Статус</Form.Label>
              <Form.Select
                name="status"
                placeholder="Статус заказа"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                onBlur={(e) => setStatus(e.target.value)}
              >
                <option disabled value="">
                  Выберите статус
                </option>
                {orderStatuses &&
                  orderStatuses.map((x) => (
                    <option key={x.val} value={x.val}>
                      {x.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">Статус нового заказа</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Фильм (ID)</Form.Label>
              <Form.Select
                name="movie_id"
                placeholder="Фильм (ID)"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
                onBlur={(e) => setMovieId(e.target.value)}
              >
                <option disabled value="">
                  Выберите Фильм (ID)
                </option>
                {movies &&
                  movies.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">Статус нового заказа</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Место (ID)</Form.Label>
              <Form.Select
                name="seat_id"
                placeholder="Место (ID)"
                value={seatId}
                onChange={(e) => setSeatId(e.target.value)}
                onBlur={(e) => setSeatId(e.target.value)}
              >
                <option disabled value="">
                  Выберите Место (ID)
                </option>
                {seats &&
                  seats.map((x) => (
                    <option key={x.id} value={x.id}>
                      {`Зал ${x.hall} ряд ${x.row} место ${x.number}`}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">Статус нового заказа</Form.Text>
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
