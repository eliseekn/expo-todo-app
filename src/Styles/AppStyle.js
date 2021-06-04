import React, { useState } from 'react'
import { StyleSheet, Platform } from 'react-native'

const AppStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: 'lightgrey'
    },

    title: {
        alignSelf: 'center',
        fontSize: 30, 
        marginVertical: 20, 
        fontWeight: 'bold'
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%'
    },

    tabTitle: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 15
    },

    activeTab: {
        backgroundColor: 'blue',
        color: 'white'
    },

    inactiveTab: {
        backgroundColor: 'white',
        color: 'black'
    },

    todosList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    inputGroup: {
        marginTop: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    inputText: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        width: '80%',
        marginRight: 15
    },

    inputButton: {
        backgroundColor: 'white',
        width: 45,
        height: 45,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputButtonText: {
        fontSize: 25,
        color: 'blue',
        fontWeight: 'bold'
    }
})

export default AppStyle