import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import marker from "../marker.svg"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const demoFancyMapStyles = require("../MapStyles.json");


class ShowJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
      company: '',
      location: '',
      lat: '',
      lng: '',
      description: '',
      salary: '',
    };
  }

  componentDidMount() {
    fetch(`/jobs/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => this.setState({
        position: json.position,
        company: json.company,
        location: json.location,
        lat: json.lat,
        lng: json.lng,
        description: json.description,
        salary: json.salary,
      }));
  }

  render() {
    console.log(Number(this.state.lat))
    console.log(this.state.lng)
    const MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
        defaultOptions={{ styles: demoFancyMapStyles }}
      >
        <Marker position={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
        options={{ icon: marker }} />
      </GoogleMap>
    )
    return (
    <div>
      <div className="jobList">
        <h2 className="activity">{this.state.position.toUpperCase()}</h2><br />
        <div className="jobs">
          <div className="job">
            <p>{this.state.company} - {this.state.location}</p>
            <p className="description">{this.state.description}</p>
            <p>{this.state.salary}</p>
            <p>{this.state.created_at}</p>
          </div>
        </div>
      </div>
        <div className="map">
            <MyMapComponent />
        </div>
    </div>
    );
  }
}


export default ShowJob;
