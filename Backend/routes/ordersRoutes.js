const express = require('express');
const router = express.Router();
const ordersHandler = require('../serverHandlers/ordersHandler')

router.get('/:id',ordersHandler.getOrders);
router.post('/', ordersHandler.create_Order);
router.delete('/:id', ordersHandler.delete_order);
router.post('/payment',ordersHandler.processPaymentAndCreateOrder)

module.exports = router;