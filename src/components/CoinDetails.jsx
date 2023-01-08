import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Progress,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { server } from '../index.js';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import { RiArrowDropUpLine } from 'react-icons/ri';
import Chart from './Chart';

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days ,setDays] = useState("24h")
  const [chartArr, setChartArr] = useState([])
  const currencySymbol = currency==="inr" ? "₹" : currency==="eur"? "€" : "$"

  const params = useParams();
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        console.log(chartData);
        setChartArr(chartData.prices)
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency,days]);
  if (error) {
    return <ErrorComponent></ErrorComponent>;
  }
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <Box width={'full'} borderWidth={'10'} m={'auto'} alignSelf={'center'}>
            <Chart currency={currencySymbol} days={days} arr={chartArr}></Chart>
          </Box>
          <HStack my={'4'}>
            <Button onClick={()=>{setDays("24h")}}>24h</Button>
            <Button onClick={()=>{setDays("7d")}}>7D</Button>
            <Button onClick={()=>{setDays("30d")}}>30D</Button>
            <Button onClick={()=>{setDays("1y")}}>1Y</Button>
          </HStack>
          <Menu paddingBottom={'4'}>
            <MenuButton as={Button} rightIcon={<RiArrowDropUpLine />} my={'4'}>
              Currency
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue="asc"
                type="radio"
                onChange={setCurrency}
              >
                <MenuItemOption value="inr">INR</MenuItemOption>
                <MenuItemOption value="usd">USD</MenuItemOption>
                <MenuItemOption value="eur">EUR</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf='center' opacity={'0.8'}>Last Updated on {coin.market_data.last_updated.split('T')[0]}</Text>
            <Image src={coin.image.large} w={'20'} h={'20'} objectFit={'contain'}></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h>0?"increase":"decrease"}>
                </StatArrow>
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'}>
              {
                `#${coin.market_cap_rank}`
              }
            </Badge>
            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}></CustomBar>

            <Box w={'full'} p={'4'}>
                <Item title={"Max Supply"} value={coin.market_data.max_supply}></Item>
                <Item title={"Total Supply"} value={coin.market_data.total_supply}></Item>
                <Item title={"Genesis Date"} value={coin.genesis_date}></Item>
                <Item title={"All time high"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}></Item>
                <Item title={"All time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}></Item>
                <Item title={"Coin Gecko Score"} value={coin.coingecko_score}></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item=({title,value})=>{
  return (
  <>
  <HStack justifyContent={'space-between'}>
  <Text fontFamily={'cursive'} fontSize={'2xl'}>{title}</Text>
  <Text fontSize={'2xl'}>{value}</Text>
  </HStack>
  
  </>
  )
    
}
const CustomBar =({high,low})=>{
    return (
    <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={'full'} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
    )
}


export default CoinDetails;
