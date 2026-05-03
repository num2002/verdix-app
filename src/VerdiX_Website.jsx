import { useEffect, useState } from "react";
import { cmsService } from "./services/cmsService";

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
.nav-logo{cursor:pointer;display:flex;align-items:center}
.nav-tagline{font-size:9px;color:rgba(255,255,255,.4);letter-spacing:1.5px;text-transform:uppercase;display:block;margin-top:-2px}
.nav-links{display:flex;align-items:center;gap:3px;min-width:0;flex:1;justify-content:flex-end}
.nav-item{position:relative;display:flex;align-items:center}
.nav-btn{background:transparent;border:none;color:rgba(255,255,255,.75);padding:8px 9px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;line-height:1.2}
.nav-btn:hover,.nav-btn.active{color:#fff;background:rgba(255,255,255,.1)}
.nav-btn.nav-awards{max-width:174px;white-space:normal;text-align:center;line-height:1.2}
.nav-caret{font-size:10px;margin-left:5px;color:rgba(255,255,255,.55)}
.sub-menu{position:absolute;top:calc(100% + 8px);left:0;min-width:230px;background:#fff;border:1px solid rgba(229,231,235,.92);border-radius:10px;box-shadow:0 18px 44px rgba(16,40,30,.18);padding:8px;opacity:0;visibility:hidden;transform:translateY(6px);transition:all .16s;z-index:120}
.nav-item:hover .sub-menu{opacity:1;visibility:visible;transform:translateY(0)}
.sub-menu button{width:100%;border:none;background:transparent;color:var(--g1);padding:9px 10px;border-radius:7px;text-align:left;font-size:13px;font-weight:700;line-height:1.35}
.sub-menu button:hover,.sub-menu button.active{background:#ECFDF5;color:#047857}
.lang-btn{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25);padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;margin-left:5px;transition:all .15s;white-space:nowrap}
.lang-btn:hover{background:rgba(255,255,255,.22)}

/* Brand logo */
.brand-logo{display:inline-flex;flex-direction:column;align-items:flex-start;font-family:Arial Black,Impact,'DM Sans',sans-serif;line-height:.84;letter-spacing:0;text-transform:uppercase;width:max-content}
.brand-main{display:flex;align-items:flex-end;gap:3px;position:relative;width:max-content}
.brand-buu{color:#FFCC00;font-weight:900}
.brand-u2{color:#8D8D8D}
.brand-x{color:#D9D9D9;font-weight:900;font-size:.58em;align-self:center;margin:0 1px}
.brand-c{position:relative;color:#5A7F16;font-weight:900}
.brand-c::after{content:"";position:absolute;right:-.26em;top:.34em;width:.18em;height:.18em;border:.055em solid #2AF080;border-radius:50%;background:transparent}
.brand-sub{position:absolute;left:calc(100% - 1.05em);top:82%;color:#5A7F16;font-family:'DM Sans',sans-serif;font-weight:900;letter-spacing:.04em;text-transform:none;line-height:1.1;white-space:nowrap}
.brand-line{width:1.22em;height:.1em;background:#FFCC00;margin-top:.16em}
.brand-logo.nav-brand{font-size:25px}
.brand-logo.nav-brand .brand-sub{font-size:8px}
.brand-logo.auth-brand{font-size:48px;margin-bottom:16px}
.brand-logo.auth-brand .brand-sub{font-size:12px}
.auth-hero .brand-logo.auth-brand{margin-bottom:26px}
.auth-card .brand-logo.auth-brand{font-size:32px;margin-bottom:18px}
.auth-card .brand-logo.auth-brand .brand-sub{font-size:8px}
.brand-logo.admin-brand-mark{font-size:34px}
.brand-logo.admin-brand-mark .brand-sub{font-size:9px}
.brand-logo.footer-brand{font-size:38px;margin-bottom:16px}
.brand-logo.footer-brand .brand-sub{font-size:10px}
.brand-logo.hero-brand{font-size:clamp(52px,8vw,96px);margin-bottom:8px}
.brand-logo.hero-brand .brand-sub{font-size:.17em}
.footer-partner-logo{width:min(300px,100%);margin:10px 0 18px;display:block}
.footer-partner-logo svg{width:100%;height:auto;display:block}
.partner-buu{font-family:Arial Black,Impact,'DM Sans',sans-serif;font-weight:900;letter-spacing:-3px}
.partner-caption{font-family:'DM Sans',Arial,sans-serif;font-weight:900;letter-spacing:.04em}

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
.art-card{cursor:pointer;background:#fff;border:1px solid rgba(229,231,235,.82);border-radius:12px;overflow:hidden;box-shadow:0 12px 28px rgba(16,40,30,.08);display:flex;flex-direction:column;min-height:390px;transition:transform .2s,box-shadow .2s,border-color .2s}
.art-card:hover{transform:translateY(-4px);box-shadow:0 20px 42px rgba(16,40,30,.13);border-color:rgba(82,183,136,.38)}
.art-img{height:138px;background:linear-gradient(135deg,#EAF8EF,#D8F3DC);display:flex;align-items:center;justify-content:center;font-size:42px;border-bottom:1px solid rgba(229,231,235,.7)}
.art-body{padding:20px;display:flex;flex-direction:column;flex:1}
.art-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.art-meta .badge{white-space:nowrap}
.art-date{font-size:12px;color:#94A3B8;white-space:nowrap}
.art-title{font-family:'Playfair Display',Georgia,serif;font-size:20px;line-height:1.32;color:var(--g1);margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.art-excerpt{font-size:14px;line-height:1.75;color:#526174;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:18px}
.art-footer{margin-top:auto;padding-top:14px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:14px;font-size:13px;color:var(--muted)}
.art-author{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.read-more{color:var(--g2);font-weight:800;white-space:nowrap}

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
.hero{position:relative;overflow:hidden;min-height:520px;display:flex;align-items:center;background:#f7fbf8}
.hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(250,250,248,.96) 0%,rgba(250,250,248,.88) 46%,rgba(250,250,248,.45) 100%);z-index:1}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:background-image .35s ease;filter:saturate(.95)}
.hero .container{position:relative;z-index:2;width:100%}
.hero-copy{max-width:720px}
.hero-tag{display:inline-flex;align-items:center;gap:6px;color:var(--g1);font-size:15px;font-weight:500;margin-bottom:4px}
.hero-title{font-size:clamp(38px,6vw,70px);color:var(--g1);letter-spacing:0;margin-bottom:4px}
.hero-title em{color:var(--ga);font-style:normal}
.hero-kicker{font-size:clamp(18px,2.5vw,26px);color:var(--ga);font-family:'Playfair Display',serif;font-style:italic;margin-bottom:14px;letter-spacing:0}
.hero-sub{color:var(--text);font-size:16px;line-height:1.8;max-width:780px;margin-bottom:22px}
.hero-ctas{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.hero .btn-ghost{color:var(--g1);border-color:rgba(27,67,50,.18);background:rgba(255,255,255,.45)}
.hero .btn-ghost:hover{background:#fff;border-color:rgba(27,67,50,.32)}
.hero-stats{display:flex;gap:30px;flex-wrap:wrap}
.stat-num{font-size:17px;font-weight:700;color:var(--g1)}
.stat-lbl{font-size:13px;color:var(--muted);margin-top:1px}
.hero-slide-card{margin-top:18px;display:flex;align-items:center;gap:10px}
.slide-dot{width:9px;height:9px;border-radius:50%;border:1px solid rgba(27,67,50,.35);background:rgba(255,255,255,.8);cursor:pointer;transition:all .18s}
.slide-dot.active{width:24px;border-radius:20px;background:var(--ga);border-color:var(--ga)}
.slide-nav{width:34px;height:34px;border-radius:50%;border:1px solid rgba(27,67,50,.16);background:rgba(255,255,255,.74);color:var(--g1);font-size:18px;display:inline-flex;align-items:center;justify-content:center;transition:all .18s}
.slide-nav:hover{background:#fff;border-color:rgba(27,67,50,.3)}

/* Footer */
.site-cta{background:linear-gradient(135deg,var(--g1),var(--g3));color:#fff;padding:34px 0}
.site-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:28px}
.site-cta h2{font-size:clamp(25px,4vw,38px);margin-bottom:6px;color:#fff}
.site-cta p{color:rgba(255,255,255,.82);font-size:16px;max-width:650px;line-height:1.7}
.footer{background:#10281e;color:rgba(255,255,255,.78);padding:54px 0 0;border-top:1px solid rgba(255,255,255,.08)}
.footer-grid{display:grid;grid-template-columns:1.35fr .78fr .9fr 1fr;gap:42px;align-items:start}
.footer-desc{font-size:14px;line-height:1.8;margin:16px 0 20px;max-width:370px;color:rgba(255,255,255,.72)}
.footer-social{display:flex;gap:10px;flex-wrap:wrap}
.footer-social a,.footer-social span{width:34px;height:34px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:#fff;text-decoration:none;font-size:15px;transition:all .18s}
.footer-social a:hover{background:var(--ga);transform:translateY(-1px)}
.footer-hdg{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#fff;font-weight:800;margin-bottom:14px}
.footer-lnk{display:block;background:none;border:none;padding:5px 0;color:rgba(255,255,255,.7);font-size:14px;text-align:left;text-decoration:none;transition:all .16s}
.footer-lnk:hover{color:#fff;transform:translateX(2px)}
.footer-contact{display:grid;gap:10px}
.footer-contact-row{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:rgba(255,255,255,.76)}
.footer-contact-ico{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;background:rgba(82,183,136,.14);color:var(--ga);flex-shrink:0}
.footer-bot{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:44px;padding:18px 0;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:rgba(255,255,255,.58)}
.footer-legal{display:flex;gap:18px;flex-wrap:wrap}
.footer-legal button{background:none;border:none;color:rgba(255,255,255,.58);font-size:13px;padding:0}
.footer-legal button:hover{color:#fff}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.fade-in{animation:fadeUp .5s ease forwards}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}

@media(max-width:900px){.grid-3{grid-template-columns:1fr 1fr}.experts-grid,.articles-grid{grid-template-columns:1fr 1fr}.directory-tools{flex-direction:column}.filters{justify-content:flex-start}.search-wrap{width:100%;flex:auto}.auth-page{grid-template-columns:1fr}.auth-hero{display:none}.nav-links .nav-btn:not(.always){display:none}.admin-wrap{grid-template-columns:1fr}.admin-side{position:relative;width:auto;overflow:visible;display:flex;flex-wrap:wrap;gap:8px;padding:18px}.admin-brand{width:100%;margin-bottom:4px;padding-bottom:14px}.side-section{display:none}.side-item{width:auto;margin-bottom:0}.admin-main{padding:24px 18px}.adm-stats{grid-template-columns:1fr 1fr}.footer-grid{grid-template-columns:1fr 1fr}.site-cta-inner{align-items:flex-start;flex-direction:column}.hero{min-height:560px}.hero::before{background:rgba(250,250,248,.9)}}
@media(max-width:600px){.grid-3,.grid-2,.experts-grid,.articles-grid{grid-template-columns:1fr}.auth-panel{padding:24px 18px}.auth-card{padding:24px 20px}.hero{min-height:620px;align-items:flex-start;padding-top:44px}.hero-stats{flex-wrap:wrap;gap:20px}.hero-ctas .btn,.hero-ctas .btn-ghost{width:100%;text-align:center}.adm-toolbar{align-items:flex-start;flex-direction:column}.adm-stats,.form-row{grid-template-columns:1fr}.modal{padding:20px}.footer-grid{grid-template-columns:1fr}.footer-bot{align-items:flex-start;flex-direction:column}.site-cta .btn-accent{width:100%}.back-top{bottom:16px;right:16px}}
`;
const CATS = ["Net Zero","ESG","Eco-Factory","GHG","Green Industry","Policy","คุณภาพอากาศ","คุณภาพน้ำ","กากของเสีย","วิศวกรรมสิ่งแวดล้อม","กฎหมายสิ่งแวดล้อม","IoT & Sensor"];
const EXP_AREAS = ["ESG","Net Zero","CFO/CFP","Eco-Factory","ISO 14001","GRI","Energy","Waste Management"];

const T = {
  th:{
    home:"หน้าแรก",blog:"ความรู้",experts:"ผู้เชี่ยวชาญ",about:"เกี่ยวกับ",
    menu_eco:"Eco Factory",menu_fcheck:"ตรวจประเมิน",menu_env:"สิ่งแวดล้อม",menu_carbon:"Carbon Management",menu_awards:"Amata Best Waste Management Awards",menu_knowledge:"ความรู้",
    hero_tag:"Sustainability Expert-on-Demand Platform",
    hero_sub:"ศูนย์กลางผู้เชี่ยวชาญด้าน Sustainability และระบบประเมินมาตรฐานสิ่งแวดล้อมแบบครบวงจร สำหรับองค์กรที่เตรียมพร้อมสู่ Net Zero, ESG และกฎระเบียบใหม่ด้านสภาพภูมิอากาศ",
    get_started:"เริ่มต้นใช้งาน",find_experts:"ค้นหาผู้เชี่ยวชาญ",
    feat_title:"โซลูชันครบวงจรด้านความยั่งยืน",
    feat_sub:"VERDIX ผสาน ผู้เชี่ยวชาญตัวจริง + ระบบประเมิน + AI + Digital Workflow เพื่อให้ทุกองค์กรเริ่มต้น วัดผล ปรับปรุง และเดินหน้าแผนความยั่งยืนได้อย่างถูกต้อง แม่นยำ และคุ้มค่า",
    f1t:"Expert-on-Demand Marketplace",f1d:"ระบบ Matching ผู้เชี่ยวชาญด้านความยั่งยืน จ้างงานแบบ Task-based, Project-based หรือ Monthly Support ครอบคลุม Carbon Footprint, Eco-Factory, ESG, Net Zero Roadmap และกฎหมายสิ่งแวดล้อม",
    f2t:"Sustainability Assessment Engine",f2d:"ระบบประเมิน Eco-Factory และ Eco-Efficiency ออนไลน์ รวม Digital Checklist, Gap Analysis อัตโนมัติ, Action Plan และ Expert Review ในที่เดียว พร้อมขึ้นทะเบียน Green Industry ได้ทันที",
    f3t:"Automated Reporting System",f3d:"ออกรายงานตามมาตรฐาน TGO, ISO 14064/14067, GRI, Eco-Factory, GI อัตโนมัติ ลดเวลาจากหลายสัปดาห์เหลือเพียงไม่กี่นาที รองรับ Multi-site และ Expert Review Workflow",
    blog_title:"บทความและความรู้",blog_sub:"ติดตามข่าวสารด้านสิ่งแวดล้อม ESG และ Net Zero จากผู้เชี่ยวชาญของเรา",
    read_more:"อ่านเพิ่มเติม →",view_all:"ดูทั้งหมด",
    exp_title:"เครือข่ายผู้เชี่ยวชาญ",exp_sub:"ผู้เชี่ยวชาญด้านความยั่งยืนที่ผ่านการรับรองและคัดสรรแล้ว",
    contact:"ติดต่อ",all:"ทั้งหมด",reviews:"รีวิว",
    login_title:"เข้าสู่ระบบ",reg_title:"สมัครสมาชิก",
    login:"เข้าสู่ระบบ",register:"สมัครสมาชิก",dashboard:"แผงควบคุม",logout:"ออกจากระบบ",
    email:"อีเมล",password:"รหัสผ่าน",fullname:"ชื่อ-นามสกุล",org:"องค์กร",
    no_account:"ยังไม่มีบัญชี?",has_account:"มีบัญชีแล้ว?",
    adm_hint:"ทดสอบ Admin: admin@verdix.com / admin",
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
    hero_tag:"Sustainability Expert-on-Demand Platform",
    hero_sub:"The all-in-one hub for real sustainability experts and digital assessment systems — built for organizations preparing for Net Zero, ESG, and emerging climate regulations.",
    get_started:"Get Started",find_experts:"Find Experts",
    feat_title:"End-to-End Sustainability Solutions",
    feat_sub:"VERDIX combines real experts + assessment systems + AI + digital workflows — so every organization can start, measure, improve, and advance their sustainability plan accurately and cost-effectively.",
    f1t:"Expert-on-Demand Marketplace",f1d:"Match with certified sustainability experts for Task-based, Project-based, or Monthly Support. Covering Carbon Footprint, Eco-Factory, ESG, Net Zero Roadmap, and Environmental Law.",
    f2t:"Sustainability Assessment Engine",f2d:"Online Eco-Factory & Eco-Efficiency evaluation. Combines Digital Checklist, automated Gap Analysis, Action Plans, and Expert Review in one place — ready for Green Industry registration.",
    f3t:"Automated Reporting System",f3d:"Auto-generate reports aligned with TGO, ISO 14064/14067, GRI, Eco-Factory, and GI. Reduce reporting from weeks to minutes, with Multi-site Dashboard and Expert Review Workflow.",
    blog_title:"Articles & Insights",blog_sub:"Stay updated on ESG, Net Zero, and sustainability from our expert contributors.",
    read_more:"Read More →",view_all:"View All",
    exp_title:"Expert Network",exp_sub:"A certified and curated network of sustainability specialists",
    contact:"Contact",all:"All",reviews:"reviews",
    login_title:"Login",reg_title:"Register",
    login:"Login",register:"Register",dashboard:"Dashboard",logout:"Logout",
    email:"Email",password:"Password",fullname:"Full Name",org:"Organization",
    no_account:"Don't have an account?",has_account:"Already have an account?",
    adm_hint:"Try Admin: admin@verdix.com / admin",
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
  {id:1,title_th:"Thailand Net Zero 2050: เส้นทางสู่ความเป็นกลางทางคาร์บอน",title_en:"Thailand Net Zero 2050: The Road to Carbon Neutrality",excerpt_th:"ประเทศไทยตั้งเป้า Net Zero ภายในปี 2050 พร้อมแผน NDC 3.0 ที่ชัดเจนและมาตรการลดก๊าซเรือนกระจกในทุกภาคส่วน",excerpt_en:"Thailand sets ambitious Net Zero targets by 2050 with a clear NDC 3.0 roadmap and emission reduction measures.",category:"Net Zero",date:"2025-01-10",author:"Dr. Nathawee P.",image:"🌿"},
  {id:2,title_th:"ESG คืออะไร? ทำไมทุกองค์กรต้องรู้",title_en:"What is ESG? Why Every Organization Must Know",excerpt_th:"ESG กลายเป็นมาตรฐานประเมินธุรกิจระดับโลก นักลงทุนสถาบันใช้เป็นเกณฑ์หลักในการตัดสินใจลงทุน",excerpt_en:"ESG has become the global standard for business evaluation and a key criterion for institutional investment decisions.",category:"ESG",date:"2024-12-20",author:"Assoc.Prof. Dr. Kowit S.",image:"📊"},
  {id:3,title_th:"Eco-Factory: มาตรฐานโรงงานสีเขียวของไทย",title_en:"Eco-Factory: Thailand's Green Factory Standard",excerpt_th:"มาตรฐาน Eco-Factory มี 14 ประเภทการตรวจประเมิน ครอบคลุมพลังงาน น้ำ ขยะ อากาศ และชุมชน",excerpt_en:"Eco-Factory certification covers 14 assessment categories: energy, water, waste, air quality, and community impact.",category:"Eco-Factory",date:"2024-11-28",author:"VerdiX Team",image:"🏭"},
  {id:4,title_th:"Carbon Footprint ขององค์กร: วิธีคำนวณและลด",title_en:"Corporate Carbon Footprint: How to Calculate and Reduce",excerpt_th:"คำนวณ CFO/CFP ตามมาตรฐาน ISO 14064 และ TGO พร้อมแนวทางลด Scope 1, 2, 3",excerpt_en:"Calculate CFO/CFP following ISO 14064 and TGO standards with practical Scope 1, 2, 3 reduction guidance.",category:"GHG",date:"2024-11-15",author:"VerdiX Expert",image:"🌡️"},
  {id:5,title_th:"Green Industry Level 1–5: ก้าวสู่อุตสาหกรรมสีเขียว",title_en:"Green Industry Levels 1–5: Steps to Green Manufacturing",excerpt_th:"โครงการอุตสาหกรรมสีเขียวมี 5 ระดับ จากความมุ่งมั่นสู่วัฒนธรรมสีเขียวที่ยั่งยืน",excerpt_en:"The Green Industry program has 5 levels, progressing from commitment to building a sustainable green culture.",category:"Green Industry",date:"2024-10-30",author:"Dr. Nathawee P.",image:"🌱"},
  {id:6,title_th:"Carbon Tax ในไทย: ผลกระทบต่อภาคอุตสาหกรรม",title_en:"Carbon Tax in Thailand: Impact on Industry",excerpt_th:"กฎหมาย Climate Change Act กำลังจะมาพร้อมภาษีคาร์บอน ธุรกิจต้องเตรียมพร้อมตั้งแต่วันนี้",excerpt_en:"Thailand's Climate Change Act brings carbon taxation — businesses must prepare starting today.",category:"Policy",date:"2024-10-10",author:"VerdiX Team",image:"⚖️"},
  {id:7,title_th:"PM2.5 ในโรงงานอุตสาหกรรม: มาตรฐานและการควบคุม",title_en:"PM2.5 in Industrial Facilities: Standards and Control",excerpt_th:"ค่ามาตรฐาน PM2.5 ในบรรยากาศทั่วไปและในสถานประกอบการ พร้อมวิธีควบคุมด้วยระบบกรองอากาศ",excerpt_en:"PM2.5 ambient and workplace standards with dust control systems, filters, and monitoring methods.",category:"คุณภาพอากาศ",date:"2024-12-05",author:"Dr. Apinya B.",image:"🌬️"},
  {id:8,title_th:"การตรวจวัดคุณภาพอากาศแบบ Real-time ด้วย IoT Sensor",title_en:"Real-time Air Quality Monitoring with IoT Sensors",excerpt_th:"ระบบเซ็นเซอร์วัดคุณภาพอากาศ (CO, SO₂, NOx, VOC, PM) แบบ Real-time ผ่าน MQTT สำหรับโรงงาน",excerpt_en:"IoT sensor systems for CO, SO₂, NOx, VOC, PM real-time monitoring via MQTT for industrial facilities.",category:"IoT & Sensor",date:"2025-01-05",author:"VerdiX Tech",image:"📡"},
  {id:9,title_th:"BOD COD SS: ค่ามาตรฐานน้ำทิ้งโรงงานอุตสาหกรรม",title_en:"BOD COD SS: Industrial Wastewater Effluent Standards",excerpt_th:"ค่ามาตรฐานน้ำทิ้งตามประกาศกรมโรงงานอุตสาหกรรม พร้อมวิธีตรวจวัดและระบบบำบัดที่เหมาะสม",excerpt_en:"Industrial effluent standards per DIW regulations with measurement methods and appropriate treatment systems.",category:"คุณภาพน้ำ",date:"2024-12-10",author:"Assoc.Prof. Dr. Kowit S.",image:"💧"},
  {id:10,title_th:"ระบบบำบัดน้ำเสีย: เลือกเทคโนโลยีให้เหมาะกับโรงงาน",title_en:"Wastewater Treatment Systems: Choosing the Right Technology",excerpt_th:"เปรียบเทียบระบบบำบัดน้ำเสีย (Activated Sludge, MBR, SBR, MBBR) ตามประเภทอุตสาหกรรมและงบประมาณ",excerpt_en:"Comparing wastewater treatment systems (Activated Sludge, MBR, SBR, MBBR) by industry type and budget.",category:"วิศวกรรมสิ่งแวดล้อม",date:"2024-11-20",author:"VerdiX Expert",image:"🔬"},
  {id:11,title_th:"กากของเสียอันตราย: ระบบ Manifest และกฎหมาย",title_en:"Hazardous Waste: Manifest System and Legal Requirements",excerpt_th:"ระบบ e-Manifest กรมโรงงานอุตสาหกรรม ประเภทกากของเสีย บัญชีรหัสกาก และหน้าที่ตามกฎหมาย",excerpt_en:"DIW e-Manifest system, waste classification codes, and legal obligations for hazardous waste generators.",category:"กากของเสีย",date:"2024-11-08",author:"VerdiX Team",image:"☣️"},
  {id:12,title_th:"Zero Waste to Landfill: ทำอย่างไรให้สำเร็จ",title_en:"Zero Waste to Landfill: How to Achieve It",excerpt_th:"แนวทางปฏิบัติที่แท้จริงสำหรับโรงงานที่ต้องการบรรลุเป้าหมาย Zero Waste to Landfill",excerpt_en:"Practical guidelines for factories targeting Zero Waste to Landfill certification.",category:"กากของเสีย",date:"2024-10-25",author:"Dr. Nathawee P.",image:"♻️"},
  {id:13,title_th:"กฎหมายสิ่งแวดล้อมไทย: บทบัญญัติสำคัญที่โรงงานต้องรู้",title_en:"Thai Environmental Law: Key Provisions Every Factory Must Know",excerpt_th:"สรุปกฎหมายสำคัญ: พรบ.โรงงาน พรบ.ส่งเสริมคุณภาพสิ่งแวดล้อม พรบ.วัตถุอันตราย และกฎหมายน้ำ",excerpt_en:"Summary of key laws: Factory Act, Environmental Quality Promotion Act, Hazardous Substances Act, and Water Law.",category:"กฎหมายสิ่งแวดล้อม",date:"2024-10-15",author:"Legal Expert",image:"📜"},
  {id:14,title_th:"LCA (Life Cycle Assessment) สำหรับผลิตภัณฑ์อุตสาหกรรม",title_en:"LCA for Industrial Products: A Practical Guide",excerpt_th:"การประเมินวัฏจักรชีวิตของผลิตภัณฑ์ตามมาตรฐาน ISO 14040/14044 เพื่อลดผลกระทบสิ่งแวดล้อม",excerpt_en:"Product lifecycle assessment per ISO 14040/14044 standards to reduce environmental impact.",category:"วิศวกรรมสิ่งแวดล้อม",date:"2024-10-01",author:"Assoc.Prof. Dr. Kowit S.",image:"🔄"},
  {id:15,title_th:"MQTT Protocol สำหรับงาน Industrial IoT Environmental Monitoring",title_en:"MQTT Protocol for Industrial IoT Environmental Monitoring",excerpt_th:"ใช้ MQTT ส่งข้อมูลเซ็นเซอร์สิ่งแวดล้อม (อากาศ น้ำ กาก) จาก PLC/IoT ขึ้น Cloud Platform แบบ Real-time",excerpt_en:"Using MQTT to transmit environmental sensor data (air, water, waste) from PLC/IoT to Cloud Platform in real-time.",category:"IoT & Sensor",date:"2025-01-15",author:"VerdiX Tech",image:"🔌"},
];

const INIT_EXPERTS = [
  {id:1,name:"Assoc.Prof. Dr. Kowit Suwannahong",name_th:"รศ.ดร. โกวิท สุวรรณหงษ์",title_th:"คณบดี คณะสาธารณสุขศาสตร์ ม.บูรพา",title_en:"Dean, Faculty of Public Health, Burapha University",expertise:["Eco-Factory","ESG","GRI"],location:"Chonburi",rating:4.9,reviews:47,manday:15000,avatar:"👨‍🏫"},
  {id:2,name:"Dr. Nathawee Pong-ajarn",name_th:"ดร. ณัฐวี พงษ์อาจารย์",title_th:"ผู้เชี่ยวชาญพลังงานและ Carbon Footprint",title_en:"Energy & Carbon Footprint Expert",expertise:["CFO/CFP","Net Zero","Energy"],location:"Bangkok",rating:5.0,reviews:32,manday:18000,avatar:"👩‍💼"},
  {id:3,name:"Khun Somchai Treerat",name_th:"คุณสมชาย ตรีรัตน์",title_th:"ผู้เชี่ยวชาญ ISO 14001 และการจัดการขยะ",title_en:"ISO 14001 & Waste Management Specialist",expertise:["ISO 14001","Waste Management","Eco-Factory"],location:"Rayong",rating:4.7,reviews:28,manday:12000,avatar:"👨‍🔬"},
  {id:4,name:"Dr. Wanida Srisatit",name_th:"ดร. วนิดา ศรีสาทิตย์",title_th:"ผู้เชี่ยวชาญ GRI และการรายงาน ESG",title_en:"GRI & ESG Reporting Specialist",expertise:["GRI","ESG","Net Zero"],location:"Bangkok",rating:4.8,reviews:41,manday:20000,avatar:"👩‍💻"},
  {id:5,name:"Khun Prasert Khamla",name_th:"คุณประเสริฐ ขำหล้า",title_th:"วิศวกรพลังงานและผู้ตรวจสอบ ISO 50001",title_en:"Energy Engineer & ISO 50001 Auditor",expertise:["Energy","ISO 14001","CFO/CFP"],location:"Chiang Mai",rating:4.6,reviews:19,manday:10000,avatar:"👷"},
  {id:6,name:"Dr. Apinya Buranasiri",name_th:"ดร. อาพิณยา บูรณศิริ",title_th:"ผู้เชี่ยวชาญด้านอากาศและความปลอดภัย",title_en:"Air Quality & Industrial Safety Expert",expertise:["ESG","Waste Management","ISO 14001"],location:"Samut Prakan",rating:4.5,reviews:15,manday:11000,avatar:"👩‍🔬"},
];

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
  email: "info@verdix.co.th",
  phone: "02-XXX-XXXX",
  location: "Bangkok, Thailand",
  socials: [
    {icon:"🌐",label:"Website",url:"#"},
    {icon:"in",label:"LinkedIn",url:"#"},
    {icon:"f",label:"Facebook",url:"#"},
    {icon:"✉",label:"Email",url:"mailto:info@verdix.co.th"}
  ],
  copyright: "© 2025 BUUxC Planet C",
  legalLinks: [
    {label_th:"นโยบายความเป็นส่วนตัว",label_en:"Privacy Policy",page:"#"},
    {label_th:"เงื่อนไขการใช้งาน",label_en:"Terms of Use",page:"#"}
  ]
};

const FOOTER_STORE_KEY = "verdix.footer";

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
  {id:2,label_th:"สิ่งแวดล้อม",label_en:"Environment",page:"env",parent_id:null,order:2,active:true},
  {id:3,label_th:"Carbon Management",label_en:"Carbon Management",page:"carbon",parent_id:null,order:3,active:true},
  {id:4,label_th:"Eco Factory",label_en:"Eco Factory",page:"eco-factory",parent_id:null,order:4,active:true},
  {id:5,label_th:"Amata Awards",label_en:"Amata Awards",page:"amata-awards",parent_id:null,order:5,active:true},
  {id:6,label_th:"ตรวจประเมิน",label_en:"Assessment",page:"factory-check",parent_id:null,order:6,active:true},
  {id:7,label_th:"ความรู้",label_en:"Knowledge",page:"blog",parent_id:null,order:7,active:true},
  {id:8,label_th:"ผู้เชี่ยวชาญ",label_en:"Experts",page:"experts",parent_id:null,order:8,active:true},
  {id:9,label_th:"Eco-Factory Online",label_en:"Eco-Factory Online",page:"factory-check",parent_id:4,order:1,active:true},
  {id:10,label_th:"Amata Best Waste Management Awards",label_en:"Amata Best Waste Management Awards",page:"amata-awards",parent_id:5,order:1,active:true},
  {id:11,label_th:"บทความ ESG",label_en:"ESG Articles",page:"blog",parent_id:7,order:1,active:true},
  {id:12,label_th:"เครือข่ายผู้เชี่ยวชาญ",label_en:"Expert Network",page:"experts",parent_id:8,order:1,active:true}
];

function normalizeMenus(menus) {
  return (menus || INIT_MENUS).map(m => {
    if (Number(m.id) === 5) {
      return {...m,label_th:"Amata Awards",label_en:"Amata Awards",parent_id:null,order:m.order || 5};
    }
    if (Number(m.id) === 10) {
      return {...m,label_th:"Amata Best Waste Management Awards",label_en:"Amata Best Waste Management Awards",parent_id:5,order:1};
    }
    return m;
  });
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

// ─── Navbar ───────────────────────────────────────────────────
function Navbar({ t, lang, setLang, page, nav, user, logout, menus }) {
  const activeMenus = normalizeMenus(menus).filter(m => m.active !== false);
  const topMenus = activeMenus.filter(m => !m.parent_id).sort((a,b) => (a.order || 0) - (b.order || 0));
  const childrenOf = (id) => activeMenus.filter(m => String(m.parent_id) === String(id)).sort((a,b) => (a.order || 0) - (b.order || 0));
  const labelOf = (m) => lang === "th" ? (m.label_th || m.label_en) : (m.label_en || m.label_th);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => nav("home")}>
          <BrandLogo className="nav-brand" />
        </div>
        <div className="nav-links">
          {topMenus.map(m => {
            const subs = childrenOf(m.id);
            const isActive = page === m.page || subs.some(s => s.page === page);
            return (
              <div className="nav-item" key={m.id}>
                <button className={`nav-btn always ${m.page==="amata-awards"?"nav-awards":""} ${isActive?"active":""}`} onClick={() => nav(m.page || "home")}>
                  {labelOf(m)} {subs.length > 0 && <span className="nav-caret">▾</span>}
                </button>
                {subs.length > 0 && (
                  <div className="sub-menu">
                    {subs.map(s => (
                      <button key={s.id} className={page===s.page?"active":""} onClick={() => nav(s.page || "home")}>{labelOf(s)}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {user ? (
            <>
              {user.role==="admin" && <button className={`nav-btn always ${page==="admin"?"active":""}`} onClick={() => nav("admin")}>{t.dashboard}</button>}
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
  return (
    <article className="art-card" onClick={onClick}>
      <div className="art-img">{a.image}</div>
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
  return (
    <span className={`brand-logo ${className}`} aria-label="BUUxC Planet C">
      <span className="brand-main">
        <span className="brand-buu">BU<span className="brand-u2">U</span></span>
        <span className="brand-x">x</span>
        <span className="brand-c">C</span>
      </span>
      <span className="brand-sub">Planet C</span>
      <span className="brand-line" />
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
      <div className="hero-bg" style={{backgroundImage:`url(${slide.image})`}} />
      <div className="container">
        <div className="hero-copy fade-in" key={slide.id}>
          <div className="hero-tag">🌿 {tSafe(L(slide.tag_th, slide.tag_en), "Sustainability Expert-on-Demand Platform")}</div>
          {L(slide.title_th, slide.title_en).toLowerCase() === "buuxc"
            ? <BrandLogo className="hero-brand" />
            : <h1 className="hero-title">{L(slide.title_th, slide.title_en)}</h1>}
          <div className="hero-kicker">"{L(slide.kicker_th, slide.kicker_en)}"</div>
          <p className="hero-sub">{L(slide.subtitle_th, slide.subtitle_en)}</p>
          <div className="hero-ctas">
            <button className="btn btn-dark" style={{fontSize:16,padding:"13px 30px"}} onClick={() => nav(slide.primary_page || "register")}>{L(slide.primary_th, slide.primary_en)}</button>
            <button className="btn-ghost" style={{fontSize:15,padding:"11px 24px"}} onClick={() => nav(slide.secondary_page || "experts")}>{L(slide.secondary_th, slide.secondary_en)}</button>
          </div>
          <div className="hero-stats">
            {[["70,000+",lang==="th"?"โรงงานในไทย":"Thai Factories"],["10,000+",lang==="th"?"องค์กรส่งออก":"Export Organizations"],["16,000M+",lang==="th"?"TAM (บาท/ปี)":"TAM (THB/yr)"],["50%+",lang==="th"?"ลดเวลารายงาน":"Reporting Time Saved"]].map(([n,l]) => (
              <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
            ))}
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
          <div className="articles-grid">
            {[{icon:"🤝",t:t.f1t,d:t.f1d},{icon:"📋",t:t.f2t,d:t.f2d},{icon:"📈",t:t.f3t,d:t.f3d}].map(f => (
              <div className="feat-card" key={f.t}>
                <div className="feat-icon">{f.icon}</div>
                <h3 className="feat-title">{f.t}</h3>
                <p className="feat-desc">{f.d}</p>
              </div>
            ))}
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

      {/* Mission */}
      <section className="section" style={{background:"var(--gll)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:48}}>
            <span className="section-tag">● MISSION</span>
            <h2 className="section-title">VERDIX Toward a Sustainable Future</h2>
          </div>
          <div className="grid-3">
            {[
              {icon:"🤝",title:"Eco-Expert On-Demand for Everyone",desc:lang==="th"?"เปิดโอกาสให้ทุกองค์กรเข้าถึงผู้เชี่ยวชาญด้านความยั่งยืนได้ง่ายและมีมาตรฐาน":"Open access to certified sustainability experts for every organization — easily and affordably."},
              {icon:"📱",title:"Digitalize Assessment & Reporting",desc:lang==="th"?"ทำให้การประเมินและรายงานด้านความยั่งยืนเป็นระบบดิจิทัลที่โปร่งใส ลดภาระงาน และตรวจสอบได้":"Make sustainability assessment and reporting a transparent, verifiable, and burden-reducing digital system."},
              {icon:"🌍",title:"Data-Driven Transformation",desc:lang==="th"?"สนับสนุนการเปลี่ยนผ่านองค์กรสู่ Net Zero และอนาคตที่ยั่งยืนด้วยข้อมูลและเทคโนโลยี":"Support organizations in transitioning to Net Zero and a truly sustainable future through data and technology."},
            ].map(m => (
              <div key={m.title} style={{textAlign:"center",padding:"32px 24px"}}>
                <div style={{fontSize:40,marginBottom:16}}>{m.icon}</div>
                <h3 style={{fontSize:18,color:"var(--g1)",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>{m.title}</h3>
                <p style={{color:"var(--muted)",fontSize:15,lineHeight:1.7}}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Roadmap */}
      <section className="section" style={{background:"var(--g1)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:300,height:300,borderRadius:"50%",background:"rgba(82,183,136,.07)"}} />
        <div style={{position:"absolute",bottom:-80,left:-40,width:240,height:240,borderRadius:"50%",background:"rgba(82,183,136,.05)"}} />
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <span style={{display:"block",color:"var(--ga)",fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",marginBottom:10}}>● PLATFORM ROADMAP</span>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,38px)",color:"#fff",marginBottom:14}}>
              {lang==="th"?"เส้นทางสู่แพลตฟอร์มความยั่งยืนครบวงจร":"The Road to a Complete Sustainability Platform"}
            </h2>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:16,maxWidth:560,margin:"0 auto"}}>
              {lang==="th"?"จาก Expert-on-Demand สู่ Real-time IoT Carbon Intelligence":"From Expert-on-Demand to Real-time IoT Carbon Intelligence"}
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0,position:"relative"}}>
            {/* connector line */}
            <div style={{position:"absolute",top:36,left:"17%",right:"17%",height:2,background:"linear-gradient(90deg,var(--ga),rgba(82,183,136,.3))",zIndex:0}} />

            {[
              {
                phase:"Phase 1", status:"live", statusTh:"เปิดใช้งานแล้ว", statusEn:"Live Now",
                icon:"🧑‍💼",
                th:"Expert-on-Demand Platform",en:"Expert-on-Demand Platform",
                color:"var(--ga)",
                items:[
                  lang==="th"?"Eco-Expert Marketplace":"Eco-Expert Marketplace",
                  lang==="th"?"Sustainability Assessment (14 หมวด)":"Sustainability Assessment (14 categories)",
                  lang==="th"?"Automated Reporting (TGO/GRI/ISO)":"Automated Reporting (TGO/GRI/ISO)",
                  lang==="th"?"Eco-Factory Online Evaluation":"Eco-Factory Online Evaluation",
                ]
              },
              {
                phase:"Phase 2", status:"upcoming", statusTh:"กำลังพัฒนา", statusEn:"In Development",
                icon:"🪙",
                th:"Carbon Credit Integration",en:"Carbon Credit Integration",
                color:"#FBBF24",
                items:[
                  lang==="th"?"Carbon Credit Marketplace (ซื้อ-ขาย)":"Carbon Credit Marketplace",
                  lang==="th"?"Carbon Offset Project Registry":"Carbon Offset Project Registry",
                  lang==="th"?"TGO / VCS / Gold Standard Verified":"TGO / VCS / Gold Standard Verified",
                  lang==="th"?"Real-time Carbon Balance Dashboard":"Real-time Carbon Balance Dashboard",
                ]
              },
              {
                phase:"Phase 3", status:"future", statusTh:"แผนอนาคต", statusEn:"Future Roadmap",
                icon:"📡",
                th:"IoT Sensor & Data Intelligence",en:"IoT Sensor & Data Intelligence",
                color:"#60A5FA",
                items:[
                  lang==="th"?"MQTT Broker Integration (Sensor → Cloud)":"MQTT Broker Integration (Sensor → Cloud)",
                  lang==="th"?"REST API / Webhook สำหรับระบบโรงงาน":"REST API / Webhook for factory systems",
                  lang==="th"?"Real-time Energy, Water, GHG Monitoring":"Real-time Energy, Water, GHG Monitoring",
                  lang==="th"?"AI-driven Anomaly Detection & Alerts":"AI-driven Anomaly Detection & Alerts",
                ]
              },
            ].map((p,i) => (
              <div key={p.phase} style={{position:"relative",zIndex:1,padding:"0 16px"}}>
                {/* Phase dot */}
                <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
                  <div style={{width:72,height:72,borderRadius:"50%",background:p.status==="live"?p.color:p.status==="upcoming"?"rgba(251,191,36,.15)":"rgba(96,165,250,.1)",border:`2px solid ${p.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
                    {p.icon}
                  </div>
                </div>
                <div style={{background:p.status==="live"?"rgba(82,183,136,.12)":"rgba(255,255,255,.04)",border:`1px solid ${p.status==="live"?"rgba(82,183,136,.3)":"rgba(255,255,255,.1)"}`,borderRadius:"var(--r-lg)",padding:"24px 20px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:11,fontWeight:700,letterSpacing:1,color:p.color}}>{p.phase}</span>
                    <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,background:p.status==="live"?"rgba(82,183,136,.2)":p.status==="upcoming"?"rgba(251,191,36,.15)":"rgba(96,165,250,.1)",color:p.color}}>
                      {lang==="th"?p.statusTh:p.statusEn}
                    </span>
                  </div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:16,lineHeight:1.3}}>{lang==="th"?p.th:p.en}</h3>
                  <ul style={{listStyle:"none",padding:0,margin:0}}>
                    {p.items.map((item,j) => (
                      <li key={j} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:10,fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.5}}>
                        <span style={{color:p.color,flexShrink:0,marginTop:1}}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* IoT Architecture Note */}
          <div style={{marginTop:40,background:"rgba(255,255,255,.05)",border:"1px solid rgba(82,183,136,.2)",borderRadius:"var(--r)",padding:"20px 28px",display:"flex",gap:16,alignItems:"flex-start"}}>
            <span style={{fontSize:24,flexShrink:0}}>📡</span>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--ga)",marginBottom:6}}>
                {lang==="th"?"IoT Data Pipeline Architecture (Phase 3)":"IoT Data Pipeline Architecture (Phase 3)"}
              </div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:1.7}}>
                {lang==="th"
                  ?"Sensor (PLC/IoT) → MQTT Broker → VERDIX Data Gateway → Real-time Dashboard → Carbon Calculation Engine → Automated Report & Carbon Credit"
                  :"Sensor (PLC/IoT) → MQTT Broker → VERDIX Data Gateway → Real-time Dashboard → Carbon Calculation Engine → Automated Report & Carbon Credit"}
                <span style={{display:"block",marginTop:6,color:"rgba(255,255,255,.4)",fontSize:12}}>
                  {lang==="th"?"รองรับโปรโตคอล: MQTT v3.1/v5, REST API, Modbus TCP, OPC-UA, Webhook":"Supported protocols: MQTT v3.1/v5, REST API, Modbus TCP, OPC-UA, Webhook"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div style={{display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap"}}>
            {[
              {icon:"✅",th:"รับรองโดย อบก. (TGO)",en:"TGO Certified Platform"},
              {icon:"🏭",th:"โรงงานกว่า 500 แห่งไว้วางใจ",en:"Trusted by 500+ Factories"},
              {icon:"👥",th:"ผู้เชี่ยวชาญ 120+ คน",en:"120+ Certified Experts"},
              {icon:"🔒",th:"ข้อมูลปลอดภัย SSL/TLS",en:"Secure SSL/TLS Data"},
              {icon:"🇹🇭",th:"พัฒนาสำหรับไทยโดยเฉพาะ",en:"Built for Thailand Standards"},
            ].map(t=>(
              <div key={t.th} className="trust-item"><span>{t.icon}</span>{lang==="th"?t.th:t.en}</div>
            ))}
          </div>
        </div>
      </div>

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
              {avatar:"👨‍💼",name:"คุณสมศักดิ์ วิริยะ",org_th:"ผู้จัดการฝ่าย EHS — โรงงานยานยนต์ ระยอง",org_en:"EHS Manager — Automotive Factory, Rayong",text_th:"VERDIX ช่วยให้เราเตรียมเอกสาร Eco-Factory ได้ภายใน 2 สัปดาห์ แทนที่จะใช้ 3 เดือนเหมือนก่อน ระบบประเมินออนไลน์ละเอียดมาก",text_en:"VERDIX helped us prepare Eco-Factory documents in 2 weeks instead of the usual 3 months. The online assessment system is incredibly detailed.",stars:5},
              {avatar:"👩‍🔬",name:"ดร. วราภรณ์ สุริยา",org_th:"นักวิชาการสิ่งแวดล้อม — อุตสาหกรรมอาหาร",org_en:"Environmental Scientist — Food Industry",text_th:"ระบบคำนวณ CFO ของ VERDIX แม่นยำมาก ช่วยระบุ Hotspot ได้ชัดเจน ทำให้เราวางแผนลด GHG ได้ตรงจุด ประหยัดต้นทุนได้จริง",text_en:"VERDIX's CFO calculator is very accurate. It clearly identifies hotspots, enabling targeted GHG reduction planning with real cost savings.",stars:5},
              {avatar:"👨‍🏭",name:"คุณประภัสสร ตั้งมั่น",org_th:"ผู้อำนวยการโรงงาน — อุตสาหกรรมปิโตรเคมี",org_en:"Factory Director — Petrochemical Industry",text_th:"Expert-on-Demand ของ VERDIX ดีมาก ได้ผู้เชี่ยวชาญที่ตรงสาขามาช่วยภายใน 24 ชั่วโมง ราคาโปร่งใส ไม่มีค่าใช้จ่ายซ่อน",text_en:"VERDIX's Expert-on-Demand is excellent. Got a matching specialist within 24 hours. Transparent pricing with no hidden costs.",stars:5},
              {avatar:"👩‍💼",name:"คุณนภาพร จันทร์ดี",org_th:"CSR Manager — กลุ่มธุรกิจโรงแรม",org_en:"CSR Manager — Hotel Group",text_th:"ใช้ VERDIX ทำรายงาน ESG ส่งผู้ถือหุ้น ระบบ Automated Reporting ช่วยลดเวลาจาก 2 เดือนเหลือแค่ 3 วัน แม่นยำและมีมาตรฐาน",text_en:"Used VERDIX for ESG reporting to shareholders. Automated Reporting reduced time from 2 months to just 3 days — accurate and standardized.",stars:5},
              {avatar:"👨‍💻",name:"คุณเอกชัย รุ่งโรจน์",org_th:"Operations Director — SME อิเล็กทรอนิกส์",org_en:"Operations Director — Electronics SME",text_th:"สมัคร Green Industry ผ่าน VERDIX สะดวกมาก มีผู้เชี่ยวชาญดูแลตลอด ได้ระดับ GI 2 ภายใน 4 เดือน ลูกค้าต่างประเทศประทับใจมาก",text_en:"Applying for Green Industry through VERDIX was seamless. Expert guidance throughout. Achieved GI Level 2 in 4 months. International clients are very impressed.",stars:5},
              {avatar:"👩‍🏫",name:"รศ.ดร. พิมพ์ใจ ชาญชัย",org_th:"อาจารย์วิศวกรรมสิ่งแวดล้อม — มหาวิทยาลัยเทคโนโลยี",org_en:"Environmental Engineering Lecturer — Technology University",text_th:"แนะนำ VERDIX ให้นักศึกษาใช้ฝึกประเมิน Carbon Footprint เครื่องมือใช้ง่าย เนื้อหาตรงมาตรฐาน TGO/ISO ครบถ้วน",text_en:"Recommend VERDIX for students to practice Carbon Footprint assessment. Easy to use, content fully aligned with TGO/ISO standards.",stars:5},
            ].map((t,i)=>(
              <div key={i} className="testi-card">
                <div className="testi-quote">"</div>
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

// ─── Blog Detail ──────────────────────────────────────────────
function BlogDetail({ t, lang, article, nav }) {
  if (!article) return null;
  const body = lang==="th"
    ? `บทความนี้ครอบคลุมประเด็นสำคัญด้าน "${article.title_th}" ในบริบทของประเทศไทย\n\nในปัจจุบัน การเปลี่ยนแปลงสภาพภูมิอากาศกลายเป็นความท้าทายระดับโลกที่ทุกองค์กรต้องให้ความสำคัญ ไม่ว่าจะเป็นการลด GHG Emission การรายงาน ESG หรือการเตรียมความพร้อมรับกฎหมาย Climate Change Act ที่กำลังจะประกาศใช้\n\nVerdiX เชื่อมองค์กรกับผู้เชี่ยวชาญที่มีความสามารถและประสบการณ์ตรง ผ่านระบบ Digital Assessment ที่ครอบคลุม Eco-Factory, Green Industry, CFO/CFP และ Net Zero Roadmap\n\nการประเมินผ่านระบบ VerdiX ช่วยให้องค์กรเห็นภาพชัดเจนของสถานะปัจจุบัน ช่องว่างที่ต้องพัฒนา และเส้นทางที่เป็นไปได้สู่ความยั่งยืนในระยะยาว\n\nเริ่มต้นได้วันนี้กับผู้เชี่ยวชาญของเรากว่า 120 คนทั่วประเทศไทย`
    : `This article covers key topics related to "${article.title_en}" in the context of Thailand's sustainability landscape.\n\nClimate change has become a global challenge that every organization must address — from reducing GHG emissions and reporting ESG to preparing for the upcoming Climate Change Act.\n\nVerdiX connects organizations with qualified and experienced sustainability experts through a comprehensive Digital Assessment system covering Eco-Factory, Green Industry, CFO/CFP, and Net Zero Roadmap.\n\nAssessments through VerdiX give organizations a clear picture of their current status, development gaps, and viable pathways toward long-term sustainability.\n\nGet started today with our network of over 120 certified experts across Thailand.`;
  return (
    <div style={{background:"var(--white)"}}>
      <div className="detail-wrap">
        <button className="back-btn" onClick={() => nav("blog")}>← {lang==="th"?"กลับไปบทความ":"Back to Blog"}</button>
        <div className="detail-img">{article.image}</div>
        <span className="badge">{article.category}</span>
        <h1 className="detail-title">{lang==="th"?article.title_th:article.title_en}</h1>
        <div className="detail-meta">
          <span>✍ {article.author}</span>
          <span>📅 {article.date}</span>
          <span>📂 {article.category}</span>
        </div>
        <div className="detail-body">
          {body.split("\n\n").map((p,i) => <p key={i}>{p}</p>)}
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
    const key = (lang==="th"?e.name_th:e.name).toLowerCase();
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
              {shown.map(e => (
                <div className="exp-card" key={e.id}>
                  <div className="exp-info">
                    <div className="exp-avatar">{e.avatar}</div>
                    <div>
                      <div className="exp-name">{lang==="th"?e.name_th:e.name}</div>
                      <div className="exp-title">{lang==="th"?e.title_th:e.title_en}</div>
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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Login ────────────────────────────────────────────────────
function LoginPage({ t, nav, doLogin }) {
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
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
            <input className="form-inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&doLogin(email,pass)} />
          </div>
          <button className="btn btn-dark" style={{width:"100%",padding:13,fontSize:16}} onClick={() => doLogin(email,pass)}>{t.login}</button>
          <div className="admin-hint">💡 {t.adm_hint}</div>
          <p className="form-hint">{t.no_account} <button onClick={() => nav("register")}>{t.register}</button></p>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────
function RegisterPage({ t, nav, doLogin }) {
  const [f,setF] = useState({name:"",email:"",org:"",pass:""});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
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
          <button className="btn btn-dark" style={{width:"100%",padding:13,fontSize:16}} onClick={() => doLogin(f.email,f.pass)}>{t.register}</button>
          <p className="form-hint">{t.has_account} <button onClick={() => nav("login")}>{t.login}</button></p>
          </div>
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────
function AdminPanel({ t, lang, articles, setArticles, experts, setExperts, slides, setSlides, footer, setFooter, menus, setMenus, sec, setSec }) {
  const [modal,setModal] = useState(null); // null | {type,item}
  const [form,setForm] = useState({});

  const openModal = (type, item=null) => {
    setModal({type,item});
    const blank = {
      post: {title_th:"",title_en:"",excerpt_th:"",excerpt_en:"",category:"Net Zero",author:"",image:"📄",date:new Date().toISOString().split("T")[0]},
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
    else if (type==="menu") setMenus(p => p.filter(m => m.id!==id && String(m.parent_id) !== String(id)));
    else setSlides(p => p.filter(s => s.id!==id));
  };

  const sides = [
    {id:"dashboard",icon:"📊",lbl:t.adm_dash},
    {id:"menus",icon:"☰",lbl:lang==="th"?"จัดการ Menu":"Manage Menu"},
    {id:"slides",icon:"🖼️",lbl:lang==="th"?"จัดการ Slide":"Manage Slides"},
    {id:"footer",icon:"🔗",lbl:lang==="th"?"จัดการ Footer":"Manage Footer"},
    {id:"posts",icon:"📝",lbl:t.adm_posts},
    {id:"experts",icon:"👥",lbl:t.adm_exp},
    {id:"users",icon:"👤",lbl:t.adm_users},
  ];

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

  return (
    <div className="admin-wrap">
      <aside className="admin-side">
        <div className="admin-brand">
          <BrandLogo className="admin-brand-mark" />
          <div className="admin-brand-sub">ADMIN PANEL</div>
        </div>
        <div className="side-section">MENU</div>
        {sides.map(s => (
          <button key={s.id} className={`side-item ${sec===s.id?"active":""}`} onClick={() => setSec(s.id)}>
            <span style={{fontSize:16}}>{s.icon}</span> {s.lbl}
          </button>
        ))}
      </aside>

      <main className="admin-main">
        {/* Dashboard */}
        {sec==="dashboard" && (
          <>
            <div className="adm-title">{t.adm_dash}</div>
            <div className="adm-sub">{t.welcome}</div>
            <div className="adm-stats">
              {[["📝",articles.length,t.total_posts],["👥",experts.length,t.total_exp],["🏢",500,t.total_org],["🌿","18,500",t.total_co2]].map(([icon,n,l]) => (
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
        {sec==="menus" && (
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
        {sec==="slides" && (
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
        {sec==="footer" && (
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
                  <div className="form-grp"><label className="form-lbl">{lang==="th"?"โทรศัพท์":"Phone"}</label><input className="form-inp" value={footer.phone||""} onChange={e=>setFooterField("phone", e.target.value)} /></div>
                </div>
                <div className="form-grp"><label className="form-lbl">{t.location}</label><input className="form-inp" value={footer.location||""} onChange={e=>setFooterField("location", e.target.value)} /></div>
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
              </div>
            </div>
          </>
        )}

        {/* Posts */}
        {sec==="posts" && (
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
        {sec==="experts" && (
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
        {sec==="users" && (
          <>
            <div className="adm-title">{t.adm_users}</div>
            <div className="adm-sub" style={{marginBottom:20}}>3 users</div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>#</th><th>{t.name_col}</th><th>{t.email}</th><th>Role</th><th>Status</th></tr></thead>
                <tbody>
                  {[{n:"Admin VerdiX",e:"admin@verdix.com",r:"Admin"},{n:"Demo User",e:"demo@company.com",r:"User"},{n:"Somchai K.",e:"somchai@factory.co.th",r:"User"}].map((u,i) => (
                    <tr key={i}><td>{i+1}</td><td style={{fontWeight:600}}>{u.n}</td><td>{u.e}</td><td><span className="badge">{u.r}</span></td><td style={{color:"#16A34A",fontWeight:600}}>● Active</td></tr>
                  ))}
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
              {modal.item ? `${t.edit}` : (modal.type==="post" ? t.add_post : t.add_exp)}
              {" "}{modal.type==="post" ? (lang==="th"?"บทความ":"Post") : modal.type==="expert" ? (lang==="th"?"ผู้เชี่ยวชาญ":"Expert") : (lang==="th"?"Slide":"Slide")}
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
                <div className="form-grp"><label className="form-lbl">{lang==="th"?"รูปภาพพื้นหลัง (URL)":"Background image URL"}</label><input className="form-inp" value={form.image||""} onChange={e=>setForm(f=>({...f,image:e.target.value}))} /></div>
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
function CarbonPage({ lang, nav }) {
  const [tab, setTab] = useState("overview");
  const [cfoForm, setCfoForm] = useState({elec:"",fuel_diesel:"",fuel_lng:"",fuel_lpg:"",vehicle:"",waste:"",water:"",purchased_goods:"",travel:""});
  const [cfoResult, setCfoResult] = useState(null);
  const L = (th,en) => lang==="th"?th:en;

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
                ].map((b,i)=>(
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
                  ].map((r,i)=>(
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
function EcoFactoryPage({ lang, nav }) {
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

  const subNav = [
    {id:"home",   th:"หน้าหลัก",        en:"Overview"},
    {id:"guide",  th:"หลักเกณฑ์",       en:"Guidelines"},
    {id:"benefit",th:"สิทธิประโยชน์",    en:"Benefits"},
    {id:"process",th:"ขั้นตอนการสมัคร", en:"Process"},
    {id:"apply",  th:"สมัครรับรอง",      en:"Apply Now"},
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
    {name:"รศ.ดร. โกวิท สุวรรณหงษ์", area:"Eco-Factory, ESG, EIA", org:"ม.บูรพา"},
    {name:"ดร. ณัฐวี พงษ์อาจารย์",    area:"Carbon Footprint, Energy", org:"VERDIX"},
    {name:"คุณสมชาย ตรีรัตน์",        area:"ISO 14001, Waste Management", org:"อิสระ"},
    {name:"ดร. วนิดา ศรีสาทิตย์",     area:"GRI, ESG Reporting", org:"อิสระ"},
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
function AmataAwardsPage({ lang, nav }) {
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
              <button className="btn-accent" style={{padding:"11px 22px",fontSize:14}} onClick={() => nav("experts")}>{L("ปรึกษาผู้เชี่ยวชาญ", "Consult Experts")}</button>
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
              <BUUPHLogo />
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
                <div className="footer-contact-row"><span className="footer-contact-ico">☎</span><span>{footer.phone}</span></div>
                <div className="footer-contact-row"><span className="footer-contact-ico">⌖</span><span>{footer.location}</span></div>
              </div>
            </div>
          </div>
          <div className="footer-bot">
            <span>{footer.copyright}</span>
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
  const [experts,setExperts] = useState(INIT_EXPERTS);
  const [slides,setSlides] = useState(() => slideApi.list());
  const [footer,setFooter] = useState(() => footerApi.list());
  const [menus,setMenus] = useState(INIT_MENUS);
  const [cmsReady,setCmsReady] = useState(false);
  const [selArt,setSelArt] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadCms() {
      const [loadedArticles, loadedExperts, loadedSlides, loadedFooter, loadedMenus] = await Promise.all([
        cmsService.list("articles", INIT_ARTICLES),
        cmsService.list("experts", INIT_EXPERTS),
        cmsService.list("slides", INIT_SLIDES),
        cmsService.getFooter(INIT_FOOTER),
        cmsService.list("menus", INIT_MENUS)
      ]);

      if (!active) return;
      setArticles(loadedArticles);
      setExperts(loadedExperts);
      setSlides(loadedSlides);
      setFooter(loadedFooter);
      setMenus(normalizeMenus(loadedMenus));
      setCmsReady(true);
    }

    loadCms();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (cmsReady) cmsService.replaceAll("articles", articles);
  }, [articles, cmsReady]);

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
  };

  const doLogin = (email,pass) => {
    if (email==="admin@verdix.com" && pass==="admin") {
      setUser({name:"Admin VerdiX",email,role:"admin"});
      setPage("admin");
    } else if (email && pass) {
      setUser({name:"User Demo",email,role:"user"});
      setPage("home");
    }
  };

  const logout = () => { setUser(null); setPage("home"); };
  const t = T[lang];

  return (
    <div>
      <style>{CSS}</style>
      <AnnounceBanner lang={lang} />
      <Navbar t={t} lang={lang} setLang={setLang} page={page} nav={nav} user={user} logout={logout} menus={menus} />
      {page==="home" && <HomePage t={t} lang={lang} nav={nav} articles={articles} slides={slides} />}
      {page==="env" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_env}]} nav={nav}/><EnvironmentPage lang={lang} nav={nav} /></>}
      {page==="carbon" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_carbon}]} nav={nav}/><CarbonPage lang={lang} nav={nav} /></>}
      {page==="eco-factory" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_eco}]} nav={nav}/><EcoFactoryPage lang={lang} nav={nav} /></>}
      {page==="amata-awards" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_eco,page:"eco-factory"},{label:t.menu_awards}]} nav={nav}/><AmataAwardsPage lang={lang} nav={nav} /></>}
      {page==="factory-check" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_eco,page:"eco-factory"},{label:t.menu_fcheck}]} nav={nav}/><FactoryCheckPage lang={lang} nav={nav} /></>}
      {page==="blog" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_knowledge}]} nav={nav}/><BlogPage t={t} lang={lang} nav={nav} articles={articles} /></>}
      {page==="blog-detail" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.menu_knowledge,page:"blog"},{label:lang==="th"?selArt?.title_th?.slice(0,40)+"…":selArt?.title_en?.slice(0,40)+"…"}]} nav={nav}/><BlogDetail t={t} lang={lang} article={selArt} nav={nav} /></>}
      {page==="experts" && <><Breadcrumb items={[{label:t.home,page:"home"},{label:t.experts}]} nav={nav}/><ExpertsPage t={t} lang={lang} experts={experts} /></>}
      {page==="login" && <LoginPage t={t} nav={nav} doLogin={doLogin} />}
      {page==="register" && <RegisterPage t={t} nav={nav} doLogin={doLogin} />}
      {page==="admin" && user?.role==="admin" && (
        <AdminPanel t={t} lang={lang} articles={articles} setArticles={setArticles} experts={experts} setExperts={setExperts} slides={slides} setSlides={setSlides} footer={footer} setFooter={setFooter} menus={menus} setMenus={setMenus} sec={sec} setSec={setSec} />
      )}
      <BackToTop />
      {page!=="admin" && <Footer t={t} lang={lang} nav={nav} footer={footer} />}
    </div>
  );
}
