// // import { MapContainer, TileLayer, Polygon, Marker, Popup, SVGOverlay  } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
// import { center, cityBorderCoords, pointsOfInterest, markerBounds, defaultIcon, badWords, goodWords } from '../constants/constants';
// import MapView, { Marker, Polygon } from 'react-native-maps';
// import DraggableMarker from '../DraggableMarker/DraggableMarker';
// // import L, { point } from 'leaflet';
// import './Map.css';

// const Map = () => {
//   const [messages, setMessages] = useState([]);
//   const [lastMessageTIme, setLastMessageTime] = useState(0)
//   const [gateIcons, setGateIcons] = useState(Array(pointsOfInterest.length).fill(defaultIcon));
//   const [dimensions, setDimensions] = useState({ width: 300, height: 400 });
//   const messageBoxRef = useRef(null);
//   const prevScrollHeight = useRef(0)
//   const prevScrollTop = useRef(0)
//   const [messageBoxScroll, setMessageBoxScroll] = useState(null)
//   let  messagesRef = useRef([]);
//   let lastTimeStamp = useRef(0)


//   useEffect(() => {
//     if (!messageBoxRef.current) return 
//     if (messageBoxRef.current.scrollTop - prevScrollTop.current >= -5) {
//         messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
//         prevScrollTop.current = messageBoxRef.current.scrollTop
//     }
//     else{
//       prevScrollTop.current = prevScrollTop.current + messageBoxRef.current.scrollHeight - prevScrollHeight.current
//     }
//     prevScrollHeight.current = messageBoxRef.current.scrollHeight
// }, [messages]);

//     useEffect(() => {
//       const updateGateIcon = (gateName, newIcon) => {
//         setGateIcons((prevIcons) => prevIcons.map((icon, index) => pointsOfInterest[index].name === gateName ? newIcon :icon))
//       }


//       const decideGatesStatusByMessage = (messageStr) => {
//         let gateStatuses = {}
//         pointsOfInterest.forEach(gateData => {
//           let isBadWordFound = false
//           gateData.name_hb.forEach(hbName => {
//             badWords.forEach(badWord => {
//               if (messageStr.includes(hbName + badWord) || messageStr.includes(hbName + " " + badWord)) {
//                 gateStatuses[gateData.name] =  "red"
//                 isBadWordFound = true
//               }
//             })
//             if (!isBadWordFound){
//               goodWords.forEach(goodWord => {
//                 if (messageStr.includes(hbName + goodWord) || messageStr.includes(hbName + " " + goodWord)) {
//                   gateStatuses[gateData.name] = "green"
//                 }
//               })
//             }
//           })
//         })
//         return gateStatuses
//       }
//       const decideGateStatusesFromTime = (fromTime) => {
//         let gateStatuses = {}
//         pointsOfInterest.forEach(gateData => {
//           gateStatuses[gateData.name] = ""
//         })
//         let startIndex = messagesRef.current.length
//         for (let i = messagesRef.current.length - 1; i >= 0; i--) {
//           if (messagesRef.current[i][0] >= fromTime)
//             startIndex = i
//         }
//         if (startIndex == messagesRef.current.length)
//           return gateStatuses

//         for (let i = startIndex; i < messagesRef.current.length; i++) {
//           let message = messagesRef.current[i]
//           try {
//             if (message.length >= 2)
//                 gateStatuses = {...gateStatuses, ...decideGatesStatusByMessage(message[1].body)}
//           }
//           catch (error){
//             console.log("error deciding gate statuses: " + error)
//           }
//         }
//         return gateStatuses
//       }
      
//         const getMarkerIconByColor = (color) => {
//           return new L.Icon({
//             iconUrl: require('leaflet/dist/images/marker-icon-' + color + '.png'),
//             shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//             iconSize: [25, 41],
//             iconAnchor: [12, 41],
//             popupAnchor: [1, -34],
//           })

//       };
    
//       const fetchWithTimeout = (url, options, timeout = 5000) => {
//         return Promise.race([
//             fetch(url, options),
//             new Promise((_, reject) =>
//                 setTimeout(() => reject(new Error('Request timed out')), timeout)
//             )
//         ]);
//     };


    
//       const fetchMarkerData = async () => {
//         try {
//           const response = await fetchWithTimeout('http://localhost:3001/' + lastTimeStamp.current, { method: 'GET' });
//           const data = await response.json();
//           messagesRef.current = [...messagesRef.current, ...data]
//           lastTimeStamp.current = messagesRef.current[messagesRef.current.length - 1][0]
//           // updateGateIcon(pointsOfInterest[count.current %  pointsOfInterest.length].name, Math.floor((count.current / pointsOfInterest.length)) % 2 == 0 ?   getMarkerIconByColor('green') : getMarkerIconByColor('red'))
//           let currentTime = new Date()
//           let tenMinutesAgo = Math.floor(currentTime.getTime() / 1000) - 10 * 60
//           let gateStatuses = decideGateStatusesFromTime(tenMinutesAgo)
//           pointsOfInterest.forEach(gate => {
//             if (gateStatuses[gate.name])
//               updateGateIcon(gate.name, getMarkerIconByColor(gateStatuses[gate.name]))
//           })
//           setMessages(messagesRef.current)
//         } catch (error) {
//           console.error('Error fetching markers:', error);
//         }
//       };
//       fetchMarkerData();

//       const intervalId = setInterval(() => {
//         fetchMarkerData();
//       }, 1000);
  
//       return () => clearInterval(intervalId);
//     }, []);


//   return (
//     <>
//     <MapContainer
//       center={[32.0749462988577, 34.78718205370926]}
//       zoom={17}
//       style={{ height: "100vh", width: "100%" }}
//     >

//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Polygon positions={cityBorderCoords} color="blue" fillColor="lightblue" fillOpacity={0.5} />
//       {pointsOfInterest.map((point, index) => (
//         <Marker key={index} position={point.position} icon={gateIcons[index]}>
//         <Popup>{point.name}</Popup>
//       </Marker>
        
//       ))}

//       {markerBounds.map((bounds, index) => (
//       <SVGOverlay key={index} bounds={bounds.bounds}>
//       <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
//       <text x="10%" y="10%" stroke="blue">
//         {bounds.text}
//       </text>
//     </SVGOverlay>
//           ))}
//     {/* <DraggableMarker /> */}
//     <div className="message-box" ref={messageBoxRef}>
//       <div className="messages">
//           {messages.map((msg, index) => (
//             <div key={index} className="message">{msg[1].body}</div>
//           ))}
//       </div>
//       {/* <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown}></div> */}
//     </div>
//     </MapContainer>

//     </>
//   );
// };

// export default Map;

