// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, TextInput, StyleSheet, TouchableOpacity, 
//   Alert, Image, PermissionsAndroid, Platform
// } from "react-native";
// import axios from "axios";
// import { launchImageLibrary } from "react-native-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dndtvek2i/image/upload";
// const CLOUDINARY_UPLOAD_PRESET = "mechanixhub_preset";
// const API_URL = "http://10.0.2.2:5000/api/vehicleowner/profile"; // Update with correct endpoint

// const VehicleOwnerProfileSetupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     vehicleType: "",
//     profileImage: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     vehicleType: "",
//     profileImage: "",
//   });

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         navigation.replace("AfLogin");
//       }
//     };
//     checkAuth();
//   }, []);

//   const handleChange = (field: string, value: string) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const requestStoragePermission = async () => {
//     if (Platform.OS === "android") {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert("Permission Denied", "You need to allow access to your photos.");
//           return false;
//         }
//       } catch (err) {
//         console.warn("Permission error:", err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const selectImage = async () => {
//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) return;

//     launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response: any) => {
//       if (response.didCancel) return;
//       if (response.errorMessage) {
//         Alert.alert("Error", "Failed to select image");
//         return;
//       }

//       if (response.assets && response.assets.length > 0) {
//         const image = response.assets[0];
//         uploadImage(image.uri);
//       }
//     });
//   };

//   const uploadImage = async (imageUri: string) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", { uri: imageUri, type: "image/jpeg", name: "profile.jpg" });
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//       const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.secure_url) {
//         setProfile((prev) => ({ ...prev, profileImage: res.data.secure_url }));
//       } else {
//         Alert.alert("Error", "Image upload failed");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Image upload failed");
//     }
//   };

//   const handleSaveProfile = async () => {
//     let newErrors = {
//       name: profile.name.trim() ? "" : "Full Name is required",
//       email: profile.email.trim() ? "" : "Email is required",
//       phone: profile.phone.trim() ? "" : "Phone Number is required",
//       vehicleType: profile.vehicleType.trim() ? "" : "Vehicle Type is required",
//       profileImage: profile.profileImage ? "" : "Profile Image is required",
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((error) => error !== "")) {
//       return;
//     }

//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         console.error("❌ No auth token found");
//         return;
//       }

//       const response = await axios.post(API_URL, {
//         name: profile.name,
//         email: profile.email,
//         phone: profile.phone,
//         vehicleType: profile.vehicleType,
//         profileImage: profile.profileImage,
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//       });

//       Alert.alert("Success", "Profile created successfully!");
//       navigation.navigate("VehicleOwnerHome");

//     } catch (error) {
//       Alert.alert("Error", "Failed to create profile");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create Vehicle Owner Profile</Text>

//       <TextInput 
//         placeholder="Full Name" 
//         style={styles.input} 
//         onChangeText={(text) => handleChange("name", text)} 
//       />
//       {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

//       <TextInput 
//         placeholder="Email" 
//         style={styles.input} 
//         keyboardType="email-address" 
//         onChangeText={(text) => handleChange("email", text)} 
//       />
//       {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

//       <TextInput 
//         placeholder="Phone Number" 
//         style={styles.input} 
//         keyboardType="phone-pad" 
//         onChangeText={(text) => handleChange("phone", text)} 
//       />
//       {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

//       <TextInput 
//         placeholder="Vehicle Type (e.g. Sedan, SUV, Truck)" 
//         style={styles.input} 
//         onChangeText={(text) => handleChange("vehicleType", text)} 
//       />
//       {errors.vehicleType ? <Text style={styles.errorText}>{errors.vehicleType}</Text> : null}

//       <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
//         <Text style={styles.buttonText}>Select Profile Image</Text>
//       </TouchableOpacity>
//       {errors.profileImage ? <Text style={styles.errorText}>{errors.profileImage}</Text> : null}

//       {profile.profileImage ? (
//         <Image source={{ uri: profile.profileImage }} style={styles.imagePreview} />
//       ) : null}

//       <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
//         <Text style={styles.buttonText}>Save Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
//   header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
//   input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, fontSize: 16, borderWidth: 1, borderColor: "#ddd" },
//   imageButton: { backgroundColor: "#28A745", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
//   button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
//   buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   imagePreview: { width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginTop: 10 },
//   errorText: { color: "red", fontSize: 14, marginBottom: 5 },
// });

// export default VehicleOwnerProfileSetupScreen;

import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  Alert, Image
} from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dndtvek2i/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "mechanixhub_preset";
const API_URL = "http://10.0.2.2:5000/api/vehicleowner/profile"; 

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  vehicleModel: string;
  vehicleNumber: string;
  profileImage?: string; // ✅ Marked as optional to allow undefined
}

interface Errors {
  name: string;
  email: string;
  phone: string;
  vehicleModel: string;
  vehicleNumber: string;
  profileImage: string;
}

const EditProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    vehicleModel: "",
    vehicleNumber: "",
    profileImage: undefined, // ✅ Explicitly set undefined initially
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    phone: "",
    vehicleModel: "",
    vehicleNumber: "",
    profileImage: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      
      if (!token) {
        navigation.replace("AfLogin");
      }
    };
    checkAuth();
  }, []);

  // ✅ Ensure string type for handleChange
  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value || "" })); // Ensure it's always a string
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const selectImage = async () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        console.log("Error selecting image:", response.errorMessage);
        Alert.alert("Error", "Failed to select image");
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        if (image.uri) {
          uploadImage(image.uri);
        }
      }
    });
  };

  // ✅ Ensure string type for uploadImage
  const uploadImage = async (imageUri: string | undefined) => {
    if (!imageUri) {
      Alert.alert("Error", "Invalid image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", { uri: imageUri, type: "image/jpeg", name: "profile.jpg" });
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.secure_url) {
        setProfile((prev) => ({ ...prev, profileImage: res.data.secure_url }));
      } else {
        console.log(res.data);
        Alert.alert("Error", "Image upload failed");
      }
    } catch (error) {
      Alert.alert("Error", "Image upload failed");
    }
  };

  const handleSaveProfile = async () => {
    let newErrors: Errors = {
      name: profile.name.trim() ? "" : "Full Name is required",
      email: profile.email.trim() ? "" : "Email is required",
      phone: profile.phone.trim() ? "" : "Phone Number is required",
      vehicleModel: profile.vehicleModel.trim() ? "" : "Vehicle Model is required",
      vehicleNumber: profile.vehicleNumber.trim() ? "" : "Vehicle Number is required",
      profileImage: profile.profileImage ? "" : "Profile Image is required",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("❌ No auth token found");
        return;
      }

      await axios.post(API_URL, {
        ...profile,
        profileImage: profile.profileImage || "", // ✅ Ensures a valid string is sent
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      
      Alert.alert("Success", "Profile updated successfully!");
      // navigation.navigate("VehicleOwnerHome");
      navigation.replace("VehicleOwnerTabs", { screen: "Profile", refresh: Date.now() });
    } catch (error) {
      console.log('error in edit profile',error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit the Profile </Text>
      <TextInput placeholder="Full Name" style={styles.input} onChangeText={(text) => handleChange("name", text)} value={profile.name || ""} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={(text) => handleChange("email", text)} value={profile.email || ""} />
      <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" onChangeText={(text) => handleChange("phone", text)} value={profile.phone || ""} />
      <TextInput placeholder="Vehicle Model" style={styles.input} onChangeText={(text) => handleChange("vehicleModel", text)} value={profile.vehicleModel || ""} />
      <TextInput placeholder="Vehicle Number" style={styles.input} onChangeText={(text) => handleChange("vehicleNumber", text)} value={profile.vehicleNumber || ""} />
      <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Profile Image</Text>
      </TouchableOpacity>
      {profile.profileImage ? <Image source={{ uri: profile.profileImage }} style={styles.imagePreview} /> : null}
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, fontSize: 16, borderWidth: 1, borderColor: "#ddd" },
  imageButton: { backgroundColor: "#28A745", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  imagePreview: { width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginTop: 10 },
});

export default EditProfileScreen;
