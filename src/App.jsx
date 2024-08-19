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
    firstName: "Dewott",
    lastName: "Water Type",
    email: "Unova Region",
    image: "images/dewott.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Darkrai",
  lastName: "Dark Type",
  email: "Sinnoh Region",
    image: "images/darkrai.jpg",
    gradYear: 4
}, {



  id: nanoid(),
  firstName: "MEGA Blaziken",
  lastName: "Fire Type",
  email: "Kalos Region",
    image: "images/blaziken.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Liligant",
  lastName: "Grass Type",
  email: "Hisui Region",
    image: "images/lilligant.jpg",
    gradYear: 5
}, {

  id: nanoid(),
  firstName: "Zeraora",
  lastName: "Electric Type",
  email: "Alola Region",
    image: "images/zeraora.jpg",
    gradYear: 7
}, {

  id: nanoid(),
  firstName: "Yveltal",
  lastName: "Legend Dark & Flying Type",
  email: "Kalos Region",
    image: "images/yveltal.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Mega Medicham",
  lastName: "Fighting & Psychic Type",
  email: "Hoenn Region",
    image: "images/medicham-mega.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Tinkatuff",
  lastName: "Fairy & Steel Type",
  email: "Paldea Region ",
    image: "images/tinkatuff.jpg",
    gradYear: 6
}, {

  id: nanoid(),
  firstName: "Empoleon",
  lastName: "Water & Steel Type",
  email: "Sinnoh Region",
    image: "images/empoleon.jpg",
    gradYear: 4
}, {

  id: nanoid(),
  firstName: "Sudowoodo",
  lastName: "Rock Type",
  email: "Johto Region",
    image: "images/sudowoodo.jpg",
    gradYear: 2
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
        <label htmlFor='txtKeywords'>Search By Pokemon Or Type</label>
        <input type='text' className='form-control' placeholder='Search Pokemon Or Type' onChange={ e => setKeywords(e.currentTarget.value)} value={keywords}/>
      </div>
      <div className='col-md-4'>
        <select className='form-select' value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)}>
          <option value=''>Select By Generation</option>
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
        <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Pokemons <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
      </div>
      </div>
    </div>
  )
}

export default App
