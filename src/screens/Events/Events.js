import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config';
import styles from './EventsStyles';
import EventDetails from './EventDetails';

function Events(props) {
    const [events, setEvents] = useState([]);
    const nav = useNavigation();
    const eventRef = firebase.firestore().collection('events');
    
    let userType = null;
    if (props.extraData !== null) {
        userType = props.extraData.acctType;
    }

    useEffect(() => {
        eventRef
            .orderBy('eventDate', 'asc')
            .onSnapshot(
                querySnapshot => {
                    const newEvents = []
                    querySnapshot.forEach(doc => {
                        const event = doc.data();
                        event.id = doc.id;
                        newEvents.push(event);
                    });
                    setEvents(newEvents);
                },
                error => {
                    console.log(error);
                }
            )
    }, []);

    const renderEvent = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.flatlist__Item}
                onPress={() => nav.navigate('EventDetails', {item})}>
                <View style={styles.flatlist__ItemRow}>
                    {item.eventImageUri ? 
                        <Image 
                            source={{uri: item.eventImageUri}} 
                            style={{height: 100, width: 100, margin: 5}} /> 
                    : null}
                    <View style={{ width: 245}}>
                        <Text style={styles.flatlist__TitleText}>{item.eventName}</Text>
                        <Text style={styles.flatlist__Text}>{item.eventLocation}</Text>
                        <View style={styles.flatlist__ItemRow}>
                            <Text style={styles.flatlist__Text}>{item.eventDate}</Text>
                            <Text style={styles.flatlist__Text}>{item.eventEntryFee}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const createEventPressed = () => {
        nav.navigate('CreateEvent');
    }

    return (
        <View style={styles.container}>
            {userType !== null && userType === 'promoter' ? (
                <TouchableOpacity 
                    onPress={createEventPressed}
                    style={styles.button}>
                    <Text style={styles.button__text}>Create New Event</Text>
                </TouchableOpacity>
            ) : null} 
            {events.length > 0 ? (
                <View 
                style={{flex: 1, borderColor: 'black', borderWidth: 1, margin: 5}} >
                    <Text style={styles.text}>Upcoming Events</Text>  
                    <FlatList
                        data={events}
                        renderItem={renderEvent}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            ) : <Text style={styles.text}>{'There are no upcoming events scheduled.\nCheck back soon'}</Text>
            }
        </View>
    );
}

export default Events;
