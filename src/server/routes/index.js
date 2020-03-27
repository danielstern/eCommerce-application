import express from "express";
import path from "path";
import { urlencoded, json } from 'body-parser';

import { PORT, DEV_MODE } from '../common/config';
import { Checkout } from './checkout';

const app = new express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/checkout", Checkout);
app.listen(PORT, ()=>console.log(`Application listening on PORT:${PORT}`));

if (DEV_MODE) {
    
    app.use(express.static(path.join(__dirname, "..", "spec", "client")));
}
