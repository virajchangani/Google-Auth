import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentField, setStudentField] = useState("");
  const [studentSubject, setStudentSubject] = useState(""); 
  const [studentMarks, setStudentMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Users"));
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addData = async () => {
    const studentData = { studentName, studentField, studentSubject, studentMarks, grade }; 

    if (editIndex === null) {
      await addDoc(collection(db, "Users"), studentData);
    } else {
      await updateDoc(doc(db, "Users", editIndex), studentData);
      setEditIndex(null);
    }

    clearFields();
    fetchData();
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Users", docId));
    fetchData();
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setStudentName(singleData.studentName);
    setStudentField(singleData.studentField);
    setStudentSubject(singleData.studentSubject);
    setStudentMarks(singleData.studentMarks);
    setGrade(singleData.grade);
    setEditIndex(docId);
  };

  const clearFields = () => {
    setStudentName("");
    setStudentField("");
    setStudentSubject("");  
    setStudentMarks("");
    setGrade("");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder='Student Name'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Field'
          value={studentField}
          onChange={(e) => setStudentField(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Subject'  
          value={studentSubject}
          onChange={(e) => setStudentSubject(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Student Marks'
          value={studentMarks}
          onChange={(e) => setStudentMarks(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder='Grade'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="input-field"
        />
        <button onClick={addData} className="submit-button">
          {editIndex === null ? "Add" : "Update"}
        </button>
      </div>

      <table className="record-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Field</th>
            <th>Student Subject</th>
            <th>Student Marks</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {record.map((e) => (
            <tr key={e.docId}>
              <td>{e.studentName}</td>
              <td>{e.studentField}</td>
              <td>{e.studentSubject}</td>
              <td>{e.studentMarks}</td>
              <td>{e.grade}</td>
              <td>
                <button onClick={() => editData(e.docId)} className="edit-button">Edit</button>
                <button onClick={() => deleteData(e.docId)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}