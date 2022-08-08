import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import '../sass/custom/search.scss';
import Popup from 'reactjs-popup';
import icon_search from "../img/icon_search.png";
import icon_fav_disiable from "../img/icon_fav_disiable.png";
import ShowMore from 'react-show-more-button';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import UserAccountLogout from '../components/layout/UserAccountLogout';

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

const SearchContent = () => {
	const [list, setList] = useState<any[]>([]);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [value, setValue] = React.useState('');
  const [isClick, setClick] = useState(false);
	const location = useLocation();
	const user_name = location.state;	

	let navigate = useNavigate();

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

	const click = (e: any) => {
		const data = {
			'id': e.target.value,
			'user': location.state
		};
		let url = 'http://localhost:8000/api/v1/favourite';
		axios.post(url, data)
			// axios.post('http://localhost:8000/api/v1/favourite', data)
			.then(response => {
				console.log(response.data)
			})
			.catch(err => {
				console.log(err)
			});
	};

	const favouriteList = (data: any) => {
		const user = {
			'user': location.state
		}

		let url = 'http://localhost:8000/api/v1/favouriteList'
		axios.post(url, user)
			.then(response => {
				setList(response.data)
				console.log(response.data)
				navigate('/favorite', { state: response.data });
			})
			.catch(err => {
				console.log(err)
			});
	}

	const [totalSelectedCheckboxes, setTotalSelectedCheckboxes] = useState(0);
	const handleChk = (e: any) => {
		setTotalSelectedCheckboxes(document.querySelectorAll('input[type=checkbox]:checked').length);
    }
    useEffect(() => {
        console.log(totalSelectedCheckboxes);
    }, [totalSelectedCheckboxes]);

	return (
		<>
		<UserAccountLogout userName={user_name} />
			<div className="detailsearch-sec">
				<div className="container">
					<div className="sec-title">
						<h2 className="Pacifico-Regular">Japan-Myanmar Dictionary</h2>
						<p className="desc-txt">ဂျပန်-မြန်မာအဘိဓာန်ကို ဂျပန်နှင့်အဆက်အစပ်ရှိသူ မြန်မာများအတွက် ရည်ရွယ်ထားပါသည်။</p>
					</div>
					<form className="search-form" onSubmit={handleSubmit(onSubmit)}>
						<div className="row">
							<input type="text" {...register("search")} className="form-control" placeholder="Search Japnese-Myanmar" value={value} onChange={handleChange} />
							<button type="submit" disabled={!value} className="btn btn-primary me-1">
								<img src={icon_search} alt="search" />
							</button>
						</div>
					</form>
					<div className="favoriteBtn">
						<FaHeart onClick={favouriteList} className="favoriteIcon" />  
						<span>{totalSelectedCheckboxes}</span>
					</div>
					<div className="search-content">
						{list.map((data, index) => (
							<div className="inr-content" key={index}>
								<div className="inr-wrap inr-block">
									<span>{data.Tango}</span>、
									<span>{data.Kanji}</span>
									<input type="checkbox" onChange={handleChk} value={data.id} />
								</div>
								<div className="inr-wrap">
									<p className="org-txt">( မြန်မာလို အဓိပ္ပာယ်)</p>
									<p>{data.Myanmar}</p>
									<ShowMore maxHeight={40} className="showmorenbtn">
										<div className="inr-wrap-detail">
											<h3 className='tit'><span>◆</span>例文</h3>
											<div className="details">
												<p>{data.Reibun}</p>
												<h3 className='tit'><span>◆</span>単語の意味</h3>
												<p>{data.TangoNoImi}</p>

											</div>
										</div>
									</ShowMore>

								</div>
							</div>
						))}

						{/* <div>
							<button onClick={favouriteList} 
							type = "submit">
								Favourite List
							</button>
						</div> */}
					</div>
				</div>
			</div>

		</>
	)
}
export default SearchContent;