import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.toolkit.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.username}</strong> Имя пользователя
        </h3>
      </header>
      <p>
        <strong>Токен:</strong> {user.accessToken.substring(0, 20)} ...{" "}
        {user.accessToken.substr(user.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Электронная почта:</strong> {user.email}
      </p>
      <strong>Права доступа:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
