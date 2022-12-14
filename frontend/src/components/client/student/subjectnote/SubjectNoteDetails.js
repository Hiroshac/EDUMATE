import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../../common/Navigation/Navigation";
import { AiOutlineDownload } from "react-icons/ai";
import { AiOutlineFileDone } from "react-icons/ai";

export const SubjectNoteDetails = () => {
  const params = useParams();
  const id = params.id;
  console.log(id);

  const [item, setItem] = useState([]);
  const [note, setNote] = useState();
  const [subject, setSubject] = useState();
  const [yid, setTid] = useState();
  const [lesson_name, setLesson_name] = useState();
  const [grade, setGrade] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    axios.get(`/teacherNote/${id}`).then((res) => {
      setNote(res.data.note);
      setSubject(res.data.subject);
      setLesson_name(res.data.lesson_name);
      setGrade(res.data.grade);
    });
  }, []);
  axios.get(`/comment/get/${id}`).then((res) => {
    setItem(res.data);
  });
  console.log(item);

  const MessageData = (e) => {
		e.preventDefault();

		const messagedata = {
			note_id : id,
			note : lesson_name,
		comment
		};

		axios.post("/comment/add", messagedata).then((res) => {
			alert("Posted Comment");
		});

		console.log(messagedata);
	};

  return (
    <div>
      <Navigation />
      <div
        className="row border-1 shadow p-2"
        style={{ width: "60%", marginTop: "5%", marginLeft: "15%" }}
      >
        <div className="col">
          <div>
            <AiOutlineFileDone
              style={{ width: "50px", height: "50px", marginLeft: "3%" }}
            />
            <h7>{note}</h7>
          </div>
          <div>
            <form
              method="get"
              action={"http://localhost:5000/TeacherNotes/" + note}
            >
              <button type="submit" className="border-0 bg-transparent">
                <AiOutlineDownload
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "3%",
                    marginTop: "3%",
                  }}
                />
                Download
              </button>
            </form>
          </div>
        </div>
        <div className="col">
          <h6>{lesson_name}</h6><br/>
          <h6>{grade}</h6>
        </div>
      </div>

      {/* comment */}
        	{/* comment  */}
					<div>
						<div
							className="border shadow container rounded px-1 py-1 my-5"
							style={{ width: "80%" }}
						>
							<h3 className="text-center">Leave a Reply</h3>
							<form className="mx-2 mt-2" onSubmit={MessageData}>
								<div class="form-row">
									<div class="col">
										<input
											type="text"
											value={lesson_name}
											class="form-control border-0 border-bottom shadow"
											placeholder="Name"
											required
										/>
									</div>
                  {/* <div class="col">
										<input
											type="text"
											value={mname}
											onChange={(e) => setMName(e.target.value)}
											class="form-control border-0 border-bottom shadow"
											placeholder="Name"
											required
										/>
									</div> */}
								</div>
								<div class="form-row">
									<textarea
										rows={5}
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										class="form-control border-0 border-bottom shadow"
										id="exampleInputPassword1"
										placeholder="What's on your mind?"
										required
									/>
								</div>
								<div className=" text-center mb-2">
									<button type="submit" class="btn btn-primary">
										POST COMMMENT
									</button>
								</div>
							</form>
						</div>
					</div>

          	{/* show comments */}
					<div
						className="border container rounded shadow"
						style={{ width: "80%" }}
					>
						{item.map((datas) => {
							return (
								<div
									className="container my-4 border-bottom"
									style={{ width: "75%" }}
								>
									{/* <div className="row ">
										<h7 className="col-lg-3">{datas.mname}</h7>
										<h7 className="col-lg-3">date</h7>
									</div> */}
									<hr />
									<div className="row">
										<textarea
											rows={3}
											class="form-control border-0 border-bottom mb-1 "
										>
											{datas.comment}
										</textarea>
									</div>
								</div>
							);
						})}
					</div>
    </div>
  );
};
