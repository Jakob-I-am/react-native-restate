import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { useAppwrite } from '@/lib/useAppwrite';
import { getPropertyById } from '@/lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../../constants/icons';

export default function Property() {
  const { id } = useLocalSearchParams();
  const { data, loading } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id.toString(),
    },
  });

  return (
    <SafeAreaView>
      <View className='flex flex-row items-start justify-between px-6 w-full h-80'>
        <TouchableOpacity
          className=''
          onPress={() => router.back()}
        >
          <Image
            source={icons.backArrow}
            className='size-8'
          />
        </TouchableOpacity>
        <View className='flex flex-row items-center'>
          <TouchableOpacity>
            <Image
              source={icons.heart}
              className='size-8'
              tintColor={'#191d31'}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.send}
              className='size-8 ml-5'
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className='flex gap-y-5 px-6'>
        <Text className='text-2xl font-rubik-bold text-black-300'>
          {data?.name}
        </Text>
        <View className='flex flex-row items-center px-2'>
          <Text className='text-xs uppercase text-primary-300 font-rubik-bold mr-6'>
            {data?.type}
          </Text>
          <View className='flex flex-row items-center justify-between'>
            <Image source={icons.star} />
            <Text className='ml-2 text-sm text-black-300 font-rubik'>
              {data?.rating} <Text>({data?.reviews?.length} reviews)</Text>
            </Text>
          </View>
        </View>

        <View className='flex flex-row items-center justify-between px-8'>
          <View className='flex flex-row items-center'>
            <Image
              source={icons.bed}
              className='size-5 mr-4'
            />
            <Text className='text-sm text-black-300 font-rubik-bold'>
              {data?.bedrooms} beds
            </Text>
          </View>
          <View className='flex flex-row items-center justify-center'>
            <Image
              source={icons.bath}
              className='size-5 mr-4'
            />
            <Text className='text-sm text-black-300 font-rubik-bold'>
              {data?.bathrooms} bath
            </Text>
          </View>
          <View className='flex flex-row items-center justify-center'>
            <Image
              source={icons.area}
              className='size-5 mr-4'
            />
            <Text className='text-sm text-black-300 font-rubik-bold'>
              {data?.area} sqft
            </Text>
          </View>
        </View>

        <View className='flex mt-10 gap-y-5'>
          <Text className='mb-2 text-xl font-rubik-bold text-black-300'>
            Agent
          </Text>
          <View className='flex flex-row items-center justify-between'>
            <View>
              <Image source={{ uri: data?.agent?.avatar }} />
              <Text>{data?.agent?.name}</Text>
            </View>
          </View>

          <Text className='mb-2 text-xl font-rubik-bold text-black-300'>
            Overview
          </Text>
          <Text>{data?.description}</Text>

          <Text className='mb-2 text-xl font-rubik-bold text-black-300'>
            Facilities
          </Text>
          <View className='flex flex-row '>
            {data?.facilities.map((item: string, index: number) => (
              <Text
                className=''
                key={index}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
