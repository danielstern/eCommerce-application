import express from "express";
import path from "path";
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import { PORT, DEV_MODE } from '../../common/config';
import { Checkout } from './checkout';
import { Price } from './price';

const app = new express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors())
app.use("/checkout", Checkout);
app.use("/price", Price);
app.use(express.static(path.join(__dirname, "..", "..", "..", "public")));
app.use(express.static(path.join(__dirname, "..", "..", "..", "bin")));
app.listen(PORT, ()=>console.log(`INFO: Application listening on port ${PORT}.`));



// if (DEV_MODE) {
    
   
    // open("http://localhost:7777");
    // console.info("INFO: Opening development client.");

// }
// 