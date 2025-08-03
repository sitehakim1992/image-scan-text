import React from 'react';
import {View, Text, Image, Button, StyleSheet,ActivityIndicator, TouchableOpacity, ScrollView, TextInput, Pressable} from 'react-native'
import Modal from "react-native-modal";
//import { AdView, AdFormat } from 'react-native-applovin-max';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';

function ImageModal({isImageModalVisible, toggleImageModal, imageUri, data }) {

	const [txt, setTxt] = React.useState("")

  return (
	  <Modal 
	  		isVisible={isImageModalVisible}
	  		coverScreen={true} 
	  		backdropOpacity={0.8}
	  		hasBackdrop={true}
	  		onBackButtonPress={toggleImageModal}
	  		onBackdropPress={toggleImageModal}  >


	  				  		
			    <View style={styles.modal}>

				      <View style={{position:"absolute", top:5, right:10}}>
					      <TouchableOpacity onPress={toggleImageModal} >
					      	<FontAwesome name="close" color="white" size={25} />
					      </TouchableOpacity>
				      </View>

				    <Image style={{width: "100%", height:  600, resizeMode: 'stretch',}} source={{uri: imageUri}} />

			    </View>


	  </Modal>
  );
}




const styles = StyleSheet.create({ 
	modal:{
		backgroundColor:'#273746',
		borderRadius:20, 
		justifyContent:'space-around',
		flex:1
	},

	text: {
		marginVertical:20,
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textshadow:{
    fontSize:100,
    color:'#FFFFFF',
    fontFamily:'Times New Roman',
    paddingLeft:30,
    paddingRight:30,
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },

	  button:{
	  	backgroundColor:'rgba(128,0,128,0.3)',
	  	flexDirection:'row',
	  	borderRadius:10,
	  	paddingHorizontal:"5%",
	  	height:40,
	  	marginVertical:5,
	  	alignItems:'center',
	  	justifyContent:'space-around'
	  }
})



export default ImageModal;