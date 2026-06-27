const SUPABASE_URL = "https://idxosbzibopdyzyzkucg.supabase.co";
const ANON_KEY = "sb_publishable_O4H7raW5EWR5x0rumTHJGg_l3FBpAHL";

// Step 1: Sign in as admin
const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: {
    "apikey": ANON_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email: "khomsans@gmail.com", password: "Suksena@2520" })
});

const loginData = await loginRes.json();
if (!loginRes.ok || !loginData.access_token) {
  console.error("Login failed:", loginData);
  process.exit(1);
}
console.log("✓ Logged in as:", loginData.user?.email);
const TOKEN = loginData.access_token;

// Step 2: Update footer_settings
const newSettings = {
  email: "info@verdixgreen.com",
  email2: "kowit007@gmail.com",
  phone: "061-951-6639",
  location: "Bangkok, Thailand",
  location2: "Chonburi, Thailand",
  ctaPage: "register",
  socials: [
    { url: "#", icon: "🌐", label: "Website" },
    { url: "#", icon: "in", label: "LinkedIn" },
    { url: "#", icon: "f", label: "Facebook" },
    { url: "mailto:info@verdixgreen.com", icon: "✉", label: "Email" }
  ],
  services: ["Expert-on-Demand","Eco-Factory","ESG Report","Net Zero Roadmap","CFO/CFP"],
  copyright: "© 2025 BUUxC Planet C",
  ctaSub_en: "Transform your business toward sustainability. Register free and connect with certified experts today.",
  ctaSub_th: "เปลี่ยนเส้นทางธุรกิจของคุณสู่ความยั่งยืน ลงทะเบียนฟรีและเชื่อมต่อกับผู้เชี่ยวชาญได้เลยวันนี้",
  legalLinks: [
    { page: "#", label_en: "Privacy Policy", label_th: "นโยบายความเป็นส่วนตัว" },
    { page: "#", label_en: "Terms of Use", label_th: "เงื่อนไขการใช้งาน" }
  ],
  quickLinks: [
    { page: "home", label_en: "Home", label_th: "หน้าแรก" },
    { page: "blog", label_en: "Knowledge", label_th: "ความรู้" },
    { page: "experts", label_en: "Experts", label_th: "ผู้เชี่ยวชาญ" },
    { page: "login", label_en: "Login", label_th: "เข้าสู่ระบบ" }
  ],
  ctaTitle_en: "Verdify Your Journey",
  ctaTitle_th: "Verdify Your Journey",
  ctaButton_en: "Start Free",
  ctaButton_th: "เริ่มต้นฟรี",
  description_en: "Sustainability Expert-on-Demand Platform for organizations ready to start, measure, and scale their sustainability journey.",
  description_th: "Sustainability Expert-on-Demand Platform สำหรับองค์กรที่ต้องการเริ่มต้น วัดผล และขับเคลื่อนแผนความยั่งยืนอย่างมั่นใจ"
};

const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/footer_settings?id=eq.main`, {
  method: "PATCH",
  headers: {
    "apikey": ANON_KEY,
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  },
  body: JSON.stringify({ settings: newSettings, updated_at: new Date().toISOString() })
});

const patchText = await patchRes.text();
console.log("PATCH status:", patchRes.status);

if (patchRes.ok) {
  // Verify
  const check = await fetch(`${SUPABASE_URL}/rest/v1/footer_settings?select=settings&id=eq.main`, {
    headers: { "apikey": ANON_KEY, "Authorization": `Bearer ${TOKEN}` }
  });
  const data = await check.json();
  console.log("\n✓ Updated successfully!");
  console.log("  email:", data[0]?.settings?.email);
  console.log("  email2:", data[0]?.settings?.email2);
  console.log("  phone:", data[0]?.settings?.phone);
  console.log("  location:", data[0]?.settings?.location);
  console.log("  location2:", data[0]?.settings?.location2);
} else {
  console.log("Response:", patchText);
}
