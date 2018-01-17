

$.ajaxSetup({
   type: 'POST',
   timeout: 15000,
});

$(function() {
    if (annyang)
    {
        var commands =
        {
            'hello': function() {notify();},
            'take note *note': function(note) {take_note(note);},
            'play classical': function() {play_classical();},
            'play penguin': function() {youtube_pororo();},
            'play dinosaur': function() {youtube_pororo_dinosaur();},
            'show monitor': function() {show_monitor();},
            'show better monitor': function() {show_better_monitor();},
            'show notes': function() {show_notes();},
            'clear notes': function() {clear_notes();},
            'show diss': function() {show_dis();},
            'open netflix': function() {open_netflix();},
            'open psych': function() {open_psych();},
            'open times': function() {open_nytimes();},
            'open npr': function() {open_npr();},
            'open gmail': function() {open_gmail();},
            'go to :website': function(website) {go_to_website(website);},
            'define *wordorphrase': function(wordorphrase) {define_wordorphrase(wordorphrase);},
            'google *stuff': function(stuff) {google_stuff(stuff);},
            'close tab': function() {close_tab();},
            'help': function() {help();},
            'shut down': function() {shut_down();}
        }
        annyang.debug();
        annyang.addCommands(commands);
        // Tell KITT to use annyang
        SpeechKITT.annyang();

        // Define a stylesheet for KITT to use
        SpeechKITT.setStylesheet('SpeechKITT/dist/themes/flat.css');

        // Render KITT's interface
        SpeechKITT.vroom();
        annyang.start();
    }
});

var tab_wordorphrase
var tab_gmail
var tab_nytimes
var tab_npr
var tab_psych
var tab_netflix
var tab_pororo_dinosaur
var tab_pororo

function go_to_website(website)
{
    notify();
    newwindow = window.open('https://www.'+website);
}

function shut_down()
{
    notify();
    chrome.windows.remove(windowId, callback);
}

function help()
{
    notify();
    var formObj = {};
    $.ajax({
            url: "./help.py",
            type: "POST",
            data: formObj,
            success: function() {
                    displayMessage("<span style='color:green'></span>")
                },
            error: function() {
                    displayMessage("<span style='color:red'>Error:</span> ")
                },
       });
    $('#iframe').attr('src', "http://uaf-8.t2.ucsd.edu/~phchang/ai/help.txt");
}

function close_tab()
{
    notify();
}

function define_wordorphrase(wordorphrase)
{
    notify();
    if (tab_wordorphrase)
        tab_wordorphrase.close();
    tab_wordorphrase = window.open('https://www.google.com/search?q=define+'+wordorphrase, 'dictionary');
}

function google_stuff(stuff)
{
    notify();
    newwindow = window.open('https://www.google.com/search?q='+stuff);
}

function open_gmail()
{
    notify();
    if (tab_gmail)
        tab_gmail.close();
    tab_gmail = window.open('https://www.gmail.com', 'gmail');
}

function open_npr()
{
    notify();
    if (tab_npr)
        tab_npr.close();
    tab_npr = window.open('https://www.npr.org', 'npr');
}

function open_nytimes()
{
    notify();
    if (tab_nytimes)
        tab_nytimes.close();
    tab_nytimes = window.open('https://www.nytimes.com', 'nytimes');
}

function open_psych()
{
    notify();
    if (tab_psych)
        tab_psych.close();
    tab_psych = window.open('https://www.amazon.com/Lassie-Jerky/dp/B00BMKI4W8/ref=sr_1_7?s=instant-video&ie=UTF8&qid=1516178242&sr=1-7&keywords=psych', 'psych');
}

function open_netflix()
{
    notify();
    if (tab_netflix)
        tab_netflix.close();
    tab_netflix = window.open('https://www.netflix.com','Netflix');
}

function youtube_pororo_dinosaur()
{
    notify();
    if (tab_pororo_dinosaur)
        tab_pororo_dinosaur.close();
    tab_pororo_dinosaur = window.open('https://www.youtube.com/embed/cCoPsbwwEMo?autoplay=1','Pororo dinosaur');
}

function youtube_pororo()
{
    notify();
    if (tab_pororo)
        tab_pororo.close();
    tab_pororo = window.open('https://www.youtube.com/results?search_query=%EB%BD%80%EB%A1%9C%EB%A1%9C','Pororo');
}

function show_notes()
{
    notify();
    $('#iframe').attr('src', "http://uaf-8.t2.ucsd.edu/~phchang/ai/note.txt");
}

function show_dis()
{
    notify();
    $('#iframe').attr('src', "http://uaf-10.t2.ucsd.edu/~namin/makers/disMaker/#");
}

function show_better_monitor()
{
    notify();
    $('#iframe').attr('src', "http://uaf-10.t2.ucsd.edu/~namin/status_index.html");
}

function show_monitor()
{
    notify();
    $('#iframe').attr('src', "http://uaf-8.t2.ucsd.edu/~namin/monitoring/overview.html#");
}

function play_classical()
{
    notify();
    newwindow = window.open('http://www.radioline.co/listen-to-kpbs-2-classical-san-diego#radios/kpbs-2-classical-san-diego','Classical San Diego','width=600,height=100');
}

function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
}

function notify() {
    playSound(recognizeSound);
}

function displayMessage(html) {
    $("#message").stop().fadeIn(0).html(html).delay(5000).fadeOut(2000);
}

function clear_notes()
{
    notify();
    var formObj = {};
    formObj["data"] = "clear";
    formObj["action"] = "clear";
    console.log(formObj);
    $.ajax({
            url: "./note.py",
            type: "POST",
            data: formObj,
            success: function(data) {
                    displayMessage("<span style='color:green'>"+data+"</span>")
                    console.log(data);
                },
            error: function(data) {
                    displayMessage("<span style='color:red'>Error:</span> "+data["responseText"])
                    console.log(data);
                },
       });
}

function take_note(note)
{
    notify();
    $('#note p').text(note);
    var clipText = $("#twikiTextarea").val();
    var formObj = {};
    formObj["data"] = note + "\n" + clipText;
    formObj["action"] = "take";
    console.log(formObj);
    $.ajax({
            url: "./note.py",
            type: "POST",
            data: formObj,
            success: function(data) {
                    displayMessage("<span style='color:green'>"+data+"</span>")
                    console.log(data);
                },
            error: function(data) {
                    displayMessage("<span style='color:red'>Error:</span> "+data["responseText"])
                    console.log(data);
                },
       });
}
