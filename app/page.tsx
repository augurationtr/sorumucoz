'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabase'

const dersler = [
  { id: 'hepsi', label: '🔢 Tümü' },
  { id: 'Türkçe', label: '📝 Türkçe' },
  { id: 'Matematik', label: '📐 Matematik' },
  { id: 'Fizik', label: '⚡ Fizik' },
  { id: 'Kimya', label: '🧪 Kimya' },
  { id: 'Biyoloji', label: '🧬 Biyoloji' },
  { id: 'Tarih', label: '📜 Tarih' },
  { id: 'Coğrafya', label: '🗺️ Coğrafya' },
]

const dersBadgeRenk: Record<string, {bg: string, color: string}> = {
  'Türkçe': { bg: '#fde8e8', color: '#991b1b' },
  'Matematik': { bg: '#dbeafe', color: '#1d4ed8' },
  'Fizik': { bg: '#fce7f3', color: '#be185d' },
  'Kimya': { bg: '#d1fae5', color: '#065f46' },
  'Biyoloji': { bg: '#d1fae5', color: '#065f46' },
  'Tarih': { bg: '#ede9fe', color: '#5b21b6' },
  'Coğrafya': { bg: '#fef3c7', color: '#92400e' },
}

const durumRenk: Record<string, {bg: string, color: string, label: string}> = {
  'bekliyor': { bg: '#fef3c7', color: '#b45309', label: '⏳ Bekliyor' },
  'cozuldu': { bg: '#d1fae5', color: '#065f46', label: '✅ Çözüldü' },
  'populer': { bg: '#fff0e8', color: '#ff6b1a', label: '🔥 Popüler' },
}

export default function Home() {
  const router = useRouter()
  const [sorular, setSorular] = useState<any[]>([])
  const [seciliDers, setSeciliDers] = useState('hepsi')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchSorular()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [seciliDers])

  async function fetchSorular() {
    setLoading(true)
    let query = supabase
      .from('sorular')
      .select('*')
      .order('created_at', { ascending: false })
    if (seciliDers !== 'hepsi') {
      query = query.eq('ders', seciliDers)
    }
    const { data, error } = await query
    if (!error && data) setSorular(data)
    setLoading(false)
  }

  return (
    <main style={{minHeight:'100vh',background:'#f0f4ff',paddingBottom:'80px'}}>

      {/* NAV */}
      <nav style={{background:'white',borderBottom:'2px solid #d0d9f0',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'64px',position:'sticky',top:0,zIndex:50,boxShadow:'0 2px 12px rgba(26,86,232,0.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'32px',height:'32px',background:'#1a56e8',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>📚</div>
          <span style={{fontWeight:'900',fontSize:'20px',color:'#0f1b3d'}}>Sorumu<span style={{color:'#ff6b1a'}}>Çöz</span></span>
        </div>
        {user ? (
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <span style={{fontSize:'13px',fontWeight:'700',color:'#3a4a70'}}>👤 {user.email?.split('@')[0]}</span>
            <button onClick={() => supabase.auth.signOut()} style={{padding:'8px 16px',background:'#f0f4ff',color:'#3a4a70',borderRadius:'10px',fontSize:'13px',fontWeight:'800',border:'2px solid #d0d9f0',cursor:'pointer'}}>
              Çıkış
            </button>
          </div>
        ) : (
          <a href="/auth" style={{padding:'8px 16px',background:'#ff6b1a',color:'white',borderRadius:'10px',fontSize:'13px',fontWeight:'800',textDecoration:'none'}}>
            Giriş Yap
          </a>
        )}
      </nav>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg, #0f1b3d, #1a3a8f, #1a56e8)',padding:'48px 20px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-60px',right:'-60px',width:'250px',height:'250px',background:'radial-gradient(circle, rgba(255,107,26,0.2), transparent)',pointerEvents:'none'}} />
        <div style={{position:'relative',zIndex:1,maxWidth:'500px',margin:'0 auto'}}>
          <div style={{display:'inline-block',background:'rgba(255,107,26,0.15)',border:'1px solid rgba(255,107,26,0.35)',color:'#ffaa7a',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',textTransform:'uppercase' as const,padding:'6px 16px',borderRadius:'100px',marginBottom:'20px'}}>
            🎯 YKS 2026 Hazırlık
          </div>
          <h1 style={{fontWeight:'900',fontSize:'32px',color:'white',lineHeight:'1.2',marginBottom:'16px'}}>
            Soruyu paylaş,<br/><span style={{color:'#ffb347'}}>birlikte çözelim!</span>
          </h1>
          <p style={{color:'#a8bce0',fontSize:'14px',lineHeight:'1.75',marginBottom:'28px'}}>
            Fotoğraf veya video çek, soruyu paylaş. Binlerce öğrenci anında yardım etsin.
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
            <a href={user ? '/soru-sor' : '/auth'} style={{padding:'12px 24px',background:'#ff6b1a',color:'white',fontWeight:'800',borderRadius:'14px',fontSize:'14px',textDecoration:'none',boxShadow:'0 4px 16px rgba(255,107,26,0.4)'}}>
              📸 Soru Sor
            </a>
            <button style={{padding:'12px 24px',background:'rgba(255,255,255,0.1)',color:'white',fontWeight:'700',borderRadius:'14px',fontSize:'14px',border:'1.5px solid rgba(255,255,255,0.2)',cursor:'pointer'}}>
              ▶ Nasıl Çalışır?
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'white',borderBottom:'2px solid #d0d9f0',padding:'16px 20px'}}>
        <div style={{display:'flex',justifyContent:'space-around',maxWidth:'500px',margin:'0 auto'}}>
          {[
            { num: '24.8K', label: 'Çözülen Soru' },
            { num: '8.4K', label: 'Aktif Öğrenci' },
            { num: '~8dk', label: 'Ort. Yanıt' },
            { num: '%94', label: 'Çözüm Oranı' },
          ].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontSize:'18px',fontWeight:'900',color:'#1a56e8'}}>{s.num}</div>
              <div style={{fontSize:'11px',color:'#8892b0',fontWeight:'600'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DERS FİLTRELER */}
      <div style={{background:'white',borderBottom:'2px solid #d0d9f0',padding:'12px 16px',overflowX:'auto'}}>
        <div style={{display:'flex',gap:'8px',maxWidth:'500px',margin:'0 auto'}}>
          {dersler.map(d => (
            <button
              key={d.id}
              onClick={() => setSeciliDers(d.id)}
              style={{padding:'6px 14px',borderRadius:'100px',fontSize:'12px',fontWeight:'700',whiteSpace:'nowrap' as const,border:'none',cursor:'pointer',background:seciliDers===d.id ? '#1a56e8' : '#f0f4ff',color:seciliDers===d.id ? 'white' : '#3a4a70'}}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* SORU AKIŞI */}
      <div style={{maxWidth:'500px',margin:'0 auto',padding:'16px'}}>
        {loading && (
          <div style={{textAlign:'center',padding:'40px',color:'#8892b0',fontSize:'14px'}}>
            ⏳ Sorular yükleniyor...
          </div>
        )}
        {!loading && sorular.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 20px',background:'white',borderRadius:'20px',border:'2px dashed #d0d9f0'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>📭</div>
            <div style={{fontWeight:'800',fontSize:'18px',color:'#0f1b3d',marginBottom:'8px'}}>Henüz soru yok!</div>
            <div style={{fontSize:'14px',color:'#8892b0',marginBottom:'20px'}}>İlk soruyu soran sen ol.</div>
            <a href={user ? '/soru-sor' : '/auth'} style={{padding:'12px 24px',background:'#ff6b1a',color:'white',fontWeight:'800',borderRadius:'12px',fontSize:'14px',textDecoration:'none'}}>
              ✏️ Soru Sor
            </a>
          </div>
        )}
        {!loading && sorular.map(soru => {
          const ders = dersBadgeRenk[soru.ders] || { bg: '#f0f4ff', color: '#3a4a70' }
          const durum = durumRenk[soru.durum] || durumRenk['bekliyor']
          return (
            <div
              key={soru.id}
              onClick={() => router.push(`/soru/${soru.id}`)}
              style={{background:'white',borderRadius:'20px',border:'2px solid #d0d9f0',padding:'16px',marginBottom:'12px',boxShadow:'0 2px 12px rgba(26,86,232,0.06)',cursor:'pointer'}}
            >
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg, #1a56e8, #4d7fff)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'800',flexShrink:0}}>
                  SC
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'700',fontSize:'13px',color:'#0f1b3d'}}>Anonim</div>
                  <div style={{fontSize:'11px',color:'#8892b0'}}>{new Date(soru.created_at).toLocaleDateString('tr-TR')}</div>
                </div>
                <span style={{fontSize:'11px',fontWeight:'800',padding:'4px 10px',borderRadius:'8px',background:ders.bg,color:ders.color}}>
                  {soru.ders}
                </span>
              </div>
              <div style={{fontWeight:'800',fontSize:'15px',color:'#0f1b3d',marginBottom:'12px',lineHeight:'1.45'}}>
                {soru.baslik}
              </div>
              {soru.aciklama && (
                <div style={{fontSize:'13px',color:'#3a4a70',lineHeight:'1.6',marginBottom:'12px'}}>
                  {soru.aciklama}
                </div>
              )}
              <div style={{display:'flex',alignItems:'center',gap:'16px',paddingTop:'12px',borderTop:'2px solid #f0f4ff'}}>
                <button onClick={e => e.stopPropagation()} style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',fontWeight:'700',color:'#8892b0',background:'none',border:'none',cursor:'pointer'}}>❤️ {soru.begeni}</button>
                <button onClick={e => e.stopPropagation()} style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',fontWeight:'700',color:'#8892b0',background:'none',border:'none',cursor:'pointer'}}>💬 Yanıtla</button>
                <button onClick={e => e.stopPropagation()} style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',fontWeight:'700',color:'#8892b0',background:'none',border:'none',cursor:'pointer'}}>🔖 Kaydet</button>
                <span style={{marginLeft:'auto',fontSize:'11px',fontWeight:'800',padding:'4px 10px',borderRadius:'100px',background:durum.bg,color:durum.color}}>
                  {durum.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ALT NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'white',borderTop:'2px solid #d0d9f0',padding:'8px 16px',display:'flex',justifyContent:'space-around',alignItems:'center',zIndex:50}}>
        <button style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',background:'none',border:'none',cursor:'pointer',color:'#1a56e8'}}>
          <span style={{fontSize:'20px'}}>🏠</span>
          <span style={{fontSize:'11px',fontWeight:'700'}}>Ana Sayfa</span>
        </button>
        <button style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',background:'none',border:'none',cursor:'pointer',color:'#8892b0'}}>
          <span style={{fontSize:'20px'}}>🔍</span>
          <span style={{fontSize:'11px',fontWeight:'700'}}>Keşfet</span>
        </button>
        <a href={user ? '/soru-sor' : '/auth'} style={{width:'52px',height:'52px',background:'#ff6b1a',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',marginTop:'-24px',boxShadow:'0 4px 16px rgba(255,107,26,0.4)',border:'4px solid #f0f4ff',textDecoration:'none'}}>
          ✏️
        </a>
        <button style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',background:'none',border:'none',cursor:'pointer',color:'#8892b0'}}>
          <span style={{fontSize:'20px'}}>🏆</span>
          <span style={{fontSize:'11px',fontWeight:'700'}}>Sıralama</span>
        </button>
        <button style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',background:'none',border:'none',cursor:'pointer',color:'#8892b0'}}>
          <span style={{fontSize:'20px'}}>👤</span>
          <span style={{fontSize:'11px',fontWeight:'700'}}>Profil</span>
        </button>
      </div>

    </main>
  )
}