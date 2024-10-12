import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { cityBorderCoords, cityBorderCoordsLatLon, pointsOfInterest, markerBounds, shadowOffset } from '../constants/constants';

const Map = () => {
  const [messages, setMessages] = useState([]);
  const messageBoxRef = useRef(null);
  const mapRef = useRef(null);
  let lastTimeStamp = useRef(0)
  let  messagesRef = useRef([]);
  const markerImage = require('../../assets/marker-icon-2x-green.png');
  const markerShadowImage = require('../../assets/marker-shadow.png')
  const prevScrollHeight = useRef(0)
  const prevScrollTop = useRef(0)
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleScrollEndDrag = (event) => {
    // Access the content offset
    const { contentOffset, layoutMeasurement } = event.nativeEvent;

    console.log('Scroll Ended');
    console.log('Content Offset:', contentOffset);
    console.log('Layout Measurement:', layoutMeasurement);
    console.log("the nativeEventContentSize.height is:  ", event.nativeEvent.contentSize.height);


    // You can check if the scroll is near the bottom to fetch more data, etc.
    const isNearBottom = contentOffset.y + layoutMeasurement.height >= event.nativeEvent.contentSize.height - 50;

    if (isNearBottom) {
      console.log('Near the bottom of the ScrollView!');
      // Fetch more data or perform an action
    }
  };

  const handleContentSizeChange = (contentWidth, newContentHeight) => {
    
    console.log("newContentHeight is: " + newContentHeight)
    console.log("scrollY is: " + (scrollY + 400 + 50))
    console.log("contentHeight is: " + contentHeight)
    let scrollHeightMeasure = 0;
    // messageBoxRef.current.measure((x, y, width, height) => {
    //   scrollHeightMeasure = height
    // });
    // console.log("messageBoxRef.current.measure.height is: " + scrollHeightMeasure)
    // console.log("scrollY + messageBoxRef.current.measure.height is: " + scrollY + messageBoxRef.current.measure.height)
    // Automatically scroll to bottom if near the bottom
    if (scrollY + 400 + 50 >= contentHeight) {
      messageBoxRef.current.scrollToEnd({ animated: true });
      setScrollY(newContentHeight)
    }
    setContentHeight(newContentHeight);
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY); // Update current scroll position
  };

  useEffect(() => {
    if (!messageBoxRef.current) return 
    // console.log("======================================================================================")
    // console.log("messagesRef.current.scrollHeight: ",  messagesRef.current.scrollHeight)
    // console.log("messagesRef.current.scrollTop: ", messagesRef.current.scrollTop)
    // console.log("prevScrollTop.current: ", prevScrollTop.current)
    // console.log("prevScrollHeight.current: ", prevScrollHeight.current)
    // console.log("======================================================================================")

    // messageBoxRef.current.scrollToEnd({ animated: true });
    if (messageBoxRef.current.scrollTop - prevScrollTop.current >= -10) {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        prevScrollTop.current = messageBoxRef.current.scrollTop
    }
    else{
      prevScrollTop.current = prevScrollTop.current + messageBoxRef.current.scrollHeight - prevScrollHeight.current
    }
    prevScrollHeight.current = messageBoxRef.current.scrollHeight
}, [messages]);

  useEffect(() => {
    // const updateGateIcon = (gateName, newIcon) => {
    //   setGateIcons((prevIcons) => prevIcons.map((icon, index) => pointsOfInterest[index].name === gateName ? newIcon :icon))
    // }


    // const decideGatesStatusByMessage = (messageStr) => {
    //   let gateStatuses = {}
    //   pointsOfInterest.forEach(gateData => {
    //     let isBadWordFound = false
    //     gateData.name_hb.forEach(hbName => {
    //       badWords.forEach(badWord => {
    //         if (messageStr.includes(hbName + badWord) || messageStr.includes(hbName + " " + badWord)) {
    //           gateStatuses[gateData.name] =  "red"
    //           isBadWordFound = true
    //         }
    //       })
    //       if (!isBadWordFound){
    //         goodWords.forEach(goodWord => {
    //           if (messageStr.includes(hbName + goodWord) || messageStr.includes(hbName + " " + goodWord)) {
    //             gateStatuses[gateData.name] = "green"
    //           }
    //         })
    //       }
    //     })
    //   })
    //   return gateStatuses
    // }
    // const decideGateStatusesFromTime = (fromTime) => {
    //   let gateStatuses = {}
    //   pointsOfInterest.forEach(gateData => {
    //     gateStatuses[gateData.name] = ""
    //   })
    //   let startIndex = messagesRef.current.length
    //   for (let i = messagesRef.current.length - 1; i >= 0; i--) {
    //     if (messagesRef.current[i][0] >= fromTime)
    //       startIndex = i
    //   }
    //   if (startIndex == messagesRef.current.length)
    //     return gateStatuses

    //   for (let i = startIndex; i < messagesRef.current.length; i++) {
    //     let message = messagesRef.current[i]
    //     try {
    //       if (message.length >= 2)
    //           gateStatuses = {...gateStatuses, ...decideGatesStatusByMessage(message[1].body)}
    //     }
    //     catch (error){
    //       console.log("error deciding gate statuses: " + error)
    //     }
    //   }
    //   return gateStatuses
    // }
    
    //   const getMarkerIconByColor = (color) => {
    //     return new L.Icon({
    //       iconUrl: require('leaflet/dist/images/marker-icon-' + color + '.png'),
    //       shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    //       iconSize: [25, 41],
    //       iconAnchor: [12, 41],
    //       popupAnchor: [1, -34],
    //     })

    // };
  
    const fetchWithTimeout = (url, options, timeout = 5000) => {
      return Promise.race([
          fetch(url, options),
          new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Request timed out')), timeout)
          )
      ]);
  };


  
    const fetchMarkerData = async () => {
      // try {
        const response = await fetchWithTimeout('http://192.168.50.217:3001/' + lastTimeStamp.current, { method: 'GET' });
        const data = await response.json();
        messagesRef.current = [...messagesRef.current, ...data]
        lastTimeStamp.current = messagesRef.current[messagesRef.current.length - 1][0]
        // console.log("the messages are: ")
        // console.log(messagesRef.current)
        // let currentTime = new Date()
        // let tenMinutesAgo = Math.floor(currentTime.getTime() / 1000) - 10 * 60
        // let gateStatuses = decideGateStatusesFromTime(tenMinutesAgo)
        // pointsOfInterest.forEach(gate => {
        //   if (gateStatuses[gate.name])
        //     updateGateIcon(gate.name, getMarkerIconByColor(gateStatuses[gate.name]))
        // })
      setMessages(messagesRef.current)
      // } catch (error) {
        // console.error('Error fetching markers:', error);
      // }
    };
    fetchMarkerData();

    const intervalId = setInterval(() => {
      fetchMarkerData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>

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
        <Polygon coordinates={cityBorderCoordsLatLon} strokeColor="blue" fillColor="rgba(173, 216, 230, 0.5)" />

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
            image={markerImage}
          >

          </Marker>
        ))}

       {/* {markerBounds.map((bounds, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: bounds.bounds[0][0], longitude: bounds.bounds[0][1] }} // Adjust to fit your bounds
            image={markerShadowImage}
          >
          </Marker>
        ))} */}

        {markerBounds.map((bounds, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: bounds.bounds[1][0], longitude: bounds.bounds[1][1] }} // Adjust to fit your bounds
          >
         <View style={styles.boundsMarker}>
              <Text style={styles.boundsText}>{bounds.text}</Text>
            </View>
          </Marker>
        ))}



      </MapView>
      <ScrollView style={styles.messageBox} onScroll={handleScroll} onContentSizeChange={handleContentSizeChange} onScrollEndDrag={handleScrollEndDrag} ref={messageBoxRef}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text>{msg[1].body}</Text>
          </View>
        ))}
      </ScrollView>
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
    top: 20, // Position the box
    left: 20, // Position the box
    width: 300, // Fixed width of the message box
    height: 400, // Fixed height of the message box
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden', // Enable vertical scrolling
    padding: 0, // Padding inside the box
    elevation: 4, // Shadow on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 8, // Shadow radius for iOS
    zIndex: 1000, // Make sure it's above the map
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