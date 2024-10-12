// import L from 'leaflet';

export const center = {
    lat: 32.0749462988577,
    lng: 34.78718205370926,
  }
  
export const cityBorderCoords = [
    [32.07554717251997, 34.7844746812443],
    [32.07426118206054, 34.78471049206173],
    [32.07432467343758, 34.78597149842801],
    [32.07355655552431, 34.78596031280327],
    [32.07346556913161, 34.79019436511243],
    [32.07840195378189, 34.79290743074442],
  ];

  export const cityBorderCoordsLatLon = [
    {latitude: 32.07554717251997, longitude: 34.7844746812443},
    {latitude: 32.07426118206054, longitude: 34.78471049206173},
    {latitude: 32.07432467343758, longitude: 34.7859714984280},
    {latitude: 32.07355655552431, longitude: 34.78596031280327},
    {latitude: 32.07346556913161, longitude: 34.79019436511243},
    {latitude: 32.07840195378189, longitude: 34.79290743074442},
  ];
  
  // If you want to add a gate, add a new line to the pointsOfInterest and it will do the magic
export const pointsOfInterest = [
    { position: [32.07548376066005,  34.79071337991549], name: "begin", name_hb: ["ט", "ב"] },
    { position: [32.073674796781276,  34.78610477046914], name: "kaplan", name_hb: ["ק"] },
    { position: [32.07612473234684,  34.787204873205205], name: "shaul", name_hb: ["ש"] },
    { position: [32.07462023150681, 34.78471587382616], name: "leonardo", name_hb: ["ל"] },
];

export const badWords = ["מלוכלך", "מטונף", "מזוהם", "על הפרצוף"]
export const goodWords = ["נקי", "מצוחצך"]

const offset = 0.0004
console.log("creating marker bounds")
export const markerBounds = pointsOfInterest.map(point => {
  console.log({bounds: [point.position, [point.position[0] - offset, point.position[1] + offset]], text:  point.name })
    return {bounds: [point.position, [point.position[0] - offset, point.position[1] + offset]], text:  point.name }
  })

export const shadowOffset = 0.0001
// export const defaultIcon = new L.Icon({
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     // iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
//     // iconRetinaUrl: require('leaflet/dist/images/marker-icon-green.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//   })
  