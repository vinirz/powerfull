import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import gym from "../../lib/gym";

export default function MapScreen(){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function loadLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      alert(JSON.stringify(location.coords))
      setLocation(location.coords);
    }

    loadLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{ latitude: location?.latitude, longitude: location?.longitude }}
          title="Você"
          description="Voce está aqui!"
        />

        {
          gym.map((gym) => (
            <Marker
              key={gym.id}
              coordinate={{
                latitude: gym.location.latitude,
                longitude: gym.location.longitude,
              }}
              title={gym.name}
              description="Academia"
            />
          ))
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
