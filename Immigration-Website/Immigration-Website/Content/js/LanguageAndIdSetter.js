    $(document).ready(function (e) {
            var itemtosave = getQueryStringValue('Id');
            if (itemtosave) {
                MultiLanguageCode.Cookies.setCookie("LastIdViewed", itemtosave, 365);
            }

            var lang = MultiLanguageCode.Cookies.getCookie("LangForMultiLanguage");
            $(".setLang[data-lang='" + lang + "'] img").addClass("active-lang");

            if (lang) {
                if (!(lang == "en")) {
                    document.getElementById(lang).style.color = '#000000';
                    document.getElementById(lang).style.backgroundColor = '#FFFFFF';
                }
                else {
                    document.getElementById("en").style.color = '#000000';
                    document.getElementById("en").style.backgroundColor = '#FFFFFF';
                }
            }
            else {
                var lang = "en";
                MultiLanguageCode.Cookies.setCookie("LangForMultiLanguage", lang, 365);
                location.reload(true);
            }


            $(".setLang").on("click", function (event) {
                event.preventDefault();
                var lang = $(this).attr("data-lang");
                MultiLanguageCode.Cookies.setCookie("LangForMultiLanguage", lang, 365);
                location.reload(true);
            })
        });


        function getQueryStringValue(key) {
            return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        }
