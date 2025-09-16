// import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View , ActivityIndicator} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import AppText from "../../../components/AppText";
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useEffect, useState } from "react";

// const EditQuoteModal = ({ 
//   visible, 
//   onClose, 
//   quote, 
//   onUpdate, 
//   isLoading 
// }) => {
//   const [editedQuote, setEditedQuote] = useState(quote);
//   const [dimensions, setDimensions] = useState({
//     height: quote?.height,
//     width: quote?.width,
//   });

//   // useEffect(() => {
//   //   if (quote) {
//   //     setEditedQuote(quote);
//   //     setDimensions({
//   //       height: quote?.height,
//   //       width: quote?.width,
//   //     });
//   //   }
//   // }, [quote]);

//   useEffect(() => {
//     if (!visible) { 
//       if (quote) {
//         setEditedQuote(quote);
//         setDimensions({
//           height: quote.height,
//           width: quote.width,
//         });
//       }
//     }
//   }, [visible, quote]);

//   const handleChange = (field, value) => {
//     setEditedQuote(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleDimensionChange = (field, value) => {
//     const numValue = parseFloat(value) || 0;
//     setDimensions(prev => ({
//       ...prev,
//       [field]: numValue
//     }));
    
//     // Calculate sqft when dimensions change
//     if (field === 'height' || field === 'width') {
//       const newSqft = (field === 'height' ? 
//         numValue * dimensions.width : 
//         dimensions.height * numValue).toFixed(2);
//         console.log("newSqft : " , newSqft)
//       setEditedQuote(prev => ({
//         ...prev,
//         sqft: parseFloat(newSqft)
//       }));
//     }
//   };

//   const handleSubmit = () => {
//     const updatedQuote = {
//       ...editedQuote,
//       height: dimensions?.height,
//       width: dimensions?.width,
//       sqft: dimensions?.height * dimensions?.width * editedQuote?.quantity
//     };
//     console.log("updatedQuote : " , updatedQuote)
//     onUpdate(updatedQuote);
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContainer}>
//           <LinearGradient
//             colors={['#ffffff', '#f9f9f9']}
//             style={styles.modalGradient}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//           >
//             <View style={styles.modalHeader}>
//               <AppText weight="Bold" style={styles.modalTitle}>
//                 EDIT QUOTE DETAILS
//               </AppText>
//               <TouchableOpacity onPress={onClose}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.modalContent}>
//               <View style={styles.modalField}>
//                 <AppText weight="Inter" style={styles.modalLabel}>
//                   PRODUCT
//                 </AppText>
//                 <AppText weight="SemiBold" style={styles.modalValue}>
//                   {quote?.product?.title}
//                 </AppText>
//               </View>

//               <View style={styles.modalField}>
//                 <AppText weight="Inter" style={styles.modalLabel}>
//                   COLOR
//                 </AppText>
//                 <TextInput
//                   style={styles.modalInput}
//                   value={editedQuote?.color}
//                   onChangeText={text => handleChange('color', text)}
//                   placeholder="Enter color"
//                   placeholderTextColor="#999"
//                 />
//               </View>

//               <View style={styles.dimensionsRow}>
//                 <View style={styles.dimensionInput}>
//                   <AppText weight="Inter" style={styles.modalLabel}>
//                     HEIGHT (ft)
//                   </AppText>
//                   <TextInput
//                     style={styles.modalInput}
//                     keyboardType="numeric"
//                     value={dimensions?.height?.toString()}
//                     onChangeText={text => handleDimensionChange('height', text)}
//                     placeholder="Height"
//                     placeholderTextColor="#999"
//                   />
//                 </View>

//                 <View style={styles.dimensionInput}>
//                   <AppText weight="Inter" style={styles.modalLabel}>
//                     WIDTH (ft)
//                   </AppText>
//                   <TextInput
//                     style={styles.modalInput}
//                     keyboardType="numeric"
//                     value={dimensions?.width?.toString()}
//                     onChangeText={text => handleDimensionChange('width', text)}
//                     placeholder="Width"
//                     placeholderTextColor="#999"
//                   />
//                 </View>
//               </View>

//               <View style={styles.modalField}>
//                 <AppText weight="Inter" style={styles.modalLabel}>
//                   LOCATION
//                 </AppText>
//                 <TextInput
//                   style={styles.modalInput}
//                   value={editedQuote?.installationLocation}
//                   onChangeText={text => handleChange('installationLocation', text)}
//                   placeholder="Installation location"
//                   placeholderTextColor="#999"
//                 />
//               </View>

//               <View style={styles.modalField}>
//                 <AppText weight="Inter" style={styles.modalLabel}>
//                   QUANTITY
//                 </AppText>
//                 <TextInput
//                   style={styles.modalInput}
//                   keyboardType="numeric"
//                   value={editedQuote?.quantity?.toString()}
//                   onChangeText={text => handleChange('quantity', parseInt(text) || 0)}
//                   placeholder="Quantity"
//                   placeholderTextColor="#999"
//                 />
//               </View>

//               <View style={styles.modalField}>
//                 <AppText weight="Inter" style={styles.modalLabel}>
//                   TOTAL SQFT
//                 </AppText>
//                 <AppText weight="SemiBold" style={styles.modalValue}>
//                   {editedQuote?.sqft} sqft
//                 </AppText>
//               </View>

//               <View style={styles.modalField}>
//                 <AppText weight="Inter" style={styles.modalLabel}>
//                   REMARKS
//                 </AppText>
//                 <TextInput
//                   style={[styles.modalInput, { height: 80 }]}
//                   multiline
//                   value={editedQuote?.remark}
//                   onChangeText={text => handleChange('remark', text)}
//                   placeholder="Additional remarks"
//                   placeholderTextColor="#999"
//                 />
//               </View>
//             </ScrollView>

//             <View style={styles.modalFooter}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={onClose}
//                 disabled={isLoading}
//               >
//                 <AppText weight="SemiBold" style={styles.cancelButtonText}>
//                   CANCEL
//                 </AppText>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.updateButton}
//                 onPress={handleSubmit}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <AppText weight="SemiBold" style={styles.updateButtonText}>
//                     UPDATE
//                   </AppText>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         </View>
//       </View>
//     </Modal>
//   );
// };


// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     maxHeight: '80%',
//     borderRadius: 12,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 6,
//       },
//       android: {
//         elevation: 10,
//       },
//     }),
//   },
//   modalGradient: {
//     padding: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 15,
//   },
//   modalTitle: {
//     fontSize: 18,
//     color: '#000',
//     letterSpacing: 1,
//   },
//   modalContent: {
//     maxHeight: '70%',
//   },
//   modalField: {
//     marginBottom: 15,
//   },
//   modalLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 5,
//     letterSpacing: 0.5,
//   },
//   modalInput: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 14,
//     color: '#000',
//   },
//   modalValue: {
//     backgroundColor: '#f5f5f5',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   dimensionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dimensionInput: {
//     width: '48%',
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   cancelButton: {
//     flex: 1,
//     marginRight: 10,
//     padding: 15,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: '#000',
//   },
//   updateButton: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#000',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: '#fff',
//   },
// })

// export default EditQuoteModal;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import DropDownPicker from 'react-native-dropdown-picker';

const EditQuoteModal = ({
  visible,
  onClose,
  quote,
  onUpdate,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    color: '',
    height: '',
    width: '',
    quantity: '',
    installationLocation: '',
    remark: '',
  });

  const [colorOpen, setColorOpen] = useState(false);
  const [colorItems, setColorItems] = useState([
    {label: 'White', value: 'white'},
    {label: 'Black', value: 'black'},
    {label: 'Wooden Brown', value: 'brown'},
    {label: 'Silver Grey', value: 'grey'},
    {label: 'Golden Oak', value: 'golden'},
  ]);

  // Dropdown states for location
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationItems, setLocationItems] = useState([
    {label: 'Balcony', value: 'balcony'},
    {label: 'Living Room', value: 'living_room'},
    {label: 'Bedroom', value: 'bedroom'},
    {label: 'Kitchen', value: 'kitchen'},
    {label: 'Bathroom', value: 'bathroom'},
  ]);

  // Reset form when quote changes
  useEffect(() => {
    if (quote) {
      setFormData({
        color: quote.color || '',
        height: quote.height?.toString() || '',
        width: quote.width?.toString() || '',
        quantity: quote.quantity?.toString() || '',
        installationLocation: quote.installationLocation || '',
        remark: quote.remark || '',
      });
    }
  }, [quote]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleColorChange = (value) => {
    setFormData(prev => ({
      ...prev,
      color: value,
    }));
  };

  const handleLocationChange = (value) => {
    setFormData(prev => ({
      ...prev,
      installationLocation: value,
    }));
  };

  const handleSubmit = () => {
    const updatedQuote = {
      ...quote,
      ...formData,
      height: parseFloat(formData.height),
      width: parseFloat(formData.width),
      quantity: parseInt(formData.quantity, 10),
      sqft: (parseFloat(formData.height) * parseFloat(formData.width)) * parseInt(formData.quantity, 10),
    };
    onUpdate(updatedQuote);
  };

  if (!quote) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>

          <AppText weight="Inter" style={styles.modalTitle}>
            Edit Quote
          </AppText>
 
          <View style={styles.inputContainer1}>
            <AppText weight="Inter" style={styles.inputLabel}>
              COLOR
            </AppText>
            <DropDownPicker
              open={colorOpen}
              value={formData.color}
              items={colorItems}
              setOpen={setColorOpen}
              setValue={(callback) => {
                const value = callback(formData.color);
                handleColorChange(value);
              }}
              setItems={setColorItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select a color"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <AppText weight="Inter" style={styles.label}>
                Height (ft)
              </AppText>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formData.height}
                onChangeText={text => handleInputChange('height', text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <AppText weight="Inter" style={styles.label}>
                Width (ft)
              </AppText>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formData.width}
                onChangeText={text => handleInputChange('width', text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <AppText weight="Inter" style={styles.label}>
              Quantity
            </AppText>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.quantity}
              onChangeText={text => handleInputChange('quantity', text)}
            />
          </View> 
         
          <View style={styles.inputContainer2}>
            <AppText weight="Inter" style={styles.inputLabel}>
              WHERE
            </AppText>
            <DropDownPicker
              open={locationOpen} 
              value={formData.installationLocation}
              items={locationItems}
              setOpen={setLocationOpen}
              setValue={(callback) => {
                const value = callback(formData.installationLocation);
                handleLocationChange(value);
              }}
              setItems={setLocationItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select location"
              zIndex={2000}
              zIndexInverse={2000}
            />
          </View>

          <View style={styles.inputContainer}>
            <AppText weight="Inter" style={styles.label}>
              Remarks
            </AppText>
            <TextInput
              style={[styles.input, styles.remarksInput]}
              multiline
              value={formData.remark}
              onChangeText={text => handleInputChange('remark', text)}
            />
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AppText weight="Inter" style={styles.updateButtonText}>
                UPDATE
              </AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer1: {
    marginBottom: 15,
    zIndex: 3000,
  },
  inputContainer2: {
    marginBottom: 15,
    zIndex: 2000,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputGroup: {
    width: '48%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  remarksInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dropdownContainer: {
    borderColor: '#ddd',
  },
  updateButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditQuoteModal;

// export default EditQuoteModal;