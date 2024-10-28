import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async (): Promise<void> => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: any) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations }: { locations: Location.LocationObject[] } = data;
    console.log(locations);
    // Do something with the locations captured in the background
  }
});

const LocationComponent = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    const startTracking = async () => {
      await requestPermissions();
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 30000 },
        (loc) => {
          setLocation(loc);
        }
      );
    };

    startTracking();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude:{" "}
          {location.coords.longitude}
        </Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LocationComponent;
