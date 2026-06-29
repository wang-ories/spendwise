# SpendWise 💰

A modern, mobile-first expense tracking app built with **Expo** and **React Native**. SpendWise helps you manage your budget, track spending, and gain insights into your financial habits with an intuitive and visually appealing interface.

---

## 📸 Features & Visual Screens

### 🏠 **Dashboard (Home Screen)**

The main hub of the app where users can view:

- **Budget Overview**: Visual display of total spending vs. budget limit with a circular gauge
- **User Profile**: Personalized greeting with the user's name
- **Quick Actions**: Grid of action buttons for common tasks
- **Recent Transactions**: List of the latest expenses with store name, date, and amount
- **Pull-to-Refresh**: Reload data to see the latest budget and transaction updates

**Visual Elements:**

- Clean header with user greeting
- Budget card with color-coded spending indicator
- Transaction items showing store icon, store name, date, and price
- Refresh control for updating data

### 📊 **Transactions Tab**

Browse and manage all your transactions in one place:

- List view of all recorded expenses
- Sort and filter capabilities
- Detailed expense information including category, amount, and date

### ➕ **Add Product Tab**

Quick expense entry interface:

- Input fields for expense amount, store/category name
- Easy form submission to add new expenses
- Camera integration for receipt scanning (with Expo Camera)

### 📸 **Scan Tab**

Capture receipts and extract expense data:

- Receipt photo capture using device camera
- OCR integration to extract expense details (future enhancement)
- Quick entry of scanned expenses

### 🏦 **Vault Tab**

Secure storage and archival:

- Store archived receipts and transaction records
- Historical expense data review
- Export functionality (future enhancement)

### 📈 **Analytics/Insights Tab**

Visual spending analysis:

- Charts showing spending trends over time
- Category breakdowns
- Budget vs. actual spending comparison
- Monthly/weekly analytics views

---

## 🛠️ Tech Stack

| Category             | Technology                                 |
| -------------------- | ------------------------------------------ |
| **Framework**        | [Expo](https://expo.dev) (v55.0.0+)        |
| **Mobile Framework** | React Native                               |
| **Language**         | TypeScript                                 |
| **Router**           | Expo Router (file-based routing)           |
| **State Management** | React Hooks (useState, useEffect)          |
| **Storage**          | AsyncStorage (local data persistence)      |
| **UI Components**    | React Native built-ins + Expo Vector Icons |
| **Styling**          | React Native StyleSheet                    |
| **Code Formatting**  | Prettier                                   |
| **Vector Icons**     | Ionicons (@expo/vector-icons)              |

### Optional Dependencies

- **expo-camera**: For receipt photo capture
- **react-native-svg**: For custom graphics and charts
- **@react-native-async-storage/async-storage**: For persistent local storage

---

## 📁 Project Structure

```
spendtrack/
├── src/
│   ├── app/                          # Expo Router app directory
│   │   ├── _layout.tsx              # Root layout with stack navigation
│   │   ├── (tabs)/                  # Tab-based route group
│   │   │   ├── _layout.tsx          # Tab navigation setup
│   │   │   ├── index.tsx            # Dashboard/Home screen
│   │   │   ├── transactions.tsx     # Transactions screen
│   │   │   ├── add-product.tsx      # Add expense screen
│   │   │   ├── scan.tsx             # Receipt scan screen
│   │   │   ├── vault.tsx            # Vault/archive screen
│   │   │   └── analytics.tsx        # Analytics/insights screen
│   ├── components/                  # Reusable React components
│   │   ├── BudgetCard.tsx           # Budget display component
│   │   ├── BudgetModal.tsx          # Budget edit modal
│   │   ├── DashboardHeader.tsx      # Dashboard header component
│   │   ├── QuickActions.tsx         # Quick action buttons
│   │   ├── ButtonAction.tsx         # Action button component
│   │   └── ExpenseList.tsx          # Expense list component
│   ├── service/                     # Business logic & API services
│   │   ├── profile.ts               # User profile management
│   │   ├── expense.ts               # Expense/budget service
│   │   └── storageKeys.ts           # Storage key constants
│   ├── styles/                      # Styling & theme
│   │   └── theme.ts                 # Global theme colors & styles
│   └── constants/                   # App constants
│       └── StorageKeys.ts           # AsyncStorage key definitions
├── assets/                          # Static assets
│   ├── expo.icon/                   # App icon
│   └── images/                      # Images & illustrations
├── app.json                         # Expo app configuration
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Expo CLI** (optional, but recommended)
- **iOS Simulator** or **Android Emulator**, or **Expo Go** app on a physical device

### Installation

1. **Clone or navigate to the project:**

   ```bash
   cd spendtrack
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npx expo start
   ```

4. **Open in a device or emulator:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan the QR code with **Expo Go** on your phone

---

## 📱 Key Features Explained

### Budget Management

- Set and track monthly budget limits
- Visual gauge showing current spending vs. budget
- Real-time budget updates with pull-to-refresh

### User Profiles

- Personalized user profiles with first and last name
- Auto-generated random user data on first app launch
- Persistent profile storage using AsyncStorage

### Expense Tracking

- Add expenses with store name and amount
- View transaction history with timestamps
- Budget breakdown by spending category (future)

### Theming

- Dark and light theme support
- Consistent color scheme across the app
- Easy theme customization in `src/styles/theme.ts`

---

## 🎨 Theme Configuration

The app uses a centralized theme system. Update colors and styling in [src/styles/theme.ts](src/styles/theme.ts):

```typescript
export const themes = {
  primary: "#069a5f", // Main brand color (green)
  background: "#1a1a2e", // Dark background
  surface: "#16213e", // Card/surface color
  header: "#0f3460", // Header background
  text: "#ffffff", // Primary text color
  textSecondary: "#a0a0b0", // Secondary text color
};
```

---

## 🔧 Available Scripts

| Command                         | Description                |
| ------------------------------- | -------------------------- |
| `npm start` or `npx expo start` | Start the Expo dev server  |
| `npm run ios`                   | Run on iOS Simulator       |
| `npm run android`               | Run on Android Emulator    |
| `npx prettier --write .`        | Format code with Prettier  |
| `npx expo lint`                 | Run ESLint (if configured) |

---

## 📦 Dependencies

### Core Dependencies

- `react`: UI framework
- `react-native`: Mobile framework
- `expo`: Development platform
- `expo-router`: File-based routing
- `typescript`: Type safety

### UI & Icons

- `@expo/vector-icons`: Icon library (Ionicons)
- `react-native-safe-area-context`: Safe area handling

### Storage

- `@react-native-async-storage/async-storage`: Local data persistence

### Optional

- `expo-camera`: Camera access for receipt scanning
- `react-native-svg`: Vector graphics

See `package.json` for the complete list of dependencies and versions.

---

## 📝 Data Persistence

SpendWise uses **AsyncStorage** for local data persistence:

- User profile information
- Budget data and spending records
- Transaction history
- App preferences

Data keys are defined in [src/constants/StorageKeys.ts](src/constants/StorageKeys.ts) for consistency.

---

## 🎯 Roadmap & Future Enhancements

- [ ] Receipt OCR integration for automatic expense extraction
- [ ] Category-based expense filtering and reporting
- [ ] Monthly/yearly spending analytics with charts
- [ ] Budget alerts and notifications
- [ ] Multi-user support and data sync
- [ ] Cloud backup and restore
- [ ] Export reports (PDF, CSV)
- [ ] Dark mode improvements
- [ ] Expense recurrence/recurring bills
- [ ] Integration with banking APIs

---

## 🐛 Troubleshooting

### Issue: "Port 8081 is already in use"

**Solution:** Choose a different port or kill the process using port 8081:

```bash
npx expo start --clear
```

### Issue: Module not found errors

**Solution:** Ensure all imports use the correct alias:

- `@/` refers to the `src/` directory
- Check `tsconfig.json` for path mappings

### Issue: AsyncStorage data not persisting

**Solution:** Ensure the app isn't being force-closed. Data persists locally on the device/emulator.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Create a new branch for your feature
2. Make your changes and commit with clear messages
3. Format code with Prettier: `npx prettier --write .`
4. Push to your branch and create a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 👨‍💻 Authors

- **Wang Lee** - Project creator and maintainer

---

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository or contact the development team.

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development platform
- [React Native](https://reactnative.dev) for the mobile framework
- [Ionicons](https://ionic.io/ionicons) for beautiful icons
- Community feedback and contributions

---

**Happy budgeting with SpendWise! 🎉**
