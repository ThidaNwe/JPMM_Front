import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ShowMore from 'react-show-more-button';
import '../sass/custom/search.scss';
import UserAccountLogout from '../components/layout/UserAccountLogout';

type input = {
  para: any
}
function ParagraphSearch() {
  const [list, setList] = useState<any[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<input>();
  const [value, setValue] = React.useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const location = useLocation();
  const user_name = location.state;

  const accumulativeParser = (str: any, condition: any) => {
    let accumulations = [];
    let accumulator = "";

    for (let i = 0; i < str.length; ++i) {
      let ch = str[i];

      if (condition(ch)) {
        accumulator += ch;
      } else if (accumulator !== "") {
        accumulations.push(accumulator);
        accumulator = "";
      }
    }

    return accumulations;
  }
  const isKanji = (ch: any) => {
    return (ch >= "\u4e00" && ch <= "\u9faf") ||
      (ch >= "\u3400" && ch <= "\u4dbf");
  }

  const parseKanjiCompounds = (str: any) => {
    return accumulativeParser(str, isKanji);
    // let array_data = accumulativeParser(str, isKanji);
    // console.log(array_data);
    // let latest_data = array_data.split('');
  }
  const onSubmit: SubmitHandler<any> = data => {
    const kanji_array = parseKanjiCompounds(data.para)
    console.log(kanji_array);
    let url = `http://localhost:8000/api/v1/search-kanji-para?&para=${kanji_array}`
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
		<UserAccountLogout userName={user_name} />
      <div className="paragraphsearch-sec detailsearch-sec">
      <div className="container">
            <div className="sec-title">
							<h2 className="Pacifico-Regular">Translate And Paragraph Search</h2>
						</div>

        <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <textarea {...register("para")} className="form-control" placeholder="Text The Paragraph" value={value} onChange={handleChange} />
            <button type="submit" disabled={!value} className="btn btn-primary me-1">
              Search
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
        </div>

      </div>
      </div>
    </>

  );
}
export default ParagraphSearch;