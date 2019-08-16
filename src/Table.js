import React from 'react'
import { Table } from 'react-bootstrap'
import firebase from './firebase'
import Section from './Section'

//How my program works to read data from firebase : 
//  declare status state for each lamp's initial value in client, will be updated when client connected to firebase
// (connectedToFirebase state comes in handy)

export default function TableMenu() {
    const syncLamp = 3

    const [connectedToFirebase] = React.useState()
    //lamp1,lamp2,lamp3 is declared, it will be used on onClick event on Section.js
    // const [lamp1, setLamp1] = React.useState({})

    // const [lamp2, setLamp2] = React.useState({})

    // const [lamp3, setLamp3] = React.useState({})

    //Initial state of lampsCollection is empty array with 3 elements
    //eslint-disable-next-line
    const [lampsCollection, setLampsCollection] = React.useState([, ,])
    let condition = [{}, {}, {}]
    let item
    let count = 0
    const [status, setStatus] = React.useState([0, 0, 0])

    changeLampStatus.bind()

    function changeLampStatus(index) {
        item = {
            led: index === 1 ? 1 : index === 2 ? 2 : 3,
            totalSec: 200,
            timer: 2,
            watt: 10,
            isTurnOn: lampsCollection[index - 1].isTurnOn ? false : true
        }
        setLampsCollection(() => {
            lampsCollection[index - 1] = item
        })

        console.log(lampsCollection)

        writeStatusToFirebase(index - 1)
        window.location.reload(false)
    }

    function updateCollection(data) {
        //Jika ada perubahan di firebase database maka update lampsCollection
        setLampsCollection([data[0], data[1], data[2]])
    }

    const checkLampStatus = () => { for (let index = 1; index <= syncLamp; index++) readLampStatus(index) }

    React.useEffect(checkLampStatus, [connectedToFirebase])

    function readLampStatus(led) {
        firebase.database().ref(`/leds/` + led + `/status`).on('value', function (snapshot) {
            setStatus(() => {
                status[led - 1] = parseInt(snapshot.val())
            })
            item = {
                led: led === 1 ? 1 : led === 2 ? 2 : 3,
                totalSec: 200,
                timer: 2,
                watt: 10,
                isTurnOn: !!(status[led - 1])
            }
            console.log("Reading firebase ... Detected changes on lamp " + led)
            console.log("Lamp " + led + " is " + (item.isTurnOn ? 'On' : 'Off'))
            condition[led - 1] = item
            updateCollection(condition);


            // timerLamp(led, isTurnOn)
            // setTimeout(recordTimeToFirebase(led), 1000)
        })

    }
    function writeStatusToFirebase(led) {
        let updates = {}
        updates[`leds/` + (led + 1) + `/status`] = (lampsCollection[led].isTurnOn) ? 0 : 1
        firebase.database().ref().update(updates)

        // setTimeout(recordTimeToFirebase(led), 1000)
    }

    return (
        <Table striped hover responsive variant={'dark'}>
            <tbody>
                <tr>
                    {/* //Coba pass datanya ga usah di map  */}
                    {lampsCollection.map(eachLamp =>

                        eachLamp !== undefined ?
                            <td key={eachLamp.led}>
                                <Section
                                    lampObject={eachLamp}
                                    switch={changeLampStatus}
                                />
                            </td> : <td> LOADING </td>
                    )}
                </tr>

            </tbody>
        </Table>
    )
}