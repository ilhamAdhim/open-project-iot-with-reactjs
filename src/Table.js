import React from 'react'
import { Table } from 'react-bootstrap'
import firebase from './firebase'
import Section from './Section'

export default function TableMenu(props) {
    const syncLamp = 3

    const [lamp1, setLamp1] = React.useState({
        led: 1,
        totalSec: 200,
        timer: 2,
        watt: 10,
        isTurnOn: false
    })

    const [lamp2, setLamp2] = React.useState({
        led: 2,
        totalSec: 300,
        timer: 3,
        watt: 10,
        isTurnOn: true
    })

    const [lamp3, setLamp3] = React.useState({
        led: 3,
        totalSec: 400,
        timer: 4,
        watt: 10,
        isTurnOn: false
    })

    const lampsCollection = [lamp1, lamp2, lamp3]

    changeLampStatus.bind()

    function changeLampStatus(index, data) {
        index === 1 ?
            setLamp1(data) :
            index === 2 ?
                setLamp2(data) : setLamp3(data)
    }

    const checkLampStatus = () => { for (let index = 0; index < syncLamp; index++)readLampStatus(index) }

    checkLampStatus()

    function readLampStatus(led) {
        firebase.database().ref(`/leds/` + led + `/status`).on('value', function (snapshot) {
            let status = parseInt(snapshot.val());
            if (status) {

            } else {

            }
            // timerLamp(led, isTurnOn)
            // setTimeout(recordTimeToFirebase(led), 1000)
        })
    }
    return (
        <Table striped responsive variant='dark'>
            <tbody>
                <tr>
                    {/* //Coba pass datanya ga usah di map  */}
                    {lampsCollection.map(eachLamp =>
                        <td key={eachLamp.led}>
                            <Section
                                collection={eachLamp}
                                switch={changeLampStatus}
                                lamp={eachLamp.led}
                                timer={eachLamp.totalSec}
                                isTurnOn={eachLamp.isTurnOn} />
                        </td>
                    )}
                </tr>

            </tbody>
        </Table>
    )
}