import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import { Container, Heading, HStack, Image, Card, CardBody,Stack,Text,Divider,CardFooter,Button,ButtonGroup, Menu, MenuButton, MenuList,  MenuItemOption,MenuOptionGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent.jsx'
import {RiArrowDropUpLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Coins = () => {
const [coins,setCoins] = useState([])
const [loading , setLoading] = useState(true)
const [error, setError] = useState(false)
const [page, setPage] = useState(1)
const [currency , setCurrency] = useState("inr")
const currencySymbol = currency==="inr" ? "₹" : currency==="eur"? "€" : "$"
  useEffect(() => {
    const fetchCoins = async() => {
      try {
        const{data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&per_page=10&page=${page}`)
        console.log(data);
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false) 
      }
     
    }
    fetchCoins()
  },[currency,page])
  
  if(error){
    return(
      <ErrorComponent></ErrorComponent>
    )
  }

  const changePage=(value) => {
    setPage(value)
    setLoading(true)
  }

  return (
    
  <Container maxW={'container.xl'} p={'4'}>
    <Menu paddingBottom={'4'}>
      <MenuButton as={Button} rightIcon={<RiArrowDropUpLine />} marginBottom={'6'}>
      Currency
      </MenuButton>
      <MenuList >
      <MenuOptionGroup defaultValue='inr'  type='radio' onChange={setCurrency}>
      <MenuItemOption value='inr'>INR</MenuItemOption>
      <MenuItemOption value='usd'>USD</MenuItemOption>
      <MenuItemOption value='eur'>EUR</MenuItemOption>
    </MenuOptionGroup>
      </MenuList>
      </Menu>
      {loading? <Loader/>: 
      <HStack wrap={'wrap'} rowGap={'20px'} justifyContent={'space-evenly'}>
      {coins.map((i)=>{
          return(
            <ExchangeCard
            id={i.id} 
            key = {i.id}
            name={i.name}
            img = {i.image}
            value ={i.current_price}
            currencySymbol={currencySymbol}
            symbol ={i.symbol}
            />
          )
        } 
        )}
      </HStack>
    }
    <HStack justifyContent={'space-evenly'} paddingTop={'10'} >
      <Button onClick={()=>{changePage(1)}}>1</Button>
      <Button onClick={()=>{changePage(3)}}>2</Button>
      <Button onClick={()=>{changePage(2)}}>3</Button>
      <Button onClick={()=>{changePage(4)}}>4</Button>
      <Button onClick={()=>{changePage(5)}}>5</Button>
    </HStack>
    </Container>
  )
}

const ExchangeCard=(props)=>{
  return(
    <Link to={`/coin/${props.id}`}>
    <Card maxW='sm' transition={'all  ease-in 0.5s'}css={{
      '&:hover':{
        transform: 'scale(1.05)',
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
        <b>{props.symbol}</b>
      </Text>
      <Text color='purple.600' fontSize='2xl'>
        {props.currencySymbol} {props.value.toFixed(2)}
      </Text>
    </Stack>
  </CardBody>
</Card>
</Link>
  )
 
}

export default Coins