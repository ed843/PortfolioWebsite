/**
 * Project Data Store
 * This file contains all the project information displayed across the portfolio
 */

// Sample project data - replace with your actual projects
const projectsData = {
  gestura: {
    title: "Gestura",
    heroImage: "../imgs/gestura.webp",
    techStack: [
      { name: "Python", icon: "../imgs/python-icon.svg" },
      { name: "OpenCV", icon: "../imgs/opencv-icon.svg" },
      { name: "TensorFlow", icon: "../imgs/tensorflow-icon.svg" },
      { name: "GCP", icon: "../imgs/gcp-icon.svg" },
    ],
    links: {
      github: "https://github.com/ed843/GesturaUserInterfaceFinal",
      // live: "https://weather-dashboard-demo.ericduncan.dev"
    },
    completionDate: "January 2025",
    overview: `
        <p>Gestura is a smart home hub that enables users to control Kasa smart home devices through intuitive hand gestures.</p>
        <p>Leveraging advanced computer vision and machine learning, Gestura provides a seamless and hands-free way to interact with smart lights, plugs, and other connected devices.</p>
      `,
    features: [
      {
        title: "Gesture Recognition",
        icon: "cloud-sun",
        description: `Control devices with predefined gestures such as "two," "L," or "fist."`,
      },
      {
        title: "Device Management",
        icon: "calendar-days",
        description:
          "Discover and connect to Kasa smart devices like light strips and plugs and manage connected devices with a user-friendly interface.",
      },
      {
        title: "Gesture Linking",
        icon: "map",
        description:
          "Customize gestures to specific device actions, such as turning on/off lights or adjusting brightness.",
      },
      {
        title: "Real-Time Feedback",
        icon: "map-pin",
        description:
          "Visualize recognized gestures on the interface for confirmation.",
      },
      {
        title: "Cross-Device Compatibility",
        icon: "bell",
        description:
          "Supports various Kasa devices, including smart plugs and light strips.",
      },
      {
        title: "Settings and System Info",
        icon: "bar-chart",
        description:
          "Configure application settings for a personalized experience.",
      },
    ],
    architecture: {
      diagram: `
          <img src="../imgs/gestura_architecture.jpg" alt="Gestura Architecture" />
        `,
      description: `
          <p>Gestura employs a modular architecture for scalability and performance:</p>

<p><strong>Frontend (Tkinter):</strong> Provides an intuitive GUI for device management and gesture linking.</p>

<p><strong>Backend (Python):</strong> Handles gesture recognition, device discovery, and control logic.</p>

<p><strong>Machine Learning (TensorFlow):</strong> Processes video input to classify hand gestures.</p>

<p><strong>Device Communication (Kasa API):</strong> Enables interaction with Kasa smart home devices.</p>
        `,
    },
    techStackDetails: [
      {
        name: "Tkinter",
        logo: "../imgs/tkinter-icon.png",
        description:
          "Used for building the interactive UI with component-based architecture in Python.",
      },
      {
        name: "OpenCV",
        logo: "../imgs/opencv-icon.svg",
        description:
          "Allows the frontend to communicate live images from a camera to the backend using socket programming",
      },
      {
        name: "Tensorflow",
        logo: "../imgs/tensorflow-icon.svg",
        description:
          "Used to train the machine learning model for hand gesture recognition",
      },
      {
        name: "Google Cloud Platform",
        logo: "../imgs/gcp-icon.svg",
        description:
          "Hosts the server backend that takes images from the frontend and sends a gesture result",
      },
    ],
    codeHighlight: {
      code: `async def run_check_gesture(gesture_results):
    while True:
        global devices_on_gesture, devices_off_gesture, connected_devices, connected_devices_len
        # Log current connected devices and reverse gesture results for processing
        print(connected_devices_len)
        print(connected_devices)
        gesture_results.reverse()
        devices = await discover_devices()

        # Update smart devices based on their model type
        for ip, device in devices.items():
            if device.model == 'KL400L5(US)':
                device_strip = SmartLightStrip(ip)
                try:
                    await device_strip.update()
                except Exception:
                    pass
            elif device.model == 'EP10(US)':
                device_plug = kasa.SmartPlug(ip)
                try:
                    await device_plug.update()
                except Exception:
                    pass

        # Execute commands based on the latest gesture input
        if gesture_results and devices_on_gesture:
            print("Gesture results:", gesture_results)
            print("Devices on gesture mapping:", devices_on_gesture)
            if gesture_results[0] == devices_on_gesture.get('Light'):
                print("Turning on Light...")
                try:
                    await turn_on(device_strip)
                except Exception:
                    print("Failed to change state for Light")
            elif gesture_results[0] == devices_on_gesture.get('Plug1'):
                print("Turning on Plug1...")
                try:
                    await turn_on(device_plug)
                except Exception:
                    print("Failed to change state for Plug1")
            elif gesture_results[0] == devices_off_gesture.get('Light'):
                print("Turning off Light...")
                try:
                    await turn_off(device_strip)
                except Exception:
                    print("Failed to change state for Light")
            elif gesture_results[0] == devices_off_gesture.get('Plug1'):
                print("Turning off Plug1...")
                try:
                    await turn_off(device_plug)
                except Exception:
                    print("Failed to change state for Plug1")
            else:
                print("No matching gesture result")
        await asyncio.sleep(1)
`,
      description: `In this code, the function:

Continuously polls for updated connected device information: It calls the asynchronous device discovery function and updates each device based on its model.

Processes gesture results: It checks if the latest gesture (after reversing the list for priority) matches a predefined mapping for turning devices on or off.

Executes device commands: Depending on the gesture detected, it calls asynchronous functions like turn_on() or turn_off() to control the devices accordingly.
        `,
    },
    challenges: [
      {
        title: "API Rate Limiting",
        description:
          "The OpenWeather API has strict rate limits that could be easily exceeded with multiple users requesting frequent updates.",
        solution:
          "Implemented a multi-level caching strategy, with Redis for server-side caching and a custom hook for client-side caching. This reduced API calls by approximately 85% during peak usage periods.",
      },
      {
        title: "Responsive Weather Maps",
        description:
          "Creating interactive weather maps that worked well across device sizes while maintaining performance proved challenging.",
        solution:
          "Used a combination of SVG for core map elements and Canvas for weather data overlays. Implemented progressive enhancement to reduce detail on smaller screens and boost performance.",
      },
      {
        title: "Real-time Alert System",
        description:
          "Developing a system to monitor weather conditions and trigger alerts without excessive server load was complex.",
        solution:
          "Built a worker-based architecture using Node.js worker threads that efficiently polls weather data for monitored locations and uses WebSockets to push alerts to clients in real-time.",
      },
    ],
    gallery: [
      {
        image: "../imgs/projects/weather-dashboard-1.jpg",
        caption: "Main dashboard view showing current conditions and forecast",
      },
      {
        image: "../imgs/projects/weather-dashboard-2.jpg",
        caption: "Interactive weather map with precipitation overlay",
      },
      {
        image: "../imgs/projects/weather-dashboard-3.jpg",
        caption: "Historical temperature comparison chart",
      },
      {
        image: "../imgs/projects/weather-dashboard-4.jpg",
        caption: "Location management interface",
      },
      {
        image: "../imgs/projects/weather-dashboard-5.jpg",
        caption: "Mobile view of the dashboard",
      },
      {
        image: "../imgs/projects/weather-dashboard-6.jpg",
        caption: "Alert configuration screen",
      },
    ],
    learningOutcomes: [
      {
        icon: "📊",
        text: "Deepened my understanding of data visualization techniques and best practices for presenting complex meteorological data in an intuitive way.",
      },
      {
        icon: "⚡",
        text: "Mastered advanced caching strategies to optimize API usage and improve application performance under varying load conditions.",
      },
      {
        icon: "📱",
        text: "Refined responsive design skills to create truly device-agnostic interfaces that maintain functionality across screen sizes.",
      },
      {
        icon: "🔄",
        text: "Gained practical experience with real-time data synchronization and update mechanisms using WebSockets and polling strategies.",
      },
    ],
    futureImprovements: [
      {
        title: "Machine Learning Weather Predictions",
        description:
          "Integrate a machine learning model to provide hyperlocal precipitation predictions based on historical patterns and current conditions.",
      },
      {
        title: "Expanded Alert Options",
        description:
          "Add more granular alert options including UV index warnings, pollen count alerts for allergy sufferers, and severe weather emergency notifications.",
      },
      {
        title: "Offline Mode",
        description:
          "Implement comprehensive offline functionality using Service Workers to allow basic app usage without an internet connection.",
      },
      {
        title: "Weather-based Recommendations",
        description:
          "Develop a system that provides activity and clothing recommendations based on current and forecasted weather conditions.",
      },
    ],
  },

  "task-master": {
    title: "TaskMaster Project Management",
    heroImage: "../imgs/projects/taskmaster-hero.jpg",
    techStack: [
      { name: "Vue.js", icon: "../imgs/tech/vue.svg" },
      { name: "Firebase", icon: "../imgs/tech/firebase.svg" },
      { name: "Vuetify", icon: "../imgs/tech/vuetify.svg" },
      { name: "Jest", icon: "../imgs/tech/jest.svg" },
    ],
    links: {
      github: "https://github.com/ed843/taskmaster",
      live: "https://taskmaster-demo.ericduncan.dev",
    },
    completionDate: "November 2024",
    // Additional project details would go here
  },

  "budget-buddy": {
    title: "Budget Buddy Finance Tracker",
    heroImage: "../imgs/projects/budget-buddy-hero.jpg",
    techStack: [
      { name: "Angular", icon: "../imgs/tech/angular.svg" },
      { name: "TypeScript", icon: "../imgs/tech/typescript.svg" },
      { name: "Google Cloud", icon: "../imgs/tech/gcp.svg" },
      { name: "D3.js", icon: "../imgs/tech/d3.svg" },
    ],
    links: {
      github: "https://github.com/ed843/budget-buddy",
      live: "https://budget-buddy-demo.ericduncan.dev",
    },
    completionDate: "August 2024",
    // Additional project details would go here
  },
};

// Export the data
if (typeof module !== "undefined" && module.exports) {
  module.exports = { projectsData };
}
