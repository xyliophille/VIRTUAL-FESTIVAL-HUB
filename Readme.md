# Virtual Festival Hub 🎪

A React-based web application that provides an immersive virtual platform for experiencing cultural festivals through Google Meet integration. The platform allows users to browse festivals, join virtual meetings, learn about cultural traditions, and connect with others globally.

## 🌟 Features

### Core Functionality

- **Virtual Festival Experience**: Browse and join cultural festivals from around the world
- **Google Meet Integration**: Seamless integration for live virtual celebrations
- **AI Assistant**: Built-in Gemini AI assistant ("Ask With Riry") for platform guidance
- **Team Collaboration**: Meet the development team behind the platform
- **Responsive Design**: Optimized for various devices and screen sizes

### Technical Features

- **React Hooks**: useState, useEffect, useRef for state management
- **GSAP Animations**: Smooth animations and transitions
- **Real-time Chat**: AI-powered chat interface with fallback responses
- **Dynamic Content**: Backend-connected festival data
- **Interactive UI**: Hover effects and engaging user interactions

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 5001

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd virtual-festival-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   VITE_BACKEND=http://localhost:5001
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Start the backend server**
   ```bash
   # In a separate terminal, navigate to backend directory
   cd backend
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── App.js                 # Main application component
├── App.css               # Styling for the application
├── components/           # React components
│   └── GeminiAssistant.js # AI chat assistant component
└── assets/              # Static assets (images, etc.)
```

## 🎯 Key Components

### App Component

- Main application container
- Festival data fetching and management
- Google Meet integration
- Team information display
- Navigation and routing

### GeminiAssistant Component

- AI-powered chat interface
- Backend API integration with fallback responses
- Quick action suggestions
- Real-time messaging

## 🔧 API Endpoints

### Backend Integration

- `GET /api/festivals` - Fetch festival data
- `POST /api/create-meeting` - Create Google Meet sessions
- `POST /api/chat` - AI chat responses

## 🎨 UI/UX Features

### Navigation

- Static navigation bar with smooth scrolling
- Active section highlighting
- Responsive design

### Animations

- GSAP-powered page load animations
- Hover effects on cards and team members
- Smooth transitions and micro-interactions

### Chat Interface

- Floating action button with animation
- Modal chat window
- Typing indicators
- Quick action buttons

## 🤖 AI Assistant Capabilities

The Gemini AI assistant can help with:

- Festival information and joining procedures
- Google Meet integration support
- Platform navigation guidance
- Team information
- Technical support

### Fallback Responses

Intelligent fallback responses when backend is unavailable, covering:

- Festival-related queries
- Google Meet troubleshooting
- Platform features
- Team information
- Navigation help

## 👥 Team Section

Displays information about Team Innovators:

- Team lead and members
- Roles and responsibilities
- Social media links (GitHub, LinkedIn)
- Professional bios

## 🛠️ Technologies Used

### Frontend

- **React** - UI framework
- **GSAP** - Animation library
- **Axios** - HTTP client
- **CSS3** - Styling and responsive design

### Backend Integration

- RESTful API communication
- Google Meet API integration
- Real-time chat functionality

## 🎪 Festival Features

- Dynamic festival cards with descriptions
- Date information and cultural details
- Direct Google Meet joining
- Learn more functionality

## 🔄 State Management

- Loading states for API calls
- Error handling and user feedback
- Meet status tracking
- Chat message history
- UI state management

## 📱 Responsive Design

- Mobile-friendly interface
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## 🚨 Error Handling

- Connection error recovery
- API fallback mechanisms
- User-friendly error messages
- Retry functionality

## 🔮 Future Enhancements

Potential improvements:

- User authentication
- Festival creation tools
- Enhanced video integration
- Multi-language support
- Advanced analytics
- Social features

## 📄 License

This project is part of the Virtual Festival Hub platform developed by Team Innovators.

---

**Built with ❤️ by Team Innovators**
