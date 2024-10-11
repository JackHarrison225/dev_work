
import ApiClient from "@/utils/apiclient"

import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Button, 
  Alert
} from 'react-native';

export default function signupScreen() {

  const apiClient = new ApiClient()

  const defualtDetails = {
    Username: "", 
    Email:"",
    Password1: "", 
    Password2: ""
  }
  const [details, changeDetails] = useState(defualtDetails);

  useEffect(() => {
    console.log(details)
  }, [details]);

  const checkDetails = async (userDetails: {Username: any, Email: any, Password1: any, Password2: any; }) => {
    const passwords = passwordCheck(userDetails.Password1, userDetails.Password2)
    if (passwords)
    {
      if(CheckEmail(userDetails.Email))
      {
        const userObj = {
          Username: userDetails.Username,
          Password: userDetails.Password1,
          Email: userDetails.Email
        }
        //send details to back ends
        const respone:any = await apiClient.signup(userObj)
        //check response 
        const signedup = respone.state
        //respond acordingly
        if (signedup)
        {
          // go to login page
        }
      }
      
    }
     
  }

  const CheckEmail = (email: any) =>
  {
    return (/[a-zA-z0-9._%]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,}$/g.test(email))  
  }


  const passwordCheck = (Password1: any, Password2: any) => {
    //compare
    if (Password1 == Password2)
      {
        if(/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{8,20}$/g.test(Password1))
          {
            return true
          } else {
            //password must be stronger
            return alert("Password must:\nBe 8-20 characters\nContain atleast 1 number\nContain atleast 1 Special character ")
        }
      } else {

        return alert("Passwords must match")

    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up Page</Text>

      <View style={styles.form} >
        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Username'
          value={details.Username}
          onChangeText={(Username) => changeDetails({...details, Username})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Email'
          value={details.Email}
          onChangeText={(Email) => changeDetails({...details, Email})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Password' 
          secureTextEntry={true}
          value={details.Password1}
          onChangeText={(Password1) => changeDetails({...details, Password1})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Confirm Password' 
          secureTextEntry={true}
          value={details.Password2}
          onChangeText={(Password2) => changeDetails({...details, Password2})}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button 
          onPress={() => checkDetails(details)}
          title="Register"
          
        />
        <View style={styles.button}>
          <Link style={styles.buttonText} href="./login">Log in</Link>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: "10%",
      flex: 1,
      backgroundColor: "#444",
      borderRadius: 5,
    },

    form: {
      width: "100%",
      alignItems: "center",
    },
    
    buttonsContainer: {
      gap: 5,
      justifyContent:"center",
      alignItems: "center",
      margin: "10%",
      flexDirection: "row",
      flex: 1,
      maxHeight: "7.5%",
      width: "90%",
      borderRadius: 5,
    },

    button:{
      justifyContent: 'space-evenly',
      alignItems: "center",
      height: "100%",
      width: "25%",
      backgroundColor: "#222",
      borderRadius: 5,
    },

    buttonText: {
      textAlign: "center",
      color: "#0f0",
    },

    InputBox: {
      color: "blue",
      margin: "1%",
      textAlign: "left",
      width: "50%",
      backgroundColor: "#eec",
      padding: "1%",
      borderRadius: 2,
    }
  });
