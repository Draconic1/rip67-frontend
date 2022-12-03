import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import authHeader from "../services/auth-header";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);

  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);

  const find = () => {
    axios.get(`${apiBase}/movies/?name=${encodeURIComponent(name)}`, { headers: authHeader() }).then((resp) => {
      setMovies(resp.data);
    });
  };

  return (
    <>
      <h1>Поиск фильма</h1>
      <Form.Group className="mb-3">
        <Form.Label>Название для поиска</Form.Label>
        <Form.Control
          type="text"
          placeholder="Название фильма для поиска"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Text className="text-muted">Название фильма для поиска</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="primary" type="submit" onClick={find}>
          Найти
        </Button>
      </Form.Group>

      <h4>Результаты поиска</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Жанры</th>
            <th>Страна</th>
            <th>Год</th>
            <th>Билеты</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 &&
            movies.map((x) => {
              return (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.description}</td>
                  <td>{x.genres}</td>
                  <td>{x.country}</td>
                  <td>{x.year}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="outline-primary"
                        as={Link}
                        to={`info/${x.id}`}
                      >
                        О фильме
                      </Button>
                      <Button variant="primary" as={Link} to={`order/${x.id}`}>
                        Купить билет
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          {!movies.length && (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Component;
