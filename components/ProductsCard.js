import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import themeContext from '../config/themeContext';



const ApiUrl = 'YOUR_ENDPOINT';
const ProductsCard = () => {
  const [productData, setProductData] = useState(null);
  const theme = useContext(themeContext);


  useEffect(() => {
    fetch(`${ApiUrl}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {productData ? (
        productData.map((product) => (
          <View key={product._id} style={styles.cardContainer}>
            <Image source={{ uri: product.url }} style={styles.image} />
            <Text style={[styles.title, { color: theme.color }]}>{product.title}</Text>
            <Text style={[styles.price, { color: theme.color }]}>Price: {product.price}$</Text>
            <Text style={[styles.city, { color: theme.color }]}>City: {product.city}</Text>
            <Text style={[styles.address, { color: theme.color }]}>Address: {product.address}</Text>
            <Text style={[styles.phone, { color: theme.color }]}>Phone: {product.phone}</Text>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    borderWidth: 1,
    marginRight:'13%',
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
  },
});

export default ProductsCard;
