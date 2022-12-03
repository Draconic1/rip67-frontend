import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import {setMovies} from "./reducerSlice";
import authHeader from "../services/auth-header";



const Component = () => {
    const apiBase = useSelector((state) => state.toolkit.apiBase);
    const movies = useSelector((state) => state.toolkit.movies);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.toolkit.isLoggedIn);


    useEffect(() => {
        axios.get(`${apiBase}/movies`, {headers: authHeader()}).then((resp) => {
            dispatch(setMovies(resp.data));
        });
    }, [apiBase, dispatch]);


        return (
            <>
                <h1>Сегодня в кино</h1>
                <div className='Row' style={{
                    display: 'flex',
                    overflow: 'auto'
                }}>
                    {movies &&
                        movies.map((x) => (
                            <Col key={x.id} md="4" xl="3">
                                <Card style={{width: "100%", height: '100%', padding: '10px'}}>
                                    <Card.Img variant="top" src={`${x.image}`}/>
                                    <Card.Body>
                                        <Card.Title>{x.name}</Card.Title>
                                        <Card.Text>{x.description}</Card.Text>
                                        <ButtonGroup>
                                            <Button
                                                variant="outline-primary"
                                                as={Link}
                                                to={`info/${x.id}`}
                                            >
                                                О фильме
                                            </Button>
                                            {isLoggedIn && (
                                                <Button variant="primary" as={Link} to={`order/${x.id}`}>
                                                    Купить билет
                                                </Button>
                                            )}
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    {!movies && (
                        <>
                            <h3>В данный момент сеансов нет</h3>
                            <p>Если вы администратор - добавьте сеансы</p>
                        </>
                    )}
                </div>
            </>
        );
    };

    export default Component;
