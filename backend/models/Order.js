const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        image: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'razorpay'],
      required: true,
    },
    paymentInfo: {
      paymentId: {
        type: String,
      },
      orderId: {
        type: String,
      },
      signature: {
        type: String,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
    },
    deliveryDetails: {
      estimatedTime: {
        type: String,
      },
      deliveryPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema); 