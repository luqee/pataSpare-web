import {Modal} from 'react-bootstrap';
import {UserLoginForm} from '@/forms/UserLoginForm';

export const LoginModal = ({onHide, modalShow})=>{

    return (
        <Modal
            show={modalShow}
            onHide={onHide}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
            <UserLoginForm />
            </Modal.Body>
        </Modal>
    )
}