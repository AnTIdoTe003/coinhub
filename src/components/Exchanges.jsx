import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import { Container, Heading, HStack, Image, Card, CardBody,Stack,Text,Divider,CardFooter,Button,ButtonGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent.jsx'

const Exchanges = () => {
const [exchanges,setExchanges] = useState([])
const [loading , setLoading] = useState(true)
const [error, setError] = useState(false)
  useEffect(() => {
    const fetchExchanges = async() => {
      try {
        const{data}= await axios.get(`${server}/exchanges?page=1&per_page=10`)
        console.log(data);
        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false) 
      }
     
    }
  
    
    fetchExchanges()
  },[])
  
  if(error){
    return(
      <ErrorComponent></ErrorComponent>
    )
  }


  return (
    <Container maxW={'container.xl'} p={'4'}>
      {loading? <Loader/>: 
      
      <HStack wrap={'wrap'} rowGap={'20px'} justifyContent={'space-evenly'}>
      {exchanges.map((i)=>{
          return(
            <ExchangeCard 
            key = {i.id}
            name={i.name}
            img = {i.image}
            url = {i.url}
            rank ={i.trust_score_rank}
            year = {i.year_established}
            country = {i.country}
            value = {i.trade_volume_24h_btc_normalized
            }
            />
          )
        } 
        )}
      </HStack>
        
      
    
    }
    </Container>
  )
}

const ExchangeCard=(props)=>{
  return(
    <Card maxW='sm' transition={'all  ease-in 0.5s'}css={{
      '&:hover':{
        transform: 'scale(1.1)',
      }
    }}>
  <CardBody>
    <Image
      src={props.img}
      alt={props.name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{props.name}</Heading>
      <Text>
        <b>{props.name}</b> was established in the year <b>{props.year}</b> and it was originated in the country <b>{props.country}</b>.
        It's current ranking is <b>{props.rank}</b>
      </Text>
      <Text color='purple.600' fontSize='2xl'>
        ${props.value.toFixed(2)}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='purple'>
        <a href={props.url} target="_blank" rel='noreferrer'>Official Website</a>
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
  )
 
}

export default Exchanges