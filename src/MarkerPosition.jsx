// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import icon from "./icon"
import PropTypes from 'prop-types';

export default function MarkerPosition ({ address }) {
  return (
    <>
        <Marker icon={icon} position={[address.location.lat, address.location.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </>
  )
}

MarkerPosition.propTypes = {
  address: PropTypes.string.isRequired,
};


