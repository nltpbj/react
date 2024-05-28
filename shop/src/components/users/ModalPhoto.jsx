import axios from 'axios';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPhoto = ({uid, form, callAPI}) => {
    const [fileName, setFileName] = useState(form.photo);
    const [file, setFile] = useState(null);
    const refPhoto = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const style={
        width: '150px',
        borderRadius:'50%',
        cursor:'pointer',
        border: '1px solid gray'
      }
    const onChangeFile = (e) => {
        setFileName(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onClickSave = async() => {
        if(!file){
            alert("변경할 이미지를 선택하세요");
            return;
        }
        if(!window.confirm("변경한 이미지를 저장하실래요?")) return;
        //이미지 업로드
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', uid);
        const res=await axios.post('/users/photo', formData);
        
        if(res.data.result==1){
            callAPI();
            handleClose();
        }
    }
    return (
        <>
         <img src={form.photo || "http://via.placeholder.com/50x50"}onClick={handleShow} width="50px"/>
          <Modal
            style={{top:'20%'}}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>

            <Modal.Header closeButton>
              <Modal.Title>프로필 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <img src={fileName || "http://via.placeholder.com/150x150"} 
                    onClick={()=>refPhoto.current.click()}  width="150px" style={style}/>
                <input onChange={onChangeFile} type='file' ref={refPhoto} style={{display:'none'}} />
            </Modal.Body>
            <Modal.Footer className='text-center'>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button onClick={onClickSave} variant="primary">저장</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalPhoto