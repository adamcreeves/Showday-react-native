import React, { useState } from "react";
import {
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./RegisterStyles";

function RegisterVendor() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const nav = useNavigation();

  const onCreateAccountPressed = () => {
    if (fullName === "" || email === "" || password === "") {
      alert("You need to enter your full name, email, and password");
    } else if (password.length < 8) {
      alert("Your password must be at least 8 character long");
    } else if (password !== confirmPassword) {
      alert("Your passwords don't match");
    } else {
      Keyboard.dismiss();
      setVisible(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            fullName,
            acctType: "vendor",
          };
          const userRef = firebase.firestore().collection("users");
          userRef
            .doc(uid)
            .set(data)
            .then(() => {
              alert("Registration Successful!");
              nav.navigate("Login");
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={visible} />
      <Text style={styles.text__title}>Vendor</Text>
      <Text style={styles.text__subtitle}>Registration</Text>
      <TextInput
        style={styles.text__input}
        placeholder="Full Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.text__input}
        placeholder="Email"
        placeholderTextColor="#adadad"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.text__input}
        placeholder="Password"
        placeholderTextColor="#adadad"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.text__input}
        placeholder="Confirm Password"
        placeholderTextColor="#adadad"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={onCreateAccountPressed}>
        <Text style={styles.button__text}>Create Account</Text>
      </TouchableOpacity>
      <Text style={styles.footer__text}>Already have an account?</Text>
      <Text style={styles.footer__link} onPress={() => nav.navigate("Login")}>
        Sign in here
      </Text>
    </View>
  );
}

export default RegisterVendor;
