import express from 'express'
import configure from './routers'

const app = express()
const port = process.env.PORT