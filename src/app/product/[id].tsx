import { Image, View, Text } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router"

import { PRODUCTS } from "@/utils/data/products"

import { FormatCurrency } from "@/utils/functions/format-currency"

import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button";

import { Feather } from "@expo/vector-icons"

import { useCartStore } from "@/stores/cart-store";

export default function Product(){
  const { id } = useLocalSearchParams()

  const cartStore = useCartStore()

  const navigation = useNavigation()

  const product = PRODUCTS.find((item) => item.id === id)


  function handleAddToCart(){
    cartStore.add(product!)
    navigation.goBack()
  }

  if(!product){
    return <Redirect href="/"/>
  }

  return (
    <View className="flex-1">
      <Image 
        className="w-full h-52"
        source={product.cover}
        resizeMode="cover"
      />
      <View className=" p-5 mt-4 flex-1">
        <Text 
          className="text-slate-100 font-heading text-3xl"
        >
          {product.title}
        </Text>
        <Text
          className="text-lime-400 text-2xl font-heading my-2"
        >
        {FormatCurrency(product.price)}
        </Text>

        <Text
          className="text-slate-400 font-body text-base leading-6 mb-6"
        >
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text 
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20}/>
          </Button.Icon>
          <Button.Text>
            Adicionar ao pedido
          </Button.Text>
        </Button>
        <LinkButton 
          title="Voltar ao cardápio"
          href="/"
        />
      </View>
    </View>
  )
}