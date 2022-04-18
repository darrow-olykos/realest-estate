import cityData from '../../cypress/fixtures/city-data.json'

export default function handler(req, res) {
  res.status(200).json(cityData)
}
