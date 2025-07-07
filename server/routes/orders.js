import express from 'express';
import Order from '../models/Order.js';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js'; 

const router = express.Router();

// Create order (public)
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    await order.populate('items.product', 'name price');

    // Try to send email notifications
    try {
      const nodemailer = await import('nodemailer');

      const transporter = nodemailer.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Order from GLUTO International</h2>
          <h3>Customer Information:</h3>
          <p><strong>Name:</strong> ${order.customerInfo.fullName}</p>
          <p><strong>Position:</strong> ${order.customerInfo.positionTitle}</p>
          <p><strong>Company:</strong> ${order.customerInfo.companyName}</p>
          <p><strong>Email:</strong> ${order.customerInfo.email}</p>
          <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
          <p><strong>Address:</strong> ${order.customerInfo.address}</p>
          <p><strong>Priority:</strong> ${order.customerInfo.priority}</p>
          
          <h3>Order Details:</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Product</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Quantity</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.product.name}</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.quantity}</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">$${item.price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
          <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
      `;

      // Send to all admin users
      const adminUsers = await User.find({ role: 'admin' }).select('email');
      const adminEmails = adminUsers.map(admin => admin.email);

      if (adminEmails.length > 0) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: adminEmails,
          subject: `New Order from ${order.customerInfo.fullName} - ${order.customerInfo.companyName}`,
          html: emailHtml
        });
      }

      // Send confirmation to customer
      if (!order.customerInfo?.email) {
        console.error('Missing customer email. Cannot send confirmation.');
      } else {
        console.log('Sending confirmation to:', order.customerInfo.email);
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: order.customerInfo.email,
          subject: 'Order Confirmation - GLUTO International',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Thank you for your order!</h2>
              <p>Dear ${order.customerInfo.fullName},</p>
              <p style="color: #ffffff;" >We have received your order and will process it shortly. You will receive updates on your order status.</p>
              <h3>Order Details:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Product</th>
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Quantity</th>
                    <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items.map(item => `
                    <tr>
                      <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.product.name}</td>
                      <td style="padding: 12px; border: 1px solid #e5e7eb;">${item.quantity}</td>
                      <td style="padding: 12px; border: 1px solid #e5e7eb;">$${item.price.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              
              <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
              <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Best regards,<br>GLUTO International Team</p>
            </div>
          `
        });
      }
    } catch (emailError) {
      console.log('Email notification failed (this is optional):', emailError.message);
    }

    

    res.status(201).json({ message: 'Order placed successfully', order: order._id });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      message: 'Failed to place order', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});


// Get all orders (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update order status (admin only)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send email to customer about status update
    try {
      const nodemailer = await import('nodemailer');

      const transporter = nodemailer.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      if (order.customerInfo?.email) {
        const statusMessages = {
          pending: 'Your order is pending. We will begin processing it shortly.',
          confirmed: 'Your order has been confirmed and is being prepared.',
          shipped: 'Good news! Your order has been shipped.',
          delivered: 'Your order has been delivered. We hope you’re satisfied!',
          cancelled: 'We’re sorry, but your order has been cancelled.'
        };

        const userMessage = statusMessages[status] || `Your order status is now: ${status}.`;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: order.customerInfo.email,
          subject: `Order Status Update - ${status.toUpperCase()}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Order Status Update</h2>
              <p>Dear ${order.customerInfo.fullName},</p>
              <p>${userMessage}</p>
              <h3>Order Summary:</h3>
              <ul>
                ${order.items.map(item => `
                  <li>${item.quantity} × ${item.product.name} - $${item.price.toFixed(2)}</li>
                `).join('')}
              </ul>
              <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
              <p><strong>Status:</strong> ${status}</p>
              <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
              <br>
              <p>Thank you for choosing GLUTO International.</p>
            </div>
          `
        });

        console.log(`Status update email sent to ${order.customerInfo.email}`);
      } else {
        console.error('No customer email available for status update.');
      }

    } catch (emailErr) {
      console.error('Failed to send status update email:', emailErr.message);
    }

    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export default router;