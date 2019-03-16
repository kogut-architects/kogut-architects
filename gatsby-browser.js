exports.onPreRouteUpdate = ({ location, prevLocation }) => {
  
  console.log("Gatsby started to change location to", location.pathname)
  console.log("Gatsby started to change location from", prevLocation ? prevLocation.pathname : null)
}