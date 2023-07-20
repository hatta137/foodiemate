import {useState} from "react"
import {MDBBtn, MDBCard, MDBIcon, MDBInput, MDBInputGroup} from "mdb-react-ui-kit";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ShowGrillomat from "./ShowGrillomat";
const Grillomat = () => {
    const [city, setCity] = useState("");
    const [grillData, setGrillData] = useState(null);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleGrillomat = async () => {
        try {
            const response = await axios.get(`http://194.94.204.27:20023/grillomat?city=${city}`);
            if (response.status === 200) {
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
                <button className={"button-HL"} onClick={handleGrillomat}>
                    <MDBIcon icon='search' />
                </button>
            </MDBInputGroup>
            {grillData && <ShowGrillomat grillData={grillData} />}
            </MDBCard>
        </div>
    );

};

export default Grillomat;