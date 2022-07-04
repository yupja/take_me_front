import React,{ useState,useEffect,useRef}from "react";
import { useNavigate } from "react-router-dom";

import CommunityTab from "../components/CommunityTab";
import HeaderMenue from "../components/HeaderMenu";
import {GiHamburgerMenu} from 'react-icons/gi'


const Community = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState(<CommunityTab/>);


    return(
        <div className="wrap">
            <div className="topWrap" style={{background:"white"}}>
                <HeaderMenue/>            
            </div>

            <div className="communityDiv">
                    <div>티끌자랑</div>
                    <div>쓸까말까</div>
            </div>

            <div className="realTimeBox">

            </div>

            <div className="communityContents">
                {page}
            </div>
        </div>
        
    ) 
};



export default Community;