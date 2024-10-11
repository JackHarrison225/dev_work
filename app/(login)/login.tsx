
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
    password: ""
  }
  const [details, changeDetails] = useState(defualtDetails);

  useEffect(() => {
    console.log(details)
  }, [details]);

  const handleChange = (event: any) => {
    alert(`event target is ${event.target.id}`)
    changeDetails({
      ...details,
      [event.target.name]: event.target.value
    })
  }

  const checkDetails = async(userDetails: {username: any, password: any}) => {
    //send to back end
    const respone:any = await apiClient.login(userDetails);
    //check response 
    console.log(respone.body)
    // respond acordingly

  }


  return (
    <View style={styles.container}>
      <Text>Log In Page</Text>

      <View style={styles.form} >
        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Username/Email'
          value={details.username}
          onChangeText={(username) => changeDetails({...details, username})}
        />

        <TextInput 
          style={styles.InputBox} 
          placeholderTextColor='gray' 
          placeholder='Password' 
          secureTextEntry={true}
          value={details.password}
          onChangeText={(password) => changeDetails({...details, password})}
        />

        
      </View>

      <View style={styles.buttonsContainer}>
        <Button 
          onPress={() => checkDetails(details)}
          title="Log In"
          
        />
        <View style={styles.button}>
          <Link style={styles.buttonText} href="./signup">Sign Up</Link>
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
