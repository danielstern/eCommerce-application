import { Router } from 'express';

export const Price = Router();

Price.post("/", async ({
   body

},res)=>{

    const {
        size,
        message = "",
        ornament,
    } = body;
    
    let price = 49.99;

    switch (size) {
        case "SMALL": {

            price += message.length * 0.25;
            switch (ornament) {
                case "RACE_CAR":
                case "PONY":
                    price += 7.99;
                    break;
            }
            break;

        }

        case "MEDIUM": {

            price += message.length * 0.60;
            price += 9.99;
            switch (ornament) {
                case "RACE_CAR":
                case "PONY":
                    price += 12.99;
                    break;
            }
            break;

        }

        
        case "LARGE": {

            price += message.length * 0.95;
            price += 14.99;
            switch (ornament) {
                case "RACE_CAR":
                case "PONY":
                    price += 19.99;
                    break;
            }
            break;

        }
    }

    res.json({price: +price.toFixed(2)});
    
});