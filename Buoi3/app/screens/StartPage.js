import React from "react";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, Image  } from "react-native";
const logo = require("../../assets/logo.png")


export default function StartPage({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            { <Image source={logo} style={styles.image} resizeMode='contain' /> }

            <Text style={styles.welcome}>
                Welcome to <Text style={[styles.welcome, styles.title]}> Test App!</Text>
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container : {
    paddingHorizontal : 20,
    alignItems : "center",
    paddingTop: 200,
  },
  image : {
    height : 160,
    width : 170
  },
    welcome: {
        marginTop: 20,
        fontSize: 24,
        marginBottom: 40,
        textAlign: "center",
        fontWeight: "bold",
    },
    title: {
        color: "#2596be",
    },
    button: {
        backgroundColor: "#2596be",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerButton: {
        backgroundColor: "#2596be",
    },
});