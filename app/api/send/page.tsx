"use client";
import { useState } from 'react';
import { Heart, Send } from 'lucide-react';

export default function SendKudos() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      sender: e.target.sender.value,
      receiver: e.target.receiver.value,
      message: e.target.message.value,
    };
    await fetch('/api/kudos', { method: 'POST', body: JSON.stringify(data) });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center" dir="rtl">
      <Heart className="text-rose-500 w-12 h-12 mb-4 fill-current" />
      <h1 className="text-2xl font-bold mb-6 text-slate-900">שלח פרגון חדש</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-6 rounded-2xl shadow-lg">
        <input name="sender" placeholder="השם שלך" required className="w-full p-4 bg-slate-100 rounded-xl outline-none" />
        <input name="receiver" placeholder="למי הפרגון?" required className="w-full p-4 bg-slate-100 rounded-xl outline-none" />
        <textarea name="message" placeholder="מה תרצה לכתוב?" required className="w-full p-4 bg-slate-100 rounded-xl h-32 outline-none" />
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
          {sent ? "נשלח! ✨" : "שלח למסך"} <Send size={18} />
        </button>
      </form>
    </div>
  );
}