import React from 'react';
import {View, Text, Image, Button, StyleSheet,ActivityIndicator, TouchableOpacity, TextInput, Pressable, ScrollView} from 'react-native'
import Modal from "react-native-modal";
//import { AdView, AdFormat } from 'react-native-applovin-max';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';

function InfoModal({isInfoModalVisible, toggleInfoModal, data, language }) {

	const [txt, setTxt] = React.useState("")

	const titleLanguage = [ 
	      {
	        english: 'Image info',
	        arabic: "معلومات الصورة",
	        french: "Informations sur l'image"
	      },
	      {
	        english: 'Size',
	        arabic: "مقاس",
	        french: "Taille"
	      },
	      {
	        english: 'Width',
	        arabic: "عرض",
	        french: "Largeur"
	      },
	      {
	        english: 'Height',
	        arabic: "ارتفاع",
	        french: "hauteur"
	      },
	      {
	        english: 'Type',
	        arabic: "النوع",
	        french: "le type"
	      },
	      {
	        english: 'Link',
	        arabic: "الرابط",
	        french: "Lien"
	      }

	    ]
   

   



  return (
	  <Modal 
	  		isVisible={isInfoModalVisible}
	  		coverScreen={true} 
	  		backdropOpacity={0.8}
	  		hasBackdrop={true}
	  		onBackButtonPress={toggleInfoModal}
	  		onBackdropPress={toggleInfoModal}  >
	    <View style={styles.modal}>


		      <ScrollView>

		      <View style={{position:"absolute", top:5, right:10}}>
			      <TouchableOpacity onPress={toggleInfoModal} >
			      	<FontAwesome name="close" color="white" size={25} />
			      </TouchableOpacity>
		      </View>
		      	
		      <View style={{padding:10}} >

		      <View style={{alignItems:'flex-start'}} >
		      	<Text style={{color:'white', fontWeight:'bold', fontSize:30}} >{titleLanguage[0][language]}</Text>
		      </View>
		      	<View style={{flexDirection:'row'}} >
		      		<View style={{flex:1, alignItems:'flex-start'}} >
		      			<Text style={styles.text} >{titleLanguage[1][language]}:</Text>
		      		</View>
		      		<View style={{flex:2, alignItems:'flex-start'}} >
		      			<Text style={{...styles.text, fontSize:15}} >{(data[0].fileSize*0.000001).toFixed(2)} Mb</Text>
		      		</View>
		      	</View>

		      	<View style={{flexDirection:'row'}} >
		      		<View style={{flex:1, alignItems:"flex-start"}} >
		      			<Text style={styles.text} >{titleLanguage[2][language]}:</Text>
		      		</View>
		      		<View style={{flex:2, alignItems:'flex-start'}} >
		      			<Text style={{...styles.text, fontSize:15}} >{data[0].width} px</Text>
		      		</View>
		      	</View>

		      	<View style={{flexDirection:'row'}} >
		      		<View style={{flex:1, alignItems:"flex-start"}} >
		      			<Text style={styles.text} >{titleLanguage[3][language]}:</Text>
		      		</View>
		      		<View style={{flex:2, alignItems:'flex-start'}} >
		      			<Text style={{...styles.text, fontSize:15}} >{data[0].height} px</Text>
		      		</View>
		      	</View>


		      	<View style={{flexDirection:'row'}} >
		      		<View style={{flex:1, alignItems:"flex-start"}} >
		      			<Text style={styles.text} >{titleLanguage[4][language]}:</Text>
		      		</View>
		      		<View style={{flex:2, alignItems:'flex-start'}} >
		      			<Text style={{...styles.text, fontSize:15}} >{data[0].type}</Text>
		      		</View>
		      	</View>

		      	<View style={{flexDirection:'row'}} >
		      		<View style={{flex:1, alignItems:"flex-start"}} >
		      			<Text style={styles.text} >{titleLanguage[5][language]}:</Text>
		      		</View>
		      		<View style={{flex:2, alignItems:'flex-start'}} >
		      			<Text style={{...styles.text, fontSize:15}} >{data[0].uri}</Text>
		      		</View>
		      	</View>

		      </View>

		      </ScrollView>


	    </View>


	  </Modal>
  );
}




const styles = StyleSheet.create({ 
	modal:{
		backgroundColor:'#273746',
		borderRadius:20, 
		flex:1
	},

	text: {
		marginVertical:20,
		color: 'grey',
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



export default InfoModal;