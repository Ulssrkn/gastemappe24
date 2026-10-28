import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AVAILABLE_ICONS = ['📌', '🍳', '🅿️', '📶', '🔑', '🏊‍♂️', '🍷', '☕', '📺', '🐾', '🚲', '🧹', '🕒', '💶', '📍'];

const TRANSLATIONS = {
  de: {
    home: 'Startseite',
    admin: '⚙️ Admin',
    guestView: '📱 Gast-Ansicht',
    overview: 'Übersicht',
    rules: 'Regeln',
    gastronomy: 'Essen',
    guides: 'Tipps',
    wifi: 'WLAN',
    copy: 'Kopieren',
    copied: '✅ Kopiert!',
    copyPassword: 'Passwort kopieren',
    editHotel: '🏨 Hotel & Medien Bearbeiten',
    hotelName: 'Hotel Name',
    tagline: 'Slogan / Untertitel',
    logoLabel: 'Hotel Logo (PNG / JPEG oder Emoji)',
    chooseFile: '📁 Datei wählen',
    sliderPhotos: 'Slider Fotos (max. 5 Bilder, max. 5MB)',
    legalNote: '⚠️ Rechtlicher Hinweis: Bitte laden Sie nur Bilder hoch, an denen Sie die Rechte besitzen (DSGVO).',
    addPhotoBtn: '➕ Foto für Slider hinzufügen',
    address: 'Adresse',
    wifiName: 'WLAN Name',
    wifiPass: 'WLAN Passwort',
    instagramUrl: 'Instagram Link / Username',
    facebookUrl: 'Facebook Link / Page',
    followUs: 'Folgen Sie uns auf Social Media',
    socialDesc: 'Teilen Sie Ihre Erlebnisse und bleiben Sie mit uns in Kontakt!',
    save: '💾 Speichern',
    addSection: '➕ Neuen Bereich Hinzufügen',
    titlePlaceholder: 'Titel (z.B. Frühstück)',
    descPlaceholder: 'Untertitel (z.B. 08:00 - 10:30 Uhr)',
    contentPlaceholder: 'Inhalt...',
    addBtn: 'Hinzufügen',
    entries: '🗑️ Einträge',
    delete: 'Löschen',
    qrTitle: '📱 Hotel QR-Code für Gäste',
    qrDesc: 'Diesen QR-Code können Sie ausdrucken und in den Zimmern platzieren.',
    qrDownload: '📥 QR-Code Bild Herunterladen',
    statsTitle: '📊 Statistiken der letzten 30 Tage',
    qrScansLabel: 'QR-Scans / Aufrufe',
    linkClicksLabel: 'Interaktionen & Klicks',
    searchPlaceholder: '🔍 Suchen (z.B. WLAN, Frühstück, Parkplatz...)'
  },
  en: {
    home: 'Home',
    admin: '⚙️ Admin',
    guestView: '📱 Guest View',
    overview: 'Overview',
    rules: 'Rules',
    gastronomy: 'Dining',
    guides: 'Tips',
    wifi: 'WiFi',
    copy: 'Copy',
    copied: '✅ Copied!',
    copyPassword: 'Copy Password',
    editHotel: '🏨 Edit Hotel & Media',
    hotelName: 'Hotel Name',
    tagline: 'Tagline / Subtitle',
    logoLabel: 'Hotel Logo (PNG / JPEG or Emoji)',
    chooseFile: '📁 Choose File',
    sliderPhotos: 'Slider Photos (max 5 images, max 5MB)',
    legalNote: '⚠️ Legal notice: Please only upload images you have rights to (GDPR).',
    addPhotoBtn: '➕ Add Photo to Slider',
    address: 'Address',
    wifiName: 'WiFi Name',
    wifiPass: 'WiFi Password',
    instagramUrl: 'Instagram Link / Username',
    facebookUrl: 'Facebook Link / Page',
    followUs: 'Follow Us on Social Media',
    socialDesc: 'Share your moments and stay connected with us!',
    save: '💾 Save',
    addSection: '➕ Add New Section',
    titlePlaceholder: 'Title (e.g. Breakfast)',
    descPlaceholder: 'Subtitle (e.g. 08:00 - 10:30 AM)',
    contentPlaceholder: 'Content...',
    addBtn: 'Add',
    entries: '🗑️ Entries',
    delete: 'Delete',
    qrTitle: '📱 Hotel QR Code for Guests',
    qrDesc: 'You can print this QR code and place it in rooms.',
    qrDownload: '📥 Download QR Code Image',
    statsTitle: '📊 Statistics for the last 30 days',
    qrScansLabel: 'QR Scans / Views',
    linkClicksLabel: 'Interactions & Clicks',
    searchPlaceholder: '🔍 Search (e.g. WiFi, breakfast, parking...)'
  },
  fr: {
    home: 'Accueil',
    admin: '⚙️ Admin',
    guestView: '📱 Vue Invité',
    overview: 'Aperçu',
    rules: 'Règles',
    gastronomy: 'Restauration',
    guides: 'Conseils',
    wifi: 'Wi-Fi',
    copy: 'Copier',
    copied: '✅ Copié !',
    copyPassword: 'Copier le mot de passe',
    editHotel: '🏨 Modifier l’Hôtel & Médias',
    hotelName: 'Nom de l’hôtel',
    tagline: 'Slogan / Sous-titre',
    logoLabel: 'Logo (PNG / JPEG ou Emoji)',
    chooseFile: '📁 Choisir',
    sliderPhotos: 'Photos (max 5 images, 5 Mo)',
    legalNote: '⚠️ Mention légale : Droits d’image requis (RGPD).',
    addPhotoBtn: '➕ Ajouter une photo',
    address: 'Adresse',
    wifiName: 'Nom Wi-Fi',
    wifiPass: 'Mot de passe Wi-Fi',
    instagramUrl: 'Lien Instagram',
    facebookUrl: 'Lien Facebook',
    followUs: 'Suivez-nous sur les réseaux sociaux',
    socialDesc: 'Partagez vos moments et restez connectés avec nous !',
    save: '💾 Enregistrer',
    addSection: '➕ Ajouter une section',
    titlePlaceholder: 'Titre (ex. Petit-déjeuner)',
    descPlaceholder: 'Sous-titre...',
    contentPlaceholder: 'Contenu...',
    addBtn: 'Ajouter',
    entries: '🗑️ Entrées',
    delete: 'Supprimer',
    qrTitle: '📱 QR Code de l’hôtel',
    qrDesc: 'Imprimez ce code QR pour les chambres.',
    qrDownload: '📥 Télécharger le QR Code',
    statsTitle: '📊 Statistiques des 30 derniers jours',
    qrScansLabel: 'Scans QR / Vues',
    linkClicksLabel: 'Interactions & Clics',
    searchPlaceholder: '🔍 Rechercher (ex. Wi-Fi, petit-déj...)'
  },
  tr: {
    home: 'Ana Sayfa',
    admin: '⚙️ Yönetici',
    guestView: '📱 Misafir Görünümü',
    overview: 'Genel Bakış',
    rules: 'Kurallar',
    gastronomy: 'Yeme & İçme',
    guides: 'İpuçları',
    wifi: 'Wi-Fi',
    copy: 'Kopyala',
    copied: '✅ Kopyalandı!',
    copyPassword: 'Şifreyi Kopyala',
    editHotel: '🏨 Otel ve Medya Düzenle',
    hotelName: 'Otel Adı',
    tagline: 'Slogan / Alt Başlık',
    logoLabel: 'Otel Logosu (PNG / JPEG veya Emoji)',
    chooseFile: '📁 Dosya Seç',
    sliderPhotos: 'Slider Fotoğrafları (En fazla 5 görsel, max 5MB)',
    legalNote: '⚠️ Yasal Uyarı: Yalnızca telif haklarına sahip olduğunuz görselleri yükleyin.',
    addPhotoBtn: '➕ Slider için Fotoğraf Ekle',
    address: 'Adres',
    wifiName: 'Wi-Fi Adı',
    wifiPass: 'Wi-Fi Şifresi',
    instagramUrl: 'Instagram Bağlantısı / Kullanıcı Adı',
    facebookUrl: 'Facebook Bağlantısı / Sayfa',
    followUs: 'Sosyal Medyada Bizi Takip Edin',
    socialDesc: 'Deneyimlerinizi paylaşın ve bizimle iletişimde kalın!',
    save: '💾 Kaydet',
    addSection: '➕ Yeni Bölüm Ekle',
    titlePlaceholder: 'Başlık (örn. Kahvaltı)',
    descPlaceholder: 'Alt başlık (örn. 08:00 - 10:30)',
    contentPlaceholder: 'İçerik...',
    addBtn: 'Ekle',
    entries: '🗑️ Kayıtlar',
    delete: 'Sil',
    qrTitle: '📱 Misafirler için QR Kod',
    qrDesc: 'Bu QR kodu yazdırıp odalara yerleştirebilirsiniz.',
    qrDownload: '📥 QR Kodu İndir',
    statsTitle: '📊 Son 30 Günün İstatistikleri',
    qrScansLabel: 'QR Tarama / Görüntülenme',
    linkClicksLabel: 'Etkileşim & Tıklama',
    searchPlaceholder: '🔍 Ne aramak istemiştiniz? (örn. Wi-Fi, kahvaltı...)'
  }
};

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentHotelSlug = urlParams.get('hotel');

  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState('de');
  const [searchQuery, setSearchQuery] = useState('');
  const [accommodation, setAccommodation] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!!currentHotelSlug);
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [accForm, setAccForm] = useState({
    id: currentHotelSlug || 'hotel-new-start',
    name: 'Hotel New Start',
    tagline: 'Willkommen in Ihrem neuen Lieblingsort!',
    wifi_name: 'NewStart_Guest',
    wifi_pass: 'Start2026!',
    address: 'Musterstraße 1, 67146 Deidesheim',
    instagram_url: '',
    facebook_url: '',
    qr_scans: 1,
    link_clicks: 0,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    logo_url: '🏨'
  });

  const [newCat, setNewCat] = useState({
    title: '',
    desc_text: '',
    content: '',
    icon: '📌',
    tab_type: 'overview'
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

  useEffect(() => {
    if (currentHotelSlug) {
      fetchData();
      if (!isAdmin) {
        trackScan();
      }
    }
  }, [currentHotelSlug]);

  useEffect(() => {
    if (accommodation?.images && accommodation.images.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % accommodation.images.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [accommodation]);

  async function trackScan() {
    try {
      const { data } = await supabase.from('accommodations').select('qr_scans').eq('id', currentHotelSlug).single();
      const currentScans = data?.qr_scans || 0;
      await supabase.from('accommodations').update({ qr_scans: currentScans + 1 }).eq('id', currentHotelSlug);
    } catch (err) {
      console.error('Scan track error:', err);
    }
  }

  async function trackClick() {
    try {
      const { data } = await supabase.from('accommodations').select('link_clicks').eq('id', currentHotelSlug).single();
      const currentClicks = data?.link_clicks || 0;
      await supabase.from('accommodations').update({ link_clicks: currentClicks + 1 }).eq('id', currentHotelSlug);
    } catch (err) {
      console.error('Click track error:', err);
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const { data: accData } = await supabase
        .from('accommodations')
        .select('*')
        .eq('id', currentHotelSlug)
        .single();

      if (accData) {
        if (!accData.images && accData.image_url) {
          accData.images = [accData.image_url];
        }
        setAccommodation(accData);
        setAccForm(accData);
      } else {
        const defaultHotel = {
          id: currentHotelSlug,
          name: 'Hotel New Start',
          tagline: 'Herzlich willkommen!',
          wifi_name: 'NewStart_Guest',
          wifi_pass: 'Start2026!',
          address: 'Musterstraße 1, 67146 Deidesheim',
          instagram_url: '',
          facebook_url: '',
          qr_scans: 1,
          link_clicks: 0,
          images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
          logo_url: '🏨'
        };
        await supabase.from('accommodations').upsert([defaultHotel]);
        setAccommodation(defaultHotel);
        setAccForm(defaultHotel);
      }

      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('hotel_slug', currentHotelSlug)
        .order('sort_order', { ascending: true });

      if (catData && catData.length > 0) {
        setCategories(catData);
      } else {
        const defaultCats = [
          { id: crypto.randomUUID(), title: 'Willkommen', desc_text: 'Schön, dass Sie da sind', content: 'Genießen Sie Ihren Aufenthalt in unserem Hotel.', icon: '🍷', tab_type: 'overview', sort_order: 1, hotel_slug: currentHotelSlug },
          { id: crypto.randomUUID(), title: 'WLAN', desc_text: 'Kostenfreies Internet', content: 'Nutzen Sie unser schnelles WLAN.', icon: '📶', tab_type: 'overview', sort_order: 2, hotel_slug: currentHotelSlug }
        ];
        await supabase.from('categories').insert(defaultCats);
        setCategories(defaultCats);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Die Datei ist zu groß! Maximale Größe ist 5MB.');
      return;
    }

    if (type === 'photo') {
      const currentImages = accForm.images || [];
      if (currentImages.length >= 5) {
        alert('Maximal 5 Fotos im Slider erlaubt!');
        return;
      }
    }

    if (type === 'logo') setUploadingLogo(true);
    else setUploadingPhoto(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${currentHotelSlug}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('hotel-assets')
      .upload(filePath, file);

    if (uploadError) {
      alert('Fehler beim Hochladen: ' + uploadError.message);
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingPhoto(false);
      return;
    }

    const { data } = supabase.storage.from('hotel-assets').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    if (type === 'logo') {
      setAccForm({ ...accForm, logo_url: publicUrl });
      setUploadingLogo(false);
    } else {
      const currentImages = accForm.images || [];
      setAccForm({ ...accForm, images: [...currentImages, publicUrl] });
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    const updatedImages = accForm.images.filter((_, idx) => idx !== indexToRemove);
    setAccForm({ ...accForm, images: updatedImages });
  };

  const handleSaveAccommodation = async () => {
    const payload = {
      id: accForm.id,
      name: accForm.name,
      tagline: accForm.tagline,
      wifi_name: accForm.wifi_name,
      wifi_pass: accForm.wifi_pass,
      address: accForm.address,
      instagram_url: accForm.instagram_url,
      facebook_url: accForm.facebook_url,
      logo_url: accForm.logo_url,
      images: accForm.images,
      image_url: accForm.images?.[0] || ''
    };

    const { error } = await supabase.from('accommodations').upsert(payload);
    if (!error) {
      setAccommodation({ ...accommodation, ...accForm });
      alert('Erfolgreich gespeichert! ❤️');
    } else {
      alert('Fehler: ' + error.message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCat.title || !newCat.content) {
      alert('Bitte Titel und Inhalt ausfüllen!');
      return;
    }

    const { error } = await supabase.from('categories').insert([
      {
        id: crypto.randomUUID(),
        title: newCat.title,
        desc_text: newCat.desc_text,
        content: newCat.content,
        icon: newCat.icon || '📌',
        tab_type: newCat.tab_type || 'overview',
        hotel_slug: currentHotelSlug,
        sort_order: categories.length + 1
      }
    ]);

    if (!error) {
      setNewCat({ title: '', desc_text: '', content: '', icon: '📌', tab_type: 'overview' });
      fetchData();
      alert('Eintrag hinzugefügt!');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Eintrag löschen?')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) fetchData();
  };

  const copyWifi = () => {
    navigator.clipboard.writeText(accommodation?.wifi_pass || '');
    setCopiedWifi(true);
    trackClick();
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const getInstagramLink = () => {
    if (!accForm.instagram_url) return null;
    if (accForm.instagram_url.startsWith('http')) return accForm.instagram_url;
    return `https://instagram.com/${accForm.instagram_url.replace('@', '')}`;
  };

  const getFacebookLink = () => {
    if (!accForm.facebook_url) return null;
    if (accForm.facebook_url.startsWith('http')) return accForm.facebook_url;
    return `https://facebook.com/${accForm.facebook_url}`;
  };

  if (!currentHotelSlug) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl">📖</span>
          <span className="font-extrabold text-2xl text-white">GästeMappe<span className="text-rose-500">24</span></span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black max-w-xl leading-tight">
          Die digitale Gästemappe für Hotels & Ferienwohnungen.
        </h1>
        <p className="text-slate-400 text-sm max-w-md">
          Öffnen Sie Ihr Hotel mit dem entsprechenden Link, z.B. <code className="text-rose-400">?hotel=hotel-new-start</code>
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xs">Lade...</div>;
  }

  const filteredCategories = categories.filter(c => {
    const matchesTab = (c.tab_type || 'overview') === activeTab;
    const matchesSearch = searchQuery.trim() === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.desc_text && c.desc_text.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (searchQuery.trim() !== '') {
      return matchesSearch;
    }
    return matchesTab;
  });

  const hotelImages = accommodation?.images && accommodation.images.length > 0 
    ? accommodation.images 
    : [accommodation?.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'];

  const currentHotelUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentHotelUrl)}`;

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-28">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <a href="/" className="text-xs text-slate-400 font-bold">{t.home}</a>
          <span className="text-slate-300">|</span>
          <span className="font-extrabold text-sm text-rose-600 truncate max-w-[120px]">{accommodation?.name || currentHotelSlug}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-2 py-1.5 focus:outline-none"
          >
            <option value="de">🇩🇪 DE</option>
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="tr">🇹🇷 TR</option>
          </select>

          <button
            type="button"
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl shadow-sm ${isAdmin ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'}`}
          >
            {isAdmin ? t.guestView : t.admin}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {isAdmin ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-5 rounded-3xl shadow-lg border border-slate-800 space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.statsTitle}</h2>
              <div className="grid grid-cols-2 gap-4 text-center pt-2">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <p className="text-3xl font-black text-rose-400">{accommodation?.qr_scans || 0}</p>
                  <p className="text-[10px] text-slate-300 font-medium uppercase mt-1">{t.qrScansLabel}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <p className="text-3xl font-black text-emerald-400">{accommodation?.link_clicks || 0}</p>
                  <p className="text-[10px] text-slate-300 font-medium uppercase mt-1">{t.linkClicksLabel}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2 text-left">{t.qrTitle}</h2>
              <p className="text-xs text-slate-500">{t.qrDesc}</p>
              
              <div className="bg-slate-50 p-4 rounded-2xl inline-block border">
                <img src={qrCodeUrl} alt="Hotel QR Code" className="w-40 h-40 mx-auto rounded-xl shadow-sm" />
              </div>

              <div className="pt-2">
                <a
                  href={qrCodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="hotel-qr.png"
                  className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs text-center shadow"
                >
                  {t.qrDownload}
                </a>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.editHotel}</h2>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.hotelName}</label>
                <input
                  type="text"
                  value={accForm.name || ''}
                  onChange={(e) => setAccForm({ ...accForm, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.tagline}</label>
                <input
                  type="text"
                  value={accForm.tagline || ''}
                  onChange={(e) => setAccForm({ ...accForm, tagline: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.logoLabel}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={accForm.logo_url || ''}
                    onChange={(e) => setAccForm({ ...accForm, logo_url: e.target.value })}
                    className="flex-1 p-2 border rounded-xl text-xs bg-slate-50"
                  />
                  <label className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-3 py-2.5 rounded-xl cursor-pointer">
                    {uploadingLogo ? '...' : t.chooseFile}
                    <input type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileUpload(e, 'logo')} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.sliderPhotos}</label>
                <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-xl mb-2 border border-amber-200">{t.legalNote}</p>

                <div className="grid grid-cols-3 gap-2 mb-2">
                  {accForm.images?.map((img, idx) => (
                    <div key={idx} className="relative group h-20 rounded-xl overflow-hidden border">
                      <img src={img} alt="Slide" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                {(!accForm.images || accForm.images.length < 5) && (
                  <label className="block w-full text-center bg-slate-100 hover:bg-slate-200 border border-dashed border-slate-300 py-3 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
                    {uploadingPhoto ? '...' : t.addPhotoBtn}
                    <input type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileUpload(e, 'photo')} className="hidden" />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.address}</label>
                <input
                  type="text"
                  value={accForm.address || ''}
                  onChange={(e) => setAccForm({ ...accForm, address: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.wifiName}</label>
                  <input
                    type="text"
                    value={accForm.wifi_name || ''}
                    onChange={(e) => setAccForm({ ...accForm, wifi_name: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.wifiPass}</label>
                  <input
                    type="text"
                    value={accForm.wifi_pass || ''}
                    onChange={(e) => setAccForm({ ...accForm, wifi_pass: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.instagramUrl}</label>
                  <input
                    type="text"
                    value={accForm.instagram_url || ''}
                    onChange={(e) => setAccForm({ ...accForm, instagram_url: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.facebookUrl}</label>
                  <input
                    type="text"
                    value={accForm.facebook_url || ''}
                    onChange={(e) => setAccForm({ ...accForm, facebook_url: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveAccommodation}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition-all"
              >
                {t.save}
              </button>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.addSection}</h2>
              <form onSubmit={handleAddCategory} className="space-y-3">
                <div className="flex gap-2">
                  <select
                    value={newCat.icon}
                    onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
                    className="p-2.5 border rounded-xl text-lg bg-slate-50"
                  >
                    {AVAILABLE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder={t.titlePlaceholder}
                    value={newCat.title}
                    onChange={(e) => setNewCat({ ...newCat, title: e.target.value })}
                    className="flex-1 p-2.5 border rounded-xl text-xs bg-slate-50"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={newCat.tab_type}
                    onChange={(e) => setNewCat({ ...newCat, tab_type: e.target.value })}
                    className="p-2.5 border rounded-xl text-xs bg-slate-50 font-bold"
                  >
                    <option value="overview">{t.overview}</option>
                    <option value="rules">{t.rules}</option>
                    <option value="gastronomy">{t.gastronomy}</option>
                    <option value="guides">{t.guides}</option>
                  </select>
                  <input
                    type="text"
                    placeholder={t.descPlaceholder}
                    value={newCat.desc_text}
                    onChange={(e) => setNewCat({ ...newCat, desc_text: e.target.value })}
                    className="flex-1 p-2.5 border rounded-xl text-xs bg-slate-50"
                  />
                </div>

                <textarea
                  placeholder={t.contentPlaceholder}
                  value={newCat.content}
                  onChange={(e) => setNewCat({ ...newCat, content: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                />

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl text-xs shadow transition-all"
                >
                  {t.addBtn}
                </button>
              </form>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-3">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.entries}</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <p className="font-bold text-slate-800">{cat.title}</p>
                        <p className="text-[10px] text-slate-500">{cat.tab_type}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl font-bold text-[10px]"
                    >
                      {t.delete}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <div className="relative h-56 bg-slate-200">
                <img
                  src={hotelImages[currentSlide] || hotelImages[0]}
                  alt="Hotel Slide"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{accommodation?.logo_url || '🏨'}</span>
                    <h1 className="text-xl font-black">{accommodation?.name || currentHotelSlug}</h1>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-1">{accommodation?.tagline}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-xs shadow-sm pl-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📶</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">{t.wifi}</p>
                  <p className="text-xs font-bold text-slate-800">{accommodation?.wifi_name || 'WLAN'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={copyWifi}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition-all"
              >
                {copiedWifi ? t.copied : t.copyPassword}
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{cat.title}</h3>
                      {cat.desc_text && <p className="text-[10px] text-slate-400 font-medium">{cat.desc_text}</p>}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line pt-1">{cat.content}</p>
                </div>
              ))}
            </div>

            {(getInstagramLink() || getFacebookLink()) && (
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 text-center space-y-2 mt-6">
                <h3 className="text-xs font-bold text-slate-800">{t.followUs}</h3>
                <p className="text-[10px] text-slate-400">{t.socialDesc}</p>
                <div className="flex justify-center gap-3 pt-2">
                  {getInstagramLink() && (
                    <a
                      href={getInstagramLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={trackClick}
                      className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
                    >
                      📸 Instagram
                    </a>
                  )}
                  {getFacebookLink() && (
                    <a
                      href={getFacebookLink()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={trackClick}
                      className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
                    >
                      📘 Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {!isAdmin && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex justify-around items-center z-50 max-w-md mx-auto shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'overview' ? 'text-rose-600' : 'text-slate-400'}`}
          >
            <span className="text-base">🏠</span>
            <span>{t.overview}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'rules' ? 'text-rose-600' : 'text-slate-400'}`}
          >
            <span className="text-base">📋</span>
            <span>{t.rules}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gastronomy')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'gastronomy' ? 'text-rose-600' : 'text-slate-400'}`}
          >
            <span className="text-base">🍳</span>
            <span>{t.gastronomy}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guides')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'guides' ? 'text-rose-600' : 'text-slate-400'}`}
          >
            <span className="text-base">💡</span>
            <span>{t.guides}</span>
          </button>
        </nav>
      )}
    </div>
  );
}