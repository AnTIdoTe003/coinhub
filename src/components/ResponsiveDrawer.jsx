import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,Input,DrawerFooter
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';


const ResponsiveDrawer =()=>{
  const { isOpen, onOpen, onClose } = useDisclosure();

return (
  <>
    <Button
      zIndex={'overlay'}
      pos={'fixed'}
      top={'4'}
      left={'4'}
      colorScheme="purple"
      p={'0'}
      w={'10'}
      h={'10'}
      borderRadius={'full'}
      onClick={onOpen}
      display={['yes','none']}
    >
      <BiMenuAltLeft size={'20'} />
    </Button>

    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader textTransform={'uppercase'}>Coinhub</DrawerHeader>
        <DrawerBody>
        <VStack alignItems={'flex-start'}>
          <Button  variant={'unstyled'} color={'black'}>
            <Link to ="/" >Home</Link>
            </Button>
            <Button  variant={'unstyled'} color={'black'}>
        <Link to ="/exchanges" >Exchanges</Link>
        </Button>
        <Button  variant={'unstyled'} color={'black'}>
        <Link to ="/coins" >Coins</Link>
        </Button>
        </VStack>  
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
)
};

export default ResponsiveDrawer;