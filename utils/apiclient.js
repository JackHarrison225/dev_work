import axios from "axios";

apiAdress = `http://localhost:3000/users/`

export default class ApiClient {
    responseStatusCheck(responseObject) {
    
        if (responseObject.status >= 200 && responseObject.status < 300) {
            return Promise.resolve(responseObject)
        } else {
            return Promise.reject(new Error(responseObject.statusText))
        }
    }

    //create user
    async signup(userdetails) {
        try {
            alert("sending SignUp request")
            const responseObject = await axios.post(`${apiAdress}`, userdetails)


        } catch (err) {
            alert(err)
        }
    }

    //sign in user
    async login(userdetails) {
        try {
            const responseObject = await axios.post(`${apiAdress}/signin`, userdetails)

            
        } catch (err) {
            
        }
    }

    //update user details
    async updateUser(userdetails) {
        try {
            const responseObject = await axios.patch(`${apiAdress}/`, userdetails)
            
            
        } catch (err) {
            
        }      
    }

    //delete user
    async delUser(userdetails) {
        try {
            const responseObject = await axios.delete(`${apiAdress}/`)

            
        } catch (err) {
            
        }
    }

    
}