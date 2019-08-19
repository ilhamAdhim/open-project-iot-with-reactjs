import React from 'react'


export default function Timer(props) {

    const [totalSeconds, setTotalSeconds] = React.useState(props.timeObject.totalSec)
    const [isActive, setIsActive] = React.useState(props.timeObject.isTurnOn)



    const [hour, setHour] = React.useState(Math.floor(totalSeconds / 3600))
    const [minute, setMinute] = React.useState(Math.floor((totalSeconds - hour * 3600) / 60))
    const seconds = totalSeconds - (hour * 3600 + minute * 60)

    if (seconds === 60) setMinute(minute + 1)
    if (minute === 60) setHour(hour + 1)
    // console.log(props.timeObject.isTurnOn)

    React.useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTotalSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, totalSeconds]);
    return (
        <div>
            {props.timeObject.isTurnOn !== undefined ? <p> {hour}: {minute}: {seconds} </p> : <p> LOADING </p>}

        </div>
    )
}