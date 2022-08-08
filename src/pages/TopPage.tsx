import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import '../sass/custom/search.scss';
import icon_search from "../img/icon_search.png";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import QuizIcon from '@mui/icons-material/Quiz';
import UserAccountLogin from '../components/layout/UserAccountLogin';

type Data = {
	id: number,
	tango: string,
	kanji: string,
	hinshi: string,
	i_na: any,
	kyuu: any,
	reibun: any,
	tangonoimi: any,
	myanmar: any,

}
type Search = {
	id: string,
	tango: string,
	kanji: string,
	hinshi: string,
	i_na: any,
	kyuu: any,
	reibun: any,
	tangonoimi: any,
	myanmar: any,
}



const TopPage = () => {
	const [list, setList] = useState<any[]>([]);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [value, setValue] = React.useState('');

	const handleChange = (e: any) => {
		setValue(e.target.value);
	};

	const onSubmit: SubmitHandler<any> = data => {
		let url = `http://localhost:8000/api/v1/search?&search=${data.search}`
		axios.get(url)
			.then(response => {
				setList(response.data)
				console.log(response.data)
			})
			.catch(err => {
				console.log(err)
			});
	}

	const favourite = (id: any) => {
		console.log(id)
		// let url = `http://localhost:8000/api/favourite`, id
		axios.post(`http://localhost:8000/api/v1/favourite`, id)
			.then(response => {
				console.log(response.data)
			})
			.catch(err => {
				console.log(err)
			});
	}


	return (
		<>

          
			<div className="topsearch-sec">
			<UserAccountLogin />
				<div className="container">
						<div className="sec-title">
							<h2 className="Pacifico-Regular">Japan-Myanmar Dictionary</h2>
							<p className="desc-txt">ဂျပန်-မြန်မာအဘိဓာန်ကို ဂျပန်နှင့်အဆက်အစပ်ရှိသူ မြန်မာများအတွက် ရည်ရွယ်ထားပါသည်။</p>
						</div>
						<div className='top-sec'>
							<ul className='row'>
							    <li className='col-4'><a href="/exam"><div><p className='text-center'><QuizIcon /></p>The course includes hiragana, numbers, video lectures, grammar, verbs, honorifics, JLPT N5, N4, N3, N2, N1 practice tests, FAQs, etc. It is available to all students from beginner to advanced levels and is completely free.</div></a></li>
								<li className='col-4'><a href="/paragraph_search"><div><p className='text-center'><GTranslateIcon /></p>More than 30,000 short, simple Janpan definitions with Myanmar translations</div></a></li>
								<li className='col-4'><a href="/privacy"><div><p className='text-center'><SyncAltIcon /></p>Janpan synonyms for Myanmar words</div></a></li>
								
							</ul>
						</div>
						<form className="search-form" onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<input type="text" {...register("search")} className="form-control" placeholder="Search Japnese-Myanmar" value={value} onChange={handleChange} />
								<button type="submit" disabled={!value} className="btn btn-primary me-1">
									<img src={icon_search} alt="search" />
								</button>
							</div>
						</form>

						<div className="search-content">
							{list.map((data, index) => (
								<div className="inr-content" key={index}>
									<div className="inr-wrap inr-block">
										<span>{data.Tango}</span>、
										<span>{data.Kanji}</span>
									</div>
									<div className="inr-wrap">
										<p className="org-txt">( မြန်မာလို အဓိပ္ပာယ်)</p>
										<p>{data.Myanmar}</p>
									</div>
								</div>
							))}
						</div>

				</div>
			</div>

		</>
	)
}
export default TopPage;