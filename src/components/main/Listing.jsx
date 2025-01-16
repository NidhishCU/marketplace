import React, { useState } from 'react';
import { Button, TextInput, View, Alert } from 'react-native';
import sdk from '../../../sdk'; // Adjust the path to your SDK file

function Listing() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const res = await sdk.ownListings.create(
                {
                    title: title,
                    description: description,
                    price: new Money(price, "USD"),
                    publicData: { category: category },
                },
                {
                    expand: true,
                }
            );

            console.log("Listing created:", res.data);
            Alert.alert("Success", "Listing created successfully!");
        } catch (error) {
            console.error("Listing creation failed", error);
            Alert.alert("Error", "Failed to create listing");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={(text) => setPrice(text)}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Category"
                value={category}
                onChangeText={(text) => setCategory(text)}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />

            {/* Button to create the listing */}
            <Button title="Create Listing" onPress={handleSubmit} />
        </View>
    );
}

export default Listing;
