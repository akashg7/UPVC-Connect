import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { sellerStyles } from '../../styles/sellerStyles';
import ProductSelectionChip from '../../components/Seller/ProductSelectionChip';
import VideoUploadWidget from '../../components/Seller/VideoUploadWidget';

const WelcomeProfileSetup = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [pinCodes, setPinCodes] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [videoUri, setVideoUri] = useState(null);

  const pinCodesRef = useRef();
  const deliveryTimeRef = useRef();
  const phoneRef = useRef();

  const productOptions = [
    'Profiles',
    'Hardware',
    'Glass',
    'Sealants',
    'Reinforcements',
  ];

  const handleProductToggle = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const handleSubmit = () => {
    if (
      !businessName ||
      !pinCodes ||
      selectedProducts.length === 0 ||
      !deliveryTime ||
      !phone
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    const sellerData = {
      businessName,
      pinCodesServed: pinCodes.split(',').map((code) => code.trim()),
      products: selectedProducts,
      deliveryTime,
      phone,
      videoUrl: videoUri,
    };

    navigation.navigate('SellerOTPVerification', { sellerData, phone });
  };

  return (
    <ScrollView
      style={sellerStyles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 16 }}>
        <Text style={{ color: '#3498DB', fontSize: 16 }}>← Back</Text>
      </TouchableOpacity>
      <Text style={sellerStyles.headline}>
        Welcome to UPVC Connect – More Sales Await!
      </Text>
      <Text style={sellerStyles.subhead}>
        Set up your profile to start getting verified buyer leads—5 free to kick
        things off!
      </Text>

      <Text style={sellerStyles.label}>Business Name</Text>
      <TextInput
        style={sellerStyles.input}
        placeholder="Enter your business name"
        value={businessName}
        onChangeText={setBusinessName}
        onSubmitEditing={() => pinCodesRef.current.focus()}
        returnKeyType="next"
      />

      <Text style={sellerStyles.label}>Pin Codes Served</Text>
      <TextInput
        ref={pinCodesRef}
        style={sellerStyles.input}
        placeholder="110001, 110002, 110003"
        value={pinCodes}
        onChangeText={setPinCodes}
        onSubmitEditing={() => deliveryTimeRef.current.focus()}
        returnKeyType="next"
      />

      <Text style={sellerStyles.label}>Products</Text>
      <View style={sellerStyles.chipContainer}>
        {productOptions.map((product) => (
          <ProductSelectionChip
            key={product}
            label={product}
            selected={selectedProducts.includes(product)}
            onPress={() => handleProductToggle(product)}
          />
        ))}
      </View>

      <Text style={sellerStyles.label}>Delivery Time</Text>
      <TextInput
        ref={deliveryTimeRef}
        style={sellerStyles.input}
        placeholder="e.g., 3-5 days, 1 week"
        value={deliveryTime}
        onChangeText={setDeliveryTime}
        onSubmitEditing={() => phoneRef.current.focus()}
        returnKeyType="next"
      />

      <Text style={sellerStyles.label}>Phone Number</Text>
      <TextInput
        ref={phoneRef}
        style={sellerStyles.input}
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={10}
        returnKeyType="done"
      />

      <VideoUploadWidget
        onVideoSelected={setVideoUri}
        hasVideo={!!videoUri}
      />
      {!videoUri && (
        <Text style={{ color: '#F39C12', fontStyle: 'italic', marginBottom: 32 }}>
          Upload a 60-second video to get lead priority!
        </Text>
      )}

      <TouchableOpacity style={sellerStyles.button} onPress={handleSubmit}>
        <Text style={sellerStyles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WelcomeProfileSetup;