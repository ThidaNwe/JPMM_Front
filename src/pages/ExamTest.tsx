import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import '../sass/custom/exam.scss';
import QuestionName from './QuestionName';
type data = {
	level: any,
	Test_Title: any;
};

const ExamTest = () => {
	const [list, setList] = useState<any[]>([]);
	const [level, setLevel] = useState();
	const [title, settestTitle] = useState();
	const [test, setTest] = useState();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const location = useLocation();

	useEffect(() => {
		const question_list = {
			'data': location.state
		}
		Object.entries(question_list).map(([key, value]: any) => {
			setLevel(value.myData.level);
			settestTitle(value.myData.title);
			setTest(value.myData.test);
			setList(value.myData.data);
		})


	}, []);
	console.log(list);


	return (
		<>
			<div className="sec-exam">
				<div className="container">
					<h2 className="exam-ttl">{level}{title}{test}</h2>
					<div className="question-block">
						{list.map((data, index) => (
							<div key={index} className="inr-block">
								<div className="inr-wrap inr-block">
									<>
										<div className="question-number" key={index}>
											<p>第{data.Q_no}</p>
										</div>
										<div className="question-content">
											<div className="question_text furigana_enabled">
												<QuestionName question={data.Question} underline={data.UnderLine} />
											</div>
											<div className="answer-list row">
												<div className="inr-btn">
													<input type="radio" id="question01_1" value="1. がくこう" name="question01" />
													<label htmlFor="question01_1">{data.Ans1}</label>
												</div>
												<div className="inr-btn">
													<input type="radio" id="question01_2" value="2. がっこう" name="question01" />
													<label htmlFor="question01_2">{data.Ans2}</label>
												</div>
												<div className="inr-btn">
													<input type="radio" id="question01_3" value="3. かくこう" name="question01" />
													<label htmlFor="question01_3">{data.Ans3}</label>
												</div>
												<div className="inr-btn">
													<input type="radio" id="question01_4" value="4. かっこう" name="question01" />
													<label htmlFor="question01_4">{data.Ans4}</label>
												</div>
											</div>
										</div>
									</>
								</div>
							</div>
						))}
						<div className="submit-btn">
							<button type="submit">Submit</button>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}
export default ExamTest;