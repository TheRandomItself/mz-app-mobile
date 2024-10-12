// import { MapContainer, TileLayer, Polygon, Marker, Popup, SVGOverlay  } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
// import { center, cityBorderCoords, pointsOfInterest, markerBounds, defaultIcon } from '../constants/constants';


// function DraggableMarker() {
//   const [draggable, setDraggable] = useState(false)
//   const [position, setPosition] = useState(center)
//   const markerRef = useRef(null)
//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current
//         if (marker != null) {
//           console.log(marker.getLatLng())
//           setPosition(marker.getLatLng())
//         }
//       },
//     }),
//     [],
//   )
//   const toggleDraggable = useCallback(() => {
//     setDraggable((d) => !d)
//   }, [])

//   return (
//     <Marker
//       draggable={draggable}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//       icon={defaultIcon}>
//       <Popup minWidth={90}>
//         <span onClick={toggleDraggable}>
//           {draggable
//             ? 'Marker is draggable'
//             : 'Click here to make marker draggable'}
//         </span>
//       </Popup>
//     </Marker>
//   )
// }


// export default DraggableMarker;