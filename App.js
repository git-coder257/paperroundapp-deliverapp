import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

export default function App() {

  let [currentpage, setcurrentpage] = useState("login")
  let [username, setusername] = useState("")
  let [password, setpassword] = useState("")

  const handleconfirmlogin = () => {
    setcurrentpage("home")
  }

  const home = (
    <View style={styles.container}>
      <Text>
        hello world
      </Text>
    </View>
  )

  const loginpage = (
    <View style={styles.container}>
        <TextInput style={styles.usernameInput} placeholder="username" onChangeText={setusername}/>
        <TextInput style={styles.passwordInput} placeholder="password" onChangeText={setpassword}/>
        <TouchableOpacity style={styles.confirmuser} onPress={handleconfirmlogin} color="#fff">
          <Text>confirm</Text>
        </TouchableOpacity>
      {/*<Text>
        hello world
        <Button style={styles.confirmuser} onPress={handleconfirmlogin} color="#fff" title="confirm"/>
      </Text>*/}
    </View>
  )

  return currentpage === "login" ? loginpage : home
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  usernameInput: {
    marginBottom: 8,
    borderColor: "#000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    paddingLeft: 35,
    paddingRight: 35
  },
  passwordInput: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    paddingLeft: 35,
    paddingRight: 35
  },
  confirmuser: {
    backgroundColor: "#0d6efd",
    padding: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    borderColor: "#0d6efd"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});