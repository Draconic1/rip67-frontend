import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import authHeader from "../services/auth-header";

import {
  setOrders,
  setOrderStatuses,
  setMovies,
  setSeats,
  deleteOrder,
  updateOrder,
} from "./reducerSlice";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const movies = useSelector((state) => state.toolkit.movies);
  const seats = useSelector((state) => state.toolkit.seats);
  const orders = useSelector((state) => state.toolkit.orders);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/orders`, { headers: authHeader() }).then((resp) => {
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

  const deleteCart = (id) => {
    axios
      .delete(`${apiBase}/orders/${id}`, { headers: authHeader() })
      .then((resp) => {
        dispatch(deleteOrder(id));
      });
  };
  const payCart = () => {
    const ordersInCart = orders.filter((x) => x.status === 1);

    for (const oic of ordersInCart) {
      const id = oic.id;
      const tmp = { ...oic };
      tmp.status = 2;
      axios
        .put(`${apiBase}/orders/${id}`, tmp, { headers: authHeader() })
        .then((resp) => {
          dispatch(updateOrder(tmp));
        });
    }
  };

  return (
    <div className="mb-5">
      <h3>Корзина</h3>


      {orders.length > 0 &&
        movies.length > 0 &&
        orderStatuses.length > 0 &&
        seats.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Фильм</th>
                <th>Место</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders
                  .filter((x) => x.status === 1)
                  .map((x) => {
                    const s = seats.find((el) => +el.id === x.seat_id);

                    return (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>
                          {orderStatuses &&
                            orderStatuses.find((e) => +e.val === +x.status)
                              ?.name}
                        </td>
                        <td>
                          {movies.find((el) => +el.id === x.movie_id).name}
                        </td>
                        <td>{`Зал ${s.hall} ряд ${s.row} место ${s.number}`}</td>
                        <td>
                          <Button
                            variant="danger"
                            style={{
                              color: "transparent",
                              textShadow: "0 0 0 white",
                            }}
                            onClick={() => deleteCart(x.id)}
                          >
                            &#10006;
                          </Button>
                        </td>
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

      <Form.Group className="mb-3">
        <Button variant="primary" onClick={payCart}>
          Оплатить заказ
        </Button>
      </Form.Group>
    </div>
  );
};

export default Component;
