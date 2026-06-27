import { useEffect, useState } from "react";
import { getUserRole, isAdminRole, isAdminUser, isSupabaseConfigured, supabase } from "./lib/supabase";
import { cmsService } from "./services/cmsService";
import { cfoAssessmentService } from "./services/cfoAssessmentService";
import { tgiSurveyService } from "./services/tgiSurveyService";
import { userRoleService } from "./services/userRoleService";
import { TGI_GOOGLE_GRID_FIELDS } from "./data/tgiGoogleGridFields";

const USER_ROLE_OPTIONS = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "tgi_report_viewer", label: "TGI Report Viewer" },
  { value: "standard_user", label: "Standard User" },
];

function userRoleLabel(role) {
  return USER_ROLE_OPTIONS.find((item) => item.value === role)?.label || "Standard User";
}

function canViewTgiReports(role) {
  return role === "super_admin" || role === "admin" || role === "tgi_report_viewer";
}

function canAccessAdminPanel(role) {
  return role === "super_admin" || role === "admin" || role === "tgi_report_viewer";
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --g1:#1B4332;--g2:#2D6A4F;--g3:#40916C;--ga:#52B788;--gl:#D8F3DC;--gll:#F0FDF4;
  --white:#FAFAF8;--text:#1C1C1C;--muted:#6B7280;--border:#E5E7EB;
  --shadow:0 4px 16px rgba(0,0,0,0.08);--shadow-lg:0 8px 32px rgba(0,0,0,0.14);
  --r:10px;--r-lg:18px;
}
body{font-family:'DM Sans',-apple-system,sans-serif;background:var(--white);color:var(--text);line-height:1.6}
h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif;line-height:1.2}
button{cursor:pointer;font-family:inherit}
input,textarea,select{font-family:inherit}
.btn{border:none;padding:11px 26px;border-radius:8px;font-size:15px;font-weight:600;transition:all .18s;cursor:pointer}
.btn-dark{background:var(--g1);color:#fff}.btn-dark:hover{background:var(--g2);transform:translateY(-1px);box-shadow:var(--shadow)}
.btn-ghost{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.4);padding:9px 22px;border-radius:8px;font-size:15px;font-weight:600;transition:all .18s;cursor:pointer}
.btn-ghost:hover{background:rgba(255,255,255,.12)}
.btn-accent{background:var(--ga);color:#fff;border:none;padding:8px 18px;border-radius:7px;font-size:13px;font-weight:600;transition:all .18s;cursor:pointer}
.btn-accent:hover{background:var(--g2)}
.btn-sm{padding:6px 14px;font-size:13px;border-radius:6px;border:none;font-weight:600;cursor:pointer;transition:all .15s}
.badge{display:inline-block;background:var(--gl);color:var(--g2);padding:3px 11px;border-radius:20px;font-size:12px;font-weight:600}
.section{padding:80px 0}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.section-tag{display:block;color:var(--ga);font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px}
.section-title{font-size:clamp(26px,4vw,38px);color:var(--g1);margin-bottom:14px}
.section-sub{color:var(--muted);font-size:17px;line-height:1.7;max-width:550px}
.card{background:#fff;border-radius:var(--r-lg);box-shadow:var(--shadow);overflow:hidden;transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}

/* Navbar */
.nav{position:sticky;top:0;z-index:100;background:rgba(27,67,50,.97);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.08)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px;max-width:1320px;margin:0 auto;padding:0 20px;gap:18px}
.nav-logo{cursor:pointer;display:flex;align-items:center;flex:0 0 auto;min-width:84px;overflow:visible;padding-right:10px}
.nav-tagline{font-size:9px;color:rgba(255,255,255,.4);letter-spacing:1.5px;text-transform:uppercase;display:block;margin-top:-2px}
.nav-links{display:flex;align-items:center;gap:4px;min-width:0;flex:1;justify-content:flex-start;overflow:visible}
.nav-item{position:relative;display:flex;align-items:center}
.nav-btn{background:transparent;border:none;color:rgba(255,255,255,.75);padding:8px 8px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;line-height:1.2}
.nav-btn:hover,.nav-btn.active{color:#fff;background:rgba(255,255,255,.1)}
.nav-btn.nav-awards{max-width:none;white-space:nowrap;text-align:center;line-height:1.2}
.nav-caret{font-size:10px;margin-left:5px;color:rgba(255,255,255,.55)}
.sub-menu{position:absolute;top:calc(100% + 8px);left:0;min-width:230px;background:#fff;border:1px solid rgba(229,231,235,.92);border-radius:10px;box-shadow:0 18px 44px rgba(16,40,30,.18);padding:8px;opacity:0;visibility:hidden;transform:translateY(6px);transition:all .16s;z-index:120}
.nav-item:hover .sub-menu,.nav-item.open .sub-menu,.nav-item:focus-within .sub-menu{opacity:1;visibility:visible;transform:translateY(0)}
.sub-menu button{width:100%;border:none;background:transparent;color:var(--g1);padding:9px 10px;border-radius:7px;text-align:left;font-size:13px;font-weight:700;line-height:1.35}
.sub-menu button:hover,.sub-menu button.active{background:#ECFDF5;color:#047857}
.lang-btn{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25);padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;margin-left:5px;transition:all .15s;white-space:nowrap}
.lang-btn:hover{background:rgba(255,255,255,.22)}

/* Brand logo */
.brand-logo{display:inline-flex;align-items:center;width:min(260px,100%);aspect-ratio:3.35/1;overflow:hidden;line-height:0}
.brand-logo img{display:block;width:100%;height:100%;object-fit:contain;object-position:center}
.brand-logo.nav-brand{width:148px;height:44px}
.nav-wordmark{display:inline-flex;align-items:baseline;gap:0;font-family:'DM Sans',Arial,sans-serif;font-size:23px;font-weight:900;letter-spacing:-.4px;line-height:1}
.nav-wordmark .word-verdi{color:#2BD11F}
.nav-wordmark .word-x{color:#18A8F4}
.nav-wordmark .nav-mark-sub{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
.footer-wordmark{display:inline-flex;align-items:baseline;font-family:'DM Sans',Arial,sans-serif;font-size:30px;font-weight:900;letter-spacing:-.5px;line-height:1;margin:0 0 18px 0}
.footer-wordmark .word-verdi{color:#2BD11F}
.footer-wordmark .word-x{color:#18A8F4}
.footer-wordmark .footer-mark-sub{display:block;position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
.auth-wordmark{display:inline-flex;flex-direction:column;align-items:flex-start;width:max-content;margin-bottom:30px;font-family:'DM Sans',Arial,sans-serif;line-height:1}
.auth-wordmark-main{display:inline-flex;align-items:baseline;font-size:clamp(74px,7vw,106px);font-weight:900;letter-spacing:-.5px}
.auth-wordmark .word-verdi{color:#2BD11F}
.auth-wordmark .word-x{color:#18A8F4}
.auth-wordmark-sub{display:block;margin-top:4px;color:rgba(255,255,255,.68);font-size:11px;font-weight:800;letter-spacing:.02em;line-height:1.25}
.auth-card .auth-wordmark{align-items:center;width:100%;margin-bottom:28px}
.auth-card .auth-wordmark-main{font-size:52px}
.auth-card .auth-wordmark-sub{color:#18352b;font-size:7px;letter-spacing:.01em}
.brand-logo.auth-brand{width:min(380px,100%);margin-bottom:16px}
.auth-hero .brand-logo.auth-brand{margin-bottom:26px}
.auth-card .brand-logo.auth-brand{width:min(280px,100%);margin-bottom:18px}
.brand-logo.admin-brand-mark{width:220px}
.brand-logo.footer-brand{width:min(168px,100%);margin:0 0 18px -18px}
.brand-logo.hero-brand{width:min(720px,100%);margin:0 0 8px -64px}
.footer-partners{margin-top:38px;padding:24px 0 2px;border-top:1px solid rgba(255,255,255,.1)}
.footer-partners-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:18px}
.footer-partners-title{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#fff;font-weight:900}
.footer-partners-note{font-size:13px;color:rgba(255,255,255,.56);line-height:1.55;max-width:420px;text-align:right}
.footer-partner-list{min-height:112px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.045);border-radius:12px;padding:18px 22px;display:flex;align-items:center;justify-content:flex-start;gap:0;flex-wrap:wrap}
.footer-partner-card{min-height:70px;padding:4px 2px;display:flex;align-items:center;justify-content:center;transition:background .18s,border-color .18s,transform .18s;text-decoration:none;color:inherit;border-radius:8px}
.footer-partner-card:hover{background:rgba(255,255,255,.07);transform:translateY(-1px)}
.footer-partner-logo{width:176px;display:block}
.footer-partner-logo svg{width:100%;height:auto;display:block}
.footer-partner-img{display:block;max-width:100%;width:auto;max-height:64px;object-fit:contain}
.footer-partner-img.partner-buu-planet-c{max-height:54px;max-width:150px}
.footer-partner-name{font-size:14px;font-weight:800;color:#fff;text-align:center;line-height:1.45}
.partner-buu{font-family:Arial Black,Impact,'DM Sans',sans-serif;font-weight:900;letter-spacing:-3px}
.partner-caption{font-family:'DM Sans',Arial,sans-serif;font-weight:900;letter-spacing:.04em}
.about-split,.about-market{display:grid;grid-template-columns:1.1fr .9fr;gap:34px;align-items:start}
.about-market{grid-template-columns:1fr 1fr;gap:28px;align-items:center}
.about-hero-article{max-width:1080px;margin-top:26px;padding:26px 30px;border-radius:16px;background:rgba(255,255,255,.78);border:1px solid rgba(183,205,193,.55);box-shadow:0 18px 48px rgba(16,40,30,.08);backdrop-filter:blur(8px)}
.about-hero-article h2{font-family:'DM Sans',sans-serif;font-size:24px;line-height:1.45;color:var(--g1);margin:0 0 16px;font-weight:900}
.about-hero-article p{max-width:none!important;margin:0 0 16px!important;color:#263b31!important;font-size:17px!important;line-height:1.95!important}
.about-hero-article p:last-child{margin-bottom:0!important}
.about-hero-article h3{font-family:'DM Sans',sans-serif;font-size:22px;line-height:1.45;color:var(--g1);margin:26px 0 14px;font-weight:900}
.about-hero-article ul{display:grid;gap:10px;margin:4px 0 18px;padding-left:28px;color:#263b31;font-size:17px;line-height:1.85}
.about-hero-article li{padding-left:4px}
.about-card-image{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:20px;border:1px solid rgba(255,255,255,.16);box-shadow:0 18px 40px rgba(0,0,0,.18);background:rgba(255,255,255,.08)}
.about-feature-row{display:grid;grid-template-columns:170px minmax(180px,260px) 1fr;gap:20px;align-items:start}
.about-feature-image{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;border:1px solid rgba(229,231,235,.9);box-shadow:0 12px 28px rgba(16,40,30,.08);background:#fff}
.about-wide-image{width:100%;max-height:360px;object-fit:cover;border-radius:14px;border:1px solid rgba(229,231,235,.92);box-shadow:0 18px 42px rgba(16,40,30,.1);margin-bottom:24px;background:#fff}
.about-market-image{width:100%;border-radius:14px;border:1px solid rgba(229,231,235,.92);box-shadow:0 18px 42px rgba(16,40,30,.1);background:#fff;margin-bottom:16px}
@media(max-width:1120px){.nav-inner{gap:10px;padding:0 12px}.nav-logo{min-width:76px;padding-right:8px}.nav-wordmark{font-size:21px}.brand-logo.nav-brand{width:126px;height:40px}.nav-btn{font-size:12px;padding:8px 6px}.nav-caret{margin-left:3px}}
@media(max-width:980px){.nav-logo{min-width:72px}.nav-wordmark{font-size:20px}}
@media(max-width:560px){.nav-inner{padding:0 8px;gap:6px}.nav-logo{min-width:66px;padding-right:6px}.nav-wordmark{font-size:18px}.brand-logo.nav-brand{width:106px;height:34px}.nav-btn{font-size:12px;padding:8px 5px}}
@media(max-width:900px){.about-split,.about-market,.about-feature-row{grid-template-columns:1fr!important}}

/* Breadcrumb */
.breadcrumb{background:#fff;border-bottom:1px solid var(--border);padding:10px 0}
.breadcrumb-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
.breadcrumb-inner span{color:var(--muted)}
.breadcrumb-inner button{background:none;border:none;color:var(--ga);font-size:13px;cursor:pointer;font-weight:500}
.breadcrumb-inner button:hover{text-decoration:underline}

/* Testimonial */
.testi-card{background:#fff;border-radius:var(--r-lg);padding:28px;border:1px solid var(--border);position:relative;transition:all .2s}
.testi-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--ga)}
.testi-quote{font-size:40px;color:var(--gl);position:absolute;top:16px;right:20px;line-height:1;font-family:Georgia,serif}
.testi-text{font-size:15px;color:var(--text);line-height:1.8;margin-bottom:20px;font-style:italic}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--g1),var(--ga));display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;flex-shrink:0}
.testi-name{font-size:14px;font-weight:700;color:var(--g1)}
.testi-org{font-size:12px;color:var(--muted);margin-top:1px}
.testi-stars{display:flex;gap:2px;margin-bottom:8px}

/* FAQ Accordion */
.faq-item{border:1px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:8px;transition:border-color .2s}
.faq-item.open{border-color:var(--ga)}
.faq-q{width:100%;background:#fff;border:none;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;text-align:left;font-size:15px;font-weight:600;color:var(--g1);transition:background .15s}
.faq-q:hover{background:var(--gll)}
.faq-item.open .faq-q{background:var(--gll)}
.faq-chevron{font-size:12px;color:var(--ga);transition:transform .25s;flex-shrink:0;margin-left:12px}
.faq-item.open .faq-chevron{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s}
.faq-item.open .faq-a{max-height:300px}
.faq-a-inner{padding:0 20px 18px;font-size:14px;color:var(--muted);line-height:1.8}

/* Back to Top */
.back-top{position:fixed;bottom:28px;right:28px;width:46px;height:46px;background:var(--g1);color:#fff;border:none;border-radius:50%;font-size:18px;cursor:pointer;box-shadow:var(--shadow-lg);opacity:0;transform:translateY(12px);transition:all .25s;z-index:90}
.back-top.visible{opacity:1;transform:translateY(0)}
.back-top:hover{background:var(--ga);transform:translateY(-2px)}

/* Global search bar */
.gsearch-wrap{position:relative;margin-bottom:0}
.gsearch-inp{width:100%;padding:13px 20px 13px 46px;border:2px solid var(--border);border-radius:30px;font-size:15px;background:#fff;transition:border-color .2s,box-shadow .2s}
.gsearch-inp:focus{outline:none;border-color:var(--ga);box-shadow:0 0 0 4px rgba(82,183,136,.12)}
.gsearch-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:16px;color:var(--muted)}

/* Announcement Banner */
.announce-bar{background:linear-gradient(90deg,var(--g2),var(--g3));padding:9px 0;text-align:center;font-size:13px;color:#fff;font-weight:500;position:relative}
.announce-bar em{color:var(--ga);font-style:normal;font-weight:700}

/* Trust badges */
.trust-bar{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:20px 0}
.trust-item{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px;font-weight:500}
.trust-item span{font-size:20px}

/* Directory pages */
.page-hdr{background:linear-gradient(180deg,#fff 0%,#f7fbf8 100%);border-bottom:1px solid var(--border);padding:48px 0 36px}
.page-hdr h1{font-size:clamp(30px,4vw,44px);color:var(--g1);margin-bottom:8px}
.page-hdr p{color:var(--muted);font-size:16px;max-width:620px;line-height:1.7}
.directory-tools{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:28px}
.search-wrap{position:relative;flex:0 1 360px}
.search-inp{width:100%;height:44px;border:1px solid var(--border);border-radius:8px;background:#fff;padding:0 15px;font-size:14px;color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.03)}
.search-inp:focus{outline:none;border-color:var(--ga);box-shadow:0 0 0 4px rgba(82,183,136,.12)}
.filters{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;flex:1}
.filter-btn{height:36px;border:1px solid var(--border);border-radius:20px;background:#fff;color:var(--muted);padding:0 14px;font-size:13px;font-weight:600;transition:all .16s}
.filter-btn:hover,.filter-btn.active{background:var(--g1);border-color:var(--g1);color:#fff}
.experts-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.exp-card{min-height:270px;padding:24px;display:flex;flex-direction:column;border:1px solid rgba(229,231,235,.7);box-shadow:0 12px 28px rgba(16,40,30,.08)}
.exp-card:hover{transform:translateY(-3px);box-shadow:0 18px 36px rgba(16,40,30,.12)}
.exp-info{display:flex;gap:14px;align-items:flex-start;margin-bottom:18px}
.exp-avatar{width:50px;height:50px;border-radius:14px;background:var(--gll);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.exp-name{font-size:16px;font-weight:800;color:var(--g1);line-height:1.35;margin-bottom:4px}
.exp-title{font-size:14px;color:var(--text);line-height:1.5;margin-bottom:8px}
.exp-loc{font-size:13px;color:var(--muted)}
.exp-tags{display:flex;gap:7px;flex-wrap:wrap;margin:2px 0 18px}
.exp-tag{background:#ECFDF5;color:#047857;border:1px solid #BBF7D0;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:700}
.exp-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:auto;padding-top:16px;border-top:1px solid var(--border)}
.exp-rating{font-size:14px;color:var(--g1);font-weight:800}
.exp-card .btn-accent{min-width:92px}

/* Articles */
.articles-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}
.solution-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}
.solution-grid .feat-card{display:flex;flex-direction:column;min-width:0}
.feat-image-btn{width:100%;border:0;background:transparent;padding:0;margin:0 0 18px;display:block;text-align:left;cursor:zoom-in;border-radius:10px}
.feat-image{width:100%;height:152px;aspect-ratio:16/9;object-fit:contain;object-position:center;border-radius:10px;border:1px solid rgba(229,231,235,.9);box-shadow:0 10px 24px rgba(16,40,30,.08);display:block;background:#fff;padding:6px;transition:transform .18s,box-shadow .18s}
.feat-image-btn:hover .feat-image{transform:translateY(-2px);box-shadow:0 16px 34px rgba(16,40,30,.14)}
.image-modal-backdrop{position:fixed;inset:0;background:rgba(8,21,16,.82);z-index:1000;display:flex;align-items:center;justify-content:center;padding:28px;backdrop-filter:blur(5px)}
.image-modal{position:relative;width:min(96vw,1320px);max-height:92vh;background:#fff;border-radius:14px;box-shadow:0 24px 80px rgba(0,0,0,.35);padding:14px;overflow:auto}
.image-modal img{width:100%;height:auto;display:block;border-radius:10px}
.image-modal-close{position:sticky;top:0;margin-left:auto;margin-bottom:10px;min-width:64px;height:38px;border:0;border-radius:999px;background:var(--g1);color:#fff;font-size:14px;font-weight:700;line-height:1;display:flex;align-items:center;justify-content:center;gap:6px;z-index:2;padding:0 14px}
.image-modal-close:hover{background:var(--g2)}
@media(max-width:600px){.image-modal-backdrop{padding:10px}.image-modal{width:100%;max-height:94vh;padding:10px}.image-modal-close{min-width:58px;height:34px;font-size:13px}}
.art-card{cursor:pointer;background:#fff;border:1px solid rgba(229,231,235,.82);border-radius:12px;overflow:hidden;box-shadow:0 12px 28px rgba(16,40,30,.08);display:flex;flex-direction:column;min-height:390px;transition:transform .2s,box-shadow .2s,border-color .2s}
.art-card:hover{transform:translateY(-4px);box-shadow:0 20px 42px rgba(16,40,30,.13);border-color:rgba(82,183,136,.38)}
.art-img{height:138px;background:linear-gradient(135deg,#EAF8EF,#D8F3DC);display:flex;align-items:center;justify-content:center;font-size:42px;border-bottom:1px solid rgba(229,231,235,.7);overflow:hidden}
.art-img.has-image{height:auto;aspect-ratio:3/2;background:#EAF8EF}
.art-img img{width:100%;height:100%;object-fit:cover;display:block}
.art-body{padding:20px;display:flex;flex-direction:column;flex:1}
.art-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.art-meta .badge{white-space:nowrap}
.art-date{font-size:12px;color:#94A3B8;white-space:nowrap}
.art-title{font-family:'Playfair Display',Georgia,serif;font-size:20px;line-height:1.32;color:var(--g1);margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.art-excerpt{font-size:14px;line-height:1.75;color:#526174;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:18px}
.art-footer{margin-top:auto;padding-top:14px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:14px;font-size:13px;color:var(--muted)}
.art-author{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.read-more{color:var(--g2);font-weight:800;white-space:nowrap}
.article-page{background:linear-gradient(180deg,#F7FBF8 0%,#fff 34%,#FAFAF8 100%);padding:34px 0 82px}
.detail-wrap{max-width:1040px;margin:0 auto;padding:0 24px}
.back-btn{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(82,183,136,.28);background:#fff;color:var(--g1);border-radius:999px;padding:9px 16px;font-size:13px;font-weight:800;box-shadow:0 8px 20px rgba(16,40,30,.06);transition:all .18s;margin-bottom:22px}
.back-btn:hover{transform:translateY(-1px);border-color:var(--ga);box-shadow:0 12px 26px rgba(16,40,30,.1)}
.article-hero{position:relative;overflow:hidden;border-radius:18px;background:linear-gradient(135deg,#10281e 0%,#1B4332 52%,#40916C 100%);color:#fff;padding:48px;box-shadow:0 24px 70px rgba(16,40,30,.18);margin-bottom:28px}
.article-hero::after{content:"";position:absolute;right:-70px;bottom:-90px;width:260px;height:260px;border-radius:50%;border:46px solid rgba(216,243,220,.18)}
.article-kicker{display:flex;align-items:center;gap:10px;position:relative;z-index:1;margin-bottom:18px;flex-wrap:wrap}
.article-hero .badge{background:rgba(216,243,220,.96);color:var(--g1)}
.detail-img{width:54px;height:54px;border-radius:16px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}
.detail-img.has-image{overflow:hidden;background:#fff;padding:3px}
.detail-img img{width:100%;height:100%;object-fit:cover;border-radius:12px;display:block}
.detail-title{position:relative;z-index:1;color:#fff;font-size:clamp(34px,5vw,58px);letter-spacing:0;max-width:880px;margin-bottom:18px}
.detail-meta{position:relative;z-index:1;display:flex;align-items:center;gap:10px 18px;flex-wrap:wrap;color:rgba(255,255,255,.78);font-size:14px;font-weight:700}
.article-shell{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:28px;align-items:start}
.article-card{background:#fff;border:1px solid rgba(229,231,235,.86);border-radius:16px;box-shadow:0 18px 46px rgba(16,40,30,.09);padding:42px}
.article-cover{margin:-18px -18px 34px;border-radius:14px;overflow:hidden;border:1px solid rgba(229,231,235,.9);box-shadow:0 16px 38px rgba(16,40,30,.1);background:#EAF8EF}
.article-cover img{width:100%;display:block;aspect-ratio:3/2;object-fit:cover}
.article-intro{font-size:20px;line-height:1.85;color:#24382f;margin-bottom:28px;padding-bottom:26px;border-bottom:1px solid var(--border)}
.detail-body{font-size:17px;line-height:1.95;color:#27362f}
.detail-body h2{font-size:clamp(25px,3vw,34px);color:var(--g1);margin:42px 0 14px}
.detail-body p{margin:0 0 18px}
.article-list{display:grid;gap:10px;margin:18px 0 28px;padding:0;list-style:none}
.article-list li{position:relative;background:#F8FCF9;border:1px solid #E2F3E8;border-radius:10px;padding:12px 14px 12px 42px;color:#254237;font-weight:700;line-height:1.55}
.article-list li::before{content:"";position:absolute;left:16px;top:20px;width:9px;height:9px;border-radius:50%;background:var(--ga);box-shadow:0 0 0 5px rgba(82,183,136,.14)}
.article-callout{background:linear-gradient(135deg,#F0FDF4,#fff);border:1px solid #BBF7D0;border-left:5px solid var(--ga);border-radius:14px;padding:22px 24px;margin:28px 0;color:var(--g1);font-size:18px;line-height:1.8;font-weight:800}
.article-quote{font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,34px);line-height:1.45;color:var(--g1);background:#F7FBF8;border-radius:14px;padding:28px;margin:34px 0 0;text-align:center}
.article-cta-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:26px 0 18px}
.article-cta-item{background:#10281e;color:#fff;border-radius:12px;padding:16px;font-weight:800;line-height:1.45;box-shadow:0 14px 28px rgba(16,40,30,.12)}
.article-side{position:sticky;top:90px;display:grid;gap:14px}
.article-side-card{background:#fff;border:1px solid rgba(229,231,235,.88);border-radius:14px;padding:20px;box-shadow:0 14px 34px rgba(16,40,30,.08)}
.article-side-title{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ga);font-weight:900;margin-bottom:12px}
.article-side-card p{color:var(--muted);font-size:14px;line-height:1.75;margin-bottom:14px}
.article-side-tags{display:flex;flex-wrap:wrap;gap:8px}
.article-side-tags span{background:#ECFDF5;color:#047857;border:1px solid #BBF7D0;border-radius:999px;padding:5px 10px;font-size:12px;font-weight:800}
.article-side .btn-accent{width:100%;padding:11px 16px;font-size:14px}

/* Download center */
.download-hero{background:linear-gradient(135deg,#10281e,#1B4332 58%,#40916C);color:#fff;padding:54px 0 44px;border-bottom:1px solid rgba(255,255,255,.08)}
.download-hero h1{font-size:clamp(34px,5vw,56px);color:#fff;margin-bottom:10px}
.download-hero p{color:rgba(255,255,255,.76);font-size:17px;line-height:1.75;max-width:760px}
.survey-page{background:#FBF2E3;padding:34px 0 72px}
.survey-shell{max-width:1040px;margin:0 auto;padding:0 24px}
.survey-hero{background:#fff;border-top:12px solid #356351;border-radius:12px;box-shadow:0 16px 44px rgba(16,40,30,.12);overflow:hidden;border-left:1px solid rgba(53,99,81,.16);border-right:1px solid rgba(53,99,81,.16);border-bottom:1px solid rgba(53,99,81,.16)}
.survey-hero-inner{padding:30px 34px 28px}
.survey-kicker{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#5D9894;font-weight:900;margin-bottom:10px}
.survey-title{font-family:'Niramit','DM Sans',sans-serif;font-size:clamp(28px,4vw,42px);line-height:1.28;color:#356351;margin:0 0 16px;font-weight:900}
.survey-intro{font-family:'Niramit','DM Sans',sans-serif;color:#30453c;font-size:16px;line-height:1.9;max-width:900px;margin:0}
.survey-sections{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:22px}
.survey-sections span{background:#FBF2E3;border:1px solid rgba(236,192,113,.55);border-radius:9px;padding:9px 12px;color:#356351;font-size:13px;font-weight:800}
.survey-frame-card{margin-top:18px;background:#fff;border-radius:12px;border:1px solid rgba(53,99,81,.16);box-shadow:0 16px 44px rgba(16,40,30,.1);overflow:hidden}
.survey-frame-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:15px 18px;border-bottom:1px solid rgba(53,99,81,.12);background:#fff}
.survey-frame-head strong{color:#356351;font-size:15px}
.survey-frame-head a{color:#356351;font-size:13px;font-weight:900;text-decoration:none;border:1px solid rgba(53,99,81,.22);border-radius:999px;padding:7px 12px;background:#FBF2E3}
.survey-frame{width:100%;height:7600px;border:0;display:block;background:#FBF2E3}
.survey-form{display:grid;gap:22px;padding:24px 26px 28px}
.survey-form-section{border:1px solid rgba(53,99,81,.14);border-radius:12px;padding:18px;background:#fff}
.survey-form-section h2{font-family:'Niramit','DM Sans',sans-serif;color:#356351;font-size:20px;margin:0 0 14px;font-weight:900}
.survey-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.survey-overview-section{background:linear-gradient(180deg,#fff,#F8FCF9)}
.survey-part-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}
.survey-part-item{border:1px solid rgba(53,99,81,.14);border-radius:10px;background:#F8FCF9;color:#30453c;font-size:14px;line-height:1.55;font-weight:800;padding:10px 12px}
.survey-field{display:grid;gap:7px}
.survey-field label{font-size:14px;color:#1B4332;font-weight:800}
.survey-required{color:#DC2626}
.survey-radio-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.survey-radio{border:1px solid rgba(53,99,81,.16);border-radius:10px;padding:10px;background:#F8FCF9;display:flex;align-items:center;justify-content:center;gap:7px;font-weight:800;color:#356351;cursor:pointer}
.survey-radio input{accent-color:#356351}
.survey-check-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.survey-check{display:flex;align-items:center;gap:9px;border:1px solid rgba(53,99,81,.14);border-radius:9px;padding:10px 12px;color:#30453c;font-weight:700;background:#F8FCF9}
.survey-check input{accent-color:#356351}
.survey-grid-groups{display:grid;gap:18px;margin-top:20px}
.survey-grid-group{border:1px solid rgba(53,99,81,.12);border-radius:12px;background:#FAFFFC;overflow:hidden}
.survey-grid-group h3{margin:0;padding:14px 16px;background:#EAF7EE;color:#1B4332;font-size:16px;line-height:1.55;font-weight:900}
.survey-grid-table{display:grid}
.survey-grid-row{display:grid;grid-template-columns:minmax(260px,1.2fr) minmax(360px,2fr);gap:12px;align-items:center;padding:12px 14px;border-top:1px solid rgba(53,99,81,.1)}
.survey-grid-question{font-size:14px;line-height:1.55;color:#30453c;font-weight:800}
.survey-radio-grid.compact{grid-template-columns:repeat(auto-fit,minmax(74px,1fr));gap:7px}
.survey-radio-grid.compact .survey-radio{min-height:38px;padding:8px 6px;font-size:13px}
.survey-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.survey-submit-note{color:#6B7280;font-size:13px;line-height:1.6}
.survey-message{border-radius:10px;padding:12px 14px;font-size:14px;font-weight:800}
.survey-message.success{background:#DCFCE7;color:#166534;border:1px solid #BBF7D0}
.survey-message.error{background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA}
.download-tools{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:28px}
.download-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.doc-card{background:#fff;border:1px solid rgba(210,216,224,.95);border-radius:7px;padding:0;box-shadow:0 4px 13px rgba(16,40,30,.07);display:flex;flex-direction:column;min-height:310px;overflow:hidden;transition:transform .18s,box-shadow .18s,border-color .18s}
.doc-card:hover{transform:translateY(-2px);box-shadow:0 12px 26px rgba(16,40,30,.12);border-color:rgba(82,183,136,.38)}
.doc-head{min-height:92px;padding:18px 16px;border-bottom:1px solid #E5E7EB;display:flex;align-items:flex-start}
.doc-visual{flex:1;display:flex;align-items:center;justify-content:center;padding:30px 14px 18px}
.doc-icon{width:90px;height:90px;border-radius:999px;background:#2F3740;color:#17202a;display:flex;align-items:center;justify-content:center;font-size:0;margin:0;position:relative}
.doc-icon::before{content:"";width:46px;height:32px;border-radius:4px;background:currentColor;display:block;position:relative}
.doc-icon::after{content:"";width:20px;height:7px;border-radius:4px 4px 0 0;background:currentColor;position:absolute;left:29px;top:27px}
.doc-card.folder .doc-icon{background:#FFB900;color:#fff}
.doc-card.folder .doc-icon::before{box-shadow:0 -9px 0 -3px rgba(255,255,255,.18)}
.doc-title{font-size:15px;line-height:1.45;color:#0B2D59;font-weight:900;margin:0}
.doc-desc{display:none}
.doc-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:14px;border-top:1px solid var(--border)}
.doc-meta span{background:#F8FAFC;border:1px solid #E5E7EB;border-radius:999px;padding:4px 9px;font-size:12px;color:#526174;font-weight:700}
.doc-actions{padding:0 30px 30px;margin-top:auto}
.doc-actions .btn-accent{font-size:15px;padding:10px 16px;width:100%;display:flex;align-items:center;justify-content:center;background:#28A745;border-radius:3px;line-height:1.35}
.doc-actions .btn-accent:hover{background:#218838}
.doc-detail-head{display:flex;align-items:center;justify-content:space-between;gap:20px;border-bottom:1px solid #D8DEE6;padding-bottom:14px;margin-bottom:2px}
.doc-back{display:inline-flex;align-items:center;gap:8px;background:#0D6EFD;color:#fff;border:0;border-radius:3px;padding:10px 14px;font-size:14px;font-weight:800}
.doc-detail-title{font-size:clamp(26px,3.5vw,36px);color:#0B2D59;text-align:right;margin:0}
.doc-file-table{width:100%;border-collapse:collapse;background:#fff}
.doc-table-wrap{width:100%;overflow-x:auto}
.doc-file-table th{font-size:14px;color:#111827;text-align:left;padding:11px 8px;border-bottom:2px solid #D8DEE6;font-weight:900}
.doc-file-table td{font-size:15px;color:#111827;padding:9px 8px;border-bottom:1px solid #D8DEE6;vertical-align:middle}
.doc-file-name{font-weight:800;line-height:1.55}
.doc-file-type{text-transform:lowercase;width:110px}
.doc-file-action{width:230px}
.doc-file-action .btn-accent{width:100%;display:flex;align-items:center;justify-content:center;background:#28A745;border-radius:3px;padding:10px 16px;font-size:15px;text-decoration:none}
.doc-file-action .btn-accent:hover{background:#218838}
@media(max-width:700px){.doc-detail-head{align-items:flex-start;flex-direction:column-reverse}.doc-detail-title{text-align:left}.doc-file-table{min-width:720px}.doc-file-action{width:190px}}

/* Platform workflow */
.platform-flow{background:#10281e;color:#fff;border-radius:18px;padding:34px;box-shadow:0 22px 60px rgba(16,40,30,.16);overflow:hidden;position:relative}
.platform-flow::after{content:"";position:absolute;right:-70px;top:-90px;width:230px;height:230px;border-radius:50%;border:42px solid rgba(82,183,136,.12)}
.platform-flow-head{position:relative;z-index:1;display:flex;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:28px}
.platform-flow-head h3{font-size:clamp(25px,3vw,36px);color:#fff;margin-bottom:8px}
.platform-flow-head p{color:rgba(255,255,255,.68);font-size:15px;line-height:1.75;max-width:650px}
.platform-flow-badges{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
.platform-flow-badges span{background:rgba(82,183,136,.16);border:1px solid rgba(82,183,136,.32);color:#B7F7CE;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:800;white-space:nowrap}
.platform-flow-steps{position:relative;z-index:1;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.platform-step{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:18px 16px;min-height:150px}
.platform-step-icon{width:38px;height:38px;border-radius:11px;background:rgba(82,183,136,.18);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px}
.platform-step-title{font-size:14px;font-weight:900;color:#fff;line-height:1.35;margin-bottom:7px}
.platform-step-desc{font-size:12px;line-height:1.65;color:rgba(255,255,255,.64)}
.platform-flow-cta{position:relative;z-index:1;margin-top:22px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:space-between;gap:18px}
.platform-flow-cta p{font-size:14px;line-height:1.7;color:rgba(255,255,255,.7);max-width:720px}
.platform-flow-cta .btn-accent{font-size:14px;padding:11px 20px;white-space:nowrap}

/* Auth */
.auth-page{min-height:calc(100vh - 64px);background:linear-gradient(135deg,#F7FBF8 0%,#ECFDF5 46%,#fff 100%);display:grid;grid-template-columns:minmax(420px,1fr) minmax(340px,480px);align-items:stretch}
.auth-hero{background:radial-gradient(circle at 20% 20%,rgba(82,183,136,.18),transparent 32%),linear-gradient(135deg,#10281e,#1B4332 58%,#2D6A4F);color:#fff;padding:64px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
.auth-hero::after{content:"";position:absolute;right:-90px;bottom:-90px;width:280px;height:280px;border-radius:50%;border:48px solid rgba(82,183,136,.14)}
.auth-hero h1{font-size:clamp(36px,5vw,58px);color:#fff;margin-bottom:14px;max-width:620px}
.auth-hero p{font-size:16px;line-height:1.8;color:rgba(255,255,255,.74);max-width:560px;margin-bottom:28px}
.auth-points{display:grid;gap:12px;max-width:520px}
.auth-point{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.82);font-size:14px}
.auth-point span{width:28px;height:28px;border-radius:8px;background:rgba(82,183,136,.18);display:inline-flex;align-items:center;justify-content:center;color:var(--ga)}
.auth-panel{display:flex;align-items:center;justify-content:center;padding:30px 24px}
.auth-card{width:min(100%,395px);background:#fff;border:1px solid rgba(229,231,235,.84);border-radius:14px;padding:28px 30px;box-shadow:0 18px 44px rgba(16,40,30,.11)}
.auth-title{font-size:26px;color:var(--g1);margin-bottom:6px}
.auth-subtitle{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:20px}
.form-grp{margin-bottom:13px}
.form-lbl{display:block;font-size:13px;font-weight:800;color:var(--g1);margin-bottom:7px}
.form-inp{width:100%;border:1px solid var(--border);border-radius:8px;background:#fff;color:var(--text);padding:9px 12px;font-size:14px;transition:border-color .18s,box-shadow .18s}
.form-inp:focus{outline:none;border-color:var(--ga);box-shadow:0 0 0 4px rgba(82,183,136,.12)}
.auth-card .btn.btn-dark{padding:11px 16px!important;font-size:15px!important}
.admin-hint{margin-top:14px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:9px 11px;font-size:12px;color:#166534}
.auth-message{margin-top:12px;padding:10px 12px;border-radius:8px;background:#F0FDF4;color:#166534;font-size:12px;line-height:1.5}
.auth-message.error{background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA}
.form-hint{margin-top:15px;text-align:center;color:var(--muted);font-size:13px}
.form-hint button{border:none;background:none;color:var(--g2);font-size:14px;font-weight:800;padding:0}

/* Admin dashboard */
.admin-wrap{min-height:calc(100vh - 64px);display:grid;grid-template-columns:270px minmax(0,1fr);background:linear-gradient(180deg,#F7FBF8 0%,#EEF7F1 100%)}
.admin-side{background:linear-gradient(180deg,#10281e 0%,#1B4332 100%);color:#fff;padding:24px 18px;border-right:1px solid rgba(255,255,255,.08);box-shadow:10px 0 34px rgba(16,40,30,.08)}
.admin-brand{padding:8px 8px 22px;margin-bottom:18px;border-bottom:1px solid rgba(255,255,255,.12)}
.admin-brand-sub{font-size:11px;letter-spacing:2px;color:rgba(255,255,255,.55);margin-top:14px;font-weight:800}
.side-section{font-size:11px;letter-spacing:1.8px;color:rgba(255,255,255,.42);font-weight:800;margin:0 8px 10px}
.side-item{width:100%;border:none;background:transparent;color:rgba(255,255,255,.72);display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:8px;font-size:14px;font-weight:700;text-align:left;margin-bottom:4px;transition:all .18s}
.side-item:hover,.side-item.active{background:rgba(255,255,255,.1);color:#fff}
.side-item.active{box-shadow:inset 3px 0 0 var(--ga)}
.admin-main{padding:34px 40px;min-width:0}
.adm-title{font-family:'Playfair Display',Georgia,serif;font-size:32px;line-height:1.15;color:var(--g1);font-weight:900;margin-bottom:4px}
.adm-sub{color:var(--muted);font-size:14px;margin-bottom:24px}
.adm-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px}
.adm-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-bottom:30px}
.adm-stat{background:#fff;border:1px solid rgba(229,231,235,.9);border-radius:14px;padding:20px;box-shadow:0 10px 28px rgba(16,40,30,.07);position:relative;overflow:hidden}
.adm-stat::after{content:"";position:absolute;inset:auto 0 0;height:3px;background:linear-gradient(90deg,var(--ga),#FFCC00)}
.adm-stat-icon{width:42px;height:42px;border-radius:12px;background:#ECFDF5;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px}
.adm-stat-n{font-size:28px;font-weight:900;color:var(--g1);line-height:1}
.adm-stat-l{font-size:13px;color:var(--muted);margin-top:8px}
.tbl-wrap{background:#fff;border:1px solid rgba(229,231,235,.9);border-radius:14px;box-shadow:0 10px 28px rgba(16,40,30,.07);overflow:auto}
.tbl-wrap table{width:100%;border-collapse:collapse;font-size:14px}
.tbl-wrap th{background:#F8FAFC;color:#475569;font-size:12px;text-transform:uppercase;letter-spacing:.04em;text-align:left;padding:13px 16px;border-bottom:1px solid var(--border);white-space:nowrap}
.tbl-wrap td{padding:14px 16px;border-bottom:1px solid #EEF2F7;vertical-align:middle}
.tbl-wrap tbody tr:hover{background:#FAFFFC}
.tbl-wrap tbody tr:last-child td{border-bottom:none}
.tbl-actions{display:flex;gap:8px;flex-wrap:wrap}
.btn-edit{background:#E0F2FE;color:#075985}
.btn-del{background:#FEE2E2;color:#991B1B}
.btn-edit:hover,.btn-del:hover{filter:brightness(.96)}
.menu-level{display:inline-flex;align-items:center;border-radius:20px;padding:3px 10px;font-size:12px;font-weight:800;background:#EEF2FF;color:#3730A3}
.menu-level.sub{background:#ECFDF5;color:#047857}
.menu-indent{display:inline-block;width:18px;height:1px;background:var(--border);margin-right:8px;vertical-align:middle}
.form-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.tgi-report-print{display:grid;gap:18px}
.tgi-report-hero{background:linear-gradient(135deg,#10281e,#1B4332 58%,#40916C);color:#fff;border-radius:18px;padding:28px;box-shadow:0 18px 44px rgba(16,40,30,.14);position:relative;overflow:hidden}
.tgi-report-hero::after{content:"";position:absolute;right:-80px;bottom:-110px;width:280px;height:280px;border-radius:50%;border:44px solid rgba(255,255,255,.08)}
.tgi-report-kicker{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#BBF7D0;font-weight:900;margin-bottom:8px}
.tgi-report-title{font-family:'Playfair Display',Georgia,serif;font-size:34px;line-height:1.15;font-weight:900;margin-bottom:8px;position:relative;z-index:1}
.tgi-report-meta{color:rgba(255,255,255,.74);font-size:13px;line-height:1.6;position:relative;z-index:1}
.tgi-print-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px;position:relative;z-index:1}
.tgi-print-btn{border:0;background:#fff;color:var(--g1);border-radius:10px;padding:11px 16px;font-size:14px;font-weight:900;box-shadow:0 10px 24px rgba(0,0,0,.16);cursor:pointer}
.tgi-print-btn:hover{background:#ECFDF5}
.tgi-print-btn.secondary{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.36);box-shadow:none}
.tgi-print-btn.secondary:hover{background:rgba(255,255,255,.22)}
.tgi-report-actions{background:#fff;border:1px solid rgba(229,231,235,.9);border-radius:16px;padding:16px 18px;margin-bottom:18px;box-shadow:0 10px 28px rgba(16,40,30,.07)}
.tgi-report-actions-title{font-size:15px;font-weight:900;color:var(--g1);margin-bottom:10px}
.tgi-report-action-grid{display:flex;gap:10px;flex-wrap:wrap}
.tgi-report-action-grid .btn-ghost,.tgi-report-action-grid .btn{white-space:nowrap}
.tgi-executive-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:18px}
.tgi-panel{background:#fff;border:1px solid rgba(229,231,235,.9);border-radius:16px;padding:22px;box-shadow:0 12px 30px rgba(16,40,30,.07)}
.tgi-panel-title{font-size:16px;font-weight:900;color:var(--g1);margin-bottom:12px}
.tgi-summary-list{display:grid;gap:10px;margin:0;padding:0;list-style:none;color:#263b31;font-size:14px;line-height:1.65}
.tgi-summary-list li{position:relative;padding-left:22px}
.tgi-summary-list li::before{content:"";position:absolute;left:0;top:10px;width:8px;height:8px;border-radius:50%;background:var(--ga)}
.tgi-score-ring{width:150px;height:150px;border-radius:50%;background:conic-gradient(var(--ga) calc(var(--score)*1%), #E5E7EB 0);display:flex;align-items:center;justify-content:center;margin:8px auto 14px;box-shadow:inset 0 0 0 14px #fff}
.tgi-score-ring-inner{width:112px;height:112px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #E5E7EB}
.tgi-score-number{font-size:34px;font-weight:900;color:var(--g1);line-height:1}
.tgi-score-label{font-size:12px;color:var(--muted);margin-top:4px}
.tgi-bar-list{display:grid;gap:12px}
.tgi-bar-row{display:grid;grid-template-columns:150px 1fr 54px;gap:12px;align-items:center;font-size:13px}
.tgi-bar-track{height:10px;background:#E5E7EB;border-radius:999px;overflow:hidden}
.tgi-bar-fill{height:100%;background:linear-gradient(90deg,var(--ga),#FFCC00);border-radius:999px}
.tgi-dist-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.tgi-field-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-bottom:16px}
.tgi-field-kpi{border:1px solid #DBEAFE;background:linear-gradient(180deg,#fff,#F8FBFF);border-radius:14px;padding:14px;min-width:0}
.tgi-field-kpi-label{font-size:12px;color:#475569;font-weight:800;margin-bottom:4px}
.tgi-field-kpi-value{font-size:24px;font-weight:900;color:#1E3A8A;line-height:1}
.tgi-field-kpi-unit{font-size:12px;color:#64748B;margin-top:4px}
.tgi-schedule-list{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.tgi-schedule-pill{display:inline-flex;align-items:center;gap:8px;border-radius:999px;background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;padding:7px 11px;font-size:12px;font-weight:900}
.tgi-rank-list{display:grid;gap:10px}
.tgi-rank-item{display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid #EEF2F7;padding-bottom:9px;color:#263b31;font-size:13px}
.tgi-rank-item:last-child{border-bottom:none;padding-bottom:0}
.tgi-rank-label{font-weight:800;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tgi-rank-count{background:#ECFDF5;color:#047857;border-radius:999px;padding:3px 9px;font-size:12px;font-weight:900;white-space:nowrap}
@media print{
  @page{size:A4 landscape;margin:10mm}
  body *{visibility:hidden!important}
  .tgi-report-print,.tgi-report-print *{visibility:visible!important}
  .tgi-report-print{position:absolute!important;left:0!important;top:0!important;width:100%!important;display:block!important;background:#fff!important;color:#111827!important;padding:0!important}
  .admin-wrap{display:block!important;background:#fff!important}
  .admin-side,.adm-toolbar button,.tbl-actions,.ai-widget,.backtop,.announce-bar,.nav,.no-print,.tgi-print-actions{display:none!important}
  .admin-main{padding:0!important;background:#fff!important}
  .tgi-report-hero{box-shadow:none!important;border-radius:0!important}
  .tgi-panel,.adm-stat,.tbl-wrap{box-shadow:none!important;break-inside:avoid}
  .adm-stats,.tgi-executive-grid,.tgi-dist-grid{break-inside:avoid}
  body.print-tgi-executive .tgi-detail-section,body.print-tgi-executive .tgi-raw-section{display:none!important}
  body.print-tgi-executive .tgi-report-print{height:190mm!important;overflow:hidden!important}
  body.print-tgi-executive .tgi-report-hero{padding:16px 20px!important;margin-bottom:10px!important}
  body.print-tgi-executive .tgi-report-title{font-size:26px!important;margin-bottom:5px!important}
  body.print-tgi-executive .tgi-report-meta{font-size:11px!important;line-height:1.45!important}
  body.print-tgi-executive .adm-stats{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:8px!important;margin:8px 0!important}
  body.print-tgi-executive .adm-stat{padding:12px!important}
  body.print-tgi-executive .adm-stat-icon{font-size:18px!important}
  body.print-tgi-executive .adm-stat-n{font-size:20px!important}
  body.print-tgi-executive .adm-stat-l{font-size:10px!important}
  body.print-tgi-executive .tgi-executive-grid{display:grid!important;grid-template-columns:1.25fr .75fr!important;gap:10px!important}
  body.print-tgi-executive .tgi-panel{padding:14px!important}
  body.print-tgi-executive .tgi-summary-list{font-size:12px!important;line-height:1.45!important;gap:6px!important}
  body.print-tgi-executive .tgi-score-ring{width:118px!important;height:118px!important;margin:4px auto!important}
  body.print-tgi-executive .tgi-score-ring-inner{width:86px!important;height:86px!important}
  body.print-tgi-executive .tgi-score-number{font-size:26px!important}
  body.print-tgi-raw .tgi-exec-section,body.print-tgi-raw .tgi-detail-section{display:none!important}
  body.print-tgi-raw .tgi-raw-section{display:block!important}
}
.overlay{position:fixed;inset:0;background:rgba(16,40,30,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px}
.modal{width:min(720px,100%);max-height:88vh;overflow:auto;background:#fff;border-radius:16px;padding:26px;box-shadow:0 30px 80px rgba(0,0,0,.24)}
.modal-title{font-size:24px;color:var(--g1);margin-bottom:18px}
.modal-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:22px;padding-top:16px;border-top:1px solid var(--border)}
.btn-cancel{border:1px solid var(--border);background:#fff;color:var(--muted);border-radius:8px;padding:10px 16px;font-weight:800}
.btn-cancel:hover{background:#F8FAFC;color:var(--text)}

/* UX: section improvements */
.section-header{text-align:center;margin-bottom:52px}
.section-header .section-title{margin-bottom:12px}
.section-header .section-sub{margin:0 auto}

/* Progress bar */
.prog-bar{height:4px;background:var(--gl);border-radius:4px;overflow:hidden;margin-top:8px}
.prog-fill{height:100%;background:var(--ga);border-radius:4px;transition:width .4s}

/* Hero slideshow */
.hero{background:#fff;padding:18px 0 0}
.hero + .section{padding-top:38px}
.hero-frame{position:relative;overflow:hidden;aspect-ratio:1300/588;min-height:0;display:flex;align-items:center;background:#f7fbf8;border-radius:18px;border:1px solid rgba(229,231,235,.92);box-shadow:0 14px 30px rgba(16,40,30,.07)}
.hero-frame::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(250,250,248,.97) 0%,rgba(250,250,248,.88) 48%,rgba(250,250,248,.5) 100%);z-index:1}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:background-image .35s ease;filter:saturate(.95)}
.hero .container{position:relative;width:100%;max-width:1340px;padding:0 20px}
.hero-copy{position:relative;z-index:2;max-width:520px;padding:18px 32px}
.hero-tag{display:inline-flex;align-items:center;gap:6px;color:var(--g1);font-size:12px;font-weight:600;margin-bottom:2px}
.hero-title{font-size:clamp(27px,3vw,38px);line-height:1.08;color:var(--g1);letter-spacing:0;margin-bottom:2px}
.hero-title em{color:var(--ga);font-style:normal}
.hero-kicker{font-size:clamp(15px,1.7vw,19px);color:var(--ga);font-family:'Playfair Display',serif;font-style:italic;margin-bottom:7px;letter-spacing:0}
.hero-sub{color:var(--text);font-size:13px;line-height:1.55;max-width:520px;margin-bottom:10px}
.hero-ctas{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:0}
.hero .btn-ghost{color:var(--g1);border-color:rgba(27,67,50,.18);background:rgba(255,255,255,.45)}
.hero .btn-ghost:hover{background:#fff;border-color:rgba(27,67,50,.32)}
.hero-stats{display:none}
.stat-num{font-size:17px;font-weight:700;color:var(--g1)}
.stat-lbl{font-size:13px;color:var(--muted);margin-top:1px}
.hero-slide-card{position:absolute;right:26px;bottom:18px;z-index:2;display:flex;align-items:center;gap:8px}
.slide-dot{width:9px;height:9px;border-radius:50%;border:1px solid rgba(27,67,50,.35);background:rgba(255,255,255,.8);cursor:pointer;transition:all .18s}
.slide-dot.active{width:24px;border-radius:20px;background:var(--ga);border-color:var(--ga)}
.slide-nav{width:34px;height:34px;border-radius:50%;border:1px solid rgba(27,67,50,.16);background:rgba(255,255,255,.74);color:var(--g1);font-size:18px;display:inline-flex;align-items:center;justify-content:center;transition:all .18s}
.slide-nav:hover{background:#fff;border-color:rgba(27,67,50,.3)}

/* AI chat */
.ai-chat{position:fixed;right:22px;bottom:88px;z-index:130;width:min(380px,calc(100vw - 32px));font-family:'DM Sans',sans-serif}
.ai-chat-toggle{display:flex;align-items:center;gap:10px;margin-left:auto;border:0;border-radius:999px;background:#10281e;color:#fff;padding:12px 18px;box-shadow:0 18px 40px rgba(16,40,30,.22);font-weight:900}
.ai-chat-toggle span:first-child{width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#52B788;color:#10281e}
.ai-chat-panel{background:#fff;border:1px solid rgba(229,231,235,.92);border-radius:14px;box-shadow:0 24px 70px rgba(16,40,30,.24);overflow:hidden}
.ai-chat-head{display:flex;align-items:center;justify-content:space-between;gap:14px;background:#10281e;color:#fff;padding:15px 16px}
.ai-chat-title{font-size:15px;font-weight:900;line-height:1.25}
.ai-chat-sub{font-size:12px;color:rgba(255,255,255,.68);line-height:1.4;margin-top:2px}
.ai-chat-close{width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:18px}
.ai-chat-messages{height:340px;overflow:auto;padding:16px;background:#F8FCF9;display:flex;flex-direction:column;gap:10px}
.ai-msg{max-width:88%;border-radius:13px;padding:10px 12px;font-size:14px;line-height:1.6;white-space:pre-wrap}
.ai-msg.bot{align-self:flex-start;background:#fff;border:1px solid #E5E7EB;color:#1f2937}
.ai-msg.user{align-self:flex-end;background:#1B4332;color:#fff}
.ai-chat-suggestions{display:flex;flex-wrap:wrap;gap:7px;padding:0 14px 12px;background:#F8FCF9}
.ai-chat-suggestions button{border:1px solid #BBF7D0;background:#ECFDF5;color:#047857;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:800}
.ai-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid #E5E7EB;background:#fff}
.ai-chat-input{flex:1;border:1px solid #E5E7EB;border-radius:10px;padding:10px 12px;font-size:14px;min-width:0}
.ai-chat-input:focus{outline:none;border-color:#52B788;box-shadow:0 0 0 4px rgba(82,183,136,.12)}
.ai-chat-send{border:0;border-radius:10px;background:#52B788;color:#fff;font-weight:900;padding:0 14px;min-width:56px}
.ai-chat-send:disabled{opacity:.55;cursor:not-allowed}
.ai-chat-note{font-size:11px;color:#6B7280;padding:0 14px 12px;background:#fff;line-height:1.45}

/* Footer */
.site-cta{background:linear-gradient(135deg,var(--g1),var(--g3));color:#fff;padding:34px 0}
.site-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:28px}
.site-cta h2{font-size:clamp(25px,4vw,38px);margin-bottom:6px;color:#fff}
.site-cta p{color:rgba(255,255,255,.82);font-size:16px;max-width:650px;line-height:1.7}
.footer{background:#10281e;color:rgba(255,255,255,.78);padding:58px 0 26px;border-top:1px solid rgba(255,255,255,.08)}
.footer-grid{display:grid;grid-template-columns:1.3fr .72fr .82fr 1fr .78fr;gap:38px;align-items:start}
.footer-desc{font-size:14px;line-height:1.8;margin:18px 0 24px;max-width:370px;color:rgba(255,255,255,.72)}
.footer-social{display:flex;gap:10px;flex-wrap:wrap}
.footer-social a,.footer-social span{width:34px;height:34px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:#fff;text-decoration:none;font-size:15px;transition:all .18s}
.footer-social a:hover{background:var(--ga);transform:translateY(-1px)}
.footer-hdg{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#fff;font-weight:800;margin-bottom:14px}
.footer-lnk{display:block;background:none;border:none;padding:5px 0;color:rgba(255,255,255,.7);font-size:14px;text-align:left;text-decoration:none;transition:all .16s}
.footer-lnk:hover{color:#fff;transform:translateX(2px)}
.footer-contact{display:grid;gap:10px}
.footer-contact-row{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:rgba(255,255,255,.76)}
.footer-contact-ico{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;background:rgba(82,183,136,.14);color:var(--ga);flex-shrink:0}
.footer-lineoa{display:flex;flex-direction:column;align-items:flex-start}
.footer-lineqr{width:118px;height:118px;border-radius:10px;background:#fff;padding:8px;display:block;margin:2px 0 10px;box-shadow:0 8px 22px rgba(0,0,0,.16)}
.footer-lineid{font-size:15px;font-weight:800;color:#fff;line-height:1.2}
.footer-linesub{font-size:12px;color:rgba(255,255,255,.62);margin-top:4px;line-height:1.45}
.footer-bot{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:26px;padding:20px 0 0;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:rgba(255,255,255,.58)}
.footer-legal{display:flex;gap:18px;flex-wrap:wrap}
.footer-legal button{background:none;border:none;color:rgba(255,255,255,.58);font-size:13px;padding:0}
.footer-legal button:hover{color:#fff}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeUp .5s ease forwards}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}

@media(max-width:900px){.grid-3{grid-template-columns:1fr 1fr}.experts-grid,.articles-grid,.solution-grid,.download-grid{grid-template-columns:1fr 1fr}.directory-tools,.download-tools{flex-direction:column}.filters{justify-content:flex-start}.search-wrap{width:100%;flex:auto}.auth-page{grid-template-columns:1fr}.auth-hero{display:none}.nav-links .nav-btn:not(.always){display:none}.admin-wrap{grid-template-columns:1fr}.admin-side{position:relative;width:auto;overflow:visible;display:flex;flex-wrap:wrap;gap:8px;padding:18px}.admin-brand{width:100%;margin-bottom:4px;padding-bottom:14px}.side-section{display:none}.side-item{width:auto;margin-bottom:0}.admin-main{padding:24px 18px}.adm-stats{grid-template-columns:1fr 1fr}.footer-grid{grid-template-columns:1fr 1fr}.site-cta-inner{align-items:flex-start;flex-direction:column}.hero-frame{aspect-ratio:auto;min-height:300px}.hero-frame::before{background:rgba(250,250,248,.92)}.survey-sections{grid-template-columns:1fr 1fr}.platform-flow-head,.platform-flow-cta{align-items:flex-start;flex-direction:column}.platform-flow-badges{justify-content:flex-start}.platform-flow-steps{grid-template-columns:1fr 1fr}}
@media(max-width:900px){.article-shell{grid-template-columns:1fr}.article-side{position:static;grid-template-columns:1fr 1fr}.article-cta-list{grid-template-columns:1fr}}
@media(max-width:760px){.survey-grid-row{grid-template-columns:1fr;gap:9px}.survey-radio-grid.compact{grid-template-columns:repeat(2,minmax(0,1fr))}.survey-grid-group h3{font-size:15px}.survey-grid-question{font-size:13px}.survey-part-list{grid-template-columns:1fr}}
@media(max-width:600px){.grid-3,.grid-2,.experts-grid,.articles-grid,.solution-grid,.download-grid{grid-template-columns:1fr}.auth-panel{padding:24px 18px}.auth-card{padding:24px 20px}.hero{padding:16px 0 0}.hero + .section{padding-top:42px}.hero .container{padding:0 12px}.hero-frame{min-height:360px;align-items:flex-start}.hero-copy{padding:20px 18px 72px}.hero-ctas .btn,.hero-ctas .btn-ghost{width:100%;text-align:center}.hero-slide-card{right:16px;bottom:14px}.adm-toolbar{align-items:flex-start;flex-direction:column}.adm-stats,.form-row{grid-template-columns:1fr}.modal{padding:20px}.footer-grid{grid-template-columns:1fr}.footer-partners-head{align-items:flex-start;flex-direction:column}.footer-partners-note{text-align:left}.footer-partner-list{justify-content:flex-start;gap:4px;padding:16px}.footer-partner-card{padding:4px 5px}.footer-bot{align-items:flex-start;flex-direction:column}.site-cta .btn-accent{width:100%}.back-top{bottom:16px;right:16px}.ai-chat{right:12px;bottom:70px;width:calc(100vw - 24px)}.ai-chat-messages{height:310px}.article-page{padding:22px 0 58px}.detail-wrap{padding:0 16px}.article-hero{padding:30px 22px;border-radius:14px}.detail-img{width:48px;height:48px;font-size:26px}.article-card{padding:26px 20px}.article-intro{font-size:17px}.detail-body{font-size:16px}.article-side{grid-template-columns:1fr}.article-quote{text-align:left;padding:22px}.survey-page{padding:20px 0 48px}.survey-shell{padding:0 12px}.survey-hero-inner{padding:24px 20px}.survey-sections,.survey-form-grid,.survey-check-grid{grid-template-columns:1fr}.survey-frame-head{align-items:flex-start;flex-direction:column}.survey-form{padding:16px}.survey-radio-grid{grid-template-columns:repeat(5,1fr);gap:6px}.survey-radio{padding:9px 4px}.survey-frame{height:8200px}.platform-flow{padding:26px 20px}.platform-flow-steps{grid-template-columns:1fr}.platform-flow-cta .btn-accent{width:100%}.doc-actions{align-items:flex-start;flex-direction:column}.doc-actions .btn-accent{width:100%}}
`;
const CATS = ["Net Zero","ESG","Eco-Factory","GHG","Green Industry","Policy","คุณภาพอากาศ","คุณภาพน้ำ","กากของเสีย","วิศวกรรมสิ่งแวดล้อม","กฎหมายสิ่งแวดล้อม","IoT & Sensor"];
const EXP_AREAS = ["ESG","Net Zero","CFO/CFP","Eco-Factory","ISO 14001","GRI","Energy","Waste Management"];

const T = {
  th:{
    home:"หน้าแรก",blog:"ความรู้",experts:"ผู้เชี่ยวชาญ",about:"เกี่ยวกับ",
    menu_eco:"Eco Factory",menu_fcheck:"ตรวจประเมิน",menu_env:"สิ่งแวดล้อม",menu_carbon:"Carbon Management",menu_awards:"Amata Best Waste Management Awards",menu_knowledge:"ความรู้",
    hero_tag:"Environmental Data Platform for Factories",
    hero_sub:"แพลตฟอร์มสิ่งแวดล้อมสำหรับโรงงาน ครอบคลุม Eco Factory, CFO, CFP, Carbon Footprint และระบบ IoT Monitoring ผ่าน MQTT เพื่อเปลี่ยนข้อมูลหน้างานเป็น Dashboard และรายงานตามมาตรฐาน TGO / ISO",
    get_started:"เริ่มต้นใช้งาน",find_experts:"ค้นหาผู้เชี่ยวชาญ",
    feat_title:"แพลตฟอร์มข้อมูลสิ่งแวดล้อมสำหรับโรงงาน",
    feat_sub:"VERDIX ผสานผู้เชี่ยวชาญตัวจริง ระบบประเมิน Eco Factory เครื่องมือ CFO/CFP และข้อมูล IoT จากหน้างาน เพื่อให้โรงงานวัดผล ปรับปรุง และออกรายงานด้านสิ่งแวดล้อมได้อย่างเป็นระบบ",
    f1t:"Eco Factory & Green Industry Readiness",f1d:"ระบบประเมิน Eco Factory และ Green Industry ออนไลน์ รวม Digital Checklist, Gap Analysis, Action Plan และ Expert Review เพื่อเตรียมโรงงานก่อนยื่นรับรอง",
    f2t:"CFO / CFP Carbon Footprint Engine",f2d:"จัดเก็บและคำนวณข้อมูล Carbon Footprint for Organization (CFO) และ Carbon Footprint of Product (CFP) ตามแนวทาง TGO, ISO 14064 และ ISO 14067",
    f3t:"IoT & MQTT Environmental Monitoring",f3d:"เชื่อมต่อ Sensor, PLC และ Gateway ผ่าน MQTT, Modbus TCP, OPC-UA หรือ REST API เพื่อติดตามพลังงาน น้ำ อากาศ ของเสีย และ GHG Activity Data แบบ Real-time",
    f4t:"Automated ESG / TGO / ISO Reporting",f4d:"ออกรายงานตามมาตรฐาน TGO, ISO 14064/14067, GRI, Eco Factory และ Green Industry ลดเวลารวบรวมข้อมูล พร้อมรองรับ Multi-site และ Expert Review Workflow",
    flow_title:"จาก Sensor หน้างาน สู่รายงาน Carbon และ Eco Factory",
    flow_sub:"VERDIX เชื่อมข้อมูลจริงจากโรงงานเข้ากับระบบประเมินและรายงาน เพื่อให้ทีม EHS, Energy และ Sustainability เห็นสถานะเดียวกันแบบ Real-time",
    flow_cta:"เริ่มจากระบบที่มีอยู่แล้วในโรงงานได้ เช่น PLC, Meter, Air Sensor, Waste Scale หรือไฟล์ Excel แล้วค่อยต่อยอดสู่ Dashboard และ Automated Reporting",
    flow_button:"ปรึกษาการเชื่อมต่อ IoT",
    blog_title:"บทความและความรู้",blog_sub:"ติดตามข่าวสารด้านสิ่งแวดล้อม ESG และ Net Zero จากผู้เชี่ยวชาญของเรา",
    read_more:"อ่านเพิ่มเติม →",view_all:"ดูทั้งหมด",
    exp_title:"เครือข่ายผู้เชี่ยวชาญ",exp_sub:"ผู้เชี่ยวชาญด้านความยั่งยืนที่ผ่านการรับรองและคัดสรรแล้ว",
    contact:"ติดต่อ",all:"ทั้งหมด",reviews:"รีวิว",
    login_title:"เข้าสู่ระบบ",reg_title:"สมัครสมาชิก",
    login:"เข้าสู่ระบบ",register:"สมัครสมาชิก",dashboard:"แผงควบคุม",logout:"ออกจากระบบ",
    email:"อีเมล",password:"รหัสผ่าน",fullname:"ชื่อ-นามสกุล",org:"องค์กร",
    no_account:"ยังไม่มีบัญชี?",has_account:"มีบัญชีแล้ว?",
    adm_hint:"ใช้บัญชี Supabase Auth ที่ตั้งค่า role เป็น admin",
    adm_dash:"ภาพรวม",adm_posts:"จัดการบทความ",adm_exp:"จัดการผู้เชี่ยวชาญ",adm_users:"ผู้ใช้งาน",
    add_post:"+ เพิ่มบทความ",add_exp:"+ เพิ่มผู้เชี่ยวชาญ",
    edit:"แก้ไข",del:"ลบ",save:"บันทึก",cancel:"ยกเลิก",
    t_th:"หัวข้อ (ไทย)",t_en:"หัวข้อ (อังกฤษ)",ex_th:"สรุปย่อ (ไทย)",ex_en:"สรุปย่อ (อังกฤษ)",
    category:"หมวดหมู่",author:"ผู้เขียน",
    n_th:"ชื่อ (ไทย)",n_en:"ชื่อ (อังกฤษ)",pos_th:"ตำแหน่ง (ไทย)",pos_en:"ตำแหน่ง (อังกฤษ)",
    location:"ที่ตั้ง",price_day:"ราคา/manday (฿)",
    quick:"ลิงก์ด่วน",services:"บริการ",contact_us:"ติดต่อเรา",
    footer_desc:"Sustainability Expert-on-Demand Platform — Verdi (สีเขียว) + eXpert เปลี่ยนเส้นทางธุรกิจของคุณสู่ความยั่งยืน",
    rights:"สงวนลิขสิทธิ์ © 2025 VerdiX",
    privacy:"นโยบายความเป็นส่วนตัว",terms:"เงื่อนไขการใช้งาน",
    cta_title:"Verdify Your Journey",
    cta_sub:"เปลี่ยนเส้นทางธุรกิจของคุณสู่ความยั่งยืน — ลงทะเบียนฟรีและเชื่อมต่อกับผู้เชี่ยวชาญได้เลยวันนี้",
    cta_btn:"เริ่มต้นฟรี",
    confirm_del:"ยืนยันการลบ?",no_result:"ไม่พบผลลัพธ์",
    welcome:"ยินดีต้อนรับสู่แผงควบคุม VerdiX",
    recent_posts:"บทความล่าสุด",
    search_art:"ค้นหาบทความ...",search_exp:"ค้นหาผู้เชี่ยวชาญ...",
    total_posts:"บทความทั้งหมด",total_exp:"ผู้เชี่ยวชาญ",total_org:"องค์กร",total_co2:"ลดคาร์บอน",
    name_col:"ชื่อ",expertise_col:"ความเชี่ยวชาญ",loc_col:"ที่ตั้ง",rating_col:"คะแนน",rate_col:"ค่าบริการ",actions_col:"การกระทำ",
    title_col:"หัวข้อ",cat_col:"หมวดหมู่",author_col:"ผู้เขียน",date_col:"วันที่",
    manday:"/ manday",
  },
  en:{
    home:"Home",blog:"Knowledge",experts:"Experts",about:"About",
    menu_eco:"Eco Factory",menu_fcheck:"Factory Check",menu_env:"Environment",menu_carbon:"Carbon Management",menu_awards:"Amata Best Waste Management Awards",menu_knowledge:"Knowledge",
    hero_tag:"Environmental Data Platform for Factories",
    hero_sub:"A factory environmental platform covering Eco Factory, CFO, CFP, Carbon Footprint, and IoT monitoring via MQTT — turning site data into dashboards and TGO / ISO-ready reports.",
    get_started:"Get Started",find_experts:"Find Experts",
    feat_title:"Environmental Data Platform for Industrial Sites",
    feat_sub:"VERDIX combines expert support, Eco Factory assessment, CFO/CFP tools, and field IoT data so factories can measure, improve, and report environmental performance with confidence.",
    f1t:"Eco Factory & Green Industry Readiness",f1d:"Online Eco Factory and Green Industry readiness assessment with Digital Checklists, Gap Analysis, Action Plans, and Expert Review before certification.",
    f2t:"CFO / CFP Carbon Footprint Engine",f2d:"Collect and calculate Carbon Footprint for Organization (CFO) and Carbon Footprint of Product (CFP) data aligned with TGO, ISO 14064, and ISO 14067.",
    f3t:"IoT & MQTT Environmental Monitoring",f3d:"Connect sensors, PLCs, and gateways via MQTT, Modbus TCP, OPC-UA, or REST API to monitor energy, water, air, waste, and GHG activity data in real time.",
    f4t:"Automated ESG / TGO / ISO Reporting",f4d:"Generate reports aligned with TGO, ISO 14064/14067, GRI, Eco Factory, and Green Industry with Multi-site Dashboard and Expert Review Workflow.",
    flow_title:"From Factory Sensors to Carbon and Eco Factory Reports",
    flow_sub:"VERDIX connects real site data with assessment and reporting workflows so EHS, Energy, and Sustainability teams work from one real-time source of truth.",
    flow_cta:"Start with existing factory systems such as PLCs, meters, air sensors, waste scales, or Excel files, then scale into dashboards and automated reporting.",
    flow_button:"Discuss IoT Integration",
    blog_title:"Articles & Insights",blog_sub:"Stay updated on ESG, Net Zero, and sustainability from our expert contributors.",
    read_more:"Read More →",view_all:"View All",
    exp_title:"Expert Network",exp_sub:"A certified and curated network of sustainability specialists",
    contact:"Contact",all:"All",reviews:"reviews",
    login_title:"Login",reg_title:"Register",
    login:"Login",register:"Register",dashboard:"Dashboard",logout:"Logout",
    email:"Email",password:"Password",fullname:"Full Name",org:"Organization",
    no_account:"Don't have an account?",has_account:"Already have an account?",
    adm_hint:"Use a Supabase Auth account with the admin role",
    adm_dash:"Overview",adm_posts:"Manage Posts",adm_exp:"Manage Experts",adm_users:"Users",
    add_post:"+ Add Post",add_exp:"+ Add Expert",
    edit:"Edit",del:"Delete",save:"Save",cancel:"Cancel",
    t_th:"Title (Thai)",t_en:"Title (English)",ex_th:"Excerpt (Thai)",ex_en:"Excerpt (English)",
    category:"Category",author:"Author",
    n_th:"Name (Thai)",n_en:"Name (English)",pos_th:"Title (Thai)",pos_en:"Title (English)",
    location:"Location",price_day:"Rate/manday (฿)",
    quick:"Quick Links",services:"Services",contact_us:"Contact Us",
    footer_desc:"Sustainability Expert-on-Demand Platform — Verdi (green) + eXpert. Verdify your journey toward green transformation.",
    rights:"© 2025 VerdiX. All rights reserved.",
    privacy:"Privacy Policy",terms:"Terms of Service",
    cta_title:"Verdify Your Journey",
    cta_sub:"Transform your business toward sustainability — register free and connect with certified experts today.",
    cta_btn:"Start Free",
    confirm_del:"Confirm delete?",no_result:"No results found",
    welcome:"Welcome to VerdiX Admin Dashboard",
    recent_posts:"Recent Posts",
    search_art:"Search articles...",search_exp:"Search experts...",
    total_posts:"Total Posts",total_exp:"Experts",total_org:"Organizations",total_co2:"Carbon Reduced",
    name_col:"Name",expertise_col:"Expertise",loc_col:"Location",rating_col:"Rating",rate_col:"Rate",actions_col:"Actions",
    title_col:"Title",cat_col:"Category",author_col:"Author",date_col:"Date",
    manday:"/ manday",
  }
};

const INIT_ARTICLES = [
  {id:1,title_th:"Thailand Net Zero 2050: เส้นทางสู่ความเป็นกลางทางคาร์บอนของประเทศไทย",title_en:"Thailand Net Zero 2050: The Road to Carbon Neutrality",excerpt_th:"ประเทศไทยกำลังก้าวเข้าสู่ยุคใหม่ของเศรษฐกิจยั่งยืน เป้าหมาย Net Zero 2050 จึงไม่ใช่แค่นโยบายสิ่งแวดล้อม แต่เป็นมาตรฐานใหม่ของการดำเนินธุรกิจ",excerpt_en:"Thailand is entering a new sustainability economy where Net Zero 2050 becomes a new operating standard for business.",category:"Net Zero",date:"2025-01-10",author:"VerdiX Editorial",image:"/thainetzero.png"},
  {id:2,title_th:"ESG คืออะไร? ทำไมทุกองค์กรต้องรู้",title_en:"What is ESG? Why Every Organization Must Know",excerpt_th:"ESG กลายเป็นมาตรฐานประเมินธุรกิจระดับโลก นักลงทุน สถาบัน ลูกค้า และคู่ค้าระดับสากลใช้เป็นเกณฑ์สำคัญในการประเมินองค์กร",excerpt_en:"ESG has become the global standard for business evaluation and a key criterion for institutional investment decisions.",category:"ESG",date:"2024-12-20",author:"VerdiX Editorial",image:"/esg-what-is.png"},
  {id:3,title_th:"Eco-Factory: มาตรฐานโรงงานสีเขียวของไทย",title_en:"Eco-Factory: Thailand's Green Factory Standard",excerpt_th:"มาตรฐาน Eco-Factory มี 14 ประเภทการตรวจประเมิน ครอบคลุมพลังงาน น้ำ ขยะ อากาศ และชุมชน",excerpt_en:"Eco-Factory certification covers 14 assessment categories: energy, water, waste, air quality, and community impact.",category:"Eco-Factory",date:"2024-11-28",author:"VerdiX Team",image:"/eco-factory-standard.png"},
  {id:4,title_th:"Carbon Footprint ขององค์กร: วิธีคำนวณและลด",title_en:"Corporate Carbon Footprint: How to Calculate and Reduce",excerpt_th:"คำนวณ CFO/CFP ตามมาตรฐาน ISO 14064 และ TGO พร้อมแนวทางลด Scope 1, 2, 3",excerpt_en:"Calculate CFO/CFP following ISO 14064 and TGO standards with practical Scope 1, 2, 3 reduction guidance.",category:"GHG",date:"2024-11-15",author:"VerdiX Expert",image:"🌡️"},
  {id:5,title_th:"Green Industry Level 1–5: ก้าวสู่อุตสาหกรรมสีเขียว",title_en:"Green Industry Levels 1–5: Steps to Green Manufacturing",excerpt_th:"โครงการอุตสาหกรรมสีเขียวมี 5 ระดับ จากความมุ่งมั่นสู่วัฒนธรรมสีเขียวที่ยั่งยืน",excerpt_en:"The Green Industry program has 5 levels, progressing from commitment to building a sustainable green culture.",category:"Green Industry",date:"2024-10-30",author:"VerdiX Editorial",image:"🌱"},
  {id:6,title_th:"Carbon Tax ในไทย: ผลกระทบต่อภาคอุตสาหกรรม",title_en:"Carbon Tax in Thailand: Impact on Industry",excerpt_th:"กฎหมาย Climate Change Act กำลังจะมาพร้อมภาษีคาร์บอน ธุรกิจต้องเตรียมพร้อมตั้งแต่วันนี้",excerpt_en:"Thailand's Climate Change Act brings carbon taxation — businesses must prepare starting today.",category:"Policy",date:"2024-10-10",author:"VerdiX Team",image:"⚖️"},
  {id:7,title_th:"PM2.5 ในโรงงานอุตสาหกรรม: มาตรฐานและการควบคุม",title_en:"PM2.5 in Industrial Facilities: Standards and Control",excerpt_th:"ค่ามาตรฐาน PM2.5 ในบรรยากาศทั่วไปและในสถานประกอบการ พร้อมวิธีควบคุมด้วยระบบกรองอากาศ",excerpt_en:"PM2.5 ambient and workplace standards with dust control systems, filters, and monitoring methods.",category:"คุณภาพอากาศ",date:"2024-12-05",author:"VerdiX Editorial",image:"🌬️"},
  {id:8,title_th:"การตรวจวัดคุณภาพอากาศแบบ Real-time ด้วย IoT Sensor",title_en:"Real-time Air Quality Monitoring with IoT Sensors",excerpt_th:"ระบบเซ็นเซอร์วัดคุณภาพอากาศ (CO, SO₂, NOx, VOC, PM) แบบ Real-time ผ่าน MQTT สำหรับโรงงาน",excerpt_en:"IoT sensor systems for CO, SO₂, NOx, VOC, PM real-time monitoring via MQTT for industrial facilities.",category:"IoT & Sensor",date:"2025-01-05",author:"VerdiX Tech",image:"📡"},
  {id:9,title_th:"BOD COD SS: ค่ามาตรฐานน้ำทิ้งโรงงานอุตสาหกรรม",title_en:"BOD COD SS: Industrial Wastewater Effluent Standards",excerpt_th:"ค่ามาตรฐานน้ำทิ้งตามประกาศกรมโรงงานอุตสาหกรรม พร้อมวิธีตรวจวัดและระบบบำบัดที่เหมาะสม",excerpt_en:"Industrial effluent standards per DIW regulations with measurement methods and appropriate treatment systems.",category:"คุณภาพน้ำ",date:"2024-12-10",author:"VerdiX Editorial",image:"💧"},
  {id:10,title_th:"ระบบบำบัดน้ำเสีย: เลือกเทคโนโลยีให้เหมาะกับโรงงาน",title_en:"Wastewater Treatment Systems: Choosing the Right Technology",excerpt_th:"เปรียบเทียบระบบบำบัดน้ำเสีย (Activated Sludge, MBR, SBR, MBBR) ตามประเภทอุตสาหกรรมและงบประมาณ",excerpt_en:"Comparing wastewater treatment systems (Activated Sludge, MBR, SBR, MBBR) by industry type and budget.",category:"วิศวกรรมสิ่งแวดล้อม",date:"2024-11-20",author:"VerdiX Expert",image:"🔬"},
  {id:11,title_th:"กากของเสียอันตราย: ระบบ Manifest และกฎหมาย",title_en:"Hazardous Waste: Manifest System and Legal Requirements",excerpt_th:"ระบบ e-Manifest กรมโรงงานอุตสาหกรรม ประเภทกากของเสีย บัญชีรหัสกาก และหน้าที่ตามกฎหมาย",excerpt_en:"DIW e-Manifest system, waste classification codes, and legal obligations for hazardous waste generators.",category:"กากของเสีย",date:"2024-11-08",author:"VerdiX Team",image:"☣️"},
  {id:12,title_th:"Zero Waste to Landfill: ทำอย่างไรให้สำเร็จ",title_en:"Zero Waste to Landfill: How to Achieve It",excerpt_th:"แนวทางปฏิบัติที่แท้จริงสำหรับโรงงานที่ต้องการบรรลุเป้าหมาย Zero Waste to Landfill",excerpt_en:"Practical guidelines for factories targeting Zero Waste to Landfill certification.",category:"กากของเสีย",date:"2024-10-25",author:"VerdiX Editorial",image:"♻️"},
  {id:13,title_th:"กฎหมายสิ่งแวดล้อมไทย: บทบัญญัติสำคัญที่โรงงานต้องรู้",title_en:"Thai Environmental Law: Key Provisions Every Factory Must Know",excerpt_th:"สรุปกฎหมายสำคัญ: พรบ.โรงงาน พรบ.ส่งเสริมคุณภาพสิ่งแวดล้อม พรบ.วัตถุอันตราย และกฎหมายน้ำ",excerpt_en:"Summary of key laws: Factory Act, Environmental Quality Promotion Act, Hazardous Substances Act, and Water Law.",category:"กฎหมายสิ่งแวดล้อม",date:"2024-10-15",author:"Legal Expert",image:"📜"},
  {id:14,title_th:"LCA (Life Cycle Assessment) สำหรับผลิตภัณฑ์อุตสาหกรรม",title_en:"LCA for Industrial Products: A Practical Guide",excerpt_th:"การประเมินวัฏจักรชีวิตของผลิตภัณฑ์ตามมาตรฐาน ISO 14040/14044 เพื่อลดผลกระทบสิ่งแวดล้อม",excerpt_en:"Product lifecycle assessment per ISO 14040/14044 standards to reduce environmental impact.",category:"วิศวกรรมสิ่งแวดล้อม",date:"2024-10-01",author:"VerdiX Editorial",image:"🔄"},
  {id:15,title_th:"MQTT Protocol สำหรับงาน Industrial IoT Environmental Monitoring",title_en:"MQTT Protocol for Industrial IoT Environmental Monitoring",excerpt_th:"ใช้ MQTT ส่งข้อมูลเซ็นเซอร์สิ่งแวดล้อม (อากาศ น้ำ กาก) จาก PLC/IoT ขึ้น Cloud Platform แบบ Real-time",excerpt_en:"Using MQTT to transmit environmental sensor data (air, water, waste) from PLC/IoT to Cloud Platform in real-time.",category:"IoT & Sensor",date:"2025-01-15",author:"VerdiX Tech",image:"🔌"},
];

const INIT_DOCUMENTS = [
  {id:1,title_th:"เกณฑ์ข้อกำหนดมาตรฐานฯ",title_en:"Eco Factory Standard Criteria",description_th:"หมวดเอกสารเกณฑ์ข้อกำหนดมาตรฐาน Eco Factory",description_en:"Eco Factory standard criteria document category.",category:"Eco Factory",file_url:"/documents/eco-factory-criteria-2024.pdf",file_data_url:"",file_name:"eco-factory-criteria-2024.pdf",file_type:"FOLDER",file_size:495447,version:"2024",updated_at:"2026-05-23",downloads:0,active:true},
  {id:2,title_th:"เอกสารประกอบการขอการรับรองสำหรับมาตรฐาน Eco Factory",title_en:"Eco Factory Certification Documents",description_th:"เอกสารประกอบการยื่นขอรับรองมาตรฐาน Eco Factory",description_en:"Supporting documents for Eco Factory certification.",category:"Eco Factory",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_data_url:"",file_name:"eco-factory-certification-documents",file_type:"FOLDER",file_size:0,version:"2024",updated_at:"2026-05-23",downloads:0,active:true},
  {id:3,title_th:"เอกสารประกอบการขอรับรองสำหรับมาตรฐาน Eco Factory for Waste Processor",title_en:"Eco Factory for Waste Processor Documents",description_th:"หมวดเอกสารสำหรับ Waste Processor",description_en:"Supporting document category for Waste Processor.",category:"Eco Factory",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_data_url:"",file_name:"eco-factory-waste-processor-documents",file_type:"FOLDER",file_size:0,version:"2024",updated_at:"2026-05-23",downloads:0,active:true},
  {id:4,title_th:"ใบสมัครขอขึ้นทะเบียนรับรองมาตรฐาน-Update 2024.DOCX",title_en:"Eco Factory Registration Application - Update 2024.DOCX",description_th:"แบบฟอร์มใบสมัครสำหรับการขึ้นทะเบียนรับรองมาตรฐาน Eco Factory",description_en:"Application form for Eco Factory certification registration.",category:"Form / Template",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_data_url:"",file_name:"eco-factory-application-update-2024.docx",file_type:"DOCX",file_size:0,version:"2024",updated_at:"2026-05-23",downloads:0,active:true},
  {id:5,title_th:"ใบสมัครขอขึ้นทะเบียนรับรองมาตรฐาน-Update 2024.PDF",title_en:"Eco Factory Registration Application - Update 2024.PDF",description_th:"ไฟล์ PDF ใบสมัครขอขึ้นทะเบียนรับรองมาตรฐาน Eco Factory",description_en:"PDF application form for Eco Factory certification registration.",category:"Form / Template",file_url:"/documents/eco-factory-application-update-2024.pdf",file_data_url:"",file_name:"eco-factory-application-update-2024.pdf",file_type:"PDF",file_size:1317677,version:"2024",updated_at:"2026-05-23",downloads:0,active:true},
  {id:6,title_th:"รายงานการตรวจสอบการเฝ้าระวังตนเอง Self surveillance Audit Report (ฉบับปรับปรุง ครั้งที่ 2)",title_en:"Self Surveillance Audit Report Revision 2",description_th:"แบบรายงานการตรวจสอบการเฝ้าระวังตนเองสำหรับ Eco Factory",description_en:"Self surveillance audit report template for Eco Factory.",category:"Eco Factory",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_data_url:"",file_name:"self-surveillance-audit-report-rev2.pdf",file_type:"PDF",file_size:0,version:"2",updated_at:"2026-05-23",downloads:0,active:true},
  {id:7,title_th:"คุณสมบัติผู้ตรวจประเมินโรงงานอุตสาหกรรมเชิงนิเวศ (Eco Factory)",title_en:"Eco Factory Auditor Qualification",description_th:"เอกสารคุณสมบัติผู้ตรวจประเมินโรงงานอุตสาหกรรมเชิงนิเวศ",description_en:"Auditor qualification document for Eco Factory.",category:"Legal / Standard",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_data_url:"",file_name:"eco-factory-auditor-qualification.pdf",file_type:"PDF",file_size:0,version:"2024",updated_at:"2026-05-23",downloads:0,active:true}
];

const DOC_CATEGORIES = ["All","Eco Factory","Carbon Management","IoT & Sensor","ESG / Reporting","Legal / Standard","Form / Template"];

const DOWNLOAD_FOLDER_FILES = {
  1: [
    {name_th:"ข้อกำหนดมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ (Eco Factory) ฉบับปรับปรุงครั้งที่ 2",name_en:"Eco Factory Standard Criteria Revision 2",file_type:"pdf",file_url:"/documents/eco-factory-criteria-2024.pdf",file_name:"eco-factory-criteria-2024.pdf"},
    {name_th:"ข้อกำหนดมาตรฐาน Eco Factory for Waste Processor",name_en:"Eco Factory Standard Criteria for Waste Processor",file_type:"pdf",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_name:"eco-factory-waste-processor.pdf"}
  ],
  2: [
    {name_th:"เอกสารประกอบการขอการรับรองสำหรับมาตรฐาน Eco Factory",name_en:"Supporting Documents for Eco Factory Certification",file_type:"pdf",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_name:"eco-factory-certification-documents.pdf"}
  ],
  3: [
    {name_th:"เอกสารประกอบการขอรับรองสำหรับมาตรฐาน Eco Factory for Waste Processor",name_en:"Supporting Documents for Eco Factory for Waste Processor",file_type:"pdf",file_url:"https://www.ecofactory.fti.or.th/page/view/download",file_name:"eco-factory-waste-processor-documents.pdf"}
  ]
};

function docHref(doc) {
  return doc.file_data_url || doc.file_url || "#";
}

function formatDocSize(bytes) {
  const n = Number(bytes || 0);
  if (!n) return "-";
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

const FEATURED_ARTICLE_CONTENT = {
  1: {
    intro: "ประเทศไทยกำลังก้าวเข้าสู่ยุคใหม่ของการพัฒนาเศรษฐกิจที่ให้ความสำคัญกับ “ความยั่งยืน” มากกว่าที่เคย โดยเป้าหมาย Thailand Net Zero 2050 ไม่ใช่เพียงนโยบายด้านสิ่งแวดล้อม แต่กำลังกลายเป็น “มาตรฐานใหม่” ของการดำเนินธุรกิจในอนาคต",
    sections: [
      {
        title: "เป้าหมาย Thailand Net Zero 2050",
        paragraphs: [
          "ภายใต้เป้าหมายดังกล่าว ประเทศไทยตั้งเป้าลดการปล่อยก๊าซเรือนกระจก (GHG Emission) อย่างต่อเนื่อง พร้อมผลักดันสู่การเป็นประเทศที่มีความเป็นกลางทางคาร์บอน (Carbon Neutrality) และ Net Zero Emission ภายในปี 2050-2065 ตามแนวทางสากลและข้อตกลง Paris Agreement"
        ]
      },
      {
        title: "ทำไมองค์กรต้องเริ่มตั้งแต่วันนี้?",
        paragraphs: [
          "ปัจจุบัน หลายองค์กรเริ่มเผชิญแรงกดดันจากทั้งภาครัฐ นักลงทุน ลูกค้า และคู่ค้าระดับสากล ไม่ว่าจะเป็น:"
        ],
        list: [
          "การจัดทำรายงาน ESG",
          "การประเมิน Carbon Footprint for Organization (CFO)",
          "Carbon Footprint of Product (CFP)",
          "มาตรฐาน Green Industry และ Eco-Factory",
          "มาตรการ CBAM ของสหภาพยุโรป",
          "การเตรียมความพร้อมต่อกฎหมาย Climate Change Act ของประเทศไทย"
        ],
        after: [
          "องค์กรที่ปรับตัวได้เร็ว จะมีความได้เปรียบทั้งด้านการแข่งขัน ต้นทุนพลังงาน ภาพลักษณ์องค์กร และโอกาสทางธุรกิจใหม่ในอนาคต",
          "ในขณะเดียวกัน องค์กรที่ยังไม่มีแผนด้าน Net Zero อาจเผชิญความเสี่ยงด้านต้นทุน ภาษีคาร์บอน และข้อกำหนดจาก Supply Chain ระดับโลก"
        ]
      },
      {
        title: "Net Zero ไม่ใช่เรื่องขององค์กรขนาดใหญ่เท่านั้น",
        paragraphs: [
          "หลายคนอาจมองว่า Net Zero เป็นเรื่องไกลตัวหรือเหมาะสำหรับโรงงานขนาดใหญ่เท่านั้น แต่ในความเป็นจริง องค์กรทุกขนาดสามารถเริ่มต้นได้ ตั้งแต่:"
        ],
        list: [
          "การประเมินการใช้พลังงาน",
          "การลดของเสียและการปล่อยก๊าซเรือนกระจก",
          "การเพิ่มประสิทธิภาพระบบการผลิต",
          "การใช้พลังงานทดแทน",
          "การจัดการข้อมูลด้านสิ่งแวดล้อมแบบดิจิทัล",
          "การพัฒนาแนวทาง Circular Economy"
        ],
        after: [
          "การเริ่มต้นตั้งแต่วันนี้ ช่วยให้องค์กรสามารถวางแผนการลงทุนและการเปลี่ยนผ่านได้อย่างเหมาะสม ลดต้นทุนในระยะยาว และสร้างความพร้อมก่อนกฎหมายและข้อกำหนดต่าง ๆ จะเข้มงวดมากขึ้น"
        ]
      },
      {
        title: "VerdiX: แพลตฟอร์มเชื่อมองค์กรสู่ผู้เชี่ยวชาญด้านความยั่งยืน",
        paragraphs: [
          "VerdiX ถูกพัฒนาขึ้นเพื่อช่วยให้องค์กรสามารถเข้าถึงการประเมินด้านความยั่งยืนได้ง่ายขึ้น ผ่านระบบ Digital Assessment และเครือข่ายผู้เชี่ยวชาญที่มีประสบการณ์จริงทั่วประเทศ",
          "แพลตฟอร์มครอบคลุมการประเมินในหลายด้าน เช่น:"
        ],
        list: [
          "Eco-Factory",
          "Green Industry",
          "Carbon Footprint (CFO/CFP)",
          "ESG Readiness",
          "Net Zero Roadmap",
          "Energy Efficiency",
          "Waste & Resource Management"
        ],
        after: [
          "โดยระบบจะช่วยวิเคราะห์สถานะปัจจุบันขององค์กร ระบุช่องว่างที่ต้องพัฒนา (Gap Analysis) พร้อมเสนอแนวทางและ Roadmap ที่เหมาะสมกับแต่ละองค์กร"
        ]
      },
      {
        title: "ขับเคลื่อนองค์กรด้วยข้อมูลและผู้เชี่ยวชาญจริง",
        paragraphs: [
          "หนึ่งในจุดเด่นของ VerdiX คือการผสานเทคโนโลยีดิจิทัลเข้ากับเครือข่ายผู้เชี่ยวชาญกว่า 120 คนทั่วประเทศไทย เพื่อช่วยให้องค์กรได้รับคำแนะนำที่สามารถนำไปปฏิบัติได้จริง",
          "ไม่ว่าจะเป็น:"
        ],
        list: [
          "โรงงานอุตสาหกรรม",
          "ธุรกิจอาหารและเกษตร",
          "อาคารและอสังหาริมทรัพย์",
          "ธุรกิจโลจิสติกส์",
          "ผู้ประกอบการ SME",
          "หน่วยงานภาครัฐและเอกชน"
        ],
        after: [
          "VerdiX พร้อมช่วยให้องค์กรสามารถวางแผนด้านสิ่งแวดล้อม พลังงาน และ Net Zero ได้อย่างเป็นระบบและสอดคล้องกับมาตรฐานสากล"
        ]
      },
      {
        title: "ก้าวสู่อนาคตที่ยั่งยืนไปด้วยกัน",
        paragraphs: [
          "เส้นทางสู่ Net Zero อาจไม่ใช่เรื่องง่าย แต่การเริ่มต้นอย่างถูกต้องจะช่วยให้องค์กรสามารถเปลี่ยน “ความท้าทาย” ให้กลายเป็น “โอกาส”",
          "อนาคตของธุรกิจไม่ได้วัดเพียงผลกำไร แต่รวมถึงความสามารถในการเติบโตอย่างยั่งยืน ลดผลกระทบต่อสิ่งแวดล้อม และสร้างคุณค่าให้กับสังคมในระยะยาว",
          "VerdiX พร้อมเป็นส่วนหนึ่งในการขับเคลื่อนองค์กรไทยสู่อนาคตสีเขียวอย่างมั่นคงและยั่งยืน"
        ],
        cta: [
          "เริ่มต้นประเมินองค์กรของคุณวันนี้",
          "วางแผน Net Zero อย่างเป็นระบบ",
          "เชื่อมต่อกับผู้เชี่ยวชาญด้านความยั่งยืนทั่วประเทศไทย"
        ],
        quote: "เพราะการเปลี่ยนแปลงที่ยั่งยืน เริ่มต้นจากการลงมือทำวันนี้"
      }
    ]
  }
};

const INIT_EXPERTS = [
  {id:1,name:"Eco-Factory Specialist 01",name_th:"ผู้เชี่ยวชาญ Eco-Factory 01",title_th:"ผู้เชี่ยวชาญ Eco-Factory, ESG และ GRI",title_en:"Eco-Factory, ESG & GRI Specialist",expertise:["Eco-Factory","ESG","GRI"],location:"Chonburi",rating:4.9,reviews:47,manday:15000,avatar:"👨‍🏫"},
  {id:2,name:"Carbon & Energy Specialist 02",name_th:"ผู้เชี่ยวชาญ Carbon & Energy 02",title_th:"ผู้เชี่ยวชาญพลังงานและ Carbon Footprint",title_en:"Energy & Carbon Footprint Expert",expertise:["CFO/CFP","Net Zero","Energy"],location:"Bangkok",rating:5.0,reviews:32,manday:18000,avatar:"👩‍💼"},
  {id:3,name:"ISO & Waste Specialist 03",name_th:"ผู้เชี่ยวชาญ ISO & Waste 03",title_th:"ผู้เชี่ยวชาญ ISO 14001 และการจัดการขยะ",title_en:"ISO 14001 & Waste Management Specialist",expertise:["ISO 14001","Waste Management","Eco-Factory"],location:"Rayong",rating:4.7,reviews:28,manday:12000,avatar:"👨‍🔬"},
  {id:4,name:"ESG Reporting Specialist 04",name_th:"ผู้เชี่ยวชาญ ESG Reporting 04",title_th:"ผู้เชี่ยวชาญ GRI และการรายงาน ESG",title_en:"GRI & ESG Reporting Specialist",expertise:["GRI","ESG","Net Zero"],location:"Bangkok",rating:4.8,reviews:41,manday:20000,avatar:"👩‍💻"},
  {id:5,name:"Energy Audit Specialist 05",name_th:"ผู้เชี่ยวชาญ Energy Audit 05",title_th:"วิศวกรพลังงานและผู้ตรวจสอบ ISO 50001",title_en:"Energy Engineer & ISO 50001 Auditor",expertise:["Energy","ISO 14001","CFO/CFP"],location:"Chiang Mai",rating:4.6,reviews:19,manday:10000,avatar:"👷"},
  {id:6,name:"Air & Safety Specialist 06",name_th:"ผู้เชี่ยวชาญ Air & Safety 06",title_th:"ผู้เชี่ยวชาญด้านอากาศและความปลอดภัย",title_en:"Air Quality & Industrial Safety Expert",expertise:["ESG","Waste Management","ISO 14001"],location:"Samut Prakan",rating:4.5,reviews:15,manday:11000,avatar:"👩‍🔬"},
];

const EXPERT_PLACEHOLDERS = INIT_EXPERTS.reduce((acc, expert) => ({ ...acc, [expert.id]: expert }), {});
const BLOCKED_EXPERT_NAME_PATTERNS = [
  /kowit/i,
  /nathawee/i,
  /somchai/i,
  /wanida/i,
  /prasert/i,
  /apinya/i,
  /โกวิท/,
  /ณัฐวี/,
  /สมชาย/,
  /วนิดา/,
  /ประเสริฐ/,
  /อาพิณยา/,
];

function anonymizeExperts(experts = []) {
  return experts.map((expert, index) => {
    const placeholder = EXPERT_PLACEHOLDERS[expert.id] || INIT_EXPERTS[index % INIT_EXPERTS.length];
    return {
      ...expert,
      name: placeholder.name,
      name_th: placeholder.name_th,
      title_th: placeholder.title_th,
      title_en: placeholder.title_en,
      avatar: placeholder.avatar,
    };
  });
}

function getPublicExpertText(expert, index, lang) {
  const number = String(index + 1).padStart(2, "0");
  const expertise = (expert.expertise || []).join(", ");
  return {
    name: lang === "th" ? `ผู้เชี่ยวชาญหมายเลข ${number}` : `Expert ${number}`,
    title: lang === "th" ? `ผู้เชี่ยวชาญด้าน ${expertise}` : `Specialist in ${expertise}`,
  };
}

function anonymizeArticleAuthors(articles = []) {
  return articles.map(article => {
    const author = article.author || "";
    const shouldAnonymize = BLOCKED_EXPERT_NAME_PATTERNS.some(pattern => pattern.test(author));
    return shouldAnonymize ? { ...article, author: "VerdiX Editorial" } : article;
  });
}

function normalizeArticles(articles = []) {
  const forcedArticles = new Map([
    [1, INIT_ARTICLES[0]],
    [2, INIT_ARTICLES[1]],
    [3, INIT_ARTICLES[2]],
  ]);
  return anonymizeArticleAuthors(articles).map(article => {
    const title = `${article.title_th || ""} ${article.title_en || ""}`.toLowerCase();
    const isNetZeroArticle = article.id === 1 || title.includes("thailand net zero 2050");
    const isEsgArticle = article.id === 2 || title.includes("esg คืออะไร") || title.includes("what is esg");
    const isEcoFactoryArticle = article.id === 3 || title.includes("eco-factory") || title.includes("มาตรฐานโรงงานสีเขียว");
    const featured = isNetZeroArticle ? forcedArticles.get(1) : isEsgArticle ? forcedArticles.get(2) : isEcoFactoryArticle ? forcedArticles.get(3) : null;
    return featured
      ? {
          ...article,
          title_th: featured.title_th,
          title_en: featured.title_en,
          excerpt_th: featured.excerpt_th,
          excerpt_en: featured.excerpt_en,
          category: featured.category,
          author: "VerdiX Editorial",
          image: featured.image,
        }
      : article;
  });
}

const INIT_SLIDES = [
  {
    id: 1,
    title_th: "BUUxC",
    title_en: "BUUxC",
    kicker_th: "Verdify Your Journey",
    kicker_en: "Verdify Your Journey",
    subtitle_th: "ศูนย์กลางผู้เชี่ยวชาญด้าน Sustainability และระบบประเมินมาตรฐานสิ่งแวดล้อมแบบครบวงจร สำหรับองค์กรที่เตรียมพร้อมสู่ Net Zero, ESG และกฎระเบียบใหม่ด้านสภาพภูมิอากาศ",
    subtitle_en: "The all-in-one hub for real sustainability experts and digital assessment systems, built for organizations preparing for Net Zero, ESG, and emerging climate regulations.",
    primary_th: "เริ่มต้นใช้งาน",
    primary_en: "Get Started",
    primary_page: "register",
    secondary_th: "ค้นหาผู้เชี่ยวชาญ",
    secondary_en: "Find Experts",
    secondary_page: "experts",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1800&q=80",
    active: true
  },
  {
    id: 2,
    title_th: "Eco-Factory Assessment",
    title_en: "Eco-Factory Assessment",
    kicker_th: "ตรวจประเมินโรงงานออนไลน์",
    kicker_en: "Online Factory Readiness Check",
    subtitle_th: "เริ่มประเมินความพร้อมด้านสิ่งแวดล้อมของโรงงาน เห็นคะแนน ช่องว่าง และแผนปรับปรุงได้ในระบบเดียว",
    subtitle_en: "Assess environmental readiness, identify gaps, and build improvement actions in one digital workflow.",
    primary_th: "ลองตรวจประเมิน",
    primary_en: "Start Assessment",
    primary_page: "factory-check",
    secondary_th: "ดู Eco Factory",
    secondary_en: "Explore Eco Factory",
    secondary_page: "eco-factory",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=80",
    active: true
  },
  {
    id: 3,
    title_th: "Net Zero & ESG Workflow",
    title_en: "Net Zero & ESG Workflow",
    kicker_th: "ข้อมูลพร้อม รายงานพร้อม ทีมพร้อม",
    kicker_en: "Data, Reports, and Experts Ready",
    subtitle_th: "เชื่อมข้อมูลคาร์บอน รายงาน ESG และผู้เชี่ยวชาญจริง เพื่อช่วยให้องค์กรเดินหน้าสู่เป้าหมายได้เร็วขึ้น",
    subtitle_en: "Connect carbon data, ESG reporting, and expert support so your organization can move faster with confidence.",
    primary_th: "ดู Carbon",
    primary_en: "Carbon Tools",
    primary_page: "carbon",
    secondary_th: "อ่านความรู้",
    secondary_en: "Read Knowledge",
    secondary_page: "blog",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=80",
    active: true
  }
];

const SLIDE_STORE_KEY = "verdix.heroSlides";

const slideApi = {
  list() {
    try {
      const raw = window.localStorage.getItem(SLIDE_STORE_KEY);
      const slides = raw ? JSON.parse(raw) : INIT_SLIDES;
      return slides.map(slide => ({
        ...slide,
        title_th: slide.title_th === "VerdiX" ? "BUUxC" : slide.title_th,
        title_en: slide.title_en === "VerdiX" ? "BUUxC" : slide.title_en
      }));
    } catch {
      return INIT_SLIDES;
    }
  },
  save(slides) {
    window.localStorage.setItem(SLIDE_STORE_KEY, JSON.stringify(slides));
    return slides;
  }
};

const INIT_FOOTER = {
  ctaTitle_th: "Verdify Your Journey",
  ctaTitle_en: "Verdify Your Journey",
  ctaSub_th: "เปลี่ยนเส้นทางธุรกิจของคุณสู่ความยั่งยืน ลงทะเบียนฟรีและเชื่อมต่อกับผู้เชี่ยวชาญได้เลยวันนี้",
  ctaSub_en: "Transform your business toward sustainability. Register free and connect with certified experts today.",
  ctaButton_th: "เริ่มต้นฟรี",
  ctaButton_en: "Start Free",
  ctaPage: "register",
  description_th: "Sustainability Expert-on-Demand Platform สำหรับองค์กรที่ต้องการเริ่มต้น วัดผล และขับเคลื่อนแผนความยั่งยืนอย่างมั่นใจ",
  description_en: "Sustainability Expert-on-Demand Platform for organizations ready to start, measure, and scale their sustainability journey.",
  quickLinks: [
    {label_th:"หน้าแรก",label_en:"Home",page:"home"},
    {label_th:"ความรู้",label_en:"Knowledge",page:"blog"},
    {label_th:"ผู้เชี่ยวชาญ",label_en:"Experts",page:"experts"},
    {label_th:"เข้าสู่ระบบ",label_en:"Login",page:"login"}
  ],
  services: ["Expert-on-Demand","Eco-Factory","ESG Report","Net Zero Roadmap","CFO/CFP"],
  email: "info@verdixgreen.com",
  email2: "kowit007@gmail.com",
  phone: "061-951-6639",
  location: "Bangkok, Thailand",
  location2: "Chonburi, Thailand",
  socials: [
    {icon:"🌐",label:"Website",url:"#"},
    {icon:"in",label:"LinkedIn",url:"#"},
    {icon:"f",label:"Facebook",url:"#"},
    {icon:"✉",label:"Email",url:"mailto:info@verdixgreen.com"}
  ],
  partners: [
    {type:"buu-ph",name:"Burapha University Faculty of Public Health",url:""},
    {name:"Burapha University x Planet C",logo:"/partner-buu-planet-c.webp",url:""}
  ],
  copyright: "@ 2025 copy right www.verdixgreen.com",
  legalLinks: [
    {label_th:"นโยบายความเป็นส่วนตัว",label_en:"Privacy Policy",page:"#"},
    {label_th:"เงื่อนไขการใช้งาน",label_en:"Terms of Use",page:"#"}
  ]
};

const FOOTER_STORE_KEY = "verdixgreen.footer.v2";

const footerApi = {
  list() {
    try {
      const raw = window.localStorage.getItem(FOOTER_STORE_KEY);
      return raw ? {...INIT_FOOTER, ...JSON.parse(raw)} : INIT_FOOTER;
    } catch {
      return INIT_FOOTER;
    }
  },
  save(footer) {
    window.localStorage.setItem(FOOTER_STORE_KEY, JSON.stringify(footer));
    return footer;
  }
};

// ─── Announce Banner ──────────────────────────────────────────
const INIT_MENUS = [
  {id:1,label_th:"หน้าแรก",label_en:"Home",page:"home",parent_id:null,order:1,active:true},
  {id:22,label_th:"เกี่ยวกับเรา",label_en:"About Us",page:"about",parent_id:null,order:1.5,active:true},
  {id:2,label_th:"สิ่งแวดล้อม",label_en:"Environment",page:"env",parent_id:null,order:2,active:true},
  {id:3,label_th:"Carbon Management",label_en:"Carbon Management",page:"carbon",parent_id:null,order:3,active:true},
  {id:4,label_th:"Eco Factory",label_en:"Eco Factory",page:"eco-factory",parent_id:null,order:4,active:true},
  {id:5,label_th:"Amata Awards",label_en:"Amata Awards",page:"amata-awards",parent_id:null,order:5,active:true},
  {id:6,label_th:"ศูนย์แบบประเมิน",label_en:"Assessment Center",page:"factory-check",parent_id:null,order:6,active:true},
  {id:7,label_th:"ความรู้",label_en:"Knowledge",page:"blog",parent_id:null,order:7,active:true},
  {id:8,label_th:"ติดต่อเรา",label_en:"Contact Us",page:"experts",parent_id:null,order:8,active:true},
  {id:18,label_th:"ดาวน์โหลดเอกสาร",label_en:"Downloads",page:"downloads",parent_id:null,order:9,active:true},
  {id:19,label_th:"การประเมิน CFO",label_en:"CFO Assessment",page:"carbon",parent_id:3,order:1,active:true,carbon_tab:"cfo"},
  {id:20,label_th:"การประเมิน CFP",label_en:"CFP Assessment",page:"carbon",parent_id:3,order:2,active:true,carbon_tab:"cfp"},
  {id:9,label_th:"Eco-Factory Online",label_en:"Eco-Factory Online",page:"factory-check",parent_id:4,order:1,active:true},
  {id:10,label_th:"Amata Best Waste Management Awards",label_en:"Amata Best Waste Management Awards",page:"amata-awards",parent_id:5,order:1,active:true},
  {id:24,label_th:"แบบประเมินทั้งหมด",label_en:"All Assessments",page:"factory-check",parent_id:6,order:1,active:true},
  {id:25,label_th:"แบบประเมิน CFO",label_en:"CFO Assessment",page:"carbon",parent_id:6,order:2,active:true,carbon_tab:"cfo"},
  {id:26,label_th:"แบบประเมิน CFP",label_en:"CFP Assessment",page:"carbon",parent_id:6,order:3,active:true,carbon_tab:"cfp"},
  {id:27,label_th:"แบบประเมิน Eco Factory",label_en:"Eco Factory Assessment",page:"factory-check",parent_id:6,order:4,active:true},
  {id:21,label_th:"ระบบคัดกรองภาวะซึมเศร้า",label_en:"Depression Screening System",page:"https://mddscreen.verdixgreen.com/",parent_id:6,order:5,active:true,external_url:"https://mddscreen.verdixgreen.com/"},
  {id:30,label_th:"แบบสอบถามความพึงพอใจ(TGI)",label_en:"Satisfaction Survey (TGI)",page:"tgi-survey",parent_id:6,order:6,active:true},
  {id:28,label_th:"แบบสอบถามความพึงพอใจ",label_en:"Satisfaction Survey",page:"experts",parent_id:6,order:7,active:true},
  {id:29,label_th:"แบบฟอร์มติดต่อ / ขอคำปรึกษา",label_en:"Contact / Consultation Form",page:"experts",parent_id:6,order:8,active:true},
  {id:11,label_th:"บทความ ESG",label_en:"ESG Articles",page:"blog",parent_id:7,order:1,active:true},
  {id:23,label_th:"ติดต่อเรา",label_en:"Contact Us",page:"experts",parent_id:8,order:0,active:true},
  {id:12,label_th:"เครือข่ายผู้เชี่ยวชาญ",label_en:"Expert Network",page:"experts",parent_id:8,order:1,active:true},
  {id:13,label_th:"หลักเกณฑ์ ECO FACTORY",label_en:"Eco Factory Criteria",page:"eco-factory",parent_id:4,order:2,active:true,eco_tab:"guide"},
  {id:14,label_th:"ประชาสัมพันธ์",label_en:"News & PR",page:"eco-factory",parent_id:4,order:3,active:true,eco_tab:"news"},
  {id:15,label_th:"สิทธิประโยชน์",label_en:"Benefits",page:"eco-factory",parent_id:4,order:4,active:true,eco_tab:"benefit"},
  {id:16,label_th:"ขั้นตอนและตารางประชุม",label_en:"Process & Meeting Schedule",page:"eco-factory",parent_id:4,order:5,active:true,eco_tab:"process"},
  {id:17,label_th:"ขอขึ้นทะเบียนรับรอง",label_en:"Certification Registration",page:"eco-factory",parent_id:4,order:6,active:true,eco_tab:"apply"}
];

const ECO_FACTORY_MENU_TABS = [
  {id:13,label_th:"หลักเกณฑ์ ECO FACTORY",label_en:"Eco Factory Criteria",page:"eco-factory",parent_id:4,order:2,active:true,eco_tab:"guide"},
  {id:14,label_th:"ประชาสัมพันธ์",label_en:"News & PR",page:"eco-factory",parent_id:4,order:3,active:true,eco_tab:"news"},
  {id:15,label_th:"สิทธิประโยชน์",label_en:"Benefits",page:"eco-factory",parent_id:4,order:4,active:true,eco_tab:"benefit"},
  {id:16,label_th:"ขั้นตอนและตารางประชุม",label_en:"Process & Meeting Schedule",page:"eco-factory",parent_id:4,order:5,active:true,eco_tab:"process"},
  {id:17,label_th:"ขอขึ้นทะเบียนรับรอง",label_en:"Certification Registration",page:"eco-factory",parent_id:4,order:6,active:true,eco_tab:"apply"}
];

const REQUIRED_MENUS = [
  {id:22,label_th:"เกี่ยวกับเรา",label_en:"About Us",page:"about",parent_id:null,order:1.5,active:true},
  {id:18,label_th:"ดาวน์โหลดเอกสาร",label_en:"Downloads",page:"downloads",parent_id:null,order:9,active:true},
  {id:23,label_th:"ติดต่อเรา",label_en:"Contact Us",page:"experts",parent_id:8,order:0,active:true},
  {id:24,label_th:"แบบประเมินทั้งหมด",label_en:"All Assessments",page:"factory-check",parent_id:6,order:1,active:true},
  {id:25,label_th:"แบบประเมิน CFO",label_en:"CFO Assessment",page:"carbon",parent_id:6,order:2,active:true,carbon_tab:"cfo"},
  {id:26,label_th:"แบบประเมิน CFP",label_en:"CFP Assessment",page:"carbon",parent_id:6,order:3,active:true,carbon_tab:"cfp"},
  {id:27,label_th:"แบบประเมิน Eco Factory",label_en:"Eco Factory Assessment",page:"factory-check",parent_id:6,order:4,active:true},
  {id:30,label_th:"แบบสอบถามความพึงพอใจ(TGI)",label_en:"Satisfaction Survey (TGI)",page:"tgi-survey",parent_id:6,order:6,active:true},
  {id:28,label_th:"แบบสอบถามความพึงพอใจ",label_en:"Satisfaction Survey",page:"experts",parent_id:6,order:7,active:true},
  {id:29,label_th:"แบบฟอร์มติดต่อ / ขอคำปรึกษา",label_en:"Contact / Consultation Form",page:"experts",parent_id:6,order:8,active:true},
  {id:19,label_th:"การประเมิน CFO",label_en:"CFO Assessment",page:"carbon",parent_id:3,order:1,active:true,carbon_tab:"cfo"},
  {id:20,label_th:"การประเมิน CFP",label_en:"CFP Assessment",page:"carbon",parent_id:3,order:2,active:true,carbon_tab:"cfp"},
  {id:21,label_th:"ระบบคัดกรองภาวะซึมเศร้า",label_en:"Depression Screening System",page:"https://mddscreen.verdixgreen.com/",parent_id:6,order:5,active:true,external_url:"https://mddscreen.verdixgreen.com/"},
  ...ECO_FACTORY_MENU_TABS
];

function normalizeMenus(menus) {
  const normalized = (menus || INIT_MENUS).map(m => {
    if (Number(m.id) === 5) {
      return {...m,label_th:"Amata Awards",label_en:"Amata Awards",parent_id:null,order:m.order || 5};
    }
    if (Number(m.id) === 10) {
      return {...m,label_th:"Amata Best Waste Management Awards",label_en:"Amata Best Waste Management Awards",parent_id:5,order:1};
    }
    if (Number(m.id) === 6) {
      return {...m,label_th:"ศูนย์แบบประเมิน",label_en:"Assessment Center",page:"factory-check",parent_id:null,order:m.order || 6};
    }
    if (Number(m.id) === 21) {
      return {...m,label_th:"ระบบคัดกรองภาวะซึมเศร้า",label_en:"Depression Screening System",page:"https://mddscreen.verdixgreen.com/",parent_id:6,order:5,active:m.active,external_url:"https://mddscreen.verdixgreen.com/"};
    }
    if (Number(m.id) === 30) {
      return {...m,label_th:"แบบสอบถามความพึงพอใจ(TGI)",label_en:"Satisfaction Survey (TGI)",page:"tgi-survey",parent_id:6,order:6,external_url:undefined};
    }
    if (Number(m.id) === 28) {
      return {...m,label_th:"แบบสอบถามความพึงพอใจ",label_en:"Satisfaction Survey",page:"experts",parent_id:6,order:7};
    }
    if (Number(m.id) === 29) {
      return {...m,label_th:"แบบฟอร์มติดต่อ / ขอคำปรึกษา",label_en:"Contact / Consultation Form",page:"experts",parent_id:6,order:8};
    }
    if (Number(m.id) === 8) {
      return {...m,label_th:"ติดต่อเรา",label_en:"Contact Us",page:"experts",parent_id:null,order:m.order || 8};
    }
    if (Number(m.id) === 12) {
      return {...m,label_th:"เครือข่ายผู้เชี่ยวชาญ",label_en:"Expert Network",page:"experts",parent_id:8,order:m.order || 1};
    }
    return m;
  });
  const existingIds = new Set(normalized.map(m => Number(m.id)));
  return [
    ...normalized,
    ...REQUIRED_MENUS.filter(m => !existingIds.has(Number(m.id)))
  ];
}

function normalizeDocuments(docs) {
  const requiredIds = new Set(INIT_DOCUMENTS.map(d => Number(d.id)));
  const customDocs = (docs || []).filter(d => !requiredIds.has(Number(d.id)));
  return [...INIT_DOCUMENTS, ...customDocs];
}

const CFO_ACTIVITY_GROUPS = [
  {
    scope: "scope1",
    title: "Scope 1 - การปล่อยทางตรง",
    note: "สูตรหลักจาก Fr-04.1: ปริมาณกิจกรรม x ค่า EF / 1000 = tonCO2eq",
    items: [
      { key: "gasoline_pump", label: "น้ำมันเบนซิน (ปั๊มสูบน้ำ)", unit: "ลิตร", ef: 2.2719116, source: "EF TGO AR5 - mobile/stationary fuel" },
      { key: "gasoline_mower", label: "น้ำมันเบนซิน (เครื่องตัดหญ้า)", unit: "ลิตร", ef: 2.2719116, source: "EF TGO AR5" },
      { key: "diesel_pump", label: "น้ำมันดีเซล (เครื่องสูบน้ำแบบลากจูง)", unit: "ลิตร", ef: 2.70779058, source: "EF TGO AR5 stationary diesel" },
      { key: "gasoline_vehicle", label: "น้ำมันเบนซิน (รถยนต์ส่วนบุคคล)", unit: "ลิตร", ef: 2.2719116, source: "EF TGO AR5 mobile gasoline" },
      { key: "diesel_vehicle", label: "น้ำมันดีเซล (รถยนต์ส่วนบุคคล/รถเก็บขยะ/รถแบ็คโฮ)", unit: "ลิตร", ef: 2.74062321, source: "EF TGO AR5 mobile diesel" },
      { key: "r32", label: "สารทำความเย็น R32", unit: "กิโลกรัม", ef: 677, source: "IPCC 2013 AR5 GWP100" },
      { key: "septic_ch4", label: "ระบบ Septic tank (CH4)", unit: "กิโลกรัม CH4", ef: 28, source: "IPCC AR5 GWP100 CH4" },
      { key: "fertilizer_151515", label: "ปุ๋ย 15-15-15", unit: "กิโลกรัม", ef: 0, source: "ระบุ EF ตามแหล่งอ้างอิงที่องค์กรใช้" },
      { key: "co2_extinguisher", label: "ถังดับเพลิง CO2", unit: "กิโลกรัม CO2", ef: 1, source: "Mass CO2 direct release" },
    ],
  },
  {
    scope: "scope2",
    title: "Scope 2 - พลังงานไฟฟ้าที่ซื้อมา",
    note: "สูตรจาก Fr-04.1 แถวการใช้พลังงานไฟฟ้า: kWh x 0.4999 / 1000",
    items: [
      { key: "grid_electricity", label: "การใช้ไฟฟ้าระบบ grid mix", unit: "kWh", ef: 0.4999, source: "Thai National LCI Database / TGO electricity AR5" },
    ],
  },
  {
    scope: "scope3",
    title: "Scope 3 - การปล่อยทางอ้อมอื่น",
    note: "สูตรเดียวกันกับ Scope 3 ใน workbook: activity data x EF / 1000 และประเมินความมีนัยสำคัญแยกได้ภายหลัง",
    items: [
      { key: "water_supply", label: "น้ำประปา", unit: "ลูกบาศก์เมตร", ef: 0.344, source: "ค่า EF น้ำประปาตั้งต้นจากแบบคำนวณเดิม" },
      { key: "a4_paper_70gsm", label: "กระดาษ A4 70 แกรม", unit: "กิโลกรัม", ef: 1.2, source: "ปรับ EF ตามฐานข้อมูล LCI ที่ใช้จริง" },
      { key: "general_waste", label: "ขยะทั่วไป", unit: "กิโลกรัม", ef: 0.42, source: "ค่า EF ตั้งต้นสำหรับขยะทั่วไป" },
      { key: "upstream_transport_tkm", label: "การขนส่งต้นน้ำ", unit: "ton-km", ef: 0.045, source: "คำนวณ tkm = ระยะทาง x น้ำหนัก / 1000" },
      { key: "employee_gasoline_commute", label: "การเดินทางพนักงาน - เบนซิน", unit: "ลิตร", ef: 2.2719116, source: "ระยะทางต่อปี / อัตราสิ้นเปลือง" },
      { key: "employee_diesel_commute", label: "การเดินทางพนักงาน - ดีเซล", unit: "ลิตร", ef: 2.74062321, source: "ระยะทางต่อปี / อัตราสิ้นเปลือง" },
    ],
  },
];

const CFO_ITEMS = CFO_ACTIVITY_GROUPS.flatMap(group => group.items.map(item => ({ ...item, scope: group.scope })));
const CFO_SCOPE_LABELS = { scope1: "Scope 1", scope2: "Scope 2", scope3: "Scope 3" };
const CFO_STATUS_LABELS = {
  draft: "ร่าง",
  submitted: "รอตรวจประเมิน",
  approved: "ยืนยันถูกต้อง",
  needs_revision: "ส่งกลับแก้ไข",
};

function defaultCfoRows() {
  return Object.fromEntries(CFO_ITEMS.map(item => [item.key, { quantity: "", ef: item.ef, evidence: "", note: "" }]));
}

function numberValue(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function calculateCfoAssessment(rows) {
  const lines = CFO_ITEMS.map(item => {
    const row = rows?.[item.key] || {};
    const quantity = numberValue(row.quantity);
    const ef = numberValue(row.ef ?? item.ef);
    const emission = quantity * ef / 1000;
    return { ...item, quantity, ef, emission };
  });
  const totals = lines.reduce((acc, line) => {
    acc[line.scope] = (acc[line.scope] || 0) + line.emission;
    return acc;
  }, { scope1: 0, scope2: 0, scope3: 0 });
  const scope12 = totals.scope1 + totals.scope2;
  const total = scope12 + totals.scope3;
  return { lines, totals, scope12, total };
}

function formatTon(value) {
  return Number(value || 0).toLocaleString("th-TH", { maximumFractionDigits: 3 });
}

const TGI_CSV_COLUMNS = [
  "respondent_name",
  "tambon",
  "village",
  "community",
  "organization",
  "student_recorder",
  "overall_score",
  "awareness_score",
  "participation_score",
  "behavior_score",
  "csr_focus",
  "suggestion",
  "supplemental_answers_json",
  "google_grid_answers_json",
  "created_at",
];

const TGI_FIELD_PLAN = {
  areaCount: 5,
  villageCount: 30,
  householdCount: 8500,
  sampleCount: 420,
  studentCount: 18,
  schedules: [
    { date: "26 มิถุนายน 2569", students: 9 },
    { date: "27 มิถุนายน 2569", students: 9 },
  ],
  rows: [
    { order: 1, tambon: "หนองปรือ", villageText: "หมู่ 1-3", villageNos: [1,2,3], villages: 3, households: 1800, ratio: "21.2%", samples: 89 },
    { order: 2, tambon: "ศีรษะจรเข้น้อย", villageText: "หมู่ 1-12", villageNos: [1,2,3,4,5,6,7,8,9,10,11,12], villages: 12, households: 3200, ratio: "37.6%", samples: 158 },
    { order: 3, tambon: "ศีรษะจรเข้ใหญ่", villageText: "หมู่ 3-9", villageNos: [3,4,5,6,7,8,9], villages: 7, households: 1500, ratio: "17.6%", samples: 74 },
    { order: 4, tambon: "บางเสาธง", villageText: "หมู่ 10-14", villageNos: [10,11,12,13,14], villages: 5, households: 1200, ratio: "14.1%", samples: 59 },
    { order: 5, tambon: "บางโฉลง", villageText: "หมู่ 5, 7, 10", villageNos: [5,7,10], villages: 3, households: 800, ratio: "9.4%", samples: 40 },
  ],
};

const TGI_STUDENT_OPTIONS = [
  "นายปฏิพล ล้อมสาย",
  "นางสาวสุชัญญา กันบาง",
  "นางสาวธัญรัตน์ จีนปาน",
  "นางสาวพรนภา มุสิกชาติ",
  "นางสาวมินตรา มงคล",
  "นางสาวเลนดา เรืองไพศาล",
  "นางสาวนาตาชา หะ",
  "นายจตุรา",
  "นายธนกฤต ทองระอา",
  "อัครเดช สำราญสุข",
  "อรณัญช์ ยิ่งเชิดงาม",
];

const TGI_TAMBON_OPTIONS = TGI_FIELD_PLAN.rows.map(row => row.tambon);

function tgiVillageOptionsFor(tambon) {
  return TGI_FIELD_PLAN.rows.find(row => row.tambon === tambon)?.villageNos || [];
}

function averageOf(rows, key) {
  const values = (rows || []).map(row => Number(row[key])).filter(Number.isFinite);
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function tgiRecorderName(row) {
  return row.raw_data?.student_recorder || row.raw_data?.supplemental_answers?.student_recorder?.value || "ไม่ระบุ";
}

function tgiTambonName(row) {
  const rawValue = row.raw_data?.tambon || row.raw_data?.subdistrict || row.raw_data?.supplemental_answers?.tambon?.value || row.community || "";
  const text = String(rawValue || "");
  return TGI_TAMBON_OPTIONS.find(tambon => text.includes(tambon)) || "ไม่ระบุ";
}

function tgiVillageNo(row) {
  const rawValue = row.raw_data?.village || row.raw_data?.village_no || row.raw_data?.supplemental_answers?.village?.value || row.raw_data?.supplemental_answers?.domicile?.value || row.community || "";
  const text = String(rawValue || "");
  const match = text.match(/(?:หมู่|ม\.|village)?\s*(\d{1,2})/i);
  return match ? Number(match[1]) : null;
}

function countTop(rows, getter, limit = 5) {
  return Object.entries((rows || []).reduce((acc, row) => {
    const key = getter(row) || "ไม่ระบุ";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {})).sort((a,b) => b[1] - a[1]).slice(0, limit).map(([label, count]) => ({ label, count }));
}

function tgiScoreLevel(avg) {
  if (avg >= 4.21) return "ดีมาก";
  if (avg >= 3.41) return "ดี";
  if (avg >= 2.61) return "ปานกลาง";
  if (avg >= 1.81) return "ควรปรับปรุง";
  if (avg > 0) return "ต้องเร่งปรับปรุง";
  return "ยังไม่มีข้อมูล";
}

function summarizeTgiSurvey(rows = []) {
  const topFocusRows = countTop(rows, row => row.csr_focus || "ไม่ระบุ", 5);
  const topCommunityRows = countTop(rows, row => row.community || "ไม่ระบุ", 5);
  const topRecorderRows = countTop(rows, tgiRecorderName, 5);
  const avgOverall = averageOf(rows, "overall_score");
  const avgAwareness = averageOf(rows, "awareness_score");
  const avgParticipation = averageOf(rows, "participation_score");
  const avgBehavior = averageOf(rows, "behavior_score");
  const latestDate = rows.map(row => row.created_at).filter(Boolean).sort().at(-1);
  const tambonRows = TGI_FIELD_PLAN.rows.map(plan => {
    const tambonResponses = rows.filter(row => tgiTambonName(row) === plan.tambon);
    return {
      ...plan,
      collected: tambonResponses.length,
      remaining: Math.max(0, plan.samples - tambonResponses.length),
      progress: plan.samples ? Math.min(100, tambonResponses.length / plan.samples * 100) : 0,
      villageRows: plan.villageNos.map(village => {
        const collected = tambonResponses.filter(row => tgiVillageNo(row) === village).length;
        return { tambon: plan.tambon, village, collected };
      }),
    };
  });
  const villageRows = tambonRows.flatMap(row => row.villageRows);
  const studentRows = TGI_STUDENT_OPTIONS.map(name => ({
    name,
    collected: rows.filter(row => tgiRecorderName(row) === name).length,
  }));
  const unknownRecorderCount = rows.filter(row => tgiRecorderName(row) === "ไม่ระบุ").length;
  return {
    total: rows.length,
    avgOverall,
    avgAwareness,
    avgParticipation,
    avgBehavior,
    scoreLevel: tgiScoreLevel(avgOverall),
    topFocus: topFocusRows[0]?.label || "-",
    topFocusRows,
    topCommunityRows,
    topRecorderRows,
    tambonRows,
    villageRows,
    studentRows,
    unknownRecorderCount,
    latestDate,
  };
}

function splitCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    const next = line[i + 1];
    if (ch === '"' && quoted && next === '"') {
      current += '"';
      i += 1;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells.map(cell => cell.trim());
}

function parseTgiCsv(text) {
  const lines = String(text || "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (!lines.length) return [];
  const header = splitCsvLine(lines[0]).map(cell => cell.trim());
  const hasKnownHeader = header.some(col => TGI_CSV_COLUMNS.includes(col));
  const columns = hasKnownHeader ? header : TGI_CSV_COLUMNS;
  const rows = hasKnownHeader ? lines.slice(1) : lines;
  return rows.map((line, index) => {
    const cells = splitCsvLine(line);
    const raw = Object.fromEntries(columns.map((col, i) => [col, cells[i] || ""]));
    const tambon = raw.tambon || raw["ตำบล"] || "";
    const village = raw.village || raw["หมู่"] || "";
    return {
      id: Date.now() + index,
      respondent_name: raw.respondent_name || raw["ชื่อ"] || raw["ชื่อ-นามสกุล"] || "",
      community: raw.community || raw["ชุมชน"] || (tambon && village ? `${tambon} หมู่ ${village}` : ""),
      organization: raw.organization || "TGI",
      overall_score: Number(raw.overall_score || raw["overall_score"] || 0),
      awareness_score: Number(raw.awareness_score || raw["awareness_score"] || 0),
      participation_score: Number(raw.participation_score || raw["participation_score"] || 0),
      behavior_score: Number(raw.behavior_score || raw["behavior_score"] || 0),
      csr_focus: raw.csr_focus || raw["csr_focus"] || "",
      suggestion: raw.suggestion || raw["ข้อเสนอแนะ"] || "",
      created_at: raw.created_at || new Date().toISOString(),
      raw_data: {
        ...raw,
        tambon,
        village,
      },
    };
  });
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function getTgiCsvValue(row, col) {
  if (col === "student_recorder") return row.raw_data?.student_recorder || "";
  if (col === "tambon") return tgiTambonName(row);
  if (col === "village") return tgiVillageNo(row) || "";
  if (col === "supplemental_answers_json") return JSON.stringify(row.raw_data?.supplemental_answers || {});
  if (col === "google_grid_answers_json") return JSON.stringify(row.raw_data?.google_grid_answers || {});
  return row[col];
}

function toTgiCsv(rows = []) {
  const head = TGI_CSV_COLUMNS.join(",");
  const body = rows.map(row => TGI_CSV_COLUMNS.map(col => csvEscape(getTgiCsvValue(row, col))).join(",")).join("\n");
  return [head, body].filter(Boolean).join("\n");
}

function AnnounceBanner({ lang }) {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="announce-bar">
      {lang==="th"
        ? <><em>🌿 ใหม่!</em> ระบบตรวจประเมิน Eco-Factory ออนไลน์ พร้อมใช้งานแล้ว — <em>ลองใช้ฟรีวันนี้</em></>
        : <><em>🌿 New!</em> Online Eco-Factory Assessment System is now live — <em>Try it free today</em></>}
      <button onClick={()=>setShow(false)} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.6)",fontSize:16,cursor:"pointer"}}>×</button>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────
function Breadcrumb({ items, nav }) {
  if (!items || items.length < 2) return null;
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        {items.map((item, i) => (
          <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
            {i > 0 && <span>›</span>}
            {i < items.length - 1
              ? <button onClick={()=>nav(item.page)}>{item.label}</button>
              : <span style={{color:"var(--text)",fontWeight:600}}>{item.label}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Back to Top ──────────────────────────────────────────────
function BackToTop() {
  const [vis, setVis] = useState(false);
  if (typeof window !== "undefined") {
    // simplified: use state toggle on scroll simulation
  }
  return (
    <button className={`back-top ${vis?"visible":""}`}
      onClick={()=>{ setVis(false); window.scrollTo({top:0,behavior:"smooth"}); }}
      onMouseEnter={()=>setVis(true)}
      style={{opacity:1,transform:"translateY(0)"}}
      title="Back to top">↑</button>
  );
}

function localAiAnswer(text, lang) {
  const q = text.toLowerCase();
  const th = lang === "th";
  if (q.includes("eco") || q.includes("factory") || q.includes("โรงงาน")) {
    return th
      ? "Eco Factory คือมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ โดยทั่วไปต้องเตรียมข้อมูลด้านพลังงาน น้ำ อากาศ กากของเสีย GHG ชุมชน และระบบบริหารจัดการสิ่งแวดล้อม คุณสามารถเริ่มจากเมนู Eco Factory และดาวน์โหลดเอกสารเกณฑ์ได้ในหน้า ดาวน์โหลดเอกสาร"
      : "Eco Factory readiness usually covers energy, water, air, waste, GHG, community, and environmental management evidence. Start from the Eco Factory menu and the Downloads page.";
  }
  if (q.includes("cfo") || q.includes("cfp") || q.includes("carbon") || q.includes("คาร์บอน")) {
    return th
      ? "CFO คือ Carbon Footprint for Organization ส่วน CFP คือ Carbon Footprint of Product ระบบควรเริ่มจากเก็บ activity data เช่น ไฟฟ้า เชื้อเพลิง วัตถุดิบ ขนส่ง ของเสีย และ emission factor ตามแนวทาง TGO/ISO"
      : "CFO is organization-level carbon footprint, while CFP is product-level footprint. Begin with activity data such as electricity, fuel, materials, transport, waste, and proper emission factors.";
  }
  if (q.includes("iot") || q.includes("mqtt") || q.includes("sensor") || q.includes("plc")) {
    return th
      ? "งาน IoT/MQTT สำหรับสิ่งแวดล้อมควรวาง flow เป็น Sensor/PLC -> Gateway -> MQTT Broker -> Dashboard -> Alert/Report โดยกำหนด topic, unit, sampling rate และ data quality ให้ชัดเจน"
      : "A good IoT/MQTT flow is Sensor/PLC -> Gateway -> MQTT Broker -> Dashboard -> Alert/Report. Define topics, units, sampling rate, and data quality rules clearly.";
  }
  if (q.includes("download") || q.includes("เอกสาร") || q.includes("โหลด")) {
    return th
      ? "ไปที่เมนู ดาวน์โหลดเอกสาร ได้เลยครับ ตอนนี้มีหมวด Eco Factory และปุ่มดูไฟล์ทั้งหมดเพื่อเปิดรายละเอียดไฟล์แยกรายการ"
      : "Open the Downloads menu. It includes Eco Factory categories and a View All Files button for document details.";
  }
  return th
    ? "ตอนนี้ระบบ AI backend ยังไม่ได้ใส่ OpenAI API Key บน server แต่ผมช่วยตอบเบื้องต้นได้เรื่อง Eco Factory, CFO/CFP, Carbon Footprint, IoT/MQTT, ESG และการดาวน์โหลดเอกสารครับ"
    : "The AI backend is not configured with an OpenAI API key yet, but I can still help with Eco Factory, CFO/CFP, Carbon Footprint, IoT/MQTT, ESG, and document downloads.";
}

function AiChatWidget({ lang }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const L = (th,en) => lang === "th" ? th : en;
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: L(
        "สวัสดีครับ ผมคือ VerdiX AI ถามได้เรื่อง Eco Factory, CFO/CFP, Carbon Footprint, IoT/MQTT และเอกสารดาวน์โหลด",
        "Hello, I am VerdiX AI. Ask me about Eco Factory, CFO/CFP, Carbon Footprint, IoT/MQTT, or downloads."
      )
    }
  ]);
  const suggestions = [
    L("ต้องเตรียม Eco Factory อย่างไร", "How to prepare for Eco Factory"),
    L("CFO กับ CFP ต่างกันอย่างไร", "CFO vs CFP"),
    L("MQTT ใช้กับ Sensor ยังไง", "MQTT with sensors")
  ];

  const sendMessage = async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || busy) return;
    const nextMessages = [...messages, {role:"user", content:text}];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat.php", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ message: text, lang, history: nextMessages.slice(-8) })
      });
      if (!res.ok) throw new Error("chat endpoint unavailable");
      const data = await res.json();
      setMessages(prev => [...prev, {role:"assistant", content:data.reply || localAiAnswer(text, lang)}]);
    } catch {
      setMessages(prev => [...prev, {role:"assistant", content:localAiAnswer(text, lang)}]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ai-chat">
      {!open ? (
        <button className="ai-chat-toggle" onClick={() => setOpen(true)}>
          <span>AI</span><span>{L("ถาม VerdiX AI","Ask VerdiX AI")}</span>
        </button>
      ) : (
        <div className="ai-chat-panel">
          <div className="ai-chat-head">
            <div>
              <div className="ai-chat-title">VerdiX AI Assistant</div>
              <div className="ai-chat-sub">{L("ผู้ช่วยด้านสิ่งแวดล้อมโรงงาน","Factory environmental assistant")}</div>
            </div>
            <button className="ai-chat-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((m,i) => (
              <div className={`ai-msg ${m.role === "user" ? "user" : "bot"}`} key={i}>{m.content}</div>
            ))}
            {busy && <div className="ai-msg bot">{L("กำลังคิดคำตอบ...","Thinking...")}</div>}
          </div>
          <div className="ai-chat-suggestions">
            {suggestions.map(s => <button key={s} onClick={() => sendMessage(s)} disabled={busy}>{s}</button>)}
          </div>
          <form className="ai-chat-form" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
            <input className="ai-chat-input" value={input} onChange={e=>setInput(e.target.value)} placeholder={L("พิมพ์คำถาม...","Type a question...")} />
            <button className="ai-chat-send" disabled={busy || !input.trim()}>{L("ส่ง","Send")}</button>
          </form>
          <div className="ai-chat-note">{L("คำตอบจาก AI ใช้เพื่อช่วยเบื้องต้น ควรตรวจสอบกับผู้เชี่ยวชาญก่อนยื่นรับรอง","AI answers are for initial guidance. Verify with an expert before certification submission.")}</div>
        </div>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────
function Navbar({ t, lang, setLang, page, nav, user, logout, menus }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const activeMenus = normalizeMenus(menus).filter(m => m.active !== false);
  const topMenus = activeMenus.filter(m => !m.parent_id && m.page !== "home").sort((a,b) => (a.order || 0) - (b.order || 0));
  const childrenOf = (id) => activeMenus.filter(m => String(m.parent_id) === String(id)).sort((a,b) => (a.order || 0) - (b.order || 0));
  const labelOf = (m) => lang === "th" ? (m.label_th || m.label_en) : (m.label_en || m.label_th);
  const goTopMenu = (menuPage) => {
    nav(menuPage || "home");
  };
  const goSubMenu = (menu) => {
    setOpenMenuId(null);
    if (Number(menu.id) === 9) {
      window.location.href = "https://app.verdixgreen.com/#dashboard";
      return;
    }
    if (menu.external_url || /^https?:\/\//.test(menu.page || "")) {
      window.location.href = menu.external_url || menu.page;
      return;
    }

    nav(menu.page || "home", {
      ...(menu.eco_tab ? {ecoTab: menu.eco_tab} : {}),
      ...(menu.carbon_tab ? {carbonTab: menu.carbon_tab} : {})
    });
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => nav("home")}>
          <BrandLogo className="nav-brand" />
        </div>
        <div className="nav-links">
          <button className={`nav-btn always ${page==="home"?"active":""}`} onClick={() => nav("home")}>{t.home}</button>
          {topMenus.map(m => {
            const subs = childrenOf(m.id);
            const isActive = page === m.page || subs.some(s => s.page === page);
            return (
              <div className={`nav-item ${openMenuId === m.id ? "open" : ""}`} key={m.id}>
                <button className={`nav-btn always ${m.page==="amata-awards"?"nav-awards":""} ${isActive?"active":""}`} onClick={() => {
                  if (subs.length > 0) {
                    setOpenMenuId(id => id === m.id ? null : m.id);
                    return;
                  }
                  goTopMenu(m.page);
                }}>
                  {labelOf(m)} {subs.length > 0 && <span className="nav-caret">▾</span>}
                </button>
                {subs.length > 0 && (
                  <div className="sub-menu">
                    {subs.map(s => (
                      <button key={s.id} className={page===s.page?"active":""} onClick={() => goSubMenu(s)}>{labelOf(s)}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {user ? (
            <>
              {canAccessAdminPanel(user.role) && <button className={`nav-btn always ${page==="admin"?"active":""}`} onClick={() => nav("admin")}>{user.role === "tgi_report_viewer" ? (lang === "th" ? "รายงาน TGI" : "TGI Report") : t.dashboard}</button>}
              {!canAccessAdminPanel(user.role) && <button className={`nav-btn always ${page==="member"?"active":""}`} onClick={() => nav("member")}>{t.dashboard}</button>}
              <button className="nav-btn always" onClick={logout}>{t.logout}</button>
            </>
          ) : (
            <>
              <button className={`nav-btn always ${page==="login"?"active":""}`} onClick={() => nav("login")}>{t.login}</button>
              <button className="btn-accent" style={{marginLeft:6,padding:"7px 16px"}} onClick={() => nav("register")}>{t.register}</button>
            </>
          )}
          <button className="lang-btn" onClick={() => setLang(lang==="th"?"en":"th")}>{lang==="th"?"EN":"ไทย"}</button>
        </div>
      </div>
    </nav>
  );
}

// ─── Article Card ─────────────────────────────────────────────
function ArtCard({ a, lang, t, onClick }) {
  const hasImage = typeof a.image === "string" && a.image.startsWith("/");
  return (
    <article className="art-card" onClick={onClick}>
      <div className={`art-img ${hasImage ? "has-image" : ""}`}>
        {hasImage ? <img src={a.image} alt={lang==="th"?a.title_th:a.title_en} loading="lazy" /> : a.image}
      </div>
      <div className="art-body">
        <div className="art-meta">
          <span className="badge">{a.category}</span>
          <span className="art-date">{a.date}</span>
        </div>
        <h3 className="art-title">{lang==="th"?a.title_th:a.title_en}</h3>
        <p className="art-excerpt">{lang==="th"?a.excerpt_th:a.excerpt_en}</p>
        <div className="art-footer">
          <span className="art-author">✍ {a.author}</span>
          <span className="read-more">{t.read_more}</span>
        </div>
      </div>
    </article>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open?"open":""}`}>
      <button className="faq-q" onClick={()=>setOpen(o=>!o)}>
        <span>{q}</span>
        <span className="faq-chevron">▼</span>
      </button>
      <div className="faq-a"><div className="faq-a-inner">{a}</div></div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────
function BrandLogo({ className = "" }) {
  if (className.includes("nav-brand")) {
    return (
      <span className="nav-wordmark" aria-label="VerdiX">
        <span className="word-verdi">Verdi</span><span className="word-x">X</span>
        <span className="nav-mark-sub">The Sustainability Expert-on-Demand Platform</span>
      </span>
    );
  }
  if (className.includes("auth-brand")) {
    return (
      <span className="auth-wordmark" aria-label="VerdiX">
        <span className="auth-wordmark-main">
          <span className="word-verdi">Verdi</span><span className="word-x">X</span>
        </span>
        <span className="auth-wordmark-sub">The Sustainability Expert-on-Demand Platform</span>
      </span>
    );
  }
  if (className.includes("footer-brand")) {
    return (
      <span className="footer-wordmark" aria-label="VerdiX">
        <span className="word-verdi">Verdi</span><span className="word-x">X</span>
        <span className="footer-mark-sub">The Sustainability Expert-on-Demand Platform</span>
      </span>
    );
  }

  return (
    <span className={`brand-logo ${className}`} aria-label="VerdiX">
      <img src="/verdix-logo.png" alt="VerdiX" />
    </span>
  );
}

function BUUPHLogo() {
  return (
    <span className="footer-partner-logo" aria-label="Burapha University Faculty of Public Health">
      <svg viewBox="0 0 720 230" role="img">
        <title>Burapha University Faculty of Public Health</title>
        <text x="0" y="98" className="partner-buu" fontSize="90" fill="#FFCC00">BU</text>
        <text x="164" y="98" className="partner-buu" fontSize="90" fill="#8D8D8D">U</text>
        <line x1="262" y1="24" x2="262" y2="146" stroke="#8D8D8D" strokeWidth="4" strokeLinecap="round" />
        <text x="300" y="98" className="partner-buu" fontSize="90" fill="#EF6A79">PH</text>
        <rect x="0" y="116" width="128" height="14" fill="#FFCC00" />
        <text x="0" y="158" className="partner-caption" fontSize="22" fill="rgba(255,255,255,.72)">BURAPHA UNIVERSITY</text>
        <text x="300" y="158" className="partner-caption" fontSize="22" fill="rgba(255,255,255,.72)">Faculty of Public Health</text>
        <text x="300" y="206" className="partner-caption" fontSize="30" fill="#EF6A79">คณะสาธารณสุขศาสตร์</text>
        <text x="0" y="198" className="partner-caption" fontSize="18" fill="rgba(255,255,255,.48)">WISDOM OF THE EAST</text>
      </svg>
    </span>
  );
}

function FooterPartnerCard({ partner }) {
  const content = partner?.type === "buu-ph"
    ? <BUUPHLogo />
    : partner?.logo
      ? <img className={`footer-partner-img ${partner.logo.includes("partner-buu-planet-c") ? "partner-buu-planet-c" : ""}`} src={partner.logo} alt={partner.name || "Partner logo"} loading="lazy" />
      : <span className="footer-partner-name">{partner?.name || "Partner"}</span>;

  if (partner?.url) {
    return (
      <a className="footer-partner-card" href={partner.url} target="_blank" rel="noreferrer" aria-label={partner.name || "Partner"}>
        {content}
      </a>
    );
  }

  return (
    <div className="footer-partner-card" aria-label={partner?.name || "Partner"}>
      {content}
    </div>
  );
}

function FooterPartners({ lang, partners }) {
  const requiredPartners = INIT_FOOTER.partners || [];
  const basePartners = (partners && partners.length ? partners : INIT_FOOTER.partners).filter(Boolean);
  const list = [
    ...basePartners,
    ...requiredPartners.filter(required => !basePartners.some(partner =>
      (required.type && partner.type === required.type) ||
      (required.logo && partner.logo === required.logo) ||
      (required.name && partner.name === required.name)
    ))
  ];
  if (!list.length) return null;

  return (
    <div className="footer-partners">
      <div className="footer-partners-head">
        <div className="footer-partners-title">{lang === "th" ? "Partners" : "Partners"}</div>
        <div className="footer-partners-note">
          {lang === "th" ? "เครือข่ายความร่วมมือด้านความยั่งยืนและสิ่งแวดล้อม" : "Our sustainability and environmental collaboration network"}
        </div>
      </div>
      <div className="footer-partner-list">
        {list.map((partner, i) => <FooterPartnerCard key={`${partner.name || partner.logo || partner.type || "partner"}-${i}`} partner={partner} />)}
      </div>
    </div>
  );
}

function tSafe(value, fallback) {
  return value || fallback;
}

function langSafe(value, fallback) {
  return value || fallback;
}

function HeroSlideshow({ lang, nav, slides }) {
  const activeSlides = slides.filter(s => s.active !== false);
  const list = activeSlides.length ? activeSlides : INIT_SLIDES;
  const [idx, setIdx] = useState(0);
  const slide = list[idx] || list[0];

  useEffect(() => {
    if (idx >= list.length) setIdx(0);
  }, [idx, list.length]);

  useEffect(() => {
    if (list.length < 2) return undefined;
    const timer = window.setInterval(() => setIdx(i => (i + 1) % list.length), 5200);
    return () => window.clearInterval(timer);
  }, [list.length]);

  const L = (th, en) => lang === "th" ? th : en;
  const prev = () => setIdx(i => (i - 1 + list.length) % list.length);
  const next = () => setIdx(i => (i + 1) % list.length);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-frame">
          <div className="hero-bg" style={{backgroundImage:`url(${slide.image})`}} />
          <div className="hero-copy fade-in" key={slide.id}>
            <div className="hero-tag">🌿 {tSafe(L(slide.tag_th, slide.tag_en), "Sustainability Expert-on-Demand Platform")}</div>
            {L(slide.title_th, slide.title_en).toLowerCase() === "buuxc"
              ? <BrandLogo className="hero-brand" />
              : <h1 className="hero-title">{L(slide.title_th, slide.title_en)}</h1>}
            <div className="hero-kicker">&quot;{L(slide.kicker_th, slide.kicker_en)}&quot;</div>
            <p className="hero-sub">{L(slide.subtitle_th, slide.subtitle_en)}</p>
            <div className="hero-ctas">
              <button className="btn btn-dark" style={{fontSize:14,padding:"10px 22px"}} onClick={() => nav(slide.primary_page || "register")}>{L(slide.primary_th, slide.primary_en)}</button>
              <button className="btn-ghost" style={{fontSize:14,padding:"9px 20px"}} onClick={() => nav(slide.secondary_page || "experts")}>{L(slide.secondary_th, slide.secondary_en)}</button>
            </div>
            <div className="hero-stats">
              {[["70,000+",lang==="th"?"โรงงานในไทย":"Thai Factories"],["10,000+",lang==="th"?"องค์กรส่งออก":"Export Organizations"],["16,000M+",lang==="th"?"TAM (บาท/ปี)":"TAM (THB/yr)"],["50%+",lang==="th"?"ลดเวลารายงาน":"Reporting Time Saved"]].map(([n,l]) => (
                <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-slide-card" aria-label="Hero slides">
              <button className="slide-nav" onClick={prev} aria-label="Previous slide">‹</button>
              {list.map((s, i) => <button key={s.id} className={`slide-dot ${i===idx?"active":""}`} onClick={() => setIdx(i)} aria-label={`Go to slide ${i+1}`} />)}
              <button className="slide-nav" onClick={next} aria-label="Next slide">›</button>
            </div>
          </div>
        </div>
    </section>
  );
}

function HomePage({ t, lang, nav, articles, slides }) {
  const [previewImage, setPreviewImage] = useState(null);
  return (
    <>
      <HeroSlideshow lang={lang} nav={nav} slides={slides} />

      <section className="section">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:52}}>
            <span className="section-tag">● OUR SOLUTION</span>
            <h2 className="section-title">{t.feat_title}</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>{t.feat_sub}</p>
          </div>
          <div className="solution-grid">
            {[
              {icon:"🏭",t:t.f1t,d:t.f1d,image:"/sustainability-assessment-engine.png"},
              {icon:"🌡️",t:t.f2t,d:t.f2d,image:"/expert-on-demand-marketplace.png"},
              {icon:"📡",t:t.f3t,d:t.f3d,image:"/iot-mqtt-environmental-monitoring.svg"},
              {icon:"📈",t:t.f4t,d:t.f4d,image:"/automated-reporting-system.png"}
            ].map(f => (
              <div className="feat-card" key={f.t}>
                {f.image && (
                  <button className="feat-image-btn" type="button" onClick={() => setPreviewImage(f.image)} aria-label={`${f.t} - view larger image`}>
                    <img className="feat-image" src={f.image} alt={f.t} loading="lazy" />
                  </button>
                )}
                {!f.image && <div className="feat-icon">{f.icon}</div>}
                <h3 className="feat-title">{f.t}</h3>
                <p className="feat-desc">{f.d}</p>
              </div>
            ))}
          </div>
          {previewImage && (
            <div className="image-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setPreviewImage(null)}>
              <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                <button className="image-modal-close" type="button" onClick={() => setPreviewImage(null)} aria-label={lang === "th" ? "ปิดภาพ" : "Close image"}>{lang === "th" ? "ปิด" : "Close"}</button>
                <img src={previewImage} alt={previewImage.includes("automated-reporting") ? t.f4t : previewImage.includes("sustainability") ? t.f1t : previewImage.includes("iot-mqtt") ? t.f3t : t.f2t} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <div className="platform-flow">
            <div className="platform-flow-head">
              <div>
                <span className="section-tag">● IOT + CARBON DATA FLOW</span>
                <h3>{t.flow_title}</h3>
                <p>{t.flow_sub}</p>
              </div>
              <div className="platform-flow-badges" aria-label="Supported protocols and standards">
                <span>MQTT</span>
                <span>Modbus TCP</span>
                <span>OPC-UA</span>
                <span>TGO</span>
                <span>ISO 14064/14067</span>
              </div>
            </div>
            <div className="platform-flow-steps">
              {[
                {icon:"🏭",title:"Factory Source",desc:lang==="th"?"PLC, Meter, Sensor, Waste Scale, Excel":"PLC, meters, sensors, waste scales, Excel"},
                {icon:"📡",title:"MQTT / Gateway",desc:lang==="th"?"ส่งข้อมูลหน้างานแบบ Real-time เข้าระบบกลาง":"Stream real-time field data into the platform"},
                {icon:"🗄️",title:"Data Lake",desc:lang==="th"?"จัดเก็บ Activity Data พร้อมหลักฐานและ Audit Trail":"Store activity data, evidence, and audit trails"},
                {icon:"📊",title:"Dashboard",desc:lang==="th"?"ดูพลังงาน น้ำ อากาศ ของเสีย และ GHG Hotspot":"Track energy, water, air, waste, and GHG hotspots"},
                {icon:"✅",title:"Report",desc:lang==="th"?"สร้างรายงาน CFO, CFP, Eco Factory และ ESG":"Generate CFO, CFP, Eco Factory, and ESG reports"}
              ].map(step => (
                <div className="platform-step" key={step.title}>
                  <div className="platform-step-icon">{step.icon}</div>
                  <div className="platform-step-title">{step.title}</div>
                  <div className="platform-step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
            <div className="platform-flow-cta">
              <p>{t.flow_cta}</p>
              <button className="btn-accent" onClick={() => nav("env")}>{t.flow_button}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:"#F0FDF4"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <span className="section-tag">● KNOWLEDGE</span>
            <h2 className="section-title">{t.blog_title}</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>{t.blog_sub}</p>
          </div>
          <div className="grid-3">
            {articles.slice(0,3).map(a => <ArtCard key={a.id} a={a} lang={lang} t={t} onClick={() => nav("blog-detail",a)} />)}
          </div>
          <div style={{textAlign:"center",marginTop:36}}>
            <button className="btn btn-dark" onClick={() => nav("blog")}>{t.view_all}</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
            <div>
              <span className="section-tag">● BENEFITS</span>
              <h2 className="section-title">{lang==="th"?"ประโยชน์สำหรับองค์กรของคุณ":"What Your Organization Gains"}</h2>
              <p style={{color:"var(--muted)",fontSize:16,marginBottom:28,lineHeight:1.7}}>
                {lang==="th"?"VERDIX ออกแบบมาเพื่อแก้ปัญหาจริงของภาคอุตสาหกรรม — ขาดความรู้ ที่ปรึกษามีจำกัด และขาดเครื่องมือดิจิทัล":"VERDIX solves real industry pain points — knowledge gaps, limited consultants, and lack of digital tools."}
              </p>
              {[
                lang==="th"?"⭐ ประเมินความพร้อม Eco-Factory ได้ภายใน 1–2 วัน":"⭐ Eco-Factory readiness assessment in 1–2 days",
                lang==="th"?"⭐ ลดเวลาการเก็บข้อมูลมากกว่า 50%":"⭐ Reduce data collection time by over 50%",
                lang==="th"?"⭐ เห็นภาพรวมทุกหมวดใน Dashboard เดียว":"⭐ All dimensions in a single dashboard",
                lang==="th"?"⭐ เตรียมพร้อมรับการตรวจจากภาครัฐได้ครบถ้วน":"⭐ Fully prepared for government inspections",
                lang==="th"?"⭐ ยกระดับสู่ Green Industry, BCG และ Net Zero Roadmap":"⭐ Upgrade to Green Industry, BCG & Net Zero Roadmap",
                lang==="th"?"⭐ ลดต้นทุน เพิ่มประสิทธิภาพ ขยายตลาดส่งออก":"⭐ Cut costs, boost efficiency, expand export markets",
              ].map((b,i) => (
                <div key={i} style={{padding:"10px 0",borderBottom:"1px solid var(--border)",fontSize:15,color:"var(--text)"}}>{b}</div>
              ))}
            </div>
            <div style={{background:"linear-gradient(135deg,var(--g1),var(--g3))",borderRadius:"var(--r-lg)",padding:40,color:"#fff"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,marginBottom:8}}>
                {lang==="th"?"โอกาสทางตลาด":"Market Opportunity"}
              </div>
              <div style={{color:"rgba(255,255,255,.65)",fontSize:14,marginBottom:28}}>Thailand &amp; ASEAN</div>
              {[
                ["TAM","&gt;16,000M ฿","มูลค่าตลาดรวม / Total Market","/ year"],
                ["SAM","4,800M ฿","ตลาดที่เข้าถึงได้ใน 3 ปี / Addressable","3-year target"],
                ["SOM","80M ฿","รายได้จาก 1,000 กิจการ / 1,000 biz","Year 1 target"],
              ].map(([tag,num,desc]) => (
                <div key={tag} style={{background:"rgba(255,255,255,.08)",borderRadius:10,padding:"16px 20px",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:"var(--ga)",marginBottom:4}}>{tag}</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>{desc}</div>
                    </div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:"var(--ga)"}} dangerouslySetInnerHTML={{__html:num}} />
                  </div>
                </div>
              ))}
              <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(255,255,255,.15)",fontSize:13,color:"rgba(255,255,255,.6)"}}>
                🔹 Eco-Factory &amp; GI: โรงงาน 70,000 แห่ง<br/>
                🔹 CFO/CFP: ผู้ส่งออก &gt;10,000 ราย<br/>
                🔹 ESG: บจ. ในตลาดหลักทรัพย์ทุกราย
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section" style={{background:"var(--gll)"}}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">● TESTIMONIALS</span>
            <h2 className="section-title">{lang==="th"?"เสียงจากผู้ใช้งานจริง":"What Our Users Say"}</h2>
            <p className="section-sub">{lang==="th"?"องค์กรและโรงงานที่ใช้ VERDIX บอกอะไรบ้าง":"What organizations and factories using VERDIX have to say."}</p>
          </div>
          <div className="grid-3">
            {[
              {avatar:"👨‍💼",name:"ผู้จัดการฝ่าย EHS",org_th:"ผู้จัดการฝ่าย EHS — โรงงานยานยนต์ ระยอง",org_en:"EHS Manager — Automotive Factory, Rayong",text_th:"VERDIX ช่วยให้เราเตรียมเอกสาร Eco-Factory ได้ภายใน 2 สัปดาห์ แทนที่จะใช้ 3 เดือนเหมือนก่อน ระบบประเมินออนไลน์ละเอียดมาก",text_en:"VERDIX helped us prepare Eco-Factory documents in 2 weeks instead of the usual 3 months. The online assessment system is incredibly detailed.",stars:5},
              {avatar:"👩‍🔬",name:"ทีมสิ่งแวดล้อม",org_th:"นักวิชาการสิ่งแวดล้อม — อุตสาหกรรมอาหาร",org_en:"Environmental Scientist — Food Industry",text_th:"ระบบคำนวณ CFO ของ VERDIX แม่นยำมาก ช่วยระบุ Hotspot ได้ชัดเจน ทำให้เราวางแผนลด GHG ได้ตรงจุด ประหยัดต้นทุนได้จริง",text_en:"VERDIX's CFO calculator is very accurate. It clearly identifies hotspots, enabling targeted GHG reduction planning with real cost savings.",stars:5},
              {avatar:"👨‍🏭",name:"ผู้บริหารโรงงาน",org_th:"ผู้อำนวยการโรงงาน — อุตสาหกรรมปิโตรเคมี",org_en:"Factory Director — Petrochemical Industry",text_th:"Expert-on-Demand ของ VERDIX ดีมาก ได้ผู้เชี่ยวชาญที่ตรงสาขามาช่วยภายใน 24 ชั่วโมง ราคาโปร่งใส ไม่มีค่าใช้จ่ายซ่อน",text_en:"VERDIX's Expert-on-Demand is excellent. Got a matching specialist within 24 hours. Transparent pricing with no hidden costs.",stars:5},
              {avatar:"👩‍💼",name:"ผู้จัดการฝ่าย CSR",org_th:"CSR Manager — กลุ่มธุรกิจโรงแรม",org_en:"CSR Manager — Hotel Group",text_th:"ใช้ VERDIX ทำรายงาน ESG ส่งผู้ถือหุ้น ระบบ Automated Reporting ช่วยลดเวลาจาก 2 เดือนเหลือแค่ 3 วัน แม่นยำและมีมาตรฐาน",text_en:"Used VERDIX for ESG reporting to shareholders. Automated Reporting reduced time from 2 months to just 3 days — accurate and standardized.",stars:5},
              {avatar:"👨‍💻",name:"ผู้อำนวยการฝ่ายปฏิบัติการ",org_th:"Operations Director — SME อิเล็กทรอนิกส์",org_en:"Operations Director — Electronics SME",text_th:"สมัคร Green Industry ผ่าน VERDIX สะดวกมาก มีผู้เชี่ยวชาญดูแลตลอด ได้ระดับ GI 2 ภายใน 4 เดือน ลูกค้าต่างประเทศประทับใจมาก",text_en:"Applying for Green Industry through VERDIX was seamless. Expert guidance throughout. Achieved GI Level 2 in 4 months. International clients are very impressed.",stars:5},
              {avatar:"👩‍🏫",name:"อาจารย์ด้านสิ่งแวดล้อม",org_th:"อาจารย์วิศวกรรมสิ่งแวดล้อม — มหาวิทยาลัยเทคโนโลยี",org_en:"Environmental Engineering Lecturer — Technology University",text_th:"แนะนำ VERDIX ให้นักศึกษาใช้ฝึกประเมิน Carbon Footprint เครื่องมือใช้ง่าย เนื้อหาตรงมาตรฐาน TGO/ISO ครบถ้วน",text_en:"Recommend VERDIX for students to practice Carbon Footprint assessment. Easy to use, content fully aligned with TGO/ISO standards.",stars:5},
            ].map((t,i)=>(
              <div key={i} className="testi-card">
                <div className="testi-quote">&quot;</div>
                <div className="testi-stars">{[1,2,3,4,5].map(s=><span key={s} style={{color:"#FBBF24",fontSize:14}}>★</span>)}</div>
                <p className="testi-text">{lang==="th"?t.text_th:t.text_en}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-org">{lang==="th"?t.org_th:t.org_en}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:64,alignItems:"flex-start"}}>
            <div>
              <span className="section-tag">● FAQ</span>
              <h2 className="section-title">{lang==="th"?"คำถามที่พบบ่อย":"Frequently Asked Questions"}</h2>
              <p style={{color:"var(--muted)",fontSize:15,lineHeight:1.8,marginBottom:28}}>{lang==="th"?"ข้อสงสัยที่ผู้ใช้งานถามมากที่สุดเกี่ยวกับ VERDIX และบริการ":"The most common questions users ask about VERDIX and our services."}</p>
              <button className="btn btn-dark" onClick={()=>nav("experts")}>{lang==="th"?"ติดต่อทีมงาน →":"Contact Our Team →"}</button>
            </div>
            <div>
              {[
                {q_th:"VERDIX แตกต่างจากที่ปรึกษาทั่วไปอย่างไร?",q_en:"How is VERDIX different from regular consultants?",a_th:"VERDIX รวม ผู้เชี่ยวชาญจริง + ระบบประเมินดิจิทัล + AI ไว้ในที่เดียว ไม่ใช่แค่ที่ปรึกษา แต่เป็น Platform ที่ทำให้กระบวนการทั้งหมดโปร่งใส วัดผลได้ และประหยัดเวลากว่า 50%",a_en:"VERDIX combines real experts + digital assessment + AI in one place. Not just a consultancy — a platform that makes the entire process transparent, measurable, and over 50% faster."},
                {q_th:"ค่าใช้จ่ายในการใช้บริการ VERDIX เป็นอย่างไร?",q_en:"What are VERDIX service costs?",a_th:"มีแพ็กเกจตั้งแต่ฟรี (ทดลองประเมิน) ถึงแบบรายปี สำหรับผู้เชี่ยวชาญจะมีราคา/manday ที่โปร่งใสตั้งแต่ 8,000–25,000 บาท ขึ้นกับความเชี่ยวชาญและประสบการณ์",a_en:"Plans range from free (trial assessment) to annual subscriptions. Expert rates are transparent at 8,000–25,000 THB/manday depending on expertise and experience."},
                {q_th:"ต้องใช้ระยะเวลาเท่าไรในการขอรับรอง Eco-Factory?",q_en:"How long does Eco-Factory certification take?",a_th:"โดยปกติ 3–6 เดือน ขึ้นกับความพร้อมของโรงงาน VERDIX ช่วยให้เตรียมความพร้อมได้เร็วขึ้น โดยเฉลี่ยลดเวลาเหลือ 2–4 เดือน ผ่านระบบ Digital Checklist และ Expert Matching",a_en:"Typically 3–6 months depending on factory readiness. VERDIX helps reduce this to 2–4 months on average through Digital Checklists and Expert Matching."},
                {q_th:"ระบบ IoT Sensor เชื่อมต่อกับโรงงานได้อย่างไร?",q_en:"How does IoT sensor connectivity work with factories?",a_th:"รองรับโปรโตคอล MQTT, REST API, Modbus TCP และ OPC-UA สามารถเชื่อมต่อกับ PLC และ Sensor ที่มีอยู่แล้วในโรงงาน ทีมวิศวกร VERDIX จะช่วยออกแบบและติดตั้งระบบ",a_en:"Supports MQTT, REST API, Modbus TCP, and OPC-UA protocols. Connects to existing PLCs and sensors in your factory. VERDIX engineers assist with system design and installation."},
                {q_th:"CFO และ CFP ต่างกันอย่างไร ต้องทำทั้งคู่ไหม?",q_en:"What's the difference between CFO and CFP? Do I need both?",a_th:"CFO วัดการปล่อย GHG ทั้งองค์กร (Scope 1,2,3) ส่วน CFP วัดตลอดวัฏจักรชีวิตของผลิตภัณฑ์แต่ละชนิด ขึ้นกับเป้าหมาย: CFO สำหรับรายงานองค์กร/ESG, CFP สำหรับ Carbon Label บนสินค้า",a_en:"CFO measures org-wide GHG (Scope 1,2,3); CFP measures per-product lifecycle. Choose based on goals: CFO for corporate/ESG reporting, CFP for Carbon Label on products."},
                {q_th:"VERDIX รองรับมาตรฐานอะไรบ้าง?",q_en:"Which standards does VERDIX support?",a_th:"TGO CFO/CFP, ISO 14064, ISO 14067, GRI, ISSB, Eco-Factory (ส.อ.ท.), Green Industry (กอ.), ISO 14001, ISO 50001, TCFD, SASB และกำลังพัฒนาเพิ่มเติม",a_en:"TGO CFO/CFP, ISO 14064, ISO 14067, GRI, ISSB, Eco-Factory (FTI), Green Industry (DIW), ISO 14001, ISO 50001, TCFD, SASB — with more in development."},
              ].map((item,i)=><FaqItem key={i} q={lang==="th"?item.q_th:item.q_en} a={lang==="th"?item.a_th:item.a_en} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Blog Page ────────────────────────────────────────────────
function AboutPage({ lang, nav }) {
  const L = (th, en) => lang === "th" ? th : en;
  const challengeItems = [
    L("ขาดความรู้และความเข้าใจด้าน ESG, Carbon Footprint และ Net Zero", "Limited internal ESG, Carbon Footprint, and Net Zero knowledge"),
    L("ไม่มั่นใจในการดำเนินงานด้วยตนเองและการเข้าถึงผู้เชี่ยวชาญมีต้นทุนสูง", "Uncertainty in execution and high expert-access costs"),
    L("ขาดเครื่องมือดิจิทัลในการเก็บข้อมูล วิเคราะห์ผล และจัดทำรายงาน", "Lack of digital tools for data collection, analysis, and reporting"),
  ];
  const featureBlocks = [
    {
      title: "Eco-Expert Pool",
      image: "/about-verdix-expert-pool.webp",
      desc: L(
        "เครือข่ายผู้เชี่ยวชาญด้านความยั่งยืนจากภาคอุตสาหกรรม นักวิชาการ มหาวิทยาลัย และบริษัทที่ปรึกษา ครอบคลุม Carbon Footprint, LCA, Energy Efficiency, Waste Management, Eco-Factory, Green Industry, ESG Reporting, ISO 14000 Series และ Net Zero Roadmap",
        "A sustainability expert network from industry, academia, universities, and consulting firms covering Carbon Footprint, LCA, Energy Efficiency, Waste Management, Eco-Factory, Green Industry, ESG Reporting, ISO 14000 Series, and Net Zero Roadmap."
      )
    },
    {
      title: "Sustainability Assessment Engine",
      image: "/about-verdix-assessment-dashboard.webp",
      desc: L(
        "ระบบประเมินออนไลน์ที่ช่วยให้องค์กรเห็นสถานะปัจจุบันได้รวดเร็ว รองรับ Eco-Factory, Green Industry, ESG, CFO, CFP, Energy Efficiency, Waste Management และ Net Zero Roadmap พร้อม Digital Checklist, Gap Analysis และ Action Plan Recommendation",
        "An online assessment engine that quickly shows current readiness across Eco-Factory, Green Industry, ESG, CFO, CFP, Energy Efficiency, Waste Management, and Net Zero Roadmap with Digital Checklist, Gap Analysis, and Action Plan Recommendation."
      )
    },
    {
      title: "Automated Sustainability Reporting",
      image: "/about-verdix-sustainability-platform.webp",
      desc: L(
        "ระบบจัดทำรายงานอัตโนมัติที่เชื่อมโยงข้อมูลพลังงาน น้ำ ของเสีย และคาร์บอน เพื่อแปลงเป็นรายงาน CFO, CFP, ESG, Sustainability Report, Eco-Factory Report, Green Industry Report, Energy Performance Report และ Waste Efficiency Report",
        "Automated reporting that connects energy, water, waste, and carbon data into CFO, CFP, ESG, Sustainability Report, Eco-Factory Report, Green Industry Report, Energy Performance Report, and Waste Efficiency Report outputs."
      )
    }
  ];
  const benefitGroups = [
    {
      title: L("เพิ่มประสิทธิภาพการดำเนินงาน", "Operational Efficiency"),
      items: [
        L("ลดเวลาเก็บรวบรวมข้อมูลมากกว่า 50%", "Reduce data collection time by more than 50%"),
        L("ประเมินความพร้อม Eco-Factory ได้ภายใน 1-2 วัน", "Assess Eco-Factory readiness within 1-2 days"),
        L("ลดภาระงานเอกสารและการจัดทำรายงาน", "Reduce paperwork and reporting workload"),
      ]
    },
    {
      title: L("ยกระดับมาตรฐานองค์กร", "Standards Readiness"),
      items: [
        L("เตรียมพร้อมสำหรับการตรวจประเมินจากภาครัฐ", "Prepare for official assessments"),
        L("สนับสนุนการขอรับรอง Green Industry", "Support Green Industry certification"),
        L("สร้าง Net Zero Roadmap ที่ชัดเจน", "Build a clear Net Zero Roadmap"),
      ]
    },
    {
      title: L("เพิ่มขีดความสามารถทางการแข่งขัน", "Competitive Advantage"),
      items: [
        L("ลดต้นทุนด้านพลังงานและทรัพยากร", "Reduce energy and resource costs"),
        L("เพิ่มโอกาสทางการตลาดและการส่งออก", "Increase market and export opportunities"),
        L("ตอบสนองความต้องการด้าน ESG ของลูกค้าและนักลงทุน", "Meet ESG expectations from customers and investors"),
      ]
    }
  ];
  const marketDrivers = [
    "Net Zero",
    "Climate Change Act",
    L("ภาษีคาร์บอน", "Carbon Tax"),
    "Eco-Factory",
    "Green Industry",
    "ESG Report",
    "CFO / CFP"
  ];

  return (
    <>
      <section className="page-hdr">
        <div className="container">
          <span className="section-tag">● VERDIX GREEN</span>
          <h1>{L("verdiX: แพลตฟอร์มผู้เชี่ยวชาญด้านความยั่งยืนครบวงจร", "verdiX: Integrated Sustainability Expert Platform")}</h1>
          <p>
            {L(
              "เพื่อขับเคลื่อนองค์กรสู่ Net Zero และ ESG อย่างเป็นระบบ ด้วยผู้เชี่ยวชาญ เทคโนโลยี AI ระบบประเมิน และรายงานด้านสิ่งแวดล้อมในที่เดียว",
              "Helping organizations move toward Net Zero and ESG systematically through experts, AI technology, assessment systems, and environmental reporting in one place."
            )}
          </p>
          <div className="about-hero-article">
            <h2>
              {L(
                "เมื่อความยั่งยืนไม่ใช่ทางเลือก แต่เป็นข้อกำหนดใหม่ของธุรกิจ",
                "When Sustainability Is No Longer Optional, but a New Business Requirement"
              )}
            </h2>
            <p>
              {L(
                "ปัจจุบัน ความยั่งยืน (Sustainability) ได้กลายเป็นหนึ่งในปัจจัยสำคัญที่ส่งผลต่อความสามารถในการแข่งขันขององค์กรทั่วโลก ไม่ว่าจะเป็นข้อกำหนดด้าน ESG (Environmental, Social and Governance) เป้าหมาย Net Zero Carbon Emission ภายในปี 2050 ของประเทศไทย หรือกฎหมายและมาตรฐานด้านสิ่งแวดล้อมที่กำลังเข้มงวดขึ้นอย่างต่อเนื่อง",
                "Sustainability has become a core factor in global competitiveness. Organizations now face ESG requirements, Thailand's Net Zero Carbon Emission target by 2050, and increasingly strict environmental laws and standards."
              )}
            </p>
            <p>
              {L(
                "องค์กรจำนวนมากต้องเผชิญกับความท้าทายในการจัดทำบัญชีก๊าซเรือนกระจก การประเมิน Eco-Factory การจัดทำรายงานความยั่งยืน การเพิ่มประสิทธิภาพการใช้พลังงาน และการบริหารจัดการทรัพยากรอย่างมีประสิทธิภาพ ขณะที่การเข้าถึงผู้เชี่ยวชาญเฉพาะทางยังมีข้อจำกัดทั้งด้านเวลา งบประมาณ และความพร้อมของบุคลากรภายในองค์กร",
                "Many organizations must manage greenhouse gas accounting, Eco-Factory assessment, sustainability reporting, energy efficiency improvement, and resource management while access to specialized experts remains limited by time, budget, and internal capability."
              )}
            </p>
            <p>
              {L(
                "ด้วยเหตุนี้ จึงเกิดแนวคิดของ verdiX แพลตฟอร์มดิจิทัลที่รวมผู้เชี่ยวชาญด้านความยั่งยืน เทคโนโลยี AI และระบบประเมินมาตรฐานด้านสิ่งแวดล้อมไว้ในที่เดียว เพื่อช่วยให้องค์กรสามารถเริ่มต้น พัฒนา และตรวจสอบการดำเนินงานด้านความยั่งยืนได้อย่างเป็นระบบ",
                "This is why verdiX was created: a digital platform that brings sustainability experts, AI technology, and environmental assessment systems together in one place so organizations can start, improve, and verify sustainability work systematically."
              )}
            </p>
            <h3>{L("verdiX คืออะไร?", "What is verdiX?")}</h3>
            <p>
              {L(
                "verdiX คือ Sustainability Expert-on-Demand Platform หรือแพลตฟอร์มผู้เชี่ยวชาญด้านความยั่งยืนแบบครบวงจร ที่เชื่อมโยงองค์ความรู้จากผู้เชี่ยวชาญจริงเข้ากับระบบดิจิทัลอัจฉริยะ",
                "verdiX is a Sustainability Expert-on-Demand Platform that connects real expert knowledge with intelligent digital systems."
              )}
            </p>
            <p>
              {L(
                "แพลตฟอร์มถูกออกแบบมาเพื่อเป็นศูนย์กลางสำหรับองค์กร ภาคอุตสาหกรรม โรงงาน และธุรกิจที่ต้องการยกระดับมาตรฐานด้านสิ่งแวดล้อม ลดการปล่อยก๊าซเรือนกระจก และเตรียมความพร้อมสู่การดำเนินงานตามแนวทาง ESG และ Net Zero",
                "The platform is designed as a central hub for organizations, industrial sectors, factories, and businesses that want to raise environmental standards, reduce greenhouse gas emissions, and prepare for ESG and Net Zero operations."
              )}
            </p>
            <p>{L("verdiX ผสานการทำงานระหว่าง", "verdiX brings together")}</p>
            <ul>
              <li>{L("ผู้เชี่ยวชาญด้านความยั่งยืน (Experts)", "Sustainability experts")}</li>
              <li>{L("ระบบประเมินมาตรฐานสิ่งแวดล้อม (Assessment Engine)", "Environmental standards assessment engine")}</li>
              <li>{L("AI และ Digital Workflow", "AI and digital workflow")}</li>
              <li>{L("ระบบจัดทำรายงานอัตโนมัติ (Automated Reporting)", "Automated reporting system")}</li>
            </ul>
            <p>
              {L(
                "เพื่อช่วยให้องค์กรสามารถดำเนินงานได้อย่างถูกต้อง แม่นยำ และตรวจสอบได้",
                "so organizations can work accurately, systematically, and with clear auditability."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-split">
            <div className="card" style={{padding:34}}>
              <span className="section-tag">● WHY VERDIX</span>
              <h2 className="section-title" style={{fontSize:34,marginTop:10}}>
                {L("Verdify Your Journey Toward a Sustainable Future", "Verdify Your Journey Toward a Sustainable Future")}
              </h2>
              <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.85,marginBottom:18}}>
                {L(
                  "หรือการเปลี่ยนผ่านสู่อนาคตที่ยั่งยืนด้วยข้อมูล เทคโนโลยี และองค์ความรู้จากผู้เชี่ยวชาญตัวจริง",
                  "A journey toward a sustainable future powered by data, technology, and practical knowledge from real experts."
                )}
              </p>
              <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.85}}>
                {L(
                  "เพราะความยั่งยืนไม่ควรเป็นเพียงรายงานที่ต้องจัดทำ แต่ควรเป็นเครื่องมือสำคัญในการสร้างความสามารถในการแข่งขันและการเติบโตอย่างมั่นคงขององค์กรในระยะยาว",
                  "Sustainability should not be just another report. It should become a strategic tool for building competitiveness and stable long-term organizational growth."
                )}
              </p>
            </div>

            <div className="card" style={{padding:28,background:"linear-gradient(135deg,#10281e,#1B4332)",color:"#fff"}}>
              <img className="about-card-image" src="/about-verdix-sustainability-platform.webp" alt="verdiX sustainability platform" loading="lazy" />
              <span style={{display:"inline-flex",fontSize:12,fontWeight:900,color:"var(--ga)",letterSpacing:1.4,textTransform:"uppercase",marginBottom:14}}>VERDIFY YOUR JOURNEY</span>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:32,lineHeight:1.18,marginBottom:14}}>
                {L("เปลี่ยนผ่านสู่อนาคตที่ยั่งยืนด้วยข้อมูล เทคโนโลยี และผู้เชี่ยวชาญตัวจริง", "Move toward a sustainable future with data, technology, and real experts")}
              </h3>
              <p style={{color:"rgba(255,255,255,.74)",fontSize:15,lineHeight:1.8,marginBottom:22}}>
                {L(
                  "เพราะความยั่งยืนไม่ควรเป็นเพียงรายงานที่ต้องจัดทำ แต่ควรเป็นเครื่องมือสำคัญในการสร้างความสามารถในการแข่งขันและการเติบโตระยะยาว",
                  "Sustainability should not be just another report. It should become a tool for competitiveness and long-term growth."
                )}
              </p>
              <button className="btn-accent" style={{padding:"11px 22px",fontSize:14}} onClick={() => nav("experts")}>
                {L("ปรึกษาผู้เชี่ยวชาญ", "Consult Experts")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:"#F7FBF8"}}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">● WHAT WE SOLVE</span>
              <h2 className="section-title">{L("ความท้าทายที่องค์กรกำลังเผชิญ", "Challenges Organizations Face")}</h2>
            </div>
            <p className="section-sub">
              {L(
                "หลายองค์กรตระหนักถึงความสำคัญของความยั่งยืนแล้ว แต่การลงมือปฏิบัติจริงยังซับซ้อน โดยเฉพาะในภาคอุตสาหกรรม",
                "Many organizations understand sustainability, but implementation remains complex, especially in industrial operations."
              )}
            </p>
          </div>
          <div className="grid-3">
            {challengeItems.map((item, idx) => (
              <div className="card" key={item} style={{padding:24}}>
                <div style={{width:38,height:38,borderRadius:10,background:"#ECFDF5",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--g2)",fontWeight:900,marginBottom:14}}>
                  {idx + 1}
                </div>
                <p style={{color:"var(--text)",fontSize:15,lineHeight:1.75,fontWeight:700}}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">● PLATFORM HIGHLIGHTS</span>
              <h2 className="section-title">{L("จุดเด่นของ verdiX", "verdiX Highlights")}</h2>
            </div>
          </div>
          <div style={{display:"grid",gap:18}}>
            {featureBlocks.map((block, idx) => (
              <div className="card about-feature-row" key={block.title} style={{padding:26}}>
                <div>
                  <span className="badge">0{idx + 1}</span>
                  <h3 style={{fontFamily:"'DM Sans',sans-serif",fontSize:20,color:"var(--g1)",marginTop:12}}>{block.title}</h3>
                </div>
                <img className="about-feature-image" src={block.image} alt={block.title} loading="lazy" />
                <p style={{color:"var(--muted)",fontSize:15,lineHeight:1.85}}>{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"#F7FBF8"}}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">● BENEFITS</span>
              <h2 className="section-title">{L("ประโยชน์ที่องค์กรจะได้รับ", "Benefits for Organizations")}</h2>
            </div>
          </div>
          <img className="about-wide-image" src="/about-verdix-workshop.webp" alt="verdiX sustainability workshop" loading="lazy" />
          <div className="grid-3">
            {benefitGroups.map(group => (
              <div className="card" key={group.title} style={{padding:26}}>
                <h3 style={{fontFamily:"'DM Sans',sans-serif",fontSize:19,color:"var(--g1)",marginBottom:14}}>{group.title}</h3>
                <ul style={{display:"grid",gap:10,paddingLeft:18,color:"var(--muted)",fontSize:14,lineHeight:1.7}}>
                  {group.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{padding:32}}>
            <div className="about-market">
              <div>
                <span className="section-tag">● MARKET OPPORTUNITY</span>
                <h2 className="section-title" style={{fontSize:32,marginTop:10}}>
                  {L("โอกาสทางตลาดที่กำลังเติบโต", "A Growing Sustainability Market")}
                </h2>
                <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.85}}>
                  {L(
                    "ประเทศไทยมีโรงงานอุตสาหกรรมมากกว่า 70,000 แห่ง และองค์กรขนาดกลางถึงขนาดใหญ่ที่เกี่ยวข้องกับการจัดการคาร์บอนอีกนับหมื่นแห่ง ซึ่งเป็นโอกาสสำคัญของแพลตฟอร์มดิจิทัลด้านความยั่งยืน",
                    "Thailand has more than 70,000 industrial factories and tens of thousands of medium-to-large organizations involved in carbon management, creating strong demand for sustainability digital platforms."
                  )}
                </p>
              </div>
              <div>
                <img className="about-market-image" src="/about-verdix-market-size.webp" alt="Thailand and ASEAN sustainability market size" loading="lazy" />
                <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                  {marketDrivers.map(item => <span className="badge" key={item}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  const pillars = [
    {
      title: L("แพลตฟอร์มสิ่งแวดล้อมสำหรับโรงงาน", "Environmental Platform for Factories"),
      desc: L("รวม Eco Factory, CFO, CFP, ESG, IoT Monitoring และรายงานมาตรฐานไว้ในที่เดียว", "Combines Eco Factory, CFO, CFP, ESG, IoT monitoring, and standards-ready reporting in one place."),
    },
    {
      title: L("ผู้เชี่ยวชาญตัวจริง", "Verified Expert Network"),
      desc: L("เชื่อมองค์กรกับผู้เชี่ยวชาญด้านสิ่งแวดล้อม คาร์บอน และความยั่งยืนตามโจทย์งานจริง", "Connects organizations with environmental, carbon, and sustainability specialists matched to real operational needs."),
    },
    {
      title: L("ข้อมูลที่นำไปใช้ได้", "Actionable Data"),
      desc: L("เปลี่ยนข้อมูลหน้างานเป็น Dashboard, Gap Analysis, Action Plan และรายงานที่ตรวจสอบย้อนหลังได้", "Turns field data into dashboards, gap analysis, action plans, and auditable reports."),
    },
  ];

  return (
    <>
      <section className="page-hdr">
        <div className="container">
          <span className="section-tag">● VERDIX GREEN</span>
          <h1>{L("เกี่ยวกับเรา", "About Us")}</h1>
          <p>{L("VerdiX Green คือแพลตฟอร์ม Sustainability Expert-on-Demand ที่ช่วยให้องค์กรและโรงงานจัดการข้อมูลสิ่งแวดล้อม คาร์บอน และการรับรองมาตรฐานได้เป็นระบบ", "VerdiX Green is a Sustainability Expert-on-Demand platform helping organizations and factories manage environmental data, carbon accounting, and certification workflows systematically.")}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1.05fr .95fr",gap:40,alignItems:"start"}}>
            <div className="card" style={{padding:32}}>
              <span className="section-tag">● OUR MISSION</span>
              <h2 className="section-title" style={{fontSize:34,marginTop:10}}>{L("ทำให้ความยั่งยืนเป็นงานที่วัดผลได้", "Make Sustainability Measurable")}</h2>
              <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.8,marginBottom:22}}>
                {L(
                  "เราออกแบบ VerdiX เพื่อช่วยลดช่องว่างระหว่างข้อมูลหน้างาน ผู้เชี่ยวชาญ และมาตรฐานการรายงาน ไม่ว่าจะเป็น Eco Factory, CFO, CFP, ESG, Net Zero หรือระบบ IoT สำหรับโรงงาน",
                  "We built VerdiX to bridge field data, experts, and reporting standards across Eco Factory, CFO, CFP, ESG, Net Zero, and factory IoT workflows."
                )}
              </p>
              <button className="btn btn-dark" onClick={() => nav("experts")}>{L("คุยกับผู้เชี่ยวชาญ", "Talk to an Expert")}</button>
            </div>
            <div style={{display:"grid",gap:14}}>
              {pillars.map((item) => (
                <div className="card" key={item.title} style={{padding:22}}>
                  <h3 style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,color:"var(--g1)",marginBottom:8}}>{item.title}</h3>
                  <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.7}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BlogPage({ t, lang, nav, articles }) {
  const [filter,setFilter] = useState("all");
  const [q,setQ] = useState("");
  const shown = articles.filter(a => {
    const okCat = filter==="all" || a.category===filter;
    const key = (lang==="th"?a.title_th:a.title_en).toLowerCase();
    return okCat && (!q || key.includes(q.toLowerCase()));
  });
  return (
    <>
      <div className="page-hdr"><div className="container"><h1>{t.blog_title}</h1><p>{t.blog_sub}</p></div></div>
      <section className="section">
        <div className="container">
          <div className="directory-tools">
            <div className="search-wrap"><input className="search-inp" placeholder={t.search_art} value={q} onChange={e=>setQ(e.target.value)} /></div>
            <div className="filters">
              {["all",...CATS].map(c => (
                <button key={c} className={`filter-btn ${filter===c?"active":""}`} onClick={() => setFilter(c)}>
                  {c==="all"?t.all:c}
                </button>
              ))}
            </div>
          </div>
          {shown.length===0 ? <p style={{textAlign:"center",color:"var(--muted)",padding:40}}>{t.no_result}</p> : (
            <div className="articles-grid">
              {shown.map(a => <ArtCard key={a.id} a={a} lang={lang} t={t} onClick={() => nav("blog-detail",a)} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function DownloadsPage({ lang, documents }) {
  const [filter,setFilter] = useState("All");
  const [q,setQ] = useState("");
  const [selectedFolder,setSelectedFolder] = useState(null);
  const L = (th,en) => lang==="th"?th:en;
  const visibleDocs = (documents || [])
    .filter(d => d.active !== false)
    .filter(d => filter === "All" || d.category === filter)
    .filter(d => {
      const hay = [d.title_th,d.title_en,d.description_th,d.description_en,d.category,d.file_name].join(" ").toLowerCase();
      return !q || hay.includes(q.toLowerCase());
    });
  const docIcon = (doc) => {
    const type = (doc.file_type || doc.file_name || "").toLowerCase();
    return type.includes("folder") ? "" : "";
  };
  const isFolder = (doc) => (doc.file_type || "").toLowerCase().includes("folder");
  const folderFiles = selectedFolder ? (DOWNLOAD_FOLDER_FILES[selectedFolder.id] || []) : [];

  if (selectedFolder) {
    return (
      <section className="section">
        <div className="container">
          <div className="doc-detail-head">
            <button className="doc-back" onClick={() => setSelectedFolder(null)}>
              {L("ย้อนกลับ เอกสารดาวน์โหลด","Back to Downloads")}
            </button>
            <h1 className="doc-detail-title">{L(selectedFolder.title_th, selectedFolder.title_en)}</h1>
          </div>
          <div className="doc-table-wrap">
            <table className="doc-file-table">
              <thead>
                <tr>
                  <th>{L("ชื่อเอกสาร","Document Name")}</th>
                  <th className="doc-file-type">{L("ประเภทไฟล์","File Type")}</th>
                  <th className="doc-file-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {(folderFiles.length ? folderFiles : [{
                  name_th:L(selectedFolder.title_th, selectedFolder.title_en),
                  name_en:L(selectedFolder.title_th, selectedFolder.title_en),
                  file_type:(selectedFolder.file_type || "file").toLowerCase(),
                  file_url:docHref(selectedFolder),
                  file_name:selectedFolder.file_name
                }]).map((file,index) => {
                  const href = file.file_url || "#";
                  const local = href.startsWith("/");
                  return (
                    <tr key={`${file.name_en}-${index}`}>
                      <td className="doc-file-name">{index + 1}. {L(file.name_th, file.name_en)}</td>
                      <td className="doc-file-type">{file.file_type || "file"}</td>
                      <td className="doc-file-action">
                        <a className="btn-accent" href={href} download={local ? (file.file_name || true) : undefined} target={local ? undefined : "_blank"} rel="noreferrer">
                          Download File
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="download-hero">
        <div className="container">
          <span className="section-tag">● DOWNLOAD CENTER</span>
          <h1>{L("ดาวน์โหลดเอกสาร","Document Download Center")}</h1>
          <p>{L("รวมเอกสาร แบบฟอร์ม Checklist คู่มือมาตรฐาน และ Template สำหรับงาน Eco Factory, CFO, CFP, ESG และระบบ IoT/MQTT ของโรงงาน","A central library for forms, checklists, standards, and templates for Eco Factory, CFO, CFP, ESG, and factory IoT/MQTT workflows.")}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="download-tools">
            <div className="search-wrap">
              <input className="search-inp" value={q} onChange={e=>setQ(e.target.value)} placeholder={L("ค้นหาเอกสาร...","Search documents...")} />
            </div>
            <div className="filters">
              {DOC_CATEGORIES.map(c => (
                <button key={c} className={`filter-btn ${filter===c?"active":""}`} onClick={()=>setFilter(c)}>{c==="All"?L("ทั้งหมด","All"):c}</button>
              ))}
            </div>
          </div>
          {visibleDocs.length === 0 ? (
            <p style={{textAlign:"center",color:"var(--muted)",padding:42}}>{L("ไม่พบเอกสาร","No documents found.")}</p>
          ) : (
            <div className="download-grid">
              {visibleDocs.map(doc => {
                const href = docHref(doc);
                const disabled = href === "#";
                return (
                  <article className={`doc-card ${(doc.file_type || "").toLowerCase().includes("folder") ? "folder" : ""}`} key={doc.id}>
                    <div className="doc-head">
                      <h3 className="doc-title">{L(doc.title_th, doc.title_en)}</h3>
                    </div>
                    <div className="doc-visual">
                      <div className="doc-icon">{docIcon(doc)}</div>
                    </div>
                    <p className="doc-desc">{L(doc.description_th, doc.description_en)}</p>
                    <div className="doc-meta" style={{display:"none"}}>
                      <span>{doc.category || "Document"}</span>
                      <span>{doc.file_type || "FILE"}</span>
                      <span>{formatDocSize(doc.file_size)}</span>
                      {doc.version && <span>v{doc.version}</span>}
                    </div>
                    <div className="doc-actions">
                      {isFolder(doc) ? (
                        <button className="btn-accent" onClick={() => setSelectedFolder(doc)} style={{opacity:disabled ? .45 : 1}}>
                          {L("ดูไฟล์ทั้งหมด","View All Files")}
                        </button>
                      ) : (
                        <a className="btn-accent" href={href} download={doc.file_data_url || href.startsWith("/") ? (doc.file_name || true) : undefined} target={doc.file_data_url || href.startsWith("/") ? undefined : "_blank"} rel="noreferrer" style={{pointerEvents:disabled ? "none" : "auto",opacity:disabled ? .45 : 1,textDecoration:"none"}}>
                          {L("Download File","Download File")}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Blog Detail ──────────────────────────────────────────────
function TgiSurveyPage({ lang }) {
  const L = (th,en) => lang === "th" ? th : en;
  const initialForm = {
    respondent_name: "",
    phone: "",
    tambon: "",
    village: "",
    community: "",
    student_recorder: "",
    stakeholder_type: "",
    distance: "",
    overall_score: "",
    awareness_score: "",
    participation_score: "",
    behavior_score: "",
    communication_score: "",
    safety_score: "",
    environment_impact_score: "",
    csr_focus: [],
    suggestion: "",
  };
  const [form,setForm] = useState(initialForm);
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState(null);
  const sections = [
    L("ข้อมูลทั่วไป", "General Information"),
    L("ความคิดเห็นต่อโครงการ", "Project Feedback"),
    L("ผลกระทบจากการดำเนินงาน", "Operational Impact"),
    L("ชุมชนและสิ่งแวดล้อม", "Community & Environment"),
    L("ความรู้และความตระหนัก", "Knowledge & Awareness"),
    L("ข้อเสนอแนะและความคาดหวัง", "Suggestions & Expectations"),
  ];
  const scoreQuestions = [
    ["overall_score", L("ความพึงพอใจโดยรวมต่อกิจกรรมและการดำเนินงานของบริษัท", "Overall satisfaction with company activities and operations")],
    ["communication_score", L("การสื่อสารข้อมูล ข่าวสาร และการรับฟังความคิดเห็นจากชุมชน", "Communication, information sharing, and community feedback channels")],
    ["awareness_score", L("กิจกรรมช่วยสร้างความรู้และความตระหนักด้านสิ่งแวดล้อม", "Activities help improve environmental knowledge and awareness")],
    ["participation_score", L("ชุมชนมีโอกาสเข้าร่วมกิจกรรมและแสดงความคิดเห็นอย่างเหมาะสม", "Community has proper opportunities to participate and give feedback")],
    ["behavior_score", L("กิจกรรมส่งเสริมพฤติกรรมที่เป็นมิตรต่อสิ่งแวดล้อม", "Activities encourage environmentally friendly behavior")],
    ["safety_score", L("ความเชื่อมั่นต่อความปลอดภัยและการดูแลผลกระทบจากโรงงาน", "Confidence in safety and factory impact management")],
    ["environment_impact_score", L("ความพึงพอใจต่อการจัดการผลกระทบด้านสิ่งแวดล้อม", "Satisfaction with environmental impact management")],
  ];
  const focusOptions = [
    L("การศึกษาและเยาวชน", "Education and youth"),
    L("สิ่งแวดล้อมและพื้นที่สีเขียว", "Environment and green areas"),
    L("สุขภาพและความปลอดภัย", "Health and safety"),
    L("อาชีพและเศรษฐกิจชุมชน", "Local jobs and economy"),
    L("สาธารณประโยชน์ / ชุมชนสัมพันธ์", "Public benefit / community relations"),
  ];
  const surveyPartOverview = [
    "ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม (Nominal/Ordinal Data)",
    "ส่วนที่ 2: ความคิดเห็นต่อโครงการด้านการศึกษา (4 โครงการหลัก)",
    "ส่วนที่ 3: ความคิดเห็นต่อโครงการด้านชุมชนและสังคม",
    "ส่วนที่ 4: ความคิดเห็นต่อโครงการด้านศิลปวัฒนธรรม",
    "ส่วนที่ 5: ความคิดเห็นต่อโครงการด้านสิ่งแวดล้อม",
    "ส่วนที่ 6: ความคิดเห็นและผลกระทบจากการดำเนินงานของบริษัท",
    "ส่วนที่ 7: ลักษณะชุมชนและสิ่งแวดล้อมที่อยู่อาศัย",
    "ส่วนที่ 8: ความรู้เกี่ยวกับการผลิตและการบริโภคอย่างยั่งยืน",
    "ส่วนที่ 9: ความตระหนักต่อปัญหาและผลกระทบสิ่งแวดล้อม",
    "ส่วนที่ 10: การมีส่วนร่วมในการอนุรักษ์สิ่งแวดล้อม",
    "ส่วนที่ 11: พฤติกรรมการบริโภคที่เป็นมิตรต่อสิ่งแวดล้อม",
    "ส่วนที่ 12: ข้อเสนอแนะและความคาดหวังต่อการดำเนินงานของบริษัท",
  ];
  const studentOptions = TGI_STUDENT_OPTIONS;
  const likertText = ["มากที่สุด","มาก","ปานกลาง","น้อย","น้อยที่สุด"];
  const scoreFive = ["5","4","3","2","1"];
  const supplementalSelectFields = [
    {id:"student_recorder", label:"รายชื่อนิสิตที่บันทึกแบบสอบถาม", options:studentOptions},
    {id:"gender", label:"เพศ", options:["ชาย","หญิง","อื่น ๆ"]},
    {id:"age_range", label:"อายุ", options:["18–20 ปี","20–35 ปี","36–50 ปี","51–65 ปี","มากกว่า 65 ปี"]},
    {id:"education_level", label:"1.3 ระดับการศึกษา", options:["ประถมศึกษา","มัธยมศึกษาตอนต้น","มัธยมศึกษาตอนปลาย/ปวช.","อนุปริญญา/ปวส.","ปริญญาตรี","สูงกว่าปริญญาตรี"]},
    {id:"occupation", label:"1.4 อาชีพ", options:["พนักงานบริษัท/โรงงาน","นักศึกษา","เกษตร/ประมง","ค้าขาย/ธุรกิจส่วนตัว","รับราชการ/รัฐวิสาหกิจ","รับจ้างทั่วไป","วิสาหกิจชุมชน (OTOP)","แม่บ้าน/พ่อบ้าน","อื่น ๆ (โปรดระบุ)"]},
    {id:"household_income", label:"1.5 รายได้ครัวเรือนต่อเดือน", options:["ไม่มีรายได้","ต่ำกว่า 10,000 บาท","10,001–20,000 บาท","20,001–30,000 บาท","มากกว่า 30,000 บาท","ไม่ระบุ"]},
    {id:"domicile", label:"1.6 ภูมิลำเนา", options:["เกิดและอาศัยที่นี่","ศีรษะจรเข้น้อย หมู่ 1","ศีรษะจรเข้น้อย หมู่ 2","ศีรษะจรเข้น้อย หมู่ 3","ศีรษะจรเข้น้อย หมู่ 4","ศีรษะจรเข้น้อย หมู่ 5","ศีรษะจรเข้น้อย หมู่ 6","ศีรษะจรเข้น้อย หมู่ 7","ศีรษะจรเข้น้อย หมู่ 8","ศีรษะจรเข้น้อย หมู่ 9","ศีรษะจรเข้น้อย หมู่ 10","ศีรษะจรเข้น้อย หมู่ 11","ศีรษะจรเข้น้อย หมู่ 12","ศีรษะจรเข้ใหญ่ หมู่ 3","ศีรษะจรเข้ใหญ่ หมู่ 4","ศีรษะจรเข้ใหญ่ หมู่ 5","ศีรษะจรเข้ใหญ่ หมู่ 6","ศีรษะจรเข้ใหญ่ หมู่ 7","ศีรษะจรเข้ใหญ่ หมู่ 8","ศีรษะจรเข้ใหญ่ หมู่ 9","หนองปรือ หมู่ 1","หนองปรือ หมู่ 2","หนองปรือ หมู่ 3","บางโฉลง หมู่ 5","บางโฉลง หมู่ 7","บางโฉลง หมู่ 10","บางเสาธง หมู่ 10","บางเสาธง หมู่ 11","บางเสาธง หมู่ 12","บางเสาธง หมู่ 13","บางเสาธง หมู่ 14","ย้ายมาจากจังหวัดอื่น (โปรดระบุ)"]},
    {id:"housing_type", label:"1.8 ประเภทที่พักอาศัย", options:["บ้านเดี่ยว","ทาวน์เฮ้าส์","อพาร์ตเมนต์","คอนโดมิเนียม","ตึกแถว/อาคารพาณิชย์","อื่น ๆ (โปรดระบุ)"]},
    {id:"housing_ownership", label:"1.9 การถือครองที่อยู่อาศัย", options:["เจ้าของ","ผู้อาศัย","เช่า","เช่าซื้อ","ใช้ฟรี (ไม่จ่ายค่าเช่า)","อื่น ๆ (โปรดระบุ)"]},
    {id:"tgi_distance_original", label:"1.10 ระยะห่างจากบ้านท่านถึงโรงงาน TGI (โรงแก้ว)", options:["≤ 1 กิโลเมตร","1–3 กิโลเมตร","3–5 กิโลเมตร","มากกว่า 5 กิโลเมตร"]},
    {id:"csr_awareness", label:"2.1 ท่านทราบหรือไม่ว่าบริษัทฯ จัดกิจกรรมพัฒนาชุมชน?", options:["ทราบ","ไม่แน่ใจ","ไม่ทราบ"]},
    {id:"csr_overall_text", label:"2.4 ในภาพรวม ท่านพึงพอใจต่อกิจกรรม CSR ของบริษัทฯ ในระดับใด", options:likertText},
    {id:"know_tgi", label:"6.1 ท่านรู้จักบริษัท TGI (โรงแก้ว) หรือไม่", options:["รู้จัก","ไม่รู้จัก"]},
    {id:"factory_effect", label:"6.2 การมีโรงงาน TGI (โรงแก้ว) ตั้งอยู่ใกล้ชุมชนของท่านมีผลอย่างไร", options:["ไม่มีความคิดเห็น","ไม่มีผลใด ๆ","มีผลต่อชุมชน"]},
    {id:"negative_impact", label:"6.4 ในรอบ 1 ปีที่ผ่านมา ท่านได้รับผลกระทบเชิงลบจากบริษัทฯ หรือไม่", options:["ไม่ได้รับ","ได้รับ"]},
    {id:"environment_confidence", label:"6.6 ท่านมีความเชื่อมั่นในระบบจัดการสิ่งแวดล้อมของบริษัทฯ ในระดับใด", options:["มั่นใจมากที่สุด","มั่นใจมาก","ปานกลาง","ไม่มั่นใจ","ไม่แน่ใจ"]},
    {id:"sroi_interview", label:"12.5 ท่านยินดีให้สัมภาษณ์เชิงลึกในการประเมินผล SROI หรือไม่", options:["ยินดี","ไม่ยินดี"]},
  ];
  const supplementalMultiFields = [
    {id:"csr_info_sources", label:"2.2 หากทราบ ทราบจากแหล่งใด (ตอบได้มากกว่า 1 ข้อ)", options:["ผู้นำชุมชน/กรรมการหมู่บ้าน","บอร์ดประชาสัมพันธ์","เว็บไซต์/Facebook/Line","เสียงตามสาย/วิทยุชุมชน","อื่น ๆ (โปรดระบุ)"]},
    {id:"wanted_activities", label:"2.5 กิจกรรมใดที่ท่านต้องการให้บริษัทฯ ดำเนินการเพิ่มเติม (ตอบได้มากกว่า 1 ข้อ)", options:["ด้านสิ่งแวดล้อม","ด้านสังคม","ด้านเศรษฐกิจ","ด้านการสร้างเครือข่ายในชุมชน","ด้านการลดความขัดแย้ง","อื่น ๆ (โปรดระบุ)"]},
    {id:"company_info_channels", label:"3.13 ท่านได้รับข้อมูลข่าวสารเกี่ยวกับบริษัทฯ จากช่องทางใด (ตอบได้มากกว่า 1 ข้อ)", options:["ญาติ/ครอบครัว/เพื่อน","พนักงานบริษัท TGI","เจ้าหน้าที่รัฐ/ผู้นำชุมชน","สื่อออนไลน์ (เว็บไซต์/Line/Facebook/YouTube)","อื่น ๆ (โปรดระบุ)"]},
    {id:"impact_actions", label:"6.5 หากได้รับผลกระทบ ท่านดำเนินการอย่างไร (ตอบได้มากกว่า 1 ข้อ)", options:["ไม่ดำเนินการใด","แจ้งหน่วยงานราชการ","แจ้งโรงงานผ่านป้อม รปภ./โทรศัพท์/อีเมล/เว็บไซต์","ร้องเรียนผ่านสื่อมวลชน","ยังไม่ได้รับการแก้ไข","ได้รับการแก้ไขแล้ว"]},
    {id:"impact_suggestions", label:"6.7 ข้อเสนอแนะเพิ่มเติม (ตอบได้มากกว่า 1 ข้อ)", options:["ปรับปรุงระบบควบคุมมลพิษ","จัดกิจกรรมสร้างรายได้ในชุมชน","จ้างแรงงานท้องถิ่นเพิ่ม","สนับสนุนกิจกรรมชุมชนต่อเนื่อง","ประชาสัมพันธ์การดำเนินงานต่อเนื่อง"]},
    {id:"community_safety_issues", label:"7.1 ปัญหาด้านความปลอดภัยในชุมชน", options:["ไม่มีปัญหา","โจร/ขโมย","อาชญากรรม","ยาเสพติด","ปัญหาคนในชุมชน","ปัญหาสิ่งแวดล้อม"]},
    {id:"csr_future_focus", label:"12.1 ท่านอยากให้ TGI ดำเนินโครงการ CSR ด้านใดเพิ่มเติม (เลือกได้มากกว่า 1)", options:["การศึกษา","ชุมชนและสังคม","ศิลปวัฒนธรรม","สิ่งแวดล้อม","สาธารณสุข","พัฒนาอาชีพ"]},
  ];
  const supplementalScoreFields = [
    {id:"csr_by_plan_score", label:"2.3 ระดับความพึงพอใจต่อกิจกรรม CSR แยกตามด้าน", options:likertText},
    {id:"community_social_projects_score", label:"ส่วนที่ 3 ความคิดเห็นต่อโครงการด้านชุมชนและสังคม", options:likertText},
    {id:"culture_projects_score", label:"ส่วนที่ 4 ความคิดเห็นต่อโครงการด้านศิลปวัฒนธรรม", options:likertText},
    {id:"kap_knowledge_score", label:"5.1 Knowledge (K) ความรู้เกี่ยวกับการคัดแยกขยะและรีไซเคิลขวดแก้ว", options:["1","2","3","4","5"]},
    {id:"kap_attitude_score", label:"5.2 Attitude (A) ทัศนคติด้านสิ่งแวดล้อม", options:["1","2","3","4","5"]},
    {id:"kap_practice_score", label:"5.3 Practice (P) การปฏิบัติด้านสิ่งแวดล้อม", options:["1","2","3","4","5"]},
    {id:"impact_level_score", label:"6.3 ระดับผลกระทบที่เกิดขึ้น", options:scoreFive},
    {id:"community_activity_score", label:"7.2 การเข้าร่วมกิจกรรมชุมชน", options:["3","2","1","0"]},
    {id:"daily_environment_impact_score", label:"7.3 ผลกระทบสิ่งแวดล้อมในชีวิตประจำวัน", options:["3","2","1","0"]},
    {id:"sustainable_consumption_knowledge", label:"8. ความรู้เกี่ยวกับการผลิตและการบริโภคอย่างยั่งยืน", options:["ใช่","ไม่ใช่","ไม่ทราบ"]},
    {id:"environment_awareness_score_full", label:"9. ความตระหนักต่อปัญหาและผลกระทบสิ่งแวดล้อม", options:scoreFive},
    {id:"environment_participation_score_full", label:"10. การมีส่วนร่วมในการอนุรักษ์สิ่งแวดล้อม", options:scoreFive},
    {id:"green_consumption_behavior_score_full", label:"11. พฤติกรรมการบริโภคที่เป็นมิตรกับสิ่งแวดล้อม", options:["0","1","2","3","4","5"]},
    {id:"continued_project_ranking", label:"12.2 โครงการใดของ TGI ที่ควรดำเนินการต่อเนื่องมากที่สุด (Ranking 1–4)", options:["1","2","3","4"]},
  ];
  const supplementalTextFields = [
    {id:"household_members", label:"1.7 สมาชิกในครัวเรือน (รวมผู้ตอบ) ............ คน"},
    {id:"negative_impact_detail", label:"6.4.1 หากได้รับผลกระทบเชิงลบ โปรดระบุเรื่อง"},
    {id:"impact_action_detail", label:"6.5.1 หากแจ้งหน่วยงานราชการ หรือมีรายละเอียดเพิ่มเติม โปรดระบุ"},
    {id:"csr_obstacles", label:"12.3 ปัญหา/อุปสรรคของโครงการ CSR ของ TGI"},
    {id:"final_suggestion", label:"12.4 ข้อเสนอแนะเพิ่มเติม"},
  ];
  const section2SelectIds = ["csr_awareness","csr_overall_text"];
  const section2MultiIds = ["csr_info_sources","wanted_activities"];
  const section2ScoreIds = ["csr_by_plan_score"];
  const section2SelectFields = supplementalSelectFields.filter(field => section2SelectIds.includes(field.id));
  const section2MultiFields = supplementalMultiFields.filter(field => section2MultiIds.includes(field.id));
  const section2ScoreFields = supplementalScoreFields.filter(field => section2ScoreIds.includes(field.id));
  const section2GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("2.3"));
  const section6SelectIds = ["know_tgi","factory_effect","negative_impact","environment_confidence"];
  const section3MultiIds = ["company_info_channels"];
  const section3ScoreIds = ["community_social_projects_score"];
  const section3MultiFields = supplementalMultiFields.filter(field => section3MultiIds.includes(field.id));
  const section3ScoreFields = supplementalScoreFields.filter(field => section3ScoreIds.includes(field.id));
  const section3GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("ส่วนที่ 3"));
  const section4ScoreIds = ["culture_projects_score"];
  const section4ScoreFields = supplementalScoreFields.filter(field => section4ScoreIds.includes(field.id));
  const section4GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("ส่วนที่ 4"));
  const section5ScoreIds = ["kap_knowledge_score","kap_attitude_score","kap_practice_score"];
  const section5ScoreFields = supplementalScoreFields.filter(field => section5ScoreIds.includes(field.id));
  const section5GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.startsWith("5."));
  const section6MultiIds = ["impact_actions","impact_suggestions"];
  const section6ScoreIds = ["impact_level_score"];
  const section6TextIds = ["negative_impact_detail","impact_action_detail"];
  const section6SelectFields = supplementalSelectFields.filter(field => section6SelectIds.includes(field.id));
  const section6MultiFields = supplementalMultiFields.filter(field => section6MultiIds.includes(field.id));
  const section6ScoreFields = supplementalScoreFields.filter(field => section6ScoreIds.includes(field.id));
  const section6TextFields = supplementalTextFields.filter(field => section6TextIds.includes(field.id));
  const section6GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("6.3"));
  const section7MultiIds = ["community_safety_issues"];
  const section7ScoreIds = ["community_activity_score","daily_environment_impact_score"];
  const section7MultiFields = supplementalMultiFields.filter(field => section7MultiIds.includes(field.id));
  const section7ScoreFields = supplementalScoreFields.filter(field => section7ScoreIds.includes(field.id));
  const section7GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("7.2") || group.title.includes("7.3"));
  const section8ScoreIds = ["sustainable_consumption_knowledge"];
  const section8ScoreFields = supplementalScoreFields.filter(field => section8ScoreIds.includes(field.id));
  const section8GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("8."));
  const section9ScoreIds = ["environment_awareness_score_full"];
  const section9ScoreFields = supplementalScoreFields.filter(field => section9ScoreIds.includes(field.id));
  const section9GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("9."));
  const section10ScoreIds = ["environment_participation_score_full"];
  const section10ScoreFields = supplementalScoreFields.filter(field => section10ScoreIds.includes(field.id));
  const section10GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("10."));
  const section11ScoreIds = ["green_consumption_behavior_score_full"];
  const section11ScoreFields = supplementalScoreFields.filter(field => section11ScoreIds.includes(field.id));
  const section11GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("11."));
  const section12SelectIds = ["sroi_interview"];
  const section12MultiIds = ["csr_future_focus"];
  const section12ScoreIds = ["continued_project_ranking"];
  const section12TextIds = ["csr_obstacles","final_suggestion"];
  const section12SelectFields = supplementalSelectFields.filter(field => section12SelectIds.includes(field.id));
  const section12MultiFields = supplementalMultiFields.filter(field => section12MultiIds.includes(field.id));
  const section12ScoreFields = supplementalScoreFields.filter(field => section12ScoreIds.includes(field.id));
  const section12TextFields = supplementalTextFields.filter(field => section12TextIds.includes(field.id));
  const section12GridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => group.title.includes("12.2"));
  const extractedSelectIds = [...section2SelectIds, ...section6SelectIds, ...section12SelectIds];
  const extractedMultiIds = [...section2MultiIds, ...section3MultiIds, ...section6MultiIds, ...section7MultiIds, ...section12MultiIds];
  const extractedScoreIds = [...section2ScoreIds, ...section3ScoreIds, ...section4ScoreIds, ...section5ScoreIds, ...section6ScoreIds, ...section7ScoreIds, ...section8ScoreIds, ...section9ScoreIds, ...section10ScoreIds, ...section11ScoreIds, ...section12ScoreIds];
  const extractedTextIds = [...section6TextIds, ...section12TextIds];
  const generalSelectFields = supplementalSelectFields.filter(field => field.id !== "student_recorder" && !extractedSelectIds.includes(field.id));
  const generalMultiFields = supplementalMultiFields.filter(field => !extractedMultiIds.includes(field.id));
  const generalScoreFields = supplementalScoreFields.filter(field => !extractedScoreIds.includes(field.id));
  const generalTextFields = supplementalTextFields.filter(field => !extractedTextIds.includes(field.id));
  const generalGridGroups = TGI_GOOGLE_GRID_FIELDS.filter(group => !["2.3","ส่วนที่ 3","ส่วนที่ 4","5.","6.3","7.2","7.3","8.","9.","10.","11.","12.2"].some(key => group.title.includes(key)));

  const setField = (key, value) => setForm(prev => ({...prev, [key]: value}));
  const setTambon = (value) => setForm(prev => ({...prev, tambon: value, village: ""}));
  const toggleArrayField = (key, value) => setForm(prev => {
    const current = Array.isArray(prev[key]) ? prev[key] : [];
    return {
      ...prev,
      [key]: current.includes(value) ? current.filter(item => item !== value) : [...current, value],
    };
  });
  const toggleFocus = (value) => setForm(prev => {
    const current = prev.csr_focus || [];
    return {
      ...prev,
      csr_focus: current.includes(value) ? current.filter(item => item !== value) : [...current, value],
    };
  });
  const scoreFromAnswer = (value) => {
    if (value === "" || value === undefined || value === null) return 0;
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) return numeric;
    const map = {"มากที่สุด":5,"มาก":4,"ปานกลาง":3,"น้อย":2,"น้อยที่สุด":1,"มั่นใจมากที่สุด":5,"มั่นใจมาก":4,"ไม่มั่นใจ":2,"ไม่แน่ใจ":1};
    return map[value] || 0;
  };
  const collectSupplementalAnswers = () => {
    const answers = {};
    [...supplementalSelectFields, ...supplementalMultiFields, ...supplementalScoreFields, ...supplementalTextFields].forEach(field => {
      answers[field.id] = {
        label: field.label,
        value: form[field.id] || (supplementalMultiFields.some(item => item.id === field.id) ? [] : ""),
      };
    });
    return answers;
  };
  const collectGoogleGridAnswers = () => {
    const answers = {};
    TGI_GOOGLE_GRID_FIELDS.forEach(group => {
      answers[group.id] = {
        title: group.title,
        rows: Object.fromEntries(group.rows.map(row => [row.id, {
          label: row.label,
          value: form[row.id] || "",
        }])),
      };
    });
    return answers;
  };

  const submitSurvey = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!form.student_recorder || !form.tambon || !form.village || !form.overall_score || !form.awareness_score || !form.participation_score || !form.behavior_score) {
      setMessage({type:"error", text:L("กรุณากรอกข้อมูลที่จำเป็นและให้คะแนนตัวชี้วัดหลักให้ครบ", "Please complete required fields and core score questions.")});
      return;
    }

    setBusy(true);
    try {
      const communityLabel = form.community || `${form.tambon} หมู่ ${form.village}`;
      await tgiSurveyService.saveResponse({
        respondent_name: form.respondent_name,
        community: communityLabel,
        organization: "TGI",
        overall_score: Number(form.overall_score || 0),
        awareness_score: Number(form.awareness_score || 0),
        participation_score: Number(form.participation_score || 0),
        behavior_score: Number(form.behavior_score || 0),
        csr_focus: (form.csr_focus || []).join(", "),
        suggestion: form.suggestion,
        raw_data: {
          source: "verdix_native_tgi_survey",
          tambon: form.tambon,
          village: form.village,
          phone: form.phone,
          stakeholder_type: form.stakeholder_type,
          distance: form.distance,
          student_recorder: form.student_recorder || "",
          supplemental_answers: collectSupplementalAnswers(),
          google_grid_answers: collectGoogleGridAnswers(),
          communication_score: Number(form.communication_score || 0),
          safety_score: Number(form.safety_score || 0),
          environment_impact_score: Number(form.environment_impact_score || 0),
          csr_overall_text_score: scoreFromAnswer(form.csr_overall_text),
          environment_awareness_score_full: scoreFromAnswer(form.environment_awareness_score_full),
          environment_participation_score_full: scoreFromAnswer(form.environment_participation_score_full),
          green_consumption_behavior_score_full: scoreFromAnswer(form.green_consumption_behavior_score_full),
          csr_focus: form.csr_focus || [],
        },
      });
      setForm(initialForm);
      setMessage({type:"success", text:L("ส่งแบบสอบถามเรียบร้อยแล้ว ขอบคุณสำหรับความคิดเห็นของท่าน", "Survey submitted. Thank you for your feedback.")});
    } catch (error) {
      setMessage({type:"error", text:error.message || L("ไม่สามารถส่งแบบสอบถามได้ กรุณาลองใหม่อีกครั้ง", "Could not submit the survey. Please try again.")});
    } finally {
      setBusy(false);
    }
  };

  const ScoreInput = ({ id, label }) => (
    <div className="survey-field">
      <label>{label} <span className="survey-required">*</span></label>
      <div className="survey-radio-grid">
        {[1,2,3,4,5].map(score => (
          <label className="survey-radio" key={`${id}-${score}`}>
            <input type="radio" name={id} value={score} checked={String(form[id]) === String(score)} onChange={e=>setField(id,e.target.value)} />
            {score}
          </label>
        ))}
      </div>
    </div>
  );
  const SelectField = ({ field }) => (
    <div className="survey-field">
      <label>{field.label}</label>
      <select className="form-inp" value={form[field.id] || ""} onChange={e=>setField(field.id,e.target.value)}>
        <option value="">เลือกคำตอบ</option>
        {field.options.map(option => <option key={`${field.id}-${option}`} value={option}>{option}</option>)}
      </select>
    </div>
  );
  const MultiField = ({ field }) => (
    <div className="survey-field">
      <label>{field.label}</label>
      <div className="survey-check-grid">
        {field.options.map(option => (
          <label className="survey-check" key={`${field.id}-${option}`}>
            <input type="checkbox" checked={(form[field.id] || []).includes(option)} onChange={() => toggleArrayField(field.id, option)} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
  const TextField = ({ field }) => (
    <div className="survey-field">
      <label>{field.label}</label>
      <textarea className="form-inp" rows={3} value={form[field.id] || ""} onChange={e=>setField(field.id,e.target.value)} />
    </div>
  );
  const GridGroup = ({ group }) => (
    <div className="survey-grid-group">
      <h3>{group.title}</h3>
      <div className="survey-grid-table">
        {group.rows.map(row => (
          <div className="survey-grid-row" key={row.id}>
            <div className="survey-grid-question">{row.label}</div>
            <div className="survey-radio-grid compact">
              {group.options.map(option => (
                <label className="survey-radio" key={`${row.id}-${option}`}>
                  <input
                    type="radio"
                    name={row.id}
                    value={option}
                    checked={String(form[row.id] || "") === String(option)}
                    onChange={e=>setField(row.id,e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="survey-page">
      <div className="survey-shell">
        <section className="survey-hero">
          <div className="survey-hero-inner">
            <div className="survey-kicker">TGI Community Satisfaction Survey</div>
            <h1 className="survey-title">
              {L(
                "แบบสอบถามความพึงพอใจของชุมชนต่อการส่งเสริม สร้าง และสานสัมพันธ์กิจกรรมพัฒนาชุมชน ของบริษัท TGI (โรงแก้ว)",
                "Community Satisfaction Survey for TGI Community Development and Relationship Activities"
              )}
            </h1>
            <p className="survey-intro">
              {L(
                "บริษัท TGI มีความประสงค์จะประเมินความพึงพอใจของชุมชนต่อการดำเนินกิจกรรม CSR และผลกระทบจากการดำเนินงานของโรงงาน เพื่อนำข้อมูลไปใช้ประกอบการศึกษา จัดทำรายงาน และพัฒนาแนวทางการอยู่ร่วมกับชุมชนอย่างยั่งยืน",
                "TGI is collecting community feedback on CSR activities and factory impacts to support reporting, improvement planning, and sustainable coexistence with local communities."
              )}
            </p>
            <div className="survey-sections">
              {sections.map(section => <span key={section}>{section}</span>)}
            </div>
          </div>
        </section>

        <section className="survey-frame-card">
          <div className="survey-frame-head">
            <strong>{L("กรุณาตอบแบบสอบถามตามความเป็นจริง", "Please answer the questionnaire honestly")}</strong>
          </div>
          <form className="survey-form" onSubmit={submitSurvey}>
            <section className="survey-form-section survey-overview-section">
              <h2>ภาพรวมแบบสอบถาม</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                แบบสอบถามนี้ประกอบด้วยข้อมูล 12 ส่วน เพื่อประเมินความพึงพอใจของชุมชนต่อกิจกรรมความรับผิดชอบต่อสังคม (CSR) ผลกระทบจากการดำเนินงานของโรงงาน และแนวทางการพัฒนาความสัมพันธ์กับชุมชนอย่างยั่งยืน
              </p>
              <div className="survey-part-list">
                {surveyPartOverview.map(part => <div className="survey-part-item" key={part}>{part}</div>)}
              </div>
              <p className="survey-submit-note" style={{marginTop:14}}>
                ขอความกรุณาตอบแบบสอบถามตามความเป็นจริง และขอขอบพระคุณที่ท่านสละเวลาให้ความร่วมมือในการตอบแบบสอบถามครั้งนี้
              </p>
            </section>

            <section className="survey-form-section">
              <h2>{L("ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม (Nominal/Ordinal Data)", "Part 1 General Information (Nominal/Ordinal Data)")}</h2>
              <div className="survey-form-grid">
                <div className="survey-field">
                  <label>{L("ชื่อ-นามสกุล", "Name")}</label>
                  <input className="form-inp" value={form.respondent_name} onChange={e=>setField("respondent_name",e.target.value)} />
                </div>
                <div className="survey-field">
                  <label>{L("เบอร์โทรศัพท์", "Phone")}</label>
                  <input className="form-inp" value={form.phone} onChange={e=>setField("phone",e.target.value)} />
                </div>
                <div className="survey-field">
                  <label>{L("รายชื่อนิสิตผู้บันทึกแบบสอบถาม", "Student recorder")} <span className="survey-required">*</span></label>
                  <select className="form-inp" value={form.student_recorder} onChange={e=>setField("student_recorder",e.target.value)}>
                    <option value="">{L("เลือกรายชื่อนิสิต", "Select student recorder")}</option>
                    {studentOptions.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div className="survey-field">
                  <label>{L("ตำบล", "Subdistrict")} <span className="survey-required">*</span></label>
                  <select className="form-inp" value={form.tambon} onChange={e=>setTambon(e.target.value)}>
                    <option value="">{L("เลือกตำบล", "Select subdistrict")}</option>
                    {TGI_TAMBON_OPTIONS.map(tambon => <option key={tambon} value={tambon}>{tambon}</option>)}
                  </select>
                </div>
                <div className="survey-field">
                  <label>{L("หมู่", "Village")} <span className="survey-required">*</span></label>
                  <select className="form-inp" value={form.village} onChange={e=>setField("village",e.target.value)} disabled={!form.tambon}>
                    <option value="">{form.tambon ? L("เลือกหมู่", "Select village") : L("เลือกตำบลก่อน", "Select subdistrict first")}</option>
                    {tgiVillageOptionsFor(form.tambon).map(village => <option key={village} value={village}>หมู่ {village}</option>)}
                  </select>
                </div>
                <div className="survey-field">
                  <label>{L("ชุมชน / หน่วยงานเพิ่มเติม", "Community / organization detail")}</label>
                  <input className="form-inp" value={form.community} onChange={e=>setField("community",e.target.value)} placeholder={form.tambon && form.village ? `${form.tambon} หมู่ ${form.village}` : ""} />
                </div>
                <div className="survey-field">
                  <label>{L("สถานะผู้ตอบ", "Stakeholder type")}</label>
                  <select className="form-inp" value={form.stakeholder_type} onChange={e=>setField("stakeholder_type",e.target.value)}>
                    <option value="">{L("เลือกสถานะ", "Select type")}</option>
                    <option>{L("ประชาชนในพื้นที่", "Local resident")}</option>
                    <option>{L("ผู้นำชุมชน", "Community leader")}</option>
                    <option>{L("หน่วยงานราชการ", "Government agency")}</option>
                    <option>{L("สถานศึกษา", "Education sector")}</option>
                    <option>{L("อื่น ๆ", "Other")}</option>
                  </select>
                </div>
                <div className="survey-field">
                  <label>{L("ระยะห่างจากโรงงานโดยประมาณ", "Approximate distance from factory")}</label>
                  <select className="form-inp" value={form.distance} onChange={e=>setField("distance",e.target.value)}>
                    <option value="">{L("เลือกช่วงระยะ", "Select distance")}</option>
                    <option>{L("น้อยกว่า 1 กม.", "Less than 1 km")}</option>
                    <option>{L("1-3 กม.", "1-3 km")}</option>
                    <option>{L("3-5 กม.", "3-5 km")}</option>
                    <option>{L("มากกว่า 5 กม.", "More than 5 km")}</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ข้อมูลทั่วไปเพิ่มเติมจากแบบสอบถามเดิม</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                รายการด้านล่างอ้างอิงจาก Google Form เดิม ใช้เก็บข้อมูลผู้บันทึก ข้อมูลประชากร และคำถามทั่วไปก่อนเข้าสู่ส่วนประเมินรายหัวข้อ
              </p>
              <div className="survey-form-grid">
                {generalSelectFields.map(field => <SelectField key={field.id} field={field} />)}
                {generalTextFields.map(field => <TextField key={field.id} field={field} />)}
              </div>
              <div style={{display:"grid",gap:18,marginTop:18}}>
                {generalScoreFields.map(field => <SelectField key={field.id} field={field} />)}
                {generalMultiFields.map(field => <MultiField key={field.id} field={field} />)}
              </div>
              <div className="survey-grid-groups">
                {generalGridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 2: ความคิดเห็นต่อโครงการด้านการศึกษา (4 โครงการหลัก)</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ครอบคลุมคำถาม 2.1-2.5 จากแบบฟอร์ม Google Form เดิม รวมถึงระดับความพึงพอใจต่อกิจกรรม CSR ด้านการศึกษา
              </p>
              <div className="survey-form-grid">
                {section2SelectFields.map(field => <SelectField key={field.id} field={field} />)}
              </div>
              <div style={{display:"grid",gap:18,marginTop:18}}>
                {section2MultiFields.map(field => <MultiField key={field.id} field={field} />)}
              </div>
              <div className="survey-grid-groups">
                {section2GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 3: ความคิดเห็นต่อโครงการด้านชุมชนและสังคม</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ครอบคลุมโครงการด้านชุมชนและสังคม 8 โครงการหลัก ตามแบบฟอร์ม Google Form เดิม
              </p>
              <div style={{display:"grid",gap:18}}>
                {section3MultiFields.map(field => <MultiField key={field.id} field={field} />)}
              </div>
              <div className="survey-grid-groups">
                {section3GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 4: ความคิดเห็นต่อโครงการด้านศิลปวัฒนธรรม</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ครอบคลุมคำถามส่วนที่ 4 จากแบบฟอร์ม Google Form เดิม เพื่อประเมินความพึงพอใจต่อกิจกรรมด้านศิลปวัฒนธรรม
              </p>
              <div className="survey-grid-groups">
                {section4GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 5: ความคิดเห็นต่อโครงการด้านสิ่งแวดล้อม</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ครอบคลุมคำถาม 5.1-5.3 จากแบบฟอร์ม Google Form เดิม ทั้งด้านความรู้ ทัศนคติ และพฤติกรรมสิ่งแวดล้อม
              </p>
              <div className="survey-grid-groups">
                {section5GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 6: ความคิดเห็นและผลกระทบ</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ครอบคลุมคำถาม 6.1-6.7 จากแบบฟอร์ม Google Form เดิม รวมถึงระดับผลกระทบ 6.3 แบบตาราง
              </p>
              <div className="survey-form-grid">
                {section6SelectFields.map(field => <SelectField key={field.id} field={field} />)}
                {section6TextFields.map(field => <TextField key={field.id} field={field} />)}
              </div>
              <h3 style={{fontSize:16,color:"#356351",margin:"18px 0 0",fontWeight:900}}>
                6.4-6.7 ความคิดเห็นเพิ่มเติมเกี่ยวกับผลกระทบ
              </h3>
              <div style={{display:"grid",gap:18,marginTop:18}}>
                {section6MultiFields.map(field => <MultiField key={field.id} field={field} />)}
              </div>
              <div className="survey-grid-groups">
                {section6GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 7: ลักษณะชุมชนและสิ่งแวดล้อมที่อยู่อาศัย</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ครอบคลุมคำถาม 7.1-7.3 จากแบบฟอร์ม Google Form เดิม ทั้งปัญหาความปลอดภัย การเข้าร่วมกิจกรรมชุมชน และผลกระทบสิ่งแวดล้อมในชีวิตประจำวัน
              </p>
              <div style={{display:"grid",gap:18}}>
                {section7MultiFields.map(field => <MultiField key={field.id} field={field} />)}
              </div>
              <div className="survey-grid-groups">
                {section7GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 8: ความรู้เกี่ยวกับการผลิตและการบริโภคอย่างยั่งยืน</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                ใช้สำหรับวิเคราะห์ความรู้พื้นฐานและความเชื่อมั่นตามแบบฟอร์ม Google Form เดิม
              </p>
              <div className="survey-grid-groups">
                {section8GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 9: ความตระหนักต่อปัญหาและผลกระทบสิ่งแวดล้อม</h2>
              <div className="survey-grid-groups">
                {section9GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 10: การมีส่วนร่วมในการอนุรักษ์สิ่งแวดล้อม</h2>
              <div className="survey-grid-groups">
                {section10GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 11: พฤติกรรมการบริโภคที่เป็นมิตรกับสิ่งแวดล้อม</h2>
              <div className="survey-grid-groups">
                {section11GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>ส่วนที่ 12: ข้อเสนอแนะและความคาดหวัง</h2>
              <div className="survey-form-grid">
                {section12SelectFields.map(field => <SelectField key={field.id} field={field} />)}
                {section12TextFields.map(field => <TextField key={field.id} field={field} />)}
              </div>
              <div style={{display:"grid",gap:18,marginTop:18}}>
                {section12MultiFields.map(field => <MultiField key={field.id} field={field} />)}
              </div>
              <div className="survey-grid-groups">
                {section12GridGroups.map(group => <GridGroup key={group.id} group={group} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>{L("ตัวชี้วัดสรุปสำหรับรายงาน VerdiX", "VerdiX Summary Indicators")}</h2>
              <p className="survey-submit-note" style={{marginBottom:14}}>
                {L("ให้คะแนน 1 = น้อยที่สุด, 5 = มากที่สุด เพื่อใช้สรุปภาพรวมในรายงานหลังบ้าน", "Score 1 = lowest, 5 = highest for admin report summaries")}
              </p>
              <div style={{display:"grid",gap:18}}>
                {scoreQuestions.map(([id,label]) => <ScoreInput key={id} id={id} label={label} />)}
              </div>
            </section>

            <section className="survey-form-section">
              <h2>{L("ข้อเสนอแนะทั่วไป", "General Needs and Suggestions")}</h2>
              <div className="survey-field" style={{marginBottom:16}}>
                <label>{L("ด้านกิจกรรม CSR ที่ชุมชนอยากให้บริษัทให้ความสำคัญ", "CSR areas the community wants the company to prioritize")}</label>
                <div className="survey-check-grid">
                  {focusOptions.map(option => (
                    <label className="survey-check" key={option}>
                      <input type="checkbox" checked={(form.csr_focus || []).includes(option)} onChange={() => toggleFocus(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="survey-field">
                <label>{L("ข้อเสนอแนะเพิ่มเติม", "Additional suggestions")}</label>
                <textarea className="form-inp" rows={5} value={form.suggestion} onChange={e=>setField("suggestion",e.target.value)} />
              </div>
            </section>

            {message && <div className={`survey-message ${message.type}`}>{message.text}</div>}
            <div className="survey-actions">
              <button className="btn btn-dark" type="submit" disabled={busy}>{busy ? L("กำลังส่ง...", "Submitting...") : L("ส่งแบบสอบถาม", "Submit Survey")}</button>
              <span className="survey-submit-note">
                {L("ข้อมูลจะถูกบันทึกในระบบ VerdiX เพื่อใช้สรุปรายงานในหน้า Admin", "Responses are stored in VerdiX for Admin reporting.")}
              </span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function BlogDetail({ lang, article, nav }) {
  if (!article) return null;
  const featured = lang === "th" ? FEATURED_ARTICLE_CONTENT[article.id] : null;
  const hasImage = typeof article.image === "string" && article.image.startsWith("/");
  const articleTitle = lang==="th"?article.title_th:article.title_en;
  const body = lang==="th"
    ? `บทความนี้ครอบคลุมประเด็นสำคัญด้าน "${article.title_th}" ในบริบทของประเทศไทย\n\nในปัจจุบัน การเปลี่ยนแปลงสภาพภูมิอากาศกลายเป็นความท้าทายระดับโลกที่ทุกองค์กรต้องให้ความสำคัญ ไม่ว่าจะเป็นการลด GHG Emission การรายงาน ESG หรือการเตรียมความพร้อมรับกฎหมาย Climate Change Act ที่กำลังจะประกาศใช้\n\nVerdiX เชื่อมองค์กรกับผู้เชี่ยวชาญที่มีความสามารถและประสบการณ์ตรง ผ่านระบบ Digital Assessment ที่ครอบคลุม Eco-Factory, Green Industry, CFO/CFP และ Net Zero Roadmap\n\nการประเมินผ่านระบบ VerdiX ช่วยให้องค์กรเห็นภาพชัดเจนของสถานะปัจจุบัน ช่องว่างที่ต้องพัฒนา และเส้นทางที่เป็นไปได้สู่ความยั่งยืนในระยะยาว\n\nเริ่มต้นได้วันนี้กับผู้เชี่ยวชาญของเรากว่า 120 คนทั่วประเทศไทย`
    : `This article covers key topics related to "${article.title_en}" in the context of Thailand's sustainability landscape.\n\nClimate change has become a global challenge that every organization must address — from reducing GHG emissions and reporting ESG to preparing for the upcoming Climate Change Act.\n\nVerdiX connects organizations with qualified and experienced sustainability experts through a comprehensive Digital Assessment system covering Eco-Factory, Green Industry, CFO/CFP, and Net Zero Roadmap.\n\nAssessments through VerdiX give organizations a clear picture of their current status, development gaps, and viable pathways toward long-term sustainability.\n\nGet started today with our network of over 120 certified experts across Thailand.`;
  return (
    <div className="article-page">
      <div className="detail-wrap">
        <button className="back-btn" onClick={() => nav("blog")}>← {lang==="th"?"กลับไปบทความ":"Back to Blog"}</button>
        <div className="article-hero">
          <div className="article-kicker">
            <div className={`detail-img ${hasImage ? "has-image" : ""}`}>
              {hasImage ? <img src={article.image} alt={articleTitle} /> : article.image}
            </div>
            <span className="badge">{article.category}</span>
          </div>
          <h1 className="detail-title">{articleTitle}</h1>
          <div className="detail-meta">
            <span>โดย {article.author}</span>
            <span>{article.date}</span>
            <span>{article.category}</span>
          </div>
        </div>
        <div className="article-shell">
          <article className="article-card">
            {hasImage && (
              <div className="article-cover">
                <img src={article.image} alt={articleTitle} />
              </div>
            )}
            {featured ? (
              <>
                <p className="article-intro">{featured.intro}</p>
                <div className="detail-body">
                  {featured.sections.map((section, index) => (
                    <section key={section.title}>
                      <h2>{section.title}</h2>
                      {section.paragraphs?.map((p, i) => <p key={`p-${index}-${i}`}>{p}</p>)}
                      {section.list && (
                        <ul className="article-list">
                          {section.list.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      )}
                      {section.after?.map((p, i) => <p key={`a-${index}-${i}`}>{p}</p>)}
                      {section.cta && (
                        <div className="article-cta-list">
                          {section.cta.map(item => <div className="article-cta-item" key={item}>{item}</div>)}
                        </div>
                      )}
                      {section.quote && <div className="article-quote">“{section.quote}”</div>}
                    </section>
                  ))}
                </div>
              </>
            ) : (
              <div className="detail-body">
                {body.split("\n\n").map((p,i) => <p key={i}>{p}</p>)}
              </div>
            )}
          </article>
          <aside className="article-side">
            <div className="article-side-card">
              <div className="article-side-title">{lang==="th"?"สาระสำคัญ":"Key Focus"}</div>
              <p>{lang==="th" ? "แนวทางเตรียมองค์กรให้พร้อมต่อ Net Zero, ESG, Carbon Footprint และกฎระเบียบด้านสภาพภูมิอากาศ" : "A practical view of Net Zero, ESG, carbon footprint, and climate regulation readiness."}</p>
              <div className="article-side-tags">
                <span>Net Zero</span>
                <span>ESG</span>
                <span>CFO/CFP</span>
                <span>Eco-Factory</span>
              </div>
            </div>
            <div className="article-side-card">
              <div className="article-side-title">{lang==="th"?"เริ่มต้นกับ VerdiX":"Start with VerdiX"}</div>
              <p>{lang==="th" ? "ประเมินสถานะองค์กร ระบุ Gap Analysis และเชื่อมต่อผู้เชี่ยวชาญด้านความยั่งยืนทั่วประเทศ" : "Assess current status, identify gaps, and connect with sustainability experts."}</p>
              <button className="btn-accent" onClick={() => nav("experts")}>{lang==="th"?"ค้นหาผู้เชี่ยวชาญ":"Find Experts"}</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── Experts Page ─────────────────────────────────────────────
function ExpertsPage({ t, lang, experts }) {
  const [filter,setFilter] = useState("all");
  const [q,setQ] = useState("");
  const shown = experts.filter(e => {
    const okArea = filter==="all" || e.expertise.includes(filter);
    const key = [
      e.location,
      ...(e.expertise || []),
    ].join(" ").toLowerCase();
    return okArea && (!q || key.includes(q.toLowerCase()));
  });
  return (
    <>
      <div className="page-hdr"><div className="container"><h1>{t.exp_title}</h1><p>{t.exp_sub}</p></div></div>
      <section className="section">
        <div className="container">
          <div className="directory-tools">
            <div className="search-wrap"><input className="search-inp" placeholder={t.search_exp} value={q} onChange={e=>setQ(e.target.value)} /></div>
            <div className="filters">
              {["all",...EXP_AREAS].map(a => (
                <button key={a} className={`filter-btn ${filter===a?"active":""}`} onClick={() => setFilter(a)}>{a==="all"?t.all:a}</button>
              ))}
            </div>
          </div>
          {shown.length===0 ? <p style={{textAlign:"center",color:"var(--muted)",padding:40}}>{t.no_result}</p> : (
            <div className="experts-grid">
              {shown.map((e, index) => {
                const publicText = getPublicExpertText(e, index, lang);
                return (
                  <div className="exp-card" key={e.id}>
                    <div className="exp-info">
                      <div className="exp-avatar">{e.avatar}</div>
                      <div>
                        <div className="exp-name">{publicText.name}</div>
                        <div className="exp-title">{publicText.title}</div>
                        <div className="exp-loc">📍 {e.location}</div>
                      </div>
                    </div>
                    <div className="exp-tags">{e.expertise.map(ex => <span key={ex} className="exp-tag">{ex}</span>)}</div>
                    <div className="exp-foot">
                      <div className="exp-rating">⭐ {e.rating} <span style={{color:"var(--muted)",fontWeight:400,fontSize:12}}>({e.reviews} {t.reviews})</span></div>
                      <div style={{textAlign:"right"}}>
                        <button className="btn-accent" style={{padding:"6px 16px",fontSize:13}}>{t.contact}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Login ────────────────────────────────────────────────────
function MemberDashboard({ user, cfoSubmissions, nav }) {
  const latest = (cfoSubmissions || [])[0];
  const approved = (cfoSubmissions || []).filter(item => item.status === "approved").length;
  return (
    <section className="section">
      <div className="container">
        <div style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"flex-start",marginBottom:28}}>
          <div>
            <span className="section-tag">● MEMBER WORKSPACE</span>
            <h1 className="section-title" style={{marginBottom:8}}>ระบบสมาชิก VERDIX</h1>
            <p className="section-sub">ยินดีต้อนรับ {user?.name || user?.email} - เริ่มกรอกแบบประเมิน CFO และติดตามสถานะการตรวจจากผู้ประเมินได้ที่นี่</p>
          </div>
          <button className="btn btn-dark" onClick={() => nav("cfo-assessment")}>+ กรอกแบบประเมิน CFO</button>
        </div>
        <div className="grid-3" style={{marginBottom:26}}>
          {[
            ["แบบประเมินทั้งหมด", (cfoSubmissions || []).length, "ฉบับ"],
            ["ผ่านการยืนยัน", approved, "ฉบับ"],
            ["สถานะล่าสุด", latest ? CFO_STATUS_LABELS[latest.status] || latest.status : "-", ""],
          ].map(([label, value, unit]) => (
            <div key={label} className="stat-card"><div>{label}</div><strong>{value}</strong><span>{unit}</span></div>
          ))}
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>วันที่ส่ง</th><th>องค์กร</th><th>ปีรายงาน</th><th>Total</th><th>Status</th><th>หมายเหตุผู้ตรวจ</th></tr></thead>
            <tbody>
              {(cfoSubmissions || []).length ? cfoSubmissions.map(item => (
                <tr key={item.id}>
                  <td>{new Date(item.created_at).toLocaleDateString("th-TH")}</td>
                  <td style={{fontWeight:700,color:"var(--g1)"}}>{item.organization_name || "-"}</td>
                  <td>{item.reporting_year || "-"}</td>
                  <td>{formatTon(item.result?.total)} tCO2eq</td>
                  <td><span className="badge">{CFO_STATUS_LABELS[item.status] || item.status}</span></td>
                  <td>{item.review_note || "-"}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{textAlign:"center",padding:28,color:"var(--muted)"}}>ยังไม่มีแบบประเมิน CFO</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CfoAssessmentPage({ user, nav, onSave }) {
  const [meta, setMeta] = useState({ organization_name: user?.name || "", reporting_year: String(new Date().getFullYear()), boundary: "องค์กรปกครองส่วนท้องถิ่น / หน่วยงาน" });
  const [rows, setRows] = useState(defaultCfoRows);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const result = calculateCfoAssessment(rows);
  const setRow = (key, field, value) => setRows(prev => ({ ...prev, [key]: { ...(prev[key] || {}), [field]: value } }));
  const submit = async (status = "submitted") => {
    setSaving(true);
    setMessage("");
    const saved = await onSave({
      user_email: user?.email,
      organization_name: meta.organization_name,
      reporting_year: meta.reporting_year,
      form_data: { meta, rows },
      result: { totals: result.totals, scope12: result.scope12, total: result.total, lines: result.lines },
      status,
    });
    setSaving(false);
    setMessage(status === "draft" ? "บันทึกร่างแล้ว" : "ส่งแบบประเมินให้ผู้ตรวจแล้ว");
    if (saved?.id && status !== "draft") setTimeout(() => nav("member"), 450);
  };
  if (!user) return <section className="section"><div className="container"><p>กรุณาเข้าสู่ระบบก่อนกรอกแบบประเมิน CFO</p></div></section>;
  return (
    <section className="section">
      <div className="container">
        <button className="back-btn" onClick={() => nav("member")}>← กลับระบบสมาชิก</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:24,marginBottom:26}}>
          <div>
            <span className="section-tag">● CFO ASSESSMENT</span>
            <h1 className="section-title" style={{marginBottom:8}}>แบบฟอร์มประเมิน CFO</h1>
            <p className="section-sub">คำนวณตามแนวคิดในไฟล์ Excel: Activity Data × Emission Factor ÷ 1000 = tonCO2eq แยก Scope 1, 2 และ 3</p>
          </div>
          <div style={{minWidth:260,background:"var(--g1)",color:"#fff",borderRadius:"var(--r-lg)",padding:20}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,.65)",marginBottom:6}}>Total GHG Emission</div>
            <div style={{fontSize:34,fontWeight:900,fontFamily:"'Playfair Display',serif",color:"var(--ga)"}}>{formatTon(result.total)}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>tCO2eq / ปี</div>
          </div>
        </div>
        <div className="tbl-wrap" style={{padding:22,marginBottom:20}}>
          <div className="form-row">
            <div className="form-grp"><label className="form-lbl">ชื่อองค์กร</label><input className="form-inp" value={meta.organization_name} onChange={e=>setMeta(p=>({...p,organization_name:e.target.value}))} /></div>
            <div className="form-grp"><label className="form-lbl">ปีที่เก็บข้อมูล</label><input className="form-inp" value={meta.reporting_year} onChange={e=>setMeta(p=>({...p,reporting_year:e.target.value}))} /></div>
          </div>
          <div className="form-grp"><label className="form-lbl">ขอบเขตองค์กร</label><input className="form-inp" value={meta.boundary} onChange={e=>setMeta(p=>({...p,boundary:e.target.value}))} /></div>
        </div>
        {CFO_ACTIVITY_GROUPS.map(group => (
          <div className="tbl-wrap" style={{marginBottom:22}} key={group.scope}>
            <div style={{padding:"18px 20px",borderBottom:"1px solid var(--border)",background:"var(--gll)"}}>
              <h3 style={{fontSize:18,color:"var(--g1)",marginBottom:4}}>{group.title}</h3>
              <div style={{fontSize:13,color:"var(--muted)"}}>{group.note}</div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table>
                <thead><tr><th>รายการ</th><th>หน่วย</th><th>ปริมาณรวมต่อปี</th><th>EF (kgCO2eq/unit)</th><th>ผลรวม</th><th>หลักฐาน/หมายเหตุ</th></tr></thead>
                <tbody>
                  {group.items.map(item => {
                    const row = rows[item.key] || {};
                    const line = result.lines.find(x => x.key === item.key);
                    return (
                      <tr key={item.key}>
                        <td><div style={{fontWeight:700,color:"var(--g1)"}}>{item.label}</div><div style={{fontSize:12,color:"var(--muted)"}}>{item.source}</div></td>
                        <td>{item.unit}</td>
                        <td><input className="form-inp" type="number" value={row.quantity ?? ""} onChange={e=>setRow(item.key,"quantity",e.target.value)} /></td>
                        <td><input className="form-inp" type="number" step="0.000001" value={row.ef ?? item.ef} onChange={e=>setRow(item.key,"ef",e.target.value)} /></td>
                        <td style={{fontWeight:800,color:"var(--g2)"}}>{formatTon(line?.emission)} tCO2eq</td>
                        <td><input className="form-inp" value={row.evidence || ""} placeholder="เลขที่บิล/ไฟล์หลักฐาน/หมายเหตุ" onChange={e=>setRow(item.key,"evidence",e.target.value)} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="grid-3" style={{marginBottom:22}}>
          {["scope1","scope2","scope3"].map(scope => (
            <div className="stat-card" key={scope}><div>{CFO_SCOPE_LABELS[scope]}</div><strong>{formatTon(result.totals[scope])}</strong><span>tCO2eq</span></div>
          ))}
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"flex-end",alignItems:"center"}}>
          {message && <span style={{color:"var(--g2)",fontWeight:700,marginRight:"auto"}}>{message}</span>}
          <button className="btn" onClick={() => submit("draft")} disabled={saving}>บันทึกร่าง</button>
          <button className="btn btn-dark" onClick={() => submit("submitted")} disabled={saving || !meta.organization_name}>ส่งให้ผู้ตรวจประเมิน</button>
        </div>
      </div>
    </section>
  );
}

function LoginPage({ t, nav, doLogin, doResendConfirmation, doPasswordReset, authBusy, authMessage }) {
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [showPass,setShowPass] = useState(false);
  const submit = () => doLogin(email, pass);
  const resendConfirmation = () => doResendConfirmation(email);
  const resetPassword = () => doPasswordReset(email);
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <BrandLogo className="auth-brand" />
        <h1>Verdify Your Journey</h1>
        <p>{langSafe(t.cta_sub, "Connect sustainability data, experts, and assessment workflows in one platform.")}</p>
        <div className="auth-points">
          <div className="auth-point"><span>✓</span>{t.exp_title}</div>
          <div className="auth-point"><span>✓</span>Eco-Factory, Carbon, ESG Workflow</div>
          <div className="auth-point"><span>✓</span>Assessment dashboard and expert review</div>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-card">
          <BrandLogo className="auth-brand" />
          <h2 className="auth-title">{t.login_title}</h2>
          <p className="auth-subtitle">{langSafe(t.welcome, "Welcome back to your BUUxC Planet C workspace.")}</p>
          <div className="form-grp">
            <label className="form-lbl">{t.email}</label>
            <input className="form-inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" />
          </div>
          <div className="form-grp">
            <label className="form-lbl">{t.password}</label>
            <div style={{position:"relative"}}>
              <input
                className="form-inp"
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={e=>setPass(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e=>e.key==="Enter"&&submit()}
                style={{paddingRight:46}}
              />
              <button
                type="button"
                aria-label={showPass ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                onClick={() => setShowPass(v => !v)}
                style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",width:30,height:30,border:0,borderRadius:8,background:"transparent",color:"var(--muted)",fontSize:18,lineHeight:1,display:"flex",alignItems:"center",justifyContent:"center"}}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>
          <button className="btn btn-dark" style={{width:"100%",padding:13,fontSize:16}} onClick={submit} disabled={authBusy}>{authBusy ? "Loading..." : t.login}</button>
          {authMessage && (
            <div className={`auth-message ${authMessage.type === "error" ? "error" : ""}`}>
              {authMessage.text}
              {authMessage.canResend && (
                <button
                  type="button"
                  className="link-btn"
                  style={{display:"block",marginTop:10,fontWeight:900}}
                  onClick={resendConfirmation}
                  disabled={authBusy}
                >
                  ส่งอีเมลยืนยันอีกครั้ง
                </button>
              )}
            </div>
          )}
          <p className="form-hint"><button onClick={resetPassword} disabled={authBusy}>ลืมรหัสผ่าน / ส่งลิงก์ตั้งรหัสใหม่</button></p>
          <p className="form-hint">{t.no_account} <button onClick={() => nav("register")}>{t.register}</button></p>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────
function ResetPasswordPage({ nav, doUpdatePassword, authBusy, authMessage }) {
  const [pass,setPass] = useState("");
  const [confirm,setConfirm] = useState("");
  const submit = () => doUpdatePassword(pass, confirm);
  return (
    <div className="auth-page">
      <div className="auth-panel" style={{margin:"0 auto"}}>
        <div className="auth-card">
          <BrandLogo className="auth-brand" />
          <h2 className="auth-title">ตั้งรหัสผ่านใหม่</h2>
          <p className="auth-subtitle">กรอกรหัสผ่านใหม่สำหรับบัญชีของคุณ</p>
          <div className="form-grp">
            <label className="form-lbl">รหัสผ่านใหม่</label>
            <input className="form-inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="อย่างน้อย 8 ตัวอักษร" />
          </div>
          <div className="form-grp">
            <label className="form-lbl">ยืนยันรหัสผ่านใหม่</label>
            <input className="form-inp" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="กรอกรหัสผ่านอีกครั้ง" onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          <button className="btn btn-dark" style={{width:"100%",padding:13,fontSize:16}} onClick={submit} disabled={authBusy}>{authBusy ? "Loading..." : "บันทึกรหัสผ่านใหม่"}</button>
          {authMessage && <div className={`auth-message ${authMessage.type === "error" ? "error" : ""}`}>{authMessage.text}</div>}
          <p className="form-hint"><button onClick={() => nav("login")}>กลับหน้าเข้าสู่ระบบ</button></p>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ t, nav, doRegister, authBusy, authMessage }) {
  const [f,setF] = useState({name:"",email:"",org:"",pass:""});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const submit = () => doRegister(f);
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <BrandLogo className="auth-brand" />
        <h1>Start Your Sustainability Workspace</h1>
        <p>{langSafe(t.cta_sub, "Create an account to begin assessments, connect experts, and organize your sustainability work.")}</p>
        <div className="auth-points">
          <div className="auth-point"><span>✓</span>Digital assessment checklist</div>
          <div className="auth-point"><span>✓</span>Expert matching workflow</div>
          <div className="auth-point"><span>✓</span>Carbon and ESG readiness tools</div>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-card">
          <BrandLogo className="auth-brand" />
          <h2 className="auth-title">{t.reg_title}</h2>
          <p className="auth-subtitle">{t.cta_sub}</p>
          {[["text","name",t.fullname,"ชื่อ-นามสกุล"],["email","email",t.email,"you@company.com"],["text","org",t.org,"บริษัท / องค์กร"],["password","pass",t.password,"••••••••"]].map(([type,k,lbl,ph]) => (
            <div className="form-grp" key={k}>
              <label className="form-lbl">{lbl}</label>
              <input className="form-inp" type={type} value={f[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} />
            </div>
          ))}
          <button className="btn btn-dark" style={{width:"100%",padding:13,fontSize:16}} onClick={submit} disabled={authBusy}>{authBusy ? "Loading..." : t.register}</button>
          {authMessage && <div className={`auth-message ${authMessage.type === "error" ? "error" : ""}`}>{authMessage.text}</div>}
          <p className="form-hint">{t.has_account} <button onClick={() => nav("login")}>{t.login}</button></p>
          </div>
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────
function AdminPanel({ t, lang, currentUser, articles, setArticles, documents, setDocuments, experts, setExperts, slides, setSlides, footer, setFooter, menus, setMenus, cfoSubmissions, onReviewCfo, tgiSurveyResponses, onSaveTgiSurvey, onImportTgiSurvey, onDeleteTgiSurvey, userRoles, onSaveUserRole, onDeleteUserRole, onSendPasswordSetup, sec, setSec }) {
  const [modal,setModal] = useState(null); // null | {type,item}
  const [form,setForm] = useState({});
  const [userForm,setUserForm] = useState({email:"",full_name:"",organization:"",role:"standard_user",status:"active",note:""});
  const isFullAdmin = isAdminRole(currentUser?.role);
  const isTgiViewerOnly = currentUser?.role === "tgi_report_viewer";
  const activeSec = isTgiViewerOnly ? "tgi-survey" : sec;

  useEffect(() => {
    if (isTgiViewerOnly && sec !== "tgi-survey") setSec("tgi-survey");
  }, [isTgiViewerOnly, sec, setSec]);

  const openModal = (type, item=null) => {
    setModal({type,item});
    const blank = {
      post: {title_th:"",title_en:"",excerpt_th:"",excerpt_en:"",category:"Net Zero",author:"",image:"📄",date:new Date().toISOString().split("T")[0]},
      document: {title_th:"",title_en:"",description_th:"",description_en:"",category:"Eco Factory",file_url:"",file_data_url:"",file_name:"",file_type:"PDF",file_size:0,version:"1.0",updated_at:new Date().toISOString().split("T")[0],downloads:0,active:true},
      expert: {name:"",name_th:"",title_th:"",title_en:"",expertise:[],location:"",rating:5.0,reviews:0,manday:10000,avatar:"👤"},
      slide: {title_th:"",title_en:"",kicker_th:"",kicker_en:"",subtitle_th:"",subtitle_en:"",primary_th:"เริ่มต้นใช้งาน",primary_en:"Get Started",primary_page:"register",secondary_th:"ค้นหาผู้เชี่ยวชาญ",secondary_en:"Find Experts",secondary_page:"experts",image:"https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1800&q=80",active:true}
    };
    blank.menu = {label_th:"",label_en:"",page:"home",parent_id:null,order:(menus || []).length + 1,active:true};
    setForm(item ? {...item} : blank[type]);
  };

  const saveModal = () => {
    if (modal.type==="post") {
      if (modal.item) setArticles(p => p.map(a => a.id===modal.item.id ? {...form,id:modal.item.id} : a));
      else setArticles(p => [...p, {...form,id:Date.now()}]);
    } else if (modal.type==="expert") {
      if (modal.item) setExperts(p => p.map(e => e.id===modal.item.id ? {...form,id:modal.item.id} : e));
      else setExperts(p => [...p, {...form,id:Date.now()}]);
    } else if (modal.type==="document") {
      const row = {...form, file_size:Number(form.file_size || 0), downloads:Number(form.downloads || 0), active:form.active !== false};
      if (modal.item) setDocuments(p => p.map(d => d.id===modal.item.id ? {...row,id:modal.item.id} : d));
      else setDocuments(p => [...p, {...row,id:Date.now()}]);
    } else if (modal.type==="menu") {
      const row = {...form, parent_id: form.parent_id ? Number(form.parent_id) : null, order: Number(form.order || 0), active: form.active !== false};
      if (modal.item) setMenus(p => p.map(m => m.id===modal.item.id ? {...row,id:modal.item.id} : m));
      else setMenus(p => [...p, {...row,id:Date.now()}]);
    } else {
      if (modal.item) setSlides(p => p.map(s => s.id===modal.item.id ? {...form,id:modal.item.id} : s));
      else setSlides(p => [...p, {...form,id:Date.now()}]);
    }
    setModal(null);
  };

  const del = (type,id) => {
    if (!window.confirm(t.confirm_del)) return;
    if (type==="post") setArticles(p => p.filter(a => a.id!==id));
    else if (type==="expert") setExperts(p => p.filter(e => e.id!==id));
    else if (type==="document") setDocuments(p => p.filter(d => d.id!==id));
    else if (type==="menu") setMenus(p => p.filter(m => m.id!==id && String(m.parent_id) !== String(id)));
    else setSlides(p => p.filter(s => s.id!==id));
  };

  const saveUserRole = async (payload) => {
    const cleanEmail = String(payload.email || "").trim().toLowerCase();
    if (!cleanEmail) {
      window.alert(lang==="th" ? "กรุณากรอกอีเมลผู้ใช้งาน" : "Please enter user email.");
      return;
    }

    await onSaveUserRole({
      ...payload,
      email: cleanEmail,
      full_name: payload.full_name || cleanEmail,
      role: payload.role || "standard_user",
      status: payload.status || "active",
    });
  };

  const addUserRole = async () => {
    await saveUserRole(userForm);
    setUserForm({email:"",full_name:"",organization:"",role:"standard_user",status:"active",note:""});
  };

  const updateUserRole = (row, key, value) => {
    saveUserRole({...row, [key]: value});
  };

  const copyUserInvite = async (row) => {
    const email = String(row?.email || "").trim().toLowerCase();
    if (!email) return;
    const message = lang === "th"
      ? `บัญชี ${email} ได้รับสิทธิ์ในระบบ VerdiX แล้ว\n\nกรุณาเข้า https://www.verdixgreen.com/ แล้วกด \"สมัครสมาชิก\" โดยใช้อีเมลนี้ จากนั้นตั้งรหัสผ่านของคุณเอง เมื่อสมัครเสร็จให้เข้าสู่ระบบได้ทันที`
      : `The account ${email} has been granted access to VerdiX.\n\nPlease visit https://www.verdixgreen.com/ and click "Register" using this email address, then set your own password. After registration, you can sign in immediately.`;
    try {
      await navigator.clipboard.writeText(message);
      window.alert(lang === "th" ? "คัดลอกข้อความเชิญแล้ว" : "Invitation message copied.");
    } catch {
      window.prompt(lang === "th" ? "คัดลอกข้อความนี้ส่งให้ผู้ใช้" : "Copy this message for the user", message);
    }
  };

  const handleSlideImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({
        ...f,
        image: reader.result,
        image_name: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const sides = [
    {id:"dashboard",icon:"📊",lbl:t.adm_dash},
    {id:"menus",icon:"☰",lbl:lang==="th"?"จัดการ Menu":"Manage Menu"},
    {id:"slides",icon:"🖼️",lbl:lang==="th"?"จัดการ Slide":"Manage Slides"},
    {id:"footer",icon:"🔗",lbl:lang==="th"?"จัดการ Footer":"Manage Footer"},
    {id:"cfo",icon:"🌡️",lbl:lang==="th"?"ตรวจ CFO":"CFO Review"},
    {id:"tgi-survey",icon:"📋",lbl:lang==="th"?"รายงาน TGI":"TGI Survey"},
    {id:"documents",icon:"📁",lbl:lang==="th"?"จัดการเอกสาร":"Download Manager"},
    {id:"posts",icon:"📝",lbl:t.adm_posts},
    {id:"experts",icon:"👥",lbl:t.adm_exp},
    {id:"users",icon:"👤",lbl:t.adm_users},
  ].filter(item => isFullAdmin || item.id === "tgi-survey");

  const setFooterField = (key, value) => setFooter(f => ({...f, [key]: value}));
  const encodePipeRows = (rows, keys) => (rows || []).map(row => keys.map(k => row[k] || "").join("|")).join("\n");
  const decodePipeRows = (value, keys) => value.split("\n").map(line => line.trim()).filter(Boolean).map(line => {
    const parts = line.split("|").map(x => x.trim());
    return keys.reduce((obj, key, i) => ({...obj, [key]: parts[i] || ""}), {});
  });
  const menuParents = (menus || []).filter(m => !m.parent_id).sort((a,b) => (a.order || 0) - (b.order || 0));
  const sortedMenus = (menus || []).slice().sort((a,b) => {
    const ap = a.parent_id ? 1 : 0;
    const bp = b.parent_id ? 1 : 0;
    if (ap !== bp) return ap - bp;
    return (a.order || 0) - (b.order || 0);
  });
  const menuName = (m) => lang === "th" ? (m.label_th || m.label_en) : (m.label_en || m.label_th);
  const handleDocumentFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({
        ...f,
        file_data_url: reader.result,
        file_name: file.name,
        file_type: (file.name.split(".").pop() || file.type || "FILE").toUpperCase(),
        file_size: file.size,
        updated_at: new Date().toISOString().split("T")[0]
      }));
    };
    reader.readAsDataURL(file);
  };
  const tgiSummary = summarizeTgiSurvey(tgiSurveyResponses || []);
  const addTgiSurveySample = () => {
    const community = window.prompt(lang==="th" ? "ชื่อชุมชน" : "Community", "");
    if (community === null) return;
    onSaveTgiSurvey({
      respondent_name: window.prompt(lang==="th" ? "ชื่อผู้ตอบ (ไม่บังคับ)" : "Respondent name (optional)", "") || "",
      community,
      organization: "TGI",
      overall_score: Number(window.prompt("Overall score 1-5", "4") || 0),
      awareness_score: Number(window.prompt("Awareness score 1-5", "4") || 0),
      participation_score: Number(window.prompt("Participation score 1-5", "4") || 0),
      behavior_score: Number(window.prompt("Behavior score 0-5", "3") || 0),
      csr_focus: window.prompt(lang==="th" ? "ด้าน CSR ที่สนใจ" : "CSR focus", "สิ่งแวดล้อม") || "",
      suggestion: window.prompt(lang==="th" ? "ข้อเสนอแนะ" : "Suggestion", "") || "",
    });
  };
  const importTgiCsv = () => {
    const text = window.prompt(
      lang==="th"
        ? "วาง CSV โดยใช้ header: respondent_name,tambon,village,community,organization,overall_score,awareness_score,participation_score,behavior_score,csr_focus,suggestion,created_at"
        : "Paste CSV with header: respondent_name,tambon,village,community,organization,overall_score,awareness_score,participation_score,behavior_score,csr_focus,suggestion,created_at",
      "respondent_name,tambon,village,community,organization,overall_score,awareness_score,participation_score,behavior_score,csr_focus,suggestion,created_at\n"
    );
    if (!text) return;
    const rows = parseTgiCsv(text);
    if (!rows.length) {
      window.alert(lang==="th" ? "ไม่พบข้อมูลใน CSV" : "No CSV rows found");
      return;
    }
    onImportTgiSurvey(rows);
  };
  const exportTgiCsv = () => {
    const csv = toTgiCsv(tgiSurveyResponses || []);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tgi-survey-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const printTgiReport = (mode, title) => {
    const currentTitle = document.title;
    const printClass = mode ? `print-tgi-${mode}` : "";
    document.title = `${title} ${new Date().toISOString().slice(0,10)}`;
    if (printClass) document.body.classList.add(printClass);
    window.print();
    setTimeout(() => {
      if (printClass) document.body.classList.remove(printClass);
      document.title = currentTitle;
    }, 500);
  };
  const exportTgiPdf = () => printTgiReport("executive", "TGI Executive Summary");
  const exportTgiFullPdf = () => printTgiReport("full", "TGI Full Report");
  const exportTgiRawPdf = () => printTgiReport("raw", "TGI Raw Data");
  const exportTgiSummaryCsv = () => {
    const lines = [
      ["section","label","value"],
      ["KPI","Responses",tgiSummary.total],
      ["KPI","Overall Satisfaction",tgiSummary.avgOverall.toFixed(2)],
      ["KPI","Environmental Awareness",tgiSummary.avgAwareness.toFixed(2)],
      ["KPI","Participation",tgiSummary.avgParticipation.toFixed(2)],
      ["KPI","Eco-friendly Behavior",tgiSummary.avgBehavior.toFixed(2)],
      ["KPI","Score Level",tgiSummary.scoreLevel],
      ["KPI","Top CSR Focus",tgiSummary.topFocus],
      ["KPI","Latest Response",tgiSummary.latestDate ? new Date(tgiSummary.latestDate).toLocaleDateString("th-TH") : "-"],
    ];
    tgiMetricRows.forEach(metric => {
      lines.push(["Key Indicator", metric.label, metric.value.toFixed(2)]);
    });
    (tgiSummary.topCommunityRows || []).forEach((item, index) => {
      lines.push(["Top Communities", `${index + 1}. ${item.label}`, item.count]);
    });
    (tgiSummary.topRecorderRows || []).forEach((item, index) => {
      lines.push(["Student Recorders", `${index + 1}. ${item.label}`, item.count]);
    });
    (tgiSummary.topFocusRows || []).forEach((item, index) => {
      lines.push(["CSR Focus", `${index + 1}. ${item.label}`, item.count]);
    });
    (tgiSummary.tambonRows || []).forEach((item) => {
      lines.push(["Subdistrict Tracking", `${item.tambon} (${item.villageText})`, `${item.collected}/${item.samples}`]);
    });
    (tgiSummary.villageRows || []).forEach((item) => {
      lines.push(["Village Tracking", `${item.tambon} หมู่ ${item.village}`, item.collected]);
    });
    (tgiSummary.studentRows || []).forEach((item) => {
      lines.push(["Student Recorder Tracking", item.name, item.collected]);
    });
    lines.push(["Student Recorder Tracking", "ไม่ระบุผู้บันทึก", tgiSummary.unknownRecorderCount]);
    const csv = lines.map(row => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tgi-executive-summary-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const tgiMetricRows = [
    { label: lang==="th"?"ความพึงพอใจภาพรวม":"Overall satisfaction", value: tgiSummary.avgOverall, note: lang==="th"?"ใช้สรุปภาพรวมรายงานผู้บริหาร":"Executive summary indicator" },
    { label: lang==="th"?"ความตระหนักด้านสิ่งแวดล้อม":"Environmental awareness", value: tgiSummary.avgAwareness, note: lang==="th"?"อ้างอิงส่วนที่ 9":"Based on Section 9" },
    { label: lang==="th"?"การมีส่วนร่วม":"Participation", value: tgiSummary.avgParticipation, note: lang==="th"?"อ้างอิงส่วนที่ 10":"Based on Section 10" },
    { label: lang==="th"?"พฤติกรรมเป็นมิตรต่อสิ่งแวดล้อม":"Eco-friendly behavior", value: tgiSummary.avgBehavior, note: lang==="th"?"อ้างอิงส่วนที่ 11":"Based on Section 11" },
  ];
  const tgiExecutiveBullets = [
    lang==="th"
      ? `มีข้อมูลแบบสอบถามทั้งหมด ${tgiSummary.total.toLocaleString("th-TH")} ชุด จากการเก็บข้อมูลชุมชนรอบพื้นที่ดำเนินงาน`
      : `${tgiSummary.total.toLocaleString()} survey responses have been collected from community engagement activities.`,
    lang==="th"
      ? `คะแนนความพึงพอใจภาพรวมเฉลี่ยอยู่ที่ ${tgiSummary.avgOverall.toFixed(2)} / 5 อยู่ในระดับ ${tgiSummary.scoreLevel}`
      : `Average overall satisfaction is ${tgiSummary.avgOverall.toFixed(2)} / 5, indicating ${tgiSummary.scoreLevel}.`,
    lang==="th"
      ? `ประเด็น CSR ที่ถูกเลือกมากสุดคือ ${tgiSummary.topFocus}`
      : `The most selected CSR focus is ${tgiSummary.topFocus}.`,
    lang==="th"
      ? `ชุมชนที่มีจำนวนคำตอบสูงสุดคือ ${tgiSummary.topCommunityRows[0]?.label || "-"}`
      : `The highest response volume is from ${tgiSummary.topCommunityRows[0]?.label || "-"}.`,
  ];

  return (
    <div className="admin-wrap">
      <aside className="admin-side">
        <div className="admin-brand">
          <BrandLogo className="admin-brand-mark" />
          <div className="admin-brand-sub">ADMIN PANEL</div>
        </div>
        <div className="side-section">{isTgiViewerOnly ? "REPORT" : "MENU"}</div>
        {sides.map(s => (
          <button key={s.id} className={`side-item ${activeSec===s.id?"active":""}`} onClick={() => setSec(s.id)}>
            <span style={{fontSize:16}}>{s.icon}</span> {s.lbl}
          </button>
        ))}
      </aside>

      <main className="admin-main">
        {/* Dashboard */}
        {activeSec==="dashboard" && (
          <>
            <div className="adm-title">{t.adm_dash}</div>
            <div className="adm-sub">{t.welcome}</div>
            <div className="adm-stats">
              {[["📝",articles.length,t.total_posts],["📁",(documents || []).length,lang==="th"?"เอกสาร":"Documents"],["👥",experts.length,t.total_exp],["🌿","18,500",t.total_co2]].map(([icon,n,l]) => (
                <div className="adm-stat" key={l}>
                  <div className="adm-stat-icon">{icon}</div>
                  <div className="adm-stat-n">{typeof n==="number"&&n>999?n.toLocaleString():n}</div>
                  <div className="adm-stat-l">{l}</div>
                </div>
              ))}
            </div>
            <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>{t.recent_posts}</h3>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{t.title_col}</th><th>{t.cat_col}</th><th>{t.date_col}</th></tr></thead>
                <tbody>
                  {articles.slice(0,5).map((a,i) => (
                    <tr key={a.id}><td>{i+1}</td><td style={{fontWeight:600,color:"var(--g1)"}}>{a.image} {a.title_th}</td><td><span className="badge">{a.category}</span></td><td>{a.date}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Menus */}
        {activeSec==="menus" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{lang==="th"?"จัดการ Main Menu / Sub Menu":"Manage Main Menu / Sub Menu"}</div>
                <div className="adm-sub">{(menus || []).length} menu items · {(menus || []).filter(m => m.active !== false).length} active</div>
              </div>
              <button className="btn btn-dark" onClick={() => openModal("menu")}>{lang==="th"?"+ เพิ่ม Menu":"+ Add Menu"}</button>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{lang==="th"?"ชื่อเมนู":"Menu Label"}</th><th>Type</th><th>Page</th><th>Order</th><th>Status</th><th>{t.actions_col}</th></tr></thead>
                <tbody>
                  {sortedMenus.map((m,i) => {
                    const parent = (menus || []).find(x => String(x.id) === String(m.parent_id));
                    return (
                      <tr key={m.id}>
                        <td style={{color:"var(--muted)"}}>{i+1}</td>
                        <td>
                          <div style={{fontWeight:700,color:"var(--g1)"}}>{m.parent_id && <span className="menu-indent" />}{menuName(m)}</div>
                          <div style={{fontSize:12,color:"var(--muted)"}}>{lang==="th" ? (m.label_en || "-") : (m.label_th || "-")}{parent ? ` · ${lang==="th"?"ใต้":"under"} ${menuName(parent)}` : ""}</div>
                        </td>
                        <td><span className={`menu-level ${m.parent_id?"sub":""}`}>{m.parent_id ? "Sub menu" : "Main menu"}</span></td>
                        <td>{m.page || "-"}</td>
                        <td>{m.order || 0}</td>
                        <td>
                          <button className="btn-sm" style={{background:m.active!==false?"#DCFCE7":"#F3F4F6",color:m.active!==false?"#166534":"#6B7280"}} onClick={() => setMenus(p => p.map(x => x.id===m.id ? {...x,active:x.active===false} : x))}>
                            {m.active!==false ? "Active" : "Hidden"}
                          </button>
                        </td>
                        <td><div className="tbl-actions"><button className="btn-sm btn-edit" onClick={() => openModal("menu",m)}>{t.edit}</button><button className="btn-sm btn-del" onClick={() => del("menu",m.id)}>{t.del}</button></div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Slides */}
        {activeSec==="slides" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{lang==="th"?"จัดการ Slide หน้าแรก":"Manage Homepage Slides"}</div>
                <div className="adm-sub">{slides.length} slides · {slides.filter(s => s.active !== false).length} active</div>
              </div>
              <button className="btn btn-dark" onClick={() => openModal("slide")}>{lang==="th"?"+ เพิ่ม Slide":"+ Add Slide"}</button>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{t.title_col}</th><th>CTA</th><th>Status</th><th>{t.actions_col}</th></tr></thead>
                <tbody>
                  {slides.map((s,i) => (
                    <tr key={s.id}>
                      <td style={{color:"var(--muted)"}}>{i+1}</td>
                      <td>
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          <div style={{width:74,height:46,borderRadius:8,backgroundImage:`url(${s.image})`,backgroundSize:"cover",backgroundPosition:"center",border:"1px solid var(--border)",flexShrink:0}} />
                          <div>
                            <div style={{fontWeight:600,color:"var(--g1)"}}>{lang==="th"?s.title_th:s.title_en}</div>
                            <div style={{fontSize:12,color:"var(--muted)"}}>{lang==="th"?s.kicker_th:s.kicker_en}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge">{lang==="th"?s.primary_th:s.primary_en}</span></td>
                      <td>
                        <button className="btn-sm" style={{background:s.active!==false?"#DCFCE7":"#F3F4F6",color:s.active!==false?"#166534":"#6B7280"}} onClick={() => setSlides(p => p.map(x => x.id===s.id ? {...x,active:x.active===false} : x))}>
                          {s.active!==false ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td><div className="tbl-actions"><button className="btn-sm btn-edit" onClick={() => openModal("slide",s)}>{t.edit}</button><button className="btn-sm btn-del" onClick={() => del("slide",s.id)}>{t.del}</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Footer */}
        {activeSec==="footer" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{lang==="th"?"จัดการ Footer":"Manage Footer"}</div>
                <div className="adm-sub">{lang==="th"?"ปรับ CTA, ลิงก์, บริการ, ช่องทางติดต่อ และข้อความด้านล่างเว็บไซต์":"Edit CTA, links, services, contact, and legal footer content"}</div>
              </div>
              <button className="btn btn-dark" onClick={() => setFooter(INIT_FOOTER)}>{lang==="th"?"คืนค่าเริ่มต้น":"Reset Default"}</button>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div className="tbl-wrap" style={{padding:20}}>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>CTA</h3>
                <div className="form-grp"><label className="form-lbl">CTA Title TH</label><input className="form-inp" value={footer.ctaTitle_th||""} onChange={e=>setFooterField("ctaTitle_th", e.target.value)} /></div>
                <div className="form-grp"><label className="form-lbl">CTA Title EN</label><input className="form-inp" value={footer.ctaTitle_en||""} onChange={e=>setFooterField("ctaTitle_en", e.target.value)} /></div>
                <div className="form-grp"><label className="form-lbl">CTA Subtitle TH</label><textarea className="form-inp" rows={3} value={footer.ctaSub_th||""} onChange={e=>setFooterField("ctaSub_th", e.target.value)} /></div>
                <div className="form-grp"><label className="form-lbl">CTA Subtitle EN</label><textarea className="form-inp" rows={3} value={footer.ctaSub_en||""} onChange={e=>setFooterField("ctaSub_en", e.target.value)} /></div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">Button TH</label><input className="form-inp" value={footer.ctaButton_th||""} onChange={e=>setFooterField("ctaButton_th", e.target.value)} /></div>
                  <div className="form-grp"><label className="form-lbl">Button EN</label><input className="form-inp" value={footer.ctaButton_en||""} onChange={e=>setFooterField("ctaButton_en", e.target.value)} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">CTA Page</label><input className="form-inp" value={footer.ctaPage||""} onChange={e=>setFooterField("ctaPage", e.target.value)} placeholder="register" /></div>
              </div>

              <div className="tbl-wrap" style={{padding:20}}>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>{lang==="th"?"แบรนด์และติดต่อ":"Brand & Contact"}</h3>
                <div className="form-grp"><label className="form-lbl">Description TH</label><textarea className="form-inp" rows={3} value={footer.description_th||""} onChange={e=>setFooterField("description_th", e.target.value)} /></div>
                <div className="form-grp"><label className="form-lbl">Description EN</label><textarea className="form-inp" rows={3} value={footer.description_en||""} onChange={e=>setFooterField("description_en", e.target.value)} /></div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{t.email}</label><input className="form-inp" value={footer.email||""} onChange={e=>setFooterField("email", e.target.value)} /></div>
                  <div className="form-grp"><label className="form-lbl">Email 2</label><input className="form-inp" value={footer.email2||""} onChange={e=>setFooterField("email2", e.target.value)} /></div>
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"โทรศัพท์":"Phone"}</label><input className="form-inp" value={footer.phone||""} onChange={e=>setFooterField("phone", e.target.value)} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">{t.location}</label><input className="form-inp" value={footer.location||""} onChange={e=>setFooterField("location", e.target.value)} /></div>
                <div className="form-grp"><label className="form-lbl">{lang==="th"?"ที่อยู่ 2":"Location 2"}</label><input className="form-inp" value={footer.location2||""} onChange={e=>setFooterField("location2", e.target.value)} /></div>
                <div className="form-grp"><label className="form-lbl">Copyright</label><input className="form-inp" value={footer.copyright||""} onChange={e=>setFooterField("copyright", e.target.value)} /></div>
              </div>
            </div>

            <div className="tbl-wrap" style={{padding:20,marginTop:18}}>
              <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>{lang==="th"?"ลิงก์และรายการ":"Links & Lists"}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18}}>
                <div className="form-grp">
                  <label className="form-lbl">Quick Links: label_th|label_en|page</label>
                  <textarea className="form-inp" rows={6} value={encodePipeRows(footer.quickLinks, ["label_th","label_en","page"])} onChange={e=>setFooterField("quickLinks", decodePipeRows(e.target.value, ["label_th","label_en","page"]))} />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Services: one per line</label>
                  <textarea className="form-inp" rows={6} value={(footer.services||[]).join("\n")} onChange={e=>setFooterField("services", e.target.value.split("\n").map(x=>x.trim()).filter(Boolean))} />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Socials: icon|label|url</label>
                  <textarea className="form-inp" rows={5} value={encodePipeRows(footer.socials, ["icon","label","url"])} onChange={e=>setFooterField("socials", decodePipeRows(e.target.value, ["icon","label","url"]))} />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Legal Links: label_th|label_en|page</label>
                  <textarea className="form-inp" rows={5} value={encodePipeRows(footer.legalLinks, ["label_th","label_en","page"])} onChange={e=>setFooterField("legalLinks", decodePipeRows(e.target.value, ["label_th","label_en","page"]))} />
                </div>
                <div className="form-grp" style={{gridColumn:"1 / -1"}}>
                  <label className="form-lbl">Partners: type|name|logo|url</label>
                  <textarea className="form-inp" rows={4} value={encodePipeRows(footer.partners, ["type","name","logo","url"])} onChange={e=>setFooterField("partners", decodePipeRows(e.target.value, ["type","name","logo","url"]))} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* CFO Review */}
        {activeSec==="cfo" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{lang==="th"?"ตรวจประเมิน CFO":"CFO Assessment Review"}</div>
                <div className="adm-sub">{(cfoSubmissions || []).length} submissions · {(cfoSubmissions || []).filter(x => x.status === "submitted").length} pending</div>
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr><th>วันที่ส่ง</th><th>สมาชิก / องค์กร</th><th>ปี</th><th>Scope 1</th><th>Scope 2</th><th>Scope 3</th><th>Total</th><th>Status</th><th>{t.actions_col}</th></tr>
                </thead>
                <tbody>
                  {(cfoSubmissions || []).length ? (cfoSubmissions || []).map(item => (
                    <tr key={item.id}>
                      <td>{new Date(item.created_at).toLocaleDateString("th-TH")}</td>
                      <td>
                        <div style={{fontWeight:700,color:"var(--g1)"}}>{item.organization_name || "-"}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>{item.user_email}</div>
                      </td>
                      <td>{item.reporting_year || "-"}</td>
                      <td>{formatTon(item.result?.totals?.scope1)}</td>
                      <td>{formatTon(item.result?.totals?.scope2)}</td>
                      <td>{formatTon(item.result?.totals?.scope3)}</td>
                      <td style={{fontWeight:800,color:"var(--g2)"}}>{formatTon(item.result?.total)} tCO2eq</td>
                      <td><span className="badge">{CFO_STATUS_LABELS[item.status] || item.status}</span></td>
                      <td>
                        <div className="tbl-actions">
                          <button className="btn-sm btn-edit" onClick={() => onReviewCfo(item.id, "approved", window.prompt("หมายเหตุผู้ตรวจ", item.review_note || "ตรวจสอบแล้ว ข้อมูลถูกต้อง") || "ตรวจสอบแล้ว ข้อมูลถูกต้อง")}>ยืนยันถูกต้อง</button>
                          <button className="btn-sm btn-del" onClick={() => onReviewCfo(item.id, "needs_revision", window.prompt("ระบุสิ่งที่ต้องแก้ไข", item.review_note || "") || "กรุณาตรวจสอบข้อมูลและหลักฐานอีกครั้ง")}>ส่งกลับแก้ไข</button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={9} style={{textAlign:"center",padding:28,color:"var(--muted)"}}>ยังไม่มีแบบประเมิน CFO ที่ส่งเข้ามา</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TGI Survey */}
        {activeSec==="tgi-survey" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{lang==="th"?"รายงานแบบสอบถามความพึงพอใจ TGI":"TGI Satisfaction Survey Report"}</div>
                <div className="adm-sub">
                  {(tgiSurveyResponses || []).length} responses · {isFullAdmin
                    ? (lang==="th"?"จัดเก็บ สรุปผล และส่งออกรายงาน":"store, summarize, and export survey data")
                    : (lang==="th"?"สิทธิ์ดูรายงานเท่านั้น":"read-only report access")}
                </div>
              </div>
              {isFullAdmin && (
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <button className="btn-ghost" onClick={importTgiCsv}>{lang==="th"?"นำเข้า CSV":"Import CSV"}</button>
                  <button className="btn btn-dark" onClick={addTgiSurveySample}>{lang==="th"?"+ เพิ่มข้อมูล":"+ Add Response"}</button>
                </div>
              )}
            </div>
            <div className="tgi-report-actions no-print">
              <div className="tgi-report-actions-title">{lang==="th"?"เลือกชุดรายงานที่ต้องการพิมพ์ / ส่งออก":"Choose report package to print / export"}</div>
              <div className="tgi-report-action-grid">
                <button className="btn btn-dark" onClick={exportTgiPdf}>{lang==="th"?"พิมพ์ Executive Summary (1 หน้า)":"Print Executive Summary (1 page)"}</button>
                <button className="btn-ghost" onClick={exportTgiFullPdf}>{lang==="th"?"พิมพ์รายงานเต็ม":"Print Full Report"}</button>
                <button className="btn-ghost" onClick={exportTgiRawPdf}>{lang==="th"?"พิมพ์ข้อมูลดิบ PDF":"Print Raw Data PDF"}</button>
                <button className="btn-ghost" onClick={exportTgiSummaryCsv}>{lang==="th"?"Export สรุป Excel (CSV)":"Export Summary Excel (CSV)"}</button>
                <button className="btn-ghost" onClick={exportTgiCsv}>{lang==="th"?"Export ข้อมูลดิบ Excel (CSV)":"Export Raw Excel (CSV)"}</button>
              </div>
            </div>
            <div className="tgi-report-print">
              <div className="tgi-report-hero tgi-exec-section">
                <div className="tgi-report-kicker">TGI Community Satisfaction Survey</div>
                <div className="tgi-report-title">{lang==="th"?"Executive Summary Dashboard":"Executive Summary Dashboard"}</div>
                <div className="tgi-report-meta">
                  {lang==="th"?"รายงานสรุปผลแบบสอบถามความพึงพอใจของชุมชนต่อกิจกรรม CSR และผลกระทบจากการดำเนินงานของบริษัท TGI (โรงแก้ว)":"Summary report of community satisfaction toward CSR activities and operational impacts of TGI."}
                  <br />
                  {lang==="th"?"วันที่จัดทำรายงาน":"Report date"}: {new Date().toLocaleDateString(lang==="th" ? "th-TH" : "en-US")} · {lang==="th"?"ข้อมูลล่าสุด":"Latest response"}: {tgiSummary.latestDate ? new Date(tgiSummary.latestDate).toLocaleDateString("th-TH") : "-"}
                </div>
                <div className="tgi-print-actions no-print">
                  <button className="tgi-print-btn" onClick={exportTgiPdf}>
                    {lang==="th"?"Executive Summary 1 หน้า":"Executive Summary 1 page"}
                  </button>
                  <button className="tgi-print-btn secondary" onClick={exportTgiSummaryCsv}>
                    {lang==="th"?"Export สรุป Excel":"Export Summary Excel"}
                  </button>
                </div>
              </div>

              <div className="adm-stats tgi-exec-section">
                {[
                  ["📋",tgiSummary.total,lang==="th"?"จำนวนคำตอบ":"Responses"],
                  ["⭐",tgiSummary.avgOverall.toFixed(2),lang==="th"?"ความพึงพอใจเฉลี่ย":"Avg Satisfaction"],
                  ["🌿",tgiSummary.avgAwareness.toFixed(2),lang==="th"?"ความตระหนักเฉลี่ย":"Avg Awareness"],
                  ["🎯",tgiSummary.topFocus,lang==="th"?"CSR ที่ถูกเลือกมากสุด":"Top CSR Focus"],
                ].map(([icon,n,l]) => (
                  <div className="adm-stat" key={l}>
                    <div className="adm-stat-icon">{icon}</div>
                    <div className="adm-stat-n" style={{fontSize:String(n).length > 12 ? 18 : 28}}>{n}</div>
                    <div className="adm-stat-l">{l}</div>
                  </div>
                ))}
              </div>

              <div className="tgi-executive-grid tgi-exec-section">
                <div className="tgi-panel">
                  <div className="tgi-panel-title">{lang==="th"?"Executive Summary":"Executive Summary"}</div>
                  <ul className="tgi-summary-list">
                    {tgiExecutiveBullets.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="tgi-panel">
                  <div className="tgi-panel-title">{lang==="th"?"คะแนนภาพรวม":"Overall Score"}</div>
                  <div className="tgi-score-ring" style={{"--score": Math.min(100, Math.max(0, tgiSummary.avgOverall / 5 * 100))}}>
                    <div className="tgi-score-ring-inner">
                      <div className="tgi-score-number">{tgiSummary.avgOverall.toFixed(2)}</div>
                      <div className="tgi-score-label">/ 5 · {tgiSummary.scoreLevel}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tgi-panel tgi-detail-section">
                <div className="tgi-panel-title">{lang==="th"?"คะแนนตัวชี้วัดหลัก":"Key Indicator Scores"}</div>
                <div className="tgi-bar-list">
                  {tgiMetricRows.map(metric => (
                    <div className="tgi-bar-row" key={metric.label}>
                      <div>{metric.label}</div>
                      <div className="tgi-bar-track"><div className="tgi-bar-fill" style={{width:`${Math.min(100, Math.max(0, metric.value / 5 * 100))}%`}} /></div>
                      <strong>{metric.value.toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tgi-dist-grid tgi-detail-section">
                {[
                  [lang==="th"?"ชุมชนที่ตอบมากสุด":"Top Communities", tgiSummary.topCommunityRows],
                  [lang==="th"?"นิสิตผู้บันทึก":"Student Recorders", tgiSummary.topRecorderRows],
                  [lang==="th"?"ประเด็น CSR ที่เลือก":"CSR Focus", tgiSummary.topFocusRows],
                ].map(([title, rows]) => (
                  <div className="tgi-panel" key={title}>
                    <div className="tgi-panel-title">{title}</div>
                    <div className="tgi-rank-list">
                      {(rows || []).length ? rows.map(item => (
                        <div className="tgi-rank-item" key={item.label}>
                          <span className="tgi-rank-label">{item.label}</span>
                          <span className="tgi-rank-count">{item.count}</span>
                        </div>
                      )) : <div style={{color:"var(--muted)",fontSize:13}}>{lang==="th"?"ยังไม่มีข้อมูล":"No data"}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="tgi-panel tgi-detail-section">
                <div className="tgi-panel-title">{lang==="th"?"แผนการเก็บข้อมูลภาคสนาม":"Field Data Collection Plan"}</div>
                <div className="tgi-field-kpis">
                  {[
                    [lang==="th"?"พื้นที่ศึกษา":"Study Area", TGI_FIELD_PLAN.areaCount, lang==="th"?"ตำบล":"subdistricts"],
                    [lang==="th"?"จำนวนหมู่":"Villages", TGI_FIELD_PLAN.villageCount, lang==="th"?"หมู่":"villages"],
                    [lang==="th"?"ครัวเรือนประมาณการ":"Estimated Households", TGI_FIELD_PLAN.householdCount.toLocaleString("th-TH"), lang==="th"?"ครัวเรือน":"households"],
                    [lang==="th"?"กลุ่มตัวอย่างรวม":"Total Samples", TGI_FIELD_PLAN.sampleCount.toLocaleString("th-TH"), lang==="th"?"ราย":"responses"],
                    [lang==="th"?"นิสิตลงพื้นที่":"Field Students", TGI_FIELD_PLAN.studentCount, lang==="th"?"คน":"students"],
                  ].map(([label, value, unit]) => (
                    <div className="tgi-field-kpi" key={label}>
                      <div className="tgi-field-kpi-label">{label}</div>
                      <div className="tgi-field-kpi-value">{value}</div>
                      <div className="tgi-field-kpi-unit">{unit}</div>
                    </div>
                  ))}
                </div>
                <div className="tbl-wrap" style={{boxShadow:"none",borderRadius:12,marginBottom:12}}>
                  <table>
                    <thead>
                      <tr>
                        <th>{lang==="th"?"ลำดับ":"No."}</th>
                        <th>{lang==="th"?"ตำบล":"Subdistrict"}</th>
                        <th>{lang==="th"?"จำนวนหมู่":"Villages"}</th>
                        <th>{lang==="th"?"ครัวเรือน (ประมาณการ)":"Households"}</th>
                        <th>{lang==="th"?"สัดส่วน (%)":"Ratio"}</th>
                        <th>{lang==="th"?"ตัวอย่าง (ราย)":"Samples"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TGI_FIELD_PLAN.rows.map(row => (
                        <tr key={row.order}>
                          <td>{row.order}</td>
                          <td style={{fontWeight:800,color:"var(--g1)"}}>{row.tambon} ({row.villageText})</td>
                          <td>{row.villages}</td>
                          <td>{row.households.toLocaleString("th-TH")}</td>
                          <td>{row.ratio}</td>
                          <td style={{fontWeight:900,color:"#1D4ED8"}}>{row.samples}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} style={{fontWeight:900,color:"var(--g1)"}}>{lang==="th"?"รวม":"Total"}</td>
                        <td style={{fontWeight:900}}>{TGI_FIELD_PLAN.villageCount}</td>
                        <td style={{fontWeight:900}}>{TGI_FIELD_PLAN.householdCount.toLocaleString("th-TH")}</td>
                        <td style={{fontWeight:900}}>100.0%</td>
                        <td style={{fontWeight:900,color:"#1D4ED8"}}>{TGI_FIELD_PLAN.sampleCount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tgi-schedule-list">
                  {TGI_FIELD_PLAN.schedules.map(item => (
                    <span className="tgi-schedule-pill" key={item.date}>
                      {item.date}: {item.students} {lang==="th"?"คน":"students"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="tgi-panel tgi-detail-section">
                <div className="tgi-panel-title">{lang==="th"?"ติดตามจำนวนคำตอบจริงตามตำบลและหมู่":"Actual Response Tracking by Subdistrict and Village"}</div>
                <div className="tbl-wrap" style={{boxShadow:"none",borderRadius:12,marginBottom:12}}>
                  <table>
                    <thead>
                      <tr>
                        <th>{lang==="th"?"ตำบล":"Subdistrict"}</th>
                        <th>{lang==="th"?"จำนวนหมู่":"Villages"}</th>
                        <th>{lang==="th"?"เป้าหมาย (ราย)":"Target"}</th>
                        <th>{lang==="th"?"เก็บแล้ว (ราย)":"Collected"}</th>
                        <th>{lang==="th"?"คงเหลือ":"Remaining"}</th>
                        <th>{lang==="th"?"ความคืบหน้า":"Progress"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tgiSummary.tambonRows.map(row => (
                        <tr key={row.tambon}>
                          <td style={{fontWeight:900,color:"var(--g1)"}}>{row.tambon} ({row.villageText})</td>
                          <td>{row.villages}</td>
                          <td>{row.samples}</td>
                          <td style={{fontWeight:900,color:"#047857"}}>{row.collected}</td>
                          <td>{row.remaining}</td>
                          <td>
                            <div className="tgi-bar-track" style={{minWidth:120}}><div className="tgi-bar-fill" style={{width:`${row.progress}%`}} /></div>
                            <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>{row.progress.toFixed(1)}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tbl-wrap" style={{boxShadow:"none",borderRadius:12}}>
                  <table>
                    <thead>
                      <tr>
                        <th>{lang==="th"?"ตำบล":"Subdistrict"}</th>
                        <th>{lang==="th"?"หมู่":"Village"}</th>
                        <th>{lang==="th"?"คำตอบที่เก็บได้ (ราย)":"Collected Responses"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tgiSummary.villageRows.map(row => (
                        <tr key={`${row.tambon}-${row.village}`}>
                          <td>{row.tambon}</td>
                          <td>หมู่ {row.village}</td>
                          <td style={{fontWeight:900,color:"#1D4ED8"}}>{row.collected}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="tgi-panel tgi-detail-section">
                <div className="tgi-panel-title">{lang==="th"?"ติดตามผู้บันทึกแบบสอบถาม":"Student Recorder Tracking"}</div>
                {tgiSummary.unknownRecorderCount > 0 && (
                  <div className="survey-message error" style={{marginBottom:12}}>
                    {lang==="th"
                      ? `พบข้อมูล ${tgiSummary.unknownRecorderCount} ชุดที่ยังไม่ระบุรายชื่อนิสิตผู้บันทึก กรุณาตรวจสอบเพื่อป้องกัน error ของข้อมูล`
                      : `${tgiSummary.unknownRecorderCount} responses have no student recorder. Please review data quality.`}
                  </div>
                )}
                <div className="tbl-wrap" style={{boxShadow:"none",borderRadius:12}}>
                  <table>
                    <thead>
                      <tr>
                        <th>{lang==="th"?"รายชื่อนิสิต":"Student"}</th>
                        <th>{lang==="th"?"จำนวนแบบสอบถามที่บันทึก":"Recorded Responses"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tgiSummary.studentRows.map(row => (
                        <tr key={row.name}>
                          <td style={{fontWeight:800,color:"var(--g1)"}}>{row.name}</td>
                          <td style={{fontWeight:900,color:"#047857"}}>{row.collected}</td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{fontWeight:900,color:"#991B1B"}}>{lang==="th"?"ไม่ระบุผู้บันทึก":"Unspecified recorder"}</td>
                        <td style={{fontWeight:900,color:"#991B1B"}}>{tgiSummary.unknownRecorderCount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="tbl-wrap tgi-detail-section" style={{marginBottom:18}}>
                <table>
                  <thead>
                    <tr>
                      <th>{lang==="th"?"ตัวชี้วัด":"Metric"}</th>
                      <th>{lang==="th"?"ค่าเฉลี่ย":"Average"}</th>
                      <th>{lang==="th"?"หมายเหตุ":"Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tgiMetricRows.map(metric => (
                      <tr key={metric.label}>
                        <td>{metric.label}</td>
                        <td>{metric.value.toFixed(2)} / 5</td>
                        <td>{metric.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="tbl-wrap tgi-raw-section">
                <table>
                  <thead>
                    <tr>
                      <th>{lang==="th"?"วันที่":"Date"}</th>
                      <th>{lang==="th"?"นิสิตผู้บันทึก":"Recorder"}</th>
                      <th>{lang==="th"?"ตำบล":"Subdistrict"}</th>
                      <th>{lang==="th"?"หมู่":"Village"}</th>
                      <th>{lang==="th"?"ผู้ตอบ / ชุมชน":"Respondent / Community"}</th>
                      <th>{lang==="th"?"ภาพรวม":"Overall"}</th>
                      <th>{lang==="th"?"ตระหนัก":"Awareness"}</th>
                      <th>{lang==="th"?"มีส่วนร่วม":"Participation"}</th>
                      <th>{lang==="th"?"พฤติกรรม":"Behavior"}</th>
                      <th>{lang==="th"?"CSR Focus":"CSR Focus"}</th>
                      <th>{lang==="th"?"ข้อเสนอแนะ":"Suggestion"}</th>
                      {isFullAdmin && <th>{t.actions_col}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {(tgiSurveyResponses || []).length ? (tgiSurveyResponses || []).map(row => (
                      <tr key={row.id}>
                        <td>{row.created_at ? new Date(row.created_at).toLocaleDateString("th-TH") : "-"}</td>
                        <td>{tgiRecorderName(row)}</td>
                        <td>{tgiTambonName(row)}</td>
                        <td>{tgiVillageNo(row) ? `หมู่ ${tgiVillageNo(row)}` : "-"}</td>
                        <td>
                          <div style={{fontWeight:700,color:"var(--g1)"}}>{row.respondent_name || "-"}</div>
                          <div style={{fontSize:12,color:"var(--muted)"}}>{row.community || "-"}</div>
                        </td>
                        <td>{Number(row.overall_score || 0).toFixed(1)}</td>
                        <td>{Number(row.awareness_score || 0).toFixed(1)}</td>
                        <td>{Number(row.participation_score || 0).toFixed(1)}</td>
                        <td>{Number(row.behavior_score || 0).toFixed(1)}</td>
                        <td><span className="badge">{row.csr_focus || "-"}</span></td>
                        <td style={{maxWidth:260,whiteSpace:"normal",lineHeight:1.55}}>{row.suggestion || "-"}</td>
                        {isFullAdmin && <td><button className="btn-sm btn-del" onClick={() => onDeleteTgiSurvey(row.id)}>{t.del}</button></td>}
                      </tr>
                    )) : (
                      <tr><td colSpan={isFullAdmin ? 12 : 11} style={{textAlign:"center",padding:28,color:"var(--muted)"}}>{lang==="th"?"ยังไม่มีข้อมูลแบบสอบถาม TGI":"No TGI survey data yet."}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Documents */}
        {activeSec==="documents" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{lang==="th"?"Download Manager":"Download Manager"}</div>
                <div className="adm-sub">{(documents || []).length} documents · {(documents || []).filter(d => d.active !== false).length} active</div>
              </div>
              <button className="btn btn-dark" onClick={() => openModal("document")}>{lang==="th"?"+ เพิ่มเอกสาร":"+ Add Document"}</button>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{lang==="th"?"เอกสาร":"Document"}</th><th>{t.category}</th><th>File</th><th>Updated</th><th>Status</th><th>{t.actions_col}</th></tr></thead>
                <tbody>
                  {(documents || []).map((d,i) => (
                    <tr key={d.id}>
                      <td style={{color:"var(--muted)"}}>{i+1}</td>
                      <td>
                        <div style={{fontWeight:700,color:"var(--g1)"}}>{lang==="th" ? d.title_th : d.title_en}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>{d.description_th || d.description_en}</div>
                      </td>
                      <td><span className="badge">{d.category}</span></td>
                      <td>
                        <div style={{fontWeight:600}}>{d.file_name || "-"}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>{d.file_type || "FILE"} · {formatDocSize(d.file_size)}</div>
                      </td>
                      <td>{d.updated_at || "-"}</td>
                      <td>
                        <button className="btn-sm" style={{background:d.active!==false?"#DCFCE7":"#F3F4F6",color:d.active!==false?"#166534":"#6B7280"}} onClick={() => setDocuments(p => p.map(x => x.id===d.id ? {...x,active:x.active===false} : x))}>
                          {d.active!==false ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td>
                        <div className="tbl-actions">
                          <a className="btn-sm btn-edit" href={docHref(d)} download={d.file_data_url ? (d.file_name || true) : undefined} target={d.file_data_url ? undefined : "_blank"} rel="noreferrer" style={{textDecoration:"none",opacity:docHref(d)==="#" ? .45 : 1}}>Test</a>
                          <button className="btn-sm btn-edit" onClick={() => openModal("document",d)}>{t.edit}</button>
                          <button className="btn-sm btn-del" onClick={() => del("document",d.id)}>{t.del}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Posts */}
        {activeSec==="posts" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{t.adm_posts}</div>
                <div className="adm-sub">{articles.length} {t.total_posts}</div>
              </div>
              <button className="btn btn-dark" onClick={() => openModal("post")}>{t.add_post}</button>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{t.title_col}</th><th>{t.cat_col}</th><th>{t.author_col}</th><th>{t.date_col}</th><th>{t.actions_col}</th></tr></thead>
                <tbody>
                  {articles.map((a,i) => (
                    <tr key={a.id}>
                      <td style={{color:"var(--muted)"}}>{i+1}</td>
                      <td><div style={{fontWeight:600,color:"var(--g1)"}}>{a.image} {a.title_th}</div><div style={{fontSize:12,color:"var(--muted)"}}>{a.title_en}</div></td>
                      <td><span className="badge">{a.category}</span></td>
                      <td>{a.author}</td>
                      <td>{a.date}</td>
                      <td><div className="tbl-actions"><button className="btn-sm btn-edit" onClick={() => openModal("post",a)}>{t.edit}</button><button className="btn-sm btn-del" onClick={() => del("post",a.id)}>{t.del}</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Experts */}
        {activeSec==="experts" && (
          <>
            <div className="adm-toolbar">
              <div>
                <div className="adm-title">{t.adm_exp}</div>
                <div className="adm-sub">{experts.length} {t.total_exp}</div>
              </div>
              <button className="btn btn-dark" onClick={() => openModal("expert")}>{t.add_exp}</button>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{t.name_col}</th><th>{t.expertise_col}</th><th>{t.loc_col}</th><th>{t.rating_col}</th><th>{t.actions_col}</th></tr></thead>
                <tbody>
                  {experts.map((e,i) => (
                    <tr key={e.id}>
                      <td style={{color:"var(--muted)"}}>{i+1}</td>
                      <td><div style={{fontWeight:600}}>{e.avatar} {e.name_th}</div><div style={{fontSize:12,color:"var(--muted)"}}>{e.name}</div></td>
                      <td><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{(e.expertise||[]).map(x => <span key={x} className="exp-tag">{x}</span>)}</div></td>
                      <td>{e.location}</td>
                      <td>⭐ {e.rating}</td>
                      <td><div className="tbl-actions"><button className="btn-sm btn-edit" onClick={() => openModal("expert",e)}>{t.edit}</button><button className="btn-sm btn-del" onClick={() => del("expert",e.id)}>{t.del}</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Users */}
        {activeSec==="users" && (
          <>
            <div className="adm-title">{t.adm_users}</div>
            <div className="adm-sub" style={{marginBottom:20}}>
              {lang==="th"
                ? "เพิ่มผู้ใช้งานและกำหนดสิทธิ์การใช้งานในระบบ"
                : "Add users and assign system access roles."}
            </div>
            <div className="card" style={{padding:18,marginBottom:18,borderRadius:12}}>
              <div className="form-row">
                <div className="form-grp">
                  <label className="form-lbl">{t.email}</label>
                  <input className="form-inp" type="email" value={userForm.email} onChange={e=>setUserForm(f=>({...f,email:e.target.value}))} placeholder="user@company.com" />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">{t.name_col}</label>
                  <input className="form-inp" value={userForm.full_name} onChange={e=>setUserForm(f=>({...f,full_name:e.target.value}))} placeholder={lang==="th"?"ชื่อผู้ใช้งาน":"User name"} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-grp">
                  <label className="form-lbl">{lang==="th"?"องค์กร":"Organization"}</label>
                  <input className="form-inp" value={userForm.organization} onChange={e=>setUserForm(f=>({...f,organization:e.target.value}))} placeholder={lang==="th"?"บริษัท / หน่วยงาน":"Company / organization"} />
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Role</label>
                  <select className="form-inp" value={userForm.role} onChange={e=>setUserForm(f=>({...f,role:e.target.value}))}>
                    {USER_ROLE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-grp">
                  <label className="form-lbl">Status</label>
                  <select className="form-inp" value={userForm.status} onChange={e=>setUserForm(f=>({...f,status:e.target.value}))}>
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div className="form-grp">
                  <label className="form-lbl">{lang==="th"?"หมายเหตุ":"Note"}</label>
                  <input className="form-inp" value={userForm.note} onChange={e=>setUserForm(f=>({...f,note:e.target.value}))} />
                </div>
              </div>
              <button className="btn btn-dark" onClick={addUserRole}>{lang==="th"?"เพิ่ม / บันทึกผู้ใช้งาน":"Add / Save User"}</button>
              <div className="form-hint" style={{marginTop:12,textAlign:"left"}}>
                {lang==="th"
                  ? "หมายเหตุ: ฟอร์มนี้กำหนดสิทธิ์ในระบบ VerdiX เท่านั้น ไม่ได้สร้างบัญชี Auth หรือกำหนดรหัสผ่านแทนผู้ใช้ ผู้ใช้ต้องสมัคร/ตั้งรหัสผ่านเอง หรือใช้ปุ่มส่งลิงก์ตั้งรหัสผ่านถ้าบัญชี Auth มีอยู่แล้ว"
                  : "Note: This assigns VerdiX roles only. It does not create an Auth account or set a user's password. Users must register/set their own password, or use the reset-link button if the Auth account already exists."}
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{t.name_col}</th><th>{t.email}</th><th>{lang==="th"?"องค์กร":"Organization"}</th><th>Role</th><th>Status</th><th>{lang==="th"?"จัดการ":"Action"}</th></tr></thead>
                <tbody>
                  {(userRoles || []).map((u,i) => (
                    <tr key={u.id || u.email}>
                      <td>{i+1}</td>
                      <td style={{fontWeight:600}}>{u.full_name || "-"}</td>
                      <td>{u.email}</td>
                      <td>{u.organization || "-"}</td>
                      <td>
                        <select className="form-inp" value={u.role || "standard_user"} onChange={e=>updateUserRole(u,"role",e.target.value)}>
                          {USER_ROLE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </td>
                      <td>
                        <select className="form-inp" value={u.status || "active"} onChange={e=>updateUserRole(u,"status",e.target.value)}>
                          <option value="active">Active</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </td>
                      <td>
                        <div className="tbl-actions">
                          <button className="btn-sm btn-edit" onClick={() => onSendPasswordSetup(u.email)}>{lang==="th"?"ส่งลิงก์ตั้งรหัส":"Send reset"}</button>
                          <button className="btn-sm" onClick={() => copyUserInvite(u)}>{lang==="th"?"คัดลอกคำเชิญ":"Copy invite"}</button>
                          <button className="btn-sm btn-del" onClick={() => onDeleteUserRole(u)}>{t.del}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!(userRoles || []).length && (
                    <tr><td colSpan="7" style={{textAlign:"center",color:"var(--muted)",padding:28}}>
                      {lang==="th"?"ยังไม่มีข้อมูลผู้ใช้งาน":"No user role records yet."}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setModal(null)}>
          <div className="modal">
            <h3 className="modal-title">
              {modal.item ? `${t.edit}` : (modal.type==="post" ? t.add_post : modal.type==="document" ? (lang==="th"?"+ เพิ่มเอกสาร":"+ Add Document") : t.add_exp)}
              {" "}{modal.type==="post" ? (lang==="th"?"บทความ":"Post") : modal.type==="document" ? (lang==="th"?"เอกสาร":"Document") : modal.type==="expert" ? (lang==="th"?"ผู้เชี่ยวชาญ":"Expert") : (lang==="th"?"Slide":"Slide")}
            </h3>
            {modal.type==="post" ? (
              <>
                <div className="form-grp"><label className="form-lbl">{t.t_th}</label><input className="form-inp" value={form.title_th||""} onChange={e=>setForm(f=>({...f,title_th:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">{t.t_en}</label><input className="form-inp" value={form.title_en||""} onChange={e=>setForm(f=>({...f,title_en:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">{t.ex_th}</label><textarea className="form-inp" rows={3} value={form.excerpt_th||""} onChange={e=>setForm(f=>({...f,excerpt_th:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">{t.ex_en}</label><textarea className="form-inp" rows={3} value={form.excerpt_en||""} onChange={e=>setForm(f=>({...f,excerpt_en:e.target.value}))} /></div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{t.category}</label>
                    <select className="form-inp" value={form.category||"Net Zero"} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                      {CATS.map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-grp"><label className="form-lbl">{t.author}</label><input className="form-inp" value={form.author||""} onChange={e=>setForm(f=>({...f,author:e.target.value}))} /></div>
                </div>
              </>
            ) : modal.type==="document" ? (
              <>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">Title TH</label><input className="form-inp" value={form.title_th||""} onChange={e=>setForm(f=>({...f,title_th:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">Title EN</label><input className="form-inp" value={form.title_en||""} onChange={e=>setForm(f=>({...f,title_en:e.target.value}))} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">Description TH</label><textarea className="form-inp" rows={3} value={form.description_th||""} onChange={e=>setForm(f=>({...f,description_th:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">Description EN</label><textarea className="form-inp" rows={3} value={form.description_en||""} onChange={e=>setForm(f=>({...f,description_en:e.target.value}))} /></div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{t.category}</label>
                    <select className="form-inp" value={form.category||"Eco Factory"} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                      {DOC_CATEGORIES.filter(c => c !== "All").map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-grp"><label className="form-lbl">Version</label><input className="form-inp" value={form.version||""} onChange={e=>setForm(f=>({...f,version:e.target.value}))} /></div>
                </div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">File Type</label><input className="form-inp" value={form.file_type||""} onChange={e=>setForm(f=>({...f,file_type:e.target.value}))} placeholder="PDF, XLSX, DOCX" /></div>
                  <div className="form-grp"><label className="form-lbl">Updated Date</label><input className="form-inp" type="date" value={form.updated_at||""} onChange={e=>setForm(f=>({...f,updated_at:e.target.value}))} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">{lang==="th"?"อัปโหลดไฟล์เอกสาร":"Upload document file"}</label><input className="form-inp" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.zip" onChange={e=>handleDocumentFile(e.target.files?.[0])} /></div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">File Name</label><input className="form-inp" value={form.file_name||""} onChange={e=>setForm(f=>({...f,file_name:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">File Size (bytes)</label><input className="form-inp" type="number" value={form.file_size||0} onChange={e=>setForm(f=>({...f,file_size:e.target.value}))} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">{lang==="th"?"หรือใส่ URL ไฟล์ภายนอก":"Or external file URL"}</label><input className="form-inp" value={form.file_url||""} onChange={e=>setForm(f=>({...f,file_url:e.target.value,file_data_url:f.file_data_url||""}))} placeholder="https://..." /></div>
                <label style={{display:"flex",alignItems:"center",gap:10,fontSize:14,fontWeight:600,color:"var(--g1)",marginTop:4}}>
                  <input type="checkbox" checked={form.active!==false} onChange={e=>setForm(f=>({...f,active:e.target.checked}))} />
                  {lang==="th"?"แสดงเอกสารนี้บนหน้า Download":"Show this document"}
                </label>
              </>
            ) : modal.type==="expert" ? (
              <>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{t.n_th}</label><input className="form-inp" value={form.name_th||""} onChange={e=>setForm(f=>({...f,name_th:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">{t.n_en}</label><input className="form-inp" value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">{t.pos_th}</label><input className="form-inp" value={form.title_th||""} onChange={e=>setForm(f=>({...f,title_th:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">{t.pos_en}</label><input className="form-inp" value={form.title_en||""} onChange={e=>setForm(f=>({...f,title_en:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">{t.location}</label><input className="form-inp" value={form.location||""} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
              </>
            ) : modal.type==="menu" ? (
              <>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">Label TH</label><input className="form-inp" value={form.label_th||""} onChange={e=>setForm(f=>({...f,label_th:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">Label EN</label><input className="form-inp" value={form.label_en||""} onChange={e=>setForm(f=>({...f,label_en:e.target.value}))} /></div>
                </div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">Page Key</label><input className="form-inp" value={form.page||""} onChange={e=>setForm(f=>({...f,page:e.target.value}))} placeholder="home, carbon, blog" /></div>
                  <div className="form-grp"><label className="form-lbl">Order</label><input className="form-inp" type="number" value={form.order||0} onChange={e=>setForm(f=>({...f,order:e.target.value}))} /></div>
                </div>
                <div className="form-grp">
                  <label className="form-lbl">{lang==="th"?"อยู่ใต้เมนูหลัก":"Parent Menu"}</label>
                  <select className="form-inp" value={form.parent_id || ""} onChange={e=>setForm(f=>({...f,parent_id:e.target.value || null}))}>
                    <option value="">{lang==="th"?"เป็น Main Menu":"Main Menu"}</option>
                    {menuParents.filter(m => m.id !== modal.item?.id).map(m => <option key={m.id} value={m.id}>{menuName(m)}</option>)}
                  </select>
                </div>
                <label style={{display:"flex",alignItems:"center",gap:10,fontSize:14,fontWeight:600,color:"var(--g1)",marginTop:4}}>
                  <input type="checkbox" checked={form.active!==false} onChange={e=>setForm(f=>({...f,active:e.target.checked}))} />
                  {lang==="th"?"เปิดใช้งานเมนูนี้":"Show this menu"}
                </label>
              </>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"หัวข้อ Slide (ไทย)":"Slide title (TH)"}</label><input className="form-inp" value={form.title_th||""} onChange={e=>setForm(f=>({...f,title_th:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"หัวข้อ Slide (อังกฤษ)":"Slide title (EN)"}</label><input className="form-inp" value={form.title_en||""} onChange={e=>setForm(f=>({...f,title_en:e.target.value}))} /></div>
                </div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"คำโปรย (ไทย)":"Kicker (TH)"}</label><input className="form-inp" value={form.kicker_th||""} onChange={e=>setForm(f=>({...f,kicker_th:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"คำโปรย (อังกฤษ)":"Kicker (EN)"}</label><input className="form-inp" value={form.kicker_en||""} onChange={e=>setForm(f=>({...f,kicker_en:e.target.value}))} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">{lang==="th"?"รายละเอียด (ไทย)":"Subtitle (TH)"}</label><textarea className="form-inp" rows={3} value={form.subtitle_th||""} onChange={e=>setForm(f=>({...f,subtitle_th:e.target.value}))} /></div>
                <div className="form-grp"><label className="form-lbl">{lang==="th"?"รายละเอียด (อังกฤษ)":"Subtitle (EN)"}</label><textarea className="form-inp" rows={3} value={form.subtitle_en||""} onChange={e=>setForm(f=>({...f,subtitle_en:e.target.value}))} /></div>
                <div className="form-grp">
                  <label className="form-lbl">{lang==="th"?"รูปภาพพื้นหลัง Slide":"Slide background image"}</label>
                  <input className="form-inp" value={form.image||""} onChange={e=>setForm(f=>({...f,image:e.target.value}))} placeholder={lang==="th"?"วาง URL รูป หรือเลือกไฟล์ด้านล่าง":"Paste image URL or choose a file below"} />
                  <input className="form-inp" type="file" accept="image/*" onChange={handleSlideImageUpload} style={{marginTop:10}} />
                  <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6,marginTop:8}}>
                    {lang==="th"?"แนะนำรูปแนวนอนอัตราส่วน 16:7 หรือ 16:9 ขนาดประมาณ 1600x700 px เพื่อให้พอดีกับ slideshow ใหม่":"Recommended landscape image ratio 16:7 or 16:9, around 1600x700 px for the new slideshow."}
                  </div>
                  {form.image && (
                    <div style={{marginTop:12,border:"1px solid var(--border)",borderRadius:10,overflow:"hidden",background:"#F8FAFC"}}>
                      <div style={{height:120,backgroundImage:`url(${form.image})`,backgroundSize:"cover",backgroundPosition:"center"}} />
                      {form.image_name && <div style={{fontSize:12,color:"var(--muted)",padding:"8px 10px"}}>{form.image_name}</div>}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"ปุ่มหลัก":"Primary CTA"}</label><input className="form-inp" value={lang==="th"?(form.primary_th||""):(form.primary_en||"")} onChange={e=>setForm(f=>lang==="th"?({...f,primary_th:e.target.value}):({...f,primary_en:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"ลิงก์ปุ่มหลัก":"Primary page"}</label><input className="form-inp" value={form.primary_page||""} onChange={e=>setForm(f=>({...f,primary_page:e.target.value}))} placeholder="register" /></div>
                </div>
                <div className="form-row">
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"ปุ่มรอง":"Secondary CTA"}</label><input className="form-inp" value={lang==="th"?(form.secondary_th||""):(form.secondary_en||"")} onChange={e=>setForm(f=>lang==="th"?({...f,secondary_th:e.target.value}):({...f,secondary_en:e.target.value}))} /></div>
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"ลิงก์ปุ่มรอง":"Secondary page"}</label><input className="form-inp" value={form.secondary_page||""} onChange={e=>setForm(f=>({...f,secondary_page:e.target.value}))} placeholder="experts" /></div>
                </div>
                <label style={{display:"flex",alignItems:"center",gap:10,fontSize:14,fontWeight:600,color:"var(--g1)",marginTop:4}}>
                  <input type="checkbox" checked={form.active!==false} onChange={e=>setForm(f=>({...f,active:e.target.checked}))} />
                  {lang==="th"?"เปิดใช้งาน Slide นี้":"Show this slide"}
                </label>
              </>
            )}
            <div className="modal-foot">
              <button className="btn-cancel" onClick={() => setModal(null)}>{t.cancel}</button>
              <button className="btn btn-dark" onClick={saveModal}>{t.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Carbon Page (CFO / CFP / Net Zero) ──────────────────────
function CarbonPage({ lang, nav, initialTab = "overview" }) {
  const [tab, setTab] = useState(initialTab);
  const [cfoForm, setCfoForm] = useState({elec:"",fuel_diesel:"",fuel_lng:"",fuel_lpg:"",vehicle:"",waste:"",water:"",purchased_goods:"",travel:""});
  const [cfoResult, setCfoResult] = useState(null);
  const L = (th,en) => lang==="th"?th:en;

  useEffect(() => {
    setTab(initialTab || "overview");
  }, [initialTab]);

  const subNav = [
    {id:"overview",th:"ภาพรวม",en:"Overview"},
    {id:"cfo",th:"CFO — คาร์บอนองค์กร",en:"CFO — Org. Carbon Footprint"},
    {id:"cfp",th:"CFP — คาร์บอนผลิตภัณฑ์",en:"CFP — Product Carbon Footprint"},
    {id:"roadmap",th:"Net Zero Roadmap",en:"Net Zero Roadmap"},
    {id:"credit",th:"Carbon Credit",en:"Carbon Credit"},
  ];

  // Simple CFO calculator (Emission Factors from TGO/IPCC)
  const EF = {elec:0.4999,fuel_diesel:2.648,fuel_lng:2.75,fuel_lpg:1.51,vehicle:0.21,waste:1.2,water:0.344};
  const calcCFO = () => {
    const f = cfoForm;
    const elec   = (parseFloat(f.elec)||0)   * EF.elec   * 12;
    const diesel  = (parseFloat(f.fuel_diesel)||0) * EF.fuel_diesel * 12;
    const lng     = (parseFloat(f.fuel_lng)||0)    * EF.fuel_lng    * 12;
    const lpg     = (parseFloat(f.fuel_lpg)||0)    * EF.fuel_lpg    * 12;
    const veh     = (parseFloat(f.vehicle)||0)     * EF.vehicle     * 12;
    const waste_e = (parseFloat(f.waste)||0)       * EF.waste       * 12;
    const water_e = (parseFloat(f.water)||0)       * EF.water       * 12;
    const goods   = (parseFloat(f.purchased_goods)||0) * 0.5        * 12;
    const travel_e= (parseFloat(f.travel)||0)      * 0.18;
    const s1 = diesel + lng + lpg;
    const s2 = elec;
    const s3 = veh + waste_e + water_e + goods + travel_e;
    setCfoResult({s1:s1.toFixed(2),s2:s2.toFixed(2),s3:s3.toFixed(2),total:(s1+s2+s3).toFixed(2)});
  };

  const scope_colors = {"Scope 1":"#EF4444","Scope 2":"#F97316","Scope 3":"#8B5CF6"};

  const steps_cfo = [
    {no:1,th:"กำหนดขอบเขตองค์กรและปีฐาน",en:"Define org boundaries & base year",desc_th:"ระบุขอบเขตที่รายงาน (Equity Share / Control Approach) และปีที่ใช้เป็นฐาน",desc_en:"Set reporting boundary (Equity Share / Control) and base year"},
    {no:2,th:"ระบุแหล่งปล่อย GHG (Scope 1,2,3)",en:"Identify GHG emission sources (Scope 1,2,3)",desc_th:"รวบรวมข้อมูล: เชื้อเพลิง ไฟฟ้า ขนส่ง ขยะ น้ำเสีย ห่วงโซ่อุปทาน",desc_en:"Collect data: fuel, electricity, transport, waste, wastewater, supply chain"},
    {no:3,th:"คำนวณ GHG ด้วยค่าสัมประสิทธิ์ (EF)",en:"Calculate GHG using Emission Factors",desc_th:"คูณปริมาณกิจกรรมด้วย EF จาก TGO/IPCC แปลงเป็น tCO₂e",desc_en:"Multiply activity data by EF from TGO/IPCC, convert to tCO₂e"},
    {no:4,th:"จัดทำรายงาน GHG Inventory",en:"Prepare GHG Inventory Report",desc_th:"สรุปผลตามมาตรฐาน TGO/ISO 14064-1 พร้อม Uncertainty Assessment",desc_en:"Summarize per TGO/ISO 14064-1 with Uncertainty Assessment"},
    {no:5,th:"ทวนสอบโดยบุคคลที่สาม (Verification)",en:"Third-party Verification",desc_th:"ส่งให้ผู้ตรวจสอบที่ได้รับอนุญาตจาก TGO หรือ ISO/IEC 17029 ทวนสอบ",desc_en:"Submit to TGO-accredited or ISO/IEC 17029 verifier"},
    {no:6,th:"ยื่นขอรับรองและรับ Carbon Label",en:"Apply for Certification & Carbon Label",desc_th:"ยื่นต่อ TGO เพื่อขึ้นทะเบียน CFO และรับ Carbon Footprint Label",desc_en:"Submit to TGO for CFO registration and Carbon Footprint Label"},
  ];

  const ghg_types = [
    {gas:"CO₂",name:"Carbon Dioxide",src_th:"การเผาไหม้เชื้อเพลิง",gwp:"1"},
    {gas:"CH₄",name:"Methane",src_th:"บ่อขยะ ปศุสัตว์ แหล่งน้ำ",gwp:"25"},
    {gas:"N₂O",name:"Nitrous Oxide",src_th:"ปุ๋ย กระบวนการเผาไหม้",gwp:"298"},
    {gas:"HFCs",name:"Hydrofluorocarbons",src_th:"ระบบทำความเย็น แอร์",gwp:"140–11,700"},
    {gas:"PFCs",name:"Perfluorocarbons",src_th:"อุตสาหกรรมเซมิคอนดักเตอร์",gwp:"6,500–9,200"},
    {gas:"SF₆",name:"Sulphur Hexafluoride",src_th:"อุปกรณ์ไฟฟ้าแรงสูง",gwp:"22,800"},
  ];

  const creditTypes = [
    {name:"T-VER",full:"Thailand Voluntary Emission Reduction",org:"TGO (อบก.)",desc_th:"ตลาด carbon credit สมัครใจของไทย รับรองโดย อบก. เหมาะสำหรับโครงการในประเทศ",desc_en:"Thailand voluntary carbon market, certified by TGO, suitable for domestic projects",color:"#059669"},
    {name:"VCS (Verra)",full:"Verified Carbon Standard",org:"Verra",desc_th:"มาตรฐานระดับโลก ซื้อขายในตลาด International Voluntary Carbon Market",desc_en:"Global standard, tradable in International Voluntary Carbon Market",color:"#2563EB"},
    {name:"Gold Standard",full:"Gold Standard for the Global Goals",org:"Gold Standard Foundation",desc_th:"มาตรฐานคุณภาพสูงสุด เน้น SDGs Co-benefits เหมาะสำหรับโครงการชุมชน",desc_en:"Highest quality standard, emphasizes SDGs co-benefits, ideal for community projects",color:"#D97706"},
    {name:"CDM",full:"Clean Development Mechanism",org:"UNFCCC",desc_th:"กลไกพัฒนาที่สะอาดภายใต้ Kyoto Protocol รับรอง CER สำหรับตลาดภาคบังคับ",desc_en:"Clean Development Mechanism under Kyoto Protocol, certifies CERs for compliance markets",color:"#7C3AED"},
  ];

  const reductionLevers = [
    {icon:"⚡",th:"พลังงานทดแทน",en:"Renewable Energy",pot:"30–60%",cost:"ปานกลาง",scope:"1,2"},
    {icon:"🏭",th:"ประสิทธิภาพพลังงาน",en:"Energy Efficiency",pot:"15–30%",cost:"ต่ำ",scope:"1,2"},
    {icon:"🚛",th:"เปลี่ยนยานพาหนะเป็น EV",en:"Fleet Electrification",pot:"10–25%",cost:"สูง",scope:"1,3"},
    {icon:"♻️",th:"Circular Economy",en:"Circular Economy",pot:"10–20%",cost:"ต่ำ–ปานกลาง",scope:"3"},
    {icon:"🌳",th:"ปลูกป่า / Carbon Sink",en:"Afforestation / Carbon Sink",pot:"5–15%",cost:"ต่ำ",scope:"1"},
    {icon:"🔗",th:"Green Supply Chain",en:"Green Supply Chain",pot:"20–40%",cost:"ปานกลาง",scope:"3"},
    {icon:"💧",th:"ลดน้ำเสียและมีเทน",en:"Wastewater Methane Reduction",pot:"5–10%",cost:"ปานกลาง",scope:"1"},
    {icon:"🧪",th:"เปลี่ยนสารทำความเย็น",en:"Refrigerant Replacement",pot:"2–8%",cost:"ปานกลาง",scope:"1"},
  ];

  return (
    <>
      <div className="page-hdr">
        <div className="container">
          <h1>Carbon Management — CFO / CFP / Net Zero</h1>
          <p>{L("คำนวณ บริหารจัดการ และลดการปล่อยก๊าซเรือนกระจก ตามมาตรฐาน TGO / ISO 14064 / ISO 14067","Measure, manage, and reduce GHG emissions per TGO / ISO 14064 / ISO 14067 standards.")}</p>
        </div>
      </div>

      {/* Sub Nav */}
      <div style={{background:"#fff",borderBottom:"1px solid var(--border)",position:"sticky",top:62,zIndex:50}}>
        <div className="container" style={{display:"flex",overflowX:"auto"}}>
          {subNav.map(s=>(
            <button key={s.id} onClick={()=>setTab(s.id)}
              style={{padding:"14px 20px",border:"none",background:"transparent",fontSize:14,fontWeight:tab===s.id?700:500,color:tab===s.id?"var(--g1)":"var(--muted)",borderBottom:tab===s.id?"3px solid var(--g1)":"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap",transition:"all .14s"}}>
              {L(s.th,s.en)}
            </button>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      {tab==="overview" && (
        <section className="section">
          <div className="container">
            <div style={{textAlign:"center",marginBottom:48}}>
              <span className="section-tag">● CARBON MANAGEMENT OVERVIEW</span>
              <h2 className="section-title">{L("ทำไมต้องจัดการ Carbon Footprint?","Why Manage Carbon Footprint?")}</h2>
              <p className="section-sub" style={{margin:"0 auto"}}>{L("Carbon Footprint คือเครื่องมือสำคัญที่สะท้อนผลกระทบของธุรกิจต่อสิ่งแวดล้อม และเป็นก้าวแรกสู่ Net Zero","Carbon Footprint is the key tool reflecting business impact on the environment and the first step toward Net Zero.")}</p>
            </div>

            {/* Why Now */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:48}}>
              {[
                {icon:"⚖️",th:"กฎหมาย Climate Change Act",en:"Climate Change Act",desc_th:"ร่าง พรบ. การเปลี่ยนแปลงสภาพภูมิอากาศ กำหนดให้รายงาน GHG และเตรียมรับภาษีคาร์บอน",desc_en:"Draft Climate Change Act mandates GHG reporting and carbon tax preparation"},
                {icon:"🌍",th:"CBAM — ภาษีคาร์บอนชายแดน EU",en:"CBAM — EU Carbon Border Tax",desc_th:"สินค้าส่งออกไป EU ต้องมีข้อมูล Carbon Footprint ตั้งแต่ปี 2026 เป็นต้นไป",desc_en:"Goods exported to EU must have Carbon Footprint data from 2026 onwards"},
                {icon:"📈",th:"ESG / SET / DJSI",en:"ESG / SET / DJSI",desc_th:"นักลงทุนสถาบันและผู้ซื้อระดับโลกต้องการข้อมูล Carbon จากคู่ค้าในห่วงโซ่อุปทาน",desc_en:"Institutional investors and global buyers require Carbon data from supply chain partners"},
              ].map(c=>(
                <div key={c.th} style={{background:"white",border:"1px solid var(--border)",borderRadius:"var(--r-lg)",padding:"24px 20px",textAlign:"center"}}>
                  <div style={{fontSize:36,marginBottom:12}}>{c.icon}</div>
                  <h3 style={{fontSize:15,color:"var(--g1)",marginBottom:8}}>{L(c.th,c.en)}</h3>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{L(c.desc_th,c.desc_en)}</p>
                </div>
              ))}
            </div>

            {/* CFO vs CFP */}
            <div style={{marginBottom:48}}>
              <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:20,fontFamily:"'Playfair Display',serif"}}>{L("CFO กับ CFP ต่างกันอย่างไร?","CFO vs CFP: What's the Difference?")}</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                {[
                  {abbr:"CFO",full:"Carbon Footprint of Organization",th_full:"คาร์บอนฟุตพริ้นท์ขององค์กร",standard:"ISO 14064-1 / TGO",scope_th:"ขอบเขต: กิจกรรมทั้งหมดขององค์กร (Scope 1, 2, 3)",scope_en:"Scope: All organizational activities (Scope 1, 2, 3)",use_th:"ใช้รายงาน GHG ต่อ TGO, SEC, เตรียม Net Zero Roadmap",use_en:"Report GHG to TGO, SEC, prepare Net Zero Roadmap",color:"#1B4332",bg:"#F0FDF4"},
                  {abbr:"CFP",full:"Carbon Footprint of Product",th_full:"คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์",standard:"ISO 14067 / TGO",scope_th:"ขอบเขต: ตลอดวัฏจักรชีวิตผลิตภัณฑ์ (Cradle to Gate/Grave)",scope_en:"Scope: Full product lifecycle (Cradle to Gate/Grave)",use_th:"ขอ Carbon Label จาก TGO รองรับ Green Procurement / CBAM",use_en:"Apply for Carbon Label from TGO, support Green Procurement / CBAM",color:"#1D4ED8",bg:"#EFF6FF"},
                ].map(c=>(
                  <div key={c.abbr} style={{background:c.bg,borderRadius:"var(--r-lg)",padding:28,border:`1px solid ${c.color}30`}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                      <div style={{background:c.color,color:"#fff",fontSize:20,fontWeight:900,padding:"8px 16px",borderRadius:8,fontFamily:"'Playfair Display',serif"}}>{c.abbr}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:c.color}}>{c.full}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>{c.th_full}</div>
                      </div>
                    </div>
                    <div style={{fontSize:12,background:"rgba(0,0,0,.05)",padding:"5px 10px",borderRadius:6,fontWeight:600,color:c.color,marginBottom:12,display:"inline-block"}}>{c.standard}</div>
                    <p style={{fontSize:13,color:"var(--text)",marginBottom:8,lineHeight:1.6}}>📐 {L(c.scope_th,c.scope_en)}</p>
                    <p style={{fontSize:13,color:"var(--text)",lineHeight:1.6}}>🎯 {L(c.use_th,c.use_en)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GHG Types */}
            <div>
              <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:16,fontFamily:"'Playfair Display',serif"}}>{L("ก๊าซเรือนกระจก 6 ชนิดตาม Kyoto Protocol","6 Greenhouse Gases under Kyoto Protocol")}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12}}>
                {ghg_types.map(g=>(
                  <div key={g.gas} style={{background:"white",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"14px 12px",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:900,color:"var(--g1)",fontFamily:"'Playfair Display',serif",marginBottom:4}}>{g.gas}</div>
                    <div style={{fontSize:10,color:"var(--muted)",marginBottom:8}}>{g.name}</div>
                    <div style={{fontSize:10,fontWeight:600,color:"var(--g2)",background:"var(--gl)",padding:"2px 6px",borderRadius:20,marginBottom:6}}>GWP: {g.gwp}</div>
                    <div style={{fontSize:10,color:"var(--muted)",lineHeight:1.4}}>{g.src_th}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CFO ── */}
      {tab==="cfo" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● CFO — CARBON FOOTPRINT OF ORGANIZATION</span>
            <h2 className="section-title">{L("คาร์บอนฟุตพริ้นท์องค์กร (CFO)","Corporate Carbon Footprint (CFO)")}</h2>
            <p style={{color:"var(--muted)",fontSize:15,marginBottom:32}}>{L("มาตรฐาน ISO 14064-1 / TGO — วัดปริมาณ GHG ทั้ง Scope 1, 2, 3 ขององค์กร คำนวณเป็น tCO₂e","Standard: ISO 14064-1 / TGO — measure Scope 1, 2, 3 GHG emissions in tCO₂e")}</p>

            {/* Scope Cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:40}}>
              {[
                {scope:"Scope 1",color:"#EF4444",bg:"#FEF2F2",th:"การปล่อยโดยตรง",en:"Direct Emissions",items_th:["เชื้อเพลิงที่เผาไหม้ในองค์กร (Diesel, LNG, LPG)","กระบวนการผลิตทางเคมี/อุตสาหกรรม","ยานพาหนะขององค์กร (Company Fleet)","การรั่วไหลของสารทำความเย็น (Fugitive)"],items_en:["Combustion of fuels owned by org (Diesel, LNG, LPG)","Industrial/chemical process emissions","Company-owned vehicles (fleet)","Refrigerant leakage (fugitive emissions)"]},
                {scope:"Scope 2",color:"#F97316",bg:"#FFF7ED",th:"การปล่อยทางอ้อมจากพลังงาน",en:"Indirect Energy Emissions",items_th:["ไฟฟ้าที่ซื้อจาก กฟผ./กฟน./กฟภ.","ไอน้ำ ความร้อน หรือความเย็นที่ซื้อมา","Renewable Energy Credit (REC) ใช้ลด Scope 2"],items_en:["Electricity purchased from EGAT/MEA/PEA","Purchased steam, heat, or cooling","Renewable Energy Certificates reduce Scope 2"]},
                {scope:"Scope 3",color:"#8B5CF6",bg:"#F5F3FF",th:"การปล่อยทางอ้อมอื่นๆ",en:"Other Indirect Emissions",items_th:["สินค้าและบริการที่ซื้อมา (Upstream)","การขนส่งและโลจิสติกส์","การเดินทางเพื่อธุรกิจ","ของเสียจากการดำเนินงาน","การใช้ผลิตภัณฑ์ (Downstream)"],items_en:["Purchased goods and services (upstream)","Transport and logistics","Business travel","Waste from operations","Use of sold products (downstream)"]},
              ].map(s=>(
                <div key={s.scope} style={{background:s.bg,border:`1.5px solid ${s.color}40`,borderRadius:"var(--r-lg)",padding:22}}>
                  <div style={{fontSize:13,fontWeight:900,color:s.color,marginBottom:4,letterSpacing:1}}>{s.scope}</div>
                  <div style={{fontSize:16,fontWeight:700,color:"var(--g1)",marginBottom:14}}>{L(s.th,s.en)}</div>
                  <ul style={{listStyle:"none",padding:0,margin:0}}>
                    {(L(s.items_th,s.items_en)).map((item,i)=>(
                      <li key={i} style={{fontSize:12,color:"var(--text)",padding:"5px 0",borderBottom:`1px solid ${s.color}20`,display:"flex",gap:6}}>
                        <span style={{color:s.color,flexShrink:0}}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Quick CFO Calculator */}
            <div style={{background:"var(--gll)",borderRadius:"var(--r-lg)",padding:32,marginBottom:40}}>
              <h3 style={{fontSize:18,color:"var(--g1)",marginBottom:4}}>{L("🧮 คำนวณ CFO เบื้องต้น (Quick Estimate)","🧮 Quick CFO Estimate Calculator")}</h3>
              <p style={{color:"var(--muted)",fontSize:13,marginBottom:24}}>{L("ใส่ข้อมูลกิจกรรมต่อเดือน ระบบจะคำนวณ tCO₂e/ปี เบื้องต้น (ค่า EF จาก TGO 2024)","Enter monthly activity data — system estimates annual tCO₂e (EF from TGO 2024)")}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
                {[
                  {key:"elec",label_th:"ไฟฟ้า (kWh/เดือน)",label_en:"Electricity (kWh/month)",ph:"เช่น 50000",scope:"2"},
                  {key:"fuel_diesel",label_th:"ดีเซล (ลิตร/เดือน)",label_en:"Diesel (L/month)",ph:"เช่น 2000",scope:"1"},
                  {key:"fuel_lng",label_th:"LNG (กก./เดือน)",label_en:"LNG (kg/month)",ph:"เช่น 500",scope:"1"},
                  {key:"fuel_lpg",label_th:"LPG (กก./เดือน)",label_en:"LPG (kg/month)",ph:"เช่น 300",scope:"1"},
                  {key:"vehicle",label_th:"น้ำมันรถ (ลิตร/เดือน)",label_en:"Fleet fuel (L/month)",ph:"เช่น 800",scope:"3"},
                  {key:"waste",label_th:"ขยะที่ฝังกลบ (ตัน/เดือน)",label_en:"Landfill waste (ton/month)",ph:"เช่น 5",scope:"3"},
                  {key:"water",label_th:"น้ำประปา (ลบ.ม./เดือน)",label_en:"Municipal water (m³/month)",ph:"เช่น 1000",scope:"3"},
                  {key:"purchased_goods",label_th:"สินค้าที่ซื้อ (ล้านบาท/เดือน)",label_en:"Purchased goods (MTHB/month)",ph:"เช่น 2",scope:"3"},
                  {key:"travel",label_th:"เดินทางบิน (กม./ปี)",label_en:"Air travel (km/year)",ph:"เช่น 50000",scope:"3"},
                ].map(f=>(
                  <div key={f.key}>
                    <div style={{fontSize:12,fontWeight:600,marginBottom:5,display:"flex",justifyContent:"space-between"}}>
                      <span style={{color:"var(--text)"}}>{L(f.label_th,f.label_en)}</span>
                      <span style={{color:scope_colors["Scope "+(f.scope==="1"?"1":f.scope==="2"?"2":"3")],fontSize:10,fontWeight:700}}>Scope {f.scope}</span>
                    </div>
                    <input type="number" placeholder={f.ph}
                      style={{width:"100%",padding:"9px 12px",border:"1.5px solid var(--border)",borderRadius:7,fontSize:14}}
                      value={cfoForm[f.key]} onChange={e=>setCfoForm(p=>({...p,[f.key]:e.target.value}))} />
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <button className="btn btn-dark" style={{padding:"11px 24px"}} onClick={calcCFO}>{L("คำนวณ CFO","Calculate CFO")}</button>
                {cfoResult && (
                  <div style={{display:"flex",gap:12,flexWrap:"wrap",flex:1}}>
                    {[["Scope 1",cfoResult.s1,"#EF4444"],["Scope 2",cfoResult.s2,"#F97316"],["Scope 3",cfoResult.s3,"#8B5CF6"],["รวม / Total",cfoResult.total,"var(--g1)"]].map(([l,v,c])=>(
                      <div key={l} style={{textAlign:"center",background:"white",borderRadius:"var(--r)",padding:"10px 16px",border:`1px solid ${c}40`}}>
                        <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>{l}</div>
                        <div style={{fontSize:20,fontWeight:700,color:c,fontFamily:"'Playfair Display',serif"}}>{v}</div>
                        <div style={{fontSize:10,color:"var(--muted)"}}>tCO₂e/ปี</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p style={{fontSize:11,color:"var(--muted)",marginTop:12}}>⚠️ {L("ผลการคำนวณนี้เป็นค่าประมาณเบื้องต้นเท่านั้น ต้องการผลที่แม่นยำตามมาตรฐาน TGO/ISO ติดต่อผู้เชี่ยวชาญ VERDIX","This is a preliminary estimate only. For accurate TGO/ISO-compliant results, contact a VERDIX expert.")}</p>
            </div>

            {/* Process Steps */}
            <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:20,fontFamily:"'Playfair Display',serif"}}>{L("ขั้นตอนจัดทำ CFO ตามมาตรฐาน TGO","CFO Process per TGO Standard")}</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
              {steps_cfo.map(s=>(
                <div key={s.no} style={{background:"white",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"18px 16px",display:"flex",gap:12}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:"var(--g1)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>{s.no}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"var(--g1)",marginBottom:6}}>{L(s.th,s.en)}</div>
                    <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>{L(s.desc_th,s.desc_en)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CFP ── */}
      {tab==="cfp" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● CFP — CARBON FOOTPRINT OF PRODUCT</span>
            <h2 className="section-title">{L("คาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (CFP)","Product Carbon Footprint (CFP)")}</h2>
            <p style={{color:"var(--muted)",fontSize:15,marginBottom:32}}>{L("มาตรฐาน ISO 14067 / TGO — วัดปริมาณ GHG ตลอดวัฏจักรชีวิตผลิตภัณฑ์ คำนวณเป็น kgCO₂e/หน่วย","Standard: ISO 14067 / TGO — measure GHG across full product lifecycle in kgCO₂e/unit")}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,marginBottom:40}}>
              <div>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:16}}>{L("ขั้นตอน LCA (Life Cycle Assessment)","LCA Process Steps")}</h3>
                <div style={{position:"relative"}}>
                  {[
                    {stage:"Raw Materials",th:"การจัดหาวัตถุดิบ",icon:"⛏️",color:"#6B7280"},
                    {stage:"Production",th:"กระบวนการผลิต",icon:"🏭",color:"#F97316"},
                    {stage:"Distribution",th:"การจัดจำหน่าย/ขนส่ง",icon:"🚛",color:"#3B82F6"},
                    {stage:"Use Phase",th:"การใช้งาน",icon:"👤",color:"#10B981"},
                    {stage:"End of Life",th:"การจัดการหลังใช้งาน",icon:"♻️",color:"#8B5CF6"},
                  ].map((s,i)=>(
                    <div key={s.stage} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<4?0:0}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <div style={{width:44,height:44,borderRadius:"50%",background:s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
                        {i<4 && <div style={{width:2,height:24,background:"var(--border)"}} />}
                      </div>
                      <div style={{padding:"8px 0"}}>
                        <div style={{fontSize:14,fontWeight:700,color:"var(--g1)"}}>{s.stage}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>{s.th}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:16}}>{L("ขอบเขตระบบ (System Boundary)","System Boundary Options")}</h3>
                {[
                  {name:"Cradle to Gate",th:"ตั้งแต่วัตถุดิบถึงประตูโรงงาน",ico:"🌿→🏭",use_th:"ใช้สำหรับ B2B ในห่วงโซ่อุปทาน"},
                  {name:"Cradle to Grave",th:"ตั้งแต่วัตถุดิบถึงทิ้งหลังใช้งาน",ico:"🌿→🗑️",use_th:"ใช้สำหรับ Carbon Label บนสินค้า"},
                  {name:"Cradle to Cradle",th:"วัฏจักรชีวิตแบบ Circular Economy",ico:"🌿→♻️",use_th:"ใช้สำหรับผลิตภัณฑ์ที่มี Recycling"},
                  {name:"Gate to Gate",th:"เฉพาะกระบวนการผลิตในโรงงาน",ico:"🏭→🏭",use_th:"ใช้สำหรับประเมินภายในโรงงาน"},
                ].map((b)=>(
                  <div key={b.name} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{fontSize:16,minWidth:60,textAlign:"center"}}>{b.ico}</span>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:"var(--g1)"}}>{b.name}</div>
                      <div style={{fontSize:12,color:"var(--muted)"}}>{b.th}</div>
                      <div style={{fontSize:12,color:"var(--ga)",fontWeight:600,marginTop:2}}>💡 {b.use_th}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:"linear-gradient(135deg,var(--g1),var(--g2))",borderRadius:"var(--r-lg)",padding:"28px 32px",display:"flex",gap:20,alignItems:"center"}}>
              <span style={{fontSize:40}}>🏷️</span>
              <div style={{flex:1}}>
                <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:6}}>{L("Carbon Footprint Label จาก TGO","Carbon Footprint Label from TGO")}</div>
                <p style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.7}}>{L("เมื่อได้รับการรับรอง CFP จาก อบก. (TGO) สามารถติด Carbon Label บนผลิตภัณฑ์ได้ รองรับ Green Procurement, SET, CBAM และตลาดต่างประเทศ","TGO-certified CFP products can display a Carbon Label, supporting Green Procurement, SET, CBAM, and export markets.")}</p>
              </div>
              <button className="btn-accent" style={{whiteSpace:"nowrap"}} onClick={()=>nav("experts")}>{L("ขอใบรับรอง CFP","Apply for CFP Cert")}</button>
            </div>
          </div>
        </section>
      )}

      {/* ── NET ZERO ROADMAP ── */}
      {tab==="roadmap" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● NET ZERO ROADMAP</span>
            <h2 className="section-title">{L("วางแผน Net Zero Roadmap สำหรับองค์กร","Build Your Organization's Net Zero Roadmap")}</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,marginBottom:40}}>
              <div>
                <p style={{color:"var(--muted)",fontSize:15,lineHeight:1.8,marginBottom:20}}>{L("Net Zero หมายถึงสมดุลระหว่างการปล่อยและการดูดกลับ GHG — ปล่อยเท่าไรต้องลด/ดูดกลับเท่านั้น VERDIX ช่วยสร้าง Roadmap ที่ทำได้จริงตามกรอบ SBTi / TGO NDC","Net Zero means balancing GHG emissions and removals. VERDIX helps build actionable roadmaps per SBTi/TGO NDC frameworks.")}</p>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  {[
                    {y:"2024–2025",th:"วัด Baseline (CFO) และระบุ Hotspots",en:"Measure Baseline (CFO) and identify Hotspots"},
                    {y:"2025–2027",th:"ตั้ง SBTi Target ลด 42% ภายในปี 2030",en:"Set SBTi Target: 42% reduction by 2030"},
                    {y:"2027–2030",th:"ดำเนิน Reduction Projects (ฟาก Scope 1,2)",en:"Execute Reduction Projects (Scope 1, 2 focus)"},
                    {y:"2030–2040",th:"ขยายสู่ Scope 3 / Green Supply Chain",en:"Expand to Scope 3 / Green Supply Chain"},
                    {y:"2040–2050",th:"Carbon Neutral — ชดเชยที่เหลือด้วย Credit",en:"Carbon Neutral — offset remaining with Credits"},
                    {y:"2050",th:"Net Zero — ตามเป้าหมายประเทศไทย",en:"Net Zero — aligned with Thailand 2050 target"},
                  ].map((r)=>(
                    <div key={r.y} style={{display:"flex",gap:14,padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--ga)",minWidth:90,paddingTop:2}}>{r.y}</div>
                      <div style={{fontSize:13,color:"var(--text)"}}>{L(r.th,r.en)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:16}}>{L("มาตรการลดการปล่อย GHG","GHG Reduction Measures")}</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {reductionLevers.map(r=>(
                    <div key={r.th} style={{background:"#F9FAFB",borderRadius:"var(--r)",padding:"12px 14px",border:"1px solid var(--border)"}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                        <span style={{fontSize:18}}>{r.icon}</span>
                        <span style={{fontSize:12,fontWeight:700,color:"var(--g1)"}}>{L(r.th,r.en)}</span>
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        <span style={{fontSize:10,background:"var(--gl)",color:"var(--g2)",padding:"2px 7px",borderRadius:20,fontWeight:600}}>-{r.pot}</span>
                        <span style={{fontSize:10,background:"#F3F4F6",color:"var(--muted)",padding:"2px 7px",borderRadius:20}}>Scope {r.scope}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CARBON CREDIT ── */}
      {tab==="credit" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● CARBON CREDIT & OFFSET</span>
            <h2 className="section-title">{L("Carbon Credit และการชดเชยคาร์บอน","Carbon Credit & Carbon Offset")}</h2>
            <p style={{color:"var(--muted)",fontSize:15,marginBottom:32}}>{L("Carbon Credit คือสิทธิ์ในการปล่อย GHG 1 tCO₂e สามารถซื้อขายเพื่อชดเชยการปล่อยที่ยังลดไม่ได้","A Carbon Credit represents the right to emit 1 tCO₂e — tradeable to offset unavoidable emissions.")}</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20,marginBottom:40}}>
              {creditTypes.map(c=>(
                <div key={c.name} style={{background:"white",border:`1.5px solid ${c.color}30`,borderRadius:"var(--r-lg)",padding:24,borderTop:`4px solid ${c.color}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{fontSize:20,fontWeight:900,color:c.color,fontFamily:"'Playfair Display',serif"}}>{c.name}</div>
                      <div style={{fontSize:12,color:"var(--muted)"}}>{c.full}</div>
                    </div>
                    <span style={{fontSize:11,fontWeight:600,background:`${c.color}15`,color:c.color,padding:"3px 10px",borderRadius:20}}>{c.org}</span>
                  </div>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{L(c.desc_th,c.desc_en)}</p>
                </div>
              ))}
            </div>
            <div style={{background:"var(--g1)",borderRadius:"var(--r-lg)",padding:32,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:12}}>🪙</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:"#fff",marginBottom:8}}>{L("VERDIX Carbon Credit Marketplace (Phase 2)","VERDIX Carbon Credit Marketplace (Phase 2)")}</h3>
              <p style={{color:"rgba(255,255,255,.65)",fontSize:15,marginBottom:24,maxWidth:560,margin:"0 auto 24px"}}>{L("ซื้อ-ขาย Carbon Credit จาก T-VER และ VCS โดยตรงบนแพลตฟอร์ม VERDIX รองรับการ Offset อัตโนมัติตามรายงาน CFO","Buy and sell Carbon Credits from T-VER and VCS directly on VERDIX Platform with automated offset tracking per CFO report.")}</p>
              <button className="btn-accent" style={{fontSize:15,padding:"12px 28px"}} onClick={()=>nav("register")}>{L("แจ้งความสนใจ Phase 2","Register Interest — Phase 2")}</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ─── Environment Page ─────────────────────────────────────────
function EnvironmentPage({ lang, nav }) {
  const [tab, setTab] = useState("overview");

  const subNav = [
    {id:"overview", th:"ภาพรวม",           en:"Overview"},
    {id:"air",      th:"คุณภาพอากาศ",      en:"Air Quality"},
    {id:"water",    th:"น้ำและน้ำเสีย",    en:"Water & Wastewater"},
    {id:"waste",    th:"กากของเสีย",        en:"Industrial Waste"},
    {id:"monitor",  th:"ระบบติดตาม IoT",   en:"IoT Monitoring"},
  ];

  const L = (th,en) => lang==="th"?th:en;

  const airParams = [
    {param:"PM2.5",  std:"ไม่เกิน 37.5 μg/m³ (24h)",  color:"#EF4444", icon:"💨", desc_th:"ฝุ่นละอองขนาดเล็กกว่า 2.5 ไมครอน อันตรายต่อระบบทางเดินหายใจ",desc_en:"Fine particles <2.5μm, dangerous to respiratory system"},
    {param:"PM10",   std:"ไม่เกิน 120 μg/m³ (24h)",    color:"#F97316", icon:"🌫️", desc_th:"ฝุ่นหยาบขนาดเล็กกว่า 10 ไมครอน",desc_en:"Coarse particles <10μm, monitored continuously"},
    {param:"SO₂",    std:"ไม่เกิน 300 μg/m³ (1h)",     color:"#EAB308", icon:"🏭", desc_th:"ก๊าซซัลเฟอร์ไดออกไซด์จากการเผาไหม้เชื้อเพลิงฟอสซิล",desc_en:"Sulfur dioxide from fossil fuel combustion"},
    {param:"NOx",    std:"ไม่เกิน 170 μg/m³ (1h)",     color:"#8B5CF6", icon:"⚗️", desc_th:"ออกไซด์ของไนโตรเจน จากยานพาหนะและโรงงาน",desc_en:"Nitrogen oxides from vehicles and industrial processes"},
    {param:"CO",     std:"ไม่เกิน 30 mg/m³ (1h)",      color:"#6B7280", icon:"🔥", desc_th:"คาร์บอนมอนอกไซด์จากการเผาไหม้ไม่สมบูรณ์",desc_en:"Carbon monoxide from incomplete combustion"},
    {param:"VOC",    std:"ขึ้นกับชนิดสาร",             color:"#10B981", icon:"🧪", desc_th:"สารอินทรีย์ระเหยง่าย เช่น Benzene, Toluene, Xylene",desc_en:"Volatile organic compounds: Benzene, Toluene, Xylene"},
    {param:"H₂S",   std:"ไม่เกิน 0.03 ppm",           color:"#84CC16", icon:"☣️", desc_th:"ไฮโดรเจนซัลไฟด์ จากระบบบำบัดน้ำเสียและโรงงานอาหาร",desc_en:"Hydrogen sulfide from wastewater treatment & food industries"},
    {param:"TSP",    std:"ไม่เกิน 330 μg/m³ (24h)",   color:"#F59E0B", icon:"🌪️", desc_th:"ปริมาณฝุ่นละอองรวมทั้งหมด (Total Suspended Particulates)",desc_en:"Total Suspended Particulates in ambient air"},
  ];

  const waterParams = [
    {param:"pH",       std:"6.0 – 9.0",          unit:"",        cat:"ทั่วไป",   icon:"⚗️"},
    {param:"BOD",      std:"≤ 20",                unit:"mg/L",    cat:"อินทรีย์", icon:"🦠"},
    {param:"COD",      std:"≤ 120",               unit:"mg/L",    cat:"อินทรีย์", icon:"🧫"},
    {param:"SS",       std:"≤ 50",                unit:"mg/L",    cat:"ของแข็ง",  icon:"💧"},
    {param:"TDS",      std:"≤ 3,000",             unit:"mg/L",    cat:"ของแข็ง",  icon:"🔬"},
    {param:"DO",       std:"≥ 2",                 unit:"mg/L",    cat:"ออกซิเจน",icon:"🌊"},
    {param:"TN",       std:"≤ 20",                unit:"mg/L",    cat:"สารอาหาร", icon:"🌿"},
    {param:"TP",       std:"≤ 2",                 unit:"mg/L",    cat:"สารอาหาร", icon:"🌿"},
    {param:"น้ำมัน",  std:"≤ 5",                 unit:"mg/L",    cat:"น้ำมัน",   icon:"🛢️"},
    {param:"Cr(VI)",   std:"≤ 0.25",              unit:"mg/L",    cat:"โลหะหนัก", icon:"⚠️"},
    {param:"Pb",       std:"≤ 0.2",               unit:"mg/L",    cat:"โลหะหนัก", icon:"⚠️"},
    {param:"Hg",       std:"≤ 0.005",             unit:"mg/L",    cat:"โลหะหนัก", icon:"⚠️"},
  ];

  const wasteTypes = [
    {code:"10 01",  th:"กากจากการผลิตพลังงาน",          en:"Waste from energy production",            hazard:false},
    {code:"10 02",  th:"กากจากอุตสาหกรรมเหล็ก",          en:"Waste from iron & steel industry",         hazard:false},
    {code:"07 01",  th:"ตัวทำละลายอินทรีย์ใช้แล้ว",      en:"Spent organic solvents",                   hazard:true},
    {code:"13 01",  th:"น้ำมันไฮดรอลิกใช้แล้ว",          en:"Waste hydraulic oils",                     hazard:true},
    {code:"16 06",  th:"แบตเตอรี่และสะสมไฟฟ้า",          en:"Batteries and accumulators",               hazard:true},
    {code:"18 01",  th:"กากจากสถานพยาบาล (Biomedical)",  en:"Waste from healthcare (biomedical)",       hazard:true},
    {code:"19 12",  th:"กากจากระบบบำบัดน้ำเสีย (Sludge)","en":"Sludge from wastewater treatment",       hazard:false},
    {code:"20 01",  th:"ขยะอุตสาหกรรมทั่วไป",            en:"General industrial waste",                  hazard:false},
  ];

  const iotProtocols = [
    {name:"MQTT v3.1/v5", use_th:"ส่งข้อมูลเซ็นเซอร์แบบ Real-time ใช้ bandwidth น้อย เหมาะกับ IoT Gateway", use_en:"Real-time sensor data, low bandwidth, ideal for IoT gateways", icon:"📡", color:"#3B82F6"},
    {name:"REST API",      use_th:"รับ-ส่งข้อมูลแบบ Request-Response เหมาะกับระบบ ERP/SCADA ที่มีอยู่แล้ว", use_en:"Request-Response data exchange, ideal for existing ERP/SCADA systems", icon:"🔗", color:"#10B981"},
    {name:"Modbus TCP",    use_th:"อ่านค่าจาก PLC/Meter โดยตรง รองรับ Haiwell, Siemens, Omron, Schneider", use_en:"Direct PLC/Meter reading, supports Haiwell, Siemens, Omron, Schneider", icon:"⚙️", color:"#F59E0B"},
    {name:"OPC-UA",        use_th:"มาตรฐานอุตสาหกรรม Industry 4.0 เชื่อมต่อ SCADA และ MES", use_en:"Industry 4.0 standard for SCADA and MES integration", icon:"🏭", color:"#8B5CF6"},
    {name:"Webhook",       use_th:"แจ้งเตือนอัตโนมัติเมื่อค่าเกินมาตรฐาน ส่งไปยัง LINE/Email/Slack", use_en:"Auto-alert when values exceed standards, push to LINE/Email/Slack", icon:"🔔", color:"#EF4444"},
    {name:"LoRaWAN",       use_th:"ส่งข้อมูลระยะไกล (>10km) สำหรับ Sensor กลางแจ้ง เช่น สถานีตรวจอากาศ", use_en:"Long-range (>10km) for outdoor sensors like weather stations", icon:"📶", color:"#6B7280"},
  ];

  const monitorSensors = [
    {cat_th:"คุณภาพอากาศ", cat_en:"Air Quality",    sensors:["PM2.5/PM10 Sensor","CO / CO₂ Sensor","SO₂ / NOx Sensor","VOC Detector","Wind Speed & Direction","Temperature & Humidity"]},
    {cat_th:"คุณภาพน้ำ",   cat_en:"Water Quality",  sensors:["pH Sensor","DO (Dissolved Oxygen)","Turbidity Sensor","Conductivity (TDS)","ORP Sensor","Flow Meter"]},
    {cat_th:"กากของเสีย",  cat_en:"Waste",           sensors:["Load Cell (Weight)","Ultrasonic Level","RFID Waste Tracking","Leachate pH","Container Temperature"]},
    {cat_th:"พลังงาน",     cat_en:"Energy",          sensors:["Smart Energy Meter","Power Quality Analyzer","Solar Irradiance","Heat Meter","Compressed Air Flow"]},
  ];

  return (
    <>
      <div className="page-hdr">
        <div className="container">
          <h1>{L("ระบบสิ่งแวดล้อมครบวงจร","Comprehensive Environmental Systems")}</h1>
          <p>{L("ข้อมูล มาตรฐาน และเครื่องมือดิจิทัลสำหรับงานสิ่งแวดล้อมอุตสาหกรรมทุกด้าน — อากาศ น้ำ กากของเสีย และระบบติดตาม IoT","Data, standards, and digital tools for all aspects of industrial environmental work — air, water, waste, and IoT monitoring.")}</p>
        </div>
      </div>

      {/* Sub Nav */}
      <div style={{background:"#fff",borderBottom:"1px solid var(--border)",position:"sticky",top:62,zIndex:50}}>
        <div className="container" style={{display:"flex",overflowX:"auto"}}>
          {subNav.map(s=>(
            <button key={s.id} onClick={()=>setTab(s.id)}
              style={{padding:"14px 22px",border:"none",background:"transparent",fontSize:14,fontWeight:tab===s.id?700:500,color:tab===s.id?"var(--g1)":"var(--muted)",borderBottom:tab===s.id?"3px solid var(--g1)":"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap",transition:"all .14s"}}>
              {L(s.th,s.en)}
            </button>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      {tab==="overview" && (
        <section className="section">
          <div className="container">
            <div style={{textAlign:"center",marginBottom:48}}>
              <span className="section-tag">● ENVIRONMENTAL DOMAINS</span>
              <h2 className="section-title">{L("ขอบเขตงานสิ่งแวดล้อมที่ VERDIX ครอบคลุม","Environmental Domains Covered by VERDIX")}</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:56}}>
              {[
                {icon:"🌬️",th:"คุณภาพอากาศ",en:"Air Quality",desc_th:"PM2.5, SO₂, NOx, VOC, H₂S — มาตรฐาน PCD และ DIW",desc_en:"PM2.5, SO₂, NOx, VOC, H₂S — PCD & DIW standards",tab:"air",color:"#EFF6FF",bc:"#BFDBFE"},
                {icon:"💧",th:"น้ำและน้ำเสีย",en:"Water & Wastewater",desc_th:"BOD/COD/SS น้ำทิ้ง น้ำดื่ม น้ำผิวดิน ระบบบำบัด",desc_en:"BOD/COD/SS effluent, drinking water, surface water, treatment",tab:"water",color:"#F0FDF4",bc:"#A7F3D0"},
                {icon:"☣️",th:"กากของเสียอุตสาหกรรม",en:"Industrial Waste",desc_th:"กากอันตราย e-Manifest Zero Waste to Landfill",desc_en:"Hazardous waste, e-Manifest, Zero Waste to Landfill",tab:"waste",color:"#FEF9C3",bc:"#FDE047"},
                {icon:"📡",th:"ระบบติดตาม IoT",en:"IoT Monitoring",desc_th:"MQTT, REST API, Modbus TCP, OPC-UA Real-time",desc_en:"MQTT, REST API, Modbus TCP, OPC-UA real-time monitoring",tab:"monitor",color:"#F5F3FF",bc:"#C4B5FD"},
              ].map(d=>(
                <div key={d.th} onClick={()=>setTab(d.tab)}
                  style={{background:d.color,border:`1px solid ${d.bc}`,borderRadius:"var(--r-lg)",padding:"28px 20px",cursor:"pointer",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                  <div style={{fontSize:36,marginBottom:14}}>{d.icon}</div>
                  <h3 style={{fontSize:16,color:"var(--g1)",marginBottom:8}}>{L(d.th,d.en)}</h3>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{L(d.desc_th,d.desc_en)}</p>
                  <div style={{marginTop:14,fontSize:12,fontWeight:700,color:"var(--g2)"}}>
                    {L("ดูรายละเอียด →","View Details →")}
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Bodies */}
            <div style={{marginBottom:48}}>
              <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:20,fontFamily:"'Playfair Display',serif"}}>
                {L("หน่วยงานกำกับดูแลสิ่งแวดล้อมในไทย","Thai Environmental Regulatory Bodies")}
              </h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
                {[
                  {abbr:"กรมควบคุมมลพิษ",en:"Pollution Control Dept. (PCD)",th:"มาตรฐานอากาศ น้ำ เสียง สั่นสะเทือน",scope:"Air, Water, Noise standards"},
                  {abbr:"กรมโรงงาน (DIW)",en:"Dept. of Industrial Works",th:"ใบอนุญาตโรงงาน น้ำทิ้ง กากของเสีย",scope:"Factory license, effluent, waste"},
                  {abbr:"สผ. (ONEP)",en:"Office of Natural Resources",th:"EIA, รายงานผลกระทบสิ่งแวดล้อม",scope:"EIA, environmental impact reports"},
                  {abbr:"อก. (MoI)",en:"Ministry of Industry",th:"Eco-Factory, Green Industry, มาตรฐานโรงงาน",scope:"Eco-Factory, Green Industry standards"},
                ].map(r=>(
                  <div key={r.abbr} style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"16px"}}>
                    <div style={{fontSize:14,fontWeight:700,color:"var(--g1)",marginBottom:4}}>{r.abbr}</div>
                    <div style={{fontSize:11,color:"var(--ga)",fontWeight:600,marginBottom:6}}>{r.en}</div>
                    <div style={{fontSize:12,color:"var(--muted)"}}>{L(r.th,r.scope)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* VERDIX Services for Environment */}
            <div style={{background:"linear-gradient(135deg,var(--g1),var(--g2))",borderRadius:"var(--r-lg)",padding:36,color:"#fff"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,marginBottom:20}}>{L("VERDIX ช่วยงานสิ่งแวดล้อมได้อย่างไร?","How VERDIX Supports Environmental Work")}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                {[
                  {icon:"📋",th:"ระบบตรวจประเมินออนไลน์",en:"Online Assessment System",d_th:"ประเมินสถานะสิ่งแวดล้อมโรงงานทุกด้าน พร้อม Gap Analysis และแผนพัฒนา",d_en:"Assess all environmental dimensions with Gap Analysis and improvement plans"},
                  {icon:"📊",th:"Automated Reporting",en:"Automated Reporting",d_th:"สร้างรายงานสิ่งแวดล้อมตามแบบฟอร์มกรมโรงงาน กรมควบคุมมลพิษ และ TGO",d_en:"Generate reports per DIW, PCD, and TGO form requirements automatically"},
                  {icon:"📡",th:"Real-time IoT Dashboard",en:"Real-time IoT Dashboard",d_th:"เชื่อมเซ็นเซอร์จากโรงงานผ่าน MQTT/API แสดงผลแบบ Real-time พร้อมแจ้งเตือน",d_en:"Connect factory sensors via MQTT/API for real-time display with threshold alerts"},
                ].map(s=>(
                  <div key={s.th} style={{background:"rgba(255,255,255,.08)",borderRadius:"var(--r)",padding:"18px 16px"}}>
                    <div style={{fontSize:24,marginBottom:10}}>{s.icon}</div>
                    <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>{L(s.th,s.en)}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.6}}>{L(s.d_th,s.d_en)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── AIR QUALITY ── */}
      {tab==="air" && (
        <section className="section">
          <div className="container">
            <div style={{marginBottom:36}}>
              <span className="section-tag">● คุณภาพอากาศ / AIR QUALITY</span>
              <h2 className="section-title">{L("มาตรฐานและพารามิเตอร์คุณภาพอากาศ","Air Quality Standards & Parameters")}</h2>
              <p style={{color:"var(--muted)",fontSize:15,marginBottom:8}}>{L("อ้างอิงมาตรฐานคุณภาพอากาศในบรรยากาศ ประกาศกระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม","Referenced to Thai Ambient Air Quality Standards, Ministry of Natural Resources and Environment")}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:40}}>
              {airParams.map(p=>(
                <div key={p.param} style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"18px 16px",borderTop:`3px solid ${p.color}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:20}}>{p.icon}</span>
                    <span style={{fontSize:17,fontWeight:700,color:"var(--g1)"}}>{p.param}</span>
                  </div>
                  <div style={{background:"#F9FAFB",borderRadius:6,padding:"6px 10px",fontSize:12,fontWeight:600,color:p.color,marginBottom:8}}>{p.std}</div>
                  <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>{L(p.desc_th,p.desc_en)}</p>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
              <div style={{background:"var(--gll)",borderRadius:"var(--r-lg)",padding:28}}>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:16}}>{L("กฎหมายที่เกี่ยวข้อง","Relevant Regulations")}</h3>
                {[
                  L("ประกาศกระทรวงอุตสาหกรรม ฉบับที่ 23 (ควันดำ)","Ministerial Notification No.23 (Black smoke)"),
                  L("ประกาศ กรมโรงงาน เรื่อง มลพิษอากาศจากโรงงาน","DIW Notification on industrial air pollution"),
                  L("มาตรฐานคุณภาพอากาศในบรรยากาศ (กรมควบคุมมลพิษ)","Ambient air quality standards (PCD)"),
                  L("พรบ. ส่งเสริมและรักษาคุณภาพสิ่งแวดล้อม 2535","Environmental Quality Promotion Act B.E.2535"),
                ].map((l,i)=><div key={i} style={{fontSize:13,color:"var(--text)",padding:"8px 0",borderBottom:"1px solid var(--border)",display:"flex",gap:8}}><span style={{color:"var(--ga)"}}>📜</span>{l}</div>)}
              </div>
              <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r-lg)",padding:28}}>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:16}}>{L("ระบบควบคุมมลพิษอากาศ","Air Pollution Control Systems")}</h3>
                {[
                  {icon:"🔵",th:"Bag Filter — กรองฝุ่นจากกระบวนการผลิต",en:"Bag Filter — dust from production processes"},
                  {icon:"🟢",th:"Wet Scrubber — กำจัดก๊าซกรดและฝุ่น",en:"Wet Scrubber — acid gases and dust removal"},
                  {icon:"🟡",th:"Electrostatic Precipitator (ESP) — ดักฝุ่นด้วยไฟฟ้า",en:"ESP — electrostatic dust collection"},
                  {icon:"🟠",th:"Thermal Oxidizer (TO/RTO) — เผา VOC",en:"Thermal/RTO Oxidizer — VOC destruction"},
                  {icon:"🔴",th:"Carbon Adsorption — ดูดซับ VOC ด้วย Activated Carbon",en:"Carbon Adsorption — VOC capture with activated carbon"},
                ].map((s,i)=><div key={i} style={{fontSize:13,padding:"8px 0",borderBottom:"1px solid var(--border)",display:"flex",gap:8}}><span>{s.icon}</span>{L(s.th,s.en)}</div>)}
                <button className="btn-accent" style={{marginTop:16,padding:"9px 18px",fontSize:13}} onClick={()=>nav("experts")}>{L("ปรึกษาผู้เชี่ยวชาญ","Consult an Expert")}</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WATER ── */}
      {tab==="water" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● น้ำและน้ำเสีย / WATER & WASTEWATER</span>
            <h2 className="section-title">{L("มาตรฐานน้ำทิ้งและพารามิเตอร์สำคัญ","Effluent Standards & Key Parameters")}</h2>
            <p style={{color:"var(--muted)",fontSize:15,marginBottom:28}}>{L("อ้างอิงประกาศกระทรวงอุตสาหกรรม ฉบับที่ 2 (2539) และประกาศกรมโรงงานอุตสาหกรรม","Referenced to MoI Notification No.2 (1996) and DIW Regulations")}</p>
            <div style={{overflowX:"auto",marginBottom:36}}>
              <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:"var(--r)",overflow:"hidden",boxShadow:"var(--shadow-sm)"}}>
                <thead>
                  <tr style={{background:"var(--g1)"}}>
                    {[L("พารามิเตอร์","Parameter"),L("ค่ามาตรฐาน","Standard"),L("หน่วย","Unit"),L("หมวด","Category"),L("วิธีตรวจวัด","Test Method")].map(h=><th key={h} style={{padding:"11px 16px",color:"#fff",fontSize:13,fontWeight:600,textAlign:"left"}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {waterParams.map((p,i)=>(
                    <tr key={p.param} style={{background:i%2===0?"#fff":"#F9FAFB"}}>
                      <td style={{padding:"10px 16px",fontWeight:700,color:"var(--g1)"}}>{p.icon} {p.param}</td>
                      <td style={{padding:"10px 16px",fontWeight:600,color:p.param.includes("Cr")||p.param.includes("Pb")||p.param.includes("Hg")?"#DC2626":"var(--g2)"}}>{p.std}</td>
                      <td style={{padding:"10px 16px",color:"var(--muted)",fontSize:13}}>{p.unit}</td>
                      <td style={{padding:"10px 16px"}}><span className="badge" style={{fontSize:11}}>{p.cat}</span></td>
                      <td style={{padding:"10px 16px",fontSize:12,color:"var(--muted)"}}>{p.param==="pH"?"pH meter":p.cat==="โลหะหนัก"?"AAS / ICP":"Colorimetric / Titrimetric"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
              {[
                {icon:"🔵",th:"Activated Sludge (AS)",en:"Activated Sludge",desc_th:"เหมาะสำหรับน้ำเสียที่มี BOD สูง โรงงานอาหาร เครื่องดื่ม",desc_en:"Suitable for high BOD wastewater — food & beverage industries"},
                {icon:"🟢",th:"Moving Bed Biofilm (MBBR)",en:"MBBR Process",desc_th:"พื้นที่น้อย ประสิทธิภาพสูง เหมาะกับโรงงานขนาดกลาง",desc_en:"Compact, high efficiency — suitable for medium-sized factories"},
                {icon:"🟡",th:"Membrane Bioreactor (MBR)",en:"MBR Process",desc_th:"น้ำทิ้งสะอาดสูง นำกลับมาใช้ใหม่ได้ Zero Liquid Discharge",desc_en:"High-quality effluent, water reuse, Zero Liquid Discharge"},
                {icon:"🟠",th:"Sequencing Batch Reactor (SBR)",en:"SBR Process",desc_th:"ยืดหยุ่น ควบคุมง่าย เหมาะกับน้ำเสียที่มีปริมาณไม่คงที่",desc_en:"Flexible, easy control — suitable for variable flow wastewater"},
                {icon:"🔴",th:"Coagulation-Flocculation",en:"Coagulation-Flocculation",desc_th:"กำจัด SS โลหะหนัก น้ำมัน เหมาะกับอุตสาหกรรมชุบโลหะ",desc_en:"Remove SS, heavy metals, oil — electroplating industries"},
                {icon:"🟣",th:"Wetland / Constructed Wetland",en:"Constructed Wetland",desc_th:"ระบบธรรมชาติ ต้นทุนต่ำ เหมาะกับพื้นที่ขนาดใหญ่",desc_en:"Natural system, low cost — suitable for large land areas"},
              ].map(t=>(
                <div key={t.th} style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"18px 16px"}}>
                  <div style={{fontSize:24,marginBottom:10}}>{t.icon}</div>
                  <div style={{fontSize:14,fontWeight:700,color:"var(--g1)",marginBottom:6}}>{L(t.th,t.en)}</div>
                  <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{L(t.desc_th,t.desc_en)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WASTE ── */}
      {tab==="waste" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● กากของเสียอุตสาหกรรม / INDUSTRIAL WASTE</span>
            <h2 className="section-title">{L("การจัดการกากของเสียอุตสาหกรรม","Industrial Waste Management")}</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,marginBottom:40}}>
              <div>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:14}}>{L("ประเภทกากของเสีย (รหัส DIW)","Waste Types (DIW Codes)")}</h3>
                <div style={{background:"#fff",borderRadius:"var(--r)",overflow:"hidden",border:"1px solid var(--border)"}}>
                  {wasteTypes.map((w,i)=>(
                    <div key={w.code} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:i<wasteTypes.length-1?"1px solid var(--border)":"none",background:i%2===0?"#fff":"#F9FAFB"}}>
                      <span style={{fontSize:11,fontWeight:700,color:"#fff",background:w.hazard?"#DC2626":"var(--g2)",padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap"}}>{w.code}</span>
                      <span style={{fontSize:13,flex:1}}>{L(w.th,w.en)}</span>
                      <span style={{fontSize:10,fontWeight:700,color:w.hazard?"#DC2626":"var(--g2)",whiteSpace:"nowrap"}}>{w.hazard?L("อันตราย","Hazardous"):L("ไม่อันตราย","Non-Haz")}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:14}}>{L("ขั้นตอน e-Manifest ระบบ DIW","DIW e-Manifest Process")}</h3>
                <div style={{display:"flex",flexDirection:"column",gap:0}}>
                  {[
                    {no:1,th:"ลงทะเบียนโรงงานในระบบ e-Manifest (gims.diw.go.th)",en:"Register factory in e-Manifest system (gims.diw.go.th)"},
                    {no:2,th:"บันทึกรหัสกากของเสียและปริมาณที่เกิดขึ้น",en:"Record waste codes and quantities generated"},
                    {no:3,th:"จัดทำ Manifest เลือกผู้รับกำจัดที่มีใบอนุญาต",en:"Create manifest, select licensed waste disposal contractor"},
                    {no:4,th:"แจ้งขนส่ง — ยืนยันรับกากของเสีย",en:"Confirm transport — waste receipt confirmed"},
                    {no:5,th:"รายงานประจำปีต่อกรมโรงงานอุตสาหกรรม",en:"Annual report to Department of Industrial Works"},
                  ].map(s=>(
                    <div key={s.no} style={{display:"flex",gap:12,padding:"13px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:"var(--g1)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{s.no}</div>
                      <div style={{fontSize:13,color:"var(--text)",lineHeight:1.5,paddingTop:4}}>{L(s.th,s.en)}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"var(--gll)",borderRadius:"var(--r)",padding:"14px 16px",marginTop:16}}>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--g1)",marginBottom:4}}>💡 {L("Zero Waste to Landfill","Zero Waste to Landfill")}</div>
                  <p style={{fontSize:12,color:"var(--muted)"}}>{L("เป้าหมาย: กากของเสียที่ฝังกลบ < 1% ของกากทั้งหมด — ต้องมีหลักฐานใบรับกากจากผู้รับกำจัดที่ได้รับอนุญาต","Target: landfilled waste <1% of total — requires manifests from licensed disposal contractors.")}</p>
                </div>
              </div>
            </div>
            <div style={{background:"var(--g1)",borderRadius:"var(--r-lg)",padding:"28px 32px",display:"flex",gap:20,alignItems:"center"}}>
              <span style={{fontSize:36}}>📱</span>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:4}}>{L("VERDIX Waste Tracker (Phase 2)","VERDIX Waste Tracker (Phase 2)")}</div>
                <p style={{fontSize:13,color:"rgba(255,255,255,.65)"}}>{L("ระบบติดตามกากของเสียแบบ Real-time ด้วย RFID และ IoT — บันทึกน้ำหนัก สร้าง Manifest อัตโนมัติ และส่งรายงาน DIW","Real-time waste tracking with RFID and IoT — auto weight recording, manifest creation, and DIW reporting.")}</p>
              </div>
              <button className="btn-accent" style={{whiteSpace:"nowrap"}} onClick={()=>nav("register")}>{L("แจ้งความสนใจ","Register Interest")}</button>
            </div>
          </div>
        </section>
      )}

      {/* ── IOT MONITORING ── */}
      {tab==="monitor" && (
        <section className="section">
          <div className="container">
            <span className="section-tag">● ระบบติดตาม IoT / IOT MONITORING SYSTEMS</span>
            <h2 className="section-title">{L("ระบบติดตามสิ่งแวดล้อมแบบ Real-time","Real-time Environmental Monitoring Systems")}</h2>
            <p style={{color:"var(--muted)",fontSize:15,marginBottom:36}}>{L("เชื่อมเซ็นเซอร์จากโรงงานผ่านโปรโตคอลมาตรฐาน ส่งข้อมูลขึ้น VERDIX Cloud Dashboard พร้อมแจ้งเตือนเมื่อค่าเกินมาตรฐาน","Connect factory sensors via standard protocols, push data to VERDIX Cloud Dashboard with threshold alerts.")}</p>

            {/* Architecture Diagram */}
            <div style={{background:"var(--g1)",borderRadius:"var(--r-lg)",padding:28,marginBottom:36}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,.5)",marginBottom:16,letterSpacing:1,textTransform:"uppercase"}}>Data Pipeline Architecture</div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                {[
                  {label:"Sensors / PLCs",sub:"PM, pH, Flow, Energy",icon:"🔌"},
                  {arrow:"→"},
                  {label:"MQTT Broker / Gateway",sub:"Mosquitto / HiveMQ",icon:"📡"},
                  {arrow:"→"},
                  {label:"VERDIX Data API",sub:"REST / WebSocket",icon:"☁️"},
                  {arrow:"→"},
                  {label:"Real-time Dashboard",sub:"Alert + Trend",icon:"📊"},
                  {arrow:"→"},
                  {label:"Auto Report",sub:"DIW / PCD / TGO",icon:"📋"},
                ].map((item,i)=>(
                  item.arrow
                  ? <span key={i} style={{color:"var(--ga)",fontSize:20,fontWeight:700}}>{item.arrow}</span>
                  : <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:"var(--r)",padding:"12px 16px",textAlign:"center",flex:1,minWidth:110}}>
                      <div style={{fontSize:22,marginBottom:4}}>{item.icon}</div>
                      <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{item.label}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.45)",marginTop:2}}>{item.sub}</div>
                    </div>
                ))}
              </div>
            </div>

            {/* Protocols */}
            <h3 style={{fontSize:18,color:"var(--g1)",marginBottom:16,fontFamily:"'Playfair Display',serif"}}>{L("โปรโตคอลที่รองรับ","Supported Protocols")}</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:40}}>
              {iotProtocols.map(p=>(
                <div key={p.name} style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"18px 16px",borderLeft:`4px solid ${p.color}`}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:22}}>{p.icon}</span>
                    <span style={{fontSize:15,fontWeight:700,color:"var(--g1)"}}>{p.name}</span>
                  </div>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{L(p.use_th,p.use_en)}</p>
                </div>
              ))}
            </div>

            {/* Sensor Categories */}
            <h3 style={{fontSize:18,color:"var(--g1)",marginBottom:16,fontFamily:"'Playfair Display',serif"}}>{L("ประเภทเซ็นเซอร์สิ่งแวดล้อม","Environmental Sensor Types")}</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
              {monitorSensors.map(c=>(
                <div key={c.cat_th} style={{background:"var(--gll)",borderRadius:"var(--r)",padding:"16px"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--g1)",marginBottom:12,paddingBottom:8,borderBottom:"1px solid var(--gl)"}}>{L(c.cat_th,c.cat_en)}</div>
                  {c.sensors.map(s=>(
                    <div key={s} style={{fontSize:12,color:"var(--text)",padding:"5px 0",borderBottom:"1px solid rgba(0,0,0,.05)",display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{color:"var(--ga)",fontSize:10}}>●</span>{s}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{background:"var(--gll)",border:"1px solid var(--gl)",borderRadius:"var(--r)",padding:"18px 22px",marginTop:28,display:"flex",gap:14,alignItems:"flex-start"}}>
              <span style={{fontSize:22}}>🛠️</span>
              <div>
                <div style={{fontWeight:700,color:"var(--g1)",fontSize:14,marginBottom:4}}>{L("ต้องการติดตั้งระบบ IoT Monitoring?","Want to Install IoT Monitoring?")}</div>
                <p style={{fontSize:13,color:"var(--muted)"}}>{L("ทีมวิศวกรของ VERDIX ให้คำปรึกษาการออกแบบระบบ เลือก Sensor เชื่อมต่อ MQTT/Modbus TCP และตั้งค่า Dashboard ให้ครบ","VERDIX engineers consult on system design, sensor selection, MQTT/Modbus TCP connectivity, and full dashboard configuration.")}</p>
              </div>
              <button className="btn-accent" style={{whiteSpace:"nowrap",flexShrink:0}} onClick={()=>nav("experts")}>{L("ขอคำปรึกษา","Get Consultation")}</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ─── Eco Factory Page ─────────────────────────────────────────
function EcoFactoryPage({ lang, nav, initialTab = "home" }) {
  const [tab, setTab] = useState("home");
  const [appStep, setAppStep] = useState(1);
  const [appForm, setAppForm] = useState({
    factoryName:"", taxId:"", address:"", province:"", industry:"", employees:"",
    contactName:"", contactEmail:"", contactPhone:"", contactPos:"",
    hasISO:"", energyKwh:"", wasteKg:"", waterM3:"",
    targetLevel:"GI 1", consultant:"", comments:""
  });
  const [appSubmitted, setAppSubmitted] = useState(false);
  const setF = (k,v) => setAppForm(p=>({...p,[k]:v}));

  useEffect(() => {
    if (initialTab) setTab(initialTab);
  }, [initialTab]);

  const subNav = [
    {id:"home",   th:"หน้าหลัก",        en:"Overview"},
    {id:"guide",  th:"หลักเกณฑ์ ECO FACTORY", en:"Eco Factory Criteria"},
    {id:"news",   th:"ประชาสัมพันธ์",   en:"News & PR"},
    {id:"benefit",th:"สิทธิประโยชน์",    en:"Benefits"},
    {id:"process",th:"ขั้นตอนและตารางประชุม", en:"Process & Meeting Schedule"},
    {id:"apply",  th:"ขอขึ้นทะเบียนรับรอง", en:"Certification Registration"},
    {id:"db",     th:"ฐานข้อมูล",        en:"Database"},
  ];

  const pillars = [
    {icon:"🌫️", en:"Zero Emission",            th:"ลดการปล่อยมลพิษเป็นศูนย์"},
    {icon:"🤝", en:"Symbiosis with Community",  th:"อยู่ร่วมกับชุมชนอย่างกลมกลืน"},
    {icon:"⚙️", en:"Reliable Production",       th:"กระบวนการผลิตที่เชื่อถือได้"},
    {icon:"🌿", en:"Environment Management",    th:"ระบบบริหารจัดการสิ่งแวดล้อม"},
    {icon:"⚡", en:"Resource & Energy Efficiency",th:"ใช้ทรัพยากรและพลังงานอย่างมีประสิทธิภาพ"},
  ];

  const cats14 = [
    {no:1, icon:"🌿",th:"วัตถุดิบและบรรจุภัณฑ์",     en:"Raw Materials & Packaging",       desc_th:"การคัดเลือกวัตถุดิบที่เป็นมิตรต่อสิ่งแวดล้อม ลด Waste จากต้นทาง",desc_en:"Selecting eco-friendly raw materials, minimizing upstream waste."},
    {no:2, icon:"⚡",th:"พลังงาน",                    en:"Energy",                          desc_th:"การตรวจวัด ลดการใช้พลังงาน และเพิ่มสัดส่วนพลังงานทดแทน",desc_en:"Monitor, reduce energy use, and increase renewable energy share."},
    {no:3, icon:"💧",th:"น้ำและน้ำเสีย",               en:"Water & Wastewater",              desc_th:"บริหารจัดการน้ำแบบ Closed-loop ลดการปล่อยน้ำเสียสู่สิ่งแวดล้อม",desc_en:"Closed-loop water management, minimize wastewater discharge."},
    {no:4, icon:"🌬️",th:"คุณภาพอากาศ",               en:"Air Quality",                     desc_th:"ควบคุมการปล่อยฝุ่น ก๊าซ VOC และสารมลพิษอากาศตามมาตรฐาน",desc_en:"Control dust, VOC, and air pollutants per standards."},
    {no:5, icon:"🗑️",th:"การจัดการขยะ",              en:"Waste Management",                desc_th:"คัดแยก ลด นำกลับมาใช้ใหม่ มุ่งสู่ Zero Waste to Landfill",desc_en:"Segregate, reduce, reuse — targeting Zero Waste to Landfill."},
    {no:6, icon:"♻️",th:"เศรษฐกิจหมุนเวียน",         en:"Circular Economy",               desc_th:"นำของเสียกลับมาใช้ประโยชน์ เชื่อมโยง Industrial Symbiosis",desc_en:"Valorize waste, link industrial symbiosis."},
    {no:7, icon:"🧪",th:"สารเคมีและวัสดุอันตราย",     en:"Chemicals & Hazardous Materials", desc_th:"จัดเก็บ ใช้ และกำจัดสารเคมีตาม MSDS และกฎหมายวัตถุอันตราย",desc_en:"Store, use, and dispose of chemicals per MSDS and hazmat law."},
    {no:8, icon:"🛡️",th:"ความปลอดภัยและอาชีวอนามัย", en:"Occupational Health & Safety",    desc_th:"ระบบความปลอดภัยที่ครอบคลุม ลดอุบัติเหตุ ดูแลสุขภาพพนักงาน",desc_en:"Comprehensive safety system, accident reduction, employee health."},
    {no:9, icon:"🚛",th:"โลจิสติกส์สีเขียว",          en:"Green Logistics",                 desc_th:"ลดการปล่อย CO₂ จากการขนส่ง วางแผนเส้นทางอย่างมีประสิทธิภาพ",desc_en:"Reduce transport CO₂, optimize routing efficiency."},
    {no:10,icon:"🛒",th:"การจัดซื้อสีเขียว",          en:"Green Procurement",               desc_th:"กำหนดเกณฑ์สิ่งแวดล้อมในการคัดเลือกคู่ค้าและผลิตภัณฑ์",desc_en:"Set environmental criteria for supplier and product selection."},
    {no:11,icon:"🌳",th:"ความหลากหลายทางชีวภาพ",      en:"Biodiversity",                    desc_th:"ปกป้องระบบนิเวศรอบโรงงาน ปลูกต้นไม้ ลดผลกระทบต่อธรรมชาติ",desc_en:"Protect local ecosystem, plant trees, minimize nature impact."},
    {no:12,icon:"🤝",th:"การมีส่วนร่วมของชุมชน",       en:"Community Engagement",            desc_th:"สร้างความสัมพันธ์กับชุมชน ตอบสนองข้อกังวล สนับสนุนกิจกรรมท้องถิ่น",desc_en:"Build community relations, address concerns, support local activities."},
    {no:13,icon:"💰",th:"การสร้างรายได้ชุมชน",         en:"Community Income",                desc_th:"สร้างโอกาสการจ้างงานและรายได้ให้ชุมชนรอบโรงงาน",desc_en:"Create employment and income opportunities for surrounding community."},
    {no:14,icon:"🔗",th:"ห่วงโซ่อุปทานสีเขียว",       en:"Green Supply Chain",              desc_th:"ขยายมาตรฐานสิ่งแวดล้อมสู่คู่ค้าและซัพพลายเออร์ในห่วงโซ่",desc_en:"Extend environmental standards to supply chain partners."},
  ];

  const procSteps = [
    {no:1, icon:"📝", th:"สมัครสมาชิกและกรอกข้อมูลโรงงาน",     en:"Register & Enter Factory Info",   desc_th:"สมัครสมาชิกในระบบ VERDIX กรอกข้อมูลโรงงาน ประเภทกิจการ และข้อมูลการผลิต",desc_en:"Register on VERDIX, fill in factory info, industry type and production data."},
    {no:2, icon:"📋", th:"ทำ Self-Assessment ออนไลน์",            en:"Complete Online Self-Assessment", desc_th:"ตอบแบบประเมิน 14 หมวด ในระบบ VERDIX เพื่อวัดระดับความพร้อม",desc_en:"Answer 14-category assessment on VERDIX to measure readiness level."},
    {no:3, icon:"🤝", th:"จับคู่ผู้เชี่ยวชาญ (Expert Matching)", en:"Expert Matching",                 desc_th:"ระบบแนะนำผู้เชี่ยวชาญ Eco-Factory ที่เหมาะสม ช่วยเตรียมความพร้อมและเอกสาร",desc_en:"System recommends suitable Eco-Factory experts to prepare documents."},
    {no:4, icon:"📁", th:"จัดทำเอกสารและหลักฐาน",                en:"Prepare Documentation",           desc_th:"รวบรวมและ Upload หลักฐาน เช่น บิลพลังงาน รายงานน้ำเสีย ใบรับรองต่างๆ",desc_en:"Collect and upload evidence: energy bills, wastewater reports, certificates."},
    {no:5, icon:"🔍", th:"ผู้ตรวจประเมินตรวจสอบ (Auditor Review)",en:"Auditor Review",                desc_th:"ผู้ตรวจประเมินที่ได้รับการรับรองจาก ส.อ.ท. ตรวจสอบเอกสารและลงพื้นที่",desc_en:"FTI-certified auditor reviews documents and conducts on-site inspection."},
    {no:6, icon:"🏆", th:"รับรองและออกใบประกาศ",                 en:"Certification & Certificate",     desc_th:"คณะกรรมการพิจารณาผล ออกใบรับรองโรงงานอุตสาหกรรมเชิงนิเวศ",desc_en:"Committee reviews results, issues Eco-Factory certification."},
  ];

  const schedule2569 = [
    {round:"1/2569", date:"10 มี.ค. 2569", deadline:"10 ก.พ. 2569", payment:"27 ก.พ. 2569", auditor:"24 ก.พ. 2569"},
    {round:"2/2569", date:"9 มิ.ย. 2569",  deadline:"11 พ.ค. 2569", payment:"29 พ.ค. 2569", auditor:"26 พ.ค. 2569"},
    {round:"3/2569", date:"8 ก.ย. 2569",   deadline:"10 ส.ค. 2569", payment:"28 ส.ค. 2569", auditor:"25 ส.ค. 2569"},
    {round:"4/2569", date:"8 ธ.ค. 2569",   deadline:"9 พ.ย. 2569",  payment:"27 พ.ย. 2569", auditor:"24 พ.ย. 2569"},
  ];

  const certifiedFactories = [
    {name:"บริษัท ไทยอุตสาหกรรม จำกัด",        province:"ระยอง",     level:"GI 3", year:2566, industry:"ยานยนต์"},
    {name:"บริษัท อีสเทิร์น ฟู้ด จำกัด",        province:"ชลบุรี",    level:"GI 2", year:2566, industry:"อาหาร"},
    {name:"โรงงานแม่น้ำพลาสติก จำกัด",          province:"สมุทรปราการ",level:"GI 1", year:2567, industry:"พลาสติก"},
    {name:"บริษัท นอร์ธ เท็กซ์ไทล์ จำกัด",     province:"ลำพูน",     level:"GI 2", year:2567, industry:"สิ่งทอ"},
    {name:"บริษัท กรีนเพาเวอร์ อีเนอร์จี จำกัด",province:"ปทุมธานี",  level:"GI 4", year:2567, industry:"พลังงาน"},
    {name:"บริษัท ซีเอสทีอิเล็กทรอนิกส์ จำกัด",province:"นครราชสีมา",level:"GI 3", year:2568, industry:"อิเล็กทรอนิกส์"},
  ];

  const consultants = [
    {name:"ผู้เชี่ยวชาญ Eco-Factory", area:"Eco-Factory, ESG, EIA", org:"VERDIX Network"},
    {name:"ผู้เชี่ยวชาญ Carbon Footprint", area:"Carbon Footprint, Energy", org:"VERDIX Network"},
    {name:"ผู้เชี่ยวชาญ ISO 14001", area:"ISO 14001, Waste Management", org:"VERDIX Network"},
    {name:"ผู้เชี่ยวชาญ ESG Reporting", area:"GRI, ESG Reporting", org:"VERDIX Network"},
  ];

  const inputSt = {width:"100%",padding:"10px 14px",border:"1.5px solid var(--border)",borderRadius:8,fontSize:14,marginTop:6};
  const labelSt = {fontSize:13,fontWeight:600,color:"var(--text)",display:"block",marginTop:14};

  return (
    <>
      {/* Page Header */}
      <div className="page-hdr">
        <div className="container">
          <h1>{lang==="th"?"โรงงานอุตสาหกรรมเชิงนิเวศ (Eco Factory)":"Eco-Industrial Factory Standard"}</h1>
          <p>{lang==="th"?"มาตรฐานโรงงานสีเขียวของสภาอุตสาหกรรมแห่งประเทศไทย — สมัคร ประเมิน และรับรองผ่าน VERDIX":"Thailand's green factory standard from FTI — apply, assess, and certify through VERDIX."}</p>
        </div>
      </div>

      {/* Sub Navigation */}
      <div style={{background:"#fff",borderBottom:"1px solid var(--border)",position:"sticky",top:62,zIndex:50}}>
        <div className="container" style={{display:"flex",gap:0,overflowX:"auto"}}>
          {subNav.map(s => (
            <button key={s.id} onClick={() => setTab(s.id)}
              style={{padding:"14px 20px",border:"none",background:"transparent",fontSize:14,fontWeight:tab===s.id?700:500,color:tab===s.id?"var(--g1)":"var(--muted)",borderBottom:tab===s.id?"3px solid var(--g1)":"3px solid transparent",cursor:"pointer",whiteSpace:"nowrap",transition:"all .14s"}}>
              {lang==="th"?s.th:s.en}
            </button>
          ))}
        </div>
      </div>

      <div style={{minHeight:"60vh"}}>

      {/* ── TAB: HOME ── */}
      {tab==="home" && (
        <section className="section">
          <div className="container">
            {/* Welcome */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center",marginBottom:64}}>
              <div>
                <span className="section-tag">● WELCOME TO ECO FACTORY</span>
                <h2 className="section-title">{lang==="th"?"ยินดีต้อนรับสู่โรงงานอุตสาหกรรมเชิงนิเวศ":"Welcome to Eco-Industrial Factory"}</h2>
                <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.8,marginBottom:16}}>
                  {lang==="th"
                    ?"สภาอุตสาหกรรมแห่งประเทศไทย (ส.อ.ท.) ได้กำหนดมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ (Eco Factory) เพื่อพัฒนาภาคอุตสาหกรรมให้มีการดำเนินงานภายใต้เกณฑ์ที่เป็นมิตรกับสิ่งแวดล้อม"
                    :"The Federation of Thai Industries (FTI) has established the Eco-Industrial Factory (Eco Factory) standard to develop industrial operations under environmentally responsible criteria."}
                </p>
                <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.8,marginBottom:28}}>
                  {lang==="th"
                    ?"VERDIX เป็น Official Partner Platform สำหรับการเตรียมความพร้อม ตรวจประเมิน และสมัครขอรับรอง Eco Factory ผ่านระบบดิจิทัลครบวงจร"
                    :"VERDIX is the official partner platform for Eco Factory preparation, assessment, and certification application through a complete digital system."}
                </p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <button className="btn btn-dark" onClick={() => setTab("apply")}>{lang==="th"?"สมัครรับรองเลย":"Apply Now"}</button>
                  <button className="btn-accent" style={{padding:"11px 22px",fontSize:15}} onClick={() => nav("factory-check")}>{lang==="th"?"ทดลองประเมินออนไลน์":"Try Online Assessment"}</button>
                </div>
              </div>
              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[["247","โรงงานในโครงการ","Factories enrolled"],["14","หมวดการประเมิน","Assessment categories"],["5","ระดับ Green Industry","GI Levels"],["70,000+","โรงงานทั่วไทย","Factories in Thailand"]].map(([n,th,en])=>(
                  <div key={n} style={{background:"var(--gll)",borderRadius:"var(--r)",padding:"24px 20px",textAlign:"center",border:"1px solid var(--gl)"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:900,color:"var(--g1)"}}>{n}</div>
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{lang==="th"?th:en}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Pillars */}
            <div style={{textAlign:"center",marginBottom:36}}>
              <span className="section-tag">● 5 PILLARS OF ECO FACTORY</span>
              <h2 className="section-title">{lang==="th"?"5 เสาหลักของโรงงานอุตสาหกรรมเชิงนิเวศ":"5 Pillars of Eco-Industrial Factory"}</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:48}}>
              {pillars.map(p=>(
                <div key={p.en} style={{background:"white",border:"1.5px solid var(--gl)",borderRadius:"var(--r-lg)",padding:"28px 16px",textAlign:"center",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--ga)";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--gl)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                  <div style={{fontSize:36,marginBottom:14}}>{p.icon}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--g1)",lineHeight:1.4}}>{lang==="th"?p.th:p.en}</div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div style={{background:"var(--g1)",borderRadius:"var(--r-lg)",padding:"32px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:"white",marginBottom:4}}>{lang==="th"?"พร้อมเริ่มต้น?":"Ready to get started?"}</div>
                <div style={{color:"rgba(255,255,255,.65)",fontSize:15}}>{lang==="th"?"ตรวจประเมินเบื้องต้นฟรี แล้วค่อยสมัครรับรองอย่างเป็นทางการ":"Free preliminary assessment, then apply for official certification."}</div>
              </div>
              <div style={{display:"flex",gap:12}}>
                <button className="btn-accent" style={{padding:"12px 22px",fontSize:14}} onClick={() => nav("factory-check")}>{lang==="th"?"ประเมินเบื้องต้น":"Quick Assessment"}</button>
                <button style={{background:"rgba(255,255,255,.15)",color:"white",border:"1px solid rgba(255,255,255,.3)",padding:"12px 22px",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer"}} onClick={() => setTab("apply")}>{lang==="th"?"สมัครรับรอง":"Apply Now"}</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: GUIDELINES ── */}
      {tab==="guide" && (
        <section className="section">
          <div className="container">
            <div style={{textAlign:"center",marginBottom:44}}>
              <span className="section-tag">● 14 ASSESSMENT CATEGORIES</span>
              <h2 className="section-title">{lang==="th"?"หลักเกณฑ์การประเมิน 14 หมวด":"14 Assessment Categories"}</h2>
              <p className="section-sub" style={{margin:"0 auto"}}>{lang==="th"?"คุณลักษณะที่ดีของโรงงานอุตสาหกรรมเชิงนิเวศ ครอบคลุมทุกมิติด้านสิ่งแวดล้อม สังคม และการจัดการ":"Defining characteristics of an Eco-Industrial Factory, covering all environmental, social, and management dimensions."}</p>
            </div>
            <div className="grid-2" style={{gap:14}}>
              {cats14.map(c=>(
                <div key={c.no} style={{background:"white",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"18px 20px",display:"flex",gap:14,alignItems:"flex-start",transition:"border-color .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--ga)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                  <div style={{width:40,height:40,background:"var(--gl)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{c.icon}</div>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{background:"var(--g1)",color:"white",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>หมวด {c.no}</span>
                      <span style={{fontSize:15,fontWeight:700,color:"var(--g1)"}}>{lang==="th"?c.th:c.en}</span>
                    </div>
                    <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{lang==="th"?c.desc_th:c.desc_en}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:"var(--gll)",borderRadius:"var(--r)",padding:"20px 24px",marginTop:28,display:"flex",gap:12,alignItems:"center"}}>
              <span style={{fontSize:20}}>📄</span>
              <div>
                <div style={{fontWeight:600,color:"var(--g1)",fontSize:14}}>{lang==="th"?"ดาวน์โหลดเอกสารหลักเกณฑ์ฉบับเต็ม":"Download Full Guidelines Document"}</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>{lang==="th"?"เอกสาร Eco Factory Standard v.2024 จาก สภาอุตสาหกรรมแห่งประเทศไทย":"Eco Factory Standard v.2024 from the Federation of Thai Industries"}</div>
              </div>
              <a href="https://www.ecofactory.fti.or.th/page/view/download" target="_blank" rel="noreferrer"
                style={{marginLeft:"auto",background:"var(--g1)",color:"white",padding:"8px 18px",borderRadius:7,fontSize:13,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap"}}>
                {lang==="th"?"ดาวน์โหลด":"Download"}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: NEWS & PR ── */}
      {tab==="news" && (
        <section className="section">
          <div className="container">
            <div style={{textAlign:"center",marginBottom:44}}>
              <span className="section-tag">● ECO FACTORY NEWS</span>
              <h2 className="section-title">{lang==="th"?"ประชาสัมพันธ์ Eco Factory":"Eco Factory News & PR"}</h2>
              <p className="section-sub" style={{margin:"0 auto"}}>
                {lang==="th"
                  ?"ข่าวสาร กำหนดการ และประกาศสำคัญสำหรับโรงงานที่ต้องการเตรียมความพร้อมหรือขอรับรอง Eco Factory"
                  :"Updates, schedules, and announcements for factories preparing for Eco Factory certification."}
              </p>
            </div>
            <div className="grid-3" style={{gap:20}}>
              {[
                {tag:"2569",title_th:"เปิดรอบประชุมรับรอง Eco Factory ประจำปี 2569",title_en:"2026 Eco Factory certification meeting rounds are open",desc_th:"ตรวจสอบกำหนดส่งใบสมัคร ชำระเงิน และรอบประชุมรับรองได้ในหน้า ขั้นตอนและตารางประชุม",desc_en:"Check application, payment, and certification meeting dates in the Process & Meeting Schedule section."},
                {tag:"VERDIX",title_th:"VERDIX รองรับการเตรียมเอกสารและ Gap Analysis",title_en:"VERDIX supports documentation and Gap Analysis",desc_th:"เริ่มจากแบบประเมินออนไลน์ จับคู่ผู้เชี่ยวชาญ และจัดเตรียมหลักฐานก่อนยื่นรับรอง",desc_en:"Start with online assessment, expert matching, and evidence preparation before certification submission."},
                {tag:"IoT",title_th:"เชื่อมข้อมูลหน้างานเพื่อใช้ประกอบการรับรอง",title_en:"Connect site data for certification evidence",desc_th:"รองรับข้อมูลพลังงาน น้ำ อากาศ ของเสีย และ GHG Activity Data จาก Sensor, PLC, MQTT และ Excel",desc_en:"Supports energy, water, air, waste, and GHG activity data from sensors, PLCs, MQTT, and Excel."}
              ].map(item => (
                <div key={item.title_en} style={{background:"#fff",border:"1px solid var(--border)",borderRadius:"var(--r-lg)",padding:24,boxShadow:"0 12px 28px rgba(16,40,30,.06)"}}>
                  <span className="badge">{item.tag}</span>
                  <h3 style={{fontSize:19,color:"var(--g1)",margin:"14px 0 10px"}}>{lang==="th"?item.title_th:item.title_en}</h3>
                  <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.75}}>{lang==="th"?item.desc_th:item.desc_en}</p>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:34}}>
              <button className="btn btn-dark" onClick={() => setTab("process")}>{lang==="th"?"ดูขั้นตอนและตารางประชุม":"View Process & Schedule"}</button>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: BENEFITS ── */}
      {tab==="benefit" && (
        <section className="section">
          <div className="container">
            <div style={{textAlign:"center",marginBottom:44}}>
              <span className="section-tag">● BENEFITS</span>
              <h2 className="section-title">{lang==="th"?"สิทธิประโยชน์ของ Eco Factory":"Eco Factory Benefits"}</h2>
            </div>
            <div className="grid-3" style={{gap:20,marginBottom:40}}>
              {[
                {icon:"💰",th:"ยกเว้นค่าธรรมเนียมโรงงาน",en:"Factory fee exemptions",desc_th:"โรงงานที่ได้รับการรับรอง Eco Factory ได้รับการยกเว้นค่าธรรมเนียมใบอนุญาตโรงงาน",desc_en:"Certified factories receive exemption from factory license fees."},
                {icon:"⭐",th:"สิทธิ์ BOI พิเศษ",en:"Special BOI Privileges",desc_th:"เข้าถึงสิทธิประโยชน์พิเศษจาก BOI สำหรับการลงทุนด้านสิ่งแวดล้อม",desc_en:"Access special BOI investment privileges for environmental improvements."},
                {icon:"🏆",th:"เทียบอุตสาหกรรมสีเขียว GI",en:"Green Industry (GI) Equivalence",desc_th:"สามารถเทียบมาตรฐาน Eco Factory กับ Green Industry Level 1–3 ได้",desc_en:"Eco Factory certification can be equated to Green Industry Levels 1–3."},
                {icon:"📈",th:"ยกระดับความน่าเชื่อถือ",en:"Enhanced Credibility",desc_th:"แสดงความรับผิดชอบต่อสิ่งแวดล้อม เพิ่มโอกาสทางธุรกิจและ ESG Supply Chain",desc_en:"Demonstrate environmental responsibility, boost ESG supply chain opportunities."},
                {icon:"🌏",th:"เปิดตลาดส่งออก",en:"Export Market Access",desc_th:"ลูกค้าต่างประเทศและ Global Supply Chain ต้องการหลักฐานมาตรฐานสิ่งแวดล้อม",desc_en:"International clients and global supply chains require environmental certifications."},
                {icon:"⚡",th:"ลดต้นทุนพลังงาน",en:"Energy Cost Reduction",desc_th:"การปรับปรุงประสิทธิภาพพลังงานเฉลี่ยลดได้ 15–30% ต่อปี",desc_en:"Energy efficiency improvements average 15–30% annual reduction."},
                {icon:"♻️",th:"ลดต้นทุนของเสีย",en:"Waste Cost Reduction",desc_th:"การจัดการของเสียอย่างเป็นระบบช่วยลดค่าใช้จ่ายในการกำจัดและสร้างรายได้",desc_en:"Systematic waste management reduces disposal costs and creates revenue."},
                {icon:"🤝",th:"สัมพันธ์ชุมชนดีขึ้น",en:"Better Community Relations",desc_th:"ลดข้อร้องเรียนจากชุมชน สร้างภาพลักษณ์ที่ดีและความยั่งยืนในระยะยาว",desc_en:"Reduce community complaints, build positive image and long-term sustainability."},
                {icon:"📋",th:"รองรับกฎหมาย Climate Act",en:"Climate Act Compliance Ready",desc_th:"เตรียมพร้อมรับกฎหมาย Climate Change Act และภาษีคาร์บอนที่กำลังจะมา",desc_en:"Prepare for the upcoming Climate Change Act and carbon tax regulations."},
              ].map(b=>(
                <div key={b.th} style={{background:"white",borderRadius:"var(--r-lg)",border:"1px solid var(--border)",padding:"24px 20px",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow)";e.currentTarget.style.borderColor="var(--ga)";e.currentTarget.style.transform="translateY(-3px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="none"}}>
                  <div style={{fontSize:32,marginBottom:12}}>{b.icon}</div>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--g1)",marginBottom:8}}>{lang==="th"?b.th:b.en}</div>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{lang==="th"?b.desc_th:b.desc_en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: PROCESS ── */}
      {tab==="process" && (
        <section className="section">
          <div className="container">
            <div style={{textAlign:"center",marginBottom:44}}>
              <span className="section-tag">● CERTIFICATION PROCESS</span>
              <h2 className="section-title">{lang==="th"?"ขั้นตอนการขอรับรอง Eco Factory":"Eco Factory Certification Process"}</h2>
              <p className="section-sub" style={{margin:"0 auto"}}>{lang==="th"?"ดำเนินการผ่าน VERDIX Platform ตั้งแต่ต้นจนได้รับใบรับรอง":"Complete the full process through the VERDIX Platform."}</p>
            </div>
            {/* Steps */}
            <div style={{position:"relative",marginBottom:56}}>
              <div style={{position:"absolute",top:32,left:"8%",right:"8%",height:2,background:"var(--gl)",zIndex:0}} />
              <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,position:"relative",zIndex:1}}>
                {procSteps.map(s=>(
                  <div key={s.no} style={{textAlign:"center"}}>
                    <div style={{width:56,height:56,borderRadius:"50%",background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:22,boxShadow:"0 0 0 6px var(--gll)"}}>{s.icon}</div>
                    <div style={{fontSize:11,fontWeight:700,color:"var(--ga)",letterSpacing:1,marginBottom:4}}>STEP {s.no}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--g1)",lineHeight:1.4,marginBottom:6}}>{lang==="th"?s.th:s.en}</div>
                    <p style={{fontSize:11,color:"var(--muted)",lineHeight:1.5}}>{lang==="th"?s.desc_th:s.desc_en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Schedule 2569 */}
            <div style={{marginBottom:32}}>
              <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:4,fontFamily:"'Playfair Display',serif"}}>{lang==="th"?"ตารางการประชุมรับรอง Eco Factory 2569":"Certification Meeting Schedule 2026"}</h3>
              <p style={{color:"var(--muted)",fontSize:14,marginBottom:20}}>{lang==="th"?"โรงงานต้องส่งใบสมัครและชำระเงินก่อนวันประชุมตามตารางด้านล่าง":"Factories must submit applications and complete payment before the scheduled meeting dates below."}</p>
            </div>
            <div className="tbl-wrap" style={{marginBottom:32}}>
              <table>
                <thead>
                  <tr>
                    <th>{lang==="th"?"ครั้งที่":"Round"}</th>
                    <th>{lang==="th"?"วันประชุม":"Meeting Date"}</th>
                    <th>{lang==="th"?"ส่งใบสมัคร":"Submit Application"}</th>
                    <th>{lang==="th"?"ชำระเงิน":"Payment"}</th>
                    <th>{lang==="th"?"Auditor ส่งเอกสาร":"Auditor Submission"}</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule2569.map(r=>(
                    <tr key={r.round}>
                      <td><span className="badge">{r.round}</span></td>
                      <td style={{fontWeight:600,color:"var(--g1)"}}>{r.date}</td>
                      <td>{r.deadline}</td>
                      <td>{r.payment}</td>
                      <td>{r.auditor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{textAlign:"center"}}>
              <button className="btn btn-dark" onClick={() => setTab("apply")}>{lang==="th"?"สมัครรับรองเลย →":"Apply for Certification →"}</button>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: APPLY ── */}
      {tab==="apply" && (
        <section className="section">
          <div className="container" style={{maxWidth:760}}>
            {!appSubmitted ? (
              <>
                <div style={{textAlign:"center",marginBottom:36}}>
                  <span className="section-tag">● APPLICATION FORM</span>
                  <h2 className="section-title">{lang==="th"?"แบบฟอร์มสมัครขอรับรอง Eco Factory":"Eco Factory Certification Application"}</h2>
                  {/* Step indicators */}
                  <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:20}}>
                    {[1,2,3,4].map(n=>(
                      <div key={n} style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:32,height:32,borderRadius:"50%",background:appStep>=n?"var(--g1)":"var(--border)",color:appStep>=n?"white":"var(--muted)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,transition:"all .2s"}}>{n}</div>
                        {n<4 && <div style={{width:40,height:2,background:appStep>n?"var(--g1)":"var(--border)",transition:"background .2s"}} />}
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:13,color:"var(--muted)",marginTop:8}}>
                    {["ข้อมูลโรงงาน","ข้อมูลผู้ติดต่อ","ข้อมูลการประกอบกิจการ","ยืนยันและส่ง"][appStep-1]}
                  </div>
                </div>

                <div style={{background:"white",borderRadius:"var(--r-lg)",border:"1px solid var(--border)",padding:36}}>
                  {appStep===1 && (
                    <>
                      <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:20}}>🏭 {lang==="th"?"ข้อมูลโรงงาน":"Factory Information"}</h3>
                      <div className="form-row">
                        <div><label style={labelSt}>{lang==="th"?"ชื่อโรงงาน / บริษัท":"Factory / Company Name"} *</label><input style={inputSt} value={appForm.factoryName} onChange={e=>setF("factoryName",e.target.value)} placeholder={lang==="th"?"บริษัท ... จำกัด":"Company Ltd."} /></div>
                        <div><label style={labelSt}>{lang==="th"?"เลขทะเบียนโรงงาน / เลขนิติบุคคล":"Factory Reg. / Tax ID"} *</label><input style={inputSt} value={appForm.taxId} onChange={e=>setF("taxId",e.target.value)} placeholder="0-0000-00000-00-0" /></div>
                      </div>
                      <label style={labelSt}>{lang==="th"?"ที่อยู่โรงงาน":"Factory Address"} *</label>
                      <textarea style={{...inputSt,height:72}} value={appForm.address} onChange={e=>setF("address",e.target.value)} placeholder={lang==="th"?"เลขที่ ถนน ตำบล อำเภอ...":"No., Street, Sub-district, District..."} />
                      <div className="form-row">
                        <div><label style={labelSt}>{lang==="th"?"จังหวัด":"Province"} *</label>
                          <select style={inputSt} value={appForm.province} onChange={e=>setF("province",e.target.value)}>
                            <option value="">{lang==="th"?"-- เลือกจังหวัด --":"-- Select Province --"}</option>
                            {["กรุงเทพมหานคร","นนทบุรี","ปทุมธานี","สมุทรปราการ","ชลบุรี","ระยอง","ลำพูน","นครราชสีมา","สุราษฎร์ธานี","อื่นๆ"].map(p=><option key={p}>{p}</option>)}
                          </select>
                        </div>
                        <div><label style={labelSt}>{lang==="th"?"ประเภทอุตสาหกรรม":"Industry Type"} *</label>
                          <select style={inputSt} value={appForm.industry} onChange={e=>setF("industry",e.target.value)}>
                            <option value="">{lang==="th"?"-- เลือกประเภท --":"-- Select Type --"}</option>
                            {["อาหารและเครื่องดื่ม","ยานยนต์และชิ้นส่วน","อิเล็กทรอนิกส์","เคมีและปิโตรเคมี","พลาสติก","สิ่งทอ","เหล็กและโลหะ","พลังงาน","อื่นๆ"].map(t=><option key={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                      <label style={labelSt}>{lang==="th"?"จำนวนพนักงาน":"Number of Employees"}</label>
                      <select style={inputSt} value={appForm.employees} onChange={e=>setF("employees",e.target.value)}>
                        <option value="">-- เลือก --</option>
                        {["1–50 คน","51–200 คน","201–500 คน","501–1,000 คน","1,001 คนขึ้นไป"].map(r=><option key={r}>{r}</option>)}
                      </select>
                    </>
                  )}

                  {appStep===2 && (
                    <>
                      <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:20}}>👤 {lang==="th"?"ข้อมูลผู้ติดต่อหลัก":"Main Contact Information"}</h3>
                      <div className="form-row">
                        <div><label style={labelSt}>{lang==="th"?"ชื่อ-นามสกุล":"Full Name"} *</label><input style={inputSt} value={appForm.contactName} onChange={e=>setF("contactName",e.target.value)} /></div>
                        <div><label style={labelSt}>{lang==="th"?"ตำแหน่ง":"Position"}</label><input style={inputSt} value={appForm.contactPos} onChange={e=>setF("contactPos",e.target.value)} placeholder={lang==="th"?"EHS Manager, ผู้จัดการฝ่ายสิ่งแวดล้อม":"EHS Manager..."} /></div>
                      </div>
                      <div className="form-row">
                        <div><label style={labelSt}>{lang==="th"?"อีเมล":"Email"} *</label><input style={inputSt} type="email" value={appForm.contactEmail} onChange={e=>setF("contactEmail",e.target.value)} /></div>
                        <div><label style={labelSt}>{lang==="th"?"โทรศัพท์":"Phone"} *</label><input style={inputSt} value={appForm.contactPhone} onChange={e=>setF("contactPhone",e.target.value)} placeholder="0X-XXXX-XXXX" /></div>
                      </div>
                      <label style={labelSt}>{lang==="th"?"มีผู้ตรวจประเมิน/ที่ปรึกษาแล้วหรือไม่?":"Do you have an auditor/consultant?"}</label>
                      <select style={inputSt} value={appForm.consultant} onChange={e=>setF("consultant",e.target.value)}>
                        <option value="">{lang==="th"?"-- เลือก --":"-- Select --"}</option>
                        <option value="yes">{lang==="th"?"มีแล้ว":"Yes, I have one"}</option>
                        <option value="need">{lang==="th"?"ต้องการให้ VERDIX จัดหา":"I need VERDIX to recommend"}</option>
                        <option value="no">{lang==="th"?"ยังไม่มี ขอดูรายชื่อก่อน":"Not yet, let me check the list"}</option>
                      </select>
                    </>
                  )}

                  {appStep===3 && (
                    <>
                      <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:20}}>📊 {lang==="th"?"ข้อมูลการประกอบกิจการ":"Operations Data"}</h3>
                      <div className="form-row">
                        <div><label style={labelSt}>{lang==="th"?"ปริมาณการใช้ไฟฟ้า (kWh/เดือน)":"Electricity usage (kWh/month)"}</label><input style={inputSt} type="number" value={appForm.energyKwh} onChange={e=>setF("energyKwh",e.target.value)} placeholder="เช่น 150000" /></div>
                        <div><label style={labelSt}>{lang==="th"?"ปริมาณน้ำใช้ (ลบ.ม./เดือน)":"Water usage (m³/month)"}</label><input style={inputSt} type="number" value={appForm.waterM3} onChange={e=>setF("waterM3",e.target.value)} placeholder="เช่น 5000" /></div>
                      </div>
                      <div className="form-row">
                        <div><label style={labelSt}>{lang==="th"?"ปริมาณขยะ (กก./เดือน)":"Waste generated (kg/month)"}</label><input style={inputSt} type="number" value={appForm.wasteKg} onChange={e=>setF("wasteKg",e.target.value)} placeholder="เช่น 10000" /></div>
                        <div><label style={labelSt}>{lang==="th"?"มีมาตรฐาน ISO 14001 หรือไม่?":"ISO 14001 certified?"}</label>
                          <select style={inputSt} value={appForm.hasISO} onChange={e=>setF("hasISO",e.target.value)}>
                            <option value="">-- เลือก --</option>
                            <option value="yes">{lang==="th"?"มี (ยังมีผล)":"Yes (currently valid)"}</option>
                            <option value="expired">{lang==="th"?"มี (หมดอายุแล้ว)":"Yes (expired)"}</option>
                            <option value="no">{lang==="th"?"ไม่มี":"No"}</option>
                          </select>
                        </div>
                      </div>
                      <label style={labelSt}>{lang==="th"?"ระดับ Green Industry ที่ต้องการขอ":"Target Green Industry Level"}</label>
                      <select style={inputSt} value={appForm.targetLevel} onChange={e=>setF("targetLevel",e.target.value)}>
                        {["GI 1","GI 2","GI 3","GI 4","GI 5"].map(l=><option key={l}>{l}</option>)}
                      </select>
                      <label style={labelSt}>{lang==="th"?"ข้อมูลเพิ่มเติม / ข้อสอบถาม":"Additional Info / Questions"}</label>
                      <textarea style={{...inputSt,height:80}} value={appForm.comments} onChange={e=>setF("comments",e.target.value)} placeholder={lang==="th"?"ระบุข้อมูลเพิ่มเติม...":"Additional information..."} />
                    </>
                  )}

                  {appStep===4 && (
                    <>
                      <h3 style={{fontSize:17,color:"var(--g1)",marginBottom:20}}>✅ {lang==="th"?"ตรวจสอบและยืนยันข้อมูล":"Review & Confirm"}</h3>
                      {[
                        [lang==="th"?"ชื่อโรงงาน":"Factory", appForm.factoryName||"-"],
                        [lang==="th"?"เลข ID":"Tax ID", appForm.taxId||"-"],
                        [lang==="th"?"จังหวัด":"Province", appForm.province||"-"],
                        [lang==="th"?"ประเภทอุตสาหกรรม":"Industry", appForm.industry||"-"],
                        [lang==="th"?"ผู้ติดต่อ":"Contact", appForm.contactName||"-"],
                        [lang==="th"?"อีเมล":"Email", appForm.contactEmail||"-"],
                        [lang==="th"?"ระดับที่ต้องการ":"Target Level", appForm.targetLevel||"-"],
                      ].map(([k,v])=>(
                        <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--border)",fontSize:14}}>
                          <span style={{color:"var(--muted)"}}>{k}</span><span style={{fontWeight:600,color:"var(--text)"}}>{v}</span>
                        </div>
                      ))}
                      <div style={{background:"var(--gll)",borderRadius:"var(--r)",padding:"14px 16px",marginTop:20,fontSize:13,color:"var(--g2)"}}>
                        {lang==="th"
                          ?"✅ เมื่อส่งใบสมัครแล้ว ทีม VERDIX จะติดต่อกลับภายใน 1–2 วันทำการ เพื่อยืนยันข้อมูลและนัดหมายผู้เชี่ยวชาญ"
                          :"✅ After submission, the VERDIX team will contact you within 1–2 business days to confirm details and arrange your expert."}
                      </div>
                    </>
                  )}

                  <div style={{display:"flex",justifyContent:"space-between",marginTop:28,paddingTop:20,borderTop:"1px solid var(--border)"}}>
                    <button onClick={()=>setAppStep(s=>Math.max(1,s-1))} style={{background:"#F3F4F6",border:"none",padding:"10px 20px",borderRadius:8,fontSize:14,fontWeight:600,cursor:appStep===1?"not-allowed":"pointer",opacity:appStep===1?.4:1}}>
                      ← {lang==="th"?"ย้อนกลับ":"Back"}
                    </button>
                    {appStep<4
                      ? <button className="btn btn-dark" onClick={()=>setAppStep(s=>s+1)}>{lang==="th"?"ถัดไป →":"Next →"}</button>
                      : <button className="btn btn-dark" style={{background:"var(--ga)"}} onClick={()=>setAppSubmitted(true)}>{lang==="th"?"ส่งใบสมัคร ✓":"Submit Application ✓"}</button>
                    }
                  </div>
                </div>
              </>
            ) : (
              <div style={{textAlign:"center",padding:"60px 40px",background:"white",borderRadius:"var(--r-lg)",border:"1px solid var(--border)"}}>
                <div style={{fontSize:64,marginBottom:16}}>🎉</div>
                <h2 style={{fontSize:26,color:"var(--g1)",marginBottom:12}}>{lang==="th"?"ส่งใบสมัครสำเร็จ!":"Application Submitted!"}</h2>
                <p style={{color:"var(--muted)",fontSize:16,marginBottom:28,maxWidth:480,margin:"0 auto 28px"}}>
                  {lang==="th"
                    ?"ทีม VERDIX จะติดต่อกลับภายใน 1–2 วันทำการ เพื่อยืนยันข้อมูลและจัดหาผู้เชี่ยวชาญที่เหมาะสม"
                    :"The VERDIX team will contact you within 1–2 business days to confirm details and arrange a suitable expert."}
                </p>
                <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                  <button className="btn btn-dark" onClick={()=>nav("factory-check")}>{lang==="th"?"ทำแบบประเมินเบื้องต้น":"Start Quick Assessment"}</button>
                  <button className="btn-accent" style={{padding:"11px 22px",fontSize:15}} onClick={()=>{setAppSubmitted(false);setAppStep(1)}}>{lang==="th"?"กลับหน้าสมัคร":"Back to Form"}</button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── TAB: DATABASE ── */}
      {tab==="db" && (
        <section className="section">
          <div className="container">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32}}>
              {/* Certified Factories */}
              <div>
                <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:16,fontFamily:"'Playfair Display',serif"}}>🏭 {lang==="th"?"รายชื่อโรงงานที่ได้รับการรับรอง":"Certified Factories"}</h3>
                <div className="tbl-wrap">
                  <table>
                    <thead><tr><th>{lang==="th"?"โรงงาน":"Factory"}</th><th>{lang==="th"?"ระดับ":"Level"}</th><th>{lang==="th"?"จังหวัด":"Province"}</th></tr></thead>
                    <tbody>
                      {certifiedFactories.map((f,i)=>(
                        <tr key={i}>
                          <td><div style={{fontWeight:600,fontSize:13}}>{f.name}</div><div style={{fontSize:11,color:"var(--muted)"}}>{f.industry} · {f.year}</div></td>
                          <td><span style={{background:"var(--gl)",color:"var(--g2)",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{f.level}</span></td>
                          <td style={{fontSize:13}}>{f.province}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{textAlign:"center",marginTop:12}}>
                  <a href="https://www.ecofactory.fti.or.th/page/view/certified_factory" target="_blank" rel="noreferrer" style={{fontSize:13,color:"var(--ga)",fontWeight:600}}>
                    {lang==="th"?"ดูรายชื่อทั้งหมดที่ FTI →":"View full list at FTI →"}
                  </a>
                </div>
              </div>
              {/* Consultants */}
              <div>
                <h3 style={{fontSize:20,color:"var(--g1)",marginBottom:16,fontFamily:"'Playfair Display',serif"}}>👥 {lang==="th"?"รายชื่อที่ปรึกษา VERDIX":"VERDIX Consultants"}</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {consultants.map((c,i)=>(
                    <div key={i} style={{background:"white",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:"var(--g1)"}}>{c.name}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>{c.area}</div>
                        <div style={{fontSize:11,color:"var(--ga)",fontWeight:600,marginTop:2}}>{c.org}</div>
                      </div>
                      <button className="btn-accent" style={{padding:"6px 14px",fontSize:12}} onClick={()=>nav("experts")}>{lang==="th"?"ติดต่อ":"Contact"}</button>
                    </div>
                  ))}
                </div>
                <div style={{textAlign:"center",marginTop:12}}>
                  <button className="btn btn-dark" style={{fontSize:13,padding:"9px 20px"}} onClick={()=>nav("experts")}>{lang==="th"?"ดูผู้เชี่ยวชาญทั้งหมด →":"View All Experts →"}</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
}

// ─── Factory Check Page ────────────────────────────────────────
function AmataAwardsPage({ lang }) {
  const L = (th,en) => lang==="th"?th:en;
  const deckSlides = Array.from({ length: 15 }, (_, i) => `/amata-green-blueprint-2026/slide-${String(i + 1).padStart(2, "0")}.png`);
  const awards = [
    {icon:"🏭",title:"Industrial Waste Governance",desc:L("ระบบบริหารจัดการของเสียอุตสาหกรรมที่ตรวจสอบได้","Auditable industrial waste governance system")},
    {icon:"♻️",title:"Circular Economy Practice",desc:L("ลดของเสียจากต้นทาง ใช้ซ้ำ และรีไซเคิลอย่างเป็นระบบ","Reduce waste at source, reuse, and recycle systematically")},
    {icon:"📊",title:"Data & Traceability",desc:L("ข้อมูล หลักฐาน และรายงานที่พร้อมต่อการประเมิน","Assessment-ready data, evidence, and reports")},
  ];

  return (
    <>
      <div className="page-hdr">
        <div className="container">
          <h1>Amata Best Waste Management Awards</h1>
          <p>{L("แพลตฟอร์มสนับสนุนการเตรียมความพร้อมด้านการจัดการของเสีย สำหรับองค์กรที่ต้องการยกระดับมาตรฐานและเข้าร่วมโครงการรางวัล", "A readiness platform for industrial waste management excellence, helping organizations prepare evidence, improve practices, and participate in the awards program.")}</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:36,alignItems:"start"}}>
            <div>
              <span className="section-tag">● AWARDS READINESS</span>
              <h2 className="section-title">{L("เตรียมเอกสาร ประเมินช่องว่าง และวางแผนปรับปรุง", "Prepare Evidence, Assess Gaps, and Improve")}</h2>
              <p className="section-sub" style={{marginBottom:28}}>
                {L("ช่วยโรงงานรวบรวมข้อมูลของเสีย จัดหมวดหมู่หลักฐาน ติดตามผลการปรับปรุง และเชื่อมโยงผู้เชี่ยวชาญด้าน Waste Management ก่อนยื่นประเมิน", "Helps factories organize waste data, structure evidence, track improvement actions, and connect with waste management experts before submission.")}
              </p>
              <div className="grid-3">
                {awards.map(item => (
                  <div key={item.title} className="feat-card">
                    <div className="feat-icon">{item.icon}</div>
                    <h3 className="feat-title">{item.title}</h3>
                    <p className="feat-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:"var(--g1)",borderRadius:"var(--r-lg)",padding:28,color:"#fff",boxShadow:"var(--shadow-lg)"}}>
              <div style={{fontSize:12,letterSpacing:2,textTransform:"uppercase",color:"var(--ga)",fontWeight:800,marginBottom:8}}>Next Module</div>
              <h3 style={{fontSize:24,color:"#fff",marginBottom:12}}>Waste Management Assessment</h3>
              <p style={{color:"rgba(255,255,255,.72)",fontSize:14,lineHeight:1.8,marginBottom:22}}>
                {L("ขั้นต่อไปสามารถเพิ่มแบบประเมินเฉพาะโครงการ Amata Awards พร้อม scoring, checklist และ upload หลักฐาน", "Next, we can add a dedicated scoring checklist with evidence upload for the Amata Awards workflow.")}
              </p>
              <button className="btn-accent" style={{padding:"11px 22px",fontSize:14}} onClick={() => { window.location.href = "https://app.verdixgreen.com/#waste-award"; }}>{L("สมัครเข้าร่วมโครงการ", "Join Program")}</button>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{background:"var(--gll)"}}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">● SOURCE DECK</span>
            <h2 className="section-title">Amata Green Blueprint 2026</h2>
            <p className="section-sub">{L("ดึงสไลด์จากไฟล์ PPT มาใช้เป็นแกลเลอรีบนหน้าเว็บแล้ว เนื่องจากไฟล์ต้นฉบับเป็นรูปภาพทั้งสไลด์", "Slides from the PPT are now used as a web gallery. The source deck is image-based, so text extraction requires OCR if needed later.")}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {deckSlides.map((src, i) => (
              <a key={src} href={src} target="_blank" rel="noreferrer" style={{display:"block",background:"#fff",border:"1px solid var(--border)",borderRadius:12,overflow:"hidden",boxShadow:"var(--shadow)",textDecoration:"none"}}>
                <img src={src} alt={`Amata Green Blueprint 2026 slide ${i + 1}`} style={{display:"block",width:"100%",aspectRatio:"16/9",objectFit:"cover"}} />
                <div style={{padding:"10px 12px",fontSize:13,fontWeight:700,color:"var(--g1)"}}>Slide {i + 1}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const FCHECK_CATS = [
  {id:"energy",icon:"⚡",th:"พลังงาน",en:"Energy",items:[
    {th:"มีระบบตรวจวัดการใช้พลังงานรายเดือน",en:"Monthly energy monitoring system in place"},
    {th:"ติดตั้งมิเตอร์ไฟฟ้าย่อยในพื้นที่สำคัญ",en:"Sub-meters installed in key areas"},
    {th:"มีแผนปรับปรุงประสิทธิภาพพลังงาน",en:"Energy efficiency improvement plan exists"},
    {th:"ใช้พลังงานทดแทน (Solar, Biogas ฯลฯ)",en:"Renewable energy in use (Solar, Biogas, etc.)"},
  ]},
  {id:"water",icon:"💧",th:"น้ำและน้ำเสีย",en:"Water & Wastewater",items:[
    {th:"มีระบบตรวจวัดปริมาณน้ำใช้",en:"Water consumption monitoring system"},
    {th:"มีระบบบำบัดน้ำเสียที่ผ่านมาตรฐาน",en:"Certified wastewater treatment system"},
    {th:"นำน้ำที่บำบัดแล้วกลับมาใช้ใหม่",en:"Treated water recycled/reused"},
    {th:"ไม่มีการปล่อยน้ำเสียโดยไม่ผ่านการบำบัด",en:"No untreated wastewater discharge"},
  ]},
  {id:"waste",icon:"🗑️",th:"การจัดการขยะ",en:"Waste Management",items:[
    {th:"มีการแยกขยะตามประเภท",en:"Waste segregated by type"},
    {th:"มีแผนลดขยะสู่หลุมฝังกลบ (Zero Waste to Landfill)",en:"Zero Waste to Landfill plan in place"},
    {th:"บันทึกปริมาณขยะรายเดือน",en:"Monthly waste volume recorded"},
    {th:"มีผู้รับซื้อหรือรีไซเคิลขยะอุตสาหกรรม",en:"Industrial waste buyer/recycler contracted"},
  ]},
  {id:"air",icon:"🌬️",th:"คุณภาพอากาศ",en:"Air Quality",items:[
    {th:"ตรวจวัดคุณภาพอากาศตามกฎหมายสม่ำเสมอ",en:"Regular air quality testing per regulations"},
    {th:"มีระบบกำจัดฝุ่นหรือกลิ่นจากกระบวนการผลิต",en:"Dust/odor control system for production process"},
    {th:"บันทึกผลการตรวจวัดและรายงานต่อหน่วยงาน",en:"Monitoring results recorded and reported to authorities"},
    {th:"ไม่เคยถูกร้องเรียนด้านกลิ่นหรือฝุ่น",en:"No complaints regarding odor or dust"},
  ]},
  {id:"ghg",icon:"🌡️",th:"ก๊าซเรือนกระจก (GHG)",en:"Greenhouse Gas (GHG)",items:[
    {th:"มีการคำนวณ Carbon Footprint องค์กร (CFO)",en:"Corporate Carbon Footprint (CFO) calculated"},
    {th:"จัดทำรายงาน GHG ตามมาตรฐาน ISO 14064",en:"GHG report following ISO 14064 standard"},
    {th:"มีแผนลด GHG อย่างน้อย 1 โครงการ",en:"At least 1 GHG reduction project in place"},
    {th:"มีเป้าหมาย Net Zero หรือ Carbon Neutral",en:"Net Zero or Carbon Neutral target set"},
  ]},
  {id:"safety",icon:"🛡️",th:"ความปลอดภัยและอาชีวอนามัย",en:"Occupational Health & Safety",items:[
    {th:"ผ่านการรับรอง ISO 45001 หรือ มอก.18001",en:"ISO 45001 or TIS 18001 certified"},
    {th:"มีคณะกรรมการความปลอดภัย (คปอ.)",en:"Safety committee (OHS Committee) established"},
    {th:"อัตราการบาดเจ็บจากการทำงานเป็นศูนย์",en:"Zero lost-time injury rate"},
    {th:"มีการฝึกซ้อมดับเพลิงและอพยพประจำปี",en:"Annual fire drill and evacuation exercise conducted"},
  ]},
];

function FactoryCheckPage({ lang, nav }) {
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("energy");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (catId, idx) => {
    const key = `${catId}-${idx}`;
    setAnswers(prev => ({...prev, [key]: !prev[key]}));
  };

  const score = (catId) => {
    const cat = FCHECK_CATS.find(c => c.id===catId);
    if (!cat) return 0;
    return cat.items.filter((_,i) => answers[`${catId}-${i}`]).length;
  };

  const totalScore = FCHECK_CATS.reduce((sum,c) => sum + score(c.id), 0);
  const totalItems = FCHECK_CATS.reduce((sum,c) => sum + c.items.length, 0);
  const pct = Math.round((totalScore / totalItems) * 100);

  const getLevel = () => {
    if (pct >= 85) return {th:"ดีเยี่ยม — พร้อม Eco-Factory ระดับสูง",en:"Excellent — Ready for advanced Eco-Factory",color:"#059669"};
    if (pct >= 65) return {th:"ดี — ต้องพัฒนาบางหมวด",en:"Good — Some categories need improvement",color:"#2D6A4F"};
    if (pct >= 40) return {th:"ปานกลาง — ต้องการแผนพัฒนา",en:"Fair — Development plan needed",color:"#D97706"};
    return {th:"ต้องพัฒนา — แนะนำปรึกษาผู้เชี่ยวชาญ",en:"Needs work — Expert consultation recommended",color:"#DC2626"};
  };

  const activeCat = FCHECK_CATS.find(c => c.id===activeTab);
  const catScore = score(activeTab);
  const catPct = Math.round((catScore / activeCat.items.length) * 100);

  return (
    <>
      <div className="page-hdr">
        <div className="container">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <span style={{background:"rgba(82,183,136,.25)",color:"var(--ga)",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,letterSpacing:1}}>FACTORY HEALTH CHECK</span>
          </div>
          <h1>{lang==="th"?"ระบบตรวจประเมินโรงงาน / ภาวะแวดล้อม":"Factory Environmental Health Check"}</h1>
          <p>{lang==="th"?"ประเมินความพร้อมด้านสิ่งแวดล้อมของโรงงานคุณใน 6 หมวดหลัก รับผลทันที":"Assess your factory's environmental readiness across 6 key dimensions — get instant results."}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:28}}>

            {/* Sidebar: categories */}
            <div>
              <div style={{background:"var(--g1)",borderRadius:"var(--r-lg)",overflow:"hidden",marginBottom:16}}>
                <div style={{padding:"16px 18px",borderBottom:"1px solid rgba(255,255,255,.1)"}}>
                  <div style={{color:"rgba(255,255,255,.5)",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>OVERALL SCORE</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:700,color:"var(--ga)"}}>{pct}%</span>
                    <span style={{color:"rgba(255,255,255,.5)",fontSize:13}}>{totalScore}/{totalItems}</span>
                  </div>
                  <div style={{background:"rgba(255,255,255,.1)",borderRadius:20,height:6,marginTop:10}}>
                    <div style={{background:"var(--ga)",borderRadius:20,height:6,width:`${pct}%`,transition:"width .4s"}} />
                  </div>
                </div>
                {FCHECK_CATS.map(c => {
                  const s = score(c.id);
                  const p = Math.round((s/c.items.length)*100);
                  return (
                    <button key={c.id} onClick={() => setActiveTab(c.id)}
                      style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"12px 18px",background:activeTab===c.id?"rgba(82,183,136,.18)":"transparent",border:"none",borderLeft:activeTab===c.id?"3px solid var(--ga)":"3px solid transparent",cursor:"pointer",transition:"all .14s"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:18}}>{c.icon}</span>
                        <span style={{fontSize:13,fontWeight:500,color:activeTab===c.id?"var(--ga)":"rgba(255,255,255,.7)"}}>{lang==="th"?c.th:c.en}</span>
                      </div>
                      <span style={{fontSize:12,fontWeight:700,color:p>=75?"#6EE7B7":p>=50?"#FCD34D":"#FCA5A5"}}>{p}%</span>
                    </button>
                  );
                })}
              </div>
              {!submitted && (
                <button className="btn btn-dark" style={{width:"100%",padding:12}} onClick={() => setSubmitted(true)}>
                  {lang==="th"?"ดูผลการประเมิน":"View Assessment Results"}
                </button>
              )}
            </div>

            {/* Main: checklist */}
            <div>
              {!submitted ? (
                <div style={{background:"#fff",borderRadius:"var(--r-lg)",border:"1px solid var(--border)",overflow:"hidden"}}>
                  <div style={{background:"var(--gll)",padding:"20px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:24}}>{activeCat.icon}</span>
                        <h3 style={{fontSize:19,color:"var(--g1)"}}>{lang==="th"?activeCat.th:activeCat.en}</h3>
                      </div>
                      <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{catScore}/{activeCat.items.length} {lang==="th"?"ข้อผ่าน":"items passed"}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:catPct>=75?"var(--g2)":catPct>=50?"#D97706":"#DC2626"}}>{catPct}%</div>
                      <div style={{background:"var(--border)",borderRadius:20,height:6,width:80,marginTop:6}}>
                        <div style={{background:catPct>=75?"var(--ga)":catPct>=50?"#FBBF24":"#F87171",borderRadius:20,height:6,width:`${catPct}%`,transition:"width .3s"}} />
                      </div>
                    </div>
                  </div>
                  <div style={{padding:"8px 0"}}>
                    {activeCat.items.map((item,i) => {
                      const key = `${activeTab}-${i}`;
                      const checked = !!answers[key];
                      return (
                        <div key={i} onClick={() => toggle(activeTab,i)}
                          style={{display:"flex",alignItems:"center",gap:14,padding:"14px 24px",cursor:"pointer",borderBottom:"1px solid var(--border)",background:checked?"#F0FDF4":"#fff",transition:"background .15s"}}>
                          <div style={{width:22,height:22,borderRadius:6,border:checked?"none":"2px solid var(--border)",background:checked?"var(--ga)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .15s"}}>
                            {checked && <span style={{color:"#fff",fontSize:13,fontWeight:700}}>✓</span>}
                          </div>
                          <span style={{fontSize:15,color:checked?"var(--g1)":"var(--text)",fontWeight:checked?600:400}}>{lang==="th"?item.th:item.en}</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Nav between tabs */}
                  <div style={{display:"flex",justifyContent:"space-between",padding:"14px 24px",borderTop:"1px solid var(--border)"}}>
                    {(() => {
                      const idx = FCHECK_CATS.findIndex(c=>c.id===activeTab);
                      const prev = FCHECK_CATS[idx-1];
                      const next = FCHECK_CATS[idx+1];
                      return (
                        <>
                          <button onClick={() => prev&&setActiveTab(prev.id)} style={{background:"none",border:"none",color:prev?"var(--ga)":"var(--border)",fontSize:14,fontWeight:600,cursor:prev?"pointer":"default"}}>{prev?`← ${lang==="th"?prev.th:prev.en}`:""}</button>
                          <button onClick={() => next&&setActiveTab(next.id)} style={{background:"none",border:"none",color:next?"var(--ga)":"var(--border)",fontSize:14,fontWeight:600,cursor:next?"pointer":"default"}}>{next?`${lang==="th"?next.th:next.en} →`:""}</button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                /* Results */
                <div style={{background:"#fff",borderRadius:"var(--r-lg)",border:"1px solid var(--border)",padding:32}}>
                  <div style={{textAlign:"center",marginBottom:32}}>
                    <div style={{fontSize:64,marginBottom:8}}>📊</div>
                    <h2 style={{fontSize:26,color:"var(--g1)",marginBottom:8}}>{lang==="th"?"ผลการประเมินโรงงาน":"Factory Assessment Results"}</h2>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:56,fontWeight:900,color:getLevel().color,lineHeight:1}}>{pct}%</div>
                    <div style={{fontSize:16,fontWeight:600,color:getLevel().color,marginTop:8}}>{lang==="th"?getLevel().th:getLevel().en}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:28}}>
                    {FCHECK_CATS.map(c => {
                      const s = score(c.id);
                      const p = Math.round((s/c.items.length)*100);
                      return (
                        <div key={c.id} style={{background:"var(--gll)",borderRadius:"var(--r)",padding:"14px 16px",textAlign:"center"}}>
                          <div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
                          <div style={{fontSize:12,color:"var(--g1)",fontWeight:600,marginBottom:6}}>{lang==="th"?c.th:c.en}</div>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:p>=75?"var(--g2)":p>=50?"#D97706":"#DC2626"}}>{p}%</div>
                          <div style={{background:"var(--border)",borderRadius:20,height:4,marginTop:6}}>
                            <div style={{background:p>=75?"var(--ga)":p>=50?"#FBBF24":"#F87171",borderRadius:20,height:4,width:`${p}%`}} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{background:"var(--gl)",borderRadius:"var(--r)",padding:20,marginBottom:24,textAlign:"center"}}>
                    <p style={{color:"var(--g2)",fontSize:15,lineHeight:1.7}}>
                      {lang==="th"
                        ?"ต้องการรายงานผลการประเมินฉบับเต็มและคำแนะนำจากผู้เชี่ยวชาญ? ทีม VERDIX พร้อมช่วยคุณ"
                        :"Want a full assessment report with expert recommendations? The VERDIX team is ready to help."}
                    </p>
                  </div>
                  <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                    <button className="btn btn-dark" onClick={() => nav("experts")}>{lang==="th"?"ปรึกษาผู้เชี่ยวชาญ":"Consult an Expert"}</button>
                    <button className="btn-accent" style={{padding:"11px 22px",fontSize:15}} onClick={() => {setSubmitted(false);setAnswers({})}}>
                      {lang==="th"?"ทำแบบประเมินใหม่":"Restart Assessment"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer({ t, lang, nav, footer }) {
  const L = (th, en) => lang === "th" ? th : en;
  const go = (page) => {
    if (!page || page === "#") return;
    if (page.startsWith("http")) window.open(page, "_blank", "noopener,noreferrer");
    else nav(page);
  };

  return (
    <>
      <section className="site-cta">
        <div className="container site-cta-inner">
          <div>
            <h2>{L(footer.ctaTitle_th, footer.ctaTitle_en)}</h2>
            <p>{L(footer.ctaSub_th, footer.ctaSub_en)}</p>
          </div>
          <button className="btn-accent" style={{fontSize:16,padding:"13px 32px"}} onClick={() => go(footer.ctaPage)}>{L(footer.ctaButton_th, footer.ctaButton_en)}</button>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <BrandLogo className="footer-brand" />
              <p className="footer-desc">{L(footer.description_th, footer.description_en)}</p>
              <div className="footer-social">
                {(footer.socials || []).map((s, i) => (
                  s.url && s.url !== "#"
                    ? <a key={i} href={s.url} target={s.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={s.label}>{s.icon}</a>
                    : <span key={i} aria-label={s.label}>{s.icon}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-hdg">{t.quick}</div>
              {(footer.quickLinks || []).map((l, i) => (
                <button key={i} className="footer-lnk" onClick={() => go(l.page)}>{L(l.label_th, l.label_en)}</button>
              ))}
            </div>
            <div>
              <div className="footer-hdg">{t.services}</div>
              {(footer.services || []).map(s => <span key={s} className="footer-lnk">{s}</span>)}
            </div>
            <div>
              <div className="footer-hdg">{t.contact_us}</div>
              <div className="footer-contact">
                <div className="footer-contact-row"><span className="footer-contact-ico">✉</span><span>{footer.email}</span></div>
                <div className="footer-contact-row"><span className="footer-contact-ico">✉</span><span>{footer.email2}</span></div>
                <div className="footer-contact-row"><span className="footer-contact-ico">☎</span><span>{footer.phone}</span></div>
                <div className="footer-contact-row"><span className="footer-contact-ico">⌖</span><span>{footer.location}</span></div>
                <div className="footer-contact-row"><span className="footer-contact-ico">⌖</span><span>{footer.location2}</span></div>
              </div>
            </div>
            <div className="footer-lineoa">
              <div className="footer-hdg">Line OA</div>
              <img className="footer-lineqr" src="/lineoa-verdixgreen.png" alt="Line OA @verdixgreen QR code" loading="lazy" />
              <div className="footer-lineid">@verdixgreen</div>
              <div className="footer-linesub">{lang==="th"?"สแกนเพื่อเพิ่มเพื่อน":"Scan to add friend"}</div>
            </div>
          </div>
          <FooterPartners lang={lang} partners={footer.partners} />
          <div className="footer-bot">
            <span>@ 2025 copy right www.verdixgreen.com</span>
            <div className="footer-legal">
              {(footer.legalLinks || []).map((l, i) => <button key={i} onClick={() => go(l.page)}>{L(l.label_th, l.label_en)}</button>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [lang,setLang] = useState("th");
  const [page,setPage] = useState("home");
  const [sec,setSec] = useState("dashboard");
  const [user,setUser] = useState(null);
  const [articles,setArticles] = useState(INIT_ARTICLES);
  const [documents,setDocuments] = useState(INIT_DOCUMENTS);
  const [experts,setExperts] = useState(INIT_EXPERTS);
  const [slides,setSlides] = useState(() => slideApi.list());
  const [footer,setFooter] = useState(() => footerApi.list());
  const [menus,setMenus] = useState(INIT_MENUS);
  const [cmsReady,setCmsReady] = useState(false);
  const [selArt,setSelArt] = useState(null);
  const [ecoFactoryTab,setEcoFactoryTab] = useState("home");
  const [authBusy,setAuthBusy] = useState(false);
  const [authMessage,setAuthMessage] = useState(null);
  const [carbonTab,setCarbonTab] = useState("overview");
  const [cfoSubmissions,setCfoSubmissions] = useState([]);
  const [tgiSurveyResponses,setTgiSurveyResponses] = useState([]);
  const [userRoles,setUserRoles] = useState([]);

  const mapAuthUser = async (authUser) => {
    if (!authUser) return null;

    const assignedRole = await userRoleService.getRoleForEmail(authUser.email);
    const role = assignedRole?.status === "disabled"
      ? "standard_user"
      : assignedRole?.role || getUserRole(authUser);

    return {
      name: assignedRole?.full_name || authUser.user_metadata?.full_name || authUser.email,
      email: authUser.email,
      role,
    };
  };

  useEffect(() => {
    let active = true;

    async function loadCms() {
      const [loadedArticles, loadedDocuments, loadedExperts, loadedSlides, loadedFooter, loadedMenus] = await Promise.all([
        cmsService.list("articles", INIT_ARTICLES),
        cmsService.list("documents", INIT_DOCUMENTS),
        cmsService.list("experts", INIT_EXPERTS),
        cmsService.list("slides", INIT_SLIDES),
        cmsService.getFooter(INIT_FOOTER),
        cmsService.list("menus", INIT_MENUS)
      ]);

      if (!active) return;
      setArticles(normalizeArticles(loadedArticles));
      setDocuments(normalizeDocuments(loadedDocuments));
      setExperts(anonymizeExperts(loadedExperts));
      setSlides(loadedSlides);
      setFooter(loadedFooter);
      setMenus(normalizeMenus(loadedMenus));
      setCmsReady(true);
    }

    loadCms();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const mapped = await mapAuthUser(data.session?.user);
      if (active) setUser(mapped);
    }

    loadSession();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      mapAuthUser(session?.user).then((mapped) => {
        if (active) setUser(mapped);
      });
      if (event === "PASSWORD_RECOVERY") {
        setAuthMessage(null);
        setPage("reset-password");
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadCfoSubmissions() {
      if (!user?.email) {
        setCfoSubmissions([]);
        return;
      }
      const rows = isAdminRole(user.role)
        ? await cfoAssessmentService.listAll()
        : await cfoAssessmentService.listForUser(user.email);
      if (active) setCfoSubmissions(rows);
    }
    loadCfoSubmissions();
    return () => { active = false; };
  }, [user?.email, user?.role]);

  useEffect(() => {
    let active = true;
    async function loadTgiSurveyResponses() {
      if (!canViewTgiReports(user?.role)) {
        setTgiSurveyResponses([]);
        return;
      }
      const rows = await tgiSurveyService.listAll();
      if (active) setTgiSurveyResponses(rows);
    }
    loadTgiSurveyResponses();
    return () => { active = false; };
  }, [user?.role]);

  useEffect(() => {
    let active = true;
    async function loadUserRoles() {
      if (!isAdminRole(user?.role)) {
        setUserRoles([]);
        return;
      }
      const rows = await userRoleService.listAll();
      if (active) setUserRoles(rows);
    }
    loadUserRoles();
    return () => { active = false; };
  }, [user?.role]);

  useEffect(() => {
    if (cmsReady) cmsService.replaceAll("articles", articles);
  }, [articles, cmsReady]);

  useEffect(() => {
    if (cmsReady) cmsService.replaceAll("documents", documents);
  }, [documents, cmsReady]);

  useEffect(() => {
    if (cmsReady) cmsService.replaceAll("experts", experts);
  }, [experts, cmsReady]);

  useEffect(() => {
    if (cmsReady) cmsService.replaceAll("slides", slides);
  }, [slides, cmsReady]);

  useEffect(() => {
    if (cmsReady) cmsService.saveFooter(footer);
  }, [footer, cmsReady]);

  useEffect(() => {
    if (cmsReady) cmsService.replaceAll("menus", menus);
  }, [menus, cmsReady]);

  const nav = (p,data=null) => {
    setPage(p);
    if (p==="blog-detail") setSelArt(data);
    if (p==="eco-factory") setEcoFactoryTab(data?.ecoTab || "home");
    if (p==="carbon") setCarbonTab(data?.carbonTab || "overview");
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  };

  const saveCfoAssessment = async (payload) => {
    const saved = await cfoAssessmentService.saveAssessment(payload);
    setCfoSubmissions(prev => {
      const next = prev.some(item => String(item.id) === String(saved.id))
        ? prev.map(item => String(item.id) === String(saved.id) ? saved : item)
        : [saved, ...prev];
      return next;
    });
    return saved;
  };

  const reviewCfoAssessment = async (id, status, note) => {
    const reviewed = await cfoAssessmentService.reviewAssessment(id, {
      status,
      review_note: note,
      reviewer_email: user?.email || "",
    });
    if (reviewed) {
      setCfoSubmissions(prev => prev.map(item => String(item.id) === String(id) ? reviewed : item));
    }
  };

  const saveTgiSurveyResponse = async (payload) => {
    const saved = await tgiSurveyService.saveResponse(payload);
    setTgiSurveyResponses(prev => {
      const next = prev.some(item => String(item.id) === String(saved.id))
        ? prev.map(item => String(item.id) === String(saved.id) ? saved : item)
        : [saved, ...prev];
      return next;
    });
    return saved;
  };

  const importTgiSurveyResponses = async (rows) => {
    const saved = await tgiSurveyService.importResponses(rows);
    setTgiSurveyResponses(prev => {
      const map = new Map(prev.map(item => [String(item.id), item]));
      saved.forEach(item => map.set(String(item.id), item));
      return Array.from(map.values()).sort((a,b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
    });
    return saved;
  };

  const deleteTgiSurveyResponse = async (id) => {
    await tgiSurveyService.deleteResponse(id);
    setTgiSurveyResponses(prev => prev.filter(item => String(item.id) !== String(id)));
  };

  const saveUserRole = async (payload) => {
    const saved = await userRoleService.saveUserRole(payload);
    setUserRoles(prev => {
      const next = prev.some(item => String(item.id) === String(saved.id) || String(item.email).toLowerCase() === saved.email)
        ? prev.map(item => (String(item.id) === String(saved.id) || String(item.email).toLowerCase() === saved.email) ? saved : item)
        : [saved, ...prev];
      return next.sort((a,b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
    });
    if (saved.email === user?.email) setUser(prev => prev ? {...prev, name: saved.full_name || prev.name, role: saved.status === "disabled" ? "standard_user" : saved.role} : prev);
    return saved;
  };

  const deleteUserRole = async (row) => {
    if (!window.confirm(t.confirm_del)) return;
    await userRoleService.deleteUserRole(row);
    setUserRoles(prev => prev.filter(item => String(item.id) !== String(row.id) && String(item.email || "").toLowerCase() !== String(row.email || "").toLowerCase()));
  };

  const sendPasswordSetupLink = async (email) => {
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail) {
      window.alert("Email is required");
      return;
    }
    if (!isSupabaseConfigured) {
      window.alert("Supabase is not configured.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: window.location.origin,
    });

    if (error) {
      window.alert(friendlyAuthError(error));
      return;
    }

    window.alert(lang === "th"
      ? `ส่งลิงก์ตั้งรหัสผ่านไปที่ ${cleanEmail} แล้ว หากไม่พบให้ตรวจ Spam/Junk`
      : `Password setup link sent to ${cleanEmail}. Please check Inbox or Spam/Junk.`);
  };

  const friendlyAuthError = (error) => {
    const message = String(error?.message || error || "");
    const lower = message.toLowerCase();
    if (lower.includes("email rate limit")) {
      return "ระบบส่งอีเมลยืนยันบัญชีเกินโควตาชั่วคราว กรุณารอประมาณ 30-60 นาทีแล้วลองใหม่ หรือแจ้งแอดมินให้สร้างบัญชีให้ก่อน";
    }
    if (lower.includes("user already registered") || lower.includes("already registered")) {
      return "อีเมลนี้สมัครไว้แล้ว กรุณาไปหน้าเข้าสู่ระบบ หรือกดลืมรหัสผ่านเพื่อตั้งรหัสใหม่";
    }
    if (lower.includes("password")) {
      return "รหัสผ่านไม่ถูกต้องตามเงื่อนไข กรุณาตั้งอย่างน้อย 6 ตัวอักษร";
    }
    return message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
  };

  const doLogin = async (email,pass) => {
    setAuthMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!isSupabaseConfigured) {
      setAuthMessage({ type: "error", text: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first." });
      return;
    }

    if (!cleanEmail || !pass) {
      setAuthMessage({ type: "error", text: "กรุณากรอกอีเมลและรหัสผ่าน" });
      return;
    }

    setAuthBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: pass });
    setAuthBusy(false);

    if (error) {
      const notConfirmed = error.message.toLowerCase().includes("email not confirmed");
      setAuthMessage({
        type: "error",
        text: notConfirmed
          ? "อีเมลนี้สมัครแล้ว แต่ยังไม่ได้ยืนยันอีเมล กรุณากดลิงก์ยืนยันในกล่องจดหมายก่อนเข้าสู่ระบบ"
          : friendlyAuthError(error),
        canResend: notConfirmed,
      });
      return;
    }

    const authUser = data.user;
    const mapped = await mapAuthUser(authUser);
    setUser(mapped);
    setSec(mapped?.role === "tgi_report_viewer" ? "tgi-survey" : "dashboard");
    setPage(canAccessAdminPanel(mapped?.role) || isAdminUser(authUser) ? "admin" : "member");
  };

  const doRegister = async ({ name, email, org, pass }) => {
    setAuthMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!isSupabaseConfigured) {
      setAuthMessage({ type: "error", text: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first." });
      return;
    }

    if (!cleanEmail || !pass) {
      setAuthMessage({ type: "error", text: "กรุณากรอกอีเมลและรหัสผ่าน" });
      return;
    }

    setAuthBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: pass,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: name,
          organization: org
        }
      }
    });
    setAuthBusy(false);

    if (error) {
      setAuthMessage({ type: "error", text: friendlyAuthError(error) });
      return;
    }

    if (data.session?.user) {
      const mapped = await mapAuthUser(data.session.user);
      setUser(mapped);
      setPage("member");
      return;
    }

    setAuthMessage({ type: "success", text: "สมัครสมาชิกสำเร็จ กรุณาตรวจอีเมลเพื่อกดยืนยันบัญชีก่อนเข้าสู่ระบบ หากไม่พบให้ตรวจใน Spam/Junk" });
  };

  const doResendConfirmation = async (email) => {
    setAuthMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!isSupabaseConfigured) {
      setAuthMessage({ type: "error", text: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first." });
      return;
    }

    if (!cleanEmail) {
      setAuthMessage({ type: "error", text: "กรุณากรอกอีเมลก่อนส่งอีเมลยืนยันอีกครั้ง" });
      return;
    }

    setAuthBusy(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: cleanEmail,
      options: { emailRedirectTo: window.location.origin },
    });
    setAuthBusy(false);

    if (error) {
      setAuthMessage({ type: "error", text: friendlyAuthError(error), canResend: !String(error.message || "").toLowerCase().includes("email rate limit") });
      return;
    }

    setAuthMessage({ type: "success", text: "ส่งอีเมลยืนยันอีกครั้งแล้ว กรุณาตรวจ Inbox หรือ Spam/Junk" });
  };

  const doPasswordReset = async (email) => {
    setAuthMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!isSupabaseConfigured) {
      setAuthMessage({ type: "error", text: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first." });
      return;
    }

    if (!cleanEmail) {
      setAuthMessage({ type: "error", text: "กรุณากรอกอีเมลก่อนส่งลิงก์ตั้งรหัสผ่านใหม่" });
      return;
    }

    setAuthBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: window.location.origin,
    });
    setAuthBusy(false);

    if (error) {
      setAuthMessage({ type: "error", text: friendlyAuthError(error) });
      return;
    }

    setAuthMessage({ type: "success", text: "ส่งลิงก์ตั้งรหัสผ่านใหม่แล้ว กรุณาตรวจ Inbox หรือ Spam/Junk" });
  };

  const doUpdatePassword = async (pass, confirm) => {
    setAuthMessage(null);

    if (!pass || !confirm) {
      setAuthMessage({ type: "error", text: "กรุณากรอกรหัสผ่านใหม่ให้ครบ" });
      return;
    }
    if (pass.length < 8) {
      setAuthMessage({ type: "error", text: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" });
      return;
    }
    if (pass !== confirm) {
      setAuthMessage({ type: "error", text: "รหัสผ่านใหม่ไม่ตรงกัน" });
      return;
    }

    setAuthBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pass });
    setAuthBusy(false);

    if (error) {
      setAuthMessage({ type: "error", text: error.message });
      return;
    }

    setAuthMessage({ type: "success", text: "ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว กรุณาเข้าสู่ระบบอีกครั้ง" });
    await supabase.auth.signOut();
    setUser(null);
    setTimeout(() => setPage("login"), 800);
  };

  const logout = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
    setPage("home");
  };
  const t = T[lang];

  return (
    <div>
      <style>{CSS}</style>
      <AnnounceBanner lang={lang} />
      <Navbar t={t} lang={lang} setLang={setLang} page={page} nav={nav} user={user} logout={logout} menus={menus} />
      {page==="home" && <HomePage t={t} lang={lang} nav={nav} articles={articles} slides={slides} />}
      {page==="about" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:lang==="th"?"เกี่ยวกับเรา":"About Us"}]} nav={nav}/><AboutPage lang={lang} nav={nav} /></>}
      {page==="env" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_env}]} nav={nav}/><EnvironmentPage lang={lang} nav={nav} /></>}
      {page==="carbon" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_carbon}]} nav={nav}/><CarbonPage lang={lang} nav={nav} initialTab={carbonTab} /></>}
      {page==="eco-factory" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_eco}]} nav={nav}/><EcoFactoryPage lang={lang} nav={nav} initialTab={ecoFactoryTab} /></>}
      {page==="downloads" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:lang==="th"?"ดาวน์โหลดเอกสาร":"Downloads"}]} nav={nav}/><DownloadsPage lang={lang} documents={documents} /></>}
      {page==="tgi-survey" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:lang==="th"?"ศูนย์แบบประเมิน":"Assessment Center",page:"factory-check"},{label:lang==="th"?"แบบสอบถามความพึงพอใจ(TGI)":"Satisfaction Survey (TGI)"}]} nav={nav}/><TgiSurveyPage lang={lang} /></>}
      {page==="amata-awards" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_eco,page:"eco-factory"},{label:t.menu_awards}]} nav={nav}/><AmataAwardsPage lang={lang} nav={nav} /></>}
      {page==="factory-check" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_eco,page:"eco-factory"},{label:t.menu_fcheck}]} nav={nav}/><FactoryCheckPage lang={lang} nav={nav} /></>}
      {page==="blog" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_knowledge}]} nav={nav}/><BlogPage t={t} lang={lang} nav={nav} articles={articles} /></>}
      {page==="blog-detail" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_knowledge,page:"blog"},{label:lang==="th"?selArt?.title_th?.slice(0,40)+"…":selArt?.title_en?.slice(0,40)+"…"}]} nav={nav}/><BlogDetail lang={lang} article={selArt} nav={nav} /></>}
      {page==="experts" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.experts}]} nav={nav}/><ExpertsPage t={t} lang={lang} experts={experts} /></>}
      {page==="login" && <LoginPage t={t} nav={nav} doLogin={doLogin} doResendConfirmation={doResendConfirmation} doPasswordReset={doPasswordReset} authBusy={authBusy} authMessage={authMessage} />}
      {page==="reset-password" && <ResetPasswordPage nav={nav} doUpdatePassword={doUpdatePassword} authBusy={authBusy} authMessage={authMessage} />}
      {page==="register" && <RegisterPage t={t} nav={nav} doRegister={doRegister} authBusy={authBusy} authMessage={authMessage} />}
      {page==="member" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.dashboard}]} nav={nav}/><MemberDashboard user={user} cfoSubmissions={cfoSubmissions} nav={nav} /></>}
      {page==="cfo-assessment" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.dashboard,page:"member"},{label:"CFO Assessment"}]} nav={nav}/><CfoAssessmentPage user={user} nav={nav} onSave={saveCfoAssessment} /></>}
      {page==="admin" && canAccessAdminPanel(user?.role) && (
        <AdminPanel t={t} lang={lang} currentUser={user} articles={articles} setArticles={setArticles} documents={documents} setDocuments={setDocuments} experts={experts} setExperts={setExperts} slides={slides} setSlides={setSlides} footer={footer} setFooter={setFooter} menus={menus} setMenus={setMenus} cfoSubmissions={cfoSubmissions} onReviewCfo={reviewCfoAssessment} tgiSurveyResponses={tgiSurveyResponses} onSaveTgiSurvey={saveTgiSurveyResponse} onImportTgiSurvey={importTgiSurveyResponses} onDeleteTgiSurvey={deleteTgiSurveyResponse} userRoles={userRoles} onSaveUserRole={saveUserRole} onDeleteUserRole={deleteUserRole} onSendPasswordSetup={sendPasswordSetupLink} sec={sec} setSec={setSec} />
      )}
      <BackToTop />
      {page!=="admin" && <AiChatWidget lang={lang} />}
      {page!=="admin" && <Footer t={t} lang={lang} nav={nav} footer={footer} />}
    </div>
  );
}
