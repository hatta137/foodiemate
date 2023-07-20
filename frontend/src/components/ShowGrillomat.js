import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle} from "mdb-react-ui-kit";
const ShowGrillomat = ({grillData}) => {

    console.log("askdjhaksjdhaks")
    console.log(grillData)
    if (!grillData) {
        // Wenn grillData nicht definiert ist oder null ist, zeige eine Ladeanzeige oder eine Fehlermeldung
        return <div>Lade...</div>;
    }

    return (
        <div>
            <MDBCard>
                <MDBCardImage src={grillData.data.icon} position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>Kann gegrillt werden? {grillData.data.grillable ? "Ja" : "Nein"}</MDBCardTitle>
                    <MDBCardText>
                        Die Temperatur beträgt {grillData.data.details.temperature}, die Windgeschwindigkeit {grillData.data.details.windspeed}. Der Himmel ist {grillData.data.details.condition}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}
export default ShowGrillomat;