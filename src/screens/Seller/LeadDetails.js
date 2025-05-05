import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const LeadDetails = ({ navigation }) => {
  const leads = [
    {
      id: '1',
      product: '10 sq ft UPVC windows',
      price: '₹15,000',
      specs: 'Tinted glass, sliding mechanism',
      slotsLeft: '4/6',
      matchScore: 'Pin code + profiles align!',
      freeLeadsLeft: 3,
    },
    {
      id: '2',
      product: '12 sq ft UPVC doors',
      price: '₹18,000',
      specs: 'Frosted glass, foldable',
      slotsLeft: '2/6',
      matchScore: 'Exact product match!',
      freeLeadsLeft: 2,
    },
  ];

  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.98)', 'rgba(245,249,255,0.95)']}
      style={styles.gradientOverlay}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={26} color="#2C3E50" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headline}>Your Next Customer!</Text>
          <Text style={styles.subheader}>High-intent buyer looking for your product</Text>
        </View>

        {leads.map((lead) => (
          <View key={lead.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="person" size={24} color="#2E86C1" />
              <Text style={styles.cardTitle}>Buyer Request</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="description" size={20} color="#7F8C8D" />
              <Text style={styles.detailText}>{lead.product}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="info" size={20} color="#7F8C8D" />
              <Text style={styles.detailText}>{lead.specs}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="money" size={20} color="#7F8C8D" />
              <Text style={styles.detailText}>{lead.price}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="group" size={20} color="#7F8C8D" />
              <Text style={styles.detailText}>{lead.slotsLeft} slots left</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="star" size={20} color="#F1C40F" />
              <Text style={styles.detailText}>{lead.matchScore}</Text>
            </View>

            <View style={styles.priceTag}>
              <Text style={styles.priceText}>₹200 to unlock contact</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('ContactBuyer', { lead })}
            >
              <Text style={styles.buttonText}>Buy This Lead</Text>
            </TouchableOpacity>

            {lead.freeLeadsLeft > 0 && (
              <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                <Text style={styles.buttonText}>Try Free ({lead.freeLeadsLeft} left)</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientOverlay: {
    flex: 1,
    paddingBottom: 40,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
    paddingBottom: 60,
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 50,
    elevation: 3,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEDED',
    paddingBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#566573',
    marginLeft: 12,
    flex: 1,
  },
  priceTag: {
    backgroundColor: '#EBF5FB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E86C1',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  primaryButton: {
    backgroundColor: '#2E86C1',
  },
  secondaryButton: {
    backgroundColor: '#28B463',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default LeadDetails;
