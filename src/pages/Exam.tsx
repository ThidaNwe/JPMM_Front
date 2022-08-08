import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import '../sass/custom/exam.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserAccountLogout from '../components/layout/UserAccountLogout';

import axios from 'axios';
type data = {
	level: any,
	Test_Title: any;
	test: any;
	names: any
};
const Exam = () => {
	const [list, setList] = useState<any[]>([]);
	const [level, setlevel] = useState<any[]>([]);
	const [questionData, setquestionData] = useState<any[]>([]);
	const { register, handleSubmit, formState: { errors } } = useForm<data>();
	const location = useLocation();
	const user_name = location.state;

	let navigate = useNavigate();
	
	useEffect(() => {
		const level = 'N-5';
		let url = `http://localhost:8000/api/v1/title-list/${level}`
		axios.get(url)
			.then(response => {
				setList(response.data)
				console.log(response.data)
			})
			.catch(err => {
				console.log(err)
			});
	}, [])

	const [active, setActive] = useState(null);
	var ja_level = ["N-5","N-4","N-3","N-2","N-1"];

	const selectLevel = (e: any) => {
		document.body.classList.remove('inr-bg');
		const level = e.target.value;
		setlevel(level);
		console.log(level);
		setActive(level);
		let url = `http://localhost:8000/api/v1/title-list/${level}`
		axios.get(url)
			.then(response => {
				setList(response.data)
				console.log(response.data)
			})
			.catch(err => {
				console.log(err)
			});
	}
	const selectTest = (testTitle: any, test: any) => {
		let url = `http://localhost:8000/api/v1/question-list/${level}/${testTitle}/${test}`
		axios.get(url)
			.then(response => {
				setquestionData(response.data)
				console.log(response.data)
				const myData = {
					level: level,
					title: testTitle,
					test: test,
					data: response.data
				}
				navigate('/exam_test', { state: { myData } });
			})
			.catch(err => {
				console.log(err)
			});
	}
	console.log(list);

	return (
		<>
		<UserAccountLogout userName={user_name} />
			<div className="sec-exam-home">
				<div className="container">
					<div>
						<div className="sec-title">
							<h2 className="Pacifico-Regular">Exam List Page</h2>
						</div>
						<div className='level-btn'>
						{ja_level.map((val) => (
							<button value={val} className={active === val ? "active" : "unactive"} type="submit" onClick={selectLevel}>{val}</button>
						))}
						</div>
						
						
						{list.map((data, index) => (
							<div key={index} className="exam-test-bl">
								<h3>{data.Test_Title}</h3>
								<ul>
									{
										data.Test.split(',').map((test: any) => {
											return (
												<li className='test-btn'>
													<button
														onClick={() => selectTest(data.Test_Title, test)}
														value={test}
														type="submit" >{test}
													</button>
												</li>
											);
										})
									}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
export default Exam;