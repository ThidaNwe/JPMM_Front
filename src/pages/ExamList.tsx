import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import '../sass/custom/exam.scss';
import axios from 'axios';
type data = {
	level: any,
	Test_Title: any;
	names: any
};
const Exam = () => {
	const [list, setList] = useState<any[]>([]);
	const { register, handleSubmit, formState: { errors } } = useForm<data>();

	const selectNumber = (e: any) => {
		// console.log(e.target.value);
		const level = e.target.value;
		console.log(level);

		let url = `http://localhost:8000/api/v1/question-list/${level}`
		axios.get(url)
			.then(response => {
				setList(response.data)
				console.log(response.data)
			})
			.catch(err => {
				console.log(err)
			});
	}


	return (
		<>
			<div className="sec-exam-home">
				<div className="container">
					<div>
					<div className="sec-title">
						<h2 className="Pacifico-Regular">Exam List Page</h2>
					</div>
						<div className="dropdown">
							<button
								className="dropbtn"
								value="N-5"
								type="submit"
								onClick={selectNumber}
							>N-5</button>
						</div>
						<div className="dropdown">
							<button
								className="dropbtn"
								value="N-4"
								type="submit"
								onClick={selectNumber}
							>N-4</button>
							
						</div>
						<div className="dropdown">
							<button
								className="dropbtn"
								value="N-3"
								type="submit"
								onClick={selectNumber}
							>N-3</button>
							
						</div>
						<div className="dropdown">
							<button
								className="dropbtn"
								value="N-2"
								type="submit"
								onClick={selectNumber}
							>N-2</button>
							
						</div>
						<div className="dropdown">
							<button
								className="dropbtn"
								value="N-1"
								type="submit"
								onClick={selectNumber}
							>N-1</button>
						</div>
						{list.map((data, index) => (
							<div key={index} className="exam-test-bl">
								<h4 className='test-tit'>{data.Test_Title}</h4>
								<ul>
									{
										data.Test.split(',').map((test: any) => {
											return (
												<li className='test-btn'>
													<button>{test}</button>
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