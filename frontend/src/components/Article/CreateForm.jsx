import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { ChangeEvent, useRef } from "react";
import './CreateForm.css';

function CreateForm() {
    
    const ref = useRef();

    const handleInput = (e) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${e.target.scrollHeight}px`;
        }
    };

    return (
        <>
            <div className="cPad1"></div>
            <div className="cHolder">
                <input className="cTitle" placeholder="Title"></input>
                <textarea ref={ref} rows={1} onInput={handleInput} className="cContent" placeholder="Tell your story..."></textarea>
                
            </div>
            
        </>
    )
}


export default CreateForm;