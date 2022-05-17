import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import axios from "axios"
import { DataTable } from 'react-native-paper';

const handlegetallpaperstodeliver = async (userid) => {
  let response = await (await axios.get(`https://dry-shore-19751.herokuapp.com/getallpaperstodeliver/${userid}`)).data

  console.log(response.papers)

  return response.papers
}

export default function App() {

  let [currentpage, setcurrentpage] = useState("loginoptions")
  let [username, setusername] = useState("")
  let [password, setpassword] = useState("")
  let [district, setdistrict] = useState("")
  let [postofficename, setpostofficename] = useState("")
  let [potentialpostoffices, setpotentialpostoffices] = useState([])
  let [error, seterror] = useState("")
  let [userid, setuserid] = useState(0)
  let [papers, setpapers] = useState([])

  useEffect(() => {

    (async function () {
      if (userid !== 0){
        let papersvar = await handlegetallpaperstodeliver(userid)

        console.log(userid)
        console.log(papersvar)
        setpapers(papersvar)
      }
    })()
  }, [currentpage, userid])

  const handleconfirmcreateaccount = async () => {
    if (postofficename === ""){
      await axios.get(`https://dry-shore-19751.herokuapp.com/postofficename/${district}`)
        .then((r) => {
          console.log(r.data)
          setpotentialpostoffices(r.data.postoffices)
        })
    } else if (postofficename !== ""){
      await axios.post(`https://dry-shore-19751.herokuapp.com/newdeliveruser/${username}/${password}/${postofficename}`)
        .then((r) => {
          if (r.data.success){
            setcurrentpage("home")
          } else if (!r.data.success){
            seterror("There has been an error please try again.")
          }
        })
    }
  }

  const handleupdatepostofficename = (name) => {
    setpostofficename(name)
  }

  const handleconfirmlogin = async () => {
    let response = await (await axios.get(`https://dry-shore-19751.herokuapp.com/deliveruser/${username}/${password}`)).data

    console.log(response)

    if (response.success){
      if (response.accountexists){
        setcurrentpage("home")
        console.log(response.userid)
        setuserid(response.userid)
      }
    } else if (!response.success){
      if (!response.accountexists){
        console.log("Hello")
        Alert.alert("You entered the wrong info.")
      }
    }
  }

  const handlegotocreateaccountpage = () => {
    setcurrentpage("createaccount")
  }

  const handlegotologinoptions = () => {
    setcurrentpage("loginoptions")
  }

  const handlegotologinpage = () => {
    setcurrentpage("login")
  }

  const handlerefresh = async () => {
    setpapers(await handlegetallpaperstodeliver(userid))
  }

  const home = (
    <ScrollView style={{paddingTop: 17.5}}>
      <TouchableOpacity onPress={handlerefresh} style={{paddingLeft: 7}}>
        <Text>
          refresh
        </Text>
      </TouchableOpacity>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Locations</DataTable.Title>
        </DataTable.Header>
        {papers.map((paper, index) => <DataTable.Header key={index}>
          <DataTable.Cell>
            {paper.papername}
          </DataTable.Cell>
          <DataTable.Cell>
            {paper.location}
          </DataTable.Cell>
        </DataTable.Header>)}
      </DataTable>
    </ScrollView>
  )

  const loginpage = (
    <SafeAreaView style={styles.container}>
      <View>
      <TouchableOpacity onPress={handlegotologinoptions} style={styles.stylesforbackbutton}>
        <Text>
          Back
        </Text>
      </TouchableOpacity>
      <TextInput style={styles.usernameInput} placeholder="username" onChangeText={setusername}/>
      <TextInput style={styles.passwordInput} placeholder="password" onChangeText={setpassword}/>
      <TouchableOpacity style={styles.confirmuser} onPress={handleconfirmlogin} color="#fff">
        <Text>confirm</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )

  const createaccount = (
      <SafeAreaView style={styles.container}>
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
        {potentialpostoffices.map((postoffice, index) => <TouchableOpacity key={index} onPress={() => handleupdatepostofficename(postoffice.postofficename)}>
          <Text style={styles.textstyle} key={index}>
            {postoffice.postofficename}
          </Text>
        </TouchableOpacity>)}
        <TouchableOpacity style={styles.confirmuser} onPress={handleconfirmcreateaccount} color="#fff">
          <Text>confirm</Text>
        </TouchableOpacity>
      </SafeAreaView>
  )

  const loginoptions = (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.confirmloginoption} onPress={handlegotocreateaccountpage} color="#fff">
        <Text>create account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmloginoption} onPress={handlegotologinpage} color="#fff">
        <Text>login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

  return currentpage === "login" ? loginpage : currentpage === "loginoptions" ? loginoptions : currentpage === "createaccount" ? createaccount : home
}

const styles = StyleSheet.create({
  titleforhomepage: {
    fontSize: 25
  },
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
    display: 'flex',
    alignItems: 'center',
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