import './PlaceList.css';
import PlaceItem from "./PlaceItem";
import React from 'react'
import Button from '../../Shared/components/FormElements/Button'
import Card from '../../Shared/components/UI Element/Card'



const PlaceList = (props) => {

  
  
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
      <Card>
        <h2>No places found. Maybe create one?</h2>
        <Button to='/places/new'>sharePlace</Button>
        </Card>
      </div>
    );
  }

  return (
   
    <ul className='place-list'>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
    
  );
};

export default PlaceList;
