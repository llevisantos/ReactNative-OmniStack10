import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, View, Text, TextIput, touchableOpacity } from 'react-native-maps';
import { StyleSheet, Image } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';

function Main ( { navigation }){
    const [ currentRegion, setCurrentRegion] = useState (null);
    useEffect (() => {
        async function loadInitialPosition() {
           const { granted } = await requestPermissionsAsync();

           if ( granted ) {
               const { coords } = await getCurrentPositionAsync({
                   enableHighAccuracy: true,
               });

               const { latitude, longitude } = coords;

               setCurrentRegion({
                   latitude,
                   longitude,
                   latitudeDelta: 0.04,
                   longitudeDelta: 0.04,
               })
           }
        }

        loadInitialPosition();
    },
    []);

    if (!currentRegion){
        return null;
    }

    return (
        <>
        <MapView initialRegion={currentRegion} style={{ flex: 1 }}>
        <Marker coordinate={ { latitude: - 27.2111164, longitude: -49.6374491 }} >

            <Callout onPress={() => {
                //navegação
                navigation.navigate('Profile', { github_username});
            }}>
                <View style={styles.Callout}>
                    <Text style={styles.devName}></Text>
                    <Text style={styles.devBio}></Text>
                    <Text style={styles.devConhecimentos}></Text>

                </View>
            </Callout>

        <Image source={{ uri: }} />
        </Marker>
        </MapView>
        <View style={styles.searchForm}>
            <TextIput style={searchInput} pleaceholder="Buscar desenvolvedores por conhecimentos..." placeholderTextColor="#999" autoCapitalize="words" autoCorrect={false} />

            <TouchableOpacity onPress={() => {}} style={styles.loadButton} >
            <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        </>
        );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height:54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio:{
        color: '#666',
        marginTop: 5,
    },

    devConhecimentos: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        bottom:20,
        left: 20,
        right:20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput:{
        flex:1,
        height:50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: #000,
        shadowOpacity:0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },


        loadButton: {
            width: 50,
            height: 50,
            backgroundColor: '#8E4Dff',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
        },
})

export default Main;