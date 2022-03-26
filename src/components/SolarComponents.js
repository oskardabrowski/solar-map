import React from 'react';
import {Old_City, Rubinkowo, Mokre, Koniuchy, Wrzosy, Elana, Kaszczorek, Port, Pogorze, Glinki, Rudak} from './layers/SolarImages'
import {Old_City_Standard, Rubinkowo_Standard, Mokre_Standard, Koniuchy_Standard, Wrzosy_Standard, Elana_Standard, Kaszczorek_Standard, Port_Standard,
Rudak_Standard, Pogorze_Standard, Glinki_Standard} from './layers/SolarImages'

export const SolarBiggestQuality = () => {
  return (
    <>
        <Old_City />
        <Rubinkowo />
        <Mokre />
        <Koniuchy />
        <Wrzosy />
        <Elana />
        <Kaszczorek />
        <Port />
        <Pogorze />
        <Glinki />
        <Rudak />
    </>
  )
}

export const SolarStandardQuality = () => {
  return (
    <>
    <Old_City_Standard />
    <Rubinkowo_Standard />
    <Mokre_Standard />
    <Koniuchy_Standard />
    <Wrzosy_Standard />
    <Elana_Standard />
    <Kaszczorek_Standard />
    <Port_Standard />
    <Rudak_Standard />
    <Pogorze_Standard />
    <Glinki_Standard />
    </>
  )
}
