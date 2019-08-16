import React from 'react'
import { Table, Button, Col, Container, Row } from 'react-bootstrap'

export default function Section(props) {
    // props.lampsCollection.timer++
    const turnedOff = <td style={{ backgroundColor: '' }}> Off </td>
    const turnedOn = <td style={{ backgroundColor: 'rgb(236, 193, 1)', color: 'black' }}> On</td>

    const updateFirebase = () => {
        props.switch(props.lampObject.led)
    }

    function timerLamp(lampObject) {

        function start() {
            lampObject.totalSec++
            let hour = Math.floor(lampObject.totalSec / 3600)
            let minute = Math.floor((lampObject.totalSec - hour * 3600) / 60)
            let seconds = lampObject.totalSec - (hour * 3600 + minute * 60)
        }

        function stopTimer() {
            let timer = lampObject.timer
            clearInterval(timer)
        }

        function resumeTimer() {
            //Hold current value of totalSec to tmpSecond
            let tmpSecond = lampObject.totalSec
            //create new object that totalSec parameter is the valu tmpSecond
            props.switch(props.lampObject.led, {
                isTurnOn: props.lampObject.isTurnOn,
                led: props.lampObject.led,
                totalSec: tmpSecond,
                timer: setInterval(start, 1000),
                watt: 10
            })
        }
    }

    const buttonOn = <Button onClick={updateFirebase}> Turn Off</Button>
    const buttonOff = <Button onClick={updateFirebase}> Turn On</Button>

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        Lamp {props.lampObject.led}
                    </Col>
                    <Col style={{ padding: '0px' }}>
                        {props.lampObject.isTurnOn ? buttonOn : buttonOff}
                    </Col>
                </Row>
            </Container>

            <Table variant="dark" responsive>
                <tbody >
                    <tr style={{ height: '45vh' }}>
                        {props.lampObject.isTurnOn ? turnedOn : turnedOff}
                    </tr>

                    <tr>
                        <td>
                            {/* {hour} : {minute} : {seconds} */}
                            {2}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}