import classes from "./PlaceItem.module.css";
import Card from "../../Shared/components/UI Element/Card";
import Button from "../../Shared/components/FormElements/Button";
import React, { useContext } from "react";
import Modal from "../../Shared/components/UI Element/Modal";
import Map from "./Map";
import authContext from "../../Shared/context/context";
import { useState } from "react";
import useHttps from "../../Shared/useHooks/useHttps";
import LoadingSpinner from "../../Shared/components/UI Element/LoadingSpinner";
import ErrorModal from "../../Shared/components/UI Element/ErrorModal";
import { useHistory } from "react-router-dom";

const PlaceItem = (props) => {
  const Ctx = useContext(authContext);
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [showDeletionModal, setDeletionModal] = useState(false);
  const { request, clearErrorHandler, error, isLoading } = useHttps();

  const OpenModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openDeletModalHandler = () => {
    setDeletionModal(true);
  };
  const closeDeletModalHandler = () => {
    setDeletionModal(false);
  };

  const confirmDeletionHandler = async () => {
    setDeletionModal(false);
    console.log(props.id);
    try {
      await request(
        `${process.env.REACT_APP_BACKEND_URL_API_REST}/places/${props.id}`,
        "DELETE",
        { authorization: "Bearer " + Ctx.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
    console.log("deleted");
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={props.address}
        contentClass={classes["place-item__modal-content"]}
        footerClass={classes["place-item__modal-actions"]}
        footer={<Button onClick={closeModalHandler}>CLOSE</Button>}
      >
        <div className={classes["map-container"]}>
          <Map coordinates={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeletionModal}
        header="Are you sure?"
        footerClass={classes[".place-item__modal-actions"]}
        footer={
          <React.Fragment>
            <Button onClick={closeDeletModalHandler} inverse>
              Cancel
            </Button>
            <Button danger onClick={confirmDeletionHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed? This can not be undone.</p>
      </Modal>

      <li className={classes["place-item"]}>
        <Card className={classes["place-item__content"]}>
          <div className={classes["place-item__image"]}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL_API}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className={classes["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes["place-item__actions"]}>
            <Button onClick={OpenModalHandler} inverse>
              View on map
            </Button>
            {Ctx.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {Ctx.userId === props.creatorId && (
              <Button onClick={openDeletModalHandler} danger>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
