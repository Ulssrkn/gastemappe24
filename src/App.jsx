import React, { useState, useEffect } from 'react';

// Multi-language translation dictionary
const TRANSLATIONS = {
  de: {
    home: 'Startseite',
    admin: '⚙️ Admin Panel',
    guestView: '📱 Gast-Ansicht',
    overview: 'Übersicht',
    rules: 'Regeln',
    gastronomy: 'Essen',
    guides: 'Tipps',
    reception: '📞 Rezeption',
    directions: '📍 Anfahrt',
    checkinOut: 'Check-in / Out',
    wifi: 'WLAN',
    highspeedWifi: 'WLAN Highspeed',
    network: 'Netzwerk',
    password: 'Passwort',
    copy: 'Kopieren',
    copied: '✅ Kopiert!',
    copyPassword: 'Passwort kopieren',
    editHotel: '🏨 Hotel-Einstellungen',
    hotelName: 'Hotel Name',
    tagline: 'Slogan / Untertitel',
    address: 'Adresse',
    wifiName: 'WLAN Name',
    wifiPass: 'WLAN Passwort',
    save: '💾 Speichern',
    addSection: '➕ Neuen Bereich Hinzufügen',
    titlePlaceholder: 'Titel (z.B. Frühstück)',
    descPlaceholder: 'Untertitel (z.B. 08:00 - 10:30 Uhr)',
    contentPlaceholder: 'Inhalt...',
    addBtn: 'Hinzufügen',
    entries: '🗑️ Bestehende Einträge',
    delete: 'Löschen',
    qrTitle: '📱 Hotel QR-Code für Zimmer',
    qrDesc: 'Scannen Sie diesen Code mit dem Handy oder laden Sie das Bild für den Druck herunter.',
    qrDownload: '📥 QR-Code Bild Herunterladen',
    searchPlaceholder: '🔍 Suchen (z.B. WLAN, Frühstück, Parkplatz...)'
  },
  en: {
    home: 'Home',
    admin: '⚙️ Admin Panel',
    guestView: '📱 Guest View',
    overview: 'Overview',
    rules: 'Rules',
    gastronomy: 'Dining',
    guides: 'Tips',
    reception: '📞 Reception',
    directions: '📍 Directions',
    checkinOut: 'Check-in / Out',
    wifi: 'WiFi',
    highspeedWifi: 'Highspeed WiFi',
    network: 'Network',
    password: 'Password',
    copy: 'Copy',
    copied: '✅ Copied!',
    copyPassword: 'Copy Password',
    editHotel: '🏨 Hotel Settings',
    hotelName: 'Hotel Name',
    tagline: 'Tagline / Subtitle',
    address: 'Address',
    wifiName: 'WiFi Name',
    wifiPass: 'WiFi Password',
    save: '💾 Save',
    addSection: '➕ Add New Section',
    titlePlaceholder: 'Title (e.g. Breakfast)',
    descPlaceholder: 'Subtitle (e.g. 08:00 - 10:30 AM)',
    contentPlaceholder: 'Content...',
    addBtn: 'Add',
    entries: '🗑️ Existing Entries',
    delete: 'Delete',
    qrTitle: '📱 Hotel QR Code for Rooms',
    qrDesc: 'Scan this code or download it for print placement.',
    qrDownload: '📥 Download QR Code Image',
    searchPlaceholder: '🔍 Search (e.g. WiFi, breakfast, parking...)'
  },
  fr: {
    home: 'Accueil',
    admin: '⚙️ Admin Panel',
    guestView: '📱 Vue Invité',
    overview: 'Aperçu',
    rules: 'Règles',
    gastronomy: 'Restauration',
    guides: 'Conseils',
    reception: '📞 Réception',
    directions: '📍 Itinéraire',
    checkinOut: 'Arrivée / Départ',
    wifi: 'Wi-Fi',
    highspeedWifi: 'Wi-Fi Haut Débit',
    network: 'Réseau',
    password: 'Mot de passe',
    copy: 'Copier',
    copied: '✅ Copié !',
    copyPassword: 'Copier le mot de passe',
    editHotel: '🏨 Configuration Hôtel',
    hotelName: 'Nom de l’hôtel',
    tagline: 'Slogan / Sous-titre',
    address: 'Adresse',
    wifiName: 'Nom Wi-Fi',
    wifiPass: 'Mot de passe Wi-Fi',
    save: '💾 Enregistrer',
    addSection: '➕ Ajouter une section',
    titlePlaceholder: 'Titre (ex. Petit-déjeuner)',
    descPlaceholder: 'Sous-titre...',
    contentPlaceholder: 'Contenu...',
    addBtn: 'Ajouter',
    entries: '🗑️ Entrées existantes',
    delete: 'Supprimer',
    qrTitle: '📱 QR Code pour les chambres',
    qrDesc: 'Téléchargez ce code QR pour l’imprimer dans vos chambres.',
    qrDownload: '📥 Télécharger le QR Code',
    searchPlaceholder: '🔍 Rechercher (ex. Wi-Fi, petit-déj...)'
  },
  tr: {
    home: 'Ana Sayfa',
    admin: '⚙️ Yönetici Paneli',
    guestView: '📱 Misafir Görünümü',
    overview: 'Genel Bakış',
    rules: 'Kurallar',
    gastronomy: 'Yeme & İçme',
    guides: 'İpuçları',
    reception: '📞 Resepsiyon',
    directions: '📍 Yol Tarifi',
    checkinOut: 'Giriş / Çıkış',
    wifi: 'Wi-Fi',
    highspeedWifi: 'Yüksek Hızlı Wi-Fi',
    network: 'Ağ Adı',
    password: 'Şifre',
    copy: 'Kopyala',
    copied: '✅ Kopyalandı!',
    copyPassword: 'Şifreyi Kopyala',
    editHotel: '🏨 Otel Ayarları',
    hotelName: 'Otel Adı',
    tagline: 'Slogan / Alt Başlık',
    address: 'Adres',
    wifiName: 'Wi-Fi Adı',
    wifiPass: 'Wi-Fi Şifresi',
    save: '💾 Kaydet',
    addSection: '➕ Yeni Bölüm Ekle',
    titlePlaceholder: 'Başlık (örn. Kahvaltı)',
    descPlaceholder: 'Alt başlık (örn. 08:00 - 10:30)',
    contentPlaceholder: 'İçerik...',
    addBtn: 'Ekle',
    entries: '🗑️ Mevcut Kayıtlar',
    delete: 'Sil',
    qrTitle: '📱 Odalar için QR Kod',
    qrDesc: 'Bu QR kodu yazdırıp odalarınıza yerleştirebilirsiniz.',
    qrDownload: '📥 QR Kodu İndir',
    searchPlaceholder: '🔍 Arama (örn. Wi-Fi, kahvaltı, otopark...)'
  },
  es: {
    home: 'Inicio',
    admin: '⚙️ Panel Admin',
    guestView: '📱 Vista Huésped',
    overview: 'Resumen',
    rules: 'Reglas',
    gastronomy: 'Gastronomía',
    guides: 'Consejos',
    reception: '📞 Recepción',
    directions: '📍 Cómo llegar',
    checkinOut: 'Entrada / Salida',
    wifi: 'WiFi',
    highspeedWifi: 'WiFi Alta Velocidad',
    network: 'Red',
    password: 'Contraseña',
    copy: 'Copiar',
    copied: '✅ ¡Copiado!',
    copyPassword: 'Copiar contraseña',
    editHotel: '🏨 Configuración del Hotel',
    hotelName: 'Nombre del Hotel',
    tagline: 'Slogan / Subtítulo',
    address: 'Dirección',
    wifiName: 'Nombre WiFi',
    wifiPass: 'Contraseña WiFi',
    save: '💾 Guardar',
    addSection: '➕ Añadir sección',
    titlePlaceholder: 'Título (ej. Desayuno)',
    descPlaceholder: 'Subtítulo (ej. 08:00 - 10:30)',
    contentPlaceholder: 'Contenido...',
    addBtn: 'Añadir',
    entries: '🗑️ Entradas existentes',
    delete: 'Eliminar',
    qrTitle: '📱 Código QR para Habitaciones',
    qrDesc: 'Imprima este código QR y colóquelo en las habitaciones.',
    qrDownload: '📥 Descargar QR Code',
    searchPlaceholder: '🔍 Buscar (ej. WiFi, desayuno, parking...)'
  }
};

// Clean Inline SVG Flags
const SVGFlags = {
  de: () => (
    <svg className="w-5 h-3.5 rounded-sm object-cover shadow-sm inline-block shrink-0" viewBox="0 0 640 480">
      <path fill="#ffce00" d="M0 320h640v160H0z"/>
      <path fill="#000" d="M0 0h640v160H0z"/>
      <path fill="#d00" d="M0 160h640v160H0z"/>
    </svg>
  ),
  en: () => (
    <svg className="w-5 h-3.5 rounded-sm object-cover shadow-sm inline-block shrink-0" viewBox="0 0 640 480">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 245 184L565 0h75v55L395 240l245 185v55h-75L320 296 75 480H0v-55l245-185L0 55V0h75z"/>
      <path fill="#C8102E" d="m424 286 216 163v31h-41L379 317l45-31zm-208 0L0 449v31h41l220-163-45-31zM640 0v7L420 172l45 31L640 47V0zM0 0v7l220 165-45 31L0 47V0z"/>
      <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/>
      <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z"/>
    </svg>
  ),
  fr: () => (
    <svg className="w-5 h-3.5 rounded-sm object-cover shadow-sm inline-block shrink-0" viewBox="0 0 640 480">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <path fill="#002654" d="M0 0h213.3v480H0z"/>
      <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
    </svg>
  ),
  tr: () => (
    <svg className="w-5 h-3.5 rounded-sm object-cover shadow-sm inline-block shrink-0" viewBox="0 0 640 480">
      <path fill="#e30a17" d="M0 0h640v480H0z"/>
      <circle cx="260" cy="240" r="140" fill="#fff"/>
      <circle cx="290" cy="240" r="112" fill="#e30a17"/>
      <path fill="#fff" d="M364 240l82.3 26.7-50.9-70 50.9-70.1-82.3 26.7 31.4-86.4-82.2 59.8 31.4 86.4-82.2-59.8z"/>
    </svg>
  ),
  es: () => (
    <svg className="w-5 h-3.5 rounded-sm object-cover shadow-sm inline-block shrink-0" viewBox="0 0 640 480">
      <path fill="#c60b1e" d="M0 0h640v480H0z"/>
      <path fill="#ffc400" d="M0 120h640v240H0z"/>
    </svg>
  )
};

const LANG_OPTIONS = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'tr', label: 'TR' },
  { code: 'es', label: 'ES' }
];

export default function App() {
  const [viewMode, setViewMode] = useState('app'); // 'landing' or 'app'
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState('de');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedWifi, setCopiedWifi] = useState(false);

  // Modal for SaaS onboarding
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardForm, setOnboardForm] = useState({ hotelName: '', email: '', slug: '' });

  // Hotel Metadata
  const [accommodation, setAccommodation] = useState({
    id: 'rini-bini-hotel',
    name: 'Rini-Bini Hotel & Café',
    tagline: 'Willkommen in Ihrem Zuhause – Mit ganz viel Liebe ❤️',
    address: 'Weinstraße 35-39, 67146 Deidesheim',
    wifi_name: 'RiniBini_Guest',
    wifi_pass: 'RiniBini2026!',
    emergency_phone: '+49 6326 972201',
    checkin_time: '15:00 Uhr',
    checkout_time: '11:00 Uhr',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    is_paid: false,
    trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });

  // Categories & Details
  const [categories, setCategories] = useState([
    { id: '1', title: 'Frühstücksbuffet', desc_text: 'Täglich 08:00 - 10:30 Uhr', content: 'Genießen Sie unser frisches regionales Frühstücksbuffet im Hauptrestaurant im Erdgeschoss.', tab_type: 'overview' },
    { id: '2', title: 'Parken & Tiefgarage', desc_text: 'Kostenfrei für Gäste', content: 'Kostenlose Parkplätze stehen hinter dem Haus zur Verfügung. Garagenschlüssel an der Rezeption.', tab_type: 'rules' },
    { id: '3', title: 'Restaurant Empfehlung', desc_text: 'Pfälzer Spezialitäten', content: 'Besuchen Sie unser Partner-Weingut gleich um die Ecke für traditionelle Speisen und Weinverkostungen.', tab_type: 'gastronomy' },
    { id: '4', title: 'Wanderwege & Ausflüge', desc_text: 'Erkunden Sie Deidesheim', content: 'Direkt hinter dem Hotel beginnen die schönsten Wanderwege durch die Pfälzer Weinberge.', tab_type: 'guides' }
  ]);

  const [newCat, setNewCat] = useState({ title: '', desc_text: '', content: '', tab_type: 'overview' });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.de;
  const CurrentFlag = SVGFlags[lang] || SVGFlags.de;

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(accommodation.wifi_pass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.title || !newCat.content) return;
    setCategories([...categories, { ...newCat, id: String(Date.now()) }]);
    setNewCat({ title: '', desc_text: '', content: '', tab_type: 'overview' });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const filteredCategories = categories
    .filter(c => c.tab_type === activeTab)
    .filter(c => searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getQRUrl = () => {
    const currentUrl = window.location.origin + window.location.pathname + `?hotel=${accommodation.id}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}`;
  };

  // --- RENDER APP / MOBILE VIEW ---
  const renderAppView = () => (
    <div className="min-h-screen bg-slate-100 font-sans pb-28">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('landing')}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium bg-slate-100 px-2 py-1 rounded-lg transition-all"
          >
            ← B2B Landing
          </button>
          <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate max-w-[140px]">
            {accommodation.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Custom Dropdown Flag Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-2.5 py-1.5 shadow-sm transition-all"
            >
              <CurrentFlag />
              <span>{lang.toUpperCase()}</span>
              <span className="text-[9px] text-slate-400">▼</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 space-y-1">
                {LANG_OPTIONS.map((item) => {
                  const FlagComp = SVGFlags[item.code];
                  return (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-bold transition-all ${
                        lang === item.code ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <FlagComp />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl shadow-sm transition-all ${
              isAdmin ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'
            }`}
          >
            {isAdmin ? t.guestView : t.admin}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        {isAdmin ? (
          /* --- ADMIN PANEL --- */
          <div className="space-y-6">
            {/* QR Code Section */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.qrTitle}</h2>
              <p className="text-xs text-slate-500">{t.qrDesc}</p>
              <div className="flex justify-center py-2">
                <img src={getQRUrl()} alt="Hotel QR Code" className="w-44 h-44 rounded-2xl border p-2 bg-white shadow-inner" />
              </div>
              <a
                href={getQRUrl()}
                download="hotel-qrcode.png"
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow transition-all"
              >
                {t.qrDownload}
              </a>
            </div>

            {/* Hotel Edit Form */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.editHotel}</h2>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.hotelName}</label>
                <input
                  type="text"
                  value={accommodation.name}
                  onChange={(e) => setAccommodation({ ...accommodation, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.tagline}</label>
                <input
                  type="text"
                  value={accommodation.tagline}
                  onChange={(e) => setAccommodation({ ...accommodation, tagline: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{t.address}</label>
                <input
                  type="text"
                  value={accommodation.address}
                  onChange={(e) => setAccommodation({ ...accommodation, address: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.wifiName}</label>
                  <input
                    type="text"
                    value={accommodation.wifi_name}
                    onChange={(e) => setAccommodation({ ...accommodation, wifi_name: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t.wifiPass}</label>
                  <input
                    type="text"
                    value={accommodation.wifi_pass}
                    onChange={(e) => setAccommodation({ ...accommodation, wifi_pass: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Add Section */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.addSection}</h2>
              <form onSubmit={handleAddCategory} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tab Kategorie</label>
                  <select
                    value={newCat.tab_type}
                    onChange={(e) => setNewCat({ ...newCat, tab_type: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                  >
                    <option value="overview">{t.overview}</option>
                    <option value="rules">{t.rules}</option>
                    <option value="gastronomy">{t.gastronomy}</option>
                    <option value="guides">{t.guides}</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder={t.titlePlaceholder}
                  value={newCat.title}
                  onChange={(e) => setNewCat({ ...newCat, title: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                />
                <input
                  type="text"
                  placeholder={t.descPlaceholder}
                  value={newCat.desc_text}
                  onChange={(e) => setNewCat({ ...newCat, desc_text: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                />
                <textarea
                  placeholder={t.contentPlaceholder}
                  value={newCat.content}
                  onChange={(e) => setNewCat({ ...newCat, content: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs bg-slate-50"
                  rows="3"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow transition-all"
                >
                  {t.addBtn}
                </button>
              </form>
            </div>

            {/* Existing Entries */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-3">
              <h2 className="text-base font-bold text-slate-800 border-b pb-2">{t.entries}</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{cat.title}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[180px]">{cat.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all"
                    >
                      {t.delete}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* --- GUEST VIEW --- */
          <>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <div className="h-44 relative bg-slate-900">
                <img
                  src={accommodation.image_url}
                  alt={accommodation.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-5 text-center -mt-8 relative">
                <div className="bg-white p-3 rounded-2xl shadow-md inline-block mb-2 border border-slate-100">
                  <span className="text-2xl">🏨</span>
                </div>
                <h1 className="text-xl font-black text-slate-900">{accommodation.name}</h1>
                <p className="text-xs text-rose-600 font-semibold mt-1">{accommodation.tagline}</p>
                <p className="text-[11px] text-slate-400 mt-1">{accommodation.address}</p>

                <div className="flex justify-center gap-2 mt-4">
                  <a
                    href={`tel:${accommodation.emergency_phone}`}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {t.reception}
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(accommodation.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {t.directions}
                  </a>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 rounded-xl outline-none"
              />
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-slate-200/80 p-1 rounded-2xl gap-1 text-xs font-bold sticky top-16 z-30 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'overview' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.overview}
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'rules' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.rules}
              </button>
              <button
                onClick={() => setActiveTab('gastronomy')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'gastronomy' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.gastronomy}
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  activeTab === 'guides' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.guides}
              </button>
            </div>

            {/* Wi-Fi Card */}
            {activeTab === 'overview' && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-3xl shadow-md space-y-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <span>🛜</span>
                  <span className="font-semibold text-xs uppercase">{t.highspeedWifi}</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">{t.network}</p>
                  <p className="font-bold text-base">{accommodation.wifi_name}</p>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div>
                    <p className="text-[10px] text-rose-300 uppercase font-bold">{t.password}</p>
                    <p className="font-mono text-sm tracking-wider font-bold">{accommodation.wifi_pass}</p>
                  </div>
                  <button
                    onClick={copyWifiPassword}
                    className="bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-xl shadow hover:bg-rose-50 transition-all"
                  >
                    {copiedWifi ? t.copied : t.copy}
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic Content List */}
            <div className="space-y-3">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📌</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{cat.title}</h3>
                      {cat.desc_text && <p className="text-xs text-rose-600 font-medium">{cat.desc_text}</p>}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                    {cat.content}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Floating Wi-Fi Copy Button */}
      {!isAdmin && (
        <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-40">
          <button
            onClick={copyWifiPassword}
            className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-2xl shadow-xl flex items-center justify-between hover:bg-slate-800 transition-all border border-slate-700 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs">
              <span>🛜</span>
              <span>{t.wifi}: <strong>{accommodation.wifi_name}</strong></span>
            </div>
            <span className="text-xs bg-rose-600 px-3 py-1.5 rounded-xl font-bold">
              {copiedWifi ? t.copied : t.copyPassword}
            </span>
          </button>
        </div>
      )}
    </div>
  );

  // --- RENDER B2B LANDING PAGE ---
  const renderLandingView = () => (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💖</span>
            <span className="font-black text-xl tracking-tight text-white">GästeMappe<span className="text-rose-500">24</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('app')}
              className="text-xs font-semibold text-slate-300 hover:text-white"
            >
              Live Demo
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg"
            >
              30 Tage Testen
            </button>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-20 text-center max-w-3xl mx-auto px-4 space-y-6">
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
          Die digitale Gästemappe für <span className="text-rose-500">Hotels & FEWO</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Begeistern Sie Ihre Gäste mit einer modernen, digitalen Mappe. Kein Papier, kein Drucken, sofortige Updates per Smartphone – ohne App-Download.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowOnboarding(true)}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-xl"
          >
            Kostenlos Starten →
          </button>
          <button
            onClick={() => setViewMode('app')}
            className="bg-slate-900 border border-slate-800 text-slate-300 font-bold px-6 py-3.5 rounded-2xl text-sm"
          >
            App Live Ansehen
          </button>
        </div>
      </section>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full relative">
            <button
              onClick={() => setShowOnboarding(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white mb-4">Betrieb Registrieren</h3>
            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Hotel Name</label>
                <input
                  type="text"
                  placeholder="z.B. Hotel Sonne"
                  value={onboardForm.hotelName}
                  onChange={(e) => setOnboardForm({ ...onboardForm, hotelName: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
              <button
                onClick={() => {
                  if (onboardForm.hotelName) {
                    setAccommodation({ ...accommodation, name: onboardForm.hotelName });
                  }
                  setShowOnboarding(false);
                  setViewMode('app');
                  setIsAdmin(true);
                }}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs mt-2"
              >
                🚀 Mappe Sofort Erstellen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return viewMode === 'landing' ? renderLandingView() : renderAppView();
}