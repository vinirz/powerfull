"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native"
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"

export default function TrackingScreen() {
  const [isTracking, setIsTracking] = useState(false)
  const [routeName, setRouteName] = useState("")
  const [locations, setLocations] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const mapRef = useRef(null)
  const timerRef = useRef(null)
  const locationSubscription = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Permissão para acessar a localização foi negada")
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setCurrentLocation(location.coords)
    })()

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTracking = async () => {
    if (!routeName.trim()) {
      Alert.alert("Nome do percurso", "Por favor, dê um nome ao seu percurso")
      return
    }

    setIsTracking(true)
    setLocations([])
    setDistance(0)
    setStartTime(new Date())
    setElapsedTime(0)

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 5000,
      },
      (location) => {
        const newLocation = location.coords
        setCurrentLocation(newLocation)

        setLocations((prevLocations) => {
          const newLocations = [...prevLocations, newLocation]

          if (newLocations.length > 1) {
            const lastIndex = newLocations.length - 1
            const newDistance = calculateDistance(
              newLocations[lastIndex - 1].latitude,
              newLocations[lastIndex - 1].longitude,
              newLocations[lastIndex].latitude,
              newLocations[lastIndex].longitude,
            )
            setDistance((prevDistance) => prevDistance + newDistance)
          }

          return newLocations
        })
      },
    )
  }

  const stopTracking = async () => {
    setIsTracking(false)
    
    if (locationSubscription.current) {
      locationSubscription.current.remove()
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (locations.length < 2) {
      Alert.alert("Percurso muito curto", "O percurso precisa ter pelo menos dois pontos")
      return
    }

    try {
      const endTime = new Date()
      const route = {
        id: Date.now().toString(),
        name: routeName,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: elapsedTime,
        distance,
        coordinates: locations,
      }

      const existingRoutes = await AsyncStorage.getItem("routes")
      const routes = existingRoutes ? JSON.parse(existingRoutes) : []
      routes.push(route)
      await AsyncStorage.setItem("routes", JSON.stringify(routes))

      Alert.alert("Sucesso", "Percurso salvo com sucesso!")
      setRouteName("")
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o percurso")
      console.error(error)
    }
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  global.fakeLocation = async () => {
    await Location.requestForegroundPermissionsAsync();
    
    const fakeDestination = {
      latitude: 37.7749, 
      longitude: -122.4194,
    };

    setCurrentLocation(fakeDestination);
  
    setLocations((prevLocations) => {
      const newLocations = [...prevLocations, fakeDestination];

      if (newLocations.length > 1) {
        const lastIndex = newLocations.length - 1;
        const newDistance = calculateDistance(
          newLocations[lastIndex - 1].latitude,
          newLocations[lastIndex - 1].longitude,
          newLocations[lastIndex].latitude,
          newLocations[lastIndex].longitude
        );
        setDistance((prevDistance) => prevDistance + newDistance);
      }

      return newLocations;
    });

    console.log("Destino fictício adicionado:", fakeDestination);
  }

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation
          followsUserLocation
        >
          {locations.length > 1 && <Polyline coordinates={locations} strokeColor="#3498db" strokeWidth={6} />}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Carregando mapa...</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Distância</Text>
            <Text style={styles.statValue}>{distance.toFixed(2)} km</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tempo</Text>
            <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
          </View>
        </View>

        {!isTracking ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome do percurso"
              value={routeName}
              onChangeText={setRouteName}
            />
            <TouchableOpacity style={styles.startButton} onPress={startTracking}>
              <Ionicons name="play" size={24} color="white" />
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={stopTracking}>
            <Ionicons name="stop" size={24} color="white" />
            <Text style={styles.buttonText}>Parar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  startButton: {
    flexDirection: "row",
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  stopButton: {
    flexDirection: "row",
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
})