import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { addMovie, setMovies } from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const defNewMovie = {
    name: "",
    description: "",
    genres: "",
    country: "",
    year: "",
    image: "",
  };

  const [newMovie, setNewMovie] = useState(defNewMovie);
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const movies = useSelector((state) => state.toolkit.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/movies`, { headers: authHeader() }).then((resp) => {
      dispatch(setMovies(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/movies`, newMovie, { headers: authHeader() }).then((resp) => {
      dispatch(addMovie(resp.data));
      setNewMovie(defNewMovie);
    });
  };

  const handleChange = (e) => {
    const newMovieTmp = { ...newMovie };

    newMovieTmp[e.target.name] = e.target.value;

    setNewMovie(newMovieTmp);
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список фильмов</h3>

      {movies && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Жанры</th>
              <th>Страна</th>
              <th>Год</th>
              <th>Постер</th>
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
                    <td>{x.image}</td>
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
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить новый фильм</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Название фильма"
                value={newMovie.name}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Название нового фильма
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Описание фильма"
                value={newMovie.description}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Длинное описание нового фильма
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Жанры</Form.Label>
              <Form.Control
                type="text"
                name="genres"
                placeholder="Жанры фильма"
                value={newMovie.genres}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Жанры нового фильма</Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Страна</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Страна фильма"
                value={newMovie.country}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Страна нового фильма</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Год</Form.Label>
              <Form.Control
                type="number"
                name="year"
                placeholder="Год релиза фильма"
                value={newMovie.year}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Год релиза нового фильма
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Постер (ссылка)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Постер (ссылка)"
                value={newMovie.image}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Ссылка на постер нового фильма
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
