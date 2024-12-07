import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({
  path: './.env.local',
})

fetch(`${process.env.VITE_BACKEND_URL}/codegen/models`, {
  method: 'POST',
  headers: {
    'x-fraia-api-secret-key': process.env.VITE_API_SECRET,
  },
}).then((response) => {
  if (response.ok) {
    response.text().then((data) => {
      fs.writeFileSync('./scripts/fraia-codegen/temp-schema.json', data)
    })
  } else {
    console.error('Codegen failed')
  }
})
