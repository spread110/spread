const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      sparse: true, // Allow multiple null values (since email is optional)
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    firebaseUid: {
      type: String,
      unique: true,
    },
    fcmTokens: [
      {
        token: {
          type: String,
          required: true,
        },
        device: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    addresses: [
      {
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
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema); 