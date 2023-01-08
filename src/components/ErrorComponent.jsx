import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
  } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ErrorComponent = () => {
  return (
    <Alert status='error'>
  <AlertIcon />
  <AlertTitle>There was an error processing your request!</AlertTitle>
  <AlertDescription>Please check once again</AlertDescription>
  <Button transform={'translateX(20px)'}><Link to={'/home'}>Go Home</Link></Button>
</Alert>
  )
}

export default ErrorComponent