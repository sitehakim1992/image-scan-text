import React from "react"
import {
  View, 
  Text, 
  Button, 
  Image, 
  ActivityIndicator, 
  Share, 
  ToastAndroid, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Pressable,
} from 'react-native';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import WrapperModal from './WrapperModal'
import EditModal from './EditModal';
import Clipboard from '@react-native-clipboard/clipboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageModal from './ImageModal';
import InfoModal from './InfoModal';


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



function Details({navigation, route}) {




  const {data, language} = route.params;
  const imageUri = data[0].uri

  const [isLoad, setIsLoand] = React.useState(false)

  const [text, setText] = React.useState("")

  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [isImageModalVisible, setImageModalVisible] = React.useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = React.useState(false);
  const [isLoadInterstitial, setIsLoadInterstitial] = React.useState(false)



  const titleLanguage = [ 
          {
            english: 'Start scan',
            arabic: "ابدأ المسح",
            french: "Lancer le scan"
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
          },
          {
            english: 'Copied!',
            arabic: "نسخ!",
            french: "Copié!"
          }

        ]



  HMSInterstitial.setAdId("j7dxu21b93") // video ad
  HMSInterstitial.loadAd().then(res=>console.log('load"""""""""" '+res));


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
      if(isModalVisible){
      HMSInterstitial.isLoaded().then((result) => {
          if (result) {
            HMSInterstitial.show() // if result is true show the ad
              .then(res=>console.log('show"""""""""" '+res));
          }
        })
    }

  };


  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible)
  }


  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible)
  }

  const toggleInfoModal = () => {
    setInfoModalVisible(!isInfoModalVisible)
  }


  const onShare = async (textToShare) => {
    try {
      const result = await Share.share({
        message: textToShare,
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




  const handleScan = async () => {

    setIsLoand(true)
    toggleModal()

    TextRecognition.recognize(imageUri)
    .then((result)=>{
      setText(result.text)
      setTimeout(()=>{
        setIsLoand(false)
      },10000)
    })
    .catch(e=>{
      // console.log(e)
    })

    // setTimeout(()=>{
    //   setIsLoand(false)
    //   
    // }, 10000)
    
  }

  const handlePrintText = (t) => {

    Clipboard.setString(t);
    ToastAndroid.showWithGravity(
      titleLanguage[4][language],
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

  }


  const handleTxt = (t) => {
    setEditModalVisible(!isEditModalVisible)
    setText(t)
  }

  const deleteText = () => {
    setText("")
    setIsLoand(false)
  }

  const handleImagePress = () => {

  }




  return (


    <View style={styles.container}>
      
      <ImageBackground 
          source={require('../assets/homesplash.jpg')}  
          resizeMode="cover" 
          style={styles.imageBackground} >



        <ScrollView>

          <View style={{justifyContent:'space-between', padding:10, flex:1}}>

            <Pressable onPress={handleImagePress} style={{borderRaduis:'10'}} >

              <View style={{alignItems:'center', }} >
                <Image style={styles.logo} source={{uri: imageUri}} />

              </View>
            </Pressable>

            <View style={{flexDirection:'row', marginTop:5}} >
              <TouchableOpacity style={{width:100, alignItems:'center' ,backgroundColor:'rgba(128,0,128,0.7)', padding:4, borderRadius:10, margin:2  }}  onPress={()=>toggleImageModal()} >
                <MaterialIcons  name="zoom-out-map" size={25} color="#FAE5D3" />
              </TouchableOpacity>
              <TouchableOpacity style={{width:100, alignItems:'center' ,backgroundColor:'rgba(128,0,128,0.7)', padding:4, borderRadius:10, margin:2  }}  onPress={()=>toggleInfoModal()} >
                <MaterialIcons  name="more" size={25} color="#FAE5D3" />
              </TouchableOpacity>
              {/* <TouchableOpacity style={{width:50, alignItems:'center' ,backgroundColor:'rgba(128,0,128,0.5)', padding:4, borderRadius:10, margin:2  }}  onPress={()=>handlePrintText(text)} > */}
              {/*   <MaterialIcons  name="share" size={25} color="#FAE5D3" /> */}
              {/* </TouchableOpacity> */}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleScan}>
              <Text style={{fontSize:20, color:"white"}}>{titleLanguage[0][language]}</Text>
              <Image style={{width: 20,height: 20}} source={require('../assets/rightarrow.png')} />
            </TouchableOpacity>



            {
              isLoad == true ?
              <View>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
              :
              null

            }


            {
              text !== "" ?

            <View style={{flexDirection:'row', justifyContent:"space-around", marginBottom:200}}>
              <View style={{flex:6,backgroundColor:'rgba(48, 25, 52,0.6)', padding:10, borderRadius:10}}>
                <Text style={{color:'white', fontWeight:'bold',lineHeight:20}} >{text}</Text>
                {/* <View style={{position:'absolute', right:2, top:2, backgroundColor:'rgba(35, 155, 86,0.8)', padding:5, borderRadius:20}} > */}
                {/*   <TouchableOpacity onPress={()=>handlePrintText(text)} > */}
                {/*     <MaterialIcons  name="print" size={25} color="#FAE5D3" /> */}
                {/*   </TouchableOpacity> */}
                {/* </View> */}
              </View>  

              <View style={{flex:1, alignItems:'center'}} >
                <View style={{ justifyContent:'center'}}>
                  <TouchableOpacity style={{backgroundColor:'rgba(48, 25, 52,0.7)', padding:8, borderRadius:20, margin:2  }}  onPress={()=>handlePrintText(text)} >
                    <MaterialIcons  name="print" size={20} color="#FAE5D3" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{backgroundColor:'rgba(48, 25, 52,0.7)', padding:8, borderRadius:20, margin:2  }}  onPress={()=>onShare(text)} >
                    <FontAwesome  name="share" size={20} color="#FAE5D3" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{backgroundColor:'rgba(48, 25, 52,0.7)', padding:8, borderRadius:20, margin:2  }}  onPress={()=>toggleEditModal(text)} >
                    <FontAwesome  name="edit" size={20} color="#FAE5D3" />
                  </TouchableOpacity>


                  <TouchableOpacity style={{backgroundColor:'rgba(48, 25, 52,0.7)', padding:8, borderRadius:20, margin:2  }}  onPress={()=>deleteText(text)} >
                    <MaterialIcons  name="delete" size={20} color="#FAE5D3" />
                  </TouchableOpacity>


                </View>
              </View>            


            </View>
            :
            null

            }


          </View>


        <WrapperModal 
            isModalVisible={isModalVisible} 
            toggleModal={toggleModal} 
            isLoad={isLoad}
            language={language} />
        <EditModal 
            isEditModalVisible={isEditModalVisible} 
            toggleEditModal={toggleEditModal} 
            text={text} 
            handleTxt={handleTxt}
            onShare={onShare}
            language={language} />

        <ImageModal 
            isImageModalVisible={isImageModalVisible} 
            toggleImageModal={toggleImageModal} 
            imageUri={imageUri} 
            data={data}
            language={language}  />
        <InfoModal 
            isInfoModalVisible={isInfoModalVisible} 
            toggleInfoModal={toggleInfoModal} 
            data={data}
            language={language} />
        </ScrollView>


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

    </View>



  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  imageBackground:{
    flex:1,
  },
    textHeader: {
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
      backgroundColor:'rgba(35, 155, 86,0.8)',
      flexDirection:'row',
      borderRadius:100,
      height:50,
      marginHorizontal:'20%',
      marginVertical:30,
      alignItems:'center',
      justifyContent:'space-around'
    },
    logo:{
      position:'relative',
      marginVertical: "0%",
      width:"100%",
      borderRadius:10,
      height:200,
      resizeMode: 'stretch',
  },

})


export default Details;
