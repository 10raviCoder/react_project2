import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom"

const Header = () => {
  return (
   <HStack bgColor={"blackAlpha.900"} height={"16"} p={4} >
    <Button variant={"unstyled"}>
           <Link to ="/"> Home </Link>
    </Button>
    
    <Button variant={"unstyled"}>
    <Link to ="/Exchanges"> Exchanges </Link>
    </Button>
    
    <Button variant={"unstyled"}>
    <Link to ="/Coins"> Coins </Link>
        
    </Button>

   </HStack>
  );
}

export default Header;