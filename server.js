const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Database Storage (In-memory for prototype)
let orders = [];
let otpStorage = {}; // Temporary storage for phone -> OTP mapping

// ================= 1. SEND OTP ENDPOINT =================
app.post('/api/send-otp', (req, res) => {
    const { phone } = req.body;
    
    if (!phone || phone.length < 10) {
        return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    // Generate a mock 4-digit OTP (In production, use Twilio / MSG91 here)
    const mockOtp = '1234'; 
    otpStorage[phone] = mockOtp;

    console.log(`[SMS Gateway Mock] OTP for ${phone}: ${mockOtp}`);

    res.json({ 
        success: true, 
        message: 'OTP sent successfully',
        // Returning mockOtp for easy testing in development
        debugOtp: mockOtp 
    });
});

// ================= 2. VERIFY OTP ENDPOINT =================
app.post('/api/verify-otp', (req, res) => {
    const { phone, otp } = req.body;

    if (otpStorage[phone] && otpStorage[phone] === otp) {
        // Clear OTP after successful verification
        delete otpStorage[phone];
        return res.json({ 
            success: true, 
            token: 'mock-jwt-session-token-xyz',
            message: 'Authentication successful' 
        });
    }

    res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
});

// ================= 3. GET MENU & BANNERS ENDPOINT =================
app.get('/api/menu', (req, res) => {
    const restaurantMenu = {
        restaurantName: "Spice Junction",
        tableNumber: req.query.table || "1",
        banners: [
            {
                id: 1,
                title: "Get 20% OFF on Starters!",
                code: "YUMMY20",
                bgColor: "from-orange-500 to-amber-500"
            }
        ],
        categories: [
            {
                categoryName: "Popular Dishes",
                items: [
                    { id: 101, name: "Paneer Tikka Sizzler", price: 12.99, description: "Spicy grilled cottage cheese served with veggies." },
                    { id: 102, name: "Chicken Alfredo Pasta", price: 15.49, description: "Creamy garlic pasta with grilled chicken slices." }
                ]
            }
        ]
    };

    res.json({ success: true, data: restaurantMenu });
});

// ================= 4. PLACE ORDER ENDPOINT =================
app.post('/api/orders', (req, res) => {
    const { tableNumber, items, totalAmount, customerPhone } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const newOrder = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        tableNumber: tableNumber || "Unknown",
        customerPhone,
        items, // Contains item name, price, and kitchen notes!
        totalAmount,
        status: 'Received',
        createdAt: new Date()
    };

    orders.push(newOrder);
    console.log("New Order Received:", JSON.stringify(newOrder, null, 2));

    res.status(201).json({ 
        success: true, 
        message: 'Order placed successfully and sent to kitchen display!',
        orderId: newOrder.orderId 
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});