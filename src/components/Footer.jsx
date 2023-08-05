import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Box bgColor={"black"} minH={48} px={"16"} color={"whiteAlpha.700"} py={["16", "8"]}>

            <Stack direction={["column", "row"]} alignItems={"center"} h={"full"}>

                <VStack w={"full"} alignItems={["center", 'flex-start']}>

                    <Text fontWeight={"bold"}>About us</Text>
                    <Text>
                        We are the best crypto trading app in India, we provide our guidance at a very cheap price.
                    </Text>

                </VStack>
                <VStack>
                    <Avatar boxSize={"28"} mt={["4", "0"]} />
                    <Text>Our Founder</Text>

                </VStack>

            </Stack>
        </Box>
    )
}

export default Footer