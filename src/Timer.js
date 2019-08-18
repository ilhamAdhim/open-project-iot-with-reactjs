import React from 'react'


export default function Timer(props) {
    return (
        <div>
            <p> {props.timeObject.hour} : {props.timeObject.minute} : {props.timeObject.seconds}</p>
        </div>
    )
}