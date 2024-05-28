import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const ModalAddress = (props) => {
    const {setForm, form} = props; 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onComplete = (e) => {
        //console.log(e);
        const address=e.buildingName ? `${e.address}(${e.buildingName})` : e.address;
        setForm({...form, address1:address});
        handleClose();
    }
    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            주소검색
          </Button>
          <Modal
            style={{top:'20%'}}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <DaumPostcodeEmbed onComplete={onComplete}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalAddress