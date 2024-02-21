import { View, Text, ScrollView, Alert, Linking } from "react-native"
import { useState } from "react"

import { Feather } from "@expo/vector-icons"

import { ProductCartProps, useCartStore } from "@/stores/cart-store"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { Button } from "@/components/button"
import { Input } from "@/components/input"

import { FormatCurrency } from "@/utils/functions/format-currency"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useNavigation } from "expo-router"

import { LinkButton } from "@/components/link-button"

export default function Cart(){
  const cartStore = useCartStore()
  
  const navigation = useNavigation()

  const PHONE_NUMBER = "5562999014442"

  const [getObservation, setObservation] = useState<string>("")

  const total = FormatCurrency(cartStore.products.reduce((total, product ) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductCartProps){
    Alert.alert("Remover", `Deseja remover ${product.title}?`, [
      {
        text: "Cancelar"
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }
    ])
  }

  function handleOrder(){
    Alert.alert("Confirmação", "Deseja enviar o pedido?", [
      {
        text: "Não"
      },
      {
        text: "Enviar",
        onPress: () => {
          const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

          const message = `
            ====NOVO PEDIDO====
            ${products}
            \n 📝 Observações: ${getObservation.length === 0 ? "Nenhuma observação" : getObservation}
            \n 💲 Valor Total: ${total}
          `

          Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
          cartStore.clear()
          navigation.goBack()
        }
      }
    ])
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho"/>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView >
          {cartStore.products.length > 0 ?(
            <View className="flex-1 m-5 border-b border-slate-700">
              {cartStore.products.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  onPress={() => handleProductRemove(product)}
                />
              ))}
            </View>
          ) : (
            <Text className="font-body text-slate-400 text-center my-8">
              Seu carrinho está vazio.
            </Text>
          )}
          {cartStore.products.length !== 0 && (
            <>
              <View className="flex-row gap-2 items-center p-5">
                <Text className="text-white font-subtitle text-xl">
                  Total:
                </Text>
                <Text className="text-lime-400 text-2xl font-heading">
                  {total}
                </Text>
              </View>
              <Input
                placeholder="Observações do pedido"
                onChangeText={(text) => setObservation(text)}
                onSubmitEditing={handleOrder}
                blurOnSubmit={true}
                returnKeyType="next"
              />
            </>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
      {cartStore.products.length !== 0 && (
        <Button
          onPress={handleOrder}
        >
          <Button.Text>
            Enviar pedido
          </Button.Text>
          <Button.Icon>
            <Feather  name="arrow-right-circle" size={20}/>
          </Button.Icon>
        </Button>
      )}


        <LinkButton title="Voltar ao cardápio" href="/"/>
      </View>

    </View>
  )
}