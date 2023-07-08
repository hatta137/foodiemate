import {useState} from "react"
import {MDBBtn, MDBCard, MDBIcon, MDBInput, MDBInputGroup} from "mdb-react-ui-kit";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ShowGrillomat from "./ShowGrillomat";
const Restaurants = () => {
    const [city, setCity] = useState("");
    const [grillData, setGrillData] = useState(null);
    const navigate = useNavigate();

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleGrillomat = async () => {
        try {
            const response = await axios.get(`http://194.94.204.27:20023/grillomat?city=${city}`);
            if (response.status === 200) {
                console.log(response.data);
                setGrillData(response.data);
            }
        } catch (error) {
            console.log('Fehler bei Anfrage an GrillomatAPI', error);
        }
    };

    return (
        <div className={'Grillomat-Card-HL'}>
            <MDBCard>
            <MDBInputGroup>
                <MDBInput label='Search' value={city} onChange={handleCityChange} />
                <MDBBtn rippleColor='dark' onClick={handleGrillomat}>
                    <MDBIcon icon='search' />
                </MDBBtn>
            </MDBInputGroup>
            {grillData && <ShowGrillomat grillData={grillData} />}
            </MDBCard>
        </div>
    );

};

export default Restaurants;