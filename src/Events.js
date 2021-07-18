import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Events() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Events</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9FFFFF',
        alignItems: 'center',
    },
    text: {
        fontSize: 35,
        color: "#006699",
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 25,
    },
});

export default Events;
