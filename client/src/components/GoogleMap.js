// import React from "react"
// import { compose, withProps } from "recompose"
// import marker from "../marker.svg"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// const demoFancyMapStyles = require("../MapStyles.json");

// export const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={11}
//     defaultCenter={{ lat: 40.741355, lng: -74.003203 }}
//     defaultOptions={{ styles: demoFancyMapStyles }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: 40.741355, lng: -74.003203 }} onClick={props.onMarkerClick} />}
//     <Marker position={{ lat: 40.741355, lng: -74.003203 }}
//     options={{ icon: marker }} />
//   </GoogleMap>
// )
