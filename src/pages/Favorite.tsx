import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import '../sass/custom/search.scss';
import ShowMore from 'react-show-more-button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type Data = {
	id: number,
	Tango: string,
	Kanji: string,
	hinshi: string,
	i_na: any,
	kyuu: any,
	reibun: any,
	tangonoimi: any,
	myanmar: any,
	element: any

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
const Favorite = () => {
	const [list, setList] = useState<any[]>([]);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		const fav_list = {
			'data': location.state
		}
		const newObj = [...Object.values(fav_list)]
		setList(newObj);
	}, []);
	console.log(list);

	return (
		<>
			<div className="favorite-sec detailsearch-sec">
				<div className="container">
					<div className="sec-title">
						<h2 className="Pacifico-Regular">Translate And Paragraph Search</h2>
					</div>
					<div className="search-content">
						{list.map((item) => (
							<ul key={item.id} className="inr-content">
								<div className="inr-wrap inr-block">
									{Object.values(item).map((val: any) => (
										<>
											<li>{val.Tango}</li>
											<li>{val.Kanji}</li>
											<div className="inr-wrap">
												<p className="org-txt">( မြန်မာလို အဓိပ္ပာယ်)</p>
												<p>{val.Myanmar}</p>
												<ShowMore maxHeight={40} className="showmorenbtn">
													<div className="inr-wrap-detail">
														<h3 className='tit'><span>◆</span>例文</h3>
														<div className="details">
															<p>{val.Reibun}</p>
															<h3 className='tit'><span>◆</span>単語の意味</h3>
															<p>{val.TangoNoImi}</p>

														</div>
													</div>
												</ShowMore>

											</div>
										</>

									))}

								</div>
							</ul>	
						))}
				</div>
			</div>
		</div>
		</>
	)
}
export default Favorite;