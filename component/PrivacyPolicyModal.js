import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  ScrollView,
  Linking,
  StyleSheet,
  Pressable,
  BackHandler,
} from 'react-native';

// استيراد AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrivacyPolicyModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  // التحقق مما إذا كان المستخدم قد قبل من قبل
  const checkFirstLaunch = async () => {
    try {
      const accepted = await AsyncStorage.getItem('hasAcceptedPrivacyPolicy');
      if (!accepted) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error reading storage:', error);
    }
  };


  const handleDisagree = () =>{
    BackHandler.exitApp(); 
  }

  // حفظ حالة القبول
  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem('hasAcceptedPrivacyPolicy', 'true');
      setHasAccepted(true);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving acceptance:', error);
    }
  };

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  return (
    <Modal
      backdropColor="rgba(0,0,0,0.7)"
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.text}>
              Welcome to Scan Text app. This app uses text-recognition kit to enable text scanning.
              We do not store any personal data unless explicitly saved by the user.
            </Text>
            <Text style={styles.text}>
              By using this app, you agree to our Privacy Policy which explains how we collect, use, and share information.
              You can read the full policy at:
            </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://sites.google.com/view/qrscango-privacypolicy/text-recognition-kit')}
            >
              privacy policy 
            </Text>

            {/* يمكنك إضافة المزيد من النصوص هنا */}
          </ScrollView>

          <Pressable onPress={handleAccept} style={styles.button}>
            <Text style={styles.text2}>AGREE</Text>
          </Pressable>

          <Pressable onPress={handleDisagree} style={styles.button}>
            <Text style={styles.text2}>DISAGREE AND EXIT</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    width: '90%',
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    color:'black'
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius:20
  }, 
  button: {
        backgroundColor: '#00008B',
        padding: 10,
        borderRadius: 20,
        marginVertical:5,
        alignItems:'center'
      },
      text2: {
        color: 'white',
        fontSize: 16,
      },
});
export default PrivacyPolicyModal;