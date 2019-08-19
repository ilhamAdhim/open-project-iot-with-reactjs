import React from 'react'
import { Table, Button, Col, Container, Row } from 'react-bootstrap'

export default function Section(props) {
    // props.lampsCollection.lampObjectrtime.++
    let status

    const turnedOff = <td style={{ backgroundColor: '' }}> Off </td>
    const turnedOn = <td style={{ backgroundColor: 'rgb(236, 193, 1)', color: 'black' }}> On</td>

    const updateFirebase = () => {
        status = props.lampObject.isTurnOn
        props.writeFirebase(props.lampObject.led, status)
    }

    const buttonOn = <Button onClick={updateFirebase}> Turn Off</Button>
    const buttonOff = <Button onClick={updateFirebase}> Turn On</Button>

    return (
        <div>
            {props.lampObject.led !== undefined ? <Container>
                <Row>
                    <Col>
                        Lamp {props.lampObject.led}
                    </Col>
                    <Col style={{ padding: '0px' }}>
                        {props.lampObject.isTurnOn ? buttonOn : buttonOff}
                    </Col>
                </Row>
            </Container> : <p> LOADING </p>}
            <Table variant="dark" responsive>
                <tbody >
                    <tr style={{ height: '45vh' }} >
                        {props.lampObject.isTurnOn ? turnedOn : turnedOff}
                    </tr>

                </tbody>
            </Table>

        </div>
    )
}
