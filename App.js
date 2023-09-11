import  React, {useState} from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import api from "./src/services/api"

export default function App(){
  const[cep, setCep] = useState("")
  const[logradouro, setLogradouro] = useState("")
  const[bairro, setBairro] = useState("")
  const[localidade, setLocalidade] = useState("")
  const[uf, setUf] = useState("")
  async function buscarCep(){
    if(cep == ""){
      Alert.alert("Digite o cep")
    }
    else if (cep == "aa"){
      Alert.alert("Digite um cep válido")
    }
    else{
      try{
        const response = await api.get(`/${cep}/json/`)
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setLocalidade(response.data.localidade)
        setUf(response.data.uf)
      }catch(error){console.log("Erro"+error)}
    }
  }


  return(
    <View style={styles.containerPrincipal}>

      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de CEP</Text>
      </View>
      <View style={styles.containerCep}>
        <TextInput 
          style={{
              borderColor: "#000000", borderWidth: 2, width: 200, fontSize: 18, marginTop: 20, marginEnd: 20, borderRadius: 10, padding: 15
            }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder = "Cep"
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep} >
            <Text style={styles.TextoBotao}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
          style={styles.textInput}
          value={logradouro}
          onChangeText={(texto) => setLogradouro(texto)}
          placeholder = "Logradouro"
        /><TextInput
        style={styles.textInput}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder = "Bairro"
      />
      <TextInput  
          style={styles.textInput}         
          value={localidade}
          onChangeText={(texto) => setLocalidade(texto)}
          placeholder = "Cidade"
      />
      <TextInput 
          style={{
              borderColor: "#000000", borderWidth: 2, width: 100, fontSize: 18, marginTop: 20, marginEnd: 20, borderRadius: 10, padding: 15, marginHorizontal: 20
            }}
          value={uf}
          onChangeText={(texto) => setUf(texto)}
          placeholder = "Estado"
        />

    </View>
  )
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: "#018786"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 21
  },
  containerCep: {
    flexDirection: "row",
    height: 100,
    marginHorizontal: 20
  },
  botaoBuscar: {
    backgroundColor: "#018786",
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20
  },
  TextoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center"
  },
  textInput: {    
      borderColor: "#000000",
       borderWidth: 2, 
       padding: 15,
       fontSize: 18, 
       marginTop: 30, 
       marginEnd: 30, 
       marginHorizontal: 20,
       borderRadius: 10    
  }
})