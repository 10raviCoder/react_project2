import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { server } from '../index'
import { useParams } from 'react-router-dom'
import {
  Box, Stat, StatLabel, StatNumber, Text, Container, VStack, HStack, Radio, RadioGroup,
  Image, StatArrow, StatHelpText, Badge, Progress,
} from '@chakra-ui/react'
import Loader from './Loader'

const CoinsDetails = () => {

  const [Coin, setCoin] = useState({})
  const params = useParams();
  const [currency, setCurrency] = useState("inr")
  const [loading, setloading] = useState(true)



  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {

    const fetchCoin = async () => {
      
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        setCoin(data)
        console.log(data)
        setloading(false)

      } catch (error) {
        setloading(false)
        console.log(error, "error occured")
      }
    }
    fetchCoin();

  }, [params.id, currency])

  return (

    <Container maxW={'container.xl'}>

      { loading ? (
        <Loader />
        ) : (
          
          <>

          <Box>
          </Box>
              <RadioGroup value={currency} p={8} onChange={setCurrency} >
                <HStack spacing={4} >
                  <Radio value={"inr"}>INR</Radio>
                  <Radio value={"eur"}>EUR</Radio>
                  <Radio value={"usd"}>USD</Radio>
                </HStack>
              </RadioGroup>

              <VStack alignItems={'flex-start'}>

                <Text alignSelf="center" opacity={0.7} p={16}>
                  Last Updated On{" "}
                  {Date(Coin.market_data.last_updated).split("G")[0]}
                </Text>
                <Image
                  h={16}
                  w={16}
                  src={Coin.image.large}
                  objectFit={'contain'}
                />
                <Stat>
                  <StatLabel >{Coin.name}</StatLabel>
                  <StatNumber >{currencySymbol}{Coin.market_data.current_price[currency]}</StatNumber>

                  <StatHelpText>
                    <StatArrow
                      type={
                        Coin.market_data.price_change_percentage_24h > 0
                          ? "increase"
                          : "decrease"
                      }
                    />
                    {Coin.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>
                <Badge fontSize={25}>#{Coin.market_cap_rank}</Badge>

                <CustomBar

                  high={`${currencySymbol}${Coin.market_data.high_24h[currency]}`}
                  low={`${currencySymbol}${Coin.market_data.low_24h[currency]}`}
                />
                <Box w={"full"} p={4}>

                  <Item title={"Max Supply"} value={Coin.market_data.max_supply} />
                  <Item
                    title={"Circulating Supply"}
                    value={Coin.market_data.circulating_supply}
                  />
                  <Item
                    title={"Market Cap"}
                    value={`${currencySymbol}${Coin.market_data.market_cap[currency]}`}
                  />
                  <Item
                    title={"All Time Low"}
                    value={`${currencySymbol}${Coin.market_data.atl[currency]}`}
                  />
                  <Item
                    title={"All Time High"}
                    value={`${currencySymbol}${Coin.market_data.ath[currency]}`}
                  />
                </Box>
              </VStack>
          </>
        )
      } 
    </Container>


  )


}

const CustomBar = ({ high, low }) => (

  <VStack w={'full'} >

    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack w={'full'} justifyContent={'space-between'}>

      <Badge colorScheme='red'  >{high}</Badge>
      <Text>24 Hour Range</Text>
      <Badge colorScheme='green'>{low}</Badge>
    </HStack>

  </VStack>


)

const Item = ({ title, value }) => (

  <HStack justifyContent={'space-between'} w={'full'} my={4} >
    <Text>
      {title}
    </Text>

    <Text>
      {value}
    </Text>
  </HStack>

)




export default CoinsDetails