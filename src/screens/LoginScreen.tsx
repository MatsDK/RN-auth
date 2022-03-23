import { signInWithEmailAndPassword } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";

interface LoginScreenProps {

}

export const LoginScreen: React.FC<LoginScreenProps> = (props: any) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const login = async () => {
		try {
			const credential = await signInWithEmailAndPassword(auth, email, password)
			console.log(credential)
			props.navigation.navigate("Home")
			setIsLoggedIn(true)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={"padding"}
		>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChange={text => setEmail(text.nativeEvent.text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChange={text => setPassword(text.nativeEvent.text)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={login}>
					<Text style={styles.button}>Login</Text>
				</TouchableOpacity>
				<Button onPress={() => props.navigation.navigate("SignUp")} title={"Sign Up"} />
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 150,
		maxWidth: "60%",
		marginLeft: 50
	},
	buttonContainer: {
		display: "flex",
		alignItems: "flex-start"
	},
	button: {
		backgroundColor: "#000",
		padding: 5,
		color: "#fff",
		borderRadius: 6,
		overflow: "hidden",
		fontSize: 18
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		width: "100%",
		fontSize: 18,
		margin: 4,
		padding: 2
	}
})