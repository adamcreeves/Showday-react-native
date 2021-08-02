import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './HomeStyles';
import Spinner from 'react-native-loading-spinner-overlay';

function Home(props) {
    const user = props.extraData;
    const nav = useNavigation();
    const [visible, setVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [noEvents, setNoEvents] = useState(false);
    const eventRef = firebase.firestore().collection('events');

    let today = new Date();
    today = (today.getUTCMonth() + 1) + "/" + today.getUTCDate() + "/" + today.getUTCFullYear();

    useEffect(() => {
        const unsub = eventRef
            .orderBy('eventDate', 'asc')
            .onSnapshot(
                querySnapshot => {
                    const newEvents = []
                    querySnapshot.forEach(doc => {
                        const event = doc.data();
                        event.id = doc.id;
                        if ((new Date()) < (new Date(event.eventDate))) {
                            newEvents.push(event);
                        }
                    });
                    setEvents(newEvents);
                    setNoEvents(true);
                    setVisible(false)
                },
                error => {
                    console.log(error);
                }
            );
            return () => unsub();
    }, []);

    const renderLoginLogout = () => {
        if(!visible) {
            if (!user) {
                return (
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={login}>
                        <Text style={styles.button__text}>Login</Text>
                        {/* <Image source={require('../../../assets/login.png')} /> */}
                    </TouchableOpacity>)
            } else {
                return (
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={logout}>
                        <Text style={styles.button__text}>Logout</Text>
                        {/* <Image source={require('../../../assets/logout.png')} /> */}
                    </TouchableOpacity>
                );
            }
        } else {
            return <></>
        }
    }

    const renderShowsTodayItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.flatlist__Item}
                onPress={() => nav.navigate('EventDetails', {item})}>
                <View style={styles.flatlist__ItemRow}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.flatlist__TitleText}>{item.eventName}</Text>
                        <Text style={styles.flatlist__Text}> - </Text>
                        <Text style={styles.flatlist__Text}>{item.eventLocation}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const renderUpcomingItem = ({item}) => {
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

    const login = () => {
        nav.navigate('Login');
      }
    
    const logout = () => {
        nav.navigate('Logout')
    }

    const renderLoadingOrNegative = (message) => {
        if (!visible) {
            return <Text style={styles.text}>{message}</Text>
        } else {
            return <></>
        }
        
    }
    
    const createEventPressed = () => {
        nav.navigate('CreateEvent', {user});
    }
    let todaysEvents = [];
    let upcomingEvents = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].eventDate === today){
            todaysEvents.push(events[i]);
        } else {
            upcomingEvents.push(events[i]);
        }
    }
    return (
        <View style={styles.container}>
            <Spinner visible={visible} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderLoginLogout()}
                {user !== null && user.acctType === 'promoter' ? (
                    <TouchableOpacity 
                        onPress={createEventPressed}
                        style={styles.button}>
                        <Text style={styles.button__text}>Create New Event</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            {todaysEvents.length > 0 ? (
                <View 
                    style={{marginBottom: 10, flex:1, borderColor: 'black', borderWidth: 1}} >
                    <Text style={styles.text}>Shows Today</Text>  
                    <FlatList
                        data={todaysEvents}
                        renderItem={renderShowsTodayItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : renderLoadingOrNegative('No shows today')}
            {upcomingEvents.length > 0 ? (
                <View 
                    style={{margin: 5, flex:2, padding: 10, borderColor: 'black', borderWidth: 1}} >
                    <Text style={styles.text}>Upcoming Events</Text>  
                    <FlatList
                        data={upcomingEvents}
                        renderItem={renderUpcomingItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : renderLoadingOrNegative('There are no upcoming events scheduled.\nCheck back soon')
            }
        </View>
    );
}

export default Home;
