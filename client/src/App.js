import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [board, setBoard] = useState();
    useEffect(() => {

        const fetchData = async () => {
            const fetchBoard = await axios.get('http://localhost:5000/api/board/9', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNreTg0MjMxQGdtYWlsLmNvbSIsImlhdCI6MTY2MzgzMzE1MiwiZXhwIjoxNjY0MDA1OTUyfQ.CvSmwXrs1LovlaBdpcQwA7I-26zyXyDU90_si3NM5Y0'
                }
            }).then(res => res.data);
            console.log(fetchBoard)
            setBoard(fetchBoard)
        }
        fetchData();
    }, [])
    console.log(board);
    return (
        <div className="App">
            {JSON.stringify(board, null, 2)}
            Working!!!!
        </div>
    );
}

export default App;
