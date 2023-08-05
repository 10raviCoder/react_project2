import React from 'react'
import { useState, useEffect } from 'react'
import { server } from '../index'
import axios from 'axios'
import { Container, HStack, Heading, Text, VStack,Image } from '@chakra-ui/react'
import Loader from './Loader'




const Exchanges = () => {


  const [exchanges, setexchanges] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {

    const fetchExcahnges = async () => {

      try {
        const { data } = await axios.get(`${server}/exchanges`)
       
        setexchanges(data)
        setloading(false)
        
      } catch (error) {
        console.log(error, "error occured")
        setloading(false)
      }

    }
    fetchExcahnges();

  }, [])
  return (
    <Container maxW={'container.xl'} h={40}>
    {loading ? <Loader/>: 
    
    <HStack wrap={'wrap'}>

     {
        exchanges.map((items) => {
          return <ExchangesCard
            key={items.id}
            url={items.url}
            name={items.name}
            img={items.image}
            rank={items.trust_score_rank}
          />
        })
      }

     </HStack>
    
  }

    </Container>
  )
}

const ExchangesCard = ({ name, img, rank, url }) => (

  <a href={url} target="blank">

    <VStack
      
      w={"52"}
      p={"8"}
      borderRadius={"lg"}
      m={"4"}
      shadow={"lg"}
      css={{
        "&:hover":{
          transform:"scale(1.1)"
        }
      }}
    >
      <Image src={img} h={8} w={8} objectFit={"contain"}/>
      <Heading size={'md'} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
      
    </VStack>
  </a>

)


export default Exchanges