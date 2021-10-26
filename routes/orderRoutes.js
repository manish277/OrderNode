const router = require('express').Router();
let Order = require('../models/orderModel');
router.route('/list').get((req, res) => {
    Order.find().then((orders) => res.json(orders))
        .catch((err) => res.status(400).json('Error' + err))
});

router.route('/create').post((req, res) => {
    const order_id = req.body.order_id;
    const item_name = req.body.item_name;
    const cost = req.body.cost;
    const order_date = req.body.order_date;
    const delivery_date = req.body.delivery_date;
    Order.find({ order_id: order_id }).then((orders) => {
        if (orders && orders.length == 0) {
            const newOrder = new Order({
                order_id,
                item_name,
                cost,
                order_date,
                delivery_date
            });
            newOrder.save().then((newOrder) => res.status(200).send({ message: 'New Order Added.',data:newOrder}))
                .catch((err) => res.status(400).json('Error' + err))
        } else {
            res.status(200).send({ message: `Already one order with order Id ${order_id} in database` })
        }
    }).catch((err) => res.status(400).json('Error' + err))     
})

router.route('/search').get((req, res) => {
    let order_id = req.body.order_id
    Order.find({ order_id: req.body.order_id }).then((orders) => {
        if (orders && orders.length == 0) {
            res.status(200).send({ message: `No order Found with order Id ${order_id}` })
        } else {
            res.status(200).send({
                message: `Data Found with Order Id ${order_id}`, data: orders
            })
        }
    }).catch((err) => res.status(400).json('Error' + err));
});
router.route('/delete').delete((req, res) => {
    let order_id= req.body.order_id
    Order.find({ order_id: order_id }).then((order) => {
        if (order && order.length !==0) {
            Order.findOneAndRemove({ order_id: order_id}).then((order) => {
                res.status(200).send({ message: "Order Deleted Succesfully", data: order })
            }).catch((err) => res.status(400).json('Error' + err))
        } else {
            res.status(200).send({ message: `No order Found with order Id ${order_id}` })
        }
    }).catch((err) => res.status(200).send({ message: `No order Found with order Id ${order_id}` }))
});
router.route('/update').post((req, res) => {
    Order.findOneAndUpdate(req.body.order_id).then(order => {
        order.delivery_date = req.body.delivery_date
        order.save().then((data)=>res.status(200).send({message:'Order updated',data:data}))
        .catch((err) => res.status(400).json('Error' + err))
    }).catch((err) => res.status(400).json('Error' +err));
   
});
module.exports = router;