import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import api from '../../services/api'

function Home() {
    const [users, setUsers] = useState([]);
    const [operario, setOperario] = useState('')

    const courses = useSelector(
            state => state.data
            );
            
    useEffect(() => {
        api.get(`users/${courses}`).then((response) => {
            setOperario(response.data)
        })
    }, [courses])

    return (
        <>
        <h1>HOME {courses}</h1>
        { operario.length === ''
        ? <span>Carregando</span>
        // : users.map(user => {
        //     return (
        //         <li key={user.id}>{user.name}</li>
        //     )
        // })
        : <li>{operario.name}</li>
    }
        </>
    )
}

export default Home;