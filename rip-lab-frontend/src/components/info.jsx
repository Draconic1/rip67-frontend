import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { setMovies } from "./reducerSlice";
import authHeader from "../services/auth-header";

const Component = () => {
  let { id } = useParams();

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const movies = useSelector((state) => state.toolkit.movies);
  const movie = movies.find((x) => +x.id === +id) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/movies`, { headers: authHeader() }).then((resp) => {
      dispatch(setMovies(resp.data));
    });
  }, [apiBase, dispatch]);

  return (
    <>
      <h1>{movie.name}</h1>
      <hr />
      <Row>
        <Col md="4" lg="3">
          <Image fluid="true" rounded="true" src={movie.image} />
        </Col>
        <Col md="6" lg="9">
          <p className="display-6">{movie.description}</p>

          <dl className="row">
            <dt className="col-sm-3">Страна</dt>
            <dd className="col-sm-9">{movie.country}</dd>

            <dt className="col-sm-3">Жанры</dt>
            <dd className="col-sm-9">{movie.genres}</dd>

            <dt className="col-sm-3">Год</dt>
            <dd className="col-sm-9">{movie.year}</dd>
          </dl>
        </Col>
      </Row>
    </>
  );
};

export default Component;
