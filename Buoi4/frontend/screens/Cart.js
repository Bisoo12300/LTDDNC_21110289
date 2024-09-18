import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { CartData } from "../data/CartData";
import PriceTable from "../components/cart/PriceTable";
import Layout from "../components/Layout/Layout";
import Cartitem from "../components/cart/CartItem";

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(CartData);

  return (
    <Layout>
      <Text style={tw`text-center text-green-600 mt-2 text-lg font-semibold`}>
        {cartItems?.length > 0
          ? `You have ${cartItems?.length} item(s) left in your cart`
          : "Oops! Your cart is empty!"}
      </Text>
      {cartItems?.length > 0 && (
        <>
          <ScrollView>
            {cartItems?.map((item) => (
              <Cartitem item={item} key={item._id} />
            ))}
          </ScrollView>
          <View>
            <PriceTable title="Price" price={999} />
            <PriceTable title="Tax" price={1} />
            <PriceTable title="Shipping" price={1} />
            <View style={tw`border border-gray-300 bg-white p-2 m-2 mx-5`}>
              <PriceTable title="Grand Total" price={1001} />
            </View>
            <TouchableOpacity
              style={tw`mt-5 justify-center items-center h-12 bg-black mx-5 rounded-full`}
              onPress={() => navigation.navigate("checkout")}
            >
              <Text style={tw`text-white font-bold text-lg`}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Layout>
  );
};

export default Cart;
