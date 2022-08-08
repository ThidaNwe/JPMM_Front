import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import '../sass/custom/login.scss';

const Signup = () => {
    const [response, setResponse] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

    const onSubmit: SubmitHandler<any> = data => {
        let url = 'http://127.0.0.1:8000/api/v1/register'
        axios.post(url, data)
            // console.log(data);
            .then(response => {
                // setResponse(response.data)
                console.log(data)
                // console.log(response.data)
                setResponse(response.data)
                //.then(res => setResponse(res.data.success))
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <>
            <div className="signup-sec">
                <div className="signup-form">
                    <div className="sec-title">
                        <h2 className="Pacifico-Regular">Sign up to your account</h2>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            {response ? <p className='alert-text'>Register successfully</p> : null}
                            <Form.Field className="row">
                                <label htmlFor="name" className="col-form-label">User Name</label>
                                <input
                                    type="text" className="form-control"
                                    {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })}
                                />
                                {errors.name && <p className="error-txt">Name is character field !</p>}
                            </Form.Field>

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
                                {errors.password && <p className="error-txt">Password is at least 8 letters !</p>}
                            </Form.Field>

                            <Button type="submit">Sign Up</Button>
                            <p className="text">Already have an account? <a href="/login">Login</a></p>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Signup