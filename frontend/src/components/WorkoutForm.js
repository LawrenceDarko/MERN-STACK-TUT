import React, { useState } from 'react'
import { useWorkoutsContext } from '../context/WorkoutContext'


const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const [title, settitle] = useState('')
    const [reps, setreps] = useState('')
    const [load, setload] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) => { 
        e.preventDefault()

        const workout = {title, load, reps}

        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json()

        if(!res.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else if(res.ok) {
            settitle('')
            setload('')
            setreps('')
            setError(null)
            setEmptyFields([])
            console.log(json)
            dispatch({type: 'ADD_WORKOUT', payload: json})
        }
        
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input type='text' value={title} onChange={(e) => settitle(e.target.value)} className={emptyFields.includes('title') ? 'error': ''}/>

            <label>Load (kg):</label>
            <input type='number' value={load} onChange={(e) => setload(e.target.value)} className={emptyFields.includes('load') ? 'error': ''}/>

            <label>Reps:</label>
            <input type='number' value={reps} onChange={(e) => setreps(e.target.value)} className={emptyFields.includes('reps') ? 'error': ''}/>

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm