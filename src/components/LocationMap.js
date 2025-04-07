import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import locationService from '../services/locationService';

const LocationMap = ({
  initialRegion,
  onLocationSelect,
  markerTitle = 'Selected Location',
  markerDescription = 'Your delivery location',
  mapHeight = 300,
  showCurrentLocation = true,
  style,
}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(
    initialRegion || {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Request location permission and get current position
  useEffect(() => {
    if (showCurrentLocation) {
      getCurrentLocation();
    }
  }, [showCurrentLocation]);

  const getCurrentLocation = async () => {
    try {
      // Check permission
      const permissionStatus = await locationService.requestLocationPermission();
      
      if (permissionStatus) {
        setLoading(true);
        
        // Get current position
        const position = await locationService.getCurrentPosition();
        
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        
        setRegion(newRegion);
        setSelectedLocation({ latitude, longitude });
        
        // Animate to current position
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion);
        }
        
        // Get address
        try {
          const formattedAddress = await locationService.getAddressFromCoordinates(
            latitude,
            longitude
          );
          setAddress(formattedAddress);
          
          // Callback with location data
          if (onLocationSelect) {
            onLocationSelect({
              latitude,
              longitude,
              address: formattedAddress,
            });
          }
        } catch (error) {
          console.error('Error getting address:', error);
        }
      }
    } catch (error) {
      console.error('Error getting current location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = async (event) => {
    try {
      const { coordinate } = event.nativeEvent;
      setSelectedLocation(coordinate);
      
      // Get address for selected coordinates
      setLoading(true);
      const formattedAddress = await locationService.getAddressFromCoordinates(
        coordinate.latitude,
        coordinate.longitude
      );
      
      setAddress(formattedAddress);
      
      // Callback with location data
      if (onLocationSelect) {
        onLocationSelect({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          address: formattedAddress,
        });
      }
    } catch (error) {
      console.error('Error handling map press:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { height: mapHeight }, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onPress={handleMapPress}
        showsUserLocation={showCurrentLocation}
        showsMyLocationButton={showCurrentLocation}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title={markerTitle}
            description={markerDescription}
            draggable
            onDragEnd={(e) => handleMapPress(e)}
          />
        )}
      </MapView>
      
      {showCurrentLocation && (
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.currentLocationButtonText}>📍 Current Location</Text>
        </TouchableOpacity>
      )}
      
      {address ? (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  currentLocationButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
  },
  addressText: {
    fontSize: 14,
  },
});

export default LocationMap; 