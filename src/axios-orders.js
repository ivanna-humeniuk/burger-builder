import axios from "axios";

const instance = axios.create({
    baseURL:'https://react-my-burger-adab9-default-rtdb.firebaseio.com/'
})

export default instance;