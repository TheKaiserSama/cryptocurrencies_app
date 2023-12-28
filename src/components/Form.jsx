import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { coins } from '../data/coins'

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

const Form = ({ setCurrencies }) => {
  const [cryptocurrencies, setCryptocurrencies] = useState([])
  const [error, setError] = useState(false)
  const [currency, SelectCurrency] = useSelectCurrency('Choose your Currency', coins)
  const [cryptocurrency, SelectCryptocurrency] = useSelectCurrency('Choose your Cryptocurrency', cryptocurrencies)

  useEffect(() => {
    const queryAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const response = await fetch(url)
      const result = await response.json()

      const arrayCryptocurrencies = result.Data.map(cryptocurrency => ({
        id: cryptocurrency.CoinInfo.Name,
        name: cryptocurrency.CoinInfo.FullName
      }))

      setCryptocurrencies(arrayCryptocurrencies)
    }
    queryAPI()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([currency && cryptocurrency].includes('')) {
      setError(true)
      return
    }

    setError(false)
    setCurrencies({ currency, cryptocurrency })
  }

  return (
    <>
      {error && <Error>All fields are required</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectCurrency />
        <SelectCryptocurrency />
        <InputSubmit
          type="submit"
          value='Quote' E
        />
      </form>
    </>
  )
}

export default Form
