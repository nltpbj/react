import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GiConfirmed } from "react-icons/gi";
import { CiWarning } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";

const Box = ({ box, setBox }) => {
    const style={
        color:'blue',
          fontSize:'3rem'
      }
    const style1={
        color:'red',
          fontSize:'3rem'
    }
    

   //확인버튼
   const onClose = () => {
    if(box.action2) {
      box.action2();
    }
    setBox({...box, show:false});
  }

  //예버튼
  const onAction = () => {
    box.action();
    onClose();
  }

  //아니오버튼
  const onCancel = () => {
    setBox({...box, show:false});
  }
    return (
        <>
            <Modal
                style={{ top: '10%' }}
                show={box.show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                         {box.action ? '선택' : '경고'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {box.action ? 
                <FcApproval style={style} className='me-2'/> 
                : 
                <CiWarning style={style1} className='me-2'/>
            }
            {box.message}
                </Modal.Body>

                <Modal.Footer>
                    {box.action ?
                        <>
                            <Button variant="secondary" onClick={onClose}>
                                아니요
                            </Button>
                            <Button variant="primary" onClick={onAction}>예</Button>
                        </>
                        :
                        <Button onClick={onClose}>확인</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Box