import React from 'react'
import {Text, View} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from "./HomeStack"
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import Home from "../component/Home"
import Details from "../component/Details"

const Drawer = createDrawerNavigator();

const DrawerApp = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home" >
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Details" component={Details} />
			</Drawer.Navigator>			
		</NavigationContainer>

		)
}


export default DrawerApp;