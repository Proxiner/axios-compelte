import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.scss";

export default function Home() {
  const [fullname, setFullname] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        setStudents(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (
      students.some(
        (student) => student.fullname.toLowerCase() === fullname.toLowerCase()
      )
    ) {
      setError("This fullname already exists!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/students", {
        fullname,
      });
      setStudents((prev) => [...prev, response.data]);
      setFullname("");
      setError("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeStudent = async () => {
    try {
      const matchedStudent = students.find(
        (student) => student.fullname === fullname
      );
      if (matchedStudent) {
        await axios.delete(
          `http://localhost:3000/students/${matchedStudent.id}`
        );
        setStudents((prev) =>
          prev.filter((student) => student.id !== matchedStudent.id)
        );
        setFullname("");
        setError("");
      } else {
        setError("Student isn't found!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateStudent = async () => {
    // Implement update logic here
  };

  const patchStudent = async () => {
    // Implement patch logic here
  };

  return (
    <div className="container">
      <h1>Student Management</h1>
      <input
        type="text"
        placeholder="Enter Fullname"
        value={fullname}
        onChange={(event) => setFullname(event.target.value)}
      />
      <div className="button-container">
        <button className="add-button" onClick={addStudent}>
          Add
        </button>
        <button className="remove-button" onClick={removeStudent}>
          Delete
        </button>
        <button className="patch-button" onClick={patchStudent}>
          Patch
        </button>
        <button className="update-button" onClick={updateStudent}>
          Update
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.fullname}</li>
        ))}
      </ul>
    </div>
  );
}
