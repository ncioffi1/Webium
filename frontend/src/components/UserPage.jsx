import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ShowUserForm from "./Article/ShowUserForm";
import TopBar from "./Navigation/TopBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import './UserPage.css';

function UserPage() {

    const { userId } = useParams();
    const [userName, setUserName] = useState(null);
    const dispatch = useDispatch();
    const writer = useSelector(articleActions.selectWriter(userId));

    useEffect(() => {
        if (userId !== null) {
            dispatch(articleActions.fetchWriter(userId));
        }
    }, [userId])

    useEffect(() => {
        if (writer !== null && writer !== undefined) {
            setUserName(writer.name);
        }
    }, [writer])

    return (
        <>
            {userName === null ? (
                <>
                </>
            ) : (
                <>
                    <TopBar canNav={true}/>
                    <div className="uHolder">
                        <p className='uText'>{userName}</p>
                        <div className='uLine'></div>
                    </div>
                    <ShowUserForm />
                </>
            )}
        </>
    )
}

export default UserPage;