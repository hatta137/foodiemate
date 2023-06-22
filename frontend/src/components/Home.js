import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login')
    };

    return (
        <div className="Home">
            <h1>Willkommen bei FoodieMate</h1>
            <button className="login-button" onClick={handleLoginClick}>
                Login
            </button>
        </div>
    );
};

export default Home;
