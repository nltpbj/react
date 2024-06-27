import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Row, Col, Form, InputGroup, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Detail = ({form, setForm, callAPI, good}) => {
  const [files, setFiles]= useState([]);
  const [attaches, setAttaches] = useState([]);

  const style ={
    border: '1px solid gray',
    width: '100%',
  }

  const callAttach = async() => {
    const res= await axios.get(`/goods/attach/${form.gid}`);
    console.log(res.data);
    setAttaches(res.data);

  }

  useEffect(()=> {
    callAttach();
  }, []);

  const onClickSave = async() => {
    if(good.contents===form.contents) return;
    if(!window.confirm('상세정보를 저장하실래요?')) return;
    await axios.post('/goods/update/contents', 
          {gid:form.gid, contents:form.contents});
    alert("상세정보저장!");
    callAPI();
  }


  const onChangeFiles = (e) => {
    
    let selFiles=[]
    for(let i=0; i<e.target.files.length; i++){
      const file={
        name:URL.createObjectURL(e.target.files[i]),
        byte:e.target.files[i]
      }
      selFiles.push(file);
    }
    setFiles(selFiles);
  }

  const onClickAttach = async() => {
    if(files.length === 0) return;
    if(!window.confirm(`${files.length}개 파일을 업로드하실래요?`)) return;
    
    //** 파일 업로드 */
    const formData = new FormData();
    for(let i=0; i<files.length; i++){
      formData.append('bytes', files[i].byte);
    }
    await axios.post(`/goods/attach/${form.gid}`, formData);
    alert("첨부파일업로드!");
    callAttach();
    setFiles([]);
  }

  //** 업로드한 파일삭제 */
  const onClickDelete = async(att) => {
    if(!window.confirm(`${att}번 이미지를 삭제하실래요?`)) return;
    await axios.post('/goods/attach/delete', att);
    alert("첨부파일삭제");
    callAttach();
  }

  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3">



    <Tab eventKey="home" title="상세정보">
      <div className='text-end mb-2'>
        <Button onClick={onClickSave}>상세정보저장</Button>
      </div>


      <CKEditor
        editor={ClassicEditor}
        data={form.contents}
        onChange={(e, editor)=>setForm({...form, contents:editor.getData()})}/>


    </Tab>


    <Tab eventKey="profile" title="첨부파일">

      <InputGroup>
        <Form.Control onChange={onChangeFiles}
            type='file' multiple={true}/>
        <Button onClick={onClickAttach}>첨부파일저장</Button>
      </InputGroup>

      <Row className='my-5'>


        {files.map(file=>
          <Col key={file.name} md={3}>
            <img src={file.name} width='100%'/>
          </Col>
        )}
        
      </Row>  
    </Tab>
    <Tab eventKey="attach" title="첨부한파일">
        <Row>
          {attaches.map(att=>
            <Col key={att.aid} xs={2} className='mb-3'>
              <div style={{position:'relative'}}>
                  <Badge onClick={()=>onClickDelete(att)} 
                    bg='danger' style={{position:'absolute', top:'10px', left:'10px', cursor:'pointer'}}>x</Badge>
              </div>
              <img src={att.filename} style={style}/>
            </Col>
          )}
        </Row>
    </Tab>
  </Tabs>
  )
}

export default Detail