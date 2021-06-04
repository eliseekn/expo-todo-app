import React, { useState } from 'react'
import { 
    Keyboard, 
    KeyboardAvoidingView, 
    ScrollView, 
    Text,
    Platform, 
    TextInput, 
    TouchableOpacity, 
    View
} from 'react-native'
import AppStyle from './src/Styles/AppStyle'
import Todo from './src/Components/Todo'

export default function App() {
    const [todo, setTodo] = useState()
    const [todoItems, setTodoItems] = useState([])
    const [todoCompleted, setTodoCompleted] = useState([])
    const [todoAction, setTodoAction] = useState('+')
    const [todoIndex, setTodoIndex] = useState(0)
    const [page, setPage] = useState('todos')

    const handleReset = () => {
        setTodoAction('+')
        setTodo('')
        setTodoIndex(0)
    }

    const handleChangeText = (_todo) => {
        setTodo(_todo)

        if (_todo === '') {
            return handleReset()
        }
    }

    const handleAction = () => {
        Keyboard.dismiss()
        
        setPage('todos')

        if (!todo) {
            return handleReset()
        }

        if (todoAction === '+') {
            setTodoItems([...todoItems, todo])
        }
        
        else {
            let todos = todoItems.map((_todo, index) => {
                if (index === todoIndex) {
                    return todo
                }
    
                return _todo
            })
    
            setTodoItems(todos)
        }
        
        return handleReset()
    }

    const handleEdit = (index, todo) => {
        if (page === 'todos') {
            setTodo(todo)
            setTodoIndex(index)
            setTodoAction('!')
        }
    }

    const handleCompleted = (index) => {
        if (page === 'todos') {
            let todos = [...todoItems]
            let todosCompleted = todos.splice(index, 1)

            setTodoItems(todos)
            setTodoCompleted([...todoCompleted, todosCompleted])

            return handleReset()
        }

        let todosCompleted = [...todoCompleted]
        todosCompleted.splice(index, 1)
        setTodoCompleted(todosCompleted)

        return handleReset()
    }

    return (
        <View style={AppStyle.container}>
            <Text style={AppStyle.title}>Todo App</Text>

            <View style={AppStyle.tabs}>
                <TouchableOpacity activeOpacity={.4} onPress={() => setPage('todos')}>
                    <Text style={[AppStyle.tabTitle, page === 'todos' ? AppStyle.activeTab : AppStyle.inactiveTab]}>
                        Todos ({todoItems.length})
                    </Text>
                </TouchableOpacity>
            
                <TouchableOpacity activeOpacity={.4} onPress={() => setPage('completed')}>
                    <Text style={[AppStyle.tabTitle, page === 'completed' ? AppStyle.activeTab : AppStyle.inactiveTab]}>
                        Completed ({todoCompleted.length})
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={AppStyle.todosList}>
                    {
                        page === 'todos' ?
                            todoItems.map((todo, index) => {
                                return (
                                    <Todo
                                        key={index}
                                        todo={todo}
                                        page={page}
                                        handleEdit={() => handleEdit(index, todo)}
                                        handleCompleted={() => handleCompleted(index)}
                                    />
                                )
                            }) :

                            todoCompleted.map((todo, index) => {
                                return (
                                    <Todo
                                        key={index}
                                        todo={todo}
                                        page={page}
                                        handleEdit={() => handleEdit(index, todo)}
                                        handleCompleted={() => handleCompleted(index)}
                                    />
                                )
                            }) 
                    }
                </View>
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={AppStyle.inputGroup}>
                <TextInput
                    style={AppStyle.inputText}
                    placeholder='Todo description'
                    value={todo}
                    onChangeText={todo => handleChangeText(todo)}>
                </TextInput>

                <TouchableOpacity activeOpacity={.4} onPress={() => handleAction()}>
                    <View style={AppStyle.inputButton}>
                        <Text style={AppStyle.inputButtonText}>{todoAction}</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}
