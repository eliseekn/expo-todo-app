import React, { useState } from 'react'
import { 
    Text, 
    TouchableOpacity, 
    View,
    Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
import TodoStyle from '../Styles/TodoStyle'

const Todo = (props) => {
    const handleEdit = () => {
        props.handleEdit(props.index, props.todo)
    }
    
    const handleCompleted = () => {
        props.handleCompleted(props.index)
    }

    const handleDelete = () => {
        Alert.alert('Confirm delete', 'Do you really want to delete this todo?', [
            { text: 'Cancel' },

            {
                text: 'Yes',
                onPress: props.handleDelete(props.index),
            }
        ], { cancelable: true })
    }

    return (
        <TouchableOpacity activeOpacity={.4} onPress={handleEdit}>
            <View style={TodoStyle.container}>
                <Text style={TodoStyle.title}>{props.todo}</Text>

                <TouchableOpacity activeOpacity={.4} onPress={props.page === 'todos' ? handleCompleted : handleDelete}>
                    {
                        props.page === 'todos'
                            ? <Icon name='check-circle' type='material-icons' color='blue' />
                            : <Icon name='delete' type='material-icons' color='red' />
                    }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default Todo