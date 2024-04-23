'use client'
import { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {urls} from '@/config/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {InquiryModal} from '@/components/InquiryModal'
import GA from '@/utils/SiteAnalytics'
import { useAuthContext } from '@/context/AuthContext';
import PartButton from '@/components/PartButton';
import Image from 'next/image';
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css';

export const PartSection = ({part})=>{
    const {user} = useAuthContext 
    let [modalShow, setModalShow] = useState(false)
    let [quantity, setQuantity] = useState(1)

    useEffect(()=>{
        new Viewer(document.getElementById('partImage'))
    })

    return (
        <Container>
            <InquiryModal shop={part.shop} part={part} show={modalShow} onHide={()=>{setModalShow(false)}}/>
            <Row>
                <Col>
                <Image id={`partImage`} src={`${urls.apiHost}/${part.part_image}`} width={200} height={200} />
                </Col>
                <Col md={8}>
                <p>{part.title}</p>
                <p>{part.description}</p>
                <p>{`In stock: ${part.stock}`}</p>
                <p>{part.price}</p>
                <div style={{
                    display: 'flex',
                    marginBottom: `20px`
                }}>
                <Form.Control style={{
                    width: 'auto',
                    marginRight: `20px`
                }} type="number" min="1" max={`${part.stock}`} value={quantity} onChange={(event)=>{setQuantity(parseInt(event.target.value))}}/>
                <PartButton partId={part.id} qty={quantity} />
                </div>
                <div>
                <Button onClick={() => {setModalShow(true)}}><FontAwesomeIcon icon={faQuestionCircle} /> Inquire</Button>
                </div>
                </Col>
            </Row>
        </Container>
    )
}