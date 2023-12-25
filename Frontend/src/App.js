import React , {useEffect, useState} from "react"
import axios from 'axios'
import "../src/App.css"



function App() {
  const [file , setFileName] = useState();
  const [image , setImage] = useState();
  const [iden , setIdentificationNumber] = useState();
  const [id , setId] = useState("");
  const [firstName , setFirstName] = useState();
  const [lastName , setLastName] = useState();
  const [dob , setDateOfBirth] = useState();
  const [doi , setDateOfIssue] = useState();
  const [doe , setDateofExpiry] = useState();
  const [okstate , setOk] = useState("");


  const monitorFileChange = (e) => {
    setFileName(e.target.files[0]);
  };



  const uploadformimage = () => {
    const formData = new FormData();
    formData.append("file" , file);
    alert("Image is uploading! Please wait for few minutes");
    axios.post('http://localhost:5000/upload' , formData)
    .then(res => {
      setImage(res.data.image);
      setId(res.data._id);
  })
    .catch(err => console.log(err))
  }

  const responseobj = async () => {
    try {
      const uri = `http://localhost:5000/api/users/${id}`;
      const res = await axios.get(uri);
      console.log("analyse id ->" , id)
      console.log("analyse resonse ->" , res)
      
      setIdentificationNumber(res.data.identificationNumber);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setDateOfBirth(res.data.dateOfBirth);
      setDateOfIssue(res.data.dateOfIssue);
      setDateofExpiry(res.data.dateOfExpiry);
      setOk("OK");

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
  

  return ( 
    <>
    
      <div className="ocr">
        <p className="headingtext">THAI ID OCR</p>
        </div>
      <div className="imgupld">
          <img src = {'http://localhost:5000/Images/' + image} alt="" className="imgupld"/>
      </div>
      
      <div className="inputimageselector">
      <input type="file" className="input" onChange={monitorFileChange}/>
      </div>
      <div className="upload">
        <button type="button" className="submitbtn" onClick={uploadformimage}> Submit</button>
        <button type="button" className="butn" onClick={responseobj}>Extract Data</button>
      </div>
      <div className="par">
        
        <div className="items">
          {okstate === "OK" ? (
            <div>
              <p >Identification Number : <span>{iden}</span></p>
              <p >First Name : <span>{firstName}</span></p>
              <p>Last Name : <span>{lastName}</span></p>
              <p>Date of Issue : <span>{doi}</span></p>
              <p>Date of Expiry : <span>{doe}</span></p>
              <p>DOB : <span>{dob}</span></p>
            </div>
            
          ) : (
            <p></p>
          )}
          
          
        </div>
        
      </div>
      
    </>
  );
}

export default App;