import "./UserItem.css";
import Avatar from "../../Shared/components/UI Element/Avatar";
import { Link } from "react-router-dom";
import Card from "../../Shared/components/UI Element/Card";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_BACKEND_URL_API}/${props.image}`}
              alt={props.name}
            />
          </div>

          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount}
              {props.placeCount == 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
