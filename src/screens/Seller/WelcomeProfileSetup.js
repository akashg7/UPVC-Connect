// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Image,
//   Animated,
//   Easing,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; 
// import VideoUploadWidget from '../../components/Seller/VideoUploadWidget'; 

// const WelcomeProfileSetup = ({ navigation }) => {
//   // Form state
//   const [businessName, setBusinessName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [manufacture, setsqftManufacture] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [email, setEmail] = useState('');
//   const [website, setWebsite] = useState('');
//   const [gst, setGst] = useState('');
//   const [contactPerson, setContactPerson] = useState('');
//   const [contactNo, setContactNo] = useState('');
//   const [brandProfile, setBrandProfile] = useState('');
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [videoUri, setVideoUri] = useState(null);
//   const [status, setStatus] = useState(null); // 'success', 'error'
//   const [errorMessage, setErrorMessage] = useState('');

//   // Refs for input focus management
//   const addressRef = useRef();
//   const cityRef = useRef();
//   const pinCodeRef = useRef();
//   const emailRef = useRef();
//   const gstRef = useRef();
//   const contactPersonRef = useRef();
//   const contactNoRef = useRef();
//   const brandProfileRef = useRef();
//   const sqftManufacture = useRef();
//   const websiteRef = useRef();

//   // Animation
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;
 
//   const animateIn = () => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 500,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 500,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   React.useEffect(() => {
//     animateIn();
//   }, []);
    
//   const validateForm = () => {
//     return false
//     if (
//       !businessName ||
//       !address ||
//       !city ||
//       !pinCode ||
//       !email ||
//       !gst ||
//       !contactPerson ||
//       !contactNo ||
//       selectedProducts.length === 0
//     ) {
//       return 'Please fill all required fields';
//     }

//     if (contactNo.length !== 10) {
//       return 'Please enter a valid 10-digit phone number';
//     }

//     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//       return 'Please enter a valid email address';
//     }

//     if (!/^[0-9]{6}$/.test(pinCode)) {
//       return 'Please enter a valid 6-digit PIN code';
//     }

//     return null;
//   };

//   const handleSubmit = () => {
//     const validationError = validateForm();
//     if (validationError) {
//       setStatus('error');
//       setErrorMessage(validationError);
//       return;
//     }

//     // Simulate API call
//     setTimeout(() => {
//       // Randomly decide success or failure for demo
//       const isSuccess = Math.random() > 0.3;
      
//       if (isSuccess) {
//         setStatus('success');
        
//         const sellerData = {
//           businessName,
//           address: { street: address, city, pinCode },
//           email,
//           gst,
//           contactPerson,
//           contactNo,
//           brandProfile,
//           products: selectedProducts,
//           videoUrl: videoUri,
//         };

//         setTimeout(() => {
//           navigation.replace('SellerMain', {
//             // screen: 'SellerDashboard',
//             screen: 'LeadDetails',
//             params: { sellerData },
//           });
//         }, 2000);
//       } else {
//         setStatus('error');
//         setErrorMessage('Onboarding failed due to GST number not active');
//       }
//     }, 1500);
//   };

//   const renderForm = () => (
//     <Animated.View 
//       style={[
//         styles.formContainer,
//         { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
//       ]}
//     >
//       {/* Business Information */}
//       <Text style={styles.sectionHeader}>BUSINESS INFORMATION</Text>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Company*</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Company"
//           placeholderTextColor="#999"
//           value={businessName}
//           onChangeText={setBusinessName}
//           onSubmitEditing={() => addressRef.current.focus()}
//           returnKeyType="next"
//         />
//       </View>

//       <View style={styles.inputRow}>
//         <View style={[styles.inputGroup, { flex: 0.5 }]}>
//           <Text style={styles.label}>Address*</Text>
//           <TextInput
//             ref={addressRef}
//             style={styles.input}
//             placeholder="Street address"
//             placeholderTextColor="#999"
//             value={address}
//             onChangeText={setAddress}
//             onSubmitEditing={() => cityRef.current.focus()}
//             returnKeyType="next"
//           />
//         </View>
//         <View style={[styles.inputGroup, { flex: 0.5, marginLeft: 10 }]}>
//           <Text style={styles.label}>City*</Text>
//           <TextInput
//             ref={cityRef}
//             style={styles.input}
//             placeholder="City"
//             placeholderTextColor="#999"
//             value={city}
//             onChangeText={setCity}
//             onSubmitEditing={() => pinCodeRef.current.focus()}
//             returnKeyType="next"
//           />
//         </View> 
//       </View>
//       <View style={styles.inputRow}>
//         <View style={[styles.inputGroup, { flex: 0.5 }]}>
//           <Text style={styles.label}>Years in business? *</Text>
//           <TextInput
//             ref={addressRef}
//             style={styles.input}
//             placeholder="No. of Years"
//             placeholderTextColor="#999"
//             value={address}
//             onChangeText={setAddress}
//             onSubmitEditing={() => cityRef.current.focus()}
//             returnKeyType="next"
//           />
//         </View>
//         <View style={[styles.inputGroup, { flex: 0.5, marginLeft: 10 }]}>
//           <Text style={styles.label}>PIN Code*</Text>
//           <TextInput
//             ref={pinCodeRef}
//             style={styles.input}
//             placeholder="6-digit PIN code"
//             placeholderTextColor="#999"
//             value={pinCode}
//             keyboardType="number-pad"
//             onChangeText={setPinCode}
//             maxLength={6}
//             onSubmitEditing={() => emailRef.current.focus()}
//             returnKeyType="next" 
//           />
//         </View>
//       </View>
      
//        <View style={styles.inputGroup}>
//         <Text style={styles.label}>Manufacturig Capcaity in sq ft / month*</Text>
//         <TextInput 
//             ref={sqftManufacture}
//             style={styles.input}
//             placeholder="sq ft"
//             placeholderTextColor="#999"
//             value={manufacture}
//             onChangeText={setsqftManufacture}
//             onSubmitEditing={() => sqftManufacture.current.focus()}
//             returnKeyType="next"
//           />
//         </View>

     

//       {/* Contact Information */}
//       <Text style={styles.sectionHeader}>CONTACT INFORMATION</Text>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Email*</Text>
//         <TextInput
//           ref={emailRef}
//           style={styles.input}
//           placeholder="business@email.com"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           onSubmitEditing={() => gstRef.current.focus()}
//           returnKeyType="next"
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Website*</Text>
//         <TextInput
//           ref={websiteRef}
//           style={styles.input}
//           placeholder="www.upvcseller.com"
//           placeholderTextColor="#999"
//           value={website}
//           onChangeText={setWebsite}
//           keyboardType="email-address"
//           onSubmitEditing={() => websiteRef.current.focus()}
//           returnKeyType="next"
//         />
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>GST Number*</Text>
//         <TextInput
//           ref={gstRef}
//           style={styles.input}
//           placeholder="22AAAAA0000A1Z5"
//           placeholderTextColor="#999"
//           value={gst}
//           onChangeText={setGst}
//           onSubmitEditing={() => contactPersonRef.current.focus()}
//           returnKeyType="next"
//         />
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Contact Person*</Text>
//         <TextInput
//           ref={contactPersonRef}
//           style={styles.input}
//           placeholder="Full name"
//           placeholderTextColor="#999"
//           value={contactPerson}
//           onChangeText={setContactPerson}
//           onSubmitEditing={() => contactNoRef.current.focus()}
//           returnKeyType="next"
//         />
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Contact Number*</Text>
//         <TextInput
//           ref={contactNoRef}
//           style={styles.input}
//           placeholder="10-digit mobile number"
//           placeholderTextColor="#999"
//           value={contactNo}
//           onChangeText={setContactNo}
//           keyboardType="phone-pad"
//           maxLength={10}
//           onSubmitEditing={() => brandProfileRef.current.focus()}
//           returnKeyType="next"
//         />
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Brand of Profile Used</Text>
//         <TextInput
//           ref={brandProfileRef}
//           style={styles.input}
//           placeholder="e.g Veka"
//           placeholderTextColor="#999"
//           value={brandProfile}
//           onChangeText={setBrandProfile}
//           returnKeyType="done"
//         />
//       </View>

//       {/* Video Upload */}
//       <Text style={styles.sectionHeader}>BUSINESS PROFILE VIDEO</Text>
//       <VideoUploadWidget
//         onVideoSelected={setVideoUri}
//         hasVideo={!!videoUri}
//       />
//       {!videoUri && (
//         <Text style={styles.videoHint}>
//           Upload a 60-second video to get lead priority!
//         </Text>
//       )}

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>COMPLETE REGISTRATION</Text>
//         <Icon name="arrow-forward" size={24} color="#fff" />
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   const renderStatus = () => {
//     if (status === 'success') {
//       return (
//         <View style={styles.statusContainer}>
//           <View style={styles.successCircle}>
//             <Icon name="check" size={48} color="#fff" />
//           </View>
//           <Text style={styles.successTitle}>Registration Successful!</Text>
//           <Text style={styles.successText}>
//             Your seller profile has been created successfully. You'll be redirected to your dashboard shortly.
//           </Text>
//         </View>
//       );
//     }

//     if (status === 'error') {
//       return (
//         <View style={styles.statusContainer}>
//           <View style={styles.errorCircle}>
//             <Icon name="error" size={48} color="#fff" />
//           </View>
//           <Text style={styles.errorTitle}>Onboarding Failed</Text>
//           <Text style={styles.errorText}>{errorMessage}</Text>
          
//           <TouchableOpacity 
//             style={styles.tryAgainButton}
//             onPress={() => setStatus(null)}
//           >
//             <Text style={styles.tryAgainText}>TRY AGAIN</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return null;
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView 
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Logo Header */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={require('../../assets/logo.png')}  
//             style={styles.logo}
//             resizeMode="contain"
//           /> 
//         </View>

//         {/* {status ? renderStatus() : renderForm()} */}
//         {status ? renderStatus() : renderForm()}
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     paddingBottom: 40,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     paddingTop: 35, 
//   },
//   logo: {
//     width: 140,
//     height: 80,
//   },
//   welcomeTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: '#000',
//     marginTop: 10,
//     letterSpacing: 1,
//   },
//   formContainer: {
//     paddingHorizontal: 25,
//   },
//   sectionHeader: {
//     fontSize: 14,
//     fontWeight: '800',
//     color: '#000', 
//     marginBottom: 12,
//     letterSpacing: 1,
//     textTransform: 'uppercase',
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//     fontWeight: '600',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 14,
//     fontSize: 16,
//     color: '#000',
//     backgroundColor: '#f9f9f9',
//   },
//   chipContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 20,
//   },
//   videoHint: {
//     color: '#666',
//     fontStyle: 'italic',
//     fontSize: 13,
//     marginTop: 8,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   submitButton: {
//     backgroundColor: '#000',
//     padding: 18,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//     marginRight: 10,
//     letterSpacing: 0.5,
//   },
//   statusContainer: {
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     paddingTop: 60,
//   },
//   successCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   errorCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#F44336',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   successTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: '#000',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   successText: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 30,
//   },
//   errorTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: '#000',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 30,
//   },
//   tryAgainButton: {
//     borderWidth: 1,
//     borderColor: '#000',
//     padding: 16,
//     borderRadius: 8,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   tryAgainText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#000',
//     letterSpacing: 0.5,
//   },
// });

// export default WelcomeProfileSetup;


import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoUploadWidget from '../../components/Seller/VideoUploadWidget';
import { pick, types, isCancel } from '@react-native-documents/picker';
import RNPickerSelect from 'react-native-picker-select';
import AppText from '../../components/AppText';

const WelcomeProfileSetup = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [manufacture, setsqftManufacture] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [gst, setGst] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [brandProfile, setBrandProfile] = useState('');
  const [gstCertificate, setGstCertificate] = useState(null);
  const [visitingCard, setVisitingCard] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const refs = {
    address: useRef(), city: useRef(), pin: useRef(), email: useRef(),
    gst: useRef(), person: useRef(), contact: useRef(), website: useRef(),
    brand: useRef(), manufacture: useRef(),
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.ease, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.ease, useNativeDriver: true }),
    ]).start();
  }, []);

  const pickGstCertificate = async () => {
    try {
      const [res] = await pick({ types: [types.pdf, types.images], allowMultiSelection: false });
      setGstCertificate(res);
    } catch (err) {
      if (!isCancel(err)) console.log(err);
    }
  };

  const pickVisitingCard = async () => {
    try {
      const [res] = await pick({ types: [types.images], allowMultiSelection: false });
      setVisitingCard(res);
    } catch (err) {
      if (!isCancel(err)) console.log(err);
    }
  };

  const validateForm = () => {
    if (!businessName || !address || !city || !pinCode || !email ||
        !gst || !contactPerson || !contactNo || !brandProfile) {
      return 'Please fill all required fields';
    }
    if (contactNo.length !== 10) return 'Please enter a valid 10-digit phone number';
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return 'Invalid email address';
    if (!/^[0-9]{6}$/.test(pinCode)) return 'Invalid 6-digit PIN code';
    return null;
  };

  const handleSubmit = () => {
    // const validationError = validateForm();
    // if (validationError) {
    //   setStatus('error');
    //   setErrorMessage(validationError);
    //   return;
    // }
    setTimeout(() => {
      // Math.random() > 0.3
        // ? successFlow()
        // : failureFlow();
         successFlow()
    }, 1500);
  };

  const successFlow = () => {
    setStatus('success');
    const data = {
      businessName, address: { street: address, city, pinCode }, email,
      gst, contactPerson, contactNo, brandProfile, manufacture,
      gstCertificate, visitingCard, videoUrl: videoUri,
    };
    setTimeout(() => navigation.replace('SellerMain', {
      screen: 'LeadDetails', params: { sellerData: data }
    }), 2000);
  };

  const failureFlow = () => {
    setStatus('error');
    setErrorMessage('Onboarding failed due to GST number not active');
  };

  const renderForm = () => (
    <Animated.View style={[styles.form, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      {/* Business Info */}
      <AppText weight='SemiBold' style={styles.header}>BUSINESS INFORMATION</AppText>
      <Input label="Company*" value={businessName} onChange={setBusinessName}
        returnKeyType="next" onSubmit={() => refs.address.current.focus()} />
      <View style={styles.row}>
        <Input label="Address*" ref={refs.address} value={address} onChange={setAddress}
          onSubmit={() => refs.city.current.focus()} style={{ flex: 1 }} />
        <Input label="City*" ref={refs.city} value={city} onChange={setCity}
          onSubmit={() => refs.pin.current.focus()} style={{ flex: 1, marginLeft: 10 }} />
      </View>
      <View style={styles.row}>
        <Input label="Years in business*" ref={refs.manufacture} value={manufacture} onChange={setsqftManufacture}
          placeholder="sq ft/month" keyboardType="numeric" style={{ flex: 1 }} />
        <Input label="PIN Code*" ref={refs.pin} value={pinCode} onChange={setPinCode}
          placeholder="6-digit" keyboardType="number-pad" maxLength={6} style={{ flex: 1, marginLeft: 10 }}
          onSubmit={() => refs.email.current.focus()} returnKeyType="next" />
      </View>

      {/* Contact Info */}
      <AppText weight='SemiBold' style={styles.header}>CONTACT INFORMATION</AppText>
      <Input label="Email*" ref={refs.email} value={email} onChange={setEmail}
        keyboardType="email-address" onSubmit={() => refs.website.current.focus()} />
      <Input label="Website*" ref={refs.website} value={website} onChange={setWebsite}
        keyboardType="url" onSubmit={() => refs.gst.current.focus()} />
      <Input label="GST Number*" ref={refs.gst} value={gst} onChange={setGst}
        onSubmit={() => refs.person.current.focus()} />
      <Input label="Contact Person*" ref={refs.person} value={contactPerson} onChange={setContactPerson}
        onSubmit={() => refs.contact.current.focus()} />
      <Input label="Contact Number*" ref={refs.contact} value={contactNo} onChange={setContactNo}
        keyboardType="phone-pad" maxLength={10} />

      {/* GST Upload */}
      <UploadField
        label="GST Certificate"
        file={gstCertificate}
        onUpload={pickGstCertificate}
        iconName="upload-file"
      />

      {/* Visiting Card */}
      <UploadField
        label="Visiting Card"
        file={visitingCard}
        onUpload={pickVisitingCard}
        iconName="image"
      />

      {/* Brand Picker */}
      <AppText weight='SemiBold' style={styles.label}>Brand of Profile Used*</AppText>
      <RNPickerSelect
        placeholder={{ label: 'Select a brand...', value: null }}
        value={brandProfile}
        onValueChange={setBrandProfile}
        items={[
          { label: 'Fenesta', value: 'fenesta' },
          { label: 'Aparna Venster', value: 'aparna' },
          { label: 'LG Hausys', value: 'lg' },
        ]}
        style={{
          inputIOS: styles.pickerInput,
          inputAndroid: styles.pickerInput,
          iconContainer: styles.pickerIcon,
        }}
        Icon={() => <Icon name="arrow-drop-down" size={24} color="#000" />}
      />

      {/* Video Upload */}
      <AppText weight='SemiBold' style={styles.header}>BUSINESS PROFILE VIDEO</AppText>
      <VideoUploadWidget onVideoSelected={setVideoUri} hasVideo={!!videoUri} />
      {!videoUri && <AppText style={styles.videoHint}>Upload a 60-second video to get lead priority!</AppText>}

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <AppText weight='Bold' style={styles.submitText}>COMPLETE REGISTRATION</AppText>
        <Icon name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderStatus = () => {
    if (status === 'success') {
      return <StatusView icon="check" title="Registration Successful!" text="Redirecting..." circleBg="#4CAF50" />;
    }
    if (status === 'error') {
      return <StatusView icon="error" title="Onboarding Failed" text={errorMessage} circleBg="#F44336" onRetry={() => setStatus(null)} />;
    }
    return null;
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoWrap}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        {status ? renderStatus() : renderForm()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Common Subcomponents
const Input = React.forwardRef(({ label, style, ...props }, ref) => (
  <View style={[styles.inputGroup, style]}>
    <AppText weight='SemiBold' style={styles.label}>{label}</AppText>
    <TextInput style={styles.input} ref={ref} {...props} />
  </View>
));

const UploadField = ({ label, file, onUpload, iconName }) => (
  <View style={styles.uploadGroup}>
    <AppText weight='SemiBold' style={styles.label}>{label}</AppText>
    <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
      <Icon name={iconName} size={20} color="#000" />
      <AppText style={styles.uploadText}>{file ? file.name || file.uri.split('/').pop() : 'Upload'}</AppText>
    </TouchableOpacity>
  </View>
);

const StatusView = ({ icon, title, text, circleBg, onRetry }) => (
  <View style={styles.status}>
    <View style={[styles.circle, { backgroundColor: circleBg }]}>
      <Icon name={icon} size={48} color="#fff" />
    </View>
    <AppText style={styles.statusTitle}>{title}</AppText>
    <AppText style={styles.statusText}>{text}</AppText>
    {onRetry && <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
      <AppText style={styles.retryText}>TRY AGAIN</AppText>
    </TouchableOpacity>}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 40 },
  logoWrap: { alignItems: 'center', paddingTop: 35 },
  logo: { width: 140, height: 80 },
  form: { paddingHorizontal: 25 },
  header: { fontSize: 14 , color: '#000', marginTop: 20, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#333', marginBottom: 6, },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, fontSize: 16, color: '#000', backgroundColor: '#f9f9f9' },
  uploadGroup: { marginBottom: 16 },
  uploadBtn: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: '#000', borderRadius: 8 },
  uploadText: { marginLeft: 8, fontSize: 16, color: '#000' },
  pickerInput: { fontSize: 16, padding: 4, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, color: '#000', backgroundColor: '#f9f9f9' },
  pickerIcon: { top: 20, right: 12 },
  videoHint: { color: '#666', fontStyle: 'italic', fontSize: 13, marginTop: 8, textAlign: 'center' },
  submit: { backgroundColor: '#000', padding: 18, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  submitText: { color: '#fff', fontSize: 16,  marginRight: 10, letterSpacing:2 },
  status: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 30 },
  circle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  statusTitle: { fontSize: 22, color: '#000', marginBottom: 15, textAlign: 'center' },
  statusText: { fontSize: 16, color: '#555', textAlign: 'center', lineHeight: 24 },
  retryBtn: { borderWidth: 1, borderColor: '#000', padding: 16, borderRadius: 8, marginTop: 20 },
  retryText: { fontSize: 16, color: '#000' },
});

export default WelcomeProfileSetup;
