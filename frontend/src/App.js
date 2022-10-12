import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UploadNote } from './components/client/teacher/uploadNote.js'
import { ExamTimeTable } from './components/client/student/examtimetable/ExamTimeTable.js'
import { FeedBack } from './components/client/student/feedback/FeedBack.js'
import { UploadLink } from './components/client/teacher/UploadLink.js'
import { ViewLinks } from './components/client/teacher/viewLinks'
import { Updatelink } from './components/client/teacher/Updatelink'
import AddStreams from './components/admin/streams/AddStreams'
import AddSubjects from './components/admin/streams/AddSubjects'
import ViewStreams from './components/admin/streams/ViewStreams'
import ViewSubjects from './components/admin/streams/ViewSubjects'
import UpdateStreams from './components/admin/streams/UpdateStreams'
import UpdateSubjects from './components/admin/streams/UpdateSubjects'
import AdminHome from './components/admin/AdminHome'
import { ViewNote } from './components/client/teacher/ViewNote'
import { UpdateNote } from './components/client/teacher/UpdateNote'
import Main from './components/common/userReg/Main.js'
import SignIn from './components/common/userReg/SignIn.js'
import SignUp from './components/common/userReg/SignUp.js'
import Profile from './components/common/Profile/Profile.js'
import Update from './components/common/Profile/Update'
import AddSubjectTimeTable from './components/admin/Time Tables/AddSubjectTimeTable'
import ViewSubjectTimeTable from './components/admin/Time Tables/ViewSubjectTimeTable'
import AddExamTimeTable from './components/admin/Time Tables/AddExamTimeTable'
import ViewExamTimeTable from './components/admin/Time Tables/ViewExamTimeTable'
import UpdateExamTimeTable  from './components/admin/Time Tables/UpdateExamTimeTable'
import UpdateSubjectTable  from './components/admin/Time Tables/UpdateSubjectTable'
import SearchedExam from './components/admin/Time Tables/SearchedExam'
import { ViewStudentPaper } from './components/client/teacher/ViewStudentPaper'
import { AuthContext } from './context/AuthContext'
import UserManagement from './components/admin/UserManagement'
import ForgetPwd from './components/common/Profile/ForgetPwd'
import UpdateUser from './components/admin/UpdateUser'
import AddUser from './components/admin/AddUser'
import AddAdmin from './components/admin/AddAdmin'
import OTPverification from './components/common/userReg/OTPverification'
import ForgetPassword from './components/common/userReg/ForgetPassword'
import './components/common/userReg/main.css'
import { MarkPaper } from './components/client/teacher/MarkPaper.js'
import { UpdateMark } from './components/client/teacher/UpdateMark.js'
import { ViewComments } from './components/client/teacher/ViewComments.js'
import { NotesReport } from './components/client/teacher/NotesReport'
import UserReport from './components/admin/UserReport'
import { Navbar } from './components/common/Navbar.js'
import { SubjectNote } from './components/client/student/subjectnote/SubjectNote.js'

import { CommentForSubject_Notes } from './components/client/student/comment_for_subject_notes/CommentForSubject_Notes.js'
import { DisplayAnswersheets } from './components/client/student/studentanwersheet/DisplayAnswersheets.js'
import { StudentAnswersUpload } from './components/client/student/studentanwersheet/StudentAnswersUpload.js'
import { SubjectTimetableDisplay } from './components/client/student/subjecttimetable/SubjectTimetableDisplay.js'

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const StudentProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user.type != "Student") {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const TeacherProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user.type != "Teacher") {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <UploadNote/> */}
      <BrowserRouter>
        <Routes>
          {/*common*/}
          <Route exact path={'/'} element={<Main />} />
          <Route exact path={'/login'} element={<SignIn />} />
          <Route exact path={'/logout'} element={<SignIn logout={true} />} />
          <Route exact path={'/register'} element={<SignUp />} />
          <Route exact path={'/profile'} element={<Profile />} />
          <Route exact path={'/updateProfile'} element={<Update />} />
          <Route exact path={'/navbar'} element={<Navbar />} />
          <Route exact path={'/forgotPassword'} element={<OTPverification />} />
          <Route exact path={'/resetPassword'} element={<ForgetPassword />} />
          <Route
            exact
            path={"/profile"}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={"/updateProfile/:id"}
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={'/forgetPwd/:id'}
            element={
              <ProtectedRoute>
                <ForgetPwd />
              </ProtectedRoute>
            }
          />

          {/* user admin */}
          <Route
            exact
            path={'/viewuser'}
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={'/updateuser/:id'}
            element={
              <ProtectedRoute>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={'/adduser'}
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={'/addadmin'}
            element={
              <ProtectedRoute>
                <AddAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={'/admin/home'}
            element={
              <ProtectedRoute>
                <UserReport />
              </ProtectedRoute>
            }
          />

          {/* admin */}
          <Route
            exact
            path={"/adminhome"}
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route exact path={'/addstream'} element={<AddStreams />} />
          <Route exact path={'/addsubject'} element={<AddSubjects />} />
          <Route exact path={'/getstream'} element={<ViewStreams />} />
          <Route exact path={'/getsubject'} element={<ViewSubjects />} />
          <Route exact path={'/editstrm/:_id'} element={<UpdateStreams />} />
          <Route exact path={'/addsubtime'} element={<AddSubjectTimeTable />} />
          <Route exact path={'/getsubtime'} element={<ViewSubjectTimeTable />} />
          <Route exact path={'/addexam'} element={<AddExamTimeTable />} />
          <Route exact path={'/getexam'} element={<ViewExamTimeTable />} />
          <Route exact path={'/editexam/:_id'} element={<UpdateExamTimeTable />} />
          <Route exact path={'/editsubtbl/:_id'} element={<UpdateSubjectTable />} />
          <Route exact path={'/searchexam'} element={<SearchedExam />} />

          <Route
            exact
            path={"editsubj/:_id"}
            element={<UpdateSubjects />}
          ></Route>

          {/* student  */}
          <Route
            exact
            path={"/studentanswersheetUpload"}
            element={<StudentAnswersUpload />}
          />
          <Route exact path={"/examtimetable"} element={<ExamTimeTable />} />
          <Route exact path={"/subjectnote"} element={<SubjectNote />} />
          <Route exact path={"/feedback"} element={<FeedBack />} />
          <Route exact path={"/subjecttimetable"} element={<SubjectTimetableDisplay />} />
          <Route exact path={"/commentforsubjectnote"} element={<CommentForSubject_Notes />} />
          <Route exact path={"/displayanswers"} element={<DisplayAnswersheets />} />

          {/* teacher */}
          <Route exact path='/addlink' element={<UploadLink />} />
          <Route exact path='/viewlink' element={<ViewLinks />} />
          <Route exact path='/updatelink/:id' element={<Updatelink />} />
          <Route exact path='/addNote' element={<UploadNote />} />
          <Route exact path='/viewNote' element={<ViewNote />} />
          <Route exact path='/updatenote/:id' element={<UpdateNote />} />
          <Route exact path='/papers' element={<ViewStudentPaper />} />
          <Route exact path='/markpapers/:id' element={<MarkPaper />} />
          <Route exact path='/viewmark' element={<UpdateMark />} />
          <Route exact path='/viewComments/:id' element={<ViewComments />} />
          <Route exact path='/notereport' element={<NotesReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App