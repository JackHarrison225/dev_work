import axios from "axios";
const apiAddress = `http://192.168.0.207:3000/users`

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
            const responseObject = await axios.post(
                `${apiAddress}/signup`,//url
                {"UserName": userdetails.Username, "Email": userdetails.Email, "Password": userdetails.Password }//body
            )
            return alert(responseObject)

        } catch (err) {
            alert(err)
        }
    }

    //sign in user
    async login(userdetails) {
        try {

            const responseObject = await axios.post(
                `${apiAddress}/signin`,
                 {"UorE": userdetails.username, "Password": userdetails.password})

            return (responseObject)
        } catch (err) {
            alert(err)
        }
    }

    //update user details
    async updateUser(userdetails) {
        try {
            const responseObject = await axios.patch(`${apiAddress}/`, userdetails)
            
            
        } catch (err) {
            
        }      
    }

    //delete user
    async delUser(userdetails) {
        try {
            const responseObject = await axios.delete(`${apiAddress}/`)

            
        } catch (err) {
            
        }
    }

    
}