import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { server } from '../index'
import { Container, HStack, Text, VStack, Image, Heading, RadioGroup, Radio } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Loader from './Loader'




const Coins = () => {

  const [Coins, setCoins] = useState([])
  const [loading, setloading] = useState(true)
  const [currency, setCurrency] = useState("inr")



  const currencySymbol = currency ===  "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {

    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}`)
        setloading(false)
        console.log(currency)
        setCoins(data)
      } catch (error) {
        console.log(error, "error occur")

      }
    }
    fetchCoins();

  }, [currency])

  return (


    <Container h={40} minW={'container.xl'}>


      <RadioGroup value= {currency}p={8} onChange={setCurrency} >

        <HStack spacing={4} >

          <Radio value={"inr"}>INR</Radio>
          <Radio value={"eur"}>EUR</Radio>
          <Radio value={"usd"}>USD</Radio>

        </HStack>


      </RadioGroup>

      {loading ? <Loader /> :
      
      
      
      
      <HStack wrap={'wrap'} p={4} justifyContent={'space-evenly'}>

        {
          Coins.map((items) =>
            <CoinCard
              id={items.id}
              key={items.id}
              name={items.name}
              price={items.current_price}
              img={items.image}
              symbol={items.symbol}
              currencySymbol={currencySymbol}
            />
          )
        }

      </HStack>
      }
    </Container>
  )

}

const CoinCard = ({ name, id, price, img, symbol,currencySymbol = "₹" }) => (

  <Link to={`/coins/${id}`}>
    <VStack p={8} w={52} shadow={'lg'} m={4}
      transition={"all 0.3s "}
      css={{
        "&:hover": {
          transform: "scale(1.1)"
        },

      }}

    >

      <Image src={img} h={8} w={8} objectFit={'contain'}

      />

      <Heading size={'sm'} >{symbol}</Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>

    </VStack>
  </Link>
)


export default Coins