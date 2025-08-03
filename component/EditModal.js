import React from 'react';
import {View, Text, Button, StyleSheet,ActivityIndicator, TouchableOpacity, TextInput, Pressable} from 'react-native'
import Modal from "react-native-modal";
//import { AdView, AdFormat } from 'react-native-applovin-max';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';

function EditModal({isEditModalVisible, toggleEditModal, text, handleTxt, onShare, language}) {

	const [txt, setTxt] = React.useState("")


	const BANNER_AD_UNIT_ID = "49854d4ccc72c517"



	const titleLanguage = [ 
	      {
	        english: 'Edit text',
	        arabic: "تعديل النص",
	        french: "éditer le texte"
	      },
	      {
	        english: 'Save',
	        arabic: "حفظ",
	        french: "Sauvegarder"
	      },
	      {
	        english: 'Share',
	        arabic: "مشاركة",
	        french: "Partager"
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
   

	const onShareText = (t) =>{
		onShare(t)
		toggleEditModal()
	}


	React.useEffect(()=>{
		setTxt(text)
	},[text])

  return (
	  <Modal 
	  		isVisible={isEditModalVisible} 
	  		coverScreen={true} 
	  		backdropOpacity={0.8}
	  		hasBackdrop={true}
	  		onBackButtonPress={toggleEditModal}
	  		onBackdropPress={toggleEditModal} >
	    <View style={styles.modal}>

		      <View style={{position:"absolute", top:5, right:10}}>
			      <TouchableOpacity onPress={toggleEditModal} >
			      	<FontAwesome name="close" color="white" size={25} />
			      </TouchableOpacity>
		      </View>

		    <View style={{padding:10}} >

		    	<Text style={styles.text} >{titleLanguage[0][language]}</Text>


			    <View
			      style={{
					    borderWidth: 1,
					    borderColor: "#fff",
					    borderRadius: 10,
					    backgroundColor: "#ababab"
			      }}>
			      <TextInput
			        editable
			        multiline
			        numberOfLines={10}
			        onChangeText={setTxt}
			        value={txt}
			        style={{padding: 10}}
			      />
		      </View>

		      <View style={{flexDirection:'row', justifyContent:"space-around",}} >
		      	

			      <Pressable style={styles.button} onPress={()=>handleTxt(txt)}>
			      	<Text style={{fontSize:20, color:'white', fontWeight:"bold"}} >{titleLanguage[1][language]}</Text>
			      </Pressable>
			      <Pressable style={styles.button} onPress={()=>onShareText(txt)}>
			      	<Text style={{fontSize:20, color:'white', fontWeight:"bold"}} >{titleLanguage[2][language]}</Text>
			      </Pressable>

		      </View>




		    </View>

{/* 		    <View style={{justifyContent:'center',flexDirection:'row'}}>			 */}
{/* 			    <AdView  */}
{/* 				    adUnitId={BANNER_AD_UNIT_ID} */}
{/* 			        adFormat={AdFormat.BANNER} */}
{/* 			        style={styles.banner} /> */}
{/*         </View> */}

	    </View>


	  </Modal>
  );
}




const styles = StyleSheet.create({ 
	modal:{
		height:400, 
		backgroundColor:'#273746',
		borderRadius:20, 
		justifyContent:'space-around'
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



export default EditModal;