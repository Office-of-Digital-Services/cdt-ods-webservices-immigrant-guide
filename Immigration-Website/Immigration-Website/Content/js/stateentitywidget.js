var processJsonData = {

    // Receive display request (showAgencyDetails,showServiceDetails,showAgenciesList,showServicesList, etc.). Populate div tag with HTML. 

    apiLocation: 'https://stateentityprofile.ca.gov/api/',
    imageUrlPrefix: 'https://stateentityprofile.ca.gov/Uploads',
    builtApiCall: '',
    apiData: '',

    formatApiUrl: function(id, primaryFilter, secondaryFilter, serviceOrAgency, lang) {
        this.builtApiCall = this.apiLocation +
            "?Id=" +
            id +
            "&PrimaryFilter=" +
            primaryFilter +
            "&SecondaryFilter=" +
            secondaryFilter +
            "&AgencyOrService=" +
            serviceOrAgency +
            "&lang=" +
            lang;
    },

    getApiData: function(apiURL) {
        var deferred = $.Deferred();
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                deferred.resolve(JSON.parse(this.responseText));
            }
        };
        xmlhttp.open("GET", apiURL, true);
        xmlhttp.send();
        return deferred.promise();
    },

//####################################################################################################
//    Display Service Functions
//####################################################################################################
    showHomePageServices: function (idOfDivToFill, id, primaryFilter, secondaryFilter, serviceOrAgency, lang) {
        this.formatApiUrl(id, primaryFilter, secondaryFilter, serviceOrAgency, lang);
        var promise = this.getApiData(this.builtApiCall);
        promise.then(function(result) {

            this.apiData = result;
            var arrayLength = this.apiData.length;


            var textToDisplayTiles = "";
            var textToDisplay = "";
            var counter = 0;
            var holderDescription = "";
            var idbuilder = "";
            var tabbackground = "";
            
            for (var i = 0; i < arrayLength; i++) {
                counter = counter + 1;
                

                // Tabs Begin =========================================================================
                textToDisplayTiles = "";
                tabbackground = "";
                tabbackground = processJsonData.imageUrlPrefix + "/";
                if (apiData[i].ImageUrl) {
                    tabbackground += apiData[i].ImageUrl;
                }
                else {
                    tabbackground += "service-General.jpg";
                }
                textToDisplayTiles += "<div class=\"teaser\">";
                textToDisplayTiles += "<h2 class=\"title h4\">" + apiData[i].ServiceName + "</h4>";
                textToDisplayTiles += "</div>";

                idbuilder = "featured-service-tab-" + counter;
                $("#" + idbuilder).html(textToDisplayTiles);
                document.getElementById(idbuilder).style.backgroundImage = "url('" + tabbackground + "')";

                // Tabs End =========================================================================

                // Panels Begin ========================================================================
                textToDisplay = "";
                textToDisplay += "<div class=\"section section-default\">";
                textToDisplay += "<div class=\"container\">";
                textToDisplay += "<div class=\"card card-block\">";
                textToDisplay += "<button type=\"button\" class=\"close btn\" data-dismiss=\"modal\" aria-label=\"X closes card section\"><span style=\"font-size: 0.8em;\">X</span></button>";
                textToDisplay += "<div class=\"group\">";
                textToDisplay += "<div class=\"two-thirds\">";
                textToDisplay += "<h1 class=\"m-y-0 \"><a aria-label=\"View Service Profile page for " + apiData[i].ServiceName + "\" href=\"" + apiData[i].ServiceUrl + "\" target=\"_blank\">" + apiData[i].ServiceName + "</a></h1>";
                textToDisplay += "<p class=\"lead\">" + apiData[i].FriendlyName + "</p>";

                holderDescription = apiData[i].Description;
                holderDescription = holderDescription.slice(0, 200) + "...";

                textToDisplay += holderDescription;
                textToDisplay += "</p><br />";
                textToDisplay += "<div class=\"btn-row m-b\">";
                textToDisplay += "<a aria-label=\" " + constantStart + " viewing the service page for " + apiData[i].ServiceName + " service\" href=\"" + apiData[i].ServiceUrl + "\" class=\"btn btn-default btn-block-xs\" target=\"_blank\"><span class=\"ca-gov-icon-online-services\"></span> " + constantStart + "</a>";

                textToDisplay += "<a aria-label=\" " + constantSeeDetails + " for " + apiData[i].ServiceName + " Service \" href=\"/" + lang + "/home/service/?Id=" + apiData[i].ServiceId + "\" class=\"btn btn-default btn-block-xs\"><span class=\"ca-gov-icon-info\"></span> " + constantSeeDetails + "</a>";
                textToDisplay += "</div>";
                textToDisplay += "<div class=\"location\" itemscope itemtype=\"http://schema.org/Organization\">";
                textToDisplay += "<meta itemprop=\"name\" content=\"" + apiData[i].FriendlyName + "\">";
                textToDisplay += "<div class=\"contact\">";
                textToDisplay += "<p class=\"other\">";
                if (apiData[i].ContactPhone) {
                    textToDisplay += constantGeneralInformation + ": <span itemprop=\"telephone\">" + apiData[i].ContactPhone + "</span><br>";
                }
                if (apiData[i].HearingImpairedPhone) {
                    textToDisplay += constantHearingImpaired + ": <span itemprop=\"telephone\">" + apiData[i].HearingImpairedPhone + "</span><br>";
                }
                if (apiData[i].FaxNumber) {
                    textToDisplay += constantFax + ": <span itemprop=\"faxNumber\">" + apiData[i].FaxNumber + "</span><br>";
                }
                textToDisplay += "</p>";
                textToDisplay += "</div>";

                textToDisplay += "</div>";
                textToDisplay += "</div>";
                textToDisplay += "<div class=\"third text-center\">";

                textToDisplay += "<img src=\"" + processJsonData.imageUrlPrefix + "/";
                if (apiData[i].LogoUrl) {
                    textToDisplay += apiData[i].LogoUrl;
                }
                else {
                    textToDisplay += "logo-CAGeneral.png";
                }
                textToDisplay += "\" class=\"img-responsive m-t-md\" alt=\"Logo for " + apiData[i].FriendlyName + "\">";


                textToDisplay += "</div>";
                textToDisplay += "</div>";
                textToDisplay += "</div>";
                textToDisplay += "</div>";
                textToDisplay += "</div>";

                idbuilder = "featured-service-panel-" + counter;
                $("#" + idbuilder).html(textToDisplay);

                // Panels End =========================================================================
            }


            if (counter == 0) {
                var textForElement = "<div style=\"margin: 0 auto; width: 275px \"><h2>No Featured Services</h2></div>";
                setTimeout(function () {
                    $("#featuredServicesListingText").html(textForElement);
                }, 100);
            }
            else {
                var element = "";
                setTimeout(function () {
                    for (var i = counter; i < 4; i++) {
                        var num = i + 1;
                        element = "featured-service-tab-" + num;
                        element = document.getElementById(element);
                        element.parentNode.removeChild(element);
                        element = "featured-service-panel-" + num;
                        element = document.getElementById(element);
                        element.parentNode.removeChild(element);
                    }
                }, 100);
            }


        });

    },
    
    showServiceDetails: function (idOfDivToFill, id, primaryFilter, secondaryFilter, serviceOrAgency, lang) {
        this.formatApiUrl(id, primaryFilter, secondaryFilter, serviceOrAgency, lang);
        var promise = this.getApiData(this.builtApiCall);
        promise.then(function (result) {
            this.apiData = result;
            this.textToDisplay = "";
            this.textToDisplay += "<div class=\"group\">";
            this.textToDisplay += "<div class=\"third\">";
            this.textToDisplay += "<img src=\"" + processJsonData.imageUrlPrefix + "/";
            if (this.apiData.ImageUrl) {
                this.textToDisplay += this.apiData.ImageUrl;
            }
            else {
                this.textToDisplay += "logo-CAGeneral.png";
            }
            this.textToDisplay += "\" alt=\"" + this.apiData.ServiceName + "\" class=\"img-responsive img-thumbnail\">";
            this.textToDisplay += "</div>";
            this.textToDisplay += "<div class=\"two-thirds\">";
            this.textToDisplay += "<h1 class=\"m-y-0 text-accent-p1\"><a href=\"" + this.apiData.ServiceUrl + "\" target=\"_blank\">" + this.apiData.ServiceName + "</a></h1>";
            this.textToDisplay += "<p class=\"lead\">";
            this.textToDisplay += this.apiData.FriendlyName;
            this.textToDisplay += "</p>";
            this.textToDisplay += "<p>" + this.apiData.Description + "</p>";
            this.textToDisplay += "<div class=\"btn-row m-y\">";
            this.textToDisplay += "<a aria-label=\"View Service web page for " + this.apiData.ServiceName + "\" href=\"" + this.apiData.ServiceUrl + "\" class=\"btn btn-primary btn-block-xs\" target=\"_blank\"><span class=\"ca-gov-icon-online-services\"></span>";
            this.textToDisplay += "&nbsp;<span>" + constantStart + "</span>";
            this.textToDisplay += "</a>";

            this.textToDisplay += "<a aria-label=\"" + constantContactUs + " Information\" target=\"_blank\" href=\"" + this.apiData.ContactUrl + "\" class=\"btn btn-primary btn-block-xs\">";
            this.textToDisplay += "<span class=\"ca-gov-icon-contact-us\"></span>";
            this.textToDisplay += "&nbsp;<span> " + constantContactUs + "</span>";
            this.textToDisplay += "</a>";
            this.textToDisplay += "</div>";
            this.textToDisplay += "<div class=\"location\" itemscope itemtype=\"http://schema.org/Organization\">";
            this.textToDisplay += "<meta itemprop=\"name\" content=\"" + this.apiData.FriendlyName + "\">";
            this.textToDisplay += "<p class=\"other\">";
            this.textToDisplay += constantGeneralInformation + ": <span itemprop=\"telephone\">" + this.apiData.ContactPhone + "</span><br>";
            this.textToDisplay += "</p>";
            this.textToDisplay += "</div>";
            this.textToDisplay += "</div>";
            this.textToDisplay += "</div>";
            $("#" + idOfDivToFill).html(this.textToDisplay);
        });
    },

    buildServiceCard: function (serviceId, serviceImage, serviceAgencyFriendlyName, serviceAgencyAcronym, serviceName, serviceUrl, serviceDescription, serviceContactPhone, lang) {
        var descriptionHolder = "";
        descriptionHolder = serviceDescription;
        descriptionHolder = descriptionHolder.slice(0, 95) + "...";

        var cardToBuild = "";
        cardToBuild += "<div class=\"card card-default\">";
        cardToBuild += "<div class=\"card-block\" id=\"collapse" + serviceId + "\" itemscope itemtype=\"http://schema.org/Organization\">";
        cardToBuild += "<div class=\"row\">";
        cardToBuild += "<div class=\"col-md-3\">";
        cardToBuild += "<img src=\"" + processJsonData.imageUrlPrefix + "/";
        if (serviceUrl) {
            cardToBuild += serviceImage;
        }
        else {
            cardToBuild += "service-General.jpg";
        }
        cardToBuild += "\" alt=\"Agency icon for " + serviceAgencyFriendlyName + "\" class=\"img-responsive\">";
        cardToBuild += "</div>";
        cardToBuild += "<div class=\"col-md-9\">";
        cardToBuild += "<a aria-label=\"" + serviceName + " Service. " + constantStart + " Service.\"  href=\"" + serviceUrl + "\" target=\"_blank\"  class=\"lead\">" + serviceName + "</a>";
        cardToBuild += "<div class=\"row\">";
        cardToBuild += "<div class=\"col-md-8\">";
        cardToBuild += "<p itemprop=\"name\">" + serviceAgencyFriendlyName + "</p>";
        cardToBuild += "<p itemprop=\"description\">" + descriptionHolder + "</p>";
        cardToBuild += "<div class=\"collapse collapse" + serviceId + "\">";
        cardToBuild += "<div class=\"location\" itemscope itemtype=\"http://schema.org/Organization\">";
        cardToBuild += "<meta itemprop=\"name\" content=\"" + serviceAgencyFriendlyName + "\">";
        cardToBuild += "<p class=\"other\">";
        cardToBuild += constantGeneralInformation + ": <span itemprop=\"telephone\">" + serviceContactPhone + "</span><br>";
        cardToBuild += "</p>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "<div class=\"col-md-4\">";
        cardToBuild += "<a aria-label=\"" + constantStart + " " + serviceName + " service\" href=\"" + serviceUrl + "\" target=\"_blank\" class=\"btn btn-secondary btn-block btn-sm\">" + constantStart + "</a>";
        cardToBuild += "<a aria-label=\"" + constantServiceDetails + " for " + serviceName + " \" href=\"/" + lang + "/home/service/?Id=" + serviceId + "\" class=\"btn btn-secondary btn-block btn-sm\">" + constantServiceDetails + "</a>";
        cardToBuild += "<div class=\"collapse collapse" + serviceId + "\">";
        // cardToBuild += "<a href=\"servicedetails.html?Id="+ this.apiData[i].ServiceId +"#frequently-asked-questions\" class=\"btn btn-secondary btn-block btn-sm\">FAQ's</a>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "<div class=\"card-block text-center\">";
        cardToBuild += "<a  aria-label=\"Open and Close card by clicking toggle to Expand and Shrink Service card for " + serviceName + " service\" style=\"padding: 10px 5px 5px 5px;text-decoration: none;\" href=\"javascript:toggleCollapseSwapper('toggle-" + serviceId + "-" + serviceAgencyAcronym + "');\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#collapse" + serviceId + "\" aria-expanded=\"false\" aria-controls=\"collapse" + serviceId + "\" data-target=\".collapse" + serviceId + "\">";
        cardToBuild += "<span id=\"toggle-" + serviceId + "-" + serviceAgencyAcronym + "\" style=\"color: #666666; font-size: 1.5em;\" class=\"ca-gov-icon-plus-fill\"></span><span class=\"sr-only\">Open</span>";
        cardToBuild += "</a>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";

        return cardToBuild;
    },
    
    showServicesList: function (idOfDivToFill, id, primaryFilter, secondaryFilter, serviceOrAgency, lang, instance) {
        this.formatApiUrl(id, primaryFilter, secondaryFilter, serviceOrAgency, lang);
        var promise = this.getApiData(this.builtApiCall);
        promise.then(function (result) {

            this.apiData = result;
            var arrayLength = this.apiData.length;

            var allOfTheCards = "";
            var halfOfTheCards = "";
            var otherHalfOfTheCards = "";

            if (constantShowFullCard == "true") {
                for (var i = 0; i < arrayLength; i++) {

                    allOfTheCards += processJsonData.buildServiceCard(this.apiData[i].ServiceId, this.apiData[i].ImageUrl, this.apiData[i].FriendlyName, this.apiData[i].Acronym, this.apiData[i].ServiceName, this.apiData[i].ServiceUrl, this.apiData[i].Description, this.apiData[i].ContactPhone,lang);

                }
            }
            else {
                for (var i = 0; i < arrayLength; i++) {
                    if (i & 1) {
                        
                        halfOfTheCards += processJsonData.buildServiceCard(this.apiData[i].ServiceId, this.apiData[i].ImageUrl, this.apiData[i].FriendlyName, this.apiData[i].Acronym, this.apiData[i].ServiceName, this.apiData[i].ServiceUrl, this.apiData[i].Description, this.apiData[i].ContactPhone, lang);
                        
                    }
                    else {

                        otherHalfOfTheCards += processJsonData.buildServiceCard(this.apiData[i].ServiceId, this.apiData[i].ImageUrl, this.apiData[i].FriendlyName, this.apiData[i].Acronym, this.apiData[i].ServiceName, this.apiData[i].ServiceUrl, this.apiData[i].Description, this.apiData[i].ContactPhone, lang);

                    }
                }
            }

            var displayText = "";
            
            if (constantShowFullCard == "true") {
                displayText += "<div class=\"row\">";
                displayText += "<div class=\"full\">";
                displayText += allOfTheCards;
                displayText += "</div>";
                displayText += "</div>";
            }
            else {
                displayText += "<div class=\"row\">";
                displayText += "<div class=\"half\">";
                displayText += "<p id=\"servicesLeft" + instance + "\">";
                displayText += otherHalfOfTheCards;
                displayText += "</p>";
                displayText += "</div>";
                displayText += "<div class=\"half\">";
                displayText += "<p id=\"servicesRight" + instance + "\">";
                displayText += halfOfTheCards;
                displayText += "</p>";
                displayText += "</div>";
                displayText += "</div>";
            }
            
            $("#" + idOfDivToFill).html(displayText);
        });
    },

//####################################################################################################
//    Display Agency Functions
//####################################################################################################

    showAgencyDetails: function (idOfDivToFill, id, primaryFilter, secondaryFilter, serviceOrAgency, lang) {
        this.formatApiUrl(id, primaryFilter, secondaryFilter, serviceOrAgency, lang);
        var promise = this.getApiData(this.builtApiCall);
        promise.then(function (result) {
            this.apiData = result;
            this.textToDisplay = "";
            this.textToDisplay += "<div class=\"quarter text-center\">";
            this.textToDisplay += "<img src=\"" + processJsonData.imageUrlPrefix + "/";
            if (this.apiData.LogoUrl) {
                this.textToDisplay += this.apiData.LogoUrl;
            } else {
                this.textToDisplay += "logo-CAGeneral.png";
            }
            this.textToDisplay += "\" class=\"img-responsive m-b\" alt=\"image for " + this.apiData.FriendlyName + "\">";
            this.textToDisplay += "</div>";
            this.textToDisplay += "<div class=\"three-quarters\">";
            this.textToDisplay += "<h1 class=\"text-accent-p1 m-t-0\">" +
                this.apiData.FriendlyName +
                " (" +
                this.apiData.Acronym +
                ")</h1>";
            this.textToDisplay += "<p>" + this.apiData.Description + "</p>";
            this.textToDisplay += "<div class=\"btn-row\">";
            this.textToDisplay += "<a aria-label=\"" + constantWebsite + " Launch\" target=\"_blank\" href=\"" +
                this.apiData.WebsiteURL +
                "\" class=\"btn btn-primary\"><span class=\"ca-gov-icon-online-services\"></span>&nbsp;<span> " +
                constantWebsite +
                "</span></a>";
            this.textToDisplay += "<a aria-label=\"" + constantContact + " for " + this.apiData.FriendlyName + "\" target=\"_blank\" href=\"" +
                this.apiData.ContactURL +
                "\" class=\"btn btn-primary\"><span class=\"ca-gov-icon-contact-us\"></span>&nbsp;<span> " +
                constantContact +
                "</span></a>";
            this.textToDisplay += "</div>";
            this.textToDisplay +=
                "<div class=\"location contact\" itemscope=\"\" itemtype=\"http://schema.org/Organization\">";
            this.textToDisplay += "<meta itemprop=\"name\" content=\"" + this.apiData.FriendlyName + "\">";
            this.textToDisplay += "<div class=\"contact\">";
            this.textToDisplay += "<p class=\"other\">";
            if (this.apiData.ContactPhone) {
                this.textToDisplay += constantGeneralInformation +
                    ": <span itemprop=\"telephone\">" +
                    this.apiData.ContactPhone +
                    "</span><br>";
            }
            if (this.apiData.HearingImpairedPhone) {
                this.textToDisplay += constantHearingImpaired +
                    ": <span itemprop=\"telephone\">" +
                    this.apiData.HearingImpairedPhone +
                    "</span><br>";
            }
            if (this.apiData.FaxNumber) {
                this.textToDisplay += constantFax +
                    ": <span itemprop=\"faxNumber\">" +
                    this.apiData.FaxNumber +
                    "</span><br>";
            }
            this.textToDisplay += "</p>";
            this.textToDisplay += "</div>";
            this.textToDisplay += "</div>";
            this.textToDisplay += "<ul class=\"list-inline list-unstyled details-page-social-icons\">";
            if (this.apiData.TwitterAccount) {
                var thisitem1 = this.apiData.TwitterAccount;
                thisitem1 = thisitem1.replace("https://", "");
                thisitem1 = thisitem1.replace("http://", "");
                thisitem1 = thisitem1.replace("www.twitter.com/", "");
                this.textToDisplay += "<li style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
                this.textToDisplay += "<a aria-label=\"Twitter Information for " + this.apiData.FriendlyName + "\" target=\"_blank\" href=\"https://twitter.com/" +
                    thisitem1 +
                    "\"><span class=\"ca-gov-icon-twitter\" aria-hidden=\"true\"><span class=\"sr-only\">Twitter</span></span></a>";
                this.textToDisplay += "</li>";
            }
            if (this.apiData.Facebook) {
                var thisitem2 = this.apiData.Facebook;
                thisitem2 = thisitem2.replace("https://", "");
                thisitem2 = thisitem2.replace("http://", "");
                thisitem2 = thisitem2.replace("www.facebook.com/", "");
                this.textToDisplay += "<li style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
                this.textToDisplay += "<a aria-label=\"Facebook Information for " + this.apiData.FriendlyName + "\" target=\"_blank\" href=\"https://www.facebook.com/" +
                    thisitem2 +
                    "\"><span class=\"ca-gov-icon-facebook\" aria-hidden=\"true\"><span class=\"sr-only\">Facebook</span></span></a>";
                this.textToDisplay += "</li>";
            }
            if (this.apiData.YouTube) {
                var thisitem3 = this.apiData.YouTube;
                thisitem3 = thisitem3.replace("https://", "");
                thisitem3 = thisitem3.replace("http://", "");
                thisitem3 = thisitem3.replace("www.youtube.com/", "");
                this.textToDisplay += "<li aria-label=\"YouTube  Information for " + this.apiData.FriendlyName + "\" style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
                this.textToDisplay += "<a target=\"_blank\" href=\"https://www.youtube.com/" +
                    thisitem3 +
                    "\"><span class=\"ca-gov-icon-youtube\" aria-hidden=\"true\"><span class=\"sr-only\">YouTube</span></span></a>";
                this.textToDisplay += "</li>";
            }
            this.textToDisplay += "</ul>";
            this.textToDisplay += "</div>";
            $("#" + idOfDivToFill).html(this.textToDisplay);
        });
    },
    
    buildAgencyCard: function (agencyId, agencyLogo, agencyFriendlyName, agencyAcronym, agencyUrl, agencyDescription, agencyContactPhone, agencyHearingImpairedPhone, agencyFaxNumber, agencyContactUrl, agencyTwitterAccount, agencyFacebook, agencyYouTube, agencyContactEmail, lang) {
        var descriptionHolder = "";
        descriptionHolder = agencyDescription;
        descriptionHolder = descriptionHolder.slice(0, 95) + "...";

        var cardToBuild = "";

        cardToBuild += "<div class=\"card card-default\">";
        cardToBuild += "<div class=\"card-block\" id=\"collapse-" + agencyId + "-" + agencyAcronym + "\" itemscope itemtype=\"http://schema.org/Organization\">";
        cardToBuild += "<div class=\"row\">";
        cardToBuild += "<div class=\"col-md-3 col-xs-4\">";
        cardToBuild += "<img class=\"img-responsive\" src=\"" + processJsonData.imageUrlPrefix + "/";
        if (agencyLogo) {
            cardToBuild += agencyLogo;
        }
        else {
            cardToBuild += "logo-CAGeneral.png";
        }
        cardToBuild += "\" alt=\"Logo for " + agencyFriendlyName + "\">";
        cardToBuild += "</div>";
        cardToBuild += "<div class=\"col-md-9 col-xs-8\">";
        cardToBuild += "<a aria-label=\"" + agencyFriendlyName + "Agency Details. Select for Details\" href=\"/" + lang + "/Home/Agency/?Id=" + agencyId + "\" class=\"lead\" itemprop=\"name\">" + agencyFriendlyName + "</a>";
        cardToBuild += "<div class=\"row\">";
        cardToBuild += "<div class=\"col-md-8\">";
        cardToBuild += "<p itemprop=\"description\">" + descriptionHolder + "</p>";
        cardToBuild += "<div class=\"collapse collapse-" + agencyId + "-" + agencyAcronym + "\">";
        cardToBuild += "<p class=\"other\">";
        if (agencyContactPhone) {
            cardToBuild += constantGeneralInformation + ": <span itemprop=\"telephone\">" + agencyContactPhone + "</span><br>";
        }
        if (agencyHearingImpairedPhone) {
            cardToBuild += constantHearingImpaired + ": <span itemprop=\"telephone\">" + agencyHearingImpairedPhone + "</span><br>";
        }
        if (agencyFaxNumber) {
            cardToBuild += constantFax + ": <span itemprop=\"faxNumber\">" + agencyFaxNumber + "</span><br>";
        }

        cardToBuild += "</p>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "<div class=\"col-md-4\">";
        cardToBuild += "<a aria-label=\"" + constantAgencyDetails + " for " + agencyFriendlyName + "\" href=\"/" + lang + "/Home/Agency/?Id=" + agencyId + "\" class=\"btn btn-secondary btn-block btn-sm\">" + constantAgencyDetails + "</a>";
        cardToBuild += "<div class=\"collapse collapse-" + agencyId + "-" + agencyAcronym + "\">";
        cardToBuild += "<a aria-label=\"" + constantContactAgency + "\" href=\"" + agencyContactUrl + "\" class=\"btn btn-secondary btn-block btn-sm\">" + constantContactAgency + "</a>";
        //					cardToBuild += "<a href=\"\" class=\"btn btn-secondary btn-block btn-sm\">Show on Map</a>";
        //					cardToBuild += "<a href=\"\" class=\"btn btn-secondary btn-block btn-sm\">Live Chat</a>";
        cardToBuild += "<ul class=\"list-inline list-unstyled details-page-social-icons\">";
        if (agencyTwitterAccount) {
            var thisitem1 = agencyTwitterAccount;
            thisitem1 = thisitem1.replace("https://", "");
            thisitem1 = thisitem1.replace("http://", "");
            thisitem1 = thisitem1.replace("www.twitter.com/", "");
            cardToBuild += "<li style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
            cardToBuild += "<a aria-label=\"Twitter Information for " + agencyFriendlyName + "\" target=\"_blank\" href=\"https://twitter.com/" + thisitem1 + "\"><span class=\"ca-gov-icon-twitter\" aria-hidden=\"true\"><span class=\"sr-only\">Twitter</span></span></a>";
            cardToBuild += "</li>";
        }
        if (agencyFacebook) {
            var thisitem2 = agencyFacebook;
            thisitem2 = thisitem2.replace("https://", "");
            thisitem2 = thisitem2.replace("http://", "");
            thisitem2 = thisitem2.replace("www.facebook.com/", "");
            cardToBuild += "<li style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
            cardToBuild += "<a aria-label=\"Facebook Information for " + agencyFriendlyName + "\" target=\"_blank\" href=\"https://www.facebook.com/" + thisitem2 + "\"><span class=\"ca-gov-icon-facebook\" aria-hidden=\"true\"><span class=\"sr-only\">Facebook</span></span></a>";
            cardToBuild += "</li>";
        }
        if (agencyYouTube) {
            var thisitem3 = agencyYouTube;
            thisitem3 = thisitem3.replace("https://", "");
            thisitem3 = thisitem3.replace("http://", "");
            thisitem3 = thisitem3.replace("www.youtube.com/", "");
            cardToBuild += "<li style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
            cardToBuild += "<a aria-label=\"YouTube  Information for " + agencyFriendlyName + "\" target=\"_blank\" href=\"https://www.youtube.com/" + thisitem3 + "\"><span class=\"ca-gov-icon-youtube\" aria-hidden=\"true\"><span class=\"sr-only\">YouTube</span></span></a>";
            cardToBuild += "</li>";
        }
        if (agencyContactEmail) {
            cardToBuild += "<li style=\"margin-right:8px;margin-left: 8px;margin-top: 10px;\">";
            cardToBuild += "<a href=\"mailto:" + agencyContactEmail + "\"><span class=\"ca-gov-icon-share-email\" aria-hidden=\"true\"><span class=\"sr-only\">Email</span></span></a>";
            cardToBuild += "</li>";
        }
        cardToBuild += "</ul>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        cardToBuild += "<div class=\"text-center m-b\">";
        cardToBuild += "<a aria-label=\"Open and Close card by clicking toggle to Expand and Shrink Agency card for " + agencyFriendlyName + "\"  style=\"padding: 10px 5px 5px 5px;text-decoration: none;\" href=\"javascript:toggleCollapseSwapper('toggle-" + agencyId + "-" + agencyAcronym + "');\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#collapse-" + agencyId + "-" + agencyAcronym + "\" aria-expanded=\"false\" aria-controls=\"collapse-" + agencyId + "-" + agencyAcronym + "\" data-target=\".collapse-" + agencyId + "-" + agencyAcronym + "\">";
        cardToBuild += "<span id=\"toggle-" + agencyId + "-" + agencyAcronym + "\" style=\"color: #666666; font-size: 1.5em;\" class=\"ca-gov-icon-plus-fill\"></span><span class=\"sr-only\">Open</span></a> ";
        cardToBuild += "</div>";
        cardToBuild += "</div>";
        
        return cardToBuild;
    },
    
    showAgenciesList: function(idOfDivToFill, id, primaryFilter, secondaryFilter, serviceOrAgency, lang) {
        this.formatApiUrl(id, primaryFilter, secondaryFilter, serviceOrAgency, lang);
        var promise = this.getApiData(this.builtApiCall);
        promise.then(function (result) {
            this.apiData = result;
            var arrayLength = this.apiData.length;

            var allOfTheCards = "";
            var halfOfTheCards = "";
            var otherHalfOfTheCards = "";

            if (constantShowFullCard == "true") {
                for (var i = 0; i < arrayLength; i++) {

                    allOfTheCards += processJsonData.buildAgencyCard(apiData[i].AgencyId, apiData[i].LogoUrl, apiData[i].FriendlyName, apiData[i].Acronym, apiData[i].WebsiteURL, apiData[i].Description, apiData[i].ContactPhone, apiData[i].HearingImpairedPhone, apiData[i].FaxNumber, apiData[i].ContactURL, apiData[i].TwitterAccount, apiData[i].Facebook, apiData[i].YouTube, apiData[i].ContactEmail, lang);

                }
            }
            else {
                for (var i = 0; i < arrayLength; i++) {
                    if (i & 1) {

                        halfOfTheCards += processJsonData.buildAgencyCard(apiData[i].AgencyId, apiData[i].LogoUrl, apiData[i].FriendlyName, apiData[i].Acronym, apiData[i].WebsiteURL, apiData[i].Description, apiData[i].ContactPhone, apiData[i].HearingImpairedPhone, apiData[i].FaxNumber, apiData[i].ContactURL, apiData[i].TwitterAccount, apiData[i].Facebook, apiData[i].YouTube, apiData[i].ContactEmail, lang);

                    }
                    else {

                        otherHalfOfTheCards += processJsonData.buildAgencyCard(apiData[i].AgencyId, apiData[i].LogoUrl, apiData[i].FriendlyName, apiData[i].Acronym, apiData[i].WebsiteURL, apiData[i].Description, apiData[i].ContactPhone, apiData[i].HearingImpairedPhone, apiData[i].FaxNumber, apiData[i].ContactURL, apiData[i].TwitterAccount, apiData[i].Facebook, apiData[i].YouTube, apiData[i].ContactEmail, lang);


                    }
                }
            }
            
            var displayText = "";

            if (constantShowFullCard == "true") {
                displayText += "<div class=\"row\">";
                displayText += "<div class=\"full\">";
                displayText += allOfTheCards;
                displayText += "</div>";
                displayText += "</div>";
            }
            else {
                displayText += "<div class=\"row\">";
                displayText += "<div class=\"half\">";
                displayText += "<p id=\"agencyLeft\">";
                displayText += otherHalfOfTheCards;
                displayText += "</p>";
                displayText += "</div>";
                displayText += "<div class=\"half\">";
                displayText += "<p id=\"agencyRight\">";
                displayText += halfOfTheCards;
                displayText += "</p>";
                displayText += "</div>";
                displayText += "</div>";
            }

            $("#" + idOfDivToFill).html(displayText);
        });
    }

}