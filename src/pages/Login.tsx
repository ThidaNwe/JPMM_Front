import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../sass/custom/login.scss';

const Login = () => {
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    let navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = data => {

        let url = 'http://127.0.0.1:8000/api/v1/login'
        axios.post(url, data)
            .then(response => {
                console.log(response.data.user.name)
                setResponse(response.data)
                navigate('/detail_search', { state: response.data.user.name });
            })
            .catch(err => {
                console.log(err)
                setError(err)
            });
    }

    return (
        <>
            <div className="login-sec">
                <div className="login-form">
                    <div className="sec-title">
                        <h2 className="Pacifico-Regular">Log in to your account</h2>
                    </div>
                    <Form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
                        {error ? <p className='alert-text'>Please Singup !!!</p> : null}
                        <Form.Field className="row">
                            <label htmlFor="name" className="col-form-label">Email</label>
                            <input
                                type="email" className="form-control"
                                {...register("email",
                                    {
                                        required: true,
                                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                            />
                            {errors.email && <p className="error-txt">Email address is invalid !</p>}
                        </Form.Field>

                        <Form.Field className="row">
                            <label htmlFor="password" className="col-form-label">Password</label>
                            <input
                                type="password" className="form-control"
                                {...register("password", {
                                    required: true, minLength: 8
                                })}
                            />
                            {/*{errors.password && <p className="error-txt">Password is at least 8 letters !</p>}*/}
                        </Form.Field>
                        <Button type="submit">Login</Button>
                        <p className="text">Don’t have an account? <a href="/signup">Sign Up</a></p>
                    </Form>
                </div>

            </div>
        </>
    )

}
export default Login