import React from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

export default function ProfilePreview({ isOpen, onOpen, onClose, profile }) {
  return (
    <div>
      <Drawer isOpen={isOpen} size='lg' placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile Details</DrawerHeader>

          <DrawerBody>
            <Box>
              <strong>Name:</strong> {profile?.name}
            </Box>
            <Box>
              <strong>Email:</strong> {profile?.email}
            </Box>
            <Box>
              <strong>Bio:</strong> {profile?.bio}
            </Box>
            <Box>
              <strong>Professional Experiences:</strong>
              {profile?.experiences?.map((exp, index) => (
                <Box key={index} mt={2} p={2} bg='gray.100' rounded='md'>
                  <strong>{exp?.title}</strong>
                  <br />
                  {exp?.startDate} - {exp?.endDate}
                  <br />
                  {exp?.description}
                </Box>
              ))}
            </Box>
            <Box>
              <strong>Skills:</strong>
              <Box display='flex' gap={3} flexWrap='wrap'>
                {profile?.skills?.map((skill, index) => (
                  <Box key={index} mt={2} p={2} bg='gray.100' rounded='md'>
                    {skill}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <strong>Resume:</strong>{' '}
              {profile?.resume && (
                <Box mt={2} p={2} bg='gray.100' rounded='md'>
                  {profile?.resumeName}
                </Box>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
