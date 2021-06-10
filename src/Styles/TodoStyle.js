import React from 'react'
import { StyleSheet } from 'react-native'

const TodoStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        flexWrap: 'wrap',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15
    },

    title: {
        fontSize: 15,
        maxWidth: '85%',
    },

    btn: {
        width: 20,
        height: 20,
        borderRadius: 100,
    }
})

export default TodoStyle