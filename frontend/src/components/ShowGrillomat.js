import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdb-react-ui-kit";
const ShowGrillomat = ({grillData}) => {

    console.log(grillData)
    return (
        <div>
            <MDBCard>
                <MDBCardImage src={grillData.icon} position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>Kann gegrillt werden? {grillData.grillable ? "Ja" : "Nein"}</MDBCardTitle>
                    <MDBCardText>
                        Die Temperatur beträgt {grillData.details.temperature}, die Windgeschwindigkeit {grillData.details.windspeed}. Der Himmel ist {grillData.details.condition}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}
export default ShowGrillomat;