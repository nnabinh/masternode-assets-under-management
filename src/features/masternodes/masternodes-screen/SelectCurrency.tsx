import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {CURRENCY_RATE_PER_USD} from '../../../constants';

const currencies = Object.keys(CURRENCY_RATE_PER_USD).map(currency => ({
  name: currency,
  value: CURRENCY_RATE_PER_USD[currency],
}));

interface Currency {
  name: string;
  value: number;
}

interface SelectCurrencyProps {
  onChange?: (currency: Currency) => void;
}

const SelectCurrency = ({onChange}: SelectCurrencyProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0],
  );
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleCurrencyChange = (value: number) => {
    const currency = currencies.find(_currency => _currency.value === value);
    if (currency) {
      onChange?.(currency);
      setSelectedCurrency(currency);
    }
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <Text style={styles.label}>
          Selected Currency: {selectedCurrency.name}
        </Text>
      </TouchableOpacity>
      {pickerVisible && (
        <Picker
          selectedValue={selectedCurrency.value}
          onValueChange={handleCurrencyChange}>
          {currencies.map(currency => (
            <Picker.Item
              key={currency.value}
              label={currency.name}
              value={currency.value}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default SelectCurrency;
