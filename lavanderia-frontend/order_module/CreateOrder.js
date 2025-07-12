import React, { useState, useEffect } from 'react';
import { View, Text,  ScrollView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const servicesData = [
  { id: 1, name: 'Lavado', price: 22 },
  { id: 2, name: 'Tintoreria', price: 0 },
  { id: 3, name: 'Planchado', price: 60 },
  { id: 4, name: 'Especial', price: 0 },
];

const garmentTypes = [
  'Camisa', 'Pantalon', 'Prenda Interior', 'Blusa', 'Vestido',
  'Chamarra', 'Traje', 'Sueter', 'Falda', 'Saco', 'Playera',
];

export default function CreateOrder() {
  const defaultService = { id: 1, name: 'Lavado', price: 22, quantity: '1' };
  const defaultGarment = {
    type: 'Camisa',
    description: '',
    observations: '',
    services: [{ ...defaultService }],
  };

  const [order, setOrder] = useState({ garments: [defaultGarment], total: 0 });

  useEffect(() => calculateTotal(), [order.garments]);

  const addGarment = () =>
    setOrder(p => ({ ...p, garments: [...p.garments, { ...defaultGarment }] }));

  const addService = gi => {
    const g = [...order.garments];
    g[gi].services.push({ ...defaultService });
    setOrder({ ...order, garments: g });
  };

  const handleGarment = (gi, field, value) => {
    const g = [...order.garments];
    g[gi][field] = value;
    setOrder({ ...order, garments: g });
  };

  const handleService = (gi, si, field, value) => {
    const g = [...order.garments];
    const srv = g[gi].services[si];

    if (field === 'id') {
      const found = servicesData.find(s => s.id === value);
      Object.assign(srv, found);
    } else if (field === 'quantity') {
      if (value === '' || /^[0-9]+$/.test(value)) srv.quantity = value;
    }
    g[gi].services[si] = srv;
    setOrder({ ...order, garments: g });
  };

  const calculateTotal = () => {
    const total = order.garments.reduce((sum, g) => {
      const gTotal = g.services.reduce((sSum, s) => {
        const q = parseInt(s.quantity);
        const qty = !isNaN(q) && q > 0 ? q : 1;
        return sSum + s.price * qty;
      }, 0);
      return sum + gTotal;
    }, 0);
    setOrder(p => ({ ...p, total }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.button} onPress={addGarment}>
            <Text style={styles.textButton}>Agregar Prenda</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Prendas ({order.garments.length})</Text>

          {order.garments.map((g, gi) => (
            <View key={gi} style={styles.item}>
              <Text style={styles.subtitle}>Prenda #{gi + 1}</Text>

              <Text style={styles.subtitle}>Tipo:</Text>
              <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 4, marginBottom: 10 }}>
                <Picker
                  selectedValue={g.type}
                  onValueChange={v => handleGarment(gi, 'type', v)}
                  style={{ backgroundColor: 'white' }}
                >
                  {garmentTypes.map((t, i) => (
                    <Picker.Item key={i} label={t} value={t} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.subtitle}>Descripción:</Text>
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={g.description}
                onChangeText={v => handleGarment(gi, 'description', v)}
              />

              <Text style={styles.subtitle}>Observaciones:</Text>
              <TextInput
                style={[styles.input, { height: 70, textAlignVertical: 'top' }]}
                multiline
                placeholder="Observaciones"
                value={g.observations}
                onChangeText={v => handleGarment(gi, 'observations', v)}
              />

              <Text style={styles.subtitle}>Servicios:</Text>
              {g.services.map((s, si) => (
                <View key={si} style={[styles.item, { backgroundColor: '#e0d4f7', marginBottom: 10 }]}>
                  <Text style={styles.itemText}>Servicio #{si + 1}</Text>

                  <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 4, marginBottom: 10 }}>
                    <Picker
                      selectedValue={s.id}
                      onValueChange={v => handleService(gi, si, 'id', v)}
                      style={{ backgroundColor: 'white' }}
                    >
                      {servicesData.map(serv => (
                        <Picker.Item
                          key={serv.id}
                          label={`${serv.name} ($${serv.price})`}
                          value={serv.id}
                        />
                      ))}
                    </Picker>
                  </View>

                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    placeholder="Cantidad"
                    value={s.quantity}
                    onChangeText={t => handleService(gi, si, 'quantity', t)}
                  />
                </View>
              ))}

              <TouchableOpacity
                style={[styles.botoncito, { alignSelf: 'flex-start', marginTop: 5 }]}
                onPress={() => addService(gi)}
              >
                <Text style={styles.btnText}>+ Agregar Servicio</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.total}>Total: ${order.total}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#946dd3',
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#e0d4f7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botoncito: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
