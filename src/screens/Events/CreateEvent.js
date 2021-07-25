import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, Text, TextInput, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { firebase } from '../../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import styles from './EventsStyles';

function CreateEvent(props) {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventEntryFee, setEventEntryFee] = useState('');
    const [eventImageUri, setEventImageUri] = useState('');
    const nav = useNavigation();
    const eventRef = firebase.firestore().collection('events');
    const userID = props.extraData.id;

    const uploadImagePressed = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: "Showday Photos Permission",
                message:
                  "Showday needs access to your photos " +
                  "so you can upload an image.",
                buttonPositive: "OK",
                buttonNegative: "Cancel",
                buttonNeutral: "Ask Me Later",
              },
            );
            console.log(granted);
            if (granted === 'granted') {
              console.log("You can use the camera");
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
              });
              if (!result.cancelled) {
                setEventImageUri(result.uri);
              }
            } else {
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }
        };

    const submitEventPressed = () => {
        if (eventName.length > 0 
            && eventDate.length > 0 
            && eventLocation.length > 0 
            && eventEntryFee.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            let data = {
                eventName,
                eventDate,
                eventLocation,
                eventEntryFee: '$' + eventEntryFee + ".00",
                authorID: userID,
                createdAt: timestamp,
            };
            if (eventImageUri !== '') {
                data = {...data, eventImageUri}
            }
            eventRef
                .add(data)
                .then(_doc => {
                    setEventName('');
                    Keyboard.dismiss();
                    nav.goBack();
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            alert('You need to fill in all the details');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Event Details</Text>
            <TextInput
                style={styles.text__input} 
                placeholder='Name of Event'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEventName(text)}
                value={eventName}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.text__input}
                placeholder='Date'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEventDate(text)}
                value={eventDate}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.text__input} 
                placeholder='Location'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEventLocation(text)}
                value={eventLocation}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.text__input} 
                placeholder='Entry Fee'
                placeholderTextColor='#aaaaaa'
                onChangeText={(text) => setEventEntryFee(text)}
                value={eventEntryFee}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
            <TouchableOpacity style={styles.button} onPress={uploadImagePressed}>
                <Text style={styles.button__text}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={submitEventPressed}>
                <Text style={styles.button__text}>Submit Event</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CreateEvent;