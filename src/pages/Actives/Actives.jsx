import { useSelector } from 'react-redux';

function Actives() {
    const courses = useSelector(
        state => state.data
        );

    return(
        <div>
        <h1>
            ATIVOS {courses}
        </h1>
        </div>
    )
}

export default Actives;