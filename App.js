/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios'
import Geolocation from '@react-native-community/geolocation';

function App() {
  const SK_API_KEY = "l7xxb0267913faf84de39d5c80d951a60836"
  const [clatitude, setClatitude] = useState(37.512992);
  const [clongitude, setClongitude] = useState(126.7063177);
  const [address, setAddress] = useState({});
  const [csData, setCSData] = useState([]);
  const getAddress = () => {
    axios
      .get('https://apis.openapi.sk.com/tmap/geo/reversegeocoding', {
        params: {
          version: 1,
          lat: latitude.toString(),
          lon: longitude.toString(),
          appKey: SK_API_KEY,
          format: "json",
          callback: "result",
        } 
      })
      .then(function(response) {
        setAddress(response.data);
//        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log("error!!!");
      })
      .finally(function() {
        console.log("finally Called")
      });
  };

  const getCSData = () => {
    axios
      .get('https://apis.openapi.sk.com/tmap/pois', {
        params: {
          version: 1,
          count: 1,
          searchKeyword: "전기차충전소",
          centerLat: clatitude.toString(),
          centerLon: clongitude.toString(),
          appKey: SK_API_KEY,
        } 
      })
      .then(function(response) {
        setCSData(response.data.searchPoiInfo.pois.poi);
//        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log("error!!!");
      })
      .finally(function() {
        console.log("finally Called")
      });
  };


  const firstAddress = axios.get('https://apis.openapi.sk.com/tmap/geo/reversegeocoding', {
    params: {
      version: 1,
      lat: clatitude.toString(),
      lon: clongitude.toString(),
      appKey: SK_API_KEY,
      format: "json",
      callback: "result",
    } 
  })

  const secondCSData = axios.get('https://apis.openapi.sk.com/tmap/pois', {
    params: {
      version: 1,
      count: 1,
      searchKeyword: "전기차충전소",
      centerLat: clatitude.toString(),
      centerLon: clongitude.toString(),
      appKey: SK_API_KEY,
    } 
  })


      
  useEffect( () => {

    Geolocation.getCurrentPosition(
      position => {
        /* setClatitude(position.coords.latitude);
        setClongitude(position.coords.longitude); */
        console.log(position.coords.longitude);
        console.log(position.coords.latitude);
        setClatitude(position.coords.latitude);
        setClongitude(position.coords.longitude);
      }
      /*axios
        .all([firstAddress, secondCSData])
        .then(
          axios.spread((...response) => {
            const first = response[0].data;
            const second = response[1].data;
            console.log("ADDRESS*************************")
            console.log(JSON.stringify(first));
            console.log("CSInfo*************************")
            console.log(JSON.stringify(second));
          })
        )
        .catch(erros => {
          console.log("error")
        }) */
    );
  }, []);
  
  return (
    <View>
      {console.log("in Return!!!!")}
      {console.log("in Return Address!!!")}
      <Text>This is Test</Text>
      {/* <Text>{posts.addressInfo.fullAddress}</Text> */}
    </View>
  )
}
 
export default App;
