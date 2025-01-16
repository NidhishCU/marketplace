import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import sdk from '../../../sdk';
import { ColorSpace } from 'react-native-reanimated';

function Home() {
    const [listings, setListings] = useState([]); // Store listings
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchListings();
    }, []);

    // Fetch listings from Sharetribe
    const fetchListings = async () => {
        try {
            const response = await sdk.listings.query({
                expand: ['images']
            });

            // Check if listings exist
            if (response.data) {
                console.log(response.data.data);
                setListings(response.data.data);
            } else {
                Alert.alert('No Listings', 'No listings found.');
            }
        } catch (error) {
            console.error('Error fetching listings', error);
            Alert.alert('Error', 'Failed to fetch listings.');
        } finally {
            setLoading(false); 
        }
    };

    // Render each listing item in the FlatList
    const renderItem = ({ item }) => {
        const imageUrl = item.images?.[0]?.url; // Get the URL of the first image

        return (
            <View style={styles.itemContainer}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text>No Image Available</Text>
                    </View>
                )}
                <Text style={styles.title}>{item.attributes.title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={listings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    noImageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Home;
