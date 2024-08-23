import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';


const plants = [
    { id: 1, name: 'Cactus', image: require('../assets/cactus.jpg') },
    { id: 2, name: 'Fern', image: require('../assets/fern.jpeg') },
    { id: 3, name: 'Sunflower', image: require('../assets/sunflower.jpeg') }
];

export default function PlantSelectionScreen() {
    const router = useRouter();
    const [selectedPlant, setSelectedPlant] = React.useState(null);

    const selectPlant = (plant) => {
        setSelectedPlant(plant);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Plant</Text>
            <View style={styles.plantContainer}>
                {plants.map((plant) => (
                    <TouchableOpacity key={plant.id} onPress={() => selectPlant(plant)} style={styles.plantButton}>
                        <Image source={plant.image} style={styles.plantImage} />
                        <Text style={[styles.plantName, selectedPlant?.id === plant.id && styles.selectedPlant]}>
                            {plant.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {selectedPlant && (
                <Button
                    title="Drink Water"
                    onPress={() => router.push('/drink-water')}
                />
            )}
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
    plantContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    plantButton: {
        alignItems: 'center',
    },
    plantImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    plantName: {
        fontSize: 18,
    },
    selectedPlant: {
        color: 'green',
        fontWeight: 'bold',
    },
});