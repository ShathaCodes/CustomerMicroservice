## Running the app

To run the database
```
$ docker-compose up
```

To run server on port 3001 development on watch mode
```
$ npm run start:dev
```

If you're using the application for the first time, you've got to seed the database
```
$ npm run seed:db
```

## APIs

```GET localhost:3001/products```		=> [{products}]

```GET localhost:3001/products/id``` 	=> {products}

```GET localhost:3001/products/buy/id``` => HTTPCode(200) + send (idProd,qte) to topic ``achat`` 
                                            if there isn't enough quantity => send (idProd,idUser) to topic ``subscription`` 
***

- Buy a new product : **send** (idProd,qte) to topic ``achat`` => update product table
- Subscribe to out of stock : **send** (idProd,idUser) to topic ``subscription`` 
- Product restoke : **recieve** (mail,idProd,qte) from ``notif`` => update product table & send email to user



