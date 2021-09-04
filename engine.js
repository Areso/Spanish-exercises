//DOM OBJECTS
topicLbl = document.getElementById("textTopic");
tgtLng   = document.getElementById("textTgtLng");
ntvLng   = document.getElementById("textNtvLng");
mnImg    = document.getElementById("image");
txtAns   = document.getElementById("txtAns");
txtRes   = document.getElementById("textRes");
btnCheck = document.getElementById("btnCheck");
btnTrain = document.getElementById("btnTrain");
btnNextMemo  = document.getElementById("btnNextMemo");
btnNextQst   = document.getElementById("btnNextQst");
divSelTopic  = document.getElementById("divTopicSelector");
divTopic = document.getElementById("divTopic");
selector = document.getElementById("topicSelector");
//JS INIT
posRe = 0;
posTr = 0;
topic = 0;
noun_counter = 0;
//ENTRY POINT
function loadSelectedTopic() {
	divSelTopic.style="display: none";
	divTopic.style="display: block";
	console.log(selector);
	path_to_load = selector.value+".js"
	console.log(path_to_load);
	include(path_to_load,function(){
		loadLesson();
	});
}
function loadLesson() {
	topicLbl.innerText = topicName;
	tgtLng.innerText   = cards[posRe].tgt;
	ntvLng.innerText   = cards[posRe].ntv;
}
function nextCard() {
	console.log(cards.length);
	if (posRe <= cards.length-2) {
		posRe     = posRe + 1;
		tgtLng.innerText = cards[posRe].tgt;
		ntvLng.innerText = cards[posRe].ntv;
		//mnImg.innerHTML = "<img src='"+cards[posRe].img+"'>";
	}
	if (posRe === cards.length-1) {
		btnNextMemo.style  = "display: none";
		btnTrain.style     = "display: block";
	}
}
function loadTraining() {
	card_id = 0;
	btnTrain.style     = "display: none";
	btnNextMemo.style  = "display: none";
	btnCheck.style     = "display: block";
	txtAns.style       = "display: block";
	txtAns.value       = "";
	btnNextQst.style   = "display: block";
	if (selector.value==="regular_verbs"){
		form_counter = 0;
	}
	nextQuestion();
}
function nextQuestion() {
	if (selector.value==="regular_verbs"){
		console.log("try to summup a question");
		txtRes.innerText = "";
		txtAns.value     = "";
		tgtLng.innerText = "";
		//now we are dropping 'to' from the english card translation
		//for example, 'to work'. We are dropping first three symbols 'to '
		ntv_verb         = cards[card_id].ntv.substring(3, cards[card_id].tgt.length)
		conj_group       = cards[card_id].conj
		ntvLng.innerText = rules[conj_group][form_counter]["qst"]+" "+ntv_verb;
		btnCheck.style   = "display: block";
		btnNextQst.style = "display: none";
	}
}
function check() {
	if (selector.value==="regular_verbs"){
		conj = cards[posTr].conj;
		correct_ans  = rules[conj][form_counter].noun+" "+cards[card_id].tgt.substring(0, cards[card_id].tgt.length-2)
		correct_ans += rules[conj][form_counter].ans.substring(1, rules[conj][form_counter].ans.length);
		correct_ans_lc  = correct_ans.toLowerCase();
		correct_ans_nd  = correct_ans_lc.replace("ú","u");
		correct_ans_nd  = correct_ans_nd.replace("á","a");
		correct_ans_nd  = correct_ans_nd.replace("á","a");
		correct_ans_nd  = correct_ans_nd.replace("í","i");
		correct_ans_nd  = correct_ans_nd.replace("é","e");
		prov_ans_lc     = txtAns.value.toLowerCase();
		prov_ans_nd     = prov_ans_lc.replace("ú","u");
		prov_ans_nd     = prov_ans_nd.replace("á","a");
		prov_ans_nd     = prov_ans_nd.replace("á","a");
		prov_ans_nd     = prov_ans_nd.replace("í","i");
		prov_ans_nd     = prov_ans_nd.replace("é","e");
		if (prov_ans_lc === correct_ans_lc) {
			txtRes.innerText="True!"
		} else {
			if (prov_ans_nd === correct_ans_nd) {
				txtRes.innerText="Truish, but pay attention to diacretic symbols!"
			} else {
				txtRes.innerHTML = "False! Correst answer is "+correct_ans;
			}
		}
		btnCheck.style  = "display: none";
	}
	
	btnNextQst.style = "display: block";
	if (selector.value==="regular_verbs"){
		if (card_id === cards.length-1 && form_counter === 11) {
			btnNextQst.style = "display: none";
			//TODO make return to Main Menu button there!
		}
	} else {
		if (card_id === cards.length-1) {
			btnNextQst.style = "display: none";
		}
	}
	if (form_counter===11){
		card_id       = card_id+1;
		form_counter  = 0;
	} else {
		form_counter += 1;
	}
}
//HELPERS
function inArray(needle,haystack){
	console.log(needle)
	console.log(haystack)
	count=haystack.length;
	for(var i=0;i<count;i++){
		if(haystack[i]===needle){return true;}
	}
	return false;
}
include = function (url, fn) {
	var e = document.createElement("script");
	e.onload = fn;
	e.src = url;
	e.async=true;
	document.getElementsByTagName("head")[0].appendChild(e);
};
