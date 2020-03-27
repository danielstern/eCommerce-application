import express from "express";
import path from "path";
import { urlencoded, json } from 'body-parser';

import { PORT } from '../common/config';
import { Checkout } from './checkout';


const app = new express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(express.static(path.join(__dirname, "..", "spec", "client")));

app.use("/checkout", Checkout);
app.listen(PORT, ()=>console.log(`Application listening on PORT:${PORT}`));