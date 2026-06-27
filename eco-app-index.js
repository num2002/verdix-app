(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const J=[{key:"s1",label:"1. ข้อกำหนดทั่วไป (General Requirements)",type:"section"},{key:"s1_1",label:"1. ปฏิบัติตามระเบียบ ข้อกำหนด และกฎหมายที่เกี่ยวข้องกับสิ่งแวดล้อม พลังงาน อาชีวอนามัย และความปลอดภัย",type:"passItem"},{key:"s1_2",label:"2. ดำเนินการระบบการจัดการสิ่งแวดล้อม (ISO 14001 / อุตสาหกรรมสีเขียว GI3+ / อุตสาหกรรมดีเด่นด้านสิ่งแวดล้อมหรือพลังงาน) ยังไม่หมดอายุการรับรอง",type:"passItem"},{key:"s1_3",label:"3. ไม่มีข้อร้องเรียนด้านสิ่งแวดล้อมและความปลอดภัย / ไม่เกิดอุบัติเหตุร้ายแรงที่กระทบภายนอกองค์กร ภายในระยะเวลา 1 ปี",type:"passItem"},{key:"s1_4",label:"4. เข้าร่วมโครงการของหน่วยงานภาครัฐที่เกี่ยวข้องกับสิ่งแวดล้อม พลังงาน อาชีวอนามัย และความปลอดภัย ย้อนหลังไม่เกิน 3 ปี",type:"passItem"},{key:"s2",label:"2. ข้อกำหนดเฉพาะเกี่ยวกับโรงงานอุตสาหกรรมเชิงนิเวศ (Specific Requirements for Eco Factory)",type:"section"},{key:"s2_1",label:"1. การจัดการวัตถุดิบ",type:"scoredItem",scoreMax:5},{key:"s2_2",label:"2. การจัดการพลังงาน",type:"scoredItem",scoreMax:5},{key:"s2_3",label:"3. การจัดการน้ำและน้ำเสีย",type:"scoredItem",scoreMax:5},{key:"s2_4",label:"4. การจัดการมลพิษทางอากาศ",type:"scoredItem",scoreMax:5},{key:"s2_5",label:"5. การจัดการก๊าซเรือนกระจก",type:"scoredItem",scoreMax:5},{key:"s2_6",label:"6. การจัดการของเสีย",type:"scoredItem",scoreMax:5},{key:"s2_7",label:"7. การจัดการสารเคมีและวัตถุอันตราย",type:"scoredItem",scoreMax:5},{key:"s2_8",label:"8. การจัดการอาชีวอนามัยและความปลอดภัย",type:"scoredItem",scoreMax:5},{key:"s2_9",label:"9. การจัดการระบบโลจิสติกส์",type:"scoredItem",scoreMax:5},{key:"s2_10",label:"10. การจัดการโซ่อุปทานสีเขียว",type:"scoredItem",scoreMax:5},{key:"s2_11",label:"11. การจัดการภูมิทัศน์สีเขียว",type:"scoredItem",scoreMax:5},{key:"s2_12",label:"12. การจัดการความหลากหลายทางชีวภาพ",type:"scoredItem",scoreMax:5},{key:"s2_13",label:"13. การกระจายรายได้ให้กับชุมชน",type:"scoredItem",scoreMax:5},{key:"s2_14",label:"14. การอยู่ร่วมกับชุมชนโดยรอบ",type:"scoredItem",scoreMax:5},{key:"s3",label:"3. ข้อกำหนดเฉพาะเกี่ยวกับการปรับปรุงอย่างต่อเนื่อง (Continual Improvement — Eco-efficiency)",type:"section"},{key:"s3_0",label:"มีข้อมูลมูลค่าผลิตภัณฑ์หรือบริการ 3 ปีย้อนหลัง (เช่น ยอดขาย ยอดผลิต)",type:"passItem"},{key:"s3_1",label:"ด้านวัตถุดิบ — มีข้อมูล Resource Intensity ย้อนหลัง 3 ปี",type:"passItem"},{key:"s3_2",label:"ด้านพลังงาน — มีข้อมูล Energy Intensity ย้อนหลัง 3 ปี",type:"passItem"},{key:"s3_3",label:"ด้านน้ำและน้ำเสีย — มีข้อมูล Water Intensity ย้อนหลัง 3 ปี",type:"passItem"},{key:"s3_4",label:"ด้านก๊าซเรือนกระจก — มีข้อมูล GHG Intensity ย้อนหลัง 3 ปี",type:"passItem"},{key:"s3_5",label:"ด้านของเสีย — มีข้อมูล Waste Intensity ย้อนหลัง 3 ปี",type:"passItem"}],H=()=>({fullName:"",organization:"",phone:"",email:""}),D=()=>({fullName:"",organization:"",phone:"",email:"",expertiseEnvironment:!1,expertiseSocial:!1,expertiseEcoEconomics:!1}),ve={applicationId:null,currentStep:1,isLoading:!1,isDirty:!1,validationErrors:{},auth:{userId:null,email:"",fullName:"",role:"",token:""},step1:{applicationType:"new_registration",organizationName:"",factoryRegistrationNo:"",industryType:"",addrNo:"",addrMoo:"",addrSoi:"",addrRoad:"",addrIndustrialEstate:"",addrTambon:"",addrAmphoe:"",addrProvince:"",addrPostcode:"",billingCompanyName:"",billingAddrNo:"",billingAddrMoo:"",billingAddrSoi:"",billingAddrRoad:"",billingAddrIndustrialEstate:"",billingAddrTambon:"",billingAddrAmphoe:"",billingAddrProvince:"",billingAddrPostcode:"",billingTaxId:"",billingBranch:"",billingIsHeadOffice:!0,deliveryAddressType:"factory",deliveryCustomAddress:""},step2:{permanentEmployeeCount:"",outsourceEmployeeCount:"",factorySize:"",assessmentMethod:"self",consultants:[H(),H(),H()]},step3:{auditingOrgName:"",auditors:[{...D(),role:"lead",sortOrder:0},{...D(),role:"member",sortOrder:1},{...D(),role:"member",sortOrder:2}],checklist:[{itemNo:1,itemLabel:"ใบสมัครขอขึ้นทะเบียน Eco Factory",itemGroup:"A",requiredLevel:"required",uploadType:"system_generated",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"องค์กรผู้ขอรับรอง"},{itemNo:2,itemLabel:"รายงานการตรวจประเมินตนเอง",itemGroup:"A",requiredLevel:"required",uploadType:"auto_from_step3",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:6,itemLabel:"หลักฐานประกอบการประเมินตนเองตามเกณฑ์",itemGroup:"A",requiredLevel:"required",uploadType:"auto_from_step3",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:3,itemLabel:"สำเนาใบอนุญาตโรงงาน (ร.ง. 4)",itemGroup:"B",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"องค์กรผู้ขอรับรอง"},{itemNo:4,itemLabel:"ข้อมูลบริษัท/โรงงาน (Company Profile)",itemGroup:"B",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"องค์กรผู้ขอรับรอง"},{itemNo:5,itemLabel:"โครงสร้างองค์กรด้านสิ่งแวดล้อม",itemGroup:"B",requiredLevel:"recommended",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"องค์กรผู้ขอรับรอง"},{itemNo:7,itemLabel:"ไฟล์นำเสนอการตรวจประเมิน Eco Factory (ฉบับเต็ม)",itemGroup:"C",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:8,itemLabel:"ไฟล์นำเสนอผลการตรวจประเมินฉบับบทสรุปผู้บริหาร",itemGroup:"C",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"องค์กรผู้ขอรับรอง",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:9,itemLabel:"ใบรับรองการตรวจประเมิน",itemGroup:"D",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"ผู้ตรวจประเมิน",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:10,itemLabel:"รายงานการตรวจประเมิน",itemGroup:"D",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"ผู้ตรวจประเมิน",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:11,itemLabel:"ฟอร์มการคำนวณ Eco efficiency",itemGroup:"D",requiredLevel:"required",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"ผู้ตรวจประเมิน",submittedBy:"ผู้ตรวจประเมิน"},{itemNo:12,itemLabel:"หลักฐานเพิ่มเติมอื่นๆ",itemGroup:"D",requiredLevel:"optional",uploadType:"upload",isChecked:!1,notApplicable:!1,note:"",preparedBy:"ผู้ตรวจประเมิน",submittedBy:"ผู้ตรวจประเมิน"}],checklistUploads:[],saEvidenceUploads:[],selfAssessment:{}},step4:{meetingRoundNo:"",meetingDate:"",coordName:"",coordPosition:"",coordPhone:"",coordExt:"",coordMobile:"",coordEmail:"",applicantName:"",applicantPosition:"",applicantPhone:"",applicantExt:"",applicantFax:"",applicantMobile:"",applicantEmail:"",signatureData:null,companyStampFile:null},wpAuditId:null,wpStep1:{companyName:"",factoryRegNo:"",industryType:"",address:"",mainService:"",fixedAssets:null,annualRevenue:null,companySize:"",permanentEmployees:null,outsourceEmployees:null,workingHoursPerShift:null,assessmentDate:"",followupStart:"",followupEnd:"",productionData:[],orgChartFileId:null,factoryMapFileId:null,processMapFileId:null},wpStep2:{m2a:{legalCompliance:null,legalDoc:"",envSystems:{iso14001:!1,gi3:!1,gi2:!1,greenFlag:!1,policyProgram:!1},noComplaints:null,govtPrograms:"",govtDoc:""},m2b:{b1LawCompliance:null,b1BestPractices:null,b2OverallScore:null,b2MainStepScore:null,b3Level:"",b3CertDate:"",b3CertFileId:null}},wpStep3:{items:[{topicNo:"3.1",label:"การจัดการวัตถุดิบ",result:"",docRef:"",score:0,isNA:!1},{topicNo:"3.2",label:"การจัดการน้ำและน้ำเสีย",result:"",docRef:"",score:0,isNA:!1},{topicNo:"3.3",label:"การจัดการมลภาวะทางอากาศ",result:"",docRef:"",score:0,isNA:!1},{topicNo:"3.4",label:"การจัดการของเสีย",result:"",docRef:"",score:0,isNA:!1},{topicNo:"3.5",label:"การจัดการสารเคมีและวัตถุอันตราย",result:"",docRef:"",score:0,isNA:!1},{topicNo:"3.6",label:"การจัดการอาชีวอนามัยและความปลอดภัย",result:"",docRef:"",score:0,isNA:!1},{topicNo:"3.7",label:"การอยู่ร่วมกับชุมชนโดยรอบ",result:"",docRef:"",score:0,isNA:!1}]},wpStep4:{m4Intake:{verify:!1,manifest:!1,quarantine:!1,docRef:""},m4Process:{sorting:!1,treatment:!1,disposal:!1,chainOfCustody:!1,docRef:""},m4Reporting:{diwReport:!1,disclosure:!1,diwLevel:""},m5SelectedIssues:[],m5EcoEfficiency:{rows:[{label:"มูลค่าการขาย (Net Sale)",unit:"ล้านบาท",yrRef:"",yr1:"",yr2:""},{label:"ปริมาณของเสียที่รับจัดการ",unit:"ตัน",yrRef:"",yr1:"",yr2:""},{label:"ปริมาณการใช้น้ำ",unit:"ลบ.ม.",yrRef:"",yr1:"",yr2:""},{label:"ปริมาณมลภาวะอากาศ",unit:"ตัน",yrRef:"",yr1:"",yr2:""},{label:"ปริมาณ Secondary Waste",unit:"ตัน",yrRef:"",yr1:"",yr2:""}],eeiIndex:{yrRef:"",yr1:"",yr2:""}},m5CommunityProjects:[],m5TrendChartFileId:null},wpStep6:{summary:{},sigPreparer:{name:"",position:"",date:"",data:""},sigExecutive:{name:"",position:"",date:"",data:""},sigAuditor:{name:"",position:"",date:"",data:""}}};function U(i){return JSON.parse(JSON.stringify(i))}function fe(i){let e=U(i);const t={};return{get state(){return e},get(a){return a.split(".").reduce((s,n)=>s==null?void 0:s[n],e)},set(a,s){const n=a.split(".");let l=e;for(let o=0;o<n.length-1;o++)l=l[n[o]];l[n[n.length-1]]=s,e.isDirty=!0,this._notify(n[0])},setStep(a,s){e[a]={...e[a],...s},e.isDirty=!0,this._notify(a)},subscribe(a,s){return t[a]||(t[a]=[]),t[a].push(s),()=>{t[a]=t[a].filter(n=>n!==s)}},_notify(a){var s,n;(s=t[a])==null||s.forEach(l=>l(e)),(n=t["*"])==null||n.forEach(l=>l(e))},hydrate(a){var s,n,l,o,c;if(a.applicationType&&(e.step1.applicationType=a.applicationType),a.currentStep&&(e.currentStep=a.currentStep),a.companyInfo&&(e.step1={...e.step1,...he(a.companyInfo)}),a.orgAssessment&&(e.step2={...e.step2,...ge(a.orgAssessment)}),(s=a.consultants)!=null&&s.length){const r=U(e.step2.consultants);a.consultants.forEach((p,m)=>{m<3&&(r[m]=p)}),e.step2.consultants=r}if(a.auditorTeam&&(e.step3.auditingOrgName=a.auditorTeam.auditingOrgName||""),(n=a.auditors)!=null&&n.length&&(e.step3.auditors=a.auditors.slice(0,3).map((r,p)=>({...D(),...r,sortOrder:p}))),(l=a.checklist)!=null&&l.length&&(e.step3.checklist=e.step3.checklist.map(r=>{const p=a.checklist.find(m=>m.itemNo===r.itemNo);return p?{...r,isChecked:p.isChecked,notApplicable:p.notApplicable??r.notApplicable,note:p.note??r.note,preparedBy:p.preparedBy||r.preparedBy,submittedBy:p.submittedBy||r.submittedBy}:r})),(o=a.selfAssessment)!=null&&o.length){const r={};a.selfAssessment.forEach(p=>{r[p.key]={hasItem:p.hasItem??null,score:p.score??null,note:p.note||"",evidence:p.evidence||""}}),e.step3.selfAssessment=r}(c=a.fileUploads)!=null&&c.length&&(e.step3.checklistUploads=a.fileUploads.filter(r=>r.purpose==="checklist_doc").map(r=>({id:r.id,itemNo:r.itemNo,fileName:r.fileName})),e.step3.saEvidenceUploads=a.fileUploads.filter(r=>r.purpose==="sa_evidence").map(r=>({id:r.id,itemKey:r.itemKey,fileName:r.fileName})),e.step3.checklist=e.step3.checklist.map(r=>r.uploadType!=="upload"?r:{...r,isChecked:e.step3.checklistUploads.some(p=>p.itemNo===r.itemNo)})),a.meetingContact&&(e.step4={...e.step4,...a.meetingContact})},reset(){e=U(i)}}}function he(i){return{organizationName:i.organizationName||"",factoryRegistrationNo:i.factoryRegistrationNo||"",industryType:i.industryType||"",addrNo:i.addrNo||"",addrMoo:i.addrMoo||"",addrSoi:i.addrSoi||"",addrRoad:i.addrRoad||"",addrIndustrialEstate:i.addrIndustrialEstate||"",addrTambon:i.addrTambon||"",addrAmphoe:i.addrAmphoe||"",addrProvince:i.addrProvince||"",addrPostcode:i.addrPostcode||"",billingCompanyName:i.billingCompanyName||"",billingAddrNo:i.billingAddrNo||"",billingAddrMoo:i.billingAddrMoo||"",billingAddrSoi:i.billingAddrSoi||"",billingAddrRoad:i.billingAddrRoad||"",billingAddrIndustrialEstate:i.billingAddrIndustrialEstate||"",billingAddrTambon:i.billingAddrTambon||"",billingAddrAmphoe:i.billingAddrAmphoe||"",billingAddrProvince:i.billingAddrProvince||"",billingAddrPostcode:i.billingAddrPostcode||"",billingTaxId:i.billingTaxId||"",billingBranch:i.billingBranch||"",billingIsHeadOffice:i.billingIsHeadOffice!==!1,deliveryAddressType:i.deliveryAddressType||"factory",deliveryCustomAddress:i.deliveryCustomAddress||""}}function ge(i){return{permanentEmployeeCount:i.permanentEmployeeCount||"",outsourceEmployeeCount:i.outsourceEmployeeCount||"",factorySize:i.factorySize||"",assessmentMethod:i.assessmentMethod||"self"}}const d=fe(ve),be={s2_1:["ไม่มีการบันทึกหรือควบคุมการใช้วัตถุดิบ","มีนโยบายการจัดการวัตถุดิบ แต่ยังไม่มีแผนปฏิบัติการ","มีการบันทึกปริมาณการใช้วัตถุดิบ และมีแนวทางลดของเสียจากกระบวนการ","มีระบบควบคุมคุณภาพและปริมาณวัตถุดิบ พร้อมแผนลดการใช้และการสูญเสีย","มีการตั้งเป้าหมาย ติดตาม และรายงาน Resource Intensity ย้อนหลัง 3 ปี","มีผลการปรับปรุงประสิทธิภาพการใช้วัตถุดิบอย่างต่อเนื่อง พร้อมหลักฐานที่วัดได้"],s2_2:["ไม่มีการวัดหรือบันทึกการใช้พลังงาน","มีนโยบายอนุรักษ์พลังงาน แต่ยังไม่มีการดำเนินการเป็นระบบ","มีการบันทึกการใช้พลังงาน และดำเนินโครงการประหยัดพลังงานบางส่วน","มีระบบจัดการพลังงาน มีเป้าหมาย แผนงาน และดำเนินการอย่างครบถ้วน","มีการติดตาม Energy Intensity ย้อนหลัง 3 ปี และรายงานผลเป็นประจำ","มีผลการลดพลังงานที่วัดได้ชัดเจน และมีการใช้พลังงานหมุนเวียน/ทดแทน"],s2_3:["ไม่มีการวัดหรือควบคุมการใช้น้ำและน้ำเสีย","มีนโยบายประหยัดน้ำ แต่ยังไม่มีมาตรการที่ชัดเจน","มีการบันทึกปริมาณน้ำใช้ และมีระบบบำบัดน้ำเสียเบื้องต้น","มีระบบบำบัดน้ำเสียที่ได้มาตรฐาน มีการตรวจสอบคุณภาพน้ำทิ้งตามกฎหมายสม่ำเสมอ","มีการตั้งเป้าหมายลดการใช้น้ำ ติดตาม Water Intensity ย้อนหลัง 3 ปี","มีการนำน้ำกลับมาใช้ใหม่ (Recycle/Reuse) และมีผลลดการใช้น้ำที่วัดได้ชัดเจน"],s2_4:["ไม่มีการตรวจสอบหรือควบคุมมลพิษทางอากาศ","มีนโยบายควบคุมมลพิษ แต่ยังไม่มีการดำเนินการเป็นระบบ","มีการตรวจวัดมลพิษตามที่กฎหมายกำหนดบางส่วน","มีการตรวจวัดและควบคุมมลพิษทางอากาศครบถ้วนตามกฎหมาย พร้อมระบบบำบัดที่เหมาะสม","มีการติดตามคุณภาพอากาศอย่างต่อเนื่อง และรายงานผลต่อหน่วยงานที่เกี่ยวข้อง","มีผลการปล่อยมลพิษต่ำกว่าค่ามาตรฐานอย่างมีนัยสำคัญ และมีนวัตกรรมลดมลพิษ"],s2_5:["ไม่มีการคำนวณหรือรายงานการปล่อยก๊าซเรือนกระจก","มีความเข้าใจพื้นฐานเรื่อง GHG แต่ยังไม่มีการจัดทำบัญชีคาร์บอน","มีการจัดทำบัญชีก๊าซเรือนกระจกเบื้องต้น (Scope 1 หรือ Scope 2)","มีการจัดทำบัญชี GHG ครบ Scope 1 และ 2 พร้อมแผนลดการปล่อย","มีการตรวจสอบ GHG Inventory โดยบุคคลที่สาม และรายงานผลย้อนหลัง 3 ปี","มีโครงการลด GHG ที่วัดผลได้ชัดเจน เช่น Carbon Footprint, Carbon Neutral"],s2_6:["ไม่มีระบบจัดการของเสียที่ชัดเจน","มีการแยกประเภทของเสีย แต่ยังไม่มีระบบที่เป็นระเบียบ","มีการคัดแยกและกำจัดของเสียอย่างถูกต้องตามกฎหมาย","มีระบบจัดการของเสียครบวงจร มีการบันทึก และมีผู้รับกำจัดที่ได้รับอนุญาต","มีเป้าหมายลดของเสีย ติดตาม Waste Intensity ย้อนหลัง 3 ปี","มีการนำของเสียกลับมาใช้ประโยชน์ (3R) และมีผลลดปริมาณของเสียที่วัดได้"],s2_7:["ไม่มีการจัดทำทะเบียนหรือควบคุมสารเคมี/วัตถุอันตราย","มีการจัดเก็บ SDS แต่ยังไม่มีระบบควบคุมที่ครบถ้วน","มีทะเบียนสารเคมี มีการจัดเก็บอย่างปลอดภัย และฝึกอบรมพนักงานเบื้องต้น","มีระบบจัดการสารเคมีครบถ้วน ตั้งแต่การรับ การเก็บ การใช้ และการกำจัด","มีการทบทวนทะเบียนสารเคมีเป็นประจำ มีแผนฉุกเฉิน และซ้อมแผนรับมือ","มีการทดแทนสารเคมีอันตรายด้วยสารที่ปลอดภัยกว่า และมีผลลดสารอันตรายที่วัดได้"],s2_8:["ไม่มีระบบการจัดการอาชีวอนามัยและความปลอดภัย","มีนโยบายความปลอดภัย แต่ยังไม่มีการดำเนินการอย่างเป็นระบบ","มีการดำเนินการด้าน OHS ตามกฎหมายขั้นต่ำ เช่น การฝึกซ้อม การตรวจสุขภาพ","มีระบบ OHS ครบถ้วน มี JHA/HIRA มีคณะกรรมการความปลอดภัย และแผนฉุกเฉิน","มีการตรวจสอบและรายงานอุบัติเหตุเป็นประจำ มีตัวชี้วัด OHS ที่ชัดเจน","อัตราการเกิดอุบัติเหตุเป็นศูนย์ (Zero Accident) หรือต่ำกว่าค่าเฉลี่ยอุตสาหกรรม"],s2_9:["ไม่มีการจัดการด้านโลจิสติกส์ที่เป็นระบบ","มีแนวคิดโลจิสติกส์สีเขียว แต่ยังไม่มีแผนปฏิบัติที่ชัดเจน","มีการวางแผนเส้นทางขนส่งเพื่อลดการใช้เชื้อเพลิง หรือลดการปล่อย CO₂","มีระบบโลจิสติกส์ที่ประหยัดพลังงาน พร้อมบันทึกข้อมูลการขนส่งและการปล่อยมลพิษ","มีการติดตามการปล่อย CO₂ จากการขนส่ง และรายงานผลต่อผู้มีส่วนได้ส่วนเสีย","มีการใช้ยานพาหนะ EV หรือเชื้อเพลิงสะอาด และมีผลลด CO₂ ที่วัดได้ชัดเจน"],s2_10:["ไม่มีการพิจารณาด้านสิ่งแวดล้อมในการจัดซื้อจัดจ้าง","มีนโยบายจัดซื้อสีเขียว แต่ยังไม่มีเกณฑ์ที่ชัดเจน","มีเกณฑ์สิ่งแวดล้อมในการคัดเลือกผู้ส่งมอบ และสื่อสารนโยบายแก่คู่ค้า","มีการประเมินและพัฒนาผู้ส่งมอบด้านสิ่งแวดล้อมอย่างเป็นระบบ","มีการตรวจสอบและรายงานผลคู่ค้าด้านสิ่งแวดล้อมเป็นประจำ","คู่ค้าหลักมีการรับรองด้านสิ่งแวดล้อม (ISO 14001/ฉลากเขียว) มากกว่า 50%"],s2_11:["ไม่มีการจัดพื้นที่สีเขียวในโรงงาน","มีพื้นที่สีเขียวบางส่วน แต่ยังไม่มีแผนการจัดการ","มีพื้นที่สีเขียวและการดูแลรักษาอย่างสม่ำเสมอ","มีแผนพัฒนาพื้นที่สีเขียว มีการคัดเลือกพันธุ์ไม้ที่เหมาะสม และดูแลเป็นระบบ","มีการวัดและรายงานพื้นที่สีเขียวต่อผู้มีส่วนได้ส่วนเสียเป็นประจำ","พื้นที่สีเขียวเกิน 10% ของพื้นที่โรงงาน และมีการพัฒนาอย่างต่อเนื่อง"],s2_12:["ไม่มีการดำเนินการด้านความหลากหลายทางชีวภาพ","มีความตระหนัก แต่ยังไม่มีแผนงานที่ชัดเจน","มีการสำรวจและบันทึกชนิดพันธุ์พืช/สัตว์ภายในพื้นที่","มีแผนอนุรักษ์ความหลากหลายทางชีวภาพ และดำเนินโครงการสนับสนุน","มีการติดตามและรายงานสถานะความหลากหลายทางชีวภาพเป็นประจำ","มีโครงการฟื้นฟูหรืออนุรักษ์ที่วัดผลได้ชัดเจน และแบ่งปันความรู้สู่สาธารณะ"],s2_13:["ไม่มีการดำเนินการด้านการกระจายรายได้สู่ชุมชน","มีการจ้างงานคนในพื้นที่บางส่วน แต่ยังไม่มีนโยบายที่ชัดเจน","มีนโยบายจ้างงานคนในพื้นที่ และจัดซื้อสินค้า/บริการจากชุมชนโดยรอบ","มีโครงการพัฒนาทักษะ/อาชีพให้ชุมชน และสัดส่วนการจ้างงานคนท้องถิ่น ≥ 50%","มีการรายงานผลกระทบทางเศรษฐกิจต่อชุมชน และติดตามตัวชี้วัดเป็นประจำ","มีโครงการสร้างรายได้ชุมชนอย่างยั่งยืนที่วัดผลได้ และมีการแบ่งปันผลประโยชน์"],s2_14:["ไม่มีการสื่อสารหรือดำเนินกิจกรรมกับชุมชน","มีช่องทางรับเรื่องร้องเรียน แต่ยังไม่มีกิจกรรมชุมชนเชิงรุก","มีการสื่อสารข้อมูลด้านสิ่งแวดล้อมให้ชุมชน และมีกิจกรรมสัมพันธ์","มีคณะกรรมการ/ที่ปรึกษาชุมชน มีการจัดประชุมหารือชุมชนเป็นประจำ","มีการสำรวจความพึงพอใจชุมชน และรายงานผลด้านสังคมเป็นประจำ","ได้รับการยอมรับจากชุมชน (เช่น รางวัล CSR) มีโครงการร่วมกับชุมชนที่ประสบความสำเร็จ"]},S="/api/v1",R="eco_auth_token";function A(){const i=localStorage.getItem(R);return i?{Authorization:`Bearer ${i}`}:{}}async function y(i,e,t){const a={method:i,headers:{"Content-Type":"application/json",...A()}};t&&(a.body=JSON.stringify(t));const s=await fetch(S+e,a);if(!s.ok){const n=await s.text();s.status===401&&localStorage.removeItem(R);let l=n;try{const o=JSON.parse(n);o.message&&(l=o.message)}catch{}throw new Error(`${s.status}: ${l}`)}return s.status===204?null:s.json()}const h={getConfig(){return y("GET","/config")},login(i,e,t=""){return y("POST","/auth/login",{email:i,password:e,turnstileToken:t}).then(a=>(a!=null&&a.token&&localStorage.setItem(R,a.token),a))},register(i){return y("POST","/auth/register",i).then(e=>(e!=null&&e.token&&localStorage.setItem(R,e.token),e))},verifyEmail(i){return y("GET",`/auth/verify-email?token=${encodeURIComponent(i)}`)},resendVerification(i){return y("POST","/auth/resend-verification",{email:i})},forgotPassword(i){return y("POST","/auth/forgot-password",{email:i})},resetPassword(i,e){return y("POST","/auth/reset-password",{token:i,password:e})},changePassword(i,e){return y("PUT","/auth/me/password",{currentPassword:i,newPassword:e})},getMe(){return y("GET","/auth/me")},updateProfile(i){return y("PUT","/auth/me",i)},uploadCertificate(i){const e=new FormData;return e.append("file",i),fetch(S+"/auth/me/certificate",{method:"POST",headers:A(),body:e}).then(async t=>{if(!t.ok)throw new Error(`${t.status}: ${await t.text()}`);return t.json()})},listCertificates(){return y("GET","/auth/me/certificates")},logout(){localStorage.removeItem(R),localStorage.removeItem("eco_application_id")},createApplication(i="new_registration"){return y("POST","/applications",{applicationType:i})},getApplication(i){return y("GET",`/applications/${i}`)},saveStep(i,e,t){return y("PUT",`/applications/${i}/step/${e}`,t)},submitApplication(i){return y("POST",`/applications/${i}/submit`)},uploadSignature(i,e){return fetch(`${S}/applications/${i}/upload`,{method:"POST",headers:A(),body:new URLSearchParams({purpose:"signature",inlineData:e})}).then(t=>t.json())},uploadChecklistDoc(i,e,t){const a=new FormData;return a.append("purpose","checklist_doc"),a.append("itemNo",String(e)),a.append("file",t),fetch(`${S}/applications/${i}/upload`,{method:"POST",headers:A(),body:a}).then(s=>s.ok?s.json():s.text().then(n=>{throw new Error(n)}))},saveSelfAssessment(i,e){return y("PUT",`/applications/${i}/self-assessment`,{items:e})},uploadSAEvidence(i,e,t){const a=new FormData;return a.append("purpose","sa_evidence"),a.append("itemKey",e),a.append("file",t),fetch(`${S}/applications/${i}/upload`,{method:"POST",headers:A(),body:a}).then(s=>s.ok?s.json():s.text().then(n=>{throw new Error(n)}))},deleteUpload(i,e){return fetch(`${S}/applications/${i}/uploads/${e}`,{method:"DELETE",headers:A()}).then(t=>!t.ok&&t.status!==204?t.text().then(a=>{throw new Error(a)}):null)},async downloadPDF(i){const e=await fetch(`${S}/applications/${i}/pdf`,{headers:A()});if(!e.ok){const n=await e.text();throw new Error(`${e.status}: ${n}`)}const t=await e.blob(),a=URL.createObjectURL(t),s=document.createElement("a");s.href=a,s.download=`eco-factory-report-${i}.pdf`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)},async downloadSelfAssessmentPDF(i){const e=await fetch(`${S}/applications/${i}/self-assessment/pdf`,{headers:A()});if(!e.ok){const n=await e.text();throw new Error(`${e.status}: ${n}`)}const t=await e.blob(),a=URL.createObjectURL(t),s=document.createElement("a");s.href=a,s.download=`eco-factory-self-assessment-${i}.pdf`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)},createWasteAward(i){return y("POST","/waste-award",i)},listWasteAward(){return y("GET","/waste-award")},getWasteAward(i){return y("GET",`/waste-award/${i}`)},saveWasteAwardFactory(i,e){return y("PUT",`/waste-award/${i}/factory`,e)},saveWasteAwardScores(i,e){return y("PUT",`/waste-award/${i}/scores`,e)},updateWasteAwardStatus(i,e){return y("PUT",`/waste-award/${i}/status`,{status:e})},async downloadWasteAwardExcel(i,e){const t=await fetch(`${S}/waste-award/${i}/excel`,{headers:A()});if(!t.ok){const l=await t.text();throw new Error(`${t.status}: ${l}`)}const a=await t.blob(),s=URL.createObjectURL(a),n=document.createElement("a");n.href=s,n.download=`waste-award-${e||i.slice(0,8)}.xlsx`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)},async uploadWasteAwardEvidence(i,e,t){const a=new FormData;a.append("file",t);const s=await fetch(`${S}/waste-award/${i}/evidence/${e}`,{method:"POST",headers:A(),body:a});if(!s.ok){const n=await s.text();throw new Error(`${s.status}: ${n}`)}return s.json()},deleteWasteAwardEvidence(i,e){return y("DELETE",`/waste-award/${i}/evidence/${e}`)},postWasteAwardFeedback(i,e){return y("POST",`/waste-award/${i}/feedback`,{message:e})},markWasteAwardNotified(i){return y("PUT",`/waste-award/${i}/notify`)},listApplications(){return y("GET","/auditor/applications")},adminListApplications(){return y("GET","/admin/applications")},adminUpdateApplicationStatus(i,e){return y("PUT",`/admin/applications/${i}/status`,{status:e})},adminAssignAuditor(i,e){return y("PUT",`/admin/applications/${i}/auditor`,{auditorUserId:e})},adminListWasteAward(){return y("GET","/admin/waste-award")},adminAssignWasteAuditor(i,e){return y("PUT",`/admin/waste-award/${i}/assign`,{auditorUserId:e})},adminListUsers(){return y("GET","/admin/users")},adminCreateUser(i){return y("POST","/admin/users",i)},adminUpdateUser(i,e){return y("PUT",`/admin/users/${i}`,e)},adminDeleteUser(i){return y("DELETE",`/admin/users/${i}`)},createWpAudit(){return y("POST","/wp-self-audits")},listWpAudits(){return y("GET","/wp-self-audits")},getWpAudit(i){return y("GET",`/wp-self-audits/${i}`)},deleteWpAudit(i){return y("DELETE",`/wp-self-audits/${i}`)},saveWpStep(i,e,t){return y("PUT",`/wp-self-audits/${i}/step/${e}`,t)},submitWpAudit(i){return y("POST",`/wp-self-audits/${i}/submit`)},async uploadWpFile(i,e,t){const a=new FormData;a.append("purpose",e),a.append("file",t);const s=await fetch(`${S}/wp-self-audits/${i}/upload`,{method:"POST",headers:A(),body:a});if(!s.ok)throw new Error(`${s.status}: ${await s.text()}`);return s.json()},async downloadWpPDF(i,e){const t=await fetch(`${S}/wp-self-audits/${i}/pdf`,{headers:A()});if(!t.ok){const l=await t.text();throw new Error(`${t.status}: ${l}`)}const a=await t.blob(),s=URL.createObjectURL(a),n=document.createElement("a");n.href=s,n.download=`wp-self-audit-${e||i.slice(0,8)}.pdf`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}};function b({name:i,label:e,type:t="text",required:a=!1,placeholder:s="",maxlength:n="",value:l="",className:o=""}){return`
    <div class="form-field ${a?"required":""} ${o}" data-field="${i}">
      <label class="form-label" for="${i}">${e}${a?' <span class="req-mark">*</span>':""}</label>
      <input
        type="${t}"
        id="${i}"
        name="${i}"
        class="form-input"
        value="${ye(l)}"
        ${s?`placeholder="${s}"`:""}
        ${n?`maxlength="${n}"`:""}
        ${a?'data-required="true"':""}
      >
      <span class="error-msg" id="${i}-error"></span>
    </div>
  `}function K({name:i,label:e,options:t,value:a=""}){return`
    <div class="form-field radio-group" data-field="${i}">
      <span class="form-label">${e}</span>
      <div class="radio-options">
        ${t.map(s=>`
          <label class="radio-option">
            <input type="radio" name="${i}" value="${s.value}" ${s.value===a?"checked":""}>
            ${s.label}
          </label>
        `).join("")}
      </div>
      <span class="error-msg" id="${i}-error"></span>
    </div>
  `}function ye(i){return String(i||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function we(i){var t,a,s;const e={};return(t=i.organizationName)!=null&&t.trim()||(e.organizationName="กรุณากรอกชื่อองค์กร"),(a=i.addrNo)!=null&&a.trim()||(e.addrNo="กรุณากรอกเลขที่"),(s=i.addrProvince)!=null&&s.trim()||(e.addrProvince="กรุณากรอกจังหวัด"),i.addrPostcode&&!/^\d{5}$/.test(i.addrPostcode)&&(e.addrPostcode="รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก"),i.billingPostcode&&!/^\d{5}$/.test(i.billingAddrPostcode)&&(e.billingAddrPostcode="รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก"),i.billingTaxId&&!/^\d{13}$/.test(i.billingTaxId)&&(e.billingTaxId="เลขผู้เสียภาษีต้องเป็นตัวเลข 13 หลัก"),{isValid:Object.keys(e).length===0,errors:e}}class xe{constructor({router:e}){this.router=e}render(){const e=d.get("step1");return`
      <div class="step-panel">
        <h2 class="step-title">ขั้นตอนที่ 1 — ข้อมูลบริษัทที่ขอการรับรอง</h2>

        <div class="form-card">
          ${K({name:"applicationType",label:"ประเภทการสมัคร",value:e.applicationType,options:[{value:"new_registration",label:"ขึ้นทะเบียนครั้งแรก"},{value:"renewal",label:"ต่ออายุใบรับรอง"}]})}
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ที่อยู่โรงงาน</legend>
            ${b({name:"organizationName",label:"ชื่อองค์กรที่ขอรับรอง บริษัท",required:!0,value:e.organizationName})}
            <div class="form-row cols-4">
              ${b({name:"addrNo",label:"ตั้งอยู่เลขที่",required:!0,value:e.addrNo})}
              ${b({name:"addrMoo",label:"หมู่ที่",value:e.addrMoo})}
              ${b({name:"addrSoi",label:"ตรอก/ซอย",value:e.addrSoi})}
              ${b({name:"addrRoad",label:"ถนน",value:e.addrRoad})}
            </div>
            <div class="form-row cols-2">
              ${b({name:"addrIndustrialEstate",label:"นิคมอุตสาหกรรม/เขตประกอบการ",value:e.addrIndustrialEstate})}
              ${b({name:"addrTambon",label:"แขวง/ตำบล",value:e.addrTambon})}
            </div>
            <div class="form-row cols-3">
              ${b({name:"addrAmphoe",label:"เขต/อำเภอ",value:e.addrAmphoe})}
              ${b({name:"addrProvince",label:"จังหวัด",required:!0,value:e.addrProvince})}
              ${b({name:"addrPostcode",label:"รหัสไปรษณีย์",maxlength:"5",value:e.addrPostcode})}
            </div>
            ${b({name:"factoryRegistrationNo",label:"เลขทะเบียนโรงงาน",value:e.factoryRegistrationNo})}
            ${b({name:"industryType",label:"ประเภทอุตสาหกรรม/ผลิตภัณฑ์หลัก",value:e.industryType})}
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ที่อยู่สำหรับออกใบแจ้งหนี้/ใบเสร็จ</legend>
            ${b({name:"billingCompanyName",label:"บริษัท",value:e.billingCompanyName})}
            <div class="form-row cols-4">
              ${b({name:"billingAddrNo",label:"ตั้งอยู่เลขที่",value:e.billingAddrNo})}
              ${b({name:"billingAddrMoo",label:"หมู่ที่",value:e.billingAddrMoo})}
              ${b({name:"billingAddrSoi",label:"ตรอก/ซอย",value:e.billingAddrSoi})}
              ${b({name:"billingAddrRoad",label:"ถนน",value:e.billingAddrRoad})}
            </div>
            <div class="form-row cols-2">
              ${b({name:"billingAddrIndustrialEstate",label:"นิคมอุตสาหกรรม/เขตประกอบการ",value:e.billingAddrIndustrialEstate})}
              ${b({name:"billingAddrTambon",label:"แขวง/ตำบล",value:e.billingAddrTambon})}
            </div>
            <div class="form-row cols-3">
              ${b({name:"billingAddrAmphoe",label:"เขต/อำเภอ",value:e.billingAddrAmphoe})}
              ${b({name:"billingAddrProvince",label:"จังหวัด",value:e.billingAddrProvince})}
              ${b({name:"billingAddrPostcode",label:"รหัสไปรษณีย์",maxlength:"5",value:e.billingAddrPostcode})}
            </div>
            ${b({name:"billingTaxId",label:"เลขประจำตัวผู้เสียภาษี (13 หลัก)",maxlength:"13",value:e.billingTaxId})}
            <div class="form-row cols-2">
              <div class="form-field">
                <span class="form-label">สาขา</span>
                <div class="radio-options">
                  <label class="radio-option">
                    <input type="radio" name="billingIsHeadOffice" value="true" ${e.billingIsHeadOffice?"checked":""}>
                    สำนักงานใหญ่
                  </label>
                  <label class="radio-option">
                    <input type="radio" name="billingIsHeadOffice" value="false" ${e.billingIsHeadOffice?"":"checked"}>
                    สาขาที่
                  </label>
                </div>
              </div>
              ${b({name:"billingBranch",label:"เลขที่สาขา",value:e.billingBranch})}
            </div>
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ที่อยู่สำหรับจัดส่งใบแจ้งหนี้/ใบเสร็จ</legend>
            ${K({name:"deliveryAddressType",label:"",value:e.deliveryAddressType,options:[{value:"factory",label:"ตามที่อยู่ของโรงงาน"},{value:"billing",label:"ตามที่อยู่ที่ระบุในใบแจ้งหนี้/ใบเสร็จ"},{value:"other",label:"อื่นๆ (โปรดระบุ)"}]})}
            <div id="delivery-custom-wrap" style="${e.deliveryAddressType==="other"?"":"display:none"}">
              ${b({name:"deliveryCustomAddress",label:"ที่อยู่",value:e.deliveryCustomAddress})}
            </div>
          </fieldset>
        </div>

        <div class="form-navigation">
          <span></span>
          <button type="button" class="btn btn-primary" id="btn-next-1">ถัดไป →</button>
        </div>
      </div>
    `}mount(){var e;this._bindInputs(),(e=document.getElementById("btn-next-1"))==null||e.addEventListener("click",()=>{this.router.navigateTo(2)}),document.querySelectorAll('input[name="deliveryAddressType"]').forEach(t=>{t.addEventListener("change",()=>{const a=document.getElementById("delivery-custom-wrap");a&&(a.style.display=t.value==="other"?"":"none")})})}_bindInputs(){["applicationType","organizationName","factoryRegistrationNo","industryType","addrNo","addrMoo","addrSoi","addrRoad","addrIndustrialEstate","addrTambon","addrAmphoe","addrProvince","addrPostcode","billingCompanyName","billingAddrNo","billingAddrMoo","billingAddrSoi","billingAddrRoad","billingAddrIndustrialEstate","billingAddrTambon","billingAddrAmphoe","billingAddrProvince","billingAddrPostcode","billingTaxId","billingBranch","deliveryAddressType","deliveryCustomAddress"].forEach(t=>{const a=document.querySelector(`[name="${t}"]`);a&&(a.addEventListener("input",()=>d.set(`step1.${t}`,a.value)),a.addEventListener("change",()=>d.set(`step1.${t}`,a.value)))}),document.querySelectorAll('input[name="billingIsHeadOffice"]').forEach(t=>{t.addEventListener("change",()=>d.set("step1.billingIsHeadOffice",t.value==="true"))})}validate(){return we(d.get("step1"))}showErrors(e){Object.entries(e).forEach(([t,a])=>{const s=document.getElementById(`${t}-error`),n=document.getElementById(t);s&&(s.textContent=a),n&&n.classList.add("error")})}unmount(){}}function $e(i){var t;const e={};return!i.permanentEmployeeCount&&i.permanentEmployeeCount!==0&&(e.permanentEmployeeCount="กรุณากรอกจำนวนพนักงานประจำ"),i.factorySize||(e.factorySize="กรุณาเลือกขนาดโรงงาน"),i.assessmentMethod==="consultant"&&((t=i.consultants)!=null&&t.some(s=>{var n;return(n=s.fullName)==null?void 0:n.trim()})||(e.con_name_0="กรุณากรอกชื่อที่ปรึกษาอย่างน้อย 1 คน")),{isValid:Object.keys(e).length===0,errors:e}}class Ee{constructor({router:e}){this.router=e}render(){const e=d.get("step2");return`
      <div class="step-panel">
        <h2 class="step-title">ขั้นตอนที่ 2 — ข้อมูลองค์กรและการประเมิน</h2>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>จำนวนพนักงาน</legend>
            <div class="form-row cols-2">
              ${b({name:"permanentEmployeeCount",label:"พนักงานประจำ (คน)",type:"number",required:!0,value:e.permanentEmployeeCount})}
              ${b({name:"outsourceEmployeeCount",label:"พนักงานคู่ธุรกิจ/รับเหมาช่วง (คน)",type:"number",value:e.outsourceEmployeeCount})}
            </div>
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ขนาดโรงงาน</legend>
            <div class="size-table">
              <table class="info-table">
                <thead>
                  <tr><th>เลือก</th><th>ขนาดโรงงาน</th><th>จำนวนการจ้างงาน</th><th>รายได้กิจการต่อปี</th></tr>
                </thead>
                <tbody>
                  ${[{value:"small",label:"ขนาดย่อม",emp:"ไม่เกิน 50 คน",rev:"ไม่เกิน 100 ล้านบาท"},{value:"medium",label:"ขนาดกลาง",emp:"51–200 คน",rev:"101–500 ล้านบาท"},{value:"large",label:"ขนาดใหญ่",emp:"มากกว่า 200 คน",rev:"เกินกว่า 500 ล้านบาท"}].map(t=>`
                    <tr class="size-row ${e.factorySize===t.value?"selected":""}" data-size="${t.value}">
                      <td class="size-radio-cell">
                        <input type="radio" name="factorySize" value="${t.value}" ${e.factorySize===t.value?"checked":""}>
                      </td>
                      <td><label for="" class="size-label">${t.label}</label></td>
                      <td>${t.emp}</td>
                      <td>${t.rev}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
              <p class="info-note">หมายเหตุ: หากเกณฑ์การจ้างงานและรายได้ต่างประเภทกัน ให้ถือรายได้เป็นเกณฑ์</p>
            </div>
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>วิธีการประเมิน</legend>
            ${K({name:"assessmentMethod",label:"",value:e.assessmentMethod,options:[{value:"self",label:"องค์กรประเมินด้วยตนเอง"},{value:"consultant",label:"ใช้บริการที่ปรึกษา"}]})}

            <div id="consultants-wrap" style="${e.assessmentMethod==="consultant"?"":"display:none"}">
              <h4 class="subsection-title">รายชื่อที่ปรึกษา</h4>
              ${[0,1,2].map(t=>this._renderConsultant(t,e.consultants[t]||{})).join("")}
            </div>
          </fieldset>
        </div>

        <div class="form-navigation">
          <button type="button" class="btn btn-secondary" id="btn-prev-2">← ย้อนกลับ</button>
          <button type="button" class="btn btn-primary" id="btn-next-2">ถัดไป →</button>
        </div>
      </div>
    `}_renderConsultant(e,t){return`
      <div class="consultant-block" data-idx="${e}">
        <h5>(${e+1}) ที่ปรึกษา</h5>
        <div class="form-row cols-2">
          ${b({name:`con_name_${e}`,label:"ชื่อ-นามสกุล",value:t.fullName||""})}
          ${b({name:`con_org_${e}`,label:"หน่วยงาน",value:t.organization||""})}
        </div>
        <div class="form-row cols-2">
          ${b({name:`con_phone_${e}`,label:"โทรศัพท์",value:t.phone||""})}
          ${b({name:`con_email_${e}`,label:"E-mail",type:"email",value:t.email||""})}
        </div>
      </div>
    `}mount(){var e,t;(e=document.getElementById("btn-prev-2"))==null||e.addEventListener("click",()=>this.router.navigateTo(1)),(t=document.getElementById("btn-next-2"))==null||t.addEventListener("click",()=>this.router.navigateTo(3)),document.querySelectorAll('input[name="assessmentMethod"]').forEach(a=>{a.addEventListener("change",()=>{const s=document.getElementById("consultants-wrap");s&&(s.style.display=a.value==="consultant"?"":"none"),d.set("step2.assessmentMethod",a.value)})}),this._bindInputs()}_bindInputs(){const e=(t,a)=>{const s=document.querySelector(`[name="${t}"]`);if(!s)return;const n=s.type==="radio"?"change":"input";s.addEventListener(n,()=>d.set(a,s.value))};e("permanentEmployeeCount","step2.permanentEmployeeCount"),e("outsourceEmployeeCount","step2.outsourceEmployeeCount"),document.querySelectorAll('input[name="factorySize"]').forEach(t=>{t.addEventListener("change",()=>{d.set("step2.factorySize",t.value),document.querySelectorAll(".size-row").forEach(a=>{a.classList.toggle("selected",a.dataset.size===t.value)})})}),document.querySelectorAll(".size-row").forEach(t=>{t.addEventListener("click",()=>{const a=t.querySelector('input[type="radio"]');a&&!a.checked&&(a.checked=!0,a.dispatchEvent(new Event("change",{bubbles:!0})))})}),[0,1,2].forEach(t=>{const a=(s,n)=>{const l=document.querySelector(`[name="con_${s}_${t}"]`);l&&l.addEventListener("input",()=>{const o=[...d.get("step2.consultants")];o[t]={...o[t],[n]:l.value},d.set("step2.consultants",o)})};a("name","fullName"),a("org","organization"),a("phone","phone"),a("email","email")})}validate(){return $e(d.get("step2"))}showErrors(e){Object.entries(e).forEach(([t,a])=>{const s=document.getElementById(`${t}-error`);s&&(s.textContent=a);const n=document.getElementById(t);n&&n.classList.add("error")})}unmount(){}}const L=J.filter(i=>i.type==="scoredItem"),ee=J.filter(i=>i.type==="passItem"&&i.key.startsWith("s1")),te=J.filter(i=>i.type==="passItem"&&i.key.startsWith("s3")),B=L.reduce((i,e)=>i+e.scoreMax,0);class _e{constructor({router:e}){this.router=e,this._saveTimer=null}render(){const e=d.get("step3.selfAssessment")||{},t=d.get("step3.saEvidenceUploads")||[];return`
      <div class="step-panel">
        <h2 class="step-title">ขั้นตอนที่ 3 — รายงานการตรวจประเมินตนเอง</h2>
        <div class="form-card" id="sa-form-container">
          ${this._renderForm(e,t)}
        </div>
        <div id="sa-charts-section">
          ${this._renderCharts()}
        </div>
        <div id="sa-summary-section">
          ${this._renderSummary(e)}
        </div>
        <div class="form-navigation">
          <button type="button" class="btn btn-secondary" id="btn-prev-3">← ย้อนกลับ</button>
          <button type="button" class="btn btn-outline-primary" id="btn-print-sa">🖨 พิมพ์รายงาน PDF</button>
          <button type="button" class="btn btn-primary" id="btn-next-3">ถัดไป →</button>
        </div>
      </div>
    `}_calcScore(e){return L.reduce((t,a)=>{var s;return t+(((s=e[a.key])==null?void 0:s.score)??0)},0)}_scoreBadgeClass(e){return e==null||e===""?"sa-badge-empty":e===0?"sa-badge-0":e<=2?"sa-badge-low":e===3?"sa-badge-mid":"sa-badge-high"}_truncate(e,t=28){return e.length>t?e.slice(0,t-3)+"...":e}_fileTypeTag(e){const t=(e.split(".").pop()||"").toLowerCase();return{pdf:"PDF",doc:"Word",docx:"Word",xls:"Excel",xlsx:"Excel",jpg:"รูป",jpeg:"รูป",png:"รูป",gif:"รูป",webp:"รูป",bmp:"รูป",heic:"รูป"}[t]||t.toUpperCase()}_renderCharts(){return`
      <div class="sa-section">
        <div class="sa-section-header">
          <span class="sa-section-no">4</span>
          กราฟแสดงผลการประเมิน
        </div>
        <div class="sa-charts-grid">
          <div class="sa-chart-card">
            <div class="sa-chart-title">Radar Chart — ข้อกำหนดเฉพาะ 14 มิติ</div>
            <canvas id="sa-radar-chart"></canvas>
            <div class="sa-chart-legend">
              ${L.map((e,t)=>`<span class="sa-chart-legend-item">${t+1} = ${e.label.replace(/^\d+\.\s*/,"")}</span>`).join("")}
            </div>
          </div>
          <div class="sa-chart-card">
            <div class="sa-chart-title">คะแนนแต่ละมิติ</div>
            <canvas id="sa-bar-chart"></canvas>
          </div>
        </div>
      </div>
    `}_renderSummary(e){const t=this._calcScore(e),a=B>0?(t/B*100).toFixed(1):"0.0",n=d.get("step2.factorySize")==="large"?80:70,l=parseFloat(a)>=n,o=ee.every(v=>{var g;return((g=e[v.key])==null?void 0:g.hasItem)===!0}),c=te.every(v=>{var g;return((g=e[v.key])==null?void 0:g.hasItem)===!0}),r=l&&o&&c,p=L.filter(v=>{var g;return(((g=e[v.key])==null?void 0:g.score)??-1)>=4}),m=L.filter(v=>{var f;const g=(f=e[v.key])==null?void 0:f.score;return g!=null&&g<=2});return`
      <div class="sa-section">
        <div class="sa-section-header">
          <span class="sa-section-no">5</span>
          รายงานสรุป
        </div>

        <div class="sa-summary-grid">
          <!-- Score card -->
          <div class="sa-summary-score-card ${r?"sa-sum-pass":"sa-sum-fail"}">
            <div class="sa-sum-pct">${a}%</div>
            <div class="sa-sum-raw">${t} / ${B} คะแนน</div>
            <div class="sa-sum-verdict ${r?"verdict-pass":"verdict-fail"}">
              ${r?"✓ ผ่านเกณฑ์":"✗ ยังไม่ผ่านเกณฑ์"}
            </div>
            <div class="sa-sum-threshold">เกณฑ์ผ่าน ≥ ${n}%</div>
            <div class="sa-sum-checks">
              <div class="${o?"sum-check-pass":"sum-check-fail"}">${o?"✓":"✗"} ข้อกำหนดทั่วไป</div>
              <div class="${l?"sum-check-pass":"sum-check-fail"}">${l?"✓":"✗"} คะแนนข้อกำหนดเฉพาะ</div>
              <div class="${c?"sum-check-pass":"sum-check-fail"}">${c?"✓":"✗"} การปรับปรุงต่อเนื่อง</div>
            </div>
          </div>

          <!-- Strengths -->
          <div class="sa-summary-card">
            <div class="sa-sum-card-title">💪 จุดแข็ง (คะแนน 4–5)</div>
            ${p.length?p.map(v=>{var g;return`
                  <div class="sa-sum-item sa-sum-item-strength">
                    <span class="sa-sum-item-score">${(g=e[v.key])==null?void 0:g.score}</span>
                    <span class="sa-sum-item-label">${v.label.replace(/^\d+\.\s*/,"")}</span>
                  </div>`}).join(""):'<div class="sa-sum-empty">ยังไม่มีรายการที่ผ่านเกณฑ์จุดแข็ง</div>'}
          </div>

          <!-- Weaknesses -->
          <div class="sa-summary-card">
            <div class="sa-sum-card-title">⚠ ต้องปรับปรุง (คะแนน 0–2)</div>
            ${m.length?m.map(v=>{var g;return`
                  <div class="sa-sum-item sa-sum-item-weak">
                    <span class="sa-sum-item-score">${((g=e[v.key])==null?void 0:g.score)??0}</span>
                    <span class="sa-sum-item-label">${v.label.replace(/^\d+\.\s*/,"")}</span>
                  </div>`}).join(""):'<div class="sa-sum-empty">ยังไม่มีรายการที่ต้องปรับปรุง</div>'}
          </div>
        </div>

        <!-- Detailed table -->
        <div class="sa-sum-table-wrap">
          <div class="sa-sum-card-title">ตารางคะแนนละเอียด — ข้อกำหนดเฉพาะ</div>
          <table class="sa-sum-table">
            <thead>
              <tr><th>#</th><th>มิติ</th><th>คะแนน</th><th>สถานะ</th><th>สรุปผลการตรวจ</th></tr>
            </thead>
            <tbody>
              ${L.map((v,g)=>{var $,_;const f=(($=e[v.key])==null?void 0:$.score)??null,u=((_=e[v.key])==null?void 0:_.evidence)||"",w=this._scoreBadgeClass(f),x=f===null?"—":f>=4?"✓ ดี":f===3?"~ พอใช้":f>=1?"⚠ ต้องปรับปรุง":"✗ บกพร่อง";return`
                  <tr>
                    <td class="sa-sum-td-no">${g+1}</td>
                    <td class="sa-sum-td-label">${v.label.replace(/^\d+\.\s*/,"")}</td>
                    <td class="sa-sum-td-score"><span class="sa-score-badge ${w}">${f!==null?f:"—"}</span></td>
                    <td class="sa-sum-td-status">${x}</td>
                    <td class="sa-sum-td-evidence">${u?u.slice(0,60)+(u.length>60?"…":""):"—"}</td>
                  </tr>`}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}_renderForm(e,t){const a=this._calcScore(e),s=B>0?(a/B*100).toFixed(1):"0.0";return`
      <div class="self-assess-form">

        <!-- Score summary -->
        <div class="sa-score-summary">
          <div class="sa-score-summary-label">คะแนนรวมข้อกำหนดเฉพาะ (ส่วนที่ 2)</div>
          <div class="sa-score-summary-val">
            <span id="sa-total-score">${a}</span>
            <span class="sa-score-summary-max">/ ${B}</span>
          </div>
          <div class="sa-score-summary-pct">
            <div class="sa-pct-bar">
              <div class="sa-pct-fill" id="sa-pct-fill" style="width:${s}%"></div>
            </div>
            <span id="sa-total-pct">${s}</span>%
          </div>
          <div class="sa-score-threshold">
            <span class="sa-threshold-tag">ขนาดย่อม/กลาง ≥ 70%</span>
            <span class="sa-threshold-tag">ขนาดใหญ่ ≥ 80%</span>
          </div>
        </div>

        <!-- Section 1: ข้อกำหนดทั่วไป -->
        <div class="sa-section">
          <div class="sa-section-header">
            <span class="sa-section-no">1</span>
            ข้อกำหนดทั่วไป (General Requirements)
            <span class="sa-section-badge sa-section-badge-pass">ผ่าน / ไม่ผ่าน</span>
          </div>
          ${this._renderPassTable(ee,e,t)}
        </div>

        <!-- Section 2: ข้อกำหนดเฉพาะ — card per dimension -->
        <div class="sa-section">
          <div class="sa-section-header">
            <span class="sa-section-no">2</span>
            ข้อกำหนดเฉพาะเกี่ยวกับโรงงานอุตสาหกรรมเชิงนิเวศ (Specific Requirements for Eco Factory)
            <span class="sa-section-badge sa-section-badge-score">คะแนน 0–5 ต่อมิติ</span>
          </div>
          <div class="sa-dim-grid">
            ${L.map((n,l)=>this._renderScoredCard(n,e[n.key]||{},t,l+1)).join("")}
          </div>
        </div>

        <!-- Section 3: การปรับปรุงต่อเนื่อง -->
        <div class="sa-section">
          <div class="sa-section-header">
            <span class="sa-section-no">3</span>
            ข้อกำหนดเฉพาะเกี่ยวกับการปรับปรุงอย่างต่อเนื่อง (Continual Improvement — Eco-efficiency)
            <span class="sa-section-badge sa-section-badge-pass">ผ่าน / ไม่ผ่าน</span>
          </div>
          ${this._renderPassTable(te,e,t)}
        </div>

      </div>
    `}_renderPassTable(e,t,a){return`
      <table class="sa-pass-table">
        <thead>
          <tr>
            <th class="sa-pass-th-label">ข้อกำหนด</th>
            <th class="sa-pass-th-radio">ผล</th>
            <th class="sa-pass-th-note">ประเด็น / ข้อเสนอแนะ</th>
            <th class="sa-pass-th-upload">หลักฐาน</th>
          </tr>
        </thead>
        <tbody>${e.map(n=>{const l=t[n.key]||{},o=l.hasItem,c=a.filter(r=>r.itemKey===n.key);return`
        <tr class="sa-pass-row" data-key="${n.key}">
          <td class="sa-pass-label">${n.label}</td>
          <td class="sa-pass-radio">
            <label class="sa-radio-opt">
              <input type="radio" name="sa_${n.key}" value="true"
                ${o===!0?"checked":""}
                data-action="sa-pass" data-key="${n.key}" data-val="true">
              <span class="sa-radio-pass">ผ่าน</span>
            </label>
            <label class="sa-radio-opt">
              <input type="radio" name="sa_${n.key}" value="false"
                ${o===!1?"checked":""}
                data-action="sa-pass" data-key="${n.key}" data-val="false">
              <span class="sa-radio-fail">ไม่ผ่าน</span>
            </label>
          </td>
          <td class="sa-pass-note">
            <input type="text" class="sa-note-input" placeholder="ประเด็นความไม่สอดคล้องและข้อเสนอแนะ"
              data-action="sa-note" data-key="${n.key}" value="${l.note||""}">
          </td>
          <td class="sa-pass-upload">
            ${this._renderUploadCell(n.key,c)}
          </td>
        </tr>
      `}).join("")}</tbody>
      </table>
    `}_renderScoredCard(e,t,a,s){const n=t.score??null,l=this._scoreBadgeClass(n),o=a.filter(p=>p.itemKey===e.key),c=be[e.key]||[],r=Array.from({length:e.scoreMax+1},(p,m)=>{const v=c[m]||"",g=n===m;return`
        <label class="sa-rubric-opt${g?" sa-rubric-opt--selected":""}" data-score="${m}">
          <input type="radio" name="sa_score_${e.key}" value="${m}"
            ${g?"checked":""}
            data-action="sa-score" data-key="${e.key}" data-max="${e.scoreMax}">
          <span class="sa-rubric-opt-score ${this._scoreBadgeClass(m)}">${m}</span>
          <span class="sa-rubric-opt-desc">${v}</span>
        </label>
      `}).join("");return`
      <div class="sa-dim-card" data-key="${e.key}">
        <div class="sa-dim-header">
          <span class="sa-dim-no">${s}</span>
          <span class="sa-dim-title">${e.label}</span>
          <div class="sa-dim-score-group">
            <span class="sa-score-badge ${l}">${n!==null?n:"—"}</span>
            <span class="sa-score-denom">/ ${e.scoreMax}</span>
          </div>
        </div>

        <div class="sa-rubric-opts">
          ${r}
        </div>

        <div class="sa-dim-body">
          <div class="sa-dim-fields">
            <textarea class="sa-evidence-textarea" rows="2"
              placeholder="สรุปผลการตรวจประเมินและหลักฐานสนับสนุน (ระบุผลการดำเนินงาน เช่น ตัวชี้วัด โครงการ ระบบที่มี)"
              data-action="sa-evidence" data-key="${e.key}">${t.evidence||""}</textarea>
            <input type="text" class="sa-note-input sa-note-inline"
              placeholder="ประเด็นความไม่สอดคล้องและข้อเสนอแนะ"
              data-action="sa-note" data-key="${e.key}" value="${t.note||""}">
          </div>
          <div class="sa-dim-upload">
            ${this._renderUploadCell(e.key,o)}
          </div>
        </div>
      </div>
    `}_renderUploadCell(e,t){return`
      <div class="sa-upload-cell">
        ${t.map(n=>`
      <div class="sa-upload-file-row">
        <span class="sa-upload-type-tag">${this._fileTypeTag(n.fileName)}</span>
        <span class="sa-upload-name" title="${n.fileName}">${this._truncate(n.fileName,22)}</span>
        <button type="button" class="btn btn-xs btn-danger-outline"
          data-action="remove-sa-evidence" data-item-key="${e}" data-upload-id="${n.id}">ลบ</button>
      </div>
    `).join("")}
        <label class="btn btn-xs btn-secondary sa-upload-label">
          ${t.length?"+ เพิ่มไฟล์":"แนบไฟล์"}
          <input type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            data-action="upload-sa-evidence" data-item-key="${e}" style="display:none">
        </label>
        <span class="sa-upload-hint">รูปภาพ, PDF, Word, Excel</span>
      </div>
    `}_refreshForm(){const e=document.getElementById("sa-form-container");if(!e)return;const t=d.get("step3.selfAssessment")||{},a=d.get("step3.saEvidenceUploads")||[];e.innerHTML=this._renderForm(t,a),this._bindForm()}_chartColor(e){return e>=4?"#40916c":e===3?"#68d391":e>=1?"#f6ad55":"#e2e8f0"}_initCharts(e){var o,c;if(typeof Chart>"u")return;const t=L.map(r=>{var p;return((p=e[r.key])==null?void 0:p.score)??0}),a=L.map((r,p)=>`${p+1}`),s=L.map(r=>r.label.replace(/^\d+\.\s*/,""));(o=this._radarChart)==null||o.destroy(),(c=this._barChart)==null||c.destroy();const n=document.getElementById("sa-radar-chart");n&&(this._radarChart=new Chart(n,{type:"radar",data:{labels:a,datasets:[{label:"คะแนน",data:t,backgroundColor:"rgba(45, 106, 79, 0.15)",borderColor:"#2d6a4f",pointBackgroundColor:t.map(r=>this._chartColor(r)),pointRadius:5}]},options:{responsive:!0,scales:{r:{min:0,max:5,ticks:{stepSize:1,font:{size:11}}}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:r=>s[r[0].dataIndex]}}}}}));const l=document.getElementById("sa-bar-chart");l&&(this._barChart=new Chart(l,{type:"bar",data:{labels:a,datasets:[{data:t,backgroundColor:t.map(r=>this._chartColor(r)),borderRadius:4}]},options:{indexAxis:"y",responsive:!0,scales:{x:{min:0,max:5,ticks:{stepSize:1}},y:{ticks:{font:{size:11}}}},plugins:{legend:{display:!1},tooltip:{callbacks:{title:r=>s[r[0].dataIndex]}}}}}))}_updateCharts(e){const t=L.map(a=>{var s;return((s=e[a.key])==null?void 0:s.score)??0});this._radarChart&&(this._radarChart.data.datasets[0].data=t,this._radarChart.data.datasets[0].pointBackgroundColor=t.map(a=>this._chartColor(a)),this._radarChart.update()),this._barChart&&(this._barChart.data.datasets[0].data=t,this._barChart.data.datasets[0].backgroundColor=t.map(a=>this._chartColor(a)),this._barChart.update())}_updateSummary(e){const t=document.getElementById("sa-summary-section");t&&(t.innerHTML=this._renderSummary(e))}mount(){var e,t,a;(e=document.getElementById("btn-prev-3"))==null||e.addEventListener("click",()=>this.router.navigateTo(2)),(t=document.getElementById("btn-next-3"))==null||t.addEventListener("click",()=>this.router.navigateTo(4)),(a=document.getElementById("btn-print-sa"))==null||a.addEventListener("click",async()=>{const s=d.get("applicationId");if(!s)return;const n=document.getElementById("btn-print-sa");n.disabled=!0,n.textContent="กำลังสร้าง PDF...";try{await h.downloadSelfAssessmentPDF(s)}catch(l){alert("ไม่สามารถสร้าง PDF ได้: "+l.message)}finally{n.disabled=!1,n.textContent="🖨 พิมพ์รายงาน PDF"}}),this._bindForm(),this._initCharts(d.get("step3.selfAssessment")||{})}_bindForm(){const e=document.querySelector(".self-assess-form");e&&(e.querySelectorAll('[data-action="sa-pass"]').forEach(t=>{t.addEventListener("change",()=>{const a=t.dataset.key,s=t.dataset.val==="true",n={...d.get("step3.selfAssessment")};n[a]={...n[a],hasItem:s},d.set("step3.selfAssessment",n),this._scheduleSave()})}),e.querySelectorAll('input[data-action="sa-score"]').forEach(t=>{t.addEventListener("change",()=>{const a=t.dataset.key,s=parseInt(t.value),n={...d.get("step3.selfAssessment")};n[a]={...n[a],score:s},d.set("step3.selfAssessment",n),this._updateScoreDisplay(n),this._updateScoreBadge(a,s),this._updateRubricOptSelection(a,s),this._scheduleSave()})}),e.querySelectorAll('[data-action="sa-note"]').forEach(t=>{t.addEventListener("input",()=>{const a=t.dataset.key,s={...d.get("step3.selfAssessment")};s[a]={...s[a],note:t.value},d.set("step3.selfAssessment",s),this._scheduleSave()})}),e.querySelectorAll('[data-action="sa-evidence"]').forEach(t=>{t.addEventListener("input",()=>{const a=t.dataset.key,s={...d.get("step3.selfAssessment")};s[a]={...s[a],evidence:t.value},d.set("step3.selfAssessment",s),this._scheduleSave()})}),e.querySelectorAll('[data-action="upload-sa-evidence"]').forEach(t=>{t.addEventListener("change",async()=>{const a=Array.from(t.files);if(!a.length)return;const s=t.dataset.itemKey,n=d.get("applicationId"),l=t.closest(".sa-dim-upload, .sa-pass-upload");l&&(l.innerHTML=`<span class="sa-uploading">กำลังอัปโหลด ${a.length} ไฟล์...</span>`);const o=[];for(const c of a)try{const r=await h.uploadSAEvidence(n,s,c),p=d.get("step3.saEvidenceUploads");p.push({id:r.id,itemKey:s,fileName:r.fileName}),d.set("step3.saEvidenceUploads",p)}catch(r){console.error("Evidence upload failed",r),o.push(`${c.name}: ${r.message}`)}o.length&&alert(`อัปโหลดไม่สำเร็จ:
`+o.join(`
`)),this._refreshForm()})}),e.querySelectorAll('[data-action="remove-sa-evidence"]').forEach(t=>{t.addEventListener("click",async()=>{const a=t.dataset.itemKey,s=t.dataset.uploadId,n=d.get("applicationId");try{await h.deleteUpload(n,s),d.set("step3.saEvidenceUploads",d.get("step3.saEvidenceUploads").filter(l=>l.itemKey!==a)),this._refreshForm()}catch(l){console.error("Evidence delete failed",l),alert("ลบหลักฐานไม่สำเร็จ: "+l.message)}})}))}_updateRubricOptSelection(e,t){const a=document.querySelector(`.sa-dim-card[data-key="${e}"]`);a&&a.querySelectorAll(".sa-rubric-opt").forEach(s=>{s.classList.toggle("sa-rubric-opt--selected",parseInt(s.dataset.score)===t)})}_updateScoreDisplay(e){const t=this._calcScore(e),a=B>0?(t/B*100).toFixed(1):"0.0",s=document.getElementById("sa-total-score"),n=document.getElementById("sa-total-pct"),l=document.getElementById("sa-pct-fill");s&&(s.textContent=t),n&&(n.textContent=a),l&&(l.style.width=`${a}%`),this._updateCharts(e),this._updateSummary(e)}_updateScoreBadge(e,t){const a=document.querySelector(`.sa-dim-card[data-key="${e}"]`);if(!a)return;const s=a.querySelector(".sa-score-badge");s&&(s.textContent=t!==null?t:"—",s.className=`sa-score-badge ${this._scoreBadgeClass(t)}`)}_scheduleSave(){this._updateSummary(d.get("step3.selfAssessment")||{}),clearTimeout(this._saveTimer),this._saveTimer=setTimeout(async()=>{const e=d.get("applicationId");if(!e)return;const t=d.get("step3.selfAssessment"),a=Object.entries(t).map(([s,n])=>({key:s,hasItem:n.hasItem??null,score:n.score??null,note:n.note||"",evidence:n.evidence||""}));try{await h.saveSelfAssessment(e,a)}catch(s){console.error("Self-assessment save failed",s)}},800)}validate(){return{isValid:!0,errors:{}}}showErrors(){}unmount(){var e,t;clearTimeout(this._saveTimer),(e=this._radarChart)==null||e.destroy(),(t=this._barChart)==null||t.destroy(),this._radarChart=null,this._barChart=null}}function ke(i){var a,s;const e={},t=(a=i.auditors)==null?void 0:a[0];return(s=t==null?void 0:t.fullName)!=null&&s.trim()||(e.aud_name_0="กรุณากรอกชื่อหัวหน้าผู้ตรวจประเมิน"),{isValid:Object.keys(e).length===0,errors:e}}const ae={required:"บังคับ",recommended:"แนะนำ",optional:"เสริม"},se={required:"badge--required",recommended:"badge--recommended",optional:"badge--optional"};class Ie{constructor({router:e}){this.router=e}render(){const e=d.get("step3"),t=["(1) หัวหน้าผู้ตรวจประเมิน","(2) ผู้ตรวจประเมิน","(3) ผู้ตรวจประเมิน"],a=e.checklist.filter(r=>r.itemGroup==="A"),s=e.checklist.filter(r=>r.itemGroup==="B"),n=e.checklist.filter(r=>r.itemGroup==="C"||r.itemGroup==="D"),l=s.filter(r=>r.requiredLevel==="required"&&(r.isChecked||r.notApplicable)).length,o=s.filter(r=>r.requiredLevel==="required").length,c=s.filter(r=>r.isChecked||r.notApplicable).length;return`
      <div class="step-panel">
        <h2 class="step-title">ขั้นตอนที่ 4 — ข้อมูลผู้ตรวจประเมิน</h2>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ข้อมูลผู้ตรวจประเมินมาตรฐาน Eco Factory</legend>
            ${t.map((r,p)=>this._renderAuditor(p,r,e.auditors[p]||{})).join('<hr class="divider">')}
            ${b({name:"auditingOrgName",label:"ชื่อหน่วยงานตรวจประเมิน (กรณีนิติบุคคล)",value:e.auditingOrgName})}
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>เอกสารที่ต้องนำเสนอเพื่อประกอบการพิจารณารับรอง</legend>

            <div class="doc-group">
              <div class="doc-group-header doc-group-header--A">
                <span class="doc-group-label">กลุ่ม A — เอกสารที่ระบบสร้างอัตโนมัติ</span>
              </div>
              <div class="doc-upload-list">
                ${a.map(r=>this._renderGroupAItem(r,e)).join("")}
              </div>
            </div>

            <div class="doc-group">
              <div class="doc-group-header doc-group-header--B">
                <span class="doc-group-label">กลุ่ม B — เอกสารองค์กร (โรงงานจัดทำ)</span>
                <span class="doc-group-progress">${l}/${o} บังคับ · อัปโหลดแล้ว ${c}/${s.length}</span>
              </div>
              <div class="doc-upload-list" id="doc-upload-list-B">
                ${s.map(r=>this._renderGroupBItem(r,e.checklistUploads)).join("")}
              </div>
            </div>

            <div class="doc-group doc-group--info">
              <div class="doc-group-header doc-group-header--CD">
                <span class="doc-group-label">กลุ่ม C & D — เอกสารจากผู้ตรวจประเมิน</span>
                <span class="doc-group-progress">${n.filter(r=>r.isChecked).length}/${n.length}</span>
              </div>
              <div class="doc-group-info-body">
                <p class="doc-group-info-text">
                  เอกสารส่วนนี้จะถูกอัปโหลดโดยผู้ตรวจประเมินหลังจากดำเนินการตรวจประเมินเสร็จสิ้น
                </p>
                <ul class="doc-group-info-list">
                  ${n.map(r=>`
                    <li class="${r.isChecked?"doc-info-item--done":""}">
                      ${r.isChecked?"✓":"○"}&nbsp;${r.itemLabel}
                      <span class="badge ${se[r.requiredLevel]||""}">${ae[r.requiredLevel]||""}</span>
                    </li>
                  `).join("")}
                </ul>
              </div>
            </div>

          </fieldset>
        </div>

        <div class="form-navigation">
          <button type="button" class="btn btn-secondary" id="btn-prev-4">← ย้อนกลับ</button>
          <button type="button" class="btn btn-primary" id="btn-next-4">ถัดไป →</button>
        </div>
      </div>
    `}_renderGroupAItem(e,t){const a=t.selfAssessment,s=t.saEvidenceUploads.length;if(e.itemNo===1)return`
        <div class="doc-upload-item doc-upload-item--auto">
          <div class="doc-upload-status-icon">✓</div>
          <div class="doc-upload-label">
            <div class="doc-upload-title">
              <span class="doc-upload-no">(${e.itemNo})</span>
              <span>${e.itemLabel}</span>
              <span class="badge badge--auto">ระบบสร้างอัตโนมัติ</span>
            </div>
          </div>
          <div class="doc-upload-action">
            <span class="doc-auto-note">สร้าง PDF ที่ขั้นตอนที่ 6</span>
          </div>
        </div>
      `;if(e.itemNo===2){const n=Object.keys(a).length>0,l=Object.keys(a).length;return`
        <div class="doc-upload-item ${n?"doc-upload-item--done":""}" id="doc-item-2">
          <div class="doc-upload-status-icon">${n?"✓":""}</div>
          <div class="doc-upload-label">
            <div class="doc-upload-title">
              <span class="doc-upload-no">(${e.itemNo})</span>
              <span>${e.itemLabel}</span>
              <span class="badge badge--auto">กรอกในขั้นตอนที่ 3</span>
            </div>
          </div>
          <div class="doc-upload-action">
            ${n?`<span class="sa-done-badge">กรอกแล้ว ${l} ข้อ ✓</span>`:'<button type="button" class="btn btn-sm btn-secondary" data-action="goto-step-3">← กลับไปขั้นตอน 3</button>'}
          </div>
        </div>
      `}return e.itemNo===6?`
        <div class="doc-upload-item ${s>0?"doc-upload-item--done":""}">
          <div class="doc-upload-status-icon">${s>0?"✓":""}</div>
          <div class="doc-upload-label">
            <div class="doc-upload-title">
              <span class="doc-upload-no">(${e.itemNo})</span>
              <span>${e.itemLabel}</span>
              <span class="badge badge--auto">อัปโหลดในขั้นตอนที่ 3</span>
            </div>
          </div>
          <div class="doc-upload-action">
            <span class="doc-auto-note">${s>0?`อัปโหลดแล้ว ${s} ไฟล์`:"ยังไม่มีไฟล์"}</span>
          </div>
        </div>
      `:""}_renderGroupBItem(e,t){const a=t.filter(l=>l.itemNo===e.itemNo),n=a.length>0||e.notApplicable;return`
      <div class="doc-upload-item ${n?"doc-upload-item--done":""} ${e.notApplicable?"doc-upload-item--na":""}"
           id="doc-item-${e.itemNo}">
        <div class="doc-upload-status-icon">${n?"✓":""}</div>
        <div class="doc-upload-label">
          <div class="doc-upload-title">
            <span class="doc-upload-no">(${e.itemNo})</span>
            <span>${e.itemLabel}</span>
            <span class="badge ${se[e.requiredLevel]||""}">${ae[e.requiredLevel]||""}</span>
          </div>
          ${a.length>0?`
            <ul class="doc-file-list">
              ${a.map(l=>`
                <li class="doc-file-entry">
                  <span class="doc-file-name" title="${l.fileName}">${this._truncate(l.fileName)}</span>
                  <button type="button" class="btn btn-xs btn-danger-outline"
                    data-action="remove-doc" data-item-no="${e.itemNo}" data-upload-id="${l.id}">ลบ</button>
                </li>
              `).join("")}
            </ul>
          `:""}
          ${e.notApplicable?'<span class="doc-na-badge">ไม่เกี่ยวข้อง (N/A)</span>':""}
        </div>
        <div class="doc-upload-action">
          ${e.notApplicable?`<button type="button" class="btn btn-sm btn-secondary"
                 data-action="unmark-na" data-item-no="${e.itemNo}">ยกเลิก N/A</button>`:`<label class="btn btn-sm btn-secondary doc-choose-label">
                 + เพิ่มไฟล์
                 <input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                   data-action="upload-doc" data-item-no="${e.itemNo}" style="display:none">
               </label>
               ${e.requiredLevel!=="required"?`
                 <button type="button" class="btn btn-sm btn-ghost"
                   data-action="mark-na" data-item-no="${e.itemNo}">N/A</button>
               `:""}`}
        </div>
      </div>
    `}_truncate(e,t=35){return e.length>t?e.slice(0,t-3)+"...":e}_refreshGroupB(){const e=document.getElementById("doc-upload-list-B");if(!e)return;const t=d.get("step3"),a=t.checklist.filter(s=>s.itemGroup==="B");e.innerHTML=a.map(s=>this._renderGroupBItem(s,t.checklistUploads)).join(""),this._bindDocList()}_renderAuditor(e,t,a){return`
      <div class="auditor-block" data-idx="${e}">
        <h5>${t}</h5>
        <div class="form-row cols-2">
          ${b({name:`aud_name_${e}`,label:"ชื่อ-นามสกุล",value:a.fullName||""})}
          ${b({name:`aud_org_${e}`,label:"หน่วยงาน",value:a.organization||""})}
        </div>
        <div class="form-row cols-2">
          ${b({name:`aud_phone_${e}`,label:"โทรศัพท์",value:a.phone||""})}
          ${b({name:`aud_email_${e}`,label:"E-mail",type:"email",value:a.email||""})}
        </div>
        <div class="form-field">
          <span class="form-label">ความเชี่ยวชาญ</span>
          <div class="checkbox-group">
            <label class="checkbox-option">
              <input type="checkbox" name="aud_env_${e}" ${a.expertiseEnvironment?"checked":""}> ด้านสิ่งแวดล้อม
            </label>
            <label class="checkbox-option">
              <input type="checkbox" name="aud_social_${e}" ${a.expertiseSocial?"checked":""}> ด้านสังคม
            </label>
            <label class="checkbox-option">
              <input type="checkbox" name="aud_eco_${e}" ${a.expertiseEcoEconomics?"checked":""}> ด้านเศรษฐนิเวศ
            </label>
          </div>
        </div>
      </div>
    `}mount(){var e,t;(e=document.getElementById("btn-prev-4"))==null||e.addEventListener("click",()=>this.router.navigateTo(3)),(t=document.getElementById("btn-next-4"))==null||t.addEventListener("click",()=>this.router.navigateTo(5)),this._bindInputs(),this._bindDocList()}_bindDocList(){var e;(e=document.querySelector('[data-action="goto-step-3"]'))==null||e.addEventListener("click",()=>{this.router.navigateTo(3)}),document.querySelectorAll('[data-action="upload-doc"]').forEach(t=>{t.addEventListener("change",async()=>{const a=t.files[0];if(!a)return;const s=parseInt(t.dataset.itemNo),n=d.get("applicationId"),l=document.getElementById(`doc-item-${s}`);if(l){const o=l.querySelector(".doc-upload-action");o&&o.insertAdjacentHTML("afterbegin",'<span class="doc-uploading">กำลังอัปโหลด...</span>')}try{const o=await h.uploadChecklistDoc(n,s,a),c=d.get("step3.checklistUploads");c.push({id:o.id,itemNo:s,fileName:o.fileName}),d.set("step3.checklistUploads",c),d.set("step3.checklist",d.get("step3.checklist").map(r=>r.itemNo===s?{...r,isChecked:!0}:r)),this._refreshGroupB()}catch(o){console.error("Upload failed",o),alert("อัปโหลดไม่สำเร็จ: "+o.message),this._refreshGroupB()}})}),document.querySelectorAll('[data-action="remove-doc"]').forEach(t=>{t.addEventListener("click",async()=>{const a=parseInt(t.dataset.itemNo),s=t.dataset.uploadId,n=d.get("applicationId");try{await h.deleteUpload(n,s);const l=d.get("step3.checklistUploads").filter(o=>o.id!==s);d.set("step3.checklistUploads",l),d.set("step3.checklist",d.get("step3.checklist").map(o=>o.itemNo===a?{...o,isChecked:l.some(c=>c.itemNo===a)}:o)),this._refreshGroupB()}catch(l){console.error("Delete failed",l),alert("ลบไฟล์ไม่สำเร็จ: "+l.message)}})}),document.querySelectorAll('[data-action="mark-na"]').forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.itemNo);d.set("step3.checklist",d.get("step3.checklist").map(s=>s.itemNo===a?{...s,notApplicable:!0,isChecked:!0}:s)),this._refreshGroupB()})}),document.querySelectorAll('[data-action="unmark-na"]').forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.itemNo),s=d.get("step3.checklistUploads").some(n=>n.itemNo===a);d.set("step3.checklist",d.get("step3.checklist").map(n=>n.itemNo===a?{...n,notApplicable:!1,isChecked:s}:n)),this._refreshGroupB()})})}_bindInputs(){const e=document.querySelector('[name="auditingOrgName"]');e&&e.addEventListener("input",()=>d.set("step3.auditingOrgName",e.value)),[0,1,2].forEach(t=>{const a=(s,n,l="text")=>{const o=document.querySelector(`[name="aud_${s}_${t}"]`);o&&o.addEventListener(l==="checkbox"?"change":"input",()=>{const c=[...d.get("step3.auditors")];c[t]={...c[t],[n]:l==="checkbox"?o.checked:o.value},d.set("step3.auditors",c)})};a("name","fullName"),a("org","organization"),a("phone","phone"),a("email","email"),a("env","expertiseEnvironment","checkbox"),a("social","expertiseSocial","checkbox"),a("eco","expertiseEcoEconomics","checkbox")})}validate(){return ke(d.get("step3"))}showErrors(){}unmount(){}}class Se{constructor(e){this.containerId=e,this.canvas=null,this.ctx=null,this.isDrawing=!1,this.lastX=0,this.lastY=0}mount(){const e=document.getElementById(this.containerId);if(!e)return;e.innerHTML=`
      <div class="signature-wrap">
        <p class="form-label">ลายเซ็น <span class="req-mark">*</span></p>
        <canvas id="sig-canvas" class="signature-canvas" width="500" height="120"></canvas>
        <div class="signature-actions">
          <button type="button" class="btn btn-sm btn-secondary" id="sig-clear">ลบลายเซ็น</button>
          <span class="signature-hint">วาดลายเซ็นในกล่องด้านบน</span>
        </div>
      </div>
    `,this.canvas=document.getElementById("sig-canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.strokeStyle="#1a1a1a",this.ctx.lineWidth=2,this.ctx.lineCap="round",this.ctx.lineJoin="round";const t=d.get("step4.signatureData");if(t){const a=new Image;a.onload=()=>this.ctx.drawImage(a,0,0),a.src=t}this._bindEvents()}_bindEvents(){const e=this.canvas,t=a=>{const s=e.getBoundingClientRect(),n=e.width/s.width,l=e.height/s.height,o=a.touches?a.touches[0].clientX:a.clientX,c=a.touches?a.touches[0].clientY:a.clientY;return{x:(o-s.left)*n,y:(c-s.top)*l}};e.addEventListener("mousedown",a=>{this.isDrawing=!0;const s=t(a);this.lastX=s.x,this.lastY=s.y}),e.addEventListener("mousemove",a=>{if(!this.isDrawing)return;const s=t(a);this.ctx.beginPath(),this.ctx.moveTo(this.lastX,this.lastY),this.ctx.lineTo(s.x,s.y),this.ctx.stroke(),this.lastX=s.x,this.lastY=s.y}),e.addEventListener("mouseup",()=>{this.isDrawing=!1,this._save()}),e.addEventListener("mouseleave",()=>{this.isDrawing=!1}),e.addEventListener("touchstart",a=>{a.preventDefault(),this.isDrawing=!0;const s=t(a);this.lastX=s.x,this.lastY=s.y},{passive:!1}),e.addEventListener("touchmove",a=>{if(a.preventDefault(),!this.isDrawing)return;const s=t(a);this.ctx.beginPath(),this.ctx.moveTo(this.lastX,this.lastY),this.ctx.lineTo(s.x,s.y),this.ctx.stroke(),this.lastX=s.x,this.lastY=s.y},{passive:!1}),e.addEventListener("touchend",()=>{this.isDrawing=!1,this._save()}),document.getElementById("sig-clear").addEventListener("click",()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),d.set("step4.signatureData",null)})}_save(){d.set("step4.signatureData",this.canvas.toDataURL("image/png"))}getData(){var e;return((e=this.canvas)==null?void 0:e.toDataURL("image/png"))||null}}function Ae(i){var t,a;const e={};return(t=i.coordName)!=null&&t.trim()||(e.coordName="กรุณากรอกชื่อผู้ประสานงาน"),(a=i.applicantName)!=null&&a.trim()||(e.applicantName="กรุณากรอกชื่อผู้สมัคร"),i.coordEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.coordEmail)&&(e.coordEmail="รูปแบบอีเมลไม่ถูกต้อง"),i.applicantEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.applicantEmail)&&(e.applicantEmail="รูปแบบอีเมลไม่ถูกต้อง"),{isValid:Object.keys(e).length===0,errors:e}}class Le{constructor({router:e,api:t}){this.router=e,this.api=t}render(){const e=d.get("step4");return`
      <div class="step-panel">
        <h2 class="step-title">ขั้นตอนที่ 5 — รอบประชุมและผู้ประสานงาน</h2>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>รอบการประชุมรับรอง</legend>
            <div class="form-row cols-2">
              ${b({name:"meetingRoundNo",label:"การประชุมครั้งที่",type:"number",value:e.meetingRoundNo})}
              ${b({name:"meetingDate",label:"วันที่",type:"date",value:e.meetingDate||""})}
            </div>
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ชื่อผู้ประสานงานและให้ข้อมูลเพิ่มเติม</legend>
            <div class="form-row cols-2">
              ${b({name:"coordName",label:"ชื่อ-นามสกุล",required:!0,value:e.coordName})}
              ${b({name:"coordPosition",label:"ตำแหน่ง",value:e.coordPosition})}
            </div>
            <div class="form-row cols-3">
              ${b({name:"coordPhone",label:"โทรศัพท์",value:e.coordPhone})}
              ${b({name:"coordExt",label:"ต่อ",value:e.coordExt})}
              ${b({name:"coordMobile",label:"โทรศัพท์ (มือถือ)",value:e.coordMobile})}
            </div>
            ${b({name:"coordEmail",label:"E-mail",type:"email",value:e.coordEmail})}
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ชื่อผู้สมัคร (กรรมการผู้จัดการ หรือผู้ได้รับมอบหมาย)</legend>
            <div class="form-row cols-2">
              ${b({name:"applicantName",label:"ชื่อ-นามสกุล",required:!0,value:e.applicantName})}
              ${b({name:"applicantPosition",label:"ตำแหน่ง",value:e.applicantPosition})}
            </div>
            <div class="form-row cols-3">
              ${b({name:"applicantPhone",label:"โทรศัพท์",value:e.applicantPhone})}
              ${b({name:"applicantExt",label:"ต่อ",value:e.applicantExt})}
              ${b({name:"applicantFax",label:"โทรสาร",value:e.applicantFax})}
            </div>
            <div class="form-row cols-2">
              ${b({name:"applicantMobile",label:"มือถือ",value:e.applicantMobile})}
              ${b({name:"applicantEmail",label:"E-mail",type:"email",value:e.applicantEmail})}
            </div>
          </fieldset>
        </div>

        <div class="form-card">
          <fieldset class="form-section">
            <legend>ลายเซ็นผู้สมัคร</legend>
            <div id="signature-pad-container"></div>
          </fieldset>
        </div>

        <div class="form-navigation">
          <button type="button" class="btn btn-secondary" id="btn-prev-5">← ย้อนกลับ</button>
          <button type="button" class="btn btn-primary" id="btn-next-5">ตรวจสอบและส่งออก →</button>
        </div>
      </div>
    `}mount(){var e,t;this.sigPad=new Se("signature-pad-container"),this.sigPad.mount(),(e=document.getElementById("btn-prev-5"))==null||e.addEventListener("click",()=>this.router.navigateTo(4)),(t=document.getElementById("btn-next-5"))==null||t.addEventListener("click",async()=>{const a=d.get("applicationId");a&&this.sigPad.getData()&&await this.api.uploadSignature(a,this.sigPad.getData()),this.router.navigateTo(6)}),this._bindInputs()}_bindInputs(){["meetingRoundNo","meetingDate","coordName","coordPosition","coordPhone","coordExt","coordMobile","coordEmail","applicantName","applicantPosition","applicantPhone","applicantExt","applicantFax","applicantMobile","applicantEmail"].forEach(t=>{const a=document.querySelector(`[name="${t}"]`);a&&(a.addEventListener("input",()=>d.set(`step4.${t}`,a.value)),a.addEventListener("change",()=>d.set(`step4.${t}`,a.value)))})}validate(){return Ae(d.get("step4"))}showErrors(e){Object.entries(e).forEach(([t,a])=>{const s=document.getElementById(`${t}-error`);s&&(s.textContent=a);const n=document.getElementById(t);n&&n.classList.add("error")})}unmount(){}}class Ce{constructor({router:e}){this.router=e}render(){const e=d.get("step1"),t=d.get("step2"),a=d.get("step3"),s=d.get("step4");return`
      <div class="step-panel">
        <h2 class="step-title">ขั้นตอนที่ 6 — ตรวจสอบข้อมูลและส่งออก PDF</h2>

        <div class="review-card">
          <div class="review-section">
            <h3>1. ข้อมูลบริษัท</h3>
            <div class="review-grid">
              <span class="review-label">ประเภท</span>
              <span class="review-value">${e.applicationType==="new_registration"?"ขึ้นทะเบียนครั้งแรก":"ต่ออายุใบรับรอง"}</span>
              <span class="review-label">ชื่อองค์กร</span>
              <span class="review-value">${e.organizationName||"—"}</span>
              <span class="review-label">เลขทะเบียนโรงงาน</span>
              <span class="review-value">${e.factoryRegistrationNo||"—"}</span>
              <span class="review-label">ที่อยู่โรงงาน</span>
              <span class="review-value">${[e.addrNo,e.addrMoo?"ม."+e.addrMoo:"",e.addrSoi?"ซ."+e.addrSoi:"",e.addrRoad,e.addrTambon,e.addrAmphoe,e.addrProvince,e.addrPostcode].filter(Boolean).join(" ")}</span>
              <span class="review-label">ประเภทอุตสาหกรรม</span>
              <span class="review-value">${e.industryType||"—"}</span>
            </div>
          </div>

          <div class="review-section">
            <h3>2. ข้อมูลองค์กร</h3>
            <div class="review-grid">
              <span class="review-label">พนักงานประจำ</span>
              <span class="review-value">${t.permanentEmployeeCount||"—"} คน</span>
              <span class="review-label">Outsource</span>
              <span class="review-value">${t.outsourceEmployeeCount||"—"} คน</span>
              <span class="review-label">ขนาดโรงงาน</span>
              <span class="review-value">${{small:"ขนาดย่อม",medium:"ขนาดกลาง",large:"ขนาดใหญ่"}[t.factorySize]||"—"}</span>
              <span class="review-label">วิธีประเมิน</span>
              <span class="review-value">${t.assessmentMethod==="self"?"ประเมินด้วยตนเอง":"ใช้ที่ปรึกษา"}</span>
            </div>
          </div>

          <div class="review-section">
            <h3>3. รายงานการตรวจประเมินตนเอง</h3>
            <div class="review-grid">
              <span class="review-label">สถานะ</span>
              <span class="review-value">${Object.keys(a.selfAssessment).length>0?"กรอกแบบประเมินแล้ว ✓":"ยังไม่ได้กรอก"}</span>
            </div>
          </div>

          <div class="review-section">
            <h3>4. ผู้ตรวจประเมิน</h3>
            <div class="review-grid">
              ${a.auditors.map((n,l)=>`
                <span class="review-label">${l===0?"หัวหน้า":`ผู้ตรวจ ${l}`}</span>
                <span class="review-value">${n.fullName||"—"} ${n.organization?"("+n.organization+")":""}</span>
              `).join("")}
              <span class="review-label">หน่วยงาน</span>
              <span class="review-value">${a.auditingOrgName||"—"}</span>
            </div>
            ${(()=>{const n=a.checklistUploads||[],l=a.checklist.filter(f=>f.itemGroup==="B"&&f.uploadType==="upload"),o=a.checklist.filter(f=>(f.itemGroup==="C"||f.itemGroup==="D")&&f.uploadType==="upload"),c=Object.values(a.selfAssessment||{}).filter(f=>f&&(f.hasItem!==null||f.score!=null&&f.score!=="")).length,r=(a.saEvidenceUploads||[]).length,p=new Set(n.filter(f=>o.some(u=>u.itemNo===f.itemNo)).map(f=>f.itemNo)).size,m=o.filter(f=>f.requiredLevel==="required").length,v=l.map(f=>{const u=n.some(q=>q.itemNo===f.itemNo),w=f.notApplicable,x=u?"✓":w?"—":"○",$=u?"tag-doc-ok":w?"tag-doc-na":f.requiredLevel==="required"?"tag-doc-miss":"tag-doc-opt",_=f.requiredLevel!=="required"?" (แนะนำ)":"";return`<span class="tag-doc ${$}">${x} ${f.itemLabel}${_}</span>`}).join(""),g=l.filter(f=>f.requiredLevel==="required"&&!n.some(u=>u.itemNo===f.itemNo)&&!f.notApplicable);return`
                <div class="doc-status-summary">
                  <p class="review-sub-label">สรุปสถานะเอกสารประกอบการสมัคร</p>

                  <div class="doc-group-row">
                    <span class="doc-group-label lbl-a">ก A</span>
                    <div class="doc-group-content">
                      <span class="doc-group-title">เอกสารที่ระบบสร้างอัตโนมัติ</span>
                      <div class="doc-tags">
                        <span class="tag-doc tag-doc-auto">✓ ใบสมัครขอขึ้นทะเบียน Eco Factory (ระบบสร้าง)</span>
                        <span class="tag-doc ${c>0?"tag-doc-ok":"tag-doc-miss"}">
                          ${c>0?"✓":"○"} รายงานการตรวจประเมินตนเอง (${c} หัวข้อ)
                        </span>
                        <span class="tag-doc ${r>0?"tag-doc-ok":"tag-doc-opt"}">
                          ${r>0?"✓":"○"} หลักฐานประกอบการประเมินตนเอง (${r} ไฟล์)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="doc-group-row">
                    <span class="doc-group-label lbl-b">ก B</span>
                    <div class="doc-group-content">
                      <span class="doc-group-title">เอกสารองค์กร (โรงงานจัดทำ)</span>
                      <div class="doc-tags">${v}</div>
                      ${g.length>0?`<p class="doc-warn-note">⚠ ยังขาดเอกสารบังคับ: ${g.map(f=>f.itemLabel).join(", ")}</p>`:""}
                    </div>
                  </div>

                  <div class="doc-group-row">
                    <span class="doc-group-label lbl-cd">ก C&D</span>
                    <div class="doc-group-content">
                      <span class="doc-group-title">เอกสารจากผู้ตรวจประเมิน</span>
                      <p class="doc-auditor-note">
                        ℹ เอกสารเหล่านี้จะถูกอัปโหลดโดยผู้ตรวจประเมินหลังจากดำเนินการตรวจประเมินเสร็จสิ้น
                        (${p}/${m} รายการ)
                      </p>
                    </div>
                  </div>
                </div>
              `})()}
          </div>

          <div class="review-section">
            <h3>5. ผู้ประสานงานและรอบประชุม</h3>
            <div class="review-grid">
              <span class="review-label">ผู้ประสานงาน</span>
              <span class="review-value">${s.coordName||"—"}</span>
              <span class="review-label">โทรศัพท์</span>
              <span class="review-value">${s.coordPhone||"—"}</span>
              <span class="review-label">ผู้สมัคร</span>
              <span class="review-value">${s.applicantName||"—"}</span>
              <span class="review-label">รอบประชุม</span>
              <span class="review-value">ครั้งที่ ${s.meetingRoundNo||"—"} วันที่ ${s.meetingDate||"—"}</span>
            </div>
            ${s.signatureData?`<div class="sig-preview"><p class="review-label">ลายเซ็น:</p><img src="${s.signatureData}" alt="ลายเซ็น" class="sig-img"></div>`:""}
          </div>
        </div>

        <div class="export-actions">
          <button type="button" class="btn btn-secondary" id="btn-prev-6">← ย้อนกลับ</button>
          <button type="button" class="btn btn-export" id="btn-submit-pdf">
            📄 ยืนยันและดาวน์โหลด PDF
          </button>
        </div>
      </div>
    `}mount(){var e,t;(e=document.getElementById("btn-prev-6"))==null||e.addEventListener("click",()=>this.router.navigateTo(5)),(t=document.getElementById("btn-submit-pdf"))==null||t.addEventListener("click",async()=>{const a=d.get("applicationId");if(!a)return alert("ไม่พบรหัสใบสมัคร กรุณากรอกข้อมูลใหม่");const s=document.getElementById("btn-submit-pdf");s.disabled=!0,s.textContent="กำลังสร้าง PDF...";try{await h.submitApplication(a),await h.downloadPDF(a)}catch(n){alert("เกิดข้อผิดพลาด: "+n.message)}finally{s.disabled=!1,s.textContent="📄 ยืนยันและดาวน์โหลด PDF"}})}unmount(){}}const ne=[{no:1,label:"ข้อมูลบริษัท"},{no:2,label:"ข้อมูลองค์กร"},{no:3,label:"ประเมินตนเอง"},{no:4,label:"ผู้ตรวจประเมิน"},{no:5,label:"ผู้ประสานงาน"},{no:6,label:"ตรวจสอบ & ส่งออก"}];function Be(i){return`
    <nav class="progress-bar" aria-label="ขั้นตอนการกรอกแบบฟอร์ม">
      ${ne.map((e,t)=>`
        <div class="progress-step ${e.no===i?"active":""} ${e.no<i?"completed":""}">
          <div class="step-bubble">${e.no<i?"✓":e.no}</div>
          <span class="step-label">${e.label}</span>
        </div>
        ${t<ne.length-1?'<div class="progress-connector"></div>':""}
      `).join("")}
    </nav>
  `}class Ne{constructor({router:e}){this.router=e,this._turnstileEnabled=!1,this._turnstileWidgetId=void 0}render(){return`
      <div class="auth-page">
        <div class="auth-card form-card">
          <div class="auth-logo">🏭</div>
          <h2 class="auth-title">เข้าสู่ระบบ</h2>
          <p class="auth-subtitle">ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</p>

          <div id="login-error" class="alert alert-error" style="display:none"></div>
          <div id="login-verify-box" style="display:none;background:#fff8e1;border:1px solid #f5c518;border-radius:6px;padding:14px 16px;margin-bottom:12px;font-size:14px;line-height:1.6">
            <strong>ยังไม่ได้ยืนยันอีเมล</strong><br>
            กรุณาตรวจสอบกล่องจดหมายของคุณ หรือ
            <button id="resend-verify-btn" class="auth-link" style="background:none;border:none;cursor:pointer;padding:0;font-size:14px;text-decoration:underline;color:var(--primary)">
              ส่งลิงก์ยืนยันอีกครั้ง
            </button>
            <span id="resend-verify-msg" style="display:none;margin-left:6px;color:#1a6b3a;font-size:13px"></span>
          </div>
          <div id="login-inactive-box" style="display:none;background:#fff3f3;border:1px solid #e57373;border-radius:6px;padding:14px 16px;margin-bottom:12px;font-size:14px;line-height:1.6">
            <strong>บัญชียังไม่ได้รับการอนุมัติ</strong><br>
            กรุณารอผู้ดูแลระบบอนุมัติบัญชีของคุณก่อนเข้าสู่ระบบ
          </div>

          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">อีเมล</label>
              <input type="email" id="login-email" class="form-input" placeholder="example@email.com" autocomplete="email" required />
            </div>
            <div class="form-group">
              <label class="form-label">รหัสผ่าน</label>
              <div style="position:relative">
                <input type="password" id="login-password" class="form-input" placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร" autocomplete="current-password" required style="padding-right:40px" />
                <button type="button" id="toggle-password" aria-label="แสดง/ซ่อนรหัสผ่าน" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0;color:var(--color-text-muted);line-height:1">
                  <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <div id="turnstile-login-widget" style="margin-bottom:12px;width:100%"></div>

            <button type="submit" class="btn btn-primary btn-full" id="login-btn">
              เข้าสู่ระบบ
            </button>
          </form>

          <div id="google-auth-section" style="display:none">
            <div class="auth-divider"><span>หรือ</span></div>
            <button type="button" id="google-login-btn" class="btn-google">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              <span>เข้าสู่ระบบด้วย Google</span>
            </button>
          </div>

          <div id="line-auth-section" style="display:none">
            <div class="auth-divider"><span>หรือ</span></div>
            <button type="button" id="line-login-btn" class="btn-line">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              <span>เข้าสู่ระบบด้วย LINE</span>
            </button>
          </div>

          <p class="auth-footer">
            <a href="#forgot-password" class="auth-link">ลืมรหัสผ่าน?</a>
          </p>
          <p class="auth-footer">
            ยังไม่มีบัญชี?
            <a href="#register" class="auth-link">สมัครสมาชิก</a>
          </p>
        </div>
      </div>
    `}mount(){if(document.getElementById("login-form").addEventListener("submit",s=>{s.preventDefault(),this._handleLogin()}),document.getElementById("resend-verify-btn").addEventListener("click",()=>this._resendVerification()),document.getElementById("toggle-password").addEventListener("click",()=>{const s=document.getElementById("login-password"),n=s.type==="password";s.type=n?"text":"password",document.getElementById("eye-icon").innerHTML=n?'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>':'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'}),new URLSearchParams(window.location.hash.split("?")[1]||"").get("error")){const s=document.getElementById("login-error");s.textContent="การเข้าสู่ระบบด้วย Social Login ไม่สำเร็จ กรุณาลองใหม่",s.style.display="block"}h.getConfig().then(s=>{var n,l;this._turnstileEnabled=s.turnstileEnabled,s.turnstileEnabled&&s.turnstileSiteKey&&window.whenTurnstileReady(()=>{document.getElementById("turnstile-login-widget")&&(this._turnstileWidgetId=window.turnstile.render("#turnstile-login-widget",{sitekey:s.turnstileSiteKey,size:"flexible"}))}),s.googleEnabled&&(document.getElementById("google-auth-section").style.display=""),(n=document.getElementById("google-login-btn"))==null||n.addEventListener("click",()=>{window.location.href="/api/v1/auth/google"}),s.lineEnabled&&(document.getElementById("line-auth-section").style.display=""),(l=document.getElementById("line-login-btn"))==null||l.addEventListener("click",()=>{window.location.href="/api/v1/auth/line"})}).catch(()=>{})}async _resendVerification(){const e=document.getElementById("login-email").value.trim(),t=document.getElementById("resend-verify-msg"),a=document.getElementById("resend-verify-btn");if(e){a.disabled=!0;try{await h.resendVerification(e),t.textContent="ส่งแล้ว!",t.style.display="inline"}catch{t.textContent="ส่งไม่สำเร็จ",t.style.display="inline",a.disabled=!1}}}async _handleLogin(){const e=document.getElementById("login-email").value.trim(),t=document.getElementById("login-password").value,a=document.getElementById("login-btn"),s=document.getElementById("login-error");s.style.display="none";const n=this._turnstileEnabled&&window.turnstile?window.turnstile.getResponse(this._turnstileWidgetId):"";if(this._turnstileEnabled&&!n){s.textContent="กรุณายืนยันว่าคุณไม่ใช่โรบอท",s.style.display="block";return}a.disabled=!0,a.textContent="กำลังเข้าสู่ระบบ...";try{const l=await h.login(e,t,n);d.set("auth.userId",l.user.id),d.set("auth.email",l.user.email),d.set("auth.fullName",l.user.fullName),d.set("auth.role",l.user.role),d.set("auth.token",l.token),l.user.role==="admin"?window.location.hash="#admin":(window.location.hash="#dashboard",window.location.reload())}catch(l){const o=l.message.replace(/^\d+: /,"");let c="",r=o;try{const v=JSON.parse(o);c=v.code||"",r=v.message||o}catch{}const p=document.getElementById("login-verify-box"),m=document.getElementById("login-inactive-box");p.style.display="none",m.style.display="none",s.style.display="none",c==="EMAIL_NOT_VERIFIED"?p.style.display="block":c==="ACCOUNT_INACTIVE"?m.style.display="block":(s.textContent=r||"เข้าสู่ระบบไม่สำเร็จ",s.style.display="block"),a.disabled=!1,a.textContent="เข้าสู่ระบบ",window.turnstile&&this._turnstileWidgetId!==void 0&&window.turnstile.reset(this._turnstileWidgetId)}}unmount(){window.turnstile&&this._turnstileWidgetId!==void 0&&window.turnstile.remove(this._turnstileWidgetId)}}class Te{constructor({router:e}){this.router=e}render(){return`
      <div class="auth-page">
        <div class="auth-card form-card">
          <div class="auth-logo">🏭</div>
          <h2 class="auth-title">สมัครสมาชิก</h2>
          <p class="auth-subtitle">ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</p>

          <div id="reg-error" class="alert alert-error" style="display:none"></div>

          <form id="reg-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">ประเภทผู้ใช้งาน <span class="required">*</span></label>
              <select id="reg-role" class="form-input form-select">
                <option value="factory">โรงงาน (ผู้ขอรับรอง)</option>
                <option value="auditor">ผู้ตรวจประเมิน (Auditor)</option>
              </select>
            </div>

            <!-- ── ฟิลด์ร่วมทุก Role ── -->
            <div class="form-group">
              <label class="form-label">ชื่อ-นามสกุล <span class="required">*</span></label>
              <input type="text" id="reg-name" class="form-input" placeholder="ชื่อ-นามสกุล" required />
            </div>
            <div class="form-group">
              <label class="form-label">หน่วยงาน / บริษัท <span class="required">*</span></label>
              <input type="text" id="reg-organization" class="form-input" placeholder="ชื่อหน่วยงานหรือบริษัท" required />
            </div>
            <div class="form-group">
              <label class="form-label">เบอร์โทรศัพท์</label>
              <input type="tel" id="reg-phone" class="form-input" placeholder="0X-XXXX-XXXX" />
            </div>
            <div class="form-group">
              <label class="form-label">อีเมล <span class="required">*</span></label>
              <input type="email" id="reg-email" class="form-input" placeholder="example@email.com" required />
            </div>

            <!-- ── ฟิลด์เฉพาะ Factory ── -->
            <div id="factory-fields">
              <div class="form-group">
                <label class="form-label">ตำแหน่ง</label>
                <input type="text" id="reg-position" class="form-input" placeholder="ตำแหน่งในองค์กร" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">หมายเลขภายใน</label>
                  <input type="text" id="reg-ext" class="form-input" placeholder="ต่อ XXXX" />
                </div>
                <div class="form-group">
                  <label class="form-label">โทรสาร (Fax)</label>
                  <input type="tel" id="reg-fax" class="form-input" placeholder="0X-XXXX-XXXX" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">เบอร์มือถือ</label>
                <input type="tel" id="reg-mobile" class="form-input" placeholder="08X-XXX-XXXX" />
              </div>
            </div>

            <!-- ── ฟิลด์เฉพาะ Auditor ── -->
            <div id="auditor-fields" style="display:none">
              <div class="form-group">
                <label class="form-label">วุฒิการศึกษา</label>
                <input type="text" id="reg-education" class="form-input" placeholder="เช่น ปริญญาโท วิศวกรรมสิ่งแวดล้อม" />
              </div>
              <div class="form-group">
                <label class="form-label">ใบ Certificate ผู้ตรวจประเมิน</label>
                <input type="file" id="reg-certificate" class="form-input"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                <small class="form-hint">รองรับไฟล์ PDF, JPG, PNG, DOC (อัปโหลดได้ภายหลัง)</small>
              </div>
            </div>

            <!-- ── รหัสผ่าน ── -->
            <div class="form-group">
              <label class="form-label">รหัสผ่าน <span class="required">*</span></label>
              <input type="password" id="reg-password" class="form-input" placeholder="อย่างน้อย 6 ตัวอักษร" required />
            </div>
            <div class="form-group">
              <label class="form-label">ยืนยันรหัสผ่าน <span class="required">*</span></label>
              <input type="password" id="reg-confirm-password" class="form-input" placeholder="กรอกรหัสผ่านอีกครั้ง" required />
            </div>

            <div id="turnstile-widget" style="margin-bottom:12px;width:100%"></div>

            <button type="submit" class="btn btn-primary btn-full" id="reg-btn">
              สมัครสมาชิก
            </button>
          </form>

          <div id="google-reg-section" style="display:none">
            <div class="auth-divider"><span>หรือ</span></div>
            <button type="button" id="google-reg-btn" class="btn-google">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              <span>สมัครสมาชิกด้วย Google</span>
            </button>
          </div>

          <div id="line-reg-section" style="display:none">
            <div class="auth-divider"><span>หรือ</span></div>
            <button type="button" id="line-reg-btn" class="btn-line">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              <span>สมัครสมาชิกด้วย LINE</span>
            </button>
          </div>

          <p class="auth-footer">
            มีบัญชีแล้ว?
            <a href="#login" class="auth-link">เข้าสู่ระบบ</a>
          </p>
        </div>
      </div>
    `}mount(){const e=document.getElementById("reg-form"),t=document.getElementById("reg-role");t.addEventListener("change",()=>this._toggleRoleFields(t.value)),e.addEventListener("submit",a=>{a.preventDefault(),this._handleRegister()}),h.getConfig().then(a=>{var s,n;this._turnstileEnabled=a.turnstileEnabled,a.turnstileEnabled&&a.turnstileSiteKey&&window.whenTurnstileReady(()=>{document.getElementById("turnstile-widget")&&(this._turnstileWidgetId=window.turnstile.render("#turnstile-widget",{sitekey:a.turnstileSiteKey,size:"flexible"}))}),a.googleEnabled&&(document.getElementById("google-reg-section").style.display=""),(s=document.getElementById("google-reg-btn"))==null||s.addEventListener("click",()=>{window.location.href="/api/v1/auth/google"}),a.lineEnabled&&(document.getElementById("line-reg-section").style.display=""),(n=document.getElementById("line-reg-btn"))==null||n.addEventListener("click",()=>{window.location.href="/api/v1/auth/line"})}).catch(()=>{})}_toggleRoleFields(e){document.getElementById("factory-fields").style.display=e==="factory"?"":"none",document.getElementById("auditor-fields").style.display=e==="auditor"?"":"none"}async _handleRegister(){const e=document.getElementById("reg-role").value,t=document.getElementById("reg-name").value.trim(),a=document.getElementById("reg-organization").value.trim(),s=document.getElementById("reg-phone").value.trim(),n=document.getElementById("reg-email").value.trim(),l=document.getElementById("reg-password").value,o=document.getElementById("reg-confirm-password").value,c=document.getElementById("reg-btn"),r=document.getElementById("reg-error");if(r.style.display="none",!t){r.textContent="กรุณากรอกชื่อ-นามสกุล",r.style.display="block";return}if(!a){r.textContent="กรุณากรอกชื่อหน่วยงาน",r.style.display="block";return}if(!n||!l){r.textContent="กรุณากรอกอีเมลและรหัสผ่าน",r.style.display="block";return}if(l.length<6){r.textContent="รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",r.style.display="block";return}if(l!==o){r.textContent="รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่",r.style.display="block",document.getElementById("reg-confirm-password").focus();return}const p=this._turnstileEnabled&&window.turnstile?window.turnstile.getResponse(this._turnstileWidgetId):"";if(this._turnstileEnabled&&!p){r.textContent="กรุณายืนยันว่าคุณไม่ใช่โรบอท",r.style.display="block";return}const m={email:n,password:l,fullName:t,role:e,organization:a,phone:s,turnstileToken:p};e==="factory"?(m.position=document.getElementById("reg-position").value.trim(),m.extNumber=document.getElementById("reg-ext").value.trim(),m.fax=document.getElementById("reg-fax").value.trim(),m.mobile=document.getElementById("reg-mobile").value.trim()):m.education=document.getElementById("reg-education").value.trim(),c.disabled=!0,c.textContent="กำลังสมัครสมาชิก...";try{const v=await h.register(m);if(v.token){d.set("auth.userId",v.user.id),d.set("auth.email",v.user.email),d.set("auth.fullName",v.user.fullName),d.set("auth.role",v.user.role),d.set("auth.token",v.token),window.location.hash="#dashboard",window.location.reload();return}if(v.message==="pending_approval"){const f=document.querySelector(".auth-card");f.innerHTML=`
          <div class="auth-logo">⏳</div>
          <h2 class="auth-title">รอการอนุมัติ</h2>
          <p class="auth-subtitle" style="margin-bottom:16px">
            บัญชีของคุณถูกสร้างแล้ว<br>กรุณารอการอนุมัติจากผู้ดูแลระบบ
          </p>
          <p style="font-size:14px;color:#666;line-height:1.6;margin-bottom:24px">
            เมื่อผู้ดูแลระบบอนุมัติบัญชีของคุณแล้ว คุณจะสามารถเข้าสู่ระบบได้
          </p>
          <a href="#login" class="btn btn-primary btn-full" style="display:inline-block;text-align:center">
            กลับไปหน้าเข้าสู่ระบบ
          </a>
        `;return}const g=document.querySelector(".auth-card");g.innerHTML=`
        <div class="auth-logo">📧</div>
        <h2 class="auth-title">ตรวจสอบอีเมลของคุณ</h2>
        <p class="auth-subtitle" style="margin-bottom:16px">
          เราได้ส่งลิงก์ยืนยันไปที่<br>
          <strong>${v.email||m.email}</strong>
        </p>
        <p style="font-size:14px;color:#666;line-height:1.6;margin-bottom:24px">
          กรุณาคลิกลิงก์ในอีเมลเพื่อเปิดใช้งานบัญชีของคุณ<br>
          ลิงก์จะหมดอายุภายใน 24 ชั่วโมง
        </p>
        <div id="resend-msg" style="display:none;margin-bottom:12px"></div>
        <button id="resend-btn" class="btn btn-secondary btn-full" style="margin-bottom:12px">
          ส่งอีเมลยืนยันอีกครั้ง
        </button>
        <a href="#login" class="btn btn-primary btn-full" style="display:inline-block;text-align:center">
          กลับไปหน้าเข้าสู่ระบบ
        </a>
      `,document.getElementById("resend-btn").addEventListener("click",async()=>{const f=document.getElementById("resend-btn"),u=document.getElementById("resend-msg");f.disabled=!0,f.textContent="กำลังส่ง...";try{await h.resendVerification(v.email||m.email),u.textContent="ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบกล่องจดหมาย",u.className="alert alert-success",u.style.display="block"}catch{u.textContent="ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่",u.className="alert alert-error",u.style.display="block",f.disabled=!1,f.textContent="ส่งอีเมลยืนยันอีกครั้ง"}})}catch(v){const g=v.message.replace(/^\d+: /,"");r.textContent=g||"สมัครสมาชิกไม่สำเร็จ",r.style.display="block",c.disabled=!1,c.textContent="สมัครสมาชิก",window.turnstile&&this._turnstileWidgetId!==void 0&&window.turnstile.reset(this._turnstileWidgetId)}}unmount(){window.turnstile&&this._turnstileWidgetId!==void 0&&window.turnstile.remove(this._turnstileWidgetId)}}const ie={draft:"ร่าง",submitted:"ส่งแล้ว",under_review:"กำลังตรวจสอบ",approved:"อนุมัติ",rejected:"ปฏิเสธ"},le={draft:"badge-gray",submitted:"badge-blue",under_review:"badge-yellow",approved:"badge-green",rejected:"badge-red"},Pe={factory:"โรงงาน",admin:"แอดมิน",auditor:"ผู้ตรวจสอบ"},Me={draft:"ร่างงาน",submitted:"ส่งแล้ว",under_review:"กำลังตรวจ",approved:"อนุมัติแล้ว"},Re={silver:"Silver",gold:"Gold",platinum:"Platinum"};class qe{constructor({router:e}){this.router=e,this._tab="applications",this._apps=[],this._users=[],this._auditors=[],this._waItems=[]}render(){const e=d.get("auth");return`
      <div class="admin-layout">
        <div class="admin-header">
          <div class="admin-header-left">
            <span class="admin-title">แผงควบคุมผู้ดูแลระบบ</span>
          </div>
          <div class="admin-header-right">
            <span class="admin-user-info">${(e==null?void 0:e.fullName)||(e==null?void 0:e.email)||""}</span>
            <button class="btn btn-secondary btn-sm" id="admin-logout-btn">ออกจากระบบ</button>
          </div>
        </div>

        <div class="admin-tabs">
          <button class="admin-tab ${this._tab==="applications"?"active":""}" data-tab="applications">
            Eco Factory
          </button>
          <button class="admin-tab ${this._tab==="waste-award"?"active":""}" data-tab="waste-award">
            🏆 ABWM ตรวจประเมิน
          </button>
          <button class="admin-tab ${this._tab==="users"?"active":""}" data-tab="users">
            จัดการผู้ใช้งาน
          </button>
        </div>

        <div class="admin-content" id="admin-content">
          ${this._tab==="applications"?this._renderApplicationsTab():this._tab==="waste-award"?this._renderWasteAwardTab():this._renderUsersTab()}
        </div>
      </div>
    `}_renderApplicationsTab(){return this._apps.length===0?'<div class="empty-state">ยังไม่มีใบสมัคร</div>':`
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ชื่อองค์กร</th>
              <th>สถานะ</th>
              <th>ประเภท</th>
              <th>เจ้าของ</th>
              <th>ผู้ตรวจสอบ</th>
              <th>วันที่ส่ง</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>${this._apps.map(t=>`
      <tr>
        <td class="td-org">${t.organizationName||'<span class="text-muted">-</span>'}</td>
        <td><span class="badge ${le[t.status]||"badge-gray"}">${ie[t.status]||t.status}</span></td>
        <td>${t.applicationType==="new_registration"?"ขึ้นทะเบียนใหม่":"ต่ออายุ"}</td>
        <td class="td-email">${t.userEmail||'<span class="text-muted">-</span>'}</td>
        <td class="td-email">${t.auditorEmail||'<span class="text-muted">-</span>'}</td>
        <td>${t.submittedAt?t.submittedAt.substring(0,10):'<span class="text-muted">-</span>'}</td>
        <td class="td-actions">
          <select class="form-input form-select status-select" data-id="${t.id}" style="min-width:120px">
            ${Object.entries(ie).map(([a,s])=>`<option value="${a}" ${t.status===a?"selected":""}>${s}</option>`).join("")}
          </select>
          <select class="form-input form-select auditor-select" data-id="${t.id}" style="min-width:140px">
            <option value="">ไม่มีผู้ตรวจ</option>
            ${this._auditors.map(a=>`<option value="${a.id}" ${t.auditorEmail===a.email?"selected":""}>${a.fullName||a.email}</option>`).join("")}
          </select>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    `}_renderWasteAwardTab(){return this._waItems.length?`
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ชื่อโรงงาน</th>
              <th>ระดับ</th>
              <th>สถานะ</th>
              <th>ผู้สร้าง</th>
              <th>วันที่สร้าง</th>
              <th>หัวหน้าคณะผู้ตรวจ</th>
            </tr>
          </thead>
          <tbody>${this._waItems.map(t=>`
      <tr>
        <td>
          <a href="#waste-award/${t.id}" style="color:var(--color-primary); text-decoration:none; font-weight:600">
            ${t.factoryName}
          </a>
        </td>
        <td>${Re[t.certificationLevel]||t.certificationLevel}</td>
        <td><span class="badge ${le[t.status]||"badge-gray"}">${Me[t.status]||t.status}</span></td>
        <td class="td-email">${t.factoryEmail||'<span class="text-muted">-</span>'}</td>
        <td>${t.createdAt?t.createdAt.substring(0,10):""}</td>
        <td class="td-actions">
          <select class="form-input form-select wa-auditor-select" data-id="${t.id}" style="min-width:160px">
            <option value="">— ไม่มีหัวหน้าคณะ —</option>
            ${this._auditors.map(a=>`<option value="${a.id}" ${t.assignedAuditorId===a.id?"selected":""}>${a.fullName||a.email}</option>`).join("")}
          </select>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    `:'<div class="empty-state">ยังไม่มีรายการประเมิน ABWM</div>'}_renderUsersTab(){return`
      <div class="admin-users-header">
        <button class="btn btn-primary btn-sm" id="create-user-btn">+ เพิ่มผู้ใช้งาน</button>
      </div>

      <div id="create-user-form" style="display:none" class="form-card" style="margin-bottom:16px">
        <h3 style="margin-bottom:12px">เพิ่มผู้ใช้งานใหม่</h3>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">อีเมล *</label>
            <input type="email" id="new-user-email" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">รหัสผ่าน *</label>
            <input type="password" id="new-user-password" class="form-input" placeholder="อย่างน้อย 6 ตัวอักษร" />
          </div>
          <div class="form-group">
            <label class="form-label">ชื่อ-นามสกุล</label>
            <input type="text" id="new-user-name" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Role</label>
            <select id="new-user-role" class="form-input form-select">
              <option value="factory">โรงงาน</option>
              <option value="admin">แอดมิน</option>
              <option value="auditor">ผู้ตรวจสอบ</option>
            </select>
          </div>
        </div>
        <div id="create-user-error" class="alert alert-error" style="display:none"></div>
        <div style="display:flex; gap:8px; margin-top:8px">
          <button class="btn btn-primary btn-sm" id="save-user-btn">บันทึก</button>
          <button class="btn btn-secondary btn-sm" id="cancel-user-btn">ยกเลิก</button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>อีเมล</th>
              <th>ชื่อ</th>
              <th>Role</th>
              <th>สถานะ</th>
              <th>สร้างเมื่อ</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            ${this._users.map(e=>`
              <tr>
                <td>${e.email}</td>
                <td>${e.fullName||'<span class="text-muted">-</span>'}</td>
                <td><span class="badge badge-blue">${Pe[e.role]||e.role}</span></td>
                <td>
                  <span class="badge ${e.isActive?"badge-green":"badge-yellow"}">
                    ${e.isActive?"ใช้งานได้":"รอการอนุมัติ"}
                  </span>
                </td>
                <td>${e.createdAt?e.createdAt.substring(0,10):""}</td>
                <td class="td-actions">
                  <button class="btn ${e.isActive?"btn-secondary":"btn-primary"} btn-xs toggle-user-btn"
                    data-id="${e.id}" data-active="${e.isActive}">
                    ${e.isActive?"ระงับ":"อนุมัติ"}
                  </button>
                  <button class="btn btn-danger btn-xs delete-user-btn" data-id="${e.id}" data-email="${e.email}">
                    ลบ
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `}mount(){this._bindLogout(),this._bindTabs(),this._loadData()}_bindLogout(){var e;(e=document.getElementById("admin-logout-btn"))==null||e.addEventListener("click",()=>{localStorage.removeItem("eco_auth_token"),localStorage.removeItem("eco_application_id"),window.location.hash="#login",window.location.reload()})}_bindTabs(){document.querySelectorAll(".admin-tab").forEach(e=>{e.addEventListener("click",()=>{this._tab=e.dataset.tab,this._rerender()})})}async _loadData(){try{const[e,t,a]=await Promise.all([h.adminListApplications(),h.adminListUsers(),h.adminListWasteAward()]);this._apps=e,this._users=t,this._auditors=t.filter(s=>s.role==="auditor"||s.role==="admin"),this._waItems=a,this._rerender()}catch(e){console.error("Admin load error:",e)}}_rerender(){const e=document.getElementById("admin-content");e&&(e.innerHTML=this._tab==="applications"?this._renderApplicationsTab():this._tab==="waste-award"?this._renderWasteAwardTab():this._renderUsersTab(),this._bindContentEvents()),document.querySelectorAll(".admin-tab").forEach(t=>{t.classList.toggle("active",t.dataset.tab===this._tab)})}_bindContentEvents(){var e,t,a;this._tab==="applications"&&(document.querySelectorAll(".status-select").forEach(s=>{s.addEventListener("change",async n=>{const l=n.target.dataset.id,o=n.target.value;try{await h.adminUpdateApplicationStatus(l,o);const c=this._apps.find(r=>r.id===l);c&&(c.status=o),this._rerender()}catch(c){alert("เปลี่ยนสถานะไม่สำเร็จ: "+c.message)}})}),document.querySelectorAll(".auditor-select").forEach(s=>{s.addEventListener("change",async n=>{const l=n.target.dataset.id,o=n.target.value;try{await h.adminAssignAuditor(l,o);const c=this._apps.find(p=>p.id===l),r=this._auditors.find(p=>p.id===o);c&&(c.auditorEmail=(r==null?void 0:r.email)||"",c.auditorFullName=(r==null?void 0:r.fullName)||"")}catch(c){alert("มอบหมายผู้ตรวจสอบไม่สำเร็จ: "+c.message)}})})),this._tab==="waste-award"&&document.querySelectorAll(".wa-auditor-select").forEach(s=>{s.addEventListener("change",async n=>{const l=n.target.dataset.id,o=n.target.value;try{await h.adminAssignWasteAuditor(l,o);const c=this._waItems.find(r=>r.id===l);if(c){c.assignedAuditorId=o;const r=this._auditors.find(p=>p.id===o);c.auditorEmail=(r==null?void 0:r.email)||"",c.auditorFullName=(r==null?void 0:r.fullName)||""}}catch(c){alert("มอบหมายหัวหน้าคณะผู้ตรวจไม่สำเร็จ: "+c.message)}})}),this._tab==="users"&&((e=document.getElementById("create-user-btn"))==null||e.addEventListener("click",()=>{document.getElementById("create-user-form").style.display="block",document.getElementById("create-user-btn").style.display="none"}),(t=document.getElementById("cancel-user-btn"))==null||t.addEventListener("click",()=>{document.getElementById("create-user-form").style.display="none",document.getElementById("create-user-btn").style.display=""}),(a=document.getElementById("save-user-btn"))==null||a.addEventListener("click",async()=>{const s=document.getElementById("new-user-email").value.trim(),n=document.getElementById("new-user-password").value,l=document.getElementById("new-user-name").value.trim(),o=document.getElementById("new-user-role").value,c=document.getElementById("create-user-error");if(c.style.display="none",!s||!n){c.textContent="กรุณากรอกอีเมลและรหัสผ่าน",c.style.display="block";return}try{const r=await h.adminCreateUser({email:s,password:n,fullName:l,role:o});this._users.unshift(r),this._rerender()}catch(r){c.textContent=r.message.replace(/^\d+: /,"")||"สร้างผู้ใช้งานไม่สำเร็จ",c.style.display="block"}}),document.querySelectorAll(".toggle-user-btn").forEach(s=>{s.addEventListener("click",async()=>{const n=s.dataset.id,l=s.dataset.active==="true";try{await h.adminUpdateUser(n,{isActive:!l});const o=this._users.find(c=>c.id===n);o&&(o.isActive=!l),this._rerender()}catch(o){alert("อัปเดตสถานะผู้ใช้งานไม่สำเร็จ: "+o.message)}})}),document.querySelectorAll(".delete-user-btn").forEach(s=>{s.addEventListener("click",async()=>{const n=s.dataset.id,l=s.dataset.email;if(confirm(`ลบผู้ใช้งาน "${l}" ใช่หรือไม่?`))try{await h.adminDeleteUser(n),this._users=this._users.filter(o=>o.id!==n),this._rerender()}catch(o){alert("ลบผู้ใช้งานไม่สำเร็จ: "+o.message)}})}))}unmount(){}}const Fe={draft:{text:"ร่างงาน",cls:"badge-gray"},submitted:{text:"ส่งแล้ว",cls:"badge-blue"},under_review:{text:"กำลังตรวจสอบ",cls:"badge-yellow"},approved:{text:"อนุมัติแล้ว",cls:"badge-green"}},ze={silver:"Silver (เงิน)",gold:"Gold (ทอง)",platinum:"Platinum (แพลทินัม)"};class De{constructor({router:e,api:t}){this.router=e,this.api=t,this._items=[],this._loading=!0,this._error=""}render(){return`
      <div class="step-panel">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <h2 class="step-title" style="margin:0">
            🏆 Amata Best Waste Management Award
          </h2>
          ${d.get("auth.role")!=="auditor"?'<button class="btn btn-primary" id="wa-new-btn">+ สร้างรายการใหม่</button>':""}
        </div>

        <div id="wa-list-content">
          <div class="form-card" style="text-align:center; padding:30px; color:var(--color-text-muted)">
            กำลังโหลด...
          </div>
        </div>
      </div>
    `}mount(){var e;(e=document.getElementById("wa-new-btn"))==null||e.addEventListener("click",()=>this._createNew()),this._loadList()}unmount(){}async _loadList(){try{this._items=await this.api.listWasteAward(),this._loading=!1,this._renderList()}catch(e){document.getElementById("wa-list-content").innerHTML=`
        <div class="form-card" style="text-align:center; padding:30px; color:var(--color-error)">
          โหลดข้อมูลไม่สำเร็จ: ${e.message}
        </div>`}}_renderList(){const e=document.getElementById("wa-list-content");if(!e)return;if(!this._items.length){e.innerHTML=`
        <div class="form-card" style="text-align:center; padding:40px; color:var(--color-text-muted)">
          ยังไม่มีรายการ — กดปุ่ม "สร้างรายการใหม่" เพื่อเริ่มต้น
        </div>`;return}const t=this._items.map(a=>{const s=Fe[a.status]||{text:a.status,cls:"badge-gray"},n=a.assessmentDate?new Date(a.assessmentDate).toLocaleDateString("th-TH"):"—",l=a.maxScore>0?Math.round(a.totalScore*100/a.maxScore):0,o=l>=80?`<span style="color:var(--color-success);font-weight:600">${a.totalScore}/${a.maxScore} (${l}%) ✓</span>`:`<span style="color:var(--color-text-muted)">${a.totalScore}/${a.maxScore} (${l}%)</span>`;return`
        <tr>
          <td>${a.factoryName}</td>
          <td>${ze[a.certificationLevel]||a.certificationLevel}</td>
          <td>${n}</td>
          <td><span class="badge ${s.cls}">${s.text}</span></td>
          <td style="text-align:center">${o}</td>
          <td>
            <button class="btn btn-secondary btn-sm wa-open-btn" data-id="${a.id}">เปิด</button>
            ${a.status==="approved"?`
              <button class="btn btn-primary btn-sm wa-excel-btn"
                data-id="${a.id}" data-name="${a.factoryName}"
                style="margin-left:6px">⬇ Excel</button>`:""}
          </td>
        </tr>`}).join("");e.innerHTML=`
      <div class="form-card" style="padding:0; overflow:hidden">
        <table style="width:100%; border-collapse:collapse; font-size:14px">
          <thead>
            <tr style="background:var(--color-primary); color:#fff">
              <th style="padding:12px 14px; text-align:left">ชื่อบริษัท/โรงงาน</th>
              <th style="padding:12px 14px; text-align:left">ระดับ</th>
              <th style="padding:12px 14px; text-align:left">วันที่ตรวจ</th>
              <th style="padding:12px 14px; text-align:left">สถานะ</th>
              <th style="padding:12px 14px; text-align:center">คะแนน</th>
              <th style="padding:12px 14px; text-align:left">จัดการ</th>
            </tr>
          </thead>
          <tbody id="wa-tbody">
            ${t}
          </tbody>
        </table>
      </div>`,document.querySelectorAll(".wa-open-btn").forEach(a=>{a.addEventListener("click",()=>{window.location.hash=`#waste-award/${a.dataset.id}`})}),document.querySelectorAll(".wa-excel-btn").forEach(a=>{a.addEventListener("click",async()=>{a.disabled=!0,a.textContent="⏳";try{await this.api.downloadWasteAwardExcel(a.dataset.id,a.dataset.name)}catch(s){alert("ดาวน์โหลดไม่สำเร็จ: "+s.message)}finally{a.disabled=!1,a.textContent="⬇ Excel"}})})}_createNew(){this._showCreateModal()}_showCreateModal(){const e=document.createElement("div");e.className="wa-modal-overlay",e.innerHTML=`
      <div class="wa-modal" role="dialog" aria-modal="true">
        <div class="wa-modal-header">
          <span class="wa-modal-title">สร้างรายการประเมินใหม่</span>
          <button class="wa-modal-close" id="wa-modal-close-btn" aria-label="ปิด">&times;</button>
        </div>

        <label class="wa-modal-label" for="wa-modal-factory-name">ชื่อบริษัท/โรงงาน <span style="color:var(--color-error)">*</span></label>
        <input type="text" id="wa-modal-factory-name" placeholder="กรอกชื่อบริษัทหรือโรงงาน" autocomplete="off" />

        <div class="wa-modal-section">
          <span class="wa-modal-label">ระดับที่สมัคร</span>
          <div class="wa-level-cards">
            <div class="wa-level-card selected" data-level="silver">
              <div class="wa-level-icon">🥈</div>
              <div class="wa-level-name">Silver</div>
              <div class="wa-level-desc">4 เกณฑ์<br>คะแนนสูงสุด 20</div>
            </div>
            <div class="wa-level-card" data-level="gold">
              <div class="wa-level-icon">🥇</div>
              <div class="wa-level-name">Gold</div>
              <div class="wa-level-desc">18 เกณฑ์<br>คะแนนสูงสุด 90</div>
            </div>
            <div class="wa-level-card" data-level="platinum">
              <div class="wa-level-icon">🏆</div>
              <div class="wa-level-name">Platinum</div>
              <div class="wa-level-desc">29 เกณฑ์<br>คะแนนสูงสุด 145</div>
            </div>
          </div>
        </div>

        <div class="wa-modal-error" id="wa-modal-error"></div>

        <div class="wa-modal-actions">
          <button class="btn btn-secondary" id="wa-modal-cancel-btn">ยกเลิก</button>
          <button class="btn btn-primary" id="wa-modal-submit-btn">สร้างรายการ ▶</button>
        </div>
      </div>
    `;let t="silver";const a=()=>{document.removeEventListener("keydown",s),e.remove()},s=n=>{n.key==="Escape"&&a()};document.addEventListener("keydown",s),e.addEventListener("click",n=>{n.target===e&&a()}),e.querySelector("#wa-modal-close-btn").addEventListener("click",a),e.querySelector("#wa-modal-cancel-btn").addEventListener("click",a),e.querySelectorAll(".wa-level-card").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".wa-level-card").forEach(l=>l.classList.remove("selected")),n.classList.add("selected"),t=n.dataset.level})}),e.querySelector("#wa-modal-submit-btn").addEventListener("click",async()=>{const n=e.querySelector("#wa-modal-factory-name"),l=e.querySelector("#wa-modal-error"),o=e.querySelector("#wa-modal-submit-btn");if(!n.value.trim()){l.textContent="กรุณากรอกชื่อบริษัท/โรงงาน",l.style.display="block",n.focus();return}l.style.display="none",o.disabled=!0,o.textContent="กำลังสร้าง...";try{const c=await this.api.createWasteAward({factoryName:n.value.trim(),certificationLevel:t});a(),window.location.hash=`#waste-award/${c.id}`}catch(c){l.textContent="สร้างไม่สำเร็จ: "+c.message,l.style.display="block",o.disabled=!1,o.textContent="สร้างรายการ ▶"}}),document.body.appendChild(e),e.querySelector("#wa-modal-factory-name").focus()}}const pe=[{catNo:1,catName:"เอกสารทั่วไป",no:1,level:"silver",name:"เอกสารแนะนำบริษัท การแจ้งประกอบกิจการ และการให้ความร่วมมือในการพัฒนาเมืองอุตสาหกรรมเชิงนิเวศระดับ Eco-Excellence",subs:[{desc:"1) มีสำเนาใบอนุญาตประกอบกิจการ (กนอ.03/5 หรือ กนอ.03/6) และเอกสารแนะนำบริษัท",lvl:3},{desc:"3) มีการส่งแบบบันทึกข้อมูลโรงงานเพื่อขอรับรองระดับ Eco-Excellence ปี 2568",lvl:5}]},{catNo:2,catName:"นโยบายและแผนงานด้านการจัดการสิ่งแวดล้อม",no:2,level:"silver",name:"นโยบายการจัดการสิ่งแวดล้อม และการสื่อสารนโยบาย",subs:[{desc:"1) มีนโยบายด้านการจัดการสิ่งแวดล้อม",lvl:1},{desc:"2) มีการสื่อสารนโยบายด้านสิ่งแวดล้อมอย่างน้อย 3 ช่องทาง",lvl:3},{desc:"3) มีแผนงานด้านสิ่งแวดล้อม และ/หรือผลการดำเนินงานตามแผน",lvl:5}]},{catNo:3,catName:"การแจ้งขออนุญาตจัดการขยะมูลฝอยและขยะอุตสาหกรรมกับหน่วยงานภาครัฐ",no:3,level:"silver",name:"การขึ้นทะเบียนขออนุญาตนำสิ่งปฏิกูลหรือวัสดุที่ไม่ใช้แล้วออกนอกบริเวณโรงงาน",subs:[{desc:"1) มีการดำเนินการตามกฎหมาย (กอ.1, กอ.2, I-Single Form ม.ค.–ธ.ค. 2567)",lvl:5}]},{catNo:3,catName:"การแจ้งขออนุญาตจัดการขยะมูลฝอยและขยะอุตสาหกรรมกับหน่วยงานภาครัฐ",no:4,level:"silver",name:"การจัดส่งรายงานการจัดการมูลฝอยและกากอุตสาหกรรมให้ กนอ.",subs:[{desc:"1) มีการดำเนินการตามกฎหมายภายใต้ประกาศ กนอ. ที่ 79/2554",lvl:5}]},{catNo:4,catName:"การตรวจประเมินผู้รับกำจัดขยะมูลฝอยและขยะอุตสาหกรรม",no:5,level:"gold",name:"การตรวจประเมินผู้รับกำจัดกากอุตสาหกรรม (อันตรายและไม่อันตราย)",subs:[{desc:"1) มีแผนการตรวจประเมินผู้รับกำจัดขยะอุตสาหกรรม (Self Audit หรือ Onsite Audit)",lvl:3},{desc:"2) มีผลการตรวจประเมินผู้รับกำจัดขยะอุตสาหกรรม",lvl:5}]},{catNo:4,catName:"การตรวจประเมินผู้รับกำจัดขยะมูลฝอยและขยะอุตสาหกรรม",no:6,level:"gold",name:"การตรวจประเมินผู้รับกำจัดมูลฝอย",subs:[{desc:"1) มีแผนการตรวจประเมินผู้รับกำจัดมูลฝอย",lvl:3},{desc:"2) มีผลการตรวจประเมินผู้รับกำจัดมูลฝอย",lvl:5}]},{catNo:5,catName:"ระบบการจัดการขยะมูลฝอยและขยะอุตสาหกรรมภายในโรงงาน",no:7,level:"gold",name:"ระบบคัดแยกมูลฝอยและกากอุตสาหกรรม",subs:[{desc:"1) มีภาชนะคัดแยกมูลฝอยออกจากกากอุตสาหกรรม + ภาชนะจัดเก็บกากฯ ในพื้นที่กระบวนการผลิต",lvl:3},{desc:"3) มีระบบบริหารและจัดการมูลฝอยและกากอุตสาหกรรมจากกระบวนการผลิต",lvl:5}]},{catNo:5,catName:"ระบบการจัดการขยะมูลฝอยและขยะอุตสาหกรรมภายในโรงงาน",no:8,level:"gold",name:"พื้นที่จัดเก็บรวบรวมขยะมูลฝอยและกากอุตสาหกรรม",subs:[{desc:"1) บริเวณพื้นที่จัดเก็บรวบรวมมูลฝอยและกากอุตสาหกรรมแยกออกจากกัน พร้อม Layout",lvl:3},{desc:"2) มีการจัดการที่ดี และมีการตรวจสอบสม่ำเสมอ",lvl:5}]},{catNo:5,catName:"ระบบการจัดการขยะมูลฝอยและขยะอุตสาหกรรมภายในโรงงาน",no:9,level:"gold",name:"ระบบบริหารจัดการในพื้นที่จัดเก็บรวบรวมขยะมูลฝอยและกากอุตสาหกรรม",subs:[{desc:"1) มีระบบบริหารจัดการในพื้นที่จัดเก็บ: ป้าย Labeling ครบ 6 องค์ประกอบ*",lvl:3},{desc:"2) มีรายชื่อผู้รับผิดชอบในการดูแลพื้นที่จัดเก็บรวบรวม",lvl:5}]},{catNo:5,catName:"ระบบการจัดการขยะมูลฝอยและขยะอุตสาหกรรมภายในโรงงาน",no:10,level:"gold",name:"การจัดระเบียบด้านอาชีวอนามัย ความปลอดภัย และสิ่งแวดล้อมในพื้นที่จัดเก็บ",subs:[{desc:"1) มีการจัดระเบียบด้านอาชีวอนามัย: ป้ายห้าม แผนฉุกเฉิน ถังดับเพลิง PPE",lvl:3},{desc:"2) มีการปฏิบัติตามข้อกำหนดด้านความปลอดภัยครบถ้วน",lvl:5}]},{catNo:5,catName:"ระบบการจัดการขยะมูลฝอยและขยะอุตสาหกรรมภายในโรงงาน",no:11,level:"gold",name:"การป้องกันการหกรั่วไหลของน้ำชะจากขยะมูลฝอยและกากอุตสาหกรรม",subs:[{desc:"1) มีรางระบายน้ำ หรือระบบป้องกันการหกรั่วไหลของน้ำชะฯ + Secondary Container",lvl:5}]},{catNo:6,catName:"การส่งเสริมการจัดการขยะตามหลัก 3Rs และ Circular Economy",no:12,level:"gold",name:"การสร้างจิตสำนึกในการจัดการขยะให้กับพนักงาน",subs:[{desc:"1) บริษัทมีโครงการหรือกิจกรรมสร้างจิตสำนึกการจัดการขยะ ≥ 1 โครงการ",lvl:3},{desc:"2) มีโครงการเพิ่มเติมหรือผลลัพธ์ที่ชัดเจน ≥ 2 โครงการ",lvl:5}]},{catNo:6,catName:"การส่งเสริมการจัดการขยะตามหลัก 3Rs และ Circular Economy",no:13,level:"gold",name:"การส่งเสริมจัดการมูลฝอยและกากอุตสาหกรรม — Reduce (ลดการสูญเสียวัตถุดิบ)",subs:[{desc:"1) บริษัทมีโครงการ Reduce ≥ 1 โครงการ พร้อมรายละเอียดครบถ้วน",lvl:3},{desc:"2) มีผลลัพธ์ที่วัดได้ชัดเจน ≥ 2 โครงการ Reduce",lvl:5}]},{catNo:6,catName:"การส่งเสริมการจัดการขยะตามหลัก 3Rs และ Circular Economy",no:14,level:"gold",name:"การส่งเสริมจัดการมูลฝอยและกากอุตสาหกรรม — Reuse (นำกลับมาใช้ซ้ำ)",subs:[{desc:"1) บริษัทมีโครงการ Reuse ≥ 1 โครงการ พร้อมรายละเอียดครบถ้วน",lvl:3},{desc:"2) มีผลลัพธ์ที่วัดได้ชัดเจน ≥ 2 โครงการ Reuse",lvl:5}]},{catNo:6,catName:"การส่งเสริมการจัดการขยะตามหลัก 3Rs และ Circular Economy",no:15,level:"gold",name:"การส่งเสริมจัดการมูลฝอยและกากอุตสาหกรรม — Recycling (แปรรูปใหม่)",subs:[{desc:"1) บริษัทมีโครงการ Recycling ≥ 1 โครงการ พร้อมรายละเอียดครบถ้วน",lvl:3},{desc:"2) มีผลลัพธ์ที่วัดได้ชัดเจน ≥ 2 โครงการ Recycling",lvl:5}]},{catNo:6,catName:"การส่งเสริมการจัดการขยะตามหลัก 3Rs และ Circular Economy",no:16,level:"gold",name:"การส่งเสริมจัดการตามหลัก Circular Economy",subs:[{desc:"1) มีนโยบายหรือแนวคิดในการส่งเสริมจัดการตาม Circular Economy",lvl:1},{desc:"2) มีผลิตภัณฑ์ใหม่เกิดขึ้นจากแนวคิด Circular Economy",lvl:3},{desc:"3) มีการขอรับรองผลิตภัณฑ์ที่ได้จากแนวคิด Circular Economy",lvl:5}]},{catNo:7,catName:"การรับรองมาตรฐานบริหารจัดการระดับสากลและรางวัล",no:17,level:"gold",name:"การรับรองมาตรฐานบริหารจัดการระดับประเทศและนานาชาติ",subs:[{desc:"1) บริษัทได้รับการรับรองมาตรฐานระดับประเทศ (CSR-DIW, Green Industry Lv.3–5)",lvl:3},{desc:"2) บริษัทได้รับการรับรองมาตรฐานระดับสากล (ISO 9001/14001/45001/50001/16949)",lvl:5}]},{catNo:7,catName:"การรับรองมาตรฐานบริหารจัดการระดับสากลและรางวัล",no:18,level:"gold",name:"การได้รับเกียรติบัตรพิเศษหรือรางวัลระดับประเทศ/นานาชาติ",subs:[{desc:"3) บริษัทได้รับเกียรติบัตรพิเศษหรือรางวัลระดับประเทศ ภายใน 3 ปี (2565–ปัจจุบัน)",lvl:3},{desc:"4) บริษัทได้รับเกียรติบัตรพิเศษหรือรางวัลระดับนานาชาติ",lvl:5}]},{catNo:8,catName:"การจัดการขยะตามหลัก Zero Landfill",no:19,level:"platinum",name:"การจัดการขยะตามหลัก Zero Landfill (ฝังกลบ < 2%)",subs:[{desc:"1) มีปริมาณฝังกลบ < 2% ต่อเนื่อง 1 ปี (ปี 2567) รหัส 071/072/073",lvl:3},{desc:"2) มีปริมาณฝังกลบ < 2% ต่อเนื่อง ≥ 2 ปี",lvl:5}]},{catNo:9,catName:"เทคโนโลยี การพัฒนาและปรับปรุงกระบวนการที่เป็นมิตรต่อสิ่งแวดล้อม",no:20,level:"platinum",name:"กระบวนการผลิตที่เป็นมิตรกับสิ่งแวดล้อม (Eco-Process)",subs:[{desc:"1) มีการสำรวจและวิเคราะห์ข้อมูลเพื่อวางแผนดำเนินการ Eco-Process",lvl:1},{desc:"2) มีกิจกรรม/การดำเนินงานพัฒนาหรือปรับปรุงกระบวนการผลิต ≥ 1 โครงการ",lvl:3},{desc:"3) มีผลลัพธ์ที่วัดได้ (ลดทรัพยากร/ของเสีย/มลพิษ/CO₂)",lvl:5}]},{catNo:9,catName:"เทคโนโลยี การพัฒนาและปรับปรุงกระบวนการที่เป็นมิตรต่อสิ่งแวดล้อม",no:21,level:"platinum",name:"ผลิตภัณฑ์ที่เป็นมิตรกับสิ่งแวดล้อม (Eco-Product)",subs:[{desc:"1) มีการสำรวจและวิเคราะห์ข้อมูลเพื่อวางแผน Eco-Product",lvl:1},{desc:"2) มีกิจกรรม/การดำเนินงานพัฒนาและปรับปรุงผลิตภัณฑ์ ≥ 1 โครงการ",lvl:3},{desc:"3) มีผลลัพธ์ (ผลิตภัณฑ์ได้รับรองมาตรฐาน ROHS, ฉลากเขียว, FSC ฯลฯ)",lvl:5}]},{catNo:9,catName:"เทคโนโลยี การพัฒนาและปรับปรุงกระบวนการที่เป็นมิตรต่อสิ่งแวดล้อม",no:22,level:"platinum",name:"ระบบขนส่งที่คำนึงเรื่องสิ่งแวดล้อม (Green Logistics)",subs:[{desc:"1) มีการเก็บรวบรวมข้อมูลเพื่อวางแผนดำเนินการ Green Logistics",lvl:1},{desc:"2) มีการดำเนินการปรับปรุงระบบขนส่ง (Milk Run, EV Truck, Load Optimization)",lvl:3},{desc:"3) มีผลลัพธ์ที่วัดได้ชัดเจน",lvl:5}]},{catNo:10,catName:"การอนุรักษ์พลังงาน",no:23,level:"platinum",name:"การจัดการพลังงาน",subs:[{desc:"1) มีกิจกรรมส่งเสริมหรือรณรงค์การประหยัดพลังงาน",lvl:1},{desc:"2) มีโครงการประหยัดหรืออนุรักษ์พลังงาน ≥ 1 โครงการ",lvl:3},{desc:"3) มีการใช้เทคโนโลยีในการประหยัดพลังงาน (Solar, LED, Inverter ฯลฯ)",lvl:5}]},{catNo:11,catName:"การอนุรักษ์น้ำ",no:24,level:"platinum",name:"การจัดการน้ำและน้ำเสีย",subs:[{desc:"1) มีกิจกรรมส่งเสริมหรือรณรงค์การประหยัดน้ำ",lvl:1},{desc:"2) มีการจัดทำบัญชีสมดุลน้ำ (Water Balance) หรือผังสมดุลน้ำ",lvl:3},{desc:"3) มีกระบวนการปรับปรุงหรือใช้เทคโนโลยีบริหารน้ำและน้ำเสีย",lvl:5}]},{catNo:12,catName:"การดูแลพนักงาน",no:25,level:"platinum",name:"การดูแลพนักงานตามหลักการ Happy Workplace",subs:[{desc:"1) มีกิจกรรมดูแลพนักงาน Happy Workplace ≥ 3 ด้าน (จาก 8 ด้าน)",lvl:3},{desc:"2) มีกิจกรรม Happy Workplace ครบทั้ง 8 ด้าน (Body/Family/Relax/Brain/Society/Heart/Money/Soul)",lvl:5}]},{catNo:13,catName:"การดูแลและพัฒนาชุมชน",no:26,level:"platinum",name:"กิจกรรมดูแลและรับผิดชอบต่อชุมชนในพื้นที่ชลบุรี/ระยอง",subs:[{desc:"1) มีกิจกรรม CSR ด้านเศรษฐกิจ-สังคม และด้านสิ่งแวดล้อม ≥ 1 กิจกรรม/ด้าน",lvl:3},{desc:"2) มีผลการดำเนินงานชัดเจน ≥ 2 กิจกรรม/ด้าน (ไม่นับเฉพาะการบริจาคเงิน)",lvl:5}]},{catNo:14,catName:"การดำเนินการเพื่อรายงานการปลดปล่อยก๊าซเรือนกระจก",no:27,level:"platinum",name:"การดำเนินการเพื่อรายงานการปลดปล่อยก๊าซเรือนกระจก (GHG)",subs:[{desc:"1) มีนโยบายหรือกำหนดเป้าหมายลดการปลดปล่อย GHG หรือ KPI",lvl:1},{desc:"2) มีการจัดทำบัญชีรายการก๊าซเรือนกระจก (Scope 1+2) + มาตรการลด",lvl:3},{desc:"3) ได้รับการขึ้นทะเบียน T-VER / ISO 14064 / Net Zero Commitment",lvl:5}]},{catNo:15,catName:"การดำเนินงานตามเป้าหมายการพัฒนาอย่างยั่งยืน SDGs",no:28,level:"platinum",name:"การดำเนินงานที่สอดคล้องกับ SDGs และ Eco Industrial Estate",subs:[{desc:"1) มีเกณฑ์พื้นฐานครบ 5 ข้อ (นโยบาย SDGs, คณะทำงาน, ISO 14001, Master Plan, ข้อมูลพื้นฐาน 7 ข้อ)",lvl:1},{desc:"2) ดำเนินการตามเป้าหมายหลัก ≥ 3 จาก 6 เป้าหมาย (SDG 6,7,8,9,12,13)",lvl:3},{desc:"3) มีการเปิดเผยและสื่อสารผลการดำเนินงาน SDGs (รายงานความยั่งยืน)",lvl:5}]},{catNo:15,catName:"การดำเนินงานตามเป้าหมายการพัฒนาอย่างยั่งยืน SDGs",no:29,level:"platinum",name:"การมุ่งสู่เป้าหมายการพัฒนาที่ยั่งยืน ตามแนวทาง Eco I.E. → SDGs I.E.",subs:[{desc:"1) มีเกณฑ์พื้นฐานครบถ้วนทั้ง 5 ข้อ",lvl:1},{desc:"2) ดำเนินการตามเป้าหมายหลัก ≥ 3 จาก 6 เป้าหมาย",lvl:3},{desc:"3) ดำเนินการตามเป้าหมายหลักและเป้าหมายรองครบถ้วน",lvl:5}]}];function We(i){return({silver:4,gold:18,platinum:29}[i]||0)*5}function ue(i){const t={silver:["silver"],gold:["silver","gold"],platinum:["silver","gold","platinum"]}[i]||["silver"];return pe.filter(a=>t.includes(a.level))}function je(i,e){const t=ue(e);let a=0;for(const s of t){const n=i[s.no];(n==null?void 0:n.score)!=null&&(a+=n.score)}return a}const G={silver:"Silver (เงิน)",gold:"Gold (ทอง)",platinum:"Platinum (แพลทินัม)"},Oe={draft:{text:"ร่างงาน",cls:"badge-gray"},submitted:{text:"ส่งแล้ว",cls:"badge-blue"},under_review:{text:"กำลังตรวจสอบ",cls:"badge-yellow"},approved:{text:"อนุมัติแล้ว",cls:"badge-green"}};class He{constructor({router:e,api:t,assessmentId:a}){this.router=e,this.api=t,this.assessmentId=a,this._data=null,this._scores={},this._info={},this._evidenceFiles={},this._feedback=[],this._saveTimer=null,this._saving=!1}render(){return`
      <div class="step-panel">
        <div id="wa-form-content">
          <div class="form-card" style="text-align:center; padding:30px; color:var(--color-text-muted)">
            กำลังโหลด...
          </div>
        </div>
      </div>
    `}mount(){this._load()}unmount(){this._saveTimer&&clearTimeout(this._saveTimer)}async _load(){try{this._data=await this.api.getWasteAward(this.assessmentId);const e=this._data.assessment;this._info={factoryName:e.factoryName||"",factoryLicenseNo:e.factoryLicenseNo||"",address:e.address||"",industrialEstate:e.industrialEstate||"",phone:e.phone||"",faxNumber:e.faxNumber||"",website:e.website||"",applicationType:e.applicationType||"new_registration",certificationLevel:e.certificationLevel||"silver",coordinatorName:e.coordinatorName||"",coordinatorPosition:e.coordinatorPosition||"",coordinatorDepartment:e.coordinatorDepartment||"",coordinatorPhone:e.coordinatorPhone||"",coordinatorEmail:e.coordinatorEmail||"",coordinator2Name:e.coordinator2Name||"",coordinator2Position:e.coordinator2Position||"",coordinator2Department:e.coordinator2Department||"",coordinator2Phone:e.coordinator2Phone||"",coordinator2Email:e.coordinator2Email||"",auditorNames:e.auditorNames||"",assessmentDate:e.assessmentDate?e.assessmentDate.slice(0,10):"",assessmentTime:e.assessmentTime||""},this._scores={};for(const s of this._data.criteria||[])this._scores[s.criterionNo]={score:s.score??null,evidenceText:s.evidenceText||"",suggestionsText:s.suggestionsText||""};this._evidenceFiles={};for(const s of this._data.evidenceFiles||[])this._evidenceFiles[s.criterionNo]||(this._evidenceFiles[s.criterionNo]=[]),this._evidenceFiles[s.criterionNo].push(s);this._feedback=this._data.feedback||[],this._renderForm();const t=this._data.assessment;d.get("auth.role")==="factory"&&t.status==="approved"&&!t.factoryNotified&&(this._showApprovalBanner(t),this.api.markWasteAwardNotified(this.assessmentId).catch(()=>{}))}catch(e){document.getElementById("wa-form-content").innerHTML=`
        <div class="form-card" style="text-align:center; padding:30px; color:var(--color-error)">
          โหลดข้อมูลไม่สำเร็จ: ${e.message}
        </div>`}}_renderForm(){const e=document.getElementById("wa-form-content");if(!e)return;const t=this._data.assessment,a=d.get("auth.role"),s=a==="admin"||a==="auditor",n=t.status,l=!s&&(n==="draft"||n==="submitted"),o=s,c=d.get("auth.userId"),r=a==="admin"||a==="auditor"&&t.assignedAuditorId===c,p=Oe[n]||{text:n,cls:"badge-gray"},m=G[t.certificationLevel]||t.certificationLevel,v=ue(t.certificationLevel),g=[];let f=null;for(const u of v)(!f||f.no!==u.catNo)&&(f={no:u.catNo,name:u.catName,level:u.level,items:[]},g.push(f)),f.items.push(u);e.innerHTML=`
      <!-- Header bar -->
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px; flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" id="wa-back-btn">← กลับ</button>
        <h2 class="step-title" style="margin:0; flex:1">🏆 ${t.factoryName||"—"}</h2>
        <span class="badge ${p.cls}">${p.text}</span>
        <span style="font-size:13px; color:var(--color-text-muted)">${m}</span>
      </div>

      ${s?this._renderAuditorView(t,g):this._renderFactoryView(t,l)}

      <!-- Score summary (auditor only) -->
      ${s?`<div class="form-card" id="wa-summary" style="margin-top:20px">${this._renderSummary()}</div>`:""}

      <!-- Feedback panel (all roles) -->
      ${this._renderFeedbackPanel(a)}

      <!-- Action buttons -->
      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:16px; flex-wrap:wrap">
        <span id="wa-save-status" style="font-size:12px; color:var(--color-text-muted); align-self:center"></span>
        ${l||o?'<button class="btn btn-secondary" id="wa-save-btn">💾 บันทึก</button>':""}
        ${l&&n==="draft"?'<button class="btn btn-primary" id="wa-submit-btn">📤 ส่งตรวจ</button>':""}
        ${s&&(n==="draft"||n==="submitted")?'<button class="btn btn-warning" id="wa-review-btn">🔍 เริ่มตรวจสอบ</button>':""}
        ${r&&n==="under_review"?'<button class="btn btn-success" id="wa-approve-btn">✅ อนุมัติผลการตรวจ</button>':""}
        ${s&&(n==="under_review"||n==="approved")?'<button class="btn btn-primary" id="wa-excel-btn">⬇ Excel</button>':""}
        ${!s&&n==="approved"?'<button class="btn btn-primary" id="wa-excel-btn">⬇ Excel</button>':""}
      </div>
    `,this._attachEvents(s,l,o)}_renderFactoryView(e,t){var n;const a=[{value:"new_registration",label:"สมัครใหม่ (New Registration)"},{value:"upgrade",label:"ปรับระดับ (Upgrade)"},{value:"renewal",label:"ต่อเนื่อง (Renewal)"}],s=["Amata City Chonburi","Amata City Rayong"];return`
      <!-- Section 1: ข้อมูลโรงงาน -->
      <div class="form-card" style="margin-bottom:20px">
        <h3 style="margin:0 0 16px; font-size:15px; font-weight:700; color:var(--color-primary)">
          ส่วนที่ 1 — ข้อมูลโรงงาน
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px">
          ${this._field("factoryName","ชื่อบริษัท/โรงงาน *",t)}
          ${this._field("factoryLicenseNo","เลขทะเบียนโรงงาน",t)}
          ${this._fieldFull("address","ที่ตั้งสถานประกอบการ",t)}

          <div>
            <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">นิคมอุตสาหกรรม</label>
            ${t?`<select class="form-input wa-info-input" data-field="industrialEstate" style="width:100%">
                  <option value="">— เลือก —</option>
                  ${s.map(l=>`<option value="${l}" ${this._info.industrialEstate===l?"selected":""}>${l}</option>`).join("")}
                 </select>`:`<div class="form-input" style="background:var(--color-bg-secondary)">${this._info.industrialEstate||"—"}</div>`}
          </div>

          ${this._field("phone","โทรศัพท์",t)}
          ${this._field("faxNumber","โทรสาร",t)}
          ${this._field("website","Website",t)}

          <div>
            <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">ประเภทการสมัคร</label>
            ${t?a.map(l=>`
                  <label style="display:flex; align-items:center; gap:6px; margin-bottom:4px; font-size:13px; cursor:pointer">
                    <input type="radio" name="applicationType" class="wa-info-radio" data-field="applicationType"
                      value="${l.value}" ${this._info.applicationType===l.value?"checked":""}>
                    ${l.label}
                  </label>`).join(""):`<div class="form-input" style="background:var(--color-bg-secondary)">
                  ${((n=a.find(l=>l.value===this._info.applicationType))==null?void 0:n.label)||"—"}
                 </div>`}
          </div>

          <div>
            <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">ระดับที่สมัคร</label>
            ${t?`<select class="form-input wa-info-input" data-field="certificationLevel" style="width:100%">
                  <option value="silver"   ${this._info.certificationLevel==="silver"?"selected":""}>Silver (เงิน)</option>
                  <option value="gold"     ${this._info.certificationLevel==="gold"?"selected":""}>Gold (ทอง)</option>
                  <option value="platinum" ${this._info.certificationLevel==="platinum"?"selected":""}>Platinum (แพลทินัม)</option>
                 </select>`:`<div class="form-input" style="background:var(--color-bg-secondary)">${G[this._info.certificationLevel]||"—"}</div>`}
          </div>
        </div>
      </div>

      <!-- Section 2: ผู้ประสานงาน 1 -->
      <div class="form-card" style="margin-bottom:20px">
        <h3 style="margin:0 0 16px; font-size:15px; font-weight:700; color:var(--color-primary)">
          ส่วนที่ 2 — ผู้ประสานงานหลัก
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px">
          ${this._field("coordinatorName","ชื่อ-นามสกุล *",t)}
          ${this._field("coordinatorPosition","ตำแหน่ง",t)}
          ${this._field("coordinatorDepartment","ฝ่าย/หน่วยงาน",t)}
          ${this._field("coordinatorPhone","โทรศัพท์",t)}
          ${this._field("coordinatorEmail","อีเมล",t)}
        </div>
      </div>

      <!-- Section 3: ผู้ประสานงาน 2 -->
      <div class="form-card" style="margin-bottom:20px">
        <h3 style="margin:0 0 16px; font-size:15px; font-weight:700; color:var(--color-primary)">
          ส่วนที่ 3 — ผู้ประสานงานสำรอง
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px">
          ${this._field("coordinator2Name","ชื่อ-นามสกุล",t)}
          ${this._field("coordinator2Position","ตำแหน่ง",t)}
          ${this._field("coordinator2Department","ฝ่าย/หน่วยงาน",t)}
          ${this._field("coordinator2Phone","โทรศัพท์",t)}
          ${this._field("coordinator2Email","อีเมล",t)}
        </div>
      </div>

      ${t?"":`
        <div class="form-card" style="margin-bottom:20px; padding:14px 20px; background:#f0fdf4; border:1px solid #86efac">
          <p style="margin:0; font-size:14px; color:#166534">
            ✅ ใบสมัครส่งแล้ว — รอการตรวจประเมินจากกรรมการ
          </p>
        </div>`}
    `}_renderAuditorView(e,t){return`
      <!-- Section 1: ข้อมูลการตรวจ (editable by auditor) -->
      <div class="form-card" style="margin-bottom:20px">
        <h3 style="margin:0 0 16px; font-size:15px; font-weight:700; color:var(--color-primary)">
          ส่วนที่ 1 — ข้อมูลการตรวจประเมิน
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px">
          ${this._fieldFull("auditorNames","กรรมการผู้ตรวจประเมิน",!0)}
          ${this._field("assessmentDate","วันที่ตรวจ",!0,"date")}
          ${this._field("assessmentTime","เวลาที่ตรวจ",!0,"text","เช่น 09:00–12:00")}
        </div>
      </div>

      <!-- Section 2: ข้อมูลโรงงาน (read-only) -->
      <div class="form-card" style="margin-bottom:20px">
        <h3 style="margin:0 0 16px; font-size:15px; font-weight:700; color:var(--color-primary)">
          ส่วนที่ 2 — ข้อมูลโรงงาน
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px">
          ${this._field("factoryName","ชื่อบริษัท/โรงงาน",!1)}
          ${this._field("factoryLicenseNo","เลขทะเบียนโรงงาน",!1)}
          ${this._fieldFull("address","ที่ตั้งสถานประกอบการ",!1)}
          ${this._field("industrialEstate","นิคมอุตสาหกรรม",!1)}
          ${this._field("phone","โทรศัพท์",!1)}
          ${this._field("faxNumber","โทรสาร",!1)}
          ${this._field("website","Website",!1)}
          <div>
            <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">ประเภทการสมัคร</label>
            <div class="form-input" style="background:var(--color-bg-secondary)">
              ${{new_registration:"สมัครใหม่",upgrade:"ปรับระดับ",renewal:"ต่อเนื่อง"}[this._info.applicationType]||"—"}
            </div>
          </div>
          ${this._field("certificationLevel","ระดับที่สมัคร",!1)}
        </div>
        <div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--color-border)">
          <h4 style="margin:0 0 10px; font-size:13px; color:var(--color-text-muted)">ผู้ประสานงานหลัก</h4>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px 16px">
            ${this._field("coordinatorName","ชื่อ-นามสกุล",!1)}
            ${this._field("coordinatorPosition","ตำแหน่ง",!1)}
            ${this._field("coordinatorDepartment","ฝ่าย/หน่วยงาน",!1)}
            ${this._field("coordinatorPhone","โทรศัพท์",!1)}
            ${this._field("coordinatorEmail","อีเมล",!1)}
          </div>
        </div>
        ${this._info.coordinator2Name?`
        <div style="margin-top:12px; padding-top:12px; border-top:1px solid var(--color-border)">
          <h4 style="margin:0 0 10px; font-size:13px; color:var(--color-text-muted)">ผู้ประสานงานสำรอง</h4>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px 16px">
            ${this._field("coordinator2Name","ชื่อ-นามสกุล",!1)}
            ${this._field("coordinator2Position","ตำแหน่ง",!1)}
            ${this._field("coordinator2Department","ฝ่าย/หน่วยงาน",!1)}
            ${this._field("coordinator2Phone","โทรศัพท์",!1)}
            ${this._field("coordinator2Email","อีเมล",!1)}
          </div>
        </div>`:""}
      </div>

      <!-- Section 3: เกณฑ์การตรวจ -->
      <div id="wa-criteria-sections">
        ${t.map(a=>this._renderCategory(a)).join("")}
      </div>
    `}_renderCategory(e){return`
      <div class="form-card" style="margin-bottom:16px; padding:0; overflow:hidden">
        <div style="background:${{silver:"#9e9e9e",gold:"#f59e0b",platinum:"#0ea5e9"}[e.level]||"#6b7280"}; color:#fff; padding:10px 16px; font-weight:700; font-size:14px">
          หมวดที่ ${e.no} — ${e.name}
          <span style="font-size:11px; font-weight:400; margin-left:8px; opacity:.85">(${e.level.toUpperCase()})</span>
        </div>
        <div style="padding:12px 16px">
          ${e.items.map(s=>this._renderCriterion(s)).join("")}
        </div>
      </div>`}_renderCriterion(e){const t=this._scores[e.no]||{},a=t.score,n=`
      <table style="width:100%; border-collapse:collapse; margin-bottom:8px; border:1px solid var(--color-border); border-radius:4px; overflow:hidden">
        <thead>
          <tr style="background:var(--color-bg-secondary)">
            <th style="padding:6px 8px; text-align:left; font-size:11px; color:var(--color-text-muted)">เกณฑ์การให้คะแนน</th>
            <th style="padding:6px 8px; text-align:center; font-size:11px; color:var(--color-text-muted); width:50px">คะแนน</th>
          </tr>
        </thead>
        <tbody>${e.subs.map(r=>`
      <tr>
        <td style="padding:4px 8px; font-size:12px; color:var(--color-text-muted)">${r.desc}</td>
        <td style="padding:4px 8px; text-align:center; font-weight:600; color:${r.lvl===5?"#16a34a":r.lvl===3?"#ca8a04":"#9a3412"}">${r.lvl}</td>
      </tr>`).join("")}</tbody>
      </table>`,l=a===5?"#dcfce7":a===3?"#fef9c3":a===1?"#ffedd5":"var(--color-bg)",o=this._evidenceFiles[e.no]||[],c=o.length?o.map(r=>`
          <div style="display:flex; align-items:center; gap:8px; padding:4px 8px; background:var(--color-bg-secondary); border-radius:4px; margin-top:4px">
            <span style="flex:1; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${r.fileName}</span>
            <button class="btn btn-secondary btn-sm wa-del-evidence-btn" data-no="${e.no}" data-fileid="${r.id}"
              style="padding:2px 8px; font-size:11px">✕</button>
          </div>`).join(""):"";return`
      <div style="border:1px solid var(--color-border); border-radius:6px; padding:12px; margin-bottom:12px">
        <div style="font-weight:600; font-size:13px; margin-bottom:8px; color:var(--color-text)">
          ข้อที่ ${e.no}. ${e.name}
        </div>
        ${n}
        <div style="padding:10px; background:${l}; border:1px solid var(--color-border); border-radius:6px" data-score-box="${e.no}">
          <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap">
            <span style="font-size:12px; font-weight:600">คะแนน:</span>
            ${[1,3,5].map(r=>`
              <label style="display:flex; align-items:center; gap:4px; cursor:pointer; font-size:13px">
                <input type="radio" name="score-${e.no}" class="wa-score-radio" data-no="${e.no}" value="${r}"
                  ${a===r?"checked":""}> ${r}
              </label>`).join("")}
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px">
            <div>
              <label style="font-size:11px; color:var(--color-text-muted)">หลักฐานที่พบเห็น</label>
              <textarea class="form-input wa-evidence-input" data-no="${e.no}" rows="2"
                style="width:100%; resize:vertical; margin-top:2px"
                placeholder="บันทึกหลักฐาน">${t.evidenceText||""}</textarea>
            </div>
            <div>
              <label style="font-size:11px; color:var(--color-text-muted)">ข้อเสนอแนะ</label>
              <textarea class="form-input wa-suggest-input" data-no="${e.no}" rows="2"
                style="width:100%; resize:vertical; margin-top:2px"
                placeholder="ข้อเสนอแนะ">${t.suggestionsText||""}</textarea>
            </div>
          </div>
          <!-- Evidence files -->
          <div style="margin-top:10px; border-top:1px solid var(--color-border); padding-top:8px">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px">
              <span style="font-size:12px; font-weight:600">ไฟล์หลักฐาน</span>
              <label class="btn btn-secondary btn-sm" style="cursor:pointer; padding:2px 10px; font-size:12px">
                + อัพโหลด
                <input type="file" class="wa-upload-input" data-no="${e.no}"
                  accept="image/*,application/pdf" style="display:none">
              </label>
              <span class="wa-upload-status" data-no="${e.no}" style="font-size:11px; color:var(--color-text-muted)"></span>
            </div>
            <div class="wa-file-list" data-no="${e.no}">${c}</div>
          </div>
        </div>
      </div>`}_field(e,t,a,s="text",n=""){const l=this._info[e]||"";return a?`<div>
        <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">${t}</label>
        <input type="${s}" class="form-input wa-info-input" data-field="${e}"
          value="${l.replace(/"/g,"&quot;")}" placeholder="${n}" style="width:100%">
      </div>`:`<div>
      <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">${t}</label>
      <div class="form-input" style="background:var(--color-bg-secondary); min-height:36px">${l||"—"}</div>
    </div>`}_fieldFull(e,t,a,s=""){const n=this._info[e]||"";return a?`<div style="grid-column:span 2">
        <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">${t}</label>
        <input type="text" class="form-input wa-info-input" data-field="${e}"
          value="${n.replace(/"/g,"&quot;")}" placeholder="${s}" style="width:100%">
      </div>`:`<div style="grid-column:span 2">
      <label style="font-size:12px; color:var(--color-text-muted); display:block; margin-bottom:4px">${t}</label>
      <div class="form-input" style="background:var(--color-bg-secondary); min-height:36px">${n||"—"}</div>
    </div>`}_renderSummary(){if(!this._data)return"";const e=this._info.certificationLevel||this._data.assessment.certificationLevel,t=We(e),a=je(this._scores,e),s=t>0?Math.round(a*100/t):0,n=s>=80;return`
      <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap">
        <div>
          <span style="font-size:13px; color:var(--color-text-muted)">คะแนนรวม</span>
          <div style="font-size:24px; font-weight:700; color:var(--color-primary)">${a} <span style="font-size:14px; font-weight:400">/ ${t}</span></div>
        </div>
        <div>
          <span style="font-size:13px; color:var(--color-text-muted)">ร้อยละ</span>
          <div style="font-size:24px; font-weight:700; color:${n?"var(--color-success)":"var(--color-error)"}">${s}%</div>
        </div>
        <div style="font-size:14px; font-weight:600; color:${n?"var(--color-success)":"var(--color-error)"}">
          ${n?"✓ ผ่านเกณฑ์ (≥ 80%)":"✗ ไม่ผ่านเกณฑ์ (< 80%)"}
        </div>
        <div style="flex:1; background:var(--color-border); border-radius:4px; height:8px; min-width:120px">
          <div style="background:${n?"var(--color-success)":"#f59e0b"}; width:${s}%; height:8px; border-radius:4px; transition:width .3s"></div>
        </div>
      </div>`}_showApprovalBanner(e){var n;const t=document.getElementById("wa-form-content");if(!t)return;const a=G[e.certificationLevel]||e.certificationLevel,s=document.createElement("div");s.className="wa-approval-banner",s.innerHTML=`
      <div class="wa-approval-banner-content">
        <span class="wa-approval-banner-icon">🎉</span>
        <div>
          <div class="wa-approval-banner-title">ผลการตรวจประเมินอนุมัติแล้ว!</div>
          <div class="wa-approval-banner-sub">ระดับ ${a} — ดาวน์โหลดผลการตรวจได้ทันที</div>
        </div>
        <button class="btn btn-primary" id="wa-banner-excel-btn">⬇ ดาวน์โหลด Excel</button>
      </div>
    `,t.insertBefore(s,t.firstChild),(n=s.querySelector("#wa-banner-excel-btn"))==null||n.addEventListener("click",async l=>{l.target.disabled=!0,l.target.textContent="⏳";try{await this.api.downloadWasteAwardExcel(this.assessmentId,e.factoryName)}catch(o){alert("ดาวน์โหลดไม่สำเร็จ: "+o.message)}finally{l.target.disabled=!1,l.target.textContent="⬇ ดาวน์โหลด Excel"}})}_renderFeedbackPanel(e){const t=d.get("auth.userId");return`
      <div class="form-card wa-feedback-panel" style="margin-top:20px">
        <h3 style="margin:0 0 12px; font-size:15px; font-weight:700; color:var(--color-primary)">
          💬 ข้อความ / Feedback
        </h3>
        <div class="wa-feedback-list" id="wa-feedback-list">
          ${this._feedback.map(n=>{const l=n.authorId===t,o=n.authorRole==="factory"?"โรงงาน":"ผู้ตรวจ",c=new Date(n.createdAt).toLocaleDateString("th-TH",{day:"numeric",month:"short"});return`
        <div class="wa-feedback-msg ${l?"wa-feedback-msg--mine":"wa-feedback-msg--other"}">
          <div class="wa-feedback-meta">
            <span class="wa-feedback-author">${n.authorName}</span>
            <span class="wa-feedback-role">${o}</span>
            <span class="wa-feedback-time">${c}</span>
          </div>
          <div class="wa-feedback-text">${n.message.replace(/</g,"&lt;").replace(/\n/g,"<br>")}</div>
        </div>`}).join("")||'<div style="color:var(--color-text-muted); font-size:13px; text-align:center; padding:16px 0">ยังไม่มีข้อความ</div>'}
        </div>
        ${e==="factory"||e==="auditor"||e==="admin"?`
          <div class="wa-feedback-input-row" style="margin-top:12px">
            <textarea class="form-input" id="wa-feedback-input" rows="2"
              placeholder="พิมพ์ข้อความ..." style="flex:1; resize:none; font-family:var(--font-thai)"></textarea>
            <button class="btn btn-primary" id="wa-feedback-send-btn" style="align-self:flex-end">ส่ง</button>
          </div>`:""}
      </div>`}_attachEvents(e,t,a){var l,o,c,r,p,m,v,g,f;(l=document.getElementById("wa-back-btn"))==null||l.addEventListener("click",()=>{window.location.hash="#waste-award"}),document.querySelectorAll(".wa-info-input").forEach(u=>{u.addEventListener("input",()=>{this._info[u.dataset.field]=u.value,this._scheduleSave(e?"scores":"factory")}),u.addEventListener("change",()=>{this._info[u.dataset.field]=u.value,this._scheduleSave(e?"scores":"factory")})}),document.querySelectorAll(".wa-info-radio").forEach(u=>{u.addEventListener("change",()=>{this._info[u.dataset.field]=u.value,this._scheduleSave("factory")})}),e&&(document.querySelectorAll(".wa-score-radio").forEach(u=>{u.addEventListener("change",()=>{const w=parseInt(u.dataset.no);this._scores[w]||(this._scores[w]={}),this._scores[w].score=parseInt(u.value),this._updateScoreStyling(w),this._refreshSummary(),this._scheduleSave("scores")})}),document.querySelectorAll(".wa-evidence-input").forEach(u=>{u.addEventListener("input",()=>{const w=parseInt(u.dataset.no);this._scores[w]||(this._scores[w]={}),this._scores[w].evidenceText=u.value,this._scheduleSave("scores")})}),document.querySelectorAll(".wa-suggest-input").forEach(u=>{u.addEventListener("input",()=>{const w=parseInt(u.dataset.no);this._scores[w]||(this._scores[w]={}),this._scores[w].suggestionsText=u.value,this._scheduleSave("scores")})}),document.querySelectorAll(".wa-upload-input").forEach(u=>{u.addEventListener("change",async()=>{const w=u.files[0];if(!w)return;const x=parseInt(u.dataset.no),$=document.querySelector(`.wa-upload-status[data-no="${x}"]`);$&&($.textContent="กำลังอัพโหลด...");try{const _=await this.api.uploadWasteAwardEvidence(this.assessmentId,x,w);this._evidenceFiles[x]||(this._evidenceFiles[x]=[]),this._evidenceFiles[x].push(_),this._appendFileToList(x,_),$&&($.textContent="อัพโหลดสำเร็จ ✓"),setTimeout(()=>{$&&($.textContent="")},3e3)}catch(_){$&&($.textContent="อัพโหลดไม่สำเร็จ"),console.error(_)}u.value=""})}),(o=document.getElementById("wa-criteria-sections"))==null||o.addEventListener("click",async u=>{const w=u.target.closest(".wa-del-evidence-btn");if(!w)return;const x=w.dataset.fileid,$=parseInt(w.dataset.no);if(confirm("ลบไฟล์นี้?")){w.disabled=!0;try{await this.api.deleteWasteAwardEvidence(this.assessmentId,x),this._evidenceFiles[$]=(this._evidenceFiles[$]||[]).filter(_=>_.id!==x),w.closest("div").remove()}catch(_){alert("ลบไม่สำเร็จ: "+_.message),w.disabled=!1}}})),(c=document.getElementById("wa-save-btn"))==null||c.addEventListener("click",()=>{e?this._saveScores():this._saveFactory()}),(r=document.getElementById("wa-submit-btn"))==null||r.addEventListener("click",()=>this._changeStatus("submitted")),(p=document.getElementById("wa-review-btn"))==null||p.addEventListener("click",()=>this._changeStatus("under_review")),(m=document.getElementById("wa-approve-btn"))==null||m.addEventListener("click",()=>this._changeStatus("approved"));const s=async()=>{const u=document.getElementById("wa-feedback-input");if(!u)return;const w=u.value.trim();if(!w)return;const x=document.getElementById("wa-feedback-send-btn");x&&(x.disabled=!0,x.textContent="...");try{const $=await this.api.postWasteAwardFeedback(this.assessmentId,w);this._feedback.push($),this._appendFeedbackMessage($),u.value=""}catch($){alert("ส่งข้อความไม่สำเร็จ: "+$.message)}finally{x&&(x.disabled=!1,x.textContent="ส่ง")}};(v=document.getElementById("wa-feedback-send-btn"))==null||v.addEventListener("click",s),(g=document.getElementById("wa-feedback-input"))==null||g.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),s())});const n=document.getElementById("wa-feedback-list");n&&(n.scrollTop=n.scrollHeight),(f=document.getElementById("wa-excel-btn"))==null||f.addEventListener("click",async()=>{const u=document.getElementById("wa-excel-btn");u.disabled=!0,u.textContent="⏳";try{await this.api.downloadWasteAwardExcel(this.assessmentId,this._data.assessment.factoryName)}catch(w){alert("ดาวน์โหลดไม่สำเร็จ: "+w.message)}finally{u.disabled=!1,u.textContent="⬇ Excel"}})}_scheduleSave(e){this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>{e==="scores"?this._saveScores():this._saveFactory()},1200)}_setStatus(e){const t=document.getElementById("wa-save-status");t&&(t.textContent=e)}async _saveFactory(){if(!this._saving){this._saving=!0,this._setStatus("กำลังบันทึก...");try{await this.api.saveWasteAwardFactory(this.assessmentId,{...this._info}),this._setStatus("บันทึกแล้ว ✓")}catch(e){this._setStatus("บันทึกไม่สำเร็จ"),console.error(e)}finally{this._saving=!1}}}async _saveScores(){if(!this._saving){this._saving=!0,this._setStatus("กำลังบันทึก...");try{await this.api.saveWasteAwardScores(this.assessmentId,{auditorNames:this._info.auditorNames||"",assessmentDate:this._info.assessmentDate||null,assessmentTime:this._info.assessmentTime||"",criteria:this._buildCriteriaPayload()}),this._setStatus("บันทึกแล้ว ✓")}catch(e){this._setStatus("บันทึกไม่สำเร็จ"),console.error(e)}finally{this._saving=!1}}}_buildCriteriaPayload(){return pe.map(e=>{var t,a,s;return{criterionNo:e.no,score:((t=this._scores[e.no])==null?void 0:t.score)??null,evidenceText:((a=this._scores[e.no])==null?void 0:a.evidenceText)||"",suggestionsText:((s=this._scores[e.no])==null?void 0:s.suggestionsText)||""}})}async _changeStatus(e){if(confirm(`ยืนยัน${{submitted:"ส่งตรวจ",under_review:"เริ่มตรวจสอบ",approved:"อนุมัติ"}[e]||e}?`))try{await this.api.updateWasteAwardStatus(this.assessmentId,e),this._data.assessment.status=e,this._renderForm()}catch(a){alert("ดำเนินการไม่สำเร็จ: "+a.message)}}_updateScoreStyling(e){var n;const t=(n=this._scores[e])==null?void 0:n.score,a=t===5?"#dcfce7":t===3?"#fef9c3":t===1?"#ffedd5":"var(--color-bg)",s=document.querySelector(`[data-score-box="${e}"]`);s&&(s.style.background=a)}_refreshSummary(){const e=document.getElementById("wa-summary");e&&(e.innerHTML=this._renderSummary())}_appendFeedbackMessage(e){const t=document.getElementById("wa-feedback-list");if(!t)return;const a=t.querySelector('div[style*="text-align:center"]');a&&a.remove();const s=d.get("auth.userId"),n=e.authorId===s,l=e.authorRole==="factory"?"โรงงาน":"ผู้ตรวจ",o=new Date(e.createdAt).toLocaleDateString("th-TH",{day:"numeric",month:"short"}),c=document.createElement("div");c.className=`wa-feedback-msg ${n?"wa-feedback-msg--mine":"wa-feedback-msg--other"}`,c.innerHTML=`
      <div class="wa-feedback-meta">
        <span class="wa-feedback-author">${e.authorName}</span>
        <span class="wa-feedback-role">${l}</span>
        <span class="wa-feedback-time">${o}</span>
      </div>
      <div class="wa-feedback-text">${e.message.replace(/</g,"&lt;").replace(/\n/g,"<br>")}</div>`,t.appendChild(c),t.scrollTop=t.scrollHeight}_appendFileToList(e,t){const a=document.querySelector(`.wa-file-list[data-no="${e}"]`);if(!a)return;const s=document.createElement("div");s.style.cssText="display:flex; align-items:center; gap:8px; padding:4px 8px; background:var(--color-bg-secondary); border-radius:4px; margin-top:4px",s.innerHTML=`
      <span style="flex:1; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${t.fileName}</span>
      <button class="btn btn-secondary btn-sm wa-del-evidence-btn" data-no="${e}" data-fileid="${t.id}"
        style="padding:2px 8px; font-size:11px">✕</button>`,a.appendChild(s)}}const X="eco_application_id";class Ue{constructor({router:e,api:t}){this.router=e,this.api=t}render(){const e=d.get("auth.fullName")||d.get("auth.email")||"";return`
      <div class="user-dashboard">
        <div class="dashboard-welcome">
          <h2 class="dashboard-title">ยินดีต้อนรับ${e?", "+e:""}</h2>
          <p class="dashboard-subtitle">กรุณาเลือกโปรแกรมที่ต้องการใช้งาน</p>
        </div>

        <div class="dashboard-cards">

          <button class="dashboard-card" id="card-eco-factory" type="button">
            <div class="card-icon-wrap card-icon-wrap--green">
              <span class="card-icon">🏭</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">Eco Factory</h3>
              <p class="card-desc">ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</p>
              <p class="card-sub">FTI/WEIS · EF-APP-2018</p>
            </div>
            <span class="card-arrow">→</span>
          </button>

          <button class="dashboard-card" id="card-waste-award" type="button">
            <div class="card-icon-wrap card-icon-wrap--gold">
              <span class="card-icon">🏆</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">Amata Best Waste Management Awards</h3>
              <p class="card-desc">ระบบประเมินและจัดการรางวัลการจัดการของเสียอุตสาหกรรม</p>
              <p class="card-sub">Amata · Waste Award 2025</p>
            </div>
            <span class="card-arrow">→</span>
          </button>

          <button class="dashboard-card" id="card-wp-self-audit" type="button">
            <div class="card-icon-wrap" style="background:#e8f5e9">
              <span class="card-icon">♻️</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">EF-WP Self Audit</h3>
              <p class="card-desc">ระบบประเมินตนเองโรงงาน Waste Processor (ประเภท 101/105/106)</p>
              <p class="card-sub">WEIS · EF-WP 2025</p>
            </div>
            <span class="card-arrow">→</span>
          </button>

        </div>
      </div>
    `}mount(){var e,t,a;(e=document.getElementById("card-eco-factory"))==null||e.addEventListener("click",()=>{this._openEcoFactory()}),(t=document.getElementById("card-waste-award"))==null||t.addEventListener("click",()=>{window.location.hash="#waste-award"}),(a=document.getElementById("card-wp-self-audit"))==null||a.addEventListener("click",()=>{window.location.hash="#ef-wp"})}unmount(){}async _openEcoFactory(){const e=localStorage.getItem(X),t=d.get("applicationId");if(e&&t){const s=d.get("currentStep")||1;this.router.renderStep(s);return}if(e)try{const s=await this.api.getApplication(e);d.set("applicationId",e),d.hydrate(s);const n=d.get("currentStep")||1;this.router.renderStep(n);return}catch{localStorage.removeItem(X)}const a=document.getElementById("card-eco-factory");a&&(a.disabled=!0);try{const s=await this.api.createApplication();d.set("applicationId",s.id),localStorage.setItem(X,s.id),this.router.renderStep(1)}catch(s){a&&(a.disabled=!1);const n=document.querySelector(".user-dashboard");if(n){const l=document.createElement("p");l.className="dashboard-error",l.textContent="ไม่สามารถสร้างแบบฟอร์มได้: "+s.message,n.appendChild(l)}}}}class Ge{constructor({router:e}){this.router=e}render(){const e=d.get("auth.fullName")||d.get("auth.email")||"";return`
      <div class="user-dashboard">
        <div class="dashboard-welcome">
          <h2 class="dashboard-title">ยินดีต้อนรับ${e?", "+e:""}</h2>
          <p class="dashboard-subtitle">เลือกโปรแกรมที่ต้องการใช้งาน</p>
        </div>

        <div class="dashboard-cards">

          <button class="dashboard-card" id="card-waste-award" type="button">
            <div class="card-icon-wrap card-icon-wrap--gold">
              <span class="card-icon">🏆</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">Amata Best Waste Management Awards</h3>
              <p class="card-desc">ระบบตรวจประเมินและจัดการรางวัลการจัดการของเสียอุตสาหกรรม</p>
              <p class="card-sub">Amata · Waste Award 2025</p>
            </div>
            <span class="card-arrow">→</span>
          </button>

          <button class="dashboard-card" id="card-eco-factory" type="button">
            <div class="card-icon-wrap" style="background:#e8f5e9;">
              <span class="card-icon">🌿</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">Eco Factory — จัดการเอกสารผู้ตรวจประเมิน</h3>
              <p class="card-desc">อัปโหลดเอกสารกลุ่ม C & D สำหรับใบสมัครที่ยื่นแล้ว (ไฟล์นำเสนอ, ใบรับรอง, รายงาน, Eco efficiency)</p>
              <p class="card-sub">FTI · Eco Factory Certification</p>
            </div>
            <span class="card-arrow">→</span>
          </button>

          <a href="#profile" class="dashboard-card" style="text-decoration:none; color:inherit;">
            <div class="card-icon-wrap" style="background:var(--color-bg-subtle, #f5f5f5);">
              <span class="card-icon">👤</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">ข้อมูลส่วนตัว</h3>
              <p class="card-desc">แก้ไขข้อมูลโปรไฟล์ หน่วยงาน วุฒิการศึกษา และ Certificate ผู้ตรวจประเมิน</p>
            </div>
            <span class="card-arrow">→</span>
          </a>

        </div>
      </div>
    `}mount(){var e,t;(e=document.getElementById("card-waste-award"))==null||e.addEventListener("click",()=>{window.location.hash="#waste-award"}),(t=document.getElementById("card-eco-factory"))==null||t.addEventListener("click",()=>{window.location.hash="#eco-factory-auditor"})}unmount(){}}const Xe=[{itemNo:7,label:"ไฟล์นำเสนอการตรวจประเมิน Eco Factory (ฉบับเต็ม)",required:!0},{itemNo:8,label:"ไฟล์นำเสนอผลการตรวจประเมินฉบับบทสรุปผู้บริหาร",required:!0}],Ve=[{itemNo:9,label:"ใบรับรองการตรวจประเมิน",required:!0},{itemNo:10,label:"รายงานการตรวจประเมิน",required:!0},{itemNo:11,label:"ฟอร์มการคำนวณ Eco efficiency",required:!0},{itemNo:12,label:"หลักฐานเพิ่มเติมอื่นๆ",required:!1}];class Ye{constructor({router:e}){this.router=e}render(){return`
      <div class="step-panel">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
          <button type="button" class="btn btn-ghost" id="btn-back-eco">← กลับหน้าหลัก</button>
          <h2 class="step-title" style="margin:0">Eco Factory — จัดการเอกสารผู้ตรวจประเมิน</h2>
        </div>
        <p style="color:#666;margin-bottom:1.5rem;">อัปโหลดเอกสารกลุ่ม C & D สำหรับใบสมัครที่ยื่นแล้ว</p>
        <div id="eco-app-list"><p style="color:#999">กำลังโหลด...</p></div>
      </div>
    `}mount(){var e;(e=document.getElementById("btn-back-eco"))==null||e.addEventListener("click",()=>{window.location.hash="#dashboard"}),this._loadApplications()}async _loadApplications(){const e=document.getElementById("eco-app-list");if(e)try{const t=await h.listApplications();if(!Array.isArray(t)||t.length===0){e.innerHTML='<p style="color:#999;padding:1rem 0;">ไม่พบใบสมัครที่รอดำเนินการ</p>';return}e.innerHTML=t.map(a=>this._appCardHtml(a)).join(""),this._bindExpandButtons()}catch(t){e.innerHTML=`<p style="color:#c00">โหลดข้อมูลไม่สำเร็จ: ${t.message}</p>`}}_appCardHtml(e){const t={submitted:"ยื่นแล้ว",under_review:"อยู่ระหว่างตรวจ",approved:"อนุมัติ",rejected:"ปฏิเสธ"},a=(e.submittedAt||e.createdAt||"").slice(0,10);return`
      <div class="eco-app-card" style="border:1px solid #ddd;border-radius:8px;margin-bottom:1rem;overflow:hidden;">
        <div class="eco-app-header" style="display:flex;justify-content:space-between;align-items:center;padding:1rem;background:#fafafa;">
          <div>
            <strong style="font-size:1rem;">${e.organizationName||"(ไม่ระบุชื่อองค์กร)"}</strong>
            <div style="font-size:0.85rem;color:#666;margin-top:2px;">${e.userFullName||e.userEmail||""} · ยื่น ${a}</div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span class="status-badge status-${e.status}">${t[e.status]||e.status}</span>
            <button type="button" class="btn btn-sm btn-outline btn-expand-app" data-app-id="${e.id}">จัดการเอกสาร ▼</button>
          </div>
        </div>
        <div id="detail-${e.id}" style="display:none;padding:1rem;border-top:1px solid #eee;"></div>
      </div>
    `}_bindExpandButtons(){document.querySelectorAll(".btn-expand-app").forEach(e=>{e.addEventListener("click",async t=>{const a=t.currentTarget.dataset.appId,s=document.getElementById(`detail-${a}`);if(s){if(s.style.display!=="none"){s.style.display="none",t.currentTarget.textContent="จัดการเอกสาร ▼";return}s.style.display="block",s.innerHTML='<p style="color:#999">กำลังโหลด...</p>',t.currentTarget.textContent="ย่อ ▲";try{const l=((await h.getApplication(a)).fileUploads||[]).filter(o=>o.purpose==="checklist_doc");s.innerHTML=this._detailHtml(a,l),this._bindDetailEvents(a)}catch(n){s.innerHTML=`<p style="color:#c00">โหลดไม่สำเร็จ: ${n.message}</p>`}}})})}_detailHtml(e,t){const a=(s,n,l)=>`
      <div style="margin-bottom:1.25rem;">
        <h4 style="font-size:0.95rem;font-weight:600;color:${l};margin:0 0 0.75rem;">${n}</h4>
        ${s.map(o=>{const c=t.filter(m=>m.itemNo===o.itemNo),r=o.required?'<span class="badge badge-required">บังคับ</span>':'<span class="badge badge-optional">เสริม</span>',p=c.length===0?'<span style="color:#aaa;font-size:0.85rem">ยังไม่มีไฟล์</span>':c.map(m=>this._fileRowHtml(m,e)).join("");return`
            <div class="eco-doc-item" style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:0.75rem;margin-bottom:0.5rem;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
                <span style="font-size:0.9rem;">${o.itemNo}. ${o.label}</span>
                ${r}
              </div>
              <div id="files-${e}-${o.itemNo}" style="margin-bottom:0.5rem;">
                ${p}
              </div>
              <label class="btn btn-sm btn-outline" style="cursor:pointer;display:inline-flex;align-items:center;gap:0.35rem;">
                <span class="upload-label-text">+ อัปโหลด</span>
                <input type="file" class="upload-cd-input" data-item-no="${o.itemNo}" data-app-id="${e}" style="display:none">
              </label>
            </div>
          `}).join("")}
      </div>
    `;return`
      <div>
        ${a(Xe,"🟠 กลุ่ม C — เอกสารการตรวจประเมิน","#c2440a")}
        ${a(Ve,"🔴 กลุ่ม D — เอกสารรับรองจากผู้ตรวจ","#991b1b")}
      </div>
    `}_fileRowHtml(e,t){return`
      <div class="doc-file-row" id="frow-${e.id}" style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;">
        <span style="font-size:0.85rem;">📄 ${e.fileName}</span>
        <button type="button" class="btn-remove-cd" data-upload-id="${e.id}" data-app-id="${t}"
          style="font-size:0.75rem;padding:1px 6px;background:none;border:1px solid #f87171;color:#ef4444;border-radius:4px;cursor:pointer;">× ลบ</button>
      </div>
    `}_bindDetailEvents(e){document.querySelectorAll(`.upload-cd-input[data-app-id="${e}"]`).forEach(t=>{t.addEventListener("change",async a=>{const s=a.target.files[0];if(!s)return;const n=parseInt(a.target.dataset.itemNo),l=a.target.closest("label").querySelector(".upload-label-text");l.textContent="กำลังอัปโหลด...",a.target.disabled=!0;try{const o=await h.uploadChecklistDoc(e,n,s);if(o!=null&&o.id){const c=document.getElementById(`files-${e}-${n}`);if(c){const r=c.querySelector('span[style*="color:#aaa"]');r&&r.remove();const p=document.createElement("div");p.className="doc-file-row",p.id=`frow-${o.id}`,p.style.cssText="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;",p.innerHTML=`
                <span style="font-size:0.85rem;">📄 ${s.name}</span>
                <button type="button" class="btn-remove-cd" data-upload-id="${o.id}" data-app-id="${e}"
                  style="font-size:0.75rem;padding:1px 6px;background:none;border:1px solid #f87171;color:#ef4444;border-radius:4px;cursor:pointer;">× ลบ</button>
              `,c.appendChild(p),p.querySelector(".btn-remove-cd").addEventListener("click",()=>{this._deleteUpload(o.id,e)})}}}catch(o){alert("อัปโหลดไม่สำเร็จ: "+o.message)}l.textContent="+ อัปโหลด",a.target.disabled=!1,a.target.value=""})}),document.querySelectorAll(`.btn-remove-cd[data-app-id="${e}"]`).forEach(t=>{t.addEventListener("click",a=>{const s=a.currentTarget.dataset.uploadId;this._deleteUpload(s,e)})})}async _deleteUpload(e,t){var a;if(confirm("ต้องการลบไฟล์นี้?"))try{await h.deleteUpload(t,e),(a=document.getElementById(`frow-${e}`))==null||a.remove()}catch(s){alert("ลบไม่สำเร็จ: "+s.message)}}unmount(){}}class Ke{constructor({router:e}){this.router=e,this.user=null,this.certificates=[]}render(){return`
      <div class="profile-page">
        <div class="form-card" style="max-width:680px; margin:32px auto;">
          <div class="form-header">
            <h2 class="form-title">ข้อมูลส่วนตัว</h2>
            <p class="form-subtitle">แก้ไขข้อมูลโปรไฟล์ของคุณ</p>
          </div>

          <div id="profile-alert" class="alert" style="display:none"></div>
          <div id="profile-loading" style="text-align:center; padding:40px; color:var(--color-text-muted)">
            กำลังโหลดข้อมูล...
          </div>
          <div id="profile-form-wrap" style="display:none">
            <form id="profile-form">
              <!-- ── ข้อมูลบัญชี (read-only) ── -->
              <div class="form-section">
                <h3 class="section-title">ข้อมูลบัญชี</h3>
                <div class="form-group">
                  <label class="form-label">อีเมล</label>
                  <input type="text" id="p-email" class="form-input" disabled />
                </div>
                <div class="form-group">
                  <label class="form-label">ประเภทผู้ใช้</label>
                  <input type="text" id="p-role" class="form-input" disabled />
                </div>
              </div>

              <!-- ── ข้อมูลส่วนตัว (แก้ไขได้) ── -->
              <div class="form-section">
                <h3 class="section-title">ข้อมูลส่วนตัว</h3>
                <div class="form-group">
                  <label class="form-label">ชื่อ-นามสกุล <span class="required">*</span></label>
                  <input type="text" id="p-fullname" class="form-input" required />
                </div>
                <div class="form-group">
                  <label class="form-label">หน่วยงาน / บริษัท</label>
                  <input type="text" id="p-organization" class="form-input" />
                </div>
                <div class="form-group">
                  <label class="form-label">เบอร์โทรศัพท์</label>
                  <input type="tel" id="p-phone" class="form-input" />
                </div>
              </div>

              <!-- ── ฟิลด์เฉพาะ Factory ── -->
              <div id="p-factory-fields" style="display:none">
                <div class="form-section">
                  <h3 class="section-title">ข้อมูลติดต่อ</h3>
                  <div class="form-group">
                    <label class="form-label">ตำแหน่ง</label>
                    <input type="text" id="p-position" class="form-input" />
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">หมายเลขภายใน</label>
                      <input type="text" id="p-ext" class="form-input" placeholder="ต่อ XXXX" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">โทรสาร (Fax)</label>
                      <input type="tel" id="p-fax" class="form-input" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">เบอร์มือถือ</label>
                    <input type="tel" id="p-mobile" class="form-input" />
                  </div>
                </div>
              </div>

              <!-- ── ฟิลด์เฉพาะ Auditor ── -->
              <div id="p-auditor-fields" style="display:none">
                <div class="form-section">
                  <h3 class="section-title">ข้อมูลผู้ตรวจประเมิน</h3>
                  <div class="form-group">
                    <label class="form-label">วุฒิการศึกษา</label>
                    <input type="text" id="p-education" class="form-input" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">ใบ Certificate ผู้ตรวจประเมิน</label>
                    <div id="p-cert-list" class="cert-list"></div>
                    <div style="margin-top:8px; display:flex; align-items:center; gap:8px;">
                      <input type="file" id="p-cert-file" class="form-input" style="flex:1"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                      <button type="button" class="btn btn-secondary" id="p-cert-upload-btn">อัปโหลด</button>
                    </div>
                    <small class="form-hint">รองรับ PDF, JPG, PNG, DOC</small>
                  </div>
                </div>
              </div>

              <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:24px;">
                <a href="#dashboard" class="btn btn-secondary">ยกเลิก</a>
                <button type="submit" class="btn btn-primary" id="p-save-btn">บันทึกข้อมูล</button>
              </div>
            </form>

            <!-- ── เปลี่ยนรหัสผ่าน ── -->
            <div class="form-section" style="margin-top:32px; border-top:1px solid var(--color-border); padding-top:24px;">
              <h3 class="section-title">เปลี่ยนรหัสผ่าน</h3>
              <div id="cp-alert" class="alert" style="display:none"></div>
              <div class="form-group">
                <label class="form-label">รหัสผ่านปัจจุบัน</label>
                <div style="position:relative">
                  <input type="password" id="cp-current" class="form-input" placeholder="รหัสผ่านปัจจุบัน" style="padding-right:40px" />
                  <button type="button" class="cp-eye-btn" data-target="cp-current" aria-label="แสดง/ซ่อน" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0;color:var(--color-text-muted);line-height:1">
                    <svg class="cp-eye-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">รหัสผ่านใหม่</label>
                <div style="position:relative">
                  <input type="password" id="cp-new" class="form-input" placeholder="อย่างน้อย 8 ตัวอักษร" style="padding-right:40px" />
                  <button type="button" class="cp-eye-btn" data-target="cp-new" aria-label="แสดง/ซ่อน" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0;color:var(--color-text-muted);line-height:1">
                    <svg class="cp-eye-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
                <input type="password" id="cp-confirm" class="form-input" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง" />
              </div>
              <div style="display:flex; justify-content:flex-end; margin-top:8px;">
                <button type="button" class="btn btn-primary" id="cp-save-btn">เปลี่ยนรหัสผ่าน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}async mount(){var e;try{[this.user,this.certificates]=await Promise.all([h.getMe(),h.listCertificates().catch(()=>[])]),this._fill()}catch(t){this._showAlert("error","ไม่สามารถโหลดข้อมูลได้: "+t.message)}finally{document.getElementById("profile-loading").style.display="none",document.getElementById("profile-form-wrap").style.display=""}document.getElementById("profile-form").addEventListener("submit",t=>{t.preventDefault(),this._save()}),(e=document.getElementById("p-cert-upload-btn"))==null||e.addEventListener("click",()=>{this._uploadCert()}),document.querySelectorAll(".cp-eye-btn").forEach(t=>{t.addEventListener("click",()=>{const a=document.getElementById(t.dataset.target),s=a.type==="password";a.type=s?"text":"password",t.querySelector(".cp-eye-svg").innerHTML=s?'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>':'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'})}),document.getElementById("cp-save-btn").addEventListener("click",()=>this._changePassword())}_fill(){const e=this.user,t=e.role;document.getElementById("p-email").value=e.email||"",document.getElementById("p-role").value=t==="auditor"?"ผู้ตรวจประเมิน (Auditor)":t==="admin"?"ผู้ดูแลระบบ":"โรงงาน (ผู้ขอรับรอง)",document.getElementById("p-fullname").value=e.fullName||"",document.getElementById("p-organization").value=e.organization||"",document.getElementById("p-phone").value=e.phone||"",t==="factory"&&(document.getElementById("p-factory-fields").style.display="",document.getElementById("p-position").value=e.position||"",document.getElementById("p-ext").value=e.extNumber||"",document.getElementById("p-fax").value=e.fax||"",document.getElementById("p-mobile").value=e.mobile||""),t==="auditor"&&(document.getElementById("p-auditor-fields").style.display="",document.getElementById("p-education").value=e.education||"",this._renderCertList())}_renderCertList(){const e=document.getElementById("p-cert-list");if(e){if(!this.certificates.length){e.innerHTML='<p style="color:var(--color-text-muted); font-size:13px">ยังไม่มีใบ Certificate</p>';return}e.innerHTML=this.certificates.map(t=>`
      <div class="cert-item" style="display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px solid var(--color-border);">
        <span style="font-size:18px">📄</span>
        <span style="flex:1; font-size:13px">${t.fileName}</span>
        <span style="font-size:11px; color:var(--color-text-muted)">${new Date(t.uploadedAt).toLocaleDateString("th-TH")}</span>
      </div>
    `).join("")}}async _save(){var s;const e=document.getElementById("p-save-btn");e.disabled=!0,e.textContent="กำลังบันทึก...",this._showAlert("","");const t={fullName:document.getElementById("p-fullname").value.trim(),organization:document.getElementById("p-organization").value.trim(),phone:document.getElementById("p-phone").value.trim()},a=(s=this.user)==null?void 0:s.role;a==="factory"&&(t.position=document.getElementById("p-position").value.trim(),t.extNumber=document.getElementById("p-ext").value.trim(),t.fax=document.getElementById("p-fax").value.trim(),t.mobile=document.getElementById("p-mobile").value.trim()),a==="auditor"&&(t.education=document.getElementById("p-education").value.trim());try{const n=await h.updateProfile(t);d.set("auth.fullName",n.fullName),this._showAlert("success","บันทึกข้อมูลเรียบร้อยแล้ว")}catch(n){this._showAlert("error","บันทึกไม่สำเร็จ: "+n.message.replace(/^\d+: /,""))}finally{e.disabled=!1,e.textContent="บันทึกข้อมูล"}}async _uploadCert(){const e=document.getElementById("p-cert-file"),t=document.getElementById("p-cert-upload-btn");if(e.files.length){t.disabled=!0,t.textContent="กำลังอัปโหลด...";try{const a=await h.uploadCertificate(e.files[0]);this.certificates.unshift(a),this._renderCertList(),e.value="",this._showAlert("success","อัปโหลดใบ Certificate เรียบร้อยแล้ว")}catch(a){this._showAlert("error","อัปโหลดไม่สำเร็จ: "+a.message.replace(/^\d+: /,""))}finally{t.disabled=!1,t.textContent="อัปโหลด"}}}async _changePassword(){const e=document.getElementById("cp-current").value,t=document.getElementById("cp-new").value,a=document.getElementById("cp-confirm").value,s=document.getElementById("cp-save-btn"),n=document.getElementById("cp-alert");if(n.style.display="none",!e||!t||!a){n.className="alert alert-error",n.textContent="กรุณากรอกข้อมูลให้ครบทุกช่อง",n.style.display="block";return}if(t.length<8){n.className="alert alert-error",n.textContent="รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร",n.style.display="block";return}if(t!==a){n.className="alert alert-error",n.textContent="รหัสผ่านใหม่ไม่ตรงกัน กรุณากรอกใหม่",n.style.display="block";return}s.disabled=!0,s.textContent="กำลังบันทึก...";try{await h.changePassword(e,t),n.className="alert alert-success",n.textContent="เปลี่ยนรหัสผ่านเรียบร้อยแล้ว",n.style.display="block",document.getElementById("cp-current").value="",document.getElementById("cp-new").value="",document.getElementById("cp-confirm").value=""}catch(l){const o=l.message.replace(/^\d+: /,"");let c=o;try{c=JSON.parse(o).message||o}catch{}n.className="alert alert-error",n.textContent=c||"เปลี่ยนรหัสผ่านไม่สำเร็จ",n.style.display="block"}finally{s.disabled=!1,s.textContent="เปลี่ยนรหัสผ่าน"}}_showAlert(e,t){const a=document.getElementById("profile-alert");if(a){if(!t){a.style.display="none";return}a.className=`alert alert-${e}`,a.textContent=t,a.style.display="block",a.scrollIntoView({behavior:"smooth",block:"nearest"})}}unmount(){}}const Je={draft:{text:"ร่างงาน",cls:"badge-gray"},submitted:{text:"ส่งแล้ว",cls:"badge-blue"}};class Ze{constructor({router:e}){this.router=e,this._items=[]}render(){return`
      <div class="step-panel">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h2 class="step-title" style="margin:0">♻️ EF-WP Self Audit — ประเมินตนเองโรงงาน Waste Processor</h2>
          <button class="btn btn-primary" id="wp-new-btn">+ เริ่มประเมินใหม่</button>
        </div>
        <div id="wp-list-content">
          <div class="form-card" style="text-align:center;padding:30px;color:var(--color-text-muted)">
            กำลังโหลด...
          </div>
        </div>
      </div>`}mount(){document.getElementById("wp-new-btn").addEventListener("click",()=>this._createNew()),this._loadList()}unmount(){}async _createNew(){try{const{id:e}=await h.createWpAudit();d.set("wpAuditId",e),this.router.navigateTo("ef-wp/step/1")}catch(e){document.getElementById("wp-list-content").innerHTML=`<p class="error">สร้างไม่สำเร็จ: ${e.message}</p>`}}async _loadList(){try{this._items=await h.listWpAudits(),this._renderList()}catch(e){document.getElementById("wp-list-content").innerHTML=`<div class="form-card" style="text-align:center;padding:30px;color:var(--color-error)">
          โหลดข้อมูลไม่สำเร็จ: ${e.message}
         </div>`}}_renderList(){const e=document.getElementById("wp-list-content");if(!e)return;if(!this._items.length){e.innerHTML=`
        <div class="wp-empty">
          <div class="wp-empty-icon">♻️</div>
          <div class="wp-empty-text">ยังไม่มีรายการประเมิน</div>
          <div class="wp-empty-sub">กดปุ่ม "เริ่มประเมินใหม่" เพื่อเริ่มต้น</div>
        </div>`;return}const t=this._items.map(a=>{const s=Je[a.status]||{text:a.status,cls:"badge-gray"};return`
        <tr>
          <td>${a.created_at?new Date(a.created_at).toLocaleDateString("th-TH"):""}</td>
          <td>${a.company_name||"—"}</td>
          <td><span class="${s.cls}">${s.text}</span></td>
          <td>ขั้นตอนที่ ${a.current_step||1} / 6</td>
          <td>
            <button class="btn btn-secondary btn-sm wp-continue" data-id="${a.id}">
              ${a.status==="draft"?"ทำต่อ":"ดูรายงาน"}
            </button>
            ${a.status==="submitted"?`<button class="btn btn-secondary btn-sm wp-pdf" data-id="${a.id}" data-name="${a.company_name||"audit"}" style="margin-left:4px">PDF</button>`:""}
          </td>
        </tr>`}).join("");e.innerHTML=`
      <table class="wp-data-table">
        <thead>
          <tr>
            <th>วันที่สร้าง</th><th>บริษัท</th><th>สถานะ</th><th>ขั้นตอน</th><th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>${t}</tbody>
      </table>`,e.querySelectorAll(".wp-continue").forEach(a=>{a.addEventListener("click",()=>{d.set("wpAuditId",a.dataset.id),this._hydrateAndNavigate(a.dataset.id)})}),e.querySelectorAll(".wp-pdf").forEach(a=>{a.addEventListener("click",()=>h.downloadWpPDF(a.dataset.id,a.dataset.name))})}async _hydrateAndNavigate(e){var t;try{const a=await h.getWpAudit(e);this._hydrateStore(a);const s=((t=a.audit)==null?void 0:t.current_step)||1;this.router.navigateTo(`ef-wp/step/${s}`)}catch(a){document.getElementById("wp-list-content").innerHTML=`<p class="error">โหลดข้อมูลไม่สำเร็จ: ${a.message}</p>`}}_hydrateStore(e){var t;if(e.companyInfo&&d.setStep("wpStep1",{companyName:e.companyInfo.company_name||"",factoryRegNo:e.companyInfo.factory_reg_no||"",industryType:e.companyInfo.industry_type||"",address:e.companyInfo.address||"",mainService:e.companyInfo.main_service||"",fixedAssets:e.companyInfo.fixed_assets,annualRevenue:e.companyInfo.annual_revenue,companySize:e.companyInfo.company_size||"",permanentEmployees:e.companyInfo.permanent_employees,outsourceEmployees:e.companyInfo.outsource_employees,workingHoursPerShift:e.companyInfo.working_hours_per_shift,assessmentDate:e.companyInfo.assessment_date||"",followupStart:e.companyInfo.followup_start||"",followupEnd:e.companyInfo.followup_end||"",productionData:e.companyInfo.production_data||[]}),e.generalReqs){const a=e.generalReqs;d.setStep("wpStep2",{m2a:{legalCompliance:a.m2a_legal_compliance,legalDoc:a.m2a_legal_doc||"",envSystems:a.m2a_env_systems||{},noComplaints:a.m2a_no_complaints,govtPrograms:a.m2a_govt_programs||"",govtDoc:a.m2a_govt_doc||""},m2b:{b1LawCompliance:a.m2b_b1_law_compliance,b1BestPractices:a.m2b_b1_best_practices,b2OverallScore:a.m2b_b2_overall_score,b2MainStepScore:a.m2b_b2_main_step_score,b3Level:a.m2b_b3_level||"",b3CertDate:a.m2b_b3_cert_date||""}})}if((t=e.specific)!=null&&t.items&&d.setStep("wpStep3",{items:e.specific.items}),e.standard){const a=e.standard;d.setStep("wpStep4",{m4Intake:a.m4_intake_checks||{},m4Process:a.m4_process_checks||{},m4Reporting:a.m4_reporting_checks||{},m5SelectedIssues:a.m5_selected_issues||[],m5EcoEfficiency:a.m5_eco_efficiency||{rows:[],eeiIndex:{}},m5CommunityProjects:a.m5_community_projects||[]})}e.summary&&d.setStep("wpStep6",{summary:e.summary})}}function oe(i){if(!i&&i!==0)return"";const e=parseFloat(i);return e<=100?"ขนาดย่อม":e<=500?"ขนาดกลาง":"ขนาดใหญ่"}function Qe(i){if(!i&&i!==0)return"";const e=parseFloat(i);return e<=100?"small":e<=500?"medium":"large"}function I(i,e,t="text",a="",s=""){return`
    <div class="form-field">
      <label class="form-label" for="${i}">${e}</label>
      <input id="${i}" type="${t}" class="form-input" value="${a}" ${s} />
    </div>`}function re(i,e){return`
    <tr>
      <td><input class="form-input prod-input" style="min-width:120px" data-idx="${e}" data-field="service" value="${i.service||""}" /></td>
      <td><input class="form-input prod-input" style="width:80px" data-idx="${e}" data-field="unit" value="${i.unit||""}" /></td>
      <td><input class="form-input prod-input" style="width:90px;text-align:right" data-idx="${e}" data-field="yr1" value="${i.yr1||""}" /></td>
      <td><input class="form-input prod-input" style="width:90px;text-align:right" data-idx="${e}" data-field="yr2" value="${i.yr2||""}" /></td>
      <td><input class="form-input prod-input" style="width:90px;text-align:right" data-idx="${e}" data-field="yr3" value="${i.yr3||""}" /></td>
      <td><button class="btn btn-xs btn-danger btn-del-row" data-idx="${e}">ลบ</button></td>
    </tr>`}class et{constructor({router:e}){this.router=e}render(){const e=d.get("wpStep1")||{},t=oe(e.annualRevenue),a=(e.productionData||[]).map((s,n)=>re(s,n)).join("");return`
      <div class="step-panel">
        <h2 class="step-title">M1 — ข้อมูลองค์กร</h2>
        <p class="step-hint">กรอกข้อมูลพื้นฐานของโรงงาน — ขนาดสถานประกอบการคำนวณอัตโนมัติจากรายได้</p>

        <!-- Company identity -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>ข้อมูลองค์กร</legend>
            <div class="form-row cols-2">
              ${I("wp1-company-name","ชื่อบริษัท / โรงงาน *","text",e.companyName||"")}
              ${I("wp1-factory-reg","เลขทะเบียนโรงงาน *","text",e.factoryRegNo||"")}
            </div>
            <div class="form-row cols-2">
              <div class="form-field">
                <label class="form-label" for="wp1-industry">ประเภทอุตสาหกรรม</label>
                <select id="wp1-industry" class="form-input">
                  ${["101","105","106","อื่นๆ"].map(s=>`<option value="${s}" ${e.industryType===s?"selected":""}>${s}</option>`).join("")}
                </select>
              </div>
              ${I("wp1-main-service","ผลิตภัณฑ์หลัก / บริการหลัก","text",e.mainService||"")}
            </div>
            ${I("wp1-address","ที่อยู่ / นิคมอุตสาหกรรม","text",e.address||"")}
          </fieldset>
        </div>

        <!-- Financial & size -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>ขนาดสถานประกอบการ</legend>
            <div class="form-row cols-3">
              ${I("wp1-fixed-assets","มูลค่าสินทรัพย์ถาวร (ล้านบาท)","number",e.fixedAssets??"")}
              ${I("wp1-revenue","รายได้รวมต่อปี (ล้านบาท) *","number",e.annualRevenue??"")}
              <div class="form-field">
                <label class="form-label">ขนาดสถานประกอบการ (คำนวณอัตโนมัติ)</label>
                <input id="wp1-size-display" class="form-input" value="${t}"
                  readonly style="background:var(--color-primary-pale);font-weight:700;color:var(--color-primary-dark)" />
              </div>
            </div>
            <div class="form-row cols-3">
              ${I("wp1-perm-emp","พนักงานประจำ (คน)","number",e.permanentEmployees??"")}
              ${I("wp1-out-emp","พนักงาน Outsource (คน)","number",e.outsourceEmployees??"")}
              ${I("wp1-work-hours","ชั่วโมงทำงาน / กะ","number",e.workingHoursPerShift??"")}
            </div>
          </fieldset>
        </div>

        <!-- Assessment dates -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>วันที่ตรวจประเมิน</legend>
            <div class="form-row cols-3">
              ${I("wp1-assess-date","วันที่ตรวจประเมิน *","date",e.assessmentDate||"")}
              ${I("wp1-followup-start","ติดตามผลตั้งแต่","date",e.followupStart||"")}
              ${I("wp1-followup-end","ถึงวันที่","date",e.followupEnd||"")}
            </div>
          </fieldset>
        </div>

        <!-- Production data -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>ข้อมูลการผลิต / ให้บริการ (3 ปีย้อนหลัง)</legend>
            <div style="overflow-x:auto">
              <table class="info-table" id="wp1-prod-table">
                <thead>
                  <tr>
                    <th>ชื่อบริการ / ผลิตภัณฑ์</th><th>หน่วย</th>
                    <th>ปี 1</th><th>ปี 2</th><th>ปี 3</th><th></th>
                  </tr>
                </thead>
                <tbody>${a}</tbody>
              </table>
            </div>
            <button id="wp1-add-row" class="btn btn-secondary btn-sm" style="margin-top:10px">+ เพิ่มแถว</button>
          </fieldset>
        </div>

        <!-- File uploads -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>เอกสารแนบ</legend>
            <div class="form-row cols-3">
              <div class="form-field">
                <label class="form-label">โครงสร้างองค์กร</label>
                <input type="file" id="wp1-org-chart" class="form-input" accept=".jpg,.jpeg,.png,.pdf" style="padding:6px" />
              </div>
              <div class="form-field">
                <label class="form-label">แผนผังโรงงาน</label>
                <input type="file" id="wp1-factory-map" class="form-input" accept=".jpg,.jpeg,.png,.pdf" style="padding:6px" />
              </div>
              <div class="form-field">
                <label class="form-label">แผนผังกระบวนการ</label>
                <input type="file" id="wp1-process-map" class="form-input" accept=".jpg,.jpeg,.png,.pdf" style="padding:6px" />
              </div>
            </div>
          </fieldset>
        </div>

        <div id="wp1-err" class="error-msg" style="margin-bottom:8px"></div>
        <div class="form-navigation">
          <span></span>
          <button id="wp1-next" class="btn btn-primary">ถัดไป →</button>
        </div>
      </div>`}_readForm(){const e=a=>document.getElementById(a),t=[];return document.querySelectorAll("#wp1-prod-table tbody tr").forEach(a=>{const s=a.querySelectorAll(".prod-input");s.length===5&&t.push({service:s[0].value,unit:s[1].value,yr1:s[2].value,yr2:s[3].value,yr3:s[4].value})}),{companyName:e("wp1-company-name").value.trim(),factoryRegNo:e("wp1-factory-reg").value.trim(),industryType:e("wp1-industry").value,address:e("wp1-address").value.trim(),mainService:e("wp1-main-service").value.trim(),fixedAssets:e("wp1-fixed-assets").value?parseFloat(e("wp1-fixed-assets").value):null,annualRevenue:e("wp1-revenue").value?parseFloat(e("wp1-revenue").value):null,companySize:Qe(e("wp1-revenue").value),permanentEmployees:e("wp1-perm-emp").value?parseInt(e("wp1-perm-emp").value):null,outsourceEmployees:e("wp1-out-emp").value?parseInt(e("wp1-out-emp").value):null,workingHoursPerShift:e("wp1-work-hours").value?parseFloat(e("wp1-work-hours").value):null,assessmentDate:e("wp1-assess-date").value||null,followupStart:e("wp1-followup-start").value||null,followupEnd:e("wp1-followup-end").value||null,productionData:t}}mount(){document.getElementById("wp1-revenue").addEventListener("input",e=>{document.getElementById("wp1-size-display").value=oe(e.target.value)}),document.getElementById("wp1-add-row").addEventListener("click",()=>{const e=document.querySelector("#wp1-prod-table tbody"),t=e.querySelectorAll("tr").length,a=document.createElement("tr");a.innerHTML=re({service:"",unit:"",yr1:"",yr2:"",yr3:""},t),e.appendChild(a)}),document.querySelector("#wp1-prod-table").addEventListener("click",e=>{e.target.classList.contains("btn-del-row")&&e.target.closest("tr").remove()}),document.getElementById("wp1-next").addEventListener("click",async()=>{var n,l;const e=this._readForm(),t=document.getElementById("wp1-err"),a=[];if(e.companyName||a.push("กรุณากรอกชื่อบริษัท"),e.annualRevenue===null&&a.push("กรุณากรอกรายได้รวมต่อปี"),e.assessmentDate||a.push("กรุณาระบุวันที่ตรวจประเมิน"),a.length){t.textContent=a.join(" | ");return}t.textContent="",d.setStep("wpStep1",e);const s=d.get("wpAuditId");try{const o=await h.saveWpStep(s,1,e);o!=null&&o.companySize&&d.set("wpStep1.companySize",o.companySize);for(const[c,r]of[["wp1-org-chart","org_chart"],["wp1-factory-map","factory_map"],["wp1-process-map","process_map"]]){const p=(l=(n=document.getElementById(c))==null?void 0:n.files)==null?void 0:l[0];p&&await h.uploadWpFile(s,r,p)}this.router.navigateTo("ef-wp/step/2")}catch(o){t.textContent=o.message}})}unmount(){}}class tt{constructor({router:e}){this.router=e}render(){const e=d.get("wpStep2")||{},t=e.m2a||{},a=e.m2b||{},s=t.envSystems||{},n=d.get("wpStep1.companySize")||"",l=n==="large"?[{key:"iso14001",label:"ISO 14001"},{key:"gi3",label:"อุตสาหกรรมสีเขียว ระดับ 3 (GI3)"}]:[{key:"iso14001",label:"ISO 14001"},{key:"gi3",label:"อุตสาหกรรมสีเขียว ระดับ 3 (GI3)"},{key:"gi2",label:"อุตสาหกรรมสีเขียว ระดับ 2 (GI2)"},{key:"greenFlag",label:"ธงขาวดาวเขียว"},{key:"policyProgram",label:"มีนโยบาย + โครงการสิ่งแวดล้อม"}],o=(m,v,g)=>`
      <div class="wp-pf-row">
        <span class="wp-pf-label">${v}</span>
        <div class="wp-pf-options">
          <label class="wp-pf-opt wp-pf-pass">
            <input type="radio" name="${m}" value="true" ${g===!0?"checked":""} /> ผ่าน ✅
          </label>
          <label class="wp-pf-opt wp-pf-fail">
            <input type="radio" name="${m}" value="false" ${g===!1?"checked":""} /> ไม่ผ่าน ❌
          </label>
        </div>
      </div>`,c=a.b2OverallScore!=null&&a.b2OverallScore<80?'<span class="warn-text">⚠ ต้องได้ ≥ 80%</span>':"",r=a.b2MainStepScore!=null&&a.b2MainStepScore<80?'<span class="warn-text">⚠ ต้องได้ ≥ 80%</span>':"";let p="";return a.b3CertDate&&(new Date-new Date(a.b3CertDate))/31536e6>1&&(p='<span class="warn-text">⚠ ใบรับรองอาจหมดอายุแล้ว (เกิน 1 ปี)</span>'),`
      <div class="step-panel">
        <h2 class="step-title">M2 — ข้อกำหนดทั่วไป</h2>
        <p class="step-hint">ทุกข้อต้องผ่านเพื่อให้ M2 ผ่าน — M2A (Eco Factory) และ M2B (WP เฉพาะ)</p>

        <!-- M2A -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>M2A — ข้อกำหนดทั่วไป Eco Factory</legend>

            ${o("m2a-legal","1. ปฏิบัติตามกฎหมายสิ่งแวดล้อม / พลังงาน / อาชีวอนามัย",t.legalCompliance)}
            <div class="form-field" style="margin:4px 0 12px 16px">
              <label class="form-label" for="m2a-legal-doc">เอกสารอ้างอิง</label>
              <input id="m2a-legal-doc" class="form-input" value="${t.legalDoc||""}" />
            </div>

            <div class="wp-pf-row">
              <span class="wp-pf-label">
                2. ระบบจัดการสิ่งแวดล้อม
                ${n?`<small style="color:var(--color-text-muted)">(${n==="large"?"ขนาดใหญ่: ISO14001/GI3":"ขนาดย่อม/กลาง: ข้อใดข้อหนึ่ง"})</small>`:""}
              </span>
              <div class="checkbox-group" style="flex-direction:column;gap:6px;margin-top:0">
                ${l.map(m=>`
                  <label class="checkbox-option">
                    <input type="checkbox" id="env-${m.key}" ${s[m.key]?"checked":""} />
                    ${m.label}
                  </label>`).join("")}
              </div>
            </div>

            ${o("m2a-complaints","3. ไม่มีข้อร้องเรียน / อุบัติเหตุร้ายแรงภายนอก (1 ปี)",t.noComplaints)}

            <div class="wp-pf-row" style="align-items:flex-start;flex-direction:column;gap:6px">
              <span class="wp-pf-label">4. เข้าร่วมโครงการภาครัฐ (ย้อนหลัง 3 ปี)</span>
              <div class="form-row cols-2" style="width:100%">
                <div class="form-field" style="margin:0">
                  <label class="form-label">รายละเอียดโครงการ</label>
                  <input id="m2a-govt-programs" class="form-input" value="${t.govtPrograms||""}" />
                </div>
                <div class="form-field" style="margin:0">
                  <label class="form-label">เอกสารอ้างอิง</label>
                  <input id="m2a-govt-doc" class="form-input" value="${t.govtDoc||""}" />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <!-- M2B -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>M2B — ข้อกำหนดเฉพาะ Waste Processor (DIW)</legend>

            <div class="subsection-title">B1: การปฏิบัติตามกฎหมายจัดการกากอุตสาหกรรม</div>
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
              <label class="checkbox-option">
                <input type="checkbox" id="m2b-b1-law" ${a.b1LawCompliance?"checked":""} />
                ปฏิบัติตามกฎหมายเฉพาะโรงงานจัดการของเสีย (ประเภท 101 / 105 / 106)
              </label>
              <label class="checkbox-option">
                <input type="checkbox" id="m2b-b1-best" ${a.b1BestPractices?"checked":""} />
                ปฏิบัติตามเกณฑ์การปฏิบัติงานที่ดี (Best Practices)
              </label>
            </div>

            <div class="subsection-title">B2: ผลการประเมินตนเองตามมาตรฐาน DIW</div>
            <div class="form-row cols-2" style="margin-bottom:16px">
              <div class="form-field" style="margin:0">
                <label class="form-label">ผลประเมินการปฏิบัติงานรวม (%) ต้อง ≥ 80%</label>
                <div style="display:flex;align-items:center;gap:8px">
                  <input id="m2b-b2-overall" type="number" min="0" max="100" step="0.1"
                    class="form-input" style="width:100px"
                    value="${a.b2OverallScore??""}" />
                  ${c}
                </div>
              </div>
              <div class="form-field" style="margin:0">
                <label class="form-label">ผลประเมินขั้นตอนหลัก (%) ต้อง ≥ 80%</label>
                <div style="display:flex;align-items:center;gap:8px">
                  <input id="m2b-b2-main" type="number" min="0" max="100" step="0.1"
                    class="form-input" style="width:100px"
                    value="${a.b2MainStepScore??""}" />
                  ${r}
                </div>
              </div>
            </div>

            <div class="subsection-title">B3: ระดับการรับรองมาตรฐาน DIW</div>
            <div class="radio-options" style="margin-bottom:12px">
              ${[["bronze","เหรียญทองแดง"],["silver","เหรียญเงิน"],["gold","เหรียญทอง"]].map(([m,v])=>`
                <label class="radio-option">
                  <input type="radio" name="m2b-b3-level" value="${m}"
                    ${a.b3Level===m?"checked":""} />
                  ${v}
                </label>`).join("")}
            </div>
            <div class="form-row cols-2">
              <div class="form-field" style="margin:0">
                <label class="form-label">วันที่รับรอง ${p}</label>
                <input id="m2b-b3-date" type="date" class="form-input" value="${a.b3CertDate||""}" />
              </div>
              <div class="form-field" style="margin:0">
                <label class="form-label">ไฟล์ใบรับรอง</label>
                <input type="file" id="m2b-b3-file" class="form-input" style="padding:6px"
                  accept=".jpg,.jpeg,.png,.pdf" />
              </div>
            </div>
          </fieldset>
        </div>

        <div id="wp2-err" class="error-msg" style="margin-bottom:8px"></div>
        <div class="form-navigation">
          <button id="wp2-prev" class="btn btn-secondary">← ย้อนกลับ</button>
          <button id="wp2-next" class="btn btn-primary">ถัดไป →</button>
        </div>
      </div>`}_readForm(){var a,s,n,l,o,c,r,p,m,v,g,f,u,w;const e=x=>document.getElementById(x),t=x=>{const $=document.querySelector(`input[name="${x}"]:checked`);return $?$.value==="true":null};return{m2a:{legalCompliance:t("m2a-legal"),legalDoc:((a=e("m2a-legal-doc"))==null?void 0:a.value.trim())||"",envSystems:{iso14001:((s=e("env-iso14001"))==null?void 0:s.checked)||!1,gi3:((n=e("env-gi3"))==null?void 0:n.checked)||!1,gi2:((l=e("env-gi2"))==null?void 0:l.checked)||!1,greenFlag:((o=e("env-greenFlag"))==null?void 0:o.checked)||!1,policyProgram:((c=e("env-policyProgram"))==null?void 0:c.checked)||!1},noComplaints:t("m2a-complaints"),govtPrograms:((r=e("m2a-govt-programs"))==null?void 0:r.value.trim())||"",govtDoc:((p=e("m2a-govt-doc"))==null?void 0:p.value.trim())||""},m2b:{b1LawCompliance:((m=e("m2b-b1-law"))==null?void 0:m.checked)||!1,b1BestPractices:((v=e("m2b-b1-best"))==null?void 0:v.checked)||!1,b2OverallScore:(g=e("m2b-b2-overall"))!=null&&g.value?parseFloat(e("m2b-b2-overall").value):null,b2MainStepScore:(f=e("m2b-b2-main"))!=null&&f.value?parseFloat(e("m2b-b2-main").value):null,b3Level:((u=document.querySelector('input[name="m2b-b3-level"]:checked'))==null?void 0:u.value)||"",b3CertDate:((w=e("m2b-b3-date"))==null?void 0:w.value)||null}}}mount(){document.getElementById("wp2-prev").addEventListener("click",()=>this.router.navigateTo("ef-wp/step/1")),document.getElementById("wp2-next").addEventListener("click",async()=>{var n,l;const e=this._readForm(),t=document.getElementById("wp2-err"),a=[];if(e.m2a.legalCompliance===null&&a.push("M2A: กรุณาตอบข้อ 1 (กฎหมาย)"),e.m2a.noComplaints===null&&a.push("M2A: กรุณาตอบข้อ 3 (ข้อร้องเรียน)"),e.m2b.b3Level||a.push("M2B B3: กรุณาเลือกระดับการรับรอง DIW"),a.length){t.textContent=a.join(" | ");return}t.textContent="",d.setStep("wpStep2",e);const s=d.get("wpAuditId");try{await h.saveWpStep(s,2,{...e.m2a,...e.m2b});const o=(l=(n=document.getElementById("m2b-b3-file"))==null?void 0:n.files)==null?void 0:l[0];o&&await h.uploadWpFile(s,"b3_cert",o),this.router.navigateTo("ef-wp/step/3")}catch(o){t.textContent=o.message}})}unmount(){}}const at={"3.1":"วัตถุดิบที่รับเข้า = ของเสียจากภายนอก (Industrial Symbiosis)","3.2":"น้ำชะขยะ / น้ำเสียจากกระบวนการบำบัดของเสีย","3.3":"กลิ่น / ฝุ่น / ก๊าซจากกระบวนการกำจัดของเสีย","3.4":"Secondary waste จากกระบวนการจัดการของเสียเอง ⭐","3.5":"สารเคมีในกระบวนการบำบัด / ของเสียอันตราย","3.6":"ความเสี่ยงสูงจากการสัมผัสของเสียอันตราย","3.7":"กลิ่น / ผลกระทบต่อชุมชนใกล้เคียง"};function de(i){let e=0,t=0;for(const n of i)n.isNA||(t+=5,e+=n.score||0);const a=t>0?(e/t*100).toFixed(1):"0.0",s=i.filter(n=>!n.isNA).every(n=>(n.score||0)>=1);return{total:e,max:t,pct:a,allPass:s}}class st{constructor({router:e}){this.router=e}render(){const e=d.get("wpStep3.items")||[],{total:t,max:a,pct:s,allPass:n}=de(e);return`
      <div class="step-panel">
        <h2 class="step-title">M3 — ข้อกำหนดเฉพาะ (7 หัวข้อ)</h2>
        <p class="step-hint">คะแนน 1–5 ต่อหัวข้อ | N/A = ไม่เกี่ยวข้อง (ไม่นับในคะแนนรวม) | ทุกหัวข้อที่ไม่ N/A ต้องได้ ≥ 1 คะแนน</p>

        ${e.map((o,c)=>`
      <div class="wp-topic-card" id="topic-card-${c}">
        <div class="wp-topic-header">
          <span class="wp-topic-no">${o.topicNo}</span>
          <div>
            <div class="wp-topic-label">${o.label}</div>
            <div class="wp-topic-focus">${at[o.topicNo]||""}</div>
          </div>
        </div>
        <div class="wp-topic-body">
          <div class="form-row cols-2">
            <div class="form-field" style="margin:0">
              <label class="form-label">ผลดำเนินการ</label>
              <textarea rows="3" id="result-${c}" class="form-input" style="resize:vertical">${o.result||""}</textarea>
            </div>
            <div class="form-field" style="margin:0">
              <label class="form-label">เอกสารอ้างอิง</label>
              <textarea rows="3" id="docref-${c}" class="form-input" style="resize:vertical">${o.docRef||""}</textarea>
            </div>
          </div>
          <div class="wp-score-row">
            <span class="wp-score-label">คะแนน:</span>
            ${[1,2,3,4,5].map(r=>`
              <button class="wp-score-btn ${!o.isNA&&o.score===r?"active":""}"
                data-idx="${c}" data-score="${r}"
                ${o.isNA?"disabled":""}>${r}</button>`).join("")}
            <label class="wp-na-opt">
              <input type="checkbox" class="na-cb" data-idx="${c}"
                ${o.isNA?"checked":""} /> N/A
            </label>
          </div>
        </div>
      </div>`).join("")}

        <div class="wp-m3-summary">
          <div class="wp-m3-sum-item">
            <span class="wp-m3-sum-label">คะแนนรวม</span>
            <span class="wp-m3-sum-val" id="m3-total">${t}</span>
            <span class="wp-m3-sum-max"> / ${a}</span>
          </div>
          <div class="wp-m3-sum-item">
            <span class="wp-m3-sum-label">ร้อยละ</span>
            <span class="wp-m3-sum-val" id="m3-pct">${s}</span>
            <span class="wp-m3-sum-max">%</span>
          </div>
          <div style="margin-left:auto">
            <span id="m3-badge">${n?'<span class="wp-badge-pass">ผ่าน ✅</span>':'<span class="wp-badge-fail">ยังไม่ผ่าน ❌</span>'}</span>
          </div>
        </div>

        <div id="wp3-err" class="error-msg" style="margin-bottom:8px"></div>
        <div class="form-navigation">
          <button id="wp3-prev" class="btn btn-secondary">← ย้อนกลับ</button>
          <button id="wp3-next" class="btn btn-primary">ถัดไป →</button>
        </div>
      </div>`}_readItems(){return d.get("wpStep3.items").map((e,t)=>{var a,s;return{...e,result:((a=document.getElementById(`result-${t}`))==null?void 0:a.value)||"",docRef:((s=document.getElementById(`docref-${t}`))==null?void 0:s.value)||""}})}_updateSummary(e){const{total:t,pct:a,allPass:s}=de(e),n=l=>document.getElementById(l);n("m3-total")&&(n("m3-total").textContent=`${t}`),n("m3-pct")&&(n("m3-pct").textContent=`${a}`),n("m3-badge")&&(n("m3-badge").innerHTML=s?'<span class="wp-badge-pass">ผ่าน ✅</span>':'<span class="wp-badge-fail">ยังไม่ผ่าน ❌</span>')}mount(){document.addEventListener("click",e=>{if(!e.target.classList.contains("wp-score-btn"))return;const t=parseInt(e.target.dataset.idx),a=parseInt(e.target.dataset.score),s=d.get("wpStep3.items").map((n,l)=>l===t?{...n,score:a}:n);d.setStep("wpStep3",{items:s}),document.querySelectorAll(`.wp-score-btn[data-idx="${t}"]`).forEach(n=>{n.classList.toggle("active",parseInt(n.dataset.score)===a)}),this._updateSummary(s)}),document.addEventListener("change",e=>{if(!e.target.classList.contains("na-cb"))return;const t=parseInt(e.target.dataset.idx),a=e.target.checked,s=d.get("wpStep3.items").map((n,l)=>l===t?{...n,isNA:a,score:a?0:n.score}:n);d.setStep("wpStep3",{items:s}),document.querySelectorAll(`.wp-score-btn[data-idx="${t}"]`).forEach(n=>{n.disabled=a,a&&n.classList.remove("active")}),this._updateSummary(s)}),document.getElementById("wp3-prev").addEventListener("click",()=>this.router.navigateTo("ef-wp/step/2")),document.getElementById("wp3-next").addEventListener("click",async()=>{const e=this._readItems();d.setStep("wpStep3",{items:e});const t=document.getElementById("wp3-err"),a=e.filter(n=>!n.isNA&&(n.score||0)<1);if(a.length){t.textContent=`หัวข้อ ${a.map(n=>n.topicNo).join(", ")} ยังไม่มีคะแนน (ต้อง ≥ 1 หรือ N/A)`;return}t.textContent="";const s=d.get("wpAuditId");try{await h.saveWpStep(s,3,{items:e}),this.router.navigateTo("ef-wp/step/4")}catch(n){t.textContent=n.message}})}unmount(){}}function P(i){return i?'<span class="wp-badge-pass">ผ่าน ✅</span>':'<span class="wp-badge-fail">ยังไม่ผ่าน ❌</span>'}function C(i,e,t){return`
    <label class="wp-check-item">
      <input type="checkbox" id="${i}" ${t?"checked":""} />
      ${e}
    </label>`}class nt{constructor({router:e}){this.router=e}render(){const e=d.get("wpStep4")||{},t=e.m4Intake||{},a=e.m4Process||{},s=e.m4Reporting||{},n=t.verify&&t.manifest&&t.quarantine,l=a.sorting&&a.treatment&&a.disposal&&a.chainOfCustody,o=s.diwReport&&s.disclosure;return`
      <div class="step-panel">
        <h2 class="step-title">M4 — มาตรฐาน WP (Waste Processor Standard)</h2>
        <p class="step-hint">ทุกข้อใน 3 หมวดต้องผ่านเพื่อให้ M4 ผ่าน</p>

        <!-- 4.1 Intake -->
        <div class="form-card">
          <fieldset class="form-section">
            <div class="section-header-row">
              <legend>4.1 การรับของเสีย (Waste Intake)</legend>
              <span id="badge-intake">${P(n)}</span>
            </div>
            ${C("m4-verify","1. มีการตรวจสอบของเสียก่อนรับเข้า (Incoming Inspection)",t.verify)}
            ${C("m4-manifest","2. มีใบกำกับการขนส่ง / Manifest ครบถ้วน",t.manifest)}
            ${C("m4-quarantine","3. มีพื้นที่กักกัน / Quarantine ก่อนนำเข้ากระบวนการ",t.quarantine)}
            <div class="form-field" style="margin-top:10px">
              <label class="form-label">เอกสารอ้างอิง</label>
              <textarea rows="2" id="m4-intake-docref" class="form-input" style="resize:vertical">${t.docRef||""}</textarea>
            </div>
          </fieldset>
        </div>

        <!-- 4.2 Process -->
        <div class="form-card">
          <fieldset class="form-section">
            <div class="section-header-row">
              <legend>4.2 กระบวนการจัดการของเสีย (Waste Treatment Process)</legend>
              <span id="badge-process">${P(l)}</span>
            </div>
            ${C("m4-sorting","1. มีการแยกประเภทของเสียตามลักษณะอันตราย",a.sorting)}
            ${C("m4-treatment","2. มีกระบวนการบำบัด/กำจัดที่ได้รับอนุญาตถูกต้อง",a.treatment)}
            ${C("m4-disposal","3. การกำจัดขั้นสุดท้ายปลอดภัย ไม่เป็นภาระสิ่งแวดล้อม",a.disposal)}
            ${C("m4-chainOfCustody","4. มีระบบติดตาม Chain of Custody ตลอดกระบวนการ",a.chainOfCustody)}
            <div class="form-field" style="margin-top:10px">
              <label class="form-label">เอกสารอ้างอิง</label>
              <textarea rows="2" id="m4-process-docref" class="form-input" style="resize:vertical">${a.docRef||""}</textarea>
            </div>
          </fieldset>
        </div>

        <!-- 4.3 Reporting -->
        <div class="form-card">
          <fieldset class="form-section">
            <div class="section-header-row">
              <legend>4.3 การรายงาน (Reporting)</legend>
              <span id="badge-reporting">${P(o)}</span>
            </div>
            ${C("m4-diw-report","1. ส่งรายงานประจำปีต่อกรมโรงงานอุตสาหกรรม (DIW) ตามกำหนด",s.diwReport)}
            ${C("m4-disclosure","2. เปิดเผยข้อมูลปริมาณของเสียที่รับจัดการและผลการดำเนินงาน",s.disclosure)}
            <div class="form-field" style="margin-top:10px">
              <label class="form-label">ระดับ DIW ปัจจุบัน</label>
              <input id="m4-diw-level" class="form-input" style="max-width:200px"
                value="${s.diwLevel||""}" />
            </div>
          </fieldset>
        </div>

        <!-- M4 Overall -->
        <div class="wp-m3-summary">
          <span style="font-weight:600;color:var(--color-primary-dark)">ผล M4 รวม:</span>
          <span id="m4-overall">${P(n&&l&&o)}</span>
        </div>

        <div id="wp4-err" class="error-msg" style="margin-bottom:8px"></div>
        <div class="form-navigation">
          <button id="wp4-prev" class="btn btn-secondary">← ย้อนกลับ</button>
          <button id="wp4-next" class="btn btn-primary">ถัดไป →</button>
        </div>
      </div>`}_readForm(){var t,a,s,n,l,o,c,r,p,m,v,g;const e=f=>document.getElementById(f);return{m4Intake:{verify:((t=e("m4-verify"))==null?void 0:t.checked)||!1,manifest:((a=e("m4-manifest"))==null?void 0:a.checked)||!1,quarantine:((s=e("m4-quarantine"))==null?void 0:s.checked)||!1,docRef:((n=e("m4-intake-docref"))==null?void 0:n.value.trim())||""},m4Process:{sorting:((l=e("m4-sorting"))==null?void 0:l.checked)||!1,treatment:((o=e("m4-treatment"))==null?void 0:o.checked)||!1,disposal:((c=e("m4-disposal"))==null?void 0:c.checked)||!1,chainOfCustody:((r=e("m4-chainOfCustody"))==null?void 0:r.checked)||!1,docRef:((p=e("m4-process-docref"))==null?void 0:p.value.trim())||""},m4Reporting:{diwReport:((m=e("m4-diw-report"))==null?void 0:m.checked)||!1,disclosure:((v=e("m4-disclosure"))==null?void 0:v.checked)||!1,diwLevel:((g=e("m4-diw-level"))==null?void 0:g.value.trim())||""}}}_updateBadges(e){const t=e.m4Intake,a=e.m4Process,s=e.m4Reporting,n=t.verify&&t.manifest&&t.quarantine,l=a.sorting&&a.treatment&&a.disposal&&a.chainOfCustody,o=s.diwReport&&s.disclosure,c=(r,p)=>{const m=document.getElementById(r);m&&(m.innerHTML=P(p))};c("badge-intake",n),c("badge-process",l),c("badge-reporting",o),c("m4-overall",n&&l&&o)}mount(){const e=["m4-verify","m4-manifest","m4-quarantine","m4-sorting","m4-treatment","m4-disposal","m4-chainOfCustody","m4-diw-report","m4-disclosure"];document.addEventListener("change",t=>{e.includes(t.target.id)&&this._updateBadges(this._readForm())}),document.getElementById("wp4-prev").addEventListener("click",()=>this.router.navigateTo("ef-wp/step/3")),document.getElementById("wp4-next").addEventListener("click",()=>{const t=this._readForm();d.setStep("wpStep4",t),this.router.navigateTo("ef-wp/step/5")})}unmount(){}}const it=[{key:"materials",label:"ด้านวัตถุดิบ / ของเสียที่รับจัดการ"},{key:"water",label:"ด้านน้ำและน้ำเสีย"},{key:"air",label:"ด้านมลภาวะทางอากาศ"},{key:"waste",label:"ด้าน Secondary Waste"},{key:"chemical",label:"ด้านสารเคมีและวัตถุอันตราย"},{key:"safety",label:"ด้านอาชีวอนามัยและความปลอดภัย"}];class lt{constructor({router:e}){this.router=e}render(){const e=d.get("wpStep4")||{},t=e.m5SelectedIssues||[],a=e.m5EcoEfficiency||{rows:[],eeiIndex:{}},s=a.rows||[],n=a.eeiIndex||{},l=e.m5CommunityProjects||[],o=it.map(({key:v,label:g})=>`
      <label class="checkbox-option">
        <input type="checkbox" class="issue-cb" data-key="${v}"
          ${t.includes(v)?"checked":""} />
        ${g}
      </label>`).join(""),c=t.length,r=c<2?`<span class="warn-text">⚠ เลือกอย่างน้อย 2 ด้าน (ปัจจุบัน ${c} ด้าน)</span>`:"",p=s.map((v,g)=>`
      <tr>
        <td>${v.label}</td>
        <td>${v.unit}</td>
        <td><input class="wp-eco-input eco-val" data-row="${g}" data-col="yrRef" type="number" step="any" value="${v.yrRef??""}" /></td>
        <td><input class="wp-eco-input eco-val" data-row="${g}" data-col="yr1"   type="number" step="any" value="${v.yr1??""}" /></td>
        <td><input class="wp-eco-input eco-val" data-row="${g}" data-col="yr2"   type="number" step="any" value="${v.yr2??""}" /></td>
      </tr>`).join(""),m=l.map((v,g)=>this._projectCard(v,g)).join("");return`
      <div class="step-panel">
        <h2 class="step-title">M5 — การปรับปรุงอย่างต่อเนื่อง (Continual Improvement)</h2>
        <p class="step-hint">เลือกประเด็นด้านสิ่งแวดล้อมที่ดำเนินการ ≥ 2 ด้าน และกรอกข้อมูล 3 ปี</p>

        <!-- 5.1 Eco Efficiency -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>5.1 Eco-efficiency</legend>

            <div class="form-field" style="margin-bottom:0">
              <label class="form-label">เลือกประเด็นที่ดำเนินการ (ต้อง ≥ 2 ด้าน)</label>
              <div class="checkbox-group" style="flex-direction:column;gap:6px">
                ${o}
              </div>
              <div id="issue-warn" style="margin-top:6px">${r}</div>
            </div>

            <div class="form-field" style="margin-top:16px;margin-bottom:4px">
              <label class="form-label">ข้อมูล 3 ปี (ปีอ้างอิง / ปี+1 / ปี+2)</label>
              <div style="overflow-x:auto">
                <table class="wp-eco-table">
                  <thead>
                    <tr>
                      <th>รายการ</th><th>หน่วย</th>
                      <th>ปีอ้างอิง</th><th>ปีที่ 1</th><th>ปีที่ 2</th>
                    </tr>
                  </thead>
                  <tbody>${p}</tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2"><strong>Eco-efficiency Index (EEI)</strong><br/>
                        <small style="color:var(--color-text-muted)">(of Waste / Net Sale) เทียบปีอ้างอิง</small></td>
                      <td><input class="wp-eco-input eco-eei" data-col="yrRef" type="number" step="any" value="${n.yrRef??""}" /></td>
                      <td><input class="wp-eco-input eco-eei" data-col="yr1"   type="number" step="any" value="${n.yr1??""}" /></td>
                      <td><input class="wp-eco-input eco-eei" data-col="yr2"   type="number" step="any" value="${n.yr2??""}" /></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div class="form-field">
              <label class="form-label">แนบกราฟแนวโน้ม (Trend Chart)</label>
              <input type="file" id="m5-trend-file" class="form-input" accept=".jpg,.jpeg,.png,.pdf" style="padding:6px" />
            </div>
          </fieldset>
        </div>

        <!-- 5.2 Community Projects -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>5.2 ด้านสังคม — โครงการชุมชน</legend>
            <div id="project-list">${m}</div>
            <button id="add-project" class="btn btn-secondary btn-sm" style="margin-top:10px">+ เพิ่มโครงการ</button>
          </fieldset>
        </div>

        <div id="wp5-errors" class="error-msg" style="margin-bottom:8px"></div>
        <div class="form-navigation">
          <button id="wp5-prev" class="btn btn-secondary">← ย้อนกลับ</button>
          <button id="wp5-next" class="btn btn-primary">ถัดไป →</button>
        </div>
      </div>`}_projectCard(e,t){return`
      <div class="wp-project-card" data-project="${t}">
        <div class="wp-project-header">
          <span class="wp-project-title">โครงการที่ ${t+1}</span>
          <button class="btn btn-secondary btn-sm remove-project" data-idx="${t}">ลบ</button>
        </div>
        <div class="form-row cols-2" style="margin-bottom:10px">
          <div class="form-field" style="margin:0">
            <label class="form-label">ชื่อโครงการ</label>
            <input class="form-input proj-name" data-idx="${t}" value="${e.name||""}" />
          </div>
          <div class="form-field" style="margin:0">
            <label class="form-label">บริบท / Background</label>
            <input class="form-input proj-background" data-idx="${t}" value="${e.background||""}" />
          </div>
        </div>
        <div class="form-field" style="margin-bottom:10px">
          <label class="form-label">รายละเอียด</label>
          <textarea rows="3" class="form-input proj-detail" data-idx="${t}" style="resize:vertical">${e.detail||""}</textarea>
        </div>
        <div class="form-field">
          <label class="form-label">Outcome / Impact (3 ปี)</label>
          <div style="overflow-x:auto">
            <table class="wp-eco-table">
              <thead><tr><th>หัวข้อ</th><th>ปีอ้างอิง</th><th>ปีที่ 1</th><th>ปีที่ 2</th></tr></thead>
              <tbody>
                ${["Input","Output","Outcome","Impact"].map(a=>{var s,n,l,o,c,r;return`
                  <tr>
                    <td>${a}</td>
                    <td><input class="wp-eco-input proj-oi" data-idx="${t}" data-row="${a}" data-col="yrRef"
                      value="${((n=(s=e.outcomeImpact)==null?void 0:s[a])==null?void 0:n.yrRef)??""}" /></td>
                    <td><input class="wp-eco-input proj-oi" data-idx="${t}" data-row="${a}" data-col="yr1"
                      value="${((o=(l=e.outcomeImpact)==null?void 0:l[a])==null?void 0:o.yr1)??""}" /></td>
                    <td><input class="wp-eco-input proj-oi" data-idx="${t}" data-row="${a}" data-col="yr2"
                      value="${((r=(c=e.outcomeImpact)==null?void 0:c[a])==null?void 0:r.yr2)??""}" /></td>
                  </tr>`}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>`}_readEcoEfficiency(){const e=d.get("wpStep4.m5EcoEfficiency.rows").map((s,n)=>{const l=o=>{const c=document.querySelector(`.eco-val[data-row="${n}"][data-col="${o}"]`);return(c==null?void 0:c.value)!==""?parseFloat(c.value):""};return{...s,yrRef:l("yrRef"),yr1:l("yr1"),yr2:l("yr2")}}),t=s=>{const n=document.querySelector(`.eco-eei[data-col="${s}"]`);return(n==null?void 0:n.value)!==""?parseFloat(n.value):""},a={yrRef:t("yrRef"),yr1:t("yr1"),yr2:t("yr2")};return{rows:e,eeiIndex:a}}_readProjects(){const e=document.querySelectorAll(".wp-project-card");return Array.from(e).map((t,a)=>{var c,r,p;const s=((c=t.querySelector(`.proj-name[data-idx="${a}"]`))==null?void 0:c.value.trim())||"",n=((r=t.querySelector(`.proj-detail[data-idx="${a}"]`))==null?void 0:r.value.trim())||"",l=((p=t.querySelector(`.proj-background[data-idx="${a}"]`))==null?void 0:p.value.trim())||"",o={};return t.querySelectorAll(`.proj-oi[data-idx="${a}"]`).forEach(m=>{const v=m.dataset.row,g=m.dataset.col;o[v]||(o[v]={}),o[v][g]=m.value.trim()}),{name:s,detail:n,background:l,outcomeImpact:o}})}_readSelectedIssues(){return Array.from(document.querySelectorAll(".issue-cb:checked")).map(e=>e.dataset.key)}_collectAll(){return{m5SelectedIssues:this._readSelectedIssues(),m5EcoEfficiency:this._readEcoEfficiency(),m5CommunityProjects:this._readProjects()}}_rerenderProjects(e){document.getElementById("project-list").innerHTML=e.map((t,a)=>this._projectCard(t,a)).join("")}mount(){document.addEventListener("change",e=>{if(!e.target.classList.contains("issue-cb"))return;const t=document.querySelectorAll(".issue-cb:checked").length,a=document.getElementById("issue-warn");a&&(a.innerHTML=t<2?`<span class="warn-text">⚠ เลือกอย่างน้อย 2 ด้าน (ปัจจุบัน ${t} ด้าน)</span>`:"")}),document.getElementById("add-project").addEventListener("click",()=>{const e=this._readProjects();e.push({name:"",detail:"",background:"",outcomeImpact:{}}),d.setStep("wpStep4",{m5CommunityProjects:e}),this._rerenderProjects(e)}),document.addEventListener("click",e=>{if(!e.target.classList.contains("remove-project"))return;const t=parseInt(e.target.dataset.idx),a=this._readProjects().filter((s,n)=>n!==t);d.setStep("wpStep4",{m5CommunityProjects:a}),this._rerenderProjects(a)}),document.getElementById("wp5-prev").addEventListener("click",()=>this.router.navigateTo("ef-wp/step/4")),document.getElementById("wp5-next").addEventListener("click",async()=>{var n,l;const e=this._collectAll(),t=document.getElementById("wp5-errors");if(e.m5SelectedIssues.length<2){t.textContent="M5: กรุณาเลือกประเด็นอย่างน้อย 2 ด้าน";return}t.textContent="";const a={m4Intake:d.get("wpStep4.m4Intake"),m4Process:d.get("wpStep4.m4Process"),m4Reporting:d.get("wpStep4.m4Reporting")};d.setStep("wpStep4",e);const s=d.get("wpAuditId");try{await h.saveWpStep(s,4,{...a,...e});const o=(l=(n=document.getElementById("m5-trend-file"))==null?void 0:n.files)==null?void 0:l[0];o&&await h.uploadWpFile(s,"trend_chart",o),this.router.navigateTo("ef-wp/step/6")}catch(o){t.textContent=o.message}})}unmount(){}}class V{constructor(e,t){this.canvasId=e,this.clearId=t,this.canvas=null,this.ctx=null,this.drawing=!1}mount(e){var a;if(this.canvas=document.getElementById(this.canvasId),!this.canvas)return;if(this.ctx=this.canvas.getContext("2d"),this.ctx.strokeStyle="#1a1a1a",this.ctx.lineWidth=2,this.ctx.lineCap="round",e){const s=new Image;s.onload=()=>this.ctx.drawImage(s,0,0),s.src=e}const t=s=>{const n=this.canvas.getBoundingClientRect(),l=this.canvas.width/n.width,o=this.canvas.height/n.height,c=s.touches?s.touches[0].clientX:s.clientX,r=s.touches?s.touches[0].clientY:s.clientY;return{x:(c-n.left)*l,y:(r-n.top)*o}};this.canvas.addEventListener("mousedown",s=>{this.drawing=!0;const n=t(s);this.lx=n.x,this.ly=n.y}),this.canvas.addEventListener("mousemove",s=>{if(!this.drawing)return;const n=t(s);this.ctx.beginPath(),this.ctx.moveTo(this.lx,this.ly),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),this.lx=n.x,this.ly=n.y}),this.canvas.addEventListener("mouseup",()=>{this.drawing=!1}),this.canvas.addEventListener("mouseleave",()=>{this.drawing=!1}),this.canvas.addEventListener("touchstart",s=>{s.preventDefault(),this.drawing=!0;const n=t(s);this.lx=n.x,this.ly=n.y},{passive:!1}),this.canvas.addEventListener("touchmove",s=>{if(s.preventDefault(),!this.drawing)return;const n=t(s);this.ctx.beginPath(),this.ctx.moveTo(this.lx,this.ly),this.ctx.lineTo(n.x,n.y),this.ctx.stroke(),this.lx=n.x,this.ly=n.y},{passive:!1}),this.canvas.addEventListener("touchend",()=>{this.drawing=!1}),(a=document.getElementById(this.clearId))==null||a.addEventListener("click",()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)})}getData(){var e;return((e=this.canvas)==null?void 0:e.toDataURL("image/png"))||null}}class ot{constructor({router:e}){this.router=e,this.sigPads={}}render(){const e=d.get("wpStep6")||{},t=e.sigPreparer||{},a=e.sigExecutive||{},s=e.sigAuditor||{},n=d.get("wpStep4")||{},l=n.m4Intake||{},o=n.m4Process||{},c=n.m4Reporting||{},r=d.get("wpStep2")||{},p=r.m2a||{},m=r.m2b||{},v=d.get("wpStep3")||{},g=p.legalCompliance===!0&&p.noComplaints===!0,f=m.b1LawCompliance&&m.b1BestPractices&&m.b2OverallScore>=80&&m.b2MainStepScore>=80&&!!m.b3Level,u=v.items||[],w=u.reduce((k,F)=>F.isNA?k:k+(F.score||0),0),x=u.filter(k=>!k.isNA).length*5,$=x>0?(w/x*100).toFixed(1):"0.0",_=u.filter(k=>!k.isNA).every(k=>(k.score||0)>=1),q=l.verify&&l.manifest&&l.quarantine&&o.sorting&&o.treatment&&o.disposal&&o.chainOfCustody&&c.diwReport&&c.disclosure,Q=(n.m5SelectedIssues||[]).length,me=Q>=2,W=!!g&&!!f&&!!q&&_,T=k=>k?'<span class="wp-badge-pass">ผ่าน ✅</span>':'<span class="wp-badge-fail">ยังไม่ผ่าน ❌</span>',j=(k,F,O)=>`
      <div class="wp-sig-block">
        <h4>${F}</h4>
        <canvas id="${k}-canvas" class="wp-sig-canvas" width="300" height="100"></canvas>
        <div style="margin-top:4px;text-align:center">
          <button class="btn btn-secondary btn-sm" id="${k}-clear">ลบลายเซ็น</button>
        </div>
        <div class="form-field" style="margin-top:10px;margin-bottom:4px">
          <label class="form-label">ชื่อ-สกุล</label>
          <input id="${k}-name" class="form-input" value="${O.name||""}" />
        </div>
        <div class="form-field" style="margin-bottom:4px">
          <label class="form-label">ตำแหน่ง</label>
          <input id="${k}-position" class="form-input" value="${O.position||""}" />
        </div>
        <div class="form-field" style="margin-bottom:0">
          <label class="form-label">วันที่</label>
          <input type="date" id="${k}-date" class="form-input" value="${O.date||""}" />
        </div>
      </div>`;return`
      <div class="step-panel">
        <h2 class="step-title">M6 — สรุปผลและลงนาม</h2>
        <p class="step-hint">ตรวจสอบผลการประเมินและลงลายเซ็นรับรองเพื่อส่งรายงาน</p>

        <!-- Summary Table -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>สรุปผลการประเมิน</legend>
            <table class="wp-summary-table">
              <thead>
                <tr><th>หัวข้อ</th><th>ผล</th><th>รายละเอียด</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>M2A ข้อกำหนดทั่วไป Eco Factory</td>
                  <td>${T(g)}</td>
                  <td>กฎหมาย + ไม่มีข้อร้องเรียน</td>
                </tr>
                <tr>
                  <td>M2B ข้อกำหนดเฉพาะ WP (DIW)</td>
                  <td>${T(f)}</td>
                  <td>B1 + B2 ≥80% + B3 ระดับรับรอง</td>
                </tr>
                <tr>
                  <td>M3 ข้อกำหนดเฉพาะ (7 หัวข้อ)</td>
                  <td>${T(_)}</td>
                  <td>${w} / ${x} คะแนน (${$}%) — ทุกข้อ ≥ 1</td>
                </tr>
                <tr>
                  <td>M4 มาตรฐาน WP</td>
                  <td>${T(q)}</td>
                  <td>Intake + Process + Reporting ครบ</td>
                </tr>
                <tr>
                  <td>M5 การปรับปรุงอย่างต่อเนื่อง</td>
                  <td>${T(me)}</td>
                  <td>${Q} ประเด็น (ต้อง ≥ 2) — ไม่นับในเงื่อนไขผ่าน</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>

        <!-- Overall banner -->
        <div class="wp-overall-banner ${W?"pass":"fail"}">
          <div class="wp-overall-text">ผลการประเมินรวม: ${W?"ผ่าน ✅":"ยังไม่ผ่าน ❌"}</div>
          ${W?"":'<div class="wp-overall-sub">เงื่อนไขผ่าน: M2A ✅ + M2B ✅ + M4 ✅ + M3 ทุกข้อ ≥ 1 คะแนน</div>'}
        </div>

        <!-- Signatures -->
        <div class="form-card">
          <fieldset class="form-section">
            <legend>ลายเซ็นผู้รับรอง</legend>
            <div class="wp-sig-grid">
              ${j("sig-preparer","1. ผู้รับผิดชอบจัดทำรายงาน",t)}
              ${j("sig-executive","2. ผู้บริหารสูงสุด",a)}
              ${j("sig-auditor","3. ผู้ตรวจประเมิน",s)}
            </div>
          </fieldset>
        </div>

        <div id="wp6-errors" class="error-msg" style="margin-bottom:8px"></div>
        <div class="form-navigation">
          <button id="wp6-prev" class="btn btn-secondary">← ย้อนกลับ</button>
          <button id="wp6-save" class="btn btn-secondary">บันทึก</button>
          <button id="wp6-pdf"  class="btn btn-secondary">⬇ ดาวน์โหลด PDF</button>
          <button id="wp6-submit" class="btn btn-primary">ส่งรายงาน →</button>
        </div>
      </div>`}_readSignatures(){var t,a,s;const e=n=>{var l;return((l=document.getElementById(n))==null?void 0:l.value.trim())||""};return{sigPreparer:{name:e("sig-preparer-name"),position:e("sig-preparer-position"),date:e("sig-preparer-date"),data:((t=this.sigPads.preparer)==null?void 0:t.getData())||""},sigExecutive:{name:e("sig-executive-name"),position:e("sig-executive-position"),date:e("sig-executive-date"),data:((a=this.sigPads.executive)==null?void 0:a.getData())||""},sigAuditor:{name:e("sig-auditor-name"),position:e("sig-auditor-position"),date:e("sig-auditor-date"),data:((s=this.sigPads.auditor)==null?void 0:s.getData())||""}}}_buildPayload(e){const t=d.get("wpStep6")||{};return{...e,summary:t.summary||{}}}_setMsg(e,t=!1){const a=document.getElementById("wp6-errors");a&&(a.textContent=e,a.style.color=t?"var(--color-success)":"")}mount(){var t,a,s;const e=d.get("wpStep6")||{};this.sigPads.preparer=new V("sig-preparer-canvas","sig-preparer-clear"),this.sigPads.executive=new V("sig-executive-canvas","sig-executive-clear"),this.sigPads.auditor=new V("sig-auditor-canvas","sig-auditor-clear"),this.sigPads.preparer.mount((t=e.sigPreparer)==null?void 0:t.data),this.sigPads.executive.mount((a=e.sigExecutive)==null?void 0:a.data),this.sigPads.auditor.mount((s=e.sigAuditor)==null?void 0:s.data),document.getElementById("wp6-prev").addEventListener("click",()=>this.router.navigateTo("ef-wp/step/5")),document.getElementById("wp6-save").addEventListener("click",async()=>{const n=this._readSignatures(),l=this._buildPayload(n);d.setStep("wpStep6",n);const o=d.get("wpAuditId");try{await h.saveWpStep(o,6,l),this._setMsg("บันทึกเรียบร้อยแล้ว ✅",!0)}catch(c){this._setMsg(c.message)}}),document.getElementById("wp6-submit").addEventListener("click",async()=>{const n=this._readSignatures(),l=this._buildPayload(n);d.setStep("wpStep6",n);const o=d.get("wpAuditId");try{await h.saveWpStep(o,6,l),await h.submitWpAudit(o),this._setMsg("ส่งรายงานเรียบร้อยแล้ว ✅ กำลังไปหน้าสรุป...",!0),setTimeout(()=>this.router.navigateTo("ef-wp"),1500)}catch(c){this._setMsg(c.message)}}),document.getElementById("wp6-pdf").addEventListener("click",async()=>{const n=d.get("wpAuditId"),l=d.get("wpStep1.companyName")||"wp-audit";try{await h.downloadWpPDF(n,l)}catch(o){this._setMsg(o.message)}})}unmount(){}}class rt{constructor({router:e}){this.router=e,this._status="loading",this._errorMsg=""}render(){return`
      <div class="auth-page">
        <div class="auth-card form-card" style="text-align:center">
          <div class="auth-logo">🏭</div>
          <h2 class="auth-title">ยืนยันอีเมล</h2>
          <div id="verify-content">
            <p class="auth-subtitle">กำลังตรวจสอบ...</p>
          </div>
        </div>
      </div>
    `}async mount(){const e=window.location.hash,t=e.indexOf("?"),s=new URLSearchParams(t>=0?e.slice(t+1):"").get("token"),n=document.getElementById("verify-content");if(n){if(!s){n.innerHTML=this._errorHTML("ลิงก์ยืนยันไม่ถูกต้อง");return}try{await h.verifyEmail(s),n.innerHTML=`
        <div class="alert alert-success" style="margin:16px 0">
          ยืนยันอีเมลสำเร็จแล้ว! คุณสามารถเข้าสู่ระบบได้
        </div>
        <a href="#login" class="btn btn-primary btn-full" style="display:inline-block;margin-top:8px">
          เข้าสู่ระบบ
        </a>
      `}catch(l){const o=l.message.replace(/^\d+: /,"");let c="ลิงก์ยืนยันไม่ถูกต้องหรือหมดอายุแล้ว";try{c=JSON.parse(o).message||c}catch{}n.innerHTML=this._errorHTML(c)}}}_errorHTML(e){return`
      <div class="alert alert-error" style="margin:16px 0">${e}</div>
      <p style="margin:12px 0;font-size:14px;color:#666">
        ต้องการลิงก์ใหม่?
        <a href="#login" class="auth-link">กลับไปหน้าเข้าสู่ระบบ</a>
      </p>
    `}unmount(){}}class dt{constructor({router:e}){this.router=e}render(){return`
      <div class="auth-page">
        <div class="auth-card form-card">
          <div class="auth-logo">🔑</div>
          <h2 class="auth-title">ลืมรหัสผ่าน</h2>
          <p class="auth-subtitle">กรอกอีเมลของคุณ เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้</p>

          <div id="fp-alert" class="alert" style="display:none"></div>

          <form id="fp-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">อีเมล</label>
              <input type="email" id="fp-email" class="form-input" placeholder="example@email.com" autocomplete="email" required />
            </div>
            <button type="submit" class="btn btn-primary btn-full" id="fp-btn">
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </form>

          <p class="auth-footer">
            <a href="#login" class="auth-link">← กลับหน้าเข้าสู่ระบบ</a>
          </p>
        </div>
      </div>
    `}mount(){document.getElementById("fp-form").addEventListener("submit",e=>{e.preventDefault(),this._handleSubmit()})}async _handleSubmit(){const e=document.getElementById("fp-email").value.trim(),t=document.getElementById("fp-btn"),a=document.getElementById("fp-alert");a.style.display="none",t.disabled=!0,t.textContent="กำลังส่ง...";try{await h.forgotPassword(e),a.className="alert alert-success",a.textContent="ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้ว กรุณาตรวจสอบกล่องจดหมาย",a.style.display="block",document.getElementById("fp-form").style.display="none"}catch(s){const n=s.message.replace(/^\d+: /,"");a.className="alert alert-error",a.textContent=n||"เกิดข้อผิดพลาด กรุณาลองใหม่",a.style.display="block",t.disabled=!1,t.textContent="ส่งลิงก์รีเซ็ตรหัสผ่าน"}}unmount(){}}class ct{constructor({router:e}){this.router=e,this._token=new URLSearchParams(window.location.hash.split("?")[1]||"").get("token")||""}render(){return this._token?`
      <div class="auth-page">
        <div class="auth-card form-card">
          <div class="auth-logo">🔒</div>
          <h2 class="auth-title">ตั้งรหัสผ่านใหม่</h2>
          <p class="auth-subtitle">กรอกรหัสผ่านใหม่ของคุณ</p>

          <div id="rp-alert" class="alert" style="display:none"></div>

          <form id="rp-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">รหัสผ่านใหม่</label>
              <div style="position:relative">
                <input type="password" id="rp-password" class="form-input" placeholder="อย่างน้อย 8 ตัวอักษร" required style="padding-right:40px" />
                <button type="button" id="rp-toggle-pw" aria-label="แสดง/ซ่อนรหัสผ่าน" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0;color:var(--color-text-muted);line-height:1">
                  <svg id="rp-eye-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
              <input type="password" id="rp-confirm" class="form-input" placeholder="กรอกรหัสผ่านอีกครั้ง" required />
            </div>
            <button type="submit" class="btn btn-primary btn-full" id="rp-btn">
              ตั้งรหัสผ่านใหม่
            </button>
          </form>

          <p class="auth-footer">
            <a href="#login" class="auth-link">← กลับหน้าเข้าสู่ระบบ</a>
          </p>
        </div>
      </div>
    `:`
        <div class="auth-page">
          <div class="auth-card form-card">
            <div class="auth-logo">⚠️</div>
            <h2 class="auth-title">ลิงก์ไม่ถูกต้อง</h2>
            <p class="auth-subtitle">ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว</p>
            <p class="auth-footer">
              <a href="#forgot-password" class="auth-link">ขอลิงก์ใหม่</a>
            </p>
          </div>
        </div>
      `}mount(){this._token&&(document.getElementById("rp-toggle-pw").addEventListener("click",()=>{const e=document.getElementById("rp-password"),t=e.type==="password";e.type=t?"text":"password",document.getElementById("rp-eye-icon").innerHTML=t?'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>':'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'}),document.getElementById("rp-form").addEventListener("submit",e=>{e.preventDefault(),this._handleSubmit()}))}async _handleSubmit(){const e=document.getElementById("rp-password").value,t=document.getElementById("rp-confirm").value,a=document.getElementById("rp-btn"),s=document.getElementById("rp-alert");if(s.style.display="none",e.length<8){s.className="alert alert-error",s.textContent="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",s.style.display="block";return}if(e!==t){s.className="alert alert-error",s.textContent="รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่",s.style.display="block";return}a.disabled=!0,a.textContent="กำลังบันทึก...";try{await h.resetPassword(this._token,e),s.className="alert alert-success",s.textContent="ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว กำลังไปหน้าเข้าสู่ระบบ...",s.style.display="block",document.getElementById("rp-form").style.display="none",setTimeout(()=>{window.location.hash="#login"},1800)}catch(n){const l=n.message.replace(/^\d+: /,"");let o=l;try{o=JSON.parse(l).message||l}catch{}s.className="alert alert-error",s.textContent=o||"เกิดข้อผิดพลาด กรุณาลองใหม่",s.style.display="block",a.disabled=!1,a.textContent="ตั้งรหัสผ่านใหม่"}}unmount(){}}const pt={1:et,2:tt,3:st,4:nt,5:lt,6:ot},ut={1:xe,2:Ee,3:_e,4:Ie,5:Le,6:Ce};let E=null;const N={init(i){this.container=i,window.addEventListener("hashchange",()=>this._onHashChange()),this._onHashChange()},_onHashChange(){const i=window.location.hash;if(i.startsWith("#google-auth")){window.location.hash="#login";return}if(i==="#login"||i===""){this._renderPage(Ne);return}if(i==="#register"){this._renderPage(Te);return}if(i.startsWith("#verify-email")){this._hideProgressBar(),this._renderPage(rt);return}if(i==="#forgot-password"){this._hideProgressBar(),this._renderPage(dt);return}if(i.startsWith("#reset-password")){this._hideProgressBar(),this._renderPage(ct);return}if(i==="#admin"){this._renderPage(qe);return}if(i==="#dashboard"){this._hideProgressBar();const n=d.get("auth.role");this._renderPage(n==="auditor"?Ge:Ue);return}if(i==="#profile"){this._hideProgressBar(),this._renderPage(Ke);return}if(i==="#eco-factory-auditor"){this._hideProgressBar(),this._renderPage(Ye);return}const e=i.match(/^#waste-award(?:\/(.+))?$/);if(e){this._hideProgressBar(),e[1]?this._renderPage(He,{assessmentId:e[1]}):this._renderPage(De);return}const t=i.match(/^#ef-wp\/step\/([1-6])$/);if(t){this._hideProgressBar();const n=parseInt(t[1]),l=pt[n];l&&this._renderPage(l);return}if(i==="#ef-wp"){this._hideProgressBar(),this._renderPage(Ze);return}const a=i.match(/^#ef\/step\/([1-6])$/),s=a?parseInt(a[1]):d.get("currentStep")||1;this.renderStep(s)},_renderPage(i,e={}){E!=null&&E.unmount&&E.unmount();const t=document.getElementById("step-content");t&&(E=new i({router:this,api:h,...e}),t.innerHTML=E.render(),E.mount())},_hideProgressBar(){const i=document.getElementById("progress-bar-container");i&&(i.style.display="none",i.innerHTML="")},renderStep(i){d.set("currentStep",i),window.location.hash=`#ef/step/${i}`;const e=document.getElementById("progress-bar-container");e&&(e.style.display="",e.innerHTML=Be(i)),E!=null&&E.unmount&&E.unmount();const t=document.getElementById("step-content");if(!t)return;const a=ut[i];a&&(E=new a({router:this,api:h}),t.innerHTML=E.render(),E.mount())},async navigateTo(i){if(typeof i=="string"){E!=null&&E.unmount&&E.unmount(),window.location.hash="#"+i;return}const e=d.get("currentStep");if(i>e&&(E!=null&&E.validate)){const{isValid:a,errors:s}=E.validate();if(!a){d.set("validationErrors",s),E.showErrors(s);return}}const t=d.get("applicationId");if(t&&i>e)try{await this._saveCurrentStep(e,t)}catch(a){console.error("Autosave failed:",a)}this.renderStep(i)},async _saveCurrentStep(i,e){if(i===1)await h.saveStep(e,1,d.get("step1"));else if(i===2){const t=d.get("step2");await h.saveStep(e,2,{...t,consultants:t.consultants.map((a,s)=>({...a,sortOrder:s+1}))})}else if(i===4){const t=d.get("step3");await h.saveStep(e,3,{auditingOrgName:t.auditingOrgName,auditors:t.auditors,checklist:t.checklist})}else i===5&&await h.saveStep(e,4,d.get("step4"));d.set("isDirty",!1)}},ce="eco_application_id",M="eco_auth_token";async function mt(){const i=window.location.hash;if(i.startsWith("#google-auth")){const a=new URLSearchParams(i.split("?")[1]||"").get("token");a?(localStorage.setItem(M,a),window.history.replaceState(null,"",window.location.pathname+"#dashboard"),window.location.reload()):window.location.hash="#login";return}if(i.startsWith("#line-auth")){const a=new URLSearchParams(i.split("?")[1]||"").get("token");a?(localStorage.setItem(M,a),window.history.replaceState(null,"",window.location.pathname+"#dashboard"),window.location.reload()):window.location.hash="#login";return}if(i.startsWith("#verify-email")||i==="#forgot-password"||i.startsWith("#reset-password")){z(),N.init(document.getElementById("step-content"));return}if((i==="#login"||i==="#register"||i==="")&&!localStorage.getItem(M)){z(),N.init(document.getElementById("step-content")),i!=="#register"&&(window.location.hash="#login");return}const e=localStorage.getItem(M);if(!e){window.location.hash="#login",z(),N.init(document.getElementById("step-content"));return}try{const t=await h.getMe();if(d.set("auth.userId",t.id),d.set("auth.email",t.email),d.set("auth.fullName",t.fullName),d.set("auth.role",t.role),d.set("auth.token",e),t.role==="admin"){ht(t),N.init(document.getElementById("step-content")),!i.startsWith("#admin")&&!i.startsWith("#waste-award")&&(window.location.hash="#admin");return}if(t.role==="auditor"){gt(t),N.init(document.getElementById("step-content")),!i.startsWith("#waste-award")&&!i.startsWith("#dashboard")&&!i.startsWith("#profile")&&!i.startsWith("#ef-wp")&&(window.location.hash="#dashboard");return}}catch{localStorage.removeItem(M),window.location.hash="#login",z(),N.init(document.getElementById("step-content"));return}ft(),Y(!0);try{const t=localStorage.getItem(ce);if(t)try{const s=await h.getApplication(t);d.set("applicationId",t),d.hydrate(s)}catch{localStorage.removeItem(ce)}Y(!1),N.init(document.getElementById("step-content"));const a=window.location.hash;!a.startsWith("#ef/")&&!a.startsWith("#waste-award")&&!a.startsWith("#ef-wp")&&(window.location.hash="#dashboard")}catch(t){Y(!1),document.getElementById("step-content").innerHTML=`
      <div class="form-card" style="text-align:center; padding:40px;">
        <p style="color:var(--color-error); font-size:16px;">ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้</p>
        <p style="color:var(--color-text-muted); font-size:13px; margin-top:8px;">${t.message}</p>
        <button class="btn btn-primary" style="margin-top:16px" onclick="location.reload()">ลองอีกครั้ง</button>
      </div>
    `}}function Z(i){return i.startsWith("#waste-award")?"Amata Best Waste Management Awards — ระบบตรวจประเมินการจัดการกากอุตสาหกรรม":i.startsWith("#eco-excellence")?"Eco-Excellence — ระบบบันทึกข้อมูลโรงงานเพื่อการขอรับรองเป็นเมืองอุตสาหกรรมเชิงนิเวศ":i.startsWith("#ef-wp")?"EF-WP Self Audit — ระบบประเมินตนเองโรงงาน Waste Processor (ประเภท 101/105/106)":"Eco Factory — ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ"}function vt(){const i=document.getElementById("header-subtitle");i&&(i.textContent=Z(window.location.hash))}window.addEventListener("hashchange",vt);function z(){document.querySelector("#app").innerHTML=`
    <div class="app-shell app-shell--auth">
      <header class="app-header">
        <div class="header-logo"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="13" y="20" text-anchor="middle" font-size="16" font-family="Arial Black,sans-serif" font-weight="900" fill="#52B788">EF</text></svg></div>
        <div class="header-branding">
          <h1>ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</h1>
          <p>Eco Factory - FTI/WEIS/EF-APP-2018, Amata Best Waste Management Awards, Eco-Excellence</p>
        </div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:10px;">
          <a href="https://www.verdixgreen.com" target="_blank" rel="noopener" class="nav-link">กลับหน้าหลัก</a>
          <span class="header-badge">WEIS · สภาอุตสาหกรรมแห่งประเทศไทย</span>
        </div>
      </header>
      <main class="main-content">
        <div id="step-content"></div>
      </main>
    </div>
  `}function ft(){var i;document.querySelector("#app").innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="header-logo"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="13" y="20" text-anchor="middle" font-size="16" font-family="Arial Black,sans-serif" font-weight="900" fill="#52B788">EF</text></svg></div>
        <div class="header-branding">
          <h1>ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</h1>
          <p id="header-subtitle">${Z(window.location.hash)}</p>
        </div>
        <nav class="header-nav">
          <span class="header-user">${d.get("auth.fullName")||d.get("auth.email")||""}</span>
          <span class="header-nav-sep"></span>
          <a href="#dashboard" class="nav-link">หน้าหลัก</a>
          <a href="#profile" class="nav-link">โปรไฟล์</a>
          <button class="nav-link nav-link-logout" id="logout-btn">ออกจากระบบ</button>
        </nav>
      </header>

      <main class="main-content">
        <div id="progress-bar-container" style="display:none;"></div>
        <div id="step-content"></div>
      </main>
    </div>

    <div id="loading-overlay">
      <div class="spinner"></div>
      <span>กำลังโหลดข้อมูล...</span>
    </div>
  `,(i=document.getElementById("logout-btn"))==null||i.addEventListener("click",()=>{h.logout(),window.location.hash="#login",window.location.reload()})}function ht(i){document.querySelector("#app").innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="header-logo"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="13" y="20" text-anchor="middle" font-size="16" font-family="Arial Black,sans-serif" font-weight="900" fill="#52B788">EF</text></svg></div>
        <div class="header-branding">
          <h1>ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</h1>
          <p id="header-subtitle">${Z(window.location.hash)}</p>
        </div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:10px;">
          <span class="header-badge">WEIS · สภาอุตสาหกรรมแห่งประเทศไทย</span>
        </div>
      </header>
      <main class="main-content admin-main">
        <div id="step-content"></div>
      </main>
    </div>
  `}function gt(i){var e;document.querySelector("#app").innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="header-logo"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="13" y="20" text-anchor="middle" font-size="16" font-family="Arial Black,sans-serif" font-weight="900" fill="#52B788">EF</text></svg></div>
        <div class="header-branding">
          <h1>ระบบขึ้นทะเบียนมาตรฐานโรงงานอุตสาหกรรมเชิงนิเวศ</h1>
          <p>Amata Best Waste Management Awards — ระบบตรวจประเมินการจัดการกากอุตสาหกรรม</p>
        </div>
        <nav class="header-nav">
          <span class="header-user">${i.fullName||i.email}</span>
          <span class="header-badge">กรรมการผู้ตรวจ</span>
          <span class="header-nav-sep"></span>
          <a href="#dashboard" class="nav-link">หน้าหลัก</a>
          <a href="#profile" class="nav-link">โปรไฟล์</a>
          <button class="nav-link nav-link-logout" id="logout-btn">ออกจากระบบ</button>
        </nav>
      </header>
      <main class="main-content">
        <div id="step-content"></div>
      </main>
    </div>
  `,(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",()=>{h.logout(),window.location.hash="#login",window.location.reload()})}function Y(i){const e=document.getElementById("loading-overlay");e&&e.classList.toggle("active",i)}mt();
