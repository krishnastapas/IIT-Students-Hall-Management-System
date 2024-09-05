import React, { useEffect, useState } from 'react'
import Title from './Title'
import Body from './Body'
import { HallInterface } from '../../hall/Model'
import { useParams } from 'react-router-dom';
import { readHall } from '../repository';

function Index() {

  const [hall, setHall] = useState<HallInterface>({
    name: "",
    about: "",
    care_taker: "",
    date_of_establish: "",
    date_time: "",
    established_by: "",
    warden_incharge: "",
    culuralSecretary: "",
    environmentalSecretory: "",
    generalSecretory: "",
    maintainanceSecretory: "",
    sportSecretary: "",
    wardenEmail: "",
    wardenPassowrd: "",
  });
  const { id } = useParams()
  const fetchHall = async () => {

    const data = await readHall(id ?? "");

    if (data) {
      console.log(data)
      setHall(data)
    }
  }

  useEffect(() => {
    fetchHall()
  }, [])
  return (
    <div>
      <Title
        hall={hall} />
      <Body
        fetchHall={fetchHall}
        hall={hall}
      />
    </div>
  )
}

export default Index