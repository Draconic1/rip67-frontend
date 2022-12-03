import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    setOrders,
    setOrderStatuses,
    setMovies,
    setSeats,
} from "../reducerSlice";
import authHeader from "../../services/auth-header";

const OrderUser = () => {
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

        </div>
    );


export default OrderUser;
