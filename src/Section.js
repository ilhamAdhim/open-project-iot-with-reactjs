import React from 'react'
import { Table, Button, Col, Container, Row } from 'react-bootstrap'

export default function Section(props) {
    // props.lampsCollection.totalSec++
    let hour = Math.floor(props.totalSec / 3600)
    let minute = Math.floor((props.totalSec - hour * 3600) / 60)
    let seconds = props.totalSec - (hour * 3600 + minute * 60)

    const turnedOff = <td style={{ backgroundColor: '' }}> Off </td>
    const turnedOn = <td style={{ backgroundColor: 'rgb(236, 193, 1)' }}> On</td>

    const buttonOn = <Button onClick={()=>{
        props.switch({
            led:props.lamp,
            isTurnOn: false
        })
    }}> Turn Off</Button>
    const buttonOff = <Button onClick={()=>{
        props.switch({
            led:props.lamp,
            isTurnOn: true
        })
    }}> Turn On</Button>
    
    return (
        <Table variant="dark" responsive >
            <thead >
                <tr>
                    <Container>
                        <Row>
                            <Col>
                                Lamp {props.lamp}
                            </Col>
                            <Col style={{ padding: '0px' }}>
                                {props.isTurnOn ?  buttonOn : buttonOff}
                            </Col>
                        </Row>
                    </Container>
                </tr>
            </thead>
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
    )
}