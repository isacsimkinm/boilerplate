import * as express from 'express'
import { definitions, calculator, indexDisplay, prime } from './handler';

const server = express()
server.get('/definitions', definitions);
server.get('/calculator', calculator);
server.get('/index', indexDisplay);
server.get('/prime', prime);
server.listen(3099)


