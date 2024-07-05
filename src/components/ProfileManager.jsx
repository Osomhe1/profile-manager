import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Stack,
  useToast,
  IconButton,
  useDisclosure,
  FormErrorMessage,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import ProfilePreview from './ProfilePreview'

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    experiences: [],
    skills: [],
    resume: null,
    resumeName: '',
  })
  const [errors, setErrors] = useState({})
  const [newExperience, setNewExperience] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  })
  const [newSkill, setNewSkill] = useState('')
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'))
    if (savedProfile) {
      setProfile(savedProfile)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }))
  }

  const handleExperienceChange = (e) => {
    const { name, value } = e.target
    setNewExperience((prevExperience) => ({ ...prevExperience, [name]: value }))
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    const base64File = await fileToBase64(file)
    setProfile((prevProfile) => ({ ...prevProfile, resume: base64File }))
  }

  const handleAddExperience = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      experiences: [...prevProfile.experiences, newExperience],
    }))
    setNewExperience({
      title: '',
      startDate: '',
      endDate: '',
      description: '',
    })
  }

  const handleAddSkill = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: [...prevProfile.skills, newSkill],
    }))
    setNewSkill('')
  }

  const handleDeleteExperience = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      experiences: prevProfile.experiences.filter((_, i) => i !== index),
    }))
  }

  const handleDeleteSkill = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formErrors = {}
    if (!profile.name) formErrors.name = 'Name is required'
    if (!profile.email) formErrors.email = 'Email is required'
    if (!profile.bio) formErrors.bio = 'Bio is required'

    if (!profile.resume) formErrors.resume = 'Resume is required'

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      toast({
        title: 'Error',
        description: 'Please fill out all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      setErrors({})
      // Persist data to local storage
      localStorage.setItem('profile', JSON.stringify(profile))
      toast({
        title: 'Profile saved.',
        description:
          'Your profile has been updated and saved to local storage.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onOpen()
    }
  }

  return (
    <Box p={5} maxW='600px' mx='auto'>
      <Box>
        <strong>Profile Details</strong>
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              name='name'
              value={profile?.name}
              onChange={handleChange}
            />
            {errors?.name && (
              <FormErrorMessage>{errors?.name}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              value={profile?.email}
              onChange={handleChange}
            />
            {errors?.email && (
              <FormErrorMessage>{errors?.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id='bio'>
            <FormLabel>Bio</FormLabel>
            <Textarea name='bio' value={profile?.bio} onChange={handleChange} />
            {errors?.bio && <FormErrorMessage>{errors?.bio}</FormErrorMessage>}
          </FormControl>
          <FormControl id='experiences'>
            <FormLabel>Professional Experiences</FormLabel>
            <VStack spacing={3} w='full'>
              <Input
                type='text'
                placeholder='Title'
                name='title'
                value={newExperience.title}
                onChange={handleExperienceChange}
              />
              <HStack w='full'>
                <FormControl id='startDate'>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type='date'
                    name='startDate'
                    value={newExperience.startDate}
                    onChange={handleExperienceChange}
                  />
                </FormControl>
                <FormControl id='endDate'>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type='date'
                    name='endDate'
                    value={newExperience.endDate}
                    onChange={handleExperienceChange}
                  />
                </FormControl>
              </HStack>
              <Textarea
                placeholder='Description'
                name='description'
                value={newExperience.description}
                onChange={handleExperienceChange}
              />
              <Button onClick={handleAddExperience}>Add Experience</Button>
            </VStack>
            <Stack mt={3} spacing={2}>
              {profile.experiences.map((exp, index) => (
                <Box key={index} p={2} bg='gray.100' rounded='md'>
                  <HStack justify='space-between'>
                    <Box>
                      <strong>{exp.title}</strong>
                      <br />
                      {exp.startDate} - {exp.endDate}
                      <br />
                      {exp.description}
                    </Box>
                    <IconButton
                      aria-label='Delete experience'
                      icon={<CloseIcon />}
                      size='sm'
                      onClick={() => handleDeleteExperience(index)}
                    />
                  </HStack>
                </Box>
              ))}
            </Stack>
          </FormControl>
          <FormControl id='skills'>
            <FormLabel>Skills</FormLabel>
            <HStack>
              <Input
                type='text'
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button onClick={handleAddSkill}>Add</Button>
            </HStack>
            <Stack mt={3} spacing={2}>
              <Box display='flex' gap={3} flexWrap='wrap'>
                {profile?.skills?.map((skill, index) => (
                  <HStack key={index} p={2} bg='gray.100' rounded='md'>
                    <Box flex='1'>{skill}</Box>
                    <IconButton
                      aria-label='Delete skill'
                      icon={<CloseIcon />}
                      size='sm'
                      onClick={() => handleDeleteSkill(index)}
                    />
                  </HStack>
                ))}
              </Box>
            </Stack>
          </FormControl>
          <FormControl id='resume'>
            <FormLabel>Upload Resume</FormLabel>
            <Input paddingY={1} type='file' onChange={handleResumeUpload} />
            {profile?.resume && (
              <Box mt={2} p={2} bg='gray.100' rounded='md'>
                {profile?.resume?.name || profile?.resumeName}
              </Box>
            )}
            {errors?.resume && (
              <FormErrorMessage>{errors?.resume}</FormErrorMessage>
            )}
          </FormControl>
          <Button type='submit' colorScheme='teal'>
            Save Profile
          </Button>
        </VStack>
      </form>
      {isOpen && (
        <ProfilePreview
          isOpen={isOpen}
          onOpen={open}
          profile={profile}
          onClose={onClose}
        />
      )}
    </Box>
  )
}

export default ProfileManager
