import React, {useEffect, useState} from 'react'

function Login() {
    return(
        <div>
            <div className='form-container'>
                <div style={{width:"100%"}} className='wrapper'>
                    <h2>Login into your account</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='form-group'>
                        <label htmlFor="">Email Address:</label>
                        <input type="text"
                        className='email-form'
                        value={logindata.email}  
                        name="email"
                        onChange={handleOnchange}/>
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor="">Password:</label>
                            <input type="password" 
                            className='email-form' 
                            value={logindata.password}
                            name="password"
                            onChange={handleOnchange}/>
                        </div>
                        
                        <input type="submit" value="Login" className="submitButton" />
                                    <p className='pass-link'><Link to={'/forget-password'}>forgot password</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login