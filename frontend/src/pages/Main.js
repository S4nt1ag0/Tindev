import React, {useEffect, useState} from 'react';
import './Main.css';
//import io from 'socket.io-client';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
//import itsamatch from '../imagens/assets/itsamatch.png';
import api from '../services/api'

 export default function Main({match,history}){

    const loggedUserId = localStorage.getItem('@tindev/_id');
    const[user,setUser] = useState([]);
    //const[matchDev,setMatchDev] = useState(null);

    async function handleLike(targetUserId, loggedUserId){
        await api.post('/like',{ 
            targetUserId,
            loggedUserId
        });
        setUser(user.filter(user => user._id !== targetUserId));
        }
    async function handleDislike(targetUserId, loggedUserId){
        await api.post('dislike',{ 
            targetUserId,
            loggedUserId
        });
        setUser(user.filter(user => user._id !== targetUserId));
        }

    async function  handleLogout(e) {
        await localStorage.removeItem('@tindev/_id');
        history.push("/");        
    }
     
    useEffect (() =>{
        async function loaduser(){
            const response = await api.post('/loadUsers',{
             loggedUserId
            })

            setUser(response.data);
        }
        loaduser();
     },);

/* No SOCKET IO FOR THIS MOMENTS
    useEffect(() =>{

        const socket = io('http://localhost:3334',{
            query: {user:match.params.id}
        });
        socket.on('match', dev =>{
            setMatchDev(dev);
        })
    },[match.params.id]);
*/
     return(
        <div className="main-container">
            <button onClick={handleLogout} className="buttonLogout">
            <img src={logo} alt="tindev"/>
            </button>
            { user.length > 0 ? (
                <ul>
                {user.map(user =>
                        <li key={user._id}>
                        <img src={user.avatar} alt={user.name} className="avatarNoMatch"></img>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="Buttons">
                            <button type="button" onClick={()=> handleLike(user._id,loggedUserId)}>
                                <img src={like} alt="like" />
                            </button>
                            <button type="button" onClick={()=> handleDislike(user._id,loggedUserId)}>
                                <img src={dislike} alt="dislike" />
                            </button>
                        </div>
                    </li>        
                    )}
            

            </ul>
            ) : (
            <div className="empty"><h1>Acabou :(</h1></div> 
     )}
     {/*
     {matchDev && (
         <div className="match-containe">
             <img src={itsamatch} alt="it's a match" />
             <img className="avatar" src={matchDev.avatar} alt="avatar" />
             <strong>{matchDev.name}</strong>
             <p>{matchDev.bio}</p>
         <button type="button"onClick={() => setMatchDev(false)} >FECHAR</button>
         </div>
     )}
        */}
        </div>
     );
 }
