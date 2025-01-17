import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import sdk from '../../../sdk';

function Home({ navigation }) {
    const [listings, setListings] = useState([]); // Store processed listings
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetchListings();
    },[]);

    const fetchListings = async () => {
        try {
            const response = await sdk.listings.query({
                expand: ['images'],
                include: ['images'],
            });
                console.log(response)
            const { data: listingsData, included: includedImages } = response.data;
            
               
            if (listingsData && includedImages) {
                // Map included images for easier access by ID
                const imagesMap = includedImages.reduce((acc, image) => {
                    const imageId = String(image.id.uuid); 
                    const imageUrl = image.attributes?.variants?.default?.url;
                
                    if (imageId && imageUrl) {
                        acc[imageId] = imageUrl;
                    } else {
                        console.warn('Invalid image entry:', image);
                    }
                
                    return acc;
                }, {});
            
                
                // Process listings to include the image URLs
                const processedListings = listingsData.map((listing) => {
                    const title = listing.attributes.title || 'No Title';
                    const imageRelationships = listing.relationships?.images?.data || [];
                    const imageId = imageRelationships.length > 0 ? imageRelationships[0].id.uuid : null;
                    const imageUrl = imageId ? imagesMap[imageId] : null;

                    return {
                        id: listing.id.uuid,
                        title,
                        imageUrl,
                    };
                }); 
                console.log(processedListings)
                setListings(processedListings);
            } else {
                Alert.alert('No Listings Found', 'No listings or images were returned from the API.');
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
            Alert.alert('Error', 'Failed to fetch listings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
            ) : (
                <View style={styles.noImageContainer}>
                    <Text style={styles.noImageText}>No Image Available</Text>
                </View>
            )}
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button
                title="Create Listing"
                onPress={() => navigation.navigate('CreateListing')}
                color="#6200ea"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />
            ) : (
                <FlatList
                    data={listings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No listings available.</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    listContainer: {
        paddingTop: 20,
    },
    itemContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        borderWidth:0.5
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode:'contain',
    },
    noImageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        color: '#757575',
        fontSize: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    loader: {
        marginTop: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#757575',
    },
});

export default Home;
