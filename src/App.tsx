import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CommonLayout from "./components/layout/commonLayout";
import TopPage from "./pages/TopPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CsvUpload from "./pages/CsvUpload";
import DetailSearch from "./pages/DetailSearch";
import ParagraphSearch from "./pages/ParagraphSearch";
import Favorite from "./pages/Favorite";
import Exam from "./pages/Exam";
import ExamTest from "./pages/ExamTest";
import ExamList from "./pages/ExamList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CommonLayout />}>
          <Route path='/' element={<TopPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/csv_upload' element={<CsvUpload />} />
          <Route path='/detail_search' element={<DetailSearch />} />
          <Route path='/paragraph_search' element={<ParagraphSearch />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/exam_test' element={<ExamTest />} />
          <Route path='/exam_list' element={<ExamList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;