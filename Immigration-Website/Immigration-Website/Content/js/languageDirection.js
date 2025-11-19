var url = window.location.href;
if (url.indexOf("test.gis.ca.gov") > -1) {
    var titleBackground = document.getElementById("titleBackground");
    if (!(titleBackground === null)) {
        var currentTitleBackground = titleBackground.style.backgroundImage;
        var currentTitleBackground = currentTitleBackground.replace("/Content", "/ImmigrantGuideTest/Content");
        titleBackground.style.backgroundImage = currentTitleBackground;
    }
    
    var homeBackground = document.getElementById("homeBackground");
    if (!(homeBackground === null)) {
        var currenthomeBackground = homeBackground.style.backgroundImage;
        var currenthomeBackground = currenthomeBackground.replace("/content", "/ImmigrantGuideTest/content");
        homeBackground.style.backgroundImage = currenthomeBackground;
    }
    var link = document.getElementById("dacalink").href;
    link = link.toUpperCase();
    var modifiedLink = link.replace("/EN/DACA/", "/ImmigrantGuideTest/EN/DACA/");
    document.getElementById("dacalink").href = modifiedLink;

    var link2 = document.getElementById("dlink").href;
    link2 = link2.toUpperCase();
    var modifiedLink2 = "";
    if (url.indexOf("/es") > -1) {
        modifiedLink2 = link2.replace("/ES/DISASTERRELIEF/", "/ImmigrantGuideTest/ES/DISASTERRELIEF/");
    }
    else
    {
        modifiedLink2 = link2.replace("/EN/DISASTERRELIEF/", "/ImmigrantGuideTest/EN/DISASTERRELIEF/");
    }
    document.getElementById("dlink").href = modifiedLink2;

    var plink = document.getElementById("pcharge").href;
    plink = plink.toUpperCase();
    var pModifiedLink = plink.replace("/EN/PUBLICCHARGE/", "/ImmigrantGuideTest/EN/PUBLICCHARGE/");
    document.getElementById("pcharge").href = pModifiedLink;



}

var testForDaca = url.toUpperCase();
if (!(testForDaca.indexOf("DACA") > -1)) {
    switch (currentLanguage) {
        case "ar":
            document.getElementById("textwrapper").setAttribute("dir", "rtl");
            var currentbackground = document.getElementById("titleBackground").style.backgroundImage;
            var currentbackground = currentbackground.replace(".jpg", "-rtl.jpg");
            document.getElementById("titleBackground").style.backgroundImage = currentbackground
            break;
        case "fa":
            document.getElementById("textwrapper").setAttribute("dir", "rtl");
            var currentbackground = document.getElementById("titleBackground").style.backgroundImage;
            var currentbackground = currentbackground.replace(".jpg", "-rtl.jpg");
            document.getElementById("titleBackground").style.backgroundImage = currentbackground
            break;
        default:
            document.getElementById("textwrapper").setAttribute("dir", "ltr");
    }
}


//var apimessage = "<div style=\"background-color: #990000; color: #FFFFFF; text-align:center; width: 100 %;font-size: 0.7em; border-top: 5px solid #FDB81E;\" >The translations on this web site are currently being finalized. They are not complete. Thanks for your patience.</div>";

//document.getElementById("apimessage").innerHTML = apimessage;













