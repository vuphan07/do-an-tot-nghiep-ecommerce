const Payments = require("../models/order.model");
const Users = require("../models/user.model");
const Products = require("../models/product.model");
const { responseSuccess } = require("../utils/response");
const { UserService } = require("../services/user.service");
const { ProductService } = require("../services/product.service");
const APIfeatures = require("../utils/helper");
const { EnumRate } = require("../utils/constant");
const productService = require("../services/product.service");
const { RateService } = require("../services/rate.service");

const orderCtrl = {
    getPaymentsAll: async (req, res) => {
        try {
            const { userId } = req;
            const features = new APIfeatures(Payments.find(), {
                ...req.query,
            })
                .filtering()
                .sorting();
            const features1 = new APIfeatures(Payments.find(), req.query)
                .filtering()
                .sorting()
                .paginating();
            Promise.all([
                await features.query.count(),
                await features1.query,
            ]).then((results) => {
                res.json({
                    status: "success",
                    data: {
                        items: results[1],
                        pagination: { totalItems: results[0] },
                    },
                });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPayments: async (req, res) => {
        try {
            const { userId } = req;
            const features = new APIfeatures(
                Payments.find({ user_id: userId }),
                {
                    ...req.query,
                }
            )
                .filtering()
                .sorting();
            const features1 = new APIfeatures(
                Payments.find({ user_id: userId }),
                req.query
            )
                .filtering()
                .sorting()
                .paginating();
            Promise.all([
                await features.query.count(),
                await features1.query,
            ]).then((results) => {
                res.json({
                    status: "success",
                    data: {
                        items: results[1],
                        pagination: { totalItems: results[0] },
                    },
                });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.userId).select(
                "_id name email"
            );
            if (!user)
                return res.status(400).json({ msg: "User does not exist." });

            const {
                products,
                orderId,
                paymentMethod,
                name: nameUser,
                email: emailUser,
                address,
                amount,
            } = req.body;

            const { _id, name, email } = user;

            const newPayment = new Payments({
                user_id: _id,
                name: nameUser || name,
                email: emailUser || email,
                paymentMethod,
                products,
                orderId,
                address,
                amount,
            });

            Promise.all([
                ...products.map(({ productId, quantity }) =>
                    sold(productId, quantity)
                ),
                ...products.map(({ productId, quantity }) =>
                    RateService.update({
                        product_id: productId,
                        user_id: _id,
                        rate: EnumRate.buy,
                    })
                ),
                UserService.update(_id, { cart: [] }),
                newPayment.save(),
            ]).then(() => {
                res.json({ msg: "Payment Succes!" });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const {
                name,
                email,
                products,
                paymentID,
                address,
                amount,
                status,
            } = req.body;
            await Payments.findOneAndUpdate(
                { _id: req.params.id },
                {
                    name,
                    email,
                    status,
                    products,
                    paymentID,
                    address,
                    amount,
                }
            );
            res.json({ msg: "Updated a Order" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            await Payments.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a đơn hàng" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOrderDetail: async (req, res) => {
        try {
            const record = await Payments.findOne({ _id: req.params.id });
            res.json(responseSuccess(record));
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    chekIsOrderedProduct: async (req, res) => {
        try {
            const { userId } = req;
            const record = await Payments.findOne({
                user_id: userId,
                "products.productId": req.params.productId,
            });
            if (record) {
                res.json(responseSuccess(true));
            } else {
                res.json(responseSuccess(false));
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

const sold = async (id, quantity) => {
    const product = await ProductService.findOne({ _id: id });
    await ProductService.update(id, {
        quantity: product.quantity - quantity,
        sold: product.sold + quantity,
    });
};

module.exports = orderCtrl;
