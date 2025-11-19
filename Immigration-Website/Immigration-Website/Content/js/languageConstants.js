//Setting Entitiy API Location
var constantAPILocation = "https://stateentityprofile.ca.gov/api/";
//var constantAPILocation = "https://test.gis.ca.gov/stateentityprofile/api/";

//Geting currentLanguage
var currentLanguage = "en";
var url = window.location.href;
//get rid of the trailing / before doing a simple split on /
var url_parts = url.replace(/\/\s*$/, '').split('/');
//since we do not need example.com 
url_parts.shift(); 
var str = url_parts[1];
if (str.indexOf("test.gis.ca.gov") > -1) {
    currentLanguage = url_parts[3];
}
else {
    currentLanguage = url_parts[2];
}

// Setting Language Specific contants
switch (currentLanguage) {
    case "ar":
        var constantGeneralInformation = "معلومات عامة";
        var constantHearingImpaired = "ضعف السمع";
        var constantFax = "الفاكس";
        var constantContact = "الاتصال";
        var constantContactUs = "تواصل معنا";
        var constantWebsite = "موقع الويب/ الموقع الإلكتروني";
        var constantAgencyDetails = "تفاصيل الوكالة";
        var constantContactAgency = "الاتصال بالوكالة";
        var constantServiceDetails = "تفاصيل الخدمة";
        var constantSeeDetails = "تفاصيل الخدمة";
        var constantStart = "بداية";
        var constantShowFullCard = "false";
        var constantEntityProfileLangCode = "ar";
        break;
    case "hy":
        var constantGeneralInformation = "Ընդհանուր տեղեկություններ";
        var constantHearingImpaired = "Լսելու հետ կապված խնդիրներ ունեցող";
        var constantFax = "Ֆաքս";
        var constantContact = "Կոնտակտը";
        var constantContactUs = "Կապ հաստատեք մեզ հետ";
        var constantWebsite = "Կայքը";
        var constantAgencyDetails = "Կազմակերպության տվյալները";
        var constantContactAgency = "Կապ հաստատեք կազմակերպության հետ";
        var constantServiceDetails = "Ծառայության մանրամասները";
        var constantSeeDetails = "Ծառայության մանրամասները";
        var constantStart = "Մեկնարկ";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "hy";
        break;
    case "zh-CHT":
        var constantGeneralInformation = "基本信息";
        var constantHearingImpaired = "聽覺缺陷";
        var constantFax = "傳真";
        var constantContact = "聯繫";
        var constantContactUs = "聯繫我們";
        var constantWebsite = "網站";
        var constantAgencyDetails = "更多服務";
        var constantContactAgency = "聯繫機構";
        var constantServiceDetails = "服務詳情";
        var constantSeeDetails = "服務詳情";
        var constantStart = "開始";
        var constantShowFullCard = "false";
        var constantEntityProfileLangCode = "zh-HK";
        break;
    case "fa":
        var constantGeneralInformation = "اطلاعات کلی";
        var constantHearingImpaired = "برای افرادی که مشکل شنوایی دارند";
        var constantFax = "فکس";
        var constantContact = "تماس";
        var constantContactUs = "تماس با ما";
        var constantWebsite = "وب‌سایت";
        var constantAgencyDetails = "جزییات مربوط به نمایندگی";
        var constantContactAgency = "تماس با نمایندگی";
        var constantServiceDetails = "جزییات مربوط به خدمات";
        var constantSeeDetails = "جزییات مربوط به خدمات";
        var constantStart = "شروع";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "fa";
        break;
    case "km":
        var constantGeneralInformation = "ព័ត៌មាន​ទូទៅ​";
        var constantHearingImpaired = "មាន​បញ្ហា​ផ្នែក​ស្តាប់​";
        var constantFax = "ទូរសារ​";
        var constantContact = "ទំនាក់​ទំនង​";
        var constantContactUs = "ទំនាក់​ទំនង​មកកាន់​យើង​ខ្ញុំ​";
        var constantWebsite = "គេហទំព័រ​";
        var constantAgencyDetails = "ព័ត៌មាន​លម្អិតអំពី​ទី​ភ្នាក់​ងារ​";
        var constantContactAgency = "ទំនាក់​ទំនង​ទីភ្នាក់​ងារ​";
        var constantServiceDetails = "ព័ត៌មាន​លម្អិត​សេវា​កម្ម​";
        var constantSeeDetails = "ព័ត៌មាន​លម្អិត​សេវា​កម្ម​";
        var constantStart = "ចាប់ផ្តើម";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "km";
        break;
    case "ko":
        var constantGeneralInformation = "일반 정보";
        var constantHearingImpaired = "청각 장애인";
        var constantFax = "팩스";
        var constantContact = "연락처"; 
        var constantContactUs = "문의하기";
        var constantWebsite = "웹 사이트";
        var constantAgencyDetails = "기관 세부 정보";
        var constantContactAgency = "기관 연락처";
        var constantServiceDetails = "서비스 세부 정보";
        var constantSeeDetails = "서비스 세부 정보";
        var constantStart = "스타트";
        var constantShowFullCard = "false";
        var constantEntityProfileLangCode = "ko";
        break;
    case "zh-CHS":
        var constantGeneralInformation = "一般信息";
        var constantHearingImpaired = "有听力障碍";
        var constantFax = "传真";
        var constantContact = "联系方式";
        var constantContactUs = "联系我们";
        var constantWebsite = "网站";
        var constantAgencyDetails = "机构详情";
        var constantContactAgency = "联系机构";
        var constantServiceDetails = "服务细节";
        var constantSeeDetails = "服务细节";
        var constantStart = "开始";
        var constantShowFullCard = "false";
        var constantEntityProfileLangCode = "zh-CN";
        break;
    case "ru":
        var constantGeneralInformation = "Общая информация";
        var constantHearingImpaired = "Для лиц с нарушениями слуха";
        var constantFax = "Факс";
        var constantContact = "Контактная информация";
        var constantContactUs = "Связаться с нами";
        var constantWebsite = "Сайт";
        var constantAgencyDetails = "Подробная информация об учреждении";
        var constantContactAgency = "Связаться с учреждением";
        var constantServiceDetails = "Подробная информация об услуге";
        var constantSeeDetails = "Подробная информация об услуге";
        var constantStart = "Начать";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "ru";
        break;
    case "es":
        var constantGeneralInformation = "Información general";
        var constantHearingImpaired = "Personas con problemas para oír";
        var constantFax = "Fax";
        var constantContact = "Contacto";
        var constantContactUs = "Comuníquese con nosotros";
        var constantWebsite = "Sitio web";
        var constantAgencyDetails = "Detalles de la agencia";
        var constantContactAgency = "Agencia de contacto";
        var constantServiceDetails = "Detalles del servicio";
        var constantSeeDetails = "Detalles del servicio";
        var constantStart = "Comenzar";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "es";
        break;
    case "fil":
        var constantGeneralInformation = "Pangkalahatang Impormasyon";
        var constantHearingImpaired = "May Kapansanan sa Pagdinig";
        var constantFax = "Fax";
        var constantContact = "Kontak";
        var constantContactUs = "Kontakin Kami";
        var constantWebsite = "Website";
        var constantAgencyDetails = "Mga Detalye ng Ahensiya";
        var constantContactAgency = "Kontak na Ahensiya";
        var constantServiceDetails = "Mga Detalye ng Serbisyo";
        var constantSeeDetails = "Mga Detalye ng Serbisyo";
        var constantStart = "Magsimula";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "tl";
        break;
    case "vi":
        var constantGeneralInformation = "Thông Tin Chung";
        var constantHearingImpaired = "Khiếm Thính";
        var constantFax = "Fax";
        var constantContact = "Liên Lạc";
        var constantContactUs = "Liên Lạc với Chúng Tôi";
        var constantWebsite = "Trang Web";
        var constantAgencyDetails = "Thông Tin Chi Tiết về Cơ Quan";
        var constantContactAgency = "Liên Lạc với Cơ Quan";
        var constantServiceDetails = "Thông Tin Chi Tiết Dịch Vụ";
        var constantSeeDetails = "Thông Tin Chi Tiết Dịch Vụ";
        var constantStart = "Lúc đầu";
        var constantShowFullCard = "true";
        var constantEntityProfileLangCode = "vi";
        break;
    default:
        var constantGeneralInformation = "General Information";
        var constantHearingImpaired = "Hearing Impaired";
        var constantFax = "Fax";
        var constantContact = "Contact";
        var constantContactUs = "Contact Us";
        var constantWebsite = "Website";
        var constantAgencyDetails = "Agency Details";
        var constantContactAgency = "Contact Agency";
        var constantServiceDetails = "Service Details";
        var constantSeeDetails = "See Details";
        var constantStart = "Start";
        var constantShowFullCard = "false";
        var constantEntityProfileLangCode = "en";
}














