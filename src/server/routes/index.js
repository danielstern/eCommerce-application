import express from "express";
import path from "path";
import { urlencoded, json } from 'body-parser';
import  open  from 'open';

import { PORT, DEV_MODE } from '../../common/config';
import { Checkout } from './checkout';

const app = new express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/checkout", Checkout);
app.listen(PORT, ()=>console.log(`INFO: Application listening on port ${PORT}.`));

if (DEV_MODE) {
    
    app.use(express.static(path.join(__dirname, "..", "spec", "client")));
    // open("http://localhost:7777");
    // console.info("INFO: Opening development client.");

}
