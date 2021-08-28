import { useEffect, useState } from "react"
import axios from 'axios'
import {Link, useHistory } from 'react-router-dom'
import Result from "./Result"

const History = () => {
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const history = useHistory()
    const check = () =>{
    if(end === "" || start === "" || Date.parse(start) > Date.parse(end)) alert("Please select start date and end date correctly")
    else history.push(`/history/result?start=${start}&end=${end}`)
}
    return (
        <div className='text-center space-y-3 space-x-3'>
          <p className='text-2xl font-semibold'>Select historical range</p>
          <span>From date</span>
          <input type='date' onChange={e => {
            console.log(e.target.value)
            setstart(e.target.value)}}></input>
          <span>To date</span>
          <input type='date' onChange={e => {
              console.log(e.target.value)
              setend(e.target.value)}}></input>
          <br />
          <button onClick={check}>Get data</button>
          {/* <Link to ={}></Link> */}
        </div>
    )
}

export default History


