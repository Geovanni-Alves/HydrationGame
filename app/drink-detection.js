// app/drink-detection.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';

export default function DrinkDetectionScreen() {
    const [accelerometerData, setAccelerometerData] = useState({});
    const [gyroscopeData, setGyroscopeData] = useState({});
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [hasDrunkWater, setHasDrunkWater] = useState(false);

    useEffect(() => {
        if (isMonitoring) {
            Accelerometer.addListener(accelerometerData => {
                setAccelerometerData(accelerometerData);
                checkIfDrinking(accelerometerData);
            });

            Gyroscope.addListener(gyroscopeData => {
                setGyroscopeData(gyroscopeData);
            });

            Accelerometer.setUpdateInterval(100);
            Gyroscope.setUpdateInterval(100);
        } else {
            Accelerometer.removeAllListeners();
            Gyroscope.removeAllListeners();
        }

        return () => {
            Accelerometer.removeAllListeners();
            Gyroscope.removeAllListeners();
        };
    }, [isMonitoring]);

    const checkIfDrinking = (data) => {
        const { x, y, z } = data;

        // Example logic to determine if the phone is in a "drinking" position
        // This logic can be adjusted for accuracy
        if (Math.abs(y) > 0.8 && Math.abs(z) < 0.2) {
            setHasDrunkWater(true);
            setIsMonitoring(false);
        }
    };

    const startMonitoring = () => {
        setIsMonitoring(true);
        setHasDrunkWater(false);
    };

    const stopMonitoring = () => {
        setIsMonitoring(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Drink Water Detection</Text>
            <View style={styles.dataContainer}>
                <Text>Accelerometer Data:</Text>
                <Text>x: {accelerometerData.x && accelerometerData.x.toFixed(2)}</Text>
                <Text>y: {accelerometerData.y && accelerometerData.y.toFixed(2)}</Text>
                <Text>z: {accelerometerData.z && accelerometerData.z.toFixed(2)}</Text>
            </View>
            <View style={styles.dataContainer}>
                <Text>Gyroscope Data:</Text>
                <Text>x: {gyroscopeData.x && gyroscopeData.x.toFixed(2)}</Text>
                <Text>y: {gyroscopeData.y && gyroscopeData.y.toFixed(2)}</Text>
                <Text>z: {gyroscopeData.z && gyroscopeData.z.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title={isMonitoring ? "Stop Monitoring" : "Start Monitoring"} onPress={isMonitoring ? stopMonitoring : startMonitoring} />
            </View>
            {hasDrunkWater && <Text style={styles.successText}>You have drunk water!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dataContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    successText: {
        fontSize: 20,
        color: 'green',
    },
});
