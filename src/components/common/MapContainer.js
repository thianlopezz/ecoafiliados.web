import React, { Component, createRef } from 'react';
const GOOGLE_MAP_API_KEY = 'AIzaSyB0gLcuepbnqwTpe66w0IW2IIavCxP83Rw';
class MapContainer extends Component {
  googleMapRef = React.createRef();

  constructor(props) {
    super(props);

    this.createGoogleMap = this.createGoogleMap.bind(this);
  }

  componentDidMount() {
    const { center = {}, onCenterChange } = this.props;

    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap();

      this.marker = this.createMarker(
        center.lat || -0.3830876,
        center.lng || -90.983792
      );

      this.eventOnChange = this.googleMap.addListener(
        'center_changed',
        () => onCenterChange && onCenterChange(this.googleMap.getCenter())
      );
    });
  }

  componentDidUpdate() {
    const { onCenterChange } = this.props;

    if (this.eventOnChange) {
      this.eventOnChange.remove();
      this.eventOnChange = this.googleMap.addListener(
        'center_changed',
        () => onCenterChange && onCenterChange(this.googleMap.getCenter())
      );
    }

    if (this.googleMap) {
      this.googleMap.setZoom(this.props.zoom);
    }

    if (this.marker) {
      this.marker.setPosition(this.props.center);
    }
  }

  createGoogleMap = () => {
    const { center = {}, zoom } = this.props;

    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: zoom || 8,
      center: {
        lat: center.lat || -0.3830876,
        lng: center.lng || -90.983792,
      },
      // disableDefaultUI: true,
    });
  };

  createMarker = (lat, lng) => {
    return new window.google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap,
    });
  };

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

export default MapContainer;
