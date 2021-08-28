import { useEffect, useState } from "react"
import axios from 'axios'
import { useLocation } from "react-router-dom"

type resulttype = {
    bpi: Record<string, number>
    disclaimer: string
    time: {
        updated: string
        updatedISO: string
    }
}


const Result = () => {
    const [result, setresult] = useState<resulttype | null>(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()

    useEffect(() => {
        setloading(true)
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${query.get('start')}&end=${query.get('end')}`)
            .then(resp => {
                console.log(resp.data)
                setresult(resp.data)
                setloading(false)

            })
            .catch(err => {
                console.log(err)
                setloading(false)
                seterror(true)
            })
    }, [])

    const render = () => {
        if (loading) return <div className='text-center space-y-3'><p className='text-2xl'>Loading ...</p></div>
        else if (error) return <div className='text-center space-y-3'><p className='text-2xl text-red-500'>There was an error. Please try again later.</p></div>
        else if (result !== null) return (<div className='text-center space-y-3'>
            <p className='text-xl font-semibold'> ( From {query.get('start')} To {query.get('end')})</p>
            <ul>
                {Object.entries(result.bpi).map(x => <p className='text-xl'> {x[0]} - {x[1].toLocaleString()} THB</p>)}
            </ul>
        </div>
        )
    }
    return (

        <div className='text-center space-y-3'><p className='text-2xl font-semibold'>Historical price</p>
            {render()}
        </div>
    )
}

export default Result