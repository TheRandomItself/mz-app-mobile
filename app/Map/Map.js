import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { cityBorderCoords, pointsOfInterest, markerBounds } from '../constants/constants';

const Map = () => {
  const [messages, setMessages] = useState([]);
  const messageBoxRef = useRef(null);
  const mapRef = useRef(null);

  // useEffect(() => {
  //   // Fetch messages or any required data here
  //   const fetchData = async () => {
  //     // Example fetch logic
  //     const response = await fetch('http://your-api-endpoint');
  //     const data = await response.json();
  //     setMessages(data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <View style={styles.container}>
            <Text>helloooooooooooooooooooo</Text>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 32.0749462988577,
          longitude: 34.78718205370926,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* <Polygon coordinates={cityBorderCoords} strokeColor="blue" fillColor="rgba(173, 216, 230, 0.5)" /> */}

        {/* {pointsOfInterest.map((point, index) => (
          <Marker
            key={index}
            coordinate={point.position}
            title={point.name}
          />
        ))} */}

        {markerBounds.map((bounds, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: bounds.bounds[0][0], longitude: bounds.bounds[0][1] }} // Adjust to fit your bounds
          >
            <View style={styles.boundsMarker}>
              <Text style={styles.boundsText}>{bounds.text}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* <ScrollView style={styles.messageBox} ref={messageBoxRef}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text>{msg[1].body}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  messageBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'white',
    padding: 10,
    elevation: 3,
  },
  message: {
    padding: 5,
  },
  boundsMarker: {
    backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'center',
    // zIndex: 1000,
  },
  boundsText: {
    color: 'white',
  },
});

export default Map;