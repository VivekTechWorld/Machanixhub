// import React, { useState } from "react";
// import { 
//   View, Text, TextInput, StyleSheet, TouchableOpacity, 
//   Alert, Image, PermissionsAndroid, Platform 
// } from "react-native";
// import axios from "axios";
// import { launchImageLibrary } from "react-native-image-picker";

// // const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dndtvek2i/662173251784212";
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dndtvek2i/image/upload";

// const CLOUDINARY_UPLOAD_PRESET = "mechanixhub_preset";
// const API_URL = "http://10.0.2.2:5000/api/mechanic/Profile"; // Backend API URL

// const MechanicProfileSetupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [profile, setProfile] = useState({
//     name: "",
//     specialization: "",
//     experience: "",
//     phone: "",
//     location: "",
//     profileImage: "",
//   });

//   // Handle text input changes
//   const handleChange = (field: string, value: string) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   // Request Storage Permission (Required for Android 10+)
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

//   // Open Image Picker
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

//   // Upload Image to Cloudinary
//   const uploadImage = async (imageUri: string) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", { uri: imageUri, type: "image/jpeg", name: "profile.jpg" });
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//       const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Upload response:", res.data);
//       if (res.data.secure_url) {
//         setProfile((prev) => ({ ...prev, profileImage: res.data.secure_url }));
//       } else {
//         console.error("Failed to upload image");
//         throw new Error("Failed to upload image");
//       }
//     } catch (error) {
//       console.error("Image upload error:", error);
//       Alert.alert("Error", "Image upload failed");
//     }
//   };

//   // Save Profile to Backend
//   const handleSaveProfile = async () => {
//     try {
//       const response = await axios.post(API_URL, profile, {
//         headers: { "Content-Type": "application/json" },
//       });

//       Alert.alert("Success", "Profile created successfully!");
//       navigation.navigate("MechanicHome");
//     } catch (error) {
//       Alert.alert("Error", "Failed to create profile");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create Mechanic Profile</Text>

//       <TextInput placeholder="Full Name" style={styles.input} onChangeText={(text) => handleChange("name", text)} />
//       <TextInput placeholder="Specialization" style={styles.input} onChangeText={(text) => handleChange("specialization", text)} />
//       <TextInput placeholder="Experience (Years)" style={styles.input} onChangeText={(text) => handleChange("experience", text)} />
//       <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} onChangeText={(text) => handleChange("phone", text)} />
//       <TextInput placeholder="Location" style={styles.input} onChangeText={(text) => handleChange("location", text)} />

//       <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
//         <Text style={styles.buttonText}>Select Profile Image</Text>
//       </TouchableOpacity>

//       {profile.profileImage ? <Image source={{ uri: profile.profileImage }} style={styles.imagePreview} /> : null}

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
// });

// export default MechanicProfileSetupScreen;



import React, { useState } from "react";
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, 
  Alert, Image, PermissionsAndroid, Platform , Button
} from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dndtvek2i/662173251784212";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dndtvek2i/image/upload";

const CLOUDINARY_UPLOAD_PRESET = "mechanixhub_preset";
const API_URL = "http://10.0.2.2:5000/api/mechanic/Profile"; // Backend API URL

const MechanicProfileSetupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
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
  // Handle text input changes
  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
  };

  // Request Storage Permission (Required for Android 10+)
  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "You need to allow access to your photos.");
          return false;
        }
      } catch (err) {
        console.warn("Permission error:", err);
        return false;
      }
    }
    return true;
  };

  // Open Image Picker
  const selectImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: "photo", quality: 1 }, async (response: any) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert("Error", "Failed to select image");
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        uploadImage(image.uri);
      }
    });
  };

  // Upload Image to Cloudinary
const uploadImage = async (imageUri: string) => {
  try {
    const formData = new FormData();
    formData.append("file", { 
      uri: imageUri, 
      type: "image/jpeg", 
      name: "profile.jpg" 
    });
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Upload response:", res.data);

    if (res.data.secure_url) {
      setProfile((prev) => ({ ...prev, profileImage: res.data.secure_url })); // Use `secure_url`
    } else {
      console.error("Failed to upload image");
      Alert.alert("Error", "Image upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    Alert.alert("Error", "Image upload failed");
  }
};


  const handleLocationSelect = () => {
    navigation.navigate("SelectLocationScreen", {
      onSelectLocation: (lat: number, lng: number) => {
        setProfile((prev) => ({ 
          ...prev, 
          location: { latitude: lat, longitude: lng } 
        }));
      },
    });
  };
  

  
  const handleSaveProfile = async () => {

    let newErrors = {
      name: profile.name.trim() ? "" : "Full Name is required",
      specialization: profile.specialization.trim() ? "" : "Specialization is required",
      experience: profile.experience.trim() ? "" : "Experience is required",
      phone: profile.phone.trim() ? "" : "Phone Number is required",
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
  
      console.log("✅ Sending token:", token);
  
      const response = await axios.post("http://10.0.2.2:5000/api/mechanic/Profile", {
        name: profile.name,
        specialization: profile.specialization,
        experience: profile.experience,
        phone: profile.phone,
        profileImage: profile.profileImage,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      console.log("✅ Profile saved:", response.data);
      Alert.alert("Success", "Profile created successfully!");
      // navigation.navigate("MechanicTabs", { screen: "Profile", refresh: Date.now()});
      navigation.replace("MechanicTabs", { screen: "Profile", refresh: Date.now() });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to create profile");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Mechanic Profile</Text>

      <TextInput placeholder="Full Name" style={styles.input} onChangeText={(text) => handleChange("name", text)} />{errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      <TextInput placeholder="Specialization" style={styles.input} onChangeText={(text) => handleChange("specialization", text)} />  {errors.specialization ? <Text style={styles.errorText}>{errors.specialization}</Text> : null}

      <TextInput placeholder="Experience (Years)" style={styles.input} onChangeText={(text) => handleChange("experience", text)} />  {errors.experience ? <Text style={styles.errorText}>{errors.experience}</Text> : null}

      <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} onChangeText={(text) => handleChange("phone", text)} /> {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
      

      <TouchableOpacity style={styles.input} onPress={handleLocationSelect}>
        <Text>{"Select Location"}</Text>
      </TouchableOpacity>
    

      <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Profile Image</Text>
      </TouchableOpacity>
      {errors.profileImage ? <Text style={styles.errorText}>{errors.profileImage}</Text> : null}

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
  errorText: { color: "red", fontSize: 14, marginBottom: 5 },
});

export default MechanicProfileSetupScreen;
