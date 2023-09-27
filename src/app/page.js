'use client'
import HotelCard from '@/components/ui/HotelCard';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datePicker'
import { Input } from '@/components/ui/input';
import Room from '@/components/ui/roomSelect';
import { useForm, Controller } from "react-hook-form";
import { fetchData } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const paramsObject = {};

  for (const [key, value] of params.entries()) {
    paramsObject[key] = value;
  }
  const [data, setData] = useState([]);
  const { handleSubmit, control, setValue, formState: { errors } } = useForm(
    {
      defaultValues: {
        destination: paramsObject['destination'] || '',
        checkInDate: paramsObject['checkInDate'] ? new Date(paramsObject['checkInDate']) : null,
        checkOutDate: paramsObject['checkOutDate'] ? new Date(paramsObject['checkOutDate']) : null,
        adult: parseInt(paramsObject['adult']),
        children: parseInt(paramsObject['children']),
        room: parseInt(paramsObject['room'])
      }
    }
  );
  // const selectedDate = watch("selectedDate");
  const updateFormData = (fieldName, fieldValue) => {
    setValue(fieldName, fieldValue);
  };
  const onSubmit = (data) => {
    const queryString = Object.entries(data)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    router.push(`?${queryString}`);
  };
  async function fetchData(paramsObject) {
    let searchTerm = paramsObject['destination'] || null;
    try {
      const res = await fetch('./data/hoteldata.json');
      const res_json = await res.json();
      if (searchTerm) {
        const filtered_hotel = res_json.filter((hotel) =>
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filtered_hotel);
      }
      else {
        setData(res_json);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData(paramsObject);
  }, [params]);
  return (
    <main className="w-full">
      <div className="m-4">
        {/* Four search fields in one line */}
        <div className="flex flex-col space-y-8 lg-4 lg:flex-row items-center lg:space-x-4 lg:space-y-0">
          <div className="w-full lg:w-1/4 relative">
            <Controller
              name="destination"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Where are you going?"
                  />
                  {errors.destination && (
                    <p className="text-red-500 absolute top-full left-10">Please type in a destination</p>
                  )}
                </div>

              )}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <Controller
              name="checkInDate"
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div>
                    <DatePicker
                      placeHolder={'Check in Date'}
                      selected={value}
                      onSelect={(date) => onChange(date)}
                    />
                    {errors.checkInDate && (
                      <p className="text-red-500 absolute top-full left-10">Please type in a destination</p>
                    )}
                  </div>
                )
              }}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <Controller
              name="checkOutDate"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => {
                return (
                  <div>
                    <DatePicker
                      placeHolder={'Check out Date'}
                      selected={value}
                      onSelect={(date) => onChange(date)}
                    />
                    {errors.checkOutDate && (
                      <p className="text-red-500 absolute top-full left-10">Please type in a destination</p>
                    )}
                  </div>
                )
              }}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <Room
              updateFormData={updateFormData} adult={parseInt(paramsObject['adult']) || 1}
              children={parseInt(paramsObject['children']) || 0}
              room={parseInt(paramsObject['room']) || 1}
            // control={control} getValues={getValues} setValue={setValue}
            />

          </div>
          <Button onClick={handleSubmit(onSubmit)}>Search</Button>
        </div>
      </div>
      <div>
        {data && data.map(hotel => (
          <HotelCard key={hotel.hotel_id} name={hotel.hotel_name} {...hotel} />
        ))}
      </div>
    </main>
  )
}
