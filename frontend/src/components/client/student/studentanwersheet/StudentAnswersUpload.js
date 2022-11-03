import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar";
import { AuthContext } from "../../../../context/AuthContext";
import Swal from 'sweetalert2'
import Navigation from "../../../common/Navigation/Navigation";

export const StudentAnswersUpload = () => {
  const hr = {
    borderLeft: "6px solid ",
    height: "300px",
  };

  async function SweatAlert(text, item) {
    // await sleep(1000)
    Swal.fire({
      icon: item,
      text: text,
    })
  }

  const { user } = useContext(AuthContext);
  const userId = user._id;
  console.log(user.stream);

  const params = useParams();
  const subjectname = params.name;
  // console.log(subjectname);


  const current = new Date();
  const dates = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const today = new Date();
  const times =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const [stream, setStream] = useState(user.stream);
  const [grade, setGrade] = useState("");
  const [lname, setLname] = useState("");
  const [date, setDate] = useState(dates);
  const [time, setTime] = useState(times);
  const [file, setFile] = useState([]);

  const ImageAdd = (e) => {
    setFile(e.target.files[0]);
  };
  //  document.getElementById("create-course-form").reset();
  const navi = new useNavigate();

  const Submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("stream", stream);
    formData.append("lname", lname);
    formData.append("subject", subjectname);
    formData.append("grade", grade);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("file", file);
    formData.append("student_id", userId);
   
    console.log(formData);

    setStream("");
    setLname("");
    setGrade("");
    setDate("");
    setTime("");
    setTime("");

    axios.post("/studentanswers/add", formData).then((res) => {
      SweatAlert('Successfully insereted', 'success');
      navi("/displayanswers");
    });
  };

  return (
    <div>
      <Navigation/>
      <div className="container mt- mb-5" style={{}}>
      <div className="  ">
          {/* <Link to */}
          <Link to={`/displayanswers`}>
            <button className="shadow rounded border-1 mt-1">Uploaded Answers</button>
          </Link>
        </div>
        <div className="mt- pt-3">
          <h1 className="text-center mt-5">AnswerSheet Upload </h1>
          <form onSubmit={Submit}>
            <div className="d-flex justify-content-center mt-5 mx-5 border-0 bg-light shadow rounded-2">
              <div className="mx- mt-5">
                <h3 className="mb-5">Upload file</h3>
                {/* image */}
                <div className="form-row">
                  <input
                    type="file"
                    multiple
                    filename="file"
                    onChange={ImageAdd}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="mx- my-4" style={hr} />
              <div className="mx-5 mt-5">
                {/* name */}
                <div className="form-row">
                  <label className="form-label">Stream</label>
                  <br />
                  <input
                    type="text"
                    name={stream}
                    value={user.stream}
                    onChange={(e) => setStream(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                {/* Subject */}
                <div className="form-row">
                  <label className="form-label">Subject</label>
                  <br />
                  <input
                    type="text"
                    name={subjectname}
                    value={subjectname}
                    onChange={(e) => setStream(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                {/* lname */}
                <div className="form-row">
                  <label className="form-label">Lesson Name</label>
                  <br />
                  <input
                    type="text"
                    name={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                {/* Grade */}
                <div className="form-row">
                  <label className="form-label">Grade</label>
                  <br />
                  <input
                    type="text"
                    name={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                {/* Date */}
                <div className="form-row d-flex mt-4">
                  <div className="">
                    <input
                      type="text"
                      name={date}
                      value={dates}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-input"
                      disabled
                    />
                  </div>
                  {/* Time  */}
                  <div className="">
                    <input
                      type="text"
                      name={time}
                      value={times}
                      onChange={(e) => setTime(e.target.value)}
                      className="form-input"
                      disabled
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary my-4">
                    submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
