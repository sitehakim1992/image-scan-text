import React from 'react';
import {Text, View, Button, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Pressable, ActivityIndicator} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//import AppLovinMAX, { Configuration } from "react-native-applovin-max";
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrivacyPolicyModal from './PrivacyPolicyModal';


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

const Home = ({navigation, show}) => {
	const picNet = "https://tesseract.projectnaptha.com/img/eng_bw.png"
	const [cancelCam, setCancelCam] = React.useState(true)
	const [sourceFile, setSourceFile] = React.useState("")
	const [language, setLanguage] = React.useState('english');
	const [isLoad, setIsLoand] = React.useState(false);


	const [openModal, setOpenModal] = React.useState(true);





	const titleLanguage = [ 
					{
						english: 'Scan Text from image',
						arabic: "مسح النص من الصورة",
						french: "Extraire le texte à partir de l'image",
					},
					{
						english: 'Extract text from any image.',
						arabic: "استخراج النص من أي صورة.",
						french: "Extrayez le texte de n’importe quelle image."
					},
					{
						english: 'Start now',
						arabic: "ابدأ الآن",
						french: "Commencez maintenant"
					},
					{
						english: 'Take picture',
						arabic: "التقاط صورة",
						french: "Prendre une photo"
					},
					{
						english: 'From my phone',
						arabic: "من هاتفي",
						french: "Depuis mon téléphone"
					},
					{
						english: 'From the phone',
						arabic: "من الهاتف",
						french: "Du téléphone"
					}

				]
			


	const settingsLanguage = [ 
					{
						english: 'App settings',
						arabic: "إعدادات التطبيقات",
						french: "Paramètres de l'application"
					},
					{
						english: 'Choose language',
						arabic: "اختر اللغة",
						french: "Choisissez la langue"
					},
					{
						english: 'Choose screen background',
						arabic: "اختر خلفية الشاشة",
						french: "Choisir le fond d'écran"
					},
					{
						english: 'Choose navigation bar color',
						arabic: "اختر لون شريط التنقل",
						french: "Choisir la couleur de la barre de navigation"
					}

				]
		
	const handleAppLanguage = (language) =>{
		


		storeData('language', language);
		setLanguage(language);
	}


	const storeData = async (key, value) => {
		try{
			await AsyncStorage.setItem(key, value);
		}catch(e){

		}
	}


  const getData = async (key) =>{
  	try{
  		const value =  await AsyncStorage.getItem(key);
  		if(value !== null){
  			setLanguage(value)
  			return value
  		}
  	}catch(e){

  	}
  }


	const handleImageFromCamera = () => {
		launchCamera({ mediaType: 'photo' },(name)=>{
			//setSourceFile(name.assets[0].uri);
			//console.log(name)

			if(name.didCancel == true){
						
			}else{
				navigation.navigate("Details",{data:name.assets, language:language, title:titleLanguage[0][language]})
			}
			// setCancelCam(name.didCancel)
		})
	}

	const handleImageFromDevice = () =>{
		launchImageLibrary({ mediaType: 'photo' },(name)=>{
			//setSourceFile(name.assets[0].uri);
			if(name.didCancel == true){

			}else{
				navigation.navigate("Details",{data:name.assets, language:language, title:titleLanguage[0][language]})
			}
			//
			// setCancelCam(name.didCancel)
		})

	}

	const handleOpenDetails = () => {
		navigation.navigate("Details",{imageUri:picNet, language:language, title:titleLanguage[0][language]})
	}

	const handleOpenSettings = () => {

	}

	React.useEffect(()=>{
		setOpenModal(!openModal)
	},[show])

	  React.useEffect(()=>{
	  	getData('language');
	  },[language])



  return (
		<View style={styles.container}>
			
			<ImageBackground 
					source={require('../assets/homesplash.jpg')}  
					resizeMode="cover" 
					style={styles.imageBackground} >

				<ScrollView >
					<View style={{backgroundColor:'rgba(48, 25, 52,0.4)', borderRadius:10}}>
						<Text style={styles.textHeader}>{titleLanguage[0][language]}</Text>
					</View>

					<View style={{backgroundColor:'rgba(48, 25, 52,0.1)', borderRadius:10}}>
					<Text style={styles.textParagraph}>{titleLanguage[1][language]}</Text>
					</View>
					<Text style={{...styles.textParagraph, color:"#4681f4", textDecorationLine: 'underline'}}>{titleLanguage[2][language]}</Text>
					<TouchableOpacity style={styles.button} onPress={handleImageFromCamera}>
						<Text style={{fontSize:20, color:"white"}}>{titleLanguage[3][language]}</Text>
						<Image style={{width: 20,height: 20}} source={require('../assets/rightarrow.png')} />
					</TouchableOpacity>
					<Text style={{...styles.textParagraph, color:"#4681f4", textDecorationLine: 'underline'}}>{titleLanguage[4][language]}</Text>
					<TouchableOpacity style={styles.button} onPress={handleImageFromDevice}>
						<Text style={{fontSize:20, color:"white"}}>{titleLanguage[5][language]}</Text>
						<Image style={{width: 20,height: 20}} source={require('../assets/rightarrow.png')} />
					</TouchableOpacity>

{/*  */}
{/* 					<TouchableOpacity style={styles.button} onPress={handleOpenDetails}> */}
{/* 						<Text style={{fontSize:20, color:"white"}}>URL</Text> */}
{/* 						<Image style={{width: 20,height: 20}} source={require('../assets/rightarrow.png')} /> */}
{/* 					</TouchableOpacity> */}
{/*  */}

				</ScrollView>



			    <Modal
			      animationType="slide"
			      transparent={false}
			      visible={openModal}
			      onRequestClose={() => {
			        setOpenModal(false)
			      }}>
			    	
			      <View style={{padding:5}} >
			      	<View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', }} >
			      		<View>
			      			<Text style={{fontSize:30, color:'black', fontWeight:'bold'}} >{settingsLanguage[0][language]}</Text>
			      		</View>
			      		<TouchableOpacity style={{padding:10,left:5, top:5}}  onPress={()=>setOpenModal(false)} >
			      			<FontAwesome name="close" size={30} color="black" />
			      		</TouchableOpacity>
			      	</View>


			        <View>
					        <View style={{paddingVertical:10}} >
					        	<Text style={{fontSize:15, color:'black',fontWeight:'bold'}} >{settingsLanguage[1][language]}</Text>
					        </View>

					        <View style={{flexDirection:'row', justifyContent:'space-around'}} >
					        	<TouchableOpacity  onPress={()=>handleAppLanguage('arabic')} >
					        			<Text>العربية</Text>
					        	</TouchableOpacity>

					        	<TouchableOpacity  onPress={()=>handleAppLanguage('english')} >
					        			<Text>English</Text>
					        	</TouchableOpacity>

					        	<TouchableOpacity  onPress={()=>handleAppLanguage('french')} >
					        			<Text>Français</Text>
					        	</TouchableOpacity>
					        </View>        	
			        </View>

			      </View>

			    </Modal>


{/* 			    <Modal> */}
{/* 			    	<View style={{justifyContent:'center', flex:1}}> */}
{/* 			    		<ActivityIndicator size={60} color="green" /> */}
{/* 			    	</View> */}
{/* 			    </Modal> */}
{/*  */}


          <View>
            <HMSBanner
             style={{height:50}}
             bannerAdSize={"320_50"}
             adId="a78k75zjhy" 
             adParam={{ // specific ads for special ad audience //testw6vs28auh3
              adContentClassification: HMSAds.ContentClassification.AD_CONTENT_CLASSIFICATION_UNKOWN,
              gender:HMSAds.Gender.UNKNOWN,
              nonPersonalizedAd: HMSAds.NonPersonalizedAd.ALLOW_ALL,
              tagForChildProtection: HMSAds.TagForChild.TAG_FOR_CHILD_PROTECTION_UNSPECIFIED,
              tagForUnderAgeOfPromise:HMSAds.UnderAge.PROMISE_UNSPECIFIED,
             }}/>
          </View>
			</ImageBackground>



      <PrivacyPolicyModal />
		</View>
  );
};





const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	imageBackground:{
		flex:1,
		paddingTop:10
	},
	  textHeader: {
	  	marginVertical:20,
	    color: 'white',
	    fontSize: 30,
	    fontWeight: 'bold',
	    textAlign: 'center',
	  },
	  textParagraph:{
	  	marginVertical:20,
	  	color:'white',
	  	fontSize:15,
	  	textAlign:'center',
	  },
	  button:{
	  	backgroundColor:'rgba(128,0,128,0.7)',
	  	flexDirection:'row',
	  	borderRadius:100,
	  	height:50,
	  	marginHorizontal:'20%',
	  	alignItems:'center',
	  	justifyContent:'space-around'
	  }

})

export default Home;