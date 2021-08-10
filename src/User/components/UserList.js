import classes from "./UserList.module.css";
import UserItem from "./UserItem";
import Card from '../../Shared/components/UI Element/Card'

const UserList = (props) => {
  if (props.items.length === 0) {
    return <div className="center"><Card><h2>No users found</h2></Card></div>;
  }

  return (
    <ul className={classes['users-list']}>
      {props.items.map((item) => (
        <UserItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          placeCount={item.place}
        />
      ))}
    </ul>
  );
};

export default UserList;
