import React, {useState} from 'react'
import {nanoid} from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import './AddStudent.css';

const AddStudent = (props) => {
     const [firstName, setFirstName] = useState('');
     const[lastName, setLastName] = useState('');
     const[email, setEmail] = useState('');
     const [selectedFile, setSelectedFile] = useState();
     const[gradYear, setGradYear] = useState('');

     const imageUpdate = (e) => {
        setSelectedFile(e.target.files[0]);
     }

     const doWork = () => {
        const newStudent = {'id': nanoid(), 'firstName': firstName, 'lastName': lastName, 'email': email, 'image': URL.createObjectURL(selectedFile), 'gradYear': parseInt(gradYear)}
        props.addStudent(newStudent);
     }


  return (
    <div className='row mt-5'>
        <div className='col-md-2'>
            <h3>Add Student</h3>
            <label  htmlFor='txtFirstName' className='form-label'>First Name</label>
            <input type='text' id='txtFirstName' placeholder='First Name' className='form-control' onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName}/>
        </div>
        <div className='col-md-2'>
            <label  htmlFor='txtLastName' className='form-label'>Last Name</label>
            <input type='text' id='txtLastName' placeholder='First Name' className='form-control' onChange={(evt) => setLastName(evt.currentTarget.value)} value={lastName}/>

        </div>
        <div className='col-md-2'>
            <label  htmlFor='txtEmail' className='form-label'>Email</label>
            <input type='email' id='txtEmail' placeholder='Email' className='form-control' onChange={(evt) => setEmail(evt.currentTarget.value)} value={email}/>
        </div>
        <div className='col-md-2'>
            <label  htmlFor='fileUpload' className='form-label'>Student Image</label>
            <input type='file' name='file' id='fileUpload' onChange={imageUpdate}/>
        </div>
        <div className='col-md-2'>
            <label  htmlFor='txtGradYear' className='form-label'>Generation</label>
            <input type='text' id='txtGradYear' placeholder='Graduation Year' className='form-control' onChange={(evt) => setGradYear(evt.currentTarget.value)} value={gradYear}/>
         
        </div>
        <div className='col-md-4'>
            <button type='button' className='btn btn-success' id='btnAdd' onClick={doWork}>Add Student <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></button>
        </div>


    </div>
  )
}

export default AddStudent