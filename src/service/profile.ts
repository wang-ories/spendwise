import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "@spendwise_user_profile";

const FIRST_NAMES = ["Alex", "Jordan", "Charlie", "Taylor", "Morgan", "Skyler"];
const LAST_NAMES = ["Carter", "Rivers", "Knight", "Brooks", "Vance", "Blake"];

export const profileService = {
  // Renommé pour la clarté
  saveProfile: async (firstName: string, lastName: string) => {
    try {
      const data = JSON.stringify({ firstName, lastName });
      await AsyncStorage.setItem(PROFILE_KEY, data);
    } catch (e) {
      console.error("Error saving profile", e);
    }
  },

  getProfile: async () => {
    try {
      const data = await AsyncStorage.getItem(PROFILE_KEY);

      if (data) {
        return JSON.parse(data);
      } else {
        // --- GÉNÉRATION ALÉATOIRE ---
        const randomFirst =
          FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const randomLast =
          LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

        // Sauvegarder immédiatement pour que ça ne change pas au prochain refresh
        const newProfile = { firstName: randomFirst, lastName: randomLast };
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));

        return newProfile;
      }
    } catch (e) {
      console.error("Error loading profile", e);
      return { firstName: "Guest", lastName: "User" };
    }
  },
};
