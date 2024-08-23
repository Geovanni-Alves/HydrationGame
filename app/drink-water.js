// app/drink-water.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function DrinkWaterScreen() {
    const [waterLevel, setWaterLevel] = useState(new Animated.Value(200)); // 200 ml as starting point
    const [currentVolume, setCurrentVolume] = useState(200); // Tracking the water volume

    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const tilt = y; // We're using the y-axis for tilt detection
            const tiltFactor = Math.max(0, Math.min(1, (1 - tilt) / 2)); // Normalize tilt factor between 0 and 1

            Animated.timing(waterLevel, {
                toValue: 200 * tiltFactor, // Adjust water level based on tilt
                duration: 100,
                useNativeDriver: false,
            }).start();

            setCurrentVolume((200 * tiltFactor).toFixed(0)); // Update the displayed volume
        });

        return () => subscription && subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Drink Water</Text>
            <Text style={styles.volumeText}>{currentVolume} ml remaining</Text>
            <View style={styles.glass}>
                <Animated.View style={[styles.water, { height: waterLevel }]} />
            </View>
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
    volumeText: {
        fontSize: 18,
        marginBottom: 20,
    },
    glass: {
        width: 150,
        height: 300,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        backgroundColor: '#e0f7fa',
    },
    water: {
        width: '100%',
        backgroundColor: '#00bcd4',
    },
});
