import antData from '../../cypress/fixtures/ant-data.json'

export default function handler(req, res) {
  res.status(200).json(antData)
}