import { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
  import axios from "axios";
//   import { useParams } from "react-router-dom";

const EditCar=({getCars, toggleEditModal,editCarData,editmodal,setEditCarData})=>{  //nhận method getCars(),.... từ CarList truyền vào
    // const param=useParams(); //lấy param :carId được định nghĩa trong thẻ Route của App.js
    // useEffect(()=>{
    //     console.log(param.carId); 
    // },[]);
    const onChangeModel=(event)=>{
        setEditCarData(previousState=>{
            return {...previousState,hãng: event.target.value};
        });
        console.log(editCarData);
    };
   

    const onChangeDesc=(event)=>{
        setEditCarData(previousState=>{
            return {...previousState,màu: event.target.value};
        });
        console.log(editCarData);
        
    };

    const onChangeProduced=(event)=>{
        setEditCarData(previousState=>{
            return {...previousState,produced_on: event.target.value};
        });
        console.log(editCarData);
    };

    const onChangeImage=(event)=>{
        // console.log("tét");
        const preImg=document.getElementById('preview-img');
        const file=event.target.files[0];
        // if(file){
        //     var reader = new FileReader();
        //     reader.onload = (e)=> {
        //         const obj_url=URL.createObjectURL(file);
        //         preImg.setAttribute('src', obj_url);
        //         URL.revokeObjectURL(obj_url);
        //     };
            
        //     // 
        // }
        // console.log(preImg.src);
        setEditCarData(previousState=>{
            return {...previousState,image:event.target.files[0].name,file:URL.createObjectURL(file)};
        });
        
        console.log(editCarData);
    };

    const onRedirect=()=>{
        toggleEditModal(editCarData); //truyền lại editCarData cho phương thức cha
        getCars();  //cập nhật lại biến state cars
    };

    const onSubmitEditForm=(event)=>{
        event.preventDefault(); //ngăn tải form do mặc định
      
        const fileInput=document.querySelector('#fileupload');
        const formData=new FormData();
        formData.append('image',fileInput.files[0]);
        formData.append('màu',editCarData.màu);
        formData.append('hãng',editCarData.hãng);
        formData.append('produced_on',editCarData.produced_on);
        formData.append("_method","put");

        //dùng axios (ko dùng fetch với method put đc), nhưng dùng put thì ko truyền form data đc
        axios
        .post('http://localhost:8000/api/cars/'+editCarData.id, formData)
        .then((res) => {
            console.log(res.data);
            if (res.data.status==="error") {
                console.log(res.data.errors);
            }
            else{
            console.log('Car updated!');
            onRedirect();
            }       
        })
        .catch((err) => {
            console.log(err);
            console.log('Update car Error');
            });
        };   //đóng hàm onSubmitEditForm

    
    return(
        <div>
            <Modal isOpen={editmodal} toggle={toggleEditModal}>
            <form onSubmit={onSubmitEditForm} encType="multipart/form-data" method="put">
             <ModalHeader toggle={toggleEditModal}>Edit a car</ModalHeader>
             <ModalBody>
                <FormGroup>
                  <Label for="model">Hãng</Label>
                  <Input id="model" name="hãng" onChange={onChangeModel} value={editCarData.hãng?editCarData.hãng:''}/>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Màu</Label>
                  <Input id="description" name="màu" onChange={onChangeDesc} value={editCarData.màu?editCarData.màu:''}/>
                </FormGroup>
                <FormGroup>
                {/* <Label for="mf_id">Manufacturer</Label> */}
                {/* <select name="mf_id" onChange={handlerMf}>
                  {mfs.mfsList.map((mf, index) => {
                    return (
                      <option value={mf.id} key={index}>
                        {mf.mf_name}
                      </option>
                    );
                  })}
                </select> */}
              </FormGroup>
                <FormGroup>
                  <Label for="produced_on">Produced_on</Label>
                  <Input type="date" id="produced_on" name="produced_on" onChange={onChangeProduced} value={editCarData.produced_on?editCarData.produced_on:''}/>
                </FormGroup>
                 <FormGroup>
                  <Label for="image">Image</Label>
                  <Input id="fileupload" type="file" name="image" onChange={onChangeImage}/>
                    <img id="preview-img" className="img-thumbnail img-fluid" src={editCarData.file?editCarData.file:"http://localhost:8000/img/"+editCarData.image}/>                   
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button type="submit" color="primary"> Update </Button>
                  <Button color="secondary" onClick={toggleEditModal}> Cancel </Button>
               </ModalFooter>
               </form>
            </Modal>
          </div>
    
          );
};
export default EditCar;     


