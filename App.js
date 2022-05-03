import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import axios from "axios"

export default function App() {

  let [currentpage, setcurrentpage] = useState("loginoptions")
  let [username, setusername] = useState("")
  let [password, setpassword] = useState("")
  let [district, setdistrict] = useState("")
  let [postofficename, setpostofficename] = useState("")
  let [potentialpostoffices, setpotentialpostoffices] = useState([])
  let [error, seterror] = useState("")

  const handleconfirmcreateaccount = async () => {
    if (postofficename === ""){
      await axios.get(`https://dry-shore-19751.herokuapp.com/postofficename/${district}`)
        .then((r) => {
          console.log(r.data)
          setpotentialpostoffices(r.data.postoffices)
        })
    } else if (postofficename !== ""){
      // await axios.post(`https://dry-shore-19751.herokuapp.com/${username}/${password}/${postofficename}`)
      //   .then((r) => {
      //     if (r.data.success){
      //       setcurrentpage("home")
      //     } else if (!r.data.success){
      //       seterror("There has been an error please try again.")
      //     }
      //   })
    }
  }

  const handleupdatepostofficename = (name) => {
    setpostofficename(name)
  }

  const handleconfirmlogin = () => {
    setcurrentpage("home")
  }

  const handlegotocreateaccountpage = () => {
    setcurrentpage("createaccount")
  }

  const handlegotologinoptions = () => {
    setcurrentpage("loginoptions")
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
    </View>
  )

  const createaccount = (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handlegotologinoptions} style={styles.stylesforbackbutton}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
        <TextInput style={styles.usernameInput} placeholder="username" onChangeText={setusername}/>
        <TextInput style={styles.passwordInput} placeholder="password" onChangeText={setpassword}/>
        <TextInput style={styles.districtInput} placeholder="enter district" onChangeText={setdistrict}/>
        {potentialpostoffices.length > 0 && <Text style={{fontSize: 16.5}}>
          Select your post office
        </Text>}
        {potentialpostoffices.map((postoffice, index) => <TouchableOpacity onPress={() => handleupdatepostofficename(postoffice.postofficename)}>
          <Text style={styles.textstyle} key={index}>
            {postoffice.postofficename}
          </Text>
        </TouchableOpacity>)}
        <TouchableOpacity style={styles.confirmuser} onPress={handleconfirmcreateaccount} color="#fff">
          <Text>confirm</Text>
        </TouchableOpacity>
      </ScrollView>
  )

  const loginoptions = (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.confirmloginoption} onPress={handlegotocreateaccountpage} color="#fff">
        <Text>create account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

  return currentpage === "login" ? loginpage : currentpage === "loginoptions" ? loginoptions : currentpage === "createaccount" ? createaccount : home
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stylesforbackbutton: {
    paddingRight: '32.5%',
    paddingBottom: 5
  },
  usernameInput: {
    marginBottom: 8,
    borderColor: "#000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    width: 150,
    textAlign: 'center'
  },
  passwordInput: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    width: 150,
    textAlign: 'center'
  },
  districtInput: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    width: 150,
    marginTop: 8,
    textAlign: 'center'
  },
  confirmuser: {
    backgroundColor: "#0d6efd",
    padding: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    borderColor: "#0d6efd",
    // textAlign: 'center'
    flex: 1,
    alignItems: 'center'
  },
  confirmloginoption: {
    backgroundColor: "#0d6efd",
    padding: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    borderColor: "#0d6efd",
  },
  textstyle: {
    fontSize: 15
  }
});