import React from 'react'
import { Table, Button, Col, Container, Row } from 'react-bootstrap'

export default function Section(props) {
    // props.lampsCollection.timer++
    let hour = Math.floor(props.timer / 3600)
    let minute = Math.floor((props.timer - hour * 3600) / 60)
    let seconds = props.timer - (hour * 3600 + minute * 60)

    const turnedOff = <td style={{ backgroundColor: '' }}> Off </td>
    const turnedOn = <td style={{ backgroundColor: 'rgb(236, 193, 1)', color: 'black' }}> On</td>

    const changeStatus = () => {
        props.switch(props.lamp, {
            isTurnOn: !props.isTurnOn,
            led: props.lamp,
            totalSec: props.timer
        })

        // {
        //     led: props.lamp,
        //     totalSec: 400,
        //     timer: 4,
        //     watt: 10,
        //     isTurnOn: props.isTurnOn ? false : true}

    }

    const buttonOn = <Button onClick={() => {
        changeStatus()
    }}> Turn Off</Button>
    const buttonOff = <Button onClick={() => {
        changeStatus()
    }}> Turn On</Button>

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        Lamp {props.lamp}
                    </Col>
                    <Col style={{ padding: '0px' }}>
                        {props.isTurnOn ? buttonOn : buttonOff}
                    </Col>
                </Row>
            </Container>

            <Table variant="dark" responsive>
                <tbody >
                    <tr style={{ height: '45vh' }}>
                        {props.isTurnOn ? turnedOn : turnedOff}
                    </tr>

                    <tr>
                        <td>
                            {hour} : {minute} : {seconds}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}