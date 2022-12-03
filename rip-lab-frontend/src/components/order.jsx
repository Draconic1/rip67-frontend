import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { setSeats, setOrderStatuses, addOrder } from "./reducerSlice";
import authHeader from "../services/auth-header";

const Component = () => {
  let { id } = useParams();

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const seats = useSelector((state) => state.toolkit.seats);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/seats`, { headers: authHeader() }).then((resp) => {
      dispatch(setSeats(resp.data));
    });

    axios
      .get(`${apiBase}/orders/info/statuses`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrderStatuses(resp.data));
      });
  }, [apiBase, dispatch]);

  const selectSeats = (id) => {
    const idx = selected.findIndex((x) => +x === +id);
    if (idx > -1) {
      selected.splice(idx, 1);
      const tmpSelected = selected.slice(0, selected.length);
      setSelected(tmpSelected);
    } else {
      const tmpSelected = selected.slice(0, selected.length);
      tmpSelected.push(+id);
      setSelected(tmpSelected);
    }
  };

  const addCart = () => {
    const status = orderStatuses.find((x) => x.name === "В корзине").val;

    for (const s of selected) {
      axios
        .post(
          `${apiBase}/orders`,
          {
            status: +status,
            movie_id: +id,
            seat_id: +s,
          },
          { headers: authHeader() }
        )
        .then((resp) => {
          dispatch(addOrder(resp.data));
        });
    }
  };

  return (
    <>
      <h1>Выбор места</h1>
      <hr />
      <Row>
        <Col>
          <div className="border rounded mb-3 p-2">
            {seats &&
              seats.map((x) => (
                <Button
                  key={x.id}
                  variant="outline-success"
                  className="m-1"
                  onClick={(e) => selectSeats(x.id)}
                  active={selected.findIndex((el) => +el === +x.id) > -1}
                >
                  {`Зал ${x.hall} ряд ${x.row} место ${x.number}`}<p>{`${x.price}руб.`}</p>
                </Button>
              ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" type="button" onClick={addCart}>
            Добавить в корзину
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Component;
