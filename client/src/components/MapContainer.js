import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import marker from "../marker.svg"
const demoFancyMapStyles = require("../MapStyles.json");
 
export class MapContainer extends Component {

render() {
      const style = {
      width: '86%',
      height: '400px'
    }

    return (
      <Map 
        google={this.props.google} 
        style={style}
        zoom={12}
        styles={demoFancyMapStyles}
        center={{ lat: this.props.lat , lng: this.props.lng }}
        >
        <Marker position={{ lat: this.props.lat , lng: this.props.lng }}
          icon={{ url: marker }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2PXpY9m7cUzNbyLzenp9w2Q436QKvYzI"
})(MapContainer)