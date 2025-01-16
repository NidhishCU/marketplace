import React, { useState } from 'react';
import { Button, TextInput, View, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import sdk from '../../../sdk'; // Adjust the path to your SDK file

function CreateListing({navigation}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageId, setImageId] = useState(null); // Store uploaded image ID
    const [selectedImage, setSelectedImage] = useState(null); // Display selected image

    // Function to upload a single image
    const uploadImage = async (asset) => {
        try {
            console.log("Uploading image:", asset);

            const file = {
                uri: asset.uri,
                id: `${asset.uri}_${Date.now()}`, // Unique ID for the file
                type: asset.type,
                name: `${Math.random()}_${Date.now()}`, // Unique file name
            };

            const response = await sdk.images.upload({ image: file }, { expand: true });

            console.log("Upload response:", response);

            if (response.data) {
                return response.data.data.id; // Return the image ID if upload is successful
            } else {
                console.error("Unexpected response format", response);
                Alert.alert("Error", "Unexpected response format from server");
            }
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    // Handle image picker
    const handlePickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 1, // Allow only 1 image
                quality: 0.8,
            },
            async (response) => {
                if (response.didCancel) {
                    console.log("User canceled image picker");
                } else if (response.errorCode) {
                    console.error("ImagePicker Error: ", response.errorMessage);
                } else {
                    const asset = response.assets[0]; // Get the selected image asset
                    setSelectedImage(asset); // Display the selected image

                    // Upload the image and store its ID
                    const uploadedImageId = await uploadImage(asset);
                    setImageId(uploadedImageId);
                }
            }
        );
    };

    // Handle form submission
    const handleSubmit = async () => {
        console.log(imageId)
        if (imageId) {
            try {
                const res = await sdk.ownListings.create(
                    {
                        title: title,
                        description: description,
                        publicData: { category: category },
                        images: [imageId], // Include uploaded image ID
                    },
                    {
                        expand: true,
                        include: ["images"],
                    }
                );

                console.log("Listing created:", res.data);
                Alert.alert("Success", "Listing created successfully!");
            } catch (error) {
                console.error("Listing creation failed", error);
                Alert.alert("Error", "Failed to create listing");
            }
        } else {
            Alert.alert("Error", "Please upload an image before creating a listing.");
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
                placeholder="Category"
                value={category}
                onChangeText={(text) => setCategory(text)}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            />

            {/* Button to pick an image */}
            <Button title="Pick Image" onPress={handlePickImage} />

            {/* Display selected image */}
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage.uri }}
                    style={{ width: 100, height: 100, marginVertical: 10 }}
                />
            )}

            <Button title="Create Listing" onPress={handleSubmit} />
            <Button title='listing' onPress={()=>{navigation.navigate('Listing')}} />
        </View>
    );
}

export default CreateListing;
