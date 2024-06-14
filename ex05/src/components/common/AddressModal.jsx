import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const AddressModal = ({setForm, form}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onComplte = (e) => {
        console.log(e);
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
            style={{top:'10%'}}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>주소검색</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DaumPostcodeEmbed onComplete={onComplte}/>
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

export default AddressModal