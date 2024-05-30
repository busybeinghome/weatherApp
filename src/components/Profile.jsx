import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Profile=()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    const jwt_access=localStorage.getItem('access')
    const navigate=useNavigate()

    useEffect(()=>{
        if(jwt_access===null && !user){
            navigate("/login")
        }
    },[])

    return(
        <div className="container">
            <h2> привет </h2>
            <p style={{textAlign:"center"}}>Добро пожаловать</p>
            <button className="logout-btn">Выход</button>
        </div>
    )

}

export default Profile
