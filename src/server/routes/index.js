import express from "express";
import path from "path";
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import { PORT, DEV_MODE } from '../../common/config';
import { Checkout } from './checkout';
import { Price } from './price';
import { Cart } from './cart';

const app = new express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors())
app.use("/checkout", Checkout);
app.use("/price", Price);
app.use("/cart", Cart);
app.use(express.static(path.join(__dirname, "..", "..", "..", "public")));
app.use(express.static(path.join(__dirname, "..", "..", "..", "bin")));
app.listen(PORT, ()=>console.info(`INFO: Application listening on port ${PORT}.`));