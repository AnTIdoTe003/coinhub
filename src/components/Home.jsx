import { Box, Button, Container, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react'
import crypto from'../assets/crypto.png'
import { motion } from 'framer-motion';
const Home = () => {
  return (
    <Stack direction={['column','row']} p={'20'}>
      <Container my={'10%'} w={'full'}>
        <Heading size={['2xl','4xl']} textTransform={'uppercase'}>Welcome to coinhub</Heading>
        <Text my={'6'} fontFamily={'Poppins'} fontSize={'3xl'}>Want to know more about crypto ???</Text>
        <Text fontSize={'2xl'}>You are at the right place</Text>
        <Button my={'10'} size={'lg'} colorScheme={'purple'}><Link to={'/exchanges'}>Get Started</Link></Button>
      </Container>
      <motion.div
      animate={{y:50}}
      transition={{duration:2,delay:1, repeat:Infinity, repeatType:"reverse"
      }}
      initial={{y:0}}
      >
      <Image  src={crypto}>
      </Image>
      </motion.div>
    </Stack>
    
    
    
  )
}

export default Home
