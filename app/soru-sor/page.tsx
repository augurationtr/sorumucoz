'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useRouter } from 'next/navigation'

const dersler = ['Türkçe', 'Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Coğrafya']

export default function SoruSor() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [baslik, setBaslik] = useState('')
  const [aciklama, setAciklama] = useState('')
  const [ders, setDers] = useState('')
  const [konu, setKonu] = useState('')
  const [sinavTuru, setSinavTuru] = useState('TYT')
  const [loading, setLoading] = useState(false)
  const [mesaj, setMesaj] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/auth')
      else setUser(data.user)
    })
  }, [])

  async function handleSubmit() {
    if (!baslik || !ders) {
      setMesaj('Hata: Başlık ve ders zorunlu!')
      return
    }
    setLoading(true)
    setMesaj('')

    const { error } = await supabase.from('sorular').insert({
      user_id: user.id,
      baslik,
      aciklama,
      ders,
      konu,
      sinav_turu: sinavTuru,
      durum: 'bekliyor',
    })

    if (error) setMesaj('Hata: ' + error.message)
    else {
      setMesaj('✅ Soru paylaşıldı!')
      setTimeout(() => router.push('/'), 1500)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', background: '#f0f4ff', border: '2px solid #d0d9f0',
    borderRadius: '12px', padding: '12px 16px', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box' as const,
    fontFamily: 'inherit', color: '#0f1b3d', marginBottom: '12px',
  }

  return (
    <main style={{minHeight:'100vh',background:'#f0f4ff',paddingBottom:'40px'}}>

      {/* NAV */}
      <nav style={{background:'white',borderBottom:'2px solid #d0d9f0',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'64px',position:'sticky',top:0,zIndex:50}}>
        <button
          onClick={() => router.push('/')}
          style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px',color:'#3a4a70'}}
        >
          ←
        </button>
        <span style={{fontWeight:'900',fontSize:'18px',color:'#0f1b3d'}}>Soru Sor</span>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{padding:'8px 16px',background:'#ff6b1a',color:'white',borderRadius:'10px',fontSize:'13px',fontWeight:'800',border:'none',cursor:'pointer'}}
        >
          {loading ? '⏳' : 'Paylaş'}
        </button>
      </nav>

      <div style={{maxWidth:'500px',margin:'0 auto',padding:'20px'}}>

        {/* DERS SEÇ */}
        <div style={{marginBottom:'16px'}}>
          <div style={{fontSize:'13px',fontWeight:'700',color:'#3a4a70',marginBottom:'8px'}}>📚 Ders Seç</div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap' as const}}>
            {dersler.map(d => (
              <button
                key={d}
                onClick={() => setDers(d)}
                style={{padding:'8px 16px',borderRadius:'100px',fontSize:'13px',fontWeight:'700',border:'2px solid',cursor:'pointer',borderColor:ders===d ? '#1a56e8' : '#d0d9f0',background:ders===d ? '#1a56e8' : 'white',color:ders===d ? 'white' : '#3a4a70'}}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* SINAV TÜRÜ */}
        <div style={{marginBottom:'16px'}}>
          <div style={{fontSize:'13px',fontWeight:'700',color:'#3a4a70',marginBottom:'8px'}}>🎯 Sınav Türü</div>
          <div style={{display:'flex',gap:'8px'}}>
            {['TYT', 'AYT'].map(s => (
              <button
                key={s}
                onClick={() => setSinavTuru(s)}
                style={{padding:'8px 24px',borderRadius:'100px',fontSize:'13px',fontWeight:'700',border:'2px solid',cursor:'pointer',borderColor:sinavTuru===s ? '#ff6b1a' : '#d0d9f0',background:sinavTuru===s ? '#ff6b1a' : 'white',color:sinavTuru===s ? 'white' : '#3a4a70'}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* BAŞLIK */}
        <div style={{fontSize:'13px',fontWeight:'700',color:'#3a4a70',marginBottom:'8px'}}>✏️ Sorunuzu Yazın</div>
        <input
          type="text"
          placeholder="Sorunuzu kısaca özetleyin..."
          value={baslik}
          onChange={e => setBaslik(e.target.value)}
          style={inputStyle}
        />

        {/* KONU */}
        <input
          type="text"
          placeholder="Konu (örn: Türev, İntegral, Osmanlı...)"
          value={konu}
          onChange={e => setKonu(e.target.value)}
          style={inputStyle}
        />

        {/* AÇIKLAMA */}
        <textarea
          placeholder="Soruyu daha ayrıntılı açıklayın..."
          value={aciklama}
          onChange={e => setAciklama(e.target.value)}
          rows={4}
          style={{...inputStyle, resize:'none' as const}}
        />

        {/* MEDYA */}
        <div style={{background:'white',border:'2px dashed #d0d9f0',borderRadius:'16px',padding:'24px',textAlign:'center',marginBottom:'16px',cursor:'pointer'}}>
          <div style={{fontSize:'32px',marginBottom:'8px'}}>📷</div>
          <div style={{fontWeight:'700',fontSize:'14px',color:'#0f1b3d',marginBottom:'4px'}}>Fotoğraf veya Video Ekle</div>
          <div style={{fontSize:'12px',color:'#8892b0'}}>Soru görselini buraya yükleyebilirsin</div>
        </div>

        {/* MESAJ */}
        {mesaj && (
          <div style={{padding:'12px',borderRadius:'12px',fontSize:'13px',fontWeight:'600',background:mesaj.includes('Hata') ? '#fff0f0' : '#f0fff4',color:mesaj.includes('Hata') ? '#dc2626' : '#16a34a',marginBottom:'16px'}}>
            {mesaj}
          </div>
        )}

        {/* PAYLAŞ BUTONU */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{width:'100%',padding:'16px',background:'#ff6b1a',color:'white',fontWeight:'900',borderRadius:'16px',fontSize:'15px',border:'none',cursor:'pointer',boxShadow:'0 4px 16px rgba(255,107,26,0.4)'}}
        >
          {loading ? '⏳ Paylaşılıyor...' : '🚀 Soruyu Paylaş'}
        </button>

      </div>
    </main>
  )
}