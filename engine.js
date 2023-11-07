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
topic = 0;
noun_counter = 0;
//ENTRY POINT
function loadSelectedTopic() {
	divSelTopic.style  = "display: none";
	divTopic.style     = "display: block";
	console.log(selector);
	path_to_load       = selector.value+".js"
	console.log(path_to_load);
	include(path_to_load,function(){
		loadLesson();
	});
}
function loadLesson() {
	console.log(cards);
	buildDeck();
	topicLbl.innerText = topicName;
	tgtLng.innerText   = cards[card_id].tgt;
	ntvLng.innerHTML   = cards[card_id].ntv;
	if (selector.value==="irregular_verbs"){
		for (form_id=0;form_id<11;form_id++){
			ntvLng.innerHTML += "<br>" + cards[card_id].forms[form_id][0];
			ntvLng.innerHTML += " "    + cards[card_id].forms[form_id][1];
		}
	}
	cards_deck_learn   = new Array();
	for (i=0;i<cards_deck.length;i++){
		cards_deck_learn.push(cards_deck[i])
	}
	console.log("show me cards_deck_learn");
	console.log(cards_deck_learn); 
}
function buildDeck() {
	smallPractice      = true;
	if (smallPractice) {//FOR DEBUG!
		console.log("build a custom deck to train it");
		if (cards.length>2) {
			number_of_cards_to_train = 2;
		} else {
			number_of_cards_to_train = cards.length;
		}
		console.log("number of custom deck cards");
		console.log(number_of_cards_to_train);
		number_cards_in_deck       = 0;
		cards_deck                 = [];
		card_id_deck_iterator      = 0;
		while (number_cards_in_deck < number_of_cards_to_train) {
			roll_the_dice          = Math.floor(Math.random()*cards.length);
			if (roll_the_dice === 0) {
				//check whether this card is already added or not?
				if (!inArray2(cards_deck,card_id_deck_iterator)){
					cards_deck.push(card_id_deck_iterator);
					number_cards_in_deck  += 1;
				}
			}
			if (card_id_deck_iterator<cards.length-1){
				card_id_deck_iterator += 1;
			} else {
				card_id_deck_iterator  = 0;
			} 
		}
		card_id = cards_deck[0];
	}
	console.log("show me my deck cards_deck");
	console.log(cards_deck);
}
function nextCard() {
	
	if (cards_deck_learn.length > 1){
		cards_deck_learn.shift();
		card_id = cards_deck_learn[0];
		tgtLng.innerText = cards[card_id].tgt;
		ntvLng.innerText = cards[card_id].ntv;
		if (selector.value==="irregular_verbs"){
		for (form_id=0;form_id<11;form_id++){
			ntvLng.innerHTML += "<br>" + cards[card_id].forms[form_id][0];
			ntvLng.innerHTML += " "    + cards[card_id].forms[form_id][1];
		}
	}
	} else {
		cards_deck_learn.shift(); //delete the last item, so the array is empty
		checkBtn.style  = "display: none";
		nextBtn.style     = "display: block";
	}
}
function loadTraining() {
	if (smallPractice){
		card_id = cards_deck[0];
	} else { 
		card_id = 0;
	}
	btnTrain.style     = "display: none";
	btnNextMemo.style  = "display: none";
	btnCheck.style     = "display: block";
	txtAns.style       = "display: block";
	txtAns.value       = "";
	btnNextQst.style   = "display: block";

	if (selector.value==="regular_verbs"){
		form_counter = 0;
	}
	if (selector.value==="irregular_verbs"){
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
		conj_group       = cards[card_id].conj;
		pronoun          = rules[conj_group][form_counter]["qst"]
		ntv_verb         = cards[card_id].ntv.substring(3, cards[card_id].ntv.length);
		if (pronoun === "he" || pronoun === "she") {
			ntv_verb     = ntv_verb+"s"; //he/she works!
		}
		ntvLng.innerText = pronoun+" "+ntv_verb;
		btnCheck.style   = "display: block";
		btnNextQst.style = "display: none";
	}
	if (selector.value==="irregular_verbs"){
		console.log("try to summup a question");
		txtRes.innerText = "";
		txtAns.value     = "";
		tgtLng.innerText = "";
		//now we are dropping 'to' from the english card translation
		//for example, 'to work'. We are dropping first three symbols 'to '
		conj_group       = cards[card_id].conj;
		pronoun          = cards[card_id]["forms"][form_counter][2]
		ntv_verb         = cards[card_id].ntv.substring(3, cards[card_id].ntv.length);
		if (pronoun === "he" || pronoun === "she") {
			ntv_verb     = ntv_verb+"s"; //he/she works!
		}
		ntvLng.innerText = pronoun+" "+ntv_verb;
		btnCheck.style   = "display: block";
		btnNextQst.style = "display: none";
	}
}
function check() {
	if (selector.value==="regular_verbs"){
		conj = cards[card_id].conj;
		correct_ans  = rules[conj][form_counter].noun+" "+cards[card_id].tgt.substring(0, cards[card_id].tgt.length-2)
		correct_ans += rules[conj][form_counter].ans.substring(1, rules[conj][form_counter].ans.length);
		correct_ans_lc  = correct_ans.toLowerCase();
		correct_ans_nd  = correct_ans_lc.replace("ú","u");
		correct_ans_nd  = correct_ans_nd.replace("á","a");
		correct_ans_nd  = correct_ans_nd.replace("á","a");
		correct_ans_nd  = correct_ans_nd.replace("í","i");
		correct_ans_nd  = correct_ans_nd.replace("é","e");
		prov_ans_lc     = txtAns.value.toLowerCase();
		//convert to array of lines
		prov_ans_lc     = prov_ans_lc.split('\n');
		//use only first line
		prov_ans_lc     = prov_ans_lc[0];
		//trim the line
		prov_ans_lc     = prov_ans_lc.trim();
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
	}
	if (selector.value==="irregular_verbs"){
		conj = cards[card_id].conj;
		//noun
		correct_ans     = cards[card_id]["forms"][form_counter][0];
		//verb
		correct_ans    += " "+cards[card_id]["forms"][form_counter][1];
		correct_ans_lc  = correct_ans.toLowerCase();
		correct_ans_nd  = correct_ans_lc.replace("ú","u");
		correct_ans_nd  = correct_ans_nd.replace("á","a");
		correct_ans_nd  = correct_ans_nd.replace("á","a");
		correct_ans_nd  = correct_ans_nd.replace("í","i");
		correct_ans_nd  = correct_ans_nd.replace("é","e");
		prov_ans_lc     = txtAns.value.toLowerCase();
		//convert to array of lines
		prov_ans_lc     = prov_ans_lc.split('\n');
		//use only first line
		prov_ans_lc     = prov_ans_lc[0];
		//trim the line
		prov_ans_lc     = prov_ans_lc.trim();
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
	}
	btnCheck.style  = "display: none";
	btnNextQst.style = "display: block";
	//END OF THE CARD
	if (selector.value==="regular_verbs"){
		if (!smallPractice){
			if (form_counter===11){
				card_id       = card_id+1;
				form_counter  = 0;
			} else {
				form_counter += 1;
			}
		} else {
			if (form_counter===11){
				if (cards_deck.length>1){
					cards_deck.shift();
					card_id = cards_deck[0];
				} else {
					cards_deck.shift();
				}
				form_counter  = 0;
			} else {
				form_counter += 1;
			}
		}
	}
	if (selector.value==="irregular_verbs"){
		if (!smallPractice){
			if (form_counter===11){
				card_id       = card_id+1;
				form_counter  = 0;
			} else {
				form_counter += 1;
			}
		} else {
			if (form_counter===11){
				if (cards_deck.length>1){
					cards_deck.shift();
					card_id = cards_deck[0];
				} else {
					cards_deck.shift();
				}
				form_counter  = 0;
			} else {
				form_counter += 1;
			}
		}
	}
	//END OF TRAINING
	if (selector.value==="regular_verbs"){
		if (!smallPractice){
			if (card_id === cards.length-1 && form_counter === 0) {
				btnNextQst.style = "display: none";
				//TODO make return to Main Menu button there!
			}
		} else {
			if (cards_deck.length === 0 && form_counter === 0) {
				btnNextQst.style = "display: none";
				//TODO make return to Main Menu button there!
			}
		}
	} else {
		if (!smallPractice){
			if (card_id === cards.length-1) {
				btnNextQst.style = "display: none";
			}
		} else {
			if (cards_deck.length === 0) {
				btnNextQst.style = "display: none";
			}
		}
	}
	if (selector.value==="irregular_verbs"){
		if (!smallPractice){
			if (card_id === cards.length-1 && form_counter === 0) {
				btnNextQst.style = "display: none";
				//TODO make return to Main Menu button there!
			}
		} else {
			if (cards_deck.length === 0 && form_counter === 0) {
				btnNextQst.style = "display: none";
				//TODO make return to Main Menu button there!
			}
		}
	} else {
		if (!smallPractice){
			if (card_id === cards.length-1) {
				btnNextQst.style = "display: none";
			}
		} else {
			if (cards_deck.length === 0) {
				btnNextQst.style = "display: none";
			}
		}
	}
}
//HELPERS
function inArray2(arrayToCheck, valueToCheck) {
	return arrayToCheck.indexOf(valueToCheck) > -1;
}
function inArray(needle,haystack){
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
