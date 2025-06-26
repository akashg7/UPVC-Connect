import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View , ActivityIndicator} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppText from "../../../components/AppText";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from "react";

const EditQuoteModal = ({ 
  visible, 
  onClose, 
  quote, 
  onUpdate, 
  isLoading 
}) => {
  const [editedQuote, setEditedQuote] = useState(quote);
  const [dimensions, setDimensions] = useState({
    height: quote?.height,
    width: quote?.width,
  });

  // useEffect(() => {
  //   if (quote) {
  //     setEditedQuote(quote);
  //     setDimensions({
  //       height: quote?.height,
  //       width: quote?.width,
  //     });
  //   }
  // }, [quote]);

  useEffect(() => {
    if (!visible) { 
      if (quote) {
        setEditedQuote(quote);
        setDimensions({
          height: quote.height,
          width: quote.width,
        });
      }
    }
  }, [visible, quote]);

  const handleChange = (field, value) => {
    setEditedQuote(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDimensionChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setDimensions(prev => ({
      ...prev,
      [field]: numValue
    }));
    
    // Calculate sqft when dimensions change
    if (field === 'height' || field === 'width') {
      const newSqft = (field === 'height' ? 
        numValue * dimensions.width : 
        dimensions.height * numValue).toFixed(2);
        console.log("newSqft : " , newSqft)
      setEditedQuote(prev => ({
        ...prev,
        sqft: parseFloat(newSqft)
      }));
    }
  };

  const handleSubmit = () => {
    const updatedQuote = {
      ...editedQuote,
      height: dimensions?.height,
      width: dimensions?.width,
      sqft: dimensions?.height * dimensions?.width * editedQuote?.quantity
    };
    console.log("updatedQuote : " , updatedQuote)
    onUpdate(updatedQuote);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#ffffff', '#f9f9f9']}
            style={styles.modalGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <View style={styles.modalHeader}>
              <AppText weight="Bold" style={styles.modalTitle}>
                EDIT QUOTE DETAILS
              </AppText>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.modalField}>
                <AppText weight="Inter" style={styles.modalLabel}>
                  PRODUCT
                </AppText>
                <AppText weight="SemiBold" style={styles.modalValue}>
                  {quote?.product?.title}
                </AppText>
              </View>

              <View style={styles.modalField}>
                <AppText weight="Inter" style={styles.modalLabel}>
                  COLOR
                </AppText>
                <TextInput
                  style={styles.modalInput}
                  value={editedQuote?.color}
                  onChangeText={text => handleChange('color', text)}
                  placeholder="Enter color"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.dimensionsRow}>
                <View style={styles.dimensionInput}>
                  <AppText weight="Inter" style={styles.modalLabel}>
                    HEIGHT (ft)
                  </AppText>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={dimensions?.height?.toString()}
                    onChangeText={text => handleDimensionChange('height', text)}
                    placeholder="Height"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.dimensionInput}>
                  <AppText weight="Inter" style={styles.modalLabel}>
                    WIDTH (ft)
                  </AppText>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={dimensions?.width?.toString()}
                    onChangeText={text => handleDimensionChange('width', text)}
                    placeholder="Width"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.modalField}>
                <AppText weight="Inter" style={styles.modalLabel}>
                  LOCATION
                </AppText>
                <TextInput
                  style={styles.modalInput}
                  value={editedQuote?.installationLocation}
                  onChangeText={text => handleChange('installationLocation', text)}
                  placeholder="Installation location"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.modalField}>
                <AppText weight="Inter" style={styles.modalLabel}>
                  QUANTITY
                </AppText>
                <TextInput
                  style={styles.modalInput}
                  keyboardType="numeric"
                  value={editedQuote?.quantity?.toString()}
                  onChangeText={text => handleChange('quantity', parseInt(text) || 0)}
                  placeholder="Quantity"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.modalField}>
                <AppText weight="Inter" style={styles.modalLabel}>
                  TOTAL SQFT
                </AppText>
                <AppText weight="SemiBold" style={styles.modalValue}>
                  {editedQuote?.sqft} sqft
                </AppText>
              </View>

              <View style={styles.modalField}>
                <AppText weight="Inter" style={styles.modalLabel}>
                  REMARKS
                </AppText>
                <TextInput
                  style={[styles.modalInput, { height: 80 }]}
                  multiline
                  value={editedQuote?.remark}
                  onChangeText={text => handleChange('remark', text)}
                  placeholder="Additional remarks"
                  placeholderTextColor="#999"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                disabled={isLoading}
              >
                <AppText weight="SemiBold" style={styles.cancelButtonText}>
                  CANCEL
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <AppText weight="SemiBold" style={styles.updateButtonText}>
                    UPDATE
                  </AppText>
                )}
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalGradient: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    color: '#000',
    letterSpacing: 1,
  },
  modalContent: {
    maxHeight: '70%',
  },
  modalField: {
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  modalInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#000',
  },
  modalValue: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#000',
  },
  dimensionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionInput: {
    width: '48%',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
  },
  updateButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
  },
})

export default EditQuoteModal;