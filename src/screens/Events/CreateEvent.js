import React, { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { firebase } from '../../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-neat-date-picker';
import styles from './EventsStyles';

function CreateEvent(props) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventEntryFee, setEventEntryFee] = useState('');
    const [eventImageUri, setEventImageUri] = useState('');
    const eventRef = firebase.firestore().collection('events');
    const nav = useNavigation();
    const userID = props.route.params.user.id;

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
            && eventLocation.length > 0 
            && eventEntryFee.length > 0
            && eventDate.length > 0) {
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
                .then(() => {
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

    const openDatePicker = () => {
      setShowDatePicker(true)
    }
    
    const onCancel = () => {
      // You should close the modal in here
      setShowDatePicker(false)
    }
    
    const onConfirm = ( date ) => {
      if (date < new Date()) {
        alert("The selected date already passed")
      } else {
        setShowDatePicker(false)
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear()
        console.log(month + "/" + day + "/" + year);
        setEventDate(month + "/" + day + "/" + year);
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
            <View>
                <TouchableOpacity style={styles.button} onPress={openDatePicker}>
                  <Text style={styles.button__text}>Select a Date</Text>
                </TouchableOpacity>
                <DatePicker
                  isVisible={showDatePicker}
                  mode={'single'}
                  onCancel={onCancel}
                  onConfirm={onConfirm}
                />
            </View>
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
