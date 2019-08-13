import React from 'react'
import { Table } from 'react-bootstrap'
import firebase from './firebase'
import Section from './Section'

export default function TableMenu(props) {
    const syncLamp = 3
    const [buttonLamp, setButtonLamp] = React.useState({
    })

    const lampsCollection = [{
        led: 1,
        totalSec: 200,
        timer: 2,
        watt: 10,
        isTurnOn: false
    }, {
        led: 2,
        totalSec: 300,
        timer: 3,
        watt: 10,
        isTurnOn: true
    }, {
        led: 3,
        totalSec: 400,
        timer: 4,
        watt: 10,
        isTurnOn: false
    }]


    const [lampsStatus, setLampStatus] = React.useState(lampsCollection)

    changeLampStatus.bind()

    function changeLampStatus(...data) {
        setLampStatus(data)
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
                    {lampsStatus.map(lampsStatus =>
                        <td key={lampsStatus.led}>
                            <Section
                                switch={changeLampStatus}
                                lamp={lampsStatus.led}
                                timer={lampsStatus.totalSec}
                                isTurnOn={lampsStatus.isTurnOn} />
                        </td>
                    )}
                </tr>

            </tbody>
        </Table>
    )
}