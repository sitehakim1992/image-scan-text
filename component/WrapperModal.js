import React from 'react';
import {View, Text, Button, StyleSheet,ActivityIndicator, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";
// import AppLovinMAX from "react-native-applovin-max";
//import { AdView, AdFormat } from 'react-native-applovin-max';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';


import HMSAds, {
  HMSBanner,
  HMSInstream,
  HMSNative,
  HMSVastView,
  HMSVast,
  HMSInterstitial,
  HMSOaid,
  HMSInstallReferrer,
  HMSSplash,
  HMSReward,
} from "@hmscore/react-native-hms-ads";


function WrapperModal({isModalVisible, toggleModal, isLoad, language}) {

	const BANNER_AD_UNIT_ID = "49854d4ccc72c517"

	const titleLanguage = [
		{
			english:'Please wait',
			arabic:'المرجو الإنتظار',
			french:"S'il vous plaît, attendez"
		},
		{
			english:'Done!',
			arabic:'تم الامر!',
			french:"Fait!"
		},
		{
			english:'Close!',
			arabic:'إغلاق!',
			french:"Fermer!"
		}
		]


  return (
	  <Modal 
	  		isVisible={isModalVisible} 
	  		coverScreen={true} 
	  		backdropOpacity={0.7}
	  		hasBackdrop={true}
	  		onBackButtonPress={toggleModal}
	  		onBackdropPress={toggleModal} >
	    <View style={styles.modal}>
	      <View style={{position:"absolute", top:5, right:10}}>
		      <TouchableOpacity onPress={toggleModal} >
		      	<FontAwesome name="close" color="white" size={25} />
		      </TouchableOpacity>
	      </View>

		    <View style={{padding:10}} >
		      {
		      	isLoad == true ?
		      		<Text style={styles.text} >{titleLanguage[0][language]}</Text>
		      		:
		      		<Text style={styles.text} >{titleLanguage[1][language]}</Text>
		      }




            {
              isLoad == true ?
              <View>
                <ActivityIndicator size="huge" color="#00ff00" />
              </View>
              :
              <View style={{alignItems:'center'}}>
              	<Ionicons name="checkmark-done-outline" color="#00ff00" size={40} />
              	<TouchableOpacity onPress={toggleModal} >
	              	<Text style={{...styles.text, color:"#4681f4", textDecorationLine: 'underline'}} >{titleLanguage[2][language]}</Text>
              	</TouchableOpacity>
              </View>

            }

		    </View>

{/*  */}
{/* 		    <View style={{justifyContent:'center',flexDirection:'row'}}>			 */}
{/* 			    <AdView  */}
{/* 				    adUnitId={BANNER_AD_UNIT_ID} */}
{/* 			        adFormat={AdFormat.BANNER} */}
{/* 			        style={styles.banner} /> */}
{/* 	        </View> */}


          <View>
            <HMSBanner
             style={{height:100}}
             bannerAdSize={"320_100"}
             adId="a78k75zjhy" 
             adParam={{ // specific ads for special ad audience //testw6vs28auh3
              adContentClassification: HMSAds.ContentClassification.AD_CONTENT_CLASSIFICATION_UNKOWN,
              gender:HMSAds.Gender.UNKNOWN,
              nonPersonalizedAd: HMSAds.NonPersonalizedAd.ALLOW_ALL,
              tagForChildProtection: HMSAds.TagForChild.TAG_FOR_CHILD_PROTECTION_UNSPECIFIED,
              tagForUnderAgeOfPromise:HMSAds.UnderAge.PROMISE_UNSPECIFIED,
             }}/>
          </View>


	    </View>


	  </Modal>
  );
}




const styles = StyleSheet.create({ 
	modal:{
		height:300, 
		backgroundColor:'#273746',
		borderRadius:20, 
		justifyContent:'space-around'
	},
	banner: {
	// Set background color for banners to be fully functional
		height: 'auto',
		bottom:  Platform.select({
		ios: 36, // For bottom safe area
		android: 0,
	})
	},

	text: {
		marginVertical:20,
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
})



export default WrapperModal;