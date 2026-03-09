'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../supabase'
import { useRouter, useParams } from 'next/navigation'

const dersBadgeRenk: Record<string, {bg: string, color: string}> = {
  'Türkçe': { bg: '#fde8e8', color: '#991b1b' },
  'Matematik': { bg: '#dbeafe', color: '#1d4ed8' },
  'Fizik': { bg: '#fce7f3', color: '#be185d' },
  'Kimya': { bg: '#d1fae5', color: '#065f46' },
  'Biyoloji': { bg: '#d1fae5', color: '#065f46' },
  'Tarih': { bg: '#ede9fe', color: '#5b21b6' },
  'Coğrafya': { bg: '#fef3c7', color: '#92400e' },
}

export default function SoruDetay() {
  const router = useRouter()
  const params = useParams()
  const [soru, setSoru] = useState<any>(null)
  const [yanitlar, setYanitlar] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [yeniYanit, setYeniYanit] = useState('')
  const [loading, setLoading] = useState(false)
  const [mesaj, setMesaj] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    fetchSoru()
    fetchYanitlar()
  }, [])

  async function fetchSoru() {
    const { data } = await supabase
      .from('sorular')
      .select('*')
      .eq('id', params.id)
      .single()
    if (data) setSoru(data)
  }

  async function fetchYanitlar() {
    const { data } = await supabase
      .from('yanitlar')
      .select('*')
      .eq('soru_id', params.id)
      .order('created_at', { ascending: true })
    if (data) setYanitlar(data)
  }

  async function handleYanitEkle() {
    if (!yeniYanit.trim()) return
    if (!user) { router.push('/auth'); return }
    setLoading(true)
    const { error } = await supabase.from('yanitlar').insert({
      soru_id: params.id,
      user_id: user.id,
      icerik: yeniYanit,
    })
    if (!error) {
      setYeniYanit('')
      fetchYanitlar()
      setMesaj('✅ Yanıtın eklendi!')
      setTimeout(() => setMesaj(''), 2000)
    }
    setLoading(false)
  }

  if (!soru) return (
    <div style={{minHeight:'100vh',background:'#f0f4ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',color:'#8892b0'}}>
      ⏳ Yükleniyor...
    </div>
  )

  const ders = dersBadgeRenk[soru.ders] || { bg: '#f0f4ff', color: '#3a4a70' }

  return (
    <main style={{minHeight:'100vh',background:'#f0f4ff',paddingBottom:'100px'}}>

      {/* NAV */}
      <nav style={{background:'white',borderBottom:'2px solid #d0d9f0',padding:'0 20px',display:'flex',alignItems:'center',gap:'12px',height:'64px',position:'sticky',top:0,zIndex:50}}>
        <button onClick={() => router.push('/')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px',color:'#3a4a70'}}>←</button>
        <span style={{fontWeight:'900',fontSize:'17px',color:'#0f1b3d',flex:1}}>Soru Detayı</span>
        <span style={{fontSize:'11px',fontWeight:'800',padding:'4px 10px',borderRadius:'8px',background:ders.bg,color:ders.color}}>{soru.ders}</span>
      </nav>

      <div style={{maxWidth:'500px',margin:'0 auto',padding:'16px'}}>

        {/* SORU */}
        <div style={{background:'white',borderRadius:'20px',border:'2px solid #d0d9f0',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 12px rgba(26,86,232,0.06)'}}>
          <div style={{display:'flex',gap:'8px',marginBottom:'12px',flexWrap:'wrap' as const}}>
            <span style={{fontSize:'11px',fontWeight:'800',padding:'4px 10px',borderRadius:'8px',background:ders.bg,color:ders.color}}>{soru.ders}</span>
            {soru.konu && <span style={{fontSize:'11px',fontWeight:'600',padding:'4px 10px',borderRadius:'8px',background:'#f0f4ff',color:'#3a4a70'}}>{soru.konu}</span>}
            <span style={{fontSize:'11px',fontWeight:'800',padding:'4px 10px',borderRadius:'8px',background:'#fff0e8',color:'#ff6b1a'}}>{soru.sinav_turu}</span>
          </div>
          <div style={{fontWeight:'800',fontSize:'17px',color:'#0f1b3d',marginBottom:'12px',lineHeight:'1.45'}}>
            {soru.baslik}
          </div>
          {soru.aciklama && (
            <div style={{fontSize:'14px',color:'#3a4a70',lineHeight:'1.7',marginBottom:'12px'}}>
              {soru.aciklama}
            </div>
          )}
          <div style={{fontSize:'11px',color:'#8892b0',fontWeight:'600'}}>
            {new Date(soru.created_at).toLocaleDateString('tr-TR')}
          </div>
        </div>

        {/* YANITLAR */}
        <div style={{fontWeight:'800',fontSize:'15px',color:'#0f1b3d',marginBottom:'12px'}}>
          💬 Yanıtlar ({yanitlar.length})
        </div>

        {yanitlar.length === 0 && (
          <div style={{textAlign:'center',padding:'40px 20px',background:'white',borderRadius:'20px',border:'2px dashed #d0d9f0',marginBottom:'16px'}}>
            <div style={{fontSize:'32px',marginBottom:'8px'}}>🤔</div>
            <div style={{fontWeight:'700',fontSize:'14px',color:'#0f1b3d',marginBottom:'4px'}}>Henüz yanıt yok</div>
            <div style={{fontSize:'13px',color:'#8892b0'}}>İlk yanıtı veren sen ol!</div>
          </div>
        )}

        {yanitlar.map((yanit, i) => (
          <div key={yanit.id} style={{background:'white',borderRadius:'16px',border:'2px solid #d0d9f0',padding:'16px',marginBottom:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg, #ff6b1a, #f5c400)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:'800'}}>
                {i + 1}
              </div>
              <div style={{fontSize:'11px',color:'#8892b0',fontWeight:'600'}}>
                {new Date(yanit.created_at).toLocaleDateString('tr-TR')}
              </div>
            </div>
            <div style={{fontSize:'14px',color:'#0f1b3d',lineHeight:'1.65'}}>
              {yanit.icerik}
            </div>
          </div>
        ))}

        {/* YANIT EKLE */}
        <div style={{background:'white',borderRadius:'20px',border:'2px solid #d0d9f0',padding:'16px',marginTop:'8px'}}>
          <div style={{fontWeight:'800',fontSize:'14px',color:'#0f1b3d',marginBottom:'12px'}}>✏️ Yanıtını Yaz</div>
          <textarea
            placeholder="Çözümünü veya önerini yaz..."
            value={yeniYanit}
            onChange={e => setYeniYanit(e.target.value)}
            rows={4}
            style={{width:'100%',background:'#f0f4ff',border:'2px solid #d0d9f0',borderRadius:'12px',padding:'12px',fontSize:'14px',outline:'none',resize:'none' as const,boxSizing:'border-box' as const,fontFamily:'inherit',color:'#0f1b3d',marginBottom:'12px'}}
          />
          {mesaj && (
            <div style={{padding:'10px',borderRadius:'10px',fontSize:'13px',fontWeight:'600',background:'#f0fff4',color:'#16a34a',marginBottom:'12px'}}>
              {mesaj}
            </div>
          )}
          <button
            onClick={handleYanitEkle}
            disabled={loading}
            style={{width:'100%',padding:'14px',background:'#ff6b1a',color:'white',fontWeight:'900',borderRadius:'12px',fontSize:'14px',border:'none',cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(255,107,26,0.3)'}}
          >
            {loading ? '⏳ Gönderiliyor...' : '🚀 Yanıtı Gönder'}
          </button>
        </div>

      </div>
    </main>
  )
}