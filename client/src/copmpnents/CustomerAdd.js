import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
   super(props);
   this.state ={
    file: null,   //byte 데이터를 의미
    userName: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '' //보내고자 하는 파일 이미지의 이름

   }
 
    }

    handleFormSubmit = (e) => { 
         e.preventDefault()
         this.addCustomer()
         .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
         })
          this.setState({
      
            file: null,   
            userName : '',
            birthday : '',
            gender : '', 
            job: '',
            fileName: '' 
            })
         
            }
        handleFileChange= (e) => {
          this.setState( {
        file: e.target.files[0],
        fileName:e.target.value 
    })
 
    }
    handleValueChange = (e) => {
   
    let nextState = {};
   nextState[e.target.name] = e.target.value; 
   this.setState(nextState);

    }
  addCustomer =  () => {
  
  const formData =  new FormData(); //URLSearchParams();
  formData.append('image', this.state.file);
  formData.append('name',this.state.userName);
  formData.append('birthday',this.state.birthday);
  formData.append('gender',this.state.gender);
  formData.append('job',this.state.job);
  
axios({
      url: '/api/customers',
    //url: 'http://localhost:3000/api/customers',
    method: 'POST',
    data: formData,
    headers: {
           'content-type': 'multipart/form-data'
         },
   
    
})
.then(res => {
      console.log(res.data);
})
.catch(() => {
    console.log("err");
  });
//return 
}
 
    render() {
        return (
 <from onSubmit = {this.handleFormSubmit }>
      <h1> 고객 추가</h1>
           프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
          이름:<input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
          생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
          성 별:<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
          직 업:<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button onClick = {(e) =>this.addCustomer(e)}> 추가하기 </button>
 </from> 

        )
    }
 
}

export default CustomerAdd; 