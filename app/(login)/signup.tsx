
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
    username: "", 
    email:"",
    password1: "", 
    password2: ""
  }
  const [details, changeDetails] = useState(defualtDetails);

  useEffect(() => {
    console.log(details)
  }, [details]);

  const checkDetails = async (userDetails: {username: any, email: any, password1: any, password2: any; }) => {
    const passwords = passwordCheck(userDetails.password1, userDetails.password2)
    if (passwords)
    {
      //send details to back ends
      await apiClient.signup()
      //check response 
      //respond acordingly
      
      
    }
     
  }

  const CheckEmail = (email: any) =>
  {
    return (/[a-zA-z0-9._%]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,}$/g.test(email))  
  }


  const passwordCheck = (password1: any, password2: any) => {
    //compare
    if (password1 == password2)
      {
        if(/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{8,20}$/g.test(password1))
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
          value={details.username}
          onChangeText={(username) => changeDetails({...details, username})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Email'
          value={details.email}
          onChangeText={(email) => changeDetails({...details, email})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Password' 
          secureTextEntry={true}
          value={details.password1}
          onChangeText={(password1) => changeDetails({...details, password1})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Confirm Password' 
          secureTextEntry={true}
          value={details.password2}
          onChangeText={(password2) => changeDetails({...details, password2})}
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
