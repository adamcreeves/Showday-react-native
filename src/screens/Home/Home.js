import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './HomeStyles';
import Spinner from 'react-native-loading-spinner-overlay';

function Home(props) {
    const user = props.extraData;
    const nav = useNavigation();
    const [visible, setVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const eventRef = firebase.firestore().collection('events');
    const userid = user?.id;
    const [loggedIn, setLoggedIn] = useState(userid);

    let today = new Date();
    today = (today.getUTCMonth() + 1) + "/" + today.getUTCDate() + "/" + today.getUTCFullYear();

    useEffect(() => {
        const unsub = eventRef
            .orderBy('eventDate', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEvents = []
                    querySnapshot.forEach(doc => {
                        const event = doc.data();
                        event.id = doc.id;
                        if ((new Date(today)) <= (new Date(event.eventDate))) {
                            newEvents.push(event);
                        }
                    });
                    setEvents(newEvents);
                    setVisible(false);
                },
                error => {
                    console.log(error);
                }
            );
        return () => unsub();
    }, []);

    const login = () => {
        nav.navigate('Login');
      }
    
    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Canceled: User still logged in'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        await firebase.auth().signOut();
                        setLoggedIn(null);
                        console.log('Confirmed: User logged out')
                    }
                }
            ]
        )
    }

    useEffect(() => {
        const userChange = () => setLoggedIn(userid);
        return () => userChange();
    }, [user]);

    const renderLoginLogout = () => {
        if(!visible) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: 385 }}>
                    {loggedIn === null || user === null ? (
                        <TouchableOpacity 
                            style={styles.loginLogoutButton}
                            onPress={login}>
                            <Image source={require('../../../assets/login.png')} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ flexDirection: 'row', width: 385, justifyContent: 'space-between' }}>
                            <TouchableOpacity 
                                style={styles.loginLogoutButton}
                                onPress={logout}>
                                <Image source={require('../../../assets/logout.png')} />
                            </TouchableOpacity>
                            {user.acctType === 'promoter' ? (
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity 
                                        onPress={() => null}
                                        style={styles.button}>
                                        <Text style={styles.button__text}>Edit Event</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={(createEventPressed)}
                                        style={styles.button}>
                                        <Text style={styles.button__text}>Create Event</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : user.acctType === 'competitor'? (
                                <TouchableOpacity 
                                    onPress={() => null}
                                    style={styles.button}>
                                    <Text style={styles.button__text}>Edit Profile</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    )}
                </View>
            )
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
                        <View style={styles.flatlist__ItemRow}>
                            <Text style={styles.flatlist__TitleText}>{item.eventName}</Text>
                            {item.authorID === user?.id && loggedIn !== null ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            'Delete Event',
                                            'Are you sure?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Canceled: event not deleted'),
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Confirm',
                                                    onPress: () => {
                                                        firebase.firestore().collection('events').doc(item.id).delete()
                                                        console.log('Confirmed: event deleted')
                                                    }
                                                }
                                            ]
                                        )
                                    }}>
                                    <Image source={require('../../../assets/deleteicon.png')} />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <View style={styles.flatlist__ItemRow}>
                            <Text style={styles.flatlist__Text}>{item.eventLocation}</Text>
                        </View>
                        <View style={styles.flatlist__ItemRow}>
                            <Text style={styles.flatlist__Text}>{item.eventDate}</Text>
                            <Text style={styles.flatlist__Text}>{item.competitorFee}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const renderLoadingOrNegative = (message) => {
        if (!visible) {
            return (
                <View style={{ marginBottom: 10, padding: 20, width: 380, borderColor: 'black', borderWidth: 1}}>
                    <Text style={styles.text}>{message}</Text>
                </View>
            )
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

    console.log('This is the user: ');
    console.log(user);

    console.log('This is the logged User');
    console.log(loggedIn);

    console.log('This is the User.id');
    console.log(userid);

    return (
        <View style={styles.container}>
            <Spinner visible={visible} />
            {renderLoginLogout()}
            {todaysEvents.length > 0 ? (
                <View 
                    style={{marginBottom: 10, paddingTop: 10, flex:1, borderColor: 'black', borderWidth: 1}} >
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
                    style={{margin: 5, paddingTop: 10, flex:2, borderColor: 'black', borderWidth: 1}} >
                    <Text style={styles.text}>Upcoming Events</Text>  
                    <FlatList
                        data={upcomingEvents}
                        renderItem={renderUpcomingItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : renderLoadingOrNegative('No upcoming events scheduled')
            }
        </View>
    );
}

export default Home;
