import { useState } from "react";
import Nav from "react-bootstrap/Nav";

import Movies from "./admin/movies";
import Orders from "./admin/orders";
import Seats from "./admin/seats";

const Component = () => {
  const [selectedTab, setSelectedTab] = useState("Movies");

  const handleChange = (eventKey) => {
    setSelectedTab(eventKey);
  };

  return (
    <>
      <h2>Интерфейс администратора</h2>
      <Nav variant="tabs" defaultActiveKey="/home" onSelect={handleChange}>
        <Nav.Item>
          <Nav.Link eventKey="Movies" active={selectedTab === "Movies"}>
            Фильмы
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Seats" active={selectedTab === "Seats"}>
            Места
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Orders" active={selectedTab === "Orders"}>
            Заказы
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === "Movies" && <Movies />}
      {selectedTab === "Seats" && <Seats />}
      {selectedTab === "Orders" && <Orders />}
    </>
  );
};

export default Component;
