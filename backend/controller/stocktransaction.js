const StockTransaction = require('../models/StockTranscationmodel');
const Product = require('../models/Productmodel');
const Inventory = require('../models/Inventorymodel');

const upsertInventoryQuantity = async (productId, quantity) => {
  let inventory = await Inventory.findOne({ product: productId });

  if (!inventory) {
    inventory = new Inventory({
      product: productId,
      quantity,
    });
  } else {
    inventory.quantity = quantity;
    inventory.lastUpdated = Date.now();
  }

  await inventory.save();
};


module.exports.createStockTransaction = async (req, res) => {
  try {
    const { product, type, quantity, supplier } = req.body;

    if (!product || !type || !quantity) {
      return res.status(400).json({ success: false, message: "Product, type, and quantity are required." });
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be a valid positive number." });
    }

    const productDoc = await Product.findById(product);
    if (!productDoc) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    if (type === "Stock-out" && productDoc.quantity < parsedQuantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock for stock-out transaction.",
        available: productDoc.quantity,
      });
    }

    const nextQuantity = type === "Stock-in"
      ? productDoc.quantity + parsedQuantity
      : productDoc.quantity - parsedQuantity;

    productDoc.quantity = nextQuantity;
    await productDoc.save();

    await upsertInventoryQuantity(product, nextQuantity);

    const newTransaction = new StockTransaction({
      product,
      type,
      quantity: parsedQuantity,
      supplier,
    });

    await newTransaction.save();

    const populatedTransaction = await StockTransaction.findById(newTransaction._id)
      .populate('product')
      .populate('supplier');

    res.status(201).json({
      success: true,
      message: "Stock transaction created successfully",
      transaction: populatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating stock transaction", error });
  }
};


module.exports.getAllStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find()
    .populate('product')
    .populate('supplier')
    .sort({ transactionDate: -1 });

    res.status(200).json({message: "Stock transaction created successfully",transactions});
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stock transactions", error });
  }
};


module.exports.getStockTransactionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const transactions = await StockTransaction.find({ product: productId }).populate('Supplier').sort({ transactionDate: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this product." });
    }

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions by product", error });
  }
};


module.exports.getStockTransactionsBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const transactions = await StockTransaction.find({ supplier: supplierId }).populate('product').sort({ transactionDate: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this supplier." });
    }

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions by supplier", error });
  }
};


module.exports.searchStocks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const stocks = await StockTransaction.find({})
      .populate('product') 
      .then((transactions) => {
        return transactions.filter((transaction) => 
          transaction.type.toLowerCase().includes(query.toLowerCase()) ||
          (transaction.product && transaction.product.name.toLowerCase().includes(query.toLowerCase()))
        );
      });

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error finding product", error: error.message });
  }
};