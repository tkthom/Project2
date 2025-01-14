import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

function ContactView({ id, name, phone, dept, addrStr, addrCty, addrState,
                         addrZip, addrCntry, navigation }) {

    function gotoUpdate() {
        navigation.navigate("Update Contact", {
            noteid:id,
            contactName: name,
            contactPhone: phone,
            contactDept: dept,
            contactAddrStr: addrStr,
            contactAddrCty: addrCty,
            contactAddrState: addrState,
            contactAddrZip: addrZip,
            contactAddrCntry: addrCntry,
        })
    }

    return (
        <>
            <View style={styles.noteViewContainer}>
                <TouchableOpacity onPress={gotoUpdate} >
                    <Text>{name}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default function ROIContactList(props) {
    const [notes, setNotes] = useState([]);
    const navigation = props.navigation;

    useFocusEffect(
        React.useCallback(function() {
            fetch('http://192.168.176.113:3000/contacts')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    setNotes(data);
                });
        },[]))


    const presentableNotes = [];
    for(let i = 0; i < notes.length; i++) {
        presentableNotes.push(
            <ContactView id={i} name={notes[i].name}
                         phone={notes[i].phone}
                         addrCntry={notes[i].addrCntry}
                         addrStr={notes[i].addrStr}
                         addrZip={notes[i].addrZip}
                         addrState={notes[i].addrState}
                         addrCty={notes[i].addrCty}
                         dept={notes[i].dept}
                         navigation={navigation} />
        )
    }

    const add = () => {
        navigation.navigate("Add Contact")
    };

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button color="#c64c38" onPress={add} title={"Add New Contact"}/>
            </View>
            <ScrollView style={styles.scrollView}>
            <View style={styles.notesContainer}>
                {presentableNotes}
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        justifyContent: 'flex-end',
    },
    scrollView: {
        backgroundColor: '#595959',
        paddingLeft: '1%',
        paddingRight: '1%',
        marginBottom: '3%'
    },
    notesContainer: {
        flex: 1,
        paddingTop: '1%',
        alignItems: 'center',
        paddingBottom: '1%',
        width: '100%',
    },
    noteViewContainer: {
        width: '100%',
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingBottom: '2%',
        backgroundColor: '#D9D9D9',
        marginBottom: '2%',
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: '1%'
    }
});
