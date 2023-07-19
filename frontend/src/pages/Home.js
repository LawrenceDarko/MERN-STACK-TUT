import React, {useEffect, useState} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../context/WorkoutContext'



const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    // const [workouts, setWorkouts] = useState(null)

    const fetchWorkouts = async() => { 
        const res = await fetch('/api/workouts')
        const json = await res.json()

        if(res.ok){
            // setWorkouts(json)
            dispatch({type: 'GET_WORKOUTS', payload: json})
        }
        console.log(json)
    }

    useEffect(() => {
        fetchWorkouts()
    }, [dispatch])
    

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map(workout => (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home