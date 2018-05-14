/// <reference path="ingest-sdk.js" />


var ingestAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovLyouaW5nZXN0LmlvIiwiY2lkIjoiRnUzUlBKNUtWWk82TkQ2N05ncUYiLCJleHAiOjE1MDk4ODk4OTMsImp0aSI6ImE2N2QzZGViLTQyNTktNDRiMS1hOGY3LWQ0MWNkZWM0M2MzNiIsImlhdCI6MTUwOTgwMzQ5MywiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbmdlc3QuaW8vcGVyc29uYWwiLCJudHciOiJhODAyNzY4OC1lZWRlLTQ3YTctYjViMS04OTJkODBmMGI4NTAiLCJzY29wZSI6eyJhY3Rpb25zIjpbInJlYWRfdmlkZW9zIiwid3JpdGVfdmlkZW9zIiwicmVhZF9wcm9maWxlcyIsIndyaXRlX3Byb2ZpbGVzIiwid3JpdGVfbG9ja2VkX3Byb2ZpbGVzIiwicmVhZF9uZXR3b3JrcyIsIndyaXRlX25ldHdvcmtzIiwicmVhZF9uZXRLZXlzIiwid3JpdGVfbmV0S2V5cyIsInJlYWRfam9icyIsIndyaXRlX2pvYnMiLCJyZWFkX2lucHV0cyIsIndyaXRlX2lucHV0cyIsInJlYWRfYmlsbGluZyIsIndyaXRlX2JpbGxpbmciLCJyZWFkX3VzZXJzIiwid3JpdGVfdXNlcnMiLCJyZWFkX2hvb2tzIiwid3JpdGVfaG9va3MiLCJyZWFkX2V2ZW50cyIsInJlYWRfbGl2ZSIsIndyaXRlX2xpdmUiLCJyZWFkX2NsaWVudHMiLCJ3cml0ZV9jbGllbnRzIiwicGVyc29uYWwiXX0sInN1YiI6ImYwNGI2YWY2LTVmMzYtNGZjYi05ZDQ2LTA3MzZmN2JmYmEyMyJ9.tQGG5QrSR-sFhakVoHWGCXZachINZwlWAmMRpAdetILCyJ8y5S3GnRQh1GO3xdeu_npMZaLfdYHxWjQhK7wXYWeH1wYfMycCM6E570oqUt-2YKreGORO16EWZ5XX1thhEFzXHmEzg5NBk5J8ETF5VWyOuDNtPv-P56mFVK3FK75inx_Q0hnBFe4xLi8qdDEHPcsOXNJ4QpWxpCvD-Olf_-1rYha1tzbBOgL2ActNgBqlYALkbVB936k6v9EPcH0HKVH5gh_dPTnX_20KPSt5UTpVc3XS0ZR5R3o5u5tRSgN4QCk0PD6Zm0nHuPmp-4zl0K3HyUECglKL1rHg2D8H7Q";

var ingest = null;

$(document).ready(function () {

    $('#myModal').modal({
        show: false
    });

    ingest = new IngestSDK({
        token: 'Bearer '+ingestAccessToken
    });


    ingest.videos.getAll().then(function (response) {
        
        var divElement = $("#ulVideoList");
        if (response == null) return;
        var data = response.data;        
        divElement.html('');
        $.each(data, function (i, datum) {

            //Create Thumbnil Image
            var htmlment = "<div class=\"col-lg-6\"><div class=\"thumbnail\"><img src=" + datum.poster.thumbnail_url + "  class=\"img-rounded\" > <div class=\"caption\"><p>" + datum.title + "</p><button onClick=\"OnPlay(this,'" + datum.targets[0].playback_url + "')\" class=\"btn btn-info\"> Play</button></div></div></div>";
           
            divElement.append(htmlment);

        });

    });

});

function onClose(){
    $('#targetFrame').attr('src', "");.


}

function OnPlay(button,playLink)
{
    $('#targetFrame').attr('src', playLink);

    $('#myModal').modal('show');
}


function DownloadSummaryVideo() {

    try {
        $("#loadImage").show();
        $("#downloadButton").hide();
        $(".overlay").show();

        var playLink = $('#targetFrame').attr('src');
        playLink = encodeURI(playLink);

        var postLink = "http://localhost:31021/GenerateVideoSummarization?ingestVideoUrl=" + playLink;

        console.log(postLink);

        window.location.href = postLink;


        //var settings = {
        //    "async": true,
        //    "crossDomain": true,
        //    "url": postLink,
        //    "method": "GET",
        //    "headers": {
        //        "cache-control": "no-cache"               
        //    }
        //}

        //$.ajax(settings).done(function (response) {
        //    alert("Download Completed");
        //    ;
        //});
        
    } catch (e) {
        console.log(e.message);
    }
}

function dosomething() {
    $("#loadImage").hide();
    $("#downloadButton").show();
    $(".overlay").hide()

}