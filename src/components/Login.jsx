import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../lib/upload";

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username: username,
        email: email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account Created You can login now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login size-full flex items-center gap-24">
      <div className="item flex flex-1 flex-col items-center gap-5">
        <h2>Welcome back,</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
          />
          <button disabled={loading} className="btn">
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator h-3/5 w-0.5 bg-[#dddddd35] "></div>
      <div className="item flex flex-1 flex-col items-center gap-5">
        <h2>Create an Account</h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-5"
        >
          <label
            htmlFor="file"
            className="w-full flex items-center justify-between cursor-pointer underline"
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt=""
              className="size-12 rounded-lg object-cover opacity-60"
            />
            Upload an Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="input"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
          />
          <button disabled={loading} className="btn">
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
