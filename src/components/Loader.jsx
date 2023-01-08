import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack height={'90vh'} justifyContent={'center'}>
        <Box transform={'scale(2)'}>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Box>
        
    </VStack>
  )
}

export default Loader