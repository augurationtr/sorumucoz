export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f4ff]">

      {/* NAV */}
      <nav className="bg-white border-b-2 border-[#d0d9f0] px-6 flex items-center justify-between h-16 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a56e8] rounded-xl flex items-center justify-center text-white text-sm">📚</div>
          <span className="font-black text-xl text-[#0f1b3d]">Sorumu<span className="text-[#ff6b1a]">Çöz</span></span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-bold border-2 border-[#d0d9f0] rounded-xl text-[#3a4a70] hover:border-[#1a56e8] hover:text-[#1a56e8] transition">
            Giriş Yap
          </button>
          <button className="px-4 py-2 text-sm font-bold bg-[#ff6b1a] text-white rounded-xl hover:bg-[#e05a0f] transition">
            Üye Ol
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-br from-[#0f1b3d] via-[#1a3a8f] to-[#1a56e8] px-6 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,26,0.2),transparent_60%)]" />
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="inline-block bg-[#ff6b1a]/20 border border-[#ff6b1a]/40 text-[#ffaa7a] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            🎯 YKS 2026 Hazırlık
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Soruyu paylaş,<br/>
            <span className="text-[#ffb347]">birlikte çözelim!</span>
          </h1>
          <p className="text-[#a8bce0] text-sm leading-relaxed mb-8">
            Fotoğraf veya video çek, soruyu paylaş. Binlerce öğrenci anında yardım etsin.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-3 bg-[#ff6b1a] text-white font-black rounded-2xl text-sm shadow-lg shadow-orange-500/30 hover:bg-[#e05a0f] transition">
              📸 Soru Sor
            </button>
            <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-2xl text-sm border border-white/20 hover:bg-white/20 transition">
              ▶ Nasıl Çalışır?
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white border-b-2 border-[#d0d9f0] px-6 py-4">
        <div className="max-w-lg mx-auto flex justify-between">
          {[
            { num: "24.8K", label: "Çözülen Soru" },
            { num: "8.4K", label: "Aktif Öğrenci" },
            { num: "~8dk", label: "Ort. Yanıt" },
            { num: "%94", label: "Çözüm Oranı" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-black text-[#1a56e8]">{s.num}</div>
              <div className="text-xs text-[#8892b0] font-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DERS FİLTRELER */}
      <div className="bg-white border-b-2 border-[#d0d9f0] px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 max-w-lg mx-auto">
          {[
            { label: "🔢 Tümü", active: true },
            { label: "📐 Matematik", active: false },
            { label: "⚡ Fizik", active: false },
            { label: "🧪 Kimya", active: false },
            { label: "🗺️ Coğrafya", active: false },
            { label: "📜 Tarih", active: false },
            { label: "📝 Türkçe", active: false },
            { label: "🧬 Biyoloji", active: false },
          ].map((d) => (
            <button
              key={d.label}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                d.active
                  ? "bg-[#1a56e8] text-white"
                  : "bg-[#f0f4ff] text-[#3a4a70] hover:bg-[#e4ecff]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* SORU AKIŞI */}
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">

        {/* SORU KARTI 1 */}
        <div className="bg-white rounded-2xl border-2 border-[#d0d9f0] p-4 shadow-sm hover:border-[#1a56e8] transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a56e8] to-[#4d7fff] flex items-center justify-center text-white text-xs font-black">AK</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-[#0f1b3d]">Ahmet K.</div>
              <div className="text-xs text-[#8892b0]">2 saat önce</div>
            </div>
            <span className="text-xs font-bold bg-[#dbeafe] text-[#1d4ed8] px-2 py-1 rounded-lg">📐 Matematik</span>
          </div>
          <p className="text-sm font-bold text-[#0f1b3d] mb-3">Zincir kuralı ile türev alırken neden dış fonksiyonun türevini iç fonksiyona uyguluyoruz?</p>
          <div className="bg-[#f0f4ff] rounded-xl p-3 mb-3 flex items-center gap-2 text-sm text-[#3a4a70]">
            <span>📷</span> soru_foto.jpg
          </div>
          <div className="flex items-center gap-4 pt-3 border-t-2 border-[#f0f4ff]">
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#1a56e8] transition">❤️ 47</button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#1a56e8] transition">💬 12 Yanıt</button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#ff6b1a] transition">🔖 Kaydet</button>
            <span className="ml-auto text-xs font-bold bg-[#d1fae5] text-[#065f46] px-2 py-1 rounded-lg">✅ Çözüldü</span>
          </div>
        </div>

        {/* SORU KARTI 2 */}
        <div className="bg-white rounded-2xl border-2 border-[#d0d9f0] p-4 shadow-sm hover:border-[#1a56e8] transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff6b1a] to-[#f5c400] flex items-center justify-center text-white text-xs font-black">ZY</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-[#0f1b3d]">Zeynep Y.</div>
              <div className="text-xs text-[#8892b0]">4 saat önce</div>
            </div>
            <span className="text-xs font-bold bg-[#fce7f3] text-[#be185d] px-2 py-1 rounded-lg">⚡ Fizik</span>
          </div>
          <p className="text-sm font-bold text-[#0f1b3d] mb-3">Bu devrede eşdeğer direnci nasıl bulabilirim? Seri-paralel karışık bağlantı kafama karıştı</p>
          <div className="flex gap-2 mb-3">
            <div className="bg-[#f0f4ff] rounded-xl p-3 flex items-center gap-2 text-sm text-[#3a4a70] flex-1">
              <span>📷</span> devre.jpg
            </div>
            <div className="bg-[#fff0e8] rounded-xl p-3 flex items-center gap-2 text-sm text-[#ff6b1a] flex-1 border border-[#ff6b1a]/20">
              <span>▶️</span> video · 2:34
            </div>
          </div>
          <div className="flex items-center gap-4 pt-3 border-t-2 border-[#f0f4ff]">
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#1a56e8] transition">❤️ 23</button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#1a56e8] transition">💬 3 Yanıt</button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#ff6b1a] transition">🔖 Kaydet</button>
            <span className="ml-auto text-xs font-bold bg-[#fef3c7] text-[#b45309] px-2 py-1 rounded-lg">⏳ Bekliyor</span>
          </div>
        </div>

        {/* SORU KARTI 3 */}
        <div className="bg-white rounded-2xl border-2 border-[#d0d9f0] p-4 shadow-sm hover:border-[#1a56e8] transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a9e6e] to-[#1a56e8] flex items-center justify-center text-white text-xs font-black">SD</div>
            <div className="flex-1">
              <div className="font-bold text-sm text-[#0f1b3d]">Selin D.</div>
              <div className="text-xs text-[#8892b0]">1 gün önce</div>
            </div>
            <span className="text-xs font-bold bg-[#ede9fe] text-[#5b21b6] px-2 py-1 rounded-lg">📜 Tarih</span>
          </div>
          <p className="text-sm font-bold text-[#0f1b3d] mb-3">Tanzimat ile Islahat Fermanı arasındaki farkları ezberlemeden öğrenmenin yolu var mı?</p>
          <div className="bg-[#fff0e8] rounded-xl p-3 mb-3 flex items-center gap-2 text-sm text-[#ff6b1a] border border-[#ff6b1a]/20">
            <span>▶️</span> özet_video.mp4 · 6:45
          </div>
          <div className="flex items-center gap-4 pt-3 border-t-2 border-[#f0f4ff]">
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#1a56e8] transition">❤️ 91</button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#1a56e8] transition">💬 24 Yanıt</button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-[#8892b0] hover:text-[#ff6b1a] transition">🔖 Kaydet</button>
            <span className="ml-auto text-xs font-bold bg-[#fff0e8] text-[#ff6b1a] px-2 py-1 rounded-lg border border-[#ff6b1a]/20">🔥 Popüler</span>
          </div>
        </div>

      </div>

      {/* ALT NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#d0d9f0] px-4 py-2 flex justify-around items-center z-50">
        <button className="flex flex-col items-center gap-1 text-[#1a56e8]">
          <span className="text-xl">🏠</span>
          <span className="text-xs font-bold">Ana Sayfa</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#8892b0]">
          <span className="text-xl">🔍</span>
          <span className="text-xs font-bold">Keşfet</span>
        </button>
        <button className="w-14 h-14 bg-[#ff6b1a] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-orange-500/40 -mt-6 border-4 border-white">
          ✏️
        </button>
        <button className="flex flex-col items-center gap-1 text-[#8892b0]">
          <span className="text-xl">🏆</span>
          <span className="text-xs font-bold">Sıralama</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#8892b0]">
          <span className="text-xl">👤</span>
          <span className="text-xs font-bold">Profil</span>
        </button>
      </div>

      {/* ALT BOŞ ALAN */}
      <div className="h-24" />

    </main>
  )
}