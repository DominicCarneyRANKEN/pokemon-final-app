import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from  'nanoid';
import AddStudent from './component/AddStudent';
import Student from './component/Student';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [allStudents, setAllStudents] = useState(null)
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [gradYear, setGradYear] = useState('');

  useEffect(() => {
    const studentsLocalStorage = localStorage.getItem('students');
    if(studentsLocalStorage){
      saveStudents(JSON.parse(studentsLocalStorage));
    }else {
      saveStudents(students);
    }
  }, [] );

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if(localStorage){
      localStorage.setItem('students', JSON.stringify(students))
    }
  }

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent]
    saveStudents(updatedStudents)
  }

  const searchStudents = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(gradYear){
      keywordsArray.push(gradYear.toString());
    }

    if (keywordsArray.length > 0 ){
      const searchResults = allStudents.filter((student) => {
        for (const word of keywordsArray){
          if(
            student.firstName.toLowerCase().includes(word) || 
            student.lastName.toLowerCase().includes(word) ||
            student.gradYear === parseInt(word)
          ){
            return true;
          }
        }
        return false;
      })
      setSearchResults(searchResults);

    }else {
      setSearchResults(allStudents);
    }
  }

  const removeStudent = (studentToDelete) => {
    //console.table(studentToDelete);
    const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  }

  const updateStudent = (updatedStudent) => {
    console.table(updatedStudent);
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student, ...updatedStudent} : student);
    saveStudents(updatedStudentsArray); 

  }

  const students =[{ 
    id: nanoid(),
    firstName: "Claude",
    lastName: "Cartan",
    email: "ccartan0@hud.gov",
    image: "images/student1.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Loise",
  lastName: "Isson",
  email: "lisson1@fda.gov",
    image: "images/student2.jpg",
    gradYear: 6
}, {



  id: nanoid(),
  firstName: "Flore",
  lastName: "Marden",
  email: "fmarden2@businesswire.com",
    image: "images/student3.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Culley",
  lastName: "Carnall",
  email: "ccarnall3@icq.com",
    image: "images/student4.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Tobey",
  lastName: "Petersen",
  email: "tpetersen4@apple.com",
    image: "images/student5.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Nevsa",
  lastName: "MacMickan",
  email: "nmacmickan5@elpais.com",
    image: "images/student6.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Avictor",
  lastName: "Sawyer",
  email: "asawyer6@networkadvertising.org",
    image: "images/student7.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Imelda",
  lastName: "Balogun",
  email: "ibalogun7@hatena.ne.jp",
    image: "images/student8.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Ricardo",
  lastName: "Cabrales",
  email: "rcabrales8@hubpages.com",
    image: "images/student9.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Amii",
  lastName: "Cumpsty",
  email: "acumpsty9@ihg.com",
    image: "images/student10.jpg",
    gradYear: 6
  }]

  

  return (
    <div className='container'>
      <div className='row'>
        <h3>All Pokemon</h3>
      {searchResults && searchResults.map((student) =>(
        <div className='col-md-2' key={student.id}>
        <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent}/>
        </div>)
      )}

        
      </div>
      {/*!allStudents && <button type='button' className='btn btn-lg btn-success' onClick={() => setAllStudents(students)}>Save Students</button>*/}
      {<AddStudent addStudent={addStudent}/>}
      < div className='row mt-4'>
      <div className= 'col-md-4'>
        <label htmlFor='txtKeywords'>Search by first or last</label>
        <input type='text' className='form-control' placeholder='Search First or Last Name' onChange={ e => setKeywords(e.currentTarget.value)} value={keywords}/>
      </div>
      <div className='col-md-4'>
        <select className='form-select' value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)}>
          <option value=''>Select Year</option>
          {_.chain(allStudents)
            .map((student) => student.gradYear)
            .sort()
            .uniq()
            .map((year) => (
              <option key={year} value={year}>
              {year}
            </option>
            ))
            .value()}
        </select>
      </div>
      <div className='col-md-4'>
        <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Students <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
      </div>
      </div>
    </div>
  )
}

export default App
