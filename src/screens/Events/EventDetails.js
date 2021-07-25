import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './EventsStyles';

function EventDetails(props) {
    const item = props.route.params.item;
    return (
        <View style={styles.container}>
            {item.eventImageUri ? 
                <Image 
                    source={{uri: item.eventImageUri}} 
                    style={{height: 300, width: 350}} /> 
            : null}
            <Text style={styles.text}>{item.eventName}</Text>
            <Text style={styles.text}>{item.eventLocation}</Text>
            <Text style={styles.text}>{item.eventDate}</Text>
            <Text style={styles.text}>{item.eventEntryFee}</Text>
        </View>
    );
}

export default EventDetails;
