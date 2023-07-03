import axios from "axios";

const ipAddr = process.env.REACT_APP_IP_ADDR
const ListFollowers = async ({userId}) => {

    try {
        const response = await axios.get(`https://${ipAddr}:20063/users/getUserNameById/${userId}`);

        console.log(response.data)

        return response.data;

    } catch (e) {
        return "nix gefunden"
    }




}
export default ListFollowers;