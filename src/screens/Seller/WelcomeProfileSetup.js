// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import RNPickerSelect from 'react-native-picker-select';
// import { pick, types, isCancel } from '@react-native-documents/picker';
// import AppText from '../../components/AppText';
// import axios from 'axios';

// const WelcomeProfileSetup = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     companyName: '',
//     address: '',
//     city: '',
//     yearsInBusiness: '',
//     pinCode: '',
//     email: '',
//     website: '',
//     gstNumber: '',
//     contactPerson: '',
//     contactNumber: '',
//     brandOfProfileUsed: '',
//     gstCertificate: null,
//     visitingCard: null,
//     businessProfileVideo: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const pickDocument = async (field) => {
//     try {
//       const [res] = await pick({ 
//         types: field === 'visitingCard' ? [types.images] : [types.pdf, types.images],
//         allowMultiSelection: false 
//       });
//       handleChange(field, res);
//     } catch (err) {
//       if (!isCancel(err)) console.log(err);
//     }
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'companyName', 'address', 'city', 'yearsInBusiness', 'pinCode',
//       'email', 'gstNumber', 'contactPerson', 'contactNumber', 'brandOfProfileUsed'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         return `Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
//       }
//     }

//     if (formData.contactNumber.length !== 10) {
//       return 'Please enter a valid 10-digit phone number';
//     }

//     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
//       return 'Invalid email address';
//     }

//     if (!/^[0-9]{6}$/.test(formData.pinCode)) {
//       return 'Invalid 6-digit PIN code';
//     }

//     return null;
//   };

//   const handleSubmit = async () => {
//     const validationError = validateForm();
//     if (validationError) {
//       Alert.alert('Validation Error', validationError);
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataToSend = new FormData();

//       // Add all text fields
//       Object.keys(formData).forEach(key => {
//         if (key !== 'gstCertificate' && key !== 'visitingCard' && key !== 'businessProfileVideo') {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
//       console.log("fields verified")
//       // Add files if they exist
//       if (formData.gstCertificate) {
//         formDataToSend.append('gstCertificate', {
//           uri: formData.gstCertificate.uri,
//           type: formData.gstCertificate.mimeType,
//           name: formData.gstCertificate.name || 'gstCertificate.pdf'
//         });
//       }
//       console.log("doc verified")

//       if (formData.visitingCard) {
//         formDataToSend.append('visitingCard', {
//           uri: formData.visitingCard.uri,
//           type: formData.visitingCard.mimeType,
//           name: formData.visitingCard.name || 'visitingCard.jpg'
//         });
//       }
//       console.log("doc2 verified")

//       if (formData.businessProfileVideo) {
//         formDataToSend.append('businessProfileVideo', {
//           uri: formData.businessProfileVideo.uri,
//           type: formData.businessProfileVideo.mimeType,
//           name: formData.businessProfileVideo.name || 'businessProfileVideo.mp4'
//         });
//       }
//       console.log("formDataToSend : " , formDataToSend)
//       const response = await axios.post('http://10.7.10.49:9000/api/sellers/register', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         navigation.replace('SellerMain', {
//           screen: 'LeadDetails',
//           params: { sellerData: response.data.seller }
//         });
//       } else {
//         Alert.alert('Registration Failed', response.data.message || 'Unknown error occurred');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       Alert.alert(
//         'Registration Failed',
//         error.response?.data?.message || error.message || 'Failed to register. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.logoWrap}>
//           <Image 
//             source={require('../../assets/logo.png')} 
//             style={styles.logo} 
//             resizeMode="contain" 
//           />
//         </View>

//         <View style={styles.form}>
//           {/* Business Info */}
//           <AppText weight='Inter' style={styles.header}></AppText>
//           <Input 
//             label="Company Name*" 
//             value={formData.companyName} 
//             onChange={(val) => handleChange('companyName', val)}
//           />

//           <Input 
//             label="Address*" 
//             value={formData.address} 
//             onChange={(val) => handleChange('address', val)}
//           />

//           <View style={styles.row}>
//             <Input 
//               label="City*" 
//               value={formData.city} 
//               onChange={(val) => handleChange('city', val)}
//               style={{ flex: 1 }}
//             />
//             <Input 
//               label="PIN Code*" 
//               value={formData.pinCode} 
//               onChange={(val) => handleChange('pinCode', val)}
//               placeholder="6-digit" 
//               keyboardType="number-pad" 
//               maxLength={6} 
//               style={{ flex: 1, marginLeft: 10 }}
//             />
//           </View>

//           <Input 
//             label="Years in Business*" 
//             value={formData.yearsInBusiness} 
//             onChange={(val) => handleChange('yearsInBusiness', val)}
//             keyboardType="numeric" 
//           />

//           {/* Contact Info */}
//           <AppText weight='Inter' style={styles.header}>CONTACT INFORMATION</AppText>
//           <Input 
//             label="Email*" 
//             value={formData.email} 
//             onChange={(val) => handleChange('email', val)}
//             keyboardType="email-address" 
//           />

//           <Input 
//             label="Website" 
//             value={formData.website} 
//             onChange={(val) => handleChange('website', val)}
//             keyboardType="url" 
//           />

//           <Input 
//             label="GST Number*" 
//             value={formData.gstNumber} 
//             onChange={(val) => handleChange('gstNumber', val)}
//           />

//           <Input 
//             label="Contact Person*" 
//             value={formData.contactPerson} 
//             onChange={(val) => handleChange('contactPerson', val)}
//           />

//           <Input 
//             label="Contact Number*" 
//             value={formData.contactNumber} 
//             onChange={(val) => handleChange('contactNumber', val)}
//             keyboardType="phone-pad" 
//             maxLength={10} 
//           />

//           {/* Document Uploads */}
//           <UploadField
//             label="GST Certificate*"
//             file={formData.gstCertificate}
//             onUpload={() => pickDocument('gstCertificate')}
//             iconName="upload-file"
//           />

//           <UploadField
//             label="Visiting Card"
//             file={formData.visitingCard}
//             onUpload={() => pickDocument('visitingCard')}
//             iconName="image"
//           />

//           {/* Brand Picker */}
//           <AppText weight='Inter' style={styles.label}>Brand of Profile Used*</AppText>
//           <RNPickerSelect
//             placeholder={{ label: 'Select a brand...', value: null }}
//             value={formData.brandOfProfileUsed}
//             onValueChange={(val) => handleChange('brandOfProfileUsed', val)}
//             items={[
//               { label: 'Fenesta', value: 'fenesta' },
//               { label: 'Aparna Venster', value: 'aparna' },
//               { label: 'LG Hausys', value: 'lg' },
//             ]}
//             style={{
//               inputIOS: styles.pickerInput,
//               inputAndroid: styles.pickerInput,
//               iconContainer: styles.pickerIcon,
//             }}
//             Icon={() => <Icon name="arrow-drop-down" size={24} color="#000" />}
//           />

//           <TouchableOpacity 
//             style={[styles.submit, loading && styles.submitDisabled]} 
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             <AppText weight='Inter' style={styles.submitText}>
//               {loading ? 'PROCESSING...' : 'COMPLETE REGISTRATION'}
//             </AppText>
//             {!loading && <Icon name="arrow-forward" size={24} color="#fff" />}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// // Subcomponents
// const Input = ({ label, value, onChange, ...props }) => (
//   <View style={styles.inputGroup}>
//     <AppText weight='Inter' style={styles.label}>{label}</AppText>
//     <TextInput 
//       style={styles.input} 
//       value={value} 
//       onChangeText={onChange}
//       {...props} 
//     />
//   </View>
// );

// const UploadField = ({ label, file, onUpload, iconName }) => (
//   <View style={styles.uploadGroup}>
//     <AppText weight='Inter' style={styles.label}>{label}</AppText>
//     <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
//       <Icon name={iconName} size={20} color="#000" />
//       <AppText style={styles.uploadText}>
//         {file ? file.name || file.uri.split('/').pop() : 'Upload'}
//       </AppText>
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   scroll: { paddingBottom: 40 },
//   logoWrap: { alignItems: 'center', paddingTop: 35 },
//   logo: { width: 140, height: 80 },
//   form: { paddingHorizontal: 25 },
//   header: { fontSize: 14, color: '#000', marginTop: 20, marginBottom: 12 },
//   row: { flexDirection: 'row', justifyContent: 'space-between' },
//   inputGroup: { marginBottom: 16 },
//   label: { fontSize: 12, color: '#333', marginBottom: 6 },
//   input: { 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     borderRadius: 8, 
//     padding: 14, 
//     fontSize: 14, 
//     color: '#000', 
//     backgroundColor: '#f9f9f9' 
//   },
//   uploadGroup: { marginBottom: 16 },
//   uploadBtn: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     padding: 12, 
//     borderWidth: 1, 
//     borderColor: '#000', 
//     borderRadius: 8 
//   },
//   uploadText: { marginLeft: 8, fontSize: 14, color: '#000' },
//   pickerInput: { 
//     fontSize: 14, 
//     padding: 14, 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     borderRadius: 8, 
//     color: '#000', 
//     backgroundColor: '#f9f9f9' 
//   },
//   pickerIcon: { top: 20, right: 12 },
//   submit: { 
//     backgroundColor: '#000', 
//     padding: 18, 
//     borderRadius: 8, 
//     flexDirection: 'row', 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     marginTop: 30,
//     marginBottom: 20
//   },
//   submitDisabled: {
//     opacity: 0.7
//   },
//   submitText: { 
//     color: '#fff', 
//     fontSize: 14,  
//     marginRight: 10, 
//     letterSpacing: 2 
//   },
// });

// export default WelcomeProfileSetup;





// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import RNPickerSelect from 'react-native-picker-select';
// import { pick, types, isCancel } from '@react-native-documents/picker';
// import AppText from '../../components/AppText';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WelcomeProfileSetup = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     companyName: '',
//     address: '',
//     city: '',
//     yearsInBusiness: '',
//     pinCode: '',
//     email: '',
//     website: '',
//     gstNumber: '',
//     contactPerson: '',
//     phoneNumber: '',
//     brandOfProfileUsed: '',
//     gstCertificate: null,
//     visitingCard: null,
//     businessProfileVideo: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const pickDocument = async (field, fileType) => {
//     try {
//       const [res] = await pick({
//         types: fileType === 'image' ? [types.images] :
//           fileType === 'video' ? [types.video] : [types.pdf, types.images],
//         allowMultiSelection: false
//       });
//       handleChange(field, res);
//     } catch (err) {
//       if (!isCancel(err)) console.log('Document picker error:', err);
//     }
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'companyName', 'address', 'city', 'yearsInBusiness', 'pinCode',
//       'email', 'gstNumber', 'contactPerson', 'phoneNumber', 'brandOfProfileUsed'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         return `Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
//       }
//     }

//     if (formData.phoneNumber.length !== 10) {
//       return 'Please enter a valid 10-digit phone number';
//     }

//     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
//       return 'Invalid email address';
//     }

//     if (!/^[0-9]{6}$/.test(formData.pinCode)) {
//       return 'Invalid 6-digit PIN code';
//     }

//     return null;
//   };

//   const handleSubmit = async () => {
//     const validationError = validateForm();
//     if (validationError) {
//       Alert.alert('Validation Error', validationError);
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataToSend = new FormData();
//       console.log("formData : ", formData)
//       // Add all text fields
//       Object.keys(formData).forEach(key => {
//         if (key !== 'gstCertificate' && key !== 'visitingCard' && key !== 'businessProfileVideo') {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Helper function to append files
//       const appendFile = (fieldName, file) => {
//         if (file) {
//           const fileType = file.mimeType ||
//             (fieldName.includes('video') ? 'video/mp4' :
//               fieldName.includes('image') ? 'image/jpeg' : 'application/pdf');
//           const fileName = file.name ||
//             (fieldName.includes('video') ? 'businessProfileVideo.mp4' :
//               fieldName.includes('image') ? 'visitingCard.jpg' : 'gstCertificate.pdf');

//           formDataToSend.append(fieldName, {
//             uri: file.uri,
//             type: fileType,
//             name: fileName
//           });
//         }
//       };

//       // Add files
//       appendFile('gstCertificate', formData.gstCertificate);
//       appendFile('visitingCard', formData.visitingCard);
//       appendFile('businessProfileVideo', formData.businessProfileVideo);

//       console.log('Submitting form data:', formDataToSend);

//       const response = await axios.post('http://10.7.10.49:9000/api/sellers/register', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         transformRequest: (data) => data, // Prevent axios from transforming the FormData
//       });

//       console.log('Response:', response.data);

//       if (response.data.success) {
//         await AsyncStorage.clear();
//         await AsyncStorage.setItem('sellerToken', response.data.token);
//         console.log("response.data.token welcome : ", response.data.token)
//         navigation.replace('SellerMain', {
//           screen: 'LeadDetails',
//           params: { sellerData: response.data.seller }
//         });
//       } else {
//         Alert.alert('Registration Failed', response.data.message || 'Unknown error occurred');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       let errorMessage = 'Failed to register. Please try again.';
//       if (error.response) {
//         console.log('Error response data:', error.response.data);
//         errorMessage = error.response.data.message || errorMessage;
//       }
//       Alert.alert('Registration Failed', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.logoWrap}>
//           <Image
//             source={require('../../assets/logo.png')}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.form}>
//           {/* Business Info */}
//           <AppText weight='Inter' style={styles.header}></AppText>
//           <Input
//             label="Company Name*"
//             value={formData.companyName}
//             onChange={(val) => handleChange('companyName', val)}
//           />

//           <Input
//             label="Address*"
//             value={formData.address}
//             onChange={(val) => handleChange('address', val)}
//           />

//           <Input
//             label="City*"
//             value={formData.city}
//             onChange={(val) => handleChange('city', val)}
//           // style={{ flex: 1 }}
//           />
//           <Input
//             label="PIN Code*"
//             value={formData.pinCode}
//             onChange={(val) => handleChange('pinCode', val)}
//             placeholder="6-digit"
//             keyboardType="number-pad"
//             maxLength={6}
//           // style={{ flex: 1, marginLeft: 10 }}
//           />
//           {/* <View style={styles.row}>
//           </View> */}

//           <Input
//             label="Years in Business*"
//             value={formData.yearsInBusiness}
//             onChange={(val) => handleChange('yearsInBusiness', val)}
//             keyboardType="numeric"
//           />

//           {/* Contact Info */}
//           <AppText weight='Inter' style={styles.header}>CONTACT INFORMATION</AppText>
//           <Input
//             label="Email*"
//             value={formData.email}
//             onChange={(val) => handleChange('email', val)}
//             keyboardType="email-address"
//           />

//           <Input
//             label="Website"
//             value={formData.website}
//             onChange={(val) => handleChange('website', val)}
//             keyboardType="url"
//           />

//           {/* <Input
//             label="GST Number*"
//             value={formData.gstNumber}
//             onChange={(val) => handleChange('gstNumber', val)}
//           /> */}

//           <Input
//             label="GST Number*"
//             value={formData.gstNumber}
//             onChangeText={(val) => {
//               // Allow only alphanumeric characters (letters and numbers)
//               const cleanedValue = val.replace(/[^a-zA-Z0-9]/g, '');
//               if (cleanedValue.length <= 15) {
//                 handleChange('gstNumber', cleanedValue);
//               }
//             }}
//             keyboardType="default" // Default keyboard to allow letters & numbers
//             maxLength={15}
//           />


//           <Input
//             label="Contact Person*"
//             value={formData.contactPerson}
//             onChange={(val) => handleChange('contactPerson', val)}
//           />

//           <Input
//             label="Contact Number*"
//             value={formData.phoneNumber}
//             onChange={(val) => handleChange('phoneNumber', val)}
//             keyboardType="phone-pad"
//             maxLength={10}
//           />

//           {/* Document Uploads */}
//           <UploadField
//             label="GST Certificate*"
//             file={formData.gstCertificate}
//             onUpload={() => pickDocument('gstCertificate', 'pdf')}
//             iconName="upload-file"
//           />

//           <UploadField
//             label="Visiting Card"
//             file={formData.visitingCard}
//             onUpload={() => pickDocument('visitingCard', 'image')}
//             iconName="image"
//           />

//           {/* Video Upload */}
//           <AppText weight='Inter' style={styles.header}>BUSINESS PROFILE VIDEO</AppText>
//           <UploadField
//             label="Business Profile Video"
//             file={formData.businessProfileVideo}
//             onUpload={() => pickDocument('businessProfileVideo', 'video')}
//             iconName="videocam"
//           />
//           {!formData.businessProfileVideo && (
//             <AppText style={styles.videoHint}>
//               Upload a 60-second video to get lead priority!
//             </AppText>
//           )}

//           {/* Brand Picker */}
//           <AppText weight='Inter' style={styles.label}>Brand of Profile Used*</AppText>
//           <RNPickerSelect
//             placeholder={{ label: 'Select a brand...', value: null }}
//             value={formData.brandOfProfileUsed}
//             onValueChange={(val) => handleChange('brandOfProfileUsed', val)}
//             items={[
//               { label: 'Fenesta', value: 'fenesta' },
//               { label: 'Aparna Venster', value: 'aparna' },
//               { label: 'LG Hausys', value: 'lg' },
//             ]}
//             style={{
//               inputIOS: styles.pickerInput,
//               inputAndroid: styles.pickerInput,
//               iconContainer: styles.pickerIcon,
//             }}
//             Icon={() => <Icon name="arrow-drop-down" size={24} color="#000" />}
//           />

//           <TouchableOpacity
//             style={[styles.submit, loading && styles.submitDisabled]}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             <AppText weight='Inter' style={styles.submitText}>
//               {loading ? 'PROCESSING...' : 'COMPLETE REGISTRATION'}
//             </AppText>
//             {!loading && <Icon name="arrow-forward" size={24} color="#fff" />}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// // Subcomponents
// const Input = ({ label, value, onChange, ...props }) => (
//   <View style={styles.inputGroup}>
//     <AppText weight='Inter' style={styles.label}>{label}</AppText>
//     <TextInput
//       style={styles.input}
//       value={value}
//       onChangeText={onChange}
//       {...props}
//     />
//   </View>
// );

// const UploadField = ({ label, file, onUpload, iconName }) => (
//   <View style={styles.uploadGroup}>
//     <AppText weight='Inter' style={styles.label}>{label}</AppText>
//     <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
//       <Icon name={iconName} size={20} color="#000" />
//       <AppText style={styles.uploadText}>
//         {file ? file.name || file.uri.split('/').pop() : 'Upload'}
//       </AppText>
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   scroll: { paddingBottom: 40 },
//   logoWrap: { alignItems: 'center', paddingTop: 35 },
//   logo: { width: 140, height: 80 },
//   form: { paddingHorizontal: 25 },
//   header: { fontSize: 14, color: '#000', marginTop: 20, marginBottom: 12 },
//   row: { flexDirection: 'row', justifyContent: 'space-between' },
//   inputGroup: { marginBottom: 16 },
//   label: { fontSize: 12, color: '#333', marginBottom: 6 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 14,
//     fontSize: 14,
//     color: '#000',
//     backgroundColor: '#f9f9f9'
//   },
//   uploadGroup: { marginBottom: 16 },
//   uploadBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 8
//   },
//   uploadText: { marginLeft: 8, fontSize: 14, color: '#000' },
//   pickerInput: {
//     fontSize: 14,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     color: '#000',
//     backgroundColor: '#f9f9f9'
//   },
//   pickerIcon: { top: 20, right: 12 },
//   videoHint: {
//     color: '#666',
//     fontSize: 12,
//     marginTop: 4,
//     textAlign: 'center',
//     fontStyle: 'italic'
//   },
//   submit: {
//     backgroundColor: '#000',
//     padding: 18,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 20
//   },
//   submitDisabled: {
//     opacity: 0.7
//   },
//   submitText: {
//     color: '#fff',
//     fontSize: 14,
//     marginRight: 10,
//     letterSpacing: 2
//   },
// });

// export default WelcomeProfileSetup;


import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { pick, types, isCancel } from '@react-native-documents/picker';
import AppText from '../../components/AppText';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// List of top 25 Indian cities by population
const INDIAN_CITIES = [
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Ahmedabad', value: 'Ahmedabad' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Kolkata', value: 'Kolkata' },
  { label: 'Surat', value: 'Surat' },
  { label: 'Pune', value: 'Pune' },
  { label: 'Jaipur', value: 'Jaipur' },
  { label: 'Lucknow', value: 'Lucknow' },
  { label: 'Kanpur', value: 'Kanpur' },
  { label: 'Nagpur', value: 'Nagpur' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Thane', value: 'Thane' },
  { label: 'Bhopal', value: 'Bhopal' },
  { label: 'Visakhapatnam', value: 'Visakhapatnam' },
  { label: 'Pimpri-Chinchwad', value: 'Pimpri-Chinchwad' },
  { label: 'Patna', value: 'Patna' },
  { label: 'Vadodara', value: 'Vadodara' },
  { label: 'Ghaziabad', value: 'Ghaziabad' },
  { label: 'Ludhiana', value: 'Ludhiana' },
  { label: 'Agra', value: 'Agra' },
  { label: 'Nashik', value: 'Nashik' },
  { label: 'Faridabad', value: 'Faridabad' },
];

const WelcomeProfileSetup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    city: '',
    yearsInBusiness: '',
    pinCode: '',
    email: '',
    website: '',
    gstNumber: '',
    contactPerson: '',
    phoneNumber: '',
    brandOfProfileUsed: '',
    gstCertificate: null,
    visitingCard: null,
    businessProfileVideo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const pickDocument = async (field, fileType, isMandatory = false) => {
    try {
      const [res] = await pick({
        types: fileType === 'image' ? [types.images] :
          fileType === 'video' ? [types.video] : [types.pdf, types.images],
        allowMultiSelection: false
      });
      handleChange(field, res);
    } catch (err) {
      if (!isCancel(err)) console.log('Document picker error:', err);
      if (isMandatory && isCancel(err)) {
        Alert.alert('Required', 'GST Certificate upload is mandatory');
      }
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'companyName', 'address', 'city', 'yearsInBusiness', 'pinCode',
      'email', 'gstNumber', 'contactPerson', 'phoneNumber', 'brandOfProfileUsed'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    }

    // Check for GST certificate
    if (!formData.gstCertificate) {
      return 'GST Certificate upload is mandatory';
    }

    if (formData.phoneNumber.length !== 10) {
      return 'Please enter a valid 10-digit phone number';
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      return 'Invalid email address';
    }

    if (!/^[0-9]{6}$/.test(formData.pinCode)) {
      return 'Invalid 6-digit PIN code';
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('Validation Error', validationError);
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      console.log("formData : ", formData)
      // Add all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'gstCertificate' && key !== 'visitingCard' && key !== 'businessProfileVideo') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Helper function to append files
      const appendFile = (fieldName, file) => {
        if (file) {
          const fileType = file.mimeType ||
            (fieldName.includes('video') ? 'video/mp4' :
              fieldName.includes('image') ? 'image/jpeg' : 'application/pdf');
          const fileName = file.name ||
            (fieldName.includes('video') ? 'businessProfileVideo.mp4' :
              fieldName.includes('image') ? 'visitingCard.jpg' : 'gstCertificate.pdf');

          formDataToSend.append(fieldName, {
            uri: file.uri,
            type: fileType,
            name: fileName
          });
        }
      };

      // Add files
      appendFile('gstCertificate', formData.gstCertificate);
      appendFile('visitingCard', formData.visitingCard);
      appendFile('businessProfileVideo', formData.businessProfileVideo);

      console.log('Submitting form data:', formDataToSend);

      const response = await axios.post('http://10.7.10.49:9000/api/sellers/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => data, // Prevent axios from transforming the FormData
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('sellerToken', response.data.token);
        console.log("response.data.token welcome : ", response.data.token)
        navigation.replace('SellerMain', {
          screen: 'LeadDetails',
          params: { sellerData: response.data.seller }
        });
      } else {
        Alert.alert('Registration Failed', response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Failed to register. Please try again.';
      if (error.response) {
        console.log('Error response data:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      }
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoWrap}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          {/* Business Info */}
          <AppText weight='Inter' style={styles.header}></AppText>
          <Input
            label="Company Name*"
            value={formData.companyName}
            onChange={(val) => handleChange('companyName', val)}
          />

          <Input
            label="Address*"
            value={formData.address}
            onChange={(val) => handleChange('address', val)}
            multiline={true}
            numberOfLines={4}
            style={styles.addressInput}
          />

          <AppText weight='Inter' style={styles.label}>City*</AppText>
          <RNPickerSelect
            placeholder={{ label: 'Select your city...', value: null }}
            value={formData.city}
            onValueChange={(val) => handleChange('city', val)}
            items={INDIAN_CITIES}
            style={{
              inputIOS: styles.pickerInput,
              inputAndroid: styles.pickerInput,
              iconContainer: styles.pickerIcon,
            }}
            Icon={() => <Icon name="arrow-drop-down" size={24} color="#000" />}
          />

          <Input
            label="PIN Code*"
            value={formData.pinCode}
            onChange={(val) => handleChange('pinCode', val)}
            placeholder="6-digit"
            keyboardType="number-pad"
            maxLength={6}
          />

          <Input
            label="Years in Business*"
            value={formData.yearsInBusiness}
            onChange={(val) => handleChange('yearsInBusiness', val)}
            keyboardType="numeric"
          />

          {/* Contact Info */}
          <AppText weight='Inter' style={styles.header}>CONTACT INFORMATION</AppText>
          <Input
            label="Email*"
            value={formData.email}
            onChange={(val) => handleChange('email', val)}
            keyboardType="email-address"
          />

          <Input
            label="Website"
            value={formData.website}
            onChange={(val) => handleChange('website', val)}
            keyboardType="url"
          />

          <Input
            label="GST Number*"
            value={formData.gstNumber}
            onChangeText={(val) => {
              const cleanedValue = val.replace(/[^a-zA-Z0-9]/g, '');
              if (cleanedValue.length <= 15) {
                handleChange('gstNumber', cleanedValue);
              }
            }}
            keyboardType="default"
            maxLength={15}
          />

          <Input
            label="Contact Person*"
            value={formData.contactPerson}
            onChange={(val) => handleChange('contactPerson', val)}
          />

          <Input
            label="Contact Number*"
            value={formData.phoneNumber}
            onChange={(val) => handleChange('phoneNumber', val)}
            keyboardType="phone-pad"
            maxLength={10}
          />

          {/* Document Uploads */}
          <UploadField
            label="GST Certificate*"
            file={formData.gstCertificate}
            onUpload={() => pickDocument('gstCertificate', 'pdf', true)}
            iconName="upload-file"
          />

          <UploadField
            label="Visiting Card"
            file={formData.visitingCard}
            onUpload={() => pickDocument('visitingCard', 'image')}
            iconName="image"
          />

          {/* Video Upload */}
          <AppText weight='Inter' style={styles.header}>BUSINESS PROFILE VIDEO</AppText>
          <UploadField
            label="Business Profile Video"
            file={formData.businessProfileVideo}
            onUpload={() => pickDocument('businessProfileVideo', 'video')}
            iconName="videocam"
          />
          {!formData.businessProfileVideo && (
            <AppText style={styles.videoHint}>
              Upload a 60-second video to get lead priority!
            </AppText>
          )}

          {/* Brand Picker */}
          <AppText weight='Inter' style={styles.label}>Brand of Profile Used*</AppText>
          <RNPickerSelect
            placeholder={{ label: 'Select a brand...', value: null }}
            value={formData.brandOfProfileUsed}
            onValueChange={(val) => handleChange('brandOfProfileUsed', val)}
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

          <TouchableOpacity
            style={[styles.submit, loading && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <AppText weight='Inter' style={styles.submitText}>
              {loading ? 'PROCESSING...' : 'COMPLETE REGISTRATION'}
            </AppText>
            {!loading && <Icon name="arrow-forward" size={24} color="#fff" />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Subcomponents
const Input = ({ label, value, onChange, style, ...props }) => (
  <View style={styles.inputGroup}>
    <AppText weight='Inter' style={styles.label}>{label}</AppText>
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChange}
      {...props}
    />
  </View>
);

const UploadField = ({ label, file, onUpload, iconName }) => (
  <View style={styles.uploadGroup}>
    <AppText weight='Inter' style={styles.label}>{label}</AppText>
    <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
      <Icon name={iconName} size={20} color="#000" />
      <AppText style={styles.uploadText}>
        {file ? file.name || file.uri.split('/').pop() : 'Upload'}
      </AppText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 40 },
  logoWrap: { alignItems: 'center', paddingTop: 35 },
  logo: { width: 140, height: 80 },
  form: { paddingHorizontal: 25 },
  header: { fontSize: 14, color: '#000', marginTop: 20, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 12, color: '#333', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f9f9f9'
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#f9f9f9',
    height: 100,
    textAlignVertical: 'top' // For Android to align text at the top
  },
  uploadGroup: { marginBottom: 16 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8
  },
  uploadText: { marginLeft: 8, fontSize: 14, color: '#000' },
  pickerInput: {
    fontSize: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#000',
    backgroundColor: '#f9f9f9',
    marginBottom: 16
  },
  pickerIcon: { top: 20, right: 12 },
  videoHint: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  submit: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  submitDisabled: {
    opacity: 0.7
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
    letterSpacing: 2
  },
});

export default WelcomeProfileSetup;