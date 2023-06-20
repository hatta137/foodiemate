import { useNavigate } from "react-router-dom";
import Recipes from "./Recipes";

const Feed = () => {
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        navigate('/')
    };

    return (
        <div className="Feed">

            <h1>Feed</h1>
            <Recipes />
        </div>
    );
};

export default Feed;
