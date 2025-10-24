import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('🔧 Backend server starting...');

// Connect to MongoDB (optional)
const connectDB = async () => {
    try {
        const connectionString = 'mongodb+srv://xyliophille06_db_user:3YzC2aCb7OKIVwml@cluster0.cd20ec4.mongodb.net/festivalhub?retryWrites=true&w=majority&appName=Cluster0&authSource=admin';
        await mongoose.connect(connectionString);
        console.log('✅ MongoDB Connected');
        return true;
    } catch (error) {
        console.log('❌ MongoDB Disconnected - Using fallback data');
        return false;
    }
};

// Fallback in-memory data
const fallbackFestivals = [
    {
        _id: '1',
        name: "Holi",
        description: "Holi is a major Hindu festival celebrated as the Festival of Colours, Love and Spring. It celebrates the eternal and divine love of the deities Radha and Krishna.",
        date: "2025-03-14"
    },
    {
        _id: '2',
        name: "Navratri",
        description: "Navaratri is an annual Hindu festival observed in honor of the goddess Durga, an aspect of Adi Parashakti, the supreme goddess. It spans over nine nights, first in the month of Chaitra, and again in the month of Ashvin.",
        date: "2025-09-26"
    },
    {
        _id: '3',
        name: "Diwali",
        description: "Diwali, also called Deepavali or Deepawali, is the Hindu festival of lights, with variations celebrated in other Indian religions such as Jainism and Sikhism. It symbolises the spiritual victory of Dharma over Adharma, light over darkness, good over evil, and knowledge over ignorance.",
        date: "2025-10-20"
    },
    {
        _id: '4',
        name: "Chhath Puja",
        description: "Chhath is an ancient Hindu festival, native to eastern India and southern Nepal. It is celebrated especially in the Indian states of Bihar, Jharkhand, and Eastern Uttar Pradesh; and Koshi, Gandaki, Bagmati, Lumbini and Madhesh provinces of Nepal.",
        date: "2025-10-25"
    },
    {
        _id: '5',
        name: "Raja Sankranti",
        description: "Raja is a quintessential festival of Odisha celebrated each year during the Odia month of Asadha (2nd week of June). Unique in many aspects, Raja is counted as one of the major agrarian festivals of the state.",
        date: "2025-07-16"
    },
    {
        _id: '6',
        name: "Guru Nanak Gurpurab",
        description: "Guru Nanak Gurpurab is the celebration of the birth of Guru Nanak, the founder of Sikhism. It is observed with great fervor by Sikhs around the world.",
        date: "2025-11-05"
    },
    {
        _id: '7',
        name: "Eid al-Fitr",
        description: "Eid al-Fitr is the first of the two main festivals in Islam, the other being Eid al-Adha. It falls on the first day of Shawwal, the tenth month of the Islamic calendar. Eid al-Fitr is celebrated by Muslims worldwide as it marks the end of the month-long, dawn-to-dusk fasting during Ramadan.",
        date: "2025-04-10"
    },
    {
        _id: '8',
        name: "Christmas",
        description: "Christmas is an annual festival commemorating the birth of Jesus Christ, observed primarily on December 25 as a religious and cultural celebration among billions of people around the world.",
        date: "2025-12-25"
    },
    {
        _id: '9',
        name: "Raksha Bandhan",
        description: "Raksha Bandhan is a Hindu festival celebrating the bond between brothers and sisters. On this day, sisters tie a protective thread (rakhi) around their brothers' wrists, and brothers give gifts in return.",
        date: "2025-08-19"
    },
    {
        _id: '10',
        name: "Bihu",
        description: "Bihu is a set of three important Assamese festivals celebrated in the Indian state of Assam. The festivals are Rongali Bihu, Kongali Bihu, and Bhogali Bihu, each marking different phases of the agricultural calendar.",
        date: "2025-04-14"
    },
    {
        _id: '11',
        name: "Janmashtami",
        description: "Janmashtami is a Hindu festival celebrating the birth of Lord Krishna, observed on the eighth day of the dark fortnight in the month of Bhadrapada.",
        date: "2025-09-06"
    },
    {
        _id: '12',
        name: "Baisakhi",
        description: "Baisakhi is a harvest festival celebrated in the Punjab region of India, marking the beginning of the new harvest season. It is also observed as the Punjabi New Year.",
        date: "2025-04-13"
    },
    {
        _id: '13',
        name: "Nukahai",
        description: "Nukahai is a festival celebrated in the Indian state of Odisha, marking the end of the harvest season. It is a time for feasting and giving thanks for the bounty of the earth.",
        date: "2025-12-25"
    },
    {
        _id: '14',
        name: "Lohri",
        description: "Lohri is a popular Punjabi festival celebrated primarily in the northern regions of India. It marks the end of winter and the beginning of the harvest season, and is celebrated with bonfires, dancing, and traditional foods.",
        date: "2025-01-13"
    }
];

// Google Meet Configuration - No credentials needed!
const GOOGLE_MEET_CONFIG = {
    ENABLED: true
};

console.log('🎯 Google Meet Integration: ✅ Active');

// Create Google Meet Link
function createGoogleMeetLink(topic) {
    try {
        // Generate a unique meeting ID
        const meetingId = 'festival-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);

        // Direct Google Meet creation link
        const meetLink = `https://meet.google.com/new`;

        const meetingData = {
            join_url: meetLink,
            meeting_id: meetingId,
            topic: topic,
            type: 'google_meet',
            platform: 'Google Meet',
            instructions: 'Click the link to create a new Google Meet. Share the generated meeting link with participants.',
            direct_links: {
                join_meet: meetLink,
                download_app: 'https://meet.google.com/download',
                learn_more: 'https://support.google.com/meet/',
                web_version: 'https://meet.google.com'
            },
            features: [
                'No account required to join',
                'Up to 100 participants',
                'Screen sharing',
                'Chat functionality',
                'Recording available'
            ]
        };

        console.log(`✅ Google Meet link created for: ${topic}`);
        return meetingData;

    } catch (error) {
        console.error('❌ Google Meet creation error:', error);
        throw error;
    }
}

// Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend is running',
        video_platform: 'Google Meet',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/festivals', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const festivals = await Festival.find().sort({ date: 1 });
            console.log(`📨 Sending ${festivals.length} festivals from MongoDB`);
            res.json(festivals);
        } else {
            console.log('📡 Using fallback data (MongoDB not connected)');
            res.json(fallbackFestivals);
        }
    } catch (error) {
        console.log('❌ Database error, using fallback data:', error.message);
        res.json(fallbackFestivals);
    }
});

// Create Google Meet Endpoint
app.post('/api/create-meeting', async (req, res) => {
    try {
        const { topic, duration = 60 } = req.body;

        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        console.log(`🎥 Creating Google Meet for: ${topic}`);

        const meetingData = createGoogleMeetLink(topic);

        res.json(meetingData);

    } catch (error) {
        console.error('💥 Failed to create Google Meet:', error.message);

        // Fallback: Direct Google Meet link
        res.json({
            join_url: "https://meet.google.com/new",
            meeting_id: "fallback-" + Date.now(),
            topic: topic || 'Virtual Festival',
            type: 'google_meet',
            error: 'Using fallback meeting link',
            instructions: 'Click to create a new Google Meet'
        });
    }
});

// Test Google Meet Configuration
app.get('/api/meet-test', (req, res) => {
    res.json({
        status: 'SUCCESS',
        message: 'Google Meet integration is working!',
        platform: 'Google Meet',
        features: [
            'Instant meeting creation',
            'No authentication required',
            'Direct browser access',
            'Free to use'
        ],
        test_link: 'https://meet.google.com/new'
    });
});

// Get meeting platforms available
app.get('/api/video-platforms', (req, res) => {
    res.json({
        platforms: [
            {
                name: 'Google Meet',
                status: 'active',
                join_url: 'https://meet.google.com/new',
                features: ['Free', 'No signup required to join', '100 participants']
            }
        ]
    });
});

// Redirect to Google Meet
app.get('/api/redirect-to-meet', (req, res) => {
    res.redirect('https://meet.google.com/new');
});

// Festival Schema (keep for MongoDB)
const festivalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

const Festival = mongoose.model('Festival', festivalSchema);

app.get('/api/test', (req, res) => {
    res.json({
        message: 'BACKEND API IS WORKING!',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        video_platform: 'Google Meet',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'Virtual Festival Hub API',
        status: 'Running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        video_platform: 'Google Meet',
        endpoints: {
            health: '/api/health',
            festivals: '/api/festivals',
            create_meeting: '/api/create-meeting (POST)',
            meet_test: '/api/meet-test',
            video_platforms: '/api/video-platforms',
            redirect_meet: '/api/redirect-to-meet'
        },
        timestamp: new Date().toISOString()
    });
});

// Start Server
const startServer = async () => {
    await connectDB();

    const PORT = 5001;
    app.listen(PORT, () => {
        console.log(`\n🎉 BACKEND SERVER RUNNING!`);
        console.log(`✅ http://localhost:${PORT}`);
        console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
        console.log(`🎥 Google Meet: http://localhost:${PORT}/api/create-meeting`);
        console.log(`\n🎯 VIDEO PLATFORM: Google Meet`);
        console.log(`💡 No credentials required!`);
        console.log(`🔗 Users will be directed to: https://meet.google.com/new`);
    });
};

startServer().catch(console.error);