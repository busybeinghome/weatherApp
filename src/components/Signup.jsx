import React, {useEffect, useState} from 'react'

const Signup = () =>{
    return (
        <div>
            <div className='form-container'> 
                <div style={{width:"100%"}} className='wrapper'>
                    <h2>Create Account</h2>
                    <form>
                        <div className='form-group'>
                            <label htmlFor="">Email Address:</label>
                            <input type="text"
                            className='email-form'  
                            name="email" 
                            value={email}  
                            onChange={handleOnchange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">First Name:</label>
                            <input type="text"
                            className='email-form'
                            name="first_name" 
                            value={first_name} 
                            onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Last Name:</label>
                            <input type="text" 
                            className='email-form'  
                            name="last_name" 
                            value={last_name} 
                            onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Password:</label>
                            <input type="text" 
                            className='email-form'  
                            name="password" 
                            value={password} 
                            onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Confirm Password:</label>
                            <input type="text" 
                            className='p'  
                            name="password2" 
                            value={password2} 
                            onChange={handleOnchange}/>
                        </div>
                        <input type="submit" value="Submit" className="submitButton" />
                    </form>
                </div>
            </div>
        </div>
    )
}