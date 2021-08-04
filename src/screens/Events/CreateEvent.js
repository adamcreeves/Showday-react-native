import React, { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, ScrollView } from 'react-native';
import { firebase } from '../../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-neat-date-picker';
import styles from './EventsStyles';

function CreateEvent(props) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventImageUri, setEventImageUri] = useState('');
    const [eventLocationName, setEventLocationName] = useState('');
    const [eventLocationAddress, setEventLocationAddress] = useState('');
    const [hotelName, setHotelName] = useState('');
    const [hotelAddress, setHotelAddress] = useState('');
    const [hotelPhone, setHotelPhone] = useState('');
    const [hotelDiscount, setHotelDiscount] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [competitorFee, setCompetitorFee] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
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
            && eventLocationName.length > 0
            && eventLocationAddress.length > 0
            && hotelName.length > 0
            && hotelAddress.length > 0
            && hotelPhone.length > 0
            && competitorFee.length > 0
            && ticketPrice.length > 0
            && contactName.length > 0
            && contactPhone.length > 0
            && contactEmail.length > 0 
            && eventDate.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            let data = {
                eventName,
                eventDate,
                eventLocationName,
                eventLocationAddress,
                hotel: {
                  hotelName,
                  hotelAddress,
                  hotelPhone,
                  hotelDiscount,
                },
                competitorFee: '$' + competitorFee + ".00",
                ticketPrice: '$' + ticketPrice + ".00",
                contact: {
                  contactName,
                  contactPhone,
                  contactEmail,
                },
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
      let month = date.getUTCMonth();
      const day = date.getUTCDate();
      const year = date.getUTCFullYear()
      const today = new Date();
      const todayMonth = today.getUTCMonth();
      const todayDay = today.getUTCDate();
      const todayYear =today.getUTCFullYear();
      if (new Date(year, month, day) < new Date(todayYear, todayMonth, todayDay)) {
        alert("The selected date already passed")
      } else {
        setShowDatePicker(false)
        month += 1;
        setEventDate(month + "/" + day + "/" + year);
      }
    }

    const backButton = () => {
      return <TouchableOpacity 
          style={{ height: 35, borderColor: 'black', borderWidth: 2, borderRadius: 5, marginRight: 15 }} 
          onPress={() => nav.goBack()}>
          <Text style={{ color: 'black', margin: 7}}>Back</Text>
        </TouchableOpacity>
    }

    const eventTextInput = (placeholderText, value, setText, inputStyle) => {
        return <TextInput
            style={inputStyle} 
            placeholder={placeholderText}
            placeholderTextColor='#aaaaaa'
            onChangeText={(text) => setText(text)}
            value={value}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
        />
    }
    
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 380 }}>
              {backButton()}
              <Text style={styles.text}>Create New Event</Text>
            </View>
            <ScrollView style={styles.formContainer}>
              <Text style={{ width: 300, marginStart: 20 }}>Event details:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {eventTextInput('Name of Event', eventName, setEventName, styles.text__input)}
                <TouchableOpacity style={styles.button2} onPress={uploadImagePressed}>
                    <Text style={styles.button__text}>Upload Poster</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ width: 320, marginStart: 20 }}>Location:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {eventTextInput('Venue Name', eventLocationName, setEventLocationName, styles.text__input)}
                {eventTextInput('Venus Address', eventLocationAddress, setEventLocationAddress, styles.text__input)}
              </View>
              <Text style={{ width: 320, marginStart: 20 }}>Host Hotel:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {eventTextInput('Hotel Name', hotelName, setHotelName, styles.text__input)}
                {eventTextInput('Phone Number', hotelPhone, setHotelPhone, styles.text__input)}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {eventTextInput('Address', hotelAddress, setHotelAddress, styles.text__input3)}
                {eventTextInput('Disc Code', hotelDiscount, setHotelDiscount, styles.text__input4)}
              </View>
              <Text style={{ width: 320, marginStart: 20 }}>Athlete Registration:</Text>
              <TouchableOpacity style={styles.button3} onPress={() => null}>
                <Text style={styles.button__text}>Create Registration Form</Text>
              </TouchableOpacity>
              <Text style={{ width: 320, marginStart: 20 }}>Event Pricing:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {eventTextInput('Competitor Fee', competitorFee, setCompetitorFee, styles.text__input)}
                {eventTextInput('Ticket Price', ticketPrice, setTicketPrice, styles.text__input)}
              </View>
              <Text style={{ width: 320, marginStart: 20 }}>Event Contact Information:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {eventTextInput('Contact Name', contactName, setContactName, styles.text__input)}
                {eventTextInput('Contact Phone', contactPhone, setContactPhone, styles.text__input)}
              </View>
              {eventTextInput('Contact Email', contactEmail, setContactEmail, styles.text__input2)}
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity style={styles.button2} onPress={openDatePicker}>
                    <Text style={styles.button__text}>Select Date(s)</Text>
                  </TouchableOpacity>
                  <DatePicker
                    isVisible={showDatePicker}
                    mode={'single'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                  />
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={submitEventPressed}>
                <Text style={styles.button__text}>Submit Event</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CreateEvent;
