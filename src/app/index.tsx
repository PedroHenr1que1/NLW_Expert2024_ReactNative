import { View, FlatList } from "react-native"
import { CATEGORIES } from "@/utils/data/products"

import { Header } from "@/components/header"
import { CategoryButton } from "@/components/category-button"
import { useState } from "react"

export default function Home(){

  const [getCategory, setCategory] = useState<string>(CATEGORIES[0])

  function handleCategorySelected(selectedCategory: string){
    setCategory(selectedCategory)
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça o seu pedido" cartQuantityItens={2}/>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <CategoryButton 
            title={item}  
            isSelected={item === getCategory} 
            onPress={() => handleCategorySelected(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}