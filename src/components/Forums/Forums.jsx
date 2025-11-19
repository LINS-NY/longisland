'use client'
import * as React from 'react';
import { useState } from 'react';
import Login from "./Login";
import LogOut from "./LogOut";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebaseconfig';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import MobileForumList from './MobileForumList';
import Avatar from './Avatar';

const Forums = () => {
  const [openModel, setOpenModel] = useState(false);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const q = query(collection(db, "Forum"), orderBy("creationTimeStamp", "desc"));
  const [snapshot] = useCollection(q);
  const data = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const createTopic = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Forum"), {
      Topic: input,
      Reply: 0,
      creator: user.email,
      creationTimeStamp: serverTimestamp(),
    });
    setInput("");
    setOpenModel(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className={`max-w-5xl mx-auto rounded-xl shadow-xl p-6 ${openModel ? "blur-sm" : ""} bg-white/70 backdrop-blur-md`}>
        {/* Header */}
        <div className="flex flex-row justify-between items-center border-b pb-4 mb-6">
          <h1 className="font-extrabold font-serif tracking-wide md:text-4xl text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            🌐 Community Forum
          </h1>
          <div className="flex flex-row items-center gap-3">
            {user && (
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition-transform"
                type="button"
                onClick={() => setOpenModel(true)}
              >
                + Create Topic
              </button>
            )}
            {user && <LogOut />}
            {user && <Avatar name={user.displayName} />}
            {!user && <Login />}
          </div>
        </div>

        {/* Forum List */}
        <div className="space-y-4">
          <MobileForumList data={data} />
        </div>
      </div>

      {/* Modal */}
      {openModel && (
        <NewCreate
          createTopic={createTopic}
          setInput={setInput}
          input={input}
          closeModal={() => setOpenModel(false)}
        />
      )}
    </div>
  );
};

const NewCreate = ({ createTopic, setInput, input, closeModal }) => {
  return (
    <div
      id="Topic-modal"
      className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div className="relative p-6 w-full max-w-md">
        <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-bold text-blue-800 font-serif">
              ✍️ Create a Topic
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 hover:text-red-500 transition"
            >
              ✖
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="topic"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Your Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  placeholder="Post a thread..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={(e) => createTopic(e)}
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
              >
                🚀 Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forums;
