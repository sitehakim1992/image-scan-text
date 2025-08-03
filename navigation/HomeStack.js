import React from "react"
import Home from "../component/Home";
import Details from "../component/Details";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {View, Text, TouchableOpacity, Share} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


const HomeStack = () => {
	const [show, setShow] = React.useState(false)
	const handleSettings = ()=>{
		setShow(show=>!show);
	}
	return (
		<Stack.Navigator initialRouteName="Home" >
			<Stack.Screen name="Home" 
						options={{
							title:"Home",
							headerTitle:()=><HomeHeader handleSettings={handleSettings}/>,
							headerStyle: {
								backgroundColor: '#273746',
							},
					        headerTitleStyle: {
						        fontWeight: 'bold',
						        color:"white"
					          },
									}} >


					{
						(props)=><Home {...props} show={show} />
					}

			</Stack.Screen>
			<Stack.Screen 
				name="Details" 
				component={Details} 
				options={({route})=> ({
					title:route.params.title,
					headerStyle: {
						backgroundColor: '#273746',
					},
					headerTintColor:'white',
			        headerTitleStyle: {
				        fontWeight: 'bold',
				        color:"white"
			          },
					}) } />
		</Stack.Navigator>
		);
}



const HomeHeader = ({handleSettings}) =>{

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Scan text from image https://global.app.mi.com/details?lo=ID&la=en_US&id=com.newhmapps.scantext',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          ToastAndroid.showWithGravity(
            "Share this app",
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          )

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };



	return(
		<View style={{flexDirection:'row', justifyContent:'space-between', flex:1}} >
			<View style={{flex:5}} >
				<FontAwesome name="home" size={30} color="white" />
			</View>
			<View  style={{flexDirection:'row', justifyContent:'space-between', flex:2}}>
				<TouchableOpacity onPress={handleSettings} >
					<FontAwesome name="cog" size={30} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={onShareApp} >
					<FontAwesome name="share" size={30} color="white" />
				</TouchableOpacity>
			</View>
			<View style={{flex:1}} ></View>
			
		</View>
		);
}



export default HomeStack;