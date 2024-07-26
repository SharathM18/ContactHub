import "../../assets/style/addcontact.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import Loading from "../../../utils/Loading";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const schema = z.object({
  photo: z.instanceof(FileList).optional(),
  name: z.string().min(3, { message: "Name must have at least 3 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone Number must have 10 digits" }),
});

const AddContact = () => {
  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const [error_msgs, setError_msgs] = useState(null);

  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const navigate = useNavigate();
  const location = useLocation();

  const [newImageAdded, setNewImageAdded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const onImageChange = (e) => {
    setNewImageAdded(true);
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreviewURL(previewURL);
    }
  };

  const contactToEdit = location.state?.contact || null;

  useEffect(() => {
    if (contactToEdit) {
      setValue("name", contactToEdit.name);
      setValue("email", contactToEdit.email);
      setValue("phone", contactToEdit.phone);
      setImagePreviewURL(contactToEdit.imageURL);
    }
  }, [contactToEdit]);

  const onSubmit = async (data) => {
    try {
      if (newImageAdded && contactToEdit && contactToEdit.imageURL) {
        const previousImageRef = ref(storage, contactToEdit.imageURL);
        await deleteObject(previousImageRef);
      }

      let imageURL = contactToEdit ? contactToEdit.imageURL : "";

      if (data.photo && data.photo[0]) {
        const imageRef = ref(
          storage,
          `image/${userDetails.uid}/profile_picture/${data.photo[0].name}`
        );
        const snapshot = await uploadBytes(imageRef, data.photo[0]);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      if (contactToEdit) {
        await updateDoc(
          doc(db, `users/${userDetails.uid}/contacts`, contactToEdit.id),
          {
            imageURL: imageURL || "",
            name: data.name,
            email: data.email,
            phone: data.phone,
          }
        );
      } else {
        await addDoc(collection(db, `users/${userDetails.uid}/contacts/`), {
          imageURL: imageURL || "",
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }

      navigate("/allcontacts");
      reset();
    } catch (error) {
      setError_msgs(error.message);
    }
  };

  return (
    <>
      <div className="form_container container">
        <h1>Add Contact</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {imagePreviewURL ? (
            <div className="image_preview">
              <img
                src={imagePreviewURL}
                alt="Image Preview"
                className="image_upload_preview"
              />
            </div>
          ) : (
            <div className="image_preview">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "2.8em", color: "var(--text-color)" }}
              ></i>
            </div>
          )}

          <div className="field">
            <label htmlFor="profile_pic" className="input_label">
              Choose Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="input_field"
              {...register("photo")}
              onChange={onImageChange}
            />
          </div>

          <div className="field">
            <label htmlFor="name" className="input_label">
              Name
            </label>
            <input type="text" className="input_field" {...register("name")} />
            {errors.name && <p className="errors_msg">{errors.name.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="email" className="input_label">
              Email
            </label>
            <input
              type="email"
              className="input_field"
              {...register("email")}
            />
            {errors.email && (
              <p className="errors_msg">{errors.email.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="text" className="input_label">
              Phone Number
            </label>
            <input type="text" className="input_field" {...register("phone")} />
            {errors.phone && (
              <p className="errors_msg">{errors.phone.message}</p>
            )}
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? <Loading /> : contactToEdit ? "Update" : "Save"}
          </button>
          {error_msgs && <p className="errors_msg">{error_msgs}</p>}
        </form>
      </div>
    </>
  );
};

export default AddContact;
