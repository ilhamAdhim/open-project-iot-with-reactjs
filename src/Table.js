import React from 'react'
import { Table } from 'react-bootstrap'
import firebase from './firebase'
import Section from './Section'
import Timer from './Timer'

//How my program works to read data from firebase : 
//  declare status state for each lamp's initial value in client, will be updated when client connected to firebase

export default function TableMenu() {

    const syncLamp = 3

    //Initial state of lampsCollection is empty array with 3 elements
    //eslint-disable-next-line
    const [lampsCollection, setLampsCollection] = React.useState([{}, {}, {}])
    const [timeCollection, setTimeCollection] = React.useState([{}, {}, {}])
    const [status, setStatus] = React.useState([, ,])


    let condition = [{}, {}, {}]
    let timeInfo = [{}, {}, {}]
    let item, timeEachLamp

    // changeLampStatus.bind()
    function changeLampStatus(index, status) {
        let updateLamp = lampsCollection
        updateLamp[index - 1].isTurnOn = status
        setLampsCollection(updateLamp)
        writeStatusToFirebase(index - 1, false)
        window.location.reload(false)

        // writeStatusToFirebase(index - 1, true)
    }


    function changeLampTimer(index, currTimer) {
        let updateTime = timeCollection
        updateTime[index - 1] = currTimer
        setTimeCollection(updateTime)
        writeStatusToFirebase(index - 1, true)
    }

    function updateCollection(data, updateTime) {
        if (updateTime) {
            setTimeCollection([data[0], data[1], data[2]])
        } else {
            //Jika ada perubahan di firebase database maka update lampsCollection
            setLampsCollection([data[0], data[1], data[2]])
        }
    }

    const checkLampStatus = () => {
        for (let index = 1; index <= syncLamp; index++) {
            readLampStatus(index)
            timerLamp(index)
        }
    }

    React.useEffect(checkLampStatus, [])

    function readLampStatus(led) {
        firebase.database().ref(`/leds/` + led + `/status`).on('value', function (snapshot) {
            setStatus(() => {
                status[led - 1] = parseInt(snapshot.val())
            })
            item = {
                led: led,
                watt: 10,
                isTurnOn: !!(status[led - 1]),
            }
            console.log("Reading firebase ... Detected changes on lamp " + led)
            console.log("Lamp " + led + " is " + (item.isTurnOn ? 'On' : 'Off'))

            condition[led - 1] = item
            updateCollection(condition, false);
            // setTimeout(recordTimeToFirebase(led), 1000)
        })
    }


    function timerLamp(led) {
        firebase.database().ref(`/leds/` + led + `/seconds`).on('value', function (snapshot) {
            let secondsFirebase = parseInt(snapshot.val())
            if (status[led] !== 0) {
                console.log("start timer")

            } else
                console.log("stop timer")

            const hour = Math.floor(secondsFirebase / 3600)
            const minute = Math.floor((secondsFirebase - hour * 3600) / 60)
            const seconds = secondsFirebase - (hour * 3600 + minute * 60)

            console.log("lamp " + led + " is : " + hour + " : " + minute + " : " + seconds)
            timeEachLamp = {
                led: led,
                totalSec: secondsFirebase,
                hour: hour,
                minute: minute,
                seconds: seconds,
                isTurnOn: !!(status[led - 1]),
            }
            // timer: lampObject.isTurnOn ? setInterval(start, 1000) : stopTimer()

            timeInfo[led - 1] = timeEachLamp
            updateCollection(timeInfo, true);
        })
    }
    function writeStatusToFirebase(led, isTimer) {
        let updates = {}
        const addPath = isTimer ? '/seconds' : '/status'
        const values = isTimer ? timeCollection[led].totalSec : (lampsCollection[led].isTurnOn) ? 0 : 1
        updates['leds/' + (led + 1) + addPath] = values
        firebase.database().ref().update(updates)
        // setTimeout(recordTimeToFirebase(led), 1000)
    }

    return (
        <Table striped hover responsive variant={'dark'}>
            <tbody>
                <tr>
                    {lampsCollection.map(eachLamp =>
                        <td key={eachLamp.led}>
                            <Section
                                lampObject={eachLamp}
                                writeFirebase={changeLampStatus}
                            />
                        </td>
                    )}
                </tr>

                <tr>
                    {timeCollection.map(eachTimeIndicator =>
                        <td key={eachTimeIndicator.led}>
                            <Timer timeObject={eachTimeIndicator}
                                writeTimeFirebase={changeLampTimer}
                            />
                        </td>
                    )}
                </tr>

            </tbody>
        </Table>
    )
}
