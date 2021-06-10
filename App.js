import React, { useEffect, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppStyle from './src/Styles/AppStyle'
import Todo from './src/Components/Todo'

const App = () => {
    const STORAGE_KEY = 'todoList'

    const [todo, setTodo] = useState({})
    const [todoList, setTodoList] = useState([])
    const [todoAction, setTodoAction] = useState('+')
    const [todoIndex, setTodoIndex] = useState(0)
    const [page, setPage] = useState('todos')

    useEffect(() => {
        const getTodoList = async () => {
            try {
                const todoList = await AsyncStorage.getItem(STORAGE_KEY)
    
                if (todoList !== null) {
                    setTodoList(JSON.parse(todoList))
                }
            } catch (err) {
                console.log(err)
            }
        }
        
        getTodoList()
    }, [])

    const saveTodoList = async (_todoList) => {
        try {
            if (_todoList) {
                setTodoList(_todoList)
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_todoList))
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleReset = () => {
        setTodoAction('+')
        setTodo({'description': '', 'completed': false})
        setTodoIndex(0)
    }

    const handleChangeText = (_todo) => {
        if (_todo === '') {
            return handleReset()
        }

        setTodo({'description': _todo, 'completed': false})
    }

    const handleAdd = async () => {
        Keyboard.dismiss()
        setPage('todos')

        if (!todo.description) {
            return
        }

        saveTodoList([...todoList, todo])

        return handleReset()
    }

    const handleUpdate = async () => {
        Keyboard.dismiss()
        setPage('todos')

        if (!todo.description) {
            return
        }

        let _todoList = todoList.map((_todo, index) => {
            if (index === todoIndex) {
                return todo
            }

            return _todo
        })

        saveTodoList(_todoList)

        return handleReset()
    }

    const handleEdit = (index, _todo) => {
        if (page === 'todos') {
            setTodo({'description': _todo, 'completed': false})
            setTodoIndex(index)
            setTodoAction('!')
        }
    }

    const handleCompleted = async (index) => {
        let _todoList = todoList.map((_todo, _index) => {
            if (index === _index) {
                _todo.completed = true
            }

            return _todo
        })

        saveTodoList(_todoList)

        return handleReset()
    }

    const handleDelete = async (index) => {
        let _todoList = [...todoList]
        _todoList.splice(index, 1)

        saveTodoList(_todoList)

        return handleReset()
    }

    const handleDisplay = (_completed = false) => {
        let _todoList = todoList.map(_todo => {
            if (_todo.completed === _completed) {
                return _todo
            }
        })

        return _todoList.map((_todo, index) => {
            if (_todo) {
                return (
                    <Todo
                        key={index}
                        todo={_todo.description}
                        page={page}
                        handleEdit={() => handleEdit(index, _todo.description)}
                        handleCompleted={() => handleCompleted(index)}
                        handleDelete={() => handleDelete(index)}
                    />
                )
            }
        })
    }

    const handleCount = (_completed = false) => {
        let _todoList = todoList.filter(_todo => _todo.completed === _completed)
        return _todoList.length
    }

    return (
        <View style={AppStyle.container}>
            <Text style={AppStyle.title}>Todo App</Text>

            <View style={AppStyle.tabs}>
                <TouchableOpacity activeOpacity={.4} onPress={() => setPage('todos')}>
                    <Text style={[AppStyle.tabTitle, page === 'todos' ? AppStyle.activeTab : AppStyle.inactiveTab]}>
                        Todos ({ handleCount() })
                    </Text>
                </TouchableOpacity>
            
                <TouchableOpacity activeOpacity={.4} onPress={() => setPage('completed')}>
                    <Text style={[AppStyle.tabTitle, page === 'completed' ? AppStyle.activeTab : AppStyle.inactiveTab]}>
                        Completed ({ handleCount(true) })
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={AppStyle.todosList}>
                    {
                        page === 'todos'
                            ? handleDisplay()
                            : handleDisplay(true)
                    }
                </View>
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={AppStyle.inputGroup}>
                <TextInput
                    style={AppStyle.inputText}
                    placeholder='Todo description'
                    value={todo.description || ''}
                    onChangeText={handleChangeText}>
                </TextInput>

                <TouchableOpacity activeOpacity={.4} onPress={todoAction === '+' ? handleAdd : handleUpdate }>
                    <View style={AppStyle.inputButton}>
                        <Text style={AppStyle.inputButtonText}>{todoAction}</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default App