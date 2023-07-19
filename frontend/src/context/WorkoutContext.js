import React, { createContext, useState, useReducer, useContext} from 'react';

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
    switch(action.type) {
        case 'GET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'ADD_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkoutsContext = () => useContext(WorkoutContext)
// dispatch({type: 'GET_WORKOUTS', payload: [{}, {}]})