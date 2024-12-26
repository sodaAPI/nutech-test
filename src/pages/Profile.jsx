import React, { useEffect, useState } from "react";
import Navbar from "../components/Utils/Navbar";
import Avatar from "../assets/ProfilePhoto.png";
import { FaRegUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from "../auth/authSlice"; // Import updateProfile
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [isEditState, setEditState] = useState(false);
  const [file, setFile] = useState(null);
  const [photoProfile, setPhotoProfile] = useState();

  const profileImage =
    profile?.profile_image ===
    "https://minio.nutech-integrasi.com/take-home-test/null"
      ? Avatar
      : profile?.profile_image || Avatar;

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || "");
      setNamaDepan(profile.first_name || "");
      setNamaBelakang(profile.last_name || "");
      setPhotoProfile(profile.profile_image ?? profileImage);
    } else {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleEditState = () => {
    setEditState(!isEditState);
  };

  const handleSave = () => {
    // Dispatch updateProfile action
    dispatch(
      updateProfile({
        first_name: namaDepan,
        last_name: namaBelakang,
        email: email,
      })
    );
    setEditState(false); // Switch back to view mode after saving
  };

  const handleImageChangeAndUpload = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      setFile(selectedFile);

      // Preview image (optional)
      const imageUrl = URL.createObjectURL(selectedFile);
      // Update profile image preview with selected file (Optional, you can add it as needed)

      // Immediately upload the image if file is selected
      dispatch(updateProfileImage(selectedFile));
      toast.success("Profile image updated successfully!");
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  return (
    <div className="flex flex-col px-[150px]">
      <Navbar />

      {isEditState ? (
        <div className="flex flex-col items-center justify-center pt-[100px] gap-2">
          <div className="relative">
            <img
              src={photoProfile}
              className="size-[150px] rounded-full"
              alt="avatar"
            />
            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={handleImageChangeAndUpload} // Use the combined function here
            />
            <button
              aria-label="edit-photo-profile"
              className="absolute bottom-0 right-0 text-sm bg-white p-2 rounded-full border"
              onClick={() => document.getElementById("profile-image").click()}>
              <FaPen />
            </button>
          </div>
          <h1 className="text-[32px] font-medium">{`${namaDepan} ${namaBelakang}`}</h1>
          <div className="flex flex-col gap-7 w-full px-[200px] py-5">
            <form className="flex flex-col gap-7 w-full">
              <div className="flex flex-col gap-3">
                <span className="font-medium">Email</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      email ? "text-black" : "text-gray-300"
                    }`}>
                    @
                  </span>
                  <input
                    id="email"
                    value={email}
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    placeholder="masukan email anda"
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Depan</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaDepan ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaDepan"
                    value={namaDepan}
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    placeholder="masukan nama depan anda"
                    onChange={(event) => setNamaDepan(event.target.value)}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Belakang</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaBelakang ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaBelakang"
                    value={namaBelakang}
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    placeholder="masukan nama belakang anda"
                    onChange={(event) => setNamaBelakang(event.target.value)}
                    type="text"
                    required
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="text-[16px] font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
                Simpan
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-[100px] gap-2">
          <div className="relative">
            <img
              src={photoProfile}
              className="size-[150px] rounded-full"
              alt="avatar"
            />
          </div>
          <h1 className="text-[32px] font-medium">{`${namaDepan} ${namaBelakang}`}</h1>
          <div className="flex flex-col gap-7 w-full px-[200px] py-5">
            <div className="flex flex-col gap-7 w-full">
              <div className="flex flex-col gap-3">
                <span className="font-medium">Email</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      email ? "text-black" : "text-gray-300"
                    }`}>
                    @
                  </span>
                  <input
                    id="email"
                    value={email}
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    type="email"
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Depan</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaDepan ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaDepan"
                    value={namaDepan}
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-medium">Nama Belakang</span>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-4 ${
                      namaBelakang ? "text-black" : "text-gray-300"
                    }`}>
                    <FaRegUser />
                  </span>
                  <input
                    id="namaBelakang"
                    value={namaBelakang}
                    className="px-3 py-2 border border-gray-300 rounded-[4px] pl-10 w-full h-[50px]"
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <button
                onClick={toggleEditState}
                className="text-[16px] font-semibold rounded-[4px] bg-[#F82C14] h-[48px] text-white w-full">
                Edit Profil
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="text-[16px] font-semibold rounded-[4px] border border-[#F82C14] h-[48px] text-[#F82C14] w-full">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
