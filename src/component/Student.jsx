import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faWarning } from '@fortawesome/free-solid-svg-icons';


const Student = (props) => {
  const[editMode, setEditMode] = useState(false);
  const[firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gradYear, setGradYear] = useState('');

  useEffect(() => {
    setFirstName(props.student.firstName)
    setLastName(props.student.lastName)
    setEmail(props.student.email);
    setGradYear(props.student.gradYear)
  }, [])

  const saveStudent = () => {
    setEditMode(false);
    const updatedStudent = {firstName: firstName, lastName: lastName, email: email, gradYear: gradYear, id: props.student.id, image: props.student.image}
    props.updateStudent(updatedStudent);
  }

  return (
        <div className='card'>


<img src={props.student.image} alt='image one' className='card-image-top mx-auto'/>
{!editMode && <ul className='list-group list-group-flush'>

  <li className='list-group-item text-center'>{props.student.firstName}</li>
  <li className='list-group-item text-center'>{props.student.lastName}</li>
  <li className='list-group-item text-center'>{props.student.email}</li>
  <li className='list-group-item text-center'>{props.student.gradYear}</li>
    <button type='button' className='btn btn-danger' onClick={() => props.removeStudent(props.student)}>Delete Pokemon <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon></button>
    <button type='button' className='btn btn-dark'onClick={() => setEditMode(true)}>Edit Pokemon <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
</ul>
}
{editMode && 
  <ul className='list-group list-group-flush'>
<li className='list-group-item text-center'><input type='text' className='form-control' value={firstName} onChange={(evt) => setFirstName(evt.currentTarget.value)} /></li>
<li className='list-group-item text-center'><input type='text' className='form-control' value={lastName} onChange={(evt) => setLastName(evt.currentTarget.value)} /></li>
<li className='list-group-item text-center'><input type='text' className='form-control' value={email} onChange={(evt) => setEmail(evt.currentTarget.value)} /></li>
<li className='list-group-item text-center'><input type='text' className='form-control' value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)} /></li>
<li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveStudent}>Save</button></li>
</ul>}
</div>
  )
}

export default Student