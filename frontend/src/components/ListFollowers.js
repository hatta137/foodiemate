import axios from "axios";
const ListFollowers = async ({userId}) => {

    try {
        const response = await axios.get(`https://194.94.204.27:20063/users/getUserNameById/${userId}`);

        console.log(response.data)

        return response.data;

    } catch (e) {
        return "nix gefunden"
    }




}
export default ListFollowers;