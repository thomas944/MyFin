const Transaction = require('../models/transaction')

const getTransactions = async(req, res) => {
  try{
    const transactions = await Transaction.find({})
    
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    })
  } catch (error){
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

const addTransaction = async (req, res) => {
  try{
    //const { text, amount } = req.body
    const newTransaction = await Transaction.create({
      text: req.body.text,
      amount: req.body.amount
    })
    return res.status(201).json({
      success:true, 
      data: newTransaction
    })
  } catch(error){
    if(error.name === 'ValidationError'){
      const messages = Object.values(error.errors).map(val => val.message)
      return res.status(400).json({
        success:false,
        error: messages
      })
    } else{
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
  }
}

const deleteTransaction = async (req, res) => {
  try{
    const transaction = await Transaction.findById(req.params.id)

    if(!transaction){
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }
    await transaction.remove()
    return res.status(200).json({
      success: true,
      data: {}
    })
  } catch(error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction
}